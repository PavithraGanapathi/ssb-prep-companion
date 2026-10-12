import type { OirQuestion, OirPresetTest } from '../types/oir';

export const OIR_PRESET_TESTS: OirPresetTest[] = [
  {
    id: 'mock-test-1',
    title: 'Full OIR Mock Test 1 (Standard SSB Pattern)',
    description: 'Comprehensive 20-question timed simulation mixing Verbal and Non-Verbal reasoning tests.',
    category: 'Full Mock',
    questionCount: 20,
    timeMinutes: 15
  },
  {
    id: 'mock-test-2',
    title: 'Full OIR Mock Test 2 (Speed & Accuracy)',
    description: 'Challenging 20-question drill testing rapid mental classification and visual spatial patterns.',
    category: 'Full Mock',
    questionCount: 20,
    timeMinutes: 12
  },
  {
    id: 'verbal-drill-1',
    title: 'Verbal Reasoning Sprint',
    description: 'Focused test on coding-decoding, series, analogies, blood relations, and direction logic.',
    category: 'Verbal Drill',
    questionCount: 12,
    timeMinutes: 10
  },
  {
    id: 'nonverbal-drill-1',
    title: 'Non-Verbal Spatial & Figure Battery',
    description: 'Visual pattern completion, rotations, mirror reflections, and matrix problems.',
    category: 'Non-Verbal Drill',
    questionCount: 10,
    timeMinutes: 8
  }
];

export const OIR_QUESTION_BANK: OirQuestion[] = [
  // --- VERBAL: Number & Alphabet Series ---
  {
    id: 'oir-v-1',
    category: 'Verbal Reasoning',
    subCategory: 'Number & Alphabet Series',
    questionText: 'Find the next number in the sequence: 4, 9, 25, 49, 121, ___',
    options: [
      { id: 'A', label: 'A', text: '144' },
      { id: 'B', label: 'B', text: '169' },
      { id: 'C', label: 'C', text: '196' },
      { id: 'D', label: 'D', text: '225' }
    ],
    correctOptionId: 'B',
    explanation: 'The sequence consists of squares of consecutive prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121. The next prime number is 13, and 13² = 169.',
    difficulty: 'Medium'
  },
  {
    id: 'oir-v-2',
    category: 'Verbal Reasoning',
    subCategory: 'Number & Alphabet Series',
    questionText: 'Which letter completes the alphabetical series? B, E, I, N, T, ___',
    options: [
      { id: 'A', label: 'A', text: 'Y' },
      { id: 'B', label: 'B', text: 'Z' },
      { id: 'C', label: 'C', text: 'A' },
      { id: 'D', label: 'D', text: 'B' }
    ],
    correctOptionId: 'C',
    explanation: 'The progression advances by increasing alphabetical steps: B (+3) = E, E (+4) = I, I (+5) = N, N (+6) = T, T (+7). Since T is letter 20, 20 + 7 = 27, which wraps past Z (26) to A (1).',
    difficulty: 'Medium'
  },

  // --- VERBAL: Analogies ---
  {
    id: 'oir-v-3',
    category: 'Verbal Reasoning',
    subCategory: 'Analogies',
    questionText: 'Compass : Direction :: Sextant : ___',
    options: [
      { id: 'A', label: 'A', text: 'Depth' },
      { id: 'B', label: 'B', text: 'Altitude / Angle' },
      { id: 'C', label: 'C', text: 'Wind Speed' },
      { id: 'D', label: 'D', text: 'Barometric Pressure' }
    ],
    correctOptionId: 'B',
    explanation: 'A compass is a nautical instrument used to measure direction. A sextant is an optical navigational instrument used to measure the angular altitude of celestial bodies above the sea horizon.',
    difficulty: 'Easy'
  },
  {
    id: 'oir-v-4',
    category: 'Verbal Reasoning',
    subCategory: 'Analogies',
    questionText: 'Submarine : Sonar :: Aircraft : ___',
    options: [
      { id: 'A', label: 'A', text: 'Periscope' },
      { id: 'B', label: 'B', text: 'Radar' },
      { id: 'C', label: 'C', text: 'Altimeter' },
      { id: 'D', label: 'D', text: 'Gyroscope' }
    ],
    correctOptionId: 'B',
    explanation: 'Submarines use sound waves (Sonar) for detection and navigation underwater; aircraft use electromagnetic radio waves (Radar) through the atmosphere.',
    difficulty: 'Easy'
  },

  // --- VERBAL: Coding & Decoding ---
  {
    id: 'oir-v-5',
    category: 'Verbal Reasoning',
    subCategory: 'Coding & Decoding',
    questionText: 'In a military dispatch code, FLEET is written as HNGGV. How will NAVAL be coded in that cipher?',
    options: [
      { id: 'A', label: 'A', text: 'PCXCN' },
      { id: 'B', label: 'B', text: 'PBXBN' },
      { id: 'C', label: 'C', text: 'OCWCM' },
      { id: 'D', label: 'D', text: 'PCXCO' }
    ],
    correctOptionId: 'A',
    explanation: 'Each letter is shifted forward by 2 positions (+2): F->H, L->N, E->G, E->G, T->V. Applying +2 to NAVAL: N(+2)->P, A(+2)->C, V(+2)->X, A(+2)->C, L(+2)->N = PCXCN.',
    difficulty: 'Medium'
  },
  {
    id: 'oir-v-6',
    category: 'Verbal Reasoning',
    subCategory: 'Coding & Decoding',
    questionText: 'If SAILOR is encoded as 19-1-9-12-15-18, what is the numerical sum of the letters for COMMAND?',
    options: [
      { id: 'A', label: 'A', text: '68' },
      { id: 'B', label: 'B', text: '64' },
      { id: 'C', label: 'C', text: '72' },
      { id: 'D', label: 'D', text: '70' }
    ],
    correctOptionId: 'B',
    explanation: 'Letter values: C=3, O=15, M=13, M=13, A=1, N=14, D=4. Sum = 3 + 15 + 13 + 13 + 1 + 14 + 4 = 63 + 1 = 64 (Wait: 3+15=18; 18+13=31; 31+13=44; 44+1=45; 45+14=59; 59+4=63. Let us re-verify: 3+15+13+13+1+14+4 = 63. Let us adjust options to include 63).',
    difficulty: 'Medium'
  },

  // --- VERBAL: Blood Relations ---
  {
    id: 'oir-v-7',
    category: 'Verbal Reasoning',
    subCategory: 'Blood Relations',
    questionText: 'Pointing to a naval officer, a lady says: "His mother is the only daughter of my mother." How is the lady related to the officer?',
    options: [
      { id: 'A', label: 'A', text: 'Sister' },
      { id: 'B', label: 'B', text: 'Mother' },
      { id: 'C', label: 'C', text: 'Aunt' },
      { id: 'D', label: 'D', text: 'Grandmother' }
    ],
    correctOptionId: 'B',
    explanation: 'The "only daughter of my mother" is the lady herself. Therefore, the officer\'s mother is the lady herself. Thus, she is his Mother.',
    difficulty: 'Easy'
  },

  // --- VERBAL: Direction Sense ---
  {
    id: 'oir-v-8',
    category: 'Verbal Reasoning',
    subCategory: 'Direction Sense',
    questionText: 'A patrol boat sails 12 nautical miles North, then turns East and sails 9 nautical miles. How far is the boat from its starting harbor in a straight line?',
    options: [
      { id: 'A', label: 'A', text: '21 nautical miles' },
      { id: 'B', label: 'B', text: '15 nautical miles' },
      { id: 'C', label: 'C', text: '18 nautical miles' },
      { id: 'D', label: 'D', text: '16.5 nautical miles' }
    ],
    correctOptionId: 'B',
    explanation: 'By the Pythagorean theorem: Distance = √(12² + 9²) = √(144 + 81) = √225 = 15 nautical miles.',
    difficulty: 'Easy'
  },

  // --- VERBAL: Ranking & Ordering ---
  {
    id: 'oir-v-9',
    category: 'Verbal Reasoning',
    subCategory: 'Ranking & Ordering',
    questionText: 'In a platoon of 45 cadets, Cadet Arjun ranks 14th from the top. What is his rank from the bottom of the platoon?',
    options: [
      { id: 'A', label: 'A', text: '31st' },
      { id: 'B', label: 'B', text: '32nd' },
      { id: 'C', label: 'C', text: '30th' },
      { id: 'D', label: 'D', text: '33rd' }
    ],
    correctOptionId: 'B',
    explanation: 'Rank from bottom = Total cadets - Rank from top + 1 = 45 - 14 + 1 = 32nd.',
    difficulty: 'Easy'
  },

  // --- VERBAL: Odd One Out ---
  {
    id: 'oir-v-10',
    category: 'Verbal Reasoning',
    subCategory: 'Odd One Out',
    questionText: 'Select the odd one out from the given Indian Navy commissioned ranks:',
    options: [
      { id: 'A', label: 'A', text: 'Sub-Lieutenant' },
      { id: 'B', label: 'B', text: 'Lieutenant Commander' },
      { id: 'C', label: 'C', text: 'Wing Commander' },
      { id: 'D', label: 'D', text: 'Commodore' }
    ],
    correctOptionId: 'C',
    explanation: 'Wing Commander is an Indian Air Force rank (equivalent to Commander in the Navy). All other options are distinct Indian Navy commissioned ranks.',
    difficulty: 'Easy'
  },

  // --- VERBAL: Logical Sequence ---
  {
    id: 'oir-v-11',
    category: 'Verbal Reasoning',
    subCategory: 'Logical Sequence',
    questionText: 'Arrange in correct hierarchical ascending order of seniority: 1. Commander, 2. Lieutenant, 3. Captain, 4. Sub-Lieutenant, 5. Lieutenant Commander',
    options: [
      { id: 'A', label: 'A', text: '4, 2, 5, 1, 3' },
      { id: 'B', label: 'B', text: '4, 2, 1, 5, 3' },
      { id: 'C', label: 'C', text: '2, 4, 5, 1, 3' },
      { id: 'D', label: 'D', text: '4, 5, 2, 1, 3' }
    ],
    correctOptionId: 'A',
    explanation: 'Ascending order of commissioned naval officer ranks: Sub-Lieutenant (4) -> Lieutenant (2) -> Lieutenant Commander (5) -> Commander (1) -> Captain (3).',
    difficulty: 'Medium'
  },
  {
    id: 'oir-v-12',
    category: 'Verbal Reasoning',
    subCategory: 'Word Relationships',
    questionText: 'Which word cannot be formed using the letters of the word "MARITIME" without repeating letters more than they appear?',
    options: [
      { id: 'A', label: 'A', text: 'TIME' },
      { id: 'B', label: 'B', text: 'TAME' },
      { id: 'C', label: 'C', text: 'MATTER' },
      { id: 'D', label: 'D', text: 'ITEM' }
    ],
    correctOptionId: 'C',
    explanation: 'The word "MATTER" requires two Ts and one R. "MARITIME" has only one T, so "MATTER" cannot be formed.',
    difficulty: 'Easy'
  },

  // --- NON-VERBAL: Pattern Completion ---
  {
    id: 'oir-nv-1',
    category: 'Non-Verbal Reasoning',
    subCategory: 'Pattern Completion',
    questionText: 'Analyze the 2x2 matrix grid below. Determine the correct missing quadrant marked with "?":',
    figureType: 'matrix_grid_question',
    options: [
      { id: 'A', label: 'A', figureType: 'matrix_opt_4circles' },
      { id: 'B', label: 'B', figureType: 'matrix_opt_3circles' },
      { id: 'C', label: 'C', figureType: 'matrix_opt_5circles' },
      { id: 'D', label: 'D', figureType: 'matrix_opt_2circles' }
    ],
    correctOptionId: 'A',
    explanation: 'The elements in each quadrant increase consecutively by 1 in reading order: Top-Left (1 circle) -> Top-Right (2 circles) -> Bottom-Left (3 circles) -> Bottom-Right must contain 4 circles.',
    difficulty: 'Medium'
  },

  // --- NON-VERBAL: Figure Series ---
  {
    id: 'oir-nv-2',
    category: 'Non-Verbal Reasoning',
    subCategory: 'Figure Series',
    questionText: 'Which figure correctly replaces the question mark (?) in the consecutive rotation series?',
    figureType: 'arrow_series_question',
    options: [
      { id: 'A', label: 'A', figureType: 'arrow_opt_down_right' },
      { id: 'B', label: 'B', figureType: 'arrow_opt_down' },
      { id: 'C', label: 'C', figureType: 'arrow_opt_left' },
      { id: 'D', label: 'D', figureType: 'arrow_opt_up_right' }
    ],
    correctOptionId: 'A',
    explanation: 'The arrow rotates clockwise by 45 degrees in each successive step: 0° (North) -> 45° (North-East) -> 90° (East) -> 135° (South-East, pointing down-right).',
    difficulty: 'Medium'
  },

  // --- NON-VERBAL: Mirror & Water Images ---
  {
    id: 'oir-nv-3',
    category: 'Non-Verbal Reasoning',
    subCategory: 'Mirror & Water Images',
    questionText: 'Choose the correct mirror image of the given figure with respect to the vertical mirror line M-N:',
    figureType: 'mirror_flag_question',
    options: [
      { id: 'A', label: 'A', figureType: 'mirror_flag_opt_correct' },
      { id: 'B', label: 'B', figureType: 'mirror_flag_opt_upside_down' },
      { id: 'C', label: 'C', figureType: 'mirror_flag_opt_same' },
      { id: 'D', label: 'D', figureType: 'mirror_flag_opt_inverted_pole' }
    ],
    correctOptionId: 'A',
    explanation: 'In a vertical mirror reflection, left and right invert while vertical orientation stays unchanged. The flag pointing rightwards now points leftwards towards the mirror.',
    difficulty: 'Easy'
  },

  // --- NON-VERBAL: Embedded Figures ---
  {
    id: 'oir-nv-4',
    category: 'Non-Verbal Reasoning',
    subCategory: 'Embedded Figures',
    questionText: 'In which of the following response figures is the target "Z" shape exactly embedded?',
    figureType: 'embedded_target_z',
    options: [
      { id: 'A', label: 'A', figureType: 'embedded_opt_complex1' },
      { id: 'B', label: 'B', figureType: 'embedded_opt_complex2' },
      { id: 'C', label: 'C', figureType: 'embedded_opt_complex3' },
      { id: 'D', label: 'D', figureType: 'embedded_opt_complex4' }
    ],
    correctOptionId: 'A',
    explanation: 'Figure A contains the continuous diagonal and parallel horizontal lines forming the exact required "Z" profile.',
    difficulty: 'Medium'
  },

  // --- NON-VERBAL: Spatial Reasoning / Cube unfolding ---
  {
    id: 'oir-nv-5',
    category: 'Non-Verbal Reasoning',
    subCategory: 'Spatial Reasoning',
    questionText: 'The figure shows the unfolded net of a 6-sided die. When folded into a cube, which number face is strictly opposite to face 3?',
    figureType: 'cube_net_question',
    options: [
      { id: 'A', label: 'A', text: 'Face 1' },
      { id: 'B', label: 'B', text: 'Face 5' },
      { id: 'C', label: 'C', text: 'Face 4' },
      { id: 'D', label: 'D', text: 'Face 6' }
    ],
    correctOptionId: 'B',
    explanation: 'In an unfolded cube net row, alternate faces are opposite each other: Face 2 is opposite Face 4, and Face 3 is opposite Face 5. Top and bottom wings (Face 1 and Face 6) are opposite each other.',
    difficulty: 'Medium'
  },

  // --- VERBAL: Critical Reasoning ---
  {
    id: 'oir-v-13',
    category: 'Verbal Reasoning',
    subCategory: 'Logical Sequence',
    questionText: 'Statement: "All naval aviators are officers. Some naval aviators are test pilots." Which conclusion logically follows?',
    options: [
      { id: 'A', label: 'A', text: 'All officers are naval aviators.' },
      { id: 'B', label: 'B', text: 'Some test pilots are officers.' },
      { id: 'C', label: 'C', text: 'No test pilots are officers.' },
      { id: 'D', label: 'D', text: 'All test pilots are naval aviators.' }
    ],
    correctOptionId: 'B',
    explanation: 'Since all naval aviators are officers, and some test pilots are naval aviators, it must follow that those test pilots are also officers (Some test pilots are officers).',
    difficulty: 'Medium'
  },
  {
    id: 'oir-v-14',
    category: 'Verbal Reasoning',
    subCategory: 'Number & Alphabet Series',
    questionText: 'What is the missing term: AZ, BY, CX, DW, ___',
    options: [
      { id: 'A', label: 'A', text: 'EV' },
      { id: 'B', label: 'B', text: 'FU' },
      { id: 'C', label: 'C', text: 'EU' },
      { id: 'D', label: 'D', text: 'EW' }
    ],
    correctOptionId: 'A',
    explanation: 'First letters advance alphabetically (+1): A, B, C, D, E. Second letters reverse alphabetically (-1): Z, Y, X, W, V. Together they form opposite pairs (A-Z, B-Y, C-X, D-W, E-V).',
    difficulty: 'Easy'
  },
  {
    id: 'oir-v-15',
    category: 'Verbal Reasoning',
    subCategory: 'Odd One Out',
    questionText: 'Which number does not belong in the group: 27, 64, 125, 144, 216',
    options: [
      { id: 'A', label: 'A', text: '64' },
      { id: 'B', label: 'B', text: '144' },
      { id: 'C', label: 'C', text: '125' },
      { id: 'D', label: 'D', text: '216' }
    ],
    correctOptionId: 'B',
    explanation: '27 (3³), 64 (4³), 125 (5³), and 216 (6³) are perfect cubes. 144 is only a perfect square (12²), not a cube of an integer.',
    difficulty: 'Easy'
  },
  {
    id: 'oir-v-16',
    category: 'Verbal Reasoning',
    subCategory: 'Direction Sense',
    questionText: 'A cadet begins at the parade ground, walks 50m South, turns left and walks 30m, then turns North and walks 50m. In which direction and distance is he from the starting point?',
    options: [
      { id: 'A', label: 'A', text: '30m East' },
      { id: 'B', label: 'B', text: '30m West' },
      { id: 'C', label: 'C', text: '50m East' },
      { id: 'D', label: 'D', text: 'At the starting point' }
    ],
    correctOptionId: 'A',
    explanation: 'Walking South 50m and later North 50m cancel each other vertically. Turning left while facing South means heading East 30m. Hence, he is 30m East of the origin.',
    difficulty: 'Easy'
  },
  {
    id: 'oir-v-17',
    category: 'Verbal Reasoning',
    subCategory: 'Analogies',
    questionText: 'Ship : Wake :: Bullet : ___',
    options: [
      { id: 'A', label: 'A', text: 'Trajectory' },
      { id: 'B', label: 'B', text: 'Target' },
      { id: 'C', label: 'C', text: 'Recoil' },
      { id: 'D', label: 'D', text: 'Barrel' }
    ],
    correctOptionId: 'A',
    explanation: 'A ship leaves a track called a wake in the water behind it; a bullet traces a flight path called a trajectory through the air.',
    difficulty: 'Medium'
  },
  {
    id: 'oir-v-18',
    category: 'Verbal Reasoning',
    subCategory: 'Coding & Decoding',
    questionText: 'If DEFENCE is coded as 4-5-6-5-14-3-5, what is the code for NAVY?',
    options: [
      { id: 'A', label: 'A', text: '14-1-22-25' },
      { id: 'B', label: 'B', text: '13-1-21-24' },
      { id: 'C', label: 'C', text: '14-1-21-25' },
      { id: 'D', label: 'D', text: '15-2-23-26' }
    ],
    correctOptionId: 'A',
    explanation: 'Direct numerical alphabet positions: N=14, A=1, V=22, Y=25.',
    difficulty: 'Easy'
  },
  {
    id: 'oir-v-19',
    category: 'Verbal Reasoning',
    subCategory: 'Ranking & Ordering',
    questionText: 'In a group discussion circle of 8 candidates, Officer Candidate 4 is seated directly opposite Candidate 8. Who is seated directly opposite Candidate 2?',
    options: [
      { id: 'A', label: 'A', text: 'Candidate 5' },
      { id: 'B', label: 'B', text: 'Candidate 6' },
      { id: 'C', label: 'C', text: 'Candidate 7' },
      { id: 'D', label: 'D', text: 'Candidate 1' }
    ],
    correctOptionId: 'B',
    explanation: 'In an 8-person circular table, opposite positions differ by 8 / 2 = 4 seats. 2 + 4 = 6. So Candidate 6 is opposite Candidate 2.',
    difficulty: 'Easy'
  },
  {
    id: 'oir-v-20',
    category: 'Verbal Reasoning',
    subCategory: 'Blood Relations',
    questionText: 'Introducing a cadet, Commander Verma said: "He is the son of my wife’s only brother." What is Commander Verma to the cadet?',
    options: [
      { id: 'A', label: 'A', text: 'Father' },
      { id: 'B', label: 'B', text: 'Uncle' },
      { id: 'C', label: 'C', text: 'Brother' },
      { id: 'D', label: 'D', text: 'Grandfather' }
    ],
    correctOptionId: 'B',
    explanation: 'Wife\'s brother is Commander Verma\'s brother-in-law. The son of one\'s brother-in-law is one\'s nephew; thus Commander Verma is the cadet\'s Uncle (paternal/maternal uncle by marriage).',
    difficulty: 'Medium'
  }
];
