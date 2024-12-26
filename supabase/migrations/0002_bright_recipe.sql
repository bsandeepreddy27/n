/*
  # Update vendor table policies

  1. Changes
    - Remove recursive policy dependencies
    - Add proper RLS policies for vendors table
    - Enable public read access for authenticated users
    - Restrict write operations to admin users

  2. Security
    - Enable RLS on vendors table
    - Add policies for read/write operations
*/

-- Enable RLS
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Public vendors are viewable by all authenticated users" ON vendors;
DROP POLICY IF EXISTS "Only admins can manage vendors" ON vendors;

-- Create new policies
CREATE POLICY "Authenticated users can view vendors"
  ON vendors
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can insert vendors"
  ON vendors
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Admins can update vendors"
  ON vendors
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );

CREATE POLICY "Admins can delete vendors"
  ON vendors
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'admin'
    )
  );