import { FileText, Gift, CreditCard, Package } from 'lucide-react';
import { CustomerWithDrivers } from '../lib/supabase';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CustomerTableProps {
  customers: CustomerWithDrivers[];
}

export function CustomerTable({ customers }: CustomerTableProps) {
  const getRiskColor = (score: number) => {
    if (score >= 50) return 'bg-red-100 text-red-900';
    if (score >= 30) return 'bg-yellow-100 text-yellow-900';
    return 'bg-green-100 text-green-900';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 50) return 'High';
    if (score >= 30) return 'Medium';
    return 'Low';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead style={{ background: 'linear-gradient(to right, #fff8f4, #fff0e9)', borderBottom: '1px solid #ffd9c7' }}>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Plan & Subscription</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Churn Risk</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Risk Drivers</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="h-4 w-4" style={{ color: '#ffab84' }} />
                    <span className="font-semibold" style={{ color: '#ffab84' }}>{customer.subscription_plan}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <CreditCard className="h-3 w-3" />
                    <span>{customer.subscription_id}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center px-3 py-2 rounded-md ${getRiskColor(customer.churn_score)}`}>
                    <span className="text-2xl font-bold mr-2">{customer.churn_score}</span>
                    <span className="text-sm font-semibold">{getRiskLabel(customer.churn_score)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <ul className="space-y-1">
                    {customer.drivers.map((driver) => (
                      <li key={driver.id}>
                        {driver.driver_name} - {driver.impact} <TrendingUp className="w-5 h-5" />
                      </li>
                    ))}
                  </ul>
           </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center justify-center gap-2 px-4 py-2 text-white rounded-md transition-colors text-sm font-medium" style={{ backgroundColor: '#ffab84' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff9570'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffab84'}>
                      <Gift size={16} />
                      Send Retention Offer
                    </button>
                    <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-md transition-colors text-sm font-medium" style={{ borderColor: '#ffd9c7', color: '#ffab84' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff8f4'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <FileText size={16} />
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
