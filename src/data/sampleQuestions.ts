import type { QuestionItem } from '../types';

export const SAMPLE_QUESTIONS: QuestionItem[] = [
  // 1. Personal Interview Questions
  {
    id: 'q-pi-1',
    category: 'Personal Interview Questions',
    question: 'Why do you want to join the Indian Armed Forces, and specifically the Indian Navy as an officer?',
    contextHint: 'The Interviewing Officer assesses genuine internal motivation, understanding of the naval lifestyle, and realistic commitment versus generic film-inspired patriotism.',
    recommendedKeyPoints: [
      'Acknowledge attraction to sea command, naval technology, and blue-water maritime operations.',
      'Highlight desire for a disciplined lifestyle with direct operational responsibility at a young age.',
      'Differentiate naval service: diplomatic role (showing the flag, humanitarian HADR missions, port visits) and shipboard camaraderie where officers and crew live 24/7 inside the same hull.',
      'Cite your specific branch application (e.g., Executive / General Service, Naval Architecture, Logistics, Engineering).'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },
  {
    id: 'q-pi-2',
    category: 'Personal Interview Questions',
    question: 'If you are not recommended in this SSB attempt, what is your next course of action?',
    contextHint: 'Evaluates resilience, determination (Factor IV), whether you have realistic alternative plans, and emotional stability.',
    recommendedKeyPoints: [
      'State clearly that you will introspect on your performance across Screening, Psychology, GTO, and Interview to identify improvement areas.',
      'Confirm that you will appear again in the next available attempt after targeted preparation in stamina, general awareness, and communication.',
      'Show you have a constructive parallel plan (e.g. pursuing higher studies or campus placement) so you remain productive.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },
  {
    id: 'q-pi-3',
    category: 'Personal Interview Questions',
    question: 'Tell me in order: your daily routine from morning to night, your physical fitness regime, how you spend pocket money, and your hobbies.',
    contextHint: 'Rapid-fire stress test evaluating chunking ability, memory retention under pressure, and honesty regarding daily time utilisation.',
    recommendedKeyPoints: [
      'Answer all four parts in exact order without asking the IO to repeat the question.',
      'Keep waking and sleeping hours realistic (e.g. 06:00 to 23:00).',
      'Detail actual running distance, bodyweight exercises, and sports played.',
      'Account for expenditures transparently (books, food, travel, savings) and explain hobbies with active engagement.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Advanced'
  },

  // 2. Self-Introduction & Background
  {
    id: 'q-sib-1',
    category: 'Self-Introduction & Background',
    question: 'Introduce yourself in two minutes covering your place of origin, schooling, family background, and major personal milestones.',
    contextHint: 'Tests power of expression, clarity of thought, and whether you organize information logically from past to present.',
    recommendedKeyPoints: [
      'Structure chronologically: Name and hometown -> Schooling highlights -> College / Professional studies -> Family brief -> Key sports/interests.',
      'Speak at a steady, measured pace without reciting like a rehearsed script.',
      'Highlight geographic or cultural perspective gained from your hometown or relocations.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Foundation'
  },
  {
    id: 'q-sib-2',
    category: 'Self-Introduction & Background',
    question: 'How has your hometown shaped your worldview, personality, and career ambitions?',
    contextHint: 'Assesses observational awareness of one’s local environment, socioeconomic realities, and appreciation of roots.',
    recommendedKeyPoints: [
      'Discuss geographical characteristics, major industries, or maritime/historical links if applicable.',
      'Explain community values or sports culture that influenced your personal discipline.',
      'Describe local initiatives you participated in during school or college.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },

  // 3. Strengths, Weaknesses & Self-Awareness
  {
    id: 'q-sw-1',
    category: 'Strengths, Weaknesses & Self-Awareness',
    question: 'What are your three greatest personal strengths, and how have they helped you in real crisis situations?',
    contextHint: 'Assesses realistic self-evaluation. Claims must be substantiated by real incidents from school, college, sports, or family.',
    recommendedKeyPoints: [
      'Choose authentic traits: e.g., resourcefulness under tight deadlines, calm temperament during group conflict, or physical stamina.',
      'Use the STAR framework (Situation, Task, Action, Result) for each strength.',
      'Avoid boastful exaggeration; let the outcome speak for the trait.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },
  {
    id: 'q-sw-2',
    category: 'Strengths, Weaknesses & Self-Awareness',
    question: 'What are two genuine weaknesses you possess, and what concrete steps are you taking to overcome them?',
    contextHint: 'The IO checks for honest introspection. Avoid disguised strengths like "I am a perfectionist" or "I work too hard".',
    recommendedKeyPoints: [
      'Mention authentic, addressable areas: e.g., initial hesitation in public speaking, difficulty delegating micro-tasks, or irregular reading habits.',
      'Explain specific corrective routines already in progress (e.g., daily 3-minute speech practice, using structured checklists, reading daily editorial columns).',
      'Demonstrate measurable improvement over the past 6 months.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },

  // 4. Education & Work Experience
  {
    id: 'q-edu-1',
    category: 'Education & Work Experience',
    question: 'Explain any fluctuations in your academic grades between 10th standard, 12th standard, and your graduation semesters.',
    contextHint: 'IO verifies accountability. Do you own up to poor time management or do you blame teachers, syllabus, or illnesses?',
    recommendedKeyPoints: [
      'Never make external excuses unless supported by verifiable medical emergencies.',
      'Acknowledge misjudging the syllabus volume, inadequate revision schedules, or distraction by extracurricular over-commitment.',
      'Highlight concrete corrective systems implemented to recover grades in later semesters.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },
  {
    id: 'q-edu-2',
    category: 'Education & Work Experience',
    question: 'What was your final year academic project or major technical paper, and what was your specific individual contribution?',
    contextHint: 'Verifies depth of academic competence and teamwork. Assesses whether you were an active contributor or passive passenger.',
    recommendedKeyPoints: [
      'Explain the practical objective in plain language without getting lost in unnecessary jargon.',
      'Clearly demarcate your individual role (e.g. system design, coding, testing, CAD modelling, procurement).',
      'Explain technical roadblocks faced during execution and how the team overcame them.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },

  // 5. Family, Friends & Responsibilities
  {
    id: 'q-fam-1',
    category: 'Family, Friends & Responsibilities',
    question: 'Tell me about your family members, their occupations, your relationship with each, and who you turn to when in distress.',
    contextHint: 'Evaluates emotional balance, social adaptability (Factor II), family bonding, and support systems.',
    recommendedKeyPoints: [
      'Speak with natural warmth and realism without painting an artificial fairy tale.',
      'Identify distinct positive qualities learned from father, mother, and siblings.',
      'Explain how family financial decisions and daily chores are shared.',
      'State who you confide in during crises and why their counsel is valued.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Foundation'
  },
  {
    id: 'q-fam-2',
    category: 'Family, Friends & Responsibilities',
    question: 'Name three of your closest friends. What is one quality you admire in each, and one habit you dislike and advise them to change?',
    contextHint: 'Tests objectivity in evaluating peers, constructive criticism, and whether your friendships are based on substance.',
    recommendedKeyPoints: [
      'Name genuine close friends from school, college, or sports.',
      'Mention distinct admirable qualities (e.g. punctuality, analytical mind, loyalty).',
      'Mention minor constructive weaknesses (e.g. procrastination before exams, skipping morning fitness) and explain how you help them improve.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },

  // 6. Leadership, Teamwork & Decision-Making
  {
    id: 'q-lead-1',
    category: 'Leadership, Teamwork & Decision-Making',
    question: 'Describe an instance where you led a team facing severe internal disagreements or external project failure.',
    contextHint: 'Tests Initiative, Speed of Decision, and Ability to Influence the Group (Factor III).',
    recommendedKeyPoints: [
      'Identify the root cause of friction (differing technical approaches, workload imbalances).',
      'Explain how you listened to differing viewpoints without taking sides emotionally.',
      'Describe how consensus or a decisive command decision was reached.',
      'State the final outcome and lessons learned about team dynamics.'
    ],
    answerType: 'personal_framework',
    difficulty: 'Advanced'
  },
  {
    id: 'q-lead-2',
    category: 'Leadership, Teamwork & Decision-Making',
    question: 'What is the difference between a Commander and a Manager in a military naval environment?',
    contextHint: 'Assesses conceptual clarity on military leadership, inspiring personnel through personal example, and moral courage.',
    recommendedKeyPoints: [
      'A manager handles resource allocation, schedules, and administrative processes.',
      'A military commander leads men and women into physical danger, inspires trust by sharing risks, and bears absolute accountability for mission success and lives.',
      'Emphasize leading by personal example ("Follow Me" ethos).'
    ],
    answerType: 'personal_framework',
    difficulty: 'Standard'
  },

  // 7. Indian Navy Knowledge
  {
    id: 'q-navy-1',
    category: 'Indian Navy Knowledge',
    question: 'Name the three operational Commands of the Indian Navy, their Headquarters, and explain the role of the Andaman and Nicobar Command (ANC).',
    contextHint: 'Factual naval literacy prerequisite. Evaluates geographic awareness of India\'s maritime defense architecture.',
    recommendedKeyPoints: [
      'Western Naval Command: Headquarters in Mumbai (Sword Arm of the Navy).',
      'Eastern Naval Command: Headquarters in Visakhapatnam (Guardians of the Bay of Bengal & Act East conduit).',
      'Southern Naval Command: Headquarters in Kochi (The Training Command).',
      'Andaman & Nicobar Command (ANC): India\'s only operational unified tri-service command headquartered at Port Blair, guarding vital choke points near the Malacca Strait.'
    ],
    answerType: 'factual',
    difficulty: 'Foundation'
  },
  {
    id: 'q-navy-2',
    category: 'Indian Navy Knowledge',
    question: 'What are the technical specifications and operational significance of India\'s two aircraft carriers, INS Vikramaditya and INS Vikrant?',
    contextHint: 'Tests technical literacy regarding fleet air arm operations and carrier battle group (CBG) power projection.',
    recommendedKeyPoints: [
      'INS Vikramaditya (R33): Modified Kiev-class carrier commissioned in 2013, displacement ~45,000 tonnes, STOBAR (Short Take-Off But Arrested Recovery) system, operating MiG-29K fighters.',
      'INS Vikrant (IAC-1, R11): India\'s first indigenous aircraft carrier built by Cochin Shipyard, commissioned September 2022, displacement ~45,000 tonnes, 76% indigenous content.',
      'Dual-carrier operational doctrine ensures one carrier deployed in the Arabian Sea and one in the Bay of Bengal while maintaining maintenance cycles.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },
  {
    id: 'q-navy-3',
    category: 'Indian Navy Knowledge',
    question: 'Explain the nuclear submarine triad of India and the role of the Arihant-class SSBNs.',
    contextHint: 'Tests understanding of strategic deterrence, second-strike capability, and naval nuclear propulsion.',
    recommendedKeyPoints: [
      'India\'s nuclear triad consists of land-based ballistic missiles (Agni), air-delivered gravity bombs/missiles, and sea-based ballistic missile submarines (SSBNs).',
      'INS Arihant and INS Arighaat represent the vital third leg providing continuous at-sea deterrence with survivable second-strike capability under India\'s "No First Use" nuclear doctrine.',
      'Armament includes K-15 Sagarika (750 km range) and upcoming K-4 (3,500 km range) submarine-launched ballistic missiles (SLBMs).'
    ],
    answerType: 'factual',
    difficulty: 'Advanced'
  },

  // 8. Indian Armed Forces & Ranks
  {
    id: 'q-rank-1',
    category: 'Indian Armed Forces & Ranks',
    question: 'Compare the equivalent commissioned officer ranks across the Indian Army, Indian Navy, and Indian Air Force from junior entry to three-star rank.',
    contextHint: 'Fundamental armed forces knowledge. Assessors expect flawless recall of tri-service rank structures.',
    recommendedKeyPoints: [
      'Lieutenant (Army) = Sub-Lieutenant (Navy) = Flying Officer (Air Force)',
      'Captain (Army) = Lieutenant (Navy) = Flight Lieutenant (Air Force)',
      'Major (Army) = Lieutenant Commander (Navy) = Squadron Leader (Air Force)',
      'Lt Colonel (Army) = Commander (Navy) = Wing Commander (Air Force)',
      'Colonel (Army) = Captain (Navy) = Group Captain (Air Force)',
      'Brigadier (Army) = Commodore (Navy) = Air Commodore (Air Force)',
      'Major General (Army) = Rear Admiral (Navy) = Air Vice Marshal (Air Force)',
      'Lt General (Army) = Vice Admiral (Navy) = Air Marshal (Air Force)'
    ],
    answerType: 'factual',
    difficulty: 'Foundation'
  },
  {
    id: 'q-rank-2',
    category: 'Indian Armed Forces & Ranks',
    question: 'What is the role of the Chief of Defence Staff (CDS) and the Department of Military Affairs (DMA)?',
    contextHint: 'Tests awareness of defense reforms, jointness, and civil-military administration.',
    recommendedKeyPoints: [
      'CDS acts as the permanent Chairman of the Chiefs of Staff Committee and principal military adviser to the Defence Minister.',
      'Heads the Department of Military Affairs (DMA) within the Ministry of Defence.',
      'Mandated to promote jointness in procurement, training, and operational doctrines, leading towards Integrated Theatre Commands.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },

  // 9. Maritime Security & Naval Operations
  {
    id: 'q-mar-1',
    category: 'Maritime Security & Naval Operations',
    question: 'Explain the Indian Navy\'s recent anti-piracy and anti-drone operations under Operation Sankalp in the Gulf of Aden and Arabian Sea.',
    contextHint: 'Evaluates awareness of contemporary operational deployments and India\'s role as a net security provider.',
    recommendedKeyPoints: [
      'Operation Sankalp deployed frontline destroyers (INS Kolkata, INS Kochi, INS Chennai, INS Visakhapatnam) to protect commercial shipping routes.',
      'Successful interception of hijacked bulk carrier MV Ruen: Indian Navy MARCOS commandos conducted a 40-hour standoff, forcing the surrender of 35 pirates and rescuing 17 crew members.',
      'Highlighted coordination between surface combatants, Boeing P-8I Neptune maritime patrol aircraft, and Sea Guardian MQ-9B drones.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },
  {
    id: 'q-mar-2',
    category: 'Maritime Security & Naval Operations',
    question: 'What are Maritime Choke Points, and why are the Straits of Malacca, Bab-el-Mandeb, and Hormuz critical to India\'s economic security?',
    contextHint: 'Tests geostrategic comprehension of maritime trade routes (SLOCs) and naval choke-point control.',
    recommendedKeyPoints: [
      'Over 90% of India\'s international trade by volume and over 70% by value travels via sea lanes.',
      'Strait of Hormuz: Vital passage for Middle Eastern crude oil and LNG imports into India.',
      'Bab-el-Mandeb: Gate to the Red Sea and Suez Canal, connecting Indian exports to Europe.',
      'Strait of Malacca: Crucial conduit for Indian trade with East Asia, and primary transit lane for Chinese energy imports, monitored from ANC Port Blair.'
    ],
    answerType: 'factual',
    difficulty: 'Advanced'
  },

  // 10. Defence Technology & Equipment
  {
    id: 'q-tech-1',
    category: 'Defence Technology & Equipment',
    question: 'What is Air-Independent Propulsion (AIP) technology, and why is it central to India\'s Project 75-India (P-75I) submarine program?',
    contextHint: 'Tests technical understanding of conventional diesel-electric submarine stealth and underwater endurance.',
    recommendedKeyPoints: [
      'Standard conventional diesel-electric submarines must surface or snorkel every few days to run diesel generators and recharge batteries, making them vulnerable to radar and maritime patrol aircraft.',
      'AIP allows non-nuclear submarines to generate electricity submerged using fuel cells or closed-cycle steam turbines without atmospheric oxygen.',
      'Increases submerged endurance from 3-4 days up to 2-3 weeks, closing the gap with nuclear attack submarines (SSNs).'
    ],
    answerType: 'factual',
    difficulty: 'Advanced'
  },
  {
    id: 'q-tech-2',
    category: 'Defence Technology & Equipment',
    question: 'Describe the capabilities of the BrahMos supersonic cruise missile and its deployment on Indian Navy destroyers and frigates.',
    contextHint: 'Tests familiarity with standard shipboard strike weapon systems.',
    recommendedKeyPoints: [
      'Joint Indo-Russian development named after Brahmaputra and Moskva rivers.',
      'World\'s fastest operational cruise missile flying at Mach 2.8 to 3.0 with a "fire-and-forget" trajectory.',
      'Fitted in vertical launch modular systems (VLMS) on Visakhapatnam-class, Kolkata-class, and Rajput-class destroyers, plus Talwar-class and Nilgiri-class frigates.',
      'Provides both anti-ship (ASuW) and precision land-attack cruise missile (LACM) capability.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },

  // 11. National & International Affairs
  {
    id: 'q-aff-1',
    category: 'National & International Affairs',
    question: 'Analyze India\'s SAGAR initiative (Security and Growth for All in the Region) and how it counters the "String of Pearls" strategy.',
    contextHint: 'Assesses geopolitical grasp of maritime diplomacy, foreign policy, and regional security architecture.',
    recommendedKeyPoints: [
      'SAGAR focuses on collaborative maritime security, coastal radar networks, HADR assistance, and economic capacity building for island neighbors (Mauritius, Seychelles, Sri Lanka, Maldives).',
      'Counters Chinese port infrastructure investments in Gwadar, Hambantota, and Djibouti by developing reciprocal logistic access at Duqm (Oman), Chabahar (Iran), and Agaléga.',
      'Underscores India as the first responder and preferred security partner in the Indian Ocean basin.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },
  {
    id: 'q-aff-2',
    category: 'National & International Affairs',
    question: 'What is the Quadrilateral Security Dialogue (Quad), and what was the strategic significance of the Malabar naval exercise?',
    contextHint: 'Evaluates understanding of Indo-Pacific multilateral groupings and multinational naval interoperability.',
    recommendedKeyPoints: [
      'Quad brings together India, USA, Japan, and Australia committed to a free, open, and rules-based Indo-Pacific.',
      'Exercise Malabar serves as the primary naval manifestation of Quad military interoperability, practicing high-end anti-submarine warfare (ASW), air defence, and cross-deck flight operations.',
      'Maintains sea lane open access and deters unilateral coercion in international waters.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },

  // 12. General Knowledge & Reasoning
  {
    id: 'q-gk-1',
    category: 'General Knowledge & Reasoning',
    question: 'Explain the legal concept of Exclusive Economic Zone (EEZ) under UNCLOS and the rights of a coastal state within it.',
    contextHint: 'Tests international maritime law knowledge applicable to naval operations.',
    recommendedKeyPoints: [
      'UNCLOS defines the Territorial Sea up to 12 nautical miles from baseline (full sovereign territory).',
      'Contiguous Zone extends from 12 to 24 nautical miles (customs, fiscal, immigration enforcement).',
      'EEZ extends up to 200 nautical miles from baseline. The coastal state has sovereign exploration rights over marine resources, energy generation, and seabed minerals, while foreign vessels maintain freedom of navigation and overflight.'
    ],
    answerType: 'factual',
    difficulty: 'Standard'
  },
  {
    id: 'q-gk-2',
    category: 'General Knowledge & Reasoning',
    question: 'How do ocean currents, thermoclines, and salinity layers affect submarine sonar detection in the Arabian Sea?',
    contextHint: 'Tests scientific reasoning and its practical tactical application to naval anti-submarine warfare.',
    recommendedKeyPoints: [
      'Sound velocity in seawater increases with temperature, salinity, and water depth/pressure.',
      'The thermocline layer is a rapid temperature drop zone that acts as an acoustic refractive barrier, bending sonar rays downward and creating "shadow zones" where submarines can evade active sonar.',
      'Naval sonar operators deploy Variable Depth Sonar (VDS) and towed arrays to lower acoustic sensors below the thermocline layer.'
    ],
    answerType: 'factual',
    difficulty: 'Advanced'
  }
];
