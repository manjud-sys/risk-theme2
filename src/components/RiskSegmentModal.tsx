import { X, Download } from 'lucide-react';
import { CustomerWithDrivers } from '../lib/supabase';
import { CustomerTable } from './CustomerTable';

interface RiskSegmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  riskLevel: 'high' | 'medium' | 'low';
  customers: CustomerWithDrivers[];
}

const riskLabels = {
  high: 'High Risk',
  medium: 'Medium Risk',
  low: 'Low Risk'
};

const riskColors = {
  high: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', button: '#ef4444' },
  medium: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-900', button: '#f59e0b' },
  low: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', button: '#10b981' }
};

export function RiskSegmentModal({ isOpen, onClose, riskLevel, customers }: RiskSegmentModalProps) {
  if (!isOpen) return null;

  const filteredCustomers = customers.filter(customer => {
    if (riskLevel === 'high') return customer.churn_score >= 50;
    if (riskLevel === 'medium') return customer.churn_score >= 30 && customer.churn_score < 50;
    return customer.churn_score < 30;
  });

  const colors = riskColors[riskLevel];
  const totalARR = filteredCustomers.reduce((sum, c) => sum + c.mrr * 12, 0);

  const handleExport = () => {
    const headers = ['Customer', 'Plan', 'Subscription ID', 'Churn Score', 'Risk Level', 'Benchmarking'];
    const csvData = filteredCustomers.map(customer => [
      customer.name,
      customer.subscription_plan,
      customer.subscription_id,
      customer.churn_score,
      customer.churn_score >= 50 ? 'High' : customer.churn_score >= 30 ? 'Medium' : 'Low',
      'Benchmark comparison'
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${riskLevel}-risk-customers.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className={`flex items-center justify-between p-6 border-b ${colors.border} ${colors.bg}`}>
          <div>
            <h2 className={`text-2xl font-bold ${colors.text}`}>
              {riskLabels[riskLevel]} Customers
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {filteredCustomers.length} customers · ${(totalARR / 1000).toFixed(1)}K ARR at risk
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors text-sm font-medium hover:opacity-90"
              style={{ backgroundColor: colors.button }}
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <CustomerTable customers={filteredCustomers} />
        </div>
      </div>
    </div>
  );
}
