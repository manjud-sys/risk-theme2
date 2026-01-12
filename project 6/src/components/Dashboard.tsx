import { useState, useRef } from 'react';
import { RiskCard } from './RiskCard';
import { CustomerTable } from './CustomerTable';
import { ModelPerformance } from './ModelPerformance';
import { ChurnPredictionChart } from './ChurnPredictionChart';
import { useChurnData } from '../hooks/useChurnData';
import { Loader2, Info, X, Zap, Filter, Plus, Trash2, Database, CreditCard, TrendingUp, Clock, RefreshCw, Target } from 'lucide-react';
import { DriversOfChurn } from './DriversOfChurnProps';
import { AudienceFilter } from './AudienceFilter';
import { Button } from './ui/button';
import { EnableChurnScoreModal } from './EnableChurnScoreModal';
import { FilterListModal } from './FilterListModal';
import { DataConnectorModal } from './DataConnectorModal';
import { RiskThemesExplainerModal } from './RiskThemesExplainerModal';

interface Filter {
  id: string;
  attribute: string;
  condition: string;
  value: string;
}

export function Dashboard() {
  const { customers, loading, error } = useChurnData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCoverageTooltip, setShowCoverageTooltip] = useState(false);
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [billingStatusFilter, setBillingStatusFilter] = useState<string>('all');
  const [riskThemeFilter, setRiskThemeFilter] = useState<string>('all');
  const [advancedFilters, setAdvancedFilters] = useState<Filter[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDataConnectorModalOpen, setIsDataConnectorModalOpen] = useState(false);
  const [isRiskThemesModalOpen, setIsRiskThemesModalOpen] = useState(false);
  const customerTableRef = useRef<HTMLDivElement>(null);

  const handleRiskCardClick = (riskLevel: 'high' | 'medium' | 'low') => {
    setRiskFilter(riskLevel);
    setTimeout(() => {
      customerTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleRiskThemeClick = (themeName: string) => {
    setRiskThemeFilter(themeName);
    setTimeout(() => {
      customerTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const hasActiveFilters = riskFilter !== 'all' || billingStatusFilter !== 'all' || riskThemeFilter !== 'all' || advancedFilters.length > 0;

  const clearAllFilters = () => {
    setRiskFilter('all');
    setBillingStatusFilter('all');
    setRiskThemeFilter('all');
    setAdvancedFilters([]);
  };

  const handleRemoveAdvancedFilter = (id: string) => {
    setAdvancedFilters(advancedFilters.filter(f => f.id !== id));
  };

  const lastRefreshed = new Date();
  lastRefreshed.setDate(lastRefreshed.getDate() - 7);
  const formattedDate = lastRefreshed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--neutral-50)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary-600)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[var(--neutral-50)]">
        <div className="bg-[var(--danger-50)] border border-[var(--danger-200)] rounded-[var(--radius-lg)] p-[var(--space-md)] max-w-md">
          <p className="text-[var(--danger-900)] caption-semibold mb-[var(--space-si)]">Error loading data</p>
          <p className="text-[var(--danger-700)] para-regular">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--neutral-50)]">
      <div className="max-w-[1600px] mx-auto p-[var(--space-md)] space-y-[var(--space-md)]">
        <div className="bg-gradient-to-r from-[#FFFAFA] to-[#FFFAFA] border border-[#FFFFF] rounded-[var(--radius-lg)] p-[var(--space-md)] text-center shadow-lg">
          <h1 className="heading-2xl text-black mb-[var(--space-si)]">
          Chargebee's Predictive Intelligence Dashboard
          </h1>
          <p className="text-black-50 para-regular">
            Predict, prevent, and reduce subscription churn
          </p>
        </div>
        <div className="mb-[var(--space-md)] flex items-center justify-between rounded-[var(--radius-lg)] bg-[var(--warning-50)] border border-[var(--warning-200)] px-[var(--space-sm)] py-[var(--space-xs)] animate-fade-in">
          <p className="para-regular text-[var(--neutral-800)]">
            <span className="para-semibold" style={{ color: '#ffab84' }}>
              Demo Mode:
            </span>{' '}
            Viewing sample subscription data. Connect your Chargebee account to
            analyze real customer behavior and payment patterns.
          </p>
          <Button
            style={{backgroundColor: '#ffab84' }}
            onClick={() => setIsModalOpen(true)}
          >
            Enable
          </Button>
        </div>

        <div className="bg-[var(--neutral-0)] rounded-[var(--radius-lg)] border border-[var(--neutral-200)] overflow-visible">
          <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--neutral-200)]">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="heading-sm text-[var(--neutral-900)]">Customers Predicted to Churn</h2>
                <p className="para-regular text-[var(--neutral-600)] mt-[var(--space-si)]">Risk segmentation based on churn prediction model</p>
              </div>
              <div className="flex flex-col items-end gap-[var(--space-si)]">
                <p className="caption-regular text-[var(--neutral-500)]">Model last refreshed on {formattedDate}</p>
                <div className="flex items-center gap-[var(--space-si)]">
                  <p className="caption-regular text-[var(--neutral-300)]">How churn scores are calculated</p>
                  <div className="relative">
                    <button
                      className="p-[var(--space-si)] hover:bg-[var(--neutral-100)] rounded-full transition-colors"
                      onClick={() => setShowCoverageTooltip(!showCoverageTooltip)}
                      onMouseEnter={() => setShowCoverageTooltip(true)}
                      onMouseLeave={() => setShowCoverageTooltip(false)}
                    >
                      <Info className="w-4 h-4 text-[var(--neutral-500)]" />
                    </button>

                    {showCoverageTooltip && (
                      <div className="absolute right-0 top-8 w-[280px] bg-white rounded-lg shadow-2xl border border-[var(--neutral-200)] z-50 p-[var(--space-sm)]">
                        <h3 className="para-semibold text-[var(--neutral-900)] mb-[var(--space-xs)]">
                          How risk is calculated
                        </h3>

                        <div className="space-y-[var(--space-xs)]">
                          <div>
                            <p className="caption-medium text-[var(--neutral-800)]">
                              Step 1 — Historical data
                            </p>
                            <p className="caption-regular text-[var(--neutral-600)]">
                              Analyzes billing, renewals, and churn patterns
                            </p>
                          </div>

                          <div>
                            <p className="caption-medium text-[var(--neutral-800)]">
                              Step 2 — Pattern learning
                            </p>
                            <p className="caption-regular text-[var(--neutral-600)]">
                              Identifies behaviors before churn
                            </p>
                          </div>

                          <div>
                            <p className="caption-medium text-[var(--neutral-800)]">
                              Step 3 — Ranking risk
                            </p>
                            <p className="caption-regular text-[var(--neutral-600)]">
                              Customers are scored and ranked by churn likelihood
                            </p>
                          </div>

                          <div>
                            <p className="caption-medium text-[var(--neutral-800)]">
                              Step 4 — Segmenting risk
                            </p>
                            <p className="caption-regular text-[var(--neutral-600)]">
                              🔴 High 🟡 Medium 🟢 Low
                            </p>
                          </div>
                        </div>

                        <div className="mt-[var(--space-xs)] pt-[var(--space-xs)] border-t border-[var(--neutral-200)]">
                          <p className="caption-regular text-[var(--neutral-500)]">
                            Updated weekly
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-0 overflow-hidden">
            <RiskCard
              title="High Risk"
              count={52}
              countPercentage={4}
              arr="$23,300"
              arrPercentage={12}
              variant="high"
              trend={{ value: 8, direction: 'up' }}
              onClick={() => handleRiskCardClick('high')}
            />
            <RiskCard
              title="Medium Risk"
              count={315}
              countPercentage={22}
              arr="$45,600"
              arrPercentage={24}
              variant="medium"
              trend={{ value: 12, direction: 'down' }}
              onClick={() => handleRiskCardClick('medium')}
            />
            <RiskCard
              title="Low Risk"
              count={1042}
              countPercentage={74}
              arr="$123,800"
              arrPercentage={64}
              variant="low"
              trend={{ value: 23, direction: 'up' }}
              onClick={() => handleRiskCardClick('low')}
            />
          </div>
        </div>

        <div className="bg-[var(--neutral-0)] rounded-[var(--radius-lg)] border border-[var(--neutral-200)] overflow-hidden mb-[var(--space-lg)]">
          <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--neutral-200)]">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="heading-sm text-[var(--neutral-500)]">Improve Prediction Accuracy</h2>
                <p className="para-regular text-[var(--neutral-500)] mt-[var(--space-si)]">Connect additional data sources to enhance churn predictions with behavioral and engagement signals</p>
              </div>
              <Button
                onClick={() => setIsDataConnectorModalOpen(true)}
                className="flex items-center gap-[var(--space-si)] whitespace-nowrap"
                style={{ backgroundColor: '#ffab84', color: 'white' }}
              >
                <Database className="w-4 h-4" />
                Add More Data
              </Button>
            </div>
          </div>
          <div className="p-[var(--space-md)]">
            <DriversOfChurn
              onLearnMore={() => setIsRiskThemesModalOpen(true)}
              onThemeClick={handleRiskThemeClick}
              themes={[
                  {
                    id: '1',
                    name: 'Payment Experience',
                    icon: CreditCard,
                    indicators: [
                      'Latest transaction failed',
                      'Transaction failure percentage',
                      'Delayed payment patterns',
                      'Auto-collection status',
                      'Payment method stability',
                    ],
                    description: 'Payment friction increases involuntary churn even when customer intent is positive.',
                  },
                  {
                    id: '2',
                    name: 'Engagement Depth',
                    icon: TrendingUp,
                    indicators: [
                      'Invoice generation frequency',
                      'Invoice payment completion rate',
                      'Free tier time spent percentage',
                    ],
                    description: 'Low operational dependence makes renewal easier to drop.',
                  },
                  {
                    id: '3',
                    name: 'Renewal Timing',
                    icon: Clock,
                    indicators: [
                      'Days until upcoming renewal',
                      'Billing period unit',
                      'Past cancellation history',
                    ],
                    description: 'Churn risk concentrates at renewal decision points.',
                  },
                  {
                    id: '4',
                    name: 'Lifecycle Stage',
                    icon: RefreshCw,
                    indicators: [
                      'Total active paid tenure',
                      'Time taken for activation',
                      'Early invoice activity',
                    ],
                    description: 'New customers are more likely to churn before establishing habits and realizing value.',
                  },
                  {
                    id: '5',
                    name: 'Value Alignment',
                    icon: Target,
                    indicators: [
                      'Monthly recurring revenue level',
                      'Currency and pricing tier',
                      'Plan upgrade/downgrade patterns',
                    ],
                    description: 'Mismatch between plan tier and actual usage suggests customer may not perceive sufficient value.',
                  },
                ]}
              />
            </div>
        </div>

        <div ref={customerTableRef} className="bg-[var(--neutral-0)] rounded-[var(--radius-lg)] border border-[var(--neutral-200)] overflow-hidden">
          <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--neutral-200)]">
            <h2 className="heading-sm text-[var(--neutral-900)]">Customer List</h2>
            <p className="para-regular text-[var(--neutral-600)] mt-[var(--space-si)]">Browse and analyze individual customer churn risk scores</p>
          </div>

          <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--neutral-200)]">
            <div className="flex items-start justify-between gap-[var(--space-md)]">
              <div className="flex flex-col gap-[var(--space-xs)] flex-1">
                <div className="flex items-center gap-[var(--space-si)] flex-wrap">
                  <span className="para-medium text-[var(--neutral-700)]">Filters:</span>
                  <button
                    onClick={() => setRiskFilter('high')}
                    className={`px-[var(--space-xs)] py-[1.5] para-regular rounded-[var(--radius-md)] transition-colors ${
                      riskFilter === 'high'
                        ? 'bg-[var(--danger-100)] text-[var(--danger-900)] border-2 border-[var(--danger-500)]'
                        : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                    }`}
                  >
                    High Risk
                  </button>
                  <button
                    onClick={() => setRiskFilter('medium')}
                    className={`px-[var(--space-xs)] py-[1.5] para-regular rounded-[var(--radius-md)] transition-colors ${
                      riskFilter === 'medium'
                        ? 'bg-[var(--warning-100)] text-[var(--warning-900)] border-2 border-[var(--warning-500)]'
                        : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                    }`}
                  >
                    Medium Risk
                  </button>
                  <button
                    onClick={() => setRiskFilter('low')}
                    className={`px-[var(--space-xs)] py-[1.5] para-regular rounded-[var(--radius-md)] transition-colors ${
                      riskFilter === 'low'
                        ? 'bg-[var(--success-100)] text-[var(--success-900)] border-2 border-[var(--success-500)]'
                        : 'bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]'
                    }`}
                  >
                    Low Risk
                  </button>
                </div>

                <div className="flex items-center gap-[var(--space-xs)] flex-wrap">
                  <select
                    value={riskThemeFilter}
                    onChange={(e) => {
                      setRiskThemeFilter(e.target.value);
                      if (e.target.value !== 'all') {
                        setTimeout(() => {
                          customerTableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }
                    }}
                    className="px-[var(--space-sm)] py-[var(--space-mi)] para-regular border border-[var(--neutral-300)] rounded-[var(--radius-md)] bg-[var(--neutral-0)] text-[var(--neutral-700)] focus:outline-none focus:ring-2 focus:border-[var(--neutral-400)]"
                    style={{ focusRingColor: '#ffab84' }}
                  >
                    <option value="all">All Customers</option>
                    <option value="Payment Experience">Payment Experience</option>
                    <option value="Engagement Depth">Engagement Depth</option>
                    <option value="Renewal Timing">Renewal Timing</option>
                    <option value="Lifecycle Stage">Lifecycle Stage</option>
                    <option value="Value Alignment">Value Alignment</option>
                  </select>

                  <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="flex items-center gap-[var(--space-si)] px-[var(--space-sm)] py-[var(--space-mi)] para-regular border border-[var(--primary-500)] text-[var(--primary-600)] rounded-[var(--radius-md)] hover:bg-[var(--primary-50)] transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filter list
                  </button>

                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="flex items-center gap-[var(--space-si)] px-[var(--space-xs)] py-[var(--space-mi)] para-regular text-[var(--primary-600)] hover:bg-[var(--primary-50)] rounded-[var(--radius-md)] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear selection
                    </button>
                  )}
                </div>

                {advancedFilters.length > 0 && (
                  <div className="flex items-center gap-[var(--space-si)] flex-wrap">
                    {advancedFilters.map((filter) => (
                      <div
                        key={filter.id}
                        className="bg-[var(--primary-50)] border border-[var(--primary-200)] rounded-[var(--radius-md)] px-[var(--space-xs)] py-[1.5] flex items-center gap-[var(--space-si)]"
                      >
                        <span className="para-regular text-[var(--neutral-800)]">
                          <span className="para-semibold">{filter.attribute}</span> {filter.condition}
                        </span>
                        <button
                          onClick={() => handleRemoveAdvancedFilter(filter.id)}
                          className="text-[var(--neutral-500)] hover:text-[var(--neutral-700)] transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-[var(--space-xs)] items-end">
                <select
                  className="px-[var(--space-sm)] py-[var(--space-mi)] para-regular border border-[var(--neutral-300)] rounded-[var(--radius-md)] bg-[var(--neutral-0)] text-[var(--neutral-700)] focus:outline-none focus:ring-2 focus:border-[var(--neutral-400)]"
                  style={{ focusRingColor: '#ffab84' }}
                >
                  <option>Sort by Churn Risk</option>
                  <option>Sort by Plan Type</option>
                  <option>Sort by MRR Value</option>
                  <option>Sort by Subscription Date</option>
                  <option>Sort by Payment Status</option>
                </select>

                <div className="flex items-center gap-[var(--space-xs)]">
                  <Button
                    className="flex items-center gap-[var(--space-si)] whitespace-nowrap"
                    style={{backgroundColor: '#2563eb', color: 'white' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                  >
                    <Zap className="w-4 h-4" />
                    Take Action In Growth Play
                  </Button>
                  <Button style={{backgroundColor: '#ffab84' }}>Export</Button>
                </div>
              </div>
            </div>
          </div>

          <CustomerTable
            customers={customers}
            riskFilter={riskFilter}
            billingStatusFilter={billingStatusFilter}
            riskThemeFilter={riskThemeFilter}
          />
        </div>
      </div>

      <EnableChurnScoreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <FilterListModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={setAdvancedFilters}
        activeFilters={advancedFilters}
      />

      <DataConnectorModal
        isOpen={isDataConnectorModalOpen}
        onClose={() => setIsDataConnectorModalOpen(false)}
      />

      <RiskThemesExplainerModal
        isOpen={isRiskThemesModalOpen}
        onClose={() => setIsRiskThemesModalOpen(false)}
      />
    </div>
  );
}
