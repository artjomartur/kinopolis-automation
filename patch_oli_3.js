const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// First remove any existing OLI logic that is rendering as text.
// We look for // --- OLI ONBOARDING LOGIC --- all the way to </body>
html = html.replace(/\/\/ --- OLI ONBOARDING LOGIC ---[\s\S]*?<\/body>/, '</body>');

// Now append the new logic inside a proper script tag right before </body>
const newJS = `
<script>
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
    if (!avatar) return;
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
    if (!btn) return;
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
        
        document.getElementById('oli-onboarding-modal').style.opacity = '0';
        document.getElementById('oli-onboarding-modal').style.transition = 'opacity 0.5s';
        
        setTimeout(() => {
            document.getElementById('oli-onboarding-modal').style.display = 'none';
            document.getElementById('oli-onboarding-modal').style.opacity = '1';
            
            const duration = 3000;
            const end = Date.now() + duration;
            const colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#3498db'];

            (function frame() {
                if (typeof confetti === 'function') {
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
                }

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
</script>
</body>`;

html = html.replace('</body>', newJS);

fs.writeFileSync(path, html);
