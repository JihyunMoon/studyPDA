import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { AlertCircle, TrendingDown, Shield, Lightbulb } from 'lucide-react';

interface ClosureRiskPredictionProps {
  currentRisk: number; // 0-100 (낮을수록 좋음)
  projectedRisk: { month: string; risk: number }[];
  contributingFactors: {
    factor: string;
    impact: number; // 0-100
    status: 'good' | 'warning' | 'danger';
  }[];
}

export function ClosureRiskPrediction({
  currentRisk,
  projectedRisk,
  contributingFactors,
}: ClosureRiskPredictionProps) {
  const riskLevel = currentRisk <= 20 ? 'low' : currentRisk <= 50 ? 'medium' : 'high';

  const riskConfig = {
    low: {
      color: '#10B981',
      bgColor: 'from-[#10B981]/10 to-[#34D399]/10',
      title: '매우 안전',
      icon: Shield,
      message: '폐업 위험이 매우 낮습니다. 현재 운영을 유지하세요!',
    },
    medium: {
      color: '#F59E0B',
      bgColor: 'from-[#F59E0B]/10 to-[#FBBF24]/10',
      title: '주의 관찰',
      icon: AlertCircle,
      message: '일부 개선이 필요합니다. 지금 조치하면 안전합니다.',
    },
    high: {
      color: '#FF6B6B',
      bgColor: 'from-[#FF6B6B]/10 to-[#FFA07A]/10',
      title: '적극 개선',
      icon: TrendingDown,
      message: '즉시 개선 조치를 시작하면 충분히 회복 가능합니다.',
    },
  };

  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  // Transform contributing factors for radar chart
  const radarData = contributingFactors.map((factor) => ({
    factor: factor.factor,
    value: 100 - factor.impact, // Invert so higher is better on radar
    fullMark: 100,
  }));

  return (
    <Card>
      <CardHeader className={`bg-gradient-to-br ${config.bgColor} border-b border-[#444]/10`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: config.color }}
            >
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#444]">폐업 위험도 예측</h3>
              <p className="text-xs text-[#6B7280] mt-0.5">
                AI 기반 6개월 예측 분석
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#9CA3AF]">현재 위험도</p>
            <p className="text-2xl font-bold" style={{ color: config.color }}>
              {currentRisk}%
            </p>
            <p className="text-xs font-semibold" style={{ color: config.color }}>
              {config.title}
            </p>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Message */}
        <div className="p-4 bg-gradient-to-br from-[#FFFBEB] to-white rounded-lg border border-[#F59E0B]/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#444] mb-1">
                {config.message}
              </p>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                아래 그래프는 현재 추세가 유지될 경우의 예측입니다. 개선 조치를 시작하면 즉시 개선됩니다.
              </p>
            </div>
          </div>
        </div>

        {/* 6-Month Projection Chart */}
        <div>
          <h4 className="text-sm font-semibold text-[#444] mb-4">향후 6개월 위험도 추이</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={projectedRisk} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                tickLine={false}
              />
              <YAxis
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const risk = payload[0].value as number;
                    return (
                      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-[#444]/10">
                        <p className="text-xs text-[#9CA3AF] mb-1">{payload[0].payload.month}</p>
                        <p className="text-lg font-bold text-[#444]">
                          위험도 {risk}%
                        </p>
                        <p className="text-xs text-[#6B7280] mt-1">
                          {risk <= 20 ? '안전' : risk <= 50 ? '주의' : '위험'}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {/* Safe Zone Reference */}
              <ReferenceLine
                y={20}
                stroke="#10B981"
                strokeDasharray="5 5"
                label={{
                  value: '안전 구간',
                  position: 'right',
                  fill: '#10B981',
                  fontSize: 12,
                }}
              />
              {/* Warning Zone Reference */}
              <ReferenceLine
                y={50}
                stroke="#F59E0B"
                strokeDasharray="5 5"
                label={{
                  value: '주의 구간',
                  position: 'right',
                  fill: '#F59E0B',
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#2176FF"
                strokeWidth={3}
                dot={{ fill: '#2176FF', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Contributing Factors - Radar Chart */}
        <div>
          <h4 className="text-sm font-semibold text-[#444] mb-4">위험 요인 분석</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Chart */}
            <div className="flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid 
                      stroke="#D1D5DB" 
                      strokeWidth={1.5}
                    />
                    <PolarAngleAxis
                      dataKey="factor"
                      style={{ fontSize: '12px', fill: '#374151', fontWeight: '600' }}
                      tick={{ fill: '#374151' }}
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      style={{ fontSize: '11px', fill: '#9CA3AF' }}
                      tickCount={6}
                      stroke="#E5E7EB"
                    />
                    {/* Background Radar (for comparison) */}
                    <Radar
                      name="기준선"
                      dataKey="fullMark"
                      stroke="#E5E7EB"
                      fill="#F3F4F6"
                      fillOpacity={0.2}
                      strokeWidth={0}
                    />
                    {/* Main Radar */}
                    <Radar
                      name="건강도"
                      dataKey="value"
                      stroke="#2176FF"
                      fill="#43D8C9"
                      fillOpacity={0.5}
                      strokeWidth={3}
                      dot={{ fill: '#2176FF', r: 5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7, strokeWidth: 3 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white px-4 py-3 rounded-lg shadow-xl border-2 border-[#2176FF]/30">
                              <p className="text-xs text-[#9CA3AF] mb-1">{payload[0].payload.factor}</p>
                              <p className="font-bold text-[#2176FF]">
                                건강도 {payload[0].value}점
                              </p>
                              <p className="text-xs text-[#6B7280] mt-1">
                                {payload[0].value >= 70 ? '✅ 양호' : payload[0].value >= 50 ? '⚠️ 주의' : '🚨 개선 필요'}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Simple Interpretation */}
              <div className="mt-4 p-4 bg-gradient-to-br from-[#2176FF]/5 to-[#43D8C9]/5 rounded-lg border border-[#2176FF]/20">
                <h5 className="text-xs font-semibold text-[#444] mb-2">📊 종합 진단</h5>
                <div className="space-y-1.5">
                  {(() => {
                    const avgScore = (contributingFactors.reduce((sum, f) => sum + f.impact, 0) / contributingFactors.length);
                    const weakPoints = contributingFactors.filter(f => f.status !== 'good');
                    const strongPoints = contributingFactors.filter(f => f.status === 'good');
                    
                    return (
                      <>
                        <p className="text-xs text-[#6B7280] leading-relaxed">
                          <span className="font-semibold text-[#10B981]">강점 {strongPoints.length}개</span>, {' '}
                          <span className="font-semibold text-[#F59E0B]">개선 필요 {weakPoints.length}개</span>
                        </p>
                        {weakPoints.length > 0 && (
                          <p className="text-xs text-[#6B7280] leading-relaxed">
                            💡 <span className="font-semibold text-[#444]">{weakPoints[0].factor}</span>부터 개선 시작
                          </p>
                        )}
                        <p className="text-xs text-[#2176FF] font-semibold mt-2">
                          {avgScore >= 70 ? '✨ 전반적으로 우수합니다!' : avgScore >= 50 ? '👍 양호한 수준입니다.' : '💪 개선 여지가 많습니다.'}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Factors List */}
            <div className="space-y-3">
              {contributingFactors.map((factor, index) => {
                const statusConfig = {
                  good: { color: '#10B981', bg: '#10B981', label: '양호' },
                  warning: { color: '#F59E0B', bg: '#F59E0B', label: '주의' },
                  danger: { color: '#FF6B6B', bg: '#FF6B6B', label: '위험' },
                };
                const status = statusConfig[factor.status];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-[#F7F8FA] rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#444]">{factor.factor}</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${status.bg}20`,
                          color: status.color,
                        }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${factor.impact}%`,
                            backgroundColor: status.bg,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#9CA3AF] w-12 text-right">
                        영향 {factor.impact}%
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interpretation */}
        <div className="p-4 bg-gradient-to-br from-[#2176FF]/5 to-[#43D8C9]/5 rounded-lg border border-[#2176FF]/10">
          <h4 className="text-sm font-semibold text-[#444] mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#2176FF]" />
            해석 가이드
          </h4>
          <ul className="text-xs text-[#6B7280] space-y-1.5 leading-relaxed">
            <li>• <strong className="text-[#444]">0-20%</strong>: 매우 안전. 현재 운영 방식 유지</li>
            <li>• <strong className="text-[#444]">21-50%</strong>: 주의 필요. 일부 지표 개선 권장</li>
            <li>• <strong className="text-[#444]">51-100%</strong>: 적극 개선. 즉시 조치 시작 시 회복 가능</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}