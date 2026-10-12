import type { CurrentAffairItem } from '../types';

export const CURRENT_AFFAIRS_LAST_UPDATED = '15 October 2024';
export const CURRENT_AFFAIRS_DISCLOSURE = 
  'Curated reference briefings verified from official government gazettes, PIB releases, and primary defence publications. This repository is static and not an automated live feed.';

export const SAMPLE_CURRENT_AFFAIRS: CurrentAffairItem[] = [
  {
    id: 'ca-1',
    title: 'Operation Sankalp: Indian Navy High-Seas Interception and MV Ruen Rescue',
    category: 'Maritime Affairs and Indian Navy',
    publicationDate: '2024-03-23',
    eventDate: '2024-03-15 to 2024-03-17',
    sourceName: 'Press Information Bureau (MoD)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2016023',
    summary: 'The Indian Navy warship INS Kolkata, supported by INS Subhadra, SeaGuardian HALE RPAs, P-8I maritime patrol aircraft, and combat-airdropped MARCOS, successfully intercepted the hijacked pirate vessel MV Ruen approximately 1,400 nautical miles from India, forcing the surrender of 35 Somali pirates and safely rescuing 17 crew members without casualties.',
    keyPoints: [
      'Executed a calibrated 40-hour standoff adhering strictly to international laws under the Maritime Anti-Piracy Act 2022.',
      'Demonstrated high-tempo jointness using C-17 Globemaster III precision airdrop of combat rubber raiding craft and Marine Commandos into open ocean waters.',
      'Firmly consolidated India’s position as the First Responder and Preferred Security Partner in the Western Indian Ocean Region.'
    ],
    ssbDiscussionQuestions: [
      'Is India ready to assume the complete role of Net Security Provider across the Indian Ocean Region?',
      'How does international maritime law empower sovereign navies to tackle state-sponsored piracy versus non-state actor piracy?'
    ],
    relevanceForSSB: 'Essential case study for Group Discussion (GD) on Maritime Security, Lecturette topic "Indian Navy in Modern Operations", and Interview questions regarding anti-piracy mandates.'
  },
  {
    id: 'ca-2',
    title: 'Commissioning of INS Arighat: Bolstering the Sea-Based Nuclear Triad',
    category: 'Maritime Affairs and Indian Navy',
    publicationDate: '2024-08-29',
    eventDate: '2024-08-29',
    sourceName: 'Press Information Bureau (MoD)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2050186',
    summary: 'India commissioned its second indigenous nuclear-powered ballistic missile submarine (SSBN), INS Arighat (SSBN 81), at the Ship Building Centre in Visakhapatnam in the presence of the Defence Minister, reinforcing the survivability of India’s second-strike nuclear deterrence capability.',
    keyPoints: [
      'Powered by an indigenous pressurized light-water reactor developed with BARC, carrying submarine-launched ballistic missiles (K-15 Sagarika).',
      'Significantly advances India’s Continuous At-Sea Deterrence (CASD) posture alongside INS Arihant.',
      'Constructed with advanced indigenously fabricated DMR-249 grade hull steel, elevating self-reliance in strategic shipbuilding.'
    ],
    ssbDiscussionQuestions: [
      'What is the strategic significance of the sea-based leg of India’s nuclear triad compared to land and air delivery platforms?',
      'How does India’s "No First Use" (NFU) nuclear doctrine necessitate robust Continuous At-Sea Deterrence?'
    ],
    relevanceForSSB: 'High-probability technical and strategic question in the Personal Interview for naval candidates, and relevant for Group Discussion on "Nuclear Deterrence in Asia".'
  },
  {
    id: 'ca-3',
    title: 'Multilateral Naval Exercise MILAN 2024 in Visakhapatnam',
    category: 'Maritime Affairs and Indian Navy',
    publicationDate: '2024-02-19',
    eventDate: '2024-02-19 to 2024-02-27',
    sourceName: 'Indian Navy Official Portal',
    sourceUrl: 'https://indiannavy.nic.in/content/exercise-milan-2024',
    summary: 'The 12th edition of the biennial multilateral naval exercise MILAN 2024 was conducted by the Eastern Naval Command in Visakhapatnam, featuring participation from over 50 friendly foreign countries, 35 warships, and 50 aircraft under the theme "Camaraderie, Cohesion, Collaboration".',
    keyPoints: [
      'Comprised an intensive Harbor Phase with an International Maritime Seminar, Subject Matter Exchanges, and a Sea Phase with complex multi-threat air defence and anti-submarine warfare exercises.',
      'Showcased dual-carrier operations featuring INS Vikramaditya and INS Vikrant operating simultaneously.',
      'Reinforced naval diplomacy, interoperability, and freedom of navigation across the global maritime commons.'
    ],
    ssbDiscussionQuestions: [
      'How does multilateral naval diplomacy complement India’s broader foreign policy objectives?',
      'Can regional multilateral naval exercises effectively balance unilateral expansionism in the Indo-Pacific?'
    ],
    relevanceForSSB: 'Common Lecturette topic ("Naval Diplomacy & Joint Exercises") and Group Discussion on regional stability and maritime partnerships.'
  },
  {
    id: 'ca-4',
    title: 'Operationalisation of Integrated Theatre Commands & Inter-Services Organisations Act',
    category: 'Defence and Security',
    publicationDate: '2024-05-10',
    eventDate: '2024-05-10',
    sourceName: 'Ministry of Defence (MoD)',
    sourceUrl: 'https://mod.gov.in/dod/sites/default/files/ISOAct2023.pdf',
    summary: 'The Ministry of Defence notified the enforcement of the Inter-Services Organisations (Command, Control and Discipline) Act 2023, empowering Commanders-in-Chief of joint formations with administrative and disciplinary control over personnel from all three services, paving the way for theaterisation.',
    keyPoints: [
      'Eliminates jurisdictional silos by giving single commanders legal authority across Army, Navy, and Air Force personnel in tri-service establishments.',
      'Accelerates formation of the proposed Maritime Theatre Command (MTC), Western Theatre Command, and Northern Theatre Command.',
      'Streamlines joint maintenance, communications, intelligence sharing, and integrated warfighting doctrines.'
    ],
    ssbDiscussionQuestions: [
      'What are the operational challenges and cultural hurdles in transitioning from single-service commands to Integrated Theatre Commands in India?',
      'Will Theatre Commands compromise the specialized tactical doctrines of the Indian Air Force or Navy?'
    ],
    relevanceForSSB: 'Foremost topic in SSB Group Discussions concerning military reforms, jointness, and the evolving role of the Chief of Defence Staff (CDS).'
  },
  {
    id: 'ca-5',
    title: 'Induction of MQ-9B High Altitude Long Endurance (HALE) RPAS for Tri-Services',
    category: 'Defence and Security',
    publicationDate: '2024-10-15',
    eventDate: '2024-10-15',
    sourceName: 'Press Information Bureau (MoD)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2065095',
    summary: 'The Ministry of Defence concluded the contract for the procurement of 31 MQ-9B High Altitude Long Endurance (HALE) Remotely Piloted Aircraft Systems (15 SeaGuardians for the Navy, 8 SkyGuardians each for the Army and Air Force) alongside comprehensive Maintenance, Repair, and Overhaul (MRO) facilities in India.',
    keyPoints: [
      'Provides over 35 hours of continuous flight endurance at altitudes exceeding 40,000 feet, transforming wide-area maritime surveillance.',
      'Equipped with maritime radar, electro-optical sensors, automatic identification system (AIS), and anti-submarine warfare sonobuoy dispensers.',
      'Establishes domestic MRO facility with Indian defence partners to support strategic self-reliance.'
    ],
    ssbDiscussionQuestions: [
      'How are unmanned autonomous platforms revolutionizing domain awareness in modern naval and littoral warfare?',
      'Balancing high-end foreign strategic procurements with domestic "Make in India" defence manufacturing: challenges and compromises.'
    ],
    relevanceForSSB: 'Frequently probed in the Interview for candidates with technical or engineering backgrounds, and useful for Lecturette on "Unmanned Warfare".'
  },
  {
    id: 'ca-6',
    title: 'India-Middle East-Europe Economic Corridor (IMEC) & Maritime Connectivity',
    category: 'International Relations and Geopolitics',
    publicationDate: '2024-02-14',
    eventDate: '2024-02-14',
    sourceName: 'Ministry of External Affairs (MEA)',
    sourceUrl: 'https://www.mea.gov.in/bilateral-documents.htm?dtl/37628/India_UAE_Joint_Statement',
    summary: 'India and the UAE signed an intergovernmental framework agreement on the India-Middle East-Europe Economic Corridor (IMEC), establishing multimodal maritime and rail connections from Indian ports (Mundra, Kandla, JNPT) across the Arabian Sea to the UAE, Saudi Arabia, Jordan, Israel, and Europe.',
    keyPoints: [
      'Aims to reduce logistics transit time between India and Europe by 40% and logistics costs by 30%.',
      'Provides a clean-energy, high-bandwidth communication, and trade transit alternative to traditional canal routes.',
      'Faces geopolitical headwinds following regional instability in the Levant and Red Sea chokepoints.'
    ],
    ssbDiscussionQuestions: [
      'Can the India-Middle East-Europe Economic Corridor serve as a viable strategic alternative to China’s Belt and Road Initiative?',
      'How do geopolitical conflicts in the Middle East threaten maritime trade routes and international connectivity projects?'
    ],
    relevanceForSSB: 'Standard Group Discussion topic on Global Geopolitics, and Interview discussion on India’s foreign trade security.'
  },
  {
    id: 'ca-7',
    title: 'Colombo Security Conclave (CSC) Charter: Institutionalising Regional Maritime Security',
    category: 'International Relations and Geopolitics',
    publicationDate: '2024-08-30',
    eventDate: '2024-08-30',
    sourceName: 'Press Information Bureau (MEA)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2050410',
    summary: 'National Security Advisors and senior representatives of India, Sri Lanka, Maldives, and Mauritius signed the Founding Charter of the Colombo Security Conclave in Colombo, formally institutionalizing cooperation across five pillars: Maritime Safety, Counter-Terrorism, Combating Trafficking, Cyber Security, and Humanitarian Assistance/Disaster Relief (HADR).',
    keyPoints: [
      'Originating from the 2011 trilateral maritime security initiative, CSC now establishes a permanent secretariat in Colombo.',
      'Operationalises India’s SAGAR (Security and Growth for All in the Region) doctrine into a formalized mini-lateral security framework.',
      'Enhances joint hydrographic surveys, coastal radar network data sharing, and rapid oil-spill disaster response.'
    ],
    ssbDiscussionQuestions: [
      'How does the Colombo Security Conclave strengthen India’s maritime neighbourhood policy against growing external naval influences?',
      'Mini-lateral alliances versus broad multilateral forums: which format is more effective for Indian Ocean governance?'
    ],
    relevanceForSSB: 'Directly applicable for GD topics on "India and her Neighbours", Lecturette on "SAGAR Doctrine", and Interview questions on coastal security partnerships.'
  },
  {
    id: 'ca-8',
    title: 'Mission Divyastra: Successful Flight-Test of Agni-5 with MIRV Technology',
    category: 'Science, Technology and Space',
    publicationDate: '2024-03-11',
    eventDate: '2024-03-11',
    sourceName: 'Press Information Bureau (PMO / MoD)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2013511',
    summary: 'The Defence Research and Development Organisation (DRDO) conducted the maiden flight test of the indigenously developed Agni-5 missile with Multiple Independently Targetable Re-entry Vehicle (MIRV) technology from Dr APJ Abdul Kalam Island, Odisha, under Mission Divyastra.',
    keyPoints: [
      'Enables a single missile to deliver multiple warheads to distinct designated targets hundreds of kilometres apart with pinpoint precision.',
      'Equipped with indigenous avionics systems and high-accuracy sensor packages, ensuring warheads penetrate ballistic missile defence shields.',
      'Places India among a select group of six nations possessing operational MIRV capability.'
    ],
    ssbDiscussionQuestions: [
      'How does MIRV technology alter strategic stability and strategic deterrence in the Indo-Pacific theatre?',
      'Should India retain its minimum credible deterrence stance or expand tactical warhead stockpiles in response to regional MIRV deployments?'
    ],
    relevanceForSSB: 'High-frequency topic in the Personal Interview regarding indigenous defence technology achievements and strategic missile capabilities.'
  },
  {
    id: 'ca-9',
    title: 'ISRO Gaganyaan Crew Escape System and CE20 Cryogenic Engine Human-Rating',
    category: 'Science, Technology and Space',
    publicationDate: '2024-02-21',
    eventDate: '2024-02-21',
    sourceName: 'Indian Space Research Organisation (ISRO)',
    sourceUrl: 'https://www.isro.gov.in/CE20_Engine_Human_Rating.html',
    summary: 'ISRO accomplished final human-rating certification of the CE20 cryogenic engine powering the upper stage of the LVM3 launch vehicle for the Gaganyaan human spaceflight mission, alongside announcing the four designated astronaut designates from the Indian Air Force.',
    keyPoints: [
      'The CE20 engine underwent rigorous testing of 39 hot firing tests under nominal and off-nominal operating conditions.',
      'Four Indian Air Force test pilots were presented astronaut wings for the upcoming orbital spaceflight.',
      'Establishes self-reliant human orbital spaceflight capability, leading towards the proposed Bharatiya Antariksh Station by 2035.'
    ],
    ssbDiscussionQuestions: [
      'What are the strategic and technological spin-offs of investing in human spaceflight missions for a developing economy like India?',
      'How does space domain awareness integrate with modern military defence operations and national security?'
    ],
    relevanceForSSB: 'Lecturette topic "India in Space", and common ice-breaker in the Personal Interview on national technological pride.'
  },
  {
    id: 'ca-10',
    title: 'Implementation of the Three New Criminal Laws: BNS, BNSS, and BSA',
    category: 'National Affairs and Governance',
    publicationDate: '2024-07-01',
    eventDate: '2024-07-01',
    sourceName: 'Press Information Bureau (MHA)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2030040',
    summary: 'India replaced the colonial-era Indian Penal Code (1860), Code of Criminal Procedure (1898), and Indian Evidence Act (1872) with three modernized legal statutes: the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA).',
    keyPoints: [
      'Mandates electronic summons, mandatory forensic investigation for offences punishable with 7+ years, and zero-FIR across the country.',
      'Replaces the colonial law of sedition with specific provisions penalising acts endangering sovereignty, unity, and integrity of India.',
      'Introduces community service as a formal punishment for petty offences to relieve prison overcrowding.'
    ],
    ssbDiscussionQuestions: [
      'Will modernising criminal jurisprudence through digital evidence and mandatory forensics speed up trial delivery in India?',
      'Evaluating the balance between state security measures and individual civil liberties under updated legal codes.'
    ],
    relevanceForSSB: 'Standard current affairs topic for Group Discussion on judicial reforms and administrative governance.'
  },
  {
    id: 'ca-11',
    title: 'Sagarmala Initiative and National Maritime Heritage Complex (NMHC) Lothal',
    category: 'Economy and Infrastructure',
    publicationDate: '2024-09-11',
    eventDate: '2024-09-11',
    sourceName: 'Press Information Bureau (MoPSW)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2053896',
    summary: 'The Union Cabinet approved the master development plan for the National Maritime Heritage Complex (NMHC) at Lothal, Gujarat, while accelerating port-led industrialization projects under the Sagarmala Programme to expand India’s commercial maritime logistics throughput.',
    keyPoints: [
      'Preserves and showcases India’s 5,000-year maritime heritage from the Indus Valley Civilization dockyard at Lothal.',
      'Modernises coastal berths and mega-ports (including the approved Vadhavan Port in Maharashtra) to handle large deep-draft container vessels.',
      'Strengthens coastal shipping and inland waterways to decrease freight logistics costs from 13-14% of GDP to global benchmarks of 8-9%.'
    ],
    ssbDiscussionQuestions: [
      'How does modern port infrastructure and maritime trade capacity directly influence national defence resilience during geopolitical tension?',
      'Can coastal shipping and inland waterways significantly de-congest India’s rail and road transport corridors?'
    ],
    relevanceForSSB: 'Topical for Personal Interview discussions on Indian maritime history, merchant shipping, and economic drivers of national power.'
  },
  {
    id: 'ca-12',
    title: 'India’s Defence Production Reaches Historic ₹1.27 Lakh Crore Milestone',
    category: 'Economy and Infrastructure',
    publicationDate: '2024-07-05',
    eventDate: '2024-07-05',
    sourceName: 'Press Information Bureau (MoD)',
    sourceUrl: 'https://pib.gov.in/PressReleasePage.aspx?PRID=2031021',
    summary: 'The value of indigenous defence production in India reached an all-time record of ₹1,26,887 Crore in FY 2023-24, registering a 16.7% growth over the previous fiscal year, driven by policy reforms, positive indigenisation lists, and private sector participation.',
    keyPoints: [
      'Defence exports also achieved a record high of ₹21,083 Crore, reaching over 85 friendly foreign nations with artillery, missiles, and patrol vessels.',
      'Public Sector Undertakings (DPSUs) contributed approximately 79.2%, while the private defence sector contributed 20.8% of total production value.',
      'Significant naval contributions include indigenous aircraft carrier, stealth frigates, missile destroyers, and sonar systems.'
    ],
    ssbDiscussionQuestions: [
      'Is the Indian private defence manufacturing sector adequately equipped to partner in core aerospace and naval platforms?',
      'What are the critical dependencies that India still needs to overcome to achieve total self-reliance in military hardware?'
    ],
    relevanceForSSB: 'Essential data points for Group Discussion on "Aatmanirbharta in Defence" and Lecturette on "Indian Defence Exports".'
  }
];
