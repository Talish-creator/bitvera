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

import { ThemeProvider } from "./context/ThemeContext";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
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
    <ThemeProvider>
      <div className="App dark:bg-slate-900 dark:text-white transition-colors duration-300">
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
    </ThemeProvider>
  );
}

export default App;