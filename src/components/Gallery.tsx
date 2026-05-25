import React, { useState } from 'react';

interface GalleryImage {
  id: number;
  title: string;
  url: string;
  category: string;
}

const galleryLocalImages = import.meta.glob('../../image/*.{png,jpg,jpeg,webp,gif}', {
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

function getGalleryImageUrl(title: string) {
  const targetKey = normalizeImageKey(title);

  for (const [path, url] of Object.entries(galleryLocalImages)) {
    const filename = path.split('/').pop() ?? path.split('\\').pop() ?? path;
    const fileKey = normalizeImageKey(filename);
    if (fileKey === targetKey) return url;
  }

  return undefined;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: 'Tea Plantations',
    url:
      getGalleryImageUrl('Tea Plantations') ??
      'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
    category: 'nature',
  },
  {
    id: 2,
    title: 'Beach Paradise',
    url:
      getGalleryImageUrl('Beach Paradise') ??
      'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'beach',
  },
  {
    id: 3,
    title: 'Mountain Views',
    url:
      getGalleryImageUrl('Mountain Views') ??
      'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
    category: 'nature',
  },
  {
    id: 4,
    title: 'Cultural Sites',
    url:
      getGalleryImageUrl('Cultural Sites') ??
      'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'culture',
  },
  {
    id: 5,
    title: 'Wildlife Safari',
    url:
      getGalleryImageUrl('Wildlife Safari') ??
      'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
    category: 'wildlife',
  },
  {
    id: 6,
    title: 'Sunset Moments',
    url:
      getGalleryImageUrl('Sunset Moments') ??
      'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    category: 'nature',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];

  const filteredImages =
    selectedCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <section className="section-surface section-cream">
      <div className="section-blob-amber" aria-hidden />
      <div className="section-blob-teal" aria-hidden />
      <div className="section-inner">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real moments from real travelers exploring Sri Lanka
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-white/60 backdrop-blur text-gray-800 hover:bg-white/80 border border-orange-100/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((image) => (
            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer transform transition-all hover:scale-105 shadow-lg hover:shadow-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform"
                style={{ backgroundImage: `url('${image.url}')` }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white font-semibold">{image.title}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors bg-black/30 p-2 rounded-lg"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <div
                className="relative w-full aspect-square overflow-hidden rounded-xl"
                style={{
                  backgroundImage: `url('${selectedImage.url}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-gray-400 capitalize mt-1">
                  {selectedImage.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
