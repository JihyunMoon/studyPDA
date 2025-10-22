import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface SegmentData {
  category: string;
  segments: {
    label: string;
    value: number;
    color: string;
  }[];
  total?: number;
}

interface SegmentedBarChartProps {
  title: string;
  subtitle?: string;
  data: SegmentData[];
}

export function SegmentedBarChart({ title, subtitle, data }: SegmentedBarChartProps) {
  // Calculate max total for scaling
  const maxTotal = Math.max(...data.map(item => 
    item.total || item.segments.reduce((sum, seg) => sum + seg.value, 0)
  ));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold text-[#444]">{title}</CardTitle>
        {subtitle && <p className="text-sm text-[#6B7280] mt-1">{subtitle}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#444]/10">
            {data[0]?.segments.map((segment, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-xs text-[#6B7280] font-medium">{segment.label}</span>
              </div>
            ))}
          </div>

          {/* Bars */}
          <div className="space-y-3">
            {data.map((item, index) => {
              const total = item.total || item.segments.reduce((sum, seg) => sum + seg.value, 0);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-2"
                >
                  {/* Category Label */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#444]">{item.category}</span>
                    <span className="text-xs text-[#9CA3AF]">{total.toLocaleString()}명</span>
                  </div>

                  {/* Segmented Bar */}
                  <div className="relative">
                    <div className="flex gap-1">
                      {item.segments.map((segment, segIdx) => {
                        const segmentWidth = (segment.value / maxTotal) * 100;
                        
                        return (
                          <motion.div
                            key={segIdx}
                            initial={{ width: 0 }}
                            animate={{ width: `${segmentWidth}%` }}
                            transition={{ delay: index * 0.05 + segIdx * 0.1, duration: 0.5 }}
                            className="h-8 rounded-md flex items-center justify-center relative group cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ backgroundColor: segment.color }}
                          >
                            {/* Value Label (show if wide enough) */}
                            {segmentWidth > 8 && (
                              <span className="text-xs font-bold text-white">
                                {segment.value.toLocaleString()}
                              </span>
                            )}

                            {/* Tooltip on hover */}
                            <div 
                              className="absolute -top-14 left-1/2 -translate-x-1/2 text-xs py-3 px-4 rounded-xl shadow-[0_12px_48px_rgba(0,0,0,0.5)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[10000] flex flex-col items-center"
                              style={{ 
                                backgroundColor: '#FFFFFF',
                                border: '3px solid #012CED',
                              }}
                            >
                              <span className="font-semibold text-[#1E1E1E] mb-1">{segment.label}</span>
                              <span className="text-lg text-[#012CED] font-bold">{segment.value.toLocaleString()}명</span>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white" />
                            </div>

                            {/* Value label (show small values outside) */}
                            {segmentWidth <= 8 && segment.value > 0 && (
                              <span className="absolute -right-8 text-xs font-semibold text-[#6B7280]">
                                {segment.value}
                              </span>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}