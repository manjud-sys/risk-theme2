import { Home, Users, CreditCard, FileText, ShoppingCart, Package, Crown, TrendingUp, FileCheck, BarChart3, Grid3x3, Settings, Zap, HelpCircle, ChevronDown, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  onSignalsClick: () => void;
}

export function Navigation({ onSignalsClick }: NavigationProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-64 bg-[#1a2332] text-white h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-xl font-bold">C</span>
          </div>
          <span className="text-lg font-semibold">Billing</span>
        </div>

        <div className="bg-[#0f1621] rounded-lg p-3 border border-gray-700">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-600 rounded-full" />
              <span className="text-xs truncate">kalathur.chargebee.com</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <span className="inline-block bg-green-500 text-white text-xs px-2 py-0.5 rounded">Live</span>
        </div>
      </div>

      <div className="p-4 border-b border-gray-700">
        <button className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-white py-2 px-3 rounded hover:bg-[#0f1621] transition-colors">
          <Search className="w-4 h-4" />
          <span className="text-sm">Go to</span>
          <span className="ml-auto text-xs text-gray-500">⌘ K</span>
        </button>
      </div>

      <nav className="flex-1 py-4">
        <button
          onClick={onSignalsClick}
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-orange-500/10 hover:text-orange-400 transition-colors border-l-4 border-transparent hover:border-orange-500"
        >
          <Zap className="w-5 h-5" />
          <span className="text-sm font-medium">Signals</span>
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors">
          <Home className="w-5 h-5" />
          <span className="text-sm">Home</span>
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 bg-[#0f1621] border-l-4 border-blue-500">
          <Users className="w-5 h-5" />
          <span className="text-sm">Customers</span>
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors">
          <CreditCard className="w-5 h-5" />
          <span className="text-sm">Subscriptions</span>
        </button>

        <button
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors"
          onClick={() => toggleSection('invoices')}
        >
          <FileText className="w-5 h-5" />
          <span className="text-sm">Invoices & Credit Notes</span>
          {expandedSections['invoices'] ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors">
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm">Orders</span>
        </button>

        <button
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors"
          onClick={() => toggleSection('catalog')}
        >
          <Package className="w-5 h-5" />
          <span className="text-sm">Product Catalog</span>
          {expandedSections['catalog'] ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        <button
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors"
          onClick={() => toggleSection('entitlements')}
        >
          <Crown className="w-5 h-5" />
          <span className="text-sm">Entitlements</span>
          {expandedSections['entitlements'] ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm">Rev Rec</span>
        </button>

        <button
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors"
          onClick={() => toggleSection('logs')}
        >
          <FileCheck className="w-5 h-5" />
          <span className="text-sm">Logs</span>
          {expandedSections['logs'] ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        <button
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors"
          onClick={() => toggleSection('revenue')}
        >
          <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
            <span className="text-xs">$</span>
          </div>
          <span className="text-sm">RevenueStory</span>
          {expandedSections['revenue'] ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors">
          <BarChart3 className="w-5 h-5" />
          <span className="text-sm">Classic Reports</span>
        </button>

        <button className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors">
          <Grid3x3 className="w-5 h-5" />
          <span className="text-sm">Apps</span>
        </button>

        <button
          className="flex items-center gap-3 w-full text-left px-6 py-2.5 hover:bg-[#0f1621] transition-colors"
          onClick={() => toggleSection('settings')}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
          {expandedSections['settings'] ? <ChevronDown className="w-4 h-4 ml-auto" /> : <ChevronRight className="w-4 h-4 ml-auto" />}
        </button>
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button className="flex items-center gap-3 w-full text-left px-2 py-2 hover:bg-[#0f1621] rounded transition-colors">
          <Zap className="w-5 h-5" />
          <span className="text-sm">What's new</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>

        <button className="flex items-center gap-3 w-full text-left px-2 py-2 hover:bg-[#0f1621] rounded transition-colors mt-1">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Need Help?</span>
          <span className="ml-auto text-gray-400">...</span>
        </button>

        <div className="flex items-center gap-3 px-2 py-2 mt-2 hover:bg-[#0f1621] rounded cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <span className="text-sm">WD</span>
          </div>
          <span className="text-sm">William D</span>
          <span className="ml-auto text-gray-400">...</span>
        </div>
      </div>
    </div>
  );
}
