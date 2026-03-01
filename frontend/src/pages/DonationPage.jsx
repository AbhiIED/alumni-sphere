import React from "react";
import Donations from "../components/Donations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DonationPage() {
  return (
    <div>
      <Navbar />

      <section>
        <Donations />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
