import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  ChevronDown,
  Code2,
  Check,
  Sliders,
  Maximize2,
  Minimize2,
  ListOrdered,
  ArrowRight,
  Info
} from 'lucide-react';
import { ALGORITHMS } from '../data/algorithmsData';
import { getAlgorithmSteps } from '../utils/sortingEngines';
import { AlgorithmItem, StepAction } from '../types/algorithm';

interface VisualizerViewProps {
  algorithmId: string;
  onSelectAlgorithm: (id: string) => void;
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
}

export const VisualizerView: React.FC<VisualizerViewProps> = ({
  algorithmId,
  onSelectAlgorithm,
  onNavigate
}) => {
  const currentAlgorithm: AlgorithmItem =
    ALGORITHMS.find(a => a.id === algorithmId) || ALGORITHMS[0];

  const [inputArrayText, setInputArrayText] = useState(
    currentAlgorithm.defaultArray.join(', ')
  );
  const [arrayData, setArrayData] = useState<number[]>(currentAlgorithm.defaultArray);
  const [steps, setSteps] = useState<StepAction[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5x to 3.0x
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'cpp' | 'java'>('python');
  const [isAlgoDropdownOpen, setIsAlgoDropdownOpen] = useState(false);
  const [targetSearchValue, setTargetSearchValue] = useState(31);
  const [showLogDrawer, setShowLogDrawer] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Sync when algorithm changes
  useEffect(() => {
    const initialArr = currentAlgorithm.defaultArray;
    setInputArrayText(initialArr.join(', '));
    setArrayData(initialArr);
    const generatedSteps = getAlgorithmSteps(currentAlgorithm.id, initialArr, targetSearchValue);
    setSteps(generatedSteps);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [currentAlgorithm.id]);

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      const delayMs = Math.max(80, Math.round(900 / playbackSpeed));
      timerRef.current = window.setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delayMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, steps.length]);

  const currentStep: StepAction = steps[currentStepIdx] || {
    array: arrayData,
    comparing: [],
    swapping: [],
    sorted: [],
    codeLine: 1,
    status: 'idle',
    stepDescription: 'Ready to visualize.',
    actionExplanation: 'Click Play or Step Forward to begin execution.'
  };

  const handleApplyInput = () => {
    setIsPlaying(false);
    // Parse numbers from input
    const parsed = inputArrayText
      .split(/[,\s]+/)
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n));

    if (parsed.length >= 3) {
      // Clamp between 3 and 16 items for clean mobile & desktop display
      const finalArr = parsed.slice(0, 16);
      setArrayData(finalArr);
      const newSteps = getAlgorithmSteps(currentAlgorithm.id, finalArr, targetSearchValue);
      setSteps(newSteps);
      setCurrentStepIdx(0);
    }
  };

  const handleRandomize = () => {
    setIsPlaying(false);
    const size = Math.floor(Math.random() * 4) + 6; // 6 to 9 items
    const randomArr = Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 8);
    setInputArrayText(randomArr.join(', '));
    setArrayData(randomArr);
    const newSteps = getAlgorithmSteps(currentAlgorithm.id, randomArr, targetSearchValue);
    setSteps(newSteps);
    setCurrentStepIdx(0);
  };

  const handlePreset = (type: 'sorted' | 'reversed' | 'nearly') => {
    setIsPlaying(false);
    let arr = [12, 19, 27, 34, 48, 55, 63, 79];
    if (type === 'reversed') {
      arr = [85, 72, 61, 49, 38, 26, 17, 8];
    } else if (type === 'nearly') {
      arr = [10, 22, 18, 35, 42, 60, 52, 75];
    }
    setInputArrayText(arr.join(', '));
    setArrayData(arr);
    const newSteps = getAlgorithmSteps(currentAlgorithm.id, arr, targetSearchValue);
    setSteps(newSteps);
    setCurrentStepIdx(0);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentStepIdx(prev => Math.min(steps.length - 1, prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const togglePlay = () => {
    if (currentStepIdx >= steps.length - 1) {
      setCurrentStepIdx(0);
    }
    setIsPlaying(prev => !prev);
  };

  const maxVal = Math.max(...currentStep.array, 50);

  // Parse lines of code for the selected language
  const codeString = currentAlgorithm.code[selectedLanguage] || currentAlgorithm.code.python;
  const codeLines = codeString.split('\n');

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* ─────────────────────────────────────────────────────────────
          TOP BAR & BREADCRUMB
      ─────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-950/80 pb-5">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-1">
            <button
              onClick={() => onNavigate('library')}
              className="hover:text-indigo-300 transition-colors"
            >
              Algorithms
            </button>
            <span>/</span>
            <span className="text-slate-300">{currentAlgorithm.categoryName}</span>
            <span>/</span>
            <span className="text-indigo-400 font-semibold">{currentAlgorithm.name}</span>
          </div>

          <div className="relative inline-block">
            <button
              onClick={() => setIsAlgoDropdownOpen(!isAlgoDropdownOpen)}
              className="flex items-center gap-2 group text-left"
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                {currentAlgorithm.name} Visualizer
              </h1>
              <ChevronDown className="h-5 w-5 text-indigo-400 transition-transform group-hover:translate-y-0.5" />
            </button>

            {/* Quick Switcher Dropdown */}
            {isAlgoDropdownOpen && (
              <div className="absolute left-0 mt-2 z-40 w-72 rounded-xl border border-indigo-900/80 bg-[#0c1224] p-2 shadow-2xl divide-y divide-indigo-950/60 max-h-80 overflow-y-auto">
                {ALGORITHMS.map(a => (
                  <button
                    key={a.id}
                    onClick={() => {
                      onSelectAlgorithm(a.id);
                      setIsAlgoDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs text-left transition-colors ${
                      a.id === currentAlgorithm.id
                        ? 'bg-indigo-950/80 text-indigo-200 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-medium text-slate-200">{a.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {a.categoryName} · {a.complexity.average}
                      </div>
                    </div>
                    {a.id === currentAlgorithm.id && (
                      <Check className="h-4 w-4 text-indigo-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowLogDrawer(!showLogDrawer)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
              showLogDrawer
                ? 'bg-indigo-950/80 border-indigo-700 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListOrdered className="h-3.5 w-3.5" />
            <span>Step Logs ({steps.length})</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-indigo-900/60 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN STAGE: VISUALIZATION (LEFT) + INFO/CODE (RIGHT)
      ─────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: MAIN VISUALIZATION AREA (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Visualizer Box */}
          <div className="rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 sm:p-6 shadow-xl">
            {/* Stage header info */}
            <div className="flex items-center justify-between pb-3 border-b border-indigo-950/80 mb-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300 font-semibold">Active Simulation</span>
                {currentAlgorithm.category === 'searching' && (
                  <span className="text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 rounded">
                    Target: {targetSearchValue}
                  </span>
                )}
              </div>
              <span className="text-indigo-400 font-semibold tabular-nums text-sm">
                Step {String(currentStepIdx + 1).padStart(2, '0')} / {String(steps.length || 1).padStart(2, '0')}
              </span>
            </div>

            {/* Centered Large Visualization Canvas */}
            <div className="relative min-h-[300px] sm:min-h-[340px] flex items-end justify-center gap-2 sm:gap-3 px-3 pb-8 pt-12 bg-[#090d1c] rounded-xl border border-indigo-950/80 overflow-hidden">
              {/* Subtle coordinate guide grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              {/* Baseline divider */}
              <div className="absolute bottom-8 left-4 right-4 h-px bg-indigo-950" />

              {currentStep.array.map((val, idx) => {
                const isComparing = currentStep.comparing.includes(idx);
                const isSwapping = currentStep.swapping.includes(idx);
                const isSorted = currentStep.sorted.includes(idx);
                const isPivot = currentStep.pivot === idx;
                const heightPct = Math.max(16, Math.round((val / maxVal) * 100));

                let barColor = 'bg-slate-700/60 border-slate-600/50 text-slate-300';
                let glowEffect = '';

                if (isSorted) {
                  barColor = 'bg-gradient-to-t from-emerald-600 to-emerald-400 border-emerald-300 text-white';
                  glowEffect = 'shadow-md shadow-emerald-500/30';
                } else if (isSwapping) {
                  barColor = 'bg-gradient-to-t from-rose-600 to-amber-500 border-amber-300 text-white';
                  glowEffect = 'shadow-lg shadow-rose-500/40 scale-105';
                } else if (isComparing) {
                  barColor = 'bg-gradient-to-t from-indigo-600 to-sky-400 border-sky-300 text-white';
                  glowEffect = 'shadow-lg shadow-sky-500/40';
                } else if (isPivot) {
                  barColor = 'bg-gradient-to-t from-purple-600 to-purple-400 border-purple-300 text-white';
                  glowEffect = 'shadow-md shadow-purple-500/30';
                }

                return (
                  <div
                    key={idx}
                    className="relative flex flex-col items-center flex-1 max-w-[56px] h-full justify-end group transition-all"
                  >
                    {/* Top value badge above bar */}
                    <div className="mb-1 text-xs font-mono font-bold text-slate-200">
                      {val}
                    </div>

                    {/* Comparison pointer indicator */}
                    {isComparing && (
                      <div className="absolute -top-7 flex flex-col items-center animate-bounce z-10">
                        <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/90 border border-sky-700/60 px-1 py-0.2 rounded">
                          cmp
                        </span>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-sky-400" />
                      </div>
                    )}

                    {/* Pivot indicator */}
                    {isPivot && !isComparing && (
                      <div className="absolute -top-7 flex flex-col items-center z-10">
                        <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-950/90 border border-purple-700/60 px-1 py-0.2 rounded">
                          pivot
                        </span>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-purple-400" />
                      </div>
                    )}

                    {/* Vertical Dynamic Bar */}
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-lg border-t border-x transition-all duration-300 ${barColor} ${glowEffect}`}
                    />

                    {/* Bottom Index label */}
                    <div className="mt-2 text-[10px] font-mono text-slate-500">
                      [{idx}]
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Playback Controls Deck: ⏮ | ▶ Play | ⏭ | ↻ | Speed */}
            <div className="mt-5 pt-4 border-t border-indigo-950/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentStepIdx === 0}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous Step"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="flex h-9 px-4 items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentStepIdx >= steps.length - 1}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next Step"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors ml-1"
                  title="Reset"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {/* Speed Slider */}
              <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400">
                <Sliders className="h-3.5 w-3.5 text-indigo-400" />
                <span>Speed:</span>
                <input
                  type="range"
                  min="0.5"
                  max="3.0"
                  step="0.5"
                  value={playbackSpeed}
                  onChange={e => setPlaybackSpeed(parseFloat(e.target.value))}
                  className="w-20 sm:w-24 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
                <span className="text-indigo-400 font-semibold w-8 tabular-nums">
                  {playbackSpeed}x
                </span>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              INPUT PANEL: Custom Input + Randomize + Presets
          ─────────────────────────────────────────────────────────────── */}
          <div className="rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Custom Input</span>
              </h3>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px]">Presets:</span>
                <button
                  onClick={() => handlePreset('nearly')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Nearly Sorted
                </button>
                <button
                  onClick={() => handlePreset('reversed')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Reverse
                </button>
                <button
                  onClick={() => handlePreset('sorted')}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Sorted
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <input
                type="text"
                value={inputArrayText}
                onChange={e => setInputArrayText(e.target.value)}
                placeholder="42, 17, 63, 8, 31, 25"
                className="w-full sm:flex-1 rounded-lg border border-slate-700/80 bg-[#080d1c] px-3.5 py-2 text-xs sm:text-sm font-mono text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />

              {currentAlgorithm.category === 'searching' && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-xs text-slate-400 font-mono">Target:</span>
                  <input
                    type="number"
                    value={targetSearchValue}
                    onChange={e => setTargetSearchValue(parseInt(e.target.value, 10) || 0)}
                    className="w-16 rounded-lg border border-slate-700/80 bg-[#080d1c] px-2 py-2 text-xs font-mono text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              )}

              <button
                onClick={handleApplyInput}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shrink-0"
              >
                Visualize Input
              </button>

              <button
                onClick={handleRandomize}
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors shrink-0"
              >
                <Shuffle className="h-3.5 w-3.5 text-indigo-400" />
                <span>Randomize</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              Provide 4 to 16 comma-separated numbers (e.g. 42, 17, 63, 8, 31, 25).
            </p>
          </div>

          {/* Drawer: Execution History Logs (Collapsible) */}
          {showLogDrawer && (
            <div className="rounded-2xl border border-indigo-900/60 bg-[#0c1224] p-4 shadow-xl max-h-64 overflow-y-auto space-y-2">
              <div className="text-xs font-mono font-semibold text-indigo-300 mb-2">
                Execution Step History
              </div>
              <div className="divide-y divide-indigo-950/60 text-xs font-mono">
                {steps.map((st, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setIsPlaying(false);
                      setCurrentStepIdx(i);
                    }}
                    className={`py-2 px-2.5 rounded cursor-pointer transition-colors flex items-center justify-between ${
                      i === currentStepIdx
                        ? 'bg-indigo-950/80 text-indigo-200 font-semibold'
                        : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 text-[10px]">
                        Step {String(i + 1).padStart(2, '0')}:
                      </span>
                      <span>{st.stepDescription}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase">
                      {st.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT PANEL: INFORMATION & SYNCHRONIZED CODE (5 cols)
        ─────────────────────────────────────────────────────────────── */}
        <div className="lg:col-span-5 space-y-5">
          {/* Information Panel */}
          <div className="rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 sm:p-6 shadow-xl space-y-5">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-white">
                  {currentAlgorithm.name}
                </h2>
                <span className="text-xs font-mono text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 px-2 py-0.5 rounded">
                  Difficulty: {currentAlgorithm.difficulty}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {currentAlgorithm.shortDescription}
              </p>
            </div>

            {/* Time & Space Complexity Grid */}
            <div className="rounded-xl bg-[#090d1c] border border-indigo-950/80 p-3.5 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Complexity Analysis
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex items-center justify-between bg-slate-900/60 px-2.5 py-1.5 rounded">
                  <span className="text-slate-500">Best:</span>
                  <span className="text-emerald-400 font-semibold">
                    {currentAlgorithm.complexity.best}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900/60 px-2.5 py-1.5 rounded">
                  <span className="text-slate-500">Average:</span>
                  <span className="text-sky-300 font-semibold">
                    {currentAlgorithm.complexity.average}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900/60 px-2.5 py-1.5 rounded">
                  <span className="text-slate-500">Worst:</span>
                  <span className="text-rose-400 font-semibold">
                    {currentAlgorithm.complexity.worst}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-slate-900/60 px-2.5 py-1.5 rounded">
                  <span className="text-slate-500">Space:</span>
                  <span className="text-amber-300 font-semibold">
                    {currentAlgorithm.complexity.space}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Step & Action Callout */}
            <div className="rounded-xl border border-indigo-900/70 bg-indigo-950/40 p-4 space-y-2">
              <div>
                <div className="text-[11px] font-mono font-semibold text-indigo-300">
                  Current Step
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">
                  &ldquo;{currentStep.stepDescription}&rdquo;
                </div>
              </div>

              {currentStep.actionExplanation && (
                <div className="pt-2 border-t border-indigo-900/60">
                  <div className="text-[11px] font-mono font-semibold text-sky-300">
                    Action
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    &ldquo;{currentStep.actionExplanation}&rdquo;
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Synchronized Code Editor Card */}
          <div className="rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-950/80">
              <div className="flex items-center gap-2">
                <Code2 className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Synchronized Implementation
                </span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
                {(['python', 'javascript', 'cpp', 'java'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2 py-0.5 rounded transition-colors uppercase text-[10px] ${
                      selectedLanguage === lang
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang === 'javascript' ? 'JS' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Lines with Active Line Highlight */}
            <div className="rounded-xl bg-[#080d1c] border border-indigo-950/90 p-3 font-mono text-xs leading-relaxed max-h-72 overflow-y-auto">
              {codeLines.map((lineText, idx) => {
                const lineNum = idx + 1;
                const isCurrent = lineNum === currentStep.codeLine;

                return (
                  <div
                    key={lineNum}
                    className={`flex items-center gap-2.5 px-2 py-0.5 rounded transition-colors ${
                      isCurrent
                        ? 'bg-indigo-500/25 border-l-2 border-indigo-400 text-indigo-200 font-semibold'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    <span className="w-5 text-right text-slate-600 text-[11px] select-none">
                      {lineNum}
                    </span>
                    <span className="whitespace-pre overflow-x-hidden">{lineText}</span>
                    {isCurrent && (
                      <span className="ml-auto text-[9px] text-sky-400 bg-sky-950/80 px-1 rounded border border-sky-800/40 shrink-0">
                        executing
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
