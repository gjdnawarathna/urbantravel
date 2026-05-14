import { useState } from 'react';
import { Calendar, Star } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/tourPackages';
import { TourPackage } from '../types';

const tourPackageImages = import.meta.glob('../../image/*.{png,jpg,jpeg,webp,gif}', {
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

function getTourPackageImageUrl(lookupKey: string) {
  const targetKey = normalizeImageKey(lookupKey);

  for (const [path, url] of Object.entries(tourPackageImages)) {
    const filename = path.split('/').pop() ?? path.split('\\').pop() ?? path;
    const fileKey = normalizeImageKey(filename);
    if (fileKey === targetKey) return url;
  }

  return undefined;
}

function formatPriceLkr(priceLkr: number) {
  return `LKR ${(priceLkr / 100000).toFixed(1)}L`;
}

export default function TourPackages() {
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const packages = TOUR_PACKAGES;

  return (
    <section id="tours" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Tour Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handcrafted itineraries for every type of traveler
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => {
            const localImageUrl = getTourPackageImageUrl(
              pkg.card_image_key ?? pkg.title
            );
            const imageUrl =
              localImageUrl ||
              pkg.images?.[0] ||
              'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg';
            const displayRating = 5;
            const displayReviewCounts = [7, 10, 12];
            const displayReviewCount = displayReviewCounts[idx] ?? pkg.review_count;

            return (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 group cursor-pointer"
              onClick={() => setSelectedPackage(pkg)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform"
                  style={{
                    backgroundImage: `url('${imageUrl}')`,
                  }}
                />
                <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold capitalize">
                  {pkg.story_category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Details */}
                <div className="space-y-3 mb-6 border-t border-b border-gray-200 py-4">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar size={18} className="text-orange-600" />
                    <span className="font-semibold">{pkg.duration_days} Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-gray-600">
                        {displayRating.toFixed(1)} ({displayReviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    {!pkg.price_display && (
                      <p className="text-sm text-gray-600">From</p>
                    )}
                    <p className="text-2xl font-bold text-orange-600">
                      {pkg.price_display ?? formatPriceLkr(pkg.price_lkr)}
                    </p>
                  </div>
                  <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Detail Modal */}
        {selectedPackage && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedPackage(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPackage(null)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    {selectedPackage.title}
                  </h2>
                  <p className="text-gray-600">{selectedPackage.description}</p>
                </div>

                {/* Itinerary */}
                {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Itinerary
                    </h3>
                    <div className="space-y-4">
                      {selectedPackage.itinerary.map((day) => (
                        <div
                          key={day.day}
                          className="border-l-4 border-orange-600 pl-4 py-2"
                        >
                          <p className="font-bold text-gray-900">
                            Day {day.day}: {day.title}
                          </p>
                          <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            {day.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between border-t pt-6">
                  <div>
                    <p className="text-sm text-gray-600">
                      {selectedPackage.price_display ? 'Price' : 'Total Price'}
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {selectedPackage.price_display ??
                        formatPriceLkr(selectedPackage.price_lkr)}
                    </p>
                  </div>
                  <a
                    href="#book"
                    className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
