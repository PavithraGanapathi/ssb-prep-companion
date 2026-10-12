import { useState } from 'react';
import type React from 'react';
import { useOirTest } from '../hooks/useOirTest';
import { OirFigure } from '../components/oir/OirFigure';
import {
  Compass,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export const OirPracticePage: React.FC = () => {
  const {
    presets,
    allQuestions,
    activeTest,
    testQuestions,
    currentIndex,
    currentQuestion,
    selectedAnswers,
    markedForReview,
    secondsRemaining,
    isTestRunning,
    isTestSubmitted,
    lastResult,
    history,
    bookmarkedQuestionIds,
    answeredCount,
    unansweredCount,
    startTest,
    selectAnswer,
    toggleMarkForReview,
    toggleBookmark,
    setCurrentIndex,
    handleSubmitTest,
    exitTest
  } = useOirTest();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'ALL' | 'INCORRECT' | 'UNANSWERED' | 'BOOKMARKED'>('ALL');
  const [customQuestionCount, setCustomQuestionCount] = useState(15);
  const [customTimeMinutes, setCustomTimeMinutes] = useState(15);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rSecs).padStart(2, '0')}`;
  };

  // -------------------------------------------------------------
  // VIEW 1: RESULTS & DIAGNOSTIC SCREEN
  // -------------------------------------------------------------
  if (isTestSubmitted && lastResult) {
    const filteredReviewQuestions = testQuestions.filter(q => {
      const resp = lastResult.responses.find(r => r.questionId === q.id);
      const isBookmarked = bookmarkedQuestionIds.includes(q.id);

      if (reviewFilter === 'INCORRECT') return resp && resp.selectedOptionId && !resp.isCorrect;
      if (reviewFilter === 'UNANSWERED') return !resp || !resp.selectedOptionId;
      if (reviewFilter === 'BOOKMARKED') return isBookmarked;
      return true;
    });

    return (
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Top Disclaimer */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-950 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Practice Indicator Only: </span>
            This diagnostic scorecard reflects practice performance against standard verbal and non-verbal reasoning metrics. It does not predict or guarantee official SSB examination outcomes or official OIR grading.
          </div>
        </div>

        {/* Scorecard Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b48a28]">
                Test Evaluation Summary
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {lastResult.testTitle}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Completed on {lastResult.date} • Mode: {lastResult.mode === 'timed' ? 'Timed Simulation' : 'Untimed Practice'}
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-black text-[#0a192f]">
                  {lastResult.scorePercentage}%
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Overall Score
                </span>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div className="text-center">
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-700">
                  {lastResult.correctCount} / {lastResult.totalQuestions}
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Correct Answers
                </span>
              </div>
            </div>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
              <span className="text-xs font-bold uppercase text-emerald-800">Correct</span>
              <div className="text-2xl font-black text-emerald-700 mt-1">{lastResult.correctCount}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 text-center">
              <span className="text-xs font-bold uppercase text-rose-800">Incorrect</span>
              <div className="text-2xl font-black text-rose-700 mt-1">{lastResult.incorrectCount}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-center">
              <span className="text-xs font-bold uppercase text-slate-600">Unanswered</span>
              <div className="text-2xl font-black text-slate-700 mt-1">{lastResult.unansweredCount}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 text-center">
              <span className="text-xs font-bold uppercase text-sky-800">Time Taken</span>
              <div className="text-2xl font-black text-sky-700 mt-1 font-mono">{formatTimer(lastResult.timeTakenSeconds)}</div>
            </div>
          </div>

          {/* Category-wise Performance */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0a192f]" />
              Category-Wise Breakdown & Reasoning Areas
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {lastResult.categoryBreakdown.map(cat => {
                const percent = Math.round((cat.correct / cat.total) * 100);
                const isStrong = percent >= 75;
                return (
                  <div key={cat.subCategory} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800">{cat.subCategory}</span>
                      <span className={`font-bold ${isStrong ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {cat.correct} / {cat.total} ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isStrong ? 'bg-emerald-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={exitTest}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Return to OIR Hub
            </button>

            {activeTest && (
              <button
                onClick={() => startTest(activeTest)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] transition-colors border border-[#d4af37]/30"
              >
                <RotateCcw className="w-4 h-4 text-[#d4af37]" />
                <span>Retake This Mock Test</span>
              </button>
            )}
          </div>
        </div>

        {/* Detailed Question Explanations Review */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Step-by-Step Question Review</h3>
              <p className="text-xs text-slate-500">Inspect correct answers and logical deduction frameworks</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
              {(['ALL', 'INCORRECT', 'UNANSWERED', 'BOOKMARKED'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setReviewFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    reviewFilter === tab
                      ? 'bg-[#0a192f] text-[#e5c158] shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviewQuestions.map((q, idx) => {
              const resp = lastResult.responses.find(r => r.questionId === q.id);
              const userOpt = q.options.find(o => o.id === resp?.selectedOptionId);
              const correctOpt = q.options.find(o => o.id === q.correctOptionId);
              const isCorrect = resp?.isCorrect;
              const isBookmarked = bookmarkedQuestionIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/20 border-emerald-200'
                      : resp?.selectedOptionId
                      ? 'bg-rose-50/20 border-rose-200'
                      : 'bg-slate-50/50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 font-mono">Q{idx + 1}.</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {q.subCategory}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : resp?.selectedOptionId ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3.5 h-3.5" /> Incorrect
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                          Unanswered
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked ? 'text-[#b48a28] bg-amber-50' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      title={isBookmarked ? 'Bookmarked' : 'Bookmark question'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Question Text */}
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base my-2 leading-relaxed">
                    {q.questionText}
                  </h4>

                  {/* Diagram if Non-Verbal */}
                  {q.figureType && (
                    <div className="my-3 flex justify-start">
                      <OirFigure figureType={q.figureType} size={140} />
                    </div>
                  )}

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                    <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                      resp?.selectedOptionId ? (isCorrect ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300') : 'bg-slate-100 border-slate-200'
                    }`}>
                      <span className="font-bold text-slate-700">Your Answer:</span>
                      {userOpt ? (
                        <span className="font-semibold text-slate-900">
                          Option {userOpt.label} {userOpt.text ? `(${userOpt.text})` : ''}
                        </span>
                      ) : (
                        <span className="italic text-slate-500">Not Attempted</span>
                      )}
                    </div>

                    <div className="p-2.5 rounded-lg border bg-emerald-50 border-emerald-300 flex items-center gap-2">
                      <span className="font-bold text-emerald-900">Correct Answer:</span>
                      <span className="font-bold text-emerald-800">
                        Option {correctOpt?.label} {correctOpt?.text ? `(${correctOpt.text})` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Explanation box */}
                  <div className="mt-3 p-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-[#0a192f] block mb-1">Logical Explanation:</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}

            {filteredReviewQuestions.length === 0 && (
              <div className="text-center py-8 text-slate-500 text-xs">
                No questions matching the selected filter.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: ACTIVE LIVE TEST RUNNER
  // -------------------------------------------------------------
  if (isTestRunning && currentQuestion) {
    const isBookmarked = bookmarkedQuestionIds.includes(currentQuestion.id);
    const isMarkedReview = !!markedForReview[currentQuestion.id];
    const isTimeUrgent = secondsRemaining > 0 && secondsRemaining <= 120;

    return (
      <div className="max-w-6xl mx-auto space-y-4 pb-12">
        {/* Live Test Top Bar */}
        <div className="sticky top-16 z-20 bg-white/95 backdrop-blur border border-slate-200 rounded-xl p-4 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#0a192f] text-[#d4af37]">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {activeTest?.title}
              </h2>
              <span className="text-[11px] text-slate-500 font-medium">
                Question {currentIndex + 1} of {testQuestions.length} • {answeredCount} Answered
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Dynamic Countdown */}
            {activeTest && activeTest.timeMinutes > 0 && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border font-mono font-bold text-base transition-colors ${
                  isTimeUrgent
                    ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                    : 'bg-slate-100 text-[#0a192f] border-slate-200'
                }`}
              >
                <Clock className="w-4 h-4 text-slate-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            )}

            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 rounded-lg shadow-sm transition-all"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Question + Palette Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Card */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
            {/* Question Top Tags & Actions */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-[#0a192f] bg-[#0a192f]/10 px-2.5 py-1 rounded-md">
                  Q{currentIndex + 1}
                </span>
                <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {currentQuestion.category}
                </span>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  • {currentQuestion.subCategory}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleMarkForReview(currentQuestion.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                    isMarkedReview
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isMarkedReview ? '★ Marked for Review' : 'Mark for Review'}
                </button>

                <button
                  type="button"
                  onClick={() => toggleBookmark(currentQuestion.id)}
                  className={`p-1.5 rounded-lg border transition-colors ${
                    isBookmarked
                      ? 'text-[#b48a28] bg-amber-50 border-amber-200'
                      : 'text-slate-400 border-slate-200 hover:text-slate-600'
                  }`}
                  title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                >
                  {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500" /> : <Bookmark className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Question Statement */}
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {currentQuestion.questionText}
            </h3>

            {/* Non-Verbal Question SVG */}
            {currentQuestion.figureType && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-center">
                <OirFigure figureType={currentQuestion.figureType} size={150} />
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Select One Option:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.options.map(option => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => selectAnswer(currentQuestion.id, option.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between select-none ${
                        isSelected
                          ? 'bg-[#0a192f]/5 border-[#0a192f] text-[#0a192f] shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-[#0a192f] text-white'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {option.label}
                        </span>

                        {option.text && (
                          <span className="text-sm font-semibold">{option.text}</span>
                        )}

                        {option.figureType && (
                          <div className="ml-2">
                            <OirFigure figureType={option.figureType} size={70} />
                          </div>
                        )}
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#0a192f]' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#0a192f]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Question Footer Nav Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                disabled={currentIndex === testQuestions.length - 1}
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] disabled:opacity-40 disabled:pointer-events-none transition-colors border border-[#d4af37]/30"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Question Palette Drawer */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Question Palette ({testQuestions.length})
            </h4>

            {/* Palette Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto p-1">
              {testQuestions.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isReview = !!markedForReview[q.id];
                const isCurrent = currentIndex === idx;

                let btnStyles = 'bg-slate-100 text-slate-700 border-slate-200';
                if (isReview) {
                  btnStyles = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                } else if (isAnswered) {
                  btnStyles = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-9 rounded-lg text-xs font-semibold border flex items-center justify-center transition-all ${btnStyles} ${
                      isCurrent ? 'ring-2 ring-[#0a192f] ring-offset-1 font-black scale-105' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-300" />
                <span>Marked for Review ({Object.values(markedForReview).filter(Boolean).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200" />
                <span>Unanswered ({unansweredCount})</span>
              </div>
            </div>

            {/* Early Exit Link */}
            <div className="pt-3 border-t border-slate-100 text-center">
              <button
                onClick={exitTest}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Abort & Exit Test
              </button>
            </div>
          </div>
        </div>

        {/* Warning Modal Before Submit */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Confirm Test Submission</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    You have answered <span className="font-bold text-emerald-700">{answeredCount}</span> out of{' '}
                    <span className="font-bold">{testQuestions.length}</span> questions.
                  </p>
                </div>
              </div>

              {unansweredCount > 0 && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800">
                  ⚠️ <span className="font-bold">{unansweredCount} questions remain unanswered!</span> Once submitted, your score and category diagnostic will be finalized.
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Continue Test
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSubmitModal(false);
                    handleSubmitTest();
                  }}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
                >
                  Yes, Submit & View Score
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 3: OIR TEST HUB & PRESET SELECTION
  // -------------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0a192f] text-[#d4af37]">
              <Compass className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Officer Intelligence Rating (OIR) Practice</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  SSB Day 1 Screening
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Verbal reasoning drills, non-verbal spatial patterns, and full-length timed mock tests
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="block text-2xl font-black text-[#0a192f]">{allQuestions.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Reasoning Items Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Test Selection Cards */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
          Full Mock Tests & Specialized Drills
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {presets.map(test => (
            <div
              key={test.id}
              className="bg-white rounded-xl p-5 border border-slate-200 hover:border-[#0a192f]/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#0a192f]/10 text-[#0a192f]">
                    {test.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {test.timeMinutes}m
                    </span>
                    <span>• {test.questionCount} Questions</span>
                  </div>
                </div>

                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {test.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {test.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Timed Simulation
                </span>

                <button
                  onClick={() => startTest(test)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] transition-colors border border-[#d4af37]/30 shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Start Test</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Untimed Practice Generator */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-[#b48a28]" />
          <h3 className="text-base font-bold text-slate-900">Custom OIR Practice Session</h3>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Configure a personalized practice session with flexible question counts and untimed pacing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Number of Questions
            </label>
            <select
              value={customQuestionCount}
              onChange={e => setCustomQuestionCount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            >
              <option value={10}>10 Questions (Quick Review)</option>
              <option value={15}>15 Questions (Standard Practice)</option>
              <option value={20}>20 Questions (Full Battery)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Pacing Mode
            </label>
            <select
              value={customTimeMinutes}
              onChange={e => setCustomTimeMinutes(Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            >
              <option value={0}>Untimed Mode (Self-Paced)</option>
              <option value={10}>10 Minutes (Rapid)</option>
              <option value={15}>15 Minutes (Standard)</option>
              <option value={20}>20 Minutes (Relaxed)</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => {
                startTest({
                  id: 'custom-session',
                  title: `Custom Practice (${customQuestionCount} Questions)`,
                  description: 'Candidate configured practice session.',
                  category: 'Full Mock',
                  questionCount: customQuestionCount,
                  timeMinutes: customTimeMinutes
                });
              }}
              className="w-full py-2.5 px-4 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 border border-[#d4af37]/30"
            >
              <Play className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Launch Practice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Test History Card */}
      {history.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#0a192f]" />
              Previous Mock Test Attempts ({history.length})
            </h3>
            <span className="text-xs text-slate-500">Saved in browser storage</span>
          </div>

          <div className="divide-y divide-slate-100">
            {history.slice(0, 5).map(item => (
              <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-slate-900">{item.testTitle}</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {item.date} • {item.attemptedCount}/{item.totalQuestions} Attempted • {formatTimer(item.timeTakenSeconds)} taken
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full font-bold text-xs ${
                    item.scorePercentage >= 75
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}>
                    {item.scorePercentage}% Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bookmarked Questions Summary */}
      {bookmarkedQuestionIds.length > 0 && (
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-4 h-4 text-amber-700" />
            <span>
              You have <span className="font-bold">{bookmarkedQuestionIds.length}</span> bookmarked tricky reasoning questions saved for revision.
            </span>
          </div>
          <span className="font-semibold text-amber-800 underline cursor-pointer">
            Review in Test Review
          </span>
        </div>
      )}
    </div>
  );
};
