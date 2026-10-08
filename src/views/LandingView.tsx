import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  Sliders,
  Code2,
  FlaskConical,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  BarChart2,
  GitBranch,
  Layers,
  Search as SearchIcon,
  Compass
} from 'lucide-react';
import { HeroVisualizer } from '../components/HeroVisualizer';
import { InteractiveCodePreview } from '../components/InteractiveCodePreview';
import { ALGORITHMS, CHALLENGES } from '../data/algorithmsData';
import { CategoryId, AlgorithmItem } from '../types/algorithm';

interface LandingViewProps {
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
  onSelectAlgorithm: (algoId: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onNavigate,
  onSelectAlgorithm
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('sorting');
  const [challengeAnswers, setChallengeAnswers] = useState<{ [id: string]: number | null }>({});
  const [showExplanation, setShowExplanation] = useState<{ [id: string]: boolean }>({});

  const categoryFilteredAlgos = ALGORITHMS.filter(a => a.category === selectedCategory);

  const handleSelectChallengeOption = (challengeId: string, optionIdx: number) => {
    setChallengeAnswers(prev => ({ ...prev, [challengeId]: optionIdx }));
    setShowExplanation(prev => ({ ...prev, [challengeId]: true }));
  };

  const handleStartVisualizing = (algoId?: string) => {
    if (algoId) {
      onSelectAlgorithm(algoId);
    }
    onNavigate('visualizer');
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION
      ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Text (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-mono text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              <span>Interactive CS Learning Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.12]">
              Understand Algorithms.{' '}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                See Them Come Alive.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Learn algorithms through interactive, step-by-step visualizations instead of memorizing lines of code.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => handleStartVisualizing('bubble-sort')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-sky-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-600 hover:to-sky-600 transition-all active:scale-95"
              >
                <span>Start Visualizing</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigate('library')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-900/80 bg-slate-900/60 hover:bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors"
              >
                <span>Explore Algorithms</span>
              </button>
            </div>

            {/* Input -> Algorithm -> Visualization relationship banner */}
            <div className="pt-4 border-t border-indigo-950/70 flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-sky-300 font-semibold">INPUT</span>
              <span>→</span>
              <span className="text-indigo-300 font-semibold">ALGORITHM</span>
              <span>→</span>
              <span className="text-purple-300 font-semibold">VISUALIZATION</span>
              <span>→</span>
              <span className="text-emerald-300 font-semibold">UNDERSTANDING</span>
            </div>
          </div>

          {/* Right Hero Visualization Preview (6 cols) */}
          <div className="lg:col-span-6">
            <HeroVisualizer />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2 — CHOOSE YOUR ALGORITHM
      ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            What do you want to visualize?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Explore algorithms interactively and understand every step.
          </p>

          {/* Category Tabs: Sorting | Searching | Graph | Pathfinding | Data Structures */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#0b1021] border border-indigo-950 rounded-xl max-w-xl mx-auto">
            {(
              [
                { id: 'sorting', label: 'Sorting' },
                { id: 'searching', label: 'Searching' },
                { id: 'graphs', label: 'Graph' },
                { id: 'pathfinding', label: 'Pathfinding' },
                { id: 'trees', label: 'Trees' },
                { id: 'data-structures', label: 'Data Structures' }
              ] as const
            ).map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryId)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Algorithm Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categoryFilteredAlgos.map((algo: AlgorithmItem) => {
            // Render mini visualization preview bars or nodes
            const sampleHeights = algo.defaultArray.slice(0, 6);
            const maxVal = Math.max(...sampleHeights, 1);

            return (
              <div
                key={algo.id}
                className="group flex flex-col justify-between rounded-xl border border-indigo-900/60 bg-[#0c1224] p-5 hover:border-indigo-600/70 hover:shadow-xl hover:shadow-indigo-950/60 transition-all"
              >
                <div>
                  {/* Mini Preview Graphic */}
                  <div className="h-20 w-full rounded-lg bg-[#080d1c] border border-indigo-950/80 p-2 flex items-end justify-center gap-1.5 mb-4 overflow-hidden">
                    {sampleHeights.map((h, i) => {
                      const pct = Math.max(20, Math.round((h / maxVal) * 100));
                      const isMid = i === Math.floor(sampleHeights.length / 2);
                      return (
                        <div
                          key={i}
                          style={{ height: `${pct}%` }}
                          className={`w-3.5 rounded-t transition-all ${
                            isMid
                              ? 'bg-indigo-500 group-hover:bg-sky-400'
                              : 'bg-slate-700/80 group-hover:bg-indigo-700/80'
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* Header: Name + Difficulty */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {algo.name}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-800/70 px-2 py-0.5 rounded border border-slate-700/50 shrink-0">
                      {algo.difficulty}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {algo.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Time Complexities */}
                  <div className="border-t border-indigo-950/70 pt-3 mb-4 grid grid-cols-3 gap-1 text-[11px] font-mono">
                    <div className="text-slate-400">
                      <span className="text-[10px] text-slate-500 block">Best</span>
                      <span className="text-emerald-400">{algo.complexity.best}</span>
                    </div>
                    <div className="text-slate-400">
                      <span className="text-[10px] text-slate-500 block">Average</span>
                      <span className="text-sky-300">{algo.complexity.average}</span>
                    </div>
                    <div className="text-slate-400">
                      <span className="text-[10px] text-slate-500 block">Worst</span>
                      <span className="text-rose-400">{algo.complexity.worst}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleStartVisualizing(algo.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-950/80 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-800/60 hover:border-transparent text-xs font-semibold transition-all"
                  >
                    <span>Visualize</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3 — INTERACTIVE VISUALIZER PREVIEW (DUAL PANEL)
      ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-mono text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Interactive Code + Visualization Dual Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Learn by Watching Every Step
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            See the exact line of code execute in real-time alongside comparison pointers and step explanations.
          </p>
        </div>

        <InteractiveCodePreview />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4 — WHY USE ALGORITHM VISUALIZER?
      ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Stop Memorizing. Start Understanding.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Traditional textbooks show static pseudo-code. Algorithm Visualizer bridges the gap with responsive visual mechanics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Visual Learning */}
          <div className="rounded-xl border border-indigo-900/60 bg-[#0c1224] p-6 space-y-3 hover:border-indigo-700/60 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-sky-950/80 border border-sky-800/60 flex items-center justify-center text-sky-400">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Visual Learning
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Watch algorithms execute step-by-step with synchronized comparison arrows and partition markers.
            </p>
          </div>

          {/* Card 2: Interactive Controls */}
          <div className="rounded-xl border border-indigo-900/60 bg-[#0c1224] p-6 space-y-3 hover:border-indigo-700/60 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <Sliders className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Interactive Controls
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Pause, replay, adjust execution speed from 0.5x to 3.0x, and step forward or backward one operation at a time.
            </p>
          </div>

          {/* Card 3: Code Synchronization */}
          <div className="rounded-xl border border-indigo-900/60 bg-[#0c1224] p-6 space-y-3 hover:border-indigo-700/60 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Code Synchronization
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              See the exact line of code responsible for each operation in Python, JavaScript, C++, or Java.
            </p>
          </div>

          {/* Card 4: Experiment */}
          <div className="rounded-xl border border-indigo-900/60 bg-[#0c1224] p-6 space-y-3 hover:border-indigo-700/60 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <FlaskConical className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white">
              Experiment
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Enter your own custom array input, randomize data distributions, and observe how corner cases perform.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5 — LEARNING PATH
      ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-2xl border border-indigo-900/60 bg-[#0c1224] p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-indigo-400">Curriculum Roadmap</span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Your Algorithm Learning Path
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Follow a structured progression from Big-O fundamentals to advanced graph networks.
              </p>
            </div>

            <button
              onClick={() => onNavigate('learn')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold self-start md:self-auto transition-colors shadow-md shadow-indigo-600/30"
            >
              <span>Continue Learning</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Horizontal Progression: Basics → Searching → Sorting → Trees → Graphs → Advanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { title: 'Basics', completed: '2 / 2', pct: 100, algos: 'Big-O & Loops' },
              { title: 'Searching', completed: '2 / 2', pct: 100, algos: 'Linear & Binary' },
              { title: 'Sorting', completed: '4 / 6', pct: 67, algos: 'Bubble, Quick, Merge' },
              { title: 'Trees', completed: '1 / 3', pct: 33, algos: 'BST Traversals' },
              { title: 'Graphs', completed: '1 / 4', pct: 25, algos: 'BFS, DFS, Dijkstra' },
              { title: 'Advanced', completed: '0 / 3', pct: 0, algos: 'Dynamic Programming' }
            ].map((stage, idx) => (
              <div
                key={idx}
                className="relative flex flex-col justify-between rounded-xl bg-[#090e1c] border border-indigo-950/80 p-4 hover:border-indigo-800/80 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Stage 0{idx + 1}</span>
                    <span className="text-indigo-400 font-semibold">{stage.completed}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {stage.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-4">
                    {stage.algos}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-sky-400 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${stage.pct}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 text-right">
                    {stage.pct}% completed
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6 — CHALLENGES
      ─────────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-mono text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Interactive Knowledge Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
            Think You Understand It?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Test your intuition on algorithm steps, comparison counts, and partitioning behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CHALLENGES.map(ch => {
            const userAnswer = challengeAnswers[ch.id];
            const isAnswered = userAnswer !== undefined && userAnswer !== null;
            const isCorrect = isAnswered && userAnswer === ch.correctIndex;

            return (
              <div
                key={ch.id}
                className="flex flex-col justify-between rounded-xl border border-indigo-900/60 bg-[#0c1224] p-5 sm:p-6 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-400 mb-2">
                    <span>Challenge #{ch.number}</span>
                    <span className="text-slate-500">CS Concept</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {ch.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 mb-4 leading-relaxed">
                    {ch.question}
                  </p>

                  {/* Input array showcase if present */}
                  {ch.arrayInput && (
                    <div className="flex items-center gap-1.5 mb-4 p-2 bg-[#090d1c] rounded-lg border border-indigo-950 font-mono text-xs">
                      <span className="text-slate-500 text-[10px]">Input:</span>
                      {ch.arrayInput.map((val, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/50 text-indigo-200"
                        >
                          {val}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {ch.options.map((opt, oIdx) => {
                      const selected = userAnswer === oIdx;
                      let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-indigo-950/40 hover:border-indigo-800/60';

                      if (isAnswered) {
                        if (oIdx === ch.correctIndex) {
                          btnStyle = 'bg-emerald-950/80 border-emerald-600/80 text-emerald-200 font-semibold';
                        } else if (selected && !isCorrect) {
                          btnStyle = 'bg-rose-950/80 border-rose-600/80 text-rose-200 font-semibold';
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectChallengeOption(ch.id, oIdx)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && oIdx === ch.correctIndex && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && selected && !isCorrect && (
                            <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation feedback */}
                <div>
                  {isAnswered && (
                    <div className="mt-2 p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs text-slate-300 space-y-1">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        {isCorrect ? (
                          <span className="text-emerald-400">✓ Correct!</span>
                        ) : (
                          <span className="text-rose-400">✗ Not quite!</span>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-300">
                        {ch.explanation}
                      </p>
                    </div>
                  )}

                  {!isAnswered && (
                    <button
                      onClick={() => handleSelectChallengeOption(ch.id, 0)}
                      className="w-full mt-2 py-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 text-center"
                    >
                      Try Challenge →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
