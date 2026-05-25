import Header from './components/Header';
import Hero from './components/Hero';
import TravelerTypes from './components/TravelerTypes';
import Destinations from './components/Destinations';
import TourPackages from './components/TourPackages';
import Experiences from './components/Experiences';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
  return (
    <div className="page-background">
      <div className="page-content">
        <Header />
        <Hero />
        <svg
          className="section-divider-wave block w-full -mt-px relative z-10"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,32 C360,48 720,16 1080,32 C1260,40 1380,36 1440,28 L1440,48 L0,48 Z"
          />
        </svg>
        <TravelerTypes />
        <Destinations />
        <TourPackages />
        <Experiences />
        <Gallery />
        <Testimonials />
        <Newsletter />
        <BookingSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}

export default App;
