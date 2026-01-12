import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { CustomerProfile } from './components/CustomerProfile';

function App() {
  const [showSignalsDashboard, setShowSignalsDashboard] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navigation onSignalsClick={() => setShowSignalsDashboard(true)} />

      <div className="flex-1 ml-64">
        {showSignalsDashboard ? (
          <Dashboard />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welcome to Chargebee</h2>
              <p className="text-gray-500">Click on Signals in the navigation to view the churn prediction dashboard</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
