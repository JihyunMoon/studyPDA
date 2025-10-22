import { motion } from 'motion/react';
import { Lightbulb, TrendingUp, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface InsightExplanationProps {
  type?: 'success' | 'warning' | 'info' | 'tip';
  title?: string;
  content: string;
  actionItems?: string[];
  compact?: boolean;
}

export function InsightExplanation({ 
  type = 'info', 
  title, 
  content, 
  actionItems,
  compact = false 
}: InsightExplanationProps) {
  const getConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: CheckCircle,
          bg: 'bg-[#10B981]/5',
          border: 'border-[#10B981]',
          iconColor: 'text-[#10B981]',
          titleColor: 'text-[#10B981]',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bg: 'bg-[#F59E0B]/5',
          border: 'border-[#F59E0B]',
          iconColor: 'text-[#F59E0B]',
          titleColor: 'text-[#F59E0B]',
        };
      case 'tip':
        return {
          icon: Lightbulb,
          bg: 'bg-[#2176FF]/5',
          border: 'border-[#2176FF]',
          iconColor: 'text-[#2176FF]',
          titleColor: 'text-[#2176FF]',
        };
      default:
        return {
          icon: Info,
          bg: 'bg-[#43D8C9]/5',
          border: 'border-[#43D8C9]',
          iconColor: 'text-[#43D8C9]',
          titleColor: 'text-[#43D8C9]',
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`${config.bg} rounded-lg p-3 border-l-4 ${config.border}`}
      >
        <div className="flex items-start gap-2">
          <Icon className={`h-4 w-4 ${config.iconColor} flex-shrink-0 mt-0.5`} />
          <p className="text-sm text-[#444] leading-relaxed">{content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${config.bg} rounded-lg p-5 border-l-4 ${config.border}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-6 w-6 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-bold mb-2 ${config.titleColor}`}>
              {title}
            </h4>
          )}
          <p className="text-sm text-[#444] leading-relaxed mb-3">
            {content}
          </p>
          
          {actionItems && actionItems.length > 0 && (
            <div className="space-y-1.5 mt-3 pt-3 border-t border-[#444]/10">
              <p className="text-xs font-semibold text-[#6B7280] mb-2">💡 실행 가능한 조치:</p>
              {actionItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2176FF] mt-1.5 flex-shrink-0"></div>
                  <p className="text-sm text-[#444]">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
