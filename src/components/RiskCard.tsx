import { TrendingUp, TrendingDown } from 'lucide-react';

interface RiskCardProps {
  title: string;
  count: number;
  countPercentage: number;
  arr: string;
  arrPercentage: number;
  variant: 'high' | 'medium' | 'low';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  onClick?: () => void;
}

export function RiskCard({ title, count, countPercentage, arr, arrPercentage, variant, trend, onClick }: RiskCardProps) {
  const variantStyles = {
    high: 'bg-[var(--danger-100)] text-black',
    medium: 'bg-[var(--warning-100)] text-black',
    low: 'bg-[var(--success-100)] text-black'
  };

  const mediumStyle = variant === 'medium' ? { backgroundColor: 'var(--warning-100)' } : {};

  const getTrendColor = () => {
    if (variant === 'high') {
      return trend?.direction === 'up' ? 'text-[var(--danger-600)]' : 'text-[var(--success-600)]';
    } else if (variant === 'low') {
      return trend?.direction === 'up' ? 'text-[var(--success-600)]' : 'text-[var(--danger-600)]';
    }
    return trend?.direction === 'up' ? 'text-[var(--warning-600)]' : 'text-[var(--success-600)]';
  };

  return (
    <div
      className={`flex-1 p-[var(--space-sm)] ${variantStyles[variant]} flex flex-col items-center justify-center relative cursor-pointer hover:opacity-90 transition-opacity min-h-[120px]`}
      style={mediumStyle}
      onClick={onClick}
    >
      <p className="text-xs font-semibold mb-1.5 uppercase tracking-wide">{title}</p>

      <div className="flex items-baseline gap-1 mb-0.5">
        <p className="text-base font-bold">{arr}</p>
        <p className="text-xs font-semibold opacity-80">({arrPercentage}%)</p>
      </div>
      <p className="text-xs opacity-70 mb-2">ARR at risk</p>

      <div className="flex items-baseline gap-1 mb-0.5">
        <p className="text-base font-bold">{count}</p>
        <p className="text-xs font-semibold opacity-80">({countPercentage}%)</p>
      </div>
      <p className="text-xs opacity-70 mb-1.5">no of customers</p>

      {trend && (
        <div className="flex items-center gap-1.5 mt-0.5">
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            {trend.direction === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-bold">{trend.value}</span>
          </div>
          <p className="text-xs opacity-60">vs. last week</p>
        </div>
      )}
    </div>
  );
}
