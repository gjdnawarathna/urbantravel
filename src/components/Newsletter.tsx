import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center liquid-glass-dark rounded-3xl p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get Your Free Travel Plan
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Subscribe to our newsletter and receive personalized travel tips, exclusive deals, and inspiration delivered to your inbox.
          </p>

          {submitted ? (
            <div className="inline-block px-6 py-3 liquid-glass-btn text-orange-600">
              <p className="text-orange-600 font-semibold flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Thanks for subscribing!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 liquid-glass-field text-gray-900 placeholder:text-gray-500"
              />
              <button
                type="submit"
                className="px-6 py-3 liquid-glass-btn text-orange-600 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Mail size={18} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          )}

          <p className="text-white/70 text-sm mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
