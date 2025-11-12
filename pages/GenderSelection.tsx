import React, { useState } from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { NavigationButtons } from '../components/NavigationButtons';

interface GenderSelectionProps {
  selectedColor: string;
  selectedPronoun: string;
  nomiName: string;
  userName?: string;
  onContinue: () => void;
  onSkip: () => void;
  onBack: () => void;
}

const genderOptions = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Non-binary', value: 'non-binary' },
  { label: 'Other', value: 'other' },
];

export function GenderSelection({ selectedColor, selectedPronoun, nomiName, userName, onContinue, onSkip, onBack }: GenderSelectionProps) {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  const handlePreferNotToAnswer = () => {
    onSkip();
  };

  const handleNext = () => {
    if (selectedGender) {
      onContinue();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center px-6 py-8">
      <CloudAnimation />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md flex-1">
        {/* Header */}
        <motion.p
          className="text-gray-400 text-xs tracking-widest mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ABOUT YOU
        </motion.p>

        {/* Small Nomi Character */}
        <motion.div
          className="mb-8 scale-75"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 0.75, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
          <NomiCharacterCustomizable color={selectedColor} />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-gray-800 mb-8 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          What's your gender?
        </motion.h1>

        {/* Gender Options */}
        <div className="w-full space-y-3 mb-4">
          {genderOptions.map((option, index) => {
            const isSelected = selectedGender === option.value;
            
            return (
              <motion.button
                key={option.value}
                onClick={() => handleGenderSelect(option.value)}
                className={`
                  w-full h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isSelected 
                    ? 'bg-white border-2 border-[#5BB77E] shadow-md' 
                    : 'bg-white/60 border-2 border-gray-200 hover:border-gray-300 hover:bg-white/80'
                  }
                `}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`
                  transition-colors duration-300
                  ${isSelected ? 'text-gray-800' : 'text-gray-600'}
                `}>
                  {option.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Prefer not to answer */}
        <motion.button
          onClick={handlePreferNotToAnswer}
          className="text-gray-400 hover:text-gray-600 transition-colors py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Prefer not to answer
        </motion.button>

        {/* Navigation */}
        <NavigationButtons 
          onBack={onBack}
          onNext={() => selectedGender ? onContinue() : onSkip()}
          nextLabel={selectedGender ? "Next" : "Skip"}
        />
      </div>
    </div>
  );
}
