import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function EventSection() {
  const events = [
    {
      title: "Alumni Reunion 2025",
      date: "July 15-17, 2025",
      description:
        "Reconnect with old friends and make new connections at the Alumni Reunion 2025. Featuring keynote speakers, networking sessions, and campus tours.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Tech Innovation Summit",
      date: "September 10, 2025",
      description:
        "Join alumni innovators and industry leaders as they share insights on the future of technology, AI, and entrepreneurship.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Scholarship Gala Dinner",
      date: "November 22, 2025",
      description:
        "A night to celebrate generosity and student success. All proceeds support the alumni scholarship fund.",
      image:
        "https://images.unsplash.com/photo-1503424886300-4f83d73a8f62?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Career Development Workshop",
      date: "March 3, 2026",
      description:
        "Interactive sessions with top recruiters, resume reviews, and career coaching exclusively for alumni and students.",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900">
              Upcoming Alumni Events
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay connected through reunions, conferences, and networking
              opportunities. Swipe through to explore what’s coming up!
            </p>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            autoplay={{ delay: 4000 }}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation
            className="pb-12"
          >
            {events.map((event, index) => (
              <SwiperSlide
                key={index}
                className="max-w-xs md:max-w-sm lg:max-w-md"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-amber-300 hover:shadow-2xl">
                  {/* Image with zoom */}
                  <div className="relative overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  {/* Text content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {event.title}
                    </h3>
                    <p className="text-sm text-amber-700 font-medium mb-2">
                      {event.date}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <button className="w-full py-2 rounded-full bg-amber-600 text-white font-medium shadow-md hover:bg-amber-700 transition">
                      Learn More
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Footer />
    </>
  );
}
