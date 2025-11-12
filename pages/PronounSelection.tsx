import React, { useState } from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { Heart, Check } from 'lucide-react';
import { NavigationButtons } from '../components/NavigationButtons';

interface PronounSelectionProps {
  selectedColor: string;
  onContinue: (pronoun: string) => void;
  onBack: () => void;
}

const pronounOptions = [
  { label: 'he/him', value: 'he' },
  { label: 'she/her', value: 'she' },
  { label: 'they/them', value: 'they' },
];

export function PronounSelection({ selectedColor, onContinue, onBack }: PronounSelectionProps) {
  const [selectedPronoun, setSelectedPronoun] = useState<string | null>(null);

  const handlePronounSelect = (value: string) => {
    setSelectedPronoun(value);
  };

  const handleContinue = () => {
    if (selectedPronoun) {
      onContinue(selectedPronoun);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center px-6 py-8">
      <CloudAnimation />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md flex-1">
        {/* Nomi Character */}
        <div className="mt-8 mb-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1 
            }}
          >
            <NomiCharacterCustomizable color={selectedColor} />
          </motion.div>
        </div>
        
        {/* Title and Subtitle */}
        <motion.div 
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-gray-800 mb-2">Nomi has awakened!</h1>
          <p className="text-gray-600">Nomi's pronouns</p>
        </motion.div>
        
        {/* Pronoun Options */}
        <div className="w-full space-y-3 mb-auto">
          {pronounOptions.map((option, index) => {
            const isSelected = selectedPronoun === option.value;
            
            return (
              <motion.button
                key={option.value}
                onClick={() => handlePronounSelect(option.value)}
                className={`
                  w-full h-14 rounded-full flex items-center px-6 transition-all duration-300
                  ${isSelected 
                    ? 'bg-white border-2 border-[#5BB77E] shadow-md' 
                    : 'bg-white/60 border-2 border-gray-200 hover:border-gray-300'
                  }
                `}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Heart Icon */}
                <div className={`
                  mr-4 transition-all duration-300
                  ${isSelected ? 'text-[#FFB5D5]' : 'text-gray-300'}
                `}>
                  <Heart 
                    className={`w-6 h-6 ${isSelected ? 'fill-current' : ''}`}
                    strokeWidth={2}
                  />
                </div>
                
                {/* Label */}
                <span className={`
                  flex-1 text-left transition-colors duration-300
                  ${isSelected ? 'text-gray-800' : 'text-gray-500'}
                `}>
                  {option.label}
                </span>
                
                {/* Checkmark */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }}
                    className="w-6 h-6 rounded-full bg-[#5BB77E] flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
        
        {/* Navigation */}
        <NavigationButtons 
          onBack={onBack}
          onNext={() => onContinue(selectedPronoun)}
          nextDisabled={!selectedPronoun}
        />
      </div>
    </div>
  );
}
