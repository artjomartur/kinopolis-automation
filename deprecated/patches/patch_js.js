const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const scriptLogic = `
<script>
// --- PAUSEN TIMER LOGIC ---
let activeBreaks = [];
let breakInterval;

function startBreak(minutes) {
    const nameInput = document.getElementById('break-name');
    const name = nameInput.value.trim();
    if (!name) {
        alert('Bitte gib deinen Namen ein!');
        return;
    }
    
    const endTime = Date.now() + minutes * 60000;
    activeBreaks.push({ id: Date.now().toString(), name, endTime, duration: minutes });
    nameInput.value = '';
    
    saveBreaks();
    renderBreaks();
    if (!breakInterval) {
        breakInterval = setInterval(updateBreakTimers, 1000);
    }
}

function saveBreaks() {
    localStorage.setItem('kinopolis_breaks', JSON.stringify(activeBreaks));
}

function loadBreaks() {
    try {
        const saved = localStorage.getItem('kinopolis_breaks');
        if (saved) {
            activeBreaks = JSON.parse(saved);
            if (activeBreaks.length > 0) {
                breakInterval = setInterval(updateBreakTimers, 1000);
            }
            renderBreaks();
        }
    } catch(e) {}
}

function endBreak(id) {
    activeBreaks = activeBreaks.filter(b => b.id !== id);
    saveBreaks();
    renderBreaks();
    if (activeBreaks.length === 0 && breakInterval) {
        clearInterval(breakInterval);
        breakInterval = null;
    }
}

function playAlarm() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
}

function updateBreakTimers() {
    let needsRender = false;
    const now = Date.now();
    activeBreaks.forEach(b => {
        if (!b.alarmPlayed && now >= b.endTime) {
            b.alarmPlayed = true;
            playAlarm();
            needsRender = true;
            saveBreaks();
        }
        
        const el = document.getElementById('timer-' + b.id);
        if (el) {
            const diff = b.endTime - now;
            if (diff <= 0) {
                el.innerHTML = '<span style="color:var(--primary-red);font-weight:bold;">Abgelaufen!</span>';
            } else {
                const m = Math.floor(diff / 60000);
                const s = Math.floor((diff % 60000) / 1000);
                el.innerText = m + ':' + (s < 10 ? '0' : '') + s;
                if (m < 3) el.style.color = 'var(--primary-red)';
            }
        }
    });
    if (needsRender) renderBreaks();
}

function renderBreaks() {
    const list = document.getElementById('active-breaks-list');
    if (!list) return;
    
    if (activeBreaks.length === 0) {
        list.innerHTML = '<div style="color: var(--text-muted); font-size: 0.85rem; font-style: italic;">Aktuell niemand in der Pause.</div>';
        return;
    }
    
    list.innerHTML = '';
    const now = Date.now();
    activeBreaks.forEach(b => {
        const diff = b.endTime - now;
        const isExpired = diff <= 0;
        let timeStr = '';
        let color = '#fff';
        if (isExpired) {
            timeStr = '<span style="color:var(--primary-red);font-weight:bold;">Abgelaufen!</span>';
        } else {
            const m = Math.floor(diff / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            timeStr = m + ':' + (s < 10 ? '0' : '') + s;
            if (m < 3) color = 'var(--primary-red)';
        }
        
        list.innerHTML += \`
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid \${isExpired ? 'var(--primary-red)' : 'var(--primary-blue)'}">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600; font-size: 0.95rem;">\${b.name}</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">\${b.duration} Min. Pause</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span id="timer-\${b.id}" style="font-family: monospace; font-size: 1.1rem; color: \${color};">\${timeStr}</span>
                    <button onclick="endBreak('\${b.id}')" style="background: rgba(255,255,255,0.1); border: none; color: white; padding: 0.4rem 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">Zurück</button>
                </div>
            </div>
        \`;
    });
}

// --- SCANNER LOGIC ---
let html5QrCode;

function startScanner() {
    const readerElement = document.getElementById('reader');
    if (!readerElement) return;
    
    document.getElementById('start-scanner-btn').style.display = 'none';
    document.getElementById('stop-scanner-btn').style.display = 'inline-block';
    const resultDiv = document.getElementById('scanner-result');
    resultDiv.style.display = 'none';
    
    if (!html5QrCode) {
        html5QrCode = new Html5Qrcode("reader");
    }
    
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    html5QrCode.start({ facingMode: "environment" }, config, onScanSuccess, onScanFailure)
    .catch(err => {
        alert("Fehler beim Starten der Kamera: " + err);
        stopScanner();
    });
}

function stopScanner() {
    if (html5QrCode && html5QrCode.isScanning) {
        html5QrCode.stop().then(() => {
            document.getElementById('start-scanner-btn').style.display = 'inline-block';
            document.getElementById('stop-scanner-btn').style.display = 'none';
        }).catch(err => {
            console.error("Fehler beim Stoppen", err);
        });
    } else {
        document.getElementById('start-scanner-btn').style.display = 'inline-block';
        document.getElementById('stop-scanner-btn').style.display = 'none';
    }
}

function onScanSuccess(decodedText, decodedResult) {
    // Simulierte Validierung
    stopScanner();
    playAlarm(); // Erfolgs-Sound
    
    const resultDiv = document.getElementById('scanner-result');
    resultDiv.style.display = 'block';
    
    // Simuliere einen API Call an Compeso
    resultDiv.innerHTML = \`
        <div style="background: rgba(46, 204, 113, 0.1); border: 1px solid var(--primary-green); padding: 1rem; border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
            <h3 style="color: var(--primary-green); margin-bottom: 0.25rem;">Ticket Gültig!</h3>
            <p style="font-family: monospace; font-size: 0.8rem; word-break: break-all; margin-bottom: 0.5rem; color: var(--text-muted);">\${decodedText}</p>
            <p style="font-size: 0.9rem;">(API-Simulator aktiv. Warten auf echte Compeso-Anbindung.)</p>
            <button class="btn btn-primary" onclick="startScanner()" style="margin-top: 1rem; width: 100%;">Nächstes scannen</button>
        </div>
    \`;
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadBreaks();
});

</script>
</body>`;

html = html.replace('</body>', scriptLogic);
fs.writeFileSync(path, html);
