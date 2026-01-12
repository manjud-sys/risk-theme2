import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseAnonKey,
    env: import.meta.env
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Customer {
  id: string;
  name: string;
  email?: string;
  subscription_plan: string;
  subscription_id: string;
  churn_score: number;
  risk_level: 'high' | 'medium' | 'low';
  arr: number;
  created_at: string;
  updated_at: string;
}

export interface ChurnDriver {
  id: string;
  customer_id: string;
  driver_name: string;
  impact: 'increase' | 'decrease';
  priority: number;
  created_at: string;
}

export interface CustomerWithDrivers extends Customer {
  drivers: ChurnDriver[];
}
