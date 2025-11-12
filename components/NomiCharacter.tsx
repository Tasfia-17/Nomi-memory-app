import React from 'react';
import { motion } from 'motion/react';

export function NomiCharacter() {
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
            fill="#B8A5E8"
            opacity="0.7"
          />
          <path
            d="M 70 80 Q 40 68 32 55 Q 30 50 35 48 Q 42 50 50 60 Q 58 70 70 80 Z"
            fill="#D4C5F5"
            opacity="0.8"
          />
          {/* Wing membrane lines */}
          <path d="M 45 65 Q 55 72 65 78" stroke="#9D88D4" strokeWidth="1" opacity="0.4" />
          <path d="M 35 55 Q 48 65 60 73" stroke="#9D88D4" strokeWidth="1" opacity="0.4" />
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
            fill="#A5C8E8"
            opacity="0.7"
          />
          <path
            d="M 130 80 Q 160 68 168 55 Q 170 50 165 48 Q 158 50 150 60 Q 142 70 130 80 Z"
            fill="#C5DFF5"
            opacity="0.8"
          />
          {/* Wing membrane lines */}
          <path d="M 155 65 Q 145 72 135 78" stroke="#88AED4" strokeWidth="1" opacity="0.4" />
          <path d="M 165 55 Q 152 65 140 73" stroke="#88AED4" strokeWidth="1" opacity="0.4" />
        </motion.g>
        
        {/* Tail - flowing */}
        <path
          d="M 90 130 Q 85 145 80 160 Q 78 170 82 172 Q 86 170 88 160 Q 92 145 95 135 Z"
          fill="#E8B5D8"
        />
        <path
          d="M 85 155 Q 83 162 84 168 Q 85 165 86 158 Z"
          fill="#F5D0E8"
          opacity="0.7"
        />
        
        {/* Body - round and chubby */}
        <ellipse
          cx="100"
          cy="100"
          rx="35"
          ry="40"
          fill="#F5E8FF"
        />
        
        {/* Body gradient/shading */}
        <ellipse
          cx="95"
          cy="95"
          rx="25"
          ry="28"
          fill="#FFFFFF"
          opacity="0.6"
        />
        <ellipse
          cx="105"
          cy="110"
          rx="20"
          ry="22"
          fill="#E8D5FF"
          opacity="0.4"
        />
        
        {/* Belly marking */}
        <ellipse
          cx="100"
          cy="115"
          rx="18"
          ry="20"
          fill="#FFF5F8"
          opacity="0.8"
        />
        
        {/* Small arms */}
        {/* Left arm */}
        <ellipse
          cx="70"
          cy="105"
          rx="8"
          ry="12"
          fill="#F0DDF5"
        />
        <circle cx="66" cy="115" r="6" fill="#F5E8FF" />
        
        {/* Right arm */}
        <ellipse
          cx="130"
          cy="105"
          rx="8"
          ry="12"
          fill="#F0DDF5"
        />
        <circle cx="134" cy="115" r="6" fill="#F5E8FF" />
        
        {/* Feet */}
        {/* Left foot */}
        <ellipse
          cx="85"
          cy="135"
          rx="10"
          ry="8"
          fill="#E8D5FF"
        />
        
        {/* Right foot */}
        <ellipse
          cx="115"
          cy="135"
          rx="10"
          ry="8"
          fill="#E8D5FF"
        />
        
        {/* Head - cute and round */}
        <circle
          cx="100"
          cy="70"
          r="28"
          fill="#FFF5FC"
        />
        
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
          {/* Left ear */}
          <path
            d="M 78 55 Q 68 48 65 38 Q 67 35 72 38 Q 78 43 80 50 Z"
            fill="#F5E8FF"
          />
          <path
            d="M 75 48 Q 70 44 69 40 Q 71 42 74 45 Z"
            fill="#FFFFFF"
            opacity="0.6"
          />
          
          {/* Right ear */}
          <path
            d="M 122 55 Q 132 48 135 38 Q 133 35 128 38 Q 122 43 120 50 Z"
            fill="#F5E8FF"
          />
          <path
            d="M 125 48 Q 130 44 131 40 Q 129 42 126 45 Z"
            fill="#FFFFFF"
            opacity="0.6"
          />
        </g>
        
        {/* Small horn/antenna */}
        <path
          d="M 100 45 L 97 52 L 103 52 Z"
          fill="#D4A5E8"
          opacity="0.8"
        />
        <circle cx="100" cy="45" r="2.5" fill="#E8B5F5" />
        
        {/* Eyes - large anime style */}
        <g>
          {/* Left eye */}
          <ellipse cx="88" cy="70" rx="9" ry="11" fill="#3D2D4F" />
          <ellipse cx="88" cy="71" rx="7" ry="9" fill="#4D3D5F" />
          <circle cx="90" cy="68" r="3.5" fill="#FFFFFF" />
          <circle cx="86" cy="73" r="1.8" fill="#FFFFFF" opacity="0.8" />
          <circle cx="91" cy="70" r="1.2" fill="#FFFFFF" />
          {/* Shine effect */}
          <circle cx="89" cy="67" r="1.5" fill="#A8D8F8" opacity="0.6" />
          
          {/* Right eye */}
          <ellipse cx="112" cy="70" rx="9" ry="11" fill="#3D2D4F" />
          <ellipse cx="112" cy="71" rx="7" ry="9" fill="#4D3D5F" />
          <circle cx="114" cy="68" r="3.5" fill="#FFFFFF" />
          <circle cx="110" cy="73" r="1.8" fill="#FFFFFF" opacity="0.8" />
          <circle cx="115" cy="70" r="1.2" fill="#FFFFFF" />
          {/* Shine effect */}
          <circle cx="113" cy="67" r="1.5" fill="#A8D8F8" opacity="0.6" />
        </g>
        
        {/* Eyelashes (anime style) */}
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
        
        {/* Small mouth detail */}
        <path
          d="M 100 87 L 100 89"
          stroke="#6D5D7A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        
        {/* Magical sparkles around creature */}
        <g opacity="0.9">
          {/* Top right sparkle */}
          <g transform="translate(140, 50)">
            <path
              d="M 0 -8 L 1.5 -1.5 L 8 0 L 1.5 1.5 L 0 8 L -1.5 1.5 L -8 0 L -1.5 -1.5 Z"
              fill="#FFD4A8"
            />
            <circle cx="0" cy="0" r="2" fill="#FFF0D0" opacity="0.8" />
          </g>
          
          {/* Left sparkle */}
          <g transform="translate(50, 75)">
            <path
              d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z"
              fill="#D4A8FF"
            />
            <circle cx="0" cy="0" r="1.5" fill="#F0D0FF" opacity="0.8" />
          </g>
          
          {/* Bottom right sparkle */}
          <g transform="translate(145, 120)">
            <path
              d="M 0 -5 L 0.8 -0.8 L 5 0 L 0.8 0.8 L 0 5 L -0.8 0.8 L -5 0 L -0.8 -0.8 Z"
              fill="#A8E8FF"
            />
            <circle cx="0" cy="0" r="1.2" fill="#D0F8FF" opacity="0.8" />
          </g>
          
          {/* Small sparkle top left */}
          <g transform="translate(55, 50)">
            <path
              d="M 0 -4 L 0.7 -0.7 L 4 0 L 0.7 0.7 L 0 4 L -0.7 0.7 L -4 0 L -0.7 -0.7 Z"
              fill="#FFA8D4"
            />
          </g>
        </g>
        
        {/* Floating magical particles */}
        <motion.circle
          cx="150"
          cy="90"
          r="3"
          fill="#D4A8FF"
          opacity="0.6"
          animate={{
            y: [-3, 3, -3],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.circle
          cx="48"
          cy="105"
          r="2.5"
          fill="#A8D8FF"
          opacity="0.5"
          animate={{
            y: [3, -3, 3],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8
          }}
        />
        <motion.circle
          cx="135"
          cy="140"
          r="2"
          fill="#FFD4A8"
          opacity="0.6"
          animate={{
            y: [-2, 2, -2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2
          }}
        />
      </svg>
    </motion.div>
  );
}
