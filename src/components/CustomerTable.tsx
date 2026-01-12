import { useState, useEffect } from 'react';
import { FileText, Gift, CreditCard, Package, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { CustomerWithDrivers } from '../lib/supabase';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CustomerProfileModal } from './CustomerProfileModal';

interface CustomerTableProps {
  customers: CustomerWithDrivers[];
  riskFilter: 'all' | 'high' | 'medium' | 'low';
  billingStatusFilter: string;
  riskThemeFilter?: string;
}

const ITEMS_PER_PAGE = 10;

export function CustomerTable({ customers, riskFilter, billingStatusFilter, riskThemeFilter = 'all' }: CustomerTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithDrivers | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredRisk, setHoveredRisk] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [riskFilter, billingStatusFilter, riskThemeFilter]);

  const handleViewDetails = (customer: CustomerWithDrivers) => {
    setSelectedCustomer(customer);
    setIsProfileModalOpen(true);
  };
  const getRiskColor = (score: number) => {
    if (score >= 70) return 'bg-[var(--danger-100)] text-[var(--danger-900)]';
    if (score >= 40) return 'bg-[var(--warning-100)] text-[var(--warning-900)]';
    return 'bg-[var(--success-100)] text-[var(--success-900)]';
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return 'High';
    if (score >= 40) return 'Medium';
    return 'Low';
  };

  const getRiskTheme = (customer: CustomerWithDrivers) => {
    const themes = [
      { name: 'Payment Experience', trend: 'up', color: 'var(--danger-500)', bgColor: 'var(--danger-100)', textColor: 'var(--danger-900)' },
      { name: 'Engagement Depth', trend: 'down', color: 'var(--warning-600)', bgColor: 'var(--warning-100)', textColor: 'var(--warning-900)' },
      { name: 'Renewal Timing', trend: 'up', color: 'var(--danger-500)', bgColor: 'var(--danger-100)', textColor: 'var(--danger-900)' },
      { name: 'Lifecycle Stage', trend: 'up', color: 'var(--warning-600)', bgColor: 'var(--warning-100)', textColor: 'var(--warning-900)' },
      { name: 'Value Alignment', trend: 'down', color: 'var(--warning-600)', bgColor: 'var(--warning-100)', textColor: 'var(--warning-900)' }
    ];

    const index = Math.abs(customer.name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % themes.length;
    return themes[index];
  };

  const filteredCustomers = customers.filter(customer => {
    if (riskFilter !== 'all') {
      if (customer.risk_level !== riskFilter) return false;
    }

    if (riskThemeFilter !== 'all') {
      const theme = getRiskTheme(customer);
      if (theme.name !== riskThemeFilter) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[var(--neutral-0)] rounded-[var(--radius-lg)] border border-[var(--neutral-200)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead style={{ background: 'linear-gradient(to right, #fff8f4, #fff0e9)', borderBottom: '1px solid #ffd9c7' }}>
            <tr>
              <th className="px-[var(--space-xs)] py-[var(--space-xs)] text-left caption-semibold text-[var(--neutral-900)]">Customer</th>
              <th className="px-[var(--space-xs)] py-[var(--space-xs)] text-left caption-semibold text-[var(--neutral-900)]">Plan & Subscription</th>
              <th className="px-[var(--space-xs)] py-[var(--space-xs)] text-left caption-semibold text-[var(--neutral-900)]">Churn Risk</th>
              <th className="px-[var(--space-xs)] py-[var(--space-xs)] text-left caption-semibold text-[var(--neutral-900)]">Risk Theme</th>
              <th className="px-[var(--space-xs)] py-[var(--space-xs)] text-left caption-semibold text-[var(--neutral-900)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--neutral-200)]">
            {paginatedCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-[var(--space-xs)] py-[var(--space-sm)] text-center">
                  <p className="caption-regular text-[var(--neutral-500)]">No customers found matching the selected filters</p>
                </td>
              </tr>
            ) : (
              paginatedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[var(--neutral-50)] transition-colors">
                <td className="px-[var(--space-xs)] py-[var(--space-xs)] caption-medium text-[var(--neutral-900)]">{customer.name}</td>
                <td className="px-[var(--space-xs)] py-[var(--space-xs)] caption-regular text-[var(--neutral-700)]">
                  <div className="flex items-center gap-1 mb-0.5">
                    <Package className="h-3 w-3" style={{ color: '#ffab84' }} />
                    <span className="caption-semibold" style={{ color: '#ffab84' }}>{customer.subscription_plan}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[var(--neutral-500)]">
                    <CreditCard className="h-2.5 w-2.5" />
                    <span>{customer.subscription_id}</span>
                  </div>
                </td>
                <td className="px-[var(--space-xs)] py-[var(--space-xs)]">
                  <div className="relative inline-block">
                    <div
                      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${getRiskColor(customer.churn_score)} cursor-help`}
                      onMouseEnter={() => setHoveredRisk(customer.id)}
                      onMouseLeave={() => setHoveredRisk(null)}
                    >
                      <span className="text-xs font-bold">{customer.churn_score}</span>
                      <span className="caption-semibold">{getRiskLabel(customer.churn_score)}</span>
                      <Info className="w-3 h-3 opacity-60" />
                    </div>

                    {hoveredRisk === customer.id && (
                      <div className="absolute z-50 w-48 bg-white rounded-lg shadow-xl border border-[var(--neutral-200)] p-2 left-0 top-full mt-1">
                        <p className="text-xs text-[var(--neutral-700)]">
                          Scores range from 0–100. Higher scores indicate higher churn risk.
                        </p>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-[var(--space-xs)] py-[var(--space-xs)]">
                  {(() => {
                    const theme = getRiskTheme(customer);
                    return (
                      <div className="inline-flex items-center gap-1">
                        {theme.trend === 'up' ? (
                          <TrendingUp size={14} style={{ color: theme.color }} />
                        ) : (
                          <TrendingDown size={14} style={{ color: theme.color }} />
                        )}
                        <span className="caption-medium text-[var(--neutral-900)]">
                          {theme.name}
                        </span>
                      </div>
                    );
                  })()}
                </td>
                <td className="px-[var(--space-xs)] py-[var(--space-xs)]">
                  <div className="flex flex-col gap-1">
                    <button className="flex items-center justify-center gap-1 px-2 py-1 text-white rounded transition-colors text-xs font-medium whitespace-nowrap" style={{ backgroundColor: '#ffab84' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ff9570'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffab84'}>
                      <Gift size={12} />
                      Send Offer
                    </button>
                    <button
                      className="flex items-center justify-center gap-1 px-2 py-1 bg-[var(--neutral-0)] border rounded transition-colors text-xs font-medium whitespace-nowrap"
                      style={{ borderColor: '#ffd9c7', color: '#ffab84' }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff8f4'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      onClick={() => handleViewDetails(customer)}
                    >
                      <FileText size={12} />
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="px-[var(--space-xs)] py-[var(--space-xs)] border-t border-[var(--neutral-200)] flex items-center justify-between">
          <div className="caption-regular text-[var(--neutral-600)]">
            {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-[var(--neutral-100)] text-[var(--neutral-400)] cursor-not-allowed'
                  : 'bg-[var(--neutral-0)] border border-[var(--neutral-300)] text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]'
              }`}
            >
              <ChevronLeft className="w-3 h-3" />
              Prev
            </button>

            <div className="flex items-center gap-0.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    currentPage === page
                      ? 'text-white'
                      : 'bg-[var(--neutral-0)] border border-[var(--neutral-300)] text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]'
                  }`}
                  style={
                    currentPage === page
                      ? { backgroundColor: '#ffab84' }
                      : {}
                  }
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-[var(--neutral-100)] text-[var(--neutral-400)] cursor-not-allowed'
                  : 'bg-[var(--neutral-0)] border border-[var(--neutral-300)] text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]'
              }`}
            >
              Next
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <CustomerProfileModal
        customer={selectedCustomer}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
}
