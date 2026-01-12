import { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';

interface Filter {
  id: string;
  attribute: string;
  condition: string;
  value: string;
}

interface FilterListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: Filter[]) => void;
  activeFilters: Filter[];
}

const CUSTOMER_ATTRIBUTES = [
  'Payment Terms',
  'Id',
  'Name',
  'Email',
  'Company',
  'Phone',
  'Auto Collection',
  'Vat Number',
  'Billing Address',
  'Shipping Address',
  'Created Date',
  'Last Modified Date',
];

const PAYMENT_TERMS_CONDITIONS = [
  'is Due Upon Receipt',
  'is Net 15',
  'is Net 30',
  'is Net 45',
  'is Net 60',
  'is Net 90',
];

const TEXT_CONDITIONS = [
  'is',
  'is not',
  'contains',
  'does not contain',
  'starts with',
  'ends with',
];

const AUTO_COLLECTION_CONDITIONS = [
  'is On',
  'is Off',
];

export function FilterListModal({ isOpen, onClose, onApplyFilters, activeFilters }: FilterListModalProps) {
  const [filters, setFilters] = useState<Filter[]>(activeFilters);
  const [showAttributeSelector, setShowAttributeSelector] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const getConditionsForAttribute = (attribute: string) => {
    if (attribute === 'Payment Terms') return PAYMENT_TERMS_CONDITIONS;
    if (attribute === 'Auto Collection') return AUTO_COLLECTION_CONDITIONS;
    return TEXT_CONDITIONS;
  };

  const handleAddFilter = () => {
    if (selectedAttribute && selectedCondition) {
      const newFilter: Filter = {
        id: Date.now().toString(),
        attribute: selectedAttribute,
        condition: selectedCondition,
        value: selectedCondition,
      };
      setFilters([...filters, newFilter]);
      setSelectedAttribute('');
      setSelectedCondition('');
      setShowAttributeSelector(false);
    }
  };

  const handleRemoveFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleDiscard = () => {
    setFilters(activeFilters);
    onClose();
  };

  const filteredAttributes = CUSTOMER_ATTRIBUTES.filter(attr =>
    attr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Filter List</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {filters.length > 0 && (
            <div className="mb-6 space-y-3">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-sm text-gray-800">
                    <span className="font-semibold">{filter.attribute}</span> {filter.condition}
                  </span>
                  <button
                    onClick={() => handleRemoveFilter(filter.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {!showAttributeSelector && (
            <button
              onClick={() => setShowAttributeSelector(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Filter
            </button>
          )}

          {showAttributeSelector && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Choose Attribute</h3>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search attributes"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-white rounded-md border border-gray-200 max-h-64 overflow-y-auto">
                  <div className="p-2">
                    <div className="text-xs font-semibold text-gray-500 mb-2 px-2">Customer</div>
                    {filteredAttributes.map((attr) => (
                      <button
                        key={attr}
                        onClick={() => setSelectedAttribute(attr)}
                        className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 transition-colors ${
                          selectedAttribute === attr ? 'bg-blue-100 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {attr}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedAttribute && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Select Condition</h4>
                    <div className="space-y-2">
                      {getConditionsForAttribute(selectedAttribute).map((condition) => (
                        <button
                          key={condition}
                          onClick={() => setSelectedCondition(condition)}
                          className={`w-full text-left px-3 py-2 text-sm rounded border transition-colors ${
                            selectedCondition === condition
                              ? 'bg-blue-100 border-blue-300 text-blue-700'
                              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {condition}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleAddFilter}
                    disabled={!selectedAttribute || !selectedCondition}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    Add Filter
                  </button>
                  <button
                    onClick={() => {
                      setShowAttributeSelector(false);
                      setSelectedAttribute('');
                      setSelectedCondition('');
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            onClick={handleDiscard}
            className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Discard Filter
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
