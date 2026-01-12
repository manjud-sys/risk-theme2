export function ChurnChart() {
  const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const pointsData = [
    { month: 'Jul', actual: 120, predicted: 100 },
    { month: 'Aug', actual: 250, predicted: 220 },
    { month: 'Sep', actual: 380, predicted: 350 },
    { month: 'Oct', actual: 450, predicted: 420 },
    { month: 'Nov', actual: 520, predicted: 480 },
    { month: 'Dec', actual: 580, predicted: 550 }
  ];

  const maxValue = 600;

  return (
    <div>
      <div className="flex items-end gap-4 mb-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-0.5 bg-blue-500"></div>
          <span className="text-gray-600">Actual</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-0.5 bg-gray-300 border-t-2 border-dotted border-gray-400"></div>
          <span className="text-gray-600">Predicted</span>
        </div>
      </div>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1"
            points={pointsData.map((d, i) =>
              `${(i / (months.length - 1)) * 600},${200 - (d.actual / maxValue) * 200}`
            ).join(' ')}
          />
          <polyline
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
            strokeDasharray="4,4"
            points={pointsData.map((d, i) =>
              `${(i / (months.length - 1)) * 600},${200 - (d.predicted / maxValue) * 200}`
            ).join(' ')}
          />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
          {months.map((month, idx) => (
            <span key={idx}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
