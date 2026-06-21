const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Fix syntax error first
html = html.replace(/}, 150\);\n}, 150\);\n}/, '    }, 150);\n}');

// Update avatar container to use Oli_1.png and give it an ID
html = html.replace(
    '<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out;" />',
    '<img id="oli-avatar-img" src="/assets/Oli_1.png" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out;" />'
);

// Update nextOliStep
const oldNextStep = /function nextOliStep\(\) {[\s\S]*?animateOli\(\);\n    }\n    else if \(oliStep > 4\)/;
const newNextStep = `function nextOliStep() {
    pushBtn();
    
    oliStep++;
    const title = document.getElementById('oli-step-title');
    const desc = document.getElementById('oli-step-desc');
    const btn = document.getElementById('oli-next-btn');
    const progress = document.getElementById('oli-progress-bar');
    
    const roleContent = document.getElementById('oli-step-role-content');
    const goalContent = document.getElementById('oli-step-goal-content');
    const locContent = document.getElementById('oli-step-location-content');
    
    const avatarImg = document.getElementById('oli-avatar-img');
    
    if (oliStep === 2) {
        progress.style.width = '50%';
        title.innerText = 'Wie gut kennst du dich aus?';
        desc.innerText = 'Bist du neu im Team oder schon ein alter Hase?';
        roleContent.style.display = 'flex';
        goalContent.style.display = 'none';
        locContent.style.display = 'none';
        if (avatarImg) avatarImg.src = '/assets/Oli_2.png';
        animateOli();
    } 
    else if (oliStep === 3) {
        progress.style.width = '75%';
        title.innerText = 'Dein Hauptziel 🎯';
        desc.innerText = 'Was wirst du hier im Dashboard am meisten nutzen?';
        roleContent.style.display = 'none';
        goalContent.style.display = 'flex';
        locContent.style.display = 'none';
        if (avatarImg) avatarImg.src = '/assets/Oli_3.png';
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
        if (avatarImg) avatarImg.src = '/assets/Oli_4.png';
        animateOli();
    }
    else if (oliStep > 4)`;

html = html.replace(oldNextStep, newNextStep);

// Update reset function to reset image
const oldReset = /document\.getElementById\('oli-progress-bar'\)\.style\.width = '25%';/;
const newReset = `document.getElementById('oli-progress-bar').style.width = '25%';
    const avatarImg = document.getElementById('oli-avatar-img');
    if(avatarImg) avatarImg.src = '/assets/Oli_1.png';`;

html = html.replace(oldReset, newReset);

fs.writeFileSync(path, html);
