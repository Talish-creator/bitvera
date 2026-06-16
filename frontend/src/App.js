import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Solutions from "./components/Solutions";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Modules from "./components/Modules";
import WhyChoose from "./components/WhyChoose";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { Toaster } from "./components/ui/toaster";

// --- HERE IS YOUR NEW IMPORT ---
import ServicePage from "./components/ServicePage";
// -------------------------------

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Partners />
      <Solutions />
      <Services />
      <Pricing />
      <Modules />
      <WhyChoose />
      <Stats />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* --- HERE IS YOUR NEW ROUTE --- */}
          <Route path="/service/:id" element={<ServicePage />} />
          {/* ------------------------------ */}
          
        </Routes>
        <Chatbot />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;