import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, MapPin } from 'lucide-react';

export function DistrictPerformance() {
  const districtData = [
    { dong: '성수동1가', stores: 487, avgRevenue: 18500000, growth: 12.3, category: '카페/음식점' },
    { dong: '성수동2가', stores: 356, avgRevenue: 15200000, growth: 8.7, category: '카페/음식점' },
    { dong: '행당동', stores: 298, avgRevenue: 14800000, growth: -2.1, category: '일반음식점' },
    { dong: '금호동', stores: 412, avgRevenue: 13900000, growth: 5.4, category: '편의점/소매' },
    { dong: '옥수동', stores: 223, avgRevenue: 12600000, growth: 3.8, category: '일반음식점' },
    { dong: '응봉동', stores: 189, avgRevenue: 11200000, growth: -0.5, category: '일반음식점' },
  ];

  const categoryComparison = [
    { category: '카페', seongdong: 285, seoul: 8420, marketShare: 3.38, growth: 15.2 },
    { category: '치킨/호프', seongdong: 156, seoul: 4230, marketShare: 3.69, growth: 5.8 },
    { category: '한식당', seongdong: 234, seoul: 6890, marketShare: 3.40, growth: 2.3 },
    { category: '편의점', seongdong: 89, seoul: 2340, marketShare: 3.80, growth: 8.9 },
    { category: '베이커리', seongdong: 67, seoul: 1890, marketShare: 3.54, growth: 12.1 },
  ];

  const topPerformers = [
    { rank: 1, name: '성수 ○○카페', category: '카페', revenue: 45200000, growth: 28.5 },
    { rank: 2, name: '왕십리 ○○치킨', category: '치킨/호프', revenue: 38900000, growth: 18.2 },
    { rank: 3, name: '금호 ○○편의점', category: '편의점', revenue: 35600000, growth: 15.7 },
    { rank: 4, name: '행당 ○○한식', category: '한식당', revenue: 32100000, growth: 12.3 },
    { rank: 5, name: '응봉 ○○빵집', category: '베이커리', revenue: 28900000, growth: 22.1 },
  ];

  return (
    <div className="space-y-6">
      {/* District Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <CardTitle>성동구 동별 현황</CardTitle>
          </div>
          <CardDescription>각 동별 점포 수와 평균 매출</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={districtData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="dong" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
                formatter={(value: number, name: string) => {
                  if (name === '평균매출') return `₩${value.toLocaleString()}`;
                  return value.toLocaleString();
                }}
              />
              <Legend />
              <Bar dataKey="avgRevenue" fill="#3b82f6" name="평균매출" radius={[8, 8, 0, 0]} />
              <Bar dataKey="stores" fill="#10b981" name="점포수" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>동</TableHead>
                  <TableHead className="text-right">점포 수</TableHead>
                  <TableHead className="text-right">평균 매출</TableHead>
                  <TableHead className="text-right">성장률</TableHead>
                  <TableHead>주요 업종</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {districtData.map((item) => (
                  <TableRow key={item.dong}>
                    <TableCell className="text-slate-900">{item.dong}</TableCell>
                    <TableCell className="text-right">{item.stores}개</TableCell>
                    <TableCell className="text-right">₩{(item.avgRevenue / 1000000).toFixed(1)}M</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {item.growth > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={item.growth > 0 ? 'text-green-600' : 'text-red-600'}>
                          {item.growth > 0 ? '+' : ''}{item.growth}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{item.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Category Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>업종별 성동구 vs 서울시 비교</CardTitle>
          <CardDescription>성동구 점포 현황 및 시장 점유율</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>업종</TableHead>
                <TableHead className="text-right">성동구 점포</TableHead>
                <TableHead className="text-right">서울시 점포</TableHead>
                <TableHead className="text-right">점유율</TableHead>
                <TableHead className="text-right">성장률</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryComparison.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="text-slate-900">{item.category}</TableCell>
                  <TableCell className="text-right">{item.seongdong}개</TableCell>
                  <TableCell className="text-right">{item.seoul.toLocaleString()}개</TableCell>
                  <TableCell className="text-right">{item.marketShare.toFixed(2)}%</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={item.growth > 10 ? 'default' : 'secondary'}>
                      +{item.growth}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 p-4 bg-slate-50 rounded-lg">
            <p className="text-slate-700">
              성동구는 서울시 전체 소상공인 중 평균 <strong>3.5%</strong>의 점유율을 보이며,
              특히 카페 업종의 성장세가 두드러집니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>성동구 상위 매출 점포</CardTitle>
          <CardDescription>업종별 벤치마킹 대상 (익명 처리)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">순위</TableHead>
                <TableHead>점포명</TableHead>
                <TableHead>업종</TableHead>
                <TableHead className="text-right">월평균 매출</TableHead>
                <TableHead className="text-right">성장률</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPerformers.map((item) => (
                <TableRow key={item.rank}>
                  <TableCell>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white">
                      {item.rank}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-900">{item.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-slate-900">
                    ₩{(item.revenue / 1000000).toFixed(1)}M
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-green-600">+{item.growth}%</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 p-4 bg-amber-50 rounded-lg">
            <p className="text-amber-900">
              <strong>인사이트:</strong> 상위 점포들의 공통점은 SNS 마케팅 활용과 
              독특한 콘셉트로 재방문율이 50% 이상입니다.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
