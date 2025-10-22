import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

export function SummaryTab() {
  const weeklyData = [
    { week: '1주', revenue: 28500000, transactions: 2847 },
    { week: '2주', revenue: 31200000, transactions: 3123 },
    { week: '3주', revenue: 29800000, transactions: 2956 },
    { week: '4주', revenue: 38950000, transactions: 3921 },
  ];

  const keyInsights = [
    {
      type: 'success',
      icon: CheckCircle,
      title: '매출 성장 우수',
      description: '이번 달 매출이 전월 대비 8.3% 증가하여 목표를 초과 달성했습니다.',
      color: 'green',
    },
    {
      type: 'warning',
      icon: AlertTriangle,
      title: '신규 고객 감소 주의',
      description: '신규 고객이 2.4% 감소했습니다. SNS 마케팅 강화가 필요합니다.',
      color: 'amber',
    },
    {
      type: 'info',
      icon: TrendingUp,
      title: '재방문율 증가',
      description: '고객 재방문율이 42.8%로 업종 평균(38.5%)을 상회하고 있습니다.',
      color: 'blue',
    },
    {
      type: 'success',
      icon: Zap,
      title: '점심 시간대 강세',
      description: '12-14시 매출이 전체의 32.9%를 차지하여 가장 높은 비중을 보입니다.',
      color: 'purple',
    },
  ];

  const performanceMetrics = [
    { metric: '매출 목표 달성률', value: 85.6, target: 100, status: 'good' },
    { metric: '신규 고객 목표', value: 73.7, target: 100, status: 'warning' },
    { metric: '재방문율 목표', value: 85.6, target: 100, status: 'good' },
    { metric: '고객 만족도', value: 92.0, target: 100, status: 'excellent' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50';
      case 'good': return 'text-blue-600 bg-blue-50';
      case 'warning': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Alert className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <Info className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>종합 평가:</strong> 귀하의 점포는 성동구 동종업 대비 <strong className="text-blue-600">상위 35%</strong>에 위치하고 있으며, 
            전반적인 경영 상태는 <strong className="text-blue-600">"양호"</strong> 수준입니다. 
            신규 고객 유입 개선 시 더욱 성장 가능합니다.
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Key Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyInsights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-2 border-${insight.color}-200 bg-${insight.color}-50/50 hover:shadow-lg transition-shadow`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${insight.color}-100`}>
                      <Icon className={`h-5 w-5 text-${insight.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-${insight.color}-900 mb-1`}>{insight.title}</h4>
                      <p className="text-slate-700">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Performance Chart */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle>주간 매출 현황</CardTitle>
          <CardDescription>이번 달 주차별 매출 및 거래 건수</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="summaryRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `₩${(value / 1000000).toFixed(0)}M`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value: number) => [`₩${value.toLocaleString()}`, '매출']}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#summaryRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-4 gap-3 mt-4">
            <div className="p-3 bg-blue-50 rounded-xl text-center">
              <p className="text-blue-600 mb-1">1주차</p>
              <p className="text-blue-900">₩28.5M</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-center">
              <p className="text-green-600 mb-1">2주차</p>
              <p className="text-green-900">₩31.2M</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-center">
              <p className="text-purple-600 mb-1">3주차</p>
              <p className="text-purple-900">₩29.8M</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-center border-2 border-amber-300">
              <p className="text-amber-600 mb-1">4주차</p>
              <p className="text-amber-900">₩39.0M</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle>목표 달성 현황</CardTitle>
          <CardDescription>주요 KPI 달성률</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceMetrics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-700">{item.metric}</span>
                  <span className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className={`h-full ${
                      item.status === 'excellent' ? 'bg-green-500' :
                      item.status === 'good' ? 'bg-blue-500' :
                      item.status === 'warning' ? 'bg-amber-500' : 'bg-slate-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
        <CardHeader>
          <CardTitle>추천 액션 아이템</CardTitle>
          <CardDescription>즉시 실행 가능한 개선 방안</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-slate-900">주말 오전 시간대(10-12시) 특별 프로모션 운영</p>
                <p className="text-slate-600">예상 매출 증대: +15%</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-slate-900">인스타그램 광고를 통한 신규 고객 유입 확대</p>
                <p className="text-slate-600">타겟: 성수동 방문객 20-30대</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg border border-indigo-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-slate-900">단골 고객 대상 멤버십 프로그램 도입</p>
                <p className="text-slate-600">재방문율 목표: 50% (현재 42.8%)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
