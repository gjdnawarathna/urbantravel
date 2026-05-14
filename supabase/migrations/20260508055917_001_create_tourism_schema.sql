/*
  # Create Tourism Platform Schema for Urban Travels

  1. New Tables
    - `tour_packages` - Story-based tour packages with pricing and details
    - `experiences` - Local experiences marketplace with host information
    - `destinations` - Sri Lanka destinations with details and images
    - `bookings` - User bookings with payment information
    - `testimonials` - Guest reviews and testimonials
    - `itineraries` - Custom trip itineraries
  
  2. Security
    - Enable RLS on all tables
    - Public read access for destinations, packages, experiences, testimonials
    - Authenticated users can create bookings and itineraries
    - Admin-only write access for content tables

  3. Design Notes
    - All tables include metadata for SEO and performance
    - Image URLs stored for Pexels integration
    - Pricing stored in LKR (Sri Lankan Rupee)
*/

CREATE TABLE IF NOT EXISTS destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  highlights text[] DEFAULT '{}',
  best_time text DEFAULT 'Year-round',
  image_url text,
  latitude numeric,
  longitude numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tour_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  story_category text NOT NULL CHECK (story_category IN ('adventure', 'relaxation', 'culture', 'luxury', 'honeymoon')),
  duration_days integer NOT NULL,
  price_lkr numeric NOT NULL,
  destination_ids uuid[] DEFAULT '{}',
  itinerary jsonb DEFAULT '[]',
  images text[] DEFAULT '{}',
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  host_name text NOT NULL,
  host_story text,
  location text NOT NULL,
  category text NOT NULL,
  price_lkr numeric NOT NULL,
  duration_hours numeric,
  max_people integer DEFAULT 12,
  images text[] DEFAULT '{}',
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text NOT NULL,
  guest_photo_url text,
  rating numeric CHECK (rating >= 1 AND rating <= 5),
  review text NOT NULL,
  trip_type text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  user_name text NOT NULL,
  package_id uuid REFERENCES tour_packages(id),
  experience_id uuid REFERENCES experiences(id),
  custom_itinerary jsonb,
  travel_dates daterange NOT NULL,
  travelers_count integer NOT NULL DEFAULT 1,
  total_price_lkr numeric NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
  booking_reference text UNIQUE,
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS itineraries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  title text NOT NULL,
  destinations jsonb DEFAULT '[]',
  total_days integer NOT NULL,
  estimated_cost_lkr numeric,
  is_saved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE itineraries ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Destinations are public"
  ON destinations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Tour packages are public"
  ON tour_packages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Experiences are public"
  ON experiences FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Testimonials are public"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Booking policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Itinerary policies
CREATE POLICY "Users can view own itineraries"
  ON itineraries FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can create itineraries"
  ON itineraries FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Users can update own itineraries"
  ON itineraries FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email)
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Insert sample data
INSERT INTO destinations (name, description, highlights, best_time, image_url, latitude, longitude) VALUES
('Ella', 'Scenic mountain town surrounded by tea plantations and breathtaking views', ARRAY['Tea plantations', 'Little Adam''s Peak', 'Nine Arches Bridge'], 'December-March', 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', 6.8667, 81.0500),
('Kandy', 'Ancient cultural capital with sacred temples and misty mountains', ARRAY['Temple of the Tooth', 'Kandy Lake', 'Royal Botanical Gardens'], 'November-May', 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg', 7.2906, 80.6337),
('Galle', 'Historic coastal town with colonial architecture and pristine beaches', ARRAY['Galle Fort', 'Unawatuna Beach', 'Mirissa Beach'], 'November-April', 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg', 6.0535, 80.2213),
('Sigiriya', 'Ancient rock fortress with panoramic views and archaeological wonders', ARRAY['Sigiriya Rock', 'Dambulla Cave Temple', 'Pidurangala Rock'], 'May-September', 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', 7.9497, 80.7597),
('Yala', 'Premier wildlife sanctuary known for leopards and diverse fauna', ARRAY['Safari adventures', 'Wildlife photography', 'Pristine beaches'], 'May-September', 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg', 6.3667, 81.5000)
ON CONFLICT (name) DO NOTHING;

INSERT INTO tour_packages (title, description, story_category, duration_days, price_lkr, itinerary) VALUES
('7 Days Hidden Sri Lanka', 'Discover the untouched gems of Sri Lanka away from tourist crowds. Experience authentic village life, pristine nature, and warm hospitality.', 'adventure', 7, 450000, '[{"day":1,"title":"Arrival in Colombo","activities":["Airport transfer","City tour","Evening stroll"]},{"day":2,"title":"Tea Country","activities":["Tea plantation visit","Local cooking class","Mountain walks"]},{"day":3,"title":"Ancient Wonders","activities":["Sigiriya Rock climb","Dambulla caves","Cultural show"]},{"day":4,"title":"Wildlife Safari","activities":["Yala National Park safari","Bird watching","Nature photography"]},{"day":5,"title":"Beach Relaxation","activities":["Mirissa Beach","Whale watching","Sunset cruise"]},{"day":6,"title":"Cultural Heritage","activities":["Kandy temple visit","Traditional dance show","Lake evening walk"]},{"day":7,"title":"Departure","activities":["Last-minute shopping","Airport transfer"]}]'),
('Luxury Honeymoon Escape', 'Romance redefined. Indulge in luxury accommodations, private experiences, and unforgettable moments in paradise.', 'honeymoon', 5, 850000, '[{"day":1,"title":"Romantic Arrival","activities":["Private airport transfer","Sunset dinner by beach"]},{"day":2,"title":"Coastal Paradise","activities":["Private beach time","Couple spa treatment","Seafood dinner"]},{"day":3,"title":"Tea Country Romance","activities":["Tea plantation tour","Couple cooking class","Mountain dinner"]},{"day":4,"title":"Cultural Evening","activities":["Private temple visit","Dinner at rooftop restaurant"]},{"day":5,"title":"Departure","activities":["Breakfast in bed","Airport transfer"]}]'),
('Adventure & Wildlife Journey', 'Thrilling encounters with nature. Rock climbing, safaris, water sports, and adrenaline-pumping activities await.', 'adventure', 6, 650000, '[{"day":1,"title":"Adventure Begins","activities":["Arrival and preparation"]},{"day":2,"title":"Rock Climbing","activities":["Sigiriya climb","Pidurangala trek"]},{"day":3,"title":"Water Sports","activities":["Kayaking","Snorkeling","Whale watching"]},{"day":4,"title":"Safari Adventure","activities":["Yala National Park","Early morning safari"]},{"day":5,"title":"Mountain Trekking","activities":["Adam''s Peak hike","Tea plantation trek"]},{"day":6,"title":"Final Adventures","activities":["White water rafting","Departure"]}]')
ON CONFLICT DO NOTHING;

INSERT INTO experiences (title, description, host_name, host_story, location, category, price_lkr, duration_hours, max_people) VALUES
('Traditional Cooking Class', 'Learn to cook authentic Sri Lankan curry from a local chef in a home kitchen. Includes market visit and meal together.', 'Lakshmi', 'A passionate cook who has been teaching visitors for over 15 years from her ancestral home in Kandy.', 'Kandy', 'cooking', 4500, 3, 8),
('Village Life Experience', 'Spend a day with a local family. Participate in daily activities, traditional farming, and enjoy authentic meals.', 'Ravi', 'A farmer who welcomes travelers to experience genuine village life and sustainability practices.', 'Central Highlands', 'cultural', 3500, 6, 6),
('Tea Plantation Hike', 'Trek through emerald tea gardens with a local guide. Visit a tea factory and sample fresh tea at sunset.', 'Anura', 'A tea plantation expert with 20 years of experience sharing the secrets of Sri Lankan tea.', 'Ella', 'adventure', 2500, 4, 10),
('Fishing with Locals', 'Join traditional fishermen on their boats. Learn ancient fishing techniques and share a fresh catch lunch.', 'Thilak', 'A lifelong fisherman passionate about sharing the coastal culture and marine conservation.', 'Mirissa', 'adventure', 5500, 5, 4),
('Sacred Temple Meditation', 'Guided meditation and spiritual experience at an ancient Buddhist temple with a resident monk.', 'Bhikkhu Sujitha', 'A senior monk dedicated to sharing Buddhist philosophy and meditation practices with visitors.', 'Kandy', 'cultural', 2000, 2, 12)
ON CONFLICT DO NOTHING;

INSERT INTO testimonials (guest_name, guest_photo_url, rating, review, trip_type) VALUES
('Sarah Mitchell', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', 5, 'Urban Travels transformed our Sri Lanka trip into an unforgettable adventure. The attention to detail and personalized service was exceptional!', 'Adventure'),
('Marco Rossi', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg', 5, 'The honeymoon package was absolutely perfect. Every moment felt magical. Highly recommend!', 'Honeymoon'),
('Emma Chen', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', 5, 'Amazing cultural experiences and genuine connections with locals. This is how travel should be!', 'Culture'),
('David Thompson', 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg', 5, 'Best safari experience ever. Professional guides and incredible wildlife encounters.', 'Wildlife')
ON CONFLICT DO NOTHING;
