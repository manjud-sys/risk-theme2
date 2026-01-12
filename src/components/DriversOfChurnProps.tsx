import { useState } from "react";
import { CreditCard, TrendingUp, Clock, ArrowUpRight, ChevronDown, ChevronUp, Zap } from "lucide-react";

interface RiskTheme {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  indicators: string[];
  description: string;
}

interface DriversOfChurnProps {
  themes: RiskTheme[];
  onLearnMore?: () => void;
  onThemeClick?: (themeName: string) => void;
}

export function DriversOfChurn({ themes, onLearnMore, onThemeClick }: DriversOfChurnProps) {
  const [expandedTheme, setExpandedTheme] = useState<string | null>(null);

  const toggleTheme = (themeId: string, themeName: string) => {
    setExpandedTheme(expandedTheme === themeId ? null : themeId);
    onThemeClick?.(themeName);
  };

  return (
    <div className="rounded-[var(--radius-lg)] bg-card p-[var(--space-sm)] card-shadow">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="heading-sm text-[var(--neutral-900)]">Top Risk Themes</h3>
          <p className="caption-regular text-[var(--neutral-600)] mt-[var(--space-si)]">
            Primary reasons customers are at risk of cancellation
          </p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLearnMore?.();
          }}
          className="para-regular hover:underline flex items-center gap-1"
          style={{ color: '#ffab84' }}
        >
          Learn More
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mt-[var(--space-sm)] space-y-[var(--space-xs)]">
        {themes.map((theme) => {
          const Icon = theme.icon;
          const isExpanded = expandedTheme === theme.id;

          return (
            <div
              key={theme.id}
              className="border-l-2 border-l-orange-500 bg-white rounded-[var(--radius-sm)] border border-[var(--neutral-200)] transition-all"
            >
              <div
                className="flex items-start justify-between p-[var(--space-xs)] cursor-pointer hover:bg-[var(--neutral-50)]"
                onClick={() => toggleTheme(theme.id, theme.name)}
              >
                <div className="flex items-center gap-[var(--space-xs)]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-neutral-100">
                    <Icon className="h-3.5 w-3.5 text-[var(--neutral-700)]" />
                  </div>
                  <h4 className="para-medium text-[var(--neutral-900)]">{theme.name}</h4>
                </div>
                <div className="flex items-center gap-[var(--space-xs)]">
                  {isExpanded ? (
                    <ChevronUp className="h-3.5 w-3.5 text-[var(--neutral-500)]" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-[var(--neutral-500)]" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-[var(--space-xs)] pb-[var(--space-xs)] border-t border-[var(--neutral-100)] pt-[var(--space-xs)]">
                  <ul className="space-y-[var(--space-si)] ml-8">
                    {theme.indicators.slice(0, 3).map((indicator, index) => (
                      <li key={index} className="flex items-start gap-[var(--space-xs)]">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[var(--neutral-500)]"></span>
                        <span className="caption-regular text-[var(--neutral-700)]">{indicator}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-[var(--space-xs)] ml-8 caption-regular text-[var(--neutral-600)] italic">
                    {theme.description}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="mt-[var(--space-xs)] ml-8 flex items-center gap-[var(--space-si)] px-[var(--space-xs)] py-[var(--space-si)] caption-medium rounded-[var(--radius-sm)] transition-colors"
                    style={{ backgroundColor: '#2563eb', color: 'white' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    <Zap className="w-3 h-3" />
                    Create a play in Growth
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}