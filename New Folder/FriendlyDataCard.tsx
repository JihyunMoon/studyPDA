import { Card, CardContent } from './ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FriendlyDataCardProps {
  label: string;
  value: string;
  change?: number;
  explanation: string;
  isGood?: boolean | null;
  comparison?: string;
}

export function FriendlyDataCard({ 
  label, 
  value, 
  change, 
  explanation, 
  isGood = null,
  comparison 
}: FriendlyDataCardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return Minus;
    return change > 0 ? TrendingUp : TrendingDown;
  };

  const getTrendColor = () => {
    if (isGood === null) {
      // Auto-detect based on change
      if (change === undefined || change === 0) return 'text-[#6B7280]';
      return change > 0 ? 'text-[#10B981]' : 'text-[#EF4444]';
    }
    return isGood ? 'text-[#10B981]' : 'text-[#F59E0B]';
  };

  const TrendIcon = getTrendIcon();
  const trendColor = getTrendColor();

  return (
    <Card className="border border-[#444]/10 shadow-sm bg-white hover:shadow-md transition-shadow">
      <CardContent className="p-5">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-[#6B7280] mb-1">{label}</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-[#444]">{value}</h3>
                {change !== undefined && (
                  <div className={`flex items-center gap-1 ${trendColor}`}>
                    <TrendIcon className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      {change > 0 ? '+' : ''}{change}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="pt-3 border-t border-[#444]/10">
            <p className="text-sm text-[#444] leading-relaxed">
              {explanation}
            </p>
            {comparison && (
              <p className="text-xs text-[#6B7280] mt-2">
                📊 {comparison}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
