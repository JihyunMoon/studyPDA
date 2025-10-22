import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { InsightExplanation } from './InsightExplanation';

export function RevenueOverview() {
  const data = [
    { date: '10/16', revenue: 3850000, target: 4000000, lastYear: 3200000 },
    { date: '10/17', revenue: 4200000, target: 4000000, lastYear: 3800000 },
    { date: '10/18', revenue: 3920000, target: 4000000, lastYear: 3500000 },
    { date: '10/19', revenue: 4580000, target: 4000000, lastYear: 4100000 },
    { date: '10/20', revenue: 4100000, target: 4000000, lastYear: 3900000 },
    { date: '10/21', revenue: 5200000, target: 4000000, lastYear: 4800000 },
    { date: '10/22', revenue: 4950000, target: 4000000, lastYear: 4500000 },
  ];

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <TrendingUp className="h-5 w-5 text-[#2176FF]" />
          일별 매출 추이
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2176FF" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2176FF" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#43D8C9" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#43D8C9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#6B7280"
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              axisLine={{ stroke: '#444', strokeOpacity: 0.1 }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              tickFormatter={(value) => `₩${(value / 1000000).toFixed(1)}M`}
              axisLine={false}
            />
            <Tooltip
              wrapperStyle={{ zIndex: 10000 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
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
                        {payload[0].payload.date}
                      </p>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E1E' }}>
                        ₩{payload[0].value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#9CA3AF"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="작년 동기"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeDasharray="3 3"
              dot={false}
              name="목표"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#2176FF"
              strokeWidth={3}
              dot={{ fill: '#2176FF', r: 4 }}
              activeDot={{ r: 6, fill: '#2176FF' }}
              name="현재 매출"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#444]/10">
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-1">평균 매출</p>
            <p className="text-sm font-bold text-[#444]">₩4.4M</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-1">목표 달성률</p>
            <p className="text-sm font-bold text-[#10B981]">110%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#6B7280] mb-1">전년 대비</p>
            <p className="text-sm font-bold text-[#2176FF]">+8.3%</p>
          </div>
        </div>

        {/* Friendly Explanation */}
        <div className="mt-4">
          <InsightExplanation
            type="success"
            compact
            content="최근 7일간 매출이 꾸준히 증가하고 있어요! 특히 주말(10/21, 10/22)에 500만원 이상을 기록했네요. 목표(오렌지 점선)를 넘어서고 있으니 이대로만 유지하시면 됩니다. 👍"
          />
        </div>
      </CardContent>
    </Card>
  );
}