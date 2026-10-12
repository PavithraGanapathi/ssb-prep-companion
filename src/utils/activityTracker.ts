import type { Task } from '../types';

const ACTIVITY_LOG_KEY = 'ssb_activity_log_v1';

// Format Date to YYYY-MM-DD in local time
export function getLocalDateString(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Record an activity for today
export function recordActivityDate(): void {
  try {
    const today = getLocalDateString();
    const stored = localStorage.getItem(ACTIVITY_LOG_KEY);
    const dates: string[] = stored ? JSON.parse(stored) : [];
    if (!dates.includes(today)) {
      dates.push(today);
      localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(dates));
    }
  } catch {
    // Ignore localStorage errors
  }
}

// Get all recorded activity dates
export function getActivityDates(): string[] {
  try {
    const stored = localStorage.getItem(ACTIVITY_LOG_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Ignore
  }
  return [];
}

// Calculate true consecutive days streak
export function calculateStudyStreak(): number {
  const dates = getActivityDates();
  if (dates.length === 0) return 0;

  const dateSet = new Set(dates);
  const today = new Date();
  const todayStr = getLocalDateString(today);

  // Check if active today
  let checkDate = new Date(today);
  let streak = 0;

  if (dateSet.has(todayStr)) {
    streak = 1;
    // Check backwards from yesterday
    checkDate.setDate(checkDate.getDate() - 1);
  } else {
    // Check if active yesterday to keep streak alive
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = getLocalDateString(yesterday);
    if (dateSet.has(yesterdayStr)) {
      streak = 1;
      checkDate = new Date(yesterday);
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      return 0;
    }
  }

  // Count backwards
  while (true) {
    const dStr = getLocalDateString(checkDate);
    if (dateSet.has(dStr)) {
      streak += 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

// Calculate week day breakdown based on actual tasks completed
export function getWeeklyDayBreakdown(tasks: Task[]) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  // Get Monday of current week
  const dayOfWeek = today.getDay(); // 0 is Sun, 1 is Mon...
  const distanceToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - distanceToMonday);

  // Map each day
  return days.map((dayName, index) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + index);
    const dStr = getLocalDateString(d);
    const isToday = dStr === getLocalDateString(today);

    // Sum hours of tasks completed on this date or fallback to estimated minutes
    const matchingTasks = tasks.filter(t => {
      if (!t.completed) return false;
      if (t.createdAt) {
        return getLocalDateString(new Date(t.createdAt)) === dStr;
      }
      return false;
    });

    const hours = Number((matchingTasks.reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0) / 60).toFixed(1));

    return {
      day: dayName,
      hours,
      today: isToday,
      active: hours > 0
    };
  });
}

// Retrieve actual aggregate metrics across all modules
export function getRealAppMetrics() {
  let oirTestsTaken = 0;
  let oirAverageScore = 0;
  let oirLatestScore = 0;

  try {
    const oirData = localStorage.getItem('ssb_oir_test_history_v1');
    if (oirData) {
      const history = JSON.parse(oirData);
      if (Array.isArray(history) && history.length > 0) {
        oirTestsTaken = history.length;
        const totalPct = history.reduce((sum: number, att: { percentage?: number }) => sum + (att.percentage || 0), 0);
        oirAverageScore = Math.round(totalPct / history.length);
        oirLatestScore = history[0]?.percentage || 0;
      }
    }
  } catch {
    // Ignore
  }

  let psychRecordsCount = 0;
  try {
    const psychData = localStorage.getItem('ssb_psych_records_v1');
    if (psychData) {
      const records = JSON.parse(psychData);
      if (Array.isArray(records)) {
        psychRecordsCount = records.length;
      }
    }
  } catch {
    // Ignore
  }

  let qbankCompletedCount = 0;
  let qbankBookmarksCount = 0;
  try {
    const qComp = localStorage.getItem('ssb_qbank_completed_v1');
    if (qComp) qbankCompletedCount = JSON.parse(qComp).length;
    const qBmk = localStorage.getItem('ssb_qbank_bookmarks_v1');
    if (qBmk) qbankBookmarksCount = JSON.parse(qBmk).length;
  } catch {
    // Ignore
  }

  let objectiveTestsTaken = 0;
  let objectiveLatestScore: { score: number; total: number; percentage: number } | null = null;
  try {
    const objData = localStorage.getItem('ssb_mock_knowledge_history_v1');
    if (objData) {
      const history = JSON.parse(objData);
      if (Array.isArray(history) && history.length > 0) {
        objectiveTestsTaken = history.length;
        objectiveLatestScore = {
          score: history[0].score,
          total: history[0].totalQuestions,
          percentage: history[0].percentage
        };
      }
    }
  } catch {
    // Ignore
  }

  let interviewSessionsCount = 0;
  try {
    const intData = localStorage.getItem('ssb_interview_sessions_v1');
    if (intData) {
      const sessions = JSON.parse(intData);
      if (Array.isArray(sessions)) {
        interviewSessionsCount = sessions.length;
      }
    }
  } catch {
    // Ignore
  }

  let bookmarkedAffairsCount = 0;
  try {
    const affData = localStorage.getItem('ssb_affairs_bookmarks_v1');
    if (affData) {
      const bmarks = JSON.parse(affData);
      if (Array.isArray(bmarks)) {
        bookmarkedAffairsCount = bmarks.length;
      }
    }
  } catch {
    // Ignore
  }

  return {
    oirTestsTaken,
    oirAverageScore,
    oirLatestScore,
    psychRecordsCount,
    qbankCompletedCount,
    qbankBookmarksCount,
    objectiveTestsTaken,
    objectiveLatestScore,
    interviewSessionsCount,
    bookmarkedAffairsCount
  };
}
