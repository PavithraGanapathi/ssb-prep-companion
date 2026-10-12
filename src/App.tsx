import { useState } from 'react';
import type { NavScreen } from './types';
import { useTasks } from './hooks/useTasks';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { PlannerPage } from './pages/PlannerPage';
import { PsychologyPage } from './pages/PsychologyPage';
import { QuestionBankPage } from './pages/QuestionBankPage';
import { CurrentAffairsPage } from './pages/CurrentAffairsPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { OirPracticePage } from './pages/OirPracticePage';
import { VoicePracticePage } from './pages/VoicePracticePage';
import { ProgressPage } from './pages/ProgressPage';

export function App() {
  const [activeScreen, setActiveScreen] = useState<NavScreen>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    resetToDefaultTasks,
    completionPercentage,
    completedTasks,
    totalTasks,
    totalMinutes,
    studyStreak
  } = useTasks();

  const screenTitles: Record<NavScreen, string> = {
    dashboard: 'Cadet Operations Dashboard',
    oir: 'Officer Intelligence Rating (OIR) Practice & Mock Tests',
    planner: 'SSB Daily Study Planner',
    psychology: 'Psychology Test Battery (DIPR)',
    questions: 'Services Selection Board Question Bank',
    affairs: 'Maritime & Defence Current Affairs',
    interview: 'Rule-Based Interview Practice Simulator',
    voice: 'Lecturette & Voice Practice',
    progress: '15 Officer Like Qualities (OLQ) Tracker'
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return (
          <DashboardPage
            tasks={tasks}
            onToggleTask={toggleTask}
            onNavigate={setActiveScreen}
            completionPercentage={completionPercentage}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            totalMinutes={totalMinutes}
            studyStreak={studyStreak}
          />
        );
      case 'oir':
        return <OirPracticePage />;
      case 'planner':
        return (
          <PlannerPage
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
            onResetTasks={resetToDefaultTasks}
            completionPercentage={completionPercentage}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
          />
        );
      case 'psychology':
        return <PsychologyPage />;
      case 'questions':
        return <QuestionBankPage />;
      case 'affairs':
        return <CurrentAffairsPage />;
      case 'interview':
        return <MockInterviewPage />;
      case 'voice':
        return <VoicePracticePage />;
      case 'progress':
        return <ProgressPage />;
      default:
        return (
          <DashboardPage
            tasks={tasks}
            onToggleTask={toggleTask}
            onNavigate={setActiveScreen}
            completionPercentage={completionPercentage}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            totalMinutes={totalMinutes}
            studyStreak={studyStreak}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Desktop / Responsive Sidebar */}
      <Sidebar
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all pb-16 lg:pb-0">
        {/* Top Header */}
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          activeScreenTitle={screenTitles[activeScreen]}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActiveScreen()}
        </main>

        {/* Mobile Bottom Dock Navigation */}
        <MobileNav
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          onOpenMoreMenu={() => setIsMobileMenuOpen(true)}
        />
      </div>
    </div>
  );
}

export default App;
