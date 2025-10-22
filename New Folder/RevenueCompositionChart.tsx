import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { InsightExplanation } from './InsightExplanation';

export function RevenueCompositionChart() {
  const data = [
    { name: '점심(12-14시)', value: 42300000, percentage: 32.9 },
    { name: '저녁(18-21시)', value: 35800000, percentage: 27.9 },
    { name: '오후(14-18시)', value: 28500000, percentage: 22.2 },
    { name: '아침(09-12시)', value: 16400000, percentage: 12.8 },
    { name: '야간(21-22시)', value: 5500000, percentage: 4.2 },
  ];

  const COLORS = ['#2176FF', '#43D8C9', '#8B5CF6', '#F59E0B', '#10B981'];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <PieChartIcon className="h-5 w-5 text-[#2176FF]" />
          시간대별 매출 구성
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
                        {payload[0].payload.month}
                      </p>
                      {payload.map((entry: any, index: number) => (
                        <div key={index} style={{ marginBottom: index < payload.length - 1 ? '4px' : '0' }}>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: entry.color, marginBottom: '2px' }}>
                            {entry.name}
                          </p>
                          <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E1E1E' }}>
                            ₩{entry.value?.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-sm text-[#444]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Top Performers */}
        <div className="mt-4 space-y-2">
          {data.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F7F8FA] transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                <span className="text-sm text-[#444] font-medium">{item.name}</span>
              </div>
              <span className="text-sm font-bold text-[#2176FF]">₩{(item.value / 1000000).toFixed(1)}M</span>
            </div>
          ))}
        </div>

        {/* Friendly Explanation */}
        <div className="mt-4">
          <InsightExplanation
            type="warning"
            compact
            content="점심시간(12-14시)이 하루 매출의 거의 1/3을 만들어요! 이 시간대가 너무 중요하니 직원 배치와 재고 준비를 철저히 하세요. 반면 야간(21-22시)은 4.2%밖에 안되니, 영업시간 조정을 고려해보는 것도 좋겠어요."
          />
        </div>
      </CardContent>
    </Card>
  );
}