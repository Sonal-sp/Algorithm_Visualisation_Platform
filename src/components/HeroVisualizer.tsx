import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { generateBubbleSortSteps } from '../utils/sortingEngines';
import { StepAction } from '../types/algorithm';

export const HeroVisualizer: React.FC = () => {
  const initialData = [42, 17, 63, 8, 31, 25];
  const [steps, setSteps] = useState<StepAction[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Initialize steps
  useEffect(() => {
    const generated = generateBubbleSortSteps(initialData);
    setSteps(generated);
    // Start at a nice illustrative step (e.g. step 4 or 6) or 0
    setCurrentStepIdx(0);
  }, []);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 750);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length]);

  const currentStep = steps[currentStepIdx] || {
    array: initialData,
    comparing: [1, 3],
    swapping: [],
    sorted: [],
    status: 'comparing' as const,
    stepDescription: 'Comparing elements...',
    actionExplanation: ''
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

  const maxVal = Math.max(...initialData, 65);

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-2xl border border-indigo-900/60 bg-[#0d1326]/90 p-5 sm:p-6 shadow-2xl shadow-indigo-950/70 backdrop-blur-md">
      {/* Visualizer Header Bar */}
      <div className="flex items-center justify-between border-b border-indigo-950/80 pb-3 mb-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-semibold">Hero Preview: Bubble Sort</span>
        </div>
        <span className="text-indigo-400 font-semibold tabular-nums">
          Step {String(currentStepIdx + 1).padStart(2, '0')} / {String(steps.length || 24).padStart(2, '0')}
        </span>
      </div>

      {/* Main Bar Visualization Canvas */}
      <div className="relative h-56 sm:h-64 flex items-end justify-center gap-2 sm:gap-3.5 px-2 pb-6 pt-8 bg-[#090d1c]/80 rounded-xl border border-indigo-950/70 overflow-hidden">
        {/* Subtle grid lines background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {currentStep.array.map((val, idx) => {
          const isComparing = currentStep.comparing.includes(idx);
          const isSwapping = currentStep.swapping.includes(idx);
          const isSorted = currentStep.sorted.includes(idx);
          const heightPct = Math.max(18, Math.round((val / maxVal) * 100));

          // Color calculation
          let barBg = 'bg-slate-700/60 border-slate-600/40 text-slate-300';
          let glowClass = '';

          if (isSorted) {
            barBg = 'bg-gradient-to-t from-emerald-600 to-emerald-400 border-emerald-400 text-white';
            glowClass = 'shadow-md shadow-emerald-500/30';
          } else if (isSwapping) {
            barBg = 'bg-gradient-to-t from-rose-600 to-amber-500 border-amber-300 text-white';
            glowClass = 'shadow-lg shadow-rose-500/40 scale-[1.03]';
          } else if (isComparing) {
            barBg = 'bg-gradient-to-t from-indigo-600 to-sky-400 border-sky-300 text-white';
            glowClass = 'shadow-lg shadow-sky-500/40';
          }

          return (
            <div key={idx} className="relative flex flex-col items-center flex-1 max-w-[56px] h-full justify-end group">
              {/* Comparison Pointer Arrow */}
              {isComparing && (
                <div className="absolute -top-6 flex flex-col items-center animate-bounce z-10">
                  <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-950/90 border border-sky-800/80 px-1 py-0.2 rounded shadow">
                    cmp
                  </span>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-sky-400" />
                </div>
              )}

              {/* Swapping Indicator Arrow */}
              {isSwapping && (
                <div className="absolute -top-6 flex flex-col items-center animate-pulse z-10">
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/90 border border-amber-800/80 px-1 py-0.2 rounded shadow">
                    swap
                  </span>
                  <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400" />
                </div>
              )}

              {/* Vertical Bar */}
              <div
                style={{ height: `${heightPct}%` }}
                className={`w-full rounded-t-lg border-t border-x transition-all duration-300 flex flex-col items-center justify-start pt-1.5 ${barBg} ${glowClass}`}
              >
                {/* Number inside/above bar */}
                <span className="text-[11px] sm:text-xs font-mono font-bold tracking-tight">
                  {val}
                </span>
              </div>

              {/* Index label underneath */}
              <div className="mt-2 text-[10px] font-mono text-slate-500">
                [{idx}]
              </div>
            </div>
          );
        })}
      </div>

      {/* Status Sequence Indicator: Comparing → Swapping → Sorted */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3 text-xs font-mono font-medium">
        <span
          className={`px-2.5 py-1 rounded-md transition-all ${
            currentStep.status === 'comparing'
              ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold'
              : 'text-slate-500'
          }`}
        >
          Comparing
        </span>
        <span className="text-slate-600">→</span>
        <span
          className={`px-2.5 py-1 rounded-md transition-all ${
            currentStep.status === 'swapping'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
              : 'text-slate-500'
          }`}
        >
          Swapping
        </span>
        <span className="text-slate-600">→</span>
        <span
          className={`px-2.5 py-1 rounded-md transition-all ${
            currentStep.status === 'sorted'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
              : 'text-slate-500'
          }`}
        >
          Sorted
        </span>
      </div>

      {/* Step Description */}
      <div className="mt-3 text-center min-h-[38px] flex items-center justify-center px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-900/40 text-xs text-slate-300">
        <p className="line-clamp-2">
          {currentStep.stepDescription}
        </p>
      </div>

      {/* Control Buttons Deck */}
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-indigo-950/70">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Previous step (◀)"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={togglePlay}
            className="flex h-8 w-14 items-center justify-center gap-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/30 transition-all active:scale-95"
            title={isPlaying ? "Pause (Ⅱ)" : "Play (▶)"}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIdx >= steps.length - 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Next step (▶)"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={handleReset}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors ml-1"
            title="Reset (↻)"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Interactive CS Sandbox
        </div>
      </div>
    </div>
  );
};
