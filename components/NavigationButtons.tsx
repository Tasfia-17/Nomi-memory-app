import React from 'react';
import { motion } from 'motion/react';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
  showNext?: boolean;
}

export function NavigationButtons({ 
  onBack, 
  onNext, 
  nextLabel = "Next",
  backLabel = "Back",
  nextDisabled = false,
  showBack = true,
  showNext = true
}: NavigationButtonsProps) {
  return (
    <motion.div
      className="flex justify-between items-center w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {showBack ? (
        <button
          onClick={onBack}
          className="text-white hover:text-white text-base font-semibold transition-all px-6 py-3 hover:scale-105"
        >
          {backLabel}
        </button>
      ) : (
        <div />
      )}
      
      {showNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="text-white hover:text-white/95 text-base font-semibold transition-all px-6 py-3 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
        >
          {nextLabel}
        </button>
      )}
    </motion.div>
  );
}
