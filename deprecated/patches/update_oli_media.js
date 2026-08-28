const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Replace avatar container contents
html = html.replace(
    '<img id="oli-avatar-img" src="/assets/Oli_1.png" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out;" />',
    `<img id="oli-avatar-img" src="/assets/Oli/Oli_1.png" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out; display: none;" />
                <video id="oli-avatar-vid" src="/assets/Oli/Oli_1.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: duoBounce 3s infinite ease-in-out; display: block;"></video>`
);

// 2. Add setOliMedia helper function before nextOliStep
const helperCode = `function setOliMedia(step) {
    const img = document.getElementById('oli-avatar-img');
    const vid = document.getElementById('oli-avatar-vid');
    if (!img || !vid) return;
    
    // Config: which step uses which media type
    const mediaTypes = {
        1: 'mp4',
        2: 'png',
        3: 'png',
        4: 'png'
    };
    
    const type = mediaTypes[step] || 'png';
    
    if (type === 'mp4') {
        img.style.display = 'none';
        vid.style.display = 'block';
        vid.src = \`/assets/Oli/Oli_\${step}.mp4\`;
        vid.play();
    } else {
        vid.style.display = 'none';
        img.style.display = 'block';
        img.src = \`/assets/Oli/Oli_\${step}.png\`;
    }
}

function nextOliStep() {`;

html = html.replace('function nextOliStep() {', helperCode);

// 3. Remove old img updates in nextOliStep
html = html.replace("if (avatarImg) avatarImg.src = '/assets/Oli_2.png';", "setOliMedia(2);");
html = html.replace("if (avatarImg) avatarImg.src = '/assets/Oli_3.png';", "setOliMedia(3);");
html = html.replace("if (avatarImg) avatarImg.src = '/assets/Oli_4.png';", "setOliMedia(4);");
html = html.replace("const avatarImg = document.getElementById('oli-avatar-img');", "");

// 4. Update resetAndTestOli
html = html.replace("const avatarImg = document.getElementById('oli-avatar-img');\n    if(avatarImg) avatarImg.src = '/assets/Oli_1.png';", "setOliMedia(1);");

fs.writeFileSync(path, html);
