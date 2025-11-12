import React from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface DayOneWelcomeProps {
  selectedColor: string;
  selectedPronoun: string;
  nomiName: string;
  userName?: string;
  onStartToday: () => void;
}

export function DayOneWelcome({ selectedColor, selectedPronoun, nomiName, userName, onStartToday }: DayOneWelcomeProps) {
  
  const handleStartToday = () => {
    onStartToday();
  };

  const greeting = userName ? `Welcome, ${userName}!` : "Welcome!";

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#8B7BA8] via-[#7BA3B8] to-[#7BB89A] flex flex-col items-center justify-between px-6 py-12">
      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md flex-1 justify-center">
        {/* Day 1 Label */}
        <motion.p
          className="text-white/80 tracking-widest text-sm mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          DAY 1
        </motion.p>

        {/* Nomi Character */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
          <NomiCharacterCustomizable color={selectedColor} />
        </motion.div>

        {/* Greeting */}
        <motion.h1
          className="text-white mb-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {greeting}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-white/90 text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          A question a day builds memories that stay.
        </motion.p>

        {/* Icon */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.7
          }}
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-white/90 text-center px-6 leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Help {nomiName} strengthen your recall today so you can retain what you learn and grow together!
        </motion.p>
      </div>

      {/* Start Button */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={handleStartToday}
          className="w-full bg-white hover:bg-white/90 text-[#7BA3B8] rounded-full h-14 shadow-lg transition-all hover:shadow-xl"
        >
          Start today
        </Button>
      </motion.div>
    </div>
  );
}
