CREATE EXTENSION IF NOT EXISTS postgis;
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  first_name VARCHAR(50),
  age INT,
  created_at TIMESTAMP DEFAULT NOW()
);
