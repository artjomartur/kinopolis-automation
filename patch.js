const fs = require('fs');
let code = fs.readFileSync('src/auth.js', 'utf8');

code = code.replace(
    /userBtn\.onclick = \(\) => this\.showProfile\(\);/g,
    `userBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                    this.showProfile();
                } catch(err) {
                    alert("Fehler beim Öffnen des Profils: " + err.message);
                }
            };`
);

code = code.replace(
    /showProfile\(\) \{/,
    `showProfile() {
        console.log("showProfile called");
        try {`
);

code = code.replace(
    /window\.setSettingsPage\('profile'\);\n        \}/,
    `window.setSettingsPage('profile');
        }
        } catch(e) {
            alert("Error in showProfile: " + e.message);
            console.error(e);
        }`
);

fs.writeFileSync('src/auth.js', code);
