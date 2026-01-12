import { AlertCircle, CheckCircle } from 'lucide-react';

export function ActualVsPredictedChart() {
  const riskBands = [
    {
      label: 'High Risk',
      subtitle: 'Needs immediate attention',
      stat: '1 in 2',
      description: 'About 1 in 2 customers churned',
      explanation: 'Customers ranked as High Risk historically churned much more often than average. This is where intervention has the highest impact.',
      icon: AlertCircle,
      iconColor: 'var(--danger-500)',
      iconBg: 'var(--danger-100)',
    },
    {
      label: 'Medium Risk',
      subtitle: 'Watch closely',
      stat: '1 in 5',
      description: 'About 1 in 5 customers churned',
      explanation: 'These customers showed early warning signs. Many stayed when engaged proactively.',
      icon: AlertCircle,
      iconColor: 'var(--warning-600)',
      iconBg: 'var(--warning-100)',
    },
    {
      label: 'Low Risk',
      subtitle: 'Likely to stay',
      stat: '1 in 20',
      description: 'Only 1 in 20 customers churned',
      explanation: 'Customers ranked as Low Risk rarely churned during the same period.',
      icon: CheckCircle,
      iconColor: 'var(--success-500)',
      iconBg: 'var(--success-100)',
    }
  ];

  return (
    <div>
      <h3 className="heading-sm text-[var(--neutral-900)] mb-[var(--space-si)]">How churn risk levels performed historically</h3>
      <p className="para-regular text-[var(--neutral-600)] mb-[var(--space-lg)]">
        Based on customers scored 90 days ago and churn observed over the following 90 days
      </p>

      <div className="space-y-[var(--space-md)]">
        {riskBands.map((band, idx) => {
          const Icon = band.icon;
          return (
            <div key={idx} className="border border-[var(--neutral-200)] rounded-[var(--radius-lg)] p-[var(--space-md)]">
              <div className="flex items-start gap-[var(--space-md)]">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: band.iconBg }}
                >
                  <Icon size={20} style={{ color: band.iconColor }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-[var(--space-md)] mb-[var(--space-si)]">
                    <div>
                      <span className="para-semibold text-[var(--neutral-900)]">{band.label}</span>
                      <span className="para-regular text-[var(--neutral-600)]"> - {band.subtitle}</span>
                    </div>
                    <span className="para-semibold text-[var(--neutral-900)] whitespace-nowrap">{band.stat} <span className="para-regular text-[var(--neutral-600)]">churned</span></span>
                  </div>

                  <p className="para-medium text-[var(--neutral-900)] mb-[var(--space-xs)]">
                    {band.description}
                  </p>

                  <p className="caption-regular text-[var(--neutral-600)]">
                    {band.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
