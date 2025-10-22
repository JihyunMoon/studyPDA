import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Sparkles, AlertTriangle, TrendingUp, Lightbulb, RefreshCw } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface AIInsightsProps {
  storeName: string;
  storeCategory: string;
}

export function AIInsights({ storeName, storeCategory }: AIInsightsProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock AI insights - In production, this would call Gemini API
  const insights = {
    status: 'warning',
    summary: `${storeName}의 현재 경영 상태는 "주의 필요" 단계입니다. 매출은 증가하고 있으나 고객 수 감소가 우려됩니다.`,
    keyFindings: [
      {
        type: 'warning',
        title: '고객 감소 추세',
        description: '신규 고객 유입이 전년 대비 2.4% 감소했습니다. 마케팅 강화가 필요합니다.',
      },
      {
        type: 'positive',
        title: '고객당 매출 증가',
        description: '재방문 고객의 평균 구매액이 18% 증가하여 충성 고객층이 견고합니다.',
      },
      {
        type: 'info',
        title: '성수 지역 특성',
        description: '성수동은 최근 3년간 카페 업종이 47% 증가했으며, 경쟁이 심화되고 있습니다.',
      },
    ],
    strategies: [
      '주말 오전 시간대(10-12시) 특별 프로모션으로 신규 고객 유치',
      'SNS 마케팅 강화 - 성수동 방문객 타겟 인스타그램 광고 추천',
      '단골 고객 대상 멤버십/스탬프 프로그램 도입',
      '점심 시간대 매출이 약한 점을 고려한 런치 세트 메뉴 개발',
    ],
    districtInsight: '성동구 내 동일 업종 평균 대비 귀하의 점포는 상위 35%에 위치하고 있습니다.',
  };

  const handleGenerateInsights = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 mb-6">
      <Card className="border-2 border-blue-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-900">AI 경영 인사이트</CardTitle>
            </div>
            <Button 
              onClick={handleGenerateInsights} 
              disabled={isGenerating}
              size="sm"
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
              {isGenerating ? '분석 중...' : '재분석'}
            </Button>
          </div>
          <CardDescription>
            Google Gemini가 귀하의 매출 데이터를 분석한 맞춤형 전략을 제공합니다
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {isGenerating ? (
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Status Summary */}
              <Alert className="border-amber-300 bg-amber-50">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-900">
                  {insights.summary}
                </AlertDescription>
              </Alert>

              {/* Key Findings */}
              <div>
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  주요 발견 사항
                </h3>
                <div className="space-y-3">
                  {insights.keyFindings.map((finding, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        finding.type === 'warning'
                          ? 'bg-red-50 border-red-200'
                          : finding.type === 'positive'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <p
                        className={`${
                          finding.type === 'warning'
                            ? 'text-red-900'
                            : finding.type === 'positive'
                            ? 'text-green-900'
                            : 'text-blue-900'
                        }`}
                      >
                        {finding.title}
                      </p>
                      <p className="text-slate-700 mt-1">{finding.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Strategies */}
              <div>
                <h3 className="text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                  추천 경영 전략
                </h3>
                <div className="space-y-2">
                  {insights.strategies.map((strategy, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                      <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white">
                        {idx + 1}
                      </span>
                      <p className="text-slate-700">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* District Comparison */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <p className="text-blue-900">
                  <strong>성동구 업종 비교:</strong> {insights.districtInsight}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* API Configuration Note */}
      <Alert>
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>개발자 참고:</strong> Gemini API 연동 시 환경 변수에 API 키를 설정하세요.
          현재는 샘플 데이터로 표시됩니다.
        </AlertDescription>
      </Alert>
    </div>
  );
}
