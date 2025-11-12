import React from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { NavigationButtons } from '../components/NavigationButtons';

interface LearnAboutYouProps {
  selectedColor: string;
  selectedPronoun: string;
  nomiName: string;
  userName?: string;
  onContinue: () => void;
  onBack: () => void;
}

export function LearnAboutYou({ selectedColor, selectedPronoun, nomiName, userName, onContinue, onBack }: LearnAboutYouProps) {
  
  const getSubject = () => {
    if (selectedPronoun === 'he') return 'he';
    if (selectedPronoun === 'she') return 'she';
    return 'they';
  };

  const getVerb = () => {
    return selectedPronoun === 'they' ? 'are' : 'is';
  };

  const handleNext = () => {
    onContinue();
  };

  const greeting = userName ? `Let's learn a bit about you, ${userName}!` : "Let's learn a bit about you!";
  const subtitle = `${nomiName} ${getVerb()} curious about how ${getSubject()} can grow with you.`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center justify-between px-6 py-8">
      <CloudAnimation />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md flex-1 justify-center">
        {/* Nomi Character */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0, y: -50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
        >
          <NomiCharacterCustomizable color={selectedColor} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-gray-800 mb-3 text-center px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 text-center px-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Navigation */}
      <motion.div 
        className="relative z-10 w-full max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <NavigationButtons 
          onBack={onBack}
          onNext={onContinue}
        />
      </motion.div>
    </div>
  );
}
