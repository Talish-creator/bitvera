import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Modules from "./components/Modules";
import WhyChoose from "./components/WhyChoose";
import Stats from "./components/Stats";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Partners />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;