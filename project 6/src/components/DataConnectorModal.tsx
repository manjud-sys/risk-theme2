import { X, Database, Link, Upload, Cloud, BarChart3, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

interface DataConnectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DataConnectorModal({ isOpen, onClose }: DataConnectorModalProps) {
  if (!isOpen) return null;

  const connectors = [
   
    {
      id: 'usage',
      name: 'Product Usage Analytics',
      description: 'Track feature adoption and engagement patterns',
      icon: BarChart3,
      status: 'available',
      impact: 'High impact on accuracy'
    },
    {
      id: 'support',
      name: 'Support Ticket Data',
      description: 'Incorporate customer service interactions and issue resolution',
      icon: Link,
      status: 'available',
      impact: 'Medium impact on accuracy'
    },
    {
      id: 'nps',
      name: 'Customer Feedback & NPS',
      description: 'Include satisfaction scores and survey responses',
      icon: TrendingUp,
      status: 'available',
      impact: 'Medium impact on accuracy'
    },
    {
      id: 'crm',
      name: 'CRM Data',
      description: 'Import customer interactions and relationship data',
      icon: Cloud,
      status: 'available',
      impact: 'Medium impact on accuracy'
    },
    {
      id: 'custom',
      name: 'Custom Data Upload',
      description: 'Upload CSV files with additional customer attributes',
      icon: Upload,
      status: 'available',
      impact: 'Variable impact'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-[var(--space-md)] z-50">
      <div className="bg-[var(--neutral-0)] rounded-[var(--radius-lg)] max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        <div className="px-[var(--space-md)] py-[var(--space-sm)] border-b border-[var(--neutral-200)] flex items-center justify-between">
          <div>
            <h2 className="heading-sm text-[var(--neutral-900)]">Add Data Sources</h2>
            <p className="para-regular text-[var(--neutral-600)] mt-[var(--space-si)]">
              Connect additional data sources to improve prediction accuracy
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-[var(--space-si)] hover:bg-[var(--neutral-100)] rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[var(--neutral-500)]" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-[var(--space-md)]">
          <div className="bg-[#e0f2fe] border border-[#bae6fd] rounded-[var(--radius-lg)] p-[var(--space-sm)] mb-[var(--space-md)]">
            <p className="para-semibold text-[var(--neutral-900)] mb-[var(--space-si)]">
              Current Model Accuracy: 78%
            </p>
            <p className="caption-regular text-[var(--neutral-700)]">
              Adding more data sources can improve prediction accuracy by up to 15%
            </p>
          </div>

          <div className="space-y-[var(--space-sm)]">
            {connectors.map((connector) => (
              <div
                key={connector.id}
                className="border border-[var(--neutral-200)] rounded-[var(--radius-lg)] p-[var(--space-sm)] hover:border-[var(--primary-300)] hover:bg-[var(--neutral-50)] transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-[var(--space-sm)]">
                  <div className="p-[var(--space-xs)] bg-[var(--primary-50)] rounded-[var(--radius-md)] group-hover:bg-[var(--primary-100)] transition-colors">
                    <connector.icon className="w-5 h-5 text-[var(--primary-600)]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-[var(--space-si)]">
                      <h3 className="para-semibold text-[var(--neutral-900)]">
                        {connector.name}
                      </h3>
                      <span className="caption-regular px-[var(--space-xs)] py-[2px] bg-[var(--success-100)] text-[var(--success-800)] rounded-[var(--radius-sm)]">
                        {connector.status}
                      </span>
                    </div>

                    <p className="para-regular text-[var(--neutral-600)] mb-[var(--space-si)]">
                      {connector.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="caption-medium text-[var(--primary-600)]">
                        {connector.impact}
                      </span>
                      <Button
                        style={{ backgroundColor: '#ffab84', color: 'white' }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-[var(--space-md)] py-[var(--space-sm)] border-t border-[var(--neutral-200)] flex items-center justify-between bg-[var(--neutral-50)]">
          <p className="caption-regular text-[var(--neutral-600)]">
            Need help? <span className="text-[var(--primary-600)] cursor-pointer hover:underline">Contact support</span>
          </p>
          <Button
            onClick={onClose}
            style={{ backgroundColor: 'white', color: 'var(--neutral-700)', border: '1px solid var(--neutral-300)' }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
