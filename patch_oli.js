const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace Chat FAB content with OLI avatar
html = html.replace(
    '<div id="ai-chat-fab" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: linear-gradient(135deg, #7000ff, #00d2ff); border-radius: 50%; box-shadow: 0 10px 25px rgba(112, 0, 255, 0.4); display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 9999; transition: transform 0.3s;" onclick="document.getElementById(\'ai-chat-modal\').style.display=\'flex\'">',
    '<div id="ai-chat-fab" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; box-shadow: 0 10px 25px rgba(255, 0, 0, 0.4); display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 9999; transition: transform 0.3s; overflow: hidden; border: 2px solid var(--primary-red);" onclick="document.getElementById(\'ai-chat-modal\').style.display=\'flex\'">\n<img src="https://trailer.kinopolis.de/media/img/kinobaer_teaser.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" />'
);

// Replace Chat Header with OLI
const oldChatHeader = `<div style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2);">
        <div style="font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">✨ KI-Assistent</div>`;
const newChatHeader = `<div style="padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2);">
        <div style="font-weight: 700; display: flex; align-items: center; gap: 0.75rem;">
            <img src="https://trailer.kinopolis.de/media/img/kinobaer_teaser.jpg" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; object-position: center top; border: 1px solid var(--primary-red);" />
            OLI (KI-Assist)
        </div>`;
html = html.replace(oldChatHeader, newChatHeader);

// Onboarding HTML
const onboardingHTML = `
<!-- OLI Onboarding Modal -->
<div class="modal" id="oli-onboarding-modal" style="z-index: 10000; background: rgba(0,0,0,0.9);">
    <div class="modal-content glass" style="max-width: 500px; padding: 0; overflow: hidden; position: relative;">
        <!-- Progress Bar -->
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1);">
            <div id="oli-progress-bar" style="width: 33%; height: 100%; background: var(--primary-green); transition: width 0.3s ease;"></div>
        </div>
        
        <div style="padding: 2rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 150px; height: 150px; border-radius: 50%; overflow: hidden; border: 4px solid var(--primary-red); margin-bottom: 1.5rem; box-shadow: 0 8px 24px rgba(255,0,0,0.3);">
                <img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
            </div>
            
            <div style="background: white; color: black; padding: 1.5rem; border-radius: 16px; position: relative; margin-bottom: 2rem; width: 100%;">
                <!-- Speech bubble tail -->
                <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 10px solid white;"></div>
                
                <h2 id="oli-step-title" style="margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;">Tadaaaa! Ich bin OLI! 🐻</h2>
                <p id="oli-step-desc" style="font-size: 1.05rem;">Schön, dass du da bist. Ich bin der Kinobär und helfe dir dabei, das Dashboard einzurichten!</p>
                
                <div id="oli-step-2-content" style="display: none; margin-top: 1rem;">
                    <select id="oli-kino-select" class="form-control" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #ccc; background: #f9f9f9; color: #333; font-weight: bold;">
                        <option value="">Bitte Kino wählen...</option>
                        <option value="da">Darmstadt - Kinopolis</option>
                        <option value="su">Sulzbach - Kinopolis</option>
                        <option value="ffm">Frankfurt - Citydome</option>
                        <option value="gi">Gießen - Kinopolis</option>
                    </select>
                </div>
            </div>
            
            <button id="oli-next-btn" class="btn btn-primary" onclick="nextOliStep()" style="width: 100%; padding: 1rem; font-size: 1.2rem; font-weight: 800; border-radius: 12px; background: var(--primary-green); border: none;">Lass uns loslegen!</button>
        </div>
    </div>
</div>
`;

// Insert onboarding HTML before AI chat
html = html.replace('<!-- AI Chat Assistant -->', onboardingHTML + '\n<!-- AI Chat Assistant -->');

// Add Onboarding Logic JS
const onboardingJS = `
// --- OLI ONBOARDING LOGIC ---
let oliStep = 1;

function checkOliOnboarding() {
    const done = localStorage.getItem('oli_onboarding_done');
    if (!done) {
        // Show after a tiny delay so UI loads first
        setTimeout(() => {
            document.getElementById('oli-onboarding-modal').style.display = 'flex';
        }, 1000);
    }
}

function nextOliStep() {
    oliStep++;
    const title = document.getElementById('oli-step-title');
    const desc = document.getElementById('oli-step-desc');
    const btn = document.getElementById('oli-next-btn');
    const progress = document.getElementById('oli-progress-bar');
    const step2Content = document.getElementById('oli-step-2-content');
    
    if (oliStep === 2) {
        progress.style.width = '66%';
        title.innerText = 'Wo bist du im Einsatz? 🍿';
        desc.innerText = 'Wähle dein Kino aus, damit ich das Dashboard für dich anpassen kann.';
        step2Content.style.display = 'block';
        btn.innerText = 'Weiter';
    } 
    else if (oliStep === 3) {
        const selected = document.getElementById('oli-kino-select').value;
        if (!selected) {
            alert('Bitte wähle ein Kino aus, bevor wir weitermachen!');
            oliStep--;
            return;
        }
        progress.style.width = '100%';
        step2Content.style.display = 'none';
        title.innerText = 'Bärenstark! 🎉';
        desc.innerText = 'Dein Dashboard ist bereit. Oben im Scanner-Tab kannst du übrigens direkt QR-Codes scannen. Und wenn du Fragen hast, schreib mir einfach im Chat (unten rechts).';
        btn.innerText = 'Schicht starten!';
    }
    else if (oliStep > 3) {
        // Finish
        localStorage.setItem('oli_onboarding_done', 'true');
        document.getElementById('oli-onboarding-modal').style.display = 'none';
        
        // Throw some confetti
        const end = Date.now() + 2 * 1000;
        const colors = ['#e74c3c', '#2ecc71', '#f1c40f'];
        (function frame() {
            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
            if (Date.now() < end) requestAnimationFrame(frame);
        }());
    }
}

// Check on load
document.addEventListener('DOMContentLoaded', () => {
    // We only trigger if user is logged in
    // For this prototype, we check if login form is hidden
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        if (loginForm && loginForm.style.display === 'none') {
            checkOliOnboarding();
        }
    }, 500);
});
`;

html = html.replace('</body>', onboardingJS + '\n</body>');
fs.writeFileSync(path, html);
