const fs = require('fs');
const html = fs.readFileSync('pages/home.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let i = 0;
while ((match = scriptRegex.exec(html)) !== null) {
  try {
    new Function(match[1]);
    console.log('Script ' + i + ' is OK. length: ' + match[1].length);
  } catch (e) {
    console.error('Script ' + i + ' has syntax error: ' + e.message);
  }
  i++;
}
