import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Sparkles, Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: '안녕하세요! 저는 성동구 소상공인 AI 어시스턴트입니다. 매장 운영, 매출 분석, 경쟁 현황 등 궁금하신 점을 물어보세요.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Sample responses based on keywords
  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('매출') || message.includes('수익')) {
      return '현재 귀하의 매장은 이번 달 ₩128,450,000의 매출을 기록하여 전월 대비 8.3% 증가했습니다. 특히 점심 시간대(12-14시)가 전체 매출의 32.9%를 차지하고 있어, 이 시간대의 서비스 품질 유지가 중요합니다. 추가로 궁금하신 점이 있으신가요?';
    }
    
    if (message.includes('경쟁') || message.includes('시장') || message.includes('비교')) {
      return '성동구 카페 업종 기준, 귀하의 매장은 상위 35%에 위치하고 있습니다. 성수동 지역은 최근 3년간 카페가 47% 증가하여 경쟁이 심화되고 있지만, 귀하의 재방문율(42.8%)이 업종 평균(38.5%)을 상회하고 있어 경쟁력이 있습니다.';
    }
    
    if (message.includes('고객') || message.includes('재방문')) {
      return '현재 고객 수는 3,254명이며, 재방문율은 42.8%입니다. 30-40대 고객이 전체의 58.2%를 차지하고 있으며, 이 연령대의 객단가가 평균보다 24% 높습니다. 단골 고객 유지를 위한 멤버십 프로그램을 추천드립니다.';
    }
    
    if (message.includes('추천') || message.includes('전략') || message.includes('개선')) {
      return `다음 3가지 전략을 추천드립니다:\n\n1. 주말 오전 시간대(10-12시) 특별 프로모션으로 신규 고객 유치 (예상 매출 증대 +15%)\n2. 인스타그램 광고를 통한 성수동 방문객 타겟 마케팅\n3. 단골 고객 대상 멤버십/스탬프 프로그램 도입으로 재방문율 50% 목표\n\n어떤 전략에 대해 더 자세히 알고 싶으신가요?`;
    }
    
    if (message.includes('시간') || message.includes('피크') || message.includes('언제')) {
      return '귀하의 매장은 12-13시가 피크 타임으로 ₩5,100,000의 매출을 기록합니다. 반면 오전 시간대(09-11시)는 상대적으로 저조하므로, 모닝 세트나 브런치 메뉴 개발을 통한 오전 매출 증대를 고려해보시기 바랍니다.';
    }
    
    if (message.includes('성동구') || message.includes('성수동') || message.includes('지역')) {
      return '성동구는 서울시 전체 소상공인 중 평균 3.5%의 점유율을 보이며, 특히 성수동1가는 카페/음식점 업종이 가장 발달해있습니다. 성수동은 젊은 층의 핫플레이스로 주목받고 있어, SNS 마케팅에 집중하면 좋은 효과를 볼 수 있습니다.';
    }
    
    if (message.includes('폐업') || message.includes('위험') || message.includes('걱정')) {
      return '현재 귀하의 매장은 양호한 상태입니다. 매출이 증가세이며, 재방문율도 업종 평균 이상입니다. 다만 신규 고객 유입이 감소 추세이므로, 마케팅에 투자하시면 더욱 안정적인 운영이 가능합니다. 폐업 위험은 낮은 편입니다.';
    }
    
    // Default response
    return '질문해주셔서 감사합니다. 좀 더 구체적인 질문을 주시면 더 정확한 답변을 드릴 수 있습니다. 예를 들어, "매출 현황", "경쟁 상황", "고객 분석", "개선 전략" 등에 대해 물어보실 수 있습니다.';
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
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: generateResponse(inputValue),
        timestamp: new Date(),
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

  const quickQuestions = [
    '우리 매장 매출 현황은?',
    '경쟁사 대비 어떤가요?',
    '개선 전략 추천해주세요',
    '피크 타임이 언제인가요?',
  ];

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white">
      <CardHeader className="bg-gradient-to-r from-[#F7F8FA] to-white border-b border-[#444]/10">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-[#444]">
          <div className="p-2 bg-gradient-to-br from-[#2176FF] to-[#60A5FA] rounded-lg shadow-sm">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          AI 전략 분석가
        </CardTitle>
        <CardDescription className="text-[#6B7280]">
          매장 운영, 매출 분석, 전략 수립 등 무엇이든 물어보세요 (Gemini AI 기반)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {/* Chat Messages */}
        <ScrollArea className="h-[500px] p-4 bg-white">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${\n                      message.type === 'user'\n                        ? 'bg-gradient-to-br from-[#2176FF] to-[#60A5FA]'\n                        : 'bg-[#F7F8FA] border border-[#444]/10'\n                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-[#2176FF]" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${\n                      message.type === 'user'\n                        ? 'bg-gradient-to-br from-[#2176FF] to-[#60A5FA] text-white'\n                        : 'bg-[#F7F8FA] text-[#444] border border-[#444]/10'\n                    }`}
                  >
                    <p className="whitespace-pre-line text-sm" style={{ lineHeight: '1.6' }}>{message.content}</p>
                    <p
                      className={`mt-1 ${
                        message.type === 'user' ? 'text-white/70' : 'text-[#9CA3AF]'
                      }`}
                      style={{ fontSize: '11px' }}
                    >
                      {message.timestamp.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-[#F7F8FA] flex items-center justify-center shadow-sm border border-[#444]/10">
                  <Bot className="h-4 w-4 text-[#2176FF]" />
                </div>
                <div className="bg-[#F7F8FA] rounded-2xl px-4 py-3 border border-[#444]/10">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#2176FF] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#2176FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-[#2176FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="p-4 border-t border-[#444]/10 bg-[#F7F8FA]">
            <p className="text-[#6B7280] mb-2 text-sm font-medium">추천 질문:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-sm justify-start h-auto py-2 px-3 border-[#444]/10 hover:bg-white hover:border-[#2176FF] hover:text-[#2176FF] transition-colors"
                  onClick={() => setInputValue(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-[#444]/10 bg-white">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="궁금한 점을 물어보세요..."
              className="flex-1 border-[#444]/10 focus:border-[#2176FF] bg-[#F7F8FA]"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="gap-2 bg-gradient-to-r from-[#F59E0B] to-[#FB923C] hover:opacity-90 text-white shadow-sm"
            >
              <Send className="h-4 w-4" />
              전송
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}