const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const oldModalRegex = /<div class="modal" id="oli-onboarding-modal"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newModalHTML = `<div class="modal" id="oli-onboarding-modal" style="z-index: 10000; background: rgba(0,0,0,0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
    <div class="modal-content" style="max-width: 420px; padding: 0; overflow: hidden; position: relative; background: #fff; border-radius: 28px; box-shadow: 0 24px 60px rgba(0,0,0,0.4); border: 2px solid rgba(255,255,255,0.1);">
        <!-- Duolingo Style Progress Bar -->
        <div style="padding: 1.5rem 1.5rem 0 1.5rem;">
            <div style="width: 100%; height: 16px; background: #e5e5e5; border-radius: 8px; position: relative; overflow: hidden;">
                <div id="oli-progress-bar" style="width: 25%; height: 100%; background: #58cc02; border-radius: 8px; transition: width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;">
                    <div style="position: absolute; top: 4px; left: 8px; right: 8px; height: 4px; background: rgba(255,255,255,0.3); border-radius: 2px;"></div>
                </div>
            </div>
        </div>
        
        <div style="padding: 1.5rem 2rem 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div id="oli-avatar-container" style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; border: 6px solid #fff; margin-bottom: 1rem; box-shadow: 0 12px 25px rgba(0,0,0,0.1); position: relative; z-index: 2;">
                <img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out;" />
            </div>
            
            <div style="background: #fff; color: #4b4b4b; position: relative; margin-bottom: 1.5rem; width: 100%;">
                <h2 id="oli-step-title" style="margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; color: #3c3c3c;">Bärenstarkes Hallo! 🐻</h2>
                <p id="oli-step-desc" style="font-size: 1.1rem; line-height: 1.4; color: #777; font-weight: 500;">Ich bin OLI, der Kinobär und dein persönlicher Assistent. Bevor es losgeht, lass uns kurz dein Dashboard einrichten.</p>
                
                <!-- Step 2: Role Selection -->
                <div id="oli-step-role-content" style="display: none; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <button class="oli-choice-btn" onclick="selectOliRole('newbie')" style="padding: 1.2rem; border-radius: 16px; border: 2px solid #e5e5e5; border-bottom: 6px solid #e5e5e5; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.1s; text-align: left; display: flex; align-items: center; gap: 1rem; color: #4b4b4b; outline: none;">
                        <span style="font-size: 1.8rem;">🌱</span> <b style="font-size: 1.15rem;">Ganz neu dabei!</b>
                    </button>
                    <button class="oli-choice-btn" onclick="selectOliRole('pro')" style="padding: 1.2rem; border-radius: 16px; border: 2px solid #e5e5e5; border-bottom: 6px solid #e5e5e5; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.1s; text-align: left; display: flex; align-items: center; gap: 1rem; color: #4b4b4b; outline: none;">
                        <span style="font-size: 1.8rem;">🍿</span> <b style="font-size: 1.15rem;">Kino-Profi (Schon länger)</b>
                    </button>
                </div>

                <!-- Step 3: Motivation Selection -->
                <div id="oli-step-goal-content" style="display: none; margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.75rem;">
                    <button class="oli-choice-btn" onclick="selectOliGoal('tickets')" style="padding: 1.2rem; border-radius: 16px; border: 2px solid #e5e5e5; border-bottom: 6px solid #e5e5e5; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.1s; text-align: left; display: flex; align-items: center; gap: 1rem; color: #4b4b4b; outline: none;">
                        <span style="font-size: 1.8rem;">🎫</span> <b style="font-size: 1.15rem;">Tickets scannen</b>
                    </button>
                    <button class="oli-choice-btn" onclick="selectOliGoal('timer')" style="padding: 1.2rem; border-radius: 16px; border: 2px solid #e5e5e5; border-bottom: 6px solid #e5e5e5; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.1s; text-align: left; display: flex; align-items: center; gap: 1rem; color: #4b4b4b; outline: none;">
                        <span style="font-size: 1.8rem;">⏱️</span> <b style="font-size: 1.15rem;">Pausen-Timer nutzen</b>
                    </button>
                    <button class="oli-choice-btn" onclick="selectOliGoal('movies')" style="padding: 1.2rem; border-radius: 16px; border: 2px solid #e5e5e5; border-bottom: 6px solid #e5e5e5; background: white; cursor: pointer; font-size: 1.1rem; transition: all 0.1s; text-align: left; display: flex; align-items: center; gap: 1rem; color: #4b4b4b; outline: none;">
                        <span style="font-size: 1.8rem;">🎬</span> <b style="font-size: 1.15rem;">Filminfos checken</b>
                    </button>
                </div>

                <!-- Step 4: Location Selection -->
                <div id="oli-step-location-content" style="display: none; margin-top: 1.5rem;">
                    <div style="position: relative;">
                        <select id="oli-kino-select" style="width: 100%; padding: 1.2rem; border-radius: 16px; border: 2px solid #e5e5e5; border-bottom: 6px solid #e5e5e5; background: #fff; color: #4b4b4b; font-weight: 800; font-size: 1.15rem; outline: none; cursor: pointer; appearance: none;">
                            <option value="">Bitte Kino wählen...</option>
                            <option value="da">Darmstadt - Kinopolis</option>
                            <option value="su">Sulzbach - Kinopolis</option>
                            <option value="ffm">Frankfurt - Citydome</option>
                            <option value="gi">Gießen - Kinopolis</option>
                        </select>
                        <div style="position: absolute; right: 1.2rem; top: 50%; transform: translateY(-70%); pointer-events: none; font-size: 1.2rem; color: #afafaf;">▼</div>
                    </div>
                </div>
            </div>
            
            <button id="oli-next-btn" onclick="nextOliStep()" style="width: 100%; padding: 1.1rem; font-size: 1.2rem; font-family: 'Outfit', sans-serif; font-weight: 800; border-radius: 16px; background: #58cc02; color: white; border: none; border-bottom: 6px solid #58a700; cursor: pointer; transition: all 0.1s; text-transform: uppercase; letter-spacing: 1px; outline: none;">Los geht's</button>
        </div>
    </div>
</div>`;

html = html.replace(oldModalRegex, newModalHTML);

const oldJsRegex = /function selectOliRole\(role\) {[\s\S]*?function pushBtn\(\) {[\s\S]*?}/;

const newJsCode = `function selectOliRole(role) {
    document.querySelectorAll('#oli-step-role-content .oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid #e5e5e5';
        btn.style.borderBottom = '6px solid #e5e5e5';
        btn.style.background = 'white';
        btn.style.transform = 'translateY(0)';
    });
    event.currentTarget.style.border = '2px solid #84d8ff';
    event.currentTarget.style.borderBottom = '2px solid #84d8ff';
    event.currentTarget.style.background = '#ddf4ff';
    event.currentTarget.style.transform = 'translateY(4px)';
    animateOli();
}

function selectOliGoal(goal) {
    document.querySelectorAll('#oli-step-goal-content .oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid #e5e5e5';
        btn.style.borderBottom = '6px solid #e5e5e5';
        btn.style.background = 'white';
        btn.style.transform = 'translateY(0)';
    });
    event.currentTarget.style.border = '2px solid #84d8ff';
    event.currentTarget.style.borderBottom = '2px solid #84d8ff';
    event.currentTarget.style.background = '#ddf4ff';
    event.currentTarget.style.transform = 'translateY(4px)';
    animateOli();
}

function pushBtn() {
    const btn = document.getElementById('oli-next-btn');
    if (!btn) return;
    btn.style.transform = 'translateY(4px)';
    btn.style.borderBottom = '2px solid #58a700';
    btn.style.marginBottom = '4px';
    setTimeout(() => {
        btn.style.transform = 'none';
        btn.style.borderBottom = '6px solid #58a700';
        btn.style.marginBottom = '0';
    }, 150);
}`;

html = html.replace(oldJsRegex, newJsCode);

// Fix reset UI
const oldReset = /document\.getElementById\('oli-next-btn'\)\.innerText = "Los geht's";/;
const newReset = `document.getElementById('oli-next-btn').innerText = "Los geht's";
    
    document.querySelectorAll('.oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid #e5e5e5';
        btn.style.borderBottom = '6px solid #e5e5e5';
        btn.style.background = 'white';
        btn.style.transform = 'translateY(0)';
    });`;
    
html = html.replace(oldReset, newReset);

fs.writeFileSync(path, html);
