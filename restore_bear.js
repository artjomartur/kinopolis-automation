const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Regex to find my injected SVGs (they start with <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg")
const svgRegexModal = /<svg viewBox="0 0 200 200" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width: 100%; height: 100%; display: block;"[\s\S]*?<\/svg>/g;

const svgRegexChat = /<svg viewBox="0 0 200 200" xmlns="http:\/\/www\.w3\.org\/2000\/svg" style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var\(--primary-red\);"[\s\S]*?<\/svg>/g;

const imgModal = `<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: oliBreathing 3s ease-in-out infinite;" />`;

const imgFab = `<img src="https://trailer.kinopolis.de/media/img/kinobaer_teaser.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; animation: oliBreathing 3s ease-in-out infinite;" />`;

const imgChat = `<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary-red); animation: oliBreathing 3s ease-in-out infinite;" />`;

// First replace the FAB which was in <div id="ai-chat-fab"...>
// Then the modal which is in <div id="oli-avatar-container"...>
// Wait, I can just replace the first instance with modal, second with FAB.
// Actually, it's safer to just replace all `display: block;` SVGs with the imgModal/imgFab depending on location.

// Find all matches
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

// Add the breathing animation if not present
if (!html.includes('@keyframes oliBreathing')) {
    const styleTag = `
<style>
@keyframes oliBreathing {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}
</style>
</head>`;
    html = html.replace('</head>', styleTag);
}

fs.writeFileSync(path, html);
console.log("Restored original bear images with CSS breathing animation!");
