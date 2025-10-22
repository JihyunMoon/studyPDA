import { motion } from 'motion/react';
import { Card } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface EnhancedKPICardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  color?: string;
  bgGradient?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function EnhancedKPICard({
  icon: Icon,
  label,
  value,
  trend,
  trendLabel,
  color = '#2176FF',
  bgGradient = 'from-[#2176FF]/10 to-[#43D8C9]/10',
  size = 'md',
}: EnhancedKPICardProps) {
  const sizeConfig = {
    sm: {
      card: 'p-4',
      icon: 'w-10 h-10',
      iconSize: 'h-5 w-5',
      value: 'text-2xl',
      label: 'text-xs',
    },
    md: {
      card: 'p-6',
      icon: 'w-14 h-14',
      iconSize: 'h-7 w-7',
      value: 'text-3xl',
      label: 'text-sm',
    },
    lg: {
      card: 'p-8',
      icon: 'w-20 h-20',
      iconSize: 'h-10 w-10',
      value: 'text-5xl',
      label: 'text-base',
    },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${config.card} bg-gradient-to-br ${bgGradient} border-2 border-transparent hover:border-[${color}]/30 transition-all cursor-pointer`}>
        <div className="flex items-start justify-between">
          {/* Icon */}
          <div
            className={`${config.icon} rounded-2xl flex items-center justify-center shadow-lg`}
            style={{
              backgroundColor: color,
            }}
          >
            <Icon className={`${config.iconSize} text-white`} />
          </div>

          {/* Trend Badge */}
          {trend !== undefined && (
            <div
              className={`
                px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1
                ${trend >= 0 
                  ? 'bg-[#10B981]/20 text-[#10B981]' 
                  : 'bg-[#EF4444]/20 text-[#EF4444]'
                }
              `}
            >
              <span>{trend >= 0 ? '↑' : '↓'}</span>
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="mt-4">
          <motion.p
            className={`${config.value} font-bold text-[#444] leading-none`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.p>
          
          {/* Label */}
          <p className={`${config.label} text-[#6B7280] font-medium mt-2`}>
            {label}
          </p>
          
          {/* Trend Label */}
          {trendLabel && (
            <p className="text-xs text-[#9CA3AF] mt-1">
              {trendLabel}
            </p>
          )}
        </div>

        {/* Decorative Element */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-10"
          style={{
            backgroundColor: color,
          }}
        />
      </Card>
    </motion.div>
  );
}
