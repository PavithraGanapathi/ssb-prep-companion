export type TaskCategory = 
  | 'OIR & Screening'
  | 'Psychology'
  | 'GTO Tasks'
  | 'Personal Interview'
  | 'Current Affairs'
  | 'Physical Fitness';

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  estimatedMinutes: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
  dueDate?: string;
  notes?: string;
}

export type NavScreen = 
  | 'dashboard'
  | 'oir'
  | 'planner'
  | 'psychology'
  | 'questions'
  | 'affairs'
  | 'interview'
  | 'voice'
  | 'progress';

export interface OLQ {
  id: string;
  factor: 'Factor I: Planning & Organizing' | 'Factor II: Social Adjustment' | 'Factor III: Social Effectiveness' | 'Factor IV: Dynamic';
  name: string;
  description: string;
  assessedIn: ('Psychology' | 'GTO' | 'Interview')[];
  rating: number; // 1 to 5 scale
}

export type QuestionCategory =
  | 'Personal Interview Questions'
  | 'Self-Introduction & Background'
  | 'Strengths, Weaknesses & Self-Awareness'
  | 'Education & Work Experience'
  | 'Family, Friends & Responsibilities'
  | 'Leadership, Teamwork & Decision-Making'
  | 'Indian Navy Knowledge'
  | 'Indian Armed Forces & Ranks'
  | 'Maritime Security & Naval Operations'
  | 'Defence Technology & Equipment'
  | 'National & International Affairs'
  | 'General Knowledge & Reasoning';

export interface QuestionItem {
  id: string;
  category: QuestionCategory;
  question: string;
  contextHint: string;
  recommendedKeyPoints: string[];
  answerType: 'factual' | 'personal_framework';
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
}

export type CurrentAffairCategory =
  | 'Defence and Security'
  | 'Maritime Affairs and Indian Navy'
  | 'International Relations and Geopolitics'
  | 'Science, Technology and Space'
  | 'National Affairs and Governance'
  | 'Economy and Infrastructure';

export interface CurrentAffairItem {
  id: string;
  title: string;
  category: CurrentAffairCategory;
  publicationDate: string;
  eventDate?: string;
  sourceName: string;
  sourceUrl: string;
  summary: string;
  keyPoints: string[];
  ssbDiscussionQuestions: string[];
  relevanceForSSB: string;
  sampleStatus?: string;
}

export interface PPDTCharacter {
  id: string;
  age: number;
  gender: 'M' | 'F' | 'P'; // Male, Female, Person
  mood: '+' | '0' | '-'; // Positive, Neutral, Negative
  isHero: boolean;
}

export interface SrtItem {
  id: string;
  situation: string;
  sampleAction: string;
  qualityTested: string;
}

export interface PsychologyExercise {
  id: string;
  type: 'PPDT' | 'TAT' | 'WAT' | 'SRT' | 'SDT';
  title: string;
  instructions: string;
  durationSeconds: number;
  content: string;
  sceneType?: string;
  words?: string[];
  situations?: SrtItem[];
  tips: string[];
}

export interface PsychPracticeRecord {
  id: string;
  testType: 'PPDT' | 'TAT' | 'WAT' | 'SRT' | 'SDT';
  title: string;
  date: string;
  timeSpentSeconds: number;
  wordCount: number;
  notes?: string;
}
