import React, { useEffect, useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { CheckCircle, Circle, Sparkles } from 'lucide-react';

interface StreakCelebrationProps {
  selectedColor: string;
  nomiName: string;
  streakDays: number;
  onContinue: () => void;
}

const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function StreakCelebration({ selectedColor, nomiName, streakDays, onContinue }: StreakCelebrationProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const [playedSound, setPlayedSound] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => setShowAnimation(true), 300);
    
    // Simulate sound effect (visual indicator)
    setTimeout(() => setPlayedSound(true), 600);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#5A5A7A] via-[#5A6A8A] to-[#5A7A8A] flex flex-col items-center justify-center px-6 py-12">
      {/* Sunburst rays background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 origin-left w-1/2 h-1"
            style={{
              transform: `rotate(${(360 / 16) * i}deg)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showAnimation ? [0, 0.1, 0] : 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.05,
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-white/20 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Floating confetti particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'][Math.floor(Math.random() * 5)],
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Sound effect indicator */}
      {playedSound && (
        <motion.div
          className="absolute top-8 right-8 bg-white/20 backdrop-blur-md rounded-full p-3 border border-white/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.8] }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </motion.div>
      )}

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Nomi Character - celebrating with bounce */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, y: 50 }}
          animate={{ 
            scale: showAnimation ? 1 : 0,
            y: showAnimation ? [50, -20, 0] : 50,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <NomiCharacterCustomizable color={selectedColor} />
          </motion.div>
        </motion.div>

        {/* Streak Number */}
        <motion.div
          className="text-center mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: showAnimation ? 1 : 0, opacity: showAnimation ? 1 : 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="text-9xl text-white mb-2"
            animate={{
              scale: playedSound ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {streakDays}
          </motion.div>
          <h1 className="text-white mb-2">DAY STREAK</h1>
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <p className="text-white/80">You're building your memory power!</p>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.div>
        </motion.div>

        {/* Weekly Calendar */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mb-8 w-full"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            {weekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <span className="text-white/70 text-sm">{day}</span>
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 300, damping: 15 }}
                >
                  {index === 0 ? (
                    // Today - completed with checkmark
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  ) : index < 2 ? (
                    // Upcoming days with sparkle
                    <div className="relative w-12 h-12 border-2 border-white/40 rounded-full flex items-center justify-center">
                      <Circle className="w-6 h-6 text-white/40" />
                      <motion.div
                        className="absolute -top-1 -right-1"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </motion.div>
                    </div>
                  ) : (
                    // Future days
                    <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                      <Circle className="w-6 h-6 text-white/30" />
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Encouragement Message */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <p className="text-white/90">
            Great job! Open the app every day to maintain your memory practice streak with {nomiName}!
          </p>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <Button
            onClick={onContinue}
            className="w-full bg-white hover:bg-white/90 text-[#5A6A8A] rounded-full h-14 shadow-lg transition-all hover:shadow-xl"
          >
            Let's go!
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
