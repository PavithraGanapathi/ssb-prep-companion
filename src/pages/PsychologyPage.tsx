import { useState, useEffect } from 'react';
import type React from 'react';
import { PSYCHOLOGY_EXERCISES } from '../data/samplePsychology';
import { PsychologyScene } from '../components/psychology/PsychologyScene';
import type { PsychologyExercise, PPDTCharacter } from '../types';
import {
  Brain,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Sparkles,
  Info,
  Check
} from 'lucide-react';

const DRAFT_PPDT_KEY = 'ssb_psych_draft_ppdt_v1';
const DRAFT_TAT_KEY = 'ssb_psych_draft_tat_v1';
const DRAFT_SDT_KEY = 'ssb_psych_draft_sdt_v1';

export const PsychologyPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'PPDT' | 'TAT' | 'WAT' | 'SRT' | 'SDT'>('PPDT');
  const [activeExercise, setActiveExercise] = useState<PsychologyExercise>(PSYCHOLOGY_EXERCISES[0]);
  
  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(PSYCHOLOGY_EXERCISES[0].durationSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // -------------------------------------------------------------
  // PPDT State
  // -------------------------------------------------------------
  const [ppdtPhase, setPpdtPhase] = useState<'OBSERVE' | 'BOX_AND_STORY'>('OBSERVE');
  const [ppdtCharacters, setPpdtCharacters] = useState<PPDTCharacter[]>([
    { id: 'c1', age: 23, gender: 'M', mood: '+', isHero: true },
    { id: 'c2', age: 58, gender: 'M', mood: '0', isHero: false },
    { id: 'c3', age: 24, gender: 'P', mood: '+', isHero: false }
  ]);
  const [ppdtAction, setPpdtAction] = useState('Evacuating coastal families to higher ground before cyclone landfall');
  const [ppdtStory, setPpdtStory] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_PPDT_KEY) || '';
    } catch {
      return '';
    }
  });

  // -------------------------------------------------------------
  // TAT State
  // -------------------------------------------------------------
  const [tatStory, setTatStory] = useState(() => {
    try {
      return localStorage.getItem(DRAFT_TAT_KEY) || '';
    } catch {
      return '';
    }
  });

  // -------------------------------------------------------------
  // WAT State (15-second rapid pacing sprint)
  // -------------------------------------------------------------
  const [watWordCount, setWatWordCount] = useState<15 | 30 | 60>(15);
  const [watActiveIndex, setWatActiveIndex] = useState(0);
  const [watCurrentInput, setWatCurrentInput] = useState('');
  const [watSecondsLeft, setWatSecondsLeft] = useState(15);
  const [isWatRunning, setIsWatRunning] = useState(false);
  const [watResponses, setWatResponses] = useState<Record<string, string>>({});
  const [isWatCompleted, setIsWatCompleted] = useState(false);

  // -------------------------------------------------------------
  // SRT State
  // -------------------------------------------------------------
  const [srtIndex, setSrtIndex] = useState(0);
  const [srtAnswers, setSrtAnswers] = useState<Record<string, string>>({});
  const [showSrtRationale, setShowSrtRationale] = useState(false);

  // -------------------------------------------------------------
  // SDT State
  // -------------------------------------------------------------
  const [sdtTab, setSdtTab] = useState<'parents' | 'teachers' | 'friends' | 'self' | 'aims'>('parents');
  const [sdtSections, setSdtSections] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_SDT_KEY);
      return saved ? JSON.parse(saved) : {
        parents: 'My parents consider me dependable, disciplined, and responsible. They appreciate my focus on fitness and daily routines...',
        teachers: 'My professors regard me as an attentive and technically curious student with strong teamwork in lab projects...',
        friends: 'My friends see me as approachable, loyal, and level-headed during group trips and sports competitions...',
        self: 'I consider myself energetic, adaptable, and eager to take on operational responsibilities at sea...',
        aims: 'I am actively practicing daily 3-minute lecturettes to refine my impromptu power of expression and running 5km daily...'
      };
    } catch {
      return {};
    }
  });

  // Autosave Drafts
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_PPDT_KEY, ppdtStory);
    } catch (e) {
      console.error(e);
    }
  }, [ppdtStory]);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_TAT_KEY, tatStory);
    } catch (e) {
      console.error(e);
    }
  }, [tatStory]);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_SDT_KEY, JSON.stringify(sdtSections));
    } catch (e) {
      console.error(e);
    }
  }, [sdtSections]);

  // General Timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      if (selectedType === 'PPDT' && ppdtPhase === 'OBSERVE') {
        setPpdtPhase('BOX_AND_STORY');
        setTimerSeconds(240); // 4 minutes for story writing
        setIsTimerRunning(true);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, selectedType, ppdtPhase]);

  // WAT Rapid Word Timer (15s per word)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isWatRunning && !isWatCompleted) {
      interval = setInterval(() => {
        setWatSecondsLeft(prev => {
          if (prev <= 1) {
            handleWatNext();
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isWatRunning, isWatCompleted, watActiveIndex, watCurrentInput]);

  const handleSelectModule = (type: 'PPDT' | 'TAT' | 'WAT' | 'SRT' | 'SDT') => {
    setSelectedType(type);
    const exercise = PSYCHOLOGY_EXERCISES.find(ex => ex.type === type) || PSYCHOLOGY_EXERCISES[0];
    setActiveExercise(exercise);
    setTimerSeconds(type === 'PPDT' ? 30 : exercise.durationSeconds);
    setIsTimerRunning(false);
    if (type === 'PPDT') setPpdtPhase('OBSERVE');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rSecs).padStart(2, '0')}`;
  };

  // PPDT Character Handlers
  const addPpdtCharacter = () => {
    const newChar: PPDTCharacter = {
      id: `char-${Date.now()}`,
      age: 22,
      gender: 'M',
      mood: '+',
      isHero: ppdtCharacters.length === 0
    };
    setPpdtCharacters(prev => [...prev, newChar]);
  };

  const removePpdtCharacter = (id: string) => {
    setPpdtCharacters(prev => prev.filter(c => c.id !== id));
  };

  const updatePpdtCharacter = (id: string, field: keyof PPDTCharacter, value: unknown) => {
    setPpdtCharacters(prev =>
      prev.map(c => {
        if (c.id === id) {
          if (field === 'isHero' && value === true) {
            // Only one hero allowed
            return { ...c, isHero: true };
          }
          return { ...c, [field]: value };
        }
        if (field === 'isHero' && value === true) {
          return { ...c, isHero: false };
        }
        return c;
      })
    );
  };

  // WAT Handlers
  const watList = (PSYCHOLOGY_EXERCISES.find(e => e.type === 'WAT')?.words || []).slice(0, watWordCount);
  const currentWatWord = watList[watActiveIndex] || 'Done';

  const handleWatNext = () => {
    if (currentWatWord) {
      setWatResponses(prev => ({
        ...prev,
        [currentWatWord]: watCurrentInput.trim()
      }));
    }
    setWatCurrentInput('');
    setWatSecondsLeft(15);

    if (watActiveIndex + 1 < watList.length) {
      setWatActiveIndex(prev => prev + 1);
    } else {
      setIsWatCompleted(true);
      setIsWatRunning(false);
    }
  };

  const handleStartWat = () => {
    setWatActiveIndex(0);
    setWatResponses({});
    setWatCurrentInput('');
    setWatSecondsLeft(15);
    setIsWatCompleted(false);
    setIsWatRunning(true);
  };

  // SRT Handlers
  const srtList = PSYCHOLOGY_EXERCISES.find(e => e.type === 'SRT')?.situations || [];
  const currentSrt = srtList[srtIndex] || null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Disclaimer Banner */}
      <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-950 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm">
          <span className="font-bold">General Practice Guidance Only: </span>
          This module provides authentic practice stimulus, structured worksheets, and pacing timers for the DIPR Psychology Battery. This application does not claim to objectively evaluate or certify candidate personality or selection chances.
        </div>
      </div>

      {/* Header with 5 Test Switcher */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#0a192f] text-[#d4af37]">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Psychology Test Battery (DIPR)</h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Full 5-Battery Suite
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                PPDT (Screening), TAT (Stories), WAT (Rapid Associations), SRT (Situations), and SDT (Self-Description)
              </p>
            </div>
          </div>

          {/* Test Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {(['PPDT', 'TAT', 'WAT', 'SRT', 'SDT'] as const).map(type => (
              <button
                key={type}
                onClick={() => handleSelectModule(type)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === type
                    ? 'bg-[#0a192f] text-[#e5c158] shadow-md border-b-2 border-b-[#d4af37]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PPDT MODULE                                            */}
      {/* ========================================================= */}
      {selectedType === 'PPDT' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Picture Observation & Character Box */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b48a28]">
                  Phase: {ppdtPhase === 'OBSERVE' ? '1. Picture Observation (30s)' : '2. Box & Story Writing (4m)'}
                </span>

                {/* Timer */}
                <div className="flex items-center gap-2 font-mono font-bold text-sm bg-slate-900 text-[#e5c158] px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
              </div>

              {/* Ambiguous Scene Illustration */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Ambiguous Stimulus Scene:
                </span>
                <PsychologyScene sceneType="ppdt_coastal_embankment" height={220} />
              </div>

              {/* Timer Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isTimerRunning
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Clock' : 'Start Observation Clock (30s)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setPpdtPhase(ppdtPhase === 'OBSERVE' ? 'BOX_AND_STORY' : 'OBSERVE');
                    setTimerSeconds(ppdtPhase === 'OBSERVE' ? 240 : 30);
                  }}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline"
                >
                  Switch to {ppdtPhase === 'OBSERVE' ? 'Writing Phase' : 'Observation Phase'}
                </button>
              </div>

              {/* Interactive Character Box */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    PPDT Character Box Details:
                  </span>
                  <button
                    type="button"
                    onClick={addPpdtCharacter}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0a192f] bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Character</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {ppdtCharacters.map((char, index) => (
                    <div
                      key={char.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-600">Person {index + 1}:</span>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Age:</span>
                          <input
                            type="number"
                            min={10}
                            max={80}
                            value={char.age}
                            onChange={e => updatePpdtCharacter(char.id, 'age', Number(e.target.value))}
                            className="w-12 px-1.5 py-0.5 border border-slate-300 rounded text-center text-xs font-bold bg-white"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Gender:</span>
                          <select
                            value={char.gender}
                            onChange={e => updatePpdtCharacter(char.id, 'gender', e.target.value)}
                            className="px-1.5 py-0.5 border border-slate-300 rounded text-xs font-bold bg-white"
                          >
                            <option value="M">M</option>
                            <option value="F">F</option>
                            <option value="P">P</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">Mood:</span>
                          <select
                            value={char.mood}
                            onChange={e => updatePpdtCharacter(char.id, 'mood', e.target.value)}
                            className="px-1.5 py-0.5 border border-slate-300 rounded text-xs font-bold bg-white"
                          >
                            <option value="+">+</option>
                            <option value="0">0</option>
                            <option value="-">-</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updatePpdtCharacter(char.id, 'isHero', true)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                            char.isHero
                              ? 'bg-[#d4af37] text-slate-950 border-[#b48a28]'
                              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {char.isHero ? '★ Hero' : 'Set Hero'}
                        </button>

                        <button
                          type="button"
                          onClick={() => removePpdtCharacter(char.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Story Drafting Worksheet */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Action / Main Theme Headline:
              </label>
              <input
                type="text"
                value={ppdtAction}
                onChange={e => setPpdtAction(e.target.value)}
                placeholder="e.g. Coordinating flood relief evacuation in coastal village"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Candidate Story Draft (Past, Present, Positive Resolution):
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {ppdtStory.trim() ? ppdtStory.trim().split(/\s+/).length : 0} Words
                </span>
              </div>
              <textarea
                rows={9}
                value={ppdtStory}
                onChange={e => setPpdtStory(e.target.value)}
                placeholder="Write your story: Introduce your central character (Hero) by name, specify the challenge faced, detail concrete actions taken with the team, and conclude with a positive outcome..."
                className="w-full p-3.5 border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
              />
            </div>

            {/* PPDT Assessor Guidelines */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-[#0a192f] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                PPDT Assessor Core Expectations:
              </span>
              <ul className="space-y-1 text-slate-600">
                <li>• Identify one clear Hero whose age and gender match the perceived central figure.</li>
                <li>• Structure into three logical parts: What led to it, What is happening now, and the Final Outcome.</li>
                <li>• Keep actions pragmatic: hero delegates duties, uses available resources, and works with the group.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. TAT MODULE                                             */}
      {/* ========================================================= */}
      {selectedType === 'TAT' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#b48a28]">
                  TAT Scene Observation (30s) + Story Writing (4m)
                </span>
                <div className="flex items-center gap-2 font-mono font-bold text-sm bg-slate-900 text-[#e5c158] px-3 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  TAT Scene Illustration:
                </span>
                <PsychologyScene sceneType="tat_naval_bridge" height={220} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isTimerRunning
                      ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Clock' : 'Start 4:00 Story Clock'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(240);
                  }}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-[#0a192f] block mb-1">Scenario Brief:</span>
                "{activeExercise.content}"
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                TAT Candidate Story Worksheet
              </h3>
              <span className="text-xs text-slate-500 font-mono">
                {tatStory.trim() ? tatStory.trim().split(/\s+/).length : 0} Words
              </span>
            </div>

            <textarea
              rows={12}
              value={tatStory}
              onChange={e => setTatStory(e.target.value)}
              placeholder="Draft your TAT story here: Name the hero, identify the operational context, detail the logical actions taken, and conclude positively..."
              className="w-full p-4 border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            />

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Autosaved to your browser LocalStorage</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Saved
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. WAT MODULE (15s Rapid Sprint)                          */}
      {/* ========================================================= */}
      {selectedType === 'WAT' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">Word Association Test (WAT) Rapid Sprint</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  15 Seconds / Word
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Spontaneous reaction drill reflecting character, values, and action orientation
              </p>
            </div>

            {/* Session Length Picker */}
            {!isWatRunning && !isWatCompleted && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Session Length:</span>
                {([15, 30, 60] as const).map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setWatWordCount(count)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                      watWordCount === count
                        ? 'bg-[#0a192f] text-white border-[#0a192f]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {count} Words
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active WAT Rapid Drill Card */}
          {!isWatCompleted ? (
            <div className="max-w-xl mx-auto text-center space-y-6 py-6">
              {isWatRunning ? (
                <>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
                    <span>Word {watActiveIndex + 1} of {watList.length}</span>
                    <span className={`font-mono text-base font-bold ${
                      watSecondsLeft <= 5 ? 'text-rose-600 animate-pulse' : 'text-slate-900'
                    }`}>
                      {watSecondsLeft}s Left
                    </span>
                  </div>

                  {/* Big Stimulus Word */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#0a192f] to-[#102a4c] p-10 text-white shadow-md">
                    <span className="text-3xl sm:text-5xl font-black tracking-wider text-[#e5c158] font-sans uppercase">
                      {currentWatWord}
                    </span>
                  </div>

                  {/* Input Box */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      autoFocus
                      value={watCurrentInput}
                      onChange={e => setWatCurrentInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          handleWatNext();
                        }
                      }}
                      placeholder="Type spontaneous sentence and press Enter..."
                      className="flex-1 px-4 py-3 border-2 border-[#0a192f]/40 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
                    />
                    <button
                      type="button"
                      onClick={handleWatNext}
                      className="px-5 py-3 bg-[#0a192f] text-white rounded-xl text-xs font-bold hover:bg-[#102a4c] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-amber-50 text-[#b48a28] flex items-center justify-center mx-auto border border-amber-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Ready for WAT Rapid Sprint?</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    You will have 15 seconds per word to type a spontaneous sentence. The drill auto-advances automatically.
                  </p>
                  <button
                    type="button"
                    onClick={handleStartWat}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] transition-colors border border-[#d4af37]/30 shadow-md"
                  >
                    Start {watWordCount}-Word Sprint
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* WAT Review Summary */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="text-sm font-bold text-slate-900">
                  WAT Session Complete ({Object.keys(watResponses).length} / {watList.length} Words Attempted)
                </h4>
                <button
                  type="button"
                  onClick={handleStartWat}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0a192f] rounded-lg hover:bg-[#102a4c]"
                >
                  Retake Sprint
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                {watList.map(word => {
                  const resp = watResponses[word];
                  return (
                    <div key={word} className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs">
                      <span className="font-extrabold text-[#0a192f] uppercase tracking-wider block mb-1">
                        {word}
                      </span>
                      {resp ? (
                        <p className="text-slate-800 italic">"{resp}"</p>
                      ) : (
                        <span className="text-slate-400 italic">Time expired / Skipped</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. SRT MODULE                                             */}
      {/* ========================================================= */}
      {selectedType === 'SRT' && currentSrt && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#b48a28]">
                Situation Reaction Test (30 Seconds / Situation)
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                Situation {srtIndex + 1} of {srtList.length}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
                Quality: {currentSrt.qualityTested}
              </span>
            </div>
          </div>

          {/* Situation Prompt */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/70 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Dilemma / Situation:
            </span>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              "{currentSrt.situation}"
            </p>
          </div>

          {/* Candidate Response */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Your Immediate Action (Be brief, clear, and complete):
            </label>
            <input
              type="text"
              value={srtAnswers[currentSrt.id] || ''}
              onChange={e =>
                setSrtAnswers(prev => ({ ...prev, [currentSrt.id]: e.target.value }))
              }
              placeholder="He called emergency services, administered first aid, and..."
              className="w-full px-4 py-2.5 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            />
          </div>

          {/* Rationale Toggle */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setShowSrtRationale(!showSrtRationale)}
              className="text-xs font-bold text-[#0a192f] hover:underline"
            >
              {showSrtRationale ? 'Hide Suggested Action' : 'Reveal Assessor Suggested Action'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={srtIndex === 0}
                onClick={() => {
                  setSrtIndex(prev => prev - 1);
                  setShowSrtRationale(false);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={srtIndex === srtList.length - 1}
                onClick={() => {
                  setSrtIndex(prev => prev + 1);
                  setShowSrtRationale(false);
                }}
                className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#0a192f] hover:bg-[#102a4c] disabled:opacity-40"
              >
                Next Situation
              </button>
            </div>
          </div>

          {/* Suggested Action Callout */}
          {showSrtRationale && (
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">DIPR Assessor Suggested Resolution:</span>
              <p className="text-emerald-800 leading-relaxed">{currentSrt.sampleAction}</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. SDT MODULE                                             */}
      {/* ========================================================= */}
      {selectedType === 'SDT' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Self-Description Test (SDT) Worksheet</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Structured self-awareness across five core perspectives
              </p>
            </div>

            {/* 5 Sub-Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
              {([
                { id: 'parents', label: "Parents' View" },
                { id: 'teachers', label: "Teachers' View" },
                { id: 'friends', label: "Friends' View" },
                { id: 'self', label: 'Self View' },
                { id: 'aims', label: 'Qualities to Develop' }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSdtTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    sdtTab === tab.id
                      ? 'bg-[#0a192f] text-[#e5c158] shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active SDT Workspace */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Perspective: {sdtTab.toUpperCase()}
            </span>

            <textarea
              rows={8}
              value={sdtSections[sdtTab] || ''}
              onChange={e =>
                setSdtSections(prev => ({ ...prev, [sdtTab]: e.target.value }))
              }
              placeholder={`Write a genuine, balanced paragraph outlining what your ${sdtTab} think of you...`}
              className="w-full p-4 border border-slate-300 rounded-xl text-xs sm:text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0a192f]"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Saved automatically to local browser storage</span>
              <span className="font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Auto-Saved
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-[#0a192f]">Assessor Advice:</span>
            <p>Ensure genuine consistency between the qualities mentioned here and what you display in the PIQ form and Personal Interview.</p>
          </div>
        </div>
      )}
    </div>
  );
};
