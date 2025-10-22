import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface AreaTrendChartProps {
  title: string;
  subtitle?: string;
  data: { month: string; value: number; [key: string]: any }[];
  dataKey?: string;
  color?: string;
  gradientFrom?: string;
  gradientTo?: string;
  showAverage?: boolean;
  unit?: string;
}

export function AreaTrendChart({
  title,
  subtitle,
  data,
  dataKey = 'value',
  color = '#2176FF',
  gradientFrom = '#2176FF',
  gradientTo = '#43D8C9',
  showAverage = true,
  unit = '만원',
}: AreaTrendChartProps) {
  // Calculate average
  const average = data.reduce((sum, item) => sum + item[dataKey], 0) / data.length;
  const max = Math.max(...data.map(item => item[dataKey]));
  const min = Math.min(...data.map(item => item[dataKey]));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#444]">{title}</h3>
            {subtitle && <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>}
          </div>
          {showAverage && (
            <div className="text-right">
              <p className="text-xs text-[#9CA3AF]">평균</p>
              <p className="text-lg font-bold text-[#2176FF]">
                {average.toFixed(1)}{unit}
              </p>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-[#10B981]/10 to-[#34D399]/10 rounded-lg p-3 border border-[#10B981]/20">
            <p className="text-xs text-[#6B7280] mb-1">최고</p>
            <p className="text-lg font-bold text-[#10B981]">
              {max.toLocaleString()}{unit}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#2176FF]/10 to-[#43D8C9]/10 rounded-lg p-3 border border-[#2176FF]/20">
            <p className="text-xs text-[#6B7280] mb-1">평균</p>
            <p className="text-lg font-bold text-[#2176FF]">
              {average.toFixed(1)}{unit}
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#F59E0B]/10 to-[#FBBF24]/10 rounded-lg p-3 border border-[#F59E0B]/20">
            <p className="text-xs text-[#6B7280] mb-1">최저</p>
            <p className="text-lg font-bold text-[#F59E0B]">
              {min.toLocaleString()}{unit}
            </p>
          </div>
        </div>

        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={gradientFrom} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={gradientTo} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
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
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip
                wrapperStyle={{ zIndex: 10000 }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0];
                    return (
                      <div 
                        style={{
                          backgroundColor: '#FFFFFF',
                          border: '3px solid #012CED',
                          borderRadius: '12px',
                          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                          padding: '16px 20px',
                          opacity: 1,
                        }}
                      >
                        <p style={{ color: '#9CA3AF', fontSize: '12px', fontWeight: '500', marginBottom: '8px' }}>
                          {data.payload.month}
                        </p>
                        <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E1E', marginBottom: '4px' }}>
                          {data.value?.toLocaleString()}{unit}
                        </p>
                        {data.payload.count && (
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#012CED' }}>
                            {data.payload.count}건
                          </p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              {showAverage && (
                <ReferenceLine
                  y={average}
                  stroke="#F59E0B"
                  strokeDasharray="5 5"
                  label={{
                    value: '평균',
                    position: 'right',
                    fill: '#F59E0B',
                    fontSize: 12,
                  }}
                />
              )}
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                fill="url(#colorGradient)"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Insight Box */}
        <div className="mt-4 p-4 bg-gradient-to-br from-[#FFFBEB] to-white rounded-lg border border-[#F59E0B]/20">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm">💡</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-[#444] mb-1">트렌드 분석</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                최근 데이터는 평균 대비 {data[data.length - 1][dataKey] > average ? '높은' : '낮은'} 수준입니다.
                {data[data.length - 1][dataKey] > average 
                  ? ' 성장세를 유지하세요!' 
                  : ' 개선이 필요합니다.'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}