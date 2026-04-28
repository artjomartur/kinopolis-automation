const fs = require('fs');

// 1. Fix temp_script.js
let tempStr = fs.readFileSync('temp_script.js', 'utf8');

// A: Call loadTaskState on startup
if(!tempStr.includes('loadTaskState(); // INITIAL LOAD')) {
    tempStr = tempStr.replace('function loadTaskState() {', 'loadTaskState(); // INITIAL LOAD\n        function loadTaskState() {');
}

// B: Modify renderTasks logic
let searchTask = `sessions.forEach((s, idx) => {
                    const [h, m] = s.time.split(':').map(Number);`;
let replaceTask = `sessions.forEach((s, idx) => {
                    const isLastSession = (idx === sessions.length - 1);
                    if (isLastSession) return; // User requested: do not show if last session
                    
                    const nextSession = sessions[idx + 1];
                    if (nextSession) {
                        const [nh, nm] = nextSession.time.split(':').map(Number);
                        const nextStartMin = nh * 60 + nm;
                        if (currentMinutes >= nextStartMin) return; // User requested: do not show if next session started
                    }
                    
                    const [h, m] = s.time.split(':').map(Number);`;
tempStr = tempStr.replace(searchTask, replaceTask);

fs.writeFileSync('temp_script.js', tempStr);
console.log('temp_script.js updated!');

// 2. Fix tl.html
let tlStr = fs.readFileSync('tl.html', 'utf8');
if(!tlStr.includes('Zurück zum Dashboard')) {
    let searchHeader = '<header class="header">\n        <h1>Teamleiter-Dashboard</h1>';
    let replaceHeader = '<header class="header">\n        <button onclick="window.location.href=\'/\'" style="position:absolute; left:20px; padding:8px 16px; border-radius:10px; border:none; background:rgba(255,255,255,0.1); color:#fff; cursor:pointer; font-family:Outfit; backdrop-filter:blur(10px);">Zurück zum Dashboard</button>\n        <h1>Teamleiter-Dashboard</h1>';
    tlStr = tlStr.replace(searchHeader, replaceHeader);
    fs.writeFileSync('tl.html', tlStr);
    console.log('tl.html updated!');
}

// 3. Fix index.html
let idxStr = fs.readFileSync('index.html', 'utf8');

// Scroll Bug
if(!idxStr.includes('overscroll-behavior: none;')) {
    idxStr = idxStr.replace('body {', 'body {\n            overscroll-behavior: none;');
}

// Light Mode Readability
idxStr = idxStr.replace('body.light-mode {', 'body.light-mode {\n            --text-main: #000000;\n            --text-muted: #333333;\n            --glass-bg: rgba(255, 255, 255, 0.95);\n            --glass-border: rgba(0, 0, 0, 0.2);');

// Intern Section
let internMatch = idxStr.match(/<div class="card-container glass intern-section"[^>]*>[\s\S]*?<\/div>\s*<\/div>/);
if (internMatch && !idxStr.includes('<!-- INTERN MOVED -->')) {
    let internHtml = internMatch[0] + '\n<!-- INTERN MOVED -->\n';
    idxStr = idxStr.replace(internMatch[0], ''); // Remove from old spot
    // Insert after dashboard title in settings tab
    let settingsHeader = '<h1 class="dashboard-title" style="margin-bottom: 0.5rem;">Einstellungen & Tools</h1>';
    if(idxStr.includes(settingsHeader)) {
        idxStr = idxStr.replace(settingsHeader, settingsHeader + '\n' + internHtml);
    }
}

// Abstände
idxStr = idxStr.replace('id="einstellungen-buttons"', 'id="einstellungen-buttons" style="display:flex; flex-direction:column; gap:1rem;"');

// SOS TextField
if(!idxStr.includes('id="sos-text"')) {
    idxStr = idxStr.replace('<button class="emergency-btn" onclick="sendEmergency()">🚨 HILFERUF SENDEN</button>', '<input type="text" id="sos-text" placeholder="Womit brauchst du Hilfe?" style="width:100%; padding:1rem; border-radius:12px; margin-bottom:1rem; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.5); color:#fff;">\n                <button class="emergency-btn" onclick="sendEmergency()">🚨 HILFERUF SENDEN</button>');
}

// SOS Logic in temp_script
let sendEmergFunc = `function sendEmergency() {`;
if(tempStr.includes(sendEmergFunc) && !tempStr.includes('sos-text')) {
    tempStr = tempStr.replace(sendEmergFunc, `function sendEmergency() {\n            const sosText = document.getElementById('sos-text') ? document.getElementById('sos-text').value : '';\n            const addText = sosText ? ' (' + sosText + ')' : '';`);
    // Then replace '🚨 HILFERUF' with '🚨 HILFERUF' + addText
    tempStr = tempStr.replace(`body: 'HILFERUF ausgelöst!'`, `body: 'HILFERUF ausgelöst!' + addText`);
    fs.writeFileSync('temp_script.js', tempStr);
}

// Fix Tagesauswahl listener
if(idxStr.includes('id="kp_date"')) {
    idxStr = idxStr.replace('<input type="date" id="kp_date"', '<input type="date" id="kp_date" onchange="if(typeof fetchSessions==\'function\') fetchSessions()"');
}

fs.writeFileSync('index.html', idxStr);
console.log('index.html updated!');
