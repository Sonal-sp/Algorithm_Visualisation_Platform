import React, { useState } from 'react';
import { Search, ArrowRight, Filter, Layers, Code, Check } from 'lucide-react';
import { ALGORITHMS } from '../data/algorithmsData';
import { CategoryId, DifficultyLevel, AlgorithmItem } from '../types/algorithm';

interface LibraryViewProps {
  onSelectAlgorithm: (algoId: string) => void;
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  onSelectAlgorithm,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | DifficultyLevel>('All');
  const [categoryFilter, setCategoryFilter] = useState<'All' | CategoryId>('All');

  const filteredAlgorithms = ALGORITHMS.filter(algo => {
    const matchesSearch =
      algo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      algo.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDifficulty =
      difficultyFilter === 'All' || algo.difficulty === difficultyFilter;

    const matchesCategory =
      categoryFilter === 'All' || algo.category === categoryFilter;

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const handleOpenVisualizer = (id: string) => {
    onSelectAlgorithm(id);
    onNavigate('visualizer');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search */}
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs font-mono text-indigo-400">Complete Catalog</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Explore Algorithms
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Browse our catalog of comparison sorts, divide-and-conquer paradigms, graph search traversals, and dynamic memory structures.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search algorithms, paradigms, tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-indigo-950 bg-[#0d1326] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none shadow-sm"
            />
          </div>

          {/* Difficulty Filters */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0d1326] border border-indigo-950 rounded-xl overflow-x-auto text-xs font-medium">
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map(diff => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter Pills / Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-500 font-mono text-[11px] shrink-0">Category:</span>
          {(
            [
              { id: 'All', label: 'All Categories' },
              { id: 'sorting', label: 'Sorting' },
              { id: 'searching', label: 'Searching' },
              { id: 'graphs', label: 'Graphs' },
              { id: 'trees', label: 'Trees' },
              { id: 'pathfinding', label: 'Pathfinding' },
              { id: 'data-structures', label: 'Data Structures' }
            ] as const
          ).map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as 'All' | CategoryId)}
              className={`px-3 py-1 rounded-full whitespace-nowrap border transition-all ${
                categoryFilter === cat.id
                  ? 'bg-indigo-950 text-indigo-200 border-indigo-500/80 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Algorithms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlgorithms.length === 0 ? (
          <div className="col-span-full py-16 text-center rounded-2xl border border-indigo-950 bg-[#0d1326]">
            <p className="text-sm text-slate-400">
              No algorithms match your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDifficultyFilter('All');
                setCategoryFilter('All');
              }}
              className="mt-3 text-xs font-semibold text-indigo-400 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          filteredAlgorithms.map((algo: AlgorithmItem) => {
            const sampleHeights = algo.defaultArray.slice(0, 6);
            const maxVal = Math.max(...sampleHeights, 1);

            return (
              <div
                key={algo.id}
                className="group flex flex-col justify-between rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 hover:border-indigo-500/70 hover:shadow-xl hover:shadow-indigo-950/60 transition-all"
              >
                <div>
                  {/* Visualizer Mini Preview */}
                  <div className="h-24 w-full rounded-xl bg-[#090d1c] border border-indigo-950/80 p-2.5 flex items-end justify-center gap-1.5 mb-4">
                    {sampleHeights.map((h, i) => {
                      const pct = Math.max(18, Math.round((h / maxVal) * 100));
                      const isHighlighted = i === 1 || i === 3;
                      return (
                        <div
                          key={i}
                          style={{ height: `${pct}%` }}
                          className={`w-4 rounded-t transition-all ${
                            isHighlighted
                              ? 'bg-gradient-to-t from-indigo-600 to-sky-400'
                              : 'bg-slate-700/70 group-hover:bg-slate-600/80'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Title & Category & Difficulty */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {algo.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 mt-0.5">
                        <span className="text-indigo-400">{algo.categoryName}</span>
                        <span>·</span>
                        <span>{algo.difficulty}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {algo.shortDescription}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {algo.tags.map(t => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Complexity Box */}
                  <div className="border-t border-indigo-950/80 pt-3 mb-4 grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-[#090d1c] p-2 rounded border border-indigo-950/60">
                      <div className="text-[10px] text-slate-500">Average Time</div>
                      <div className="text-sky-300 font-semibold">{algo.complexity.average}</div>
                    </div>
                    <div className="bg-[#090d1c] p-2 rounded border border-indigo-950/60">
                      <div className="text-[10px] text-slate-500">Worst Space</div>
                      <div className="text-amber-300 font-semibold">{algo.complexity.space}</div>
                    </div>
                  </div>

                  {/* Visualize Button */}
                  <button
                    onClick={() => handleOpenVisualizer(algo.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all active:scale-95"
                  >
                    <span>Visualize Algorithm</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
