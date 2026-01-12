export function TopDrivers() {
  const drivers = [
    { name: 'Declining usage ' },
    { name: 'Payment failures over last 30 days' },
    { name: 'Active Paid Tenure' },
    { name: 'Last Transaction Status' },
    { name: 'No of Paid Invoices' },
    { name: 'Downgrade Events' }
     
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Drivers of Churn</h3>

      <div className="space-y-4">
        {drivers.map((driver, idx) => (
          <div key={idx}>
            
              <div className="flex-1">
                <span className="flex-intial text-sm font-medium text-gray-900">{driver.name}</span>
        
               
            </div>
            
          
          </div>
        ))}
        <div className="flex-1">
                <span className="flex-end text-sm font-medium justify-content-end text-gray-900 align-items-cemter"><u>Learn More... </u></span>
                
                </div>
      </div>
    </div>
  );
}
