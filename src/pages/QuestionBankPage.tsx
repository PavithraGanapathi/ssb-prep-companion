import { useState, useEffect } from 'react';
import type React from 'react';
import { SAMPLE_QUESTIONS } from '../data/sampleQuestions';
import type { QuestionCategory, QuestionItem } from '../types';
import {
  HelpCircle,
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Compass,
  Shuffle,
  CheckCircle2,
  Circle,
  Info,
  Layers,
  Filter
} from 'lucide-react';

const BOOKMARK_KEY = 'ssb_qbank_bookmarks_v1';
const COMPLETED_KEY = 'ssb_qbank_completed_v1';

export const QuestionBankPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Completed' | 'Pending'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(SAMPLE_QUESTIONS[0]?.id || null);

  // Persistence in LocalStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARK_KEY);
      return saved ? JSON.parse(saved) : ['q-pi-1', 'q-navy-1'];
    } catch {
      return ['q-pi-1', 'q-navy-1'];
    }
  });

  const [completedIds, setCompletedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_KEY);
      return saved ? JSON.parse(saved) : ['q-sib-1'];
    } catch {
      return ['q-sib-1'];
    }
  });

  // Anti-repetition queue for random mode
  const [recentRandomIds, setRecentRandomIds] = useState<string[]>([]);
  const [randomModalQuestion, setRandomModalQuestion] = useState<QuestionItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(completedIds));
    } catch (e) {
      console.error(e);
    }
  }, [completedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id: string) => {
    setCompletedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleRandomQuestion = () => {
    // Exclude recently shown questions if pool allows
    const available = SAMPLE_QUESTIONS.filter(q => !recentRandomIds.includes(q.id));
    const pool = available.length > 0 ? available : SAMPLE_QUESTIONS;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];

    setRandomModalQuestion(randomPick);
    setRecentRandomIds(prev => [...prev.slice(-10), randomPick.id]);
  };

  const categories: ('All' | QuestionCategory)[] = [
    'All',
    'Personal Interview Questions',
    'Self-Introduction & Background',
    'Strengths, Weaknesses & Self-Awareness',
    'Education & Work Experience',
    'Family, Friends & Responsibilities',
    'Leadership, Teamwork & Decision-Making',
    'Indian Navy Knowledge',
    'Indian Armed Forces & Ranks',
    'Maritime Security & Naval Operations',
    'Defence Technology & Equipment',
    'National & International Affairs',
    'General Knowledge & Reasoning'
  ];

  const filteredQuestions = SAMPLE_QUESTIONS.filter(q => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.contextHint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory !== 'All' && q.category !== selectedCategory) {
      return false;
    }

    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
      return false;
    }

    const isDone = completedIds.includes(q.id);
    if (selectedStatus === 'Completed' && !isDone) return false;
    if (selectedStatus === 'Pending' && isDone) return false;

    return true;
  });

  const totalCount = SAMPLE_QUESTIONS.length;
  const completedCount = completedIds.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Disclaimer */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-950 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">SSB Practice Question Bank: </span>
          Curated reference questions across PIQ, naval operations, and armed forces awareness. These are structured practice tools, not official examination question papers.
        </div>
      </div>

      {/* Header & Stats Bar */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0a192f] text-[#d4af37]">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Services Selection Board Question Bank</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0a192f]/10 text-[#0a192f]">
                  12 Categories
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Factual knowledge benchmarks and personal answer frameworks for the Interviewing Officer (IO)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRandomQuestion}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] transition-colors border border-[#d4af37]/30 shadow-sm"
            >
              <Shuffle className="w-4 h-4 text-[#d4af37]" />
              <span>Random Drill Question</span>
            </button>
          </div>
        </div>

        {/* Progress Counters */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-slate-700">
              <span>Question Bank Completion: {completedCount} of {totalCount} Mastered</span>
              <span className="font-bold text-[#0a192f]">{completionPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0a192f] to-[#d4af37] transition-all duration-300 rounded-full"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-1 font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <BookmarkCheck className="w-3.5 h-3.5 fill-amber-500" />
              {bookmarkedIds.length} Bookmarked
            </span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions by topic, keyword, or context hint..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedDifficulty}
                onChange={e => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              >
                <option value="All">All Difficulties</option>
                <option value="Foundation">Foundation</option>
                <option value="Standard">Standard</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value as 'All' | 'Completed' | 'Pending')}
                className="px-3 py-2 border border-slate-200 rounded-lg text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending Only</option>
                <option value="Completed">Completed Only</option>
              </select>
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold px-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0a192f] text-[#e5c158] shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-3">
        {filteredQuestions.map(q => {
          const isExpanded = expandedId === q.id;
          const isBookmarked = bookmarkedIds.includes(q.id);
          const isCompleted = completedIds.includes(q.id);

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all bg-white shadow-sm overflow-hidden ${
                isCompleted ? 'opacity-90 bg-slate-50/70 border-slate-200' : 'border-slate-200 hover:border-slate-300'
              } ${isExpanded ? 'ring-1 ring-[#0a192f]/20 border-[#0a192f]/40' : ''}`}
            >
              {/* Question Summary Bar */}
              <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    type="button"
                    onClick={() => toggleCompleted(q.id)}
                    className="mt-1 text-slate-400 hover:text-emerald-600 transition-colors focus:outline-none shrink-0"
                    title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 hover:text-slate-600" />
                    )}
                  </button>

                  <div
                    className="flex-1 cursor-pointer select-none"
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {q.category}
                      </span>

                      {/* Factual Answer vs Personal Framework Badge */}
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          q.answerType === 'factual'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : 'bg-purple-50 text-purple-800 border-purple-200'
                        }`}
                      >
                        {q.answerType === 'factual' ? 'Factual Answer' : 'Personal Framework'}
                      </span>

                      <span className="text-[10px] font-semibold text-slate-500">
                        {q.difficulty}
                      </span>
                    </div>

                    <h3 className={`font-bold text-sm sm:text-base leading-snug ${
                      isCompleted ? 'line-through text-slate-500' : 'text-slate-900'
                    }`}>
                      {q.question}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => toggleBookmark(q.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked ? 'text-[#b48a28] bg-amber-50 hover:bg-amber-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }`}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark question'}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-5 h-5 fill-amber-500" /> : <Bookmark className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : q.id)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-6 pt-2 bg-slate-50/80 border-t border-slate-100 space-y-4">
                  {/* Context note */}
                  <div className="rounded-xl bg-amber-50/90 border border-amber-200 p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Interviewing Officer Assessment Angle: </span>
                      {q.contextHint}
                    </div>
                  </div>

                  {/* Answer Key Points & Guidelines */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#0a192f]" />
                      {q.answerType === 'factual' ? 'Factual Reference Answer Points:' : 'Recommended STAR Answer Framework:'}
                    </h4>

                    <ul className="space-y-2">
                      {q.recommendedKeyPoints.map((point, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0a192f] mt-2 shrink-0" />
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
            <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-600 text-sm font-medium">No questions matched the selected filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
                setSearchTerm('');
              }}
              className="mt-3 text-xs text-[#0a192f] font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Random Question Modal */}
      {randomModalQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0a192f]/10 text-[#0a192f]">
                {randomModalQuestion.category}
              </span>

              <button
                type="button"
                onClick={() => setRandomModalQuestion(null)}
                className="text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Close ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {randomModalQuestion.question}
            </h3>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              <span className="font-bold block mb-1">IO Evaluation Focus:</span>
              {randomModalQuestion.contextHint}
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pt-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Key Points:</span>
              {randomModalQuestion.recommendedKeyPoints.map((pt, i) => (
                <div key={i} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0a192f] mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleCompleted(randomModalQuestion.id)}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                {completedIds.includes(randomModalQuestion.id) ? '✓ Completed' : 'Mark as Completed'}
              </button>

              <button
                type="button"
                onClick={handleRandomQuestion}
                className="px-4 py-2 bg-[#0a192f] text-white rounded-lg text-xs font-bold hover:bg-[#102a4c]"
              >
                Next Random Question →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
