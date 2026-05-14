export interface Destination {
  id: string;
  name: string;
  description: string;
  highlights: string[];
  best_time: string;
  image_url: string;
  latitude: number;
  longitude: number;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  story_category: 'adventure' | 'relaxation' | 'culture' | 'luxury' | 'honeymoon';
  duration_days: number;
  price_lkr: number;
  /** When set, shown instead of formatting price_lkr (e.g. dual USD/LKR pricing) */
  price_display?: string;
  /** Base name of file in `image/` folder for the card photo (e.g. "Sigiriya", "beach paradise") */
  card_image_key?: string;
  images: string[];
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
  rating: number;
  review_count: number;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  host_name: string;
  host_story: string;
  location: string;
  category: string;
  price_lkr: number;
  duration_hours: number;
  max_people: number;
  images: string[];
  rating: number;
  review_count: number;
}

export interface Testimonial {
  id: string;
  guest_name: string;
  guest_photo_url: string;
  rating: number;
  review: string;
  trip_type: string;
}

export interface Booking {
  id: string;
  user_email: string;
  user_name: string;
  package_id?: string;
  experience_id?: string;
  custom_itinerary?: object;
  travel_dates: string;
  travelers_count: number;
  total_price_lkr: number;
  payment_status: 'pending' | 'completed' | 'failed' | 'cancelled';
  booking_reference: string;
  special_requests: string;
  created_at: string;
}
