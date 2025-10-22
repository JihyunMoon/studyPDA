import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ThreeDIcon } from './ThreeDIcon';
import { AlertTriangle, TrendingDown, DollarSign } from 'lucide-react';

interface CriticalAlertProps {
  type: 'warning' | 'danger';
  title: string;
  message: string;
  metrics?: {
    label: string;
    value: string;
    change: number;
  }[];
  actions?: string[];
}

export function CriticalAlert({ type, title, message, metrics, actions }: CriticalAlertProps) {
  const config = type === 'danger' 
    ? {
        bg: 'bg-gradient-to-br from-[#FEE2E2] via-white to-[#FEF2F2]',
        border: 'border-[#EF4444]/30',
        titleColor: 'text-[#DC2626]',
        accentColor: 'bg-[#EF4444]',
        glowColor: 'shadow-[0_0_40px_rgba(239,68,68,0.2)]',
      }
    : {
        bg: 'bg-gradient-to-br from-[#FEF3C7] via-white to-[#FFFBEB]',
        border: 'border-[#F59E0B]/30',
        titleColor: 'text-[#D97706]',
        accentColor: 'bg-[#F59E0B]',
        glowColor: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]',
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`border-2 ${config.border} ${config.glowColor} overflow-hidden`}>
        <div className={`h-2 ${config.accentColor} animate-pulse`} />
        <CardContent className={`p-6 ${config.bg}`}>
          <div className="flex items-start gap-6">
            {/* 3D Icon */}
            <div className="flex-shrink-0">
              <ThreeDIcon type={type} size="lg" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className={`h-5 w-5 ${config.titleColor}`} />
                  <h3 className={`text-xl font-bold ${config.titleColor}`}>
                    {title}
                  </h3>
                </div>
                <p className="text-[#444] leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Metrics */}
              {metrics && metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#444]/10"
                    >
                      <p className="text-xs text-[#6B7280] mb-1">{metric.label}</p>
                      <div className="flex items-baseline gap-2">
                        <p className="text-lg font-bold text-[#444]">{metric.value}</p>
                        <div className="flex items-center gap-1 text-[#EF4444]">
                          <TrendingDown className="h-3 w-3" />
                          <span className="text-xs font-semibold">
                            {metric.change}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              {actions && actions.length > 0 && (
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#444]/10">
                  <h4 className="font-semibold text-[#444] mb-3 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-[#10B981]" />
                    즉시 실행 가능한 조치
                  </h4>
                  <div className="space-y-2">
                    {actions.map((action, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className={`w-6 h-6 rounded-full ${config.accentColor} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}>
                          {index + 1}
                        </div>
                        <p className="text-sm text-[#444] flex-1">{action}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
