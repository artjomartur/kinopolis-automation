const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

file = file.replace("waitUntil: 'networkidle0'", "waitUntil: 'load'");

fs.writeFileSync('generate_custom_slides.js', file);
console.log("Patched font timeout successfully");
