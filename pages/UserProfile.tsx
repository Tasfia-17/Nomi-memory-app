import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { motion } from 'motion/react';
import { ChevronLeft, Share2, Edit3, Copy, Flame, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  selectedColor: string;
  nomiName: string;
  userName: string;
  selectedPronoun: string;
  streakDays: number;
  onBack: () => void;
  onEdit: () => void;
}

export function UserProfile({ 
  selectedColor, 
  nomiName, 
  userName,
  selectedPronoun,
  streakDays = 7,
  onBack,
  onEdit 
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'personality'>('about');
  
  const friendCode = 'NM' + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(friendCode);
    toast.success('Friend code copied!');
  };

  const handleShare = () => {
    toast.success('Opening share menu...');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F5F2E8] via-[#F2E8E5] to-[#E8F2E5] flex flex-col">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[#F5E8D5] rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#E8F5D5] rounded-full opacity-30 blur-3xl" />

      <div className="relative z-10 flex-1">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between p-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onEdit}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <Edit3 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="max-w-md mx-auto px-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFE6E6] rounded-3xl shadow-lg overflow-hidden">
            {/* Top Tab */}
            <div className="flex justify-center py-3">
              <div className="w-16 h-1 bg-[#C4A57B] rounded-full" />
            </div>

            <div className="flex gap-6 p-6">
              {/* Nomi Character */}
              <motion.div
                className="flex-shrink-0"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-32 h-32 bg-gradient-to-br from-[#D5E8D5] to-[#E8D5F2] rounded-3xl flex items-center justify-center p-4">
                  <div className="scale-75">
                    <NomiCharacterCustomizable color={selectedColor} />
                  </div>
                </div>
              </motion.div>

              {/* Profile Info */}
              <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-gray-800 mb-1">{nomiName}</h2>
                <p className="text-gray-500 text-sm mb-4 capitalize">{selectedPronoun}/{selectedPronoun === 'he' ? 'him' : selectedPronoun === 'she' ? 'her' : 'them'}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 w-20">AGE</span>
                    <span className="text-gray-700">1 day</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 w-20">HUMAN</span>
                    <span className="text-gray-700">{userName || 'Friend'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 w-20">CODE</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700 font-mono text-xs">{friendCode}</span>
                      <button
                        onClick={handleCopyCode}
                        className="p-1 hover:bg-white/50 rounded transition-colors"
                      >
                        <Copy className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-t border-[#C4A57B]/20">
              <button
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-4 text-sm transition-colors ${
                  activeTab === 'about' 
                    ? 'text-gray-800 bg-white/40' 
                    : 'text-gray-500 hover:bg-white/20'
                }`}
              >
                ABOUT
              </button>
              <button
                onClick={() => setActiveTab('personality')}
                className={`flex-1 py-4 text-sm transition-colors ${
                  activeTab === 'personality' 
                    ? 'text-gray-800 bg-white/40' 
                    : 'text-gray-500 hover:bg-white/20'
                }`}
              >
                PERSONALITY
              </button>
            </div>
          </div>
        </motion.div>

        {/* Streak Achievement */}
        <motion.div
          className="max-w-md mx-auto px-6 mt-4"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{streakDays} day streak</p>
              <p className="text-xs text-gray-500">Longest memory streak ever!</p>
            </div>
            <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          className="max-w-md mx-auto px-6 mt-6"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'about' ? (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <p className="text-gray-600 text-sm leading-relaxed">
                {nomiName} is your dedicated memory companion, here to help you build lasting knowledge through spaced repetition and gentle encouragement. Together, you're creating a stronger, more confident memory!
              </p>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Supportive</span>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[90%] bg-gradient-to-r from-green-400 to-green-500 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Patient</span>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Motivating</span>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-purple-400 to-purple-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
