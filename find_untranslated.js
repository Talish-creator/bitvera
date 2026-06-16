const fs = require('fs');
const path = require('path');

function findUntranslated(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            findUntranslated(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            const matches = content.match(/>([^<]+)</g);
            if (matches) {
                matches.forEach(m => {
                    const text = m.substring(1, m.length - 1).trim();
                    if (text && /[a-zA-Z]/.test(text) && !text.includes('t(') && !text.includes('{') && !text.includes('}')) {
                        console.log(`${fullPath}: ${text}`);
                    }
                });
            }
        }
    }
}

findUntranslated('c:\\Users\\Administrator\\OneDrive\\Desktop\\bitvera\\frontend\\src\\components');
