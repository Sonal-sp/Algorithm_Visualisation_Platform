import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import { generateBubbleSortSteps } from '../utils/sortingEngines';
import { StepAction } from '../types/algorithm';

export const InteractiveCodePreview: React.FC = () => {
  const initialArr = [8, 3, 5, 1, 9, 2];
  const [steps, setSteps] = useState<StepAction[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 0.5 (slow) to 2 (fast)
  const [selectedLanguage, setSelectedLanguage] = useState<'python' | 'javascript' | 'cpp'>('python');
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const generated = generateBubbleSortSteps(initialArr);
    setSteps(generated);
    // Find step where 8 and 3 are compared and swapped (step 1 or 2)
    setCurrentStepIdx(1);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const delayMs = Math.round(1000 / playbackSpeed);
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

  const currentStep = steps[currentStepIdx] || {
    array: initialArr,
    comparing: [0, 1],
    swapping: [],
    sorted: [],
    codeLine: 3,
    status: 'comparing' as const,
    stepDescription: 'Compare the current element with the next element. Since 8 > 3, the two elements are swapped.',
    actionExplanation: '8 is greater than 3, triggering a swap condition.'
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

  // Code snippets by language with line numbers
  const codeLinesPython = [
    { num: 1, text: 'for i in range(n):' },
    { num: 2, text: '    for j in range(0, n - i - 1):' },
    { num: 3, text: '        if arr[j] > arr[j + 1]:' },
    { num: 4, text: '            arr[j], arr[j + 1] = arr[j + 1], arr[j]' },
    { num: 5, text: 'return arr' }
  ];

  const codeLinesJS = [
    { num: 1, text: 'for (let i = 0; i < n; i++) {' },
    { num: 2, text: '  for (let j = 0; j < n - i - 1; j++) {' },
    { num: 3, text: '    if (arr[j] > arr[j + 1]) {' },
    { num: 4, text: '      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];' },
    { num: 5, text: '    }' },
    { num: 6, text: '  }' },
    { num: 7, text: '}' }
  ];

  const codeLinesCpp = [
    { num: 1, text: 'for (int i = 0; i < n; i++) {' },
    { num: 2, text: '    for (int j = 0; j < n - i - 1; j++) {' },
    { num: 3, text: '        if (arr[j] > arr[j + 1]) {' },
    { num: 4, text: '            swap(arr[j], arr[j + 1]);' },
    { num: 5, text: '        }' },
    { num: 6, text: '    }' },
    { num: 7, text: '}' }
  ];

  const currentLines =
    selectedLanguage === 'python'
      ? codeLinesPython
      : selectedLanguage === 'javascript'
      ? codeLinesJS
      : codeLinesCpp;

  const maxVal = 10;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* LEFT PANEL — VISUALIZATION (7 cols) */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 sm:p-6 shadow-xl">
        <div>
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-3 border-b border-indigo-950/80 mb-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              <span className="text-xs font-semibold text-slate-200">
                Interactive Array Canvas
              </span>
            </div>
            <div className="text-xs font-mono text-indigo-400">
              Step {String(currentStepIdx + 1).padStart(2, '0')} / {String(steps.length || 20).padStart(2, '0')}
            </div>
          </div>

          {/* Array Container [ 8 ] [ 3 ] [ 5 ] [ 1 ] [ 9 ] [ 2 ] */}
          <div className="relative min-h-[220px] sm:min-h-[240px] flex items-end justify-center gap-2 sm:gap-3.5 px-3 pb-4 pt-12 bg-[#090d1c] rounded-xl border border-indigo-950/80">
            {/* Background grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            {currentStep.array.map((val, idx) => {
              const isComparing = currentStep.comparing.includes(idx);
              const isSwapping = currentStep.swapping.includes(idx);
              const isSorted = currentStep.sorted.includes(idx);
              const heightPct = Math.max(22, Math.round((val / maxVal) * 100));

              let barBg = 'bg-slate-700/60 border-slate-600/50 text-slate-200';
              let glow = '';

              if (isSorted) {
                barBg = 'bg-emerald-600/90 border-emerald-400 text-white';
                glow = 'shadow-md shadow-emerald-500/30';
              } else if (isSwapping) {
                barBg = 'bg-rose-600/90 border-amber-400 text-white';
                glow = 'shadow-lg shadow-rose-500/40 scale-105';
              } else if (isComparing) {
                barBg = 'bg-indigo-600/90 border-sky-400 text-white';
                glow = 'shadow-lg shadow-sky-500/40';
              }

              return (
                <div key={idx} className="relative flex flex-col items-center flex-1 max-w-[58px] h-full justify-end">
                  {/* Arrow Indicator */}
                  {isComparing && (
                    <div className="absolute -top-7 flex flex-col items-center animate-bounce z-10">
                      <span className="text-[10px] font-mono font-semibold text-sky-300 bg-sky-950/90 border border-sky-700/60 px-1 py-0.2 rounded">
                        j{idx === currentStep.comparing[0] ? '' : '+1'}
                      </span>
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-sky-400" />
                    </div>
                  )}

                  {isSwapping && (
                    <div className="absolute -top-7 flex flex-col items-center animate-pulse z-10">
                      <span className="text-[10px] font-mono font-semibold text-amber-300 bg-amber-950/90 border border-amber-700/60 px-1 py-0.2 rounded">
                        swap
                      </span>
                      <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-amber-400" />
                    </div>
                  )}

                  {/* Vertical bar */}
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg border-t border-x transition-all duration-300 flex flex-col items-center justify-start pt-2 ${barBg} ${glow}`}
                  >
                    <span className="text-xs sm:text-sm font-mono font-bold">
                      {val}
                    </span>
                  </div>

                  {/* Box representation [ val ] */}
                  <div className="mt-2 text-[11px] font-mono font-medium text-slate-400">
                    [{idx}]
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls & Speed Deck */}
        <div className="mt-6 pt-4 border-t border-indigo-950/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Control buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>

              <button
                onClick={togglePlay}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all active:scale-95"
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
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-medium transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-medium transition-colors ml-1"
                title="Reset visualization"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>

            {/* Speed slider: Slow ─────●──── Fast */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">Slow</span>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.5"
                value={playbackSpeed}
                onChange={e => setPlaybackSpeed(parseFloat(e.target.value))}
                className="w-24 sm:w-28 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                title={`Speed: ${playbackSpeed}x`}
              />
              <span className="text-[11px] text-slate-400 font-mono">Fast</span>
              <span className="text-[11px] font-mono text-indigo-400 w-8 tabular-nums">
                {playbackSpeed}x
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — CODE EDITOR CARD (5 cols) */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-5 sm:p-6 shadow-xl">
        <div>
          {/* Code Editor Header */}
          <div className="flex items-center justify-between pb-3 border-b border-indigo-950/80 mb-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-semibold text-slate-200">
                Code Synchronization
              </span>
            </div>

            {/* Language tabs */}
            <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-lg p-0.5 text-xs font-mono">
              <button
                onClick={() => setSelectedLanguage('python')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedLanguage === 'python'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setSelectedLanguage('javascript')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedLanguage === 'javascript'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                JS
              </button>
              <button
                onClick={() => setSelectedLanguage('cpp')}
                className={`px-2 py-0.5 rounded transition-colors ${
                  selectedLanguage === 'cpp'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                C++
              </button>
            </div>
          </div>

          {/* Synchronized Code View */}
          <div className="rounded-xl bg-[#080c18] border border-indigo-950/90 p-3.5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto">
            {currentLines.map(line => {
              const isCurrentLine = line.num === currentStep.codeLine;
              return (
                <div
                  key={line.num}
                  className={`flex items-center gap-3 px-2 py-1 rounded transition-colors ${
                    isCurrentLine
                      ? 'bg-indigo-500/25 border-l-2 border-indigo-400 text-indigo-200 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-300'
                  }`}
                >
                  <span className="w-5 text-right text-slate-600 text-[11px] select-none">
                    {line.num}
                  </span>
                  <span className="whitespace-pre">{line.text}</span>
                  {isCurrentLine && (
                    <span className="ml-auto text-[10px] text-sky-400 font-bold bg-sky-950/80 px-1 rounded border border-sky-800/40">
                      active
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Explanation Callout */}
        <div className="mt-5 rounded-xl border border-indigo-900/60 bg-indigo-950/30 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>Step Explanation</span>
          </div>
          <p className="text-xs sm:text-[13px] text-slate-200 leading-relaxed">
            {currentStep.stepDescription}
          </p>
          {currentStep.actionExplanation && (
            <p className="mt-1.5 text-xs text-indigo-300/80 font-mono">
              ↳ {currentStep.actionExplanation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
