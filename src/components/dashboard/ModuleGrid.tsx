import type React from 'react';
import {
  Brain,
  HelpCircle,
  Newspaper,
  Bot,
  Mic,
  TrendingUp,
  ArrowUpRight,
  Compass
} from 'lucide-react';
import type { NavScreen } from '../../types';

interface ModuleGridProps {
  onNavigate: (screen: NavScreen) => void;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'oir' as NavScreen,
      title: 'OIR Practice & Mocks',
      description: 'Verbal reasoning, non-verbal spatial diagrams, speed drills and full mock tests.',
      icon: Compass,
      badge: 'Screening Day 1',
      color: 'border-l-[#d4af37]',
      iconBg: 'bg-amber-50 text-[#b48a28]'
    },
    {
      id: 'psychology' as NavScreen,
      title: 'Psychology Practice',
      description: 'Practice TAT stories, 60-word WAT sprints, SRT drills, and SDT reflection.',
      icon: Brain,
      badge: 'Drills Ready',
      color: 'border-l-blue-600',
      iconBg: 'bg-blue-50 text-blue-700'
    },
    {
      id: 'questions' as NavScreen,
      title: 'Question Bank',
      description: 'Indian Navy commands, aircraft carriers, PIQ questions, and rapid-fire questions.',
      icon: HelpCircle,
      badge: 'Curated',
      color: 'border-l-[#0a192f]',
      iconBg: 'bg-[#0a192f]/5 text-[#0a192f]'
    },
    {
      id: 'affairs' as NavScreen,
      title: 'Current Affairs',
      description: 'Maritime security in Red Sea, P-75I submarines, Exercise MILAN & Theatre Commands.',
      icon: Newspaper,
      badge: 'Verified Sources',
      color: 'border-l-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-700'
    },
    {
      id: 'interview' as NavScreen,
      title: 'Interview Simulator',
      description: 'Rule-based IO interview practice console with structured candidate responses.',
      icon: Bot,
      badge: 'Practice Mode',
      color: 'border-l-indigo-600',
      iconBg: 'bg-indigo-50 text-indigo-700'
    },
    {
      id: 'voice' as NavScreen,
      title: 'Voice & Lecturette',
      description: '3-minute preparation & 3-minute delivery speech simulator with naval topics.',
      icon: Mic,
      badge: 'Pacing Clock',
      color: 'border-l-sky-600',
      iconBg: 'bg-sky-50 text-sky-700'
    },
    {
      id: 'progress' as NavScreen,
      title: '15 OLQs & Progress',
      description: 'Evaluate your 15 Officer Like Qualities across Factors I through IV.',
      icon: TrendingUp,
      badge: 'Self-Rating',
      color: 'border-l-[#0a192f]',
      iconBg: 'bg-[#0a192f]/5 text-[#0a192f]'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">SSB Practice Modules</h3>
          <p className="text-xs text-slate-700">Quick launchpad into specialized preparation tracks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.map(mod => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              onClick={() => onNavigate(mod.id)}
              className={`bg-white rounded-xl p-5 border border-slate-200 border-l-4 ${mod.color} shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2.5 rounded-lg ${mod.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {mod.badge}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 group-hover:text-[#0a192f] transition-colors text-base flex items-center gap-1">
                  {mod.title}
                </h4>
                <p className="mt-1 text-xs text-slate-700 leading-relaxed font-medium">
                  {mod.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0a192f] group-hover:text-[#d4af37] transition-colors">
                <span>Launch Drill</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
