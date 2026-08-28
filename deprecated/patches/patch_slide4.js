const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

// 1. Change slide 4 image
const oldSlide4 = 'img: "scratch/screen_tasks.png"';
const newSlide4 = 'img: "media__1782426869132.png"';
if (file.includes(oldSlide4)) {
    file = file.replace(oldSlide4, newSlide4);
} else {
    console.log("Could not find slide 4 image line");
}

// 2. Change CSS object-fit
const oldCss = 'object-fit: cover; \n                    object-position: top center;';
const newCss = 'object-fit: contain; \n                    object-position: center;';
file = file.replace(/object-fit: cover;[\s\S]*?object-position: top center;/, 'object-fit: contain;\n                    object-position: center;');

fs.writeFileSync('generate_custom_slides.js', file);
console.log("Patched successfully");
