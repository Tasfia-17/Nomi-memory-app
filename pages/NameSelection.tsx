import React, { useState, useEffect } from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shuffle } from 'lucide-react';
import { NavigationButtons } from '../components/NavigationButtons';

interface NameSelectionProps {
  selectedColor: string;
  selectedPronoun: string;
  onContinue: (name: string) => void;
  onBack: () => void;
}

const predefinedNames = ['Nomi', 'Kiwi', 'Luna', 'Zephyr', 'Sage', 'Aurora'];

export function NameSelection({ selectedColor, selectedPronoun, onContinue, onBack }: NameSelectionProps) {
  const [name, setName] = useState<string>('');
  const [isShuffling, setIsShuffling] = useState(false);

  // Generate initial random name
  useEffect(() => {
    shuffleName();
  }, []);

  const shuffleName = () => {
    setIsShuffling(true);
    const randomName = predefinedNames[Math.floor(Math.random() * predefinedNames.length)];
    
    // Add slight delay for animation
    setTimeout(() => {
      setName(randomName);
      setIsShuffling(false);
    }, 200);
  };

  const clearName = () => {
    setName('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleContinue = () => {
    if (name.trim()) {
      onContinue(name.trim());
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center px-6 py-8">
      <CloudAnimation />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md flex-1">
        {/* Nomi Character */}
        <div className="mt-12 mb-8">
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
          className="text-center mb-8 px-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-gray-800 mb-2">What do you want to name your Nomi?</h1>
          <p className="text-gray-500 text-sm">You can change this later.</p>
        </motion.div>
        
        {/* Name Input Field */}
        <motion.div 
          className="w-full mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={handleInputChange}
              placeholder="Enter a name..."
              maxLength={20}
              className="w-full h-14 px-5 pr-12 bg-white border-2 border-gray-200 rounded-full text-center text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#5BB77E] transition-colors"
            />
            
            {/* Clear Button */}
            <AnimatePresence>
              {name && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={clearName}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Shuffle Button */}
        <motion.button
          onClick={shuffleName}
          className="mb-auto flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white/80 rounded-full transition-colors text-gray-600 hover:text-gray-800"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileTap={{ scale: 0.95 }}
        >
          <Shuffle className="w-4 h-4" />
          <span className="text-sm">Shuffle name</span>
        </motion.button>
        
        {/* Navigation */}
        <NavigationButtons 
          onBack={onBack}
          onNext={() => onContinue(name)}
          nextDisabled={!name}
        />
      </div>
    </div>
  );
}
