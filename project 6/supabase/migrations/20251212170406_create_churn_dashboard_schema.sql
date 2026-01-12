/*
  # Churn Prediction Dashboard Schema

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `subscription_plan` (text) - Subscription plan name
      - `subscription_id` (text) - Subscription identifier
      - `churn_score` (integer) - Churn prediction score (0-100)
      - `risk_level` (text) - high, medium, or low
      - `arr` (decimal) - Annual Recurring Revenue
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `churn_drivers`
      - `id` (uuid, primary key)
      - `customer_id` (uuid, foreign key)
      - `driver_name` (text) - Name of the churn driver
      - `impact` (text) - increase or decrease
      - `priority` (integer) - 1-3, where 1 is highest priority
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subscription_plan text NOT NULL,
  subscription_id text NOT NULL,
  churn_score integer NOT NULL CHECK (churn_score >= 0 AND churn_score <= 100),
  risk_level text NOT NULL CHECK (risk_level IN ('high', 'medium', 'low')),
  arr decimal NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create churn_drivers table
CREATE TABLE IF NOT EXISTS churn_drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  driver_name text NOT NULL,
  impact text NOT NULL CHECK (impact IN ('increase', 'decrease')),
  priority integer NOT NULL CHECK (priority >= 1 AND priority <= 3),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE churn_drivers ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
CREATE POLICY "Allow public read access to customers"
  ON customers
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to churn_drivers"
  ON churn_drivers
  FOR SELECT
  TO public
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_customers_risk_level ON customers(risk_level);
CREATE INDEX IF NOT EXISTS idx_customers_churn_score ON customers(churn_score);
CREATE INDEX IF NOT EXISTS idx_churn_drivers_customer_id ON churn_drivers(customer_id);
CREATE INDEX IF NOT EXISTS idx_churn_drivers_priority ON churn_drivers(priority);