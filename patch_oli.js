const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

// 1. Update oli file names to _bgless.png
file = file.replace(/oli: "Oli_(\d+).png"/g, 'oli: "Oli_$1_bgless.png"');

// 2. Add Oli image to HTML
const htmlToFind = `<div class="ipad-mockup">
                    <img src="\\$\\{screenB64\\}" />
                </div>`;
const newHtml = `<div class="ipad-mockup">
                    <img src="\\$\\{screenB64\\}" />
                </div>
                <img src="\\$\\{oliB64\\}" class="oli-img" />`;

// Instead of regex for HTML, just replace using string:
file = file.replace('<div class="ipad-mockup">\n                    <img src="${screenB64}" />\n                </div>', '<div class="ipad-mockup">\n                    <img src="${screenB64}" />\n                </div>\n                <img src="${oliB64}" class="oli-img" />');

fs.writeFileSync('generate_custom_slides.js', file);
console.log("Patched oli successfully");
