import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// This is your content brain. The page looks at the URL and grabs the matching text!
const pageData = {
  accounting: {
    title: "Effortless Financial Control Built for Saudi Compliance",
    description: "Full financial control starts here — a smart accounting solution built for the Saudi market, fully integrated with AZTAC and compliant with ZATCA's e-invoicing regulations."
  },
  crm: {
    title: "Transform Customer Relationships with Smart Software",
    description: "Elevate your sales pipeline with Sahabix's intuitive CRM integrations. Centralize communications, track leads, and close deals seamlessly."
  },
  'hr-management': {
    title: "Streamline Your Workforce with Modern HRMS",
    description: "Empower your HR team with a complete toolkit designed to manage, onboard, and scale your greatest asset—your people."
  }
};

const ServicePage = () => {
  // This grabs the word from the URL (e.g., 'accounting' or 'crm')
  const { id } = useParams();
  
  // If a user goes to a link we haven't written text for yet, it shows this default message
  const content = pageData[id] || {
    title: "Powerful Enterprise Solutions",
    description: "Discover how our integrated tools can streamline your operations and drive unprecedented business growth."
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="min-h-screen bg-[#0d071a]">
      <Navbar />
      
      {/* Dark Gradient Hero Section */}
      <div className="pt-32 pb-24 px-4 min-h-[80vh] flex flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2d1b69] via-[#12082b] to-[#0a0514]">
        
        <div className="max-w-5xl mx-auto text-center space-y-8 mt-12 z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            {content.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <button className="px-8 py-3.5 rounded-full border border-indigo-400 text-white font-semibold hover:bg-indigo-900/30 transition-all duration-300">
              Book a Free Consultation
            </button>
            <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#e0aaff] text-indigo-950 font-bold shadow-[0_0_20px_rgba(157,78,221,0.4)] hover:scale-105 transition-transform duration-300">
              Book a demo
            </button>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};

export default ServicePage;