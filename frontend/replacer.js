const fs = require('fs');

const files = [
  "c:\\Users\\Administrator\\OneDrive\\Desktop\\bitvera\\frontend\\src\\components\\BookingModal.jsx",
  "c:\\Users\\Administrator\\OneDrive\\Desktop\\bitvera\\frontend\\src\\components\\LoginModal.jsx",
  "c:\\Users\\Administrator\\OneDrive\\Desktop\\bitvera\\frontend\\src\\components\\PurchaseModal.jsx",
  "c:\\Users\\Administrator\\OneDrive\\Desktop\\bitvera\\frontend\\src\\components\\Chatbot.jsx",
  "c:\\Users\\Administrator\\OneDrive\\Desktop\\bitvera\\frontend\\src\\components\\ServicePage.jsx"
];

for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  
  // bg-black -> bg-surface-main
  text = text.replace(/\bbg-black\b/g, 'bg-surface-main');
  
  // bg-[#101010] -> bg-surface-raised
  text = text.replace(/bg-\[\#101010\]/g, 'bg-surface-raised');
  
  // bg-[#212121] -> bg-surface-elevated
  text = text.replace(/bg-\[\#212121\]/g, 'bg-surface-elevated');
  
  // text-white/80 -> text-text-primary
  text = text.replace(/\btext-white\/80\b/g, 'text-text-primary');
  
  // text-white -> text-text-primary (only if not followed by / to preserve other opacities)
  text = text.replace(/\btext-white\b(?!\/)/g, 'text-text-primary');
  
  // text-gray-300 -> text-text-secondary
  text = text.replace(/\btext-gray-300\b/g, 'text-text-secondary');
  
  // text-gray-400 -> text-text-secondary
  text = text.replace(/\btext-gray-400\b/g, 'text-text-secondary');
  
  // text-[#DEDBC8] -> text-text-accent
  text = text.replace(/text-\[\#DEDBC8\]/g, 'text-text-accent');
  
  // bg-[#DEDBC8] -> bg-text-accent
  text = text.replace(/bg-\[\#DEDBC8\]/g, 'bg-text-accent');
  
  // border-white/10 -> border-border-glass/10
  text = text.replace(/\bborder-white\/10\b/g, 'border-border-glass/10');
  
  // border-white/5 -> border-border-glass/5
  text = text.replace(/\bborder-white\/5\b/g, 'border-border-glass/5');
  
  // border-white/20 -> border-border-glass/20 (Found in LoginModal.jsx)
  text = text.replace(/\bborder-white\/20\b/g, 'border-border-glass/20');
  
  fs.writeFileSync(file, text, 'utf8');
}
console.log("Replaced successfully!");
