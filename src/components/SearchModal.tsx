import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { ALGORITHMS } from '../data/algorithmsData';
import { AlgorithmItem } from '../types/algorithm';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAlgorithm: (algoId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAlgorithm
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen) {
        e.preventDefault();
        // open search handled by parent or shortcut
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = ALGORITHMS.filter(algo =>
    algo.name.toLowerCase().includes(query.toLowerCase()) ||
    algo.categoryName.toLowerCase().includes(query.toLowerCase()) ||
    algo.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    algo.shortDescription.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-xl border border-indigo-900/60 bg-[#0c1224] shadow-2xl shadow-indigo-950/80 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-indigo-950/80 px-4 py-3.5 bg-[#090e1c]">
          <Search className="h-5 w-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            placeholder="Search algorithms (e.g., Quick Sort, Binary Search, BFS)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded px-2 py-0.5 text-xs text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700/60"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-indigo-950/40">
          {filtered.length === 0 ? (
            <div className="py-10 text-center text-sm text-slate-400">
              No algorithms found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((algo: AlgorithmItem) => (
              <div
                key={algo.id}
                onClick={() => {
                  onSelectAlgorithm(algo.id);
                  onClose();
                }}
                className="group flex items-center justify-between p-3 rounded-lg hover:bg-indigo-950/50 cursor-pointer transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-100 group-hover:text-indigo-200">
                      {algo.name}
                    </span>
                    <span className="text-[11px] font-mono text-indigo-400">
                      {algo.categoryName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      · {algo.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {algo.shortDescription}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 pt-0.5">
                    <span>Avg: {algo.complexity.average}</span>
                    <span>·</span>
                    <span>Space: {algo.complexity.space}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <span>Visualize</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-indigo-950/80 bg-[#080d1a] px-4 py-2 text-[11px] text-slate-500 font-mono">
          <span>Navigate directly to visualization</span>
          <span className="flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> Select
          </span>
        </div>
      </div>
    </div>
  );
};
