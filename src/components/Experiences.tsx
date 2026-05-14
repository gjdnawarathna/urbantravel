import React, { useEffect, useState } from 'react';
import { Clock, Users, MapPin, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Experience } from '../types';

const experienceImages = import.meta.glob('../../image/*.{png,jpg,jpeg,webp,gif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function normalizeImageKey(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '');
}

function getExperienceImageUrl(experienceTitle: string) {
  const targetKey = normalizeImageKey(experienceTitle);

  for (const [path, url] of Object.entries(experienceImages)) {
    const filename = path.split('/').pop() ?? path.split('\\').pop() ?? path;
    const fileKey = normalizeImageKey(filename);
    if (fileKey === targetKey) return url;
  }

  return undefined;
}

export default function Experiences() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data, error } = await supabase
          .from('experiences')
          .select('*');

        if (error) throw error;
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">Loading experiences...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experiences" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Local Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Authentic activities and cultural experiences hosted by locals
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => {
            const localImageUrl = getExperienceImageUrl(exp.title);
            const imageUrl =
              localImageUrl ||
              exp.images?.[0] ||
              'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg';
            const displayRatings = [4, 3, 5, 4.5, 4];
            const displayRating = displayRatings[idx] ?? exp.rating;

            return (
            <div
              key={exp.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title and Category */}
                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {exp.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full capitalize">
                    {exp.category}
                  </span>
                </div>

                {/* Host */}
                <p className="text-sm text-gray-600 mb-3">
                  Hosted by <span className="font-semibold text-gray-900">{exp.host_name}</span>
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {exp.description}
                </p>

                {/* Details */}
                <div className="grid grid-cols-3 gap-2 mb-4 border-t border-b border-gray-200 py-3">
                  <div className="text-center">
                    <Clock size={16} className="text-orange-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      {exp.duration_hours}h
                    </p>
                  </div>
                  <div className="text-center">
                    <Users size={16} className="text-orange-600 mx-auto mb-1" />
                    <p className="text-xs text-gray-600">
                      {exp.max_people} people
                    </p>
                  </div>
                  <div className="text-center">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400 mx-auto mb-1"
                    />
                    <p className="text-xs text-gray-600">
                      {displayRating.toFixed(1)}
                    </p>
                  </div>
                </div>

                {/* Location and Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} className="text-orange-600" />
                    {exp.location}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Per person</p>
                    <p className="text-lg font-bold text-orange-600">
                      LKR {(exp.price_lkr / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors text-sm">
                  Book Experience
                </button>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
