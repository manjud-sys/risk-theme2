export function ModelPerformance() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Performance</h3>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Precision</span>
            <span className="text-sm font-bold text-gray-900">60%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="h-3 rounded-full" style={{ width: '60%', backgroundColor: '#ffab84' }}></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Recall</span>
            <span className="text-sm font-bold text-gray-900">50%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="h-3 rounded-full" style={{ width: '50%', backgroundColor: '#ffab84' }}></div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Interpretation</h4>
        <p className="text-xs text-gray-600 mb-1">
          Of 5 subscriptions predicted to churn, 3 actually cancelled.
        </p>
        <p className="text-xs text-gray-600">
          Of 5 subscriptions that cancelled, 3 were identified by the model.
        </p>
      </div>
    </div>
  );
}
