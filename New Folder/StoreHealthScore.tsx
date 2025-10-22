import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Heart, TrendingUp, AlertTriangle, CheckCircle2, Activity } from 'lucide-react';

interface StoreHealthScoreProps {
  score: number; // 0-100
  status: 'excellent' | 'good' | 'fair' | 'attention'; // attention instead of "위험"
  metrics: {
    revenue: number; // 0-100
    customers: number; // 0-100
    retention: number; // 0-100
    growth: number; // 0-100
  };
}

export function StoreHealthScore({ score, status, metrics }: StoreHealthScoreProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'excellent':
        return {
          color: '#10B981',
          gradient: 'from-[#10B981] to-[#34D399]',
          bgGradient: 'from-[#10B981]/10 to-[#34D399]/10',
          icon: CheckCircle2,
          title: '매우 건강',
          emoji: '🌟',
          message: '모든 지표가 우수합니다! 현재의 운영 방식을 유지하세요.',
          advice: '지금이 확장을 고려할 좋은 시기입니다.',
        };
      case 'good':
        return {
          color: '#43D8C9',
          gradient: 'from-[#2176FF] to-[#43D8C9]',
          bgGradient: 'from-[#2176FF]/10 to-[#43D8C9]/10',
          icon: TrendingUp,
          title: '건강',
          emoji: '💪',
          message: '전반적으로 양호한 상태입니다. 몇 가지 개선점을 참고하세요.',
          advice: '꾸준한 성장을 위해 고객 만족도에 집중하세요.',
        };
      case 'fair':
        return {
          color: '#F59E0B',
          gradient: 'from-[#F59E0B] to-[#FBBF24]',
          bgGradient: 'from-[#F59E0B]/10 to-[#FBBF24]/10',
          icon: Activity,
          title: '관심 필요',
          emoji: '💡',
          message: '일부 지표가 개선이 필요합니다. 아래 추천사항을 확인하세요.',
          advice: '매출과 고객 유입에 집중적인 노력이 필요합니다.',
        };
      case 'attention':
        return {
          color: '#FF6B6B',
          gradient: 'from-[#FF6B6B] to-[#FFA07A]',
          bgGradient: 'from-[#FF6B6B]/10 to-[#FFA07A]/10',
          icon: Heart,
          title: '적극 관리 필요',
          emoji: '🎯',
          message: '지금 바로 개선 조치를 시작하면 충분히 회복 가능합니다.',
          advice: '전문 컨설팅과 AI 추천사항을 적극 활용하세요.',
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  // Calculate average of metrics
  const avgMetrics = (metrics.revenue + metrics.customers + metrics.retention + metrics.growth) / 4;

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`bg-gradient-to-br ${config.bgGradient} border-b border-[#444]/10`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
                style={{ backgroundColor: config.color }}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">
                  가게 건강도 {config.emoji}
                </CardTitle>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  폐업 위험도 역산 지표
                </p>
              </div>
            </div>
          </div>

          {/* Health Score Circle */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              {/* Background Circle */}
              <svg className="transform -rotate-90 w-24 h-24">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="#E5E7EB"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Progress Circle */}
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke={config.color}
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 251.2' }}
                  animate={{
                    strokeDasharray: `${(score / 100) * 251.2} 251.2`,
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-[#444]">{score}</span>
                <span className="text-xs text-[#9CA3AF]">점</span>
              </div>
            </div>
            <span
              className="text-xs font-semibold mt-2"
              style={{ color: config.color }}
            >
              {config.title}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Message */}
        <div className="mb-6">
          <p className="text-sm text-[#444] leading-relaxed mb-2">
            {config.message}
          </p>
          <p className="text-xs text-[#6B7280] leading-relaxed">
            💡 {config.advice}
          </p>
        </div>

        {/* Metrics Breakdown */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-[#444] mb-3">세부 건강도 지표</p>

          {/* Revenue Health */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7280]">매출 건강도</span>
              <span className="text-xs font-semibold text-[#444]">{metrics.revenue}점</span>
            </div>
            <div className="h-2 bg-[#F7F8FA] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.revenue}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    metrics.revenue >= 70 ? '#10B981' : metrics.revenue >= 50 ? '#F59E0B' : '#FF6B6B',
                }}
              />
            </div>
          </div>

          {/* Customer Health */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7280]">고객 유입 건강도</span>
              <span className="text-xs font-semibold text-[#444]">{metrics.customers}점</span>
            </div>
            <div className="h-2 bg-[#F7F8FA] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.customers}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    metrics.customers >= 70 ? '#10B981' : metrics.customers >= 50 ? '#F59E0B' : '#FF6B6B',
                }}
              />
            </div>
          </div>

          {/* Retention Health */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7280]">고객 충성도 건강도</span>
              <span className="text-xs font-semibold text-[#444]">{metrics.retention}점</span>
            </div>
            <div className="h-2 bg-[#F7F8FA] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.retention}%` }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    metrics.retention >= 70 ? '#10B981' : metrics.retention >= 50 ? '#F59E0B' : '#FF6B6B',
                }}
              />
            </div>
          </div>

          {/* Growth Health */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#6B7280]">성장세 건강도</span>
              <span className="text-xs font-semibold text-[#444]">{metrics.growth}점</span>
            </div>
            <div className="h-2 bg-[#F7F8FA] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metrics.growth}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    metrics.growth >= 70 ? '#10B981' : metrics.growth >= 50 ? '#F59E0B' : '#FF6B6B',
                }}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-6 border-t border-[#444]/10">
          <button
            className={`
              w-full py-3 px-4 rounded-xl font-semibold text-white
              bg-gradient-to-r ${config.gradient}
              hover:opacity-90 transition-opacity
              flex items-center justify-center gap-2
            `}
          >
            <Activity className="h-4 w-4" />
            개선 방안 보기
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
