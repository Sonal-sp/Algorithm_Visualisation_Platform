import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight, Play, Terminal, BookOpen, Award, Info } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about';
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
  onOpenSearch: () => void;
  selectedAlgorithmId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-950/60 bg-[#080c18]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Zone: Logo + Name */}
        <button
          onClick={() => handleNav('landing')}
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-indigo-500 to-sky-500 shadow-md shadow-indigo-600/30">
            {/* <> + connected nodes icon */}
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* code brackets */}
              <polyline points="7 8 3 12 7 16" />
              <polyline points="17 8 21 12 17 16" />
              {/* connected node core */}
              <circle cx="10" cy="12" r="1.5" fill="currentColor" />
              <circle cx="14" cy="12" r="1.5" fill="currentColor" />
              <line x1="10" y1="12" x2="14" y2="12" />
            </svg>
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
              Algorithm Visualizer
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-indigo-400/80 bg-indigo-950/60 border border-indigo-800/40 px-1.5 py-0.2 rounded">
              v2.4
            </span>
          </div>
        </button>

        {/* Center Zone: Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNav('visualizer')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === 'visualizer'
                ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Visualizer
          </button>
          <button
            onClick={() => handleNav('library')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === 'library'
                ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Algorithms
          </button>
          <button
            onClick={() => handleNav('learn')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === 'learn'
                ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => handleNav('challenges')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === 'challenges'
                ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => handleNav('about')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              currentView === 'about'
                ? 'bg-indigo-900/50 text-indigo-200 border border-indigo-700/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Zone: Search + CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-900/70 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-850 text-xs transition-colors"
            title="Search algorithms (Press /)"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">Quick search...</span>
            <kbd className="hidden sm:inline-block rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
              /
            </kbd>
          </button>

          <button
            onClick={() => handleNav('visualizer')}
            className="group flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-indigo-500/35 active:scale-95"
          >
            <span>Start Visualizing</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-indigo-950/80 bg-[#0c1224] px-4 py-4 space-y-2">
          <button
            onClick={() => handleNav('visualizer')}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-indigo-950/60 rounded-lg text-left"
          >
            <Play className="h-4 w-4 text-sky-400" />
            <span>Visualizer</span>
          </button>
          <button
            onClick={() => handleNav('library')}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-indigo-950/60 rounded-lg text-left"
          >
            <Terminal className="h-4 w-4 text-indigo-400" />
            <span>Algorithms Library</span>
          </button>
          <button
            onClick={() => handleNav('learn')}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-indigo-950/60 rounded-lg text-left"
          >
            <BookOpen className="h-4 w-4 text-purple-400" />
            <span>Learn & Curriculum</span>
          </button>
          <button
            onClick={() => handleNav('challenges')}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-indigo-950/60 rounded-lg text-left"
          >
            <Award className="h-4 w-4 text-amber-400" />
            <span>CS Challenges</span>
          </button>
          <button
            onClick={() => handleNav('about')}
            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-indigo-950/60 rounded-lg text-left"
          >
            <Info className="h-4 w-4 text-teal-400" />
            <span>About Algorithm Visualizer</span>
          </button>
        </div>
      )}
    </header>
  );
};
