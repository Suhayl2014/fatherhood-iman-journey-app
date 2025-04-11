-- Enable RLS on the waitlist table
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert into waitlist
CREATE POLICY "Allow anonymous insert to waitlist"
ON waitlist
FOR INSERT
TO anon
WITH CHECK (true);

-- Create policy to allow anonymous users to read any email in waitlist
CREATE POLICY "Allow anonymous read waitlist entries"
ON waitlist
FOR SELECT
TO anon
USING (true); 