import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Lightbulb } from 'lucide-react';

export function ExecutiveSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-[#2176FF]/20 shadow-xl bg-gradient-to-br from-white to-[#F7F8FA]">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2176FF] to-[#43D8C9] flex items-center justify-center shadow-lg">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#444]">사장님, 한눈에 보는 우리 매장 현황</h2>
                <p className="text-sm text-[#6B7280] mt-1">AI가 분석한 이번 달 핵심 요약입니다</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-[#10B981] to-[#10B981]/80 text-white border-0 px-4 py-2">
              종합 평가: 양호
            </Badge>
          </div>

          {/* Main Summary */}
          <div className="space-y-6">
            {/* Good News */}
            <div className="bg-[#10B981]/5 border-l-4 border-[#10B981] rounded-lg p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-[#10B981] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#444] mb-2 flex items-center gap-2">
                    좋은 소식! 👏
                  </h3>
                  <div className="space-y-2 text-sm text-[#444] leading-relaxed">
                    <p>
                      • <span className="font-semibold">이번 달 매출이 1억 2,850만원</span>으로 지난달보다 <span className="font-semibold text-[#10B981]">8.3% 증가</span>했어요! 
                      약 980만원을 더 버셨네요. 🎉
                    </p>
                    <p>
                      • 손님들이 <span className="font-semibold">42.8%나 재방문</span>하고 계세요. 
                      이건 성수동 카페 평균(38.5%)보다 훨씬 높은 수치예요. 단골이 많다는 뜻이죠!
                    </p>
                    <p>
                      • 목표 매출 1억 1,700만원을 이미 <span className="font-semibold text-[#10B981]">110% 달성</span>하셨어요. 
                      목표를 넘어서 1,150만원을 더 버셨습니다! 👍
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Areas to Watch */}
            <div className="bg-[#F59E0B]/5 border-l-4 border-[#F59E0B] rounded-lg p-5">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#444] mb-2 flex items-center gap-2">
                    조금 더 신경 쓰면 좋을 부분 🤔
                  </h3>
                  <div className="space-y-2 text-sm text-[#444] leading-relaxed">
                    <p>
                      • <span className="font-semibold">새로운 손님이 2.4% 줄었어요.</span> 
                      단골은 많지만 신규 고객 유치가 필요해요. SNS 홍보나 이벤트를 고려해보세요.
                    </p>
                    <p>
                      • <span className="font-semibold">오전 시간(9-11시)의 매출</span>이 전체의 8.5%밖에 안돼요. 
                      모닝 세트나 아침 할인을 통해 이 시간대를 활성화하면 매출을 더 높일 수 있어요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="bg-[#2176FF]/5 border-l-4 border-[#2176FF] rounded-lg p-5">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-6 w-6 text-[#2176FF] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#444] mb-2 flex items-center gap-2">
                    알아두면 좋은 팁! 💡
                  </h3>
                  <div className="space-y-2 text-sm text-[#444] leading-relaxed">
                    <p>
                      • <span className="font-semibold">점심시간(12-14시)</span>이 하루 매출의 32.9%를 만들어요. 
                      이 시간대 서비스 품질과 테이블 회전율이 매우 중요합니다.
                    </p>
                    <p>
                      • <span className="font-semibold">30-40대 손님</span>이 전체의 58%를 차지하고, 
                      이분들의 지갑이 평균보다 24% 더 열려있어요. (객단가가 높아요!)
                    </p>
                    <p>
                      • <span className="font-semibold">주말 매출</span>이 평일보다 35% 높아요. 
                      주말 인력 배치와 재고 관리에 특히 신경 쓰세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-lg p-4 border border-[#444]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#2176FF]/10 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-[#2176FF]" />
                  </div>
                  <h4 className="font-semibold text-[#444] text-sm">이번 주 실행</h4>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  오전 모닝세트 출시로 오전 매출 25% 증대 목표
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-[#444]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#43D8C9]/10 flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-[#43D8C9]" />
                  </div>
                  <h4 className="font-semibold text-[#444] text-sm">이번 달 목표</h4>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  Instagram 마케팅으로 신규 고객 150명 확보
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-[#444]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-[#10B981]" />
                  </div>
                  <h4 className="font-semibold text-[#444] text-sm">3개월 비전</h4>
                </div>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  월 매출 1억 4,500만원 달성 (재방문율 50%)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
