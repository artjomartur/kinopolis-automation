const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Add Chart.js to head
if (!html.includes('Chart.js')) {
    html = html.replace('</head>', '    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>\n</head>');
}

// 2. Add Telegram Settings
if (!html.includes('telegram-chat-id')) {
    const pushSettingsStr = '<button class="btn-primary" onclick="submitMessage()">Nachricht senden</button>';
    const telegramHtml = `
                            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 1rem 0;">
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <h4 style="color: white; font-size: 1rem;">Telegram Bot (Alternativ)</h4>
                                <p style="color: var(--text-muted); font-size: 0.85rem;">Trage hier deine Chat ID ein, um Nachrichten per Telegram zu erhalten.</p>
                                <input type="text" id="telegram-chat-id" placeholder="Chat ID (z.B. 123456789)" class="input-field" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.75rem;" />
                                <button class="btn-secondary" onclick="saveTelegramSettings()" style="padding: 0.5rem; border-radius: 8px; margin-top: 0.5rem;">Speichern</button>
                            </div>
    `;
    html = html.replace(pushSettingsStr, pushSettingsStr + telegramHtml);
}

// 3. Add Analytics & Export to Stats Section
const statsContentRegex = /(<div class="collapsible-content" id="stats-content"[^>]*>)[\s\S]*?(<div class="stats-grid" id="stats-grid">)/;
if (html.match(statsContentRegex) && !html.includes('analytics-chart')) {
    const analyticsHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="color: white; margin: 0;">Historie & Prognose</h3>
                <div>
                    <button class="btn-secondary" onclick="exportPDF()" style="margin-right: 0.5rem;">📄 PDF</button>
                    <button class="btn-secondary" onclick="exportExcel()">📊 Excel</button>
                </div>
            </div>
            
            <div class="card-container glass" style="padding: 1.5rem; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 1rem; color: var(--text-muted);">Besucher-Trend (7 Tage)</h4>
                <canvas id="analytics-chart" style="width: 100%; height: 200px;"></canvas>
            </div>

            <div class="card-container glass" style="padding: 1.5rem; margin-bottom: 1.5rem;">
                <h4 style="margin-bottom: 0.5rem; color: var(--text-muted);">Wetter & Auslastungs-Prognose</h4>
                <div id="weather-widget" style="display: flex; align-items: center; gap: 1rem;">
                    <div style="font-size: 2.5rem;" id="weather-icon">☁️</div>
                    <div>
                        <div style="font-size: 1.2rem; font-weight: bold;" id="weather-temp">Wird geladen...</div>
                        <div style="font-size: 0.9rem; color: var(--text-muted);" id="weather-desc">Open-Meteo</div>
                    </div>
                </div>
            </div>
    `;
    html = html.replace(statsContentRegex, '$1' + analyticsHtml + '$2');
}

// 4. Add AI Chat Assistant to body
if (!html.includes('ai-chat-fab')) {
    const aiHtml = `
<!-- AI Chat Assistant -->
<div id="ai-chat-fab" style="position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: linear-gradient(135deg, #7000ff, #00d2ff); border-radius: 50%; box-shadow: 0 10px 25px rgba(112, 0, 255, 0.4); display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 9999; transition: transform 0.3s;" onclick="document.getElementById('ai-chat-modal').style.display='flex'">
    <span style="font-size: 1.8rem;">🤖</span>
</div>

<div id="ai-chat-modal" style="display: none; position: fixed; bottom: 90px; right: 20px; width: 350px; height: 450px; background: var(--surface); border: 1px solid var(--glass-border); border-radius: 20px; box-shadow: var(--shadow-premium); z-index: 9998; flex-direction: column; overflow: hidden;">
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-bottom: 1px solid var(--glass-border); display: flex; justify-content: space-between; align-items: center;">
        <h3 style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">🤖 KI Assistent</h3>
        <button onclick="document.getElementById('ai-chat-modal').style.display='none'" style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem;">&times;</button>
    </div>
    <div id="ai-chat-messages" style="flex: 1; padding: 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 0.75rem;">
        <div style="background: rgba(0, 122, 255, 0.1); border: 1px solid rgba(0, 122, 255, 0.2); padding: 0.75rem; border-radius: 12px; align-self: flex-start; max-width: 85%;">
            Hallo! Ich bin dein Kino-Assistent. Wie kann ich dir heute helfen?
        </div>
    </div>
    <div style="padding: 1rem; border-top: 1px solid var(--glass-border); display: flex; gap: 0.5rem;">
        <input type="text" id="ai-chat-input" placeholder="Frage etwas..." style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 0.5rem; color: white; outline: none;" onkeypress="if(event.key==='Enter') sendChatMessage()" />
        <button onclick="sendChatMessage()" class="btn-primary" style="padding: 0.5rem 1rem; border-radius: 8px;">Senden</button>
    </div>
</div>

<script>
// --- TELEGRAM SETTINGS ---
function saveTelegramSettings() {
    const val = document.getElementById('telegram-chat-id').value;
    localStorage.setItem('telegram_chat_id', val);
    alert('Telegram Chat ID gespeichert!');
}
document.addEventListener('DOMContentLoaded', () => {
    const tgId = localStorage.getItem('telegram_chat_id');
    if (tgId) {
        const el = document.getElementById('telegram-chat-id');
        if (el) el.value = tgId;
    }
});

// --- AI CHAT LOGIC ---
async function sendChatMessage() {
    const input = document.getElementById('ai-chat-input');
    const msg = input.value.trim();
    if (!msg) return;
    
    input.value = '';
    const container = document.getElementById('ai-chat-messages');
    
    // User message
    container.innerHTML += \`<div style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 12px; align-self: flex-end; max-width: 85%;">\${msg}</div>\`;
    container.scrollTop = container.scrollHeight;
    
    // Loading indicator
    const loadingId = 'loading-' + Date.now();
    container.innerHTML += \`<div id="\${loadingId}" style="align-self: flex-start; font-size: 0.8rem; color: var(--text-muted);">KI denkt nach...</div>\`;
    
    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: msg,
                context: "Aktuelle Kinopolis Seite" // In reality, we'd pass the scraped sessions JSON here
            })
        });
        const data = await res.json();
        
        document.getElementById(loadingId).remove();
        container.innerHTML += \`<div style="background: rgba(0, 122, 255, 0.1); border: 1px solid rgba(0, 122, 255, 0.2); padding: 0.75rem; border-radius: 12px; align-self: flex-start; max-width: 85%;">\${data.reply || 'Fehler in der Antwort'}</div>\`;
        container.scrollTop = container.scrollHeight;
    } catch (e) {
        document.getElementById(loadingId).remove();
        container.innerHTML += \`<div style="color: red; align-self: flex-start; font-size: 0.85rem;">Verbindungsfehler zur KI.</div>\`;
    }
}

// --- ANALYTICS & WEATHER ---
async function loadAnalytics() {
    try {
        // Load Weather
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const wRes = await fetch(\`https://api.open-meteo.com/v1/forecast?latitude=\${lat}&longitude=\${lon}&current_weather=true\`);
            const wData = await wRes.json();
            if (wData.current_weather) {
                document.getElementById('weather-temp').innerText = wData.current_weather.temperature + ' °C';
                let icon = '☀️';
                if (wData.current_weather.weathercode > 50) icon = '🌧️';
                else if (wData.current_weather.weathercode > 1) icon = '☁️';
                document.getElementById('weather-icon').innerText = icon;
                
                const factor = icon === '🌧️' ? '+20%' : 'Normal';
                document.getElementById('weather-desc').innerText = \`Erwarteter Andrang: \${factor}\`;
            }
        });

        // Load Chart
        const aRes = await fetch('/api/analytics');
        const aData = await aRes.json();
        
        if (aData && aData.length > 0) {
            aData.reverse(); // oldest first for chart
            const ctx = document.getElementById('analytics-chart').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: aData.map(d => d.date),
                    datasets: [{
                        label: 'Besucher',
                        data: aData.map(d => d.visitors),
                        borderColor: '#007aff',
                        tension: 0.4,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    } catch (e) { console.error('Analytics load error:', e); }
}

// Hook into tab switch
const origSwitchTab = window.switchTab;
window.switchTab = function(view, btn) {
    origSwitchTab(view, btn);
    if (view === 'stats') {
        setTimeout(loadAnalytics, 200);
    }
};

// --- PDF / EXCEL EXPORTS ---
function exportPDF() {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("Kinopolis Tagesbericht", 14, 20);
        doc.text("Datum: " + new Date().toLocaleDateString(), 14, 30);
        doc.save("Kinopolis_Report.pdf");
        alert("PDF Report generiert!");
    } catch(e) { alert("Fehler beim PDF Export: " + e.message); }
}

function exportExcel() {
    try {
        const ws = XLSX.utils.json_to_sheet([{ Datum: new Date().toLocaleDateString(), Status: 'Aktiv' }]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Tagesbericht");
        XLSX.writeFile(wb, "Kinopolis_Report.xlsx");
        alert("Excel Report generiert!");
    } catch(e) { alert("Fehler beim Excel Export: " + e.message); }
}
</script>
</body>`;
    html = html.replace('</body>', aiHtml);
}

fs.writeFileSync(path, html);
console.log('Patched index.html');
