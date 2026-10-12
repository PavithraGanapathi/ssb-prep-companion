import { useMemo } from 'react';
import type React from 'react';
import { CountdownCard } from '../components/dashboard/CountdownCard';
import { DailyTasksCard } from '../components/dashboard/DailyTasksCard';
import { StreakCard } from '../components/dashboard/StreakCard';
import { ModuleGrid } from '../components/dashboard/ModuleGrid';
import { StatCard } from '../components/common/StatCard';
import {
  CheckCircle,
  Clock,
  Award,
  Compass,
  ArrowRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import type { Task, NavScreen } from '../types';
import { getRealAppMetrics } from '../utils/activityTracker';
import { SAMPLE_CURRENT_AFFAIRS } from '../data/sampleAffairs';

interface DashboardPageProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onNavigate: (screen: NavScreen) => void;
  completionPercentage: number;
  completedTasks: number;
  totalTasks: number;
  totalMinutes: number;
  studyStreak: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  tasks,
  onToggleTask,
  onNavigate,
  completionPercentage,
  completedTasks,
  totalTasks,
  totalMinutes,
  studyStreak
}) => {
  const metrics = useMemo(() => getRealAppMetrics(), [tasks]);

  // First incomplete planner task as the next recommended action
  const nextRecommendedTask = useMemo(() => {
    return tasks.find(t => !t.completed);
  }, [tasks]);

  // Top 3 current affairs briefings for quick highlight
  const affairsHighlights = useMemo(() => {
    return SAMPLE_CURRENT_AFFAIRS.slice(0, 3);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Dynamic Countdown Banner with target configuration */}
      <CountdownCard />

      {/* Top 4 Quick Stats calculated from real user activity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Today's Planner"
          value={`${completionPercentage}%`}
          subtext={`${completedTasks} of ${totalTasks} tasks finished`}
          icon={CheckCircle}
          accentColor="navy"
          badgeText="Active"
        />

        <StatCard
          label="Planned Study Time"
          value={`${Math.round(totalMinutes / 60)} hrs`}
          subtext={`${totalMinutes} total minutes scheduled`}
          icon={Clock}
          accentColor="gold"
        />

        <StatCard
          label="Study Streak"
          value={`${studyStreak} ${studyStreak === 1 ? 'Day' : 'Days'}`}
          subtext={studyStreak > 0 ? 'Consecutive active days' : 'Complete a drill to start'}
          icon={Award}
          accentColor="emerald"
          badgeText="Real Data"
        />

        <StatCard
          label="OIR Mock Average"
          value={metrics.oirTestsTaken > 0 ? `${metrics.oirAverageScore}%` : 'Not Taken'}
          subtext={metrics.oirTestsTaken > 0 ? `${metrics.oirTestsTaken} attempts recorded` : 'Take Day-1 OIR test'}
          icon={Compass}
          accentColor="navy"
          badgeText={metrics.oirTestsTaken > 0 ? 'Live' : 'Pending'}
        />
      </div>

      {/* Next Recommended Task Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#0a192f] text-[#e5c158] shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Next Recommended Preparation Action
              </span>
              {nextRecommendedTask ? (
                <>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {nextRecommendedTask.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-600">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                      {nextRecommendedTask.category}
                    </span>
                    <span>•</span>
                    <span className="font-mono text-slate-500">
                      ~{nextRecommendedTask.estimatedMinutes} mins
                    </span>
                    <span>•</span>
                    <span
                      className={`font-semibold capitalize ${
                        nextRecommendedTask.priority === 'high'
                          ? 'text-rose-600'
                          : nextRecommendedTask.priority === 'medium'
                          ? 'text-amber-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {nextRecommendedTask.priority} priority
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    All Scheduled Daily Tasks Complete!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Outstanding discipline, Cadet. Continue by practicing an OIR mock test, taking a TAT drill, or reviewing current affairs.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            {nextRecommendedTask ? (
              <button
                onClick={() => onToggleTask(nextRecommendedTask.id)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark as Done</span>
              </button>
            ) : null}
            <button
              onClick={() => onNavigate('planner')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>Open Planner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Middle Grid: Daily Tasks & Real Streak Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <DailyTasksCard
            tasks={tasks}
            onToggleTask={onToggleTask}
            onNavigateToPlanner={() => onNavigate('planner')}
            completionPercentage={completionPercentage}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
          />
        </div>
        <div className="lg:col-span-5">
          <StreakCard tasks={tasks} streak={studyStreak} />
        </div>
      </div>

      {/* Real Preparation Diagnostic Metrics Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Module Readiness Diagnostics</h3>
            <p className="text-xs text-slate-600">Calculated directly from your locally saved practice drills</p>
          </div>
          <button
            onClick={() => onNavigate('progress')}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
          >
            <span>View 15 OLQ Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              OIR Mock Tests
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              {metrics.oirTestsTaken} <span className="text-xs font-medium text-slate-500">Taken</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              {metrics.oirTestsTaken > 0 ? `Avg: ${metrics.oirAverageScore}%` : 'Take first test'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Psychology Drills
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              {metrics.psychRecordsCount} <span className="text-xs font-medium text-slate-500">Completed</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              PPDT, TAT, WAT, SRT & SDT
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Question Bank
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              {metrics.qbankCompletedCount} / 24 <span className="text-xs font-medium text-slate-500">Done</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              {metrics.qbankBookmarksCount} Bookmarked
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Objective Naval Tests
            </span>
            <div className="text-xl font-black text-slate-900 mt-1">
              {metrics.objectiveTestsTaken} <span className="text-xs font-medium text-slate-500">Attempts</span>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              {metrics.objectiveLatestScore
                ? `Latest: ${metrics.objectiveLatestScore.percentage}%`
                : 'Rule-based simulator'}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Current Affairs Highlights */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Current Affairs Highlights</h3>
            <p className="text-xs text-slate-600">Verified primary defence releases for SSB Group Discussions</p>
          </div>
          <button
            onClick={() => onNavigate('affairs')}
            className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1"
          >
            <span>All Briefings ({SAMPLE_CURRENT_AFFAIRS.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {affairsHighlights.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between hover:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a192f] bg-[#0a192f]/5 px-2 py-0.5 rounded truncate">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.publicationDate}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug mb-2 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed mb-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-indigo-700 hover:text-indigo-900 flex items-center gap-1 font-semibold"
                >
                  <span>{item.sourceName}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <button
                  onClick={() => onNavigate('affairs')}
                  className="text-[10px] font-bold text-[#0a192f] hover:underline flex items-center gap-0.5"
                >
                  <span>Read</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Navigation Grid */}
      <ModuleGrid onNavigate={onNavigate} />
    </div>
  );
};
