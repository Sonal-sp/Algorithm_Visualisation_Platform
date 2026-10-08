import React from 'react';
import { ArrowRight, Code, BookOpen, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
  onSelectAlgorithm?: (algoId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectAlgorithm }) => {
  return (
    <footer className="border-t border-indigo-950/70 bg-[#060913] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-xs">
                &lt;&gt;
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Algorithm Visualizer
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Interactive learning platform designed for computer science students to visualize execution steps, analyze Big-O complexities, and understand data structures.
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Designed for college learners & educators.
            </p>
          </div>

          {/* Quick links: Visualizer Algorithms */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Popular Algorithms
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    if (onSelectAlgorithm) onSelectAlgorithm('bubble-sort');
                    onNavigate('visualizer');
                  }}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Bubble Sort
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectAlgorithm) onSelectAlgorithm('quick-sort');
                    onNavigate('visualizer');
                  }}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Quick Sort (Pivot Partition)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectAlgorithm) onSelectAlgorithm('merge-sort');
                    onNavigate('visualizer');
                  }}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Merge Sort (Divide & Conquer)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (onSelectAlgorithm) onSelectAlgorithm('binary-search');
                    onNavigate('visualizer');
                  }}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Binary Search
                </button>
              </li>
            </ul>
          </div>

          {/* Curriculum */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Learning Tracks
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Big-O Asymptotic Complexity
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Sorting Techniques Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('learn')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Graph Traversal (BFS & DFS)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="hover:text-indigo-300 transition-colors"
                >
                  Step Prediction Challenges
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Keyboard Shortcuts */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Interactive Controls
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center justify-between">
                <span>Play / Pause</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                  Space
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Next Step</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                  →
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Previous Step</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                  ←
                </kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Quick Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">
                  /
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="mt-10 pt-6 border-t border-indigo-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Algorithm Visualizer. Built for CS students & self-taught programmers.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-slate-300 transition-colors">
              About Project
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('library')} className="hover:text-slate-300 transition-colors">
              Library
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('challenges')} className="hover:text-slate-300 transition-colors">
              Challenges
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
