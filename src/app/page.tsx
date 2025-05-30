"use client";

import Navbar from "./components/Navbar";
import HomePage from "./Page/index"; 
import AboutSection from "./about/page"; 
import CounselorsSection from "./counselors/page";
import ServicesSection from "./services/page";
import HowItWorksSection from "./how-it-works/page";
import TestimonialsSection from "./testimonials/page";
import Plans from "./plans/page";
import ContactSection from "./contact/page";
import Footer from "./components/footer";

export default function HomeWrapper() {
  return (
    <>
      <Navbar />
      <HomePage />
      <AboutSection />
      <CounselorsSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <Plans />
      <ContactSection />
      <Footer />
    </>
  );
}
