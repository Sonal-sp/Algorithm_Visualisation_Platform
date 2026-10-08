import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Compass,
  Play,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { LEARNING_MODULES } from '../data/algorithmsData';
import { LearningModule } from '../types/algorithm';

interface LearnViewProps {
  onSelectAlgorithm: (algoId: string) => void;
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  onSelectAlgorithm,
  onNavigate
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(LEARNING_MODULES[0].id);
  const [activeTab, setActiveTab] = useState<'concept' | 'visualization' | 'example' | 'practice'>('concept');
  const [simulatedN, setSimulatedN] = useState<number>(16);

  const selectedModule: LearningModule =
    LEARNING_MODULES.find(m => m.id === selectedModuleId) || LEARNING_MODULES[0];

  const handleLaunchSimulation = (algoId: string) => {
    onSelectAlgorithm(algoId);
    onNavigate('visualizer');
  };

  // Calculations for Big-O explorer
  const complexities = [
    { name: 'O(1) Constant', value: 1, color: 'text-emerald-400', bar: 'bg-emerald-400' },
    { name: 'O(log n) Logarithmic', value: Math.round(Math.log2(simulatedN)), color: 'text-sky-300', bar: 'bg-sky-400' },
    { name: 'O(n) Linear', value: simulatedN, color: 'text-indigo-300', bar: 'bg-indigo-400' },
    { name: 'O(n log n) Linearithmic', value: Math.round(simulatedN * Math.log2(simulatedN)), color: 'text-purple-300', bar: 'bg-purple-400' },
    { name: 'O(n²) Quadratic', value: simulatedN * simulatedN, color: 'text-rose-400', bar: 'bg-rose-400' },
    { name: 'O(2ⁿ) Exponential', value: Math.min(100000, Math.pow(2, Math.min(simulatedN, 16))), color: 'text-amber-400', bar: 'bg-amber-400' }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-indigo-400">Interactive Curriculum</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Learn Algorithms Visually
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Step beyond rote syntax. Follow our structured modules to build deep spatial and mathematical intuition for how computational steps unfold.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          INTERACTIVE BIG-O RUNTIME EXPLORER TOOL
      ─────────────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-950 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <TrendingUp className="h-4 w-4 text-sky-400" />
              <span>Interactive Model</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Asymptotic Growth Comparator
            </h2>
            <p className="text-xs text-slate-400">
              Drag input size <code className="text-indigo-300">n</code> to see operation counts explode across complexity classes.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs font-mono">
            <span className="text-slate-400">Input size n =</span>
            <input
              type="range"
              min="2"
              max="64"
              value={simulatedN}
              onChange={e => setSimulatedN(parseInt(e.target.value, 10))}
              className="w-28 accent-indigo-500 cursor-pointer"
            />
            <span className="text-indigo-300 font-bold text-sm tabular-nums w-8">
              {simulatedN}
            </span>
          </div>
        </div>

        {/* Growth Bars Display */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          {complexities.map((c, i) => (
            <div
              key={i}
              className="rounded-xl bg-[#090d1c] border border-indigo-950/80 p-3.5 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] text-slate-400 block font-medium">
                  {c.name}
                </span>
                <span className={`text-base font-bold tabular-nums ${c.color}`}>
                  {c.value.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">ops</span>
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full ${c.bar} transition-all duration-300`}
                  style={{
                    width: `${Math.min(100, Math.max(5, (Math.log10(c.value + 1) / Math.log10(100000)) * 100))}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7 CORE LEARNING MODULES SPLIT WORKSPACE
      ─────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Module Sidebar Navigator (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 px-1 mb-2">
            Modules (7)
          </div>
          {LEARNING_MODULES.map((m: LearningModule) => {
            const isSelected = m.id === selectedModuleId;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedModuleId(m.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-500/80 shadow-lg shadow-indigo-950/60'
                    : 'bg-[#0d1326] border-indigo-950/60 hover:border-indigo-800 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-indigo-400">
                      Module 0{m.number}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      · {m.readTime}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">
                    {m.title}
                  </div>
                </div>

                {m.completed && (
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail Stage: Concept → Visualization → Example → Practice (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-6 sm:p-8 shadow-xl space-y-6">
          {/* Header of selected module */}
          <div className="space-y-2 border-b border-indigo-950/80 pb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span>Module 0{selectedModule.number}</span>
              <span>·</span>
              <span>{selectedModule.readTime}</span>
              <span>·</span>
              <span>{selectedModule.algorithmsCount} algorithms covered</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {selectedModule.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedModule.overview}
            </p>
          </div>

          {/* Guided Stage Tabs: Concept → Visualization → Example → Practice */}
          <div className="flex items-center gap-1.5 p-1 bg-[#090d1c] border border-indigo-950 rounded-xl overflow-x-auto text-xs font-medium">
            <button
              onClick={() => setActiveTab('concept')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'concept'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Concept
            </button>
            <span className="text-slate-600 text-xs">→</span>
            <button
              onClick={() => setActiveTab('visualization')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'visualization'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Visualization
            </button>
            <span className="text-slate-600 text-xs">→</span>
            <button
              onClick={() => setActiveTab('example')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'example'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Example
            </button>
            <span className="text-slate-600 text-xs">→</span>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === 'practice'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              4. Practice
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="rounded-xl bg-[#090d1c] border border-indigo-950/80 p-5 space-y-4">
            {activeTab === 'concept' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
                  <Lightbulb className="h-4 w-4" />
                  <span>Theoretical Framework & Definition</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedModule.concept}
                </p>
                <div className="pt-2 text-xs text-slate-400 border-t border-indigo-950 font-mono">
                  Key takeaway: Always identify invariants that remain true before and after every loop pass.
                </div>
              </div>
            )}

            {activeTab === 'visualization' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
                  <Cpu className="h-4 w-4" />
                  <span>How to Watch the Simulation</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedModule.visualizationTips}
                </p>

                <div className="p-4 rounded-lg bg-indigo-950/40 border border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-white">
                      Recommended Interactive Sandbox
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      Launch visualization for {selectedModule.recommendedAlgorithmId}
                    </div>
                  </div>
                  <button
                    onClick={() => handleLaunchSimulation(selectedModule.recommendedAlgorithmId)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shrink-0 transition-colors"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Launch Visualizer</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'example' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Compass className="h-4 w-4" />
                  <span>Real-World Benchmark Problem</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedModule.exampleProblem}
                </p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  Step 1: Input size $N$ &nbsp;·&nbsp; Step 2: Compare against bounds &nbsp;·&nbsp; Step 3: Optimal subproblem termination.
                </div>
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <HelpCircle className="h-4 w-4" />
                  <span>Guided Exercise</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedModule.practicePrompt}
                </p>
                <button
                  onClick={() => onNavigate('challenges')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <span>Go to Practice Challenges Hub</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Module navigation footer */}
          <div className="pt-2 flex items-center justify-between border-t border-indigo-950/80 text-xs font-mono text-slate-400">
            <span>Progress: Stage {selectedModule.number} of 7</span>
            <button
              onClick={() => {
                const nextMod = LEARNING_MODULES.find(m => m.number === selectedModule.number + 1);
                if (nextMod) setSelectedModuleId(nextMod.id);
              }}
              disabled={selectedModule.number === 7}
              className="text-indigo-400 hover:text-indigo-300 disabled:opacity-40 disabled:hover:text-indigo-400 font-semibold"
            >
              Next Module →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
