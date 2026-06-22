const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'locales', 'en.json');
const arPath = path.join(__dirname, 'src', 'locales', 'ar.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

const newResponses = {
  response_hr: {
    en: "Our HR Management module covers the complete employee lifecycle: attendance, leaves, payroll (compliant with Saudi labor laws), recruitment, and performance evaluations.",
    ar: "تغطي وحدة إدارة الموارد البشرية لدينا دورة حياة الموظف بالكامل: الحضور، الإجازات، مسير الرواتب (متوافق مع نظام العمل السعودي)، التوظيف، وتقييم الأداء."
  },
  response_accounting: {
    en: "The Accounting & Finance module includes full double-entry accounting, automated journal entries, cost centers, and is fully integrated with ZATCA e-invoicing for Saudi Arabia.",
    ar: "تتضمن وحدة المحاسبة والمالية محاسبة القيد المزدوج الكاملة، وقيود اليومية الآلية، ومراكز التكلفة، وهي متكاملة تماماً مع نظام الفوترة الإلكترونية لهيئة الزكاة والضريبة والجمارك (ZATCA) في السعودية."
  },
  response_inventory: {
    en: "With our Inventory and Warehouse Management, you can track stock movements across multiple warehouses in real-time, manage serial/batch numbers, and automate reordering.",
    ar: "من خلال إدارة المخزون والمستودعات لدينا، يمكنك تتبع حركات المخزون عبر مستودعات متعددة في الوقت الفعلي، وإدارة الأرقام التسلسلية/أرقام الدفعات، وأتمتة إعادة الطلب."
  },
  response_manufacturing: {
    en: "Our Manufacturing module gives you complete control over production planning, Bill of Materials (BOM), workstation routing, and quality inspections.",
    ar: "تمنحك وحدة التصنيع تحكمًا كاملاً في تخطيط الإنتاج، وقائمة المواد (BOM)، وتوجيه محطات العمل، وفحوصات الجودة."
  },
  response_training: {
    en: "Yes, absolutely! We provide comprehensive training sessions for your entire team to ensure smooth adoption of the new ERP system. We also provide user manuals and video tutorials.",
    ar: "نعم، بالتأكيد! نحن نقدم دورات تدريبية شاملة لفريقك بأكمله لضمان التبني السلس لنظام تخطيط الموارد الجديد. كما نوفر أدلة استخدام ودروس فيديو."
  },
  response_migration: {
    en: "Data migration is a core part of our implementation process. We securely extract, clean, and import your historical data from legacy systems like QuickBooks, Odoo, or Excel sheets into ERPNext.",
    ar: "ترحيل البيانات هو جزء أساسي من عملية التنفيذ لدينا. نقوم باستخراج بياناتك التاريخية وتنظيفها واستيرادها بأمان من الأنظمة القديمة مثل QuickBooks أو Odoo أو جداول Excel إلى ERPNext."
  },
  response_languages: {
    en: "The ERP system fully supports both Arabic and English. Users can switch their interface language at any time with a single click, with full Right-to-Left (RTL) support for Arabic.",
    ar: "يدعم نظام تخطيط الموارد كلا من اللغتين العربية والإنجليزية بالكامل. يمكن للمستخدمين تبديل لغة الواجهة في أي وقت بنقرة واحدة، مع دعم كامل للاتجاه من اليمين إلى اليسار (RTL) للغة العربية."
  },
  response_mobile: {
    en: "Yes, ERPNext is fully responsive on mobile browsers, and there is also a dedicated Mobile App available for both iOS and Android to manage operations on the go.",
    ar: "نعم، نظام ERPNext متجاوب بالكامل على متصفحات الهواتف المحمولة، ويتوفر أيضاً تطبيق جوال مخصص لكل من iOS و Android لإدارة العمليات أثناء التنقل."
  },
  response_hosting: {
    en: "We offer flexible hosting options! You can choose our secure Cloud Hosting (with daily backups and 99.9% uptime) or we can deploy the system On-Premise on your own servers.",
    ar: "نقدم خيارات استضافة مرنة! يمكنك اختيار الاستضافة السحابية الآمنة الخاصة بنا (مع نسخ احتياطية يومية ووقت تشغيل بنسبة 99.9٪) أو يمكننا نشر النظام محلياً (On-Premise) على خوادمك الخاصة."
  },
  response_integration: {
    en: "ERPNext has powerful REST APIs. We can easily integrate it with third-party platforms like Shopify, WooCommerce, Magento, payment gateways, and shipping providers.",
    ar: "يحتوي ERPNext على واجهات برمجة تطبيقات (REST APIs) قوية. يمكننا بسهولة دمجه مع منصات خارجية مثل Shopify و WooCommerce و Magento وبوابات الدفع ومزودي الشحن."
  },
  response_support: {
    en: "We offer 24/7 technical support, regular system updates, and maintenance SLA packages to ensure your business operations never face downtime.",
    ar: "نحن نقدم دعماً فنياً على مدار الساعة طوال أيام الأسبوع، وتحديثات منتظمة للنظام، وباقات اتفاقية مستوى الخدمة (SLA) للصيانة لضمان عدم توقف عمليات عملك أبداً."
  },
  response_pos: {
    en: "Yes, we provide a lightning-fast, offline-capable Point of Sale (POS) system that syncs perfectly with your inventory and accounting in real-time.",
    ar: "نعم، نحن نوفر نظام نقاط بيع (POS) سريع جداً وقادر على العمل دون اتصال بالإنترنت، والذي يتزامن تماماً مع المخزون والمحاسبة في الوقت الفعلي."
  }
};

for (const [key, val] of Object.entries(newResponses)) {
  enData.chatbot[key] = val.en;
  arData.chatbot[key] = val.ar;
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arData, null, 2), 'utf8');

console.log("Bulk translations added!");
