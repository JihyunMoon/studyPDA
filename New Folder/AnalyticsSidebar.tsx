import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { MapPin, Store, Tag, Filter, X, Plus, Search, Sparkles, TrendingUp, Settings } from 'lucide-react';

interface Keyword {
  id: string;
  text: string;
}

interface StoreInfo {
  name: string;
  category: string;
  location: string;
}

interface AnalyticsSidebarProps {
  storeInfo?: StoreInfo | null;
  onEditStore?: () => void;
}

export function AnalyticsSidebar({ storeInfo, onEditStore }: AnalyticsSidebarProps) {
  const [selectedDistrict, setSelectedDistrict] = useState('성수동1가');
  const [selectedIndustry, setSelectedIndustry] = useState('카페');
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: '1', text: '브런치' },
    { id: '2', text: '데이트' },
    { id: '3', text: '감성카페' },
  ]);
  const [keywordInput, setKeywordInput] = useState('');

  const districts = [
    '성수동1가', '성수동2가', '행당동', '금호동1가', '금호동2가', 
    '금호동3가', '금호동4가', '옥수동', '응봉동', '왕십리도선동', '왕십리동'
  ];

  const industries = [
    '카페', '음식점', '편의점', '베이커리', '주점', '치킨/호프', '한식당', '일식당', '중식당', '양식당'
  ];

  const addKeyword = () => {
    if (keywordInput.trim() && keywords.length < 10) {
      const newKeyword: Keyword = {
        id: Date.now().toString(),
        text: keywordInput.trim(),
      };
      setKeywords([...keywords, newKeyword]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter(k => k.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <aside className="w-80 h-screen bg-white border-r border-[#444]/10 fixed left-0 top-0 overflow-y-auto z-[50]">
      <div className="p-6">
        {/* Logo/Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#012CED] to-[#3B82F6] flex items-center justify-center shadow-lg">
              <Store className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#444]">성동구</h1>
              <p className="text-xs text-[#6B7280]">소상공인 대시보드</p>
            </div>
          </div>
          
          {/* Store Info Card */}
          {storeInfo && (
            <div className="mt-4 p-4 bg-gradient-to-br from-white to-[#F7F8FA] rounded-xl border-2 border-[#012CED]/20 shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-[#1E1E1E] mb-1">{storeInfo.name}</h3>
                  <p className="text-xs text-[#666666]">{storeInfo.category} · {storeInfo.location}</p>
                </div>
                {onEditStore && (
                  <button
                    onClick={onEditStore}
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#012CED] to-[#3B82F6] hover:shadow-lg flex items-center justify-center transition-all hover:scale-105"
                    title="매장 정보 수정"
                  >
                    <Settings className="h-4 w-4 text-white" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-xs text-[#666666]">매출 트렌드</span>
                <span className="text-xs font-bold text-green-600 ml-auto">+8.3%</span>
              </div>
              {onEditStore && (
                <button
                  onClick={onEditStore}
                  className="w-full mt-2 py-2 px-3 rounded-lg bg-[#012CED] text-white font-semibold text-xs hover:bg-[#0124C5] transition-all flex items-center justify-center gap-2"
                >
                  <Settings className="h-3 w-3" />
                  매장 정보 수정
                </button>
              )}
            </div>
          )}
          
          {/* No Store Info - Add Button */}
          {!storeInfo && onEditStore && (
            <div className="mt-4 p-6 bg-gradient-to-br from-[#012CED]/10 to-[#3B82F6]/10 rounded-xl border-2 border-[#012CED]/30 shadow-lg">
              <div className="text-center mb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#012CED] to-[#3B82F6] flex items-center justify-center shadow-lg">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-[#1E1E1E] mb-1">매장 정보를 입력하세요</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  맞춤형 분석을 위해<br />매장 정보가 필요합니다
                </p>
              </div>
              <button
                onClick={onEditStore}
                className="w-full py-3 px-4 rounded-lg bg-[#012CED] hover:bg-[#0124C5] text-white font-bold transition-all flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                매장 정보 입력하기
              </button>
            </div>
          )}
          
          {/* Quick Stats */}
          <div className="mt-4 p-3 bg-gradient-to-br from-[#012CED]/5 to-[#3B82F6]/5 rounded-xl border border-[#012CED]/10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-[#012CED]" />
              <span className="text-xs font-semibold text-[#1E1E1E]">실시간 인사이트</span>
            </div>
            <p className="text-xs text-[#666666] leading-relaxed">
              오늘 점심시간 매출이 평균 대비 <span className="font-bold text-[#10B981]">+12.5%</span> 증가했습니다!
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-5">
          {/* District Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1E1E1E] mb-3">
              <MapPin className="h-4 w-4 text-[#012CED]" />
              상권 선택
            </label>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="w-full border-[#444]/10 hover:border-[#012CED]/40 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Industry Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1E1E1E] mb-3">
              <Store className="h-4 w-4 text-[#012CED]" />
              업종 선택
            </label>
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-full border-[#444]/10 hover:border-[#012CED]/40 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Keyword Analysis */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1E1E1E] mb-3">
              <Tag className="h-4 w-4 text-[#012CED]" />
              키워드 분석 ({keywords.length}/10)
            </label>
            
            {/* Add Keyword Input */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="예: 브런치, 데이트, 외국인..."
                  className="pl-9 border-[#444]/10 hover:border-[#012CED]/40 focus:border-[#012CED] transition-colors"
                  maxLength={20}
                />
              </div>
              <Button
                onClick={addKeyword}
                disabled={!keywordInput.trim() || keywords.length >= 10}
                size="icon"
                className="bg-[#012CED] hover:bg-[#0124C5] text-white shadow-sm"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Keywords List */}
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <Badge
                    key={keyword.id}
                    variant="secondary"
                    className="chip-enter px-3 py-1.5 bg-[#012CED]/10 text-[#1E1E1E] border border-[#012CED]/20 hover:border-[#012CED]/40 transition-all cursor-default"
                  >
                    <span className="mr-1.5 font-medium">{keyword.text}</span>
                    <button
                      onClick={() => removeKeyword(keyword.id)}
                      className="ml-1 rounded-full hover:bg-[#1E1E1E]/20 p-0.5 transition-colors"
                      aria-label={`Remove ${keyword.text}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {keywords.length === 0 && (
              <p className="text-xs text-[#9CA3AF] text-center py-4 bg-[#F7F8FA] rounded-lg">
                키워드를 추가해서 더 정확한 분석을 받아보세요
              </p>
            )}
          </div>

          {/* Advanced Filters */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#1E1E1E] mb-3">
              <Filter className="h-4 w-4 text-[#012CED]" />
              고급 필터
            </label>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-sm font-medium border-[#444]/10 hover:border-[#012CED]/40 transition-colors">
                <span className="mr-2">📅</span>
                기간: 최근 30일
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm font-medium border-[#444]/10 hover:border-[#012CED]/40 transition-colors">
                <span className="mr-2">👥</span>
                연령대: 전체
              </Button>
              <Button variant="outline" className="w-full justify-start text-sm font-medium border-[#444]/10 hover:border-[#012CED]/40 transition-colors">
                <span className="mr-2">⚡</span>
                활동: 신규+기존
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="sticky bottom-0 bg-white">
        <Separator />
        {/* Apply Button */}
        <div className="p-6 border-t border-[#444]/10 bg-[#F7F8FA]">
          <Button className="w-full bg-[#012CED] hover:bg-[#0124C5] text-white shadow-md font-semibold">
            분석 적용하기
          </Button>
        </div>
      </div>
    </aside>
  );
}
