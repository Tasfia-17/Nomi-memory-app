import React from 'react';
import { motion } from 'motion/react';

interface NomiCharacterCustomizableProps {
  color?: string;
  lookAt?: { x: number; y: number } | null;
}

const colorPalettes: Record<string, { body: string; bodyLight: string; bodyDark: string; accent: string }> = {
  purple: {
    body: '#F5E8FF',
    bodyLight: '#FFFFFF',
    bodyDark: '#E8D5FF',
    accent: '#D4A5E8'
  },
  blue: {
    body: '#E8F4FF',
    bodyLight: '#FFFFFF',
    bodyDark: '#D5E8FF',
    accent: '#A5C8E8'
  },
  orange: {
    body: '#FFF0E8',
    bodyLight: '#FFFFFF',
    bodyDark: '#FFE5D5',
    accent: '#FFB488'
  },
  pink: {
    body: '#FFE8F4',
    bodyLight: '#FFFFFF',
    bodyDark: '#FFD5E8',
    accent: '#FFB5D5'
  },
  green: {
    body: '#E8FFF0',
    bodyLight: '#FFFFFF',
    bodyDark: '#D5FFE5',
    accent: '#A5E8B5'
  },
  gray: {
    body: '#F0F0F5',
    bodyLight: '#FFFFFF',
    bodyDark: '#E5E5F0',
    accent: '#C5C5D5'
  }
};

export function NomiCharacterCustomizable({ color = 'purple', lookAt = null }: NomiCharacterCustomizableProps) {
  const palette = colorPalettes[color] || colorPalettes.purple;
  
  // Calculate eye direction based on lookAt position (relative to Nomi's center)
  const eyeOffsetX = lookAt ? Math.max(-3, Math.min(3, lookAt.x / 30)) : 0;
  const eyeOffsetY = lookAt ? Math.max(-3, Math.min(3, lookAt.y / 30)) : 0;
  
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse
          cx="100"
          cy="170"
          rx="35"
          ry="8"
          fill="#000000"
          opacity="0.15"
        />
        
        {/* Left Wing - back layer */}
        <motion.g
          animate={{
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "75px 85px" }}
        >
          <path
            d="M 75 85 Q 35 70 25 55 Q 20 45 25 40 Q 35 35 45 45 Q 55 55 60 70 Q 65 80 75 85 Z"
            fill={palette.accent}
            opacity="0.7"
          />
          <path
            d="M 70 80 Q 40 68 32 55 Q 30 50 35 48 Q 42 50 50 60 Q 58 70 70 80 Z"
            fill={palette.bodyLight}
            opacity="0.8"
          />
          <path d="M 45 65 Q 55 72 65 78" stroke={palette.bodyDark} strokeWidth="1" opacity="0.4" />
          <path d="M 35 55 Q 48 65 60 73" stroke={palette.bodyDark} strokeWidth="1" opacity="0.4" />
        </motion.g>
        
        {/* Right Wing - back layer */}
        <motion.g
          animate={{
            rotate: [5, -5, 5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: "125px 85px" }}
        >
          <path
            d="M 125 85 Q 165 70 175 55 Q 180 45 175 40 Q 165 35 155 45 Q 145 55 140 70 Q 135 80 125 85 Z"
            fill={palette.accent}
            opacity="0.7"
          />
          <path
            d="M 130 80 Q 160 68 168 55 Q 170 50 165 48 Q 158 50 150 60 Q 142 70 130 80 Z"
            fill={palette.bodyLight}
            opacity="0.8"
          />
          <path d="M 155 65 Q 145 72 135 78" stroke={palette.bodyDark} strokeWidth="1" opacity="0.4" />
          <path d="M 165 55 Q 152 65 140 73" stroke={palette.bodyDark} strokeWidth="1" opacity="0.4" />
        </motion.g>
        
        {/* Tail - flowing */}
        <path
          d="M 90 130 Q 85 145 80 160 Q 78 170 82 172 Q 86 170 88 160 Q 92 145 95 135 Z"
          fill={palette.bodyDark}
        />
        <path
          d="M 85 155 Q 83 162 84 168 Q 85 165 86 158 Z"
          fill={palette.bodyLight}
          opacity="0.7"
        />
        
        {/* Body - round and chubby */}
        <ellipse
          cx="100"
          cy="100"
          rx="35"
          ry="40"
          fill={palette.body}
        />
        
        {/* Body gradient/shading */}
        <ellipse
          cx="95"
          cy="95"
          rx="25"
          ry="28"
          fill={palette.bodyLight}
          opacity="0.6"
        />
        <ellipse
          cx="105"
          cy="110"
          rx="20"
          ry="22"
          fill={palette.bodyDark}
          opacity="0.4"
        />
        
        {/* Belly marking */}
        <ellipse
          cx="100"
          cy="115"
          rx="18"
          ry="20"
          fill={palette.bodyLight}
          opacity="0.8"
        />
        
        {/* Small arms */}
        <ellipse cx="70" cy="105" rx="8" ry="12" fill={palette.bodyDark} opacity="0.7" />
        <circle cx="66" cy="115" r="6" fill={palette.body} />
        <ellipse cx="130" cy="105" rx="8" ry="12" fill={palette.bodyDark} opacity="0.7" />
        <circle cx="134" cy="115" r="6" fill={palette.body} />
        
        {/* Feet */}
        <ellipse cx="85" cy="135" rx="10" ry="8" fill={palette.bodyDark} />
        <ellipse cx="115" cy="135" rx="10" ry="8" fill={palette.bodyDark} />
        
        {/* Head - cute and round */}
        <circle cx="100" cy="70" r="28" fill={palette.bodyLight} />
        
        {/* Head highlight */}
        <ellipse
          cx="95"
          cy="62"
          rx="15"
          ry="18"
          fill="#FFFFFF"
          opacity="0.7"
        />
        
        {/* Cute pointy ears */}
        <g>
          <path d="M 78 55 Q 68 48 65 38 Q 67 35 72 38 Q 78 43 80 50 Z" fill={palette.body} />
          <path d="M 75 48 Q 70 44 69 40 Q 71 42 74 45 Z" fill={palette.bodyLight} opacity="0.6" />
          <path d="M 122 55 Q 132 48 135 38 Q 133 35 128 38 Q 122 43 120 50 Z" fill={palette.body} />
          <path d="M 125 48 Q 130 44 131 40 Q 129 42 126 45 Z" fill={palette.bodyLight} opacity="0.6" />
        </g>
        
        {/* Small horn/antenna */}
        <path d="M 100 45 L 97 52 L 103 52 Z" fill={palette.accent} opacity="0.8" />
        <circle cx="100" cy="45" r="2.5" fill={palette.accent} />
        
        {/* Eyes - large anime style with dynamic direction */}
        <g>
          {/* Left eye */}
          <ellipse cx="88" cy="70" rx="9" ry="11" fill="#3D2D4F" />
          <motion.g
            animate={{
              x: eyeOffsetX,
              y: eyeOffsetY
            }}
            transition={{ duration: 0.3 }}
          >
            <ellipse cx="88" cy="71" rx="7" ry="9" fill="#4D3D5F" />
            <circle cx="90" cy="68" r="3.5" fill="#FFFFFF" />
            <circle cx="86" cy="73" r="1.8" fill="#FFFFFF" opacity="0.8" />
            <circle cx="91" cy="70" r="1.2" fill="#FFFFFF" />
            <circle cx="89" cy="67" r="1.5" fill="#A8D8F8" opacity="0.6" />
          </motion.g>
          
          {/* Right eye */}
          <ellipse cx="112" cy="70" rx="9" ry="11" fill="#3D2D4F" />
          <motion.g
            animate={{
              x: eyeOffsetX,
              y: eyeOffsetY
            }}
            transition={{ duration: 0.3 }}
          >
            <ellipse cx="112" cy="71" rx="7" ry="9" fill="#4D3D5F" />
            <circle cx="114" cy="68" r="3.5" fill="#FFFFFF" />
            <circle cx="110" cy="73" r="1.8" fill="#FFFFFF" opacity="0.8" />
            <circle cx="115" cy="70" r="1.2" fill="#FFFFFF" />
            <circle cx="113" cy="67" r="1.5" fill="#A8D8F8" opacity="0.6" />
          </motion.g>
        </g>
        
        {/* Eyelashes */}
        <g stroke="#3D2D4F" strokeWidth="1.5" strokeLinecap="round">
          <path d="M 83 62 L 80 59" />
          <path d="M 85 60 L 83 56" />
          <path d="M 117 62 L 120 59" />
          <path d="M 115 60 L 117 56" />
        </g>
        
        {/* Blush */}
        <ellipse cx="75" cy="78" rx="7" ry="5" fill="#FFB5D5" opacity="0.6" />
        <ellipse cx="125" cy="78" rx="7" ry="5" fill="#FFB5D5" opacity="0.6" />
        
        {/* Small nose */}
        <path d="M 100 78 L 98 80 L 102 80 Z" fill="#E8A5C8" opacity="0.6" />
        
        {/* Cute smile */}
        <path
          d="M 92 84 Q 100 89 108 84"
          stroke="#6D5D7A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M 100 87 L 100 89" stroke="#6D5D7A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}
