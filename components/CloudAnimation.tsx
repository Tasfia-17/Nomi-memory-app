import React from 'react';
import { motion } from 'motion/react';

export function CloudAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Cloud 1 */}
      <motion.div
        className="absolute"
        initial={{ x: '-20%', y: '10%' }}
        animate={{ x: '120%', y: '10%' }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Cloud size="large" opacity={0.3} />
      </motion.div>

      {/* Cloud 2 */}
      <motion.div
        className="absolute"
        initial={{ x: '-30%', y: '25%' }}
        animate={{ x: '130%', y: '25%' }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      >
        <Cloud size="medium" opacity={0.25} />
      </motion.div>

      {/* Cloud 3 */}
      <motion.div
        className="absolute"
        initial={{ x: '-25%', y: '60%' }}
        animate={{ x: '125%', y: '60%' }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'linear',
          delay: 10,
        }}
      >
        <Cloud size="small" opacity={0.2} />
      </motion.div>

      {/* Cloud 4 */}
      <motion.div
        className="absolute"
        initial={{ x: '-15%', y: '75%' }}
        animate={{ x: '115%', y: '75%' }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: 'linear',
          delay: 15,
        }}
      >
        <Cloud size="medium" opacity={0.28} />
      </motion.div>

      {/* Cloud 5 */}
      <motion.div
        className="absolute"
        initial={{ x: '-20%', y: '40%' }}
        animate={{ x: '120%', y: '40%' }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
          delay: 20,
        }}
      >
        <Cloud size="large" opacity={0.22} />
      </motion.div>
    </div>
  );
}

function Cloud({ size, opacity }: { size: 'small' | 'medium' | 'large'; opacity: number }) {
  const scales = {
    small: 0.6,
    medium: 0.8,
    large: 1,
  };

  const scale = scales[size];

  return (
    <svg
      width={120 * scale}
      height={60 * scale}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 25 40 Q 10 40 10 28 Q 10 18 20 15 Q 22 8 30 8 Q 38 8 42 15 Q 50 12 58 12 Q 70 12 75 22 Q 85 20 92 25 Q 100 30 100 40 Q 100 48 90 48 L 25 48 Q 15 48 15 40 Z"
        fill="#FFFFFF"
        opacity={opacity}
      />
    </svg>
  );
}
