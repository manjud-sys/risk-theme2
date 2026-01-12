export function ChurnPredictionChart() {
  const cohorts = [
    { label: 'Jan Subscription Cohort', value: 27 },
    { label: 'Mar Subscription Cohort', value: 21 },
    { label: 'Q2 Trial Conversion Cohort', value: 12 },
    { label: 'Q4 Plan Upgrade Cohort', value: 35 }
  ];

  const maxValue = 40;

  return (
    <div>
      <div>
      <h4 className="text-xl font-bold text-gray-900 mb-2 text-sm" >Subscription Cohorts</h4>
      <h6 className="text-xl font-bold text-gray-600 mb-6 text-xs" >Subscriptions at Risk by Cohort</h6>

      <div className="space-y-6">
        {cohorts.map((cohort, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <div className="w-40 text-right text-xs">
              <span className="text-base text-gray-900 text-xs">{cohort.label}</span>
            </div>

            <div className="flex-1 relative">
              <div className="h-4 bg-gray-100 justify-between rounded relative overflow-hidden">
                <div
                  className="h-full rounded transition-all duration-300"
                  style={{ width: `${(cohort.value / maxValue) * 100}%`, backgroundColor: '#ffab84' }}
                />
              </div>
            </div>

            <div className="w-12 text-left">
              <span className="text-xs font-bold text-gray-900">{cohort.value}</span>
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className="mt-6 flex gap-10 text-xs text-gray-500 pl-40">
        <span >0</span>
        <span>10</span>
        <span>20</span>
        <span>30</span>
        <span>40</span>
        <span>50</span>
        <span>60</span>
        <span>70</span>
        <span>80</span>
 
      </div>
    </div>
  );
}
