import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ThreeDIcon } from './ThreeDIcon';
import { TrendingUp, Sparkles } from 'lucide-react';

interface InsightSpotlightProps {
  title: string;
  description: string;
  impact: {
    label: string;
    value: string;
    subtext?: string;
  };
  recommendation: string;
  potentialGain?: string;
}

export function InsightSpotlight({ 
  title, 
  description, 
  impact, 
  recommendation,
  potentialGain 
}: InsightSpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-2 border-[#FFD700]/30 shadow-[0_0_40px_rgba(255,215,0,0.15)] overflow-hidden bg-gradient-to-br from-[#FFFBEB] via-white to-[#FEF3C7]">
        {/* Golden glow bar */}
        <div className="h-2 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] animate-pulse" />
        
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
            {/* Left: 3D Icon */}
            <div className="flex flex-col items-center gap-4">
              <ThreeDIcon type="insight" size="lg" />
              <div className="text-center">
                <p className="text-xs font-semibold text-[#F59E0B] uppercase tracking-wider">
                  중요 인사이트
                </p>
                <div className="flex items-center gap-1 mt-1 justify-center">
                  <Sparkles className="h-3 w-3 text-[#FFD700]" />
                  <Sparkles className="h-4 w-4 text-[#FFD700]" />
                  <Sparkles className="h-3 w-3 text-[#FFD700]" />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h3 className="text-2xl font-bold text-[#444] mb-2">
                  {title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Impact Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl blur-xl" />
                <div className="relative bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-[#FFD700]/30 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-[#6B7280] mb-1">{impact.label}</p>
                      <div className="flex items-baseline gap-3">
                        <h4 className="text-3xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#D97706] bg-clip-text text-transparent">
                          {impact.value}
                        </h4>
                        {impact.subtext && (
                          <span className="text-sm text-[#6B7280]">{impact.subtext}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-[#444]/10">
                <h4 className="font-semibold text-[#444] mb-2 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2176FF] to-[#43D8C9] flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                  AI 추천 전략
                </h4>
                <p className="text-sm text-[#444] leading-relaxed">
                  {recommendation}
                </p>
              </div>

              {/* Potential Gain */}
              {potentialGain && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#10B981]/10 to-[#34D399]/10 rounded-lg border border-[#10B981]/20">
                  <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center shadow-md">
                    <span className="text-white font-bold">💰</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280]">예상 수익 증대</p>
                    <p className="text-lg font-bold text-[#10B981]">{potentialGain}</p>
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
