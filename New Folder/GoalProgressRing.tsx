import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Target } from 'lucide-react';

interface GoalProgressRingProps {
  title: string;
  current: number;
  target: number;
  unit?: string;
}

export function GoalProgressRing({ title, current, target, unit = '원' }: GoalProgressRingProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const radius = 70;
  const strokeWidth = 12;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (percentage >= 100) return '#10B981';
    if (percentage >= 80) return '#43D8C9';
    if (percentage >= 60) return '#2176FF';
    if (percentage >= 40) return '#F59E0B';
    return '#EF4444';
  };

  const getLabel = () => {
    if (percentage >= 100) return '목표 달성!';
    if (percentage >= 80) return '거의 달성';
    if (percentage >= 60) return '순조로움';
    if (percentage >= 40) return '노력 필요';
    return '주의 필요';
  };

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <Target className="h-5 w-5 text-[#2176FF]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Progress Ring */}
          <div className="relative">
            <svg height={radius * 2} width={radius * 2}>
              {/* Background circle */}
              <circle
                stroke="#F7F8FA"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress circle */}
              <circle
                stroke={getColor()}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                style={{
                  strokeDashoffset,
                  transform: 'rotate(-90deg)',
                  transformOrigin: '50% 50%',
                  transition: 'stroke-dashoffset 0.5s ease-in-out',
                  strokeLinecap: 'round',
                }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-[#444]">{percentage.toFixed(0)}%</span>
              <span className="text-xs text-[#6B7280] mt-1">{getLabel()}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full mt-6 space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#F7F8FA] rounded-lg">
              <span className="text-sm text-[#6B7280]">현재</span>
              <span className="text-sm font-bold text-[#444]">
                {unit === '원' ? `₩${current.toLocaleString()}` : `${current.toLocaleString()}${unit}`}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F7F8FA] rounded-lg">
              <span className="text-sm text-[#6B7280]">목표</span>
              <span className="text-sm font-bold text-[#444]">
                {unit === '원' ? `₩${target.toLocaleString()}` : `${target.toLocaleString()}${unit}`}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-[#F7F8FA] rounded-lg">
              <span className="text-sm text-[#6B7280]">남은 목표</span>
              <span className="text-sm font-bold" style={{ color: getColor() }}>
                {unit === '원' 
                  ? `₩${Math.max(0, target - current).toLocaleString()}` 
                  : `${Math.max(0, target - current).toLocaleString()}${unit}`
                }
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
