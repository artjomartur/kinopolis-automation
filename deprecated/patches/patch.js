const fs = require('fs');
let file = fs.readFileSync('src/auth.js', 'utf8');

// Replace the userBtn.innerHTML block
const oldBlock = `        if (this.user) {
            userBtn.innerHTML = \`
                <div style="display:flex;align-items:center;gap:10px;">
                    <span>👤</span> \${this.user.name || 'Profil'}
                </div>
            \`;
            userBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                    this.showProfile();
                } catch(err) {
                    alert("Fehler beim Öffnen des Profils: " + err.message);
                }
            };
            userBtn.title = 'Profil & Einstellungen';
        } else if (localStorage.getItem('kp_guest_mode') === 'true') {
            userBtn.innerHTML = '<span>👤</span> Gast';
            userBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                    this.showProfile();
                } catch(err) {
                    alert("Fehler beim Öffnen des Profils: " + err.message);
                }
            };
            userBtn.title = 'Profil & Einstellungen';
        }`;

const newBlock = `        if (this.user) {
            userBtn.innerHTML = \`
                <div style="display:flex;align-items:center;gap:10px; pointer-events:none; user-select:none; -webkit-user-select:none;">
                    <span>👤</span> \${this.user.name || 'Profil'}
                </div>
            \`;
            userBtn.onclick = () => {
                this.showProfile();
            };
            userBtn.title = 'Profil & Einstellungen';
        } else if (localStorage.getItem('kp_guest_mode') === 'true') {
            userBtn.innerHTML = '<span style="pointer-events:none; user-select:none;">👤 Gast</span>';
            userBtn.onclick = () => {
                this.showProfile();
            };
            userBtn.title = 'Profil & Einstellungen';
        }`;

if (file.includes(oldBlock)) {
    file = file.replace(oldBlock, newBlock);
    fs.writeFileSync('src/auth.js', file);
    console.log("Patched successfully");
} else {
    console.log("Could not find the block to replace. Here is the file content around it:");
    const idx = file.indexOf("userBtn.innerHTML =");
    console.log(file.substring(idx - 100, idx + 400));
}
