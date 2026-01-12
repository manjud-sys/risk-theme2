import { X } from 'lucide-react';
import { CustomerWithDrivers } from '../lib/supabase';
import { ChurnRiskInsights } from './ChurnRiskInsights';

interface CustomerProfileModalProps {
  customer: CustomerWithDrivers | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerProfileModal({ customer, isOpen, onClose }: CustomerProfileModalProps) {
  if (!isOpen || !customer) return null;

  const customerData = {
    id: customer.name,
    email: customer.email || `${customer.name.toLowerCase().replace(' ', '.')}@example.com`,
    churnScore: customer.churn_score,
    arrAtRisk: customer.arr || 1249,
    currency: 'USD',
    lastUpdated: '3 days ago',
    riskFactors: [
      {
        id: '1',
        icon: '📅',
        title: 'Billing Period: Yearly',
        subtitle: customer.subscription_plan,
        multiplier: 2.0,
        description: 'Annual billing increases odds of churn compared to monthly'
      },
      {
        id: '2',
        icon: '💳',
        title: 'Recent Payment Failure',
        multiplier: 1.2,
        description: 'Most recent payment failed'
      },
      {
        id: '3',
        icon: '📧',
        title: '18.3% Delayed Payment',
        multiplier: 1.1,
        description: 'Overdue invoices last 3 months'
      },
      {
        id: '4',
        icon: '📅',
        title: '95 Paying Days Active',
        multiplier: 1.1,
        description: 'Short active paid tenure of 95 days'
      }
    ],
    summaryImpact: {
      overallMultiplier: 5.7,
      description: 'Overall, this customer has 5.7x higher odds of churn compared to your baseline due to annual billing, recent payment failures, delayed payment, short active tenure.'
    },
    modelVersion: 'v2.3.1',
    suggestedPlays: [
      'Save Offer',
      'Usage Re-engagement Sequence',
      'Payment Recovery Workflow'
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-[1400px] w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Customer Profile</h2>
            <p className="text-gray-600 text-sm">{customerData.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Customer ID</p>
                <p className="text-lg font-semibold text-gray-900">{customerData.id}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Churn Score</p>
                <p className="text-lg font-semibold text-red-600">{customerData.churnScore}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">ARR at Risk</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${customerData.arrAtRisk.toLocaleString()} / year
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Subscription Plan</p>
                <p className="text-lg font-semibold text-gray-900">{customer.subscription_plan}</p>
              </div>
            </div>
          </div>

          <ChurnRiskInsights customer={customerData} />
        </div>
      </div>
    </div>
  );
}
