import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, Circle, Brain, Sparkles, TrendingUp, Edit3, Home } from 'lucide-react';

interface MemoryInsightsProps {
  selectedColor: string;
  nomiName: string;
  onAddReflection: () => void;
  onReviewQuiz: (quizId: string) => void;
  onBackHome: () => void;
}

interface PracticeDay {
  date: Date;
  completed: boolean;
  score?: number;
  quizId?: string;
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function MemoryInsights({ selectedColor, nomiName, onAddReflection, onReviewQuiz, onBackHome }: MemoryInsightsProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());
  
  // Mock data - in real app, this would come from state/database
  const practiceDays: PracticeDay[] = [
    { date: new Date(2025, 10, 10), completed: true, score: 100, quizId: 'quiz1' },
    { date: new Date(2025, 10, 11), completed: true, score: 80, quizId: 'quiz2' },
    { date: new Date(2025, 10, 12), completed: false },
  ];

  const quizStats = {
    totalCompleted: 5,
    averageScore: 84,
    perfectScores: 2,
    needsReview: 1,
  };

  const recentQuizzes = [
    { id: 'quiz1', topic: 'Machine Learning Basics', score: 100, date: 'Nov 10', needsReview: false },
    { id: 'quiz2', topic: 'React Hooks', score: 80, date: 'Nov 11', needsReview: false },
    { id: 'quiz3', topic: 'Data Structures', score: 60, date: 'Nov 9', needsReview: true },
  ];

  const getDayStatus = (day: number) => {
    const dayDate = new Date(currentYear, currentMonth, day);
    const practice = practiceDays.find(p => 
      p.date.getDate() === day && 
      p.date.getMonth() === currentMonth
    );
    
    if (!practice) return 'empty';
    if (practice.completed && practice.score) {
      if (practice.score >= 80) return 'excellent';
      if (practice.score >= 60) return 'good';
      return 'needs-review';
    }
    return 'missed';
  };

  const getDayColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-400';
      case 'good': return 'bg-blue-400';
      case 'needs-review': return 'bg-yellow-400';
      case 'missed': return 'bg-red-400';
      default: return 'bg-white/10';
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert to Monday-based
  };

  const handlePrevMonth = () => {
    setCurrentMonth(prev => prev === 0 ? 11 : prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => prev === 11 ? 0 : prev + 1);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#6B7B8A] via-[#7B8A8A] to-[#8A9A7A] flex flex-col px-6 py-8">
      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onBackHome}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Home className="w-5 h-5 text-white" />
            </button>
            <div className="scale-50 origin-left">
              <NomiCharacterCustomizable color={selectedColor} />
            </div>
            <div>
              <h1 className="text-white">Memory Insights</h1>
              <p className="text-white/70 text-sm">Track your learning journey</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border-2 border-white/25">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm">Quizzes</span>
            </div>
            <p className="text-3xl text-white">{quizStats.totalCompleted}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border-2 border-white/25">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm">Avg Score</span>
            </div>
            <p className="text-3xl text-white">{quizStats.averageScore}%</p>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border-2 border-white/20 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h3 className="text-white">{monthNames[currentMonth]} '{String(currentYear).slice(2)}</h3>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Day names */}
          <div className="grid grid-cols-7 gap-2 mb-3">
            {dayNames.map((day, index) => (
              <div key={`day-${index}`} className="text-center text-white/50 text-xs py-1">
                {day}
              </div>
            ))}&#x20;
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: getFirstDayOfMonth(currentMonth, currentYear) }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}&#x20;
            
            {/* Days of month */}
            {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }).map((_, i) => {
              const day = i + 1;
              const status = getDayStatus(day);
              const isToday = day === new Date().getDate() && currentMonth === new Date().getMonth();

              return (
                <motion.div
                  key={day}
                  className="aspect-square"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <div className={`w-full h-full rounded-lg flex items-center justify-center relative ${
                    isToday ? 'ring-2 ring-white' : ''
                  }`}>
                    <div className={`absolute inset-1 rounded-lg ${getDayColor(status)}`} />
                    <span className="relative z-10 text-white text-sm">{day}</span>
                  </div>
                </motion.div>
              );
            })}&#x20;
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-white/70 text-xs">Excellent (80%+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400" />
              <span className="text-white/70 text-xs">Good (60-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="text-white/70 text-xs">Needs Review</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-white/70 text-xs">Missed</span>
            </div>
          </div>
        </motion.div>

        {/* Recent Quizzes */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border-2 border-white/20 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white">Recent Practice</h3>
            <span className="text-white/60 text-sm">{quizStats.needsReview} needs review</span>
          </div>

          <div className="space-y-3">
            {recentQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className={`p-4 rounded-2xl border-2 ${
                  quiz.needsReview 
                    ? 'bg-yellow-400/10 border-yellow-400/30' 
                    : 'bg-white/5 border-white/15'
                }`}&#x20;
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">{quiz.topic}</span>
                  <span className={`text-sm ${
                    quiz.score >= 80 ? 'text-green-300' : 
                    quiz.score >= 60 ? 'text-blue-300' : 
                    'text-yellow-300'
                  }`}>
                    {quiz.score}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-xs">{quiz.date}</span>
                  {quiz.needsReview && (
                    <button
                      onClick={() => onReviewQuiz(quiz.id)}
                      className="text-yellow-300 text-xs hover:text-yellow-200 transition-colors"
                    >
                      Review →
                    </button>
                  )}
                </div>
              </motion.div>
            ))}&#x20;
          </div>
        </motion.div>

        {/* Reflections Section */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-5 border-2 border-white/20 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white">Reflections</h3>
              <p className="text-white/60 text-sm">0 this week</p>
            </div>
            <Sparkles className="w-5 h-5 text-white/70" />
          </div>

          <p className="text-white/70 text-sm mb-4 text-center py-6">
            No reflections yet. Add your thoughts to track your learning journey!
          </p>

          <Button
            onClick={onAddReflection}
            className="w-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full h-12 flex items-center justify-center gap-2"
          >
            <Edit3 className="w-4 h-4" />
            Add a reflection
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
