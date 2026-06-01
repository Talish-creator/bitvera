// Mock data for the Systems Experts clone

export const heroData = {
  title: "Right Solution From The First Time",
  subtitle: "Quality starts here – with smart planning, expert execution, and results that drive success.",
  tagline: "Systems Experts, your trusted ERPNext implementation partner.",
  features: [
    { icon: "CheckCircle", text: "ZATCA Compliance" },
    { icon: "Zap", text: "30 days Set Up" },
    { icon: "Headphones", text: "24/7 Support" },
    { icon: "Trophy", text: "Competitive Pricing" }
  ]
};

export const partnersData = [
  { name: "Frappe", logo: "https://frappecloud.com/files/frappe-logo.png" },
  { name: "ZATCA", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=ZATCA" },
  { name: "Fatoora", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=Fatoora" },
  { name: "Mudad", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=Mudad" },
  { name: "GOSI", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=GOSI" },
  { name: "Qiwa", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=Qiwa" },
  { name: "Muqeem", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=Muqeem" },
  { name: "StarTech", logo: "https://via.placeholder.com/120x60/0ea5e9/ffffff?text=StarTech" }
];

export const servicesData = [
  {
    id: "erp",
    icon: "Sparkles",
    title: "ERP Implementation",
    heading: "Complete ERP Implementation",
    features: [
      "End-to-end business process integration across all departments",
      "Real-time data synchronization and reporting capabilities",
      "Scalable architecture that grows with your business needs"
    ],
    stats: [
      { value: "95%", label: "Process Efficiency" },
      { value: "60%", label: "Cost Reduction" }
    ]
  },
  {
    id: "crm",
    icon: "Users",
    title: "CRM Integration",
    heading: "Seamless CRM Integration",
    features: [
      "Unified customer data management across all touchpoints",
      "Automated lead nurturing and sales pipeline tracking",
      "Advanced analytics for customer behavior insights"
    ],
    stats: [
      { value: "85%", label: "Lead Conversion" },
      { value: "40%", label: "Sales Increase" }
    ]
  },
  {
    id: "automation",
    icon: "Settings",
    title: "Process Automation",
    heading: "Intelligent Process Automation",
    features: [
      "Workflow automation for repetitive business processes",
      "AI-powered decision making and task routing",
      "Real-time monitoring and optimization capabilities"
    ],
    stats: [
      { value: "70%", label: "Time Savings" },
      { value: "90%", label: "Accuracy Rate" }
    ]
  },
  {
    id: "customization",
    icon: "Palette",
    title: "Custom Solutions",
    heading: "Tailored Customization Plans",
    features: [
      "Custom modules designed for your specific industry needs",
      "Flexible integration with existing business systems",
      "Ongoing support and maintenance for custom solutions"
    ],
    stats: [
      { value: "100%", label: "Custom Fit" },
      { value: "50%", label: "ROI Improvement" }
    ]
  }
];

export const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for small businesses",
    monthlyPrice: 594,
    annualPrice: 504,
    implementationFee: 15000,
    modules: 11,
    features: [
      "Accounting & Finance: Basic accounting",
      "HR Management: Employees only",
      "CRM: Quotations only",
      "Sales Management: Basic sales",
      "POS (Point of Sale): Basic POS",
      "Procurement Management: Purchase orders",
      "Inventory Management: Basic inventory",
      "Multi-Language: Arabic & English",
      "Integrations: Limited (Email/PDF Exports)",
      "Hosting: Shared (2 h / day)",
      "Database + Storage: 1 GB + 25 GB",
      "Backup: 7-day Retention",
      "Support: Ticket Only",
      "Provisioning Timeline: 2-4 weeks"
    ]
  },
  {
    name: "Professional",
    description: "Perfect for growing businesses",
    monthlyPrice: 2050,
    annualPrice: 1743,
    implementationFee: 58500,
    modules: 12,
    popular: true,
    features: [
      "Accounting & Finance: Full Suite",
      "HR Management: Full Suite",
      "CRM: Full Suite",
      "Sales Management: Full Suite",
      "POS (Point of Sale): Advanced POS",
      "Procurement Management: Full Suite",
      "Inventory Management: Full Suite",
      "Projects & Timesheets: Basic",
      "Manufacturing: Basic",
      "Assets Management: Basic",
      "Website & Portal: Basic",
      "Quality Management: Basic",
      "Multi-Language: Arabic & English",
      "Integrations: Standard (Payments, Shipping, Slack/MS Teams)",
      "Document Limits: 20,000",
      "Hosting: Shared (4 h / day - 2 GB)",
      "Database + Storage: 2 GB + 50 GB",
      "Backup: 14-day Retention",
      "Customization: 10 hours/year",
      "Support: Ticket + Chat",
      "Provisioning Timeline: 4-6 weeks"
    ]
  },
  {
    name: "Enterprise",
    description: "Perfect for large enterprises",
    monthlyPrice: 4028,
    annualPrice: 3424,
    implementationFee: 94500,
    modules: 12,
    features: [
      "Accounting & Finance: Full Suite",
      "HR Management: Full Suite",
      "CRM: Full Suite",
      "Sales Management: Full Suite",
      "POS (Point of Sale): Advanced POS",
      "Procurement Management: Full Suite",
      "Inventory Management: Full Suite",
      "Projects & Timesheets: Full Suite",
      "Manufacturing: Full Suite",
      "Assets Management: Full Suite",
      "Website & Portal: Full Suite",
      "Quality Management: Full Suite",
      "Multi-Language: Arabic & English",
      "Integrations: Advanced (Custom APIs, ERP extensions)",
      "Document Limits: Unlimited",
      "Hosting: Dedicated (8+ hrs/day - 4+ GB)",
      "Database + Storage: 5 GB + 100 GB",
      "Backup: Real-time + Off-site backup",
      "Customization: Unlimited",
      "Support: Dedicated Account Manager + 24/7 Support",
      "Provisioning Timeline: 6-8 weeks"
    ]
  }
];

export const modulesData = [
  { name: "Accounting & Finance", icon: "DollarSign", link: "/accounting-finance" },
  { name: "HR Management", icon: "Users", link: "/hr-management" },
  { name: "Asset Management", icon: "Package", link: "/asset-management" },
  { name: "Inventory Management", icon: "Archive", link: "/inventory-management" },
  { name: "Quality Management", icon: "Award", link: "/quality-management" },
  { name: "CRM", icon: "Target", link: "/crm" },
  { name: "Project Management", icon: "FolderKanban", link: "/project-management" },
  { name: "Warehouse Management", icon: "Warehouse", link: "/warehouse-management" },
  { name: "Payroll", icon: "CreditCard", link: "/payroll" },
  { name: "Production or Manufacturing", icon: "Factory", link: "/manufacturing" },
  { name: "Sales Management", icon: "ShoppingCart", link: "/sales-management" },
  { name: "Procurement Management", icon: "ShoppingBag", link: "/procurement-management" }
];

export const whyChooseData = [
  {
    icon: "Target",
    title: "Expert Implementation",
    description: "Our certified ERPNext experts have successfully implemented solutions for businesses across various industries, ensuring best practices and optimal configurations."
  },
  {
    icon: "TrendingUp",
    title: "Proven Track Record",
    description: "With over 500 successful implementations and 98% client satisfaction rate, we have the experience and expertise to deliver results that exceed expectations."
  },
  {
    icon: "Shield",
    title: "Security & Compliance",
    description: "We ensure your data is secure with enterprise-grade security measures and help you maintain compliance with local regulations and industry standards."
  },
  {
    icon: "MapPin",
    title: "Local Expertise",
    description: "Based in Saudi Arabia, we understand local business practices, regulations, and cultural nuances, providing solutions that truly fit your market."
  },
  {
    icon: "Clock",
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to ensure your system runs smoothly and your business operations are never interrupted."
  },
  {
    icon: "Layers",
    title: "Scalable Solutions",
    description: "Our solutions grow with your business. From startup to enterprise, we provide flexible, scalable implementations that adapt to your changing needs."
  }
];

export const statsData = [
  { value: "500+", label: "Happy Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "15+", label: "Years Experience" }
];

export const testimonialsData = [
  {
    name: "Ahmed Al-Rashid",
    position: "CEO, TechCorp Solutions",
    content: "Systems Experts transformed our business operations completely. The ERP implementation was seamless and the support team is outstanding.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Ahmed+Al-Rashid&background=0ea5e9&color=fff"
  },
  {
    name: "Sarah Mohammed",
    position: "Operations Manager, RetailPro",
    content: "The best decision we made was choosing Systems Experts. Their expertise in ERPNext and understanding of local regulations is unmatched.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Sarah+Mohammed&background=06b6d4&color=fff"
  },
  {
    name: "Khalid Ibrahim",
    position: "CTO, Manufacturing Plus",
    content: "Exceptional service and support. The customization capabilities allowed us to tailor the system perfectly to our manufacturing needs.",
    rating: 5,
    avatar: "https://ui-avatars.com/api/?name=Khalid+Ibrahim&background=0891b2&color=fff"
  }
];