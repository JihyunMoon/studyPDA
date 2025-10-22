import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Clock, Zap, Users, TrendingUp, AlertCircle, Star } from 'lucide-react';

export function QuickInsights() {
  const insights = [
    {
      icon: Clock,
      title: '피크 시간',
      value: '12:00 - 14:00',
      subtitle: '전체 매출의 32.9%',
    },
    {
      icon: Zap,
      title: '인기 결제',
      value: '신한카드',
      subtitle: '거래의 45.2%',
    },
    {
      icon: Users,
      title: '주요 고객층',
      value: '30-40대',
      subtitle: '매출 기여도 58%',
    },
    {
      icon: TrendingUp,
      title: '성장 트렌드',
      value: '상승세',
      subtitle: '3개월 연속 증가',
    },
    {
      icon: Star,
      title: '베스트 상품',
      value: '시그니처 메뉴',
      subtitle: '주문의 38%',
    },
    {
      icon: AlertCircle,
      title: '주의 필요',
      value: '신규 고객 감소',
      subtitle: '-2.4% (개선 필요)',
    },
  ];

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-[#1A2332]" style={{ fontSize: '14px', fontWeight: 700 }}>빠른 인사이트</h3>
        <p className="text-[#5C6B7D]">한눈에 보는 핵심 지표</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 border border-[#1A2332]/10 bg-white">
                <CardContent className="p-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#0052CC] mb-3 shadow-lg">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <p className="text-[#5C6B7D] mb-1" style={{ fontSize: '12px' }}>{insight.title}</p>
                  <p className="text-[#1A2332] mb-1" style={{ fontSize: '14px', fontWeight: 700 }}>{insight.value}</p>
                  <p className="text-[#5C6B7D]" style={{ fontSize: '11px' }}>{insight.subtitle}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}