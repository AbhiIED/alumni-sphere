import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HomeNews from "../components/HomeNews";
import HomeEvent from "../components/HomeEvent";
import Footer from "../components/Footer";

export default function Homepage() {
  return (
    <>
      <Navbar />

      <section>
        <HeroSection />
      </section>

      <section>
        <HomeNews />
      </section>

      <section>
        <HomeEvent />
      </section>

      <section>
        <Footer />
      </section>
    </>
  );
}
