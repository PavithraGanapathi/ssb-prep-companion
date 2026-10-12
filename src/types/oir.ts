export type OirCategory = 'Verbal Reasoning' | 'Non-Verbal Reasoning';

export type OirSubCategory =
  | 'Number & Alphabet Series'
  | 'Analogies'
  | 'Odd One Out'
  | 'Coding & Decoding'
  | 'Blood Relations'
  | 'Direction Sense'
  | 'Ranking & Ordering'
  | 'Logical Sequence'
  | 'Figure Series'
  | 'Figure Analogy'
  | 'Pattern Completion'
  | 'Mirror & Water Images'
  | 'Embedded Figures'
  | 'Paper Folding'
  | 'Spatial Reasoning'
  | 'Word Relationships';

export interface OirOption {
  id: string;
  label: string; // 'A', 'B', 'C', 'D', 'E'
  text?: string;
  figureType?: string; // used for rendering specific SVG diagram
}

export interface OirQuestion {
  id: string;
  category: OirCategory;
  subCategory: OirSubCategory;
  questionText: string;
  figureType?: string; // used for question SVG
  options: OirOption[];
  correctOptionId: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface OirResponse {
  questionId: string;
  selectedOptionId?: string;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface OirTestResult {
  id: string;
  testTitle: string;
  date: string;
  mode: 'timed' | 'untimed';
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  allocatedTimeSeconds?: number;
  categoryBreakdown: {
    subCategory: string;
    total: number;
    correct: number;
  }[];
  responses: OirResponse[];
}

export interface OirPresetTest {
  id: string;
  title: string;
  description: string;
  category: 'Full Mock' | 'Verbal Drill' | 'Non-Verbal Drill' | 'Speed Drill';
  questionCount: number;
  timeMinutes: number;
}
