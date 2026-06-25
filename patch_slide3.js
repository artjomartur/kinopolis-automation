const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

const oldLine = 'img: "media__1782425706253.png"';
const newLine = 'img: "media__1782426782263.png"';

if (file.includes(oldLine)) {
    file = file.replace(oldLine, newLine);
    fs.writeFileSync('generate_custom_slides.js', file);
    console.log("Patched successfully");
} else {
    console.log("Could not find the old image line in generate_custom_slides.js");
}
