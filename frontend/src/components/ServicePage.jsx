import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Plus, X, Calculator, Receipt, CreditCard, Users, Briefcase, CheckCircle2 } from 'lucide-react';

// This is the expanded brain! It now holds the Hero text, Feature Cards, and FAQs for each page.
const pageData = {
  accounting: {
    title: "Effortless Financial Control Built for Saudi Compliance",
    description: "Full financial control starts here — a smart accounting solution built for the Saudi market, fully integrated with AZTAC and compliant with ZATCA's e-invoicing regulations.",
    features: [
      {
        icon: Calculator,
        title: "Core Recurring Accounting Tasks",
        description: "Smart Journal Entries automatically and accurately record all transactions with full integration across your modules, ensuring smooth and error-free operations."
      },
      {
        icon: Receipt,
        title: "Sales & Purchase Invoicing",
        description: "Easily generate and link invoices with inventory and accounting records, fully compliant with Saudi 'Fatoorah' requirements."
      },
      {
        icon: CreditCard,
        title: "Expense & Payment Management",
        description: "Track and categorize expenses by projects or departments to control spending and optimize costs."
      }
    ],
    faqs: [
      {
        question: "Accounting: Does ERPNext support VAT?",
        answer: "Yes. VAT is fully supported on sales and purchases, with detailed tax reporting to keep your business compliant and audit-ready."
      },
      {
        question: "Is ERPNext compliant with Saudi ZATCA e-invoicing requirements?",
        answer: "Absolutely. The system meets all Saudi Zakat, Tax, and Customs Authority (ZATCA) regulations for electronic invoicing, ensuring you avoid penalties."
      },
      {
        question: "Does the system use double-entry accounting?",
        answer: "Yes. Every invoice, payment, and purchase automatically creates ledger entries in a robust double-entry accounting system for accurate financial tracking."
      }
    ]
  },
  crm: {
    title: "From Leads to Loyalty — One CRM to Grow It All",
    description: "Elevate your sales pipeline with BitVera's intuitive CRM integrations. Centralize communications, track leads, and close deals seamlessly.",
    features: [
      {
        icon: Users,
        title: "Lead Tracking & Management",
        description: "Capture leads with full context — source, type, and stage — for smarter segmentation and follow-ups."
      },
      {
        icon: CheckCircle2,
        title: "Automated Lead Assignment",
        description: "Use rules to distribute leads across sales reps fairly and quickly to speed up engagement and response times."
      }
    ],
    faqs: [
      {
        question: "Can ERPNext help me track and manage leads effectively?",
        answer: "Yes, you can track the entire lifecycle of a lead from initial contact to closing the deal, all in one centralized dashboard."
      },
      {
        question: "Can I schedule calls and meetings within the CRM?",
        answer: "Absolutely. The CRM includes built-in calendar scheduling and follow-up reminders so your team never misses an opportunity."
      }
    ]
  }
};

const ServicePage = () => {
  const { id } = useParams();
  const [openFaq, setOpenFaq] = useState(null); // This controls which FAQ is open
  
  // Grab the data for the specific URL, or use a default fallback
  const content = pageData[id] || {
    title: "Powerful Enterprise Solutions",
    description: "Discover how our integrated tools can streamline your operations and drive unprecedented business growth.",
    features: [],
    faqs: []
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(null); // Reset FAQ state when changing pages
  }, [id]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* 1. HERO SECTION (White Theme) */}
      <div className="pt-32 pb-20 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-8 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <button className="px-8 py-3.5 rounded-lg border-2 border-cyan-600 text-cyan-700 font-bold hover:bg-cyan-50 transition-all duration-300">
              Book a Free Consultation
            </button>
            <button className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300">
              Book a demo
            </button>
          </div>
        </div>
      </div>

      {/* 2. FEATURES GRID */}
      {content.features.length > 0 && (
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-cyan-100 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. FAQ ACCORDION */}
      {content.faqs.length > 0 && (
        <div className="py-20 px-4 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
              Everything You Should Know
            </h2>
            
            <div className="space-y-4">
              {content.faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                    openFaq === idx ? 'border-cyan-500 bg-cyan-50/30' : 'border-slate-200 bg-white hover:border-cyan-200'
                  }`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-slate-900 pr-8">{faq.question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaq === idx ? 'bg-cyan-500 rotate-180' : 'bg-slate-100'}`}>
                      {openFaq === idx ? (
                        <X className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                  </button>
                  
                  {/* Expandable Answer */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-cyan-100/50">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default ServicePage;