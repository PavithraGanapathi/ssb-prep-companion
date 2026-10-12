import type React from 'react';
import { Flame, Calendar, Award, CheckCircle2 } from 'lucide-react';
import type { Task } from '../../types';
import { getWeeklyDayBreakdown } from '../../utils/activityTracker';

interface StreakCardProps {
  tasks: Task[];
  streak: number;
}

export const StreakCard: React.FC<StreakCardProps> = ({ tasks, streak }) => {
  const weekData = getWeeklyDayBreakdown(tasks);
  const totalWeeklyHours = Number(weekData.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1));

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
      <div>
        {/* Card Header with Real Activity Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-50 text-[#b48a28] border border-amber-200">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Study Consistency</h3>
              <p className="text-xs text-slate-700">Preparation velocity & discipline</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Real Logged Data
          </span>
        </div>

        {/* Streak highlight */}
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 p-4 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Current Study Streak
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-[#0a192f]">
                {streak} {streak === 1 ? 'Day' : 'Days'}
              </span>
              <span className="text-xs font-semibold text-amber-900">
                {streak > 0 ? '🔥 Active streak maintained' : 'Complete today’s drills to start streak'}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-amber-300">
            <Award className="w-5 h-5 text-[#b48a28]" />
          </div>
        </div>

        {/* Weekly Progress Bar Chart (Real Data) */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-600" />
              Weekly Prep Hours ({totalWeeklyHours} hrs completed)
            </span>
            <span className="text-[11px] text-slate-600 font-medium">Daily Target: 3-4 hrs</span>
          </div>

          <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
            {weekData.map((d, index) => {
              const maxHours = 5;
              const heightPercent = d.hours > 0 ? Math.min(100, Math.max(15, Math.round((d.hours / maxHours) * 100))) : 4;

              return (
                <div key={index} className="flex flex-col items-center h-full justify-end group">
                  <span className="text-[10px] text-slate-600 font-semibold mb-1 opacity-90 group-hover:opacity-100 transition-opacity">
                    {d.hours > 0 ? `${d.hours}h` : '0'}
                  </span>
                  <div className="w-full bg-slate-100 rounded-t-md h-16 flex items-end overflow-hidden">
                    <div
                      className={`w-full transition-all duration-500 rounded-t-md ${
                        d.hours > 0
                          ? d.today
                            ? 'bg-gradient-to-t from-[#0a192f] to-[#d4af37]'
                            : 'bg-[#0a192f]'
                          : 'bg-slate-200'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span
                    className={`text-[11px] mt-1.5 font-medium ${
                      d.today ? 'text-[#0a192f] font-bold' : 'text-slate-600'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer explanation */}
      <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-600 flex items-center justify-between">
        <span>Logged automatically from completed planner drills</span>
        <span className="font-semibold text-[#0a192f]">SSB Dec 28, 2026 Target</span>
      </div>
    </div>
  );
};
