import type { OLQ } from '../types';

export const INITIAL_OLQS: OLQ[] = [
  // Factor I: Planning & Organizing
  {
    id: 'olq-1',
    factor: 'Factor I: Planning & Organizing',
    name: 'Effective Intelligence',
    description: 'Practical intelligence to perceive solutions to complex problems and practical situations encountered in naval operations.',
    assessedIn: ['Psychology', 'GTO', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-2',
    factor: 'Factor I: Planning & Organizing',
    name: 'Reasoning Ability',
    description: 'Ability to grasp essentials, analyze logical premises, and arrive at rational conclusions without prejudice.',
    assessedIn: ['Psychology', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-3',
    factor: 'Factor I: Planning & Organizing',
    name: 'Organizing Ability',
    description: 'Capacity to systematically arrange resources, personnel, and time to achieve target goals efficiently.',
    assessedIn: ['GTO', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-4',
    factor: 'Factor I: Planning & Organizing',
    name: 'Power of Expression',
    description: 'Ability to put across ideas and views clearly, crisply, and convincingly both verbally and in writing.',
    assessedIn: ['GTO', 'Interview', 'Psychology'],
    rating: 4
  },

  // Factor II: Social Adjustment
  {
    id: 'olq-5',
    factor: 'Factor II: Social Adjustment',
    name: 'Social Adaptability',
    description: 'Ability to adapt cordially to different environments, individuals, and shipboard living conditions.',
    assessedIn: ['GTO', 'Interview'],
    rating: 5
  },
  {
    id: 'olq-6',
    factor: 'Factor II: Social Adjustment',
    name: 'Cooperation',
    description: 'Attitude of voluntary participation and collective effort towards group achievement rather than personal glory.',
    assessedIn: ['GTO', 'Psychology'],
    rating: 5
  },
  {
    id: 'olq-7',
    factor: 'Factor II: Social Adjustment',
    name: 'Sense of Responsibility',
    description: 'Deep awareness of duty, accountability for personal and team outcomes, and discipline under all circumstances.',
    assessedIn: ['Interview', 'Psychology', 'GTO'],
    rating: 5
  },

  // Factor III: Social Effectiveness
  {
    id: 'olq-8',
    factor: 'Factor III: Social Effectiveness',
    name: 'Initiative',
    description: 'Drive to originate purposeful action, step forward proactively, and take calculated risks.',
    assessedIn: ['GTO', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-9',
    factor: 'Factor III: Social Effectiveness',
    name: 'Self Confidence',
    description: 'Faith in one’s own competence to meet stressful challenges and navigate unfamiliar terrain.',
    assessedIn: ['Interview', 'GTO', 'Psychology'],
    rating: 4
  },
  {
    id: 'olq-10',
    factor: 'Factor III: Social Effectiveness',
    name: 'Speed of Decision',
    description: 'Ability to arrive at workable and decisive judgments swiftly when time is at a premium.',
    assessedIn: ['GTO', 'Psychology', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-11',
    factor: 'Factor III: Social Effectiveness',
    name: 'Ability to Influence the Group',
    description: 'Capacity to persuade, inspire, and steer a group toward fulfilling an objective through leadership.',
    assessedIn: ['GTO', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-12',
    factor: 'Factor III: Social Effectiveness',
    name: 'Liveliness',
    description: 'Capacity to maintain cheerfulness, high spirits, and optimism even during adversity or extreme fatigue.',
    assessedIn: ['GTO', 'Interview'],
    rating: 5
  },

  // Factor IV: Dynamic
  {
    id: 'olq-13',
    factor: 'Factor IV: Dynamic',
    name: 'Determination',
    description: 'Perseverance to achieve goals despite obstacles, setbacks, and prolonged difficulty.',
    assessedIn: ['GTO', 'Psychology', 'Interview'],
    rating: 5
  },
  {
    id: 'olq-14',
    factor: 'Factor IV: Dynamic',
    name: 'Courage',
    description: 'Ability to appreciate danger and face physical or moral hazards with composure and resolve.',
    assessedIn: ['GTO', 'Interview'],
    rating: 4
  },
  {
    id: 'olq-15',
    factor: 'Factor IV: Dynamic',
    name: 'Stamina',
    description: 'Mental and physical endurance to sustain prolonged physical exertion and intellectual pressure.',
    assessedIn: ['GTO', 'Interview'],
    rating: 4
  }
];
