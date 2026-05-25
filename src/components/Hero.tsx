import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import waterfallImg from '../../image/water fall.jpg';
import banner1Img from '../../image/banner1.jpeg';

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0);

  const backgroundImages = [
    waterfallImg,
    banner1Img,
    'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
    'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === bgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url('${img}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        {/* Logo */}
        <div className="mb-6 animate-fadeIn">
          <img
            src="/WhatsApp_Image_2026-05-06_at_1.49.48_PM.jpeg"
            alt="Urban Travels"
            className="h-24 w-24 rounded-full mx-auto shadow-2xl border-4 border-white/60 object-cover liquid-glass-frame"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Urban <span className="text-orange-400">Travels</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          Discover Sri Lanka Your Way
        </p>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          Immerse yourself in authentic experiences, stunning landscapes, and the warmth of Sri Lankan culture. Your adventure awaits.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <a
            href="#traveler-types"
            className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Start Planning
          </a>
          <a
            href="#tours"
            className="px-8 py-4 liquid-glass-hero text-white text-lg"
          >
            View Packages
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setBgIndex(idx)}
            className={`h-3 rounded-full transition-all ${
              idx === bgIndex
                ? 'bg-orange-400 w-8'
                : 'bg-white/50 w-3 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
