import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Cloud } from 'lucide-react';

export function KeywordCloud() {
  const keywords = [
    { text: '브런치', value: 95, color: '#2176FF' },
    { text: '데이트', value: 88, color: '#43D8C9' },
    { text: '감성카페', value: 82, color: '#8B5CF6' },
    { text: '힙한', value: 75, color: '#F59E0B' },
    { text: '외국인', value: 68, color: '#10B981' },
    { text: '인스타', value: 65, color: '#EF4444' },
    { text: '뷰맛집', value: 58, color: '#EC4899' },
    { text: '커피맛집', value: 52, color: '#3B82F6' },
    { text: '디저트', value: 48, color: '#14B8A6' },
    { text: '조용한', value: 42, color: '#F97316' },
    { text: '넓은', value: 38, color: '#06B6D4' },
    { text: '주차', value: 35, color: '#8B5CF6' },
    { text: '반려동물', value: 32, color: '#10B981' },
    { text: '와이파이', value: 28, color: '#6366F1' },
    { text: '콘센트', value: 25, color: '#F59E0B' },
    { text: '루프탑', value: 22, color: '#EF4444' },
    { text: '야경', value: 20, color: '#8B5CF6' },
    { text: '단체석', value: 18, color: '#43D8C9' },
  ];

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <Cloud className="h-5 w-5 text-[#2176FF]" />
          인기 키워드 분석
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-80 flex items-center justify-center bg-[#F7F8FA] rounded-lg p-6 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {keywords.map((keyword, index) => {
              const fontSize = Math.max(12, Math.min(48, keyword.value / 2));
              const opacity = 0.6 + (keyword.value / 200);
              
              return (
                <span
                  key={index}
                  className="inline-block transition-all duration-300 hover:scale-110 cursor-pointer font-semibold"
                  style={{
                    fontSize: `${fontSize}px`,
                    color: keyword.color,
                    opacity,
                    lineHeight: 1.2,
                  }}
                  title={`언급량: ${keyword.value}`}
                >
                  {keyword.text}
                </span>
              );
            })}
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 p-3 bg-[#F7F8FA] rounded-lg">
          <div className="flex items-center justify-between text-xs text-[#6B7280]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#2176FF]"></div>
              <span>높은 빈도</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#43D8C9]"></div>
              <span>중간 빈도</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#9CA3AF]"></div>
              <span>낮은 빈도</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
