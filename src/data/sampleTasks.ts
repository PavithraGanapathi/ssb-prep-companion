import type { Task } from '../types';

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Morning 5km endurance run + 15 pull-ups (Naval PT standards)',
    category: 'Physical Fitness',
    estimatedMinutes: 45,
    completed: true,
    priority: 'high',
    createdAt: new Date().toISOString(),
    notes: 'Aim for sub-24 minute 5K and strict form pull-ups.'
  },
  {
    id: 'task-2',
    title: 'Solve 50 OIR (Officer Intelligence Rating) verbal & non-verbal questions',
    category: 'OIR & Screening',
    estimatedMinutes: 30,
    completed: true,
    priority: 'high',
    createdAt: new Date().toISOString(),
    notes: 'Focus on cubes, dice, and logical sequence speed drills.'
  },
  {
    id: 'task-3',
    title: 'PPDT & TAT Practice: Write 2 stories with 4-min timer & realistic action plan',
    category: 'Psychology',
    estimatedMinutes: 40,
    completed: false,
    priority: 'high',
    createdAt: new Date().toISOString(),
    notes: 'Ensure protagonist shows initiative, logical decision making, and social responsibility.'
  },
  {
    id: 'task-4',
    title: 'WAT Rapid Drill: Attempt 30 words in 15 seconds each (spontaneous reactions)',
    category: 'Psychology',
    estimatedMinutes: 20,
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    notes: 'Avoid preachings; write observational and action-oriented sentences.'
  },
  {
    id: 'task-5',
    title: 'Study Maritime Security: Indian Navy Anti-Piracy Operations in Gulf of Aden',
    category: 'Current Affairs',
    estimatedMinutes: 45,
    completed: true,
    priority: 'high',
    createdAt: new Date().toISOString(),
    notes: 'Review INS Kolkata, INS Visakhapatnam deployments and MV Ruen rescue operation.'
  },
  {
    id: 'task-6',
    title: 'PIQ Deep-Dive: Prepare answers for academic dips and sports participation',
    category: 'Personal Interview',
    estimatedMinutes: 35,
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    notes: 'Honest introspection on reasons for grade fluctuations and team leadership lessons.'
  },
  {
    id: 'task-7',
    title: '3-minute Lecturette Practice on "Blue Economy and India\'s Maritime Vision 2030"',
    category: 'GTO Tasks',
    estimatedMinutes: 25,
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    notes: 'Use structured format: Intro, Geopolitical context, Navy role, Conclusion.'
  },
  {
    id: 'task-8',
    title: 'Revise Indian Navy Rank Hierarchy, Commands, and Flag Officer appointments',
    category: 'Personal Interview',
    estimatedMinutes: 20,
    completed: false,
    priority: 'low',
    createdAt: new Date().toISOString(),
    notes: 'Western, Eastern, Southern Commands, plus Andaman & Nicobar unified command.'
  }
];
