import React, { useEffect, useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Destination } from '../types';

import EllaImg from '../../image/Ella.jpg';
import GalleImg from '../../image/Galle.jpg';
import KandyImg from '../../image/Kandy.jpg';
import SigiriyaImg from '../../image/Sigiriya.jpg';
import YalaImg from '../../image/Yala.jpg';

const featuredDestinationImages: Record<string, string> = {
  Ella: EllaImg,
  Galle: GalleImg,
  Kandy: KandyImg,
  Sigiriya: SigiriyaImg,
  Yala: YalaImg,
};

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .limit(5);

        if (error) throw error;
        setDestinations(data || []);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading destinations...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most captivating locations in Sri Lanka
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {destinations.map((dest) => {
            const imageUrl = featuredDestinationImages[dest.name] ?? dest.image_url;
            return (
            <div
              key={dest.id}
              className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer transform transition-all hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                style={{ backgroundImage: `url('${imageUrl}')` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-2xl font-bold mb-2">{dest.name}</h3>
                <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                  {dest.description}
                </p>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  {dest.highlights && dest.highlights.length > 0 && (
                    <div>
                      <p className="text-gray-300">Highlights:</p>
                      <p className="text-orange-300 text-xs">
                        {dest.highlights.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  )}
                  {dest.best_time && (
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-orange-400" />
                      <span className="text-gray-300">{dest.best_time}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Static Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-bold text-lg flex items-center gap-2">
                  <MapPin size={16} className="text-orange-400" />
                  {dest.name}
                </p>
              </div>
            </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#experiences"
            className="inline-block px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
          >
            Explore All Destinations
          </a>
        </div>
      </div>
    </section>
  );
}
