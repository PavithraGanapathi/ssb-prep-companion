import { useState, useEffect } from 'react';
import type React from 'react';
import { Target, Clock, Shield, Sparkles, Settings2, RotateCcw } from 'lucide-react';

const TARGET_DATE_KEY = 'ssb_target_date_v1';
const DEFAULT_TARGET_DATE = '2026-12-28T06:00:00';

export const CountdownCard: React.FC = () => {
  const [targetDateStr, setTargetDateStr] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(TARGET_DATE_KEY);
      if (saved && !isNaN(new Date(saved).getTime())) {
        return saved;
      }
    } catch {
      // Ignore
    }
    return DEFAULT_TARGET_DATE;
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempDate, setTempDate] = useState(targetDateStr.slice(0, 16));

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(targetDateStr);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const handleSaveDate = () => {
    if (!tempDate) return;
    const newTarget = `${tempDate}:00`;
    setTargetDateStr(newTarget);
    try {
      localStorage.setItem(TARGET_DATE_KEY, newTarget);
    } catch {
      // Ignore
    }
    setIsEditing(false);
  };

  const handleResetDefault = () => {
    setTargetDateStr(DEFAULT_TARGET_DATE);
    setTempDate(DEFAULT_TARGET_DATE.slice(0, 16));
    try {
      localStorage.removeItem(TARGET_DATE_KEY);
    } catch {
      // Ignore
    }
    setIsEditing(false);
  };

  const formattedDisplayDate = new Date(targetDateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a192f] via-[#0d213f] to-[#102a4c] text-white p-6 sm:p-8 shadow-md border border-[#d4af37]/30">
      {/* Decorative background grid and glow */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top bar with mission badge & Date Configuration */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3d789]">
              <Target className="w-4 h-4 text-[#d4af37]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#e5c158]">
              Mission SSB • Indian Navy
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-medium backdrop-blur-sm border border-white/10 text-slate-200">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Target: {formattedDisplayDate} IST</span>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="Configure Target Date"
            >
              <Settings2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Date Configuration Drawer */}
        {isEditing && (
          <div className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-[#d4af37]/30 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-[#f3d789]">Set SSB Target Date:</span>
              <input
                type="datetime-local"
                value={tempDate}
                onChange={e => setTempDate(e.target.value)}
                className="bg-[#0a192f] text-white px-2.5 py-1.5 rounded-lg border border-slate-600 focus:outline-none focus:ring-1 focus:ring-[#d4af37] text-xs font-mono"
              />
              <button
                onClick={handleSaveDate}
                className="px-3 py-1.5 bg-[#d4af37] text-slate-950 font-bold rounded-lg hover:bg-[#e5c158] transition-colors"
              >
                Save
              </button>
            </div>

            <button
              onClick={handleResetDefault}
              className="text-slate-300 hover:text-white flex items-center gap-1 underline text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset to Dec 28, 2026</span>
            </button>
          </div>
        )}

        {/* Headline */}
        <div className="max-w-2xl mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Countdown to Naval Commission Board
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            Every drill, story, and situational reaction shapes the 15 Officer Like Qualities (OLQs) needed for the Services Selection Board.
          </p>
        </div>

        {/* Dynamic Countdown Grid */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl">
          <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 sm:p-4 text-center border border-white/15 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-black tracking-tight text-[#f3d789] font-mono">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Days
            </span>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 sm:p-4 text-center border border-white/15 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-black tracking-tight text-white font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Hours
            </span>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 sm:p-4 text-center border border-white/15 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-black tracking-tight text-white font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Minutes
            </span>
          </div>

          <div className="rounded-xl bg-white/10 backdrop-blur-md p-3 sm:p-4 text-center border border-[#d4af37]/30 shadow-inner">
            <span className="block text-2xl sm:text-4xl font-black tracking-tight text-[#e5c158] font-mono animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
              Seconds
            </span>
          </div>
        </div>

        {/* Motto / Callout */}
        <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#d4af37]" />
            <span className="font-semibold text-white">Naval Motto:</span>
            <span className="italic text-amber-200">"May the Lord of the Oceans be Auspicious Unto Us"</span>
          </div>

          <div className="flex items-center gap-1 text-[#f3d789]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeting Indian Naval Academy (INA) Ezhimala</span>
          </div>
        </div>
      </div>
    </div>
  );
};
