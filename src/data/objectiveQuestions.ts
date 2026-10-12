export interface ObjectiveQuestion {
  id: string;
  category: 'Indian Navy' | 'Maritime Security' | 'Defence Tech' | 'Armed Forces Ranks';
  question: string;
  options: { id: string; label: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

export const OBJECTIVE_KNOWLEDGE_QUESTIONS: ObjectiveQuestion[] = [
  {
    id: 'obj-1',
    category: 'Indian Navy',
    question: 'Where is the Southern Naval Command of the Indian Navy headquartered?',
    options: [
      { id: 'A', label: 'A', text: 'Visakhapatnam' },
      { id: 'B', label: 'B', text: 'Kochi' },
      { id: 'C', label: 'C', text: 'Mumbai' },
      { id: 'D', label: 'D', text: 'Goa' }
    ],
    correctOptionId: 'B',
    explanation: 'The Southern Naval Command is the Training Command of the Indian Navy and is headquartered in Kochi, Kerala.'
  },
  {
    id: 'obj-2',
    category: 'Indian Navy',
    question: 'Which is India\'s first indigenously designed and constructed aircraft carrier?',
    options: [
      { id: 'A', label: 'A', text: 'INS Vikramaditya' },
      { id: 'B', label: 'B', text: 'INS Viraat' },
      { id: 'C', label: 'C', text: 'INS Vikrant (IAC-1)' },
      { id: 'D', label: 'D', text: 'INS Vishal' }
    ],
    correctOptionId: 'C',
    explanation: 'INS Vikrant (IAC-1) was designed by the Indian Navy\'s Warship Design Bureau and constructed by Cochin Shipyard Limited, commissioned in September 2022.'
  },
  {
    id: 'obj-3',
    category: 'Armed Forces Ranks',
    question: 'Which Indian Navy rank is equivalent to the rank of Wing Commander in the Indian Air Force?',
    options: [
      { id: 'A', label: 'A', text: 'Lieutenant Commander' },
      { id: 'B', label: 'B', text: 'Commander' },
      { id: 'C', label: 'C', text: 'Captain' },
      { id: 'D', label: 'D', text: 'Commodore' }
    ],
    correctOptionId: 'B',
    explanation: 'Commander in the Indian Navy is equivalent to Wing Commander in the Indian Air Force and Lieutenant Colonel in the Indian Army.'
  },
  {
    id: 'obj-4',
    category: 'Defence Tech',
    question: 'What type of propulsion system provides extended submerged endurance to non-nuclear conventional submarines without atmospheric air?',
    options: [
      { id: 'A', label: 'A', text: 'AIP (Air-Independent Propulsion)' },
      { id: 'B', label: 'B', text: 'CODAG (Combined Diesel and Gas)' },
      { id: 'C', label: 'C', text: 'COGAG (Combined Gas and Gas)' },
      { id: 'D', label: 'D', text: 'Turbojet Waterjet' }
    ],
    correctOptionId: 'A',
    explanation: 'Air-Independent Propulsion (AIP) enables non-nuclear submarines to operate underwater for several weeks without surfacing or snorkeling.'
  },
  {
    id: 'obj-5',
    category: 'Maritime Security',
    question: 'Under UNCLOS, what is the maximum territorial sea limit of a coastal sovereign state?',
    options: [
      { id: 'A', label: 'A', text: '12 nautical miles' },
      { id: 'B', label: 'B', text: '24 nautical miles' },
      { id: 'C', label: 'C', text: '200 nautical miles' },
      { id: 'D', label: 'D', text: '50 nautical miles' }
    ],
    correctOptionId: 'A',
    explanation: 'The United Nations Convention on the Law of the Sea (UNCLOS) establishes the territorial sea baseline limit at up to 12 nautical miles (approx 22.2 km).'
  },
  {
    id: 'obj-6',
    category: 'Maritime Security',
    question: 'Which strategic choke point connects the Persian Gulf to the Gulf of Oman and is crucial for India\'s crude oil transport?',
    options: [
      { id: 'A', label: 'A', text: 'Strait of Malacca' },
      { id: 'B', label: 'B', text: 'Strait of Hormuz' },
      { id: 'C', label: 'C', text: 'Bab-el-Mandeb' },
      { id: 'D', label: 'D', text: 'Bosphorus Strait' }
    ],
    correctOptionId: 'B',
    explanation: 'The Strait of Hormuz is the world\'s most critical oil transit choke point connecting the Persian Gulf with the Arabian Sea.'
  },
  {
    id: 'obj-7',
    category: 'Defence Tech',
    question: 'What is the maximum operational speed class of the BrahMos cruise missile?',
    options: [
      { id: 'A', label: 'A', text: 'Subsonic (Mach 0.8)' },
      { id: 'B', label: 'B', text: 'Supersonic (Mach 2.8 - 3.0)' },
      { id: 'C', label: 'C', text: 'Transonic (Mach 1.2)' },
      { id: 'D', label: 'D', text: 'Hypersonic (Mach 8.0)' }
    ],
    correctOptionId: 'B',
    explanation: 'BrahMos is a supersonic cruise missile capable of traveling at speeds of Mach 2.8 to 3.0 with a sea-skimming flight profile.'
  },
  {
    id: 'obj-8',
    category: 'Armed Forces Ranks',
    question: 'What is the junior-most commissioned officer rank in the Indian Navy?',
    options: [
      { id: 'A', label: 'A', text: 'Midshipman' },
      { id: 'B', label: 'B', text: 'Sub-Lieutenant' },
      { id: 'C', label: 'C', text: 'Lieutenant' },
      { id: 'D', label: 'D', text: 'Acting Sub-Lieutenant' }
    ],
    correctOptionId: 'B',
    explanation: 'Sub-Lieutenant is the initial commissioned rank granted to officer cadets graduating from the Indian Naval Academy (INA).'
  },
  {
    id: 'obj-9',
    category: 'Indian Navy',
    question: 'The Indian Navy\'s primary multilateral biennial naval exercise held in Visakhapatnam is named:',
    options: [
      { id: 'A', label: 'A', text: 'Exercise Malabar' },
      { id: 'B', label: 'B', text: 'Exercise MILAN' },
      { id: 'C', label: 'C', text: 'Exercise Varuna' },
      { id: 'D', label: 'D', text: 'Exercise SIMBEX' }
    ],
    correctOptionId: 'B',
    explanation: 'Exercise MILAN is the Indian Navy\'s flagship multilateral naval exercise initiated in 1995, hosted by the Eastern Naval Command in Visakhapatnam.'
  },
  {
    id: 'obj-10',
    category: 'Maritime Security',
    question: 'What is the headquarters of India\'s first unified tri-service operational command, the Andaman and Nicobar Command (ANC)?',
    options: [
      { id: 'A', label: 'A', text: 'Car Nicobar' },
      { id: 'B', label: 'B', text: 'Port Blair' },
      { id: 'C', label: 'C', text: 'Campbell Bay' },
      { id: 'D', label: 'D', text: 'Diglipur' }
    ],
    correctOptionId: 'B',
    explanation: 'The Andaman and Nicobar Command (ANC) is headquartered at Port Blair, strategically overseeing the Six Degree and Ten Degree channels.'
  },
  {
    id: 'obj-11',
    category: 'Indian Navy',
    question: 'Which Indian Navy vessel is India\'s second nuclear-powered ballistic missile submarine (SSBN) commissioned in August 2024?',
    options: [
      { id: 'A', label: 'A', text: 'INS Arihant' },
      { id: 'B', label: 'B', text: 'INS Arighat' },
      { id: 'C', label: 'C', text: 'INS Chakra' },
      { id: 'D', label: 'D', text: 'INS Kalvari' }
    ],
    correctOptionId: 'B',
    explanation: 'INS Arighat (SSBN 81) is India\'s second indigenous nuclear-powered ballistic missile submarine, strengthening the sea-based leg of India\'s nuclear triad.'
  },
  {
    id: 'obj-12',
    category: 'Indian Navy',
    question: 'Where is the Indian Naval Academy (INA), the premier officer training establishment of the Indian Navy, located?',
    options: [
      { id: 'A', label: 'A', text: 'Khadakwasla, Pune' },
      { id: 'B', label: 'B', text: 'Ezhimala, Kerala' },
      { id: 'C', label: 'C', text: 'Dundigal, Hyderabad' },
      { id: 'D', label: 'D', text: 'Dehradun, Uttarakhand' }
    ],
    correctOptionId: 'B',
    explanation: 'The Indian Naval Academy is situated at Ezhimala in Kannur district, Kerala. Khadakwasla hosts the NDA, and Dehradun hosts the IMA.'
  },
  {
    id: 'obj-13',
    category: 'Defence Tech',
    question: 'Which long-range maritime reconnaissance and anti-submarine warfare aircraft does the Indian Navy operate from INS Rajali (Arakkonam)?',
    options: [
      { id: 'A', label: 'A', text: 'Boeing P-8I Neptune' },
      { id: 'B', label: 'B', text: 'Tu-142MK Bear' },
      { id: 'C', label: 'C', text: 'Il-38 Sea Dragon' },
      { id: 'D', label: 'D', text: 'C-130J Super Hercules' }
    ],
    correctOptionId: 'A',
    explanation: 'The Boeing P-8I Neptune is the Indian Navy\'s primary multi-mission maritime patrol and anti-submarine warfare aircraft equipped with radar, sonobuoys, and torpedoes.'
  },
  {
    id: 'obj-14',
    category: 'Armed Forces Ranks',
    question: 'Which rank in the Indian Army is equivalent to the rank of Captain in the Indian Navy?',
    options: [
      { id: 'A', label: 'A', text: 'Major' },
      { id: 'B', label: 'B', text: 'Colonel' },
      { id: 'C', label: 'C', text: 'Brigadier' },
      { id: 'D', label: 'D', text: 'Lieutenant Colonel' }
    ],
    correctOptionId: 'B',
    explanation: 'Captain in the Indian Navy is equivalent to Colonel in the Indian Army and Group Captain in the Indian Air Force.'
  },
  {
    id: 'obj-15',
    category: 'Maritime Security',
    question: 'Under international maritime law, what is the extent of an Exclusive Economic Zone (EEZ) measured from the coastal baseline?',
    options: [
      { id: 'A', label: 'A', text: '12 nautical miles' },
      { id: 'B', label: 'B', text: '24 nautical miles' },
      { id: 'C', label: 'C', text: '200 nautical miles' },
      { id: 'D', label: 'D', text: '350 nautical miles' }
    ],
    correctOptionId: 'C',
    explanation: 'Under UNCLOS, the Exclusive Economic Zone (EEZ) extends up to 200 nautical miles (approx 370.4 km) from the coastal baseline, granting sovereign rights over natural resources.'
  },
  {
    id: 'obj-16',
    category: 'Indian Navy',
    question: 'What is the elite special forces unit of the Indian Navy specialized in amphibious and maritime counter-terrorism operations?',
    options: [
      { id: 'A', label: 'A', text: 'Para SF' },
      { id: 'B', label: 'B', text: 'Garud Commando Force' },
      { id: 'C', label: 'C', text: 'MARCOS (Marine Commandos)' },
      { id: 'D', label: 'D', text: 'Special Frontier Force' }
    ],
    correctOptionId: 'C',
    explanation: 'MARCOS (Marine Commandos), officially named the Marine Commando Force (MCF), is the specialized naval special operations unit of the Indian Navy formed in 1987.'
  },
  {
    id: 'obj-17',
    category: 'Defence Tech',
    question: 'The Kalvari-class submarines constructed at Mazagon Dock Shipbuilders Limited (MDL) are based on which foreign design?',
    options: [
      { id: 'A', label: 'A', text: 'Russian Kilo class' },
      { id: 'B', label: 'B', text: 'French Scorpène class' },
      { id: 'C', label: 'C', text: 'German Type 214 class' },
      { id: 'D', label: 'D', text: 'Swedish Gotland class' }
    ],
    correctOptionId: 'B',
    explanation: 'Project 75 Kalvari-class submarines were built under technology transfer from Naval Group (France) based on the Scorpène diesel-electric attack submarine design.'
  },
  {
    id: 'obj-18',
    category: 'Maritime Security',
    question: 'Which oceanic channel separates the Andaman Islands from the Nicobar Islands along the 10° N parallel?',
    options: [
      { id: 'A', label: 'A', text: 'Six Degree Channel' },
      { id: 'B', label: 'B', text: 'Eight Degree Channel' },
      { id: 'C', label: 'C', text: 'Nine Degree Channel' },
      { id: 'D', label: 'D', text: 'Ten Degree Channel' }
    ],
    correctOptionId: 'D',
    explanation: 'The Ten Degree Channel separates Little Andaman from Car Nicobar in the Bay of Bengal and is a vital international maritime trade passage.'
  },
  {
    id: 'obj-19',
    category: 'Armed Forces Ranks',
    question: 'How many stars are displayed on the vehicle flag and collar tabs of a Vice Admiral in the Indian Navy?',
    options: [
      { id: 'A', label: 'A', text: 'Two stars' },
      { id: 'B', label: 'B', text: 'Three stars' },
      { id: 'C', label: 'C', text: 'Four stars' },
      { id: 'D', label: 'D', text: 'One star' }
    ],
    correctOptionId: 'B',
    explanation: 'A Vice Admiral is a three-star flag officer rank, equivalent to Lieutenant General in the Indian Army and Air Marshal in the Indian Air Force.'
  },
  {
    id: 'obj-20',
    category: 'Indian Navy',
    question: 'On which date is Navy Day celebrated annually in India to commemorate the successful execution of Operation Trident in 1971?',
    options: [
      { id: 'A', label: 'A', text: '15 January' },
      { id: 'B', label: 'B', text: '8 October' },
      { id: 'C', label: 'C', text: '4 December' },
      { id: 'D', label: 'D', text: '26 July' }
    ],
    correctOptionId: 'C',
    explanation: 'Navy Day is celebrated on 4 December every year in remembrance of Operation Trident, the missile boat attack on Karachi harbour during the 1971 Indo-Pakistani War.'
  }
];

