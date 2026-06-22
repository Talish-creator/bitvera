const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'locales', 'en.json');
const arPath = path.join(__dirname, 'src', 'locales', 'ar.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// Update pricing
enData.chatbot.response_pricing = "Our pricing is transparent and scalable:\n\n🌱 **Standard:** 550 SAR/month\n💼 **Professional:** 2,000 SAR/month\n🏢 **Enterprise:** 4,000 SAR/month\n\nWould you like me to recommend a plan based on your business size?";
arData.chatbot.response_pricing = "أسعارنا شفافة وقابلة للتطوير:\n\n🌱 **الأساسية:** 550 ريال/شهر\n💼 **الاحترافية:** 2,000 ريال/شهر\n🏢 **المؤسسات:** 4,000 ريال/شهر\n\nهل ترغب في أن أرشح لك خطة بناءً على حجم عملك؟";

// Add new responses
enData.chatbot.response_implementation = "Our implementation timeline depends on the modules you choose, but standard setups take between 30 to 45 days. We use an Agile methodology to ensure you get value quickly. Are you looking to implement immediately?";
arData.chatbot.response_implementation = "يعتمد وقت التنفيذ على الوحدات التي تختارها، ولكن الإعدادات القياسية تستغرق بين 30 إلى 45 يومًا. نستخدم منهجية أجايل لضمان حصولك على القيمة بسرعة. هل تتطلع للتنفيذ الفوري؟";

enData.chatbot.response_customization = "Yes! BitVera specializes in complete ERPNext customization. We can tailor workflows, reports, and modules to fit your exact business needs. Would you like to speak to an expert about your specific requirements?";
arData.chatbot.response_customization = "نعم! تتخصص شركة BitVera في التخصيص الكامل لنظام ERPNext. يمكننا تصميم سير العمل والتقارير والوحدات لتناسب احتياجات عملك بدقة. هل ترغب في التحدث إلى خبير حول متطلباتك المحددة؟";

enData.chatbot.response_zatca = "Absolutely. Our ERPNext solutions are 100% compliant with Saudi ZATCA e-invoicing regulations (Phase 1 and Phase 2), so you won't have to worry about tax compliance.";
arData.chatbot.response_zatca = "بالتأكيد. حلول ERPNext لدينا متوافقة بنسبة 100% مع لوائح الفوترة الإلكترونية لهيئة الزكاة والضريبة والجمارك (ZATCA) في السعودية (المرحلة الأولى والثانية)، لذلك لن تقلق بشأن الامتثال الضريبي.";

// Update quick replies to add more variety
enData.chatbot.quick_zatca = "ZATCA Compliance";
arData.chatbot.quick_zatca = "توافق هيئة الزكاة (ZATCA)";

enData.chatbot.quick_customization = "Customization";
arData.chatbot.quick_customization = "تخصيص النظام";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arData, null, 2), 'utf8');

console.log("Translation files updated successfully.");
