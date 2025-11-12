import React from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, Lightbulb } from 'lucide-react';
import { Quiz } from '../utils/gemini';
import { QuizResults as QuizResultsType } from './QuizPractice';

interface QuizSummaryProps {
  selectedColor: string;
  nomiName: string;
  quiz: Quiz;
  results: QuizResultsType;
  onContinue: () => void;
}

export function QuizSummary({ selectedColor, nomiName, quiz, results, onContinue }: QuizSummaryProps) {
  const percentage = Math.round((results.correctAnswers / results.totalQuestions) * 100);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#5B6B7A] via-[#5B7A7A] to-[#5B8A6A] flex flex-col px-6 py-8">
      {/* Subtle background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/30">
            <div className="scale-75">
              <NomiCharacterCustomizable color={selectedColor} />
            </div>
          </div>
          <h1 className="text-white mb-2">Memory Practice Summary</h1>
          <p className="text-white/70">Review what you learned with {nomiName}</p>
        </motion.div>

        {/* Score Banner */}
        <motion.div
          className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-6 border-2 border-white/25 flex items-center justify-between"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              percentage >= 80 ? 'bg-green-400/30' : percentage >= 60 ? 'bg-blue-400/30' : 'bg-yellow-400/30'
            }`}>
              <span className="text-2xl text-white">{percentage}%</span>
            </div>
            <div>
              <p className="text-white text-sm">{results.correctAnswers} out of {results.totalQuestions} correct</p>
              <p className="text-white/60 text-xs">
                {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good progress!' : 'Keep practicing!'}&#x20;
              </p>
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-4 mb-6 flex-1">
          {quiz.questions.map((question, index) => {
            const userAnswer = results.answers[index];
            const isCorrect = userAnswer.isCorrect;

            return (
              <motion.div
                key={question.id}
                className={`bg-white/10 backdrop-blur-md rounded-3xl p-5 border-2 ${
                  isCorrect ? 'border-green-400/40' : 'border-red-400/40'
                }`}&#x20;
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCorrect ? 'bg-green-400/30' : 'bg-red-400/30'
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-300" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 mb-3">
                      <span className="text-white/60 text-sm">Q{index + 1}:</span> {question.question}
                    </p>

                    {/* User's Answer */}
                    <div className="mb-3">
                      <p className="text-white/60 text-xs mb-1">Your answer:</p>
                      <div className={`p-3 rounded-xl ${
                        isCorrect ? 'bg-green-400/20' : 'bg-red-400/20'
                      }`}>
                        <p className="text-white text-sm">
                          {question.options[userAnswer.selectedAnswer]}
                        </p>
                      </div>
                    </div>

                    {/* Correct Answer (if wrong) */}
                    {!isCorrect && (
                      <div className="mb-3">
                        <p className="text-white/60 text-xs mb-1">Correct answer:</p>
                        <div className="p-3 rounded-xl bg-green-400/20">
                          <p className="text-white text-sm">
                            {question.options[question.correctAnswer]}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {question.explanation && (
                      <div className="mt-3 pt-3 border-t border-white/20">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                          <p className="text-white/70 text-sm">{question.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Continue Button */}
        <motion.div
          className="sticky bottom-0 pb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onContinue}
            className="w-full bg-white hover:bg-white/90 text-[#5B7A7A] rounded-full h-14 shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>Done</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
