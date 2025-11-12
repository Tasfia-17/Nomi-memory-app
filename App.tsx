import React, { useState } from 'react';
import { CloudAnimation } from './components/CloudAnimation';
import { NomiCharacter } from './components/NomiCharacter';
import { Button } from './components/ui/button';
import { CrystalSelection } from './pages/CrystalSelection';
import { PronounSelection } from './pages/PronounSelection';
import { NameSelection } from './pages/NameSelection';
import { UserNameInput } from './pages/UserNameInput';
import { LearnAboutYou } from './pages/LearnAboutYou';
import { AgeSelection } from './pages/AgeSelection';
import { GenderSelection } from './pages/GenderSelection';
import { DayOneWelcome } from './pages/DayOneWelcome';
import { NoteInput } from './pages/NoteInput';
import { QuizGeneration } from './pages/QuizGeneration';
import { QuizPractice } from './pages/QuizPractice';
import { QuizResults } from './pages/QuizResults';
import { QuizSummary } from './pages/QuizSummary';
import { PracticeGoal } from './pages/PracticeGoal';
import { StreakCelebration } from './pages/StreakCelebration';
import { MemoryInsights } from './pages/MemoryInsights';
import { ReflectionInput } from './pages/ReflectionInput';
import { InviteFriends } from './pages/InviteFriends';
import { FriendProfile } from './pages/FriendProfile';
import { Settings } from './pages/Settings';
import { NotificationSettings } from './pages/NotificationSettings';
import { UserProfile } from './pages/UserProfile';
import { MainDashboard } from './pages/MainDashboard';
import { Quiz } from './utils/gemini';
import { QuizResults as QuizResultsType } from './pages/QuizPractice';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'crystal' | 'pronoun' | 'name' | 'username' | 'learn' | 'age' | 'gender' | 'dayone' | 'practicegoal' | 'streakcelebration' | 'dashboard' | 'noteinput' | 'quizgen' | 'quizpractice' | 'quizresults' | 'quizsummary' | 'insights' | 'reflection' | 'invitefriends' | 'friendprofile' | 'settings' | 'notifications' | 'profile' | 'preferences' | 'data' | 'help' | 'about' | 'report' | 'subscription'>('welcome');
  const [selectedColor, setSelectedColor] = useState<string>('purple');
  const [selectedPronoun, setSelectedPronoun] = useState<string>('they');
  const [nomiName, setNomiName] = useState<string>('Nomi');
  const [userName, setUserName] = useState<string>('');
  const [currentNoteText, setCurrentNoteText] = useState<string>('');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResultsType | null>(null);
  const [practiceGoalDays, setPracticeGoalDays] = useState<number>(7);
  const [reflections, setReflections] = useState<string[]>([]);

  if (currentPage === 'profile') {
    return (
      <UserProfile 
        selectedColor={selectedColor}
        nomiName={nomiName}
        userName={userName}
        selectedPronoun={selectedPronoun}
        streakDays={7}
        onBack={() => setCurrentPage('settings')}
        onEdit={() => {
          console.log('Edit profile');
        }}
      />
    );
  }

  if (currentPage === 'notifications') {
    return (
      <NotificationSettings 
        onBack={() => setCurrentPage('settings')}
      />
    );
  }

  if (currentPage === 'settings') {
    return (
      <Settings 
        selectedColor={selectedColor}
        nomiName={nomiName}
        userName={userName}
        onBack={() => setCurrentPage('dashboard')}
        onNavigate={(page) => setCurrentPage(page as any)}
      />
    );
  }

  if (currentPage === 'friendprofile') {
    return (
      <FriendProfile 
        selectedColor={selectedColor}
        friendName="Alex"
        friendNomiName="Kiwi"
        friendColor="teal"
        isFriend={false}
        onClose={() => setCurrentPage('invitefriends')}
        onAddFriend={() => {
          console.log('Friend added!');
        }}
      />
    );
  }

  if (currentPage === 'invitefriends') {
    return (
      <InviteFriends 
        selectedColor={selectedColor}
        nomiName={nomiName}
        userName={userName}
        onClose={() => setCurrentPage('dashboard')}
      />
    );
  }

  if (currentPage === 'reflection') {
    return (
      <ReflectionInput 
        selectedColor={selectedColor}
        nomiName={nomiName}
        onSave={(reflection) => {
          setReflections([...reflections, reflection]);
          setCurrentPage('insights');
        }}
        onCancel={() => setCurrentPage('insights')}
      />
    );
  }

  if (currentPage === 'insights') {
    return (
      <MemoryInsights 
        selectedColor={selectedColor}
        nomiName={nomiName}
        onAddReflection={() => setCurrentPage('reflection')}
        onReviewQuiz={(quizId) => {
          console.log('Review quiz:', quizId);
        }}
        onBackHome={() => setCurrentPage('dashboard')}
      />
    );
  }

  if (currentPage === 'streakcelebration') {
    return (
      <StreakCelebration 
        selectedColor={selectedColor}
        nomiName={nomiName}
        streakDays={1}
        onContinue={() => setCurrentPage('dashboard')}
      />
    );
  }

  if (currentPage === 'practicegoal') {
    return (
      <PracticeGoal 
        selectedColor={selectedColor}
        nomiName={nomiName}
        onContinue={(days) => {
          setPracticeGoalDays(days);
          setCurrentPage('streakcelebration');
        }}
      />
    );
  }

  if (currentPage === 'quizsummary') {
    return (
      <QuizSummary 
        selectedColor={selectedColor}
        nomiName={nomiName}
        quiz={currentQuiz!}
        results={quizResults!}
        onContinue={() => setCurrentPage('dashboard')}
      />
    );
  }

  if (currentPage === 'quizresults') {
    return (
      <QuizResults 
        selectedColor={selectedColor}
        nomiName={nomiName}
        results={quizResults!}
        onReturnHome={() => setCurrentPage('dashboard')}
        onPracticeAgain={() => {
          setQuizResults(null);
          setCurrentPage('quizpractice');
        }}
        onViewSummary={() => setCurrentPage('quizsummary')}
      />
    );
  }

  if (currentPage === 'quizpractice') {
    return (
      <QuizPractice 
        selectedColor={selectedColor}
        nomiName={nomiName}
        quiz={currentQuiz!}
        onComplete={(results) => {
          setQuizResults(results);
          setCurrentPage('quizresults');
        }}
      />
    );
  }

  if (currentPage === 'quizgen') {
    return (
      <QuizGeneration 
        selectedColor={selectedColor}
        nomiName={nomiName}
        noteText={currentNoteText}
        onQuizGenerated={(quiz) => {
          setCurrentQuiz(quiz);
          setCurrentPage('quizpractice');
        }}
        onBack={() => setCurrentPage('noteinput')}
      />
    );
  }

  if (currentPage === 'noteinput') {
    return (
      <NoteInput 
        selectedColor={selectedColor}
        nomiName={nomiName}
        onGenerateQuiz={(text) => {
          setCurrentNoteText(text);
          setCurrentPage('quizgen');
        }}
        onBackHome={() => setCurrentPage('dashboard')}
      />
    );
  }

  if (currentPage === 'dashboard') {
    return (
      <MainDashboard 
        selectedColor={selectedColor}
        nomiName={nomiName}
        userName={userName}
        streakDays={7}
        onNavigate={(page) => setCurrentPage(page as any)}
      />
    );
  }

  if (currentPage === 'dayone') {
    return (
      <DayOneWelcome 
        selectedColor={selectedColor}
        selectedPronoun={selectedPronoun}
        nomiName={nomiName}
        userName={userName}
        onStartToday={() => setCurrentPage('practicegoal')}
      />
    );
  }

  if (currentPage === 'gender') {
    return (
      <GenderSelection 
        selectedColor={selectedColor}
        selectedPronoun={selectedPronoun}
        nomiName={nomiName}
        userName={userName}
        onContinue={() => setCurrentPage('dayone')}
        onSkip={() => setCurrentPage('dayone')}
        onBack={() => setCurrentPage('age')}
      />
    );
  }

  if (currentPage === 'age') {
    return (
      <AgeSelection 
        selectedColor={selectedColor}
        selectedPronoun={selectedPronoun}
        nomiName={nomiName}
        userName={userName}
        onContinue={() => setCurrentPage('gender')}
        onBack={() => setCurrentPage('learn')}
      />
    );
  }

  if (currentPage === 'learn') {
    return (
      <LearnAboutYou 
        selectedColor={selectedColor}
        selectedPronoun={selectedPronoun}
        nomiName={nomiName}
        userName={userName}
        onContinue={() => setCurrentPage('age')}
        onBack={() => setCurrentPage('username')}
      />
    );
  }

  if (currentPage === 'username') {
    return (
      <UserNameInput 
        selectedColor={selectedColor}
        selectedPronoun={selectedPronoun}
        nomiName={nomiName}
        onContinue={(name) => {
          setUserName(name);
          setCurrentPage('learn');
        }}
        onSkip={() => {
          setCurrentPage('learn');
        }}
        onBack={() => setCurrentPage('name')}
      />
    );
  }

  if (currentPage === 'name') {
    return (
      <NameSelection 
        selectedColor={selectedColor}
        selectedPronoun={selectedPronoun}
        onContinue={(name) => {
          setNomiName(name);
          setCurrentPage('username');
        }}
        onBack={() => setCurrentPage('pronoun')}
      />
    );
  }

  if (currentPage === 'pronoun') {
    return (
      <PronounSelection 
        selectedColor={selectedColor}
        onContinue={(pronoun) => {
          setSelectedPronoun(pronoun);
          setCurrentPage('name');
        }}
        onBack={() => setCurrentPage('crystal')}
      />
    );
  }

  if (currentPage === 'crystal') {
    return (
      <CrystalSelection 
        onContinue={(color) => {
          setSelectedColor(color);
          setCurrentPage('pronoun');
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center justify-between px-6 py-8 font-['Quicksand']">
      <Toaster position="top-center" />
      <CloudAnimation />
      
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-md w-full">
        <div className="mb-8">
          <NomiCharacter />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-gray-800 mb-2">Nomi</h1>
          <p className="text-gray-600">Your new memory companion.</p>
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-md space-y-3">
        <Button 
          onClick={() => setCurrentPage('crystal')}
          className="w-full bg-[#5BB77E] hover:bg-[#4DA670] text-white rounded-full h-14 shadow-md transition-all hover:shadow-lg"
        >
          Start your journey
        </Button>
        
        <button className="w-full text-gray-600 hover:text-gray-800 transition-colors py-2">
          Login
        </button>
        
        <p className="text-center text-xs text-gray-500 pt-4 px-4 leading-relaxed">
          By continuing, you agree to our{' '}
          <a href="#" className="text-[#5BB77E] hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#5BB77E] hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
