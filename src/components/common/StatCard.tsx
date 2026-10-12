import type React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  badgeText?: string;
  accentColor?: 'navy' | 'gold' | 'emerald' | 'sky';
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  badgeText,
  accentColor = 'navy'
}) => {
  const accentBorders = {
    navy: 'border-l-4 border-l-[#0a192f]',
    gold: 'border-l-4 border-l-[#d4af37]',
    emerald: 'border-l-4 border-l-emerald-600',
    sky: 'border-l-4 border-l-sky-600'
  };

  const iconColors = {
    navy: 'text-[#0a192f] bg-[#0a192f]/5',
    gold: 'text-[#b48a28] bg-amber-50',
    emerald: 'text-emerald-700 bg-emerald-50',
    sky: 'text-sky-700 bg-sky-50'
  };

  return (
    <div className={`bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 transition-all hover:shadow-md ${accentBorders[accentColor]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-700">{label}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">{value}</span>
            {badgeText && (
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {badgeText}
              </span>
            )}
          </div>
          {subtext && <p className="mt-1 text-xs text-slate-700 font-medium">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${iconColors[accentColor]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
