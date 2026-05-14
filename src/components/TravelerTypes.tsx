import React, { useState } from 'react';
import { Compass, Zap, Users, Crown } from 'lucide-react';

interface TravelerType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  packages: string[];
}

const travelerTypes: TravelerType[] = [
  {
    id: 'adventure',
    name: 'Adventure',
    description: 'Thrill-seekers ready for action and exploration',
    icon: <Zap className="w-12 h-12" />,
    color: 'from-red-500 to-orange-500',
    packages: ['Adventure & Wildlife Journey', 'Rock climbing expeditions'],
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    description: 'Beach lovers seeking peace and rejuvenation',
    icon: <Compass className="w-12 h-12" />,
    color: 'from-blue-500 to-cyan-500',
    packages: ['Coastal Paradise', 'Beach wellness retreat'],
  },
  {
    id: 'culture',
    name: 'Culture',
    description: 'History enthusiasts exploring traditions and heritage',
    icon: <Users className="w-12 h-12" />,
    color: 'from-purple-500 to-pink-500',
    packages: ['7 Days Hidden Sri Lanka', 'Temple and tradition tour'],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Premium travelers seeking ultimate comfort and service',
    icon: <Crown className="w-12 h-12" />,
    color: 'from-yellow-500 to-orange-400',
    packages: ['Luxury Honeymoon Escape', 'Five-star experience'],
  },
];

interface TravelerTypesProps {
  onSelect?: (type: string) => void;
}

export default function TravelerTypes({ onSelect }: TravelerTypesProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (typeId: string) => {
    setSelected(typeId);
    onSelect?.(typeId);
  };

  return (
    <section
      id="traveler-types"
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Kind of Traveler Are You?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tell us your travel style and we'll curate the perfect Sri Lanka experience for you
          </p>
        </div>

        {/* Traveler Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {travelerTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelect(type.id)}
              className={`group relative h-80 rounded-2xl overflow-hidden transition-all transform hover:scale-105 cursor-pointer ${
                selected === type.id ? 'ring-4 ring-orange-400' : ''
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-90 group-hover:opacity-100 transition-opacity`}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{type.name}</h3>
                <p className="text-sm text-white/90 mb-6">{type.description}</p>

                {/* Check Mark */}
                {selected === type.id && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* CTA */}
        {selected && (
          <div className="text-center animate-fadeIn">
            <a
              href="#tours"
              className="inline-block px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              See Recommended Packages
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
