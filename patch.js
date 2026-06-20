const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Add script
if (!html.includes('html5-qrcode')) {
    html = html.replace('</head>', '    <script src="https://unpkg.com/html5-qrcode" type="text/javascript"></script>\n</head>');
}

// Add desktop tab for scanner
if (!html.includes('id="tab-scanner"')) {
    html = html.replace(
        '<button class="tab-btn tab-info" data-tab="info"',
        '<button class="tab-btn tab-scanner" data-tab="scanner" id="tab-scanner" onclick="switchTab(\'scanner\', this); return false;" type="button">📷 Scanner</button>\n<button class="tab-btn tab-info" data-tab="info"'
    );
}

// Add mobile tab for scanner
if (!html.includes('nav-scanner')) {
    html = html.replace(
        '<a class="mobile-nav-item nav-action" data-tab="action"',
        '<a class="mobile-nav-item nav-scanner" data-tab="scanner" href="#" onclick="switchTab(\'scanner\', this); return false;" role="button">\n<span>📷</span> Scanner\n</a>\n<a class="mobile-nav-item nav-action" data-tab="action"'
    );
}

// Add Scanner Section
if (!html.includes('id="scanner-section"')) {
    const scannerSection = `
<!-- SCANNER SECTION -->
<div class="dashboard-grid scanner-section" id="scanner" style="display:none;">
    <div class="card-container glass">
        <div class="card-header">
            <h2 style="font-size: 1.25rem;">📷 Ticket-Scanner (Compeso Simulator)</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted);">Nutzt die Gerätekamera zum Scannen von QR-Codes. Zeigt eine simulierte Validierung an.</p>
        </div>
        <div style="padding: 1rem; text-align: center;">
            <div id="reader" style="width: 100%; max-width: 500px; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 2px solid rgba(255,255,255,0.1);"></div>
            <div id="scanner-result" style="margin-top: 1rem; padding: 1rem; border-radius: 12px; display: none;"></div>
            <button class="btn btn-primary" id="start-scanner-btn" onclick="startScanner()" style="margin-top: 1rem; width: 100%; max-width: 500px;">Kamera starten</button>
            <button class="btn btn-secondary" id="stop-scanner-btn" onclick="stopScanner()" style="margin-top: 1rem; width: 100%; max-width: 500px; display: none;">Scanner stoppen</button>
        </div>
    </div>
</div>
`;
    html = html.replace('<!-- TOOLS SECTION -->', scannerSection + '\n<!-- TOOLS SECTION -->');
}

// Add Break Timer Section into Tools (Intern)
if (!html.includes('id="break-timer-module"')) {
    const breakTimerHTML = `
            <!-- Break Timer Module -->
            <div class="card-container glass" id="break-timer-module">
                <div class="card-header">
                    <h2 style="font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">⏱️ Pausen-Timer & Schicht-Board</h2>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">Transparenz für Pausenzeiten im Team</p>
                </div>
                <div style="padding: 1rem;">
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                        <input type="text" id="break-name" placeholder="Dein Name..." class="form-control" style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white;">
                    </div>
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                        <button class="btn btn-secondary" onclick="startBreak(15)" style="flex: 1; padding: 0.75rem;">15 Min</button>
                        <button class="btn btn-secondary" onclick="startBreak(30)" style="flex: 1; padding: 0.75rem;">30 Min</button>
                        <button class="btn btn-secondary" onclick="startBreak(45)" style="flex: 1; padding: 0.75rem;">45 Min</button>
                    </div>
                    
                    <h3 style="font-size: 0.95rem; margin-bottom: 0.75rem; color: var(--text-main);">Aktuelle Pausen</h3>
                    <div id="active-breaks-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
                        <div style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">Aktuell niemand in der Pause.</div>
                    </div>
                </div>
            </div>
`;
    // Insert into tools-section
    html = html.replace('<!-- LOST & FOUND MODULE -->', breakTimerHTML + '\n            <!-- LOST & FOUND MODULE -->');
}

fs.writeFileSync(path, html);
