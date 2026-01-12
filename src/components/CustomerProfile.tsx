import { ChurnRiskInsights } from './ChurnRiskInsights';

export function CustomerProfile() {
  const customerData = {
    id: 'William Smith',
    email: 'will.smith2367@gmail.com',
    churnScore: 87,
    arrAtRisk: 1249,
    currency: 'USD',
    lastUpdated: '3 days ago',
    riskFactors: [
      {
        id: '1',
        icon: '📅',
        title: 'Billing Period: Yearly',
        subtitle: 'Premium Plan',
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
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Profile</h1>
          <p className="text-gray-600">{customerData.email}</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>
        </div  >
        
        <ChurnRiskInsights customer={customerData} />
         
      </div>
    </div>
  );
}
