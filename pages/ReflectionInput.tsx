import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

interface ReflectionInputProps {
  selectedColor: string;
  nomiName: string;
  onSave: (reflection: string) => void;
  onCancel: () => void;
}

export function ReflectionInput({ selectedColor, nomiName, onSave, onCancel }: ReflectionInputProps) {
  const [reflection, setReflection] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setReflection(text);
    setCharCount(text.length);
  };

  const handleSave = () => {
    if (reflection.trim()) {
      onSave(reflection.trim());
    }
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  }).toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#7B6B8A] via-[#7B7A9A] to-[#8A7A9A] flex flex-col px-6 py-8">
      {/* Gentle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-2xl mx-auto flex-1">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center gap-3">
            <div className="scale-50 origin-left">
              <NomiCharacterCustomizable color={selectedColor} />
            </div>
            <div>
              <p className="text-white/70 text-sm">{dateString}</p>
              <h1 className="text-white">Reflections</h1>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </motion.div>

        {/* Nomi encouragement */}
        <motion.div
          className="bg-white/90 backdrop-blur-md rounded-3xl rounded-tl-sm p-5 mb-6 shadow-lg"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-800">
            Take a moment to reflect on your learning journey today. What did you discover? How do you feel? ✨
          </p>
        </motion.div>

        {/* Text Area */}
        <motion.div
          className="flex-1 bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mb-6 flex flex-col"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <textarea
            value={reflection}
            onChange={handleChange}
            placeholder="Write your thoughts here... How did today's practice go? What patterns are you noticing in your learning?"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 resize-none outline-none min-h-[300px]"
            autoFocus
          />

          {/* Character count */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white/70 text-sm">
                {charCount > 0 ? `${charCount} characters` : 'Start writing...'}
              </span>
            </div>
            {charCount > 0 && (
              <motion.div
                className="flex items-center gap-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <span className="text-white/70 text-sm">Looking good!</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-white/30 text-white hover:bg-white/10 rounded-full h-14"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!reflection.trim()}
            className="flex-1 bg-white hover:bg-white/90 text-[#7B7A9A] rounded-full h-14 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Done
          </Button>
        </motion.div>

        {/* Tips */}
        <motion.div
          className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white/60 text-sm">
            💡 <span className="text-white/80">Reflection tip:</span> Try noting which questions you found easy, which were challenging, and what you'd like to review tomorrow.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
