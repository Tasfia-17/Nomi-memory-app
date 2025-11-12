import React, { useState } from 'react';
import { CloudAnimation } from '../components/CloudAnimation';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';

interface Crystal {
  id: string;
  color: string;
  label: string;
  angle: number;
}

const crystals: Crystal[] = [
  { id: 'purple', color: '#B8A5E8', label: 'Mystic', angle: -90 },
  { id: 'blue', color: '#A5C8E8', label: 'Calm', angle: -30 },
  { id: 'green', color: '#A5E8B5', label: 'Peaceful', angle: 30 },
  { id: 'orange', color: '#FFB488', label: 'Energetic', angle: 90 },
  { id: 'pink', color: '#FFB5D5', label: 'Playful', angle: 150 },
  { id: 'gray', color: '#C5C5D5', label: 'Wise', angle: 210 },
];

interface CrystalSelectionProps {
  onContinue: (color: string) => void;
}

export function CrystalSelection({ onContinue }: CrystalSelectionProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [lookAtPosition, setLookAtPosition] = useState<{ x: number; y: number } | null>(null);

  const handleCrystalClick = (crystal: Crystal, angle: number) => {
    setSelectedColor(crystal.id);
    
    // Convert angle to position for Nomi to look at
    const radius = 200; // Same as crystal positioning
    const angleRad = (angle * Math.PI) / 180;
    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;
    
    setLookAtPosition({ x, y });
    
    // Play cute sound effect
    playSelectSound();
  };

  const playSelectSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const handleContinue = () => {
    if (selectedColor) {
      onContinue(selectedColor);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8D5F2] via-[#D5E8F7] to-[#E5F2E8] flex flex-col items-center px-6 py-8">
      <CloudAnimation />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl flex-1">
        {/* Header */}
        <div className="text-center mb-6 mt-4">
          <h1 className="text-gray-800 mb-3">Choose your Memory Crystal</h1>
          <p className="text-gray-600 px-4 leading-relaxed">
            Each crystal holds a unique energy. Choose one that resonates with your learning journey.
          </p>
        </div>
        
        {/* Main Interactive Area */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          <div className="relative w-[500px] h-[500px]">
            {/* Nomi in center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <NomiCharacterCustomizable 
                color={selectedColor || 'purple'} 
                lookAt={lookAtPosition}
              />
            </div>
            
            {/* Crystals in circle */}
            {crystals.map((crystal) => {
              const isSelected = selectedColor === crystal.id;
              const radius = 200;
              const angleRad = (crystal.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              
              return (
                <div
                  key={crystal.id}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <motion.button
                    onClick={() => handleCrystalClick(crystal, crystal.angle)}
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: isSelected ? 1.15 : 1,
                      y: isSelected ? -8 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glow effect */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 -m-4 rounded-full blur-xl"
                        style={{ backgroundColor: crystal.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Crystal SVG */}
                    <svg
                      width="70"
                      height="80"
                      viewBox="0 0 70 80"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative"
                    >
                      <defs>
                        <linearGradient id={`gradient-${crystal.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={crystal.color} stopOpacity="1" />
                          <stop offset="100%" stopColor={crystal.color} stopOpacity="0.6" />
                        </linearGradient>
                        <filter id={`glow-${crystal.id}`}>
                          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Main crystal body */}
                      <path
                        d="M 35 5 L 52 22 L 48 60 L 35 73 L 22 60 L 18 22 Z"
                        fill={`url(#gradient-${crystal.id})`}
                        filter={isSelected ? `url(#glow-${crystal.id})` : undefined}
                        stroke="#FFFFFF"
                        strokeWidth="0.5"
                        strokeOpacity="0.3"
                      />
                      
                      {/* Crystal facets */}
                      <path d="M 35 5 L 35 73" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                      <path d="M 18 22 L 52 22" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                      <path d="M 22 60 L 48 60" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />
                      <path d="M 18 22 L 35 40 L 52 22" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" />
                      
                      {/* Highlight */}
                      <ellipse cx="30" cy="25" rx="7" ry="12" fill="#FFFFFF" opacity="0.5" />
                      
                      {/* Inner glow */}
                      <path
                        d="M 30 18 L 40 18 L 42 52 L 35 65 L 28 52 Z"
                        fill="#FFFFFF"
                        opacity="0.2"
                      />
                      
                      {/* Sparkle on top when selected */}
                      {isSelected && (
                        <motion.g
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.2, repeat: Infinity }}
                        >
                          <path
                            d="M 35 0 L 36 3 L 39 4 L 36 5 L 35 8 L 34 5 L 31 4 L 34 3 Z"
                            fill="#FFFFFF"
                          />
                        </motion.g>
                      )}
                    </svg>
                    
                    {/* Label */}
                    <p className="text-xs text-gray-700 text-center mt-1 font-medium">
                      {crystal.label}
                    </p>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Continue Button */}
        <div className="w-full max-w-md mt-6">
          <Button
            disabled={!selectedColor}
            onClick={handleContinue}
            className="w-full bg-[#5BB77E] hover:bg-[#4DA670] text-white rounded-full h-14 shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedColor ? 'Continue with crystal' : 'Choose a crystal'}
          </Button>
        </div>
      </div>
    </div>
  );
}
