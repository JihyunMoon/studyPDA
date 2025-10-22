import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Users } from 'lucide-react';
import { InsightExplanation } from './InsightExplanation';

export function CustomerSegmentChart() {
  const data = [
    { name: '30-40대', value: 1891, percentage: 58.2 },
    { name: '20대', value: 813, percentage: 25.0 },
    { name: '50대 이상', value: 358, percentage: 11.0 },
    { name: '10대', value: 192, percentage: 5.8 },
  ];

  const COLORS = ['#2176FF', '#43D8C9', '#8B5CF6', '#F59E0B'];

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`;
  };

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <Users className="h-5 w-5 text-[#2176FF]" />
          고객 연령대 분포
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              label={renderCustomLabel}
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
                        {payload[0].payload.segment}
                      </p>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E1E' }}>
                        {payload[0].value?.toLocaleString()}명
                      </p>
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
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Insights */}
        <div className="mt-4 p-4 bg-[#2176FF]/5 rounded-lg border border-[#2176FF]/10">
          <p className="text-sm text-[#444]">
            <span className="font-semibold text-[#2176FF]">30-40대</span>가 주요 고객층으로 
            전체의 <span className="font-semibold">58.2%</span>를 차지합니다. 
            이 연령대의 객단가는 평균보다 <span className="font-semibold text-[#10B981]">24% 높습니다.</span>
          </p>
        </div>

        {/* Friendly Explanation */}
        <div className="mt-4">
          <InsightExplanation
            type="info"
            compact
            content="우리 매장 손님의 절반 이상이 30-40대예요. 이분들은 평균보다 돈을 24% 더 쓰시는 VIP 고객이니, 이 연령대가 좋아할 프리미엄 메뉴나 서비스를 강화하면 매출이 더 늘어날 거예요! 💰"
          />
        </div>
      </CardContent>
    </Card>
  );
}