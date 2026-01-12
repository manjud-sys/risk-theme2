import { X, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface RiskFactor {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  multiplier: number;
  description: string;
}

interface CustomerData {
  churnScore: number;
  arrAtRisk: number;
  currency: string;
  lastUpdated: string;
  riskFactors: RiskFactor[];
  summaryImpact: {
    overallMultiplier: number;
    description: string;
  };
  modelVersion: string;
  suggestedPlays: string[];
}

interface ChurnRiskInsightsProps {
  customer: CustomerData;
  onClose?: () => void;
}

export function ChurnRiskInsights({ customer, onClose }: ChurnRiskInsightsProps) {
  const getMultiplierColor = (multiplier: number) => {
    if (multiplier >= 2.0) return 'bg-red-500';
    if (multiplier >= 1.5) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  const getMultiplierTextColor = (multiplier: number) => {
    if (multiplier >= 2.0) return 'text-red-600';
    if (multiplier >= 1.5) return 'text-orange-600';
    return 'text-yellow-600';
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Churn Risk Insights</CardTitle>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left Side - Factors Affecting Churn */}
          <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
            <h3 className="text-base font-semibold text-gray-900 mb-6">
              Factors Affecting Churn
            </h3>

            <div className="space-y-6">
              {customer.riskFactors.map((factor) => (
                <div key={factor.id} className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="text-2xl mt-0.5">{factor.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm mb-1">
                          {factor.title}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {factor.description}
                        </p>
                      </div>
                    </div>
                    <div className={`${getMultiplierTextColor(factor.multiplier)} font-bold text-sm whitespace-nowrap`}>
                      {factor.multiplier.toFixed(1)}x
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getMultiplierColor(factor.multiplier)}`}
                      style={{ width: `${Math.min((factor.multiplier / 2.5) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Summary, Action, and Plays */}
          <div className="p-8 bg-gray-50">
            <div className="space-y-6">
              {/* Summary Section */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Summary of Insights
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <TrendingUp className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {customer.summaryImpact.overallMultiplier}x
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                        Higher Churn Risk
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {customer.summaryImpact.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>Updated {customer.lastUpdated}</span>
                  <span>•</span>
                  <span>Model {customer.modelVersion}</span>
                </div>
              </div>

              {/* Take Action Button */}
              <div>
                <Button
                  className="w-full text-white font-medium hover:opacity-90 transition-opacity shadow-sm"
                  style={{ backgroundColor: '#ff8b5a' }}
                  size="lg"
                >
                  Take Action in Growth
                </Button>
              </div>

              {/* Suggested Plays */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Suggested Plays
                </h3>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <ul className="space-y-2.5">
                    {customer.suggestedPlays.map((play, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2" />
                        <span className="flex-1">{play}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
