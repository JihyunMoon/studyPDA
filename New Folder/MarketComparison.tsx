import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { InsightExplanation } from './InsightExplanation';

interface MarketComparisonProps {
  storeCategory: string;
}

export function MarketComparison({ storeCategory }: MarketComparisonProps) {
  const data = [
    { name: '우리 매장', revenue: 128500000, customers: 3254, avgOrder: 39500 },
    { name: '업종 평균', revenue: 95000000, customers: 2800, avgOrder: 33900 },
    { name: '성수동 평균', revenue: 110000000, customers: 3100, avgOrder: 35500 },
    { name: '상위 25%', revenue: 165000000, customers: 4200, avgOrder: 42300 },
  ];

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <TrendingUp className="h-5 w-5 text-[#2176FF]" />
          시장 비교 분석
        </CardTitle>
        <CardDescription className="text-[#6B7280]">
          {storeCategory} 업종 대비 성과 비교
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" strokeOpacity={0.1} vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              axisLine={{ stroke: '#444', strokeOpacity: 0.1 }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fontSize: 12, fill: '#6B7280', fontWeight: 500 }}
              tickFormatter={(value) => `₩${(value / 1000000)}M`}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid rgba(68, 68, 68, 0.1)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                padding: '12px',
              }}
              formatter={(value: number) => [`₩${value.toLocaleString()}`, '']}
              labelStyle={{ color: '#444', fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
            <Bar 
              dataKey="revenue" 
              fill="#2176FF" 
              radius={[8, 8, 0, 0]}
              name="월 매출"
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Insight Summary */}
        <div className="mt-4 p-4 bg-[#2176FF]/5 rounded-lg border border-[#2176FF]/10">
          <p className="text-sm text-[#444]">
            <span className="font-semibold text-[#2176FF]">우리 매장</span>은 
            업종 평균 대비 <span className="font-semibold text-[#10B981]">35.3% 높은</span> 매출을 기록하고 있으며, 
            상위 25%까지는 <span className="font-semibold">22.1% 차이</span>가 있습니다.
          </p>
        </div>

        {/* Friendly Explanation */}
        <div className="mt-4">
          <InsightExplanation
            type="success"
            title="정말 잘하고 계세요! 🎉"
            content="우리 매장은 성수동 카페 평균(9,500만원)보다 3,350만원이나 더 벌고 있어요. 이미 상위 35%에 들어있습니다! 상위 25%(1억 6,500만원)까지 가려면 앞으로 3,650만원만 더 올리면 돼요. 신규 고객 확보와 마케팅에 조금만 더 힘쓰면 충분히 가능합니다!"
            actionItems={[
              'Instagram 릴스 주 3회 업로드로 신규 고객 150명 유치',
              '리워드 프로그램으로 재방문율 42.8% → 50% 증대',
              '프리미엄 메뉴 개발로 객단가 10% 향상',
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}