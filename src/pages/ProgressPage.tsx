import { useState, useEffect, useMemo } from 'react';
import type React from 'react';
import { INITIAL_OLQS } from '../data/olqData';
import type { OLQ } from '../types';
import {
  TrendingUp,
  Star,
  Target,
  Compass,
  Brain,
  HelpCircle,
  Award,
  RotateCcw,
  AlertTriangle,
  Trash2,
  BarChart3
} from 'lucide-react';
import { getRealAppMetrics } from '../utils/activityTracker';

const OLQ_RATINGS_KEY = 'ssb_olq_ratings_v1';

export const ProgressPage: React.FC = () => {
  const [olqs, setOlqs] = useState<OLQ[]>(() => {
    try {
      const saved = localStorage.getItem(OLQ_RATINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === INITIAL_OLQS.length) {
          return parsed;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_OLQS;
  });

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [metricsVersion, setMetricsVersion] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(OLQ_RATINGS_KEY, JSON.stringify(olqs));
    } catch (e) {
      console.error(e);
    }
  }, [olqs]);

  const metrics = useMemo(() => {
    return getRealAppMetrics();
  }, [metricsVersion]);

  const handleRatingChange = (id: string, newRating: number) => {
    setOlqs(prev =>
      prev.map(item => (item.id === id ? { ...item, rating: newRating } : item))
    );
  };

  const handleResetAllProgress = () => {
    try {
      localStorage.removeItem('ssb_oir_test_history_v1');
      localStorage.removeItem('ssb_psych_records_v1');
      localStorage.removeItem('ssb_qbank_completed_v1');
      localStorage.removeItem('ssb_qbank_bookmarks_v1');
      localStorage.removeItem('ssb_mock_knowledge_history_v1');
      localStorage.removeItem('ssb_interview_sessions_v1');
      localStorage.removeItem('ssb_lecturette_sessions_v1');
      localStorage.removeItem('ssb_activity_log_v1');
      setOlqs(INITIAL_OLQS);
      setMetricsVersion(v => v + 1);
    } catch (e) {
      console.error('Reset error:', e);
    }
    setIsResetModalOpen(false);
  };

  const factors = [
    'Factor I: Planning & Organizing',
    'Factor II: Social Adjustment',
    'Factor III: Social Effectiveness',
    'Factor IV: Dynamic'
  ] as const;

  // Calculate average rating overall
  const overallAvg = (
    olqs.reduce((acc, curr) => acc + curr.rating, 0) / olqs.length
  ).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0a192f] text-[#d4af37]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">15 Officer Like Qualities (OLQ) Matrix</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  DIPR Standards
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-0.5">
                Self-evaluate your readiness across the 4 psychological and behavioural factors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-auto">
            <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  Self-Rating Average
                </div>
                <div className="text-xl font-black text-[#0a192f]">{overallAvg} / 5.0</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#0a192f] text-[#e5c158] flex items-center justify-center font-bold text-sm">
                ★
              </div>
            </div>

            <button
              onClick={() => setIsResetModalOpen(true)}
              className="p-3 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 rounded-xl border border-slate-200 transition-colors"
              title="Reset Saved Practice Records"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Real Preparation Activity Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0a192f]" />
            <h3 className="font-bold text-slate-900 text-sm">Live Preparation Activity Records</h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Aggregated from browser LocalStorage
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              <span>OIR Mock Tests</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{metrics.oirTestsTaken}</div>
            <div className="text-[11px] text-slate-500">
              {metrics.oirTestsTaken > 0 ? `Average Accuracy: ${metrics.oirAverageScore}%` : 'No attempts yet'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Brain className="w-3.5 h-3.5 text-blue-600" />
              <span>Psychology Drills</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{metrics.psychRecordsCount}</div>
            <div className="text-[11px] text-slate-500">
              PPDT, TAT, WAT, SRT & SDT
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Question Bank</span>
            </div>
            <div className="text-2xl font-black text-slate-900">
              {metrics.qbankCompletedCount} <span className="text-xs text-slate-500 font-normal">/ 24</span>
            </div>
            <div className="text-[11px] text-slate-500">
              {metrics.qbankBookmarksCount} saved for revision
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Knowledge Tests</span>
            </div>
            <div className="text-2xl font-black text-slate-900">{metrics.objectiveTestsTaken}</div>
            <div className="text-[11px] text-slate-500">
              {metrics.objectiveLatestScore
                ? `Latest: ${metrics.objectiveLatestScore.score}/${metrics.objectiveLatestScore.total} (${metrics.objectiveLatestScore.percentage}%)`
                : 'No tests taken yet'}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Factor Breakdown */}
      <div className="space-y-6">
        {factors.map(factorName => {
          const factorOlqs = olqs.filter(o => o.factor === factorName);
          const factorAvg = (
            factorOlqs.reduce((acc, curr) => acc + curr.rating, 0) / factorOlqs.length
          ).toFixed(1);

          return (
            <div
              key={factorName}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-[#0a192f]">{factorName}</h3>
                  <span className="text-xs text-slate-700">
                    Assessed across Psychology, GTO Grounds, and Interview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">Factor Score:</span>
                  <span className="text-sm font-extrabold text-[#0a192f] bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {factorAvg} / 5.0
                  </span>
                </div>
              </div>

              {/* Qualities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {factorOlqs.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingChange(item.id, star)}
                              className="focus:outline-none transition-transform hover:scale-110"
                              title={`Rate ${star}/5`}
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= item.rating
                                    ? 'fill-amber-400 text-amber-500'
                                    : 'text-slate-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed mb-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-700">
                        Tested In:
                      </span>
                      {item.assessedIn.map(test => (
                        <span
                          key={test}
                          className="text-[10px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200"
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Milestone Roadmap */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#0a192f]" />
          <h3 className="font-bold text-slate-900 text-base">Preparation Milestones to Dec 28, 2026</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-bold uppercase text-emerald-800">Stage 1</span>
            <div className="font-bold text-slate-900 mt-1">Foundational Fitness & OIR Drills</div>
            <p className="text-slate-600 mt-1 text-[11px]">Achieve sub-24m 5K & 95%+ accuracy on OIR verbal/non-verbal.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-200">
            <span className="text-[10px] font-bold uppercase text-sky-800">Stage 2</span>
            <div className="font-bold text-slate-900 mt-1">Psychology Battery Fluency</div>
            <p className="text-slate-600 mt-1 text-[11px]">Complete 50+ TAT stories and daily 60-word WAT rapid sprints.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200">
            <span className="text-[10px] font-bold uppercase text-amber-800">Stage 3</span>
            <div className="font-bold text-slate-900 mt-1">Maritime Knowledge & PIQ Clarity</div>
            <p className="text-slate-600 mt-1 text-[11px]">Master naval commands, ship classes, and honest introspection of PIQ.</p>
          </div>

          <div className="p-3.5 rounded-lg bg-purple-50 border border-purple-200">
            <span className="text-[10px] font-bold uppercase text-purple-800">Stage 4</span>
            <div className="font-bold text-slate-900 mt-1">Final Board Simulation</div>
            <p className="text-slate-600 mt-1 text-[11px]">Timed Lecturettes, stress interviews, and peak confidence for Dec 28.</p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal to Reset Progress */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">Reset Progress Records?</h4>
                <p className="text-xs text-slate-500">This action will clear your test histories.</p>
              </div>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
              <p>The following local records will be reset to default:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>OIR practice and mock test attempts</li>
                <li>Psychology written responses (PPDT, TAT, WAT, SRT, SDT)</li>
                <li>Question bank completion ticks and bookmarks</li>
                <li>Objective knowledge test histories</li>
                <li>Saved interview and lecturette transcripts</li>
                <li>Self-rated OLQ matrix (reset to baseline)</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAllProgress}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
