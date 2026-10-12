import type React from 'react';

interface PsychologySceneProps {
  sceneType: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const PsychologyScene: React.FC<PsychologySceneProps> = ({
  sceneType,
  className = '',
  width = '100%',
  height = 240
}) => {
  switch (sceneType) {
    // PPDT Scene: Ambiguous coastal embankment after storm
    case 'ppdt_coastal_embankment':
      return (
        <svg
          viewBox="0 0 600 340"
          width={width}
          height={height}
          className={`rounded-xl border border-slate-300 shadow-inner bg-slate-900 overflow-hidden ${className}`}
        >
          {/* Moody hazy sky & stormy sea horizon */}
          <defs>
            <linearGradient id="skyHaze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#475569" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
            <filter id="hazeFilter" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0" />
              <feBlend mode="multiply" in="SourceGraphic" result="blend" />
            </filter>
          </defs>

          <rect width="600" height="340" fill="url(#skyHaze)" />

          {/* Sea waves background */}
          <path d="M0,190 Q120,180 240,190 T480,185 T600,190 L600,340 L0,340 Z" fill="#334155" opacity="0.7" />

          {/* Riverbank / shoreline embankment */}
          <polygon points="0,250 220,220 400,240 600,220 600,340 0,340" fill="#1e293b" />
          <polygon points="120,240 280,225 450,250 600,240 600,340 120,340" fill="#0f172a" />

          {/* Moored country boat outline */}
          <path d="M70,250 Q160,280 260,250 L240,235 Q160,245 80,238 Z" fill="#475569" />
          <line x1="160" y1="240" x2="160" y2="180" stroke="#64748b" strokeWidth="2.5" />

          {/* Character 1 (Central proactive figure, pointing forward) */}
          <g transform="translate(240, 160)">
            {/* Head */}
            <circle cx="20" cy="18" r="9" fill="#94a3b8" />
            {/* Body */}
            <path d="M12,28 L28,28 L32,65 L8,65 Z" fill="#cbd5e1" />
            {/* Outstretched arm pointing */}
            <line x1="28" y1="36" x2="52" y2="28" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            {/* Legs */}
            <line x1="14" y1="65" x2="12" y2="95" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="26" y1="65" x2="28" y2="95" stroke="#94a3b8" strokeWidth="4.5" strokeLinecap="round" />
          </g>

          {/* Character 2 (Elderly person seated / listening) */}
          <g transform="translate(170, 190)">
            <circle cx="15" cy="15" r="8" fill="#64748b" />
            <path d="M8,24 L22,24 L25,50 L5,50 Z" fill="#475569" />
            <circle cx="15" cy="55" r="8" fill="#334155" />
          </g>

          {/* Character 3 (Person carrying package/rope) */}
          <g transform="translate(320, 175)">
            <circle cx="15" cy="15" r="8" fill="#94a3b8" />
            <path d="M8,24 L22,24 L24,58 L6,58 Z" fill="#64748b" />
            <rect x="20" y="30" width="16" height="14" rx="2" fill="#cbd5e1" />
            <line x1="10" y1="58" x2="8" y2="85" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="58" x2="22" y2="85" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Atmospheric cloud layer / haze */}
          <ellipse cx="300" cy="140" rx="280" ry="60" fill="#94a3b8" opacity="0.1" />
        </svg>
      );

    // TAT Scene: Naval Bridge during navigation
    case 'tat_naval_bridge':
      return (
        <svg
          viewBox="0 0 600 340"
          width={width}
          height={height}
          className={`rounded-xl border border-slate-300 shadow-inner bg-slate-900 overflow-hidden ${className}`}
        >
          {/* Bridge window overlooking open sea */}
          <rect width="600" height="340" fill="#0f172a" />
          {/* Sea & horizon outside window */}
          <rect x="40" y="30" width="520" height="150" rx="6" fill="#1e293b" />
          <line x1="40" y1="120" x2="560" y2="120" stroke="#38bdf8" strokeWidth="1" strokeDasharray="8 4" opacity="0.4" />

          {/* Bridge Console & Radar screen */}
          <rect x="20" y="210" width="560" height="130" fill="#1e293b" stroke="#334155" strokeWidth="2" />
          {/* Green radar PPI scope */}
          <circle cx="300" cy="270" r="42" fill="#022c22" stroke="#10b981" strokeWidth="2" />
          <line x1="300" y1="228" x2="300" y2="312" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="258" y1="270" x2="342" y2="270" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="300" y1="270" x2="330" y2="245" stroke="#34d399" strokeWidth="2" />

          {/* Officer 1 (Officer of the Watch observing through binoculars) */}
          <g transform="translate(140, 100)">
            <circle cx="20" cy="20" r="11" fill="#cbd5e1" />
            <rect x="10" y="32" width="22" height="60" rx="3" fill="#f8fafc" />
            {/* Binoculars */}
            <rect x="18" y="16" width="18" height="8" rx="2" fill="#0a192f" />
          </g>

          {/* Officer 2 (Navigating officer analyzing chart table) */}
          <g transform="translate(420, 130)">
            <circle cx="20" cy="18" r="10" fill="#94a3b8" />
            <path d="M10,29 L30,29 L34,75 L8,75 Z" fill="#e2e8f0" />
            {/* Hand on chart table */}
            <line x1="28" y1="40" x2="42" y2="55" stroke="#cbd5e1" strokeWidth="3" />
          </g>
        </svg>
      );

    default:
      return (
        <div className="w-full h-48 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-500 font-medium">
          Observation Scene
        </div>
      );
  }
};
