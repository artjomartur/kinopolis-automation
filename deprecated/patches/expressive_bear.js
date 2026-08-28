const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Regex to find my injected SVGs
const svgRegexModal = /<svg viewBox="0 0 200 200" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width: 100%; height: 100%; display: block;"[\s\S]*?<\/svg>/g;
const svgRegexChat = /<svg viewBox="0 0 200 200" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var\(--primary-red\);"[\s\S]*?<\/svg>/g;

const imgModal = `<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out;" />`;

const imgFab = `<img src="https://trailer.kinopolis.de/media/img/kinobaer_teaser.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; animation: duoBounce 3s infinite ease-in-out;" />`;

const imgChat = `<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary-red); animation: duoBounce 3s infinite ease-in-out;" />`;

let countBlock = 0;
html = html.replace(svgRegexModal, () => {
    countBlock++;
    if (countBlock === 1) return imgModal;
    if (countBlock === 2) return imgFab;
    return imgModal;
});

html = html.replace(svgRegexChat, () => {
    return imgChat;
});

const styleTag = `
<style>
@keyframes duoBounce {
  0% { transform: translateY(0) scale(1, 1); }
  20% { transform: translateY(-8px) scale(0.95, 1.05) rotate(-3deg); }
  40% { transform: translateY(0) scale(1.02, 0.98); }
  60% { transform: translateY(-4px) scale(0.98, 1.02) rotate(3deg); }
  80% { transform: translateY(0) scale(1.01, 0.99); }
  100% { transform: translateY(0) scale(1, 1); }
}
</style>
</head>`;
html = html.replace('</head>', styleTag);

fs.writeFileSync(path, html);
