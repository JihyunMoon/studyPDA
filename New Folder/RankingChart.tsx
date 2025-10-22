import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown, Medal } from 'lucide-react';

interface RankingItem {
  rank: number;
  name: string;
  value: number;
  maxValue: number;
  trend?: number;
}

interface RankingChartProps {
  title: string;
  subtitle?: string;
  data: RankingItem[];
  unit?: string;
  highlightTop?: number; // 상위 N개 강조
}

export function RankingChart({ title, subtitle, data, unit = '건', highlightTop = 3 }: RankingChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#444]">{title}</h3>
            {subtitle && <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>}
          </div>
          <div className="text-xs text-[#9CA3AF]">클릭하여 상세보기</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => {
            const isTopRank = item.rank <= highlightTop;
            const percentage = (item.value / item.maxValue) * 100;

            return (
              <motion.div
                key={item.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  {/* Rank Badge */}
                  <div
                    className={`
                      w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0
                      ${isTopRank 
                        ? 'bg-gradient-to-br from-[#2176FF] to-[#43D8C9] text-white shadow-md' 
                        : 'bg-[#F7F8FA] text-[#6B7280]'
                      }
                    `}
                  >
                    {item.rank <= 3 ? (
                      <Medal className="h-4 w-4" />
                    ) : (
                      item.rank
                    )}
                  </div>

                  {/* Name and Value */}
                  <div className="flex-1 flex items-center justify-between">
                    <span className={`font-semibold ${isTopRank ? 'text-[#444]' : 'text-[#6B7280]'}`}>
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isTopRank ? 'text-[#2176FF]' : 'text-[#444]'}`}>
                        {item.value.toLocaleString()}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">{unit}</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="ml-10 relative">
                  <div className="h-2.5 bg-[#F7F8FA] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.6 }}
                      className={`
                        h-full rounded-full
                        ${isTopRank 
                          ? 'bg-gradient-to-r from-[#2176FF] to-[#43D8C9]' 
                          : 'bg-[#E5E7EB]'
                        }
                        group-hover:shadow-lg transition-shadow
                      `}
                    />
                  </div>

                  {/* Trend Indicator */}
                  {item.trend !== undefined && (
                    <div className="absolute -right-12 top-0 flex items-center gap-1">
                      {item.trend > 0 ? (
                        <TrendingUp className="h-3 w-3 text-[#10B981]" />
                      ) : (
                        <TrendingDown className="h-3 w-3 text-[#EF4444]" />
                      )}
                      <span className={`text-xs font-semibold ${item.trend > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {Math.abs(item.trend)}%
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
