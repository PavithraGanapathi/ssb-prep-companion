import type React from 'react';
import { CheckCircle2, Circle, ArrowRight, CheckSquare, Clock } from 'lucide-react';
import type { Task } from '../../types';

interface DailyTasksCardProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onNavigateToPlanner: () => void;
  completionPercentage: number;
  completedTasks: number;
  totalTasks: number;
}

export const DailyTasksCard: React.FC<DailyTasksCardProps> = ({
  tasks,
  onToggleTask,
  onNavigateToPlanner,
  completionPercentage,
  completedTasks,
  totalTasks
}) => {
  // Show up to 5 tasks for the dashboard view
  const displayTasks = tasks.slice(0, 5);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
      <div>
        {/* Header with completion % */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-[#0a192f]" />
              <h3 className="font-bold text-slate-900 text-lg">Today's Preparation Tasks</h3>
            </div>
            <p className="text-xs text-slate-700 mt-0.5">
              Interactive checklist synced with your local storage study plan
            </p>
          </div>

          <div className="text-right">
            <span className="text-2xl font-black text-[#0a192f]">{completionPercentage}%</span>
            <span className="block text-[11px] font-semibold text-slate-700">
              {completedTasks} of {totalTasks} Done
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-[#0a192f] to-[#d4af37] transition-all duration-500 rounded-full"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Task list with checkboxes */}
        <div className="space-y-2.5">
          {displayTasks.map(task => {
            return (
              <div
                key={task.id}
                onClick={() => onToggleTask(task.id)}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer select-none ${
                  task.completed
                    ? 'bg-slate-50/80 border-slate-200 text-slate-400'
                    : 'bg-white border-slate-200/90 text-slate-800 hover:border-[#0a192f]/40 hover:bg-slate-50/40'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-[#0a192f] transition-colors focus:outline-none"
                  aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as complete'}
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-[#0a192f] shrink-0" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium leading-snug break-words ${
                      task.completed ? 'line-through text-slate-400' : 'text-slate-800'
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {task.category}
                    </span>
                    <span className="text-[11px] text-slate-700 flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3" />
                      {task.estimatedMinutes}m
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {tasks.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              No tasks scheduled for today. Add tasks in the Daily Planner!
            </div>
          )}
        </div>
      </div>

      {/* Footer link to full planner */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-700 font-medium">
          Showing {Math.min(5, tasks.length)} of {tasks.length} tasks
        </span>
        <button
          onClick={onNavigateToPlanner}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0a192f] hover:text-[#d4af37] transition-colors"
        >
          <span>Open Full Daily Planner</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
