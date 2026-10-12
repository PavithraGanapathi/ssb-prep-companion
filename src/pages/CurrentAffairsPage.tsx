import { useState, useEffect, useMemo } from 'react';
import type React from 'react';
import {
  Newspaper,
  Shield,
  CheckCircle,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Search,
  Calendar,
  HelpCircle,
  FileCheck2,
  Info
} from 'lucide-react';
import {
  SAMPLE_CURRENT_AFFAIRS,
  CURRENT_AFFAIRS_LAST_UPDATED,
  CURRENT_AFFAIRS_DISCLOSURE
} from '../data/sampleAffairs';
import type { CurrentAffairCategory, CurrentAffairItem } from '../types';

const AFFAIRS_BOOKMARKS_KEY = 'ssb_affairs_bookmarks_v1';

const ALL_CATEGORIES: ('All' | CurrentAffairCategory)[] = [
  'All',
  'Maritime Affairs and Indian Navy',
  'Defence and Security',
  'International Relations and Geopolitics',
  'Science, Technology and Space',
  'National Affairs and Governance',
  'Economy and Infrastructure'
];

export const CurrentAffairsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | CurrentAffairCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [onlyRevisionList, setOnlyRevisionList] = useState<boolean>(false);

  // Load bookmarks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AFFAIRS_BOOKMARKS_KEY);
      if (stored) {
        setBookmarkedIds(new Set(JSON.parse(stored)));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(AFFAIRS_BOOKMARKS_KEY, JSON.stringify(Array.from(next)));
      } catch {
        // Ignore
      }
      return next;
    });
  };

  // Filtered affairs list
  const filteredAffairs = useMemo(() => {
    return SAMPLE_CURRENT_AFFAIRS.filter((item: CurrentAffairItem) => {
      // Revision filter
      if (onlyRevisionList && !bookmarkedIds.has(item.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesPoints = item.keyPoints.some(pt => pt.toLowerCase().includes(q));
        const matchesQuestions = item.ssbDiscussionQuestions.some(dq => dq.toLowerCase().includes(q));
        const matchesSource = item.sourceName.toLowerCase().includes(q);
        return matchesTitle || matchesSummary || matchesPoints || matchesQuestions || matchesSource;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, onlyRevisionList, bookmarkedIds]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Trust & Provenance Disclosure Banner */}
      <div className="rounded-xl bg-slate-900 border border-[#d4af37]/30 p-4 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#102a4c] text-[#e5c158] border border-[#d4af37]/40 shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                SSB Strategic Briefings & Source Attribution
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Sources
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Every briefing is documented with verifiable publication dates and direct government portal links.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a192f] border border-slate-700 text-xs text-slate-300 font-mono">
            <Calendar className="w-3.5 h-3.5 text-[#e5c158]" />
            <span>Updated: {CURRENT_AFFAIRS_LAST_UPDATED}</span>
          </div>
        </div>
      </div>

      {/* Repository Note Alert */}
      <div className="rounded-xl bg-amber-50/70 border border-amber-200/80 p-3.5 text-amber-950 flex items-start gap-2.5 text-xs">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Static Curated Study Repository: </span>
          {CURRENT_AFFAIRS_DISCLOSURE} All sources link to original official releases on Press Information Bureau (PIB), Ministry of Defence (MoD), Indian Navy, MEA, and ISRO portals.
        </div>
      </div>

      {/* Control Bar: Search, Category Filters, Revision Toggle */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search strategic briefings, key facts, GD topics, or source documents..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f] bg-slate-50/50"
            />
          </div>

          {/* Revision List Button */}
          <button
            onClick={() => setOnlyRevisionList(prev => !prev)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 border ${
              onlyRevisionList
                ? 'bg-[#0a192f] text-[#e5c158] border-[#0a192f] shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {onlyRevisionList ? (
              <BookmarkCheck className="w-4 h-4 text-[#e5c158]" />
            ) : (
              <Bookmark className="w-4 h-4 text-slate-500" />
            )}
            <span>Revision List ({bookmarkedIds.size})</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {ALL_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#0a192f] text-[#e5c158] border-[#0a192f] shadow-sm'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Showing <span className="font-bold text-slate-900">{filteredAffairs.length}</span> strategic briefings
          {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
          {onlyRevisionList && ` (Saved for Revision)`}
        </span>
        {bookmarkedIds.size > 0 && !onlyRevisionList && (
          <span className="text-[11px] text-indigo-700 font-semibold">
            {bookmarkedIds.size} saved for revision
          </span>
        )}
      </div>

      {/* Briefings Grid */}
      {filteredAffairs.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200 space-y-3">
          <Newspaper className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-800">No briefings found</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {onlyRevisionList
              ? 'You have not added any briefings to your revision list yet. Click the bookmark icon on any briefing card to save it.'
              : 'Try clearing your search query or switching to another category.'}
          </p>
          {(onlyRevisionList || searchQuery) && (
            <button
              onClick={() => {
                setOnlyRevisionList(false);
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Reset all filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAffairs.map(item => {
            const isBookmarked = bookmarkedIds.has(item.id);

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative"
              >
                <div>
                  {/* Category & Bookmark row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#0a192f]/5 text-[#0a192f] border border-[#0a192f]/15 max-w-[80%] truncate">
                      {item.category}
                    </span>

                    <button
                      onClick={() => toggleBookmark(item.id)}
                      title={isBookmarked ? 'Remove from revision list' : 'Save to revision list'}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isBookmarked
                          ? 'bg-amber-50 text-amber-600 border-amber-300'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-700'
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Verifiable Source Badge */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {item.publicationDate}
                    </span>
                    <span className="text-slate-300">•</span>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50/70 hover:bg-indigo-100/70 px-2 py-0.5 rounded border border-indigo-200/60 transition-colors"
                    >
                      <span>{item.sourceName}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Key Takeaways */}
                  <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200 mb-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-[#0a192f]" />
                      Key Facts & Strategic Takeaways
                    </h4>
                    <ul className="space-y-1.5">
                      {item.keyPoints.map((pt, idx) => (
                        <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample GD & Lecturette Discussion Questions */}
                  {item.ssbDiscussionQuestions && item.ssbDiscussionQuestions.length > 0 && (
                    <div className="bg-indigo-50/50 rounded-lg p-3.5 border border-indigo-100 mb-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950 mb-2 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-700" />
                        Sample GD & Lecturette Discussion Topics
                      </h4>
                      <ul className="space-y-1.5">
                        {item.ssbDiscussionQuestions.map((dq, qIdx) => (
                          <li key={qIdx} className="text-xs text-indigo-900/90 flex items-start gap-2">
                            <span className="font-bold text-indigo-600 shrink-0">{qIdx + 1}.</span>
                            <span className="leading-relaxed italic">"{dq}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* SSB Context Tip */}
                <div className="pt-3 border-t border-slate-100 text-xs text-amber-900 bg-amber-50/50 p-2.5 rounded-lg border border-amber-200/60">
                  <span className="font-bold">SSB Application: </span>
                  {item.relevanceForSSB}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
