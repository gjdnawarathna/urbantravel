import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Testimonial } from '../types';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Travelers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from real adventurers who experienced Sri Lanka with Urban Travels
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: Math.round(testimonial.rating) }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  )
                )}
              </div>

              {/* Review */}
              <p className="text-gray-700 mb-4 line-clamp-3 group-hover:line-clamp-none">
                {testimonial.review}
              </p>

              {/* Guest Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                {testimonial.guest_photo_url && (
                  <img
                    src={testimonial.guest_photo_url}
                    alt={testimonial.guest_name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.guest_name}
                  </p>
                  {testimonial.trip_type && (
                    <p className="text-sm text-orange-600 font-medium">
                      {testimonial.trip_type}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">Ready for your own adventure?</p>
          <a
            href="#book"
            className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
}
