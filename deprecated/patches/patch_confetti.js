const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

if (!html.includes('canvas-confetti')) {
    html = html.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>\n</head>');
}

fs.writeFileSync(path, html);
