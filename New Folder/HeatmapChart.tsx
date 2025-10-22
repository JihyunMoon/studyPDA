import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Calendar } from 'lucide-react';
import { InsightExplanation } from './InsightExplanation';

export function HeatmapChart() {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  const hours = ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];

  // 매출 데이터 (단위: 만원)
  const salesData = [
    [45, 52, 68, 125, 145, 98, 76, 65, 72, 88, 102, 85, 72, 58], // 월
    [48, 55, 72, 132, 152, 105, 82, 68, 78, 92, 108, 88, 75, 62], // 화
    [52, 58, 75, 128, 148, 102, 78, 72, 82, 95, 112, 92, 78, 65], // 수
    [55, 62, 82, 138, 158, 108, 85, 75, 88, 102, 118, 98, 82, 68], // 목
    [58, 68, 88, 145, 168, 115, 92, 82, 95, 108, 125, 105, 88, 72], // 금
    [72, 88, 112, 165, 188, 142, 115, 105, 118, 135, 152, 128, 112, 95], // 토
    [68, 82, 105, 158, 178, 138, 108, 98, 112, 128, 145, 122, 105, 88], // 일
  ];

  const getColor = (value: number) => {
    if (value >= 150) return 'bg-[#2176FF]'; // 매우 높음
    if (value >= 120) return 'bg-[#43D8C9]'; // 높음
    if (value >= 90) return 'bg-[#8B5CF6]'; // 중간
    if (value >= 60) return 'bg-[#F59E0B]'; // 낮음
    return 'bg-[#9CA3AF]'; // 매우 낮음
  };

  const getIntensity = (value: number) => {
    if (value >= 150) return '100';
    if (value >= 120) return '80';
    if (value >= 90) return '60';
    if (value >= 60) return '40';
    return '20';
  };

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <Calendar className="h-5 w-5 text-[#2176FF]" />
          요일·시간대별 매출 히트맵
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* Header - Hours */}
            <div className="flex mb-2">
              <div className="w-12"></div>
              {hours.map((hour) => (
                <div key={hour} className="w-12 text-center">
                  <span className="text-xs text-[#6B7280] font-medium">{hour}시</span>
                </div>
              ))}
            </div>

            {/* Heatmap Grid */}
            {days.map((day, dayIndex) => (
              <div key={day} className="flex mb-1">
                <div className="w-12 flex items-center">
                  <span className="text-sm text-[#444] font-medium">{day}</span>
                </div>
                {salesData[dayIndex].map((value, hourIndex) => (
                  <div
                    key={`${dayIndex}-${hourIndex}`}
                    className="w-12 h-10 mx-0.5 rounded group relative cursor-pointer transition-transform hover:scale-110"
                  >
                    <div
                      className={`w-full h-full rounded ${getColor(value)}`}
                      style={{ opacity: `${getIntensity(value)}%` }}
                    >
                      {/* Tooltip on hover */}
                      <div 
                        className="absolute hidden group-hover:flex flex-col items-center px-4 py-3 rounded-xl shadow-[0_12px_48px_rgba(0,0,0,0.5)] -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap z-[10000]"
                        style={{ 
                          backgroundColor: '#FFFFFF',
                          border: '3px solid #012CED',
                        }}
                      >
                        <span className="text-xs font-semibold text-[#1E1E1E] mb-1">{day} {hours[hourIndex]}시</span>
                        <span className="text-lg font-bold text-[#012CED]">₩{value}만</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-white"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-[#444]/10">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#6B7280]">매출 강도</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#6B7280]">낮음</span>
              <div className="flex gap-1">
                <div className="w-6 h-4 rounded bg-[#9CA3AF] opacity-20"></div>
                <div className="w-6 h-4 rounded bg-[#F59E0B] opacity-40"></div>
                <div className="w-6 h-4 rounded bg-[#8B5CF6] opacity-60"></div>
                <div className="w-6 h-4 rounded bg-[#43D8C9] opacity-80"></div>
                <div className="w-6 h-4 rounded bg-[#2176FF]"></div>
              </div>
              <span className="text-xs text-[#6B7280]">높음</span>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-4 p-4 bg-[#2176FF]/5 rounded-lg border border-[#2176FF]/10">
          <p className="text-sm text-[#444]">
            <span className="font-semibold text-[#2176FF]">주말 12-14시</span>가 가장 높은 매출을 기록하며, 
            평일은 <span className="font-semibold">12-13시, 18-19시</span>에 집중됩니다.
          </p>
        </div>

        {/* Friendly Explanation */}
        <div className="mt-4">
          <InsightExplanation
            type="tip"
            title="사장님, 이렇게 활용하세요!"
            content="색이 진할수록 매출이 높아요. 파란색이 가장 많은 곳이 '황금 시간대'입니다. 주말 점심시간(토,일 12-14시)에 손님이 몰리니 이 시간대 인력 배치를 늘리세요. 반대로 평일 오전(월~금 9-11시)은 손님이 적으니 모닝 세트나 할인 이벤트로 활성화해보세요!"
            actionItems={[
              '주말 점심시간 직원 1명 추가 배치',
              '평일 오전 9-11시 모닝세트 9,900원 특가',
              '월요일 저녁 시간대(18-20시) 2+1 이벤트',
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}