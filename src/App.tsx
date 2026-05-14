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
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
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
  );
}

export default App;
