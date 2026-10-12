import type React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  Brain,
  HelpCircle,
  Newspaper,
  Bot,
  Mic,
  TrendingUp,
  Compass,
  Anchor,
  X
} from 'lucide-react';
import type { NavScreen } from '../../types';

interface SidebarProps {
  activeScreen: NavScreen;
  onSelectScreen: (screen: NavScreen) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavScreen;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  tagColor?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'oir', label: 'OIR Practice', icon: Compass, tag: 'Mock Tests' },
  { id: 'planner', label: 'Daily Planner', icon: CalendarCheck, tag: 'Active' },
  { id: 'psychology', label: 'Psychology Practice', icon: Brain, tag: 'Drills' },
  { id: 'questions', label: 'Question Bank', icon: HelpCircle },
  { id: 'affairs', label: 'Current Affairs', icon: Newspaper, tag: 'Curated' },
  { id: 'interview', label: 'Interview Simulator', icon: Bot, tag: 'Practice' },
  { id: 'voice', label: 'Voice Practice', icon: Mic, tag: 'Pacing' },
  { id: 'progress', label: 'Progress & OLQs', icon: TrendingUp }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  isOpenMobile,
  onCloseMobile
}) => {
  const handleItemClick = (screen: NavScreen) => {
    onSelectScreen(screen);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0a192f] text-slate-100 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#102a4c] to-[#1a3a60] border border-[#d4af37]/40 flex items-center justify-center shadow-inner">
              <Anchor className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-white text-base">SSB Prep</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#d4af37] bg-[#d4af37]/10 px-1.5 py-0.5 rounded border border-[#d4af37]/30">
                  Navy
                </span>
              </div>
              <p className="text-xs text-slate-400">Indian Navy Officer Portal</p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 focus:outline-none"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Motivational Motto Strip */}
        <div className="px-5 py-2.5 bg-[#060e1a]/60 border-b border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-300">Target Interview</span>
          <span className="text-[11px] font-bold text-[#e5c158]">28 Dec 2026</span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Preparation Cockpit
          </div>

          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#102a4c] to-[#1a3a60] text-white shadow-sm border-l-4 border-l-[#d4af37]'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#e5c158]' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span className="text-left font-medium">{item.label}</span>
                </div>

                {item.tag && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                      isActive
                        ? 'bg-[#d4af37]/20 text-[#f3d789] border border-[#d4af37]/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.tag}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Target Board Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#060e1a]/80">
          <div className="rounded-lg p-3 bg-slate-800/50 border border-slate-700/60">
            <div className="flex items-center justify-between text-[11px] text-slate-300 font-semibold mb-1">
              <span>Target Selection Boards</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
            <div className="text-[11px] text-slate-400 space-y-0.5">
              <div>• 33 SSB Bhopal / 12 SSB Bangalore</div>
              <div>• NSB Visakhapatnam / 21 SSB Coimbatore</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
