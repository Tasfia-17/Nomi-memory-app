import React, { useState } from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { Button } from '../components/ui/button';
import { motion } from 'motion/react';
import { X, Share2, Home, TrendingUp, Sparkles, Users, Link2, Mail } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface InviteFriendsProps {
  selectedColor: string;
  nomiName: string;
  userName: string;
  onClose: () => void;
}

const friendBenefits = [
  {
    icon: Home,
    title: 'Visit their space',
    description: 'See your friends\' memory journey',
    color: 'from-purple-400/30 to-purple-500/30',
  },
  {
    icon: TrendingUp,
    title: 'Track progress',
    description: 'Celebrate wins together',
    color: 'from-blue-400/30 to-blue-500/30',
  },
  {
    icon: Sparkles,
    title: 'Share memories',
    description: 'Exchange learning tips',
    color: 'from-pink-400/30 to-pink-500/30',
  },
];

export function InviteFriends({ selectedColor, nomiName, userName, onClose }: InviteFriendsProps) {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = (method: 'link' | 'email') => {
    if (method === 'link') {
      navigator.clipboard.writeText('https://nomi.app/invite?ref=' + userName);
      toast.success('Invite link copied to clipboard!');
    } else {
      toast.success('Opening email...');
    }
    setShowShareOptions(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#6B8A7A] via-[#7B9A8A] to-[#8AAA9A] flex flex-col px-6 py-8">
      {/* Decorative clouds/bushes background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large background shapes similar to Finch's bushes */}
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#5A7A6A] rounded-full opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.7, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-20 right-0 w-80 h-80 bg-[#6A8A7A] rounded-full opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-64 h-64 bg-[#7A9A8A] rounded-full opacity-40 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.5, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
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

      <div className="relative z-10 flex flex-col w-full max-w-md mx-auto flex-1 items-center justify-center">
        {/* Nomi Character */}
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
            <NomiCharacterCustomizable color={selectedColor} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-white mb-2">Learning is more fun</h1>
          <h1 className="text-white mb-4">with friends!</h1>
          <p className="text-white/70">Invite your study buddies to join {nomiName}</p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          className="grid grid-cols-3 gap-4 mb-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {friendBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                className="flex flex-col items-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
              >
                <motion.div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${benefit.color} backdrop-blur-md border-2 border-white/30 flex items-center justify-center mb-3`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-10 h-10 text-white" />
                </motion.div>
                <p className="text-white text-center text-sm mb-1">{benefit.title}</p>
                <p className="text-white/60 text-center text-xs">{benefit.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Invite Banner */}
        <motion.div
          className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-5 mb-6 shadow-lg"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 mb-1">Invite 3 friends to unlock</p>
              <p className="text-gray-600 text-sm">Special Memory Crystal! ✨</p>
            </div>
          </div>
        </motion.div>

        {/* Invite Button */}
        <motion.div
          className="w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={() => setShowShareOptions(true)}
            className="w-full bg-white hover:bg-white/90 text-[#7B9A8A] rounded-full h-14 shadow-lg transition-all hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Invite your friends!</span>
          </Button>
        </motion.div>
      </div>

      {/* Share Options Modal */}
      {showShareOptions && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end justify-center z-30 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowShareOptions(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 w-full max-w-md"
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4 text-center">Share via</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => handleShare('link')}
                className="w-full p-4 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-2xl flex items-center gap-3 transition-all"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Link2 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800">Copy invite link</p>
                  <p className="text-gray-600 text-sm">Share anywhere</p>
                </div>
              </button>

              <button
                onClick={() => handleShare('email')}
                className="w-full p-4 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-2xl flex items-center gap-3 transition-all"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800">Send via email</p>
                  <p className="text-gray-600 text-sm">Invite directly</p>
                </div>
              </button>
            </div>

            <Button
              onClick={() => setShowShareOptions(false)}
              variant="outline"
              className="w-full mt-4 rounded-full h-12"
            >
              Cancel
            </Button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
