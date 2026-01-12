function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ChurnRiskCardProps {
  level: "high" | "medium" | "low";
  count: number;
  arrAmount: number;
}

const levelConfig = {
  high: {
    label: "High Risk",
    bgClass: "bg-risk-high-bg",
    borderClass: "border-l-risk-high",
    textClass: "text-risk-high",
  },
  medium: {
    label: "Medium Risk",
    bgClass: "bg-risk-medium-bg",
    borderClass: "border-l-risk-medium",
    textClass: "text-risk-medium",
  },
  low: {
    label: "Low Risk",
    bgClass: "bg-risk-low-bg",
    borderClass: "border-l-risk-low",
    textClass: "text-risk-low",
  },
};

export function ChurnRiskCard({ level, count, arrAmount }: ChurnRiskCardProps) {
  const config = levelConfig[level];

  return (
    <div
      className={cn(
        "rounded-lg border-l-4 p-4 transition-all duration-200 hover:card-shadow-hover card-shadow",
        config.bgClass,
        config.borderClass
      )}
    >
      <p className={cn("text-xs font-medium", config.textClass)}>
        {config.label}
      </p>
      <p className="mt-1 text-base font-bold text-foreground">
        {count.toLocaleString()}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        ${(arrAmount / 1000).toFixed(0)}K ARR
      </p>
    </div>
  );
}
