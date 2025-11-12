import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, Target, Zap, Crown, Star, Calendar } from 'lucide-react';

interface PracticeGoalProps {
  selectedColor: string;
  nomiName: string;
  onContinue: (days: number) => void;
}

interface GoalOption {
  days: number;
  icon: React.ElementType;
  label: string;
  description: string;
  color: string;
}

const goalOptions: GoalOption[] = [
  {
    days: 3,
    icon: Sparkles,
    label: '3 days',
    description: 'Gentle start',
    color: 'from-blue-400/30 to-blue-500/30',
  },
  {
    days: 7,
    icon: Target,
    label: '7 days',
    description: 'Weekly rhythm',
    color: 'from-green-400/30 to-green-500/30',
  },
  {
    days: 14,
    icon: Flame,
    label: '14 days',
    description: 'Building momentum',
    color: 'from-orange-400/30 to-orange-500/30',
  },
  {
    days: 21,
    icon: Zap,
    label: '21 days',
    description: 'Habit formation',
    color: 'from-purple-400/30 to-purple-500/30',
  },
  {
    days: 30,
    icon: Crown,
    label: '30 days',
    description: 'Monthly mastery',
    color: 'from-yellow-400/30 to-yellow-500/30',
  },
  {
    days: 60,
    icon: Star,
    label: '60 days',
    description: 'Memory champion',
    color: 'from-pink-400/30 to-pink-500/30',
  },
  {
    days: 90,
    icon: Calendar,
    label: '90 days',
    description: 'Unstoppable streak',
    color: 'from-indigo-400/30 to-indigo-500/30',
  },
];

export function PracticeGoal({ selectedColor, nomiName, onContinue }: PracticeGoalProps) {
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);
  const [showEncouragement, setShowEncouragement] = useState(false);

  const handleSelectGoal = (days: number) => {
    setSelectedGoal(days);
    setShowEncouragement(true);
    setTimeout(() => setShowEncouragement(false), 3000);
  };

  const handleContinue = () => {
    if (selectedGoal !== null) {
      onContinue(selectedGoal);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#4A5A6A] via-[#5A6A6A] to-[#5A7A6A] flex flex-col px-6 py-8">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-2xl mx-auto flex-1">
        {/* Header with Nomi and Speech Bubble */}
        <motion.div
          className="flex items-start gap-4 mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.div
            className="scale-75 flex-shrink-0"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <NomiCharacterCustomizable color={selectedColor} />
          </motion.div>
          
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {!showEncouragement ? (
                <motion.div
                  key="question"
                  className="bg-white/90 backdrop-blur-md rounded-3xl rounded-tl-sm p-5 shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <p className="text-gray-800">
                    How many days in a row will you practice with me?
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="encouragement"
                  className="bg-white/90 backdrop-blur-md rounded-3xl rounded-tl-sm p-5 shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <p className="text-gray-800">
                    You got this! I believe in you! ✨
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-white mb-2">Choose Your Practice Goal</h2>
          <p className="text-white/70 text-sm">Start with what feels right - you can always adjust!</p>
        </motion.div>

        {/* Goal Options */}
        <div className="space-y-3 mb-6 flex-1">
          {goalOptions.map((option, index) => {
            const Icon = option.icon;
            const isSelected = selectedGoal === option.days;

            return (
              <motion.button
                key={option.days}
                onClick={() => handleSelectGoal(option.days)}
                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-white/25 border-white/50 backdrop-blur-md shadow-lg'
                    : 'bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 hover:border-white/30'
                }`}&#x20;
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex items-center gap-4`}>
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-white">{option.label}</p>
                    <p className="text-white/60 text-sm">{option.description}</p>
                  </div>
                </div>
                
                {isSelected && (
                  <motion.div
                    className="w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <div className="w-3 h-3 bg-[#5A6A6A] rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Continue Button */}
        <AnimatePresence>
          {selectedGoal !== null && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Button
                onClick={handleContinue}
                className="w-full bg-white hover:bg-white/90 text-[#5A6A6A] rounded-full h-14 shadow-lg transition-all hover:shadow-xl"
              >
                Commit to this goal
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
