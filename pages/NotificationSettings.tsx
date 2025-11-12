import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Switch } from '../components/ui/switch';

interface NotificationSettingsProps {
  onBack: () => void;
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [notifications, setNotifications] = useState({
    morningCheckIn: true,
    eveningWindDown: true,
    nomiMessages: true,
    goodVibes: true,
    streakReminders: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const pushNotifications = [
    { key: 'morningCheckIn' as const, label: 'Morning check in', time: '8:00am' },
    { key: 'eveningWindDown' as const, label: 'Evening wind down', time: '9:00pm' },
  ];

  const generalNotifications = [
    { key: 'nomiMessages' as const, label: 'Messages from Nomi' },
    { key: 'goodVibes' as const, label: 'Good vibes' },
    { key: 'streakReminders' as const, label: 'Streak reminders' },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#E8E5F2] via-[#E5E8F7] to-[#E8F2F5] flex flex-col">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex-1 px-6 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/50 rounded-full transition-colors mr-3"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-gray-800">Notifications</h2>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Push Notifications */}
          <div>
            <motion.p
              className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Push Notifications
            </motion.p>
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-2 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {pushNotifications.map((item, index) => (
                <motion.div
                  key={item.key}
                  className="flex items-center justify-between p-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <div>
                    <p className="text-gray-700">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={() => toggleNotification(item.key)}
                  />
                </motion.div>
              ))}

              <motion.button
                className="w-full flex items-center gap-3 p-4 hover:bg-white/50 rounded-2xl transition-colors"
                whileHover={{ x: 4 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="flex-1 text-left text-gray-700">Nomi's Newsletters</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>

              {generalNotifications.map((item, index) => (
                <motion.div
                  key={item.key}
                  className="flex items-center justify-between p-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <p className="text-gray-700">{item.label}</p>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={() => toggleNotification(item.key)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Email Notifications */}
          <motion.div
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-2 shadow-sm"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="w-full flex items-center justify-between p-4 hover:bg-white/50 rounded-2xl transition-colors"
              whileHover={{ x: 4 }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-gray-700">Email Notifications</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Not Set</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
