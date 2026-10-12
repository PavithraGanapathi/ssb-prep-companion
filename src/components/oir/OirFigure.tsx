import type React from 'react';

interface OirFigureProps {
  figureType: string;
  className?: string;
  size?: number;
}

export const OirFigure: React.FC<OirFigureProps> = ({
  figureType,
  className = '',
  size = 120
}) => {
  const s = size;

  switch (figureType) {
    // 1. Matrix 2x2: Cross & Circle pattern with bottom-right missing
    case 'matrix_grid_question':
      return (
        <svg width={s} height={s} viewBox="0 0 120 120" className={`border border-slate-300 rounded-lg bg-white ${className}`}>
          {/* 2x2 grid */}
          <line x1="60" y1="0" x2="60" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="0" y1="60" x2="120" y2="60" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
          {/* Top-Left: 1 circle */}
          <circle cx="30" cy="30" r="14" fill="#0a192f" />
          {/* Top-Right: 2 circles */}
          <circle cx="80" cy="30" r="10" fill="#0a192f" />
          <circle cx="102" cy="30" r="10" fill="#0a192f" />
          {/* Bottom-Left: 3 circles */}
          <circle cx="18" cy="90" r="8" fill="#0a192f" />
          <circle cx="35" cy="90" r="8" fill="#0a192f" />
          <circle cx="52" cy="90" r="8" fill="#0a192f" />
          {/* Bottom-Right: Question mark box */}
          <rect x="68" y="68" width="44" height="44" rx="4" fill="#f8fafc" stroke="#d4af37" strokeWidth="2" />
          <text x="90" y="96" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#b48a28">?</text>
        </svg>
      );

    case 'matrix_opt_4circles':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={`border border-slate-200 rounded-lg bg-white p-1 ${className}`}>
          <circle cx="26" cy="35" r="9" fill="#0a192f" />
          <circle cx="50" cy="35" r="9" fill="#0a192f" />
          <circle cx="74" cy="35" r="9" fill="#0a192f" />
          <circle cx="50" cy="68" r="9" fill="#0a192f" />
        </svg>
      );

    case 'matrix_opt_3circles':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={`border border-slate-200 rounded-lg bg-white p-1 ${className}`}>
          <circle cx="25" cy="50" r="9" fill="#0a192f" />
          <circle cx="50" cy="50" r="9" fill="#0a192f" />
          <circle cx="75" cy="50" r="9" fill="#0a192f" />
        </svg>
      );

    case 'matrix_opt_5circles':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={`border border-slate-200 rounded-lg bg-white p-1 ${className}`}>
          <circle cx="25" cy="30" r="8" fill="#0a192f" />
          <circle cx="50" cy="30" r="8" fill="#0a192f" />
          <circle cx="75" cy="30" r="8" fill="#0a192f" />
          <circle cx="38" cy="65" r="8" fill="#0a192f" />
          <circle cx="62" cy="65" r="8" fill="#0a192f" />
        </svg>
      );

    case 'matrix_opt_2circles':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={`border border-slate-200 rounded-lg bg-white p-1 ${className}`}>
          <circle cx="35" cy="50" r="10" fill="#0a192f" />
          <circle cx="65" cy="50" r="10" fill="#0a192f" />
        </svg>
      );

    // 2. Clockwise 45-degree arrow series
    case 'arrow_series_question':
      return (
        <svg width={s * 3} height={s * 0.9} viewBox="0 0 320 90" className={`border border-slate-300 rounded-lg bg-white p-2 ${className}`}>
          {/* Frame 1: Up 0 deg */}
          <rect x="5" y="5" width="70" height="80" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="40" y1="65" x2="40" y2="25" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="40,15 32,28 48,28" fill="#0a192f" />

          {/* Frame 2: Top-right 45 deg */}
          <rect x="85" y="5" width="70" height="80" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="25" y1="60" x2="52" y2="33" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" transform="translate(85,0)" />
          <polygon points="57,28 44,32 54,42" fill="#0a192f" transform="translate(85,0)" />

          {/* Frame 3: Right 90 deg */}
          <rect x="165" y="5" width="70" height="80" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="20" y1="45" x2="55" y2="45" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" transform="translate(165,0)" />
          <polygon points="65,45 52,37 52,53" fill="#0a192f" transform="translate(165,0)" />

          {/* Frame 4: Question Box */}
          <rect x="245" y="5" width="70" height="80" rx="6" fill="#f8fafc" stroke="#d4af37" strokeWidth="2" />
          <text x="280" y="52" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#b48a28">?</text>
        </svg>
      );

    case 'arrow_opt_down_right': // 135 deg (Correct next step)
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="25" y1="25" x2="52" y2="52" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="58,58 45,54 55,44" fill="#0a192f" />
        </svg>
      );

    case 'arrow_opt_down': // 180 deg
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="40" y1="20" x2="40" y2="55" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="40,65 32,52 48,52" fill="#0a192f" />
        </svg>
      );

    case 'arrow_opt_left': // 270 deg
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="60" y1="40" x2="25" y2="40" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="15,40 28,32 28,48" fill="#0a192f" />
        </svg>
      );

    case 'arrow_opt_up_right': // 45 deg repeat
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="25" y1="55" x2="52" y2="28" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="58,22 45,26 55,36" fill="#0a192f" />
        </svg>
      );

    // 3. Mirror image: Flag shape on left of vertical mirror
    case 'mirror_flag_question':
      return (
        <svg width={s * 1.5} height={s} viewBox="0 0 160 100" className={`border border-slate-300 rounded-lg bg-white p-2 ${className}`}>
          {/* Shape on left */}
          <line x1="30" y1="80" x2="30" y2="20" stroke="#0a192f" strokeWidth="4" strokeLinecap="round" />
          <polygon points="30,20 70,35 30,50" fill="#102a4c" />
          <circle cx="50" cy="35" r="5" fill="#d4af37" />

          {/* Mirror axis M-N */}
          <line x1="100" y1="10" x2="100" y2="90" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
          <text x="105" y="20" fontSize="11" fontWeight="bold" fill="#ef4444">M</text>
          <text x="105" y="88" fontSize="11" fontWeight="bold" fill="#ef4444">N</text>
        </svg>
      );

    case 'mirror_flag_opt_correct': // points to left (mirrored)
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="60" y1="65" x2="60" y2="15" stroke="#0a192f" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="60,15 20,30 60,45" fill="#102a4c" />
          <circle cx="40" cy="30" r="4" fill="#d4af37" />
        </svg>
      );

    case 'mirror_flag_opt_upside_down':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="20" y1="15" x2="20" y2="65" stroke="#0a192f" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="20,65 60,50 20,35" fill="#102a4c" />
          <circle cx="40" cy="50" r="4" fill="#d4af37" />
        </svg>
      );

    case 'mirror_flag_opt_same':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="20" y1="65" x2="20" y2="15" stroke="#0a192f" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="20,15 60,30 20,45" fill="#102a4c" />
          <circle cx="40" cy="30" r="4" fill="#d4af37" />
        </svg>
      );

    case 'mirror_flag_opt_inverted_pole':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <line x1="60" y1="15" x2="60" y2="65" stroke="#0a192f" strokeWidth="3.5" strokeLinecap="round" />
          <polygon points="60,65 20,50 60,35" fill="#102a4c" />
          <circle cx="40" cy="50" r="4" fill="#d4af37" />
        </svg>
      );

    // 4. Cube / dice unfolding net problem
    case 'cube_net_question':
      return (
        <svg width={s * 1.6} height={s * 1.2} viewBox="0 0 160 120" className={`border border-slate-300 rounded-lg bg-white p-2 ${className}`}>
          {/* Cross net of cube */}
          <rect x="55" y="10" width="30" height="30" fill="#f8fafc" stroke="#0a192f" strokeWidth="1.5" />
          <text x="70" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0a192f">1</text>

          <rect x="25" y="40" width="30" height="30" fill="#f8fafc" stroke="#0a192f" strokeWidth="1.5" />
          <text x="40" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0a192f">2</text>

          <rect x="55" y="40" width="30" height="30" fill="#f8fafc" stroke="#0a192f" strokeWidth="1.5" />
          <text x="70" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0a192f">3</text>

          <rect x="85" y="40" width="30" height="30" fill="#f8fafc" stroke="#0a192f" strokeWidth="1.5" />
          <text x="100" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0a192f">4</text>

          <rect x="115" y="40" width="30" height="30" fill="#f8fafc" stroke="#0a192f" strokeWidth="1.5" />
          <text x="130" y="60" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0a192f">5</text>

          <rect x="55" y="70" width="30" height="30" fill="#f8fafc" stroke="#0a192f" strokeWidth="1.5" />
          <text x="70" y="90" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0a192f">6</text>
        </svg>
      );

    // 5. Embedded Figures: Triangle inside Hexagon
    case 'embedded_target_z':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-300 rounded-lg bg-white p-2 ${className}`}>
          {/* Target 'Z' Shape */}
          <polyline points="20,25 60,25 20,60 60,60" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'embedded_opt_complex1': // contains Z
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <rect x="15" y="15" width="50" height="50" fill="none" stroke="#64748b" strokeWidth="1.5" />
          <line x1="15" y1="25" x2="65" y2="25" stroke="#0a192f" strokeWidth="2.5" />
          <line x1="65" y1="25" x2="15" y2="60" stroke="#0a192f" strokeWidth="2.5" />
          <line x1="15" y1="60" x2="65" y2="60" stroke="#0a192f" strokeWidth="2.5" />
          <line x1="40" y1="15" x2="40" y2="65" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      );

    case 'embedded_opt_complex2':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <circle cx="40" cy="40" r="28" fill="none" stroke="#64748b" strokeWidth="1.5" />
          <line x1="15" y1="40" x2="65" y2="40" stroke="#64748b" strokeWidth="1.5" />
          <line x1="40" y1="15" x2="40" y2="65" stroke="#64748b" strokeWidth="1.5" />
        </svg>
      );

    case 'embedded_opt_complex3':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <polygon points="40,15 65,65 15,65" fill="none" stroke="#64748b" strokeWidth="1.5" />
          <line x1="40" y1="15" x2="40" y2="65" stroke="#64748b" strokeWidth="1.5" />
        </svg>
      );

    case 'embedded_opt_complex4':
      return (
        <svg width={s} height={s} viewBox="0 0 80 80" className={`border border-slate-200 rounded-lg bg-white p-2 ${className}`}>
          <polygon points="20,20 60,20 60,60 20,60" fill="none" stroke="#64748b" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="60" y2="60" stroke="#64748b" strokeWidth="1.5" />
        </svg>
      );

    default:
      return (
        <div className="w-16 h-16 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-400 font-mono">
          Figure
        </div>
      );
  }
};
