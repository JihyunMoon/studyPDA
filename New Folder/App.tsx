import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { AnalyticsSidebar } from "./components/AnalyticsSidebar";
import { KPIMetricCard } from "./components/KPIMetricCard";
import { ExecutiveSummary } from "./components/ExecutiveSummary";
import { TrendSummaryPanel } from "./components/TrendSummaryPanel";
import { KeywordCloud } from "./components/KeywordCloud";
import { RevenueOverview } from "./components/RevenueOverview";
import { RevenueCompositionChart } from "./components/RevenueCompositionChart";
import { CustomerSegmentChart } from "./components/CustomerSegmentChart";
import { HeatmapChart } from "./components/HeatmapChart";
import { GoalProgressRing } from "./components/GoalProgressRing";
import { MarketComparison } from "./components/MarketComparison";
import { CohortAnalysis } from "./components/CohortAnalysis";
import { RetentionMetrics } from "./components/RetentionMetrics";
import { EnhancedAIChatbot } from "./components/EnhancedAIChatbot";
import { AIInsights } from "./components/AIInsights";
import { ChatbotFloatingButton } from "./components/ChatbotFloatingButton";
import { InsightSpotlight } from "./components/InsightSpotlight";
import { CriticalAlert } from "./components/CriticalAlert";
import { RankingChart } from "./components/RankingChart";
import { SegmentedBarChart } from "./components/SegmentedBarChart";
import { EnhancedDonutChart } from "./components/EnhancedDonutChart";
import { AreaTrendChart } from "./components/AreaTrendChart";
import { EnhancedKPICard } from "./components/EnhancedKPICard";
import { StoreSetupDialog } from "./components/StoreSetupDialog";
import { StoreHealthScore } from "./components/StoreHealthScore";
import { ClosureRiskPrediction } from "./components/ClosureRiskPrediction";
import {
  DollarSign,
  Users,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Bot,
  LineChart,
  ShoppingBag,
  Clock,
  Target,
} from "lucide-react";

interface StoreInfo {
  name: string;
  category: string;
  location: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(() => {
    // Load from localStorage
    const saved = localStorage.getItem("storeInfo");
    return saved ? JSON.parse(saved) : null;
  });
  const [showStoreSetup, setShowStoreSetup] = useState(false);

  const handleStoreSetup = (info: StoreInfo) => {
    setStoreInfo(info);
    localStorage.setItem("storeInfo", JSON.stringify(info));
    setShowStoreSetup(false);
  };

  const handleEditStore = () => {
    setShowStoreSetup(true);
  };

  return (
    <>
      {/* Store Setup Dialog */}
      <StoreSetupDialog
        open={!storeInfo || showStoreSetup}
        onComplete={handleStoreSetup}
      />

      <div className="min-h-screen bg-[#FCFCFA] flex">
        {/* Persistent Left Sidebar */}
        <AnalyticsSidebar storeInfo={storeInfo} onEditStore={handleEditStore} />

        {/* Floating Chatbot Button */}
        <ChatbotFloatingButton />

        {/* Main Content Area */}
        <main className="flex-1 ml-80">
          {/* Top Navigation Bar */}
          <header className="sticky top-0 z-[100] bg-white border-b border-[#444]/10 backdrop-blur-sm bg-white/95">
            <div className="px-8 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-[#444]">
                    {storeInfo?.name || '매장명'} 분석 대시보드
                  </h2>
                  <p className="text-sm text-[#6B7280] mt-0.5">
                    {storeInfo?.location || '위치'} · {storeInfo?.category || '업종'} · 신한카드 빅데이터 기반
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-lg text-sm font-semibold border border-[#10B981]/20">
                    데이터 정상
                  </div>
                  <div className="text-xs text-[#9CA3AF]">
                    마지막 업데이트: 5분 전
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Tab Navigation - REDESIGNED */}
          <div className="bg-[#F7F8FA] border-b border-[#444]/10 px-8 py-2 relative z-[90]">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent border-0 p-0 h-auto gap-2">
                <TabsTrigger
                  value="dashboard"
                  className="
                    relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                    data-[state=inactive]:bg-white data-[state=inactive]:text-[#B5B5B5] 
                    data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[#1E1E1E]
                    data-[state=inactive]:shadow-sm data-[state=inactive]:border data-[state=inactive]:border-[#E5E7EB]
                    data-[state=active]:bg-[#012CED]
                    data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(1,44,237,0.3)]
                    data-[state=active]:border data-[state=active]:border-[#012CED]
                  "
                >
                  <BarChart3 className="h-4 w-4 mr-2 inline" />
                  대시보드
                  {activeTab === "dashboard" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFB300] rounded-full animate-pulse" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="ai"
                  className="
                    relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                    data-[state=inactive]:bg-white data-[state=inactive]:text-[#B5B5B5]
                    data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[#1E1E1E]
                    data-[state=inactive]:shadow-sm data-[state=inactive]:border data-[state=inactive]:border-[#E5E7EB]
                    data-[state=active]:bg-[#012CED]
                    data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(1,44,237,0.3)]
                    data-[state=active]:border data-[state=active]:border-[#012CED]
                  "
                >
                  <Bot className="h-4 w-4 mr-2 inline" />
                  AI 컨설팅
                  {activeTab === "ai" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFB300] rounded-full animate-pulse" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="
                    relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                    data-[state=inactive]:bg-white data-[state=inactive]:text-[#B5B5B5]
                    data-[state=inactive]:hover:bg-white data-[state=inactive]:hover:text-[#1E1E1E]
                    data-[state=inactive]:shadow-sm data-[state=inactive]:border data-[state=inactive]:border-[#E5E7EB]
                    data-[state=active]:bg-[#012CED]
                    data-[state=active]:text-white data-[state=active]:shadow-[0_4px_12px_rgba(1,44,237,0.3)]
                    data-[state=active]:border data-[state=active]:border-[#012CED]
                  "
                >
                  <LineChart className="h-4 w-4 mr-2 inline" />
                  트렌드 분석
                  {activeTab === "trends" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFB300] rounded-full animate-pulse" />
                  )}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content Area */}
          <div className="p-8">
            <Tabs value={activeTab} className="space-y-6">
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="mt-0 space-y-6">
                {/* Store Health & Closure Risk - MOST IMPORTANT! */}
                <section>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#444]">💪 가게 건강도 & 폐업 위험도 분석</h3>
                    <p className="text-sm text-[#6B7280]">AI가 분석한 가게의 종합 건강 상태와 개선 방향</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Store Health Score */}
                    <div className="lg:col-span-1">
                      <StoreHealthScore
                        score={72}
                        status="good"
                        metrics={{
                          revenue: 85,
                          customers: 58,
                          retention: 73,
                          growth: 72,
                        }}
                      />
                    </div>

                    {/* Closure Risk Prediction */}
                    <div className="lg:col-span-2">
                      <ClosureRiskPrediction
                        currentRisk={28}
                        projectedRisk={[
                          { month: '11월', risk: 28 },
                          { month: '12월', risk: 25 },
                          { month: '1월', risk: 22 },
                          { month: '2월', risk: 20 },
                          { month: '3월', risk: 18 },
                          { month: '4월', risk: 15 },
                        ]}
                        contributingFactors={[
                          { factor: '매출 안정성', impact: 85, status: 'good' },
                          { factor: '고객 유입', impact: 58, status: 'warning' },
                          { factor: '재방문율', impact: 73, status: 'good' },
                          { factor: '성장 추세', impact: 72, status: 'good' },
                          { factor: '시장 경쟁력', impact: 65, status: 'warning' },
                        ]}
                      />
                    </div>
                  </div>
                </section>

                {/* KPI Metrics Grid */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#444]">핵심 성과 지표 (KPI)</h3>
                    <p className="text-sm text-[#6B7280]">최근 30일 기준</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <EnhancedKPICard
                      icon={DollarSign}
                      label="월 매출액"
                      value="₩128.5M"
                      trend={8.3}
                      trendLabel="전월 대비"
                      color="#2176FF"
                      bgGradient="from-[#2176FF]/10 to-[#43D8C9]/10"
                    />
                    <EnhancedKPICard
                      icon={Users}
                      label="신규 고객 유입"
                      value="2,847"
                      trend={-2.4}
                      trendLabel="전월 대비 (주의 필요)"
                      color="#FFB300"
                      bgGradient="from-[#FFB300]/10 to-[#FFA726]/10"
                    />
                    <EnhancedKPICard
                      icon={Target}
                      label="재방문율"
                      value="42.8%"
                      trend={5.2}
                      trendLabel="전월 대비"
                      color="#10B981"
                      bgGradient="from-[#10B981]/10 to-[#34D399]/10"
                    />
                    <EnhancedKPICard
                      icon={Clock}
                      label="평균 체류시간"
                      value="48분"
                      trend={3.1}
                      trendLabel="전월 대비"
                      color="#8B5CF6"
                      bgGradient="from-[#8B5CF6]/10 to-[#EC4899]/10"
                    />
                  </div>
                </section>

                {/* Executive Summary */}
                <section>
                  <ExecutiveSummary />
                </section>

                {/* Critical Alerts */}
                <section>
                  <CriticalAlert
                    type="warning"
                    title="⚠️ 신규 고객 유입 감소 주의"
                    message="지난 달 대비 신규 고객이 2.4% 감소했습니다. 경쟁이 심화되고 있으니 마케팅 활동을 강화해야 합니다."
                    metrics={[
                      { label: "신규 고객", value: "2,847명", change: -2.4 },
                      { label: "유입 경로", value: "SNS 56%", change: -5.2 },
                      { label: "전환율", value: "12.3%", change: -1.8 },
                    ]}
                    actions={[
                      "Instagram 릴스 콘텐츠 주 3회 업로드 (브런치, 디저트 집중)",
                      "신규 고객 대상 첫 방문 10% 할인 쿠폰 배포",
                      "주변 오피스 단체 주문 영업 시작 (B2B 채널 개척)",
                    ]}
                  />
                </section>

                {/* Insight Spotlight */}
                <section>
                  <InsightSpotlight
                    title="🌟 점심시간이 매출의 황금 시간대입니다!"
                    description="데이터 분석 결과, 점심시간(12-14시)이 하루 매출의 32.9%를 차지하고 있습니다. 이 시간대의 서비스 품질과 테이블 회전율이 전체 매출에 결정적인 영향을 미치고 있습니다."
                    impact={{
                      label: "점심시간 매출 비중",
                      value: "32.9%",
                      subtext: "약 4,230만원/월",
                    }}
                    recommendation="점심시간 직원을 1명 추가 배치하고, 빠른 서비스를 위한 '런치 세트 메뉴'를 개발하세요. 테이블 회전율을 20% 개선하면 월 매출을 850만원 증대할 수 있습니다."
                    potentialGain="월 +850만원 (연 1억 200만원)"
                  />
                </section>

                {/* Area Trend Chart - NEW! */}
                <section>
                  <AreaTrendChart
                    title="월별 매출 트렌드"
                    subtitle="최근 12개월 매출 추이 분석"
                    data={[
                      { month: "2023.11", value: 95, count: 2847 },
                      { month: "2023.12", value: 102, count: 3124 },
                      { month: "2024.01", value: 88, count: 2456 },
                      { month: "2024.02", value: 98, count: 2891 },
                      { month: "2024.03", value: 115, count: 3402 },
                      { month: "2024.04", value: 122, count: 3687 },
                      { month: "2024.05", value: 118, count: 3521 },
                      { month: "2024.06", value: 125, count: 3812 },
                      { month: "2024.07", value: 132, count: 4024 },
                      { month: "2024.08", value: 128, count: 3891 },
                      { month: "2024.09", value: 135, count: 4156 },
                      { month: "2024.10", value: 129, count: 3942 },
                    ]}
                    dataKey="value"
                    unit="백만"
                    showAverage={true}
                  />
                </section>

                {/* Ranking & Segmented Charts - NEW! */}
                <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Ranking Chart */}
                    <RankingChart
                      title="성동구 동별 매출 순위"
                      subtitle="우리 가게가 속한 지역의 경쟁 현황"
                      data={[
                        { rank: 1, name: "성수동2가", value: 18024, maxValue: 18024, trend: 5.2 },
                        { rank: 2, name: "성수동1가", value: 11114, maxValue: 18024, trend: 3.8 },
                        { rank: 3, name: "행당동", value: 8684, maxValue: 18024, trend: -1.2 },
                        { rank: 4, name: "옥수동", value: 6991, maxValue: 18024, trend: 2.1 },
                        { rank: 5, name: "금호동", value: 6723, maxValue: 18024, trend: -0.5 },
                        { rank: 6, name: "응봉동", value: 4512, maxValue: 18024, trend: 1.3 },
                        { rank: 7, name: "왕십리동", value: 3820, maxValue: 18024, trend: -2.3 },
                      ]}
                      unit="백만원"
                      highlightTop={3}
                    />

                    {/* Segmented Bar Chart */}
                    <SegmentedBarChart
                      title="연령대별 고객 성별 분포"
                      subtitle="Male vs Female 고객 세분화 분석"
                      data={[
                        {
                          category: "20-24세",
                          segments: [
                            { label: "Female", value: 1653, color: "rgba(1, 44, 237, 0.5)" },
                            { label: "Male", value: 1890, color: "#012CED" },
                          ],
                        },
                        {
                          category: "25-29세",
                          segments: [
                            { label: "Female", value: 2964, color: "rgba(1, 44, 237, 0.5)" },
                            { label: "Male", value: 3199, color: "#012CED" },
                          ],
                        },
                        {
                          category: "30-34세",
                          segments: [
                            { label: "Female", value: 1672, color: "rgba(1, 44, 237, 0.5)" },
                            { label: "Male", value: 1837, color: "#012CED" },
                          ],
                        },
                        {
                          category: "35-39세",
                          segments: [
                            { label: "Female", value: 1690, color: "rgba(1, 44, 237, 0.5)" },
                            { label: "Male", value: 1785, color: "#012CED" },
                          ],
                        },
                        {
                          category: "40-44세",
                          segments: [
                            { label: "Female", value: 1159, color: "rgba(1, 44, 237, 0.5)" },
                            { label: "Male", value: 1275, color: "#012CED" },
                          ],
                        },
                      ]}
                    />
                  </div>
                </section>

                {/* Enhanced Donut Chart - NEW! */}
                <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EnhancedDonutChart
                      title="결제 수단별 매출 비중"
                      subtitle="어떤 결제 방식이 주로 사용되는가?"
                      data={[
                        { name: "신용카드", value: 12450, color: "#012CED" },
                        { name: "체크카드", value: 5920, color: "rgba(1, 44, 237, 0.7)" },
                        { name: "모바일페이", value: 3840, color: "rgba(1, 44, 237, 0.5)" },
                        { name: "현금", value: 2340, color: "#B5B5B5" },
                      ]}
                      centerLabel="총 결제액"
                      centerValue="₩24.5M"
                      centerSubtext="월 평균"
                    />

                    <EnhancedDonutChart
                      title="시간대별 매출 비중"
                      subtitle="언제 가장 바쁜가?"
                      data={[
                        { name: "점심 (12-14시)", value: 4230, color: "#012CED" },
                        { name: "오후 (14-18시)", value: 3580, color: "rgba(1, 44, 237, 0.7)" },
                        { name: "저녁 (18-21시)", value: 2840, color: "rgba(1, 44, 237, 0.5)" },
                        { name: "아침 (09-12시)", value: 1920, color: "rgba(1, 44, 237, 0.3)" },
                        { name: "야간 (21-24시)", value: 680, color: "#B5B5B5" },
                      ]}
                      centerLabel="하루 평균"
                      centerValue="₩13.2M"
                      centerSubtext="매출"
                    />
                  </div>
                </section>

                {/* Trend Summary */}
                <section>
                  <TrendSummaryPanel />
                </section>

                {/* Revenue Charts - 3 Column Grid */}
                <section>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#444]">매출 분석</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <RevenueOverview />
                    </div>
                    <div className="lg:col-span-1">
                      <GoalProgressRing
                        title="이번 달 목표 달성률"
                        current={128500000}
                        target={117000000}
                      />
                    </div>
                  </div>
                </section>

                {/* Composition Charts */}
                <section>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RevenueCompositionChart />
                    <CustomerSegmentChart />
                  </div>
                </section>

                {/* Heatmap */}
                <section>
                  <HeatmapChart />
                </section>

                {/* Keyword Cloud */}
                <section>
                  <KeywordCloud />
                </section>

                {/* Market Analysis */}
                <section>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#444]">시장 및 경쟁 분석</h3>
                  </div>
                  <MarketComparison storeCategory="카페" />
                </section>

                {/* Cohort & Retention */}
                <section>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#444]">고객 행동 분석</h3>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CohortAnalysis />
                    <RetentionMetrics />
                  </div>
                </section>
              </TabsContent>

              {/* AI Consulting Tab */}
              <TabsContent value="ai" className="mt-0 space-y-6">
                <section>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#444] mb-2">
                      🤖 AI 경영 컨설팅 챗봇
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      실시간 데이터 분석과 맞춤형 경영 전략을 AI와 대화하며 확인하세요
                    </p>
                  </div>
                  <EnhancedAIChatbot />
                </section>

                <section>
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#444]">자동 생성 인사이트</h3>
                  </div>
                  <AIInsights storeName="성수카페 본점" storeCategory="카페" />
                </section>
              </TabsContent>

              {/* Trends Tab */}
              <TabsContent value="trends" className="mt-0 space-y-6">
                <section>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-[#444] mb-2">
                      📈 실시간 트렌드 모니터링
                    </h3>
                    <p className="text-sm text-[#6B7280]">
                      뉴스, SNS, 리뷰 데이터를 통합 분석하여 최신 트렌드를 제공합니다
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <TrendSummaryPanel />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <KeywordCloud />
                      <CustomerSegmentChart />
                    </div>

                    <HeatmapChart />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <MarketComparison storeCategory="카페" />
                      <RetentionMetrics />
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <footer className="border-t border-[#444]/10 bg-white mt-12">
            <div className="px-8 py-6">
              <div className="flex items-center justify-between text-sm text-[#9CA3AF]">
                <p>© 2024 성동구 소상공인 지원센터 · 데이터 제공: 신한카드 빅데이터</p>
                <p>AI 분석: Google Gemini</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}