import React, { useState } from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { NavigationButtons } from '../components/NavigationButtons';

interface AgeSelectionProps {
  selectedColor: string;
  selectedPronoun: string;
  nomiName: string;
  userName?: string;
  onContinue: () => void;
  onBack: () => void;
}

const ageRanges = [
  { label: '13-17', value: '13-17' },
  { label: '18-24', value: '18-24' },
  { label: '25-34', value: '25-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55+', value: '55+' },
];

export function AgeSelection({ selectedColor, selectedPronoun, nomiName, userName, onContinue, onBack }: AgeSelectionProps) {
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleAgeSelect = (age: string) => {
    setSelectedAge(age);
  };

  const handleNext = () => {
    if (selectedAge) {
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
          className="text-gray-800 mb-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          How old are you?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-500 text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          This helps us personalize your experience
        </motion.p>

        {/* Age Range Options */}
        <div className="w-full space-y-3 mb-6">
          {ageRanges.map((age, index) => {
            const isSelected = selectedAge === age.value;
            
            return (
              <motion.button
                key={age.value}
                onClick={() => handleAgeSelect(age.value)}
                className={`
                  w-full h-14 rounded-2xl flex items-center justify-center transition-all duration-300
                  ${isSelected 
                    ? 'bg-white border-2 border-[#5BB77E] shadow-md' 
                    : 'bg-white/60 border-2 border-gray-200 hover:border-gray-300 hover:bg-white/80'
                  }
                `}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`
                  transition-colors duration-300
                  ${isSelected ? 'text-gray-800' : 'text-gray-600'}
                `}>
                  {age.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Navigation */}
        <NavigationButtons 
          onBack={onBack}
          onNext={onContinue}
          nextDisabled={!selectedAge}
        />
      </div>
    </div>
  );
}
