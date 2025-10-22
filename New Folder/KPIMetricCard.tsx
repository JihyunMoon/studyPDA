import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface KPIMetricCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
  risk?: 'low' | 'medium' | 'high';
  subtitle?: string;
  delay?: number;
}

export function KPIMetricCard({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  risk,
  subtitle,
  delay = 0,
}: KPIMetricCardProps) {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const getRiskColor = () => {
    if (!risk) return '';
    switch (risk) {
      case 'low':
        return 'text-[#10B981]';
      case 'medium':
        return 'text-[#F59E0B]';
      case 'high':
        return 'text-[#EF4444]';
      default:
        return '';
    }
  };

  const getRiskBg = () => {
    if (!risk) return '';
    switch (risk) {
      case 'low':
        return 'bg-[#10B981]/10 border-[#10B981]/20';
      case 'medium':
        return 'bg-[#F59E0B]/10 border-[#F59E0B]/20';
      case 'high':
        return 'bg-[#EF4444]/10 border-[#EF4444]/20';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="border border-[#444]/10 hover:border-[#2176FF]/30 hover:shadow-lg transition-all duration-300 bg-white">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2176FF]/10 to-[#43D8C9]/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-[#2176FF]" />
              </div>
              <div>
                <p className="text-sm text-[#6B7280] font-medium">{title}</p>
                {subtitle && <p className="text-xs text-[#9CA3AF] mt-0.5">{subtitle}</p>}
              </div>
            </div>
            {risk && (
              <div className={`px-2 py-1 rounded-md border ${getRiskBg()}`}>
                <AlertTriangle className={`h-4 w-4 ${getRiskColor()}`} />
              </div>
            )}
          </div>

          {/* Main Value */}
          <div className="mb-3">
            <h3 className="text-3xl font-bold text-[#444] tracking-tight">{value}</h3>
          </div>

          {/* Change Indicator */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
              isPositive 
                ? 'bg-[#10B981]/10 text-[#10B981]' 
                : 'bg-[#EF4444]/10 text-[#EF4444]'
            }`}>
              <TrendIcon className="h-3.5 w-3.5" />
              <span className="text-sm font-semibold">
                {isPositive ? '+' : ''}{change}%
              </span>
            </div>
            <span className="text-sm text-[#6B7280]">{changeLabel}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
