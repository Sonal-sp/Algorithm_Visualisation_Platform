import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { LandingView } from './views/LandingView';
import { VisualizerView } from './views/VisualizerView';
import { LibraryView } from './views/LibraryView';
import { LearnView } from './views/LearnView';
import { ChallengesView } from './views/ChallengesView';
import { AboutModal } from './views/AboutModal';

type AppView = 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState<string>('bubble-sort');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // Global keyboard shortcuts (e.g., '/' for quick search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: AppView) => {
    if (view === 'about') {
      setIsAboutOpen(true);
    } else {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectAlgorithm = (algoId: string) => {
    setSelectedAlgorithmId(algoId);
    setCurrentView('visualizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c18] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        selectedAlgorithmId={selectedAlgorithmId}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingView
            onNavigate={handleNavigate}
            onSelectAlgorithm={handleSelectAlgorithm}
          />
        )}

        {currentView === 'visualizer' && (
          <VisualizerView
            algorithmId={selectedAlgorithmId}
            onSelectAlgorithm={handleSelectAlgorithm}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'library' && (
          <LibraryView
            onSelectAlgorithm={handleSelectAlgorithm}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'learn' && (
          <LearnView
            onSelectAlgorithm={handleSelectAlgorithm}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'challenges' && (
          <ChallengesView
            onNavigate={handleNavigate}
            onSelectAlgorithm={handleSelectAlgorithm}
          />
        )}
      </main>

      {/* Universal Academic Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSelectAlgorithm={handleSelectAlgorithm}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectAlgorithm={handleSelectAlgorithm}
      />

      {/* About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
