import React from 'react';
import { NomiCharacterCustomizable } from '../components/NomiCharacterCustomizable';
import { motion } from 'motion/react';
import { Brain, Users, Settings as SettingsIcon, Calendar, Plus, Sparkles } from 'lucide-react';

interface MainDashboardProps {
  selectedColor: string;
  nomiName: string;
  userName: string;
  streakDays: number;
  onNavigate: (page: string) => void;
}

export function MainDashboard({ 
  selectedColor, 
  nomiName, 
  userName, 
  streakDays,
  onNavigate 
}: MainDashboardProps) {
  const menuItems = [
    { 
      icon: Plus, 
      label: 'New Practice', 
      description: 'Add notes & create quiz',
      color: 'from-purple-400/30 to-purple-500/30',
      page: 'noteinput'
    },
    { 
      icon: Calendar, 
      label: 'Insights', 
      description: 'View your progress',
      color: 'from-blue-400/30 to-blue-500/30',
      page: 'insights'
    },
    { 
      icon: Users, 
      label: 'Friends', 
      description: 'Invite & connect',
      color: 'from-green-400/30 to-green-500/30',
      page: 'invitefriends'
    },
    { 
      icon: Brain, 
      label: 'My Profile', 
      description: 'View your journey',
      color: 'from-pink-400/30 to-pink-500/30',
      page: 'profile'
    },
    { 
      icon: SettingsIcon, 
      label: 'Settings', 
      description: 'Preferences & data',
      color: 'from-orange-400/30 to-orange-500/30',
      page: 'settings'
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#6B7B9A] via-[#7B8AAA] to-[#8A9ABA] flex flex-col px-6 py-8">
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

      <div className="relative z-10 flex flex-col w-full max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <motion.div
            className="mb-6"
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
          <h1 className="text-white mb-2">Welcome back{userName ? `, ${userName}` : ''}!</h1>
          <p className="text-white/70">{nomiName} is ready to help you learn</p>
        </motion.div>

        {/* Streak Banner */}
        <motion.div
          className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-8 border-2 border-white/25 flex items-center justify-center gap-3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <div className="text-center">
            <p className="text-white text-2xl">{streakDays} day streak!</p>
            <p className="text-white/60 text-sm">Keep up the great work</p>
          </div>
          <Sparkles className="w-6 h-6 text-yellow-300" />
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                onClick={() => onNavigate(item.page)}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border-2 border-white/20 hover:bg-white/15 hover:border-white/30 transition-all"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200, damping: 15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white mb-1 text-center">{item.label}</h3>
                <p className="text-white/60 text-xs text-center">{item.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
