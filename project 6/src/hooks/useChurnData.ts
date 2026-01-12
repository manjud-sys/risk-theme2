import { useEffect, useState } from 'react';
import { supabase, CustomerWithDrivers } from '../lib/supabase';

export function useChurnData() {
  const [customers, setCustomers] = useState<CustomerWithDrivers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('*')
        .order('churn_score', { ascending: false });

      if (customersError) throw customersError;

      const { data: driversData, error: driversError } = await supabase
        .from('churn_drivers')
        .select('*')
        .order('priority', { ascending: true });

      if (driversError) throw driversError;

      const customersWithDrivers: CustomerWithDrivers[] = (customersData || []).map(customer => ({
        ...customer,
        drivers: (driversData || [])
          .filter(driver => driver.customer_id === customer.id)
          .slice(0, 3)
      }));

      setCustomers(customersWithDrivers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  const stats = {
    high: {
      count: customers.filter(c => c.risk_level === 'high').length,
      arr: customers.filter(c => c.risk_level === 'high').reduce((sum, c) => sum + Number(c.arr), 0)
    },
    medium: {
      count: customers.filter(c => c.risk_level === 'medium').length,
      arr: customers.filter(c => c.risk_level === 'medium').reduce((sum, c) => sum + Number(c.arr), 0)
    },
    low: {
      count: customers.filter(c => c.risk_level === 'low').length,
      arr: customers.filter(c => c.risk_level === 'low').reduce((sum, c) => sum + Number(c.arr), 0)
    }
  };

  return { customers, stats, loading, error, refetch: fetchData };
}
