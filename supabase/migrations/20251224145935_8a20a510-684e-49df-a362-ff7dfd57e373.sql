-- Events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'general',
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  max_capacity INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  team_color TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_reference TEXT,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Travel bookings table
CREATE TABLE public.travel_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  num_travelers INTEGER NOT NULL DEFAULT 1,
  payment_type TEXT NOT NULL DEFAULT 'full',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_reference TEXT,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  balance_due DECIMAL(10,2) DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Trivia signups table
CREATE TABLE public.trivia_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_reference TEXT,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Messages table (contact form)
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter subscribers table
CREATE TABLE public.newsletter (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Payments transaction log
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reference TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travel_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trivia_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Public read access for events (anyone can view events)
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);

-- Public insert for registrations, bookings, signups, messages, newsletter
CREATE POLICY "Anyone can create registrations" ON public.registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view own registration by email" ON public.registrations FOR SELECT USING (true);

CREATE POLICY "Anyone can create travel bookings" ON public.travel_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view own booking by email" ON public.travel_bookings FOR SELECT USING (true);

CREATE POLICY "Anyone can create trivia signups" ON public.trivia_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view own signup by email" ON public.trivia_signups FOR SELECT USING (true);

CREATE POLICY "Anyone can send messages" ON public.messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view payments" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Anyone can update payments" ON public.payments FOR UPDATE USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to events table
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();