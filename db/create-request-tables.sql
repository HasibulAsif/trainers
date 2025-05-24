-- Create client requests table
CREATE TABLE IF NOT EXISTS client_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  budget_min DECIMAL(10, 2),
  budget_max DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days')
);

-- Create trainer bids table
CREATE TABLE IF NOT EXISTS trainer_bids (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id UUID NOT NULL REFERENCES client_requests(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(request_id, trainer_id)
);

-- Create service plans table
CREATE TABLE IF NOT EXISTS service_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trainer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tier VARCHAR(50) NOT NULL CHECK (tier IN ('basic', 'standard', 'premium')),
  price DECIMAL(10, 2) NOT NULL,
  duration_days INTEGER,
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES auth.users(id),
  trainer_id UUID NOT NULL REFERENCES auth.users(id),
  service_plan_id UUID REFERENCES service_plans(id),
  request_id UUID REFERENCES client_requests(id),
  bid_id UUID REFERENCES trainer_bids(id),
  status VARCHAR(50) DEFAULT 'active',
  amount DECIMAL(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create nutrition plans table
CREATE TABLE IF NOT EXISTS nutrition_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES auth.users(id),
  client_id UUID NOT NULL REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create meal plans table
CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES auth.users(id),
  client_id UUID NOT NULL REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout plans table
CREATE TABLE IF NOT EXISTS workout_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  trainer_id UUID NOT NULL REFERENCES auth.users(id),
  client_id UUID NOT NULL REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE client_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE trainer_bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;

-- Client requests policies
CREATE POLICY "Clients can view their own requests"
  ON client_requests FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Trainers can view all open requests"
  ON client_requests FOR SELECT
  USING (status = 'open');

CREATE POLICY "Clients can create their own requests"
  ON client_requests FOR INSERT
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Clients can update their own requests"
  ON client_requests FOR UPDATE
  USING (auth.uid() = client_id);

-- Trainer bids policies
CREATE POLICY "Trainers can view their own bids"
  ON trainer_bids FOR SELECT
  USING (auth.uid() = trainer_id);

CREATE POLICY "Clients can view bids on their requests"
  ON trainer_bids FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM client_requests
    WHERE client_requests.id = trainer_bids.request_id
    AND client_requests.client_id = auth.uid()
  ));

CREATE POLICY "Trainers can create their own bids"
  ON trainer_bids FOR INSERT
  WITH CHECK (auth.uid() = trainer_id);

CREATE POLICY "Trainers can update their own bids"
  ON trainer_bids FOR UPDATE
  USING (auth.uid() = trainer_id);

-- Service plans policies
CREATE POLICY "Anyone can view service plans"
  ON service_plans FOR SELECT
  USING (true);

CREATE POLICY "Trainers can create their own service plans"
  ON service_plans FOR INSERT
  WITH CHECK (auth.uid() = trainer_id);

CREATE POLICY "Trainers can update their own service plans"
  ON service_plans FOR UPDATE
  USING (auth.uid() = trainer_id);

-- Orders policies
CREATE POLICY "Clients can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Trainers can view orders assigned to them"
  ON orders FOR SELECT
  USING (auth.uid() = trainer_id);

-- Nutrition, meal, and workout plan policies
CREATE POLICY "Clients can view their own nutrition plans"
  ON nutrition_plans FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Trainers can view and edit nutrition plans they created"
  ON nutrition_plans FOR ALL
  USING (auth.uid() = trainer_id);

CREATE POLICY "Clients can view their own meal plans"
  ON meal_plans FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Trainers can view and edit meal plans they created"
  ON meal_plans FOR ALL
  USING (auth.uid() = trainer_id);

CREATE POLICY "Clients can view their own workout plans"
  ON workout_plans FOR SELECT
  USING (auth.uid() = client_id);

CREATE POLICY "Trainers can view and edit workout plans they created"
  ON workout_plans FOR ALL
  USING (auth.uid() = trainer_id);
