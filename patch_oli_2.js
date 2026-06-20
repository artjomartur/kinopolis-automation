const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const newHTML = `
<!-- OLI Onboarding Modal -->
<div class="modal" id="oli-onboarding-modal" style="z-index: 10000; background: rgba(0,0,0,0.9);">
    <div class="modal-content glass" style="max-width: 500px; padding: 0; overflow: hidden; position: relative;">
        <!-- Progress Bar -->
        <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.1);">
            <div id="oli-progress-bar" style="width: 25%; height: 100%; background: var(--primary-green); transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);"></div>
        </div>
        
        <div style="padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div id="oli-avatar-container" style="width: 160px; height: 160px; border-radius: 50%; overflow: hidden; border: 4px solid var(--primary-red); margin-bottom: 2rem; box-shadow: 0 10px 30px rgba(255,0,0,0.4); transition: transform 0.3s ease;">
                <img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />
            </div>
            
            <div style="background: white; color: black; padding: 1.5rem; border-radius: 20px; position: relative; margin-bottom: 2rem; width: 100%; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                <!-- Speech bubble tail -->
                <div style="position: absolute; top: -12px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 12px solid transparent; border-right: 12px solid transparent; border-bottom: 12px solid white;"></div>
                
                <h2 id="oli-step-title" style="margin-bottom: 0.75rem; font-family: 'Outfit', sans-serif; font-size: 1.6rem;">Tadaaaa! Ich bin OLI! 🐻</h2>
                <p id="oli-step-desc" style="font-size: 1.1rem; line-height: 1.5; color: #444;">Schön, dass du da bist. Lass uns dein Dashboard perfekt auf dich abstimmen!</p>
                
                <!-- Step 2: Role Selection -->
                <div id="oli-step-role-content" style="display: none; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <button class="oli-choice-btn" onclick="selectOliRole('newbie')" style="padding: 1rem; border-radius: 12px; border: 2px solid #eee; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">🌱</span> <b>Ganz neu dabei!</b>
                    </button>
                    <button class="oli-choice-btn" onclick="selectOliRole('pro')" style="padding: 1rem; border-radius: 12px; border: 2px solid #eee; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">🍿</span> <b>Kino-Profi (Schon länger hier)</b>
                    </button>
                </div>

                <!-- Step 3: Motivation Selection -->
                <div id="oli-step-goal-content" style="display: none; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <button class="oli-choice-btn" onclick="selectOliGoal('tickets')" style="padding: 1rem; border-radius: 12px; border: 2px solid #eee; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">🎫</span> <b>Tickets scannen</b>
                    </button>
                    <button class="oli-choice-btn" onclick="selectOliGoal('timer')" style="padding: 1rem; border-radius: 12px; border: 2px solid #eee; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">⏱️</span> <b>Pausen-Timer nutzen</b>
                    </button>
                    <button class="oli-choice-btn" onclick="selectOliGoal('movies')" style="padding: 1rem; border-radius: 12px; border: 2px solid #eee; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.2s; text-align: left; display: flex; align-items: center; gap: 1rem;">
                        <span style="font-size: 1.5rem;">🎬</span> <b>Filminfos checken</b>
                    </button>
                </div>

                <!-- Step 4: Location Selection -->
                <div id="oli-step-location-content" style="display: none; margin-top: 1.5rem;">
                    <select id="oli-kino-select" class="form-control" style="width: 100%; padding: 1rem; border-radius: 12px; border: 2px solid #eee; background: #f9f9f9; color: #333; font-weight: bold; font-size: 1.1rem;">
                        <option value="">Bitte Kino wählen...</option>
                        <option value="da">Darmstadt - Kinopolis</option>
                        <option value="su">Sulzbach - Kinopolis</option>
                        <option value="ffm">Frankfurt - Citydome</option>
                        <option value="gi">Gießen - Kinopolis</option>
                    </select>
                </div>
            </div>
            
            <button id="oli-next-btn" class="btn btn-primary" onclick="nextOliStep()" style="width: 100%; padding: 1.25rem; font-size: 1.3rem; font-weight: 800; border-radius: 16px; background: var(--primary-green); border: none; box-shadow: 0 4px 0 #27ae60; transition: transform 0.1s, box-shadow 0.1s;">Weiter</button>
        </div>
    </div>
</div>
`;

const newJS = `
// --- OLI ONBOARDING LOGIC ---
let oliStep = 1;

function checkOliOnboarding() {
    const done = localStorage.getItem('oli_onboarding_done');
    if (!done) {
        setTimeout(() => {
            document.getElementById('oli-onboarding-modal').style.display = 'flex';
            document.getElementById('oli-step-role-content').style.display = 'none';
            document.getElementById('oli-step-goal-content').style.display = 'none';
            document.getElementById('oli-step-location-content').style.display = 'none';
            animateOli(true);
        }, 800);
    }
}

function animateOli(wobble = false) {
    const avatar = document.getElementById('oli-avatar-container');
    if (wobble) {
        avatar.style.transform = 'rotate(-10deg) scale(1.05)';
        setTimeout(() => avatar.style.transform = 'rotate(10deg) scale(1.05)', 200);
        setTimeout(() => avatar.style.transform = 'rotate(-5deg) scale(1.05)', 400);
        setTimeout(() => avatar.style.transform = 'rotate(0deg) scale(1)', 600);
    } else {
        avatar.style.transform = 'scale(1.1)';
        setTimeout(() => avatar.style.transform = 'scale(1)', 200);
    }
}

function selectOliRole(role) {
    document.querySelectorAll('#oli-step-role-content .oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid #eee';
        btn.style.background = 'white';
    });
    event.currentTarget.style.border = '2px solid var(--primary-green)';
    event.currentTarget.style.background = '#f0fdf4';
    animateOli();
}

function selectOliGoal(goal) {
    document.querySelectorAll('#oli-step-goal-content .oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid #eee';
        btn.style.background = 'white';
    });
    event.currentTarget.style.border = '2px solid var(--primary-green)';
    event.currentTarget.style.background = '#f0fdf4';
    animateOli();
}

function pushBtn() {
    const btn = document.getElementById('oli-next-btn');
    btn.style.transform = 'translateY(4px)';
    btn.style.boxShadow = '0 0 0 #27ae60';
    setTimeout(() => {
        btn.style.transform = 'none';
        btn.style.boxShadow = '0 4px 0 #27ae60';
    }, 150);
}

function nextOliStep() {
    pushBtn();
    
    oliStep++;
    const title = document.getElementById('oli-step-title');
    const desc = document.getElementById('oli-step-desc');
    const btn = document.getElementById('oli-next-btn');
    const progress = document.getElementById('oli-progress-bar');
    
    const roleContent = document.getElementById('oli-step-role-content');
    const goalContent = document.getElementById('oli-step-goal-content');
    const locContent = document.getElementById('oli-step-location-content');
    
    if (oliStep === 2) {
        progress.style.width = '50%';
        title.innerText = 'Wie gut kennst du dich aus?';
        desc.innerText = 'Bist du neu im Team oder schon ein alter Hase?';
        roleContent.style.display = 'flex';
        goalContent.style.display = 'none';
        locContent.style.display = 'none';
        animateOli();
    } 
    else if (oliStep === 3) {
        progress.style.width = '75%';
        title.innerText = 'Dein Hauptziel 🎯';
        desc.innerText = 'Was wirst du hier im Dashboard am meisten nutzen?';
        roleContent.style.display = 'none';
        goalContent.style.display = 'flex';
        locContent.style.display = 'none';
        animateOli();
    }
    else if (oliStep === 4) {
        progress.style.width = '90%';
        title.innerText = 'Alles klar! 🍿';
        desc.innerText = 'Zuletzt: In welchem Kinopolis bist du heute im Einsatz?';
        roleContent.style.display = 'none';
        goalContent.style.display = 'none';
        locContent.style.display = 'block';
        btn.innerText = 'Los geht\\'s!';
        animateOli();
    }
    else if (oliStep > 4) {
        const selected = document.getElementById('oli-kino-select').value;
        if (!selected) {
            alert('Bitte wähle ein Kino aus, bevor wir weitermachen!');
            oliStep--;
            return;
        }
        progress.style.width = '100%';
        
        localStorage.setItem('oli_onboarding_done', 'true');
        
        // Hide Modal smoothly
        document.getElementById('oli-onboarding-modal').style.opacity = '0';
        document.getElementById('oli-onboarding-modal').style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            document.getElementById('oli-onboarding-modal').style.display = 'none';
            document.getElementById('oli-onboarding-modal').style.opacity = '1'; // reset for future
            
            // Confetti explosion
            const duration = 3000;
            const end = Date.now() + duration;
            const colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#3498db'];

            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (end > Date.now()) {
                    requestAnimationFrame(frame);
                }
            }());
        }, 500);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loginForm = document.getElementById('login-form');
        if (loginForm && loginForm.style.display === 'none') {
            checkOliOnboarding();
        }
    }, 500);
});
`;

// Replace HTML
html = html.replace(/<!-- OLI Onboarding Modal -->[\s\S]*?(?=<!-- AI Chat Assistant -->)/, newHTML + '\n');

// Replace JS
html = html.replace(/\/\/ --- OLI ONBOARDING LOGIC ---[\s\S]*?(?=<\/script>\s*<\/body>)/, newJS + '\n');

fs.writeFileSync(path, html);
