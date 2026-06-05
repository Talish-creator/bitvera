import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BookingModal from './BookingModal';
import { useTranslation } from 'react-i18next'; // <-- 1. Import Translation Tool
import { 
  Plus, X, Calculator, Receipt, CreditCard, Users, CheckCircle2, 
  FileCog, Network, PackageCheck, Factory, FileSpreadsheet, 
  Settings, Warehouse, TrendingUp, Package, Clock, Building, 
  ShieldCheck, ShoppingCart, Target, Activity, FileText, 
  BarChart, Inbox, ClipboardList, Zap, MapPin, Search, Tag, 
  Phone, BookOpen, HelpCircle, Download, Globe, Lightbulb, 
  Award, Briefcase
} from 'lucide-react';

const pageData = {
  // ==========================================
  // SOLUTIONS (Left exactly as you requested)
  // ==========================================
  accounting: {
    title: "Effortless Financial Control Built for Saudi Compliance",
    description: "Full financial control starts here — a smart accounting solution built for the Saudi market, fully integrated with AZTAC and compliant with ZATCA's e-invoicing regulations.",
    features: [
      { icon: Calculator, title: "Core Recurring Accounting Tasks", description: "Smart Journal Entries automatically and accurately record all transactions with full integration across your modules." },
      { icon: Receipt, title: "Sales & Purchase Invoicing", description: "Easily generate and link invoices with inventory and accounting records, fully compliant with Saudi 'Fatoorah' requirements." },
      { icon: CreditCard, title: "Expense & Payment Management", description: "Track and categorize expenses by projects or departments to control spending and optimize costs." }
    ],
    faqs: [
      { question: "Accounting: Does ERPNext support VAT?", answer: "Yes. VAT is fully supported on sales and purchases, with detailed tax reporting to keep your business compliant and audit-ready." },
      { question: "Is ERPNext compliant with Saudi ZATCA e-invoicing requirements?", answer: "Absolutely. The system meets all Saudi Zakat, Tax, and Customs Authority (ZATCA) regulations for electronic invoicing." },
      { question: "Does the system use double-entry accounting?", answer: "Yes. Every invoice, payment, and purchase automatically creates ledger entries in a robust double-entry accounting system." }
    ]
  },
  'asset-management': {
    title: "Smarter Asset Management for Sustainable Growth",
    description: "Maximize Asset Performance — From Acquisition to Retirement. Your assets aren't just equipment — they're long-term investments in your growth and sustainability.",
    features: [
      { icon: Network, title: "Tracking, Classification, and Lifecycle", description: "Asset Creation & Categorization Create and classify assets by type, department, or location for smarter organization." },
      { icon: Activity, title: "Automated Depreciation", description: "Enable automated financial depreciation based on each asset's lifecycle, fully compliant with tax regulations." },
      { icon: ShoppingCart, title: "Procurement Integration", description: "Link purchase orders directly to asset creation so the asset's operational lifecycle begins immediately upon acquisition." },
      { icon: MapPin, title: "Asset Transfers Between Locations", description: "Easily transfer assets across departments or branches while maintaining a detailed transfer history." }
    ],
    faqs: [
      { question: "What exactly is an asset in ERPNext?", answer: "An asset is any valuable company-owned item—like computers, vehicles, furniture, or equipment—that you can track." },
      { question: "Can assets be registered and tracked automatically?", answer: "Yes. Add assets manually or import them via Excel with details like serial numbers, location, custodian, and department." },
      { question: "Is depreciation handled automatically?", answer: "Absolutely. Set your depreciation policies and let ERPNext calculate it monthly or yearly." }
    ]
  },
  'hr-management': {
    title: "Smart HR, Zero Hassle — All Your People Ops in One Place",
    description: "Our HR system is built to simplify every administrative task across the employee lifecycle — from hiring to offboarding — with powerful tools and automation.",
    features: [
      { icon: Users, title: "Centralized Employee Records", description: "A unified digital profile for each employee covering personal details, contracts, documents, and job history." },
      { icon: Target, title: "Applicant Tracking System (ATS)", description: "Manage the entire hiring process from job posting to onboarding with customizable interview stages and templates." },
      { icon: ShieldCheck, title: "Self-Service Employee Portal", description: "Each employee gets personal access to submit leave requests, update details, and track salary and attendance." },
      { icon: FileText, title: "Contract Management", description: "Generate and update employee contracts automatically with alerts for expiry or renewal." }
    ],
    faqs: [
      { question: "Can ERPNext integrate with biometric attendance devices?", answer: "Yes. Automate attendance tracking by connecting ERPNext to fingerprint and presence devices — saving time and reducing errors." },
      { question: "Can employees request leave through the system?", answer: "Absolutely. Employees submit leave requests online with clear types and dates, while managers review and approve effortlessly." },
      { question: "Is staff attendance tracked comprehensively?", answer: "Yes. Monitor daily attendance, track hours worked, tardiness, and absences with an easy-to-use calendar." }
    ]
  },
  payroll: {
    title: "Integrated Payroll System — Accurate, Flexible, and Fully Compliant",
    description: "Automate your payroll from start to finish, salaries, bonuses, taxes, loans, and compliance — all in one unified system built for the Saudi market and beyond.",
    features: [
      { icon: Calculator, title: "Smart Salary Structures", description: "Design flexible, rule-based salary structures with formulas for allowances, deductions, taxes, bonuses, and more." },
      { icon: Users, title: "Bulk Salary Assignment", description: "Assign or update salary structures for large teams in just a few clicks using powerful filtering and automation tools." },
      { icon: Search, title: "Pre-Payroll Previews", description: "Spot mistakes before they happen. Preview payslips, validate configurations, and ensure accuracy before every payroll run." },
      { icon: Zap, title: "Automated Payroll Runs", description: "Process payroll for hundreds of employees in minutes with automated calculations linked to attendance and leave." }
    ],
    faqs: [
      { question: "Does ERPNext automate payroll calculations?", answer: "Yes. Payroll is calculated automatically considering attendance, leaves, allowances, loans and deductions." },
      { question: "Are multiple leave types supported?", answer: "Yes. Customize leave categories like annual, sick, unpaid, or any special types — each governed by tailored policies." },
      { question: "Does the system generate pay slips?", answer: "Yes. Generate monthly pay slips in PDF format, ready for printing or emailing, simplifying payroll communication." }
    ]
  },
  crm: {
    title: "From Leads to Loyalty — One CRM to Grow It All",
    description: "Our CRM module is built to give you full control over every interaction — from the first touchpoint to post-sale support.",
    features: [
      { icon: Users, title: "Lead Tracking", description: "Capture leads with full context — source, type, and stage — for smarter segmentation and follow ups." },
      { icon: TrendingUp, title: "Opportunity Pipeline", description: "Visualize and manage sales opportunities across stages, from initial contact to closed deal." },
      { icon: CheckCircle2, title: "Automated Lead Assignment", description: "Use rules to distribute leads across sales reps fairly and quickly to speed up engagement." },
      { icon: BarChart, title: "Win Rate Insights", description: "Track conversion metrics to understand performance and improve future strategies." }
    ],
    faqs: [
      { question: "Can ERPNext help me track and manage leads effectively?", answer: "Yes, track the entire lifecycle of a lead from initial contact to final sale in one centralized dashboard." },
      { question: "How easy is it to convert a lead into a sales opportunity or customer?", answer: "It takes just one click to convert a qualified lead into an Opportunity, Customer, or Quotation." },
      { question: "Can I schedule calls, meetings, and follow-ups within the CRM?", answer: "Absolutely. The CRM includes built-in calendar scheduling and reminders so your team stays on track." }
    ]
  },
  sales: {
    title: "Sales, Simplified — From First Quote to Final Invoice",
    description: "Our Sales Management module is designed to empower you with robust tools that cover every stage of the sales process, from quotation to final delivery.",
    features: [
      { icon: FileText, title: "Create and Send Quotations", description: "Quickly generate professional quotations using customizable templates, and link them directly to leads." },
      { icon: ShoppingCart, title: "Sales Order Processing", description: "Convert approved quotations into sales orders with one click to accelerate workflows and reduce manual effort." },
      { icon: Search, title: "Quotation Comparison", description: "Compare multiple quotations side by side for more accurate and informed sales decisions." },
      { icon: Tag, title: "Price Lists and Discounts Management", description: "Create tailored pricing for each customer or product, and activate automatic discounts." }
    ],
    faqs: [
      { question: "Can quotations be converted into sales orders easily?", answer: "Yes, you can convert a quotation to a sales order with a single click, carrying over all details automatically." },
      { question: "Is order and sales tracking available?", answer: "Yes. Track the status of every order from creation through to delivery and final payment." },
      { question: "Does ERPNext include a Point of Sale (POS) system?", answer: "Yes, ERPNext includes a fully functional, touch-friendly POS interface for retail environments." }
    ]
  },
  'project-management': {
    title: "One System. Total Project Control.",
    description: "Our project management module gives you full visibility and control over every stage of a project — from planning to execution — all from one place.",
    features: [
      { icon: FileCog, title: "Project Creation & Timelines", description: "Build project structures and schedule tasks using Gantt charts or Kanban boards." },
      { icon: Target, title: "Milestone Management", description: "Define key deliverables and link them to specific tasks for accurate progress tracking." },
      { icon: Users, title: "Task & Team Assignment", description: "Distribute tasks among teams, assign deadlines, and set priorities." }
    ],
    faqs: [
      { question: "Can I break projects into phases and sub-tasks?", answer: "Yes, you can create unlimited nested tasks and phases to break down complex projects into manageable pieces." },
      { question: "Is time tracking available per task?", answer: "Absolutely. Team members can log their time directly against specific tasks for accurate billing and tracking." },
      { question: "Does ERPNext provide a Gantt chart for planning?", answer: "Yes. Interactive Gantt charts are built-in for visual timeline management and task dependencies." }
    ]
  },
  procurement: {
    title: "Procurement That Drives Growth — Automated, Accurate, Efficient",
    description: "Our procurement module manages every aspect of your supply cycle. From evaluating suppliers and creating purchase orders to handling invoicing and reporting.",
    features: [
      { icon: Building, title: "Comprehensive Supplier Database", description: "Maintain centralized records for all supplier contacts, product catalogs, and performance history." },
      { icon: ShieldCheck, title: "Supplier Evaluation", description: "Assess vendors based on delivery time, pricing, and quality to improve sourcing decisions." },
      { icon: Network, title: "Interactive Supplier Portal", description: "Allow vendors to submit quotations and receive purchase orders directly via a dedicated portal." },
      { icon: Inbox, title: "RFQ Management", description: "Send RFQs to multiple vendors, compare responses, and automate quote generation." }
    ],
    faqs: [
      { question: "Is procurement integrated with warehouse inventory?", answer: "Yes, approved purchase receipts automatically update warehouse stock levels in real-time." },
      { question: "Can I compare quotations from multiple suppliers?", answer: "Yes. You can generate an automatic comparison report for multiple supplier bids to find the best price." },
      { question: "Can supplier price lists be managed dynamically?", answer: "Yes. You can maintain multiple price lists that update automatically based on supplier agreements." }
    ]
  },
  production: {
    title: "Smarter Manufacturing — From Raw Materials to Final Output",
    description: "Our manufacturing system gives you complete visibility and precise control over every step of your production lifecycle, from planning materials to final delivery.",
    features: [
      { icon: Factory, title: "Create & Manage Production Orders", description: "Track manufacturing orders by product, with detailed quantities, materials, and stages." },
      { icon: Clock, title: "Production Planning & Workshop Tasks", description: "Schedule daily operations and assign them to machines, teams, or time slots." },
      { icon: ClipboardList, title: "Flexible BOM (Bill of Materials)", description: "Build dynamic BOMs for each product or process with configurable components." },
      { icon: Activity, title: "Track Production Stages", description: "Monitor every step in the line with live updates: started, in progress, or completed." }
    ],
    faqs: [
      { question: "Can we create multiple production orders simultaneously?", answer: "Yes, the Production Plan tool allows you to generate multiple work orders at once based on sales demand." },
      { question: "Are quality checks automated upon goods receipt?", answer: "Yes. You can enforce mandatory quality inspections before raw materials are accepted into inventory." },
      { question: "Can inspections be linked to the manufacturing process?", answer: "Absolutely. Quality checks can be triggered at any specific operation within the manufacturing routing." }
    ]
  },
  quality: {
    title: "Quality Built In — Every Step. Every Product. Every Time.",
    description: "Our Quality Management system is designed to give you precise control over your product and process monitoring. Every detail becomes traceable and measurable.",
    features: [
      { icon: ShieldCheck, title: "Define Quality Policies & Standards", description: "Set custom standards per product, process, or service based on your organization's requirements." },
      { icon: CheckCircle2, title: "Quality Checkpoints in Workflow", description: "Automatically trigger inspections at critical stages (e.g., post-production or pre-delivery)." },
      { icon: PackageCheck, title: "Inspection Linked to Production & Warehousing", description: "Enable automated checks when receiving, dispatching, or producing materials." }
    ],
    faqs: [
      { question: "What does the Quality module do?", answer: "It allows you to define inspection criteria, record test results, and manage quality goals across all operations." },
      { question: "Can I set different inspection criteria for each product?", answer: "Yes, Quality Inspection Templates let you define specific parameters and acceptable ranges for different items." },
      { question: "How are inspection results documented?", answer: "Results are logged digitally against the specific receipt, delivery, or manufacturing order for full traceability." }
    ]
  },
  warehouse: {
    title: "Total Warehouse Control — Real-Time, Accurate, Effortless",
    description: "Our Warehouse Management System (WMS) gives you complete control over every item moving in or out of your inventory. It's built to handle operations of any size.",
    features: [
      { icon: Warehouse, title: "Multi-Warehouse Management", description: "Manage complex hierarchies of warehouses, branches, and transit locations seamlessly." },
      { icon: Activity, title: "Stock Movement Tracking", description: "Track every internal transfer, receipt, and delivery with precise timestamps and user logs." },
      { icon: Search, title: "Serial & Batch Number Control", description: "Maintain strict control over inventory with automated serial numbering and batch expiration tracking." }
    ],
    faqs: [
      { question: "Does the system support cycle counting?", answer: "Yes, you can perform partial stock reconciliations without freezing the entire warehouse." },
      { question: "Is Warehouse Management integrated with sales, procurement, and production?", answer: "Yes, stock levels automatically update based on invoices, purchase receipts, and manufacturing consumption." },
      { question: "Can barcodes be printed and scanned?", answer: "Absolutely. Generate custom barcodes and use any standard scanner to process transactions quickly." }
    ]
  },
  inventory: {
    title: "Smart Inventory Starts Here — Track. Optimize. Deliver.",
    description: "Our Inventory Management module puts you in complete control of every item and quantity, no matter if it's in one warehouse or spread across multiple locations.",
    features: [
      { icon: Package, title: "Flexible Item Categorization", description: "Create item groups and categories to simplify access and classification." },
      { icon: Settings, title: "Multi-Unit Management", description: "Add multiple units of measure per item (box, piece, liter...) with automatic conversion." },
      { icon: MapPin, title: "Internal Storage Locations", description: "Divide your warehouse into shelves, sections, or sub-locations to pinpoint where each item is stored." },
      { icon: Zap, title: "Barcode & Instant Tracking", description: "Generate and scan barcodes to update quantities or quickly find items." }
    ],
    faqs: [
      { question: "What is the difference between Inventory Management and Warehouse Management?", answer: "Inventory focuses on the items themselves (costs, levels, variants), while Warehouse focuses on the physical movement and location of those items." },
      { question: "Can I monitor available, reserved, and short quantities?", answer: "Yes, the system provides real-time projected quantity reports showing exactly what is in stock vs. what is promised to customers." },
      { question: "Are stock shortage alerts supported?", answer: "Yes. You can set minimum stock levels and receive automated alerts or trigger automatic purchase requests when stock runs low." }
    ]
  },

  // ==========================================
  // NEW SECTIONS: Services, Pricing, Knowledge, About
  // ==========================================
  erpnext: {
    title: "Our Agile Methodology",
    description: "At BitVera, we adopt an Agile methodology tailored for ERPNext implementations and digital transformation projects. Our approach balances flexibility with structure.",
    features: [
      { icon: Activity, title: "Iterative & Incremental Delivery", description: "We divide each project into manageable cycles called Sprints to deliver business value early and often." },
      { icon: TrendingUp, title: "Embracing Change", description: "Flexibility to reprioritize based on evolving business needs with transparent communication of changes and impact." },
      { icon: Target, title: "Continuous Improvement", description: "At the end of each sprint, we conduct Retrospectives to constantly refine our approach and deliver faster." }
    ],
    faqs: []
  },
  consulting: {
    title: "Our Consulting Methodology",
    description: "A strategic, results-driven approach tailored for business growth and operational excellence.",
    features: [
      { icon: Search, title: "Strategic Discovery", description: "We engage with your leadership to understand your business model, market positioning, and growth challenges." },
      { icon: MapPin, title: "Opportunity Mapping", description: "We identify untapped opportunities and inefficiencies across operations, finance, HR, and customer engagement." },
      { icon: Lightbulb, title: "Tailored Business Solutions", description: "We co-develop actionable strategies whether restructuring processes or improving decision-making frameworks." }
    ],
    faqs: []
  },
  subscriptions: {
    title: "Unlock Your Team's Potential",
    description: "Find the perfect plan that matches your needs. Scale with your growth and unleash your team's true potential today!",
    features: [
      { icon: Building, title: "Starter Plan", description: "Perfect for small businesses. Includes basic accounting, HR management, and CRM essentials." },
      { icon: Target, title: "Professional Plan", description: "Best for growing companies. Advanced modules, payment reconciliation, and comprehensive sales tracking." },
      { icon: Globe, title: "Enterprise Plan", description: "Best for large companies. Multi-currency, cost centers, offline POS, and full multi-branch support." }
    ],
    faqs: []
  },
  'custom-plan': {
    title: "Customize Your Own Plan",
    description: "Full control, from scheduling to payroll. Easily create & send schedules, accurately track work hours, and get pay right, time and again.",
    features: [
      { icon: Tag, title: "Transparent Pricing", description: "No hidden fees. You only pay for the exact modules and user capacity your business requires." },
      { icon: TrendingUp, title: "Scalability", description: "Easily add new features, modules, or user accounts as your business expands over time." },
      { icon: Target, title: "Tailored Solutions", description: "Customized module configurations designed specifically for your industry's unique operational needs." }
    ],
    faqs: []
  },
  'erp-knowledge': {
    title: "The ERP system is supposed to serve you, not the other way around.",
    description: "Most ERP systems slow you down with rigid processes, expensive licenses, and endless dependencies. ERPNext is different.",
    features: [
      { icon: Search, title: "Discovery & Process Mapping", description: "Understand your workflows, challenges, and key objectives before writing a single line of code." },
      { icon: Settings, title: "Custom Solution Design", description: "Create a roadmap tailored to your real needs, adaptable as the project evolves." },
      { icon: Activity, title: "Iterative Implementation", description: "Roll out in phases, minimizing disruptions and keeping operations running smoothly." }
    ],
    faqs: []
  },
  faq: {
    title: "Frequently Asked Questions & Downloads",
    description: "Find answers to your most pressing questions about our services, or access our whitepapers and case studies.",
    features: [
      { icon: Download, title: "ERPNext Brochure", description: "Detailed overview of ERPNext features and benefits for your business. (PDF Download)" },
      { icon: FileText, title: "Case Study: Manufacturing", description: "How ERPNext transformed a manufacturing business operations. (PDF Download)" },
      { icon: BookOpen, title: "Implementation Guide", description: "Step-by-step guide to implementing ERPNext in your organization. (PDF Download)" }
    ],
    faqs: [
      { question: "Can ERPNext help me track and manage leads effectively?", answer: "Yes, track the entire lifecycle of a lead from initial contact to final sale in one centralized dashboard." },
      { question: "How easy is it to convert a lead into a sales opportunity?", answer: "It takes just one click to convert a qualified lead into an Opportunity, Customer, or Quotation." },
      { question: "Are sales team performance and conversion reports available?", answer: "Absolutely. Generate detailed reports on win rates, pipeline health, and individual rep performance." }
    ]
  },
  blog: {
    title: "ERPNext Insights & Real Stories",
    description: "From guesswork to clarity — real stories, real solutions. Stay updated with the latest in business technology.",
    features: [
      { icon: Zap, title: "How Much Does a Slow Decision Cost You?", description: "In today's market, speed determines success. Learn how data gathering impacts sales opportunities." },
      { icon: FileText, title: "From E-Invoice to Financial Insights", description: "An e-invoice is not the end — it's just the beginning. Discover the financial insights hidden in your invoicing." },
      { icon: Users, title: "The Rise of AI in Recruitment", description: "Artificial intelligence is transforming how companies hire and streamline the candidate matching process." }
    ],
    faqs: []
  },
  story: {
    title: "Smart, Scalable ERPNext for Saudi Businesses",
    description: "At BitVera IT Solutions, we build ERPNext systems tailored to your business—flexible, scalable, and ready to grow with you.",
    features: [
      { icon: Briefcase, title: "Real Business Know-How", description: "We're not just tech people—we speak your language: finance, operations, and sales. Smarter systems, better results." },
      { icon: Factory, title: "Industry-Driven Solutions", description: "From manufacturing to services, we build tools that speak directly to your sector. No generic templates." },
      { icon: Target, title: "Built for What's Next", description: "We align your systems with your actual business goals—not just tech buzzwords. That's how we unlock efficiency." }
    ],
    faqs: []
  },
  team: {
    title: "Meet Our Team of Experts",
    description: "We are a dedicated group of ERPNext specialists, business consultants, and developers committed to your success.",
    features: [
      { icon: Users, title: "Senior Consultants", description: "Decades of combined experience in business process reengineering and digital transformation." },
      { icon: Settings, title: "Technical Experts", description: "Certified ERPNext developers who ensure your system is secure, scalable, and optimized." },
      { icon: Target, title: "Customer Success", description: "Dedicated account managers who stay engaged post-launch to ensure sustained impact." }
    ],
    faqs: []
  },
  careers: {
    title: "Join a Team That Values Growth",
    description: "We're more than just ERP specialists — we're problem solvers, creative thinkers, and collaborators looking for talented builders.",
    features: [
      { icon: Globe, title: "Hybrid/Remote Flexibility", description: "We believe in building with heart, creating something that not only works but feels thoughtfully crafted." },
      { icon: Award, title: "Training & Certification", description: "We support your continuous learning with access to ERPNext certifications and skill development resources." },
      { icon: Activity, title: "Real Ownership", description: "Take the lead on projects with impact across industries. We favor progress over perfection." }
    ],
    faqs: []
  },

  // ==========================================
  // UPDATED CONTACT SECTION (Your Custom Details)
  // ==========================================
  contact: {
    title: "Contact BitVera IT Solutions",
    description: "Have a question? Looking for a free consultation or a demo of ERPNext? The BitVera team is here to support you — every step of the way.",
    features: [
      { icon: Phone, title: "Phone Number", description: "+966 580 608 336" },
      { icon: Inbox, title: "Email Address", description: "info@bitvera.com" },
      { icon: MapPin, title: "Location", description: "Riyadh, KSA" },
      { icon: Clock, title: "Working Hours", description: "Saturday - Thursday: 9 AM - 6 PM" }
    ],
    faqs: []
  }
};

const ServicePage = () => {
  const { id } = useParams();
  const [openFaq, setOpenFaq] = useState(null); 
  const { t } = useTranslation(); // <-- 2. Activate Translation tool
  
  // <-- 1. Added State to control your Booking Modal
  const [isBookingOpen, setIsBookingOpen] = useState(false); 
  
  const content = pageData[id] || {
    title: "Powerful Enterprise Solutions",
    description: "Discover how our integrated tools can streamline your operations and drive unprecedented business growth.",
    features: [],
    faqs: []
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(null); 
  }, [id]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* 1. WHITE/TEAL HERO SECTION */}
      <div className="pt-32 pb-20 px-4 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center space-y-8 mt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
            {t(content.title)}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t(content.description)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            
            {/* <-- 2. Wired up this Button! */}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-3.5 rounded-lg border-2 border-cyan-600 text-cyan-700 font-bold hover:bg-cyan-50 transition-all duration-300"
            >
              {t('Book a Free Consultation')}
            </button>
            
            {/* <-- 3. Wired up this Button! */}
            <button 
              onClick={() => setIsBookingOpen(true)}
              className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              {t('Book a demo')}
            </button>
            
          </div>
        </div>
      </div>

      {/* 2. WHITE/TEAL FEATURES GRID */}
      {content.features.length > 0 && (
        <div className="py-20 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {content.features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-cyan-100 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-cyan-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-cyan-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t(feature.title)}</h3>
                  <p className="text-slate-600 leading-relaxed">{t(feature.description)}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. WHITE/TEAL FAQ ACCORDION */}
      {content.faqs.length > 0 && (
        <div className="py-20 px-4 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
              {t('Everything You Should Know')}
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
                    <span className="text-lg font-semibold text-slate-900 pr-8">{t(faq.question)}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaq === idx ? 'bg-cyan-500 rotate-180' : 'bg-slate-100'}`}>
                      {openFaq === idx ? (
                        <X className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-slate-600" />
                      )}
                    </div>
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-cyan-100/50">
                      {t(faq.answer)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <Footer />

      {/* <-- 4. Added your Booking Modal component here at the very bottom! */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default ServicePage;