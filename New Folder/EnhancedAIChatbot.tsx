import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Sparkles, Send, User, Bot, Lightbulb, TrendingUp, AlertCircle, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export function EnhancedAIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '안녕하세요! 👋\n\n저는 성동구 소상공인을 위한 **AI 경영 컨설턴트**입니다.\n\n귀하의 매장 데이터를 실시간으로 분석하여 다음과 같은 도움을 드릴 수 있습니다:\n\n• 📊 매출 현황 및 추세 분석\n• 🎯 맞춤형 경영 전략 제안\n• 📈 경쟁사 비교 및 시장 분석\n• 💡 개선 방안 및 실행 계획\n\n궁금하신 점을 편하게 물어보세요!',
      timestamp: new Date(),
      suggestions: [
        '이번 달 매출 분석해줘',
        '경쟁사 대비 우리 위치는?',
        '매출 증대 전략 추천해줘',
        '폐업 위험도는 어때?',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Sample responses based on keywords
  const generateResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('매출') || message.includes('수익')) {
      return {
        content: '📊 **매출 현황 분석 결과**\n\n✅ 이번 달 매출: **₩128,450,000**\n📈 전월 대비: **+8.3%** (₩9,800,000 증가)\n🎯 목표 달성률: **110%**\n\n**주요 성과:**\n• 점심 시간대(12-14시) 매출이 전체의 32.9% 차지\n• 주말 매출이 평일 대비 35% 높음\n• 신한카드 결제 비중이 45.2%로 가장 높음\n\n**개선 포인트:**\n• 오전 시간대(09-11시) 매출이 저조 → 모닝 프로모션 추천\n• 신규 고객 유입 -2.4% → 마케팅 강화 필요\n\n더 자세한 분석이 필요하신가요?',
        suggestions: [
          '시간대별 상세 분석',
          '마케팅 전략 추천',
          '경쟁사와 비교',
        ],
      };
    }
    
    if (message.includes('경쟁') || message.includes('시장') || message.includes('비교')) {
      return {
        content: '🎯 **시장 경쟁력 분석**\n\n**현재 위치:**\n• 성동구 카페 업종 내 **상위 35%**\n• 성수동1가 지역 내 **상위 28%**\n\n**경쟁 현황:**\n• 반경 500m 내 카페 17개 (전년 대비 +3개)\n• 업종 평균 대비 매출 **+35.3%** 우수\n• 재방문율 42.8% (평균 38.5%보다 높음)\n\n**강점:**\n✅ 브런치 메뉴 인기 (리뷰 평점 4.7/5.0)\n✅ 30-40대 고객층 확보 (58.2%)\n✅ SNS 언급량 높음 (#성수카페 월 2.5만건)\n\n**개선 필요:**\n⚠️ 신규 고객 유입 감소\n⚠️ 주차 공간 부족 (리뷰 지적 사항)\n\n경쟁력 강화를 위한 구체적인 전략을 알려드릴까요?',
        suggestions: [
          '신규 고객 유치 전략',
          '차별화 방안',
          '가격 경쟁력 분석',
        ],
      };
    }
    
    if (message.includes('고객') || message.includes('재방문')) {
      return {
        content: '👥 **고객 분석 리포트**\n\n**고객 현황:**\n• 총 고객 수: **3,254명**\n• 재방문율: **42.8%** (업종 평균 38.5%)\n• 평균 재방문 주기: **18.3일**\n\n**연령대 분포:**\n• 30-40대: 58.2% (주요 고객층)\n• 20대: 25.0%\n• 50대 이상: 11.0%\n• 10대: 5.8%\n\n**고객 특성:**\n💎 VIP 고객 (월 4회 이상): 287명 (8.8%)\n   → 전체 매출의 31.2% 기여\n\n📊 평균 객단가:\n• 30-40대: ₩42,300 (평균보다 24% 높음)\n• 20대: ₩28,500\n• 전체 평균: ₩34,100\n\n**추천 전략:**\n1. VIP 고객 대상 멤버십 프로그램\n2. 30-40대 맞춤 프리미엄 메뉴 개발\n3. 20대 유입을 위한 SNS 이벤트\n\n구체적인 고객 유지 전략을 알아볼까요?',
        suggestions: [
          '멤버십 프로그램 설계',
          'VIP 고객 관리법',
          '신규 고객 확보 방안',
        ],
      };
    }
    
    if (message.includes('추천') || message.includes('전략') || message.includes('개선')) {
      return {
        content: '💡 **AI 맞춤형 경영 전략 (3개월 플랜)**\n\n**단기 전략 (이번 달)**\n\n1️⃣ **오전 시간대 활성화**\n   • 모닝 세트 출시 (커피+빵 9,900원)\n   • 예상 효과: 오전 매출 +25% (월 +₩4.1M)\n\n2️⃣ **SNS 마케팅 강화**\n   • Instagram 릴스 주 3회 게시\n   • 해시태그: #성수브런치 #성수데이트\n   • 예상 신규 고객: +150명/월\n\n3️⃣ **단골 고객 리워드**\n   • 방문 10회당 음료 1잔 무료\n   • 재방문율 목표: 42.8% → 50%\n\n**중기 전략 (3개월)**\n\n4️⃣ **프리미엄 메뉴 개발**\n   • 시그니처 디저트 라인업\n   • 30-40대 타겟 (객단가 +30% 목표)\n\n5️⃣ **제휴 마케팅**\n   • 주변 오피스 단체 주문 할인\n   • B2B 매출 월 +₩3.5M 예상\n\n**장기 전략 (6개월)**\n\n6️⃣ **브랜드 강화**\n   • 성수동 대표 카페 포지셔닝\n   • 인플루언서 협업\n\n**예상 효과:**\n📈 3개월 후 매출: **₩145M** (+12.9%)\n👥 신규 고객: **+450명**\n💰 총 수익 증대: **₩16.5M**\n\n어떤 전략부터 시작하고 싶으신가요?',
        suggestions: [
          '모닝 세트 메뉴 구성',
          'SNS 콘텐츠 아이디어',
          '리워드 프로그램 상세',
        ],
      };
    }
    
    if (message.includes('시간') || message.includes('피크') || message.includes('언제')) {
      return {
        content: '⏰ **시간대별 매출 분석**\n\n**피크 타임:**\n🔥 1위: 12-13시 (₩5,100,000/일)\n🔥 2위: 18-19시 (₩4,200,000/일)\n🔥 3위: 11-12시 (₩3,800,000/일)\n\n**저조 시간대:**\n📉 09-11시: ₩850,000/일 (전체의 8.5%)\n📉 21-22시: ₩550,000/일 (전체의 5.5%)\n\n**요일별 패턴:**\n• 주말(토,일): 평일 대비 +35% 높음\n• 금요일: 저녁 시간대 특히 강세\n• 월요일: 전체적으로 저조\n\n**개선 제안:**\n1. 오전 할인 이벤트 (09-11시)\n2. 평일 저녁 특별 메뉴\n3. 월요일 프로모션\n\n히트맵 분석 결과를 보여드릴까요?',
        suggestions: [
          '오전 프로모션 아이디어',
          '요일별 전략',
          '히트맵 상세 보기',
        ],
      };
    }
    
    if (message.includes('폐업') || message.includes('위험') || message.includes('걱정')) {
      return {
        content: '🛡️ **폐업 위험도 분석**\n\n**종합 평가: 낮음** ✅\n\n**긍정 지표:**\n✅ 매출 증가세 (전월 대비 +8.3%)\n✅ 재방문율 양호 (42.8%)\n✅ 목표 달성률 우수 (110%)\n✅ 업종 평균 대비 우위 (+35.3%)\n✅ 현금 흐름 안정적\n\n**주의 지표:**\n⚠️ 신규 고객 유입 감소 (-2.4%)\n⚠️ 경쟁 심화 (주변 카페 증가)\n\n**안정성 점수: 82/100**\n(70점 이상 안전, 50점 이하 위험)\n\n**종합 의견:**\n귀하의 매장은 현재 매우 양호한 상태입니다. 다만 지속적인 성장을 위해 신규 고객 유치에 집중하시면 더욱 안정적인 운영이 가능합니다.\n\n**다음 분기 목표:**\n• 신규 고객 +15%\n• 재방문율 45% 달성\n• 매출 ₩140M 목표\n\n안심하셔도 됩니다! 💪',
        suggestions: [
          '신규 고객 확보 방법',
          '리스크 관리 전략',
          '성장 로드맵',
        ],
      };
    }
    
    // Default response
    return {
      content: '질문해주셔서 감사합니다! 😊\n\n좀 더 구체적인 질문을 주시면 더 정확한 분석과 조언을 드릴 수 있습니다.\n\n**자주 묻는 질문:**\n• "매출 현황은?" - 매출 분석 및 추세\n• "경쟁사와 비교해줘" - 시장 경쟁력 분석\n• "고객 분석 보여줘" - 고객 세분화 분석\n• "개선 전략 추천해줘" - 맞춤형 경영 전략\n• "피크 타임이 언제야?" - 시간대별 분석\n• "폐업 위험도는?" - 안정성 평가\n\n무엇을 도와드릴까요?',
      suggestions: [
        '매출 현황 분석',
        '경쟁력 진단',
        '전략 추천',
        '고객 분석',
      ],
    };
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Info Panel */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="border border-[#444]/10 shadow-sm bg-gradient-to-br from-[#2176FF]/5 to-[#43D8C9]/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2176FF] to-[#43D8C9] flex items-center justify-center shadow-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#444]">AI 컨설턴트</h3>
                <p className="text-xs text-[#6B7280]">Google Gemini 기반</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#444]">실시간 데이터 분석 및 인사이트 제공</p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#444]">맞춤형 성장 전략 추천</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-[#2176FF] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#444]">위험 요소 조기 감지 및 대응</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#444]/10 shadow-sm bg-white">
          <CardContent className="p-6">
            <h4 className="font-semibold text-[#444] mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#2176FF]" />
              대화 통계
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">총 대화</span>
                <Badge variant="secondary" className="bg-[#F7F8FA] text-[#444]">
                  {messages.length}개
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">분석 제공</span>
                <Badge variant="secondary" className="bg-[#F7F8FA] text-[#444]">
                  실시간
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#6B7280]">응답 속도</span>
                <Badge variant="secondary" className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                  평균 1.5초
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Panel */}
      <div className="lg:col-span-2">
        <Card className="border border-[#444]/10 shadow-lg bg-white h-[700px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-[#444]/10 bg-gradient-to-r from-[#2176FF] to-[#43D8C9]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">AI 경영 컨설턴트</h3>
                  <p className="text-xs text-white/80">귀하의 비즈니스 파트너</p>
                </div>
              </div>
              <Badge className="bg-white/20 text-white border-white/30">
                실시간 연결
              </Badge>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6 bg-[#FCFCFA]">
            <div className="space-y-6">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-[#2176FF] to-[#43D8C9]'
                          : 'bg-white border-2 border-[#2176FF]/20'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Bot className="h-5 w-5 text-[#2176FF]" />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 max-w-[85%]">
                      <div
                        className={`rounded-2xl px-5 py-4 ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-[#2176FF] to-[#43D8C9] text-white ml-auto'
                            : 'bg-white text-[#444] border border-[#444]/10 shadow-sm'
                        }`}
                      >
                        <p className="whitespace-pre-line text-sm leading-relaxed">
                          {message.content}
                        </p>
                        <p
                          className={`mt-2 text-xs ${
                            message.type === 'user' ? 'text-white/70' : 'text-[#9CA3AF]'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('ko-KR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="text-xs border-[#2176FF]/20 hover:bg-[#2176FF]/5 hover:border-[#2176FF] hover:text-[#2176FF] transition-colors"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md border-2 border-[#2176FF]/20">
                    <Bot className="h-5 w-5 text-[#2176FF]" />
                  </div>
                  <div className="bg-white rounded-2xl px-5 py-4 border border-[#444]/10 shadow-sm">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 bg-[#2176FF] rounded-full animate-bounce" />
                      <div className="w-2.5 h-2.5 bg-[#2176FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2.5 h-2.5 bg-[#2176FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-[#444]/10 bg-white">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요... (Enter로 전송)"
                className="flex-1 border-[#444]/10 focus:border-[#2176FF] bg-[#F7F8FA] text-sm"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="gap-2 bg-gradient-to-r from-[#2176FF] to-[#43D8C9] hover:opacity-90 text-white shadow-md px-6"
              >
                <Send className="h-4 w-4" />
                전송
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
