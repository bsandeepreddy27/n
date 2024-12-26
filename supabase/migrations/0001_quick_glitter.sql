/*
  # Initial Schema for NEEPCO Procurement Portal

  1. New Tables
    - users (extends Supabase auth.users)
      - id (uuid, primary key)
      - name (text)
      - role (enum)
      - contact_number (text)
      - created_at (timestamp)
    
    - vendors
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - contact_number (text)
      - address (text)
      - registration_date (timestamp)
      - created_at (timestamp)
    
    - procurement_requests
      - id (uuid, primary key)
      - created_by (uuid, references users)
      - vendor_id (uuid, references vendors)
      - item_description (text)
      - quantity (integer)
      - status (enum)
      - created_at (timestamp)
    
    - payments
      - id (uuid, primary key)
      - procurement_id (uuid, references procurement_requests)
      - amount (decimal)
      - payment_date (timestamp)
      - status (enum)
      - created_at (timestamp)
    
    - reports
      - id (uuid, primary key)
      - report_type (enum)
      - generated_by (uuid, references users)
      - created_at (timestamp)
    
    - compliance_logs
      - id (uuid, primary key)
      - action (text)
      - performed_by (uuid, references users)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for different user roles
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('procurement_officer', 'vendor', 'admin');
CREATE TYPE procurement_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE report_type AS ENUM ('procurement', 'payment', 'compliance');

-- Create users table (extends auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  name TEXT NOT NULL,
  role user_role NOT NULL,
  contact_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create vendors table
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  contact_number TEXT,
  address TEXT,
  registration_date TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create procurement_requests table
CREATE TABLE procurement_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES users(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  item_description TEXT NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  status procurement_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  procurement_id UUID NOT NULL REFERENCES procurement_requests(id),
  amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
  payment_date TIMESTAMPTZ,
  status payment_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_type report_type NOT NULL,
  generated_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create compliance_logs table
CREATE TABLE compliance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  performed_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurement_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all users"
  ON users
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for vendors table
CREATE POLICY "Public vendors are viewable by all authenticated users"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admins can manage vendors"
  ON vendors
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for procurement_requests
CREATE POLICY "Users can view their own procurement requests"
  ON procurement_requests
  FOR SELECT
  USING (created_by = auth.uid());

CREATE POLICY "Admins can view all procurement requests"
  ON procurement_requests
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for payments
CREATE POLICY "Users can view payments related to their procurement requests"
  ON payments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM procurement_requests
      WHERE procurement_requests.id = payments.procurement_id
      AND procurement_requests.created_by = auth.uid()
    )
  );

-- Create policies for reports
CREATE POLICY "Users can view reports they generated"
  ON reports
  FOR SELECT
  USING (generated_by = auth.uid());

CREATE POLICY "Admins can view all reports"
  ON reports
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create policies for compliance_logs
CREATE POLICY "Only admins can view compliance logs"
  ON compliance_logs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );