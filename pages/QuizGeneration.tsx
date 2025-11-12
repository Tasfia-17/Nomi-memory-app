import React, { useState, useEffect } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle, Brain, Loader2 } from 'lucide-react';
import { generateQuizFromText, Quiz } from '../utils/gemini';

interface QuizGenerationProps {
  selectedColor: string;
  nomiName: string;
  noteText: string;
  onQuizGenerated: (quiz: Quiz) => void;
  onBack: () => void;
}

type GenerationStage = 'analyzing' | 'extracting' | 'creating' | 'complete' | 'error';

export function QuizGeneration({ selectedColor, nomiName, noteText, onQuizGenerated, onBack }: QuizGenerationProps) {
  const [stage, setStage] = useState<GenerationStage>('analyzing');
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    generateQuiz();
  }, []);

  const generateQuiz = async () => {
    try {
      setStage('analyzing');
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStage('extracting');
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStage('creating');
      const quiz = await generateQuizFromText(noteText, 5);
      
      setGeneratedQuiz(quiz);
      setStage('complete');
    } catch (error) {
      console.error('Quiz generation failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to generate quiz');
      setStage('error');
    }
  };

  const handleContinue = () => {
    if (generatedQuiz) {
      onQuizGenerated(generatedQuiz);
    }
  };

  const stages = [
    { id: 'analyzing', label: 'Analyzing your notes', icon: Brain },
    { id: 'extracting', label: 'Extracting key concepts', icon: Sparkles },
    { id: 'creating', label: 'Creating memory questions', icon: CheckCircle },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#5B6B8A] via-[#5B8A9A] to-[#5B9A8A] flex flex-col items-center justify-center px-6 py-12">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Nomi Character - pulsing */}
        <motion.div
          className="mb-12"
          animate={{
            scale: stage === 'complete' ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: stage === 'complete' ? 3 : 0,
          }}
        >
          <NomiCharacterCustomizable color={selectedColor} />
        </motion.div>

        {/* Status Messages */}
        <AnimatePresence mode="wait">
          {stage !== 'complete' && stage !== 'error' && (
            <motion.div
              key="generating"
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-white mb-4">{nomiName} is creating your quiz...</h1>
              <p className="text-white/70 mb-8">This will only take a moment</p>

              {/* Progress Steps */}
              <div className="space-y-4">
                {stages.map((stageInfo, index) => {
                  const isActive = stageInfo.id === stage;
                  const isComplete = stages.findIndex(s => s.id === stage) > index;
                  const Icon = stageInfo.icon;

                  return (
                    <motion.div
                      key={stageInfo.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${
                        isActive 
                          ? 'bg-white/20 backdrop-blur-md border-2 border-white/30' 
                          : isComplete
                          ? 'bg-white/10 backdrop-blur-sm border-2 border-white/20'
                          : 'bg-white/5 border-2 border-white/10'
                      }`}&#x20;
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isComplete 
                          ? 'bg-green-400/30' 
                          : isActive 
                          ? 'bg-white/30' 
                          : 'bg-white/10'
                      }`}>
                        {isComplete ? (
                          <CheckCircle className="w-5 h-5 text-green-300" />
                        ) : isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Loader2 className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : (
                          <Icon className="w-5 h-5 text-white/40" />
                        )}
                      </div>
                      <span className={`flex-1 text-left ${
                        isActive ? 'text-white' : isComplete ? 'text-white/70' : 'text-white/40'
                      }`}>
                        {stageInfo.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {stage === 'complete' && generatedQuiz && (
            <motion.div
              key="complete"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                className="w-20 h-20 bg-green-400/30 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle className="w-10 h-10 text-green-300" />
              </motion.div>

              <h1 className="text-white mb-3">Your quiz is ready!</h1>
              <p className="text-white/70 mb-8">
                {nomiName} created {generatedQuiz.questions.length} questions to help you remember
              </p>

              <Button
                onClick={handleContinue}
                className="w-full bg-white hover:bg-white/90 text-[#5B8A9A] rounded-full h-14 shadow-lg transition-all hover:shadow-xl"
              >
                Start learning
              </Button>
            </motion.div>
          )}

          {stage === 'error' && (
            <motion.div
              key="error"
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-white mb-3">Oops, something went wrong</h1>
              <p className="text-white/70 mb-8">{errorMessage}</p>

              <div className="flex gap-3">
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="flex-1 border-white/30 text-white hover:bg-white/10 rounded-full h-12"
                >
                  Go back
                </Button>
                <Button
                  onClick={generateQuiz}
                  className="flex-1 bg-white hover:bg-white/90 text-[#5B8A9A] rounded-full h-12"
                >
                  Try again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
