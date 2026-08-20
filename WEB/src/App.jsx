import useLenis from "./hooks/useLenis.js";
import Navbar from "./components/Navbar/Navbar.jsx";
import Hero from "./components/Hero/Hero.jsx";
import DoctorBanner from "./components/DoctorBanner/DoctorBanner.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/Services/Services.jsx";
import VideoSection from "./components/VideoSection/VideoSection.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import Reviews from "./components/Reviews/Reviews.jsx";
import FAQ from "./components/FAQ/FAQ.jsx";
import Booking from "./components/Booking/Booking.jsx";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import WhatsAppWidget from "./components/WhatsAppWidget/WhatsAppWidget.jsx";
import { procedureVideosSection, videoReviewsSection } from "./data/content.js";

export default function App() {
  useLenis();

  return (
    <>
      <Navbar />
      <Hero />
      <DoctorBanner />
      <About />
      <Services />
      <VideoSection id="procedure" data={procedureVideosSection} />
      <Gallery />
      <VideoSection id="video-reviews" data={videoReviewsSection} />
      <Reviews />
      <FAQ />
      <Booking />
      <ContactForm />
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
