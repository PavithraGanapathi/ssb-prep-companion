import { useState, useEffect, useMemo } from 'react';
import type React from 'react';
import {
  Clock,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  Flag,
  ShieldCheck,
  ListOrdered,
  FileText,
  Trash2,
  Eye,
  EyeOff,
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { OBJECTIVE_KNOWLEDGE_QUESTIONS } from '../data/objectiveQuestions';
import type { ObjectiveQuestion } from '../data/objectiveQuestions';

// LocalStorage Keys
const MOCK_KNOWLEDGE_HISTORY_KEY = 'ssb_mock_knowledge_history_v1';
const INTERVIEW_SESSIONS_KEY = 'ssb_interview_sessions_v1';

// Types for Objective Mock Test
interface MockTestAttempt {
  id: string;
  date: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  categoryScores: Record<string, { correct: number; total: number }>;
  userAnswers: Record<string, string>;
  questions: ObjectiveQuestion[];
}

// Rule-Based Interview Question Definition
interface InterviewPrompt {
  id: string;
  stage: 'CIQ 1: Education & Friends' | 'CIQ 2: Family & Daily Life' | 'Naval Motivation' | 'Situational Leadership';
  title: string;
  prompt: string;
  subQuestions: string[];
  assessorFocus: string[];
  suggestedFramework: string;
}

const INTERVIEW_PROMPTS: InterviewPrompt[] = [
  {
    id: 'int-1',
    stage: 'CIQ 1: Education & Friends',
    title: 'Comprehensive Interview Question 1 (Academic Trajectory & Peers)',
    prompt: 'Listen carefully and answer these questions in exact sequence:',
    subQuestions: [
      'Tell me about your academic performance starting from 10th standard up to your highest qualification, explaining any fluctuations in marks.',
      'Which subjects did you enjoy the most and which did you struggle with? How did you overcome those difficulties?',
      'Who was your favourite teacher and why? Mention one teacher you did not get along with and why.',
      'Tell me about your closest friends, what qualities you share with them, and one habit in each that you dislike.'
    ],
    assessorFocus: [
      'Sequential memory and composure under multi-part questioning',
      'Realistic and honest explanation of academic drops without blaming external factors',
      'Constructive interpersonal relationships and mature handling of teacher/peer differences'
    ],
    suggestedFramework: 'State scores chronologically. Acknowledge academic challenges with concrete solutions applied. Praise genuine mentor qualities. Highlight mutual respect with friends while honestly stating minor irritations.'
  },
  {
    id: 'int-2',
    stage: 'CIQ 2: Family & Daily Life',
    title: 'Comprehensive Interview Question 2 (Family Dynamics & Routine)',
    prompt: 'Provide a structured account covering:',
    subQuestions: [
      'Tell me about your family members, their professions, and your relationship with each of them.',
      'Whom in your family are you closest to, and whom do you approach when facing a tough personal decision?',
      'How do you manage your monthly personal expenses and pocket money? Have you ever contributed financially at home?',
      'Walk me through your daily routine on a regular weekday and a weekend, including your physical activities and leisure time.'
    ],
    assessorFocus: [
      'Emotional attachment, filial responsibility, and family integration',
      'Financial prudence, self-reliance, and accountability',
      'Constructive use of spare time, physical fitness habits, and consistency of routine'
    ],
    suggestedFramework: 'Present family structure clearly. Express sincere affection with specific examples. Detail budgeting or savings methods. Walk through a realistic hour-by-hour day showing physical exercise and productive hobbies.'
  },
  {
    id: 'int-3',
    stage: 'Naval Motivation',
    title: 'Naval Service Motivation & Awareness',
    prompt: 'Address the core reasons behind your naval career ambition:',
    subQuestions: [
      'Why specifically do you want to join the Indian Navy rather than the Army, Air Force, or a civilian corporate career?',
      'Which branch (Executive, Engineering, Electrical, or Education) have you applied for, and what are the primary duties of an officer in that branch at sea?',
      'Tell me about two recent major acquisitions or operational missions carried out by the Indian Navy in the Indian Ocean Region.',
      'What alternative career plan do you have if you are not recommended in this SSB attempt?'
    ],
    assessorFocus: [
      'Genuine, intrinsic motivation for naval service versus superficial or glamorous motives',
      'Factual clarity on naval officer roles, shipboard duties, and branch specialisations',
      'Awareness of contemporary maritime security challenges and realistic backup career planning'
    ],
    suggestedFramework: 'Differentiate the maritime seafaring dimension from terrestrial warfare. Describe specific shipboard responsibilities (e.g. Officer of the Watch duties). Reference verified operations (e.g. anti-piracy missions). State a mature backup plan without losing commitment.'
  },
  {
    id: 'int-4',
    stage: 'Situational Leadership',
    title: 'Operational Decision Making & Situational Stress',
    prompt: 'Consider these high-pressure scenarios and explain your direct course of action:',
    subQuestions: [
      'Suppose you are leading a 5-member team on an outdoor coastal trekking exercise. One member twists their ankle and night is falling with poor weather approaching. What steps will you take?',
      'You observe a peer or colleague intentionally violating a safety regulation on board or during an exercise to finish a task early. How do you address the situation?',
      'You are placed in charge of organising a major inter-college technical festival with a limited budget and uncooperative committee members. How will you ensure the event succeeds?'
    ],
    assessorFocus: [
      'Organising ability, initiative, and determination in crisis',
      'Moral courage, commitment to safety, and peer leadership without arrogance',
      'Team cohesion, resourcefulness, and practical problem solving under constraints'
    ],
    suggestedFramework: 'Apply STAR (Situation, Task, Action, Result). State immediate triage and safety first. Assign clear tasks to peers. Use calm, assertive communication. Emphasise mission accomplishment while safeguarding team welfare.'
  }
];

interface InterviewResponseLog {
  promptId: string;
  stage: string;
  title: string;
  responseText: string;
  selfRatings: {
    followedSequence: boolean;
    coveredAllParts: boolean;
    structuredSTAR: boolean;
    balancedAndHonest: boolean;
  };
  timeTakenSeconds: number;
}

interface SavedInterviewSession {
  id: string;
  date: string;
  responses: InterviewResponseLog[];
}

export const MockInterviewPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'objective' | 'simulator'>('objective');

  // ==========================================
  // OBJECTIVE MOCK TEST STATE
  // ==========================================
  const [testPhase, setTestPhase] = useState<'setup' | 'running' | 'summary' | 'history'>('setup');
  const [selectedQuestionCount, setSelectedQuestionCount] = useState<number>(10);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isTimed, setIsTimed] = useState<boolean>(true);

  const [activeQuestions, setActiveQuestions] = useState<ObjectiveQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reviewedQuestionIds, setReviewedQuestionIds] = useState<Set<string>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(600); // 10 mins default
  const [startTime, setStartTime] = useState<number>(0);

  const [completedAttempt, setCompletedAttempt] = useState<MockTestAttempt | null>(null);
  const [testHistory, setTestHistory] = useState<MockTestAttempt[]>([]);

  // Load test history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MOCK_KNOWLEDGE_HISTORY_KEY);
      if (stored) {
        setTestHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Timer for Running Objective Test
  useEffect(() => {
    if (testPhase !== 'running' || !isTimed) return;

    if (secondsRemaining <= 0) {
      handleFinishTest();
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testPhase, isTimed, secondsRemaining]);

  // Start Objective Mock Test
  const handleStartTest = () => {
    let pool = [...OBJECTIVE_KNOWLEDGE_QUESTIONS];
    if (selectedCategory !== 'All') {
      pool = pool.filter(q => q.category === selectedCategory);
    }

    // Shuffle pool
    const shuffled = pool.sort(() => Math.random() - 0.5);
    const chosen = shuffled.slice(0, Math.min(selectedQuestionCount, shuffled.length));

    setActiveQuestions(chosen);
    setCurrentIndex(0);
    setAnswers({});
    setReviewedQuestionIds(new Set());
    setSecondsRemaining(chosen.length * 60); // 60 seconds per question
    setStartTime(Date.now());
    setTestPhase('running');
  };

  // Select Option in Running Test
  const handleSelectOption = (optionId: string) => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  // Toggle Review
  const handleToggleReview = () => {
    const currentQ = activeQuestions[currentIndex];
    if (!currentQ) return;
    setReviewedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(currentQ.id)) {
        next.delete(currentQ.id);
      } else {
        next.add(currentQ.id);
      }
      return next;
    });
  };

  // Finish and Grade Objective Test
  const handleFinishTest = () => {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    let correctCount = 0;
    const catScores: Record<string, { correct: number; total: number }> = {};

    activeQuestions.forEach(q => {
      if (!catScores[q.category]) {
        catScores[q.category] = { correct: 0, total: 0 };
      }
      catScores[q.category].total += 1;

      if (answers[q.id] === q.correctOptionId) {
        correctCount += 1;
        catScores[q.category].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / activeQuestions.length) * 100);

    const attempt: MockTestAttempt = {
      id: `mock-att-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      totalQuestions: activeQuestions.length,
      score: correctCount,
      percentage,
      timeSpentSeconds: elapsed,
      categoryScores: catScores,
      userAnswers: answers,
      questions: activeQuestions
    };

    setCompletedAttempt(attempt);

    // Save to test history
    const updatedHistory = [attempt, ...testHistory].slice(0, 20);
    setTestHistory(updatedHistory);
    try {
      localStorage.setItem(MOCK_KNOWLEDGE_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch {
      // Ignore
    }

    setTestPhase('summary');
  };

  // ==========================================
  // RULE-BASED INTERVIEW SIMULATOR STATE
  // ==========================================
  const [interviewStageIndex, setInterviewStageIndex] = useState<number>(0);
  const [interviewText, setInterviewText] = useState<string>('');
  const [showFramework, setShowFramework] = useState<boolean>(false);
  const [interviewRatings, setInterviewRatings] = useState({
    followedSequence: false,
    coveredAllParts: false,
    structuredSTAR: false,
    balancedAndHonest: false
  });
  const [sessionResponses, setSessionResponses] = useState<InterviewResponseLog[]>([]);
  const [interviewTimerSeconds, setInterviewTimerSeconds] = useState<number>(0);
  const [isInterviewTimerRunning, setIsInterviewTimerRunning] = useState<boolean>(false);
  const [savedInterviewSessions, setSavedInterviewSessions] = useState<SavedInterviewSession[]>([]);
  const [selectedViewSession, setSelectedViewSession] = useState<SavedInterviewSession | null>(null);

  // Load interview sessions
  useEffect(() => {
    try {
      const stored = localStorage.getItem(INTERVIEW_SESSIONS_KEY);
      if (stored) {
        setSavedInterviewSessions(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Interview timer increment
  useEffect(() => {
    if (!isInterviewTimerRunning) return;
    const interval = setInterval(() => {
      setInterviewTimerSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isInterviewTimerRunning]);

  const currentPrompt = INTERVIEW_PROMPTS[interviewStageIndex];

  const handleStartInterviewPrompt = () => {
    setIsInterviewTimerRunning(true);
    setInterviewTimerSeconds(0);
  };

  const handleSaveInterviewTurn = () => {
    if (!currentPrompt) return;

    const log: InterviewResponseLog = {
      promptId: currentPrompt.id,
      stage: currentPrompt.stage,
      title: currentPrompt.title,
      responseText: interviewText,
      selfRatings: interviewRatings,
      timeTakenSeconds: interviewTimerSeconds
    };

    const nextResponses = [...sessionResponses, log];
    setSessionResponses(nextResponses);
    setInterviewText('');
    setInterviewRatings({
      followedSequence: false,
      coveredAllParts: false,
      structuredSTAR: false,
      balancedAndHonest: false
    });
    setInterviewTimerSeconds(0);
    setIsInterviewTimerRunning(false);

    if (interviewStageIndex < INTERVIEW_PROMPTS.length - 1) {
      setInterviewStageIndex(prev => prev + 1);
    } else {
      // Completed all 4 stages
      const newSession: SavedInterviewSession = {
        id: `session-${Date.now()}`,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        responses: nextResponses
      };
      const updated = [newSession, ...savedInterviewSessions].slice(0, 10);
      setSavedInterviewSessions(updated);
      try {
        localStorage.setItem(INTERVIEW_SESSIONS_KEY, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      setSelectedViewSession(newSession);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const activeQuestion = activeQuestions[currentIndex];

  const availableCategories = useMemo(() => {
    const cats = new Set(OBJECTIVE_KNOWLEDGE_QUESTIONS.map(q => q.category));
    return ['All', ...Array.from(cats)];
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Top Banner: Strict Non-AI & Rule-Based Practice Verification */}
      <div className="rounded-xl bg-slate-900 border border-[#d4af37]/30 p-4 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-lg bg-[#102a4c] text-[#e5c158] border border-[#d4af37]/40 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                Naval Assessment & Interview Simulator
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Rule-Based System
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              100% deterministic local practice. No AI APIs, external dependencies, or fabricated scoring.
            </p>
          </div>
        </div>

        {/* Tab switch between Objective Mock Test & Rule-based IO Simulator */}
        <div className="flex items-center bg-[#0a192f] p-1 rounded-lg border border-slate-700 shrink-0">
          <button
            onClick={() => setActiveTab('objective')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'objective'
                ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Objective Mock Test
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              activeTab === 'simulator'
                ? 'bg-[#d4af37] text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Rule-Based IO Interview
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: OBJECTIVE KNOWLEDGE MOCK TEST                    */}
      {/* ======================================================== */}
      {activeTab === 'objective' && (
        <div className="space-y-6">
          {/* Phase: Setup */}
          {testPhase === 'setup' && (
            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Naval & Defence Knowledge Test Configuration
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Test your factual command over Indian Navy ships, ranks, maritime strategy, and defence tech.
                  </p>
                </div>
                {testHistory.length > 0 && (
                  <button
                    onClick={() => setTestPhase('history')}
                    className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 self-start sm:self-auto"
                  >
                    <ListOrdered className="w-3.5 h-3.5" />
                    <span>View Past Attempts ({testHistory.length})</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Question count */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
                    Number of Questions
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 15, 20].map(count => (
                      <button
                        key={count}
                        onClick={() => setSelectedQuestionCount(count)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                          selectedQuestionCount === count
                            ? 'bg-[#0a192f] text-[#e5c158] border-[#0a192f]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-indigo-600" />
                    Subject Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                  >
                    {availableCategories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timer Mode */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    Pacing Mode
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsTimed(true)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                        isTimed
                          ? 'bg-[#0a192f] text-[#e5c158] border-[#0a192f]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Timed (60s / Q)
                    </button>
                    <button
                      onClick={() => setIsTimed(false)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                        !isTimed
                          ? 'bg-[#0a192f] text-[#e5c158] border-[#0a192f]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Untimed (Study)
                    </button>
                  </div>
                </div>
              </div>

              {/* Rules banner */}
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#b48a28]" />
                  Objective Examination Rules:
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  <li>Each question carries 1 positive mark. No negative marking is applied for skipped questions.</li>
                  <li>You can mark questions for review and jump across the palette at any time.</li>
                  <li>Comprehensive explanations with official reference facts are displayed immediately upon submission.</li>
                </ul>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleStartTest}
                  className="px-6 py-2.5 bg-[#0a192f] text-[#e5c158] rounded-xl font-bold text-sm hover:bg-[#102a4c] transition-all shadow-sm border border-[#d4af37]/40 flex items-center gap-2"
                >
                  <span>Begin Mock Test</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Phase: Running Test */}
          {testPhase === 'running' && activeQuestion && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Screen */}
              <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                {/* Header bar */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 rounded-t-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Question {currentIndex + 1} of {activeQuestions.length}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {activeQuestion.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {isTimed && (
                      <div
                        className={`flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                          secondsRemaining < 60
                            ? 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
                            : 'bg-white text-slate-800 border-slate-300'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatSeconds(secondsRemaining)}</span>
                      </div>
                    )}
                    <button
                      onClick={handleToggleReview}
                      className={`text-xs font-semibold px-2.5 py-1 rounded border flex items-center gap-1 transition-all ${
                        reviewedQuestionIds.has(activeQuestion.id)
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <Flag className="w-3 h-3" />
                      <span>{reviewedQuestionIds.has(activeQuestion.id) ? 'Marked' : 'Review'}</span>
                    </button>
                  </div>
                </div>

                {/* Question body */}
                <div className="p-6 flex-1 space-y-6">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {activeQuestion.question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuestion.options.map(opt => {
                      const isSelected = answers[activeQuestion.id] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(opt.id)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center gap-3.5 ${
                            isSelected
                              ? 'bg-[#0a192f] text-white border-[#0a192f] shadow-sm'
                              : 'bg-slate-50/60 text-slate-800 border-slate-200 hover:bg-slate-100/80 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-[#d4af37] text-slate-950 border-[#d4af37]'
                                : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            {opt.label}
                          </span>
                          <span className="text-xs sm:text-sm font-medium">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-slate-200 bg-slate-50/50 rounded-b-xl flex items-center justify-between">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex(prev => prev - 1)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {answers[activeQuestion.id] && (
                      <button
                        onClick={() => {
                          setAnswers(prev => {
                            const next = { ...prev };
                            delete next[activeQuestion.id];
                            return next;
                          });
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1"
                      >
                        Clear Response
                      </button>
                    )}

                    {currentIndex < activeQuestions.length - 1 ? (
                      <button
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                        className="px-4 py-1.5 bg-[#0a192f] text-[#e5c158] rounded-lg text-xs font-bold hover:bg-[#102a4c] transition-all flex items-center gap-1"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleFinishTest}
                        className="px-4 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold hover:bg-emerald-800 transition-all shadow-sm"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Side Palette */}
              <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Question Palette
                    </h5>
                    <span className="text-xs text-slate-600 font-medium">
                      {Object.keys(answers).length}/{activeQuestions.length} Answered
                    </span>
                  </div>

                  {/* Grid of buttons */}
                  <div className="grid grid-cols-5 gap-2">
                    {activeQuestions.map((q, idx) => {
                      const isCurrent = idx === currentIndex;
                      const isAnswered = Boolean(answers[q.id]);
                      const isReviewed = reviewedQuestionIds.has(q.id);

                      let bgClass = 'bg-slate-100 text-slate-700 border-slate-200';
                      if (isAnswered) bgClass = 'bg-emerald-600 text-white border-emerald-600';
                      if (isReviewed) bgClass = 'bg-amber-500 text-white border-amber-500';
                      if (isCurrent) bgClass = 'ring-2 ring-[#0a192f] ring-offset-2 ' + bgClass;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition-all border ${bgClass}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-emerald-600 shrink-0"></span>
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-amber-500 shrink-0"></span>
                      <span>Review</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-slate-200 shrink-0"></span>
                      <span>Unanswered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded border-2 border-slate-800 shrink-0"></span>
                      <span>Current</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={handleFinishTest}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Grade Test</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Phase: Summary & Full Review */}
          {testPhase === 'summary' && completedAttempt && (
            <div className="space-y-6">
              {/* Score header card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Objective Test Diagnostic Report
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      Score: {completedAttempt.score} / {completedAttempt.totalQuestions} ({completedAttempt.percentage}%)
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Completed on {completedAttempt.date} in {formatSeconds(completedAttempt.timeSpentSeconds)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleStartTest}
                      className="px-4 py-2 bg-[#0a192f] text-[#e5c158] rounded-xl text-xs font-bold hover:bg-[#102a4c] transition-all flex items-center gap-1.5 border border-[#d4af37]/40 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake New Test</span>
                    </button>
                    <button
                      onClick={() => setTestPhase('setup')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                    >
                      Back to Setup
                    </button>
                  </div>
                </div>

                {/* Categorical Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  {Object.entries(completedAttempt.categoryScores).map(([category, stats]) => (
                    <div key={category} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <div className="text-[11px] font-semibold text-slate-600 truncate">{category}</div>
                      <div className="text-base font-bold text-slate-900 mt-1">
                        {stats.correct} / {stats.total}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {Math.round((stats.correct / stats.total) * 100)}% Accuracy
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Question Review List */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Question-by-Question Review & Explanations
                </h4>

                <div className="space-y-4">
                  {completedAttempt.questions.map((q, idx) => {
                    const candidateAns = completedAttempt.userAnswers[q.id];
                    const isCorrect = candidateAns === q.correctOptionId;
                    const isSkipped = !candidateAns;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border ${
                          isCorrect
                            ? 'bg-emerald-50/40 border-emerald-200'
                            : isSkipped
                            ? 'bg-slate-50 border-slate-200'
                            : 'bg-rose-50/40 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-800">Q{idx + 1}.</span>
                            <span className="text-xs font-semibold text-slate-900">{q.question}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : isSkipped
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                            }`}
                          >
                            {isCorrect ? 'Correct' : isSkipped ? 'Skipped' : 'Incorrect'}
                          </span>
                        </div>

                        {/* Options comparison */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-xs">
                          {q.options.map(opt => {
                            const isCandidateChoice = candidateAns === opt.id;
                            const isActualCorrect = q.correctOptionId === opt.id;

                            let optStyle = 'bg-white/70 border-slate-200 text-slate-700';
                            if (isActualCorrect) optStyle = 'bg-emerald-100/90 border-emerald-300 font-bold text-emerald-950';
                            if (isCandidateChoice && !isActualCorrect) optStyle = 'bg-rose-100/90 border-rose-300 font-bold text-rose-950';

                            return (
                              <div
                                key={opt.id}
                                className={`p-2 rounded-lg border flex items-center justify-between gap-2 ${optStyle}`}
                              >
                                <span>
                                  {opt.label}. {opt.text}
                                </span>
                                {isActualCorrect && (
                                  <span className="text-[10px] uppercase font-bold text-emerald-800">Correct Answer</span>
                                )}
                                {isCandidateChoice && !isActualCorrect && (
                                  <span className="text-[10px] uppercase font-bold text-rose-800">Your Choice</span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                          <span className="font-bold text-slate-900">Official Naval Reference: </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Phase: Past Attempts History */}
          {testPhase === 'history' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Objective Mock Test Attempt Logs ({testHistory.length})
                </h3>
                <button
                  onClick={() => setTestPhase('setup')}
                  className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
                >
                  Back to Test Setup
                </button>
              </div>

              {testHistory.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No mock test attempts recorded yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {testHistory.map(att => (
                    <div key={att.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Score: {att.score} / {att.totalQuestions} ({att.percentage}%)
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {att.date} • Duration: {formatSeconds(att.timeSpentSeconds)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setCompletedAttempt(att);
                            setTestPhase('summary');
                          }}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                        >
                          View Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: RULE-BASED PIQ INTERVIEW SIMULATOR               */}
      {/* ======================================================== */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Disclaimer & Guide */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Interviewing Officer (IO) Rule-Based Simulator: </span>
              In the real SSB interview, the IO probes your personal background through structured rapid-fire CIQs.
              Answer without looking at references. Type your complete response, test your response time, and rate yourself against the structured assessor rubric.
            </div>
          </div>

          {/* Main Interview Practice Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 8 Cols: IO Console & Response Box */}
            <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50/80 rounded-t-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Stage {interviewStageIndex + 1} of {INTERVIEW_PROMPTS.length}:
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#0a192f] text-[#e5c158]">
                    {currentPrompt.stage}
                  </span>
                </div>

                {/* Stage switcher */}
                <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
                  {INTERVIEW_PROMPTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setInterviewStageIndex(idx);
                        setInterviewText('');
                        setIsInterviewTimerRunning(false);
                        setInterviewTimerSeconds(0);
                      }}
                      className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap transition-all ${
                        interviewStageIndex === idx
                          ? 'bg-[#0a192f] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Stage {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* IO Question Card */}
              <div className="p-6 space-y-4 border-b border-slate-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{currentPrompt.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 italic">{currentPrompt.prompt}</p>
                  </div>

                  {/* Stopwatch button */}
                  <div className="shrink-0 flex items-center gap-2">
                    <div className="flex items-center gap-1 font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-800">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{formatSeconds(interviewTimerSeconds)}</span>
                    </div>
                    {!isInterviewTimerRunning ? (
                      <button
                        onClick={handleStartInterviewPrompt}
                        className="px-2.5 py-1 bg-[#0a192f] text-white rounded text-[11px] font-semibold hover:bg-[#102a4c]"
                      >
                        Start Timer
                      </button>
                    ) : (
                      <button
                        onClick={() => setIsInterviewTimerRunning(false)}
                        className="px-2.5 py-1 bg-amber-600 text-white rounded text-[11px] font-semibold hover:bg-amber-700"
                      >
                        Pause
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub questions list */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {currentPrompt.subQuestions.map((sub, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <span className="font-bold text-[#b48a28] shrink-0">{sIdx + 1}.</span>
                      <span className="font-medium leading-relaxed">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Typed Response Box */}
              <div className="p-6 flex-1 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Cadet Typed Response (Simulate Spoken Narrative)
                  </label>
                  <span className="text-[11px] text-slate-600 font-mono">
                    {interviewText.split(/\s+/).filter(Boolean).length} words
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={interviewText}
                  onChange={e => setInterviewText(e.target.value)}
                  placeholder="Type your structured response to the Interviewing Officer here. Maintain sequence from the first question to the last..."
                  className="w-full p-4 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f] leading-relaxed resize-y bg-slate-50/50"
                />

                {/* Self Evaluation Rubric */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800 flex items-center justify-between">
                    <span>Self-Assessment Checklist:</span>
                    <button
                      type="button"
                      onClick={() => setShowFramework(prev => !prev)}
                      className="text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-1"
                    >
                      {showFramework ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showFramework ? 'Hide Guidelines' : 'View Recommended Framework'}</span>
                    </button>
                  </div>

                  {showFramework && (
                    <div className="p-3 bg-white rounded-lg border border-indigo-200 text-xs text-slate-700 space-y-2">
                      <div className="font-semibold text-indigo-950">Recommended Answering Framework:</div>
                      <p className="text-slate-600 leading-relaxed">{currentPrompt.suggestedFramework}</p>
                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">IO Core Focus: </span>
                        {currentPrompt.assessorFocus.join(' • ')}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={interviewRatings.followedSequence}
                        onChange={e =>
                          setInterviewRatings(r => ({ ...r, followedSequence: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                      />
                      <span>Answered in exact sequence</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={interviewRatings.coveredAllParts}
                        onChange={e =>
                          setInterviewRatings(r => ({ ...r, coveredAllParts: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                      />
                      <span>Covered all sub-questions</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={interviewRatings.structuredSTAR}
                        onChange={e =>
                          setInterviewRatings(r => ({ ...r, structuredSTAR: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                      />
                      <span>Applied structured STAR narrative</span>
                    </label>

                    <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={interviewRatings.balancedAndHonest}
                        onChange={e =>
                          setInterviewRatings(r => ({ ...r, balancedAndHonest: e.target.checked }))
                        }
                        className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                      />
                      <span>Honest without making excuses</span>
                    </label>
                  </div>
                </div>

                {/* Turn Save Button */}
                <div className="pt-2 flex justify-end gap-3">
                  <button
                    disabled={!interviewText.trim()}
                    onClick={handleSaveInterviewTurn}
                    className="px-5 py-2.5 bg-[#0a192f] text-[#e5c158] rounded-xl font-bold text-xs hover:bg-[#102a4c] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm border border-[#d4af37]/30 flex items-center gap-2"
                  >
                    <span>
                      {interviewStageIndex < INTERVIEW_PROMPTS.length - 1
                        ? 'Save & Proceed to Next Stage'
                        : 'Complete & Save Full Interview Session'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Assessment Criteria & Saved Sessions */}
            <div className="lg:col-span-4 space-y-6">
              {/* OLQ Rubric Box */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#b48a28]" />
                  <h4 className="text-sm font-bold text-slate-900">IO Assessment Rubric</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The Interviewing Officer assesses candidate potential across four factor groups:
                </p>

                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900">Factor I (Planning & Organising): </span>
                    <span className="text-slate-600">Effective intelligence, reasoning ability, and organising speed under pressure.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900">Factor II (Social Adjustment): </span>
                    <span className="text-slate-600">Social adaptability, cooperation with crew and superiors, and sense of responsibility.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900">Factor III (Social Effectiveness): </span>
                    <span className="text-slate-600">Initiative, self-confidence, speed of decision, and ability to influence peers.</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900">Factor IV (Dynamic / Courage): </span>
                    <span className="text-slate-600">Liveliness, determination, and stamina during long sea patrols and operational crisis.</span>
                  </div>
                </div>
              </div>

              {/* Saved Sessions Log */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Saved Interview Logs ({savedInterviewSessions.length})
                  </h4>
                  {savedInterviewSessions.length > 0 && (
                    <button
                      onClick={() => {
                        localStorage.removeItem(INTERVIEW_SESSIONS_KEY);
                        setSavedInterviewSessions([]);
                        setSelectedViewSession(null);
                      }}
                      className="text-[11px] text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>

                {savedInterviewSessions.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-500">
                    No completed interview transcripts saved yet.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                    {savedInterviewSessions.map(session => (
                      <div
                        key={session.id}
                        onClick={() => setSelectedViewSession(session)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          selectedViewSession?.id === session.id
                            ? 'bg-[#0a192f] text-white border-[#0a192f]'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="text-xs font-bold">{session.date}</div>
                        <div className="text-[11px] opacity-80 mt-0.5">
                          {session.responses.length} Stages Completed
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modal / Card to inspect saved interview response */}
          {selectedViewSession && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Archived Session Review
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Interview Session from {selectedViewSession.date}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedViewSession(null)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Close Archive
                </button>
              </div>

              <div className="space-y-4">
                {selectedViewSession.responses.map((resp, rIdx) => (
                  <div key={rIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0a192f]">{resp.title}</span>
                      <span className="text-[11px] font-mono text-slate-500">
                        Duration: {formatSeconds(resp.timeTakenSeconds)}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      {resp.responseText}
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] pt-1">
                      <span
                        className={`px-2 py-0.5 rounded font-semibold ${
                          resp.selfRatings.followedSequence ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        Sequence: {resp.selfRatings.followedSequence ? 'Yes' : 'No'}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-semibold ${
                          resp.selfRatings.coveredAllParts ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        All Parts: {resp.selfRatings.coveredAllParts ? 'Yes' : 'No'}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-semibold ${
                          resp.selfRatings.structuredSTAR ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        STAR: {resp.selfRatings.structuredSTAR ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
