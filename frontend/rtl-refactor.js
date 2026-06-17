const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components');

const regexes = [
  { from: /\bpl-([\d\.\w]+)\b/g, to: 'ps-$1' },
  { from: /\bpr-([\d\.\w]+)\b/g, to: 'pe-$1' },
  { from: /\bml-([\d\.\w]+)\b/g, to: 'ms-$1' },
  { from: /\bmr-([\d\.\w]+)\b/g, to: 'me-$1' },
  { from: /\btext-left\b/g, to: 'text-start' },
  { from: /\btext-right\b/g, to: 'text-end' },
  { from: /\b(?<!-)left-([\d\.\w]+)\b/g, to: 'start-$1' },
  { from: /\b(?<!-)right-([\d\.\w]+)\b/g, to: 'end-$1' },
  { from: /\bborder-l(-[\d\w]+)?\b/g, to: 'border-s$1' },
  { from: /\bborder-r(-[\d\w]+)?\b/g, to: 'border-e$1' },
  { from: /\brounded-l(-[\d\w]+)?\b/g, to: 'rounded-s$1' },
  { from: /\brounded-r(-[\d\w]+)?\b/g, to: 'rounded-e$1' }
];

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('ui')) { 
          results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
};

// Add App.js as well
const files = walk(directoryPath);
files.push(path.join(__dirname, 'src', 'App.js'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  regexes.forEach(rule => {
    newContent = newContent.replace(rule.from, rule.to);
  });
  
  // Specific fix for Hero.jsx ltr/rtl hardcoding:
  newContent = newContent.replace(/ltr:-start-6 rtl:-end-6/g, '-start-6');
  newContent = newContent.replace(/ltr:-left-6 rtl:-right-6/g, '-start-6');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('RTL Refactor complete!');
