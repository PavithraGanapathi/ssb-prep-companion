# SSB Prep Companion ⚓
**Premier Services Selection Board (SSB) Preparation Cockpit for Indian Navy Officer Aspirants**

> *"Official Motto: May the Lord of the Oceans be Auspicious Unto Us"*

---

## 🎯 Mission Overview
**SSB Prep Companion** is a comprehensive, modern, offline-first web application designed for an Indian Navy officer candidate preparing for their Services Selection Board (SSB) interview targeted for **December 28, 2026**.

The application operates with:
- **Zero Hindi / Devanagari text or transliterations:** Clear, natural English is the default and only language.
- **Zero external AI or paid API dependencies:** 100% deterministic local logic, browser Web APIs, and verifiable public reference datasets.
- **Real activity analytics:** No fabricated streaks or fake user statistics.

---

## 🛠️ Tech Stack & Architecture
- **Framework:** React 19 + TypeScript + Vite 6
- **Styling:** Tailwind CSS with Indian Navy visual design system
- **Iconography:** Lucide Icons (`lucide-react`)
- **Web APIs:** Browser `localStorage` for offline persistence, Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) for voice practice
- **Design Tokens:**
  - Deep Navy: `#0A192F` and `#102A4C`
  - Crisp Surfaces: `#F8FAFC` and `#FFFFFF`
  - Naval Gold Accents: `#D4AF37` and `#E5C158`
  - Laurel Gold: `#B48A28`
  - Typography: Inter sans-serif and JetBrains Mono for timers and metrics

---

## 🚀 Complete Feature Modules

### 1. Operations Dashboard
- **Dynamic SSB Countdown:** Countdown to December 28, 2026 (or custom date configured by candidate) calculating days, hours, minutes, and seconds dynamically.
- **Real Study Streak:** Computed directly from consecutive days of completed tasks and drills.
- **Next Recommended Task:** Dynamically highlights the first incomplete planner drill with estimated minutes and one-click completion.
- **Module Readiness Diagnostics:** Live aggregate stats from local test histories (OIR tests, Psychology drills, Question Bank completion, Objective Knowledge scores).
- **Current Affairs Highlights:** Immediate view of the latest verified strategic maritime briefings.

### 2. Officer Intelligence Rating (OIR) Practice Module (Day 1 Screening)
- **Verbal & Non-Verbal Engine:** 20 original questions across 8 categories (Analogies, Number Series, Syllogisms, Coding-Decoding, Non-Verbal Matrices, Mirror Images, Embedded Figures, Cube Folding).
- **Custom Vector Figures:** Responsive, inline SVG graphics for spatial and non-verbal questions.
- **4 Preset Mock Test Modes:** 20-Question Full Diagnostic, 10-Question Verbal Sprint, 10-Question Spatial & Non-Verbal Sprint, and 5-Question Rapid Warmup.
- **Palette Navigation:** Previous, Next, Clear, Mark for Review, and question status indicators.
- **Auto-Grading & Diagnostic Report:** OIR Rating Tier (OIR-1 to OIR-5), category accuracy breakdown, and question-by-question review with explanations.
- **Saved History:** Retains past attempts and bookmarks in `localStorage`.

### 3. Psychology Test Battery (DIPR Day 2)
- **PPDT (Picture Perception & Discussion Test):** 30-second observation phase with vector nautical illustration, interactive character box (Age, Gender, Mood, Hero designation), 1-minute theme synthesis, and 4-minute story writing with live word counter.
- **TAT (Thematic Apperception Test):** 4-minute story drafting with vector illustrations and DIPR structural storytelling guidance.
- **WAT (Word Association Test):** 60-word sequential test with 15-second per-word pacing countdown, automated word progression, and response logger.
- **SRT (Situation Reaction Test):** 15 realistic high-pressure situational dilemmas with candidate action responses, tested qualities, and DIPR benchmarks.
- **SDT (Self-Description Test):** 5-perspective assessment (Parents, Teachers/Superiors, Friends/Peers, Self-Assessment, Areas for Improvement).

### 4. Services Selection Board Question Bank
- **12 Curated Categories:** Personal Interview, Self-Introduction, Strengths & Weaknesses, Education, Family & Friends, Leadership & Decisions, Indian Navy Knowledge, Armed Forces Ranks, Maritime Security, Defence Technology, National & International Affairs, General Knowledge & Reasoning.
- **Dual Answer Frameworks:** Clearly distinguishes factual answers from personal STAR (Situation, Task, Action, Result) response structures.
- **Interactive Tools:** Anti-repetition randomizer, difficulty filters (Foundation, Standard, Advanced), search bar, completed tick marks, and bookmarking.

### 5. Rule-Based Interview Simulator & Objective Mock Tests
- **Objective Knowledge Mock Tests:** 20 verified multiple-choice questions covering Indian Navy ships, submarine classes, ranks, UNCLOS laws, and defence technology. Configurable question count (5, 10, 15, 20), timed (60s/Q) or untimed modes, palette navigation, auto-scoring, and comprehensive explanations.
- **Rule-Based PIQ Interview Simulator:** Non-AI simulation of the Interviewing Officer (IO) interview across 4 stages (Academics & Peers CIQ 1, Family & Routine CIQ 2, Naval Motivation, Situational Leadership). Features typing response box, response timer, assessor rubric focus, self-rating checklist, and transcript archive.

### 6. Maritime & Defence Current Affairs (Verified Sources)
- **6 Primary Categories:** Maritime Affairs and Indian Navy, Defence and Security, International Relations and Geopolitics, Science & Space, National Affairs & Governance, Economy & Infrastructure.
- **Verified Primary Sources:** Direct clickable links to official releases from the Press Information Bureau (PIB), Ministry of Defence (MoD), Indian Navy portal, MEA, and ISRO.
- **Structured Briefings:** Publication dates, event dates, concise summaries, key facts for SSB, and sample Group Discussion (GD) and Lecturette discussion topics.
- **Revision List & Search:** Real-time search across briefings and bookmarking for rapid pre-interview revision.
- **Last Updated Date:** Explicitly shows curated repository verification date (15 October 2024).

### 7. Lecturette & Voice Practice Studio (GTO Day 4)
- **Standard 4-Tier Cards:** Authentic SSB difficulty levels (Level A: High Geopolitics, Level B: National/Defence, Level C: Social Issues, Level D: Basic/General Awareness).
- **Dual Pacing Clocks:** 3-minute Preparation Clock and 3-minute Speech Delivery Clock with 30-second warning bell alert.
- **Native Web Speech API:** Live speech transcription and words-per-minute (WPM) counter when supported, with audio reading of topic points via SpeechSynthesis.
- **Fallback Mode:** Complete manual notes and speech delivery timer fallback if speech recognition is not supported or permission is denied.

### 8. Daily Study Planner & 15 OLQ Matrix
- **Customizable Daily Routine:** Add, edit, complete, and delete drills categorized by SSB stage.
- **15 OLQs Self-Evaluation Matrix:** Rate readiness across Factors I through IV with persistent 5-star sliders.
- **Activity Reset Confirmation Modal:** Candidate can safely clear local practice records without affecting code or default questions.

---

## 💻 Setup & Run Instructions

### 1. Prerequisites
- **Node.js:** v18.0.0 or higher (v20.x tested and verified)
- **npm:** v9.x or higher

### 2. Installation
Open your terminal in the `ssb-prep-companion` directory:
```bash
cd ssb-prep-companion
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
Compiles TypeScript and bundles via Vite with 0 errors.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚓ Designed for the Indian Navy Officer Candidate
Built with precision, discipline, and uncompromising attention to authentic Services Selection Board standards. Target Interview: **December 28, 2026**.
