import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Newspaper, Instagram, Star, TrendingUp } from 'lucide-react';

export function TrendSummaryPanel() {
  const trends = [
    {
      icon: Newspaper,
      category: '뉴스',
      title: '성수동 카페거리, 주말 방문객 30% 증가',
      source: '서울경제',
      time: '2시간 전',
      impact: 'high',
    },
    {
      icon: Instagram,
      category: 'SNS',
      title: '#성수카페 해시태그 최근 1주일간 25,000건 급증',
      source: 'Instagram Analytics',
      time: '4시간 전',
      impact: 'medium',
    },
    {
      icon: Star,
      category: '리뷰',
      title: '브런치 메뉴에 대한 긍정 리뷰 평균 4.7/5.0',
      source: '네이버 플레이스',
      time: '1일 전',
      impact: 'medium',
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20';
      case 'medium':
        return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20';
      case 'low':
        return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20';
      default:
        return 'bg-[#6B7280]/10 text-[#6B7280] border-[#6B7280]/20';
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case 'high':
        return '높음';
      case 'medium':
        return '중간';
      case 'low':
        return '낮음';
      default:
        return '';
    }
  };

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
            <TrendingUp className="h-5 w-5 text-[#2176FF]" />
            실시간 트렌드 요약
          </CardTitle>
          <Badge variant="secondary" className="bg-[#43D8C9]/10 text-[#43D8C9] border border-[#43D8C9]/20">
            실시간
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {trends.map((trend, index) => {
          const Icon = trend.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F7F8FA] transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2176FF]/10 to-[#43D8C9]/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Icon className="h-5 w-5 text-[#2176FF]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs px-2 py-0 border-[#444]/10">
                    {trend.category}
                  </Badge>
                  <Badge variant="outline" className={`text-xs px-2 py-0 border ${getImpactColor(trend.impact)}`}>
                    영향도 {getImpactLabel(trend.impact)}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-[#444] line-clamp-2 group-hover:text-[#2176FF] transition-colors">
                  {trend.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#9CA3AF]">
                  <span>{trend.source}</span>
                  <span>•</span>
                  <span>{trend.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
