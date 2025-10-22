import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function CohortAnalysis() {
  // Cohort data: rows = acquisition month, columns = months since acquisition
  const cohortData = [
    { month: '2024-01', m0: 100, m1: 45, m2: 38, m3: 32, m4: 28, m5: 25 },
    { month: '2024-02', m0: 100, m1: 48, m2: 41, m3: 35, m4: 31, m5: null },
    { month: '2024-03', m0: 100, m1: 52, m2: 44, m3: 39, m4: null, m5: null },
    { month: '2024-04', m0: 100, m1: 46, m2: 40, m3: null, m4: null, m5: null },
    { month: '2024-05', m0: 100, m1: 50, m2: null, m3: null, m4: null, m5: null },
    { month: '2024-06', m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null },
  ];

  const getColorClass = (value: number | null) => {
    if (value === null) return 'bg-slate-100 text-slate-400';
    if (value >= 50) return 'bg-green-100 text-green-900';
    if (value >= 40) return 'bg-blue-100 text-blue-900';
    if (value >= 30) return 'bg-yellow-100 text-yellow-900';
    return 'bg-red-100 text-red-900';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>코호트 재방문율 분석</CardTitle>
          <CardDescription>
            월별 신규 고객의 시간 경과에 따른 재방문 비율 (단위: %)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>획득 월</TableHead>
                  <TableHead className="text-center">첫 방문</TableHead>
                  <TableHead className="text-center">1개월 후</TableHead>
                  <TableHead className="text-center">2개월 후</TableHead>
                  <TableHead className="text-center">3개월 후</TableHead>
                  <TableHead className="text-center">4개월 후</TableHead>
                  <TableHead className="text-center">5개월 후</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohortData.map((row) => (
                  <TableRow key={row.month}>
                    <TableCell className="text-slate-900">{row.month}</TableCell>
                    <TableCell className={`text-center ${getColorClass(row.m0)}`}>
                      {row.m0}%
                    </TableCell>
                    <TableCell className={`text-center ${getColorClass(row.m1)}`}>
                      {row.m1 !== null ? `${row.m1}%` : '-'}
                    </TableCell>
                    <TableCell className={`text-center ${getColorClass(row.m2)}`}>
                      {row.m2 !== null ? `${row.m2}%` : '-'}
                    </TableCell>
                    <TableCell className={`text-center ${getColorClass(row.m3)}`}>
                      {row.m3 !== null ? `${row.m3}%` : '-'}
                    </TableCell>
                    <TableCell className={`text-center ${getColorClass(row.m4)}`}>
                      {row.m4 !== null ? `${row.m4}%` : '-'}
                    </TableCell>
                    <TableCell className={`text-center ${getColorClass(row.m5)}`}>
                      {row.m5 !== null ? `${row.m5}%` : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="text-blue-900 mb-2">주요 인사이트</h4>
              <ul className="space-y-1 text-blue-800">
                <li>• 첫 달 이후 평균 재방문율: <strong>48.2%</strong></li>
                <li>• 3개월 후 안정적인 재방문율: <strong>35%</strong></li>
                <li>• 2024년 3월 코호트가 가장 우수한 성과</li>
              </ul>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="text-amber-900 mb-2">개선 제안</h4>
              <ul className="space-y-1 text-amber-800">
                <li>• 1개월 차 이탈률 개선 필요 (평균 52% 이탈)</li>
                <li>• 첫 방문 후 1주일 내 재방문 프로모션 추천</li>
                <li>• 3개월 이상 장기 고객 대상 VIP 프로그램</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Color Legend */}
      <Card>
        <CardHeader>
          <CardTitle>색상 가이드</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded"></div>
              <span className="text-slate-700">매우 좋음 (50% 이상)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded"></div>
              <span className="text-slate-700">좋음 (40-49%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-100 rounded"></div>
              <span className="text-slate-700">보통 (30-39%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-100 rounded"></div>
              <span className="text-slate-700">개선 필요 (30% 미만)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
