const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Remove duoBounce from the img and video inside the avatar container
html = html.replace(
    '<img id="oli-avatar-img" src="/assets/Oli/Oli_1.png" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out; display: none;" />',
    '<img id="oli-avatar-img" src="/assets/Oli/Oli_1.png" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: none;" />'
);

html = html.replace(
    '<video id="oli-avatar-vid" src="/assets/Oli/Oli_1.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out; display: block;"></video>',
    '<video id="oli-avatar-vid" src="/assets/Oli/Oli_1.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;"></video>'
);

// Remove animateOli() calls from JS
html = html.replace(/animateOli\(\);/g, '');
html = html.replace(/animateOli\(true\);/g, '');

fs.writeFileSync(path, html);
