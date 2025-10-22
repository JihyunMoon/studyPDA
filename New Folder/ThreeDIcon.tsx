import { motion } from 'motion/react';

interface ThreeDIconProps {
  type: 'insight' | 'chat' | 'warning' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function ThreeDIcon({ type, size = 'md', animate = true }: ThreeDIconProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const getIconConfig = () => {
    switch (type) {
      case 'insight':
        return {
          gradient: 'from-[#FFD700] via-[#FFA500] to-[#FF8C00]',
          shadow: 'shadow-[0_8px_32px_rgba(255,215,0,0.4)]',
          glow: 'after:bg-[#FFD700]/30',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                fill="white"
                className="drop-shadow-lg"
              />
            </svg>
          ),
        };
      case 'chat':
        return {
          gradient: 'from-[#2176FF] via-[#43D8C9] to-[#2176FF]',
          shadow: 'shadow-[0_8px_32px_rgba(33,118,255,0.4)]',
          glow: 'after:bg-[#2176FF]/30',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5">
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 13.93 2.63 15.71 3.69 17.17L2.5 21.5L6.83 20.31C8.29 21.37 10.07 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                fill="white"
                className="drop-shadow-lg"
              />
              <circle cx="8" cy="12" r="1.5" fill="#2176FF" />
              <circle cx="12" cy="12" r="1.5" fill="#2176FF" />
              <circle cx="16" cy="12" r="1.5" fill="#2176FF" />
            </svg>
          ),
        };
      case 'warning':
        return {
          gradient: 'from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]',
          shadow: 'shadow-[0_8px_32px_rgba(245,158,11,0.4)]',
          glow: 'after:bg-[#F59E0B]/30',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5">
              <path
                d="M12 2L2 20H22L12 2Z"
                fill="white"
                className="drop-shadow-lg"
              />
              <path
                d="M12 9V13M12 16H12.01"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-md"
              />
            </svg>
          ),
        };
      case 'success':
        return {
          gradient: 'from-[#10B981] via-[#34D399] to-[#10B981]',
          shadow: 'shadow-[0_8px_32px_rgba(16,185,129,0.4)]',
          glow: 'after:bg-[#10B981]/30',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5">
              <circle cx="12" cy="12" r="10" fill="white" className="drop-shadow-lg" />
              <path
                d="M8 12L11 15L16 9"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-md"
              />
            </svg>
          ),
        };
      case 'danger':
        return {
          gradient: 'from-[#EF4444] via-[#F87171] to-[#EF4444]',
          shadow: 'shadow-[0_8px_32px_rgba(239,68,68,0.4)]',
          glow: 'after:bg-[#EF4444]/30',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-3/5 h-3/5">
              <circle cx="12" cy="12" r="10" fill="white" className="drop-shadow-lg" />
              <path
                d="M12 8V12M12 16H12.01"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="drop-shadow-md"
              />
            </svg>
          ),
        };
    }
  };

  const config = getIconConfig();

  return (
    <motion.div
      className="relative"
      animate={animate ? {
        y: [0, -8, 0],
        rotate: [0, 5, -5, 0],
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full blur-xl ${config.glow} opacity-60`} />
      
      {/* Main sphere */}
      <div
        className={`
          relative ${sizeClasses[size]} rounded-full 
          bg-gradient-to-br ${config.gradient}
          ${config.shadow}
          flex items-center justify-center
          transform-gpu
          before:absolute before:inset-0 before:rounded-full
          before:bg-gradient-to-tr before:from-white/40 before:to-transparent
          before:opacity-60
          after:absolute after:inset-[30%] after:rounded-full
          after:bg-white/20 after:blur-md
        `}
        style={{
          boxShadow: `
            inset 0 -4px 12px rgba(0, 0, 0, 0.2),
            inset 0 4px 12px rgba(255, 255, 255, 0.4),
            0 8px 32px rgba(0, 0, 0, 0.15)
          `,
        }}
      >
        {/* Icon */}
        <div className="relative z-10">
          {config.icon}
        </div>
      </div>

      {/* Bottom shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 bg-black/20 rounded-full blur-md"
        style={{
          transform: 'translateX(-50%) scaleY(0.3)',
        }}
      />
    </motion.div>
  );
}
