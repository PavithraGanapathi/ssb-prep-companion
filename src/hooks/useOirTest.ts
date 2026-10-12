import { useState, useEffect, useCallback } from 'react';
import type { OirQuestion, OirTestResult, OirPresetTest } from '../types/oir';
import { OIR_QUESTION_BANK, OIR_PRESET_TESTS } from '../data/oirQuestions';

const OIR_HISTORY_KEY = 'ssb_oir_test_history_v1';
const OIR_BOOKMARKS_KEY = 'ssb_oir_bookmarks_v1';

export function useOirTest() {
  // Test run state
  const [activeTest, setActiveTest] = useState<OirPresetTest | null>(null);
  const [testQuestions, setTestQuestions] = useState<OirQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [lastResult, setLastResult] = useState<OirTestResult | null>(null);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // History & Bookmarks persisted
  const [history, setHistory] = useState<OirTestResult[]>(() => {
    try {
      const saved = localStorage.getItem(OIR_HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(OIR_BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(OIR_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save OIR test history', e);
    }
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(OIR_BOOKMARKS_KEY, JSON.stringify(bookmarkedQuestionIds));
    } catch (e) {
      console.error('Failed to save OIR bookmarks', e);
    }
  }, [bookmarkedQuestionIds]);

  // Active Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTestRunning && !isTestSubmitted) {
      interval = setInterval(() => {
        setTimeSpentSeconds(prev => prev + 1);
        if (activeTest && activeTest.timeMinutes > 0) {
          setSecondsRemaining(prev => {
            if (prev <= 1) {
              // Time's up! Auto submit
              handleSubmitTest();
              return 0;
            }
            return prev - 1;
          });
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTestRunning, isTestSubmitted, activeTest]);

  // Start a test (Preset or Custom)
  const startTest = (preset: OirPresetTest, customQuestions?: OirQuestion[]) => {
    setActiveTest(preset);

    let questionsToUse: OirQuestion[] = [];
    if (customQuestions && customQuestions.length > 0) {
      questionsToUse = [...customQuestions];
    } else {
      // Pick questions matching preset
      if (preset.category === 'Verbal Drill') {
        questionsToUse = OIR_QUESTION_BANK.filter(q => q.category === 'Verbal Reasoning');
      } else if (preset.category === 'Non-Verbal Drill') {
        questionsToUse = OIR_QUESTION_BANK.filter(q => q.category === 'Non-Verbal Reasoning');
      } else {
        questionsToUse = [...OIR_QUESTION_BANK];
      }
    }

    // Shuffle and slice to desired count
    const shuffled = [...questionsToUse].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(preset.questionCount, shuffled.length));

    setTestQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setMarkedForReview({});
    setTimeSpentSeconds(0);
    setSecondsRemaining(preset.timeMinutes * 60);
    setIsTestRunning(true);
    setIsTestSubmitted(false);
    setLastResult(null);
  };

  const selectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const toggleMarkForReview = (questionId: string) => {
    setMarkedForReview(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarkedQuestionIds(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Submit test and generate diagnostic scorecard
  const handleSubmitTest = useCallback(() => {
    setIsTestRunning(false);
    setIsTestSubmitted(true);

    let correctCount = 0;
    let incorrectCount = 0;
    const categoryTotals: Record<string, { total: number; correct: number }> = {};

    const responses = testQuestions.map(q => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctOptionId;

      if (selected) {
        if (isCorrect) correctCount++;
        else incorrectCount++;
      }

      if (!categoryTotals[q.subCategory]) {
        categoryTotals[q.subCategory] = { total: 0, correct: 0 };
      }
      categoryTotals[q.subCategory].total += 1;
      if (isCorrect) {
        categoryTotals[q.subCategory].correct += 1;
      }

      return {
        questionId: q.id,
        selectedOptionId: selected,
        isCorrect
      };
    });

    const totalQuestions = testQuestions.length;
    const attemptedCount = Object.keys(selectedAnswers).length;
    const unansweredCount = totalQuestions - attemptedCount;
    const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const result: OirTestResult = {
      id: `oir-result-${Date.now()}`,
      testTitle: activeTest?.title || 'OIR Practice Test',
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      mode: activeTest && activeTest.timeMinutes > 0 ? 'timed' : 'untimed',
      totalQuestions,
      attemptedCount,
      correctCount,
      incorrectCount,
      unansweredCount,
      scorePercentage,
      timeTakenSeconds: timeSpentSeconds,
      allocatedTimeSeconds: activeTest ? activeTest.timeMinutes * 60 : undefined,
      categoryBreakdown: Object.entries(categoryTotals).map(([subCategory, data]) => ({
        subCategory,
        total: data.total,
        correct: data.correct
      })),
      responses
    };

    setLastResult(result);
    setHistory(prev => [result, ...prev]);
  }, [testQuestions, selectedAnswers, activeTest, timeSpentSeconds]);

  const exitTest = () => {
    setIsTestRunning(false);
    setIsTestSubmitted(false);
    setActiveTest(null);
    setTestQuestions([]);
  };

  const currentQuestion = testQuestions[currentIndex] || null;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = testQuestions.length - answeredCount;

  return {
    presets: OIR_PRESET_TESTS,
    allQuestions: OIR_QUESTION_BANK,
    activeTest,
    testQuestions,
    currentIndex,
    currentQuestion,
    selectedAnswers,
    markedForReview,
    secondsRemaining,
    timeSpentSeconds,
    isTestRunning,
    isTestSubmitted,
    lastResult,
    history,
    bookmarkedQuestionIds,
    answeredCount,
    unansweredCount,
    startTest,
    selectAnswer,
    toggleMarkForReview,
    toggleBookmark,
    setCurrentIndex,
    handleSubmitTest,
    exitTest
  };
}
