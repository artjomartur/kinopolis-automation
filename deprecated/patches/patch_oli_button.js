const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Add floating button to test onboarding
if (!html.includes('id="debug-onboarding-btn"')) {
    const btnHtml = `
    <button id="debug-onboarding-btn" onclick="localStorage.removeItem('oli_onboarding_done'); checkOliOnboarding();" style="position: fixed; bottom: 20px; left: 20px; z-index: 10000; background: var(--primary-red); color: white; border: none; border-radius: 50px; padding: 10px 20px; font-weight: bold; cursor: pointer; box-shadow: 0 4px 10px rgba(226,28,43,0.3);">
        🐻 Onboarding Testen
    </button>
    `;
    html = html.replace('</body>', btnHtml + '\n</body>');
}

fs.writeFileSync(path, html);
