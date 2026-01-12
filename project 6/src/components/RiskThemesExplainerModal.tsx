import { X, Brain, Target, TrendingUp } from 'lucide-react';

interface RiskThemesExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RiskThemesExplainerModal({ isOpen, onClose }: RiskThemesExplainerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-[var(--radius-lg)] shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--neutral-200)] flex items-center justify-between">
          <h2 className="heading-md text-[var(--neutral-900)]">Understanding Risk Themes</h2>
          <button
            onClick={onClose}
            className="p-[var(--space-si)] hover:bg-[var(--neutral-100)] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[var(--neutral-600)]" />
          </button>
        </div>

        <div className="overflow-y-auto px-[var(--space-md)] py-[var(--space-md)] space-y-[var(--space-md)]">
          <div className="space-y-[var(--space-sm)]">
            <div className="flex items-start gap-[var(--space-sm)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#ffab84]/10">
                <Target className="h-5 w-5" style={{ color: '#ffab84' }} />
              </div>
              <div>
                <h3 className="para-bold text-[var(--neutral-900)] mb-[var(--space-xs)]">What are Risk Themes?</h3>
                <p className="para-regular text-[var(--neutral-700)]">
                  Risk themes are clusters of behavioral patterns and customer attributes that indicate churn likelihood.
                  Rather than showing individual data points, we group related signals into meaningful categories that
                  explain <em>why</em> customers are at risk.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-[var(--space-sm)]">
            <div className="flex items-start gap-[var(--space-sm)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#ffab84]/10">
                <Brain className="h-5 w-5" style={{ color: '#ffab84' }} />
              </div>
              <div>
                <h3 className="para-bold text-[var(--neutral-900)] mb-[var(--space-xs)]">How SHAP Values Work</h3>
                <p className="para-regular text-[var(--neutral-700)] mb-[var(--space-xs)]">
                  SHAP (SHapley Additive exPlanations) is an advanced machine learning technique that reveals which
                  factors contribute most to each customer's churn risk score.
                </p>
                <div className="bg-[var(--neutral-50)] rounded-[var(--radius-md)] p-[var(--space-sm)] space-y-[var(--space-xs)]">
                  <div className="flex items-start gap-[var(--space-xs)]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neutral-500)]"></span>
                    <p className="para-regular text-[var(--neutral-700)]">
                      <strong>Individual Impact:</strong> Each customer attribute gets a SHAP value showing how much it increases or decreases churn risk
                    </p>
                  </div>
                  <div className="flex items-start gap-[var(--space-xs)]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neutral-500)]"></span>
                    <p className="para-regular text-[var(--neutral-700)]">
                      <strong>Fair Attribution:</strong> Borrowed from game theory, SHAP fairly distributes prediction credit across all features
                    </p>
                  </div>
                  <div className="flex items-start gap-[var(--space-xs)]">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--neutral-500)]"></span>
                    <p className="para-regular text-[var(--neutral-700)]">
                      <strong>Explainable AI:</strong> Unlike black-box models, SHAP provides transparency into why the model makes specific predictions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-[var(--space-sm)]">
            <div className="flex items-start gap-[var(--space-sm)]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[#ffab84]/10">
                <TrendingUp className="h-5 w-5" style={{ color: '#ffab84' }} />
              </div>
              <div>
                <h3 className="para-bold text-[var(--neutral-900)] mb-[var(--space-xs)]">Segmentation Process</h3>
                <p className="para-regular text-[var(--neutral-700)] mb-[var(--space-xs)]">
                  We analyze SHAP values across your entire customer base to identify patterns:
                </p>
                <div className="space-y-[var(--space-sm)]">
                  <div className="border-l-4 border-l-[#ffab84] bg-[var(--neutral-50)] rounded-[var(--radius-md)] p-[var(--space-sm)]">
                    <p className="para-medium text-[var(--neutral-900)] mb-[var(--space-si)]">Step 1: Calculate SHAP Values</p>
                    <p className="caption-regular text-[var(--neutral-700)]">
                      For each customer, we compute how much each feature (payment history, engagement metrics, etc.)
                      contributes to their churn risk score
                    </p>
                  </div>

                  <div className="border-l-4 border-l-[#ffab84] bg-[var(--neutral-50)] rounded-[var(--radius-md)] p-[var(--space-sm)]">
                    <p className="para-medium text-[var(--neutral-900)] mb-[var(--space-si)]">Step 2: Aggregate by Theme</p>
                    <p className="caption-regular text-[var(--neutral-700)]">
                      Related features are grouped into themes (e.g., all payment-related signals form "Payment Experience")
                    </p>
                  </div>

                  <div className="border-l-4 border-l-[#ffab84] bg-[var(--neutral-50)] rounded-[var(--radius-md)] p-[var(--space-sm)]">
                    <p className="para-medium text-[var(--neutral-900)] mb-[var(--space-si)]">Step 3: Rank by Impact</p>
                    <p className="caption-regular text-[var(--neutral-700)]">
                      Themes are ranked by their average SHAP magnitude to surface the most influential drivers of churn
                    </p>
                  </div>

                  <div className="border-l-4 border-l-[#ffab84] bg-[var(--neutral-50)] rounded-[var(--radius-md)] p-[var(--space-sm)]">
                    <p className="para-medium text-[var(--neutral-900)] mb-[var(--space-si)]">Step 4: Assign Risk Levels</p>
                    <p className="caption-regular text-[var(--neutral-700)]">
                      Themes with consistently high positive SHAP values are labeled HIGH RISK, while stable patterns are MODERATE RISK
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--warning-50)] border border-[var(--warning-200)] rounded-[var(--radius-md)] p-[var(--space-sm)]">
            <p className="para-medium text-[var(--warning-900)] mb-[var(--space-si)]">Why This Matters</p>
            <p className="caption-regular text-[var(--neutral-700)]">
              Understanding risk themes helps you take targeted action. Instead of generic retention campaigns,
              you can address specific pain points: fix payment friction for at-risk accounts, boost engagement
              for inactive users, or optimize renewal communications based on lifecycle stage.
            </p>
          </div>
        </div>

        <div className="px-[var(--space-md)] py-[var(--space-sm)] border-t border-[var(--neutral-200)] flex justify-end">
          <button
            onClick={onClose}
            className="px-[var(--space-md)] py-[var(--space-xs)] rounded-[var(--radius-md)] para-medium text-white transition-colors"
            style={{ backgroundColor: '#ffab84' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff9567'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffab84'}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
