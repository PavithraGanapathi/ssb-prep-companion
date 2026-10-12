import type { PsychologyExercise } from '../types';

export const PSYCHOLOGY_EXERCISES: PsychologyExercise[] = [
  // 1. PPDT - Picture Perception & Discussion Test
  {
    id: 'ppdt-1',
    type: 'PPDT',
    title: 'PPDT Screening: Coastal Community Flood Evacuation',
    instructions: 'Step 1: Observe the ambiguous scene for 30 seconds. Step 2: Mark characters in the box (Number, Age, Gender, Mood) and identify the central character (Hero). Step 3: Write the past, present, and future action in 4 minutes.',
    durationSeconds: 270, // 30s observation + 240s writing
    sceneType: 'ppdt_coastal_embankment',
    content: 'An embankment overlooking a swollen tidal estuary during an overcast morning. Three figures are visible: a proactive young person gesturing towards a moored vessel, an elderly person listening, and a person carrying supplies.',
    tips: [
      'Identify the main character (Hero) clearly with Age (e.g. 23), Gender (M), and Mood (+).',
      'Give the hero a realistic name and realistic profession (e.g. Sub-Lieutenant on leave, village youth coordinator).',
      'The story must clearly cover: (1) What led to the situation, (2) What is currently happening, and (3) The positive outcome achieved.',
      'Show teamwork, initiative, and resourcefulness without miraculous super-powers.'
    ]
  },

  // 2. TAT - Thematic Apperception Test
  {
    id: 'tat-1',
    type: 'TAT',
    title: 'TAT Scene 1: Heavy Sea Navigation & Radar Anomaly',
    instructions: 'Observe the scene for 30 seconds. Write a complete story in 4 minutes with clear character roles, logical mitigation, and successful outcome.',
    durationSeconds: 240,
    sceneType: 'tat_naval_bridge',
    content: 'On the bridge of a naval frigate during a night passage in rough sea state. Two officers are on duty: one observing through binoculars while the other reviews radar tracking contacts.',
    tips: [
      'Depict standard naval communication protocols and calm decision-making.',
      'Hero shows presence of mind, alerts the commanding officer if appropriate, and navigates safely.',
      'Conclude with successful avoidance of navigational hazard and completion of fleet exercise.'
    ]
  },
  {
    id: 'tat-2',
    type: 'TAT',
    title: 'TAT Scene 2: Engineering Workshop & Auxiliary Generator Repair',
    instructions: 'Write a realistic story in 4 minutes based on technical troubleshooting, systematic diagnosis, and team leadership.',
    durationSeconds: 240,
    content: 'Three naval engineers in boiler suits are clustered around an opened auxiliary propulsion motor inside a ship dockyard workshop, analyzing diagnostic blueprints.',
    tips: [
      'Focus on technical curiosity, logical diagnosis, and adherence to standard safety procedures.',
      'Avoid blaming equipment or teammates; demonstrate constructive problem-solving.',
      'Show completion of dockyard overhaul ahead of schedule.'
    ]
  },

  // 3. WAT - Word Association Test (60 Words Rapid Sprint)
  {
    id: 'wat-1',
    type: 'WAT',
    title: 'WAT Rapid Pacing Drill: 60 SSB Stimulus Words',
    instructions: 'Each word is presented for 15 seconds. Formulate an immediate, spontaneous, action-oriented sentence reflecting positive personality traits and emotional maturity.',
    durationSeconds: 15,
    content: 'Practice all 60 standard words or configure a rapid 15 or 30 word session.',
    words: [
      'Courage', 'Sea', 'Duty', 'Risk', 'Command',
      'Failure', 'Discipline', 'Companion', 'Initiative', 'Solitude',
      'Danger', 'Team', 'Attack', 'Order', 'Leader',
      'Storm', 'Defeat', 'Calm', 'Harbor', 'Honor',
      'Mission', 'Panic', 'Resolve', 'Trust', 'Victory',
      'Weapon', 'Alert', 'Depth', 'Fear', 'Flag',
      'Glide', 'Hope', 'Journey', 'Knowledge', 'Loyalty',
      'Navy', 'Ocean', 'Power', 'Quick', 'Rescue',
      'Safety', 'Tough', 'Unity', 'Value', 'Wave',
      'Action', 'Brave', 'Care', 'Decision', 'Effort',
      'Forward', 'Guard', 'Help', 'Iron', 'Keen',
      'March', 'Peace', 'Quiet', 'Stand', 'Zeal'
    ],
    tips: [
      'Avoid preachy proverbs or moral lessons ("One should always be brave").',
      'Write active, observational sentences ("Courage overcomes maritime adversity").',
      'Do not artificially deny negative words (accept words like "Fear" or "Defeat" naturally, e.g. "Defeat teaches resilience").',
      'Keep responses concise and spontaneous.'
    ]
  },

  // 4. SRT - Situation Reaction Test (30 Scenarios)
  {
    id: 'srt-1',
    type: 'SRT',
    title: 'SRT Battery: 15 Realistic Situations',
    instructions: 'Respond to each situation within 30 seconds. State what you would do clearly, decisively, and completely.',
    durationSeconds: 30,
    content: 'A series of everyday and operational dilemmas testing Speed of Decision, Social Responsibility, and Resourcefulness.',
    situations: [
      {
        id: 'srt-s-1',
        situation: 'He was returning from night duty when he noticed thick smoke billowing from a ground floor apartment while residents were asleep. He...',
        sampleAction: 'Raised alarm loudly, called fire services, isolated electrical main switch, evacuated residents using stairs, and assisted fire personnel.',
        qualityTested: 'Presence of mind, Courage, Social Responsibility'
      },
      {
        id: 'srt-s-2',
        situation: 'On his way to an important job interview, his train broke down 5 km before the destination station. He...',
        sampleAction: 'Assessed available time, exited station, hired a direct autorickshaw/cab, informed the HR coordinator about traffic delay, and arrived on time.',
        qualityTested: 'Resourcefulness, Initiative, Speed of Decision'
      },
      {
        id: 'srt-s-3',
        situation: 'During an inter-college basketball final, his team was trailing by 8 points and his captain was injured. He...',
        sampleAction: 'Took over on-court captaincy, re-energized teammates, adjusted defensive marking, focused on fast breaks, and won the match.',
        qualityTested: 'Leadership, Stamina, Ability to Influence the Group'
      },
      {
        id: 'srt-s-4',
        situation: 'While camping in a coastal area, one of his friends was stung by an unidentified marine creature and developed severe swelling and pain. He...',
        sampleAction: 'Kept friend calm, applied warm water compress, immobilized affected limb, and transported him immediately to the nearest primary health center.',
        qualityTested: 'Effective Intelligence, Composure'
      },
      {
        id: 'srt-s-5',
        situation: 'His project teammate was consistently missing project submission deadlines due to family difficulties. He...',
        sampleAction: 'Empathized with his situation, helped him redistribute pending tasks among the group, completed critical modules together, and met the deadline.',
        qualityTested: 'Cooperation, Social Adaptability'
      }
    ],
    tips: [
      'Do not write half-hearted actions like "He tried to..." or "He would think...". Write definitive completed actions: "He called base, rescued crew, and rejoined convoy."',
      'Address the core hazard first, then secondary consequences.',
      'Show resourcefulness using whatever tools and people are naturally available.'
    ]
  },

  // 5. SDT - Self-Description Test
  {
    id: 'sdt-1',
    type: 'SDT',
    title: 'Self-Description Test (SDT): Structured Introspection',
    instructions: 'Prepare 5 structured paragraphs: (1) Parents\' opinion, (2) Teachers\'/Professors\' opinion, (3) Friends\' opinion, (4) Self-opinion, (5) Qualities you wish to develop.',
    durationSeconds: 900,
    content: 'SDT reveals self-awareness, emotional balance, and alignment between your perception of yourself and how your actions appear in your PIQ and psychology tests.',
    tips: [
      'Ensure the opinion of teachers aligns with your academic records and extracurricular involvement in the PIQ.',
      'Be genuine; highlight both real strengths and authentic areas of growth.',
      'Mention concrete steps you are already taking to improve traits (e.g. practicing public speaking, endurance running).'
    ]
  }
];
