import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Bell, User, Sliders, Database, Moon, Sparkles, HelpCircle, Info, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';

interface SettingsProps {
  selectedColor: string;
  nomiName: string;
  userName: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function Settings({ selectedColor, nomiName, userName, onBack, onNavigate }: SettingsProps) {
  const [pauseMode, setPauseMode] = useState(false);

  const accountItems = [
    { icon: Bell, label: 'Notifications', color: 'bg-orange-100', iconColor: 'text-orange-500', page: 'notifications' },
    { icon: User, label: 'Profile', color: 'bg-green-100', iconColor: 'text-green-500', page: 'profile' },
    { icon: Sliders, label: 'Preferences', color: 'bg-blue-100', iconColor: 'text-blue-500', page: 'preferences' },
    { icon: Database, label: 'Your data', color: 'bg-purple-100', iconColor: 'text-purple-500', page: 'data' },
  ];

  const supportItems = [
    { icon: HelpCircle, label: 'Help center', color: 'bg-blue-100', iconColor: 'text-blue-500', page: 'help' },
    { icon: Info, label: 'About', color: 'bg-green-100', iconColor: 'text-green-500', page: 'about' },
    { icon: AlertCircle, label: 'Report issue', color: 'bg-red-100', iconColor: 'text-red-500', page: 'report' },
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
          className="flex items-center mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/50 rounded-full transition-colors mr-3"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-gray-800">Settings</h1>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Account Section */}
          <div>
            <motion.p
              className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Account
            </motion.p>
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-2 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {accountItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => onNavigate(item.page)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-white/50 rounded-2xl transition-colors"
                    whileHover={{ x: 4 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <span className="flex-1 text-left text-gray-700">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                );
              })}

              {/* Pause Mode Toggle */}
              <motion.div
                className="flex items-center gap-3 p-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Moon className="w-5 h-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">Pause mode</p>
                  <p className="text-xs text-gray-500">Take a break and preserve your progress.</p>
                </div>
                <Switch
                  checked={pauseMode}
                  onCheckedChange={setPauseMode}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Subscription Section */}
          <div>
            <motion.p
              className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Subscription
            </motion.p>
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-2 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                className="flex items-center gap-3 p-4"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">Nomi Plus</p>
                </div>
                <span className="text-xs text-gray-500">None</span>
              </motion.div>

              <motion.button
                onClick={() => onNavigate('subscription')}
                className="w-full flex items-center gap-3 p-4 hover:bg-white/50 rounded-2xl transition-colors"
                whileHover={{ x: 4 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.85 }}
              >
                <div className="w-10 h-10" />
                <span className="flex-1 text-left text-gray-700">Restore Nomi Plus purchase</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </motion.button>
            </motion.div>
          </div>

          {/* Support Section */}
          <div>
            <motion.p
              className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              Support
            </motion.p>
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-2 shadow-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {supportItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => onNavigate(item.page)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-white/50 rounded-2xl transition-colors"
                    whileHover={{ x: 4 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.1 + index * 0.05 }}
                  >
                    <div className={`w-10 h-10 ${item.color} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <span className="flex-1 text-left text-gray-700">{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>

          {/* Version */}
          <motion.p
            className="text-center text-xs text-gray-400 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            Nomi v1.0.0 (Beta)
          </motion.p>
        </div>
      </div>
    </div>
  );
}
