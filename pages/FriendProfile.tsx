import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { X, UserPlus, UserCheck, Flame, Trophy, Calendar } from 'lucide-react';

interface FriendProfileProps {
  selectedColor: string;
  friendName: string;
  friendNomiName: string;
  friendColor: string;
  isFriend: boolean;
  onClose: () => void;
  onAddFriend?: () => void;
}

export function FriendProfile({ 
  selectedColor, 
  friendName, 
  friendNomiName,
  friendColor,
  isFriend, 
  onClose,
  onAddFriend 
}: FriendProfileProps) {
  const [added, setAdded] = useState(isFriend);

  const handleAddFriend = () => {
    setAdded(true);
    onAddFriend?.();
  };

  const friendStats = {
    streak: 7,
    quizzesCompleted: 23,
    averageScore: 87,
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#7B8A9A] via-[#8A9AAA] to-[#9AAABA] flex flex-col px-6 py-8">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-0 w-80 h-80 bg-[#6A7A8A] rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8A9AAA] rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Floating particles */}
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
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-6 left-6 z-20 p-2 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/30 hover:bg-white/30 transition-colors"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-6 h-6 text-white" />
      </motion.button>

      <div className="relative z-10 flex flex-col w-full max-w-md mx-auto items-center justify-center flex-1">
        {/* Friend's Nomi */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <NomiCharacterCustomizable color={friendColor} />
          </motion.div>
        </motion.div>

        {/* Friend Info */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-white mb-1">{friendNomiName}</h1>
          <p className="text-white/70">{friendName}</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="w-full space-y-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border-2 border-white/25">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-400/30 rounded-full flex items-center justify-center">
                <Flame className="w-7 h-7 text-orange-300" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm mb-1">Current Streak</p>
                <p className="text-white text-3xl">{friendStats.streak} days</p>
              </div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border-2 border-white/25">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-400/30 rounded-full flex items-center justify-center">
                <Calendar className="w-7 h-7 text-blue-300" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm mb-1">Quizzes Completed</p>
                <p className="text-white text-3xl">{friendStats.quizzesCompleted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border-2 border-white/25">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-400/30 rounded-full flex items-center justify-center">
                <Trophy className="w-7 h-7 text-green-300" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm mb-1">Average Score</p>
                <p className="text-white text-3xl">{friendStats.averageScore}%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Friend Button */}
        <motion.div
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {!added ? (
            <Button
              onClick={handleAddFriend}
              className="w-full bg-white hover:bg-white/90 text-[#8A9AAA] rounded-full h-14 shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              <span>Add friend</span>
            </Button>
          ) : (
            <motion.div
              className="w-full bg-green-500/20 backdrop-blur-md border-2 border-green-400/40 text-white rounded-full h-14 flex items-center justify-center gap-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <UserCheck className="w-5 h-5 text-green-300" />
              <span>Friends ✓</span>
            </motion.div>
          )}
        </motion.div>

        {/* Motivational message */}
        {added && (
          <motion.p
            className="text-white/70 text-center mt-4 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            You can now see each other's progress and share memories! 🎉
          </motion.p>
        )}
      </div>
    </div>
  );
}
