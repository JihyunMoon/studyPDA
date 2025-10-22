import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Percent } from 'lucide-react';

interface OverviewMetricsProps {
  timeRange: string;
}

export function OverviewMetrics({ timeRange }: OverviewMetricsProps) {
  const metrics = [
    {
      title: '총 매출액',
      value: '128,450,000',
      displayValue: '1억 2,845만원',
      change: '+8.3%',
      changeValue: '+980만원',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: '거래 건수',
      value: '12,847',
      displayValue: '12,847건',
      change: '+12.1%',
      changeValue: '+1,387건',
      trend: 'up',
      icon: ShoppingCart,
    },
    {
      title: '고객 수',
      value: '3,254',
      displayValue: '3,254명',
      change: '-2.4%',
      changeValue: '-80명',
      trend: 'down',
      icon: Users,
    },
    {
      title: '재방문율',
      value: '42.8',
      displayValue: '42.8%',
      change: '+5.2%',
      changeValue: '+2.1%p',
      trend: 'up',
      icon: Percent,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const TrendIcon = metric.trend === 'up' ? TrendingUp : TrendingDown;
        
        return (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white p-6 hover:shadow-xl transition-all duration-300 border border-[#1A2332]/10">
              {/* Content */}
              <div className="relative">
                {/* Icon Badge */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#0052CC] mb-4 shadow-lg">
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Title */}
                <p className="text-[#5C6B7D] mb-3" style={{ fontSize: '14px', fontWeight: 700 }}>
                  {metric.title}
                </p>

                {/* Main Value - Large */}
                <div className="mb-4">
                  <p className="text-[#1A2332]" style={{ fontSize: '2rem', lineHeight: '2.5rem', fontWeight: '700' }}>
                    {metric.displayValue}
                  </p>
                </div>

                {/* Change Indicator */}
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                    metric.trend === 'up' 
                      ? 'bg-[#10B981]/15 text-[#10B981]' 
                      : 'bg-[#FF9900]/15 text-[#FF9900]'
                  }`}>
                    <TrendIcon className="h-3 w-3" />
                    <span style={{ fontSize: '12px', fontWeight: 700 }}>{metric.change}</span>
                  </div>
                  <span className="text-[#5C6B7D]" style={{ fontSize: '14px' }}>{metric.changeValue}</span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
