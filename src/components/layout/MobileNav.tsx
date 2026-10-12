import type React from 'react';
import { LayoutDashboard, CalendarCheck, Brain, HelpCircle, Menu } from 'lucide-react';
import type { NavScreen } from '../../types';

interface MobileNavProps {
  activeScreen: NavScreen;
  onSelectScreen: (screen: NavScreen) => void;
  onOpenMoreMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenMoreMenu
}) => {
  const quickItems = [
    { id: 'dashboard' as NavScreen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner' as NavScreen, label: 'Planner', icon: CalendarCheck },
    { id: 'psychology' as NavScreen, label: 'Psychology', icon: Brain },
    { id: 'questions' as NavScreen, label: 'Questions', icon: HelpCircle }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0a192f] border-t border-slate-800 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 items-center">
        {quickItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-md transition-colors ${
                isActive ? 'text-[#e5c158]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}

        <button
          onClick={onOpenMoreMenu}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-md text-slate-400 hover:text-slate-200"
          aria-label="Open full menu"
        >
          <Menu className="w-5 h-5 text-slate-300" />
          <span className="text-[10px] font-medium mt-1">Modules</span>
        </button>
      </div>
    </nav>
  );
};
