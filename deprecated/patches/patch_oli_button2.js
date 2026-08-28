const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace test button logic
const oldBtn = 'onclick="localStorage.removeItem(\\\'oli_onboarding_done\\\'); checkOliOnboarding();"';
const newBtn = 'onclick="resetAndTestOli()"';

if (html.includes(oldBtn)) {
    html = html.replace(oldBtn, newBtn);
}

// Inject resetAndTestOli function
const resetFn = `
function resetAndTestOli() {
    localStorage.removeItem('oli_onboarding_done');
    oliStep = 1;
    
    // Reset UI
    document.getElementById('oli-progress-bar').style.width = '25%';
    document.getElementById('oli-step-title').innerText = 'Bärenstarkes Hallo! 🐻';
    document.getElementById('oli-step-desc').innerText = 'Ich bin OLI, der Kinobär und dein persönlicher Assistent. Bevor es losgeht, lass uns kurz dein Dashboard einrichten.';
    document.getElementById('oli-next-btn').innerText = 'Los geht\\'s';
    
    document.getElementById('oli-step-role-content').style.display = 'none';
    document.getElementById('oli-step-goal-content').style.display = 'none';
    document.getElementById('oli-step-location-content').style.display = 'none';
    
    document.getElementById('oli-onboarding-modal').style.display = 'flex';
    document.getElementById('oli-onboarding-modal').style.opacity = '1';
    
    animateOli(true);
}
</script>
`;

html = html.replace('</script>', resetFn);

fs.writeFileSync(path, html);
