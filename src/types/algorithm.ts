export type CategoryId = 'sorting' | 'searching' | 'graphs' | 'trees' | 'pathfinding' | 'data-structures';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface AlgorithmComplexity {
  best: string;
  average: string;
  worst: string;
  space: string;
  stable?: boolean;
  inPlace?: boolean;
}

export interface CodeSnippets {
  python: string;
  javascript: string;
  cpp: string;
  java: string;
}

export interface StepAction {
  array: number[];
  comparing: number[]; // indices currently compared
  swapping: number[];  // indices currently swapped
  sorted: number[];    // indices already sorted/finalized
  pivot?: number;      // pivot index for quicksort or min index for selection sort
  pointers?: { [label: string]: number }; // e.g. { low: 0, high: 5, mid: 2 }
  codeLine: number;    // 1-based line number in code snippet
  status: 'comparing' | 'swapping' | 'sorted' | 'partitioning' | 'shifting' | 'found' | 'not-found' | 'idle';
  stepDescription: string;
  actionExplanation: string;
}

export interface AlgorithmItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  difficulty: DifficultyLevel;
  shortDescription: string;
  fullDescription: string;
  complexity: AlgorithmComplexity;
  code: CodeSnippets;
  defaultArray: number[];
  badgeColor?: string;
  tags: string[];
}

export interface ChallengeItem {
  id: string;
  number: string;
  title: string;
  question: string;
  arrayInput?: number[];
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export interface LearningModule {
  id: string;
  number: number;
  title: string;
  readTime: string;
  algorithmsCount: number;
  completed: boolean;
  overview: string;
  concept: string;
  visualizationTips: string;
  exampleProblem: string;
  practicePrompt: string;
  recommendedAlgorithmId: string;
}
