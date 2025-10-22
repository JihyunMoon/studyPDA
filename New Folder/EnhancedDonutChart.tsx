import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonutData {
  name: string;
  value: number;
  color: string;
  percentage?: number;
}

interface EnhancedDonutChartProps {
  title: string;
  subtitle?: string;
  data: DonutData[];
  centerLabel?: string;
  centerValue?: string;
  centerSubtext?: string;
}

export function EnhancedDonutChart({ 
  title, 
  subtitle, 
  data, 
  centerLabel = '총계',
  centerValue,
  centerSubtext
}: EnhancedDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const displayValue = centerValue || total.toLocaleString();

  // Calculate percentages
  const dataWithPercentages = data.map(item => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#444]">
          {title}
          {subtitle && <p className="text-sm text-[#6B7280] mt-1 font-normal">{subtitle}</p>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Donut Chart */}
          <div className="relative">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={dataWithPercentages}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dataWithPercentages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  wrapperStyle={{ zIndex: 10000 }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '3px solid #012CED',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
                    padding: '16px 20px',
                    opacity: 1,
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
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
                            {data.name}
                          </p>
                          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#1E1E1E', marginBottom: '4px' }}>
                            {data.value.toLocaleString()}
                          </p>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#012CED' }}>
                            {data.percentage}%
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-xs text-[#9CA3AF] mb-1">{centerLabel}</p>
              <p className="text-2xl font-bold text-[#444]">{displayValue}</p>
              {centerSubtext && (
                <p className="text-xs text-[#6B7280] mt-1">{centerSubtext}</p>
              )}
            </div>
          </div>

          {/* Legend with Values */}
          <div className="space-y-3">
            {dataWithPercentages.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-[#F7F8FA] rounded-lg hover:bg-[#EEEFF1] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-sm shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#444]">{item.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{item.percentage}%</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#444]">
                    {item.value.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}