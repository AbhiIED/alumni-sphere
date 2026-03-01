import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Jobs from '../components/Jobs';
export default function JobsPage() {
  return (
    <div>
      <Navbar />
      <Jobs />
      <Footer />
    </div>
  )
}
