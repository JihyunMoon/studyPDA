import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export function RetentionMetrics() {
  const retentionTrend = [
    { month: '2024-01', retention: 38.5, newCustomers: 245, returningCustomers: 856 },
    { month: '2024-02', retention: 41.2, newCustomers: 267, returningCustomers: 923 },
    { month: '2024-03', retention: 43.8, newCustomers: 289, returningCustomers: 1045 },
    { month: '2024-04', retention: 40.5, newCustomers: 221, returningCustomers: 978 },
    { month: '2024-05', retention: 42.1, newCustomers: 256, returningCustomers: 1012 },
    { month: '2024-06', retention: 42.8, newCustomers: 273, returningCustomers: 1087 },
  ];

  const customerSegments = [
    { segment: '신규 고객 (1회)', count: 1842, percentage: 56.6, avgSpend: 12500, trend: 'down' },
    { segment: '재방문 고객 (2-5회)', count: 892, percentage: 27.4, avgSpend: 18900, trend: 'up' },
    { segment: '단골 고객 (6-10회)', count: 356, percentage: 10.9, avgSpend: 24500, trend: 'up' },
    { segment: 'VIP 고객 (11회 이상)', count: 164, percentage: 5.1, avgSpend: 35200, trend: 'up' },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-slate-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Retention Trend */}
      <Card>
        <CardHeader>
          <CardTitle>재방문율 추이</CardTitle>
          <CardDescription>월별 재방문 고객 비율 변화</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={retentionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" label={{ value: '재방문율 (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="retention"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                name="재방문율 (%)"
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-900">
              재방문율이 <strong>38.5%에서 42.8%로 11.2% 증가</strong>하여 고객 충성도가 개선되고 있습니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Customer Acquisition vs Retention */}
      <Card>
        <CardHeader>
          <CardTitle>신규 vs 재방문 고객</CardTitle>
          <CardDescription>고객 유형별 거래 추이</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={retentionTrend}>
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="newCustomers"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorNew)"
                name="신규 고객"
              />
              <Area
                type="monotone"
                dataKey="returningCustomers"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorReturning)"
                name="재방문 고객"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Segments */}
      <Card>
        <CardHeader>
          <CardTitle>고객 세그먼트 분석</CardTitle>
          <CardDescription>방문 횟수별 고객 분포 및 평균 구매액</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {customerSegments.map((segment, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-slate-900">{segment.segment}</h4>
                    {getTrendIcon(segment.trend)}
                  </div>
                  <span className="text-slate-600">{segment.percentage}%</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <p className="text-slate-600">고객 수</p>
                    <p className="text-slate-900">{segment.count.toLocaleString()}명</p>
                  </div>
                  <div>
                    <p className="text-slate-600">평균 구매액</p>
                    <p className="text-slate-900">₩{segment.avgSpend.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-600">전체 기여도</p>
                    <p className="text-slate-900">{segment.percentage}%</p>
                  </div>
                </div>
                <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${segment.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-blue-900 mb-2">핵심 인사이트</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• VIP 고객(5.1%)이 전체 매출의 <strong>약 28%</strong>를 차지</li>
              <li>• 신규 고객의 재방문 전환율 향상이 최우선 과제</li>
              <li>• 단골 고객의 객단가가 신규 대비 <strong>2.8배 높음</strong></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
