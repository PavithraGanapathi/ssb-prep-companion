import { useState, useEffect } from 'react';
import type React from 'react';
import { Menu, Calendar, Anchor, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu: () => void;
  activeScreenTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, activeScreenTitle }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateDays = () => {
      const targetDate = new Date('2026-12-28T00:00:00');
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    setDaysRemaining(calculateDays());
    const interval = setInterval(() => {
      setDaysRemaining(calculateDays());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile trigger & Current Screen title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h1 className="text-lg lg:text-xl font-bold tracking-tight text-[#0a192f]">
                {activeScreenTitle}
              </h1>
            </div>
            <p className="text-[11px] text-slate-700 hidden sm:block">
              Indian Naval Academy (INA) & Direct Entry SSB Cadet Portal
            </p>
          </div>
        </div>

        {/* Right: Quick glance target countdown and motto */}
        <div className="flex items-center gap-3">
          {/* Motto Badge */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a192f]/5 border border-[#0a192f]/15 text-[#0a192f] text-xs font-semibold">
            <Anchor className="w-3.5 h-3.5 text-[#b48a28]" />
            <span className="text-[11px] font-semibold text-slate-700">Naval Motto:</span>
            <span className="italic text-[#0a192f]">May the Lord of the Oceans be Auspicious Unto Us</span>
          </div>

          {/* Countdown Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#0a192f] to-[#102a4c] text-white shadow-sm">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <div className="text-right">
              <span className="block text-xs font-medium leading-none text-slate-200">SSB Target</span>
              <span className="text-xs font-bold text-[#e5c158] leading-none">
                {daysRemaining} Days
              </span>
            </div>
          </div>

          {/* Aspirant Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-[#0a192f] flex items-center justify-center text-white text-xs font-bold border border-[#d4af37]">
              IN
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                Candidate
                <ShieldCheck className="w-3 h-3 text-[#b48a28]" />
              </div>
              <div className="text-[10px] text-slate-700">Dec 28, 2026 Batch</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
