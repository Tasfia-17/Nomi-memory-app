import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Sparkles, Brain } from 'lucide-react';
import { Quiz, QuizQuestion } from '../utils/gemini';

interface QuizPracticeProps {
  selectedColor: string;
  nomiName: string;
  quiz: Quiz;
  onComplete: (results: QuizResults) => void;
}

export interface QuizResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  answers: UserAnswer[];
}

interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export function QuizPractice({ selectedColor, nomiName, quiz, onComplete }: QuizPracticeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleOptionSelect = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    setUserAnswers([...userAnswers, {
      questionId: currentQuestion.id,
      selectedAnswer: selectedOption,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    }]);

    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Complete the quiz
      const results: QuizResults = {
        totalQuestions: quiz.questions.length,
        correctAnswers: userAnswers.filter(a => a.isCorrect).length + (selectedOption === currentQuestion.correctAnswer ? 1 : 0),
        incorrectAnswers: userAnswers.filter(a => !a.isCorrect).length + (selectedOption !== currentQuestion.correctAnswer ? 1 : 0),
        answers: [...userAnswers, {
          questionId: currentQuestion.id,
          selectedAnswer: selectedOption!,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: selectedOption === currentQuestion.correctAnswer,
        }],
      };
      onComplete(results);
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setIsAnswered(false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Reset state for previous question
      const previousAnswer = userAnswers[currentQuestionIndex - 1];
      if (previousAnswer) {
        setSelectedOption(previousAnswer.selectedAnswer);
        setIsAnswered(true);
        setShowExplanation(true);
        // Remove this answer from the array since we're going back
        setUserAnswers(userAnswers.slice(0, -1));
      }
    }
  };

  const isCorrectAnswer = isAnswered && selectedOption === currentQuestion.correctAnswer;
  const isWrongAnswer = isAnswered && selectedOption !== currentQuestion.correctAnswer;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#6B5B9A] via-[#5B7A8A] to-[#5B8A7A] flex flex-col px-6 py-8">
      {/* Floating particles */}
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
              y: [0, -30, 0],
              opacity: [0.15, 0.35, 0.15],
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
        {/* Header with Nomi */}
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
              <h2 className="text-white">Memory Practice</h2>
              <p className="text-white/70 text-sm">{nomiName} is here to help!</p>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border-2 border-white/30">
            <span className="text-white">{currentQuestionIndex + 1} / {quiz.questions.length}</span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="w-full bg-white/20 rounded-full h-2 mb-8 overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            className="flex-1 flex flex-col"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Question */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white flex-1">{currentQuestion.question}</h3>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3 mb-6 flex-1">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === currentQuestion.correctAnswer;
                const showCorrect = isAnswered && isCorrect;
                const showWrong = isAnswered && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-3 ${
                      showCorrect
                        ? 'bg-green-400/20 border-green-400/50 backdrop-blur-md'
                        : showWrong
                        ? 'bg-red-400/20 border-red-400/50 backdrop-blur-md'
                        : isSelected
                        ? 'bg-white/20 border-white/40 backdrop-blur-md'
                        : 'bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 hover:border-white/30'
                    } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}&#x20;
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showCorrect
                        ? 'border-green-400 bg-green-400'
                        : showWrong
                        ? 'border-red-400 bg-red-400'
                        : isSelected
                        ? 'border-white bg-white'
                        : 'border-white/40'
                    }`}>
                      {showCorrect && <CheckCircle className="w-5 h-5 text-white" />}
                      {showWrong && <XCircle className="w-5 h-5 text-white" />}
                      {!isAnswered && isSelected && (
                        <div className="w-3 h-3 bg-[#5B7A8A] rounded-full" />
                      )}
                    </div>
                    <span className={`flex-1 ${
                      showCorrect || showWrong ? 'text-white' : isSelected ? 'text-white' : 'text-white/80'
                    }`}>
                      {option}
                    </span>
                  </motion.button>
                );
              })}&#x20;
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && currentQuestion.explanation && (
                <motion.div
                  className={`p-4 rounded-2xl backdrop-blur-md border-2 mb-6 ${
                    isCorrectAnswer
                      ? 'bg-green-400/10 border-green-400/30'
                      : 'bg-blue-400/10 border-blue-400/30'
                  }`}&#x20;
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  <div className="flex items-start gap-3">
                    <Sparkles className={`w-5 h-5 mt-1 ${
                      isCorrectAnswer ? 'text-green-300' : 'text-blue-300'
                    }`} />
                    <div className="flex-1">
                      <p className="text-white/90 text-sm mb-1">
                        {isCorrectAnswer ? '🎉 Great job!' : '💡 Keep learning!'}&#x20;
                      </p>
                      <p className="text-white/70 text-sm">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-3">
              {currentQuestionIndex > 0 && (
                <Button
                  onClick={handlePreviousQuestion}
                  variant="outline"
                  disabled={!isAnswered}
                  className="flex-none border-white/30 text-white hover:bg-white/10 rounded-full h-12 px-6 disabled:opacity-50"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </Button>
              )}
              
              {!isAnswered ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="flex-1 bg-white hover:bg-white/90 text-[#5B7A8A] rounded-full h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  className="flex-1 bg-white hover:bg-white/90 text-[#5B7A8A] rounded-full h-12 flex items-center justify-center gap-2"
                >
                  <span>{isLastQuestion ? 'See Results' : 'Next Question'}</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
