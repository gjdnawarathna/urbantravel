import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/WhatsApp_Image_2026-05-06_at_1.49.48_PM.jpeg"
                alt="Urban Travels"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-lg">Urban Travels</p>
                <p className="text-orange-400 text-sm">Sri Lanka Adventures</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Creating unforgettable memories through authentic Sri Lankan experiences.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <p>Urban Travels</p>
                  <p>Second floor, De mel shopping complex</p>
                  <p>Pallepola road, Melsiripura</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-400 flex-shrink-0" />
                <a
                  href="tel:0741450646"
                  className="hover:text-orange-400 transition-colors"
                >
                  0741 450 646
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-orange-400 flex-shrink-0" />
                <a
                  href="mailto:bookings@urbantravels.lk"
                  className="hover:text-orange-400 transition-colors"
                >
                  bookings@urbantravels.lk
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#home" className="hover:text-orange-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#tours" className="hover:text-orange-400 transition-colors">
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="#experiences" className="hover:text-orange-400 transition-colors">
                  Local Experiences
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-orange-400 transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-orange-400 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/share/1J5kg9eUAm/ceylon_urban_travels"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 p-3 rounded-lg transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/ceylon_urban_travels?igsh=MTA3Ym9udnFlYXkwaw=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 p-3 rounded-lg transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/urbantravels"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 p-3 rounded-lg transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 text-sm">
            <p>&copy; 2026 Urban Travels. All rights reserved.</p>
            <div className="flex gap-4 md:justify-end">
              <a href="#privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
