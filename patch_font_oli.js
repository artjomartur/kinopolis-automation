const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

// Change Oli 1 to Oli 4
file = file.replace('oli: "Oli_1_bgless.png",', 'oli: "Oli_4_bgless.png",');

// Wait for font load
const waitCodeOld = "await slidePage.setContent(html, { waitUntil: 'load' });\n        await new Promise(r => setTimeout(r, 500));";
const waitCodeNew = "await slidePage.setContent(html, { waitUntil: 'networkidle0' });\n        await slidePage.evaluateHandle('document.fonts.ready');\n        await new Promise(r => setTimeout(r, 800));";

if (file.includes(waitCodeOld)) {
    file = file.replace(waitCodeOld, waitCodeNew);
} else {
    // If not exact match, just inject document.fonts.ready before the screenshot
    const shotOld = "const slideFilename";
    const shotNew = "await slidePage.evaluateHandle('document.fonts.ready');\n        const slideFilename";
    file = file.replace(shotOld, shotNew);
}

fs.writeFileSync('generate_custom_slides.js', file);
console.log("Patched successfully");
