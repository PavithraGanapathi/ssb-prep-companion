import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  Shuffle,
  Volume2,
  VolumeX,
  AlertCircle,
  FileText,
  Save,
  Trash2
} from 'lucide-react';
import { recordActivityDate } from '../utils/activityTracker';

interface LecturetteTopic {
  level: string;
  levelLabel: string;
  topic: string;
  points: string[];
}

const LECTURETTE_HISTORY_KEY = 'ssb_lecturette_sessions_v1';

const TOPIC_SETS: LecturetteTopic[][] = [
  [
    {
      level: 'A',
      levelLabel: 'High (Geopolitics / International)',
      topic: 'Indo-Pacific Maritime Security & The Quad Partnership',
      points: [
        'Strategic importance of Sea Lines of Communication (SLOCs) and global trade transit.',
        'Role of Malacca, Sunda, and Lombok straits in regional choke point control.',
        'Quad maritime domain awareness synergy between India, USA, Japan, and Australia.'
      ]
    },
    {
      level: 'B',
      levelLabel: 'National & Defence Affairs',
      topic: 'Indigenous Warship Building & Atmanirbharta in Indian Navy',
      points: [
        'Indigenous aircraft carrier INS Vikrant and Project 15B stealth destroyers.',
        'Collaboration with Indian public and private shipyards (MDL, CSL, GRSE).',
        'Overcoming critical import dependencies in gas turbines, high-end sensors, and heavy gearboxes.'
      ]
    },
    {
      level: 'C',
      levelLabel: 'Social & National Issues',
      topic: 'Role of Youth in Disaster Management and Coastal Resilience',
      points: [
        'National Cadet Corps (NCC) and Civil Defence preparedness in cyclone relief.',
        'Community-level early warning dissemination and coastal humanitarian aid.',
        'Fostering civic duty, leadership under stress, and volunteer culture.'
      ]
    },
    {
      level: 'D',
      levelLabel: 'General Awareness / Basic',
      topic: 'Sports Culture and Character Building in Modern India',
      points: [
        'Physical fitness as a foundation for military and national productivity.',
        'Instilling team cohesion, emotional resilience, and handling failure constructively.',
        'Grassroots initiatives like Khelo India and long-term athletic development.'
      ]
    }
  ],
  [
    {
      level: 'A',
      levelLabel: 'High (Geopolitics / International)',
      topic: 'Weaponization of Space and Outer Space Military Governance',
      points: [
        'Satellite navigation, military communications, and Anti-Satellite (ASAT) capabilities.',
        'Vulnerability of naval communications and surveillance to anti-space attacks.',
        'Need for binding international treaties on peaceful outer-space usage.'
      ]
    },
    {
      level: 'B',
      levelLabel: 'National & Defence Affairs',
      topic: 'Integrated Theatre Commands: Need and Implementation Challenges',
      points: [
        'Transitioning from 17 single-service commands to unified Theatre Commands.',
        'Proposed Maritime Theatre Command (MTC) operational structure in Karwar.',
        'Achieving joint doctrines, unified logistics, and shared intelligence.'
      ]
    },
    {
      level: 'C',
      levelLabel: 'Social & National Issues',
      topic: 'Artificial Intelligence and Employment in Developing Economies',
      points: [
        'Automation versus workforce displacement in routine and technical sectors.',
        'National AI initiatives and skill transitions towards high-value digital manufacturing.',
        'Data sovereignty, cyber ethics, and national security implications.'
      ]
    },
    {
      level: 'D',
      levelLabel: 'General Awareness / Basic',
      topic: 'Renewable Energy: India’s Solar and Offshore Wind Potential',
      points: [
        'Target of 500 GW non-fossil energy capacity by 2030.',
        'Harnessing India’s 7,516 km coastline for offshore wind and tidal power.',
        'Balancing rapid economic industrialisation with ecological commitments.'
      ]
    }
  ],
  [
    {
      level: 'A',
      levelLabel: 'High (Geopolitics / International)',
      topic: 'Red Sea Crisis & Global Supply Chain Security',
      points: [
        'Houthi drone and anti-ship missile attacks on international commercial shipping.',
        'Re-routing vessels around the Cape of Good Hope and escalating maritime insurance costs.',
        'Indian Navy’s Operation Sankalp safeguarding national and international merchant vessels.'
      ]
    },
    {
      level: 'B',
      levelLabel: 'National & Defence Affairs',
      topic: 'Modern Submarine Warfare: Nuclear Triad vs Conventional AIP',
      points: [
        'Continuous At-Sea Deterrence (CASD) provided by SSBNs like INS Arihant and INS Arighat.',
        'Tactical stealth of conventional diesel-electric submarines with Air-Independent Propulsion.',
        'Maritime anti-submarine warfare (ASW) coordination using P-8I Neptune and MH-60R Seahawks.'
      ]
    },
    {
      level: 'C',
      levelLabel: 'Social & National Issues',
      topic: 'Women in Armed Forces: Expanding Combat and Command Roles',
      points: [
        'Induction of women officers across all branches of the Indian Navy and warship crews.',
        'National Defence Academy (NDA) entry for women cadets and parity in promotions.',
        'Impact on operational effectiveness, organizational culture, and meritocracy.'
      ]
    },
    {
      level: 'D',
      levelLabel: 'General Awareness / Basic',
      topic: 'Significance of Tourism & Maritime Economy in India',
      points: [
        'Blue Economy initiatives, cruise tourism, and coastal heritage preservation.',
        'Developing Andaman & Nicobar and Lakshadweep island infrastructure responsibly.',
        'Generating coastal employment while strictly enforcing environmental safeguards.'
      ]
    }
  ]
];

interface LecturetteLog {
  id: string;
  date: string;
  topic: string;
  level: string;
  transcript: string;
  speechDurationSeconds: number;
  wordCount: number;
  wpm: number;
  selfRatings: {
    eyeContact: boolean;
    coveredStructure: boolean;
    pacedWell: boolean;
    avoidedFillers: boolean;
  };
}

export const VoicePracticePage: React.FC = () => {
  const [selectedSetIndex, setSelectedSetIndex] = useState(0);
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [mode, setMode] = useState<'prep' | 'speech'>('prep');
  const [secondsLeft, setSecondsLeft] = useState(180); // 3 minutes
  const [isRunning, setIsRunning] = useState(false);

  // Web Speech API State
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState(false);
  const [isSpeechSynthesisSupported, setIsSpeechSynthesisSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingPoints, setIsSpeakingPoints] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);

  // Self Evaluation
  const [selfRatings, setSelfRatings] = useState({
    eyeContact: false,
    coveredStructure: false,
    pacedWell: false,
    avoidedFillers: false
  });

  // Saved History
  const [savedLogs, setSavedLogs] = useState<LecturetteLog[]>([]);

  // Recognition ref
  const recognitionRef = useRef<any>(null);

  const currentTopics = TOPIC_SETS[selectedSetIndex];
  const activeTopic = currentTopics[activeTopicIndex];

  // Check Speech API Support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      setIsSpeechRecognitionSupported(Boolean(SpeechRecognition));
      setIsSpeechSynthesisSupported('speechSynthesis' in window);

      try {
        const stored = localStorage.getItem(LECTURETTE_HISTORY_KEY);
        if (stored) {
          setSavedLogs(JSON.parse(stored));
        }
      } catch {
        // Ignore
      }
    }
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      // Auto transition from prep to speech
      if (mode === 'prep') {
        setMode('speech');
        setSecondsLeft(180);
      } else if (mode === 'speech') {
        // Stop recognition if listening
        if (isListening && recognitionRef.current) {
          recognitionRef.current.stop();
          setIsListening(false);
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, secondsLeft, mode, isListening]);

  // Topic card shuffle
  const handleShuffleTopics = () => {
    stopCurrentSession();
    setSelectedSetIndex(prev => (prev + 1) % TOPIC_SETS.length);
    setActiveTopicIndex(0);
    setMode('prep');
    setSecondsLeft(180);
    setSpeechTranscript('');
    setMicError(null);
  };

  const handleSelectTopic = (index: number) => {
    stopCurrentSession();
    setActiveTopicIndex(index);
    setMode('prep');
    setSecondsLeft(180);
    setSpeechTranscript('');
    setMicError(null);
  };

  const handleSwitchMode = (newMode: 'prep' | 'speech') => {
    stopCurrentSession();
    setMode(newMode);
    setSecondsLeft(180);
  };

  const stopCurrentSession = () => {
    setIsRunning(false);
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (isSpeechSynthesisSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeakingPoints(false);
    }
  };

  // Text-To-Speech read points out loud
  const handleToggleSpeakPoints = () => {
    if (!isSpeechSynthesisSupported) return;

    if (isSpeakingPoints) {
      window.speechSynthesis.cancel();
      setIsSpeakingPoints(false);
      return;
    }

    const textToRead = `${activeTopic.topic}. Key points: ${activeTopic.points.join('. ')}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeakingPoints(false);
    utterance.onerror = () => setIsSpeakingPoints(false);

    setIsSpeakingPoints(true);
    window.speechSynthesis.speak(utterance);
  };

  // Live Speech Recognition toggle
  const handleToggleListening = () => {
    if (!isSpeechRecognitionSupported) return;

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    setMicError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setSpeechTranscript(currentTranscript.trim());
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setMicError('Microphone permission was denied. Please allow microphone access in your browser or practice using manual notes.');
        } else {
          setMicError(`Recognition error (${event.error}). You can continue speaking with the timer or type your speech notes.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();

      // If speech timer isn't running, start it
      if (mode === 'speech' && !isRunning) {
        setIsRunning(true);
      }
    } catch (err) {
      console.error(err);
      setMicError('Failed to initialize speech recognition. Use manual notes or practice out loud.');
    }
  };

  // Word count & WPM calculation
  const words = speechTranscript.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const elapsedSpeechSeconds = mode === 'speech' ? 180 - secondsLeft : 0;
  const calculatedWpm =
    elapsedSpeechSeconds > 10 ? Math.round((wordCount / (elapsedSpeechSeconds / 60))) : 0;

  // Save practice session log
  const handleSaveSession = () => {
    if (!speechTranscript.trim()) return;

    const newLog: LecturetteLog = {
      id: `lec-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      topic: activeTopic.topic,
      level: activeTopic.level,
      transcript: speechTranscript.trim(),
      speechDurationSeconds: 180 - secondsLeft,
      wordCount,
      wpm: calculatedWpm,
      selfRatings
    };

    const updated = [newLog, ...savedLogs].slice(0, 15);
    setSavedLogs(updated);
    try {
      localStorage.setItem(LECTURETTE_HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    recordActivityDate();
    alert('Lecturette practice session saved to your local preparation record.');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rSecs).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Capability & Browser Support Banner */}
      <div className="rounded-xl bg-slate-900 border border-[#d4af37]/30 p-4 text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#102a4c] text-[#e5c158] border border-[#d4af37]/40 shrink-0">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                GTO Day 4 Lecturette Practice Studio
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Web Speech API
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              Native browser speech recognition and 3-minute GTO pacing clock. No external AI APIs or cloud recordings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              isSpeechRecognitionSupported
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            }`}
          >
            {isSpeechRecognitionSupported ? 'Speech Recognition Ready' : 'Timer & Notes Fallback'}
          </span>
        </div>
      </div>

      {/* Header & Topic Shuffle */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Lecturette Pacing & Delivery Simulator</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Select 1 of 4 topics from the card, spend 3 minutes preparing, and deliver a structured 3-minute speech.
            </p>
          </div>

          <button
            onClick={handleShuffleTopics}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#0a192f] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 shrink-0 self-start sm:self-auto"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Draw New Topic Card</span>
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topic Card Drawer (4 real SSB levels) */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            SSB Lecturette Card (Pick 1 of 4 Topics)
          </h4>

          <div className="space-y-3">
            {currentTopics.map((item, index) => {
              const isSelected = activeTopicIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => handleSelectTopic(index)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#0a192f] text-white border-[#d4af37]/40 shadow-md'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        isSelected
                          ? 'bg-[#d4af37]/20 text-[#f3d789] border border-[#d4af37]/40'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Option {item.level}
                    </span>
                    <span className="text-[10px] opacity-80">{item.levelLabel}</span>
                  </div>

                  <h5 className="font-bold text-sm leading-snug">{item.topic}</h5>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                      <div className="font-semibold text-[#f3d789] text-[11px] uppercase tracking-wider">
                        Suggested Speaking Points:
                      </div>
                      <ul className="list-disc pl-4 space-y-1 text-[11px]">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Text to Speech Speaker Button */}
          {isSpeechSynthesisSupported && (
            <button
              onClick={handleToggleSpeakPoints}
              className="w-full py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 rounded-xl border border-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              {isSpeakingPoints ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-600" />
                  <span>Stop Audio Reading</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#0a192f]" />
                  <span>Listen to Topic Points (Audio Prompt)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Pacing Clock and Delivery Guide */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-6">
            {/* Mode Toggle (Prep vs Speech) */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSwitchMode('prep')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    mode === 'prep'
                      ? 'bg-[#0a192f] text-[#e5c158] shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Preparation Mode (3:00)
                </button>
                <button
                  onClick={() => handleSwitchMode('speech')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    mode === 'speech'
                      ? 'bg-[#0a192f] text-[#e5c158] shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Speech Delivery Mode (3:00)
                </button>
              </div>

              {/* Status Indicator */}
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  mode === 'prep'
                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                {mode === 'prep' ? 'Mentally Structure Points' : 'Deliver Out Loud'}
              </span>
            </div>

            {/* Selected Topic Display */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Selected Topic
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-0.5 leading-snug">
                {activeTopic.topic}
              </h4>
            </div>

            {/* Pacing Clock Display */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#102a4c] p-6 text-center text-white shadow-inner">
              <span className="text-xs uppercase font-bold tracking-widest text-[#f3d789] block mb-1">
                {mode === 'prep' ? 'Preparation Clock' : 'Speech Delivery Clock'}
              </span>

              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white my-3">
                {formatTimer(secondsLeft)}
              </div>

              {secondsLeft <= 30 && mode === 'speech' && (
                <div className="text-xs font-bold text-amber-300 animate-pulse flex items-center justify-center gap-1.5 mb-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Single Bell Warning! Conclude your lecturette gracefully with recommendations.</span>
                </div>
              )}

              {/* Timer Controls */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      : 'bg-[#d4af37] hover:bg-[#e5c158] text-slate-950'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRunning ? 'Pause Clock' : 'Start Pacing Clock'}</span>
                </button>

                {isSpeechRecognitionSupported && mode === 'speech' && (
                  <button
                    onClick={handleToggleListening}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                      isListening
                        ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                        : 'bg-white text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-indigo-600" />}
                    <span>{isListening ? 'Stop Recording' : 'Live Mic Transcribe'}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsRunning(false);
                    setSecondsLeft(180);
                    if (isListening && recognitionRef.current) {
                      recognitionRef.current.stop();
                      setIsListening(false);
                    }
                  }}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Reset 3:00 Clock"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Microphone Error Alert */}
            {micError && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{micError}</span>
              </div>
            )}

            {/* Transcript & Speech Notes Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-slate-800 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  Speech Notes & Live Transcription
                </label>
                <div className="flex items-center gap-3 font-mono text-slate-500 text-[11px]">
                  <span>Words: {wordCount}</span>
                  {calculatedWpm > 0 && <span>Pacing: ~{calculatedWpm} WPM</span>}
                </div>
              </div>

              <textarea
                rows={5}
                value={speechTranscript}
                onChange={e => setSpeechTranscript(e.target.value)}
                placeholder={
                  isSpeechRecognitionSupported
                    ? "Click 'Live Mic Transcribe' to speak into your microphone, or type your speech notes here..."
                    : "Type or paste your lecturette speech notes here while practicing with the 3:00 delivery timer..."
                }
                className="w-full p-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f] bg-slate-50/50 leading-relaxed"
              />
            </div>

            {/* Self-Evaluation Checklist */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">
                Lecturette Delivery Self-Checklist (Candidate Self-Rating):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selfRatings.eyeContact}
                    onChange={e => setSelfRatings(r => ({ ...r, eyeContact: e.target.checked }))}
                    className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                  />
                  <span>Maintained steady gaze & confident posture</span>
                </label>

                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selfRatings.coveredStructure}
                    onChange={e =>
                      setSelfRatings(r => ({ ...r, coveredStructure: e.target.checked }))
                    }
                    className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                  />
                  <span>Structured Intro, Body & Way Forward</span>
                </label>

                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selfRatings.pacedWell}
                    onChange={e => setSelfRatings(r => ({ ...r, pacedWell: e.target.checked }))}
                    className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                  />
                  <span>Concluded upon single bell (2:30 - 3:00)</span>
                </label>

                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selfRatings.avoidedFillers}
                    onChange={e =>
                      setSelfRatings(r => ({ ...r, avoidedFillers: e.target.checked }))
                    }
                    className="rounded border-slate-300 text-[#0a192f] focus:ring-[#0a192f]"
                  />
                  <span>Minimized verbal fillers & silent pauses</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  disabled={!speechTranscript.trim()}
                  onClick={handleSaveSession}
                  className="px-4 py-2 bg-[#0a192f] text-[#e5c158] hover:bg-[#102a4c] disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Lecturette Practice Record</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Lecturette Practice Records */}
      {savedLogs.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">
              Saved Lecturette Delivery Records ({savedLogs.length})
            </h4>
            <button
              onClick={() => {
                localStorage.removeItem(LECTURETTE_HISTORY_KEY);
                setSavedLogs([]);
              }}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear History</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {savedLogs.map(log => (
              <div key={log.id} className="py-3.5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0a192f] text-[#e5c158]">
                      Option {log.level}
                    </span>
                    <span className="text-xs font-bold text-slate-900">{log.topic}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{log.date}</span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200/80 leading-relaxed italic">
                  "{log.transcript}"
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
                  <span>Duration: {log.speechDurationSeconds}s</span>
                  <span>•</span>
                  <span>Words: {log.wordCount}</span>
                  {log.wpm > 0 && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-indigo-700">~{log.wpm} WPM</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
