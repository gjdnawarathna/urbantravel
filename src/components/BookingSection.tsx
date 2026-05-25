import React, { useState } from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '1',
    startDate: '',
    packageType: 'custom',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        travelers: '1',
        startDate: '',
        packageType: 'custom',
        specialRequests: '',
      });
    }, 3000);
  };

  return (
    <section id="book" className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Info */}
          <div className="text-white liquid-glass-dark rounded-3xl p-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Sri Lanka Adventure
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Fill out the form to get a personalized quote and booking consultation from our travel experts.
            </p>

            {/* Quick Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="liquid-glass-icon w-12 h-12 text-orange-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Us</p>
                  <a
                    href="tel:0741450646"
                    className="text-lg font-semibold hover:text-orange-400 transition-colors"
                  >
                    0741 450 646
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="liquid-glass-icon w-12 h-12 text-orange-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Us</p>
                  <a
                    href="mailto:bookings@urbantravels.lk"
                    className="text-lg font-semibold hover:text-orange-400 transition-colors"
                  >
                    bookings@urbantravels.lk
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="liquid-glass-icon w-12 h-12 text-orange-400">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Office Hours</p>
                  <p className="text-lg font-semibold">
                    Mon - Sat: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="liquid-glass-elevated p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600">
                  We'll contact you soon with your personalized travel plan.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="liquid-glass-field"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="liquid-glass-field"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="liquid-glass-field"
                    placeholder="+94 XXX XXX XXX"
                  />
                </div>

                {/* Travelers and Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Travelers
                    </label>
                    <select
                      name="travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="liquid-glass-field"
                    >
                      {[1, 2, 3, 4, 5, 6, '7+'].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Person' : 'People'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                      className="liquid-glass-field"
                    />
                  </div>
                </div>

                {/* Package Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Interested In
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    className="liquid-glass-field"
                  >
                    <option value="custom">Custom Itinerary</option>
                    <option value="adventure">Adventure Package</option>
                    <option value="luxury">Luxury Package</option>
                    <option value="culture">Culture Package</option>
                    <option value="honeymoon">Honeymoon Package</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="liquid-glass-field"
                    placeholder="Any special interests or requirements?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-all transform hover:scale-105"
                >
                  Get My Personalized Quote
                </button>

                <p className="text-xs text-gray-600 text-center">
                  We respect your privacy. Your information is secure with us.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
