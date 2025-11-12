import React, { useState, useRef } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, Sparkles, ArrowRight, Home } from 'lucide-react';

interface NoteInputProps {
  selectedColor: string;
  nomiName: string;
  onGenerateQuiz: (text: string) => void;
  onBackHome: () => void;
}

export function NoteInput({ selectedColor, nomiName, onGenerateQuiz, onBackHome }: NoteInputProps) {
  const [noteText, setNoteText] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setNoteText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleGenerateQuiz = () => {
    if (noteText.trim()) {
      onGenerateQuiz(noteText.trim());
    }
  };

  const canGenerateQuiz = noteText.trim().length >= 50; // Minimum 50 characters

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#6B5B8A] via-[#5B7A9A] to-[#5B8A7A] flex flex-col px-6 py-8">
      {/* Subtle floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
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
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onBackHome}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Home className="w-5 h-5 text-white" />
            </button>
            <div className="scale-50 origin-left">
              <NomiCharacterCustomizable color={selectedColor} />
            </div>
            <div>
              <h1 className="text-white">Add Your Notes</h1>
              <p className="text-white/70 text-sm">{nomiName} will help you remember</p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <motion.div
          className="flex-1 flex flex-col gap-4 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Text Area */}
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-white/70" />
              <span className="text-white/70 text-sm">
                {fileName || 'Type or paste your notes here...'}
              </span>
            </div>
            
            <textarea
              value={noteText}
              onChange={handleTextChange}
              placeholder="Write or paste anything you want to remember - lecture notes, articles, study material, or any text you'd like to turn into memory questions..."
              className="flex-1 bg-transparent text-white placeholder:text-white/40 resize-none outline-none min-h-[300px]"
            />

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <span className="text-white/50 text-sm">
                {noteText.length} characters
                {noteText.length > 0 && noteText.length < 50 && (
                  <span className="ml-2 text-white/40">
                    (minimum 50 characters)
                  </span>
                )}
              </span>
              {canGenerateQuiz && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-white/70"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Ready to generate!</span>
                </motion.div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <motion.button
            onClick={handleUploadClick}
            className="bg-white/10 backdrop-blur-md hover:bg-white/15 border-2 border-white/20 hover:border-white/30 rounded-2xl p-4 transition-all flex items-center justify-center gap-3 text-white"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Upload className="w-5 h-5" />
            <span>Upload text file (.txt, .md)</span>
          </motion.button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,.text"
            onChange={handleFileUpload}
            className="hidden"
          />
        </motion.div>

        {/* Generate Quiz Button */}
        <AnimatePresence>
          {canGenerateQuiz && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Button
                onClick={handleGenerateQuiz}
                className="w-full bg-white hover:bg-white/90 text-[#5B7A9A] rounded-full h-14 shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Generate Memory Questions</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
