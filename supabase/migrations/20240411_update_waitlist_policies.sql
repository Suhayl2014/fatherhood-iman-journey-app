-- First, drop all existing policies
DROP POLICY IF EXISTS "Allow admin select" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous insert to waitlist" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous read own waitlist entries" ON waitlist;
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for admin select (authenticated users)
CREATE POLICY "Allow admin select"
ON waitlist
FOR SELECT
TO authenticated
USING (true);

-- Create policy for anonymous insert
CREATE POLICY "Allow anonymous insert"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy for anonymous select (to check if email exists)
CREATE POLICY "Allow anonymous select"
ON waitlist
FOR SELECT
TO anon
USING (true); 