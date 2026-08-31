
        // EMERGENCY CACHE CLEAR
        if (window.location.search.includes('reset=true')) {
            localStorage.clear();
            sessionStorage.clear();
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(regs => {
                    for (let reg of regs) reg.unregister();
                });
            }
            caches.keys().then(names => {
                for (let name of names) caches.delete(name);
            });
            window.location.href = window.location.pathname;
        }
    
function resetAndTestOli() {
    localStorage.removeItem('oli_onboarding_done');
    oliStep = 1;
    
    // Reset UI
    document.getElementById('oli-progress-bar').style.width = '25%';
    
    if(avatarImg) avatarImg.src = '/assets/Oli_1.png';
    document.getElementById('oli-step-title').innerText = 'Bärenstarkes Hallo! 🐻';
    document.getElementById('oli-step-desc').innerText = 'Ich bin OLI, der Kinobär und dein persönlicher Assistent. Bevor es losgeht, lass uns kurz dein Dashboard einrichten.';
    document.getElementById('oli-next-btn').innerText = 'Los geht\'s';
    
    document.getElementById('oli-step-role-content').style.display = 'none';
    document.getElementById('oli-step-goal-content').style.display = 'none';
    document.getElementById('oli-step-location-content').style.display = 'none';
    
    document.getElementById('oli-onboarding-modal').style.display = 'flex';
    document.getElementById('oli-onboarding-modal').style.opacity = '1';
    
    
}



        // --- STARTUP SOUND DISABLED ---
        window.playStartupSound = function() {};

        // --- DEPARTMENT FILTERING LOGIC ---
        function selectDept(dept) {
            const today = new Date().toISOString().split('T')[0];
            const userId = (window.AUTH && AUTH.user && AUTH.user.email) ? AUTH.user.email : (localStorage.getItem('kp_guest_mode') === 'true' ? 'guest' : 'unknown');
            
            localStorage.setItem(`kp_dept_${userId}`, dept);
            localStorage.setItem(`kp_dept_date_${userId}`, today);
            localStorage.setItem('kinopolis_selected_dept', dept);
            
            // Clean classes
            document.body.classList.remove('dept-einlass', 'dept-kasse', 'dept-theke', 'dept-tl', 'dept-alles', 'dept-popcorn', 'dept-becher');
            document.body.classList.add(`dept-${dept}`);
            
            // Switch to initial tab based on role
            if (dept === 'popcorn' || dept === 'becher') {
                switchTab('action');
            } else {
                switchTab('live');
            }
            
            const modal = document.getElementById('dept-modal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.classList.remove('active'), 500);
            }
            showToast(`⚙️ Dashboard für "${dept.toUpperCase()}" optimiert.`);
        }
        window.selectDept = selectDept;

        function closeHandoverModal() {
            const modal = document.getElementById('handover-modal');
            if (modal) {
                modal.style.opacity = '0';
                setTimeout(() => modal.classList.remove('active'), 500);
            }
        }

        async function checkAnnouncements() {
            if (!window.AUTH || !AUTH.token) return;
            try {
                const res = await fetch('/api/announcements/latest', {
                    headers: { 'Authorization': `Bearer ${AUTH.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.content) {
                        const lastSeen = localStorage.getItem('last_handover_id');
                        if (lastSeen !== String(data.id)) {
                            document.getElementById('handover-content').innerHTML = data.content;
                            document.getElementById('handover-author').innerText = `VON: ${data.author || 'SYSTEM'}`;
                            const modal = document.getElementById('handover-modal');
                            if (modal) {
                                modal.classList.add('active');
                                setTimeout(() => modal.style.opacity = '1', 50);
                                localStorage.setItem('last_handover_id', data.id);
                            }
                        }
                    }
                }
            } catch (e) { console.error('Handover check failed:', e); }
        }

        function openHallMap(hallName) {
            // Disabled per user request
            showToast('Saalpläne aktuell deaktiviert.');
        }

        async function handleSeatMapScan(input) {
            const file = input.files[0];
            if (!file) return;
            const btn = document.getElementById('seat-scan-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '⌛ KI analysiert Sitzplätze...';
            btn.disabled = true;

            try {
                const compressedFile = await compressImage(file, 800, 0.7);
                const formData = new FormData();
                formData.append('image', compressedFile);
                formData.append('type', 'seatmap');

                const res = await fetch('/api/scan-plan', { method: 'POST', body: formData });
                const result = await res.json();

                if (result.success) {
                    const data = result.data;
                    alert(`KI-ANALYSE ERGEBNIS:\n\n👥 Belegte Plätze: ${data.occupied}\n🪑 Frei: ${data.available}\n📊 Auslastung: ${data.occupancy_percent}%`);
                } else {
                    alert('Fehler: ' + (result.error || 'KI konnte Bild nicht lesen.'));
                }
            } catch (err) {
                alert('Netzwerkfehler: ' + err.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
                input.value = '';
            }
        }

        function checkAndPromptDepartment() {
            const today = new Date().toISOString().split('T')[0];
            const userId = (window.AUTH && AUTH.user && AUTH.user.email) ? AUTH.user.email : (localStorage.getItem('kp_guest_mode') === 'true' ? 'guest' : 'unknown');
            
            const savedDate = localStorage.getItem(`kp_dept_date_${userId}`);
            const savedDept = localStorage.getItem(`kp_dept_${userId}`);
            
            if (savedDate === today && savedDept) {
                document.body.classList.add(`dept-${savedDept}`);
                localStorage.setItem('kinopolis_selected_dept', savedDept);
                return;
            }
            
            // If we are in "unknown" state (not logged in and not guest), don't prompt yet
            if (userId === 'unknown' && (!window.AUTH || !AUTH.token)) return;
            
            // Prompt after splash screen
            setTimeout(() => {
                const modal = document.getElementById('dept-modal');
                if (modal) {
                    modal.classList.add('active');
                    setTimeout(() => modal.style.opacity = '1', 50);
                }
            }, 3000);
        }
    


        setTimeout(function() {
            var s = document.getElementById('splash-screen');
            if (s) {
                s.style.transition = 'opacity 0.8s ease';
                s.style.opacity = '0';
                setTimeout(function() { s.style.display = 'none'; }, 800);
                console.log('SPLASH: Early failsafe triggered');
            }
        }, 4000);
    


        // --- ERROR TRACKING ---
        window.onerror = function(msg, url, line, col, error) {
            if (typeof msg === 'string' && (msg.includes('isUrlTracking') || msg.includes('getSettingsInfo') || msg.includes('safari-extension') || msg.includes('chrome-extension') || msg.includes('Push service'))) return false;
            
            console.error('GLOBAL ERROR:', msg, 'at', line, ':', col);
            const errStr = `Fehler: ${msg} (Zeile ${line}:${col})`;
            if (typeof showToast === 'function') {
                showToast(errStr, true);
            } else {
                alert(errStr);
            }
            const statusText = document.getElementById('current-time-display');
            if (statusText && statusText.innerText === 'Verbinde...') {
                statusText.innerText = 'Fehler beim Start';
                statusText.style.color = '#ff4d4d';
            }
        };

        window.addEventListener('unhandledrejection', function(event) {
            const msg = event.reason ? (event.reason.message || event.reason) : 'Unbekannter Promise-Fehler';
            if (typeof msg === 'string' && (
                msg.includes('isUrlTracking') || 
                msg.includes('getSettingsInfo') || 
                msg.includes('safari-extension') || 
                msg.includes('chrome-extension') || 
                msg.includes('evaluating') || 
                msg.includes('content script') || 
                msg.includes('Push service') ||
                msg.includes('ServiceWorker') ||
                msg.includes('service worker') ||
                msg.includes('Unexpected keyword')
            )) {
                console.warn('Suppressed unhandled rejection:', msg);
                return;
            }
            
            console.error('Unhandled rejection:', event.reason);
            const errStr = `Promise-Fehler: ${msg}`;
            if (typeof showToast === 'function') {
                showToast(errStr, true);
            } else {
                alert(errStr);
            }
        });

        // --- GLOBAL FETCH INTERCEPTOR FOR NATIVE IOS (CAPACITOR) ---
        const APP_BACKEND_URL = (window.location && window.location.hostname && !window.location.hostname.includes('localhost')) 
            ? window.location.origin 
            : 'https://kinopolis.artjombecker.com'; 
        
        const originalFetch = window.fetch;
        window.fetch = async function() {
            let args = Array.prototype.slice.call(arguments);
            const isNative = window.Capacitor && window.Capacitor.isNativePlatform();
            
            // If running as native app and fetching a relative /api/ path, prepend the backend URL
            if (isNative && typeof args[0] === 'string' && args[0].startsWith('/api/')) {
                args[0] = APP_BACKEND_URL + args[0];
            }

            return originalFetch.apply(this, args);
        };

        // --- GLOBALS & STATE ---
        const API_URL = '/api/sessions';
        const LOCATIONS_URL = '/api/locations';
        const VAPID_PUBLIC_KEY = 'BCP-JGZbVBjKY1_blxAHw6bC5Ddf0nLAyPSp8q39kV7utFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8';
        const SYSTEM_VERSION = "V3.1.5-STABLE";

        let lastData = null;
        let lastTomData = null;
        let lastUpdateTime = null;
        let currentCity = localStorage.getItem('current_city') || 'kp';
        let displayDate = new Date();
        
        // Helper to parse JSON safely from localStorage
        const safeParse = (key, fallback) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : fallback;
            } catch (e) {
                console.warn(`SafeParse failed for ${key}:`, e);
                return fallback;
            }
        };

        let completedAuslaesse = new Set(safeParse('completed_auslaesse', []));
        let completedPosters = new Set(safeParse('completed_posters', []));
        let completedCleaning = new Set(safeParse('completed_cleaning', []));
        // Maps task_id → { author, completed_at } for real-time "who did it" display
        let completedMeta = new Map();
        let scannedPlanData = safeParse('scanned_plan_data', []);
        let shiftStartTime = localStorage.getItem('shift_start_time') ? new Date(localStorage.getItem('shift_start_time')) : null;


        const CLEANING_TASKS = {
            1: ["Böden saugen oder feucht wischen", "Sanitärbereiche kontrollieren und nacharbeiten", "Abfallbehälter leeren"],
            2: ["Glas- und glatte Oberflächen reinigen", "Team- und Nebenflächen ordentlich halten", "Hygieneartikel nachfüllen"],
            3: ["Arbeitsflächen abwischen und desinfizieren", "Gemeinschaftsbereiche lüften und ordnen", "Ecken und Fugen kurz nachgehen"],
            4: ["Lager- und Technikflächen aufräumen", "Infomaterial und Auslagen ordnen", "Eingangsbereich kurz prüfen"],
            5: ["Service- und Kassenflächen reinigen", "Geräteoberflächen säubern", "Außenanlagen bei Bedarf nachgehen"],
            6: ["Intensivbereiche laut Plan bearbeiten", "Material und Verbrauch kontrollieren", "Übergabe an nächste Schicht vorbereiten"],
            0: ["Wochenabschluss: Hauptflächen gründlich reinigen", "Lager und Nebenräume sortieren", "Besonderheiten für die neue Woche notieren"]
        };


        // --- GLOBAL TOAST ---
        function showToast(msg, isError = false) {
            const t = document.getElementById('global-toast');
            if(!t) return;
            document.getElementById('toast-msg').innerText = msg;
            document.getElementById('toast-icon').innerText = isError ? '❌' : '✅';
            
            const iconBg = isError ? 'rgba(231, 76, 60, 0.2)' : 'rgba(229, 9, 20, 0.2)';
            document.getElementById('toast-icon').style.background = iconBg;
            
            t.classList.add('show');
            setTimeout(() => { t.classList.remove('show'); }, 3500);

            if (isError) {
                showOliToast(msg, 'error');
            }
        }
        window.showToast = showToast;

        function showOliToast(msg, type = 'greeting') {
            const t = document.getElementById('oli-toast');
            if (!t) return;
            
            document.getElementById('oli-toast-msg').innerText = msg;
            const img = document.getElementById('oli-toast-img');
            const vid = document.getElementById('oli-toast-vid');
            
            img.style.display = 'none';
            vid.style.display = 'none';

            if (type === 'greeting') {
                vid.src = '/assets/Oli/Oli_1.mp4';
                vid.style.display = 'block';
                vid.play();
            } else if (type === 'goodbye') {
                vid.src = '/assets/Oli/Oli_5.mp4';
                vid.style.display = 'block';
                vid.play();
            } else if (type === 'error') {
                img.src = 'https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg';
                img.style.display = 'block';
            } else if (type === 'success') {
                vid.src = '/assets/Oli/Oli_Success.mp4';
                vid.style.display = 'block';
                vid.play();
            } else {
                img.src = 'https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg';
                img.style.display = 'block';
            }

            t.classList.add('show');
            setTimeout(() => { t.classList.remove('show'); }, 5000); // 5 seconds for Oli to stay
        }
        window.showOliToast = showOliToast;
        // --- HAPTIC FEEDBACK ---
        function triggerHaptic(type = 'light') {
            if (!window.navigator || !window.navigator.vibrate) return;
            try {
                if (type === 'light') navigator.vibrate(10);
                else if (type === 'medium') navigator.vibrate(30);
                else if (type === 'success') navigator.vibrate([15, 30, 15]);
                else if (type === 'error') navigator.vibrate([50, 80, 50]);
                else if (type === 'heavy') navigator.vibrate(60);
            } catch (e) {}
        }

        // --- IMMEDIATE UI INITIALIZATION ---
        function startClock() {
            try {
                const clockEl = document.getElementById('current-time-display');
                if (!clockEl) return;
                
                const update = () => {
                    try {
                        const now = new Date();
                        clockEl.innerText = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Uhr';
                        
                        if (lastUpdateTime) {
                            const diffSec = Math.floor((now - lastUpdateTime) / 1000);
                            const updateEl = document.getElementById('last-update-display');
                            if (updateEl) updateEl.innerText = `Vor ${diffSec}s aktualisiert`;
                        }
                        
                        if (window.updateCountdowns) updateCountdowns();
                    } catch (e) { console.error('Clock update error:', e); }
                };
                
                update();
                setInterval(update, 1000);
            } catch (e) { console.error('startClock failed:', e); }
        }
        
        // Start clock ASAP
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', startClock);
        } else {
            startClock();
        }

        function formatMinutes(min) {
            const h = Math.floor(min / 60);
            const m = min % 60;
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        }

        function parseDateSafe(dateStr) {
            if (!dateStr) return null;
            let cleanStr = String(dateStr).replace(' ', 'T');
            if (/^\d+$/.test(cleanStr)) {
                let timestamp = parseInt(cleanStr);
                if (timestamp < 50000000000) {
                    timestamp *= 1000;
                }
                return new Date(timestamp);
            }
            const d = new Date(cleanStr);
            return isNaN(d.getTime()) ? null : d;
        }

        function formatDateTimeSafe(dateStr) {
            const d = parseDateSafe(dateStr);
            if (!d || d.getTime() <= 0) return 'Gerade eben';
            return d.toLocaleString('de-DE');
        }

        function formatDateOnlySafe(dateStr) {
            const d = parseDateSafe(dateStr);
            if (!d || d.getTime() <= 0) return 'K.A.';
            return d.toLocaleDateString('de-DE');
        }

        function formatTime(isoStr) {
            const date = parseDateSafe(isoStr);
            return date ? date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
        }

        async function runSafe(fn, errorMsg, timeoutMs = 8000) {
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error(`Timeout: ${errorMsg}`)), timeoutMs)
            );
            try { 
                return await Promise.race([fn(), timeoutPromise]); 
            } 
            catch (e) { 
                console.error(errorMsg, e);
                return null;
            }
        }



        const KP_DEFAULT_CONTACTS = [
            { category: 'bl', role_name: 'Hausleitung (BL)', phone_number: '+49 6151 87059288' },
            { category: 'tl', role_name: 'Schichtleitung (TL)', phone_number: '+49 6151 87059212' },
            { category: 'tl', role_name: 'TL Büro', phone_number: '+49 6151 87059214' },
            { category: 'einlass', role_name: 'Einlass', phone_number: '+49 6151 87059233' },
            { category: 'theke', role_name: 'Kasse / Theke', phone_number: '+49 6151 87059203' }
        ];

        const CAT_NAMES = {
            'bl': 'Hausleitung (BL)',
            'tl': 'Schichtleitung (TL)',
            'einlass': 'Einlass',
            'theke': 'Kasse / Concession',
            'sicherheit': 'Sicherheit',
            'popcornkueche': 'Popcornküche',
            'putzfirma': 'Putzfirma',
            'technik': 'Technik'
        };

        const CAT_ICONS = {
            'bl': { icon: '👔', bg: 'bg-red' },
            'tl': { icon: '🎧', bg: 'bg-gold' },
            'einlass': { icon: '🎟️', bg: 'bg-blue' },
            'theke': { icon: '🍿', bg: 'bg-purple' },
            'sicherheit': { icon: '🛡️', bg: 'bg-red' },
            'popcornkueche': { icon: '🔥', bg: 'bg-gold' },
            'putzfirma': { icon: '🧹', bg: 'bg-green' },
            'technik': { icon: '⚙️', bg: 'bg-blue' }
        };

        // --- GAMIFICATION ENGINE ---
        let totalXP = parseInt(localStorage.getItem('user_total_xp') || '0');
        if (window.AUTH && AUTH.user && typeof AUTH.user.xp === 'number') {
            totalXP = AUTH.user.xp;
        }

        async function awardXP(amount, reason) {
            totalXP += amount;
            localStorage.setItem('user_total_xp', totalXP);
            updateXPUI();
            if (reason) showToast(`⭐ +${amount} XP: ${reason}`);
            triggerHaptic('success');
            
            // Sync with backend database
            if (window.AUTH && AUTH.token) {
                try {
                    const res = await fetch('/api/auth/add-xp', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${AUTH.token}`
                        },
                        body: JSON.stringify({ amount, reason: reason || 'Aktion' })
                    });
                    if (res.ok) {
                        const data = await res.json();
                        if (data.success) {
                            totalXP = data.xp;
                            AUTH.user.xp = data.xp;
                            localStorage.setItem('kp_user', JSON.stringify(AUTH.user));
                            updateXPUI();
                        }
                    }
                } catch (e) {
                    console.error("Failed to sync XP with DB:", e);
                }
            }
        }

        function updateXPUI() {
            const xpDisplay = document.getElementById('xp-display');
            const xpBar = document.getElementById('xp-bar');
            const levelLabel = document.getElementById('level-name-label');
            const usernameLabel = document.getElementById('settings-username-label');
            const roleLabel = document.getElementById('settings-role-label');
            
            const loggedInDiv = document.getElementById('settings-profile-logged-in');
            const guestDiv = document.getElementById('settings-profile-guest');

            if (window.AUTH && AUTH.user) {
                if (loggedInDiv) loggedInDiv.style.display = 'block';
                if (guestDiv) guestDiv.style.display = 'none';
                
                const deptSelect = document.getElementById('settings-dept-select');
                if (deptSelect) {
                    deptSelect.value = localStorage.getItem('kinopolis_selected_dept') || 'alles';
                }
            } else {
                if (loggedInDiv) loggedInDiv.style.display = 'none';
                if (guestDiv) guestDiv.style.display = 'block';
            }

            if (xpDisplay) xpDisplay.innerText = `${totalXP} XP`;
            
            const level = Math.floor(totalXP / 150) + 1;
            const xpInLevel = totalXP % 150;
            const progressPct = (xpInLevel / 150) * 100;
            
            if (xpBar) xpBar.style.width = `${progressPct}%`;
            
            const levels = ['Anfänger', 'Fortgeschrittener', 'Profi', 'Experte', 'Legende', 'Kino-Gott'];
            const levelName = levels[Math.min(level - 1, levels.length - 1)];
            
            if (levelLabel) levelLabel.innerText = levelName;

            if (window.AUTH && AUTH.user) {
                if (usernameLabel) usernameLabel.innerText = AUTH.user.name || `${AUTH.user.first_name} ${AUTH.user.last_name}`;
                if (roleLabel) {
                    const roleNames = {
                        'admin': 'Betriebsleitung (Admin)',
                        'BL': 'Betriebsleitung (BL)',
                        'TL': 'Teamleitung (TL)',
                        'user': 'Kino-Team'
                    };
                    roleLabel.innerText = roleNames[AUTH.user.role] || AUTH.user.role || 'Mitarbeiter';
                }
            }
        }

        let leaderboardLoaded = false;
        async function toggleLeaderboard() {
            const content = document.getElementById('leaderboard-content');
            const arrow = document.getElementById('leaderboard-arrow');
            if (!content || !arrow) return;
            
            if (content.style.display === 'none') {
                content.style.display = 'block';
                arrow.innerText = '▲ Verbergen';
                await loadLeaderboard();
            } else {
                content.style.display = 'none';
                arrow.innerText = '▼ Zeigen';
            }
        }

        async function loadLeaderboard() {
            const tbody = document.getElementById('leaderboard-table-body');
            if (!tbody) return;
            try {
                const res = await fetch(`/api/auth/leaderboard?location=${currentCity}`);
                if (!res.ok) throw new Error();
                const data = await res.json();
                
                if (data.leaderboard && data.leaderboard.length > 0) {
                    tbody.innerHTML = data.leaderboard.map((user, idx) => {
                        let rankSymbol = idx === 0 ? '🥇' : (idx === 1 ? '🥈' : (idx === 2 ? '🥉' : `#${idx + 1}`));
                        let rowStyle = '';
                        if (window.AUTH && AUTH.user && AUTH.user.email) {
                            const userFullName = `${user.first_name} ${user.last_name}`;
                            if (AUTH.user.name === userFullName) {
                                rowStyle = 'background: rgba(0, 120, 255, 0.15); font-weight: bold; border-radius: 6px;';
                            }
                        }
                        return `
                            <tr style="${rowStyle}">
                                <td style="padding: 0.6rem 0.25rem; font-weight: 800;">${rankSymbol}</td>
                                <td style="padding: 0.6rem 0.25rem;">${user.first_name} ${user.last_name.charAt(0)}. <span style="font-size: 0.75rem; opacity: 0.6;">(${user.role})</span></td>
                                <td style="padding: 0.6rem 0.25rem; text-align: right; color: #e50914; font-weight: bold;">${user.xp || 0} XP</td>
                            </tr>
                        `;
                    }).join('');
                    leaderboardLoaded = true;
                } else {
                    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 1rem; color: var(--text-muted);">Keine Einträge gefunden.</td></tr>';
                }
            } catch (e) {
                console.error("Failed to load leaderboard:", e);
                tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 1rem; color: #ff4d4d;">Fehler beim Laden.</td></tr>';
            }
        }
        
        window.setSettingsPage = function(pageId, btn) {
            console.log("setSettingsPage called with:", pageId);
            // Hide all pages
            document.querySelectorAll('.settings-content .settings-page').forEach(p => {
                p.classList.remove('active');
            });
            // Show selected page
            const selectedPage = document.getElementById(`settings-page-${pageId}`);
            if (selectedPage) {
                selectedPage.classList.add('active');
            }
            // Update navigation button active class
            document.querySelectorAll('.settings-nav-btn').forEach(b => {
                b.classList.remove('active');
            });
            if (btn) {
                btn.classList.add('active');
            } else {
                const activeNavBtn = document.querySelector(`.settings-nav-btn[onclick*="'${pageId}'"]`);
                if (activeNavBtn) activeNavBtn.classList.add('active');
            }
            
            // Auto-load leaderboard if the tab is opened
            if (pageId === 'leaderboard') {
                loadLeaderboard();
            }

            // Scroll settings content into view on mobile
            if (window.innerWidth <= 768) {
                const contentEl = document.querySelector('.settings-content');
                if (contentEl) {
                    contentEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        };

        const ACCENT_THEMES = {
            'red': { color: '#ff3b30', rgb: '255, 59, 48' },
            'gold': { color: '#ffcc00', rgb: '255, 204, 0' },
            'cyan': { color: '#00f2fe', rgb: '0, 242, 254' },
            'green': { color: '#00ff66', rgb: '0, 255, 102' },
            'purple': { color: '#a855f7', rgb: '168, 85, 247' },
            'orange': { color: '#ff9500', rgb: '255, 149, 0' }
        };

        window.setAccentTheme = function(themeId) {
            const theme = ACCENT_THEMES[themeId] || ACCENT_THEMES['red'];
            document.documentElement.style.setProperty('--primary-red', theme.color);
            document.documentElement.style.setProperty('--primary-red-rgb', theme.rgb);
            localStorage.setItem('kp_accent_theme', themeId);

            // Update dots styles
            document.querySelectorAll('.theme-dot').forEach(dot => {
                dot.style.transform = 'none';
                dot.style.borderColor = 'rgba(255,255,255,0.1)';
                dot.style.boxShadow = 'none';
            });
            const activeDot = document.getElementById(`theme-dot-${themeId}`);
            if (activeDot) {
                activeDot.style.transform = 'scale(1.18)';
                activeDot.style.borderColor = '#fff';
                activeDot.style.boxShadow = `0 0 15px rgba(${theme.rgb}, 0.7)`;
            }

            const sosBtn = document.getElementById('help-floating-btn');
            if (sosBtn) {
                sosBtn.style.boxShadow = `0 8px 25px rgba(${theme.rgb}, 0.4)`;
            }
        };

        // Load stored theme on startup
        (function() {
            const savedTheme = localStorage.getItem('kp_accent_theme') || 'red';
            setTimeout(() => {
                if (window.setAccentTheme) window.setAccentTheme(savedTheme);
            }, 50);
        })();


        // Initial UI Update
        document.addEventListener('DOMContentLoaded', updateXPUI);

        // --- PULL TO REFRESH ---
        let touchStart = 0;
        let pullThresh = 150;
        
        document.addEventListener('touchstart', e => {
            if (window.scrollY === 0) touchStart = e.touches[0].pageY;
        }, { passive: true });
        
        document.addEventListener('touchmove', e => {
            const touch = e.touches[0].pageY;
            const diff = touch - touchStart;
            if (window.scrollY === 0 && diff > 0) {
                const indicator = document.getElementById('pull-refresh-indicator');
                if (indicator) {
                    indicator.style.display = 'flex';
                    const easedDiff = Math.pow(diff / pullThresh, 0.5) * pullThresh;
                    indicator.style.height = `${Math.min(easedDiff, pullThresh)}px`;
                    indicator.style.opacity = Math.min(diff / (pullThresh * 0.7), 1);
                    
                    const icon = indicator.querySelector('.refresh-icon');
                    if (icon) icon.style.transform = `rotate(${diff * 2}deg)`;
                    
                    if (Math.abs(diff - pullThresh) < 5) triggerHaptic('medium');
                }
            }
        }, { passive: true });
        
        document.addEventListener('touchend', e => {
            const touch = e.changedTouches[0].pageY;
            const diff = touch - touchStart;
            if (window.scrollY === 0 && diff >= pullThresh) {
                triggerHaptic('success');
                fetchSessions();
                showToast('🔄 Aktualisiere Daten...');
            }
            const indicator = document.getElementById('pull-refresh-indicator');
            if (indicator) {
                indicator.style.height = '0px';
                indicator.style.opacity = '0';
                setTimeout(() => indicator.style.display = 'none', 300);
            }
        }, { passive: true });
        
        // --- HORIZONTAL SWIPE GESTURES FOR TABS ---
        let swipeStartX = 0;
        let swipeStartY = 0;
        const TABS = ['live', 'funk', 'scanner', 'action', 'mehr'];
        
        document.addEventListener('touchstart', e => {
            swipeStartX = e.touches[0].clientX;
            swipeStartY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener('touchend', e => {
            const swipeEndX = e.changedTouches[0].clientX;
            const swipeEndY = e.changedTouches[0].clientY;
            const diffX = swipeStartX - swipeEndX;
            const diffY = swipeStartY - swipeEndY;
            
            // Trigger if horizontal swipe > 80px and mostly horizontal
            if (Math.abs(diffX) > 80 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
                const activeBtn = document.querySelector('.tab-btn.active');
                if (!activeBtn) return;
                const currentTab = activeBtn.getAttribute('data-tab');
                let currentIndex = TABS.indexOf(currentTab);
                
                if (diffX > 0 && currentIndex < TABS.length - 1) {
                    // Swipe Left -> Next Tab
                    const nextTab = TABS[currentIndex + 1];
                    const nextBtn = document.querySelector(`.tab-btn[data-tab="${nextTab}"]`);
                    if (window.switchTab && nextBtn) window.switchTab(nextTab, nextBtn);
                } else if (diffX < 0 && currentIndex > 0) {
                    // Swipe Right -> Prev Tab
                    const prevTab = TABS[currentIndex - 1];
                    const prevBtn = document.querySelector(`.tab-btn[data-tab="${prevTab}"]`);
                    if (window.switchTab && prevBtn) window.switchTab(prevTab, prevBtn);
                }
            }
        }, { passive: true });

        // --- RESET LOGIC ---
        function checkAndResetDailyTasks() {
            const today = new Date().toISOString().split('T')[0];
            const lastResetDate = localStorage.getItem('kinopolis_last_reset_date');
            
            if (lastResetDate !== today) {
                // Keys to reset
                const keysToClear = [
                    'completed_auslaesse',
                    'completed_posters',
                    'completed_cleaning',
                    'kinopolis_shift_checklist',
                    'scanned_plan_data',
                    'staff_notes',
                    'kinopolis_shift_name'
                ];
                
                keysToClear.forEach(key => localStorage.removeItem(key));
                localStorage.setItem('kinopolis_last_reset_date', today);
                console.log('✅ Täglicher Aufgaben-Reset durchgeführt:', today);
            }
        }

        checkAndResetDailyTasks();





        function switchTab(view, btn) {
            try {
                switchTabInner(view, btn);
            } catch (err) {
                console.error('switchTab:', err);
            }
        }
        window.switchTab = switchTab;

        function switchTabInner(view, btn) {
            let activeBtn = btn && btn.classList ? btn : null;
            if (!activeBtn && view) {
                activeBtn = document.querySelector(`.nav-tabs .tab-btn[data-tab="${view}"]`)
                    || document.querySelector(`#mobile-tab-bar .mobile-nav-item[data-tab="${view}"]`);
            }
            if (!view && activeBtn) {
                view = activeBtn.getAttribute('data-tab');
            }
            
            // Update UI State for both Desktop and Mobile
            document.querySelectorAll('.tab-btn, .mobile-nav-item').forEach(b => b.classList.remove('active'));
            if (view) {
                document.querySelectorAll(`.tab-btn[data-tab="${view}"], .mobile-nav-item[data-tab="${view}"]`).forEach(b => b.classList.add('active'));
            } else if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Clean view classes
            document.body.classList.remove(
                'tools-active', 'info-active', 'stats-active', 
                'kontakte-active', 'intern-active', 'einstellungen-active', 
                'funk-active', 'mehr-active', 'action-active', 'live-active', 'scanner-active'
            );
            
            // Apply new view state
            const titleEl = document.getElementById('main-title');
            const suffix = '';
            
            if (view === 'live') {
                document.body.classList.add('live-active');
                if (titleEl) titleEl.innerText = 'Live Overview' + suffix;
            } else if (view === 'funk') {
                document.body.classList.add('funk-active');
                if (titleEl) titleEl.innerText = 'Funk-Ruf (Digital)' + suffix;
            } else if (view === 'scanner') {
                document.body.classList.add('scanner-active');
                if (titleEl) titleEl.innerText = 'Ticket Scanner' + suffix;
            } else if (view === 'action') {
                document.body.classList.add('action-active', 'intern-active', 'tools-active');
                if (titleEl) titleEl.innerText = 'Team-Aktionen' + suffix;
                fetchInventory();
                loadMHDItems();
                loadMHDHistory();
            } else if (view === 'mehr') {
                document.body.classList.add('mehr-active', 'stats-active', 'kontakte-active', 'info-active', 'einstellungen-active');
                if (titleEl) titleEl.innerText = 'Mehr Infos' + suffix;
                loadUpcomingMovies();
                if (window.setSettingsPage) {
                    const activeSubBtn = document.querySelector('.settings-nav-btn.active');
                    if (!activeSubBtn) {
                        window.setSettingsPage('profile');
                    }
                }
            } else if (view === 'stats') {
                document.body.classList.add('stats-active');
                if (titleEl) titleEl.innerText = 'Statistik & Auswertung' + suffix;
            } else if (view === 'kontakte') {
                document.body.classList.add('kontakte-active');
                if (titleEl) titleEl.innerText = 'Telefonliste' + suffix;
            } else if (view === 'intern' || view === 'tools') {
                document.body.classList.add('intern-active', 'tools-active');
                if (titleEl) titleEl.innerText = 'Interne Tools' + suffix;
                const transferEl = document.getElementById('transfer-items');
                if (transferEl && transferEl.children.length === 0) initTransferList();
            } else if (view === 'info') {
                document.body.classList.add('info-active');
                if (titleEl) titleEl.innerText = 'Film-Informationen' + suffix;
                loadUpcomingMovies();
            } else if (view === 'einstellungen') {
                document.body.classList.add('einstellungen-active');
                if (titleEl) titleEl.innerText = 'Einstellungen' + suffix;
                if (window.setSettingsPage) {
                    const activeSubBtn = document.querySelector('.settings-nav-btn.active');
                    if (!activeSubBtn) {
                        window.setSettingsPage('profile');
                    }
                }
            } else {
                document.body.classList.add(view + '-active');
                if (titleEl) titleEl.innerText = view.charAt(0).toUpperCase() + view.slice(1) + suffix;
            }

            // Scroll to top on mobile for better UX
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Re-init reveals for new content
            if (typeof initReveals === 'function') initReveals();
        }

        // Tab-Wechsel: onclick auf den Buttons (zuverlässig); switchTab fängt Fehler per try/catch ab.

        function triggerPopcornAnimation() {
            let container = document.getElementById('popcorn-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'popcorn-container';
                container.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    pointer-events: none;
                    z-index: 999999;
                    overflow: hidden;
                `;
                document.body.appendChild(container);
            }
            
            const particleCount = 60 + Math.floor(Math.random() * 20);
            const particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.innerText = '🍿';
                particle.style.cssText = `
                    position: absolute;
                    user-select: none;
                    pointer-events: none;
                    font-size: ${24 + Math.random() * 20}px;
                    will-change: transform, opacity;
                    transform-origin: center;
                    transform: translate3d(${window.innerWidth / 2}px, ${window.innerHeight + 50}px, 0);
                    opacity: 1;
                `;
                container.appendChild(particle);
                
                // physics variables
                const angle = (Math.random() * 60 + 60) * Math.PI / 180; // 60 to 120 deg
                const speed = 14 + Math.random() * 16;
                const vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
                const vy = -Math.sin(angle) * speed;
                
                particles.push({
                    el: particle,
                    x: window.innerWidth / 2 + (Math.random() - 0.5) * 60,
                    y: window.innerHeight + 50,
                    vx: vx,
                    vy: vy,
                    rot: Math.random() * 360,
                    rotSpeed: (Math.random() - 0.5) * 15,
                    opacity: 1,
                    scale: 0.8 + Math.random() * 0.4,
                    decay: 0.005 + Math.random() * 0.005
                });
            }
            
            const gravity = 0.45;
            let lastTime = performance.now();
            
            function update(time) {
                const delta = Math.min((time - lastTime) / 16.666, 3);
                lastTime = time;
                
                let activeCount = 0;
                
                for (let i = 0; i < particles.length; i++) {
                    const p = particles[i];
                    if (p.opacity <= 0 || p.y > window.innerHeight + 100) {
                        if (p.el.parentNode) {
                            p.el.parentNode.removeChild(p.el);
                        }
                        continue;
                    }
                    
                    activeCount++;
                    
                    p.x += p.vx * delta;
                    p.vy += gravity * delta;
                    p.y += p.vy * delta;
                    p.rot += p.rotSpeed * delta;
                    p.opacity -= p.decay * delta;
                    
                    p.el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) rotate(${p.rot}deg) scale(${p.scale})`;
                    p.el.style.opacity = p.opacity;
                }
                
                if (activeCount > 0) {
                    requestAnimationFrame(update);
                } else {
                    container.remove();
                }
            }
            
            requestAnimationFrame(update);
        }

        // --- APP START ---
        // 1. IMMEDIATE SPLASH SCREEN FAILSAFE
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash && splash.style.display !== 'none') {
                splash.style.transition = 'opacity 1s ease';
                splash.style.opacity = '0';
                splash.style.pointerEvents = 'none';
                setTimeout(() => splash.style.display = 'none', 1000);
                console.warn('SPLASH: Forcefully removed after 5s timeout');
            }
        }, 5000);

        // 2. IMMEDIATE INITIALIZATION (Don't wait for all images/assets)
        async function init() {
            console.log('APP: Starting initialization...');
            
            // Emergency Init Timeout: If still connecting after 15s, show reset hint
            const initTimeout = setTimeout(() => {
                const statusText = document.getElementById('current-time-display');
                if (statusText && statusText.innerText === 'Verbinde...') {
                    statusText.innerHTML = 'Hängt? <span onclick="location.reload(true)" style="text-decoration:underline; cursor:pointer; color:var(--primary-blue);">Neu laden</span>';
                }
            }, 15000);

            try {
                // Theme Init
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                    document.body.classList.add('light-mode');
                    const icon = document.getElementById('theme-icon');
                    const sIcon = document.getElementById('settings-theme-icon');
                    if (icon) icon.innerText = '☀️';
                    if (sIcon) sIcon.innerText = '☀️';
                }

                // Check App Disclaimer Banner State
                if (typeof checkAppBannerState === 'function') checkAppBannerState();



                // Auth Init
                if (window.AUTH) {
                    await AUTH.init().catch(e => console.error("Auth init failed:", e));
                    if (AUTH.user) {
                        // Apply Role class for RBAC
                        document.body.classList.add(`role-${AUTH.user.role.toLowerCase()}`);

                        const nameInputs = document.querySelectorAll('input[placeholder="Name eingeben..."]');
                        nameInputs.forEach(input => {
                            input.value = AUTH.user.name || (AUTH.user.first_name + ' ' + (AUTH.user.last_name || ''));
                            const parent = input.closest('.mb-4') || input.parentElement;
                            if (parent && parent.innerText.includes('Dein Name')) parent.style.display = 'none';
                        });
                    }
                }

                // Startup sound disabled
                if (typeof checkAndPromptDepartment === 'function') checkAndPromptDepartment();

                // Setup Mobile Nav Scroll Effect
                let lastScrollTop = 0;
                window.addEventListener('scroll', () => {
                    if (window.innerWidth <= 768) {
                        const st = window.pageYOffset || document.documentElement.scrollTop;
                        const header = document.querySelector('.dashboard-header');
                        if (header) {
                            if (st > lastScrollTop && st > 50) {
                                header.classList.add('header-hidden');
                            } else {
                                header.classList.remove('header-hidden');
                            }
                        }
                        lastScrollTop = st <= 0 ? 0 : st;
                    }
                }, { passive: true });

                updateStatus('Lade Standorte...');
                await runSafe(fetchLocations, 'Locations');
                
                updateStatus('Lade Programm...');
                await runSafe(fetchSessions, 'Sessions');
                
                updateStatus('Lade News...');
                await Promise.all([
                    runSafe(fetchWeather, 'Weather'),
                    runSafe(fetchNews, 'News'),
                    runSafe(loadLfItems, 'LostFound'),
                    runSafe(initTransferList, 'TransferList'),
                    runSafe(applyModuleVisibility, 'Visibility'),
                    runSafe(loadContacts, 'Contacts')
                ]);

                // Default Tab based on department filter
                const savedDept = localStorage.getItem('kinopolis_selected_dept') || '';
                let defaultTab = 'live';
                if (savedDept === 'popcorn' || savedDept === 'becher') {
                    defaultTab = 'action';
                }
                const defaultBtn = document.querySelector(`.mobile-nav-item[data-tab="${defaultTab}"]`) || document.querySelector(`.tab-btn[data-tab="${defaultTab}"]`);
                if (defaultBtn) switchTab(defaultTab, defaultBtn);

                // Setup toggle for Auslässe
                const auslaesseBtn = document.getElementById('auslaesse-toggle-btn');
                if (auslaesseBtn) {
                    auslaesseBtn.addEventListener('click', () => {
                        const content = document.getElementById('auslaesse-list');
                        if (content) {
                            content.classList.toggle('collapsed');
                            auslaesseBtn.classList.toggle('collapsed');
                        }
                    });
                }

                // Periodic Refresh + Countdown Tick
                setInterval(() => {
                    runSafe(fetchSessions, 'Sessions-Refresh');
                    runSafe(fetchWeather, 'Weather-Refresh');
                    runSafe(fetchNews, 'News-Refresh');
                    tickAllCountdowns();
                    updateLiveAlertBanner();
                }, 60000);

                // Restore check-in state on load
                if (window.updateShiftCheckinUI) updateShiftCheckinUI();

                // Cloud Sync Refresh (Checklist / L&F)
                setInterval(() => {
                    const selector = document.getElementById('workstation-selector');
                    if (selector) {
                        if (selector.value === 'lostfound') {
                            runSafe(loadLfItems, 'LF-Sync');
                        } else {
                            runSafe(() => fetchChecklistState().then(renderWorkstation), 'Checklist-Sync');
                        }
                    }
                }, 15000);

                // Welcome Modal Logic
                if (localStorage.getItem('welcome_seen_beta') !== 'true' && document.getElementById('welcome-modal')) {
                    document.getElementById('welcome-modal').classList.add('active');
                }
                
                if (window.updateGamification) updateGamification();
                if (window.tickAllCountdowns) tickAllCountdowns();
                if (window.updateLiveAlertBanner) updateLiveAlertBanner(); if (window.updateShiftTimer) { updateShiftTimer(); setInterval(updateShiftTimer, 60000); }
                if (window.loadTaskState) {
                    loadTaskState();
                    startTaskPolling(); // Polling every 15s mit Smart-Re-Render
                }
                if (window.checkPersonalNeed) {
                    checkPersonalNeed();
                    setInterval(checkPersonalNeed, 10000); // Sync help status every 10s
                }
                
                // Initialize default tab based on stored department or active button
                const activeBtn = document.querySelector('.mobile-nav-item.active') || document.querySelector('.tab-btn.active');
                if (activeBtn) {
                    const activeTab = activeBtn.getAttribute('data-tab') || 'live';
                    switchTab(activeTab, activeBtn);
                } else {
                    const savedDept = localStorage.getItem('kinopolis_selected_dept') || '';
                    let defaultTab = 'live';
                    if (savedDept === 'popcorn' || savedDept === 'becher') {
                        defaultTab = 'action';
                    }
                    const defaultBtn = document.querySelector(`.mobile-nav-item[data-tab="${defaultTab}"]`) || document.querySelector(`.tab-btn[data-tab="${defaultTab}"]`) || document.getElementById('tab-live');
                    if (defaultBtn) switchTab(defaultTab, defaultBtn);
                }
                
                clearTimeout(initTimeout);
            } catch (error) {
                console.error('APP: Fatal Init Error:', error);
            } finally {
                // ABSOLUTE GUARANTEE: Hide splash screen
                const splashEl = document.getElementById('splash-screen');
                if (splashEl) {
                    splashEl.classList.add('fade-out');
                    setTimeout(() => splashEl.style.display = 'none', 1000);
                }



                // Popcorn-Animation auslösen, falls ein erfolgreicher Login stattgefunden hat
                if (sessionStorage.getItem('trigger_login_popcorn') === 'true') {
                    sessionStorage.removeItem('trigger_login_popcorn');
                    setTimeout(() => {
                        if (typeof triggerPopcornAnimation === 'function') {
                            triggerPopcornAnimation();
                        }
                    }, 500);
                }
            }
        }

        // ============================================================
        // FEATURE: COUNTDOWN TIMERS
        // ============================================================
        function tickAllCountdowns() {
            const now = new Date();
            const currentMin = now.getHours() * 60 + now.getMinutes();
            document.querySelectorAll('.countdown-timer[data-end]').forEach(el => {
                const endMin = parseInt(el.dataset.end);
                if (isNaN(endMin) || endMin <= 0) { el.textContent = ''; return; }
                const minutesLeft = endMin - currentMin;
                if (minutesLeft < 0) {
                    el.textContent = 'Auslass fällig';
                    el.style.color = '#e74c3c';
                    el.style.fontWeight = '800';
                } else if (minutesLeft <= 5) {
                    el.textContent = `🔴 Auslass in ${minutesLeft} Min`;
                    el.style.color = '#e74c3c';
                    el.style.fontWeight = '800';
                } else if (minutesLeft <= 20) {
                    el.textContent = `🟡 Auslass in ${minutesLeft} Min`;
                    el.style.color = '#f1c40f';
                    el.style.fontWeight = '700';
                } else {
                    el.textContent = `⏱ Auslass in ${minutesLeft} Min`;
                    el.style.color = 'var(--text-muted)';
                    el.style.fontWeight = 'normal';
                }
            });
        }


        // --- SHIFT TIMER ---
        function updateShiftTimer() {
            let startStr = localStorage.getItem('shift_start_time');
            const now = new Date();
            
            if (!startStr) {
                localStorage.setItem('shift_start_time', now.toISOString());
                startStr = now.toISOString();
            } else {
                const lastStart = new Date(startStr);
                if (now - lastStart > 12 * 60 * 60 * 1000) {
                    localStorage.setItem('shift_start_time', now.toISOString());
                    startStr = now.toISOString();
                }
            }
            
            const startTime = new Date(startStr);
            const shiftLength = 8.5 * 60 * 60 * 1000;
            const endTime = new Date(startTime.getTime() + shiftLength);
            
            const total = endTime - startTime;
            const elapsed = now - startTime;
            const percent = Math.min(Math.max((elapsed / total) * 100, 0), 100);
            
            const bar = document.getElementById('shift-progress-bar');
            const leftText = document.getElementById('shift-time-left');
            const container = document.getElementById('shift-timer-container');
            
            if (!bar || !leftText || !container) return;
            
            if (elapsed > shiftLength) {
                container.style.display = 'none';
                return;
            }
            
            container.style.display = 'block';
            bar.style.width = percent + '%';
            
            const remaining = endTime - now;
            const hours = Math.floor(remaining / (1000 * 60 * 60));
            const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            leftText.textContent = `${hours}h ${mins}m verbleibend`;
        }

        // ============================================================
        // FEATURE: LIVE ALERT BANNER
        // ============================================================
        function updateLiveAlertBanner() {
            if (!lastData) return;
            const banner = document.getElementById('live-alert-banner');
            if (!banner) return;

            const now = new Date();
            const currentMin = now.getHours() * 60 + now.getMinutes();
            const ALERT_WINDOW = 15; // minutes before end

            const urgentAlerts = [];
            lastData.forEach(hall => {
                (hall.sessions || []).forEach(s => {
                    if (!s.time || !s.time.includes(':') || !s.duration) return;
                    const [h, m] = s.time.split(':').map(Number);
                    const endMin = h * 60 + m + s.duration;
                    const minutesLeft = endMin - currentMin;
                    const taskId = `auslass-${hall.name}-${s.title}-${s.time}`;
                    if (minutesLeft >= 0 && minutesLeft <= ALERT_WINDOW && !completedAuslaesse.has(taskId)) {
                        urgentAlerts.push({ hall: hall.name, title: s.title, minutesLeft });
                    }
                });
            });

            if (urgentAlerts.length === 0) {
                banner.style.display = 'none';
                return;
            }

            banner.style.display = 'flex';
            banner.innerHTML = urgentAlerts.map(a =>
                `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 1rem;background:rgba(231,76,60,0.15);border-radius:8px;">
                    <span style="font-size:1.3rem;">🔴</span>
                    <div>
                        <strong>Kino ${a.hall}</strong> – ${a.title}
                        <div style="font-size:0.8rem;color:#ff8a80;">Auslass in ${a.minutesLeft} Minute${a.minutesLeft !== 1 ? 'n' : ''}!</div>
                    </div>
                </div>`
            ).join('');
            
            // Trigger Push Notification if permitted
            if ('Notification' in window && Notification.permission === 'granted' && urgentAlerts.length > 0) {
                const firstAlert = urgentAlerts[0];
                const notifKey = `notif_${firstAlert.hall}_${firstAlert.title}`;
                if (!sessionStorage.getItem(notifKey)) {
                    new Notification(`Kino ${firstAlert.hall}: ${firstAlert.title}`, {
                        body: `Auslass in ${firstAlert.minutesLeft} Minute${firstAlert.minutesLeft !== 1 ? 'n' : ''}!`,
                        icon: '/assets/Oli_Alarm.png'
                    });
                    sessionStorage.setItem(notifKey, 'true');
                }
            }
        }

        // --- PERSONAL NEED (Help Button) ---
        let isHelpActive = false;
        let activeHelpData = null;

        async function checkPersonalNeed() {
            try {
                const res = await fetch(`/api/personal-need?location=${currentCity}`);
                const data = await res.json();
                isHelpActive = !!data.active;
                activeHelpData = data;
                updateHelpButtonUI();
            } catch (e) {}
        }

        function openHelpModal() {
            if (isHelpActive) {
                // If active, just toggle off (cancel)
                toggleHelpOff();
                return;
            }
            triggerHaptic('medium');
            document.getElementById('help-modal').classList.add('active');
            document.getElementById('help-reason').focus();
        }

        function closeHelpModal() {
            document.getElementById('help-modal').classList.remove('active');
        }

        async function submitHelpRequest() {
            const reason = document.getElementById('help-reason').value.trim();
            const recipient = document.getElementById('help-recipient').value;
            
            if (!reason) {
                alert('Bitte gib einen Grund an.');
                return;
            }

            triggerHaptic('heavy');
            closeHelpModal();
            isHelpActive = true;
            updateHelpButtonUI();

            try {
                await fetch('/api/personal-need', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        location: currentCity, 
                        active: true, 
                        message: reason,
                        recipient: recipient
                    })
                });
                showToast(`🆘 Hilfe-Ruf an ${recipient} gesendet!`);
            } catch (e) { showToast('Fehler beim Senden', true); }
        }

        async function toggleHelpOff() {
            if (!confirm('Hilfe-Ruf wirklich aufheben?')) return;
            
            triggerHaptic('medium');
            isHelpActive = false;
            updateHelpButtonUI();
            try {
                await fetch('/api/personal-need', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location: currentCity, active: false })
                });
                showToast('✅ Hilfe-Ruf aufgehoben');
            } catch (e) { showToast('Fehler beim Senden', true); }
        }

        function updateHelpButtonUI() {
            const btn = document.getElementById('help-button');
            if (!btn) return;
            if (isHelpActive) {
                btn.classList.add('active');
                btn.innerHTML = '<span>🆘</span> HILFE RUF AKTIV';
                btn.style.background = 'var(--primary-red)';
                btn.style.animation = 'pulse-red 1.5s infinite';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<span>🙋‍♂️</span> Hilfe benötigt?';
                btn.style.background = 'rgba(255,255,255,0.05)';
                btn.style.animation = 'none';
            }
        }

        // ============================================================
        // FEATURE: SCHICHT CHECK-IN / CHECK-OUT
        // ============================================================
        function shiftCheckin() {
            shiftStartTime = new Date();
            localStorage.setItem('shift_start_time', shiftStartTime.toISOString());
            updateShiftCheckinUI();
            
            const name = (window.AUTH && window.AUTH.user) ? window.AUTH.user.first_name : 'Mitarbeiter';
            showOliToast(`Bärenstarker Start, ${name}! Deine Schicht beginnt jetzt.`, 'greeting');
        }

        async function shiftCheckout(silent = false) {
            if (!shiftStartTime) return;
            const now = new Date();
            const durationMs = now - shiftStartTime;
            const durationMin = Math.round(durationMs / 60000);
            const hours = Math.floor(durationMin / 60);
            const mins = durationMin % 60;
            const durationStr = `${hours}h ${mins}m`;

            const auslaesseCount = completedAuslaesse.size;
            const cleaningCount = completedCleaning.size;
            const postersCount = completedPosters.size;
            const xpTotal = (auslaesseCount * 50) + (cleaningCount * 30) + (postersCount * 20);

            // Send Report to API
            if (window.AUTH && AUTH.token) {
                try {
                    const res = await fetch('/api/auth/shift-report', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${AUTH.token}`
                        },
                        body: JSON.stringify({
                            duration: durationStr,
                            auslaesse: auslaesseCount,
                            cleaning: cleaningCount,
                            posters: postersCount,
                            xp: xpTotal,
                            theme: localStorage.getItem('theme') || 'dark'
                        })
                    });
                    const data = await res.json();
                    if (data.success) {
                        showToast('📧 Schicht-Report wurde gesendet!');
                        showOliToast(`Gute Arbeit heute! Du hast ${xpTotal} XP gesammelt. Bis zum nächsten Mal!`, 'goodbye');
                    } else {
                        console.error("Report API error:", data.error);
                        showToast('⚠️ E-Mail Fehler: ' + (data.error || 'Unbekannt'), true);
                    }
                } catch (e) { 
                    console.error("Report network error", e); 
                    showToast('📡 Netzwerk-Fehler beim Report', true);
                }
            }

            // Cache last shift summary for PDF download
            window.lastShiftSummary = {
                duration: durationStr,
                auslaesse: auslaesseCount,
                cleaning: cleaningCount,
                posters: postersCount,
                xp: xpTotal,
                date: new Date().toLocaleDateString('de-DE'),
                time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
                username: window.AUTH && AUTH.user ? (AUTH.user.name || `${AUTH.user.first_name} ${AUTH.user.last_name}`) : (localStorage.getItem('kinopolis_shift_name') || 'Mitarbeiter'),
                role: window.AUTH && AUTH.user ? (AUTH.user.role || 'user') : 'user',
                location: currentCity.toUpperCase()
            };

            if (!silent) {
                const modal = document.getElementById('shift-summary-modal');
                if (modal) {
                    document.getElementById('shift-summary-duration').textContent = durationStr;
                    document.getElementById('shift-summary-auslaesse').textContent = auslaesseCount;
                    document.getElementById('shift-summary-cleaning').textContent = cleaningCount;
                    document.getElementById('shift-summary-xp').textContent = xpTotal;
                    modal.classList.add('active');
                }

                // Trigger feedback every 5th checkout
                let checkoutCount = parseInt(localStorage.getItem('checkout_count') || '0', 10);
                checkoutCount++;
                localStorage.setItem('checkout_count', checkoutCount.toString());
                
                if (checkoutCount % 5 === 0) {
                    setTimeout(() => {
                        openFeedback('artjom');
                    }, 2000); // 2 seconds after the summary modal
                }
            }

            shiftStartTime = null;
            localStorage.removeItem('shift_start_time');
            updateShiftCheckinUI();
        }
        window.shiftCheckin = shiftCheckin;
        window.shiftCheckout = shiftCheckout;

        function updateShiftCheckinUI() {
            const buttons = document.querySelectorAll('.shift-btn');
            const statusEl = document.getElementById('shift-status-text');
            const statusElAlt = document.getElementById('shift-status-text-alt');
            if (buttons.length === 0) return;

            if (shiftStartTime) {
                const now = new Date();
                const mins = Math.round((now - shiftStartTime) / 60000);
                const h = Math.floor(mins / 60);
                const m = mins % 60;
                const statusStr = `Schicht läuft seit ${h > 0 ? h + 'h ' : ''}${m}m`;
                
                buttons.forEach(btn => {
                    btn.textContent = '🔴 Schicht beenden';
                    btn.style.background = 'rgba(231,76,60,0.25)';
                    btn.style.borderColor = '#e74c3c';
                    btn.onclick = shiftCheckout;
                });
                
                if (statusEl) statusEl.textContent = statusStr;
                if (statusElAlt) statusElAlt.textContent = statusStr;
            } else {
                buttons.forEach(btn => {
                    btn.textContent = '🟢 Schicht starten';
                    btn.style.background = 'rgba(229, 9, 20,0.15)';
                    btn.style.borderColor = '#e50914';
                    btn.onclick = shiftCheckin;
                });
                if (statusEl) statusEl.textContent = '';
                if (statusElAlt) statusElAlt.textContent = '';
            }
        }

        function normalizeMovieKey(title) {
            if (!title || typeof title !== 'string') return '';
            return title
                .toLowerCase()
                .normalize('NFKD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[''\x60´]/g, '')
                .replace(/[^a-z0-9äöüß]+/g, ' ')
                .trim();
        }

        async function loadUpcomingMovies() {
            const grid = document.getElementById('upcoming-grid');
            const loader = document.getElementById('upcoming-loading');
            
            if (!grid) return;
            grid.innerHTML = '';
            if (loader) loader.style.display = 'flex';
            grid.style.display = 'none';
            
            try {
                // 1. Current Movies (from lastData which is array of halls)
                let currentMovies = [];
                const seenKeys = new Set();

                if (lastData && Array.isArray(lastData)) {
                    // Flatten halls into sessions
                    const allCurrentSessions = lastData.flatMap(h => h.sessions || []);
                    
                    allCurrentSessions.forEach(s => {
                        const k = normalizeMovieKey(s.title);
                        if (s.title && k && !seenKeys.has(k)) {
                            seenKeys.add(k);
                            currentMovies.push({
                                title: s.title,
                                poster: s.poster,
                                movieLink: s.movieLink,
                                current: true
                            });
                        }
                    });
                }

                // 2. Upcoming Movies (nur Slider „Demnächst“ auf der Kinoseite; gleicher Titel wie „Jetzt“ wird ausgeblendet)
                const res = await fetch(`/api/upcoming?location=${encodeURIComponent(currentCity || 'kp')}`);
                let upcoming = [];
                if (res.ok) {
                    const data = await res.json();
                    upcoming = Array.isArray(data) ? data : [];
                }
                
                const upcomingFiltered = upcoming.filter(m => {
                    if (!m || !m.title) return false;
                    const k = normalizeMovieKey(m.title);
                    if (!k || seenKeys.has(k)) return false;
                    if (m.poster) {
                        const p = String(m.poster).toLowerCase();
                        if (p.includes('red-seats') || p.includes('platzhalter') || p.includes('placeholder')) return false;
                    }
                    seenKeys.add(k);
                    return true;
                }).map(m => ({ ...m, current: false }));
                const allMovies = [...currentMovies, ...upcomingFiltered];

                if (allMovies.length === 0) {
                   if (loader) loader.innerHTML = '<div style="color: var(--text-muted); padding: 2rem;">Keine Filme gefunden.</div>';
                   return;
                }

                grid.innerHTML = allMovies.map(m => {
                    const badge = m.current ? 
                        `<span class="badge" style="position: absolute; top: 8px; left: 8px; background: var(--primary-red); font-size: 0.65rem;">JETZT</span>` :
                        `<span class="badge" style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.65); font-size: 0.65rem;">DEMNÄCHST</span>`;
                    
                    const onClick = m.movieLink ? `onclick="window.open('${m.movieLink}', '_blank')"` : `onclick="window.open('https://www.kinopolis.de/${currentCity}', '_blank')"`;

                    return `
                    <div class="hall-card glass movie-item-card" ${onClick} style="cursor: pointer; padding: 0; overflow: hidden; border-radius: 12px;">
                        <div style="position: relative;">
                            <img src="${m.poster}" alt="Poster" style="width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block;" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80'">
                            ${badge}
                        </div>
                        <div style="padding: 0.75rem; text-align: center;">
                            <h3 style="font-family: 'Outfit'; font-size: 0.85rem; margin: 0; color: #fff; line-height: 1.2; height: 2.1rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${m.title}</h3>
                        </div>
                    </div>`;
                }).join('');
                
                if (loader) loader.style.display = 'none';
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(140px, 1fr))';
                
            } catch (e) {
                console.error('Error loading movie list:', e);
                if (loader) loader.innerHTML = '<div style="color: #ff4d4d;">Fehler beim Laden.</div>';
            }
        }

        async function openMovieDetail(url) {
            if (!url) return;
            window.open(url, '_blank');
        }

        function closeMovieDetail() {
            document.getElementById('movie-detail-modal').classList.remove('active');
        }



        async function checkNotificationPermission() {
            const dot = document.getElementById('push-status-dot');
            const subLabel = document.getElementById('push-sub-label');
            const card = document.getElementById('push-main-card');
            if (Notification.permission === 'denied') {
                dot.style.background = '#e74c3c';
                dot.classList.remove('active');
                subLabel.innerText = '❌ Blockiert! Bitte in Browser-Einstellungen erlauben.';
                subLabel.style.color = '#e74c3c';
                card.style.borderColor = 'rgba(231, 76, 60, 0.3)';
            }
        }

        // Register Service Worker
        if ('serviceWorker' in navigator) {
            let refreshing = false;
            navigator.serviceWorker.addEventListener('controllerchange', function() {
                if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                }
            });
        }

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            window.addEventListener('load', function() {
                const swType = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) ? 'module' : 'classic';
                navigator.serviceWorker.register('/sw.js', { type: swType }).then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    
                    // Force update check on load
                    try { registration.update(); } catch (e) {}

                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
                        if (!installingWorker) return;
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    console.log('New content is available; please refresh.');
                                }
                            }
                        };
                    };

                    checkPushSubscription();
                    checkNotificationPermission();
                }).catch(function(err) {
                    console.warn('ServiceWorker registration failed: ', err);
                });
            });
        } else {
            const unsupportedEl = document.getElementById('push-unsupported');
            if (unsupportedEl) unsupportedEl.style.display = 'block';
            
            const btnEl = document.getElementById('push-subscribe-btn');
            if (btnEl) btnEl.disabled = true;
        }

        async function checkPushSubscription() {
            try {
                if (!('serviceWorker' in navigator)) return;
                const registration = await navigator.serviceWorker.ready;
                if (!registration || !registration.pushManager) return;
                const subscription = await registration.pushManager.getSubscription();
                updatePushUI(!!subscription);
            } catch (e) {
                console.warn('Check push subscription notice:', e);
            }
        }

        function updatePushUI(subscribed) {
            const card = document.getElementById('push-main-card');
            const label = document.getElementById('push-main-label');
            const subLabel = document.getElementById('push-sub-label');
            const dot = document.getElementById('push-status-dot');
            const badge = document.getElementById('push-status-badge');

            if (subscribed) {
                card.classList.add('active');
                label.innerText = 'Benachrichtigungen sind AKTIV';
                subLabel.innerText = 'Du erhältst jetzt wichtige Updates';
                dot.classList.add('active');
                badge.innerText = 'Aktiviert';
                badge.style.background = '#e50914';
            } else {
                card.classList.remove('active');
                label.innerText = 'Benachrichtigungen deaktiviert';
                subLabel.innerText = 'Tippen, um wichtige Infos zu erhalten';
                dot.classList.remove('active');
                badge.innerText = 'Deaktiviert';
                badge.style.background = 'var(--text-muted)';
            }
        }

        async function togglePushSubscription() {
            const card = document.getElementById('push-main-card');
            const spinner = document.getElementById('push-spinner');
            const chevron = document.getElementById('push-chevron');
            
            spinner.style.display = 'block';
            chevron.style.display = 'none';
            card.style.pointerEvents = 'none';

            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();

            if (subscription) {
                try {
                    await subscription.unsubscribe();
                    updatePushUI(false);
                } catch (e) {
                    alert('Fehler beim Deaktivieren: ' + e.message);
                }
            } else {
                try {
                    const status = await Notification.requestPermission();
                    if (status !== 'granted') {
                        alert('Berechtigung verweigert. Bitte aktiviere Benachrichtigungen in deinen Browser-Einstellungen.');
                        return;
                    }

                    const newSub = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
                    });

                    const res = await fetch('/api/push/subscribe', {
                        method: 'POST',
                        body: JSON.stringify({ 
                            sub: newSub, 
                            location: currentCity
                        }),
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (!res.ok) {
                        const data = await res.json();
                        if (data.error && data.error.includes('no such table')) {
                            const cmd = 'npx wrangler d1 execute kinopolis-db --remote --file=schema.sql';
                            alert('⚠️ Datenbank-Setup fehlt!\n\nFühre diesen Befehl aus:\n' + cmd);
                            return;
                        }
                        throw new Error(data.error || 'Server Fehler');
                    }

                    alert('✅ Aktiviert! Du erhältst jetzt Benachrichtigungen.');
                    updatePushUI(true);
                } catch (err) {
                    console.error('Subscription error:', err);
                    alert('Fehler: ' + err.message);
                }
            }
            
            spinner.style.display = 'none';
            chevron.style.display = 'block';
            card.style.pointerEvents = 'all';
            checkNotificationPermission();
        }


        function urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            const outputArray = new Uint8Array(rawData.length);
            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        }

        var TRANSFER_ITEMS = [
            { name: "🍿 Popcorn Süß", target: 40 },
            { name: "🧂 Popcorn Salz", target: 20 },
            { name: "🧀 Nachos", target: 50 },
            { name: "🥤 Becher 1.0L", target: 100 },
            { name: "🥤 Becher 0.5L", target: 100 },
            { name: "🥤 Becher Deckel", target: 150 },
            { name: "🥤 Strohhalme", target: 200 }
        ];

        var EIS_TRANSFER_ITEMS = [
            { name: "🍦 Magnum Classic", target: 20 },
            { name: "🍦 Magnum Mandel", target: 20 },
            { name: "🍦 Magnum White", target: 20 },
            { name: "🍦 Eiskonfekt", target: 15 }
        ];

        // --- SAAL STATUS (Real-time Sync) ---
        let HALL_STATUS = {
            1: 'running', 2: 'running', 3: 'running', 4: 'running',
            5: 'running', 6: 'running', 7: 'running', 8: 'running'
        };

        async function loadHallStatus() {
            try {
                const res = await fetch(`/api/hall-status?location=${currentCity}`);
                const data = await res.json();
                Object.assign(HALL_STATUS, data);
                renderHallStatus();
            } catch (e) { console.error("Error loading hall status", e); }
        }

        async function updateHallStatus(hall, status) {
            HALL_STATUS[hall] = status;
            renderHallStatus();
            try {
                await fetch('/api/hall-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ hall_id: hall.toString(), location: currentCity, status })
                });
            } catch (e) { console.error("Sync error", e); }
        }

        function initHallStatus() {
            loadHallStatus();
            setInterval(loadHallStatus, 15000); // Sync every 15s
        }

        function renderHallStatus() {
            const container = document.getElementById('hall-status-grid');
            if (!container) return;
            
            // Neues iOS Grid Layout erzwingen
            container.style.display = 'grid';
            container.style.gridTemplateColumns = 'repeat(2, 1fr)';
            container.style.gap = '12px';
            container.style.padding = '5px';
            
            container.innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map(h => {
                const status = HALL_STATUS[h] || 'running';
                let label = 'Läuft';
                let color = '#ff3b30'; // iOS Red
                let bg = 'rgba(255, 59, 48, 0.15)';
                let icon = '🔴';
                
                if (status === 'cleaning') { 
                    label = 'Reinigung'; 
                    color = '#ffcc00'; // iOS Yellow
                    bg = 'rgba(255, 204, 0, 0.15)';
                    icon = '🟡';
                }
                if (status === 'ready') { 
                    label = 'Bereit'; 
                    color = '#34c759'; // iOS Green
                    bg = 'rgba(52, 199, 89, 0.15)';
                    icon = '🟢';
                }
                
                return `
                    <div class="hall-status-card" onclick="cycleHallStatus(${h})" 
                         style="background: rgba(20, 20, 25, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 18px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; height: 90px; cursor: pointer; transition: all 0.2s cubic-bezier(0.25, 0.1, 0.25, 1); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                        
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <div style="font-weight: 700; font-size: 1.05rem; color: #fff; letter-spacing: -0.3px;">Saal ${h}</div>
                            <div style="background: ${bg}; padding: 4px 6px; border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                                <span style="font-size: 0.6rem; filter: drop-shadow(0 2px 4px ${color});">${icon}</span>
                            </div>
                        </div>
                        
                        <div style="font-size: 0.8rem; color: ${color}; font-weight: 600; letter-spacing: -0.2px;">${label}</div>
                    </div>
                `;
            }).join('');
            if (window.updateCountdowns) updateCountdowns();
        }

        function cycleHallStatus(hall) {
            triggerHaptic('medium');
            const current = HALL_STATUS[hall] || 'running';
            let next = 'running';
            if (current === 'running') next = 'cleaning';
            else if (current === 'cleaning') next = 'ready';
            else if (current === 'ready') next = 'running';
            updateHallStatus(hall, next);
        }

        async function fetchInventory() {
            try {
                const res = await fetch('/api/inventory');
                const data = await res.json();
                
                // Combine Waren and Getränke for the transfer list as requested
                let combinedWaren = [];
                if (data.waren) combinedWaren = [...data.waren];
                if (data.getraenke) combinedWaren = [...combinedWaren, ...data.getraenke];
                
                if (combinedWaren.length > 0) TRANSFER_ITEMS = combinedWaren;
                if (data.eis && data.eis.length > 0) EIS_TRANSFER_ITEMS = data.eis;
                initTransferList();
            } catch (e) {
                console.error("Failed to fetch inventory", e);
                initTransferList();
            }
        }

        function initTransferList() {
            const container = document.getElementById('transfer-items');
            if (!container) return;
            container.innerHTML = TRANSFER_ITEMS.map((item, index) => `
                <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                            <span style="font-size: 0.95rem; color: #fff; font-weight: 600;">${item.name}</span>
                            <span style="font-size: 0.7rem; color: var(--text-muted);">Soll: ${item.target} Stück</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <button class="btn-secondary" onclick="updateTransferCount(${index}, -1)" style="width: 44px; height: 44px; padding: 0; border-radius: 12px; font-weight: bold; background: rgba(229, 9, 20, 0.15); border-color: rgba(229, 9, 20, 0.3); color: #ff4d4d; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">-</button>
                            <input type="number" id="transfer-count-${index}" min="0" value="0" inputmode="numeric" style="width: 50px; height: 44px; text-align: center; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: var(--primary-blue); font-weight: 800; font-size: 1.1rem; padding: 0; appearance: textfield;" />
                            <button class="btn-secondary" onclick="updateTransferCount(${index}, 1)" style="width: 44px; height: 44px; padding: 0; border-radius: 12px; font-weight: bold; background: rgba(229, 9, 20, 0.15); border-color: rgba(229, 9, 20, 0.3); color: #e50914; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">+</button>
                        </div>
                    </div>
                </div>
            `).join('');

            // Also init Eis
            const eisContainer = document.getElementById('eis-transfer-items');
            if (eisContainer) {
                eisContainer.innerHTML = EIS_TRANSFER_ITEMS.map((item, index) => `
                    <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(52, 152, 219, 0.05); padding: 1rem; border-radius: 12px; border: 1px solid rgba(52, 152, 219, 0.15);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div style="display: flex; flex-direction: column; gap: 0.1rem;">
                                <span style="font-size: 0.95rem; color: #fff; font-weight: 600;">${item.name}</span>
                                <span style="font-size: 0.7rem; color: var(--text-muted);">Soll: ${item.target} Stück</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <button class="btn-secondary" onclick="updateEisTransferCount(${index}, -1)" style="width: 44px; height: 44px; padding: 0; border-radius: 12px; font-weight: bold; background: rgba(229, 9, 20, 0.15); border-color: rgba(229, 9, 20, 0.3); color: #ff4d4d; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">-</button>
                                <input type="number" id="eis-transfer-count-${index}" min="0" value="0" inputmode="numeric" style="width: 50px; height: 44px; text-align: center; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: #3498db; font-weight: 800; font-size: 1.1rem; padding: 0; appearance: textfield;" />
                                <button class="btn-secondary" onclick="updateEisTransferCount(${index}, 1)" style="width: 44px; height: 44px; padding: 0; border-radius: 12px; font-weight: bold; background: rgba(229, 9, 20, 0.15); border-color: rgba(229, 9, 20, 0.3); color: #e50914; display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">+</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            // Also init MHD
            initMhdList();
        }

        async function loadMHDItems() {
            const select = document.getElementById('mhd-item-select');
            if (!select) return;
            try {
                const res = await fetch('/api/inventory');
                const data = await res.json();
                
                let html = '<option value="">-- Artikel wählen --</option>';
                
                const typeMap = {
                    'getraenke': '🥤 Getränke',
                    'waren': '🍿 Waren',
                    'eis': '🍦 Eis',
                    'slushy': '🍧 Slushy'
                };

                for (const [typeKey, typeLabel] of Object.entries(typeMap)) {
                    const items = data[typeKey] || [];
                    if (items.length === 0) continue;

                    // Group items of this type by location
                    const byLocation = {};
                    items.forEach(i => {
                        const loc = i.location || 'Allgemein';
                        if (!byLocation[loc]) byLocation[loc] = [];
                        byLocation[loc].push(i);
                    });

                    for (const [loc, locItems] of Object.entries(byLocation)) {
                        html += `<optgroup label="${typeLabel} - 📍 ${loc}">`;
                        locItems.forEach(i => {
                            html += `<option value="${i.id}" data-name="${i.name}" data-type="${typeKey}" data-location="${loc}">${i.name}</option>`;
                        });
                        html += `</optgroup>`;
                    }
                }
                select.innerHTML = html;
            } catch (e) {
                console.error("MHD load error", e);
            }
        }

        async function submitInventoryCount(type) {
            const author = window.AUTH && AUTH.user ? `${AUTH.user.first_name} ${AUTH.user.last_name}` : 'System';
            let data = {};
            
            if (type === 'popcorn') {
                data = {
                    saecke: document.getElementById('pop-saecke').value || 0,
                    salz: document.getElementById('pop-salz').value || 0,
                    suess: document.getElementById('pop-suess').value || 0
                };
            } else if (type === 'becher') {
                data = {
                    becher05rot: document.getElementById('becher-05-rot').value || 0,
                    becher05gruen: document.getElementById('becher-05-gruen').value || 0,
                    becher10rot: document.getElementById('becher-10-rot').value || 0,
                    becher10gruen: document.getElementById('becher-10-gruen').value || 0
                };
            }

            try {
                const res = await fetch('/api/inventory/counts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: currentCity,
                        date: new Date().toISOString().split('T')[0],
                        type: type,
                        data: data,
                        author: author
                    })
                });

                if (res.ok) {
                    showToast(`✅ ${type.toUpperCase()}-Bestand erfolgreich gespeichert!`);
                    awardXP(50, `${type.toUpperCase()} Bestand erfasst`);
                    // Clear inputs
                    if (type === 'popcorn') {
                        document.getElementById('pop-saecke').value = '';
                        document.getElementById('pop-salz').value = '';
                        document.getElementById('pop-suess').value = '';
                    } else {
                        document.getElementById('becher-05-rot').value = '';
                        document.getElementById('becher-05-gruen').value = '';
                        document.getElementById('becher-10-rot').value = '';
                        document.getElementById('becher-10-gruen').value = '';
                    }
                } else {
                    throw new Error('Save failed');
                }
            } catch (e) {
                console.error("Inventory save error", e);
                showToast("Fehler beim Speichern der Bestände.", true);
            }
        }

        async function submitMHD() {
            const select = document.getElementById('mhd-item-select');
            const dateInput = document.getElementById('mhd-date-input');
            const status = document.getElementById('mhd-status');
            
            const opt = select.options[select.selectedIndex];
            if (!opt || !opt.value || !dateInput.value) {
                alert('Bitte Artikel und Datum wählen!');
                return;
            }
            
            const author = localStorage.getItem('kinopolis_shift_name') || 'System';
            
            try {
                const res = await fetch('/api/mhd', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        item_id: opt.value,
                        item_name: opt.getAttribute('data-name'),
                        type: opt.getAttribute('data-type'),
                        location: opt.getAttribute('data-location'),
                        mhd_date: dateInput.value,
                        author
                    })
                });
                
                if (res.ok) {
                    awardXP(25, 'MHD Datum erfasst');
                    status.innerText = '✅ MHD erfolgreich gespeichert!';
                    status.style.background = 'rgba(229, 9, 20, 0.1)';
                    status.style.color = '#e50914';
                    status.style.display = 'block';
                    dateInput.value = '';
                    loadMHDHistory(); // Refresh history
                    setTimeout(() => status.style.display = 'none', 3000);
                }
            } catch (e) {
                alert('Fehler beim Speichern.');
            }
        }

        async function loadMHDHistory() {
            const container = document.getElementById('mhd-history-list');
            if (!container) return;
            try {
                const res = await fetch('/api/mhd/latest?location=' + currentCity);
                if (!res.ok) throw new Error('Fetch failed');
                const data = await res.json();
                if (!Array.isArray(data) || data.length === 0) {
                    container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center; padding: 1rem;">Keine Einträge vorhanden</div>';
                    return;
                }
                container.innerHTML = data.map(item => {
                    const mDate = new Date(item.mhd_date);
                    const isNear = (mDate - new Date()) < (1000 * 60 * 60 * 24 * 14); // 2 weeks
                    return `
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 0.75rem; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 0.9rem;">${item.item_name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">📍 ${item.location} · Von ${item.author}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-family: monospace; font-weight: 800; color: ${isNear ? '#ff3b30' : '#f1c40f'};">${item.mhd_date}</div>
                            <div style="font-size: 0.6rem; opacity: 0.4;">${formatDateOnlySafe(item.created_at)}</div>
                        </div>
                    </div>
                `}).join('');
            } catch (e) {
                console.error("MHD history error", e);
                container.innerHTML = '<div style="color: var(--text-muted); font-size: 0.8rem; text-align: center;">Historie konnte nicht geladen werden.</div>';
            }
        }

        function initMhdList() {
            // Deprecated - replaced by loadMHDItems and submitMHD
        }

        function updateTransferCount(index, delta) {
            const el = document.getElementById('transfer-count-' + index);
            let current = parseInt(el.value) || 0;
            current += delta;
            if (current < 0) current = 0;
            el.value = current;
        }

        function updateEisTransferCount(index, delta) {
            const el = document.getElementById('eis-transfer-count-' + index);
            let current = parseInt(el.value) || 0;
            current += delta;
            if (current < 0) current = 0;
            el.value = current;
        }

        async function sendTransferList() {
            let itemsNeeded = [];
            TRANSFER_ITEMS.forEach((item, index) => {
                const count = parseInt(document.getElementById('transfer-count-' + index).value) || 0;
                if (count > 0) {
                    itemsNeeded.push(`${count}x ${item.name} (Soll: ${item.target})`);
                }
            });

            const customVal = document.getElementById('transfer-custom').value.trim();
            if (customVal) itemsNeeded.push(`Sonstiges: ${customVal}`);

            if (itemsNeeded.length === 0) {
                alert("Die Liste ist leer.");
                return;
            }

            const author = localStorage.getItem('kinopolis_shift_name') || 'Ein Mitarbeiter';
            const locationName = document.getElementById('workstation-selector') ? document.getElementById('workstation-selector').selectedOptions[0].text.split('(')[0].trim() : '';

            const bodyText = itemsNeeded.join('\n');

            try {
                const res = await fetch('/api/push/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        location: currentCity, 
                        author: author,
                        station: locationName,
                        items: bodyText 
                    })
                });
                
                if (res.ok) {
                    showToast("Transferliste erfolgreich an TL gesendet!");
                    initTransferList();
                    document.getElementById('transfer-custom').value = '';
                } else {
                    showToast("Fehler beim Senden", true);
                }
            } catch (e) {
                showToast("Netzwerkfehler.", true);
            }
        }

        async function sendEisTransferList() {
            let itemsNeeded = [];
            EIS_TRANSFER_ITEMS.forEach((item, index) => {
                const count = parseInt(document.getElementById('eis-transfer-count-' + index).value) || 0;
                if (count > 0) {
                    itemsNeeded.push(`${count}x ${item.name}`);
                }
            });

            const customVal = document.getElementById('eis-transfer-custom').value.trim();
            if (customVal) itemsNeeded.push(`Sonstiges: ${customVal}`);

            if (itemsNeeded.length === 0) {
                alert("Die Eisliste ist leer.");
                return;
            }

            const author = localStorage.getItem('kinopolis_shift_name') || 'Ein Mitarbeiter';
            const locationName = document.getElementById('workstation-selector') ? document.getElementById('workstation-selector').selectedOptions[0].text.split('(')[0].trim() : '';

            const bodyText = "[EIS-BESTELLUNG]\n" + itemsNeeded.join('\n');

            try {
                const res = await fetch('/api/push/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        location: currentCity, 
                        author: author,
                        station: locationName,
                        items: bodyText 
                    })
                });
                
                if (res.ok) {
                    showToast("Eisliste erfolgreich an Küche gesendet!");
                    initTransferList();
                    document.getElementById('eis-transfer-custom').value = '';
                } else {
                    showToast("Fehler beim Senden", true);
                }
            } catch (e) {
                showToast("Netzwerkfehler.", true);
            }
        }

        async function sendMhdList() {
            let mhdEntries = [];
            const mhdProducts = [
                "🥤 Sirup Cola", "🥤 Sirup Zero/Light", "🥤 Sirup Fanta/Sprite",
                "🍿 Popcorn Mais", "🍿 Popcorn Zucker/Fett",
                "🧀 Nacho Käsesauce", "🧀 Nacho Salsa",
                "🥛 Milcherzeugnisse", "☕ Kaffee Bohnen"
            ];
            
            mhdProducts.forEach((name, index) => {
                const date = document.getElementById('mhd-date-' + index).value;
                if (date) {
                    mhdEntries.push(`📅 ${name}: ${date}`);
                }
            });

            const customVal = document.getElementById('mhd-custom').value.trim();
            if (customVal) mhdEntries.push(`Zusätzlich: ${customVal}`);

            if (mhdEntries.length === 0) {
                alert("Bitte mindestens ein Datum eintragen.");
                return;
            }

            const author = localStorage.getItem('kinopolis_shift_name') || 'Ein Mitarbeiter';
            const locationName = document.getElementById('workstation-selector') ? document.getElementById('workstation-selector').selectedOptions[0].text.split('(')[0].trim() : '';

            const bodyText = "[MHD-MELDUNG]\n" + mhdEntries.join('\n');

            try {
                const res = await fetch('/api/push/transfer', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        location: currentCity, 
                        author: author,
                        station: locationName,
                        items: bodyText 
                    })
                });
                
                if (res.ok) {
                    showToast("MHD-Liste erfolgreich an TL gesendet!");
                    initMhdList();
                    document.getElementById('mhd-custom').value = '';
                } else {
                    showToast("Fehler beim Senden", true);
                }
            } catch (e) {
                showToast("Netzwerkfehler.", true);
            }
        }

        function resetFunkView() {
            // Hide all sub-option menus
            ['popcorn', 'nachos', 'drinks', 'becher'].forEach(c => {
                const el = document.getElementById(`funk-${c}-options`);
                if (el) el.style.display = 'none';
            });
            // Show all main category buttons
            document.querySelectorAll('.funk-main-btn').forEach(btn => {
                btn.style.display = 'flex';
            });
        }
        window.resetFunkView = resetFunkView;

        function toggleFunkGlobal(category) {
            const targetId = `funk-${category}-options`;
            const optionsEl = document.getElementById(targetId);
            if (!optionsEl) return;
            
            if (optionsEl.style.display === 'grid') {
                resetFunkView();
            } else {
                // Hide all main category buttons
                document.querySelectorAll('.funk-main-btn').forEach(btn => {
                    btn.style.display = 'none';
                });
                // Show only the target options
                optionsEl.style.display = 'grid';
            }
        }
        window.toggleFunkGlobal = toggleFunkGlobal;

        async function triggerRestock(item) {
            const cityEl = document.getElementById('cinema-selector');
            const city = (cityEl && cityEl.value) ? cityEl.value : currentCity;
            try {
                const res = await fetch('/api/push/restock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ item, location: city })
                });

                if (res.ok) {
                    showToast(`Senden erfolgreich: ${item} wird nachgefüllt!`);
                    resetFunkView();
                } else {
                    showToast('Fehler beim Senden des Signals.', true);
                }
            } catch (e) {
                showToast('Netzwerkfehler', true);
            }
        }
        window.triggerRestock = triggerRestock;

        window.sendTransferList = sendTransferList;
        window.sendEisTransferList = sendEisTransferList;
        window.sendMhdList = sendMhdList;
        window.updateTransferCount = updateTransferCount;
        window.updateEisTransferCount = updateEisTransferCount;

        // Init notes
        const notesArea = document.getElementById('staff-notes');
        if (notesArea) {
            notesArea.value = localStorage.getItem('staff_notes') || '';
            notesArea.addEventListener('input', (e) => {
                localStorage.setItem('staff_notes', e.target.value);
            });
        }



        function updateCountdowns() {
            const isToday = displayDate.toDateString() === new Date().toDateString();
            const timers = document.querySelectorAll('.countdown-timer');
            if (!isToday) {
                timers.forEach(t => t.style.display = 'none');
                return;
            }
            
            const now = new Date();
            const currentMin = now.getHours() * 60 + now.getMinutes();

            timers.forEach(timer => {
                const startMin = parseInt(timer.dataset.start);
                const endMin = parseInt(timer.dataset.end);
                const hallName = timer.dataset.hall || '';
                const hallId = parseInt(hallName.replace(/\D/g, ''));
                const isReady = hallId && HALL_STATUS[hallId] === 'ready';
                
                if (currentMin < startMin) {
                    const diff = startMin - currentMin;
                    timer.innerText = `Beginnt in ${diff} Min.`;
                    timer.className = 'countdown-timer status-upcoming' + (isReady ? ' hall-ready' : '');
                } else if (currentMin < endMin) {
                    const diff = endMin - currentMin;
                    timer.innerText = `Läuft - noch ${diff} Min.`;
                    timer.className = 'countdown-timer status-running' + (isReady ? ' hall-ready' : '');
                } else {
                    timer.innerText = `Beendet`;
                    timer.className = 'countdown-timer status-finished';
                    timer.parentElement.closest('.session-item').style.opacity = '0.4';
                }
            });
        }
        function toggleSection(contentId, btnId) {
            const content = document.getElementById(contentId);
            const btn = document.getElementById(btnId);
            if(content) content.classList.toggle('collapsed');
            if(btn) btn.classList.toggle('collapsed');
        }
        window.toggleSection = toggleSection;

        function toggleAlerts() {
            toggleSection('poster-alerts', 'alerts-toggle-btn');
        }
        window.toggleAlerts = toggleAlerts;

        function changeDate(days) {
            if (!displayDate) displayDate = new Date();
            displayDate.setDate(displayDate.getDate() + days);
            updateDateUI();
            fetchSessions();
        }
        window.changeDate = changeDate;



        function updateDateUI() {
            const today = new Date();
            const textEl = document.getElementById('display-date-text');
            const subEl = document.getElementById('display-date-sub');
            const settingsTextEl = document.querySelector('.settings-date-text');
            
            const isToday = displayDate.toDateString() === today.toDateString();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const isTomorrow = displayDate.toDateString() === tomorrow.toDateString();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const isYesterday = displayDate.toDateString() === yesterday.toDateString();

            let dayName = '';
            if (isToday) dayName = 'Heute';
            else if (isTomorrow) dayName = 'Morgen';
            else if (isYesterday) dayName = 'Gestern';
            else dayName = displayDate.toLocaleDateString('de-DE', { weekday: 'long' });

            const dateStr = displayDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
            
            if (textEl) textEl.innerText = dayName;
            if (subEl) subEl.innerText = dateStr;
            
            if (settingsTextEl) {
                settingsTextEl.innerText = `${dayName}, ${dateStr}`;
            }
        }

        // --- Workstation Checklists ---
        const shiftChecklist = {
            'einlass': [
                { id: 'e1', text: 'Einlass-Scanner Akkus voll & Funktionsprüfung' },
                { id: 'e2', text: 'FSK-Bändchen & Stempel vorbereitet' },
                { id: 'e3', text: 'Müllzangen und Besen bereitgestellt' },
                { id: 'e4', text: 'Saal Rundgang & Becherkontrolle' }
            ],
            'theke': [
                { id: 't1', text: 'Popcorn-Warmhalter auffüllen' },
                { id: 't2', text: 'Nachos-Käsespender Temperatur prüfen' },
                { id: 't3', text: 'Getränke-Sirup (Postmix) geprüft' },
                { id: 't4', text: 'Kassenbereich & Theke gewischt' }
            ],
            'counter': [
                { id: 'c1', text: 'Wechselgeld in Kassen gezählt' },
                { id: 'c2', text: 'Ticket-Drucker Papierrolle geprüft' },
                { id: 'c3', text: 'Tagesaktuelle Flyer platziert' }
            ],
            'popcornkueche': [
                { id: 'p1', text: 'Mais und Öl aufgefüllt' },
                { id: 'p2', text: 'Popcorn-Kessel gereinigt' },
                { id: 'p3', text: 'MHD-Prüfung Lager erledigt' }
            ],
            'becherspuelen': [
                { id: 'b1', text: 'Spülmaschine Temperatur & Reiniger geprüft' },
                { id: 'b2', text: 'Abgetrocknete Becher sortiert' },
                { id: 'b3', text: 'Müllbeutel gewechselt' }
            ],
            'tl': [
                { id: 'tl1', text: 'Mitarbeitergespräche geführt' },
                { id: 'tl2', text: 'Umsatzkontrolle (Stündlich)' },
                { id: 'tl3', text: 'Pauseneinhaltung geprüft' },
                { id: 'tl4', text: 'Kassenabrechnung vorbereitet' }
            ],
            'bl': [
                { id: 'bl1', text: 'Wochenplanung kontrolliert' },
                { id: 'bl2', text: 'Bestellwesen geprüft' },
                { id: 'bl3', text: 'Feedback-Auswertung abgeschlossen' }
            ]
        };

        let cloudChecklistState = {}; // Global cache for current workstation state

        async function fetchChecklistState() {
            try {
                const res = await fetch(`/api/checklist?location=${currentCity}`);
                if (res.ok) {
                    const data = await res.json();
                    const newState = {};
                    data.forEach(d => {
                        newState[d.task_id] = d.is_completed === 1;
                        newState[d.task_id + '_by'] = d.completed_by;
                    });
                    cloudChecklistState = newState;
                }
            } catch (e) { console.error('Cloud checklist sync failed', e); }
        }

        async function renderWorkstation() {
            const selector = document.getElementById('workstation-selector');
            if (!selector) return;
            const checklistContainer = document.getElementById('ws-checklist-container');
            const lfContainer = document.getElementById('ws-lostfound-container');
            const techContainer = document.getElementById('ws-tech-container');
            const fskContainer = document.getElementById('ws-fsk-container');
            const seatingContainer = document.getElementById('ws-seating-container');
            const activeItems = document.getElementById('active-checklist-items');
            const group = selector.value;
            const hideWorkstationPanels = () => {
                if (checklistContainer) checklistContainer.style.display = 'none';
                if (lfContainer) lfContainer.style.display = 'none';
                if (techContainer) techContainer.style.display = 'none';
                if (fskContainer) fskContainer.style.display = 'none';
                if (seatingContainer) seatingContainer.style.display = 'none';
            };

            if (group === 'lostfound') {
                hideWorkstationPanels();
                if (lfContainer) lfContainer.style.display = 'block';
                await loadLfItems();
            } else if (group === 'tech') {
                hideWorkstationPanels();
                if (techContainer) techContainer.style.display = 'block';
                populateTechHallSelect();
                await loadTechTickets();
            } else if (group === 'fsk') {
                hideWorkstationPanels();
                if (fskContainer) fskContainer.style.display = 'block';
                initFskValidator();
            } else if (group === 'seating') {
                hideWorkstationPanels();
                if (seatingContainer) seatingContainer.style.display = 'block';
                populateSeatingHallSelect();
                await loadSeatingData();
            } else {
                hideWorkstationPanels();
                if (lfContainer) lfContainer.style.display = 'none';
                if (checklistContainer) checklistContainer.style.display = 'block';
                
                // Fetch latest state before rendering to be sure
                await fetchChecklistState();
                
                const items = shiftChecklist[group] || [];
                if (activeItems) {
                    activeItems.innerHTML = items.map(item => {
                        const checked = cloudChecklistState[item.id] ? 'checked' : '';
                        const checkedBy = cloudChecklistState[item.id + '_by'] || '';
                        const lineThrough = cloudChecklistState[item.id] ? 'text-decoration: line-through; opacity: 0.5;' : '';
                        return `
                            <label style="display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; cursor: pointer; transition: background 0.2s;">
                                <input type="checkbox" id="${item.id}" onchange="toggleChecklistItem('${item.id}')" ${checked} style="width: 1.2rem; height: 1.2rem; accent-color: var(--primary-blue); cursor: pointer; flex-shrink: 0;">
                                <span style="flex: 1;">
                                    <span id="label-${item.id}" style="color: white; font-size: 0.95rem; display: block; transition: all 0.2s; ${lineThrough}">${item.text}</span>
                                    ${checkedBy ? `<span style="font-size: 0.75rem; color: var(--text-muted);">✓ ${checkedBy}</span>` : ''}
                                </span>
                            </label>
                        `;
                    }).join('');
                }
                // Pre-fill name from localStorage
                const nameInput = document.getElementById('ws-name-input');
                if (nameInput) nameInput.value = localStorage.getItem('kinopolis_shift_name') || '';
                
                if (window.updateGamification) updateGamification();
            }
        }

        // ===== Tech-Tickets (Ticketing light) =====
        let techTicketCache = [];
        let techFilterStatus = '';

        const TECH_CATEGORY_LABELS = {
            licht: '💡 Licht',
            ton: '🔊 Ton',
            bild: '📽️ Bild',
            sitz: '🪑 Sitz',
            sauberkeit: '🧹 Sauberkeit',
            sonstiges: '🔧 Sonstiges'
        };

        const TECH_STATUS_LABELS = {
            offen: '🔴 Offen',
            in_arbeit: '🟡 In Arbeit',
            erledigt: '🟢 Erledigt'
        };

        function canManageTechTickets() {
            const role = window.AUTH && AUTH.user ? AUTH.user.role : null;
            return role === 'admin' || role === 'vorfuehrer';
        }

        function populateTechHallSelect() {
            const sel = document.getElementById('tech-hall-select');
            if (!sel) return;
            const halls = window._lastHallsGrouped && Array.isArray(window._lastHallsGrouped)
                ? window._lastHallsGrouped.map(h => h.name).filter(Boolean)
                : [];
            // Always provide a sensible fallback set so the form is usable even before sessions load
            const fallback = ['Saal 1', 'Saal 2', 'Saal 3', 'Saal 4', 'Saal 5', 'Saal 6'];
            const list = halls.length ? halls : fallback;
            sel.innerHTML = list.map(h => `<option value="${h.replace(/"/g, '&quot;')}">${h}</option>`).join('');
        }

        function setTechFilter(btn, status) {
            techFilterStatus = status;
            document.querySelectorAll('.tech-filter-btn').forEach(b => {
                b.classList.remove('active');
                b.style.background = 'rgba(255,255,255,0.05)';
                b.style.borderColor = 'rgba(255,255,255,0.15)';
                b.style.color = 'var(--text-muted)';
            });
            btn.classList.add('active');
            btn.style.background = 'rgba(255, 107, 53, 0.25)';
            btn.style.borderColor = '#ff6b35';
            btn.style.color = '#ff6b35';
            loadTechTickets();
        }

        async function loadTechTickets() {
            const list = document.getElementById('tech-items-list');
            const badge = document.getElementById('tech-count-badge');
            if (!list) return;
            list.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">Lade Tickets…</div>';
            try {
                const qs = new URLSearchParams({ location: currentCity || 'kp' });
                if (techFilterStatus) qs.set('status', techFilterStatus);
                const res = await fetch(`/api/tech-tickets?${qs.toString()}`);
                if (!res.ok) throw new Error('API Fehler');
                const items = await res.json();
                techTicketCache = Array.isArray(items) ? items : [];
                renderTechTickets();
            } catch (e) {
                console.error('Tech-Tickets laden fehlgeschlagen', e);
                list.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">⚠️ Tickets konnten nicht geladen werden.</div>';
                if (badge) badge.textContent = '0';
            }
        }

        function renderTechTickets() {
            const list = document.getElementById('tech-items-list');
            const badge = document.getElementById('tech-count-badge');
            if (!list) return;
            const items = techTicketCache;
            const canManage = canManageTechTickets();
            const selfAuthor = window.AUTH && AUTH.user ? `${AUTH.user.first_name || ''} ${AUTH.user.last_name || ''}`.trim() : '';
            if (badge) {
                const openCount = techTicketCache.filter(t => t.status !== 'erledigt').length;
                badge.textContent = openCount;
            }
            if (!items.length) {
                list.innerHTML = '<div style="text-align: center; padding: 1rem; color: var(--text-muted); font-size: 0.85rem;">Keine Tickets' + (techFilterStatus ? ` mit Status „${TECH_STATUS_LABELS[techFilterStatus] || techFilterStatus}"` : '') + '.</div>';
                return;
            }
            list.innerHTML = items.map(t => {
                const cat = TECH_CATEGORY_LABELS[t.category] || t.category;
                const status = TECH_STATUS_LABELS[t.status] || t.status;
                const createdAt = t.created_at ? new Date(t.created_at).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
                const isOwn = selfAuthor && t.created_by === selfAuthor;
                const canDelete = isOwn || canManage;
                const borderColor = t.status === 'offen' ? 'rgba(231, 76, 60, 0.4)' : t.status === 'in_arbeit' ? 'rgba(241, 196, 15, 0.4)' : 'rgba(229, 9, 20, 0.3)';
                const bgGradient = t.status === 'offen'
                    ? 'linear-gradient(135deg, rgba(231, 76, 60, 0.08) 0%, rgba(20, 20, 25, 0.6) 100%)'
                    : t.status === 'in_arbeit'
                    ? 'linear-gradient(135deg, rgba(241, 196, 15, 0.08) 0%, rgba(20, 20, 25, 0.6) 100%)'
                    : 'linear-gradient(135deg, rgba(229, 9, 20, 0.06) 0%, rgba(20, 20, 25, 0.6) 100%)';
                const safeDesc = (t.description || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                const safeHall = (t.hall || '').replace(/</g, '&lt;');
                const safeBy = (t.created_by || '').replace(/</g, '&lt;');
                const resolvedBy = t.resolved_by ? (t.resolved_by + '').replace(/</g, '&lt;') : '';
                const resolvedAt = t.resolved_at ? new Date(t.resolved_at).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
                return `
                    <div style="background: ${bgGradient}; border: 1px solid ${borderColor}; border-radius: 12px; padding: 0.85rem 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.4rem;">
                            <div>
                                <strong style="color: white; font-size: 1rem;">${safeHall}</strong>
                                <span style="margin-left: 0.5rem; color: var(--text-muted); font-size: 0.8rem;">${cat}</span>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.4rem;">
                                <span style="font-size: 0.8rem; font-weight: 600;">${status}</span>
                                ${canDelete ? `<button onclick="deleteTechTicket(${t.id})" title="Löschen" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; font-size: 1rem; padding: 0; line-height: 1;">🗑️</button>` : ''}
                            </div>
                        </div>
                        <p style="margin: 0 0 0.5rem 0; color: white; font-size: 0.92rem; line-height: 1.4;">${safeDesc}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.4rem;">
                            <span style="font-size: 0.72rem; color: var(--text-muted);">Gemeldet von <strong>${safeBy}</strong> · ${createdAt}</span>
                            ${t.status === 'erledigt' && resolvedBy ? `<span style="font-size: 0.72rem; color: #e50914;">✓ Erledigt von <strong>${resolvedBy}</strong>${resolvedAt ? ' · ' + resolvedAt : ''}</span>` : ''}
                        </div>
                        ${canManage && t.status !== 'erledigt' ? `
                        <div style="display: flex; gap: 0.4rem; margin-top: 0.6rem;">
                            ${t.status === 'offen' ? `<button onclick="setTechTicketStatus(${t.id}, 'in_arbeit')" style="flex: 1; padding: 0.5rem; background: rgba(241, 196, 15, 0.15); border: 1px solid rgba(241, 196, 15, 0.4); color: #f1c40f; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">🔧 Übernehmen</button>` : ''}
                            <button onclick="setTechTicketStatus(${t.id}, 'erledigt')" style="flex: 1; padding: 0.5rem; background: rgba(229, 9, 20, 0.15); border: 1px solid rgba(229, 9, 20, 0.4); color: #e50914; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">✅ Erledigt</button>
                        </div>` : (!canManage && t.status !== 'erledigt' ? `<div style="margin-top: 0.5rem; font-size: 0.72rem; color: var(--text-muted); font-style: italic;">Wird vom Vorführer/Technik bearbeitet</div>` : '')}
                    </div>
                `;
            }).join('');
        }

        async function submitTechTicket() {
            const hallEl = document.getElementById('tech-hall-select');
            const catEl = document.getElementById('tech-category-select');
            const descEl = document.getElementById('tech-description-input');
            if (!hallEl || !catEl || !descEl) return;
            const hall = hallEl.value.trim();
            const category = catEl.value;
            const description = descEl.value.trim();
            if (!hall || !category || !description) {
                showToast('Bitte Saal, Kategorie und Beschreibung ausfüllen.', true);
                return;
            }
            const author = (window.AUTH && AUTH.user) ? `${AUTH.user.first_name || ''} ${AUTH.user.last_name || ''}`.trim() || 'Anonym' : 'Anonym';
            try {
                const res = await fetch('/api/tech-tickets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: currentCity || 'kp',
                        hall, category, description,
                        created_by: author
                    })
                });
                if (!res.ok) throw new Error('API Fehler');
                descEl.value = '';
                showToast('✅ Störung gemeldet');
                await loadTechTickets();
            } catch (e) {
                console.error('Tech-Ticket konnte nicht erstellt werden', e);
                showToast('Fehler beim Melden der Störung.', true);
            }
        }

        async function setTechTicketStatus(id, status) {
            const author = (window.AUTH && AUTH.user) ? `${AUTH.user.first_name || ''} ${AUTH.user.last_name || ''}`.trim() || 'Anonym' : 'Anonym';
            try {
                const res = await fetch(`/api/tech-tickets/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status, resolved_by: author })
                });
                if (!res.ok) throw new Error('API Fehler');
                await loadTechTickets();
            } catch (e) {
                console.error('Tech-Ticket Status-Update fehlgeschlagen', e);
                showToast('Status konnte nicht aktualisiert werden.', true);
            }
        }

        async function deleteTechTicket(id) {
            if (!confirm('Dieses Ticket wirklich löschen?')) return;
            try {
                const res = await fetch(`/api/tech-tickets/${id}`, { method: 'DELETE' });
                if (!res.ok) throw new Error('API Fehler');
                await loadTechTickets();
            } catch (e) {
                console.error('Tech-Ticket löschen fehlgeschlagen', e);
                showToast('Ticket konnte nicht gelöscht werden.', true);
            }
        }

        // ===== FSK & JuSchG Validator (Counter) =====
        const FSK_RESULT_PLACEHOLDER = '<div style="font-size: 1.5rem; font-weight: 900; color: var(--text-muted);">Bitte Geburtsdatum eingeben</div>';

        function escapeHtml(value) {
            return String(value || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }

        function calculateAge(birthDateISO, now = new Date()) {
            if (!birthDateISO) return null;
            const birthDate = new Date(`${birthDateISO}T00:00:00`);
            if (Number.isNaN(birthDate.getTime()) || birthDate > now) return null;
            let age = now.getFullYear() - birthDate.getFullYear();
            const monthDiff = now.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) age--;
            return age;
        }

        function endTimeTotalMin(startHHMM, durationMin) {
            if (!startHHMM || !startHHMM.includes(':')) return null;
            const [h, m] = startHHMM.split(':').map(Number);
            const duration = Number(durationMin);
            if (!Number.isFinite(h) || !Number.isFinite(m) || !Number.isFinite(duration) || duration <= 0) return null;
            return h * 60 + m + duration;
        }

        function formatTotalMin(totalMin) {
            if (!Number.isFinite(totalMin)) return '--:--';
            const normalized = ((Math.round(totalMin) % 1440) + 1440) % 1440;
            const h = Math.floor(normalized / 60);
            const m = normalized % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        }

        function requiredAgeForEndTime(endMin) {
            if (!Number.isFinite(endMin)) return 0;
            if (endMin > 24 * 60) return 18;
            if (endMin > 22 * 60) return 16;
            if (endMin > 20 * 60) return 14;
            return 0;
        }

        function validateCinemaEntry({ fsk, startTime, durationMin, birthDateISO, hasGuardian = false, now = new Date() }) {
            const fskAge = Number(fsk);
            const age = calculateAge(birthDateISO, now);
            const endMin = endTimeTotalMin(startTime, durationMin);
            const timeRequiredAge = requiredAgeForEndTime(endMin);
            if (age === null || endMin === null || !Number.isFinite(fskAge)) {
                return { allowed: null, age, endMin, endTime: formatTotalMin(endMin), reasons: ['Bitte alle Felder korrekt ausfüllen.'] };
            }

            const reasons = [];
            const fskPassed = age >= fskAge || (fskAge === 12 && age >= 6 && hasGuardian);
            if (!fskPassed) {
                if (fskAge === 12 && age >= 6) {
                    reasons.push('FSK 12 ist unter 12 Jahren nur in Begleitung der Eltern oder Erziehungsberechtigten zulässig.');
                } else {
                    reasons.push(`FSK ${fskAge}: Person ist ${age} Jahre alt und damit zu jung.`);
                }
            }

            if (timeRequiredAge && age < timeRequiredAge) {
                const boundary = timeRequiredAge === 14 ? '20:00' : timeRequiredAge === 16 ? '22:00' : '24:00';
                reasons.push(`§11 JuSchG: Vorstellung endet um ${formatTotalMin(endMin)} und damit nach ${boundary}; erforderlich ist mindestens ${timeRequiredAge} Jahre.`);
            }

            const allowed = reasons.length === 0;
            if (!reasons.length) {
                const passText = fskAge === 12 && age < 12 && hasGuardian
                    ? 'FSK 12 mit Eltern/Erziehungsberechtigten erfüllt.'
                    : `FSK ${fskAge} erfüllt.`;
                reasons.push(`${passText} JuSchG-Zeitgrenze erfüllt; Ende ${formatTotalMin(endMin)}.`);
            }

            return {
                allowed,
                age,
                fskAge,
                endMin,
                endTime: formatTotalMin(endMin),
                timeRequiredAge,
                reasons
            };
        }

        function initFskValidator() {
            const ids = ['fsk-fsk-select', 'fsk-start-input', 'fsk-duration-input', 'fsk-birth-input', 'fsk-guardian-input'];
            ids.forEach(id => {
                const el = document.getElementById(id);
                if (el && !el.dataset.fskBound) {
                    el.addEventListener('input', updateFskVerdict);
                    el.addEventListener('change', updateFskVerdict);
                    el.dataset.fskBound = 'true';
                }
            });
            if (window.populateFskSessions) populateFskSessions();
            updateFskVerdict();
        }

        function updateFskVerdict() {
            const banner = document.getElementById('fsk-result-banner');
            if (!banner) return;
            const birthDateISO = document.getElementById('fsk-birth-input')?.value || '';
            if (!birthDateISO) {
                banner.style.background = 'rgba(255,255,255,0.04)';
                banner.style.borderColor = 'rgba(255,255,255,0.1)';
                banner.innerHTML = FSK_RESULT_PLACEHOLDER;
                return;
            }

            const result = validateCinemaEntry({
                fsk: document.getElementById('fsk-fsk-select')?.value,
                startTime: document.getElementById('fsk-start-input')?.value,
                durationMin: document.getElementById('fsk-duration-input')?.value,
                birthDateISO,
                hasGuardian: !!document.getElementById('fsk-guardian-input')?.checked
            });
            const isAllowed = result.allowed === true;
            const mainColor = isAllowed ? '#2ecc71' : '#e74c3c';
            banner.style.background = isAllowed ? 'rgba(46, 204, 113, 0.14)' : 'rgba(231, 76, 60, 0.16)';
            banner.style.borderColor = isAllowed ? 'rgba(46, 204, 113, 0.55)' : 'rgba(231, 76, 60, 0.65)';
            const oliImgHtml = !isAllowed ? `<img src="/assets/Oli/Oli_Error.png" alt="Oli Error" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);">` : '';
            banner.innerHTML = `
                ${oliImgHtml}
                <div style="font-size: clamp(1.65rem, 6vw, 2.6rem); font-weight: 1000; line-height: 1; color: ${mainColor}; margin-bottom: 0.55rem;">
                    ${isAllowed ? 'ZULASSEN' : 'ZUGANG VERWEIGERT'}
                </div>
                <div style="font-size: 0.95rem; color: white; margin-bottom: 0.55rem;">
                    Alter: <strong>${result.age ?? '--'}</strong> Jahre · Ende: <strong>${result.endTime}</strong>
                </div>
                <div style="font-size: 0.88rem; color: ${isAllowed ? '#dfffea' : '#ffe0df'}; line-height: 1.45; text-align: left;">
                    ${result.reasons.map(r => `<div>• ${escapeHtml(r)}</div>`).join('')}
                </div>
            `;
        }

        function populateFskSessions() {
            const select = document.getElementById('fsk-session-select');
            if (!select) return;
            
            select.innerHTML = '<option value="">Manuelle Eingabe...</option>';
            
            if (!Array.isArray(window.lastData)) {
                window.fskSessions = [];
                return;
            }
            
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            
            const sessions = [];
            window.lastData.forEach(hall => {
                if (Array.isArray(hall.sessions)) {
                    hall.sessions.forEach(s => {
                        if (s.time && s.time.includes(':')) {
                            const [h, m] = s.time.split(':').map(Number);
                            const startMin = h * 60 + m;
                            
                            // Show sessions starting from 30 minutes ago onwards
                            if (startMin >= currentMinutes - 30) {
                                sessions.push({
                                    title: s.title,
                                    time: s.time,
                                    duration: s.duration || 120,
                                    fsk: s.fsk || 'FSK 12',
                                    hall: hall.name,
                                    startMin: startMin
                                });
                            }
                        }
                    });
                }
            });
            
            sessions.sort((a, b) => a.startMin - b.startMin);
            window.fskSessions = sessions;
            
            sessions.forEach((s, idx) => {
                const option = document.createElement('option');
                option.value = idx;
                option.textContent = `${s.time} - ${s.title} (${s.fsk || 'FSK ?'}) [Saal ${s.hall}]`;
                select.appendChild(option);
            });
        }
        window.populateFskSessions = populateFskSessions;

        function onFskSessionChange(val) {
            const fskSelect = document.getElementById('fsk-fsk-select');
            const startInput = document.getElementById('fsk-start-input');
            const durationInput = document.getElementById('fsk-duration-input');
            const manualFieldsContainer = document.getElementById('fsk-manual-fields');
            
            if (val === '') {
                if (manualFieldsContainer) manualFieldsContainer.style.display = 'block';
                return;
            }
            
            const idx = parseInt(val, 10);
            const session = (window.fskSessions || [])[idx];
            if (!session) return;
            
            if (fskSelect) {
                let fskAge = "12";
                const match = session.fsk.match(/(\d+)/);
                if (match) fskAge = match[1];
                else if (session.fsk.includes('0')) fskAge = "0";
                fskSelect.value = fskAge;
            }
            
            if (startInput) startInput.value = session.time;
            if (durationInput) durationInput.value = session.duration;
            
            if (manualFieldsContainer) manualFieldsContainer.style.display = 'none';
            
            updateFskVerdict();
        }
        window.onFskSessionChange = onFskSessionChange;

        // ===== Seating Plan Analytics (Row Utilization) =====
        let seatingCache = null;

        function populateSeatingHallSelect() {
            const sel = document.getElementById('seating-hall-select');
            if (!sel) return;
            const halls = window._lastHallsGrouped && Array.isArray(window._lastHallsGrouped)
                ? window._lastHallsGrouped.map(h => h.name).filter(Boolean)
                : [];
            const fallback = ['Saal 1', 'Saal 2', 'Saal 3', 'Saal 4', 'Saal 5', 'Saal 6'];
            const current = sel.value;
            const list = halls.length ? halls : fallback;
            sel.innerHTML = list.map(h => `<option value="${escapeHtml(h)}">${escapeHtml(h)}</option>`).join('');
            if (current && list.includes(current)) sel.value = current;
        }

        function aggregateRowUtilization(snapshots = []) {
            const rows = new Map();
            snapshots.forEach(snapshot => {
                (snapshot.sessions || []).forEach(session => {
                    (session.rows || []).forEach(row => {
                        const key = String(row.row ?? row.label);
                        const occupied = Number(row.occupied ?? row.occupied_seats ?? 0);
                        const total = Number(row.total_seats ?? row.total ?? 0);
                        if (!rows.has(key)) {
                            rows.set(key, {
                                row: Number(row.row) || key,
                                label: row.label || `Reihe ${key}`,
                                occupiedSum: 0,
                                totalSum: 0,
                                maxOccupied: 0,
                                hits: 0,
                                sessions: []
                            });
                        }
                        const entry = rows.get(key);
                        entry.occupiedSum += Math.max(0, occupied);
                        entry.totalSum += Math.max(0, total);
                        entry.maxOccupied = Math.max(entry.maxOccupied, occupied);
                        if (occupied > 0) {
                            entry.hits += 1;
                            entry.sessions.push(`${session.time || '--:--'} ${session.title || ''}`.trim());
                        }
                    });
                });
            });
            return [...rows.values()]
                .map(row => ({
                    ...row,
                    utilization: row.totalSum > 0 ? Math.round((row.occupiedSum / row.totalSum) * 100) : 0,
                    sessions: [...new Set(row.sessions)].slice(0, 4)
                }))
                .sort((a, b) => Number(a.row) - Number(b.row));
        }

        function rowUtilizationColor(pct) {
            if (pct >= 80) return '#e74c3c';
            if (pct >= 55) return '#f1c40f';
            if (pct >= 25) return '#3498db';
            return '#e50914';
        }

        function collectFocusRanges(rows, threshold = 70) {
            const ranges = [];
            let start = null;
            let end = null;
            rows.forEach(r => {
                const rowNum = Number(r.row);
                if (r.utilization >= threshold) {
                    if (start === null) start = rowNum;
                    end = rowNum;
                } else if (start !== null) {
                    ranges.push(start === end ? `Reihe ${start}` : `Reihe ${start}-${end}`);
                    start = null;
                    end = null;
                }
            });
            if (start !== null) ranges.push(start === end ? `Reihe ${start}` : `Reihe ${start}-${end}`);
            return ranges;
        }

        function generateCleaningRecommendation(rows, hallName) {
            if (!rows.length) return 'Keine Sitzplatzdaten vorhanden.';
            const focus = collectFocusRanges(rows, 70);
            const medium = rows.filter(r => r.utilization >= 35 && r.utilization < 70).map(r => `Reihe ${r.row}`);
            const empty = rows.filter(r => r.utilization === 0).map(r => `Reihe ${r.row}`);
            if (focus.length) {
                return `${hallName}: Schwerpunktreinigung auf ${focus.join(', ')}. Diese Reihen waren stark ausgelastet; Vorder-/Nebenbereiche kurz gegenprüfen.${medium.length ? ` Mittel belastet: ${medium.slice(0, 5).join(', ')}.` : ''}`;
            }
            return `${hallName}: Keine stark belegten Reihen. Normale Reinigung reicht.${empty.length ? ` Leer/kaum genutzt: ${empty.slice(0, 6).join(', ')}.` : ''}`;
        }

        async function loadSeatingData(createSnapshot = false) {
            const hall = document.getElementById('seating-hall-select')?.value || 'Saal 1';
            const heatmap = document.getElementById('seating-heatmap');
            const info = document.getElementById('seating-snapshot-info');
            const recommendation = document.getElementById('seating-recommendation');
            if (!heatmap) return;
            heatmap.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted);">Lade Reihen-Auswertung...</div>';
            if (createSnapshot) {
                await fetch(`/api/seating/${encodeURIComponent(hall)}?date=${new Date().toISOString().split('T')[0]}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({})
                });
            }
            try {
                const res = await fetch(`/api/seating/${encodeURIComponent(hall)}?date=${new Date().toISOString().split('T')[0]}`);
                if (!res.ok) throw new Error('Seating API Fehler');
                seatingCache = await res.json();
                const snapshots = Array.isArray(seatingCache.snapshots) ? seatingCache.snapshots : [];
                const rows = aggregateRowUtilization(snapshots);
                renderSeatingHeatmap(rows, hall);
                if (info) {
                    const last = snapshots.length ? new Date(snapshots[snapshots.length - 1].taken_at).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'keine';
                    info.textContent = `${snapshots.length} Snapshot(s) ausgewertet · letzter Snapshot: ${last}`;
                }
                if (recommendation) recommendation.textContent = generateCleaningRecommendation(rows, hall);
                if (createSnapshot) showToast('📸 Sitzplan-Snapshot gespeichert');
            } catch (e) {
                console.error('Seating-Daten konnten nicht geladen werden', e);
                heatmap.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted);">⚠️ Reihen-Auswertung nicht verfügbar.</div>';
                if (recommendation) recommendation.textContent = 'Keine Empfehlung möglich, weil die Sitzplatzdaten nicht geladen werden konnten.';
            }
        }

        function renderSeatingHeatmap(rows, hallName) {
            const heatmap = document.getElementById('seating-heatmap');
            if (!heatmap) return;
            if (!rows.length) {
                heatmap.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-muted);">Keine Reihen-Daten vorhanden.</div>';
                return;
            }
            heatmap.innerHTML = rows.map(row => {
                const color = rowUtilizationColor(row.utilization);
                const sessions = row.sessions.length ? ` · ${escapeHtml(row.sessions.join(', '))}` : '';
                return `
                    <div style="display: grid; grid-template-columns: minmax(74px, 94px) 1fr minmax(44px, auto); gap: 0.55rem; align-items: center; padding: 0.5rem 0.65rem; background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
                        <div style="color: white; font-weight: 700; font-size: 0.86rem;">Reihe ${escapeHtml(row.row)}</div>
                        <div title="${escapeHtml(hallName)} ${escapeHtml(row.label)}${sessions}" style="height: 16px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden;">
                            <div style="height: 100%; width: ${Math.max(2, row.utilization)}%; background: ${color}; box-shadow: 0 0 10px ${color}55;"></div>
                        </div>
                        <div style="text-align: right; color: ${color}; font-weight: 800; font-size: 0.85rem;">${row.utilization}%</div>
                    </div>
                `;
            }).join('');
        }

        async function toggleChecklistItem(id) {
            const checkbox = document.getElementById(id);
            const label = document.getElementById('label-' + id);
            if (!checkbox || !label) return;

            const nameInput = document.getElementById('ws-name-input');
            const name = nameInput ? nameInput.value.trim() : (localStorage.getItem('kinopolis_shift_name') || '');
            
            if (checkbox.checked) {
                if (!name) {
                    alert('Bitte zuerst deinen Namen oben eintragen!');
                    checkbox.checked = false;
                    nameInput && nameInput.focus();
                    return;
                }
                localStorage.setItem('kinopolis_shift_name', name);
            }

            // UI feedback
            label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            label.style.opacity = checkbox.checked ? '0.5' : '1';
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate(checkbox.checked ? [50] : [20]);
            }

            try {
                const res = await fetch('/api/checklist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: currentCity,
                        task_id: id,
                        is_completed: checkbox.checked,
                        completed_by: name
                    })
                });
                if (res.ok) {
                    // Update local cache
                    cloudChecklistState[id] = checkbox.checked;
                    cloudChecklistState[id + '_by'] = name;
                    // Silent refresh
                    renderWorkstation();
                    updateGamification();
                }
            } catch (e) {
                console.error("Failed to sync checklist item", e);
                showToast("Fehler bei der Cloud-Synchronisierung", true);
            }
        }

        async function resetChecklist() {
            const selector = document.getElementById('workstation-selector');
            if (!selector || selector.value === 'lostfound') return;
            if (!confirm('Alle Häkchen für diese Station für ALLE Geräte zurücksetzen?')) return;
            
            const group = selector.value;
            const items = shiftChecklist[group] || [];
            
            for (const item of items) {
                await fetch('/api/checklist', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: currentCity,
                        task_id: item.id,
                        is_completed: false,
                        completed_by: ''
                    })
                });
            }
            renderWorkstation();
            updateGamification();
        }

        function closeWelcomeModal() {
            document.getElementById('welcome-modal').classList.remove('active');
            localStorage.setItem('welcome_seen_beta', 'true');
        }
        window.closeWelcomeModal = closeWelcomeModal;

        let currentLfImageBase64 = null;

        function compressLostFoundImage(file, callback) {
            try {
                const img = new Image();
                const objectUrl = URL.createObjectURL(file);
                
                img.onload = function() {
                    try {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 400;
                        const MAX_HEIGHT = 400;
                        let width = img.width;
                        let height = img.height;
                        
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);
                        
                        const dataUrl = canvas.toDataURL('image/jpeg', 0.75);
                        URL.revokeObjectURL(objectUrl);
                        callback(dataUrl);
                    } catch (err) {
                        console.error("Compression canvas error:", err);
                        URL.revokeObjectURL(objectUrl);
                        fallbackFileReader(file, callback);
                    }
                };
                
                img.onerror = function(err) {
                    console.error("Compression image load error:", err);
                    URL.revokeObjectURL(objectUrl);
                    fallbackFileReader(file, callback);
                };
                
                img.src = objectUrl;
            } catch (e) {
                console.error("Object URL compression failed, using fallback:", e);
                fallbackFileReader(file, callback);
            }
        }
        
        function fallbackFileReader(file, callback) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    try {
                        const canvas = document.createElement('canvas');
                        canvas.width = 300;
                        canvas.height = 300;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, 300, 300);
                        callback(canvas.toDataURL('image/jpeg', 0.6));
                    } catch (err) {
                        console.error("Fallback canvas error:", err);
                        callback(null);
                    }
                };
                img.onerror = function() {
                    callback(null);
                };
                img.src = e.target.result;
            };
            reader.onerror = function() {
                callback(null);
            };
            reader.readAsDataURL(file);
        }

        function handleLfImageUpload(input) {
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const container = document.getElementById('lf-img-preview-container');
                const placeholder = document.getElementById('lf-preview-placeholder');
                const img = document.getElementById('lf-preview-img');
                
                placeholder.innerHTML = '⌛ Wird komprimiert...';
                
                let finished = false;
                const timeoutId = setTimeout(() => {
                    if (!finished) {
                        finished = true;
                        placeholder.innerHTML = '⚠️ Komprimierung übersprungen - lade Originalbild...';
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            currentLfImageBase64 = e.target.result;
                            placeholder.style.display = 'none';
                            img.src = e.target.result;
                            img.style.display = 'block';
                            container.style.borderColor = 'var(--primary-blue)';
                            container.style.boxShadow = '0 0 15px rgba(0, 122, 255, 0.2)';
                            showToast("Bild geladen (Komprimierung übersprungen)");
                        };
                        reader.readAsDataURL(file);
                    }
                }, 3000);
                
                compressLostFoundImage(file, function(base64) {
                    if (finished) return;
                    finished = true;
                    clearTimeout(timeoutId);
                    
                    if (!base64) {
                        // If compression failed, still try to load raw file as fallback instead of failing completely!
                        placeholder.innerHTML = '⚠️ Komprimierungsfehler - lade Originalbild...';
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            currentLfImageBase64 = e.target.result;
                            placeholder.style.display = 'none';
                            img.src = e.target.result;
                            img.style.display = 'block';
                            container.style.borderColor = 'var(--primary-blue)';
                            container.style.boxShadow = '0 0 15px rgba(0, 122, 255, 0.2)';
                        };
                        reader.readAsDataURL(file);
                        return;
                    }
                    currentLfImageBase64 = base64;
                    placeholder.style.display = 'none';
                    img.src = base64;
                    img.style.display = 'block';
                    
                    container.style.borderColor = 'var(--primary-blue)';
                    container.style.boxShadow = '0 0 15px rgba(0, 122, 255, 0.2)';
                });
            }
        }

        function openLfModal() {
            document.getElementById('lf-modal').classList.add('active');
        }
        function closeLfModal() {
            document.getElementById('lf-modal').classList.remove('active');
            document.getElementById('lf-what').value = '';
            document.getElementById('lf-category').value = '';
            document.getElementById('lf-where').value = '';
            document.getElementById('lf-who').value = '';
            
            // Reset image uploader
            currentLfImageBase64 = null;
            const fileInput = document.getElementById('lf-image-input');
            if (fileInput) fileInput.value = '';
            
            const placeholder = document.getElementById('lf-preview-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
                placeholder.innerHTML = `
                    <span style="font-size: 2rem;">📸</span>
                    Foto aufnehmen oder auswählen
                `;
            }
            
            const img = document.getElementById('lf-preview-img');
            if (img) {
                img.src = '';
                img.style.display = 'none';
            }
            
            const container = document.getElementById('lf-img-preview-container');
            if (container) {
                container.style.borderColor = 'rgba(255,255,255,0.15)';
                container.style.boxShadow = 'none';
            }
        }
        async function loadLfItems() {
            const list = document.getElementById('lf-items-list');
            if(!list) return;
            
            try {
                const res = await fetch(`/api/lostfound?location=${currentCity}`);
                if (!res.ok) throw new Error();
                const allItems = await res.json();
                window.LOST_FOUND_ITEMS = allItems;

                // Update badge
                const badge = document.getElementById('lf-count-badge');
                if (badge) badge.textContent = allItems.length;

                // Client-side filtering
                const searchVal = (document.getElementById('lf-search')?.value || '').toLowerCase();
                const catFilter = document.getElementById('lf-filter-cat')?.value || '';
                
                const items = allItems.filter(item => {
                    const matchSearch = !searchVal || 
                        item.what.toLowerCase().includes(searchVal) || 
                        item.found_where.toLowerCase().includes(searchVal) || 
                        item.found_by.toLowerCase().includes(searchVal);
                    const matchCat = !catFilter || item.category === catFilter;
                    return matchSearch && matchCat;
                });

                if (items.length === 0) {
                    list.innerHTML = `<div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-muted); display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <img src="/assets/Oli/Oli_2_bgless.png" alt="Oli Fundbüro" style="width: 72px; height: 72px; object-fit: contain; margin-bottom: 0.75rem; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5)); opacity: 0.85;">
                        <span style="font-size: 0.95rem;">Keine passenden Fundsachen gefunden.</span>
                    </div>`;
                    return;
                }
                
                list.innerHTML = '';
                const grid = document.createElement('div');
                grid.className = 'lf-grid';
                list.appendChild(grid);

                items.forEach((item) => {
                    let placeholderEmoji = '🧸';
                    const category = item.category || 'Sonstiges';
                    if (category === 'Kleidung') placeholderEmoji = '👕';
                    if (category === 'Wertsachen') placeholderEmoji = '💎';
                    if (category === 'Elektronik') placeholderEmoji = '📱';
                    if (category === 'Sonstiges') placeholderEmoji = '📦';

                    // Clean category name for class selectors (German to ASCII slug)
                    const catLower = category.toLowerCase()
                        .replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue');
                    const badgeClass = `lf-badge category-${catLower}`;

                    const el = document.createElement('div');
                    el.className = 'lf-card glass';
                    
                    el.innerHTML = `
                        <div class="lf-card-image-wrapper">
                            ${item.image_url ? 
                                `<img src="${item.image_url}" class="lf-card-image" alt="${item.what}">` : 
                                `<span class="lf-card-placeholder">${placeholderEmoji}</span>`
                            }
                        </div>
                        <div class="lf-card-content">
                            <h4 class="lf-card-title">${item.what}</h4>
                            <div class="lf-badge-row">
                                <span class="${badgeClass}">${category}</span>
                            </div>
                            <div class="lf-meta-row" style="margin-top: 0.25rem; font-size: 0.8rem; color: var(--text-muted);">
                                <span>📍</span>
                                <span>${item.found_where}</span>
                            </div>
                            <div class="lf-meta-row" style="font-size: 0.8rem; color: var(--text-muted);">
                                <span>👤</span>
                                <span>Gefunden von ${item.found_by}</span>
                            </div>
                            <div class="lf-date" style="font-size: 0.72rem; color: rgba(255,255,255,0.3); margin-top: auto; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.05);">
                                Gefunden am ${formatDateTimeSafe(item.created_at)}
                            </div>
                            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                                 <button onclick="printLostFoundLabel(${item.id})" class="btn-primary" style="
                                     flex: 1;
                                     background: rgba(0, 120, 255, 0.15);
                                     border: 1px solid rgba(0, 120, 255, 0.3);
                                     color: var(--primary-blue);
                                     padding: 0.6rem;
                                     border-radius: 10px;
                                     font-weight: 700;
                                     font-size: 0.85rem;
                                     cursor: pointer;
                                     transition: all 0.2s;
                                 ">🏷️ Etikett</button>
                                 <button onclick="deleteLfItem(${item.id})" class="btn-primary" style="
                                     flex: 1;
                                     background: rgba(229, 9, 20, 0.1);
                                     border: 1px solid rgba(229, 9, 20, 0.3);
                                     color: #ff4d4d;
                                     padding: 0.6rem;
                                     border-radius: 10px;
                                     font-weight: 700;
                                     font-size: 0.85rem;
                                     cursor: pointer;
                                     transition: all 0.2s;
                                 " onmouseover="this.style.background='rgba(229, 9, 20, 0.2)'; this.style.borderColor='rgba(229, 9, 20, 0.5)';" onmouseout="this.style.background='rgba(229, 9, 20, 0.1)'; this.style.borderColor='rgba(229, 9, 20, 0.3)';">
                                     Erledigt
                                 </button>
                             </div>
                        </div>
                    `;
                    grid.appendChild(el);
                });
            } catch (e) {
                list.innerHTML = '<div style="padding: 2rem; color: #ff4d4d;">Fehler beim Laden des Fundbüros.</div>';
            }
        }

        async function deleteLfItem(id) {
            if (!confirm("Fundsache endgültig löschen / als abgeholt markieren?")) return;
            try {
                const res = await fetch(`/api/lostfound/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    loadLfItems();
                    if (typeof showToast === 'function') showToast("Fundsache entfernt");
                }
            } catch (e) {
                if (typeof showToast === 'function') showToast("Fehler beim Löschen", true);
            }
        }

        async function saveLfItem() {
            const what = document.getElementById('lf-what').value.trim();
            const category = document.getElementById('lf-category').value;
            const where = document.getElementById('lf-where').value.trim();
            const who = document.getElementById('lf-who').value.trim();
            
            if (!what || !category || !where || !who) {
                alert('Bitte fülle alle Felder aus!');
                return;
            }
            
            try {
                const res = await fetch('/api/lostfound', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        location: currentCity,
                        what, category, found_where: where, found_by: who,
                        image_url: currentLfImageBase64
                    })
                });
                
                if (res.ok) {
                    const data = await res.json().catch(() => ({}));
                    if (data && data.success === false) {
                        if (typeof showToast === 'function') showToast("Fehler beim Speichern: " + (data.error || "Unbekannter Fehler"), true);
                    } else {
                        closeLfModal();
                        loadLfItems();
                        if (typeof showToast === 'function') showToast("Fundsache erfolgreich gespeichert");
                        updateGamification();
                    }
                } else {
                    const errData = await res.json().catch(() => ({}));
                    if (typeof showToast === 'function') {
                        showToast("Fehler beim Speichern: " + (errData.error || res.statusText || "Serverfehler"), true);
                    }
                }
            } catch (e) {
                console.error("Save lostfound error:", e);
                if (typeof showToast === 'function') showToast("Fehler beim Speichern: " + e.message, true);
            }
        }

        function toggleNews() {
            const list = document.getElementById('news-list');
            const btn = document.getElementById('news-toggle-btn');
            if (list) list.classList.toggle('collapsed');
            if (btn) btn.classList.toggle('collapsed');
        }

        let lastNewsCount = -1;
        async function fetchNews() {
            try {
                const res = await fetch('/api/messages?v=' + Date.now());
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                
                const contentType = res.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Server returned non-JSON response (HTML?)');
                }

                const news = await res.json();
                
                if (lastNewsCount !== -1 && news.length > lastNewsCount) {
                    // NEW MESSAGE!
                    if (window.playFunkSound) playFunkSound();
                    showToast("Neue Funk-Nachricht!");
                }
                lastNewsCount = news.length;
                
                renderNews(news);
            } catch (err) {
                console.error('News fetch error', err);
            }
        }


        function renderNews(news) {
            const container = document.getElementById('internal-news-container');
            const list = document.getElementById('news-list');
            
            if (!news || news.length === 0) {
                container.classList.remove('has-news');
                list.innerHTML = '';
                return;
            }

            container.classList.add('has-news');
            const badge = document.getElementById('news-badge');
            if (badge) badge.textContent = news.length;
            list.innerHTML = news.map(item => {
                const images = item.images || (item.image_url ? [item.image_url] : []);
                const galleryHtml = images.length > 0 ? `
                        <div class="news-gallery">
                            ${images.map(img => `<img src="${img}" class="news-image" onclick="window.open(this.src)" />`).join('')}
                        </div>
                ` : '';

                return `
                <div class="news-card">
                    <div class="news-content">
                        <div class="news-header">
                            <span class="news-title">${item.title}</span>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span class="news-meta">${formatDateTimeSafe(item.created_at)} von ${item.author}</span>
                            </div>
                        </div>
                        ${galleryHtml}
                        <div class="news-text">${item.content}</div>
                    </div>
                </div>
            `}).join('');
        }

        // --- News Mutation Functions ---
        function openMessageModal() {
            document.getElementById('message-modal').classList.add('active');
        }
        function closeMessageModal() {
            document.getElementById('message-modal').classList.remove('active');
        }



        let currentMsgBase64 = null;

        function handleMessageImage(input) {
            const file = input.files[0];
            if (!file) return;
            
            if (file.size > 1024 * 1024) { // 1MB limit for D1/Requests
                alert('Das Bild ist zu groß (max 1MB erlaubt).');
                input.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                currentMsgBase64 = e.target.result;
                document.getElementById('msg-preview-img').src = currentMsgBase64;
                document.getElementById('msg-image-preview').style.display = 'block';
                document.getElementById('msg-image-url').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }

        function removeMessageImage() {
            currentMsgBase64 = null;
            document.getElementById('msg-image-file').value = '';
            document.getElementById('msg-preview-img').src = '';
            document.getElementById('msg-image-preview').style.display = 'none';
            document.getElementById('msg-image-url').style.display = 'block';
        }

        async function sendMessage() {
            const title = document.getElementById('msg-title').value.trim();
            const content = document.getElementById('msg-content').value.trim();
            const author = document.getElementById('msg-author').value.trim();
            
            if (!title || !content) return alert('Titel und Inhalt sind erforderlich!');
            
            const btn = document.getElementById('msg-send-btn');
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;
            
            try {
                const image_url = currentMsgBase64 || document.getElementById('msg-image-url').value.trim();
                const res = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content, author, image_url, location: currentCity })
                });
                
                if (res.ok) {
                    closeMessageModal();
                    document.getElementById('msg-title').value = '';
                    document.getElementById('msg-content').value = '';
                    removeMessageImage();
                    alert('Erfolgreich gespeichert! Push wurde versendet.');
                    fetchNews();
                } else {
                    const err = await res.json();
                    alert('Fehler: ' + (err.error || 'Server Fehler'));
                }
            } catch (e) {
                alert('Netzwerkfehler beim Senden.');
            } finally {
                btn.innerText = '🚀 Speichern & Senden';
                btn.disabled = false;
            }
        }

        async function fetchWeather() {
            const cityCoords = {
                'ab': { lat: 49.97, lon: 9.14 }, // Aschaffenburg
                'bn': { lat: 50.68, lon: 7.15 }, // Bad Godesberg
                'bh': { lat: 50.22, lon: 8.61 }, // Bad Homburg (updated from 50.23, 8.62)
                'kp': { lat: 49.87, lon: 8.65 }, // Darmstadt
                'cd': { lat: 49.87, lon: 8.65 }, // Darmstadt
                'rx': { lat: 49.87, lon: 8.65 }, // Darmstadt
                'fr': { lat: 50.91, lon: 13.34 }, // Freiberg
                'gi': { lat: 50.58, lon: 8.67 }, // Gießen
                'kg': { lat: 50.58, lon: 8.67 }, // Gießen
                'hh': { lat: 53.54, lon: 9.99 }, // Hamburg
                'hu': { lat: 50.13, lon: 8.92 }, // Hanau
                'ka': { lat: 49.00, lon: 8.40 }, // Karlsruhe
                'ko': { lat: 50.36, lon: 7.59 }, // Koblenz
                'lh': { lat: 48.53, lon: 12.15 }, // Landshut
                'ro': { lat: 47.85, lon: 12.12 }, // Rosenheim
                'su': { lat: 50.11, lon: 8.52 }, // Sulzbach
                'vi': { lat: 49.54, lon: 8.58 }  // Viernheim
            };
            const coords = cityCoords[currentCity] || cityCoords['kp'];
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current_weather=true`);
                const data = await res.json();
                if (data.current_weather) {
                    const temp = Math.round(data.current_weather.temperature);
                    const code = data.current_weather.weathercode;
                    document.getElementById('weather-temp').innerText = `${temp}°C`;
                    document.getElementById('weather-icon').innerText = getWeatherEmoji(code);
                    document.getElementById('weather-widget').style.display = 'flex';
                }
            } catch (err) { console.error('Weather error', err); }
        }

        function getWeatherEmoji(code) {
            if (code === 0) return '☀️';
            if (code <= 3) return '🌤️';
            if (code <= 48) return '☁️';
            if (code <= 67) return '🌧️';
            if (code <= 77) return '❄️';
            if (code <= 82) return '🌧️';
            if (code <= 99) return '⛈️';
            return '🌡️';
        }

        async function fetchLocations() {
            try {
                const response = await fetch(`${LOCATIONS_URL}?v=${Date.now()}`);
                const locations = await response.json();
                
                if (!response.ok || !Array.isArray(locations)) {
                    console.error('fetchLocations: Failed or invalid format', { ok: response.ok, locations });
                    
                    // CRITICAL FALLBACK: If API is down, use a hardcoded list to keep the UI functional
                    const fallbackLocations = [
                        { name: "Darmstadt: KINOPOLIS", slug: "kp" },
                        { name: "Sulzbach / MTZ", slug: "su" },
                        { name: "Bonn", slug: "bn" },
                        { name: "Hanau", slug: "hu" },
                        { name: "Gießen", slug: "gi" }
                    ];
                    renderLocations(fallbackLocations);
                    return;
                }

                renderLocations(locations);
            } catch (err) {
                console.error('fetchLocations: Critical failure', err);
            }
        }

        function renderLocations(locations) {
            try {
                const selector = document.getElementById('cinema-selector');
                if (!selector) return;
                selector.innerHTML = '';
                
                locations.forEach(loc => {
                        const option = document.createElement('option');
                        option.value = loc.slug;
                        option.textContent = loc.name;
                        if (loc.slug === currentCity) option.selected = true;
                        selector.appendChild(option);
                    });

                    // Synchronize badge and current selection
                    const currentLoc = locations.find(l => l.slug === currentCity);
                    if (currentLoc) {
                        const locNameEl = document.getElementById('location-name');
                        if (locNameEl) locNameEl.innerText = currentLoc.name;
                        selector.value = currentCity;
                    }

                    selector.addEventListener('change', (e) => {
                        currentCity = e.target.value;
                        localStorage.setItem('current_city', currentCity);
                        
                        const cityName = e.target.options[e.target.selectedIndex].text;
                        const locNameEl = document.getElementById('location-name');
                        if (locNameEl) locNameEl.innerText = cityName;
                        
                        const dashboard = document.getElementById('dashboard');
                        if (dashboard) dashboard.innerHTML = '<div class="loading-state"><div class="spinner"></div><div class="loading-text">Aktualisiere Daten...</div></div>';
                        
                        // Reload state for new location
                        loadTaskState();
                        
                        if (typeof updateKurzwahlVisibility === 'function') updateKurzwahlVisibility();
                        fetchSessions();
                        fetchWeather();
                    });

            } catch (err) {
                console.error('Failed to render locations', err);
            }
        }

        async function fetchSessions() {
            try {
                const year = displayDate.getFullYear();
                const month = String(displayDate.getMonth() + 1).padStart(2, '0');
                const day = String(displayDate.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;
                
                const url = `${API_URL}?location=${currentCity}&date=${dateStr}&v=${Date.now()}`;
                console.log('Fetching sessions for:', dateStr, url);
                const response = await fetch(url);
                const sessions = await response.json();

                if (!response.ok || (sessions && sessions.error)) {
                    const errorMsg = sessions ? sessions.error : `HTTP ${response.status}`;
                    console.warn('fetchSessions: API Error', errorMsg);
                    renderDashboard(null, errorMsg);
                    return;
                }

                if (!Array.isArray(sessions)) {
                    console.error('fetchSessions: Expected array but got:', sessions);
                    renderDashboard(null, 'Ungültiges Datenformat vom Server');
                    return;
                }

                // Fetch tomorrow's sessions for poster alerts
                let tomSessions = [];
                try {
                    const tomDate = new Date(displayDate);
                    tomDate.setDate(tomDate.getDate() + 1);
                    const ty = tomDate.getFullYear();
                    const tm = String(tomDate.getMonth() + 1).padStart(2, '0');
                    const td = String(tomDate.getDate()).padStart(2, '0');
                    const tomDateStr = `${ty}-${tm}-${td}`;
                    const tomRes = await fetch(`${API_URL}?location=${currentCity}&date=${tomDateStr}&v=${Date.now()}`);
                    if (tomRes.ok) tomSessions = await tomRes.json();
                } catch (e) { console.error("Tomorrow fetch failed", e); }
                
                lastData = sessions;
                lastTomData = tomSessions;
                lastUpdateTime = new Date();
                
                if (window.updatePopcornPrognosis) updatePopcornPrognosis();
                if (window.populateFskSessions) populateFskSessions();
                
                // Clear state if date changed (optional, but good for cleanliness)
                const todayStr = new Date().toISOString().split('T')[0];
                if (localStorage.getItem('last_task_date') !== todayStr) {
                    completedAuslaesse.clear();
                    completedPosters.clear();
                    completedCleaning.clear();
                    scannedPlanData = []; // Clear scanned data daily
                    localStorage.removeItem('scanned_plan_data');
                    localStorage.setItem('last_task_date', todayStr);
                    saveTaskState();
                }

                document.getElementById('status-indicator').classList.remove('offline');
                const staleWarning = document.getElementById('stale-warning');
                if (staleWarning) staleWarning.style.display = 'none';

                if(sessions.length === 0) {
                      const dateStrDisplay = displayDate.toLocaleDateString('de-DE');
                      document.getElementById('dashboard').innerHTML = `<div class="glass" style="padding: 3rem 1.5rem; text-align: center; grid-column: 1/-1; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                          <img src="/assets/Oli/Oli_4_bgless.png" alt="Oli Kino" style="width: 84px; height: 84px; object-fit: contain; margin-bottom: 1rem; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));">
                          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem;">Keine Vorstellungen gefunden</h3>
                          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 420px; line-height: 1.4;">Möglicherweise ist das Kino am ${dateStrDisplay} geschlossen oder das Programm wurde noch nicht veröffentlicht.</p>
                      </div>`;
                      document.getElementById('poster-alerts').innerHTML = '';
                      document.getElementById('auslaesse-list').innerHTML = '';
                      const auslaesseContainer = document.getElementById('auslaesse-section-container');
                      if (auslaesseContainer) auslaesseContainer.style.display = 'none';
                      return;
                }

                renderDashboard(sessions);
                renderTasks(sessions);
                updateAlerts(sessions, lastTomData || []);
                renderStats(sessions);
                window._lastHallsGrouped = sessions; // Cache for Tech-Ticket-Saaal-Dropdown
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('status-indicator').classList.add('offline');
                
                const staleWarning = document.getElementById('stale-warning');
                if (staleWarning) staleWarning.style.display = 'block';

                if (!lastData) {
                    const dashboard = document.getElementById('dashboard');
                    if (dashboard) {
                          dashboard.innerHTML = `<div class="card-container glass" style="padding: 2.5rem 1.5rem; text-align: center; grid-column: 1/-1; border-color: rgba(239, 68, 68, 0.3);">
                             <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">📡</div>
                             <h3 style="color: #fff; font-size: 1.15rem; margin-bottom: 0.5rem;">Verbindungsunterbrechung</h3>
                             <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 400px; margin: 0 auto 1.25rem; line-height: 1.4;">
                                Die Vorstellungsdaten konnten gerade nicht synchronisiert werden. Bitte Internetverbindung prüfen.
                             </p>
                             <button onclick="fetchSessions()" class="btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.9rem; font-weight: 700; border-radius: 10px; background: var(--primary-blue); border: none; color: #fff; cursor: pointer;">
                                🔄 Jetzt erneut laden
                             </button>
                          </div>`;
                    }
                }
                
                // Fallback for Demo Purposes
                renderStats([]);
            }
        }

        function renderDashboard(halls, errorMsg = null) {
            const dashboard = document.getElementById('dashboard');
            if (!dashboard) return;
            dashboard.innerHTML = '';

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            if (!halls || !Array.isArray(halls)) { 
                dashboard.innerHTML = `
                    <div class="glass" style="padding: 3rem; text-align: center; grid-column: 1/-1;">
                        <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">📡</span>
                        <h3>${errorMsg ? 'Fehler beim Laden' : 'Keine Verbindung zu den Live-Daten'}</h3>
                        <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9rem;">
                            ${errorMsg ? `Grund: ${errorMsg}` : 'Die Programmdaten konnten nicht abgerufen werden.'}
                        </p>
                        <button onclick="fetchSessions()" class="btn-primary" style="margin-top: 1.5rem; padding: 0.8rem 1.5rem; border-radius: 12px; font-weight: 600;">Erneut versuchen</button>
                    </div>
                `;
                return; 
            }
            
            // Helper to check if a session is finished
            const isSessionFinished = (s) => {
                if (!s || !s.time) return true;
                if (s.time.includes(':')) {
                    const [h, m] = s.time.split(':').map(Number);
                    const startMin = h * 60 + m;
                    const endMin = startMin + (s.duration || 0);
                    return currentMinutes > endMin;
                }
                return true;
            };

            // Helper to check if a hall is finished (all sessions are finished)
            const isHallFinished = (hall) => {
                const rawSessions = Array.isArray(hall.sessions) ? hall.sessions : (hall.sessions ? [hall.sessions] : []);
                const sessions = rawSessions.filter(s => s && s.time);
                if (sessions.length === 0) return true;
                return sessions.every(isSessionFinished);
            };

            // Sort halls: active/future first, finished last. Secondary sort: alphabetically
            halls.sort((a, b) => {
                const aFinished = isHallFinished(a);
                const bFinished = isHallFinished(b);
                if (aFinished !== bFinished) {
                    return aFinished ? 1 : -1;
                }
                return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
            });

            halls.forEach(hall => {
                const hallName = hall.name;
                const rawSessions = Array.isArray(hall.sessions) ? hall.sessions : (hall.sessions ? [hall.sessions] : []);
                const sessions = rawSessions.filter(s => s && s.time); 
                
                const card = document.createElement('div');
                card.className = 'hall-card ios-card glass';
                card.style.marginBottom = '2.5rem';
                
                if (!Array.isArray(sessions)) {
                    console.warn(`renderDashboard: sessions for hall ${hall.name} is not an array:`, sessions);
                    return '';
                }
                let sessionsHtml = sessions.map(s => {
                    const capacity = s.capacity || 1; // Prevent division by zero
                    const occupancyPct = Math.min(100, Math.round((s.sold / capacity) * 100)) || 0;
                    const endTime = calculateEndTime(s.time, s.duration);
                    
                    // Determine status class
                    let barClass = '';
                    if(occupancyPct > 85) barClass = 'full';
                    else if(occupancyPct > 60) barClass = 'high';

                    // Check if active (current time is between start and end)
                    let isActive = false;
                    let isPast = false;
                    let hasEnded = false;
                    let startMin, endMin;
                    if (s.time && s.time.includes(':')) {
                        const [h, m] = s.time.split(':').map(Number);
                        startMin = h * 60 + m;
                        endMin = startMin + s.duration;
                        isPast = currentMinutes >= startMin;
                        hasEnded = currentMinutes > endMin;
                        isActive = isPast && !hasEnded;
                    }

                    const escapedHall = hallName.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                    const escapedTitle = s.title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
                    
                    let timeBadgeClass = 'time-badge-future';
                    if (isActive) timeBadgeClass = 'time-badge-running';
                    else if (hasEnded) timeBadgeClass = 'time-badge-ended';

                    return `
                        <div class="session-card-ios ${isActive ? 'active' : ''}">
                            <div class="session-card-header">
                                <div class="time-badge ${timeBadgeClass}">${s.time}</div>
                                <div class="fsk-badge">${getFskTagsHtml(s)}</div>
                            </div>
                            <div class="session-card-body">
                                <div class="movie-title-ios" title="${s.title}" onclick="openMovieDetail('${s.movieLink || ''}')" style="cursor: pointer;">${s.title}</div>
                                <div class="countdown-timer" data-start="${startMin}" data-end="${endMin}" data-hall="${escapedHall}"></div>
                            </div>
                            <div class="session-card-footer">
                                <div class="meta-row">
                                    <span class="duration-text">${s.duration} Min</span>
                                    ${s.date ? `<span class="session-date-badge">${s.date}</span>` : ''}
                                </div>
                                <div class="occupancy-wrapper-ios">
                                    <div class="occupancy-track-ios">
                                        <div class="occupancy-bar-ios ${barClass}" style="width: ${occupancyPct}%"></div>
                                    </div>
                                    <span class="occupancy-val-ios">${s.sold}/${s.capacity}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                card.innerHTML = `
                    <div class="hall-header-ios">
                        <span class="hall-name-ios">Saal ${hallName}</span>
                        <span class="session-count-ios">${sessions.length} Vorstellungen</span>
                    </div>
                    <div class="hall-sessions-scroll">
                        ${sessionsHtml}
                    </div>
                `;
                dashboard.appendChild(card);
            });
        }

        function renderLiveTasks() {
            if (typeof lastData !== 'undefined' && lastData) {
                renderTasks(lastData);
                if (typeof updateAlerts === 'function') updateAlerts(lastData, []);
            }
        }

        window.lastTaskActionTime = 0;
        window._taskPollInterval = null;
        function startTaskPolling() {
            if (window._taskPollInterval) return; // already running
            window._taskPollInterval = setInterval(() => {
                loadTaskState();
            }, 15000); // every 15 seconds
        }

        async function loadTaskState() {
            // Debounce: Skip background load if user recently clicked something (avoid race condition)
            if (Date.now() - window.lastTaskActionTime < 10000) return;

            try {
                const year = displayDate.getFullYear();
                const month = String(displayDate.getMonth() + 1).padStart(2, '0');
                const day = String(displayDate.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;

                const res = await fetch(`/api/task-completions?location=${currentCity}&date=${dateStr}`);
                if (!res.ok) return;
                const data = await res.json();
                
                if (!Array.isArray(data)) return; // Safety check
                
                // Build temp sets + meta
                const tempAuslaesse = new Set();
                const tempPosters = new Set();
                const tempCleaning = new Set();
                const tempMeta = new Map();
                
                data.forEach(t => {
                    if (t.type === 'auslass') tempAuslaesse.add(t.task_id);
                    else if (t.type === 'poster') tempPosters.add(t.task_id);
                    else if (t.type === 'cleaning') tempCleaning.add(t.task_id);
                    if (t.author || t.completed_at) {
                        tempMeta.set(t.task_id, { author: t.author || '', completed_at: t.completed_at || null });
                    }
                });

                // Smart re-render: only update if something actually changed
                const newHash = [...tempAuslaesse, ...tempPosters, ...tempCleaning].sort().join('|');
                const oldHash = [...completedAuslaesse, ...completedPosters, ...completedCleaning].sort().join('|');
                
                // Update actual sets + meta
                completedAuslaesse.clear(); tempAuslaesse.forEach(id => completedAuslaesse.add(id));
                completedPosters.clear(); tempPosters.forEach(id => completedPosters.add(id));
                completedCleaning.clear(); tempCleaning.forEach(id => completedCleaning.add(id));
                completedMeta.clear(); tempMeta.forEach((v, k) => completedMeta.set(k, v));

                // Only re-render if something changed (avoids flicker for other users)
                if (newHash !== oldHash) {
                    renderLiveTasks();
                    saveTaskState(); // Keep local cache in sync with server
                    if (typeof updateAlerts === 'function' && lastData) updateAlerts(lastData, lastTomData || []);
                }
            } catch (e) {
                console.error("Error loading task state", e);
            }
        }


        async function syncTaskState(taskId, type, isDone, taskTitle = '') {
            window.lastTaskActionTime = Date.now();
            try {
                const year = displayDate.getFullYear();
                const month = String(displayDate.getMonth() + 1).padStart(2, '0');
                const day = String(displayDate.getDate()).padStart(2, '0');
                const dateStr = `${year}-${month}-${day}`;

                let author = 'Anonym';
                if (window.AUTH && AUTH.user) {
                    author = `${AUTH.user.first_name || ''} ${AUTH.user.last_name || ''}`.trim() || AUTH.user.email || 'User';
                }

                if (isDone) {
                    const res = await fetch('/api/task-completions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            task_id: taskId, 
                            location: currentCity, 
                            date: dateStr, 
                            type, 
                            author,
                            task_title: taskTitle
                        })
                    });
                    if (!res.ok) showToast("Fehler beim Speichern (Cloud Sync)", true);
                } else {
                    const res = await fetch(`/api/task-completions?task_id=${encodeURIComponent(taskId)}&location=${encodeURIComponent(currentCity)}&date=${encodeURIComponent(dateStr)}`, {
                        method: 'DELETE'
                    });
                    if (!res.ok) showToast("Fehler beim Löschen (Cloud Sync)", true);
                }
            } catch (e) { 
                console.error("Sync error:", e, { taskId, type, isDone });
                showToast("Netzwerkfehler beim Cloud-Sync", true);
            }
        }

        function saveTaskState() {
            // Save to localStorage as fast local cache — restored on F5 immediately
            // Cloud sync (loadTaskState) will correct any stale data within 15s
            try {
                localStorage.setItem('completed_auslaesse', JSON.stringify([...completedAuslaesse]));
                localStorage.setItem('completed_posters', JSON.stringify([...completedPosters]));
                localStorage.setItem('completed_cleaning', JSON.stringify([...completedCleaning]));
            } catch(e) { console.warn('saveTaskState localStorage error', e); }
        }

        function renderTasks(halls) {
            if (!halls || !Array.isArray(halls)) return;

            const allSessions = (halls || []).flatMap(h => h.sessions || []).filter(s => s && s.time);
            
            const container = document.getElementById('auslaesse-section-container');
            const list = document.getElementById('auslaesse-list');
            const badge = document.getElementById('auslass-count-badge');
            if (!container || !list || !badge) return;
            list.innerHTML = '';

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            
            const allTasks = [];

            halls.forEach(hall => {
                const hallName = hall.name;
                const sessions = (hall.sessions || []).filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                
                sessions.forEach((s, idx) => {
                    const isLastSession = (idx === sessions.length - 1);
                    if (isLastSession) return; // Letzte Vorstellung überspringen, da diese nicht gereinigt werden muss

                    const [h, m] = s.time.split(':').map(Number);
                    const startMin = h * 60 + m;
                    const running30Min = startMin + 30;
                    const durationBase = startMin + s.duration;
                    const durationMax = durationBase + 30;

                    // Calculate next show's start time in this hall
                    let nextStartMin = 9999; // Far future
                    if (sessions[idx + 1]) {
                        const [nh, nm] = sessions[idx + 1].time.split(':').map(Number);
                        nextStartMin = nh * 60 + nm;
                    }

                    // CHECK FOR SCANNED DATA OVERRIDE
                    let timeDisplay = `${formatMinutes(durationBase)} – ${formatMinutes(durationMax)} (geschätzt)`;
                    let triggerMin = durationBase;
                    let triggerMax = durationMax;
                    let isVerified = false;

                    const scanned = findScannedMatch(hall.name, s.title);
                    if (scanned) {
                        const targetTime = scanned.credits_time || scanned.end_time;
                        if (targetTime && targetTime.includes(':')) {
                            const [eh, em] = targetTime.split(':').map(Number);
                            if (!isNaN(eh)) {
                                triggerMin = eh * 60 + em;
                                triggerMax = triggerMin + 15; // Tighter window for verified
                                timeDisplay = `${targetTime} – ${formatMinutes(triggerMax)} (Auslassplan)`;
                                isVerified = true;
                            }
                        }
                    }

                    // 1. Auslass Task (All sessions)
                    allTasks.push({
                        type: 'auslass',
                        hall: hall.name,
                        title: s.title,
                        sold: s.sold,
                        time: triggerMin,
                        nextStartTime: nextStartMin,
                        timeDisplay: timeDisplay,
                        triggerMin: triggerMin,
                        triggerMax: triggerMax,
                        isVerified: isVerified,
                        id: `auslass-${hall.name}-${s.title}-${s.time}`
                    });
                });
            });

            /* 
            // 3. Add General Cleaning Tasks - REMOVED AS PER USER REQUEST
            const dayOfWeek = now.getDay();
            const dailyTasks = CLEANING_TASKS[dayOfWeek] || [];
            dailyTasks.forEach((task, idx) => {
                allTasks.push({
                    type: 'cleaning',
                    hall: 'ALLGEMEIN',
                    title: task,
                    time: -100, // Even higher priority than -1
                    timeDisplay: 'Heute fällig',
                    triggerMin: 0,
                    id: `cleaning-${dayOfWeek}-${idx}`
                });
            });
            */

            // 4. Add Station Abbau Alerts
            if (currentCity === 'kp') {
                const abbauTasks = getKpStationTasks(halls, completedAuslaesse);
                allTasks.push(...abbauTasks);
            }

            // Filter for tasks:
            // - Auslaesse: Only show if not done OR if it happened within the last 60 minutes
            // - Cleaning: ALWAYS show
            const liveTasks = allTasks.filter(t => {
                if (t.type === 'auslass') {
                    const isDone = completedAuslaesse.has(t.id);
                    
                    // NEU: Wenn die NÄCHSTE Vorstellung im selben Saal bereits begonnen hat,
                    // nehmen wir die aktuelle Aufgabe raus (zu spät oder bereits erledigt).
                    if (currentMinutes >= t.nextStartTime) return false;

                    // Hide if older than 3 hours (increased from 1h for better overview)
                    const isOld = currentMinutes > (t.time + 180);
                    if (isOld && isDone) return false;
                    return true;
                }
                if (t.type === 'cleaning') return true;
                if (t.type === 'abbau') {
                    if (completedAuslaesse.has(t.id)) return false;
                    return true;
                }
                return false;
            });


            // Sort by:
            // 1. Active (Red) tasks first
            // 2. Then by time (triggerMin)
            // 3. Then by hall name
            liveTasks.sort((a, b) => {
                const aDone = a.type === 'auslass' ? completedAuslaesse.has(a.id) : completedCleaning.has(a.id);
                const bDone = b.type === 'auslass' ? completedAuslaesse.has(b.id) : completedCleaning.has(b.id);
                
                const aActive = !aDone && a.type === 'auslass' && currentMinutes >= a.triggerMin && currentMinutes <= a.triggerMax;
                const bActive = !bDone && b.type === 'auslass' && currentMinutes >= b.triggerMin && currentMinutes <= b.triggerMax;

                if (aActive && !bActive) return -1;
                if (!aActive && bActive) return 1;
                if (aDone && !bDone) return 1;
                if (!aDone && bDone) return -1;
                
                if (a.time !== b.time) return a.time - b.time;
                return (a.hall || '').localeCompare(b.hall || '');
            });

            liveTasks.forEach(t => {
                const isAuslass = t.type === 'auslass';
                const isCleaning = t.type === 'cleaning';
                const set = isCleaning ? completedCleaning : (isAuslass ? completedAuslaesse : completedPosters);
                const isDone = set.has(t.id);
                const isActive = !isDone && isAuslass && currentMinutes >= t.triggerMin && currentMinutes <= t.triggerMax;
                
                const item = document.createElement('div');
                item.className = `auslass-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`;

                let badgeColor = 'rgba(229, 9, 20, 0.3)';
                let icon = '🚪';
                if (isCleaning) {
                    badgeColor = 'var(--accent-gold, #f1c40f)';
                    icon = '🧹';
                } else if (!isAuslass) {
                    badgeColor = 'var(--primary-blue)';
                    icon = '🖼️';
                }

                const meta = completedMeta.get(t.id);
                const authorBadge = isDone && meta && meta.author ? (() => {
                    const completedDate = parseDateSafe(meta.completed_at);
                    const ts = completedDate ? completedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) : '';
                    return `<div style="font-size:0.72rem; color:#e50914; margin-top:3px; font-weight:600; opacity:0.9;">✅ ${meta.author}${ts ? ' · ' + ts + ' Uhr' : ''}</div>`;
                })() : '';

                item.innerHTML = `
                    <div class="auslass-hall" style="background: ${isActive ? 'var(--primary-red)' : badgeColor}">${icon} ${t.hall}</div>
                    <div class="auslass-movie" title="${t.title}">${t.title}${t.sold !== undefined ? ` • ${t.sold} Besucher` : ''} ${t.isVerified ? '✅' : ''}</div>
                    <div class="auslass-time-range" style="${t.isVerified ? 'color: #e50914; font-weight: 800;' : ''}">${t.timeDisplay}</div>
                    ${authorBadge}
                `;
                
                item.addEventListener('click', async () => {
                    triggerHaptic('light');
                    const isDone = set.has(t.id);
                    if (isDone) {
                        set.delete(t.id);
                        completedMeta.delete(t.id);
                        item.classList.remove('done');
                    } else {
                        set.add(t.id);
                        // Sofort lokalen Meta-Eintrag für sofortige Anzeige
                        const selfAuthor = window.AUTH && AUTH.user ? `${AUTH.user.first_name} ${AUTH.user.last_name}` : 'Unbekannt';
                        completedMeta.set(t.id, { author: selfAuthor, completed_at: new Date().toISOString() });
                        item.classList.add('done');
                        const xpMap = { 'auslass': 15, 'cleaning': 20, 'poster': 10 };
                        awardXP(xpMap[t.type] || 5, `${t.type.toUpperCase()} erledigt`);
                        
                        // Show Oli Success
                        showOliToast('Saubere Arbeit! 🌟', 'success');
                    }
                    
                    // Optimistic UI Update
                    saveTaskState();
                    renderLiveTasks();
                    
                    // Background Sync
                    await syncTaskState(t.id, t.type, !isDone, t.title);
                    // Final re-render to catch any server-side info (like author/timestamp)
                    renderLiveTasks();
                });
                
                list.appendChild(item);
            });

            const totalActive = liveTasks.filter(t => {
                const set = t.type === 'cleaning' ? completedCleaning : (t.type === 'auslass' ? completedAuslaesse : completedPosters);
                return !set.has(t.id);
            }).length;

            badge.textContent = totalActive;
            container.style.display = 'block'; // Always display the container, even if empty, so the user knows it's there
        }

        function getKpStationTasks(hallsGrouped, completedAuslaesse) {
            const tasks = [];
            const groups = [
                { name: 'Station 1/2', halls: ['Kino 1', 'Kino 2'] },
                { name: 'Station 3/4', halls: ['Kino 3', 'Kino 4'] },
                { name: 'Station 5/6', halls: ['Kino 5', 'Kino 6'] },
                { name: 'Station 7/8', halls: ['Kino 7', 'Kino 8'] }
            ];

            groups.forEach(group => {
                let hasUnfinishedAuslass = false;
                let lastEndMin = 0;
                let totalAuslaesse = 0;
                
                group.halls.forEach(hallName => {
                    const hall = hallsGrouped.find(h => h.name === hallName);
                    if (!hall) return;

                    const sessions = (hall.sessions || []).filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                    const auslassSessions = sessions.slice(0, -1); // Letzte Vorstellung muss nicht gesäubert werden
                    totalAuslaesse += auslassSessions.length;

                    auslassSessions.forEach(s => {
                        const [h, m] = s.time.split(':').map(Number);
                        const durationBase = (h * 60 + m) + s.duration;
                        const taskId = `auslass-${hallName.replace(/\s+/g, '-')}-${s.time}`;
                        
                        // Check if this specific auslass is checked off
                        if (!completedAuslaesse.has(taskId)) {
                            hasUnfinishedAuslass = true;
                        }
                        lastEndMin = Math.max(lastEndMin, durationBase);
                    });
                });

                // Wenn es Auslässe gab und ALLE für diese Station abgehakt sind, ist Abbau fällig
                if (totalAuslaesse > 0 && !hasUnfinishedAuslass) {
                    tasks.push({
                        type: 'abbau',
                        hall: 'ABBAU',
                        title: `${group.name} abbauen`,
                        time: lastEndMin,
                        timeDisplay: 'Jetzt',
                        triggerMin: lastEndMin,
                        id: `abbau-${group.name.replace('/', '-')}`
                    });
                }
            });
            return tasks;
        }





        function renderStats(hallsGrouped) {
            try {
                if (!hallsGrouped || !Array.isArray(hallsGrouped)) return;
                const container = document.getElementById('stats-section-container');
                const grid = document.getElementById('stats-grid');
                const chart = document.getElementById('hour-chart');
                if (!container || !grid) return;
                
                const allSessions = (hallsGrouped || []).flatMap(h => h.sessions || []).filter(s => s && s.time);
            if (allSessions.length === 0) {
                grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">Keine Vorstellungsdaten für Statistiken gefunden.</div>';
                if(chart) chart.innerHTML = '';
                return;
            }

            // Trigger historical analytics loading if needed
            if (loadedHistoricalCity !== currentCity) {
                loadHistoricalStats();
            }

            // Metrics
            const hourStats = {}; // { hour: sold }
            const movieStats = {}; // { title: { sold, poster } }
            let totalSold = 0;
            let topSession = { sold: -1, capacity: 1, title: '', hall: '', poster: null };

            allSessions.forEach(s => {
                if (!s.time || !s.time.includes(':')) return;
                const hour = s.time.split(':')[0] + ':00';
                hourStats[hour] = (hourStats[hour] || 0) + s.sold;
                
                if (!movieStats[s.title]) movieStats[s.title] = { sold: 0, poster: s.poster, movieLink: s.movieLink };
                movieStats[s.title].sold += s.sold;
                
                totalSold += s.sold;

                const occupancy = s.capacity > 0 ? s.sold / s.capacity : 0;
                const currentTopOcc = topSession.capacity > 0 ? topSession.sold / topSession.capacity : 0;
                if (occupancy > currentTopOcc) {
                    topSession = s;
                }
            });

            // Update live header badge
            const liveWidget = document.getElementById('occupancy-widget');
            const liveVal = document.getElementById('live-occupancy');
            if (liveWidget && liveVal) {
                liveVal.innerText = totalSold;
                liveWidget.style.display = 'flex';
            }

            // Top Film
            let topMovie = { title: 'Keine Daten', sold: 0, poster: null };
            for (const [title, stats] of Object.entries(movieStats)) {
                if (stats.sold > topMovie.sold) topMovie = { title, sold: stats.sold, poster: stats.poster, movieLink: stats.movieLink };
            }

            // Peak Hour
            let peakHour = { time: '--:--', sold: 0 };
            for (const [time, sold] of Object.entries(hourStats)) {
                if (sold > peakHour.sold) peakHour = { time, sold };
            }

            grid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-label">System-Status</div>
                    <div class="stat-value" style="font-size: 1.2rem; color: #3498db;">SYSTEM OK</div>
                    <div class="stat-subtext" style="font-family: monospace; font-size: 0.7rem; opacity: 0.6;">${SYSTEM_VERSION}</div>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Gesamtbesucher</span>
                    <span class="stat-value">${totalSold}</span>
                    <div class="stat-subtext">Tickets heute</div>
                </div>
                <div class="stat-card poster-card" onclick="openMovieDetail('${topMovie.movieLink || ''}')" style="cursor: pointer;">
                    ${topMovie.poster ? `<img src="${topMovie.poster}" class="stat-poster">` : ''}
                    <div class="stat-info">
                        <span class="stat-label">Top Film</span>
                        <span class="stat-value" style="font-size: 1.3rem; line-height: 1.2;">${topMovie.title}</span>
                        <div class="stat-subtext">${topMovie.sold} Besucher</div>
                    </div>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Peak Time</span>
                    <span class="stat-value">${peakHour.time}</span>
                    <div class="stat-subtext">${peakHour.sold} Besucher gleichzeitig</div>
                </div>
                <div class="stat-card poster-card" onclick="openMovieDetail('${topSession.movieLink || ''}')" style="cursor: pointer;">
                    ${topSession.poster ? `<img src="${topSession.poster}" class="stat-poster">` : ''}
                    <div class="stat-info">
                        <span class="stat-label">Bestausgelastet</span>
                        <span class="stat-value" style="font-size: 1.3rem;">${topSession.sold} / ${topSession.capacity}</span>
                        <div class="stat-subtext">${topSession.title} (${topSession.hall})</div>
                    </div>
                </div>
            `;

            // Render Chart
            chart.innerHTML = '';
            const sortedHours = Object.keys(hourStats).sort();
            const maxHourSold = Math.max(...Object.values(hourStats), 1);

            sortedHours.forEach(hour => {
                const sold = hourStats[hour];
                const heightPct = (sold / maxHourSold) * 100;
                
                // Heatmap Color: vivid gradients based on visitor load
                let barColor;
                const ratio = sold / maxHourSold;
                if (ratio < 0.3)      barColor = 'linear-gradient(to top, #0078ff, #00c6ff)';   // Blue
                else if (ratio < 0.6) barColor = 'linear-gradient(to top, #f1c40f, #f39c12)';   // Yellow
                else if (ratio < 0.8) barColor = 'linear-gradient(to top, #e67e22, #f1c40f)';   // Orange
                else                  barColor = 'linear-gradient(to top, #e50914, #ff6b35)';   // Red/Peak
                
                const barWrapper = document.createElement('div');
                barWrapper.className = 'hour-bar-wrapper';
                barWrapper.innerHTML = `
                    <div class="hour-bar" style="height: ${heightPct}%; background: ${barColor}; box-shadow: 0 0 8px rgba(255,255,255,0.15);" data-value="${sold}"></div>
                    <span class="hour-label">${hour}</span>
                `;
                chart.appendChild(barWrapper);
            });
            } catch (error) {
                console.error("Error in renderStats:", error);
                const grid = document.getElementById('stats-grid');
                if (grid) grid.innerHTML = `<div style="color: red; padding: 2rem;">Error in renderStats: ${error.message}</div>`;
            }
        }

        // ============================================================
        // FEATURE 3: BELEGUNGS-HEATMAP & HISTORISCHE AUSLASTUNG
        // ============================================================
        let loadedHistoricalCity = null;
        async function loadHistoricalStats() {
            const trendContainer = document.getElementById('trend-line-chart');
            const movieContainer = document.getElementById('history-movies-list');
            const hourlyContainer = document.getElementById('hourly-occupancy-avg-chart');
            if (!trendContainer || !movieContainer || !hourlyContainer) return;

            const city = currentCity;
            loadedHistoricalCity = city;

            try {
                const res = await fetch(`/api/stats/occupancy-history?location=${city}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                
                if (data.error) throw new Error(data.error);

                // Render components
                renderTrendChart(data.trend || []);
                renderHourlyAvgChart(data.hourly || []);
                renderTopMoviesList(data.movies || []);

            } catch (err) {
                console.error("Error loading historical stats:", err);
                trendContainer.innerHTML = `<div style="text-align: center; color: #ff4d4d; line-height: 180px;">Fehler beim Laden: ${err.message}</div>`;
                movieContainer.innerHTML = `<div style="text-align: center; color: #ff4d4d; padding: 1.5rem;">Fehler beim Laden</div>`;
                hourlyContainer.innerHTML = `<div style="text-align: center; color: #ff4d4d; line-height: 100px;">Fehler beim Laden</div>`;
                loadedHistoricalCity = null;
            }
        }
        window.loadHistoricalStats = loadHistoricalStats;

        function renderTrendChart(trendData) {
            const container = document.getElementById('trend-line-chart');
            if (!container) return;
            
            if (trendData.length === 0) {
                container.innerHTML = `<div style="text-align: center; color: var(--text-muted); line-height: 180px;">Keine historischen Daten verfügbar</div>`;
                return;
            }

            const values = trendData.map(d => d.total_visitors);
            const maxVal = Math.max(...values, 100);
            const minVal = 0;

            const width = 600;
            const height = 220;
            const padLeft = 45;
            const padRight = 20;
            const padTop = 25;
            const padBottom = 35;
            
            const usableW = width - padLeft - padRight;
            const usableH = height - padTop - padBottom;

            const points = trendData.map((d, i) => {
                const x = padLeft + (i * usableW) / (trendData.length - 1);
                const y = padTop + usableH - ((d.total_visitors - minVal) / (maxVal - minVal)) * usableH;
                return { x, y, date: d.date, value: d.total_visitors };
            });

            let svgHtml = `<svg viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="overflow: visible; display: block;">`;
            
            const gridCount = 4;
            for (let i = 0; i <= gridCount; i++) {
                const y = padTop + (i * usableH) / gridCount;
                const value = Math.round(maxVal - (i * (maxVal - minVal)) / gridCount);
                svgHtml += `<line x1="${padLeft}" y1="${y}" x2="${width - padRight}" y2="${y}" stroke="rgba(255,255,255,0.05)" stroke-dasharray="4,4" />`;
                svgHtml += `<text x="${padLeft - 10}" y="${y + 4}" fill="rgba(255,255,255,0.4)" font-size="10" text-anchor="end" font-weight="bold">${value}</text>`;
            }

            let areaPath = `M ${points[0].x},${padTop + usableH} `;
            points.forEach(p => {
                areaPath += `L ${p.x},${p.y} `;
            });
            areaPath += `L ${points[points.length - 1].x},${padTop + usableH} Z`;

            let linePath = `M ${points[0].x},${points[0].y} `;
            for (let i = 1; i < points.length; i++) {
                linePath += `L ${points[i].x},${points[i].y} `;
            }

            svgHtml += `
                <defs>
                    <linearGradient id="trendAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.25" />
                        <stop offset="100%" stop-color="#00f2fe" stop-opacity="0.0" />
                    </linearGradient>
                    <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#00f2fe" flood-opacity="0.3" />
                    </filter>
                </defs>
            `;

            svgHtml += `<path d="${areaPath}" fill="url(#trendAreaGradient)" />`;
            svgHtml += `<path d="${linePath}" fill="none" stroke="#00f2fe" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" filter="url(#glowFilter)" />`;

            points.forEach((p, idx) => {
                let displayDateStr = p.date;
                try {
                    const parsedDate = new Date(p.date);
                    displayDateStr = parsedDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                } catch(e) {}

                svgHtml += `
                    <g class="chart-point-group" style="cursor: pointer;">
                        <circle cx="${p.x}" cy="${p.y}" r="4" fill="#00f2fe" stroke="#1c1c1e" stroke-width="2" />
                        <circle cx="${p.x}" cy="${p.y}" r="14" fill="transparent" class="hover-trigger" data-date="${displayDateStr}" data-val="${p.value}" />
                    </g>
                `;

                if (idx % 2 === 0 || idx === points.length - 1) {
                    svgHtml += `<text x="${p.x}" y="${padTop + usableH + 20}" fill="rgba(255,255,255,0.4)" font-size="10" text-anchor="middle">${displayDateStr}</text>`;
                }
            });

            svgHtml += `</svg>`;
            svgHtml += `<div id="chart-tooltip" style="position: absolute; display: none; background: rgba(0,0,0,0.85); backdrop-filter: blur(8px); padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); font-size: 0.8rem; color: white; pointer-events: none; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-weight: bold; white-space: nowrap;"></div>`;
            
            container.innerHTML = svgHtml;

            const triggers = container.querySelectorAll('.hover-trigger');
            const tooltip = container.querySelector('#chart-tooltip');

            triggers.forEach(trig => {
                trig.addEventListener('mouseenter', (e) => {
                    const date = e.target.getAttribute('data-date');
                    const val = e.target.getAttribute('data-val');
                    tooltip.innerHTML = `Datum: ${date}<br><span style="color: #00f2fe;">Besucher: ${val}</span>`;
                    tooltip.style.display = 'block';
                });

                trig.addEventListener('mousemove', (e) => {
                    const rect = container.getBoundingClientRect();
                    const x = e.clientX - rect.left + 15;
                    const y = e.clientY - rect.top - 45;
                    tooltip.style.left = `${x}px`;
                    tooltip.style.top = `${y}px`;
                });

                trig.addEventListener('mouseleave', () => {
                    tooltip.style.display = 'none';
                });
            });
        }

        function renderHourlyAvgChart(hourlyData) {
            const chart = document.getElementById('hourly-occupancy-avg-chart');
            if (!chart) return;

            if (hourlyData.length === 0) {
                chart.innerHTML = `<div style="text-align: center; color: var(--text-muted); width: 100%; line-height: 100px;">Keine stündlichen Belegungsdaten verfügbar</div>`;
                return;
            }

            chart.innerHTML = '';
            const maxVal = Math.max(...hourlyData.map(d => d.avg_occupancy_percent), 1);

            hourlyData.forEach(h => {
                const avgPercent = h.avg_occupancy_percent || 0;
                const heightPct = (avgPercent / maxVal) * 100;
                
                let barColor;
                if (avgPercent < 15)       barColor = 'linear-gradient(to top, #e50914, #b20710)';
                else if (avgPercent < 30)  barColor = 'linear-gradient(to top, #f1c40f, #f39c12)';
                else if (avgPercent < 50)  barColor = 'linear-gradient(to top, #e67e22, #d35400)';
                else                       barColor = 'linear-gradient(to top, #e74c3c, #c0392b)';
                
                const barWrapper = document.createElement('div');
                barWrapper.className = 'hour-bar-wrapper';
                barWrapper.innerHTML = `
                    <div class="hour-bar" style="height: ${heightPct}%; background: ${barColor}; box-shadow: 0 0 8px rgba(255,255,255,0.15);" data-value="${avgPercent.toFixed(1)}%"></div>
                    <span class="hour-label">${h.hour_bucket}</span>
                `;
                chart.appendChild(barWrapper);
            });
        }

        function renderTopMoviesList(moviesData) {
            const container = document.getElementById('history-movies-list');
            if (!container) return;

            if (moviesData.length === 0) {
                container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 1.5rem;">Keine Top-Filme in den letzten 30 Tagen gefunden</div>`;
                return;
            }

            const maxSold = Math.max(...moviesData.map(m => m.total_sold), 1);

            container.innerHTML = moviesData.map((m, idx) => {
                const pct = (m.total_sold / maxSold) * 100;
                let barColor = 'linear-gradient(90deg, #f1c40f, #f39c12)';
                if (idx === 1) barColor = 'linear-gradient(90deg, #bdc3c7, #95a5a6)';
                else if (idx === 2) barColor = 'linear-gradient(90deg, #e67e22, #d35400)';
                else if (idx > 2) barColor = 'linear-gradient(90deg, #3498db, #2980b9)';
                
                return `
                    <div style="background: rgba(255,255,255,0.02); padding: 0.75rem 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 0.4rem; transition: transform 0.2s; cursor: default;" onmouseover="this.style.transform='translateX(4px)'" onmouseout="this.style.transform='none'">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: 700; color: white; font-size: 0.95rem;">${idx + 1}. ${m.title}</span>
                            <span style="font-weight: 800; color: #fff; font-size: 0.9rem; background: rgba(255,255,255,0.08); padding: 0.2rem 0.6rem; border-radius: 6px;">${m.total_sold.toLocaleString('de-DE')} Besucher</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${pct}%; height: 100%; background: ${barColor}; border-radius: 3px; transition: width 0.6s cubic-bezier(0.1, 1, 0.1, 1);"></div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // ============================================================
        // FEATURE 4: CONCESSION CALCULATORS & TIMERS
        // ============================================================
        function switchConcessionTab(tabName) {
            document.querySelectorAll('.concession-tab-content').forEach(el => {
                el.style.display = 'none';
            });
            document.getElementById(`concession-${tabName}`).style.display = 'block';
            
            const container = document.getElementById('concession-recipes-content');
            container.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'transparent';
                btn.style.border = '1px solid transparent';
                btn.style.color = 'var(--text-muted)';
            });
            
            const activeBtn = document.getElementById(`tab-${tabName}`);
            if (activeBtn) {
                activeBtn.classList.add('active');
                activeBtn.style.background = 'rgba(255,255,255,0.08)';
                activeBtn.style.border = '1px solid rgba(255,255,255,0.1)';
                activeBtn.style.color = 'white';
            }
        }
        window.switchConcessionTab = switchConcessionTab;

        function calculatePopcornIngredients() {
            const size = parseInt(document.getElementById('popcorn-kettle-size').value) || 16;
            const batches = parseInt(document.getElementById('popcorn-batches').value) || 1;
            
            let baseMais = 500;
            let baseOil = 250;
            let baseSugar = 250;
            
            if (size === 8) {
                baseMais = 250;
                baseOil = 125;
                baseSugar = 125;
            } else if (size === 32) {
                baseMais = 1000;
                baseOil = 500;
                baseSugar = 500;
            }
            
            document.getElementById('popcorn-mais-qty').textContent = (baseMais * batches) + 'g';
            document.getElementById('popcorn-oil-qty').textContent = (baseOil * batches) + 'g';
            document.getElementById('popcorn-sugar-qty').textContent = (baseSugar * batches) + 'g';
        }
        window.calculatePopcornIngredients = calculatePopcornIngredients;

        function calculateNachoIngredients() {
            const portions = parseInt(document.getElementById('nacho-portions').value) || 1;
            const cheeseKg = (portions * 90) / 1000;
            const cheeseBags = (portions * 90) / 3200;
            const chipsKg = (portions * 125) / 1000;
            
            document.getElementById('nacho-cheese-qty').textContent = `${cheeseKg.toFixed(1)} kg (ca. ${cheeseBags.toFixed(1)} Btl.)`;
            document.getElementById('nacho-chips-qty').textContent = `${chipsKg.toFixed(1)} kg (ca. ${portions} Ttn.)`;
        }
        window.calculateNachoIngredients = calculateNachoIngredients;

        function calculateSlushyMix() {
            const liters = parseFloat(document.getElementById('slushy-liters').value) || 0;
            const syrup = liters / 5;
            const water = (liters * 4) / 5;
            
            document.getElementById('slushy-syrup-qty').textContent = `${syrup.toFixed(1)} L`;
            document.getElementById('slushy-water-qty').textContent = `${water.toFixed(1)} L`;
        }
        window.calculateSlushyMix = calculateSlushyMix;

        let concessionTimers = {};
        function toggleConcessionTimer(timerId, defaultDuration) {
            const display = document.getElementById(`timer-${timerId}-display`);
            const btn = document.getElementById(`btn-${timerId}`);
            const container = document.getElementById(`timer-${timerId}-container`);
            
            if (concessionTimers[timerId]) {
                clearInterval(concessionTimers[timerId].interval);
                delete concessionTimers[timerId];
                
                btn.textContent = 'Start';
                btn.style.background = timerId === 'kettle-dump' ? '#ff3d47' : '#e50914';
                display.textContent = formatTimeSecs(defaultDuration);
                container.style.animation = 'none';
                container.style.background = 'rgba(255,255,255,0.02)';
                return;
            }
            
            let timeLeft = defaultDuration;
            display.textContent = formatTimeSecs(timeLeft);
            btn.textContent = 'Stopp';
            btn.style.background = '#7f8c8d';
            
            const interval = setInterval(() => {
                timeLeft--;
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    delete concessionTimers[timerId];
                    display.textContent = 'FERTIG!';
                    btn.textContent = 'Start';
                    btn.style.background = timerId === 'kettle-dump' ? '#ff3d47' : '#e50914';
                    
                    container.style.animation = 'pulse-red 0.5s infinite alternate';
                    container.style.background = 'rgba(255, 61, 71, 0.2)';
                    
                    if (typeof awardXP === 'function') {
                        const xpEarned = timerId === 'kettle-dump' ? 10 : 15;
                        awardXP(xpEarned, timerId === 'kettle-dump' ? 'Kessel abgekippt' : 'Kessel gereinigt');
                    }
                    
                    playTimerChime();
                } else {
                    display.textContent = formatTimeSecs(timeLeft);
                    if (timeLeft <= 10) {
                        container.style.background = 'rgba(255, 61, 71, 0.1)';
                    }
                }
            }, 1000);
            
            concessionTimers[timerId] = { interval, timeLeft };
        }
        window.toggleConcessionTimer = toggleConcessionTimer;

        function formatTimeSecs(secs) {
            const m = Math.floor(secs / 60);
            const s = secs % 60;
            return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }

        function playTimerChime() {
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                const now = ctx.currentTime;
                
                playTone(ctx, 659.25, now, 0.4);
                playTone(ctx, 880.00, now + 0.15, 0.4);
                playTone(ctx, 1109.73, now + 0.3, 0.6);
            } catch (e) {
                console.warn("AudioContext failed to play sound", e);
            }
        }
        
        function playTone(ctx, freq, startTime, duration) {
            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, startTime);
            
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
            
            osc.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            osc.start(startTime);
            osc.stop(startTime + duration);
        }

        // ============================================================
        // FEATURE 5: SHIFT REPORT PDF GENERATION
        // ============================================================
        window.lastShiftSummary = null;
        async function downloadShiftReportPDF() {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) {
                showToast("PDF-Bibliothek konnte nicht geladen werden.", true);
                return;
            }
            
            const summary = window.lastShiftSummary || {
                duration: '0h 0m',
                auslaesse: 0,
                cleaning: 0,
                posters: 0,
                xp: 0,
                date: new Date().toLocaleDateString('de-DE'),
                time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
                username: window.AUTH && AUTH.user ? (AUTH.user.name || `${AUTH.user.first_name} ${AUTH.user.last_name}`) : (localStorage.getItem('kinopolis_shift_name') || 'Mitarbeiter'),
                role: window.AUTH && AUTH.user ? (AUTH.user.role || 'user') : 'user',
                location: currentCity.toUpperCase()
            };
            
            showToast("Generiere PDF-Bericht...");
            
            let todayLogs = [];
            try {
                const res = await fetch(`/api/logs?location=${currentCity}`);
                if (res.ok) {
                    const allLogs = await res.json();
                    const authorSearch = summary.username.toLowerCase();
                    const todayStr = new Date().toISOString().split('T')[0];
                    todayLogs = (allLogs || []).filter(l => {
                        const logDate = new Date(l.created_at).toISOString().split('T')[0];
                        const logAuthor = (l.author || '').toLowerCase();
                        return logDate === todayStr && (logAuthor.includes(authorSearch) || authorSearch.includes(logAuthor));
                    });
                }
            } catch(e) {
                console.error("Failed to fetch logs for PDF:", e);
            }
            
            const doc = new jsPDF();
            const primaryColor = [229, 9, 20];
            const secondaryColor = [31, 31, 31];
            
            doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
            doc.rect(0, 0, 210, 40, 'F');
            
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.rect(0, 40, 210, 3, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(22);
            doc.text('KINOPOLIS AUTOMATION', 15, 20);
            
            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(10);
            doc.text('OFFIZIELLER SCHICHTÜBERGABE-REPORT', 15, 30);
            
            doc.text(`Standort: ${summary.location}`, 195, 20, { align: 'right' });
            doc.text(`Datum: ${summary.date} ${summary.time}`, 195, 30, { align: 'right' });
            
            doc.setTextColor(0, 0, 0);
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(14);
            doc.text('1. Stammdaten', 15, 55);
            
            const roleNames = {
                'admin': 'Betriebsleitung (Admin)',
                'BL': 'Betriebsleitung (BL)',
                'TL': 'Teamleitung (TL)',
                'user': 'Kino-Team'
            };
            const displayRole = roleNames[summary.role] || summary.role || 'Mitarbeiter';
            
            const stammdatenData = [
                ['Mitarbeiter:', summary.username],
                ['Rolle:', displayRole],
                ['Schichtdauer:', summary.duration],
                ['Verdiente XP:', `${summary.xp} XP`]
            ];
            
            doc.autoTable({
                startY: 60,
                body: stammdatenData,
                theme: 'plain',
                styles: { fontSize: 10, cellPadding: 2.5 },
                columnStyles: { 0: { fontStyle: 'bold', width: 40 } },
                margin: { left: 15, right: 15 }
            });
            
            let currentY = doc.previousAutoTable.finalY + 12;
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(14);
            doc.text('2. Erledigte Aufgaben', 15, currentY);
            
            const statsData = [
                ['Auslässe durchgeführt:', String(summary.auslaesse)],
                ['Reinigungsaufgaben / SOPs:', String(summary.cleaning)],
                ['Posterwechsel durchgeführt:', String(summary.posters)]
            ];
            
            doc.autoTable({
                startY: currentY + 5,
                body: statsData,
                theme: 'striped',
                styles: { fontSize: 10, cellPadding: 3 },
                headStyles: { fillColor: primaryColor },
                columnStyles: { 0: { fontStyle: 'bold', width: 60 } },
                margin: { left: 15, right: 15 }
            });
            
            currentY = doc.previousAutoTable.finalY + 12;
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(14);
            doc.text('3. Deine Logbuch-Einträge von heute', 15, currentY);
            
            if (todayLogs.length === 0) {
                doc.setFont('Helvetica', 'italic');
                doc.setFontSize(10);
                doc.setTextColor(100, 100, 100);
                doc.text('Keine Logbuch-Einträge für diese Schicht erfasst.', 15, currentY + 6);
                doc.setTextColor(0, 0, 0);
            } else {
                const logsTableBody = todayLogs.map(l => {
                    const time = new Date(l.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                    const priority = l.priority === 'dringend' ? '🔴 Dringend' : (l.priority === 'wichtig' ? '⚠️ Wichtig' : 'Normal');
                    return [time, l.message, priority];
                });
                
                doc.autoTable({
                    startY: currentY + 5,
                    head: [['Uhrzeit', 'Nachricht / Eintrag', 'Priorität']],
                    body: logsTableBody,
                    theme: 'grid',
                    styles: { fontSize: 9, cellPadding: 3 },
                    headStyles: { fillColor: secondaryColor, textColor: [255, 255, 255] },
                    columnStyles: { 
                        0: { width: 20 },
                        1: { cellWidth: 'auto' },
                        2: { width: 30 }
                    },
                    margin: { left: 15, right: 15 }
                });
            }
            
            const pageCount = doc.internal.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(150, 150, 150);
                doc.text('Kinopolis Automation Shift Report — Vertraulich', 15, 287);
                doc.text(`Seite ${i} von ${pageCount}`, 195, 287, { align: 'right' });
            }
            
            const safeName = summary.username.replace(/[^a-z0-9]/gi, '_').toLowerCase();
            const safeDate = summary.date.replace(/\./g, '-');
            doc.save(`Kinopolis_Schichtbericht_${safeName}_${safeDate}.pdf`);
            showToast("✅ PDF erfolgreich heruntergeladen!");
        }
        window.downloadShiftReportPDF = downloadShiftReportPDF;
        
        function calculateEndTime(startTime, duration) {
            if (!startTime || typeof startTime !== 'string' || !startTime.includes(':')) return '--:--';
            const [h, m] = startTime.split(':').map(Number);
            const totalMinutes = h * 60 + m + duration;
            const endH = Math.floor(totalMinutes / 60) % 24;
            const endM = totalMinutes % 60;
            return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
        }

        function getFskTagsHtml(s) {
            if (!s.fsk || s.fsk === 'FSK ?') return '';
            
            let endTotalMin = 0;
            if (s.time && s.time.includes(':')) {
                const [h, m] = s.time.split(':').map(Number);
                const startMin = h * 60 + m;
                let endH = Math.floor((startMin + s.duration) / 60);
                const endM = (startMin + s.duration) % 60;
                if (h >= 0 && h < 6) { endH += 24; }
                else if (endH < 6) { endH += 24; }
                else if (endH < h) { endH += 24; }
                endTotalMin = endH * 60 + endM;
            }

            let bgColor = 'var(--glass-border)'; let color = '#fff'; let fskAge = 0;
            const ageMatch = s.fsk.match(/(\d+)/);
            if (ageMatch) fskAge = parseInt(ageMatch[1]);
            
            if (s.fsk === 'FSK 0') { bgColor = '#f8f9fa'; color = '#000'; }
            else if (s.fsk === 'FSK 6') { bgColor = '#f1c40f'; color = '#000'; }
            else if (s.fsk === 'FSK 12') { bgColor = '#2ecc71'; color = '#000'; }
            else if (s.fsk === 'FSK 16') { bgColor = '#3498db'; color = '#fff'; }
            else if (s.fsk === 'FSK 18') { bgColor = '#e74c3c'; color = '#fff'; }

            let html = `<span class="tag" style="background: ${bgColor}; color: ${color}; border: 1px solid rgba(0,0,0,0.1); font-weight: bold; width: fit-content; text-shadow: 0px 1px 2px rgba(0,0,0,0.1); box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${s.fsk}</span>`;
            
            let juschgAge = 0;
            let timeReason = '';
            // §11 JuSchG: Jugendliche ab 16 Jahren, wenn die Vorführung nach 24 Uhr beendet ist. -> ab 18
            if (endTotalMin > 24 * 60) { juschgAge = 18; timeReason = '> 24 Uhr'; }
            // §11 JuSchG: Jugendliche unter 16 Jahren, wenn die Vorführung nach 22 Uhr beendet ist. -> ab 16
            else if (endTotalMin > 22 * 60) { juschgAge = 16; timeReason = '> 22 Uhr'; }
            // §11 JuSchG: Kindern ab sechs Jahren, wenn die Vorführung nach 20 Uhr beendet ist. -> ab 14
            else if (endTotalMin > 20 * 60) { juschgAge = 14; timeReason = '> 20 Uhr'; }
            
            if (juschgAge > fskAge && fskAge !== 18) {
                html += `<span class="tag" style="background: rgba(0,0,0,0.5); color: #ffeb3b; border: 1px dashed #ffeb3b; font-weight: bold; margin-left: 0.25rem;" title="Jugendschutz: Ende ${timeReason}">⏰ ab ${juschgAge} (Ende ${timeReason})</span>`;
            }
            return html;
        }

        function toggleHall(header, hallName) {
            if (!header) return;
            const sessionsList = header.closest('.hall-card')?.querySelector('.hall-sessions-list');
            if (!sessionsList) return;
            
            const wasCollapsed = header.classList.contains('collapsed');
            
            // Toggle classes
            header.classList.toggle('collapsed', !wasCollapsed);
            sessionsList.classList.toggle('collapsed', !wasCollapsed);
            
            if (hallName) sessionStorage.setItem(`hall_collapsed_${hallName}`, !wasCollapsed);
        }

        const POSTER_URGENT_POPUP_DELAY_MS = 1600;
        window._posterUrgentQueue = window._posterUrgentQueue || [];
        window.posterUrgentSnoozeUntil = window.posterUrgentSnoozeUntil || 0;
        window._posterModalTimer = window._posterModalTimer || null;

        function snoozePosterUrgentPopup() {
            window.posterUrgentSnoozeUntil = Date.now() + 15 * 60 * 1000;
            const modal = document.getElementById('poster-urgent-modal');
            if (modal) modal.classList.remove('active');
            const body = document.getElementById('poster-urgent-modal-body');
            if (body) body.innerHTML = '';
        }

        function showPosterUrgentModalStep(queue) {
            const q = (queue || []).filter(a => a && a.alertId && !completedPosters.has(a.alertId));
            window._posterUrgentQueue = q;
            const modal = document.getElementById('poster-urgent-modal');
            const body = document.getElementById('poster-urgent-modal-body');
            if (!modal || !body) return;
            if (!q.length) {
                modal.classList.remove('active');
                body.innerHTML = '';
                return;
            }
            const a = q[0];
            body.innerHTML = '';
            body.appendChild(createPosterAlertElement(a.hallName, a.nextMovie, a.isEndDay, a.alertId));
            modal.classList.add('active');
        }

        function schedulePosterUrgentModal(posterQueue) {
            const pending = (posterQueue || []).filter(a => a && a.alertId && !completedPosters.has(a.alertId));
            window._posterUrgentQueue = pending;
            clearTimeout(window._posterModalTimer);
            if (!pending.length) {
                const modal = document.getElementById('poster-urgent-modal');
                if (modal) modal.classList.remove('active');
                const body = document.getElementById('poster-urgent-modal-body');
                if (body) body.innerHTML = '';
                return;
            }
            if (Date.now() < (window.posterUrgentSnoozeUntil || 0)) return;
            const modalEl = document.getElementById('poster-urgent-modal');
            const showingId = document.querySelector('#poster-urgent-modal-body .poster-change-alert')?.dataset?.alertId;
            if (modalEl && modalEl.classList.contains('active') && showingId && pending[0] && showingId === pending[0].alertId) {
                return;
            }
            window._posterModalTimer = setTimeout(() => {
                if (Date.now() < (window.posterUrgentSnoozeUntil || 0)) return;
                showPosterUrgentModalStep(window._posterUrgentQueue);
            }, POSTER_URGENT_POPUP_DELAY_MS);
        }

        function updateAlerts(hallsGrouped, tomSessionsFlat) {
            const alertsContainer = document.getElementById('poster-alerts');
            alertsContainer.innerHTML = '';

            const posterQueue = collectPosterAlerts(hallsGrouped, tomSessionsFlat);
            
            // Render posters inline instead of in popup
            posterQueue.forEach(a => {
                const alertEl = createPosterAlertElement(a.hallName, a.nextMovie, a.isEndDay, a.alertId);
                alertsContainer.appendChild(alertEl);
            });

            addOccupancyAlerts(hallsGrouped, alertsContainer);

            const count = alertsContainer.children.length;
            document.getElementById('alert-count-badge').textContent = count;

            const container = document.getElementById('poster-alerts-container');
            container.style.display = count > 0 ? 'block' : 'none';

            // schedulePosterUrgentModal is disabled to prevent popups
        }

        /** Liefert offene Plakatwechsel für Pop-up (nicht für die Inline-Liste). */
        function collectPosterAlerts(hallsGrouped, tomSessionsFlat) {
            // Posters enabled for all locations per user feedback

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const allAlerts = [];

            hallsGrouped.forEach(hall => {
                const hallName = hall.name;
                const hallSessions = hall.sessions.filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                if (hallSessions.length === 0) return;

                let latestAlert = null;

                hallSessions.forEach((s, idx) => {
                    const [sh, sm] = s.time.split(':').map(Number);
                    const changeMin = (sh * 60 + sm) + 20;

                    // Expiration: If alert is older than 4 hours (240 mins), hide it
                    if (currentMinutes >= changeMin && (currentMinutes - changeMin) < 240) {
                        if (idx < hallSessions.length - 1) { // Normal change
                            const nextMovie = hallSessions[idx + 1];
                            
                            // SKIP IF SAME MOVIE
                            if (s.title === nextMovie.title) return;

                            const alertId = `poster-${hallName}-${nextMovie.title}-${nextMovie.time}`;
                            if (!completedPosters.has(alertId)) {
                                latestAlert = {
                                    hallName,
                                    nextMovie,
                                    isEndDay: false,
                                    alertId,
                                    time: changeMin
                                };
                            }
                        } else { // Last session
                            const nextMovie = (tomSessionsFlat || []).filter(ts => ts.hall === hallName).sort((a,b) => a.time.localeCompare(b.time))[0];
                            if (nextMovie) {
                                const alertId = `poster-last-${hallName}-${nextMovie.title}`;
                                if (!completedPosters.has(alertId)) {
                                    latestAlert = {
                                        hallName,
                                        nextMovie,
                                        isEndDay: true,
                                        alertId,
                                        time: changeMin
                                    };
                                }
                            }
                        }
                    }
                });

                if (latestAlert) {
                    allAlerts.push(latestAlert);
                }
            });

            allAlerts.sort((a, b) => a.time - b.time);
            return allAlerts;
        }

        function createPosterAlertElement(hallName, nextMovie, isEndDay, alertId) {
            const alert = document.createElement('div');
            alert.className = 'poster-change-alert';
            alert.dataset.alertId = alertId;
            alert.innerHTML = `
                <div class="alert-content">
                    <div class="alert-icon-svg">
                        <svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M13.9,11l-2.4,3.1 l-1.7-2.1L7,16h10L13.9,11z"/></svg>
                    </div>
                    <div class="alert-text" style="flex: 1">
                        <h2>Plakatwechsel in <span style="white-space: nowrap">${hallName}</span></h2>
                        <p>${isEndDay ? 'Die <strong>letzte Vorstellung</strong> des Tages hat begonnen.' : 'Der Film läuft seit mindestens 20 Minuten.'} Das Plakat kann gewechselt werden.</p>
                    </div>
                    <div class="next-movie-preview">
                        ${nextMovie.poster ? `<img src="${nextMovie.poster}" class="poster-img" alt="Poster">` : ''}
                        <div class="next-movie-info">
                            <h4>Nächster Film</h4>
                            <h3>${nextMovie.title}</h3>
                            <div class="time">Start: ${nextMovie.time} ${isEndDay ? 'Uhr (Morgen)' : 'Uhr'}</div>
                        </div>
                    </div>
                    <button class="btn-done-poster" data-id="${alertId.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')}" onclick="markPosterDone(this.dataset.id, this)" style="position: relative; z-index: 100; pointer-events: auto; background: rgba(229, 9, 20, 0.15); border: 1px solid rgba(229, 9, 20, 0.3); color: #e50914; padding: 0.6rem 1.25rem; border-radius: 12px; font-weight: 800; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s ease; box-shadow: 0 4px 12px rgba(229, 9, 20, 0.1);" onmouseover="this.style.background='rgba(229, 9, 20, 0.25)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.background='rgba(229, 9, 20, 0.15)'; this.style.transform='translateY(0)';">
                        <span style="font-size: 1.1rem;">✅</span> Erledigt
                    </button>
                </div>
            `;
            return alert;
        }

        async function markPosterDone(id, btn) {
            triggerHaptic('success');
            completedPosters.add(id);
            // Sofort lokalen Meta-Eintrag setzen damit der Autor direkt sichtbar ist
            const selfAuthor = window.AUTH && AUTH.user ? `${AUTH.user.first_name} ${AUTH.user.last_name}` : 'Unbekannt';
            completedMeta.set(id, { author: selfAuthor, completed_at: new Date().toISOString() });

            // Filmtitel aus der Alert-Karte extrahieren, damit er mit der Cloud synchronisiert wird
            const alertEl = btn ? btn.closest('.poster-change-alert') : null;
            const movieTitle = alertEl ? (alertEl.querySelector('.next-movie-info h3')?.textContent?.trim() || '') : '';

            saveTaskState();
            renderLiveTasks();

            if (alertEl) {
                const inModal = !!alertEl.closest('#poster-urgent-modal-body');
                if (inModal) {
                    window._posterUrgentQueue = (window._posterUrgentQueue || []).filter(a => a.alertId !== id);
                    alertEl.remove();
                    showPosterUrgentModalStep(window._posterUrgentQueue);
                } else {
                    alertEl.style.opacity = '0';
                    alertEl.style.transform = 'scale(0.9)';
                    alertEl.style.pointerEvents = 'none';
                    setTimeout(() => {
                        alertEl.remove();
                        const alertsContainer = document.getElementById('poster-alerts');
                        if (alertsContainer) {
                            const count = alertsContainer.children.length;
                            document.getElementById('alert-count-badge').textContent = count;
                            if (count === 0) document.getElementById('poster-alerts-container').style.display = 'none';
                        }
                    }, 300);
                }
            }

            try {
                await syncTaskState(id, 'poster', true, movieTitle);
            } catch(e) {
                console.error("Poster sync failed:", e);
            }

            // Kein fetchSessions() nötig - State ist bereits lokal und in der Cloud gespeichert.
            // Die Alert-Karte wurde bereits entfernt, kein Reload erforderlich.
        }


        function addOccupancyAlerts(hallsGrouped, container) {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            hallsGrouped.forEach(hall => {
                const hallName = hall.name;
                const sessions = hall.sessions.filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));

                sessions.forEach((s, index) => {
                    const [h, m] = s.time.split(':').map(Number);
                    const startMin = h * 60 + m;
                    const diff = startMin - currentMinutes;

                    // Trigger 15 min before start if > 50 people
                    if (diff > 0 && diff <= 15 && s.sold > 50) {
                        const prevSession = index > 0 ? sessions[index - 1] : null;
                        const isZENeeded = !prevSession || prevSession.sold <= 50;

                        const alert = document.createElement('div');
                        alert.className = 'poster-change-alert occupancy-alert';
                        if (isZENeeded) {
                            alert.classList.add('ze-needed');
                        }

                        alert.innerHTML = `
                            <div class="alert-content">
                                <div class="alert-icon" style="font-size: 2.5rem;">${isZENeeded ? '🛂' : '🎟️'}</div>
                                <div class="alert-text" style="flex: 1">
                                    <h2 style="display: flex; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap; color: var(--alert-text-h2);">
                                        <span>${isZENeeded ? 'Zutrittskontrolle (ZE) nötig!' : 'Saal fast voll!'}</span>
                                        ${isZENeeded ? getFskTagsHtml(s) : ''}
                                    </h2>
                                    <p style="color: var(--alert-text-p); font-size: 0.95rem;">Der Film <strong>${s.title}</strong> in <strong>${hallName}</strong> beginnt in ${diff} Min. (${s.sold} Plätze belegt).</p>
                                    ${isZENeeded ? `<p style="color: var(--primary-blue); margin-top: 0.5rem; font-weight: 700;">⚠️ Bitte kontrolliere die Ausweise basierend auf der Uhrzeit und der FSK.</p>` : ''}
                                </div>
                            </div>
                        `;
                        container.insertBefore(alert, container.firstChild);
                    }
                });
            });
        }

        let currentFeedbackType = 'artjom';

        function openFeedback(type = 'artjom') {
            currentFeedbackType = type;
            const title = document.querySelector('#feedback-modal h2');
            const desc = document.querySelector('#feedback-modal p');
            const textarea = document.getElementById('feedback-text');
            
            if (type === 'bl') {
                title.innerText = 'Feedback an die Betriebsleitung';
                desc.innerText = 'Nachricht vertraulich an die BL senden. Andere Kollegen können das nicht lesen.';
                textarea.placeholder = 'Deine Nachricht (Anregungen, Probleme, Wünsche)...';
            } else {
                title.innerText = 'Entwickler Feedback';
                desc.innerText = 'Fehler gefunden oder gute Ideen zur Seite? Nachricht geht direkt an den Entwickler.';
                textarea.placeholder = 'Was können wir am Dashboard verbessern?';
            }
            document.getElementById('feedback-modal').classList.add('active');
        }

        function closeFeedback() {
            document.getElementById('feedback-modal').classList.remove('active');
        }

        async function sendFeedback() {
            const rawText = document.getElementById('feedback-text').value;
            if (!rawText.trim()) return alert('Bitte gib ein Feedback ein.');
            
            const prefix = currentFeedbackType === 'bl' ? '[AN BL] ' : '[MAIN DASHBOARD] ';
            const text = prefix + rawText;
            
            const contact = document.getElementById('feedback-contact')?.value || '';
            
            const btn = document.querySelector('#feedback-modal .btn-primary');
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, contact })
                });

                if(res.ok) {
                    showToast('Feedback erfolgreich gesendet! Danke.');
                    closeFeedback();
                    document.getElementById('feedback-text').value = '';
                    document.getElementById('feedback-contact').value = '';
                } else {
                    showToast('Fehler beim Senden. Bitte Server-Logs prüfen.', true);
                }
            } catch (e) {
                console.error('Feedback error:', e);
                showToast('Netzwerkfehler beim Senden.', true);
            } finally {
                btn.innerText = 'Senden';
                btn.disabled = false;
            }
        }

        // Initial load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                init();
                const params = new URLSearchParams(window.location.search);
                if (params.get('feedback') === 'true') {
                    setTimeout(() => openFeedback('bl'), 1500);
                }
            });
        } else {
            init();
            const params = new URLSearchParams(window.location.search);
            if (params.get('feedback') === 'true') {
                setTimeout(() => openFeedback('bl'), 1500);
            }
        }
        

        document.getElementById('brand-logo').onload = function() {
            this.style.display = 'block';
            this.style.background = 'transparent';
        };

        function compressImage(file, maxWidth, quality) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    URL.revokeObjectURL(img.src);
                    const aspectRatio = img.height / img.width;
                    const targetHeight = Math.round(maxWidth * aspectRatio);
                    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = maxWidth;
                    canvas.height = targetHeight;
                    ctx.drawImage(img, 0, 0, maxWidth, targetHeight);
                    
                    // Use JPEG (500px) for V2.9 - best for Llama 3.2 Vision
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", { type: 'image/jpeg' }));
                        } else {
                            reject(new Error('Canvas toBlob failed'));
                        }
                    }, 'image/jpeg', quality);
                };
                img.onerror = () => {
                    URL.revokeObjectURL(img.src);
                    reject(new Error("Image could not be loaded"));
                };
                img.src = URL.createObjectURL(file);
            });
        }

        function findScannedMatch(hallName, movieTitle) {
            if (!scannedPlanData || !Array.isArray(scannedPlanData) || scannedPlanData.length === 0) return null;
            
            // Extract hall number (e.g. "Kino 4" -> 4)
            const hallNum = hallName.match(/\d+/)?.[0];
            if (!hallNum) return null;

            return scannedPlanData.find(item => {
                if (!item || (!item.hall && !item.kino)) return false;
                
                const rawHall = item.hall || item.kino || '';
                const scanKinoNum = rawHall.match(/\d+/)?.[0];
                const matchKino = scanKinoNum === hallNum;
                
                // Fuzzy title match
                const t1 = movieTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
                const t2 = (item.movie || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const matchMovie = t1.includes(t2) || t2.includes(t1);
                
                return matchKino && matchMovie;
            });
        }

        async function unlockAI() {
            try {
                const res = await fetch('/api/ai-agree', { method: 'POST' });
                const result = await res.json();
                if (result.success) {
                    alert('✅ Modell freigeschaltet! Du kannst den Plan jetzt erneut scannen.');
                } else {
                    alert('Fehler beim Freischalten: ' + (result.error || 'Unbekannt'));
                }
            } catch (e) {
                alert('Netzwerkfehler');
            }
        }

        function toggleTheme() {
            const body = document.body;
            const icon = document.getElementById('theme-icon');
            const settingsIcon = document.getElementById('settings-theme-icon');
            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            if (icon) icon.innerText = isLight ? '☀️' : '🌙';
            if (settingsIcon) settingsIcon.innerText = isLight ? '☀️' : '🌙';
        }

        async function subscribeNewsletter() {
            const email = document.getElementById('newsletter-email').value.trim();
            const status = document.getElementById('newsletter-status');
            const city = document.getElementById('location-select').value;

            if (!email || !email.includes('@')) {
                status.innerText = '❌ Bitte eine gültige E-Mail Adresse eingeben.';
                status.style.background = 'rgba(229, 9, 20, 0.1)';
                status.style.color = '#ff6b6b';
                status.style.display = 'block';
                return;
            }

            try {
                const res = await fetch('/api/email/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, location: city })
                });

                if (res.ok) {
                    status.innerText = '✅ Erfolgreich abonniert! Du erhältst nun Updates.';
                    status.style.background = 'rgba(229, 9, 20, 0.1)';
                    status.style.color = '#e50914';
                    document.getElementById('newsletter-email').value = '';
                } else {
                    status.innerText = '❌ Fehler beim Abonnieren. Versuche es später erneut.';
                    status.style.background = 'rgba(229, 9, 20, 0.1)';
                    status.style.color = '#ff6b6b';
                }
            } catch (e) {
                status.innerText = '❌ Netzwerkfehler.';
            }
            status.style.display = 'block';
        }

        // --- DATA VISIBILITY & UTILS ---
        const MODULES = [
            { id: 'live-dashboard', name: 'Live Display', target: '#dashboard', isTab: false },
            { id: 'stats', name: 'Statistiken', target: '#stats-section-container', isTab: false },
            { id: 'kontakte', name: 'Telefonliste', target: '#tab-kontakte', isTab: true },
            { id: 'funk', name: 'Digital Funk Shop', target: '#restock-section', isTab: true },
            { id: 'news', name: 'Interne Mitteilungen', target: '#internal-news-container', isTab: false },
            { id: 'checklist', name: 'Checklisten', target: '#workstation-section', isTab: false },
            { id: 'transferlist', name: 'Transferliste', target: '#transfer-section', isTab: false },
            { id: 'lostfound', name: 'Fundbüro', target: '#ws-lostfound-container', isTab: false },
            { id: 'tasks', name: 'Aufgaben', target: '#auslaesse-section-container', isTab: false },
            { id: 'alerts', name: 'Hinweise', target: '#poster-alerts-container', isTab: false },
            { id: 'info', name: 'Filme', target: '#tab-info', isTab: true },
            { id: 'exports', name: 'Exports', target: '#export-section', isTab: false },
            { id: 'feedback', name: 'Feedback', target: '#feedback-section', isTab: false }
        ];

        function applyModuleVisibility() {
            const disabled = JSON.parse(localStorage.getItem('disabled_modules') || '[]');
            
            const targetMap = {
                'live-dashboard': '#tab-live',
                'stats': '#tab-stats',
                'kontakte': '#tab-kontakte',
                'funk': '#tab-funk',
                'info': '#tab-info',
                'news': '#internal-news-container',
                'checklist': '#workstation-section',
                'transferlist': '#transfer-section',
                'lostfound': '#ws-lostfound-container',
                'tasks': '#auslaesse-section-container',
                'alerts': '#poster-alerts-container',
                'exports': '#export-section',
                'feedback': '#feedback-section',
                'intern': '#tab-intern'
            };

            for (const [modId, selector] of Object.entries(targetMap)) {
                const el = document.querySelector(selector);
                if (el) {
                    if (disabled.includes(modId)) {
                        el.style.setProperty('display', 'none', 'important');
                    } else {
                        el.style.removeProperty('display');
                    }
                }
            }
            
            if (disabled.includes('lostfound')) {
                const opt = document.querySelector('option[value="lostfound"]');
                if (opt) opt.style.display = 'none';
            }
        }

        /** 
         * Constants moved to top
         */



        async function loadContacts() {
            try {
                const res = await fetch(`/api/contacts?location=${currentCity}`);
                if (!res.ok) throw new Error();
                let contacts = await res.json();

                // Auto-seed DB with real default contacts if empty for KP
                if (contacts.length === 0 && currentCity === 'kp') {
                    for (const c of KP_DEFAULT_CONTACTS) {
                        await fetch('/api/contacts', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ...c, location: 'kp' })
                        }).catch(() => {});
                    }
                    // Re-fetch after seeding
                    const res2 = await fetch(`/api/contacts?location=kp`);
                    if (res2.ok) contacts = await res2.json();
                    else contacts = KP_DEFAULT_CONTACTS;
                }

                // For non-KP locations with no contacts: show hint instead of KP numbers
                if (contacts.length === 0 && currentCity !== 'kp') {
                    renderContactsEmpty();
                    renderAdminContacts([]);
                    return;
                }

                renderContacts(contacts.length > 0 ? contacts : KP_DEFAULT_CONTACTS);
                renderAdminContacts(contacts);
            } catch (e) {
                console.warn("Backend contacts failed, using fallback", e);
                if (currentCity === 'kp') renderContacts(KP_DEFAULT_CONTACTS);
                else renderContactsEmpty();
            }
        }

        function renderContactsEmpty() {
            const container = document.getElementById('contacts-container');
            const loader = document.getElementById('contacts-loading');
            if (loader) loader.style.display = 'none';
            if (!container) return;
            const isAdmin = window.AUTH && AUTH.user && (AUTH.user.role === 'admin' || AUTH.user.role === 'BL');
            container.innerHTML = `
                <div style="text-align:center; padding: 3rem 1rem; color: var(--text-muted);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📞</div>
                    <h3 style="color: var(--text-main); margin-bottom: 0.5rem;">Keine Kontakte eingetragen</h3>
                    <p style="font-size: 0.9rem; line-height: 1.6;">
                        Für diesen Standort sind noch keine Telefonnummern hinterlegt.<br>
                        ${isAdmin ? 'Trage sie im <strong>Admin-Bereich → Kontakte</strong> ein.' : 'Wende dich an die Leitung oder den Admin.'}
                    </p>
                    ${isAdmin ? `<button onclick="switchTab('einstellungen', document.getElementById('tab-einstellungen'))" 
                        style="margin-top:1.5rem; padding: 0.75rem 1.5rem; border-radius:12px; background: rgba(0,120,255,0.15); 
                        border: 1px solid rgba(0,120,255,0.3); color: var(--primary-blue); font-weight:700; cursor:pointer;">
                        ⚙️ Kontakte jetzt einpflegen
                    </button>` : ''}
                </div>
            `;
            container.style.display = 'block';
        }

        function renderAdminContacts(contacts) {
            const list = document.getElementById('admin-contacts-list');
            if (!list) return;
            list.innerHTML = contacts.map(c => `
                <div style="background: rgba(255,255,255,0.05); padding: 0.75rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 0.85rem;">
                        <span style="color: var(--primary-gold);">${c.category.toUpperCase()}</span>: 
                        <strong>${c.role_name}</strong> (${c.phone_number})
                    </div>
                    <button onclick="deleteAdminContact(${c.id})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; padding: 0.5rem;">🗑️</button>
                </div>
            `).join('');
        }

        async function addAdminContact() {
            const category = document.getElementById('admin-contact-cat').value;
            const role_name = document.getElementById('admin-contact-role').value.trim();
            const phone_number = document.getElementById('admin-contact-phone').value.trim();
            if (!role_name || !phone_number) return alert("Bitte alle Felder ausfüllen!");
            try {
                const res = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location: currentCity, category, role_name, phone_number })
                });
                if (res.ok) {
                    loadContacts();
                    document.getElementById('admin-contact-role').value = '';
                    document.getElementById('admin-contact-phone').value = '';
                }
            } catch (e) { alert("Fehler beim Hinzufügen des Kontakts."); }
        }

        async function deleteAdminContact(id) {
            if (!confirm("Kontakt wirklich löschen?")) return;
            try {
                const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
                if (res.ok) loadContacts();
            } catch (e) { alert("Fehler beim Löschen"); }
        }

        function renderContacts(providedContacts) {
            const container = document.getElementById('contacts-container');
            const loader = document.getElementById('contacts-loading');
            if (!container) return;
            
            try {
                let contacts = providedContacts || [];
                
                // Ensure Management (BL/TL) are always present for KP/Darmstadt if missing in DB
                if (currentCity === 'kp') {
                    const existingCats = new Set(contacts.map(c => c.category));
                    if (!existingCats.has('bl')) {
                        contacts.push(...KP_DEFAULT_CONTACTS.filter(c => c.category === 'bl'));
                    }
                    if (!existingCats.has('tl')) {
                        contacts.push(...KP_DEFAULT_CONTACTS.filter(c => c.category === 'tl'));
                    }
                }

                if (contacts.length === 0) contacts = KP_DEFAULT_CONTACTS;

                const byCategory = {};
                for (const c of contacts) {
                    if (!byCategory[c.category]) byCategory[c.category] = [];
                    byCategory[c.category].push(c);
                }

                let html = `
                <div style="display: flex; flex-direction: column; gap: 2.5rem; margin-top: 0.5rem;">
                `;

                const order = ['bl', 'tl', 'theke', 'einlass', 'technik', 'sicherheit', 'popcornkueche', 'putzfirma'];

                order.forEach(cat => {
                    if (byCategory[cat]) {
                        html += `
                        <div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; font-weight: 800; display: flex; align-items: center; gap: 0.75rem; opacity: 0.8;">
                                <span style="width: 24px; height: 1.5px; background: linear-gradient(90deg, var(--primary-red), transparent);"></span> 
                                ${CAT_NAMES[cat] || cat}
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                ${byCategory[cat].map(c => {
                                    const info = CAT_ICONS[c.category] || { icon: '📞', bg: '' };
                                    return `
                                    <a href="tel:${c.phone_number}" class="contact-card mini" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.75rem 1rem; border-radius: 12px; text-decoration: none;">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div style="font-size: 1.2rem;">${info.icon}</div>
                                            <div style="display: flex; flex-direction: column;">
                                                <div style="font-weight: 700; color: white; font-size: 0.9rem;">${c.role_name}</div>
                                                <div style="font-size: 0.8rem; color: var(--text-muted);">${c.phone_number.replace('+49 ', '0')}</div>
                                            </div>
                                        </div>
                                        <div style="font-size: 1.1rem; opacity: 0.6;">📲</div>
                                    </a>`;
                                }).join('')}
                            </div>
                        </div>`;
                    }
                });

                html += '</div>';
                
                if (loader) loader.style.display = 'none';
                container.innerHTML = html;
                container.style.display = 'block';
            } catch (e) {
                console.error("Error rendering contacts:", e);
                if (loader) loader.innerHTML = '<div style="padding: 2rem; color: #ff4d4d;">Fehler beim Laden der Kontakte.</div>';
            }
        }



        function updateStatus(text) {
            const el = document.getElementById('current-time-display');
            if (el) el.innerText = text;
            console.log('STATUS:', text);
        }
        window.updateStatus = updateStatus;

        // Expose functions for inline HTML event handlers (onclick, etc.)
        window.toggleHall = toggleHall;
        window.cycleHallStatus = cycleHallStatus;
        window.updateTransferCount = updateTransferCount;
        window.updateEisTransferCount = updateEisTransferCount;
        window.deleteTechTicket = deleteTechTicket;
        window.setTechTicketStatus = setTechTicketStatus;
        window.printLostFoundLabel = printLostFoundLabel;
        window.deleteLfItem = deleteLfItem;
        window.fetchSessions = fetchSessions;
        window.openMovieDetail = openMovieDetail;
        window.markPosterDone = markPosterDone;
        window.switchTab = switchTab;
        window.deleteAdminContact = deleteAdminContact;
        window.endBreak = endBreak;
        window.startScanner = startScanner;

        // NOTE: init() is called by the readyState guard above (lines 7465-7489).
        // Do NOT call init() here again — it would run twice concurrently.
    


        // --- PREMIUM REVEAL ON SCROLL ---
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once revealed for performance
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        function initReveals() {
            // Apply reveal to major sections
            const targets = document.querySelectorAll('.card-container, .news-section, .stats-section, .auslaesse-container, .intern-section, .notes-section');
            targets.forEach(el => {
                el.classList.add('reveal');
                revealObserver.observe(el);
            });
        }

        // Initialize on load and also after dynamic content might have loaded
        window.addEventListener('DOMContentLoaded', initReveals);
        
        // Failsafe: if content is added dynamically, re-init after 2 seconds
        setTimeout(initReveals, 2000);
    


        // Subtle animation for help button
        setInterval(() => {
            const btn = document.getElementById('help-floating-btn');
            if (btn) {
                btn.style.transform = 'scale(1.1)';
                setTimeout(() => btn.style.transform = 'scale(1)', 500);
            }
        }, 5000);
    


// --- AI CHAT TOGGLES TO PREVENT OVERLAPS ---
function openAiChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) modal.style.display = 'flex';
    const fab = document.getElementById('ai-chat-fab');
    if (fab) fab.style.display = 'none';
    const sos = document.getElementById('help-floating-btn');
    if (sos) sos.style.display = 'none';
}
function closeAiChat() {
    const modal = document.getElementById('ai-chat-modal');
    if (modal) modal.style.display = 'none';
    const fab = document.getElementById('ai-chat-fab');
    if (fab) fab.style.display = 'flex';
    const sos = document.getElementById('help-floating-btn');
    if (sos) sos.style.display = 'flex';
}

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
    
    // Request Push Notification Permission
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
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
    container.innerHTML += `<div style="background: rgba(255,255,255,0.1); padding: 0.75rem; border-radius: 12px; align-self: flex-end; max-width: 85%;">${msg}</div>`;
    container.scrollTop = container.scrollHeight;
    
    // Loading indicator
    const loadingId = 'loading-' + Date.now();
    container.innerHTML += `<div id="${loadingId}" style="align-self: flex-start; font-size: 0.8rem; color: var(--text-muted);">KI denkt nach...</div>`;
    
    setTimeout(() => {
        document.getElementById(loadingId).remove();
        
        let reply = "Da bin ich als Bär überfragt! 🐾 Ich lerne noch. Frag mich nach Popcorn!";
        const m = msg.toLowerCase();
        
        if (m.includes('hallo') || m.includes('hi')) {
            reply = "Bärenstarkes Hallo! 🐻 Wie kann ich helfen?";
        } else if (m.includes('popcorn')) {
            reply = "Popcorn? Lecker! 🍿 Am besten süß und salzig gemischt!";
        } else if (m.includes('ticket')) {
            reply = "Tickets kannst du ganz einfach oben im 'Scanner' Tab kontrollieren.";
        } else if (m.includes('pause')) {
            reply = "Pausen sind wichtig! Nutze dafür den Pausen-Timer im 'Tools' Tab.";
        } else if (m.includes('film')) {
            reply = "Für Filminfos schau mal im Tab 'Filme' vorbei. 🎬";
        }

        container.innerHTML += `<div style="background: rgba(226, 28, 43, 0.1); border: 1px solid rgba(226, 28, 43, 0.3); padding: 0.75rem; border-radius: 12px; align-self: flex-start; max-width: 85%; color: white;"><span style="font-weight:bold; color:var(--primary-red);">OLI:</span> ${reply}</div>`;
        container.scrollTop = container.scrollHeight;
    }, 1000);
}

// --- ANALYTICS & WEATHER ---
async function loadAnalytics() {
    try {
        // Load Weather
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
            const wData = await wRes.json();
            if (wData.current_weather) {
                document.getElementById('weather-temp').innerText = wData.current_weather.temperature + ' °C';
                let icon = '☀️';
                if (wData.current_weather.weathercode > 50) icon = '🌧️';
                else if (wData.current_weather.weathercode > 1) icon = '☁️';
                document.getElementById('weather-icon').innerText = icon;
                
                const factor = icon === '🌧️' ? '+20%' : 'Normal';
                document.getElementById('weather-desc').innerText = `Erwarteter Andrang: ${factor}`;
            }
        });

        // Load Chart
        let aData = [];
        try {
            const aRes = await fetch('/api/analytics');
            if (aRes.ok) {
                aData = await aRes.json();
            }
        } catch (e) {
            console.warn('Analytics API unavailable, using mock data.');
        }
        
        if (!aData || aData.length === 0 || !Array.isArray(aData)) {
            // Fallback Mock Data if API fails or is not implemented
            aData = [
                { date: 'Mo', visitors: 320 },
                { date: 'Di', visitors: 280 },
                { date: 'Mi', visitors: 540 },
                { date: 'Do', visitors: 410 },
                { date: 'Fr', visitors: 890 },
                { date: 'Sa', visitors: 1100 },
                { date: 'So', visitors: 950 }
            ];
        } else {
            aData.reverse(); // oldest first for chart from real API
        }

        const ctx = document.getElementById('analytics-chart').getContext('2d');
        if (window.analyticsChartInstance) {
            window.analyticsChartInstance.destroy();
        }
        window.analyticsChartInstance = new Chart(ctx, {
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
        if (!window.jspdf) {
            alert('PDF-Bibliothek lädt noch. Bitte versuche es in wenigen Sekunden erneut.');
            return;
        }
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.text("Kinopolis Tagesbericht", 14, 20);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(130);
        doc.text("Datum: " + new Date().toLocaleDateString() + " | Standort: " + currentCity.toUpperCase(), 14, 28);
        doc.setTextColor(0);

        let y = 40;
        const sessions = window._lastHallsGrouped || [];
        let totalBesucher = 0;
        let filme = [];
        
        if (sessions.length > 0) {
            sessions.forEach(h => {
                if(h.sessions) {
                    h.sessions.forEach(s => {
                        totalBesucher += (s.sold || 0);
                        filme.push({ titel: s.title, besucher: s.sold || 0, saal: h.hall });
                    });
                }
            });
            
            // Sort by visitors descending
            filme.sort((a, b) => b.besucher - a.besucher);

            doc.setFontSize(14);
            doc.text(`Tagesbesucher Gesamt: ${totalBesucher}`, 14, y);
            y += 10;
            
            doc.setFontSize(12);
            doc.text("Aktuelle Vorstellungen:", 14, y);
            y += 8;
            filme.slice(0, 15).forEach(f => {
                doc.setFontSize(10);
                doc.text(`- ${f.titel} (Saal ${f.saal}): ${f.besucher} Besucher`, 14, y);
                y += 6;
            });
            if (filme.length > 15) {
                doc.text(`... und ${filme.length - 15} weitere Vorstellungen.`, 14, y);
            }
        } else {
            doc.setFontSize(14);
            doc.text(`Tagesbesucher Gesamt: 0`, 14, y);
            y += 10;
            doc.setFontSize(10);
            doc.text("Keine Vorstellungen für den aktuellen Tag gefunden.", 14, y);
        }

        doc.save(`Kinopolis_Report_${currentCity}_${new Date().toISOString().split('T')[0]}.pdf`);
        
        const btn = document.querySelector('button[onclick="exportPDF()"]');
        if(btn) {
            const old = btn.innerHTML;
            btn.innerHTML = '✅ Fertig';
            setTimeout(() => btn.innerHTML = old, 2000);
        }
    } catch(e) { alert("Fehler beim PDF Export: " + e.message); }
}

function exportExcel() {
    try {
        if (typeof XLSX === 'undefined') {
            alert('Excel-Bibliothek lädt noch. Bitte versuche es in wenigen Sekunden erneut.');
            return;
        }
        
        let exportData = [];
        const sessions = window._lastHallsGrouped || [];
        
        if (sessions.length > 0) {
            sessions.forEach(h => {
                if(h.sessions) {
                    h.sessions.forEach(s => {
                        exportData.push({
                            Standort: currentCity.toUpperCase(),
                            Datum: new Date().toLocaleDateString(),
                            Zeit: s.time || '',
                            Saal: h.hall,
                            Film: s.title,
                            Besucher: s.sold || 0,
                            Kapazitaet: s.capacity || 0,
                            Auslastung: s.capacity ? Math.round((s.sold / s.capacity) * 100) + '%' : ''
                        });
                    });
                }
            });
        } else {
            exportData = [
                { Standort: currentCity.toUpperCase(), Datum: new Date().toLocaleDateString(), Hinweis: "Keine Daten vorhanden" }
            ];
        }

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Besucherzahlen");
        XLSX.writeFile(wb, `Kinopolis_Report_${currentCity}_${new Date().toISOString().split('T')[0]}.xlsx`);
        
        const btn = document.querySelector('button[onclick="exportExcel()"]');
        if(btn) {
            const old = btn.innerHTML;
            btn.innerHTML = '✅ Fertig';
            setTimeout(() => btn.innerHTML = old, 2000);
        }
    } catch(e) { alert("Fehler beim Excel Export: " + e.message); }
}



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
        
        list.innerHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid ${isExpired ? 'var(--primary-red)' : 'var(--primary-blue)'}">
                <div style="display: flex; flex-direction: column;">
                    <span style="font-weight: 600; font-size: 0.95rem;">${b.name}</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${b.duration} Min. Pause</span>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span id="timer-${b.id}" style="font-family: monospace; font-size: 1.1rem; color: ${color};">${timeStr}</span>
                    <button onclick="endBreak('${b.id}')" style="background: rgba(255,255,255,0.1); border: none; color: white; padding: 0.4rem 0.6rem; border-radius: 6px; cursor: pointer; font-size: 0.8rem;">Zurück</button>
                </div>
            </div>
        `;
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
    resultDiv.innerHTML = `
        <div style="background: rgba(229, 9, 20, 0.1); border: 1px solid #b20710; padding: 1rem; border-radius: 8px;">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">✅</div>
            <h3 style="color: #b20710; margin-bottom: 0.25rem;">Ticket Gültig!</h3>
            <p style="font-family: monospace; font-size: 0.8rem; word-break: break-all; margin-bottom: 0.5rem; color: var(--text-muted);">${decodedText}</p>
            <p style="font-size: 0.9rem;">(API-Simulator aktiv. Warten auf echte Compeso-Anbindung.)</p>
            <button class="btn btn-primary" onclick="startScanner()" style="margin-top: 1rem; width: 100%;">Nächstes scannen</button>
        </div>
    `;
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadBreaks();
});








// --- OLI ONBOARDING LOGIC ---
var oliStep = 1;

function checkOliOnboarding() {
    const urlParams = new URLSearchParams(window.location.search);
    const setupToken = urlParams.get('setup_token');
    
    if (setupToken) {
        window.kpSetupToken = setupToken;
        
        // Parse name from token
        try {
            const base64Url = setupToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const payload = JSON.parse(jsonPayload);
            
            if (payload.first_name) {
                document.getElementById('oli-step-title').innerText = `Bärenstarkes Hallo, ${payload.first_name}! 🐻`;
            }
        } catch (e) {
            console.error('Failed to parse token', e);
        }

        setTimeout(() => {
            const modal = document.getElementById('oli-onboarding-modal');
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            setTimeout(() => modal.classList.add('active'), 10);
            document.getElementById('oli-step-location-content').style.display = 'none';
            document.getElementById('oli-step-password-content').style.display = 'none';
        }, 500);
        
        // Remove token from URL for clean copy/paste
        window.history.replaceState({}, document.title, window.location.pathname);
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
        btn.style.border = '2px solid rgba(255,255,255,0.1)';
        btn.style.borderBottom = '6px solid rgba(255,255,255,0.1)';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.transform = 'translateY(0)';
    });
    event.currentTarget.style.border = '2px solid #e50914';
    event.currentTarget.style.borderBottom = '2px solid #e50914';
    event.currentTarget.style.background = 'rgba(229,9,20,0.2)';
    event.currentTarget.style.transform = 'translateY(4px)';
    
}

function selectOliGoal(goal) {
    document.querySelectorAll('#oli-step-goal-content .oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid rgba(255,255,255,0.1)';
        btn.style.borderBottom = '6px solid rgba(255,255,255,0.1)';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.transform = 'translateY(0)';
    });
    event.currentTarget.style.border = '2px solid #e50914';
    event.currentTarget.style.borderBottom = '2px solid #e50914';
    event.currentTarget.style.background = 'rgba(229,9,20,0.2)';
    event.currentTarget.style.transform = 'translateY(4px)';
    
}

function pushBtn() {
    const btn = document.getElementById('oli-next-btn');
    if (!btn) return;
    btn.style.transform = 'translateY(4px)';
    btn.style.borderBottom = '2px solid #b20710';
    btn.style.marginBottom = '4px';
    setTimeout(() => {
        btn.style.transform = 'none';
        btn.style.borderBottom = '6px solid #b20710';
        btn.style.marginBottom = '0';
        }, 150);
}

function setOliMedia(step) {
    const img = document.getElementById('oli-avatar-img');
    const vid = document.getElementById('oli-avatar-vid');
    if (!img || !vid) return;
    
    // Config: which step uses which media type
    const mediaTypes = {
        1: 'mp4',
        2: 'png',
        3: 'mp4',
        4: 'mp4'
    };
    
    const type = mediaTypes[step] || 'png';
    
    if (type === 'mp4') {
        img.style.display = 'none';
        vid.style.display = 'block';
        vid.src = `/assets/Oli/Oli_${step}.mp4`;
        vid.play();
    } else {
        vid.style.display = 'none';
        img.style.display = 'block';
        img.src = `/assets/Oli/Oli_${step}.png`;
    }
}

function nextOliStep() {
    pushBtn();
    
    oliStep++;
    const title = document.getElementById('oli-step-title');
    const desc = document.getElementById('oli-step-desc');
    const btn = document.getElementById('oli-next-btn');
    const progress = document.getElementById('oli-progress-bar');
    
    const locContent = document.getElementById('oli-step-location-content');
    const pwdContent = document.getElementById('oli-step-password-content');
    
    if (oliStep === 2) {
        progress.style.width = '66%';
        title.innerText = 'Dein Standort 🍿';
        desc.innerText = 'In welchem Kinopolis bist du im Einsatz?';
        if(locContent) locContent.style.display = 'block';
        if(pwdContent) pwdContent.style.display = 'none';
        btn.innerText = 'Weiter';
        setOliMedia(2);
        
    } else if (oliStep === 3) {
        const selected = document.getElementById('oli-kino-select').value;
        if (!selected) {
            alert('Bitte wähle ein Kino aus, bevor wir weitermachen!');
            oliStep--;
            return;
        }
        
        progress.style.width = '90%';
        title.innerText = 'Fast geschafft! 🔒';
        desc.innerText = 'Setze ein sicheres Passwort für deinen Account fest.';
        if(locContent) locContent.style.display = 'none';
        if(pwdContent) pwdContent.style.display = 'block';
        btn.innerText = 'Setup abschließen!';
        setOliMedia(3);
        
    } else if (oliStep > 3) {
        const selected = document.getElementById('oli-kino-select').value;
        const passwordInput = document.getElementById('oli-password-input');
        const password = passwordInput ? passwordInput.value : '';
        
        if (!password || password.length < 6) {
            alert('Bitte gib ein sicheres Passwort ein (mindestens 6 Zeichen).');
            oliStep--;
            return;
        }
        
        btn.disabled = true;
        btn.innerText = 'Lädt...';
        setOliMedia(4);
        
        fetch('/api/auth/setup-complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                setup_token: window.kpSetupToken,
                location: selected,
                password: password
            })
        }).then(res => res.json()).then(data => {
            if (data.success && data.token) {
                progress.style.width = '100%';
                localStorage.setItem('kp_auth_token', data.token);
                localStorage.setItem('kp_user', JSON.stringify(data.user));
                if (data.user && data.user.location) {
                    localStorage.setItem('current_city', data.user.location);
                }
                if (window.AUTH) {
                    window.AUTH.token = data.token;
                    window.AUTH.user = data.user;
                }
                
                document.getElementById('oli-onboarding-modal').style.opacity = '0';
                document.getElementById('oli-onboarding-modal').style.transition = 'opacity 0.5s';
                
                setTimeout(() => {
                    document.getElementById('oli-onboarding-modal').style.display = 'none';
                    document.getElementById('oli-onboarding-modal').style.opacity = '1';
                    
                    const duration = 3000;
                    const end = Date.now() + duration;
                    const colors = ['#e74c3c', '#e50914', '#f1c40f', '#3498db'];

                    (function frame() {
                        if (typeof confetti === 'function') {
                            confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
                            confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
                        }
                        if (end > Date.now()) {
                            requestAnimationFrame(frame);
                        } else {
                            location.reload();
                        }
                    }());
                }, 500);
            } else {
                alert(data.error || 'Fehler beim Setup');
                btn.disabled = false;
                btn.innerText = 'Setup abschließen!';
                oliStep--;
            }
        }).catch(err => {
            alert('Netzwerkfehler beim Setup');
            btn.disabled = false;
            btn.innerText = 'Setup abschließen!';
            oliStep--;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const setupToken = urlParams.get('setup_token');
        const authModal = document.getElementById('auth-modal');
        
        if (setupToken) {
            if (authModal) authModal.style.display = 'none';
            checkOliOnboarding();
        } else if (authModal && authModal.style.display === 'none') {
            checkOliOnboarding();
        }
    }, 500);
});
function resetAndTestOli2() {
    localStorage.removeItem('oli_onboarding_done');
    oliStep = 1;
    
    // Reset UI
    document.getElementById('oli-progress-bar').style.width = '25%';
    document.getElementById('oli-step-title').innerText = 'Bärenstarkes Hallo! 🐻';
    document.getElementById('oli-step-desc').innerText = 'Ich bin OLI, der Kinobär und dein persönlicher Assistent. Bevor es losgeht, lass uns kurz dein Dashboard einrichten.';
    document.getElementById('oli-next-btn').innerText = "Los geht's";
    
    document.querySelectorAll('.oli-choice-btn').forEach(btn => {
        btn.style.border = '2px solid rgba(255,255,255,0.1)';
        btn.style.borderBottom = '6px solid rgba(255,255,255,0.1)';
        btn.style.background = 'rgba(255,255,255,0.05)';
        btn.style.transform = 'translateY(0)';
    });
    
    document.getElementById('oli-step-role-content').style.display = 'none';
    document.getElementById('oli-step-goal-content').style.display = 'none';
    document.getElementById('oli-step-location-content').style.display = 'none';
    
    document.getElementById('oli-onboarding-modal').style.display = 'flex';
    document.getElementById('oli-onboarding-modal').style.opacity = '1';
    
    
}

function printLostFoundLabel(id) {
    try {
        const item = (window.LOST_FOUND_ITEMS || []).find(x => String(x.id) === String(id));
        if (!item) {
            showToast("Gegenstand nicht gefunden.", true);
            return;
        }
        
        const { jsPDF } = window.jspdf;
        if (!jsPDF) {
            showToast("PDF-Bibliothek konnte nicht geladen werden.", true);
            return;
        }
        
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [80, 50]
        });
        
        // Determine category-specific color & tag text
        let color = [192, 57, 43]; // Default: Kinopolis Red (Sonstiges)
        let categoryTag = "SONSTIGES";
        const catName = item.category || 'Sonstiges';
        
        if (catName === "Kleidung") {
            color = [41, 128, 185]; // Blue
            categoryTag = "KLEIDUNG";
        } else if (catName === "Wertsachen") {
            color = [230, 126, 34]; // Gold/Orange
            categoryTag = "WERTSACHEN";
        } else if (catName === "Elektronik") {
            color = [142, 68, 173]; // Purple
            categoryTag = "ELEKTRONIK";
        }
        
        // Draw boundary border with category color
        doc.setDrawColor(color[0], color[1], color[2]);
        doc.setLineWidth(1.5);
        doc.rect(2, 2, 76, 46);
        
        // Draw colored header banner background
        doc.setFillColor(color[0], color[1], color[2]);
        doc.rect(2, 2, 76, 9, 'F');
        
        // Header Title
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(255, 255, 255);
        doc.text("KINOPOLIS FUNDSACHE", 4, 8);
        
        // Category Tag Text
        doc.setFontSize(7.5);
        doc.text(categoryTag, 68, 8, { align: 'right' });
        
        // Draw category-specific vector icon in white in the top right
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.4);
        
        if (catName === "Kleidung") {
            // Hanger icon
            doc.line(69, 7.5, 74, 7.5);
            doc.line(69, 7.5, 71.5, 5.2);
            doc.line(74, 7.5, 71.5, 5.2);
            doc.line(71.5, 5.2, 71.5, 4.2);
            doc.line(71.5, 4.2, 72.5, 3.8);
            doc.line(72.5, 3.8, 73.0, 4.2);
        } else if (catName === "Wertsachen") {
            // Diamond icon
            doc.line(71.5, 3.8, 74.0, 5.8);
            doc.line(74.0, 5.8, 71.5, 7.8);
            doc.line(71.5, 7.8, 69.0, 5.8);
            doc.line(69.0, 5.8, 71.5, 3.8);
            doc.line(69.0, 5.8, 74.0, 5.8);
        } else if (catName === "Elektronik") {
            // Smartphone icon
            doc.rect(70.0, 3.8, 3.5, 4.8);
            doc.setFillColor(255, 255, 255);
            doc.circle(71.75, 7.8, 0.25, 'F');
        } else {
            // Box icon for Sonstiges
            doc.rect(69.5, 4.8, 4.0, 3.2);
            doc.line(69.5, 4.8, 71.5, 3.8);
            doc.line(73.5, 4.8, 71.5, 3.8);
            doc.line(71.5, 4.8, 71.5, 8.0);
        }
        
        // Details
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(50, 50, 50);
        
        const whatText = (item.what || "").substring(0, 32);
        const whereText = (item.found_where || "").substring(0, 32);
        const whoText = (item.found_by || "").substring(0, 32);
        
        doc.setFont('Helvetica', 'bold');
        doc.text("Gegenstand:", 4, 17);
        doc.setFont('Helvetica', 'normal');
        doc.text(whatText, 24, 17);
        
        doc.setFont('Helvetica', 'bold');
        doc.text("Kategorie:", 4, 23);
        doc.setFont('Helvetica', 'normal');
        doc.text(catName, 24, 23);
        
        doc.setFont('Helvetica', 'bold');
        doc.text("Ort:", 4, 29);
        doc.setFont('Helvetica', 'normal');
        doc.text(whereText, 24, 29);
        
        doc.setFont('Helvetica', 'bold');
        doc.text("Finder:", 4, 35);
        doc.setFont('Helvetica', 'normal');
        doc.text(whoText, 24, 35);
        
        doc.setFont('Helvetica', 'bold');
        doc.text("Datum:", 4, 41);
        doc.setFont('Helvetica', 'normal');
        
        let dateText = "--";
        if (item.created_at) {
            let dateClean = item.created_at;
            if (typeof dateClean === 'string' && !dateClean.includes('T') && dateClean.includes(' ')) {
                dateClean = dateClean.replace(' ', 'T');
            }
            const d = new Date(dateClean);
            if (!isNaN(d.getTime())) {
                dateText = d.toLocaleDateString('de-DE') + " " + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            } else {
                dateText = String(item.created_at);
            }
        }
        doc.text(dateText, 24, 41);
        
        // Unique ID footer
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(140, 140, 140);
        doc.text(`ID: #${item.id} · Kinopolis Automation`, 4, 46);
        
        doc.save(`Fundsache_${item.id}.pdf`);
        showToast("Fundsachen-Etikett heruntergeladen!");
    } catch (e) {
        console.error("PDF generation failed:", e);
        showToast("PDF-Fehler: " + e.message, true);
    }
}
window.printLostFoundLabel = printLostFoundLabel;
window.updateGamification = function() {
            let group = '';
            const selector = document.getElementById('workstation-selector');
            if (selector) {
                group = selector.value;
                localStorage.setItem('kinopolis_shift_group', group);
            } else {
                group = localStorage.getItem('kinopolis_shift_group') || '';
            }
            if (!group) return;
            const items = shiftChecklist[group] || [];
            if (items.length === 0) return;
            
            let completed = 0;
            items.forEach(item => {
                if (cloudChecklistState[item.id]) completed++;
            });
            
            let progressEl = document.getElementById('checklist-progress-bar');
            if (!progressEl) {
                const header = document.querySelector('#workstation-section h3');
                if (header) {
                    header.insertAdjacentHTML('afterend', `
                        <div style="width:100%; background:rgba(255,255,255,0.1); border-radius:4px; height:8px; margin: 10px 0;">
                            <div id="checklist-progress-bar" style="width:0%; height:100%; background:var(--primary-blue); border-radius:4px; transition:width 0.5s ease;"></div>
                        </div>
                    `);
                    progressEl = document.getElementById('checklist-progress-bar');
                }
            }
            
            const percentage = (completed / items.length) * 100;
            if (progressEl) {
                progressEl.style.width = percentage + '%';
                if (percentage === 100) progressEl.style.background = '#4CAF50';
                else progressEl.style.background = 'var(--primary-blue)';
            }
            
            if (percentage === 100 && !cloudChecklistState[`${group}_confetti_fired`]) {
                cloudChecklistState[`${group}_confetti_fired`] = true;
                if (typeof confetti === 'function') {
                    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
                }
                
                // Audio success feedback
                try {
                    const AudioContext = window.AudioContext || window.webkitAudioContext;
                    if (AudioContext) {
                        const ctx = new AudioContext();
                        const osc = ctx.createOscillator();
                        const gain = ctx.createGain();
                        osc.connect(gain);
                        gain.connect(ctx.destination);
                        
                        osc.type = 'sine';
                        const now = ctx.currentTime;
                        osc.frequency.setValueAtTime(523.25, now); // C5
                        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
                        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
                        
                        gain.gain.setValueAtTime(0, now);
                        gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
                        gain.gain.setValueAtTime(0.5, now + 0.3);
                        gain.gain.linearRampToValueAtTime(0, now + 0.5);
                        
                        osc.start(now);
                        osc.stop(now + 0.5);
                    }
                } catch(e) {
                    console.log("Audio failed", e);
                }
            } else if (percentage < 100) {
                cloudChecklistState[`${group}_confetti_fired`] = false;
            }
};

function updatePopcornPrognosis() {
    let totalTickets = 0;
    if (Array.isArray(window.lastData)) {
        window.lastData.forEach(hall => {
            if (Array.isArray(hall.sessions)) {
                hall.sessions.forEach(s => {
                    if (typeof s.sold === 'number') totalTickets += s.sold;
                });
            }
        });
    }
    
    const weatherIconEl = document.getElementById('weather-icon');
    const weatherIcon = weatherIconEl ? weatherIconEl.innerText : '☀️';
    const isRainy = weatherIcon === '🌧️';
    const purchaseRate = isRainy ? 0.30 : 0.25;
    
    const expectedPortions = Math.round(totalTickets * purchaseRate);
    const recommendedBatches = Math.max(1, Math.ceil(expectedPortions / 4));
    
    const ticketsEl = document.getElementById('prognosis-tickets');
    const portionsEl = document.getElementById('prognosis-portions');
    const batchesEl = document.getElementById('prognosis-batches-suggest');
    
    if (ticketsEl) ticketsEl.textContent = totalTickets;
    if (portionsEl) portionsEl.textContent = expectedPortions;
    if (batchesEl) batchesEl.textContent = recommendedBatches;
    
    window.lastRecommendedBatches = recommendedBatches;
}
window.updatePopcornPrognosis = updatePopcornPrognosis;

function applyPopcornPrognosis() {
    const kettleSelect = document.getElementById('popcorn-kettle-size');
    const batchesInput = document.getElementById('popcorn-batches');
    
    if (kettleSelect && batchesInput && window.lastRecommendedBatches) {
        kettleSelect.value = "16";
        batchesInput.value = window.lastRecommendedBatches;
        calculatePopcornIngredients();
        showToast("Prognostizierten Bedarf übernommen!");
    }
}

// --- QR SCANNER LOGIC ---
let html5QrcodeScanner = null;

function handleTicketScan(decodedText) {
    console.log("Scanned Ticket: ", decodedText);
    const resultsEl = document.getElementById('qr-reader-results');
    if (!resultsEl) return;
    
    // Simulate API validation
    const isValid = Math.random() > 0.3; // 70% valid for demo
    
    resultsEl.innerHTML = `
        <div style="padding: 1rem; border-radius: 8px; background: ${isValid ? 'rgba(46, 204, 113, 0.2)' : 'rgba(231, 76, 60, 0.2)'}; border: 1px solid ${isValid ? '#2ecc71' : '#e74c3c'}; color: ${isValid ? '#2ecc71' : '#e74c3c'};">
            ${isValid ? '✅ Ticket Gültig!' : '❌ Ticket Ungültig / Bereits gescannt'}
            <div style="font-size: 0.8rem; margin-top: 0.5rem; color: #fff;">Code: ${decodedText}</div>
        </div>
    `;
    
    // Play sound / haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(isValid ? [100] : [200, 100, 200]);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('qr-start-btn');
    const stopBtn = document.getElementById('qr-stop-btn');
    
    if (startBtn && stopBtn) {
        startBtn.addEventListener('click', () => {
            const resultsEl = document.getElementById('qr-reader-results');
            if(resultsEl) resultsEl.innerHTML = '';
            
            if (!html5QrcodeScanner) {
                // Initialize it only when starting, ensuring the lib is loaded
                if (typeof Html5Qrcode !== 'undefined') {
                    html5QrcodeScanner = new Html5Qrcode("qr-reader");
                } else {
                    if(resultsEl) resultsEl.innerHTML = `<div style="color: #e74c3c;">Fehler: Scanner-Bibliothek nicht geladen.</div>`;
                    return;
                }
            }
            
            html5QrcodeScanner.start(
                { facingMode: "environment" }, 
                { fps: 10, qrbox: { width: 250, height: 250 } },
                (decodedText) => {
                    handleTicketScan(decodedText);
                },
                (errorMessage) => {
                    // ignore
                }
            ).then(() => {
                startBtn.style.display = 'none';
                stopBtn.style.display = 'block';
            }).catch(err => {
                console.error("Scanner Error: ", err);
                if(resultsEl) resultsEl.innerHTML = `<div style="color: #e74c3c; font-size: 0.85rem;">Fehler: Kamera konnte nicht gestartet werden. Bitte Berechtigungen prüfen.</div>`;
            });
        });
        
        const stopScanner = () => {
            if (html5QrcodeScanner) {
                html5QrcodeScanner.stop().then(() => {
                    startBtn.style.display = 'block';
                    stopBtn.style.display = 'none';
                }).catch(err => {
                    console.error("Failed to stop scanner", err);
                });
            }
        };
        
        stopBtn.addEventListener('click', stopScanner);
    }
});
window.applyPopcornPrognosis = applyPopcornPrognosis;

// --- TAGESABSCHLUSS LOGIC ---
window.showTagesabschlussModal = function() {
    const modal = document.getElementById('tagesabschluss-modal');
    if (!modal) return;
    
    // Calculate stats
    let totalTasks = 0;
    let completedTasks = 0;
    
    // We can count from cloudChecklistState or DOM checkboxes
    const checkboxes = document.querySelectorAll('.checklist-group input[type="checkbox"]');
    if (checkboxes.length > 0) {
        totalTasks = checkboxes.length;
        checkboxes.forEach(cb => {
            if (cb.checked) completedTasks++;
        });
    }
    
    // Get XP
    const xpEl = document.getElementById('xp-display');
    const xp = xpEl ? xpEl.textContent : "0 XP";
    
    // Get Scans (mock random number based on time of day)
    const mockScans = Math.floor(Math.random() * 150) + 50;
    
    document.getElementById('ta-aufgaben').textContent = `${completedTasks} / ${totalTasks}`;
    document.getElementById('ta-scans').textContent = mockScans;
    document.getElementById('ta-xp').textContent = xp;
    
    modal.classList.add('show');
};

window.submitTagesabschluss = function() {
    const modal = document.getElementById('tagesabschluss-modal');
    modal.classList.remove('show');
    
    // Play haptic + toast
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    showToast("Tagesabschluss erfolgreich übermittelt!");
    
    // Optional confetti
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }
};

function dismissAppBanner() {
    const banner = document.getElementById('ios-app-banner');
    if (banner) {
        banner.style.transition = 'opacity 0.2s ease, max-height 0.25s ease, margin 0.25s ease, padding 0.25s ease';
        banner.style.opacity = '0';
        banner.style.maxHeight = banner.scrollHeight + 'px';
        setTimeout(() => {
            banner.style.maxHeight = '0';
            banner.style.paddingTop = '0';
            banner.style.paddingBottom = '0';
            banner.style.marginTop = '0';
            banner.style.marginBottom = '0';
            banner.style.overflow = 'hidden';
            setTimeout(() => { banner.style.display = 'none'; }, 250);
        }, 80);
    }
    localStorage.setItem('ios_banner_dismissed', 'true');
}

function checkAppBannerState() {
    if (localStorage.getItem('ios_banner_dismissed') === 'true') {
        const banner = document.getElementById('ios-app-banner');
        if (banner) banner.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', checkAppBannerState);

// Global Window Exports for Inline HTML Handlers
Object.assign(window, {
    closeHandoverModal,
    snoozePosterUrgentPopup,
    handleMessageImage,
    removeMessageImage,
    closeMessageModal,
    sendMessage,
    toggleFunkGlobal,
    triggerRestock,
    resetFunkView,
    sendTransferList,
    sendEisTransferList,
    sendMhdList,
    updateTransferCount,
    updateEisTransferCount,
    submitMHD,
    submitInventoryCount,
    renderWorkstation,
    resetChecklist,
    loadLfItems,
    openLfModal,
    closeLfModal,
    handleLfImageUpload,
    saveLfItem,
    submitTechTicket,
    setTechFilter,
    toggleTheme,
    togglePushSubscription,
    saveTelegramSettings,
    openFeedback,
    closeFeedback,
    sendFeedback,
    exportPDF,
    exportExcel,
    openHelpModal,
    closeHelpModal,
    submitHelpRequest,
    nextOliStep,
    openAiChat,
    closeAiChat,
    sendChatMessage,
    dismissAppBanner
});

