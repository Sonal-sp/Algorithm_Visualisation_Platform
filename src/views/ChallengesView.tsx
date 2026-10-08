import React, { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { CHALLENGES } from '../data/algorithmsData';

interface ChallengesViewProps {
  onNavigate: (view: 'landing' | 'visualizer' | 'library' | 'learn' | 'challenges' | 'about') => void;
  onSelectAlgorithm: (algoId: string) => void;
}

export const ChallengesView: React.FC<ChallengesViewProps> = ({
  onNavigate,
  onSelectAlgorithm
}) => {
  const [answers, setAnswers] = useState<{ [id: string]: number }>({});
  const [hintsRevealed, setHintsRevealed] = useState<{ [id: string]: boolean }>({});

  const handleSelectOption = (challengeId: string, optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [challengeId]: optionIdx }));
  };

  const handleReset = () => {
    setAnswers({});
    setHintsRevealed({});
  };

  const score = CHALLENGES.reduce((acc, ch) => {
    return acc + (answers[ch.id] === ch.correctIndex ? 1 : 0);
  }, 0);

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-950 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-mono text-indigo-400">Knowledge Check</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Algorithm Challenges
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Test whether you understand what algorithms actually do at every step. Analyze corner cases, count operations, and verify invariants.
          </p>
        </div>

        {/* Score Card */}
        <div className="flex items-center gap-4 bg-[#0d1326] border border-indigo-900/60 px-5 py-3 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <div className="text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">Your Score</span>
              <span className="text-white font-bold text-sm">
                {score} / {CHALLENGES.length} Correct
              </span>
            </div>
          </div>

          {answeredCount > 0 && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white pl-2 border-l border-indigo-950"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>
          )}
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-6">
        {CHALLENGES.map((ch, idx) => {
          const userAnswer = answers[ch.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === ch.correctIndex;
          const isHintOpen = hintsRevealed[ch.id];

          return (
            <div
              key={ch.id}
              className="rounded-2xl border border-indigo-900/60 bg-[#0d1326] p-6 sm:p-7 shadow-xl space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-950/80 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    Challenge #{ch.number}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className="text-xs font-medium text-slate-300">{ch.title}</span>
                </div>

                <button
                  onClick={() =>
                    setHintsRevealed(prev => ({ ...prev, [ch.id]: !prev[ch.id] }))
                  }
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-indigo-300 self-start sm:self-auto"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  <span>{isHintOpen ? 'Hide Hint' : 'View Hint'}</span>
                </button>
              </div>

              {/* Hint Callout */}
              {isHintOpen && (
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs font-mono text-indigo-300">
                  Hint: {ch.hint}
                </div>
              )}

              {/* Question */}
              <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
                {ch.question}
              </p>

              {/* Input array showcase if present */}
              {ch.arrayInput && (
                <div className="inline-flex items-center gap-2 p-2.5 bg-[#090d1c] rounded-xl border border-indigo-950 font-mono text-xs">
                  <span className="text-slate-400 text-xs font-medium">Input Array:</span>
                  <div className="flex items-center gap-1.5">
                    {ch.arrayInput.map((val, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-indigo-950 border border-indigo-800/60 text-indigo-200 font-bold"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ch.options.map((opt, oIdx) => {
                  const selected = userAnswer === oIdx;
                  let style = 'bg-slate-900/90 border-slate-800 text-slate-300 hover:bg-indigo-950/50 hover:border-indigo-800/80';

                  if (isAnswered) {
                    if (oIdx === ch.correctIndex) {
                      style = 'bg-emerald-950/90 border-emerald-500 text-emerald-100 font-semibold shadow-md shadow-emerald-950/50';
                    } else if (selected && !isCorrect) {
                      style = 'bg-rose-950/90 border-rose-500 text-rose-100 font-semibold';
                    } else {
                      style = 'opacity-50 border-slate-800 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(ch.id, oIdx)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-xs sm:text-sm text-left transition-all ${style}`}
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

              {/* Explanation after answering */}
              {isAnswered && (
                <div className="rounded-xl border border-indigo-900/80 bg-indigo-950/30 p-4 space-y-1.5 animate-in fade-in">
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    {isCorrect ? (
                      <span className="text-emerald-400">✓ Correct answer!</span>
                    ) : (
                      <span className="text-rose-400">✗ Incorrect.</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ch.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
