import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Store, MapPin, Tag, Sparkles } from 'lucide-react';

interface StoreInfo {
  name: string;
  category: string;
  location: string;
}

interface StoreSetupDialogProps {
  open: boolean;
  onComplete: (storeInfo: StoreInfo) => void;
}

const CATEGORIES = [
  '카페',
  '한식당',
  '중식당',
  '일식당',
  '양식당',
  '분식',
  '치킨',
  '피자',
  '패스트푸드',
  '베이커리',
  '편의점',
  '미용실',
  '의류매장',
  '기타',
];

const LOCATIONS = [
  '성수동1가',
  '성수동2가',
  '행당동',
  '옥수동',
  '금호동',
  '응봉동',
  '왕십리동',
  '마장동',
  '사근동',
  '행당1동',
  '행당2동',
  '응봉동',
  '금호1가동',
  '금호2·3가동',
  '금호4가동',
  '옥수동',
  '성수1가1동',
  '성수1가2동',
  '성수2가1동',
  '성수2가3동',
  '송정동',
  '용답동',
];

export function StoreSetupDialog({ open, onComplete }: StoreSetupDialogProps) {
  const [step, setStep] = useState(1);
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');

  const handleNext = () => {
    if (step === 1 && storeName.trim()) {
      setStep(2);
    } else if (step === 2 && category) {
      setStep(3);
    }
  };

  const handleComplete = () => {
    if (storeName && category && location) {
      onComplete({
        name: storeName,
        category,
        location,
      });
    }
  };

  const isStepValid = () => {
    if (step === 1) return storeName.trim().length > 0;
    if (step === 2) return category !== '';
    if (step === 3) return location !== '';
    return false;
  };

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden" hideCloseButton>
        {/* Hidden description for accessibility */}
        <DialogDescription className="sr-only">
          매장 정보를 입력하여 맞춤형 AI 분석 대시보드를 시작하세요. 3단계로 구성되어 있으며, 매장명, 업종, 위치를 입력합니다.
        </DialogDescription>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#012CED] to-[#3B82F6] p-8 text-white">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white mb-1">
                환영합니다! 🎉
              </DialogTitle>
              <p className="text-sm text-white/80">
                성동구 소상공인 AI 분석 대시보드
              </p>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex-1">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    num <= step
                      ? 'bg-white'
                      : 'bg-white/30'
                  }`}
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-white/70 mt-2">
            단계 {step}/3
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Store Name */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#012CED]/10 flex items-center justify-center">
                    <Store className="h-5 w-5 text-[#012CED]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#444]">매장 이름을 입력해주세요</h3>
                    <p className="text-sm text-[#6B7280]">고객들이 부르는 매장명을 적어주세요</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeName">매장명</Label>
                  <Input
                    id="storeName"
                    placeholder="예: 성수카페 본점"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                    className="h-12 text-lg"
                    autoFocus
                  />
                  <p className="text-xs text-[#9CA3AF]">
                    💡 정확한 매장명을 입력하면 더 정확한 분석이 가능합니다
                  </p>
                </div>

                <div className="bg-[#F7F8FA] rounded-lg p-4 border border-[#444]/10">
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    <span className="font-semibold text-[#444]">개인정보 보호:</span> 입력하신 정보는 브라우저에만 저장되며, 외부로 전송되지 않습니다. 언제든지 수정할 수 있습니다.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Category */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#0EA5E9]/10 flex items-center justify-center">
                    <Tag className="h-5 w-5 text-[#0EA5E9]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#444]">업종을 선택해주세요</h3>
                    <p className="text-sm text-[#6B7280]">매장의 주요 업종 골라주세요</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">업종</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="업종을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#38BDF8]/10 rounded-lg p-4 border border-[#0EA5E9]/20">
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    <span className="font-semibold text-[#444]">💡 업종별 맞춤 분석:</span> 선택하신 업종에 따라 경쟁사 비교, 트렌드 분석, AI 추천이 달라집니다.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[#012CED]/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-[#012CED]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#444]">지역을 선택해주세요</h3>
                    <p className="text-sm text-[#6B7280]">성동구 내 위치를 알려주세요</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">위치 (성동구)</Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-12 text-lg">
                      <SelectValue placeholder="동을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATIONS.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-gradient-to-br from-[#012CED]/10 to-[#3B82F6]/10 rounded-lg p-4 border border-[#012CED]/20">
                  <p className="text-xs text-[#6B7280] leading-relaxed">
                    <span className="font-semibold text-[#444]">🎯 지역 기반 분석:</span> 같은 지역의 경쟁사 데이터와 유동인구 트렌드를 분석해드립니다.
                  </p>
                </div>

                {/* Preview Card */}
                <div className="bg-white rounded-lg p-4 border-2 border-[#012CED]/20 shadow-lg">
                  <p className="text-xs text-[#9CA3AF] mb-3">입력하신 정보</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Store className="h-4 w-4 text-[#012CED]" />
                      <span className="font-bold text-[#444]">{storeName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#012CED]" />
                      <span className="text-sm text-[#6B7280]">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#012CED]" />
                      <span className="text-sm text-[#6B7280]">{location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                이전
              </Button>
            )}
            <Button
              onClick={step === 3 ? handleComplete : handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-to-r from-[#012CED] to-[#3B82F6] text-white hover:opacity-90"
            >
              {step === 3 ? '분석 시작하기 🚀' : '다음'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}