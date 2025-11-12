import React, { useState } from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { motion } from 'motion/react';
import { NavigationButtons } from '../components/NavigationButtons';

interface UserNameInputProps {
  selectedColor: string;
  selectedPronoun: string;
  nomiName: string;
  onContinue: (userName: string) => void;
  onSkip: () => void;
  onBack: () => void;
}

export function UserNameInput({ selectedColor, selectedPronoun, nomiName, onContinue, onSkip, onBack }: UserNameInputProps) {
  const [userName, setUserName] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSkip = () => {
    onSkip();
  };

  const handleNext = () => {
    if (userName.trim()) {
      onContinue(userName.trim());
    }
  };

  // Get the possessive form based on pronoun
  const getPossessive = () => {
    if (selectedPronoun === 'he') return 'his';
    if (selectedPronoun === 'she') return 'her';
    return 'their';
  };

  const getSubject = () => {
    if (selectedPronoun === 'he') return 'he';
    if (selectedPronoun === 'she') return 'she';
    return 'they';
  };

  const greetingMessage = `Hello! Thanks for choosing me as your memory companion. My name is ${nomiName}, what's your name?`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center px-6 py-6">
      <CloudAnimation />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-md flex-1">
        {/* Skip Button */}
        <motion.div 
          className="self-end mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors px-4 py-2"
          >
            Skip
          </button>
        </motion.div>

        {/* Speech Bubble */}
        <motion.div
          className="w-full bg-gray-100 rounded-3xl p-5 mb-8 relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3
          }}
        >
          <p className="text-gray-700 text-sm leading-relaxed">
            {greetingMessage}
          </p>
          
          {/* Speech bubble tail */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-gray-100 rotate-45 rounded-sm"/>
        </motion.div>

        {/* Nomi Character - Waving */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.5
          }}
        >
          <NomiCharacterCustomizable color={selectedColor} />
        </motion.div>

        {/* Input Field */}
        <motion.div 
          className="w-full mb-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Input
            type="text"
            value={userName}
            onChange={handleInputChange}
            placeholder={`Name for ${nomiName}'s human...`}
            maxLength={30}
            className="w-full h-14 px-5 bg-gray-100 border-2 border-transparent rounded-full text-center text-gray-700 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#5BB77E] transition-all"
          />
        </motion.div>

        {/* Navigation */}
        <NavigationButtons 
          onBack={onBack}
          onNext={() => userName.trim() ? onContinue(userName) : onSkip()}
          nextLabel={userName.trim() ? "Next" : "Skip"}
        />
      </div>
    </div>
  );
}
