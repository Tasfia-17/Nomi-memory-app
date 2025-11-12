import React from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { Trophy, Star, Target, TrendingUp, Home } from 'lucide-react';
import { QuizResults as QuizResultsType } from './QuizPractice';

interface QuizResultsProps {
  selectedColor: string;
  nomiName: string;
  results: QuizResultsType;
  onReturnHome: () => void;
  onPracticeAgain: () => void;
  onViewSummary: () => void;
}

export function QuizResults({ selectedColor, nomiName, results, onReturnHome, onPracticeAgain, onViewSummary }: QuizResultsProps) {
  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  
  const getEncouragementMessage = () => {
    if (percentage === 100) return "Perfect score! You're a memory master! 🌟";
    if (percentage >= 80) return "Excellent work! Your memory is getting stronger! 💪";
    if (percentage >= 60) return "Good job! Keep practicing and you'll master this! ✨";
    if (percentage >= 40) return "Nice effort! Practice makes perfect! 🌱";
    return "Great start! Every practice session makes you stronger! 🌿";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-300';
    if (percentage >= 60) return 'text-blue-300';
    if (percentage >= 40) return 'text-yellow-300';
    return 'text-orange-300';
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#6B5B9A] via-[#5B7A8A] to-[#5B8A7A] flex flex-col items-center justify-center px-6 py-12">
      {/* Celebration particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.3, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Nomi Character - celebrating */}
        <motion.div
          className="mb-8"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <NomiCharacterCustomizable color={selectedColor} />
        </motion.div>

        {/* Results Card */}
        <motion.div
          className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/20 mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Trophy Icon */}
          <motion.div
            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 10 }}
          >
            <Trophy className="w-10 h-10 text-yellow-300" />
          </motion.div>

          {/* Title */}
          <h1 className="text-white text-center mb-2">Practice Complete!</h1>
          <p className="text-white/70 text-center mb-6">{nomiName} is proud of you!</p>

          {/* Score Circle */}
          <motion.div
            className="relative w-40 h-40 mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
          >
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
                fill="none"
              />
              {/* Progress circle */}
              <motion.circle
                cx="80"
                cy="80"
                r="70"
                stroke="white"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}&#x20;
                initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - percentage / 100) }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  className={`text-4xl ${getScoreColor()}`}&#x20;
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {percentage}%
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Encouragement Message */}
          <motion.p
            className="text-white/90 text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            {getEncouragementMessage()}
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
              <Target className="w-6 h-6 text-white/70 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">{results.totalQuestions}</div>
              <div className="text-xs text-white/60">Total</div>
            </div>
            <div className="bg-green-400/20 rounded-2xl p-4 text-center border border-green-400/30">
              <Star className="w-6 h-6 text-green-300 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">{results.correctAnswers}</div>
              <div className="text-xs text-white/60">Correct</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 text-center border border-white/20">
              <TrendingUp className="w-6 h-6 text-white/70 mx-auto mb-2" />
              <div className="text-2xl text-white mb-1">{percentage}%</div>
              <div className="text-xs text-white/60">Score</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
        >
          <Button
            onClick={onPracticeAgain}
            className="w-full bg-white hover:bg-white/90 text-[#5B7A8A] rounded-full h-14 shadow-lg"
          >
            Practice Again
          </Button>
          <Button
            onClick={onReturnHome}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 rounded-full h-14 flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Return Home
          </Button>
          <Button
            onClick={onViewSummary}
            variant="outline"
            className="w-full border-white/30 text-white hover:bg-white/10 rounded-full h-14"
          >
            View Detailed Summary
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
