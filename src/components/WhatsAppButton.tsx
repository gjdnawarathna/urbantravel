import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsApp = () => {
    window.open(
      'https://wa.me/94741450646?text=Hello%20Urban%20Travels!%20I%20am%20interested%20in%20booking%20a%20trip%20to%20Sri%20Lanka.',
      '_blank'
    );
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 z-40 bg-green-500/90 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-bounce backdrop-blur-xl border border-white/40"
      title="Chat with us on WhatsApp"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
    </button>
  );
}
