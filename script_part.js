        // --- GLOBALS & STATE ---
        const API_URL = '/api/sessions';
        const LOCATIONS_URL = '/api/locations';
        const VAPID_PUBLIC_KEY = 'BCP-JGZbVBjKY1_blxAHw6bC5Ddf0nLAyPSp8q39kV7utFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8';

        let lastData = null;
        let lastUpdateTime = null;
        let currentCity = 'kp';
        let displayDate = new Date();
        let completedAuslaesse = new Set(JSON.parse(localStorage.getItem('completed_auslaesse') || '[]'));
        let completedPosters = new Set(JSON.parse(localStorage.getItem('completed_posters') || '[]'));
        let completedCleaning = new Set(JSON.parse(localStorage.getItem('completed_cleaning') || '[]'));
        let scannedPlanData = JSON.parse(localStorage.getItem('scanned_plan_data') || '[]');

        const CLEANING_TASKS = {
            1: ["Tagesaufgabe 1: MONTAG"], 2: ["Tagesaufgabe 1: DIENSTAG"], 
            3: ["Tagesaufgabe 1: MITTWOCH"], 4: ["Tagesaufgabe 1: DONNERSTAG"],
            5: ["Tagesaufgabe 1: FREITAG"], 6: ["Tagesaufgabe 1: SAMSTAG"], 0: ["Tagesaufgabe 1: SONNTAG"]
        };

        function switchTab(view, btn) {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.body.classList.remove('tools-active', 'info-active', 'stats-active');
            
            if (view === 'tools') {
                document.body.classList.add('tools-active');
                if (document.getElementById('transfer-items').children.length === 0) initTransferList();
                loadLogs();
            } else if (view === 'info') {
                document.body.classList.add('info-active');
                loadUpcomingMovies();
            } else if (view === 'stats') {
                document.body.classList.add('stats-active');
            }
        }

        // --- APP START ---
        window.addEventListener('load', async () => {
            fetchLocations();
            fetchSessions();
            fetchWeather();
            fetchNews();
            
            initLostFound();
            initTransferList();
        });

        async function loadUpcomingMovies() {
            const grid = document.getElementById('upcoming-grid');
            const loader = document.getElementById('upcoming-loading');
            
            grid.innerHTML = '';
            loader.style.display = 'flex';
            grid.style.display = 'none';
            
            try {
                // 1. Current Movies (from lastData which is array of halls)
                let currentMovies = [];
                if (window.lastData && Array.isArray(window.lastData)) {
                    const seenNames = new Set();
                    // Flatten halls into sessions
                    const allCurrentSessions = window.lastData.flatMap(h => h.sessions || []);
                    
                    allCurrentSessions.forEach(s => {
                        if (!seenNames.has(s.title)) {
                            seenNames.add(s.title);
                            currentMovies.push({
                                title: s.title,
                                poster: s.poster,
                                movieLink: s.movieLink,
                                current: true
                            });
                        }
                    });
                }

                // 2. Upcoming Movies
                const res = await fetch('/api/upcoming');
                const upcoming = await res.json();
                
                const allMovies = [...currentMovies, ...upcoming.map(m => ({...m, current: false}))];

                if (allMovies.length === 0) throw new Error('Keine Filme gefunden');

                grid.innerHTML = allMovies.map(m => `
                    <div class="hall-card glass movie-item-card" onclick="openMovieDetail('${m.movieLink || ''}')" style="cursor: pointer; padding: 0; overflow: hidden; border-radius: 12px;">
                        <div style="position: relative;">
                            <img src="${m.poster}" alt="Poster" style="width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block;">
                            ${m.current ? '<span class="badge" style="position: absolute; top: 8px; left: 8px; background: var(--primary-red); font-size: 0.65rem;">JETZT</span>' : ''}
                        </div>
                        <div style="padding: 0.75rem; text-align: center;">
                            <h3 style="font-family: 'Outfit'; font-size: 0.85rem; margin: 0; color: #fff; line-height: 1.2; height: 2.1rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${m.title}</h3>
                        </div>
                    </div>
                `).join('');
                
                loader.style.display = 'none';
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(140px, 1fr))';
                
            } catch (e) {
                console.error('Error loading movie list:', e);
                loader.innerHTML = '<div style="color: #ff4d4d;">Fehler beim Laden.</div>';
            }
        }

        async function openMovieDetail(url) {
            if (!url) return;
            const modal = document.getElementById('movie-detail-modal');
            const content = document.getElementById('movie-detail-content');
            
            modal.classList.add('active');
            content.innerHTML = `
                <div class="loading-state">
                    <div class="spinner"></div>
                    <div class="loading-text">Lade Filminfos...</div>
                </div>
            `;
            
            try {
                const res = await fetch(`/api/movie-details?url=${encodeURIComponent(url)}`);
                const data = await res.json();
                
                if (data.error) throw new Error(data.error);
                
                content.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <h2 style="font-size: 2rem; margin: 0; background: linear-gradient(180deg, #fff, #b3b3b3); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">${data.title}</h2>
                        
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <span class="badge" style="background: rgba(255,255,255,0.1); color: #fff;">${data.fsk}</span>
                            <span class="badge" style="background: rgba(255,255,255,0.1); color: #fff;">${data.duration} Min.</span>
                            <span class="badge" style="background: var(--primary-blue); color: #fff;">${data.genre}</span>
                        </div>

                        ${data.trailerUrl ? `
                        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                            <iframe src="${data.trailerUrl}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                        </div>
                        ` : ''}
                        
                        <div style="background: rgba(255,255,255,0.03); padding: 1.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05);">
                            <h3 style="font-size: 1.1rem; margin-top: 0; color: var(--primary-blue);">Inhalt</h3>
                            <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem; margin-bottom: 0;">${data.synopsis}</p>
                        </div>
                        
                        <div style="display: flex; gap: 1rem;">
                            <button onclick="closeMovieDetail()" class="btn-primary" style="flex: 1; padding: 0.8rem;">Schließen</button>
                            <a href="${data.url}" target="_blank" class="btn-secondary" style="flex: 1; padding: 0.8rem; text-decoration: none; text-align: center;">Auf Kinopolis.de ansehen</a>
                        </div>
                    </div>
                `;
            } catch (e) {
                content.innerHTML = '<div style="color: #ff4d4d;">Details konnten nicht geladen werden.</div>';
            }
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
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    checkPushSubscription();
                    checkNotificationPermission();
                }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        } else {
            document.getElementById('push-unsupported').style.display = 'block';
            document.getElementById('push-subscribe-btn').disabled = true;
        }

        async function checkPushSubscription() {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            updatePushUI(!!subscription);
        }

        function updatePushUI(subscribed) {
            const card = document.getElementById('push-main-card');
            const label = document.getElementById('push-main-label');
            const subLabel = document.getElementById('push-sub-label');
            const dot = document.getElementById('push-status-dot');
            const testBtn = document.getElementById('push-test-btn');
            const badge = document.getElementById('push-status-badge');

            if (subscribed) {
                card.classList.add('active');
                label.innerText = 'Benachrichtigungen sind AKTIV';
                subLabel.innerText = 'Du erhältst jetzt wichtige Updates';
                dot.classList.add('active');
                testBtn.style.display = 'flex';
                badge.innerText = 'Aktiviert';
                badge.style.background = '#2ecc71';
            } else {
                card.classList.remove('active');
                label.innerText = 'Benachrichtigungen deaktiviert';
                subLabel.innerText = 'Tippen, um wichtige Infos zu erhalten';
                dot.classList.remove('active');
                testBtn.style.display = 'none';
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

        async function sendTestPush() {
            const btn = document.getElementById('push-test-btn');
            btn.innerText = 'Sende...';
            btn.disabled = true;
            try {
                const res = await fetch('/api/push/test', { method: 'POST' });
                const data = await res.json();
                if (data.results) {
                    console.log('Push test results:', data.results);
                    let statsHtml = data.results.map(r => `
                        <div style="margin-bottom: 0.5rem; padding: 0.5rem; background: rgba(255,255,255,0.05); border-radius: 8px; font-size: 0.85rem;">
                            <strong style="color: ${r.status.includes('Success') ? '#2ecc71' : '#ff4d4d'}">${r.status}</strong><br>
                            <span style="color: var(--text-muted); font-size: 0.7rem;">${r.endpoint}</span>
                            ${r.message ? `<br><small style="color: #ff4d4d; opacity: 0.8;">${r.message}</small>` : ''}
                        </div>
                    `).join('');
                    
                    const resultDiv = document.createElement('div');
                    resultDiv.innerHTML = `
                        <div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(0,0,0,0.3); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                            <h4 style="margin-bottom: 1rem;">Diagnose-Ergebnisse:</h4>
                            ${statsHtml}
                            <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--text-muted);">
                                💡 Falls überall "Success (201)" steht, du aber nichts siehst: Prüfe "Nicht stören", Fokus-Modes oder Browser-Berechtigungen (Glocken-Icon oben links).
                            </p>
                        </div>
                    `;
                    btn.parentElement.appendChild(resultDiv);
                } else {
                    alert('Fehler: ' + (data.error || 'Unbekannt'));
                }
            } catch (err) {
                alert('Netzwerkfehler');
            } finally {
                btn.innerText = '🚀 Test-Benachrichtigung senden';
                btn.disabled = false;
            }
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

        // --- RESTOCK, TRANSFER & LOGBOOK LOGIC ---
        
        const TRANSFER_ITEMS = [
            "Ai Tee White Peach",
            "Ai Tee Lemon",
            "Bionade Orange",
            "Bionade Holunder",
            "M&M Schoko",
            "M&M Peanut",
            "Popcorn Süß",
            "Nachos",
            "Käsesauce",
            "Salsa",
            "Cola",
            "Wasser (still)"
        ];

        function initTransferList() {
            const container = document.getElementById('transfer-items');
            if (!container) return;
            container.innerHTML = TRANSFER_ITEMS.map((item, index) => `
                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08);">
                    <span style="font-size: 0.95rem; color: #fff;">${item}</span>
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <button class="btn-secondary" onclick="updateTransferCount(${index}, -1)" style="width: 30px; height: 30px; padding: 0; border-radius: 6px; font-weight: bold; background: rgba(229, 9, 20, 0.2); border-color: rgba(229, 9, 20, 0.4); color: #ff4d4d; display: flex; align-items: center; justify-content: center;">-</button>
                        <span id="transfer-count-${index}" style="font-weight: bold; width: 20px; text-align: center; color: var(--primary-blue);">0</span>
                        <button class="btn-secondary" onclick="updateTransferCount(${index}, 1)" style="width: 30px; height: 30px; padding: 0; border-radius: 6px; font-weight: bold; background: rgba(46, 204, 113, 0.2); border-color: rgba(46, 204, 113, 0.4); color: #2ecc71; display: flex; align-items: center; justify-content: center;">+</button>
                    </div>
                </div>
            `).join('');
        }

        function updateTransferCount(index, delta) {
            const el = document.getElementById(`transfer-count-${index}`);
            let current = parseInt(el.innerText) || 0;
            current += delta;
            if (current < 0) current = 0;
            el.innerText = current;
        }

        async function sendTransferList() {
            let itemsNeeded = [];
            TRANSFER_ITEMS.forEach((item, index) => {
                const count = parseInt(document.getElementById(`transfer-count-${index}`).innerText) || 0;
                if (count > 0) itemsNeeded.push(`${count}x ${item}`);
            });

            const customVal = document.getElementById('transfer-custom').value.trim();
            if (customVal) itemsNeeded.push(`Sonstiges: ${customVal}`);

            if (itemsNeeded.length === 0) {
                alert("Die Liste ist leer.");
                return;
            }

            const author = localStorage.getItem('kinopolis_shift_name') || 'Ein Mitarbeiter';
            const locationName = document.getElementById('workstation-selector') ? document.getElementById('workstation-selector').selectedOptions[0].text.split('(')[0].trim() : '';

            const bodyText = itemsNeeded.join('\\n');

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
                    alert("Transferliste erfolgreich an TL gesendet.");
                    // Reset elements
                    initTransferList();
                    document.getElementById('transfer-custom').value = '';
                } else {
                    alert("Fehler beim Senden.");
                }
            } catch (e) {
                alert("Netzwerkfehler.");
            }
        }

        async function triggerRestock(item) {
            if (!confirm(`Sende Nachschub-Ruf für "${item}"?`)) return;
            try {
                const res = await fetch('/api/push/restock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location: currentCity, item })
                });
                if (res.ok) alert(`Push-Nachricht für ${item} gesendet.`);
            } catch (e) {
                alert('Senden fehlgeschlagen.');
            }
        }

        function openLogModal() {
            document.getElementById('log-modal').style.display = 'flex';
            document.getElementById('log-author').value = localStorage.getItem('kinopolis_shift_name') || '';
        }

        function closeLogModal() {
            document.getElementById('log-modal').style.display = 'none';
        }

        async function saveLogEntry() {
            const message = document.getElementById('log-message').value.trim();
            const author = document.getElementById('log-author').value.trim();
            const priority = document.getElementById('log-priority').value;

            if (!message) return alert('Bitte Nachricht eingeben.');

            // Ändere Button Text für Ladescreen
            const btn = document.getElementById('log-save-btn');
            const ogText = btn.innerHTML;
            btn.innerHTML = '⏳ Speichern...';
            btn.disabled = true;

            try {
                const res = await fetch('/api/logs', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ location: currentCity, author, message, priority })
                });
                if (res.ok) {
                    closeLogModal();
                    document.getElementById('log-message').value = '';
                    loadLogs();
                } else {
                    const data = await res.json();
                    alert('Fehler beim Speichern: ' + (data.error || 'Server Fehler'));
                }
            } catch (e) {
                alert('Speichern fehlgeschlagen: Netzwerk- oder Serverfehler.');
            } finally {
                btn.innerHTML = ogText;
                btn.disabled = false;
            }
        }

        async function loadLogs() {
            const list = document.getElementById('logbook-list');
            if (!list) return;
            try {
                const res = await fetch(`/api/logs?location=${currentCity}`);
                const logs = await res.json();
                
                if (logs.length === 0) {
                    list.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-style: italic;">Keine Einträge vorhanden.</p>';
                    return;
                }

                list.innerHTML = logs.map(log => {
                    let color = 'var(--text-muted)';
                    if (log.priority === 'wichtig') color = '#f1c40f';
                    if (log.priority === 'dringend') color = '#e74c3c';

                    const date = new Date(log.created_at).toLocaleString('de-DE', { 
                        hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' 
                    });

                    return `
                        <div style="background: rgba(255, 255, 255, 0.03); border-left: 3px solid ${color}; padding: 0.75rem 1rem; border-radius: 4px 12px 12px 4px;">
                            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.4rem;">
                                <span style="font-weight: bold; color: ${color === 'var(--text-muted)' ? 'white' : color}">${log.author}</span>
                                <span>${date}</span>
                            </div>
                            <div style="font-size: 0.95rem; color: #fff; line-height: 1.4;">${log.message}</div>
                        </div>
                    `;
                }).join('');
            } catch (e) {
                list.innerHTML = '<p style="color: #e74c3c;">Fehler beim Laden.</p>';
            }
        }

        // Init notes
        const notesArea = document.getElementById('staff-notes');
        if (notesArea) {
            notesArea.value = localStorage.getItem('staff_notes') || '';
            notesArea.addEventListener('input', (e) => {
                localStorage.setItem('staff_notes', e.target.value);
            });
        }

        // Update clock and countdowns
        setInterval(() => {
            const now = new Date();
            document.getElementById('current-time-display').innerText = 
                now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' Uhr';
            
            if (lastUpdateTime) {
                const diffSec = Math.floor((now - lastUpdateTime) / 1000);
                document.getElementById('last-update-display').innerText = `Vor ${diffSec}s aktualisiert`;
            }
            
            updateCountdowns();
        }, 1000);

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
                
                if (currentMin < startMin) {
                    const diff = startMin - currentMin;
                    timer.innerText = `Beginnt in ${diff} Min.`;
                    timer.className = 'countdown-timer status-upcoming';
                } else if (currentMin < endMin) {
                    const diff = endMin - currentMin;
                    timer.innerText = `Läuft - noch ${diff} Min.`;
                    timer.className = 'countdown-timer status-running';
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

        function toggleAlerts() {
            toggleSection('poster-alerts', 'alerts-toggle-btn');
        }

        function changeDate(days) {
            displayDate.setDate(displayDate.getDate() + days);
            updateDateUI();
            fetchSessions();
        }



        function updateDateUI() {
            const today = new Date();
            const textEl = document.getElementById('display-date-text');
            const subEl = document.getElementById('display-date-sub');
            if(!textEl || !subEl) return;
            
            const isToday = displayDate.toDateString() === today.toDateString();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const isTomorrow = displayDate.toDateString() === tomorrow.toDateString();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const isYesterday = displayDate.toDateString() === yesterday.toDateString();

            if (isToday) textEl.innerText = 'Heute';
            else if (isTomorrow) textEl.innerText = 'Morgen';
            else if (isYesterday) textEl.innerText = 'Gestern';
            else textEl.innerText = displayDate.toLocaleDateString('de-DE', { weekday: 'long' });

            subEl.innerText = displayDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
        }

        // --- Workstation Checklists ---
        const shiftChecklist = {
            'einlass': [
                { id: 'e1', text: 'Aufgabe 1' },
                { id: 'e2', text: 'Aufgabe 2' }
            ],
            'theke': [
                { id: 't1', text: 'Aufgabe 1' },
                { id: 't2', text: 'Aufgabe 2' }
            ],
            'counter': [
                { id: 'c1', text: 'Aufgabe 1' },
                { id: 'c2', text: 'Aufgabe 2' }
            ],
            'popcornkueche': [
                { id: 'p1', text: 'Aufgabe 1' },
                { id: 'p2', text: 'Aufgabe 2' }
            ],
            'becherspuelen': [
                { id: 'b1', text: 'Aufgabe 1' },
                { id: 'b2', text: 'Aufgabe 2' }
            ]
        };

        function renderWorkstation() {
            const selector = document.getElementById('workstation-selector');
            if (!selector) return;
            const checklistContainer = document.getElementById('ws-checklist-container');
            const lfContainer = document.getElementById('ws-lostfound-container');
            const activeItems = document.getElementById('active-checklist-items');
            const group = selector.value;

            if (group === 'lostfound') {
                if (checklistContainer) checklistContainer.style.display = 'none';
                if (lfContainer) lfContainer.style.display = 'block';
                loadLfItems();
            } else {
                if (lfContainer) lfContainer.style.display = 'none';
                if (checklistContainer) checklistContainer.style.display = 'block';
                const savedState = JSON.parse(localStorage.getItem('kinopolis_shift_checklist') || '{}');
                const items = shiftChecklist[group] || [];
                if (activeItems) {
                    activeItems.innerHTML = items.map(item => {
                        const checked = savedState[item.id] ? 'checked' : '';
                        const checkedBy = savedState[item.id + '_by'] || '';
                        const lineThrough = savedState[item.id] ? 'text-decoration: line-through; opacity: 0.5;' : '';
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
            }
        }

        function toggleChecklistItem(id) {
            const savedState = JSON.parse(localStorage.getItem('kinopolis_shift_checklist') || '{}');
            const checkbox = document.getElementById(id);
            const label = document.getElementById('label-' + id);
            if (!checkbox || !label) return;

            if (checkbox.checked) {
                const nameInput = document.getElementById('ws-name-input');
                const name = nameInput ? nameInput.value.trim() : (localStorage.getItem('kinopolis_shift_name') || '');
                if (!name) {
                    alert('Bitte zuerst deinen Namen oben eintragen!');
                    checkbox.checked = false;
                    nameInput && nameInput.focus();
                    return;
                }
                localStorage.setItem('kinopolis_shift_name', name);
            }

            savedState[id] = checkbox.checked;
            localStorage.setItem('kinopolis_shift_checklist', JSON.stringify(savedState));
            label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            label.style.opacity = checkbox.checked ? '0.5' : '1';
        }

        function resetChecklist() {
            const selector = document.getElementById('workstation-selector');
            if (!selector || selector.value === 'lostfound') return;
            if (!confirm('Alle Häkchen für diese Station zurücksetzen?')) return;
            const group = selector.value;
            const savedState = JSON.parse(localStorage.getItem('kinopolis_shift_checklist') || '{}');
            (shiftChecklist[group] || []).forEach(item => delete savedState[item.id]);
            localStorage.setItem('kinopolis_shift_checklist', JSON.stringify(savedState));
            renderWorkstation();
        }

        function closeWelcomeModal() {
            document.getElementById('welcome-modal').classList.remove('active');
            localStorage.setItem('welcome_seen_beta', 'true');
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
        }
        function loadLfItems() {
            const allItems = JSON.parse(localStorage.getItem('kinopolis_lf_items') || '[]');
            const searchVal = (document.getElementById('lf-search')?.value || '').toLowerCase();
            const catFilter = document.getElementById('lf-filter-cat')?.value || '';
            const items = allItems.filter(item => {
                const matchSearch = !searchVal || item.what.toLowerCase().includes(searchVal) || item.where.toLowerCase().includes(searchVal) || item.who.toLowerCase().includes(searchVal);
                const matchCat = !catFilter || item.category === catFilter;
                return matchSearch && matchCat;
            });
            document.getElementById('lf-count-badge').textContent = allItems.length;
            const list = document.getElementById('lf-items-list');
            list.innerHTML = '';
            if (items.length === 0) {
                list.innerHTML = `<div style="text-align:center; padding: 2rem 1rem; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎒</div>
                    <div style="font-size: 0.95rem;">Noch keine Fundgegenstände eingetragen</div>
                </div>`;
                return;
            }
            const categoryColors = {
                'Kleidung': '#4A90E2', 'Elektronik': '#7B68EE', 'Schmuck': '#FFD700',
                'Spielzeug': '#FF6B6B', 'Dokumente': '#48CAE4', 'Taschen': '#F4845F',
                'Sonstiges': '#6C757D'
            };
            items.forEach((item, index) => {
                const color = categoryColors[item.category] || '#6C757D';
                const el = document.createElement('div');
                el.style.cssText = `
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-left: 4px solid ${color};
                    border-radius: 10px;
                    padding: 1rem 1.25rem;
                    transition: background 0.2s;
                `;
                el.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem;">
                        <strong style="color: white; font-size: 1.05rem; line-height: 1.3;">${item.what}</strong>
                        <span style="flex-shrink: 0; font-size: 0.75rem; font-weight: 600; background: ${color}22; color: ${color}; border: 1px solid ${color}55; padding: 3px 8px; border-radius: 20px; white-space: nowrap;">${item.category}</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem 1rem; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">
                        <div><span style="margin-right: 0.3rem;">📍</span><span style="color: rgba(255,255,255,0.7);">${item.where}</span></div>
                        <div><span style="margin-right: 0.3rem;">👤</span><span style="color: rgba(255,255,255,0.7);">${item.who}</span></div>
                        <div style="grid-column: 1/-1;"><span style="margin-right: 0.3rem;">⏰</span><span style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">${item.time}</span></div>
                    </div>
                    <div style="display: flex; justify-content: flex-end;">
                        <button onclick="deleteLfItem(${index})" style="
                            background: rgba(229,9,20,0.08);
                            border: 1px solid rgba(229,9,20,0.25);
                            color: #ff6b6b;
                            cursor: pointer;
                            font-size: 0.82rem;
                            padding: 5px 12px;
                            border-radius: 6px;
                            font-weight: 600;
                            transition: background 0.2s;
                        " onmouseover="this.style.background='rgba(229,9,20,0.18)'" onmouseout="this.style.background='rgba(229,9,20,0.08)'">
                            ✅ Als abgeholt markieren
                        </button>
                    </div>
                `;
                list.appendChild(el);
            });
        }
        function saveLfItem() {
            const what = document.getElementById('lf-what').value.trim();
            const category = document.getElementById('lf-category').value;
            const where = document.getElementById('lf-where').value.trim();
            const who = document.getElementById('lf-who').value.trim();
            
            if (!what || !category || !where || !who) {
                alert('Bitte fülle alle Felder aus!');
                return;
            }
            
            const items = JSON.parse(localStorage.getItem('kinopolis_lf_items') || '[]');
            const now = new Date();
            const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} Uhr (${now.toLocaleDateString('de-DE')})`;
            
            items.unshift({ what, category, where, who, time: timeStr });
            localStorage.setItem('kinopolis_lf_items', JSON.stringify(items));
            
            closeLfModal();
            loadLfItems();
        }
        function deleteLfItem(index) {
            if(!confirm('Gegenstand wirklich als abgeholt markieren / löschen?')) return;
            const items = JSON.parse(localStorage.getItem('kinopolis_lf_items') || '[]');
            items.splice(index, 1);
            localStorage.setItem('kinopolis_lf_items', JSON.stringify(items));
            loadLfItems();
        }

        async function init() {
            console.log('Kinopolis Dashboard v1.1 - Unified Worker Mode');
            renderWorkstation();
            
            if (!localStorage.getItem('welcome_seen_beta')) {
                const modal = document.getElementById('welcome-modal');
                if (modal) modal.classList.add('active');
            }
            
            // Setup toggle for Auslässe
            document.getElementById('auslaesse-toggle-btn').addEventListener('click', () => {
                const content = document.getElementById('auslaesse-list');
                const btn = document.getElementById('auslaesse-toggle-btn');
                content.classList.toggle('collapsed');
                btn.classList.toggle('collapsed');
            });

            await fetchLocations();
            updateDateUI();
            await fetchWeather();
            await fetchSessions();
            await fetchNews();
            
            // Refresh every 60 seconds
            setInterval(() => {
                fetchSessions();
                fetchWeather();
                fetchNews();
            }, 60000);
        }

        function toggleNews() {
            const list = document.getElementById('news-list');
            const btn = document.getElementById('news-toggle-btn');
            list.classList.toggle('collapsed');
            btn.classList.toggle('collapsed');
        }

        // --- News Logic ---
        async function fetchNews() {
            try {
                const res = await fetch('/api/messages?v=' + Date.now());
                const news = await res.json();
                renderNews(news);
            } catch (err) {
                console.error('News fetch error', err);
            }
        }

        function renderNews(news) {
            const container = document.getElementById('internal-news-container');
            const list = document.getElementById('news-list');
            
            if (!news || news.length === 0) {
                container.style.display = 'none';
                list.innerHTML = '';
                return;
            }

            container.style.display = 'block';
            const badge = document.getElementById('news-count-badge');
            if (badge) badge.textContent = news.length;
            list.innerHTML = news.map(item => {
                const images = item.images || (item.image_url ? [item.image_url] : []);
                return `
                <div class="news-card">
                    <div class="news-content">
                        <div class="news-header">
                            <span class="news-title">${item.title}</span>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <span class="news-meta">${new Date(item.created_at).toLocaleString('de-DE')} von ${item.author}</span>
                                <button class="delete-btn" onclick="deleteMessage(${item.id})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; padding: 4px;" title="Löschen">
                                    <svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19V4M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
                                </button>
                            </div>
                        </div>
                        ${images.length > 0 ? `
                        <div class="news-gallery">
                            ${images.map(img => `<img src="${img}" class="news-image" onclick="window.open(this.src)">`).join('')}
                        </div>
                        ` : ''}
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

        async function sendMessage() {
            const title = document.getElementById('msg-title').value.trim();
            const content = document.getElementById('msg-content').value.trim();
            const author = document.getElementById('msg-author').value.trim();
            
            if (!title || !content) return alert('Titel und Inhalt sind erforderlich!');
            
            const btn = document.getElementById('msg-send-btn');
            btn.innerText = 'Wird gesendet...';
            btn.disabled = true;
            
            try {
                const res = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, content, author })
                });
                
                if (res.ok) {
                    closeMessageModal();
                    document.getElementById('msg-title').value = '';
                    document.getElementById('msg-content').value = '';
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

        async function deleteMessage(id) {
            if (!confirm('Diese Mitteilung wirklich löschen?')) return;
            try {
                const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
                if (res.ok) fetchNews();
            } catch (e) {
                alert('Fehler beim Löschen.');
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
                const selector = document.getElementById('cinema-selector');
                
                locations.forEach(loc => {
                    const option = document.createElement('option');
                    option.value = loc.slug;
                    option.textContent = loc.name;
                    if (loc.slug === currentCity) option.selected = true;
                    selector.appendChild(option);
                });

                selector.addEventListener('change', (e) => {
                    currentCity = e.target.value;
                    const cityName = e.target.options[e.target.selectedIndex].text;
                    document.getElementById('location-name').innerText = cityName;
                    document.getElementById('dashboard').innerHTML = '<div class="loading-state"><div class="spinner"></div><div class="loading-text">Aktualisiere Daten...</div></div>';
                    completedAuslaesse.clear();
                    fetchSessions();
                    fetchWeather();
                });
            } catch (err) {
                console.error('Failed to load locations', err);
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
                
                // Check if response is JSON
                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    const text = await response.text();
                    console.error('Non-JSON response received:', text);
                    throw new Error(`Ungültiges Datenformat vom Server (Status ${response.status}). Bitte lade die Seite neu.`);
                }

                const sessions = await response.json();
                lastData = sessions;
                lastUpdateTime = new Date();
                
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
                document.getElementById('stale-warning').style.display = 'none';

                if(!sessions || (Array.isArray(sessions) && sessions.length === 0)) {
                      const dateStrDisplay = displayDate.toLocaleDateString('de-DE');
                      document.getElementById('dashboard').innerHTML = `<div class="glass" style="padding: 3rem; text-align: center; grid-column: 1/-1;">
                          <h3>Keine Vorstellungen gefunden</h3>
                          <p style="color: var(--text-muted); margin-top: 1rem;">Möglicherweise ist das Kino am ${dateStrDisplay} geschlossen oder die Daten sind nicht verfügbar.</p>
                      </div>`;
                      document.getElementById('poster-alerts').innerHTML = '';
                      document.getElementById('auslaesse-list').innerHTML = '';
                      document.getElementById('auslaesse-section-container').style.display = 'none';
                      document.getElementById('stats-section-container').style.display = 'none';
                      return;
                }


                renderDashboard(sessions); 
                renderTasks(sessions);
                updateAlerts(sessions, []); 
                renderStats(sessions);
            } catch (error) {
                console.error('Fetch error:', error);
                document.getElementById('status-indicator').classList.add('offline');
                
                if (lastData) {
                    document.getElementById('stale-warning').style.display = 'block';
                    // We keep current UI but show warning
                } else {
                    document.getElementById('dashboard').innerHTML = `<div class="glass" style="padding: 2rem; color: #ff4d4d; border: 1px solid rgba(255, 77, 77, 0.3);">
                        <h3 style="margin-bottom: 0.5rem;">Verbindungsfehler</h3>
                        <p style="font-size: 0.9rem; opacity: 0.9;">${error.message}</p>
                        <button onclick="fetchSessions()" style="margin-top: 1.5rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer;">Erneut versuchen</button>
                    </div>`;
                }
            }
        }

        function renderDashboard(halls) {
            const dashboard = document.getElementById('dashboard');
            dashboard.innerHTML = '';

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            halls.forEach(hall => {
                const hallName = hall.name;
                const sessions = hall.sessions;
                const card = document.createElement('div');
                card.className = 'hall-card glass';
                
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
                    let startMin, endMin;
                    if (s.time && s.time.includes(':')) {
                        const [h, m] = s.time.split(':').map(Number);
                        startMin = h * 60 + m;
                        endMin = startMin + s.duration;
                        isActive = currentMinutes >= startMin && currentMinutes <= endMin;
                    }

                    return `
                        <div class="session-item ${isActive ? 'active' : ''}">
                            <div class="session-time-col">
                                <div class="time-start">${s.time}</div>
                                <div class="time-end">${endTime}</div>
                            </div>
                            <div class="session-info">
                                <div class="movie-title" title="${s.title}">${s.title}</div>
                                <div class="meta-tags">
                                    <span class="tag">${s.duration} Min</span>
                                    ${getFskTagsHtml(s)}
                                    ${s.date ? `<span class="session-date-badge">${s.date}</span>` : ''}
                                </div>
                                <div class="countdown-timer" data-start="${startMin}" data-end="${endMin}"></div>
                                <div class="occupancy-wrapper">
                                    <div class="occupancy-header">
                                        <span>Auslastung</span>
                                        <span class="occupancy-val">${s.sold} / ${s.capacity}</span>
                                    </div>
                                    <div class="occupancy-track">
                                        <div class="occupancy-bar ${barClass}" style="width: ${occupancyPct}%"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');

                card.innerHTML = `
                    <div class="hall-header" onclick="toggleHall(this)">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span class="hall-name">${hallName}</span>
                            <span class="session-count">${sessions.length} Vorstellungen</span>
                        </div>
                        <svg class="toggle-icon" viewBox="0 0 24 24" width="20" height="20">
                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </div>
                    <div class="hall-sessions-list">
                        ${sessionsHtml}
                    </div>
                `;
                dashboard.appendChild(card);
            });
        }

        function saveTaskState() {
            localStorage.setItem('completed_auslaesse', JSON.stringify(Array.from(completedAuslaesse)));
            localStorage.setItem('completed_posters', JSON.stringify(Array.from(completedPosters)));
            localStorage.setItem('completed_cleaning', JSON.stringify(Array.from(completedCleaning)));
        }

        function renderTasks(hallsGrouped) {
            const container = document.getElementById('auslaesse-section-container');
            const list = document.getElementById('auslaesse-list');
            const badge = document.getElementById('auslass-count-badge');
            list.innerHTML = '';

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            
            const allTasks = [];

            hallsGrouped.forEach(hall => {
                const hallName = hall.name;
                const sessions = hall.sessions.filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                
                sessions.forEach((s, idx) => {
                    const [h, m] = s.time.split(':').map(Number);
                    const startMin = h * 60 + m;
                    const running30Min = startMin + 30;
                    const durationBase = startMin + s.duration;
                    const durationMax = durationBase + 30;

                    // CHECK FOR SCANNED DATA OVERRIDE
                    let timeDisplay = `${formatMinutes(durationBase)} - ${formatMinutes(durationMax)}`;
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
                                timeDisplay = `${targetTime} (Exakt)`;
                                isVerified = true;
                            }
                        }
                    }

                    // 1. Poster Change Task (Logic moved to updateAlerts/addPosterAlerts)
                    // ...

                    // 2. Auslass Task (All except last)
                    if (idx < sessions.length - 1) {
                        allTasks.push({
                            type: 'auslass',
                            hall: hall.name,
                            title: s.title,
                            sold: s.sold,
                            time: triggerMin,
                            timeDisplay: timeDisplay,
                            triggerMin: triggerMin,
                            triggerMax: triggerMax,
                            isVerified: isVerified,
                            id: `auslass-${hall.name}-${s.title}-${s.time}`
                        });
                    }
                });
            });

            // 3. Add General Cleaning Tasks for the current day
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

            // 4. Add Station Abbau Alerts
            if (currentCity === 'kp') {
                const abbauTasks = getKpStationTasks(hallsGrouped);
                allTasks.push(...abbauTasks);
            }

            // Filter for tasks:
            // - Auslaesse: ALWAYS show all for the day
            // - Cleaning: ALWAYS show
            // - Posters: Only if done (historical view), but they are primarily in alerts
            const liveTasks = allTasks.filter(t => t.type === 'auslass' || t.type === 'cleaning' || (t.type === 'poster' && completedPosters.has(t.id)));

            // Sort by time (Cleaning -1 first, then by time)
            liveTasks.sort((a, b) => a.time - b.time);

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

                item.innerHTML = `
                    <div class="auslass-hall" style="background: ${isActive ? 'var(--primary-red)' : badgeColor}">${icon} ${t.hall}</div>
                    <div class="auslass-movie" title="${t.title}">${t.sold !== undefined ? t.sold + ' Besucher' : ''} ${t.isVerified ? '✅' : ''}</div>
                    <div class="auslass-time-range" style="${t.isVerified ? 'color: #2ecc71; font-weight: 800;' : ''}">${t.timeDisplay}</div>
                `;
                
                item.addEventListener('click', () => {
                    if (set.has(t.id)) {
                        set.delete(t.id);
                        item.classList.remove('done');
                    } else {
                        set.add(t.id);
                        item.classList.add('done');
                    }
                    saveTaskState();
                });
                
                list.appendChild(item);
            });

            const totalActive = liveTasks.filter(t => {
                const set = t.type === 'cleaning' ? completedCleaning : (t.type === 'auslass' ? completedAuslaesse : completedPosters);
                return !set.has(t.id);
            }).length;

            badge.textContent = totalActive;
            container.style.display = liveTasks.length > 0 ? 'block' : 'none';
        }

        function getKpStationTasks(hallsGrouped) {
            const tasks = [];
            const groups = [
                { name: 'Station 1/2', halls: ['Kino 1', 'Kino 2'] },
                { name: 'Station 3/4', halls: ['Kino 3', 'Kino 4'] },
                { name: 'Station 5/6', halls: ['Kino 5', 'Kino 6'] },
                { name: 'Station 7/8', halls: ['Kino 7', 'Kino 8'] }
            ];

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();

            groups.forEach(group => {
                let hasUpcomingAuslass = false;
                let lastEndMin = 0;
                
                group.halls.forEach(hallName => {
                    const hall = hallsGrouped.find(h => h.name === hallName);
                    if (!hall) return;

                    const sessions = hall.sessions.filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                    const auslassSessions = sessions.slice(0, -1); // All except last

                    auslassSessions.forEach(s => {
                        const [h, m] = s.time.split(':').map(Number);
                        const endMinMax = (h * 60 + m) + s.duration + 30;
                        if (endMinMax > currentMinutes) {
                            hasUpcomingAuslass = true;
                        }
                        lastEndMin = Math.max(lastEndMin, endMinMax);
                    });
                    
                    // Also check the last session's end time for "ABBAU"
                    if (sessions.length > 0) {
                        const lastS = sessions[sessions.length - 1];
                        const [h, m] = lastS.time.split(':').map(Number);
                        lastEndMin = Math.max(lastEndMin, (h * 60 + m) + lastS.duration);
                    }
                });

                if (!hasUpcomingAuslass) {
                    tasks.push({
                        type: 'abbau',
                        hall: 'ABBAU',
                        title: `${group.name} - Fertig`,
                        time: lastEndMin,
                        timeDisplay: 'Fertig',
                        triggerMin: lastEndMin,
                        id: `abbau-${group.name}`
                    });
                }
            });
            return tasks;
        }


        function formatMinutes(totalMinutes) {
            const h = Math.floor(totalMinutes / 60) % 24;
            const m = totalMinutes % 60;
            return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
        }

        function calculateBreaks(allSessions) {
            const now = new Date();
            const currentMin = now.getHours() * 60 + now.getMinutes();
            // Start looking for breaks from NOW
            const searchStart = Math.min(currentMin, 1440);
            
            let thekeScore = new Array(1440).fill(0);
            let einlassScore = new Array(1440).fill(0);
            
            allSessions.forEach(s => {
                if (!s.time || !s.time.includes(':')) return;
                const [h, m] = s.time.split(':').map(Number);
                const startMin = h * 60 + m;
                const endMin = startMin + s.duration;
                
                // Theke: start-30 to start+5
                for(let i = Math.max(0, startMin - 30); i <= Math.min(1439, startMin + 5); i++) thekeScore[i]++;
                
                // Einlass Entry: start-20 to start+10
                for(let i = Math.max(0, startMin - 20); i <= Math.min(1439, startMin + 10); i++) einlassScore[i]++;
                
                // Einlass Clean (Auslass): end to end+15
                for(let i = Math.max(0, endMin); i <= Math.min(1439, endMin + 15); i++) einlassScore[i]++;
            });
            
            function findGaps(scoreArray, minDuration) {
                let gaps = [];
                let currentStart = -1;
                
                for (let i = searchStart; i < 1440; i++) {
                    if (scoreArray[i] === 0) {
                        if (currentStart === -1) currentStart = i;
                    } else {
                        if (currentStart !== -1) {
                            if (i - currentStart >= minDuration) gaps.push({ start: currentStart, end: i - 1 });
                            currentStart = -1;
                        }
                    }
                }
                if (currentStart !== -1 && 1440 - currentStart >= minDuration) gaps.push({ start: currentStart, end: 1439 });
                return gaps.slice(0, 4); // return max 4 future gaps
            }
            
            return {
                thekeGaps: findGaps(thekeScore, 30),
                einlassGaps: findGaps(einlassScore, 30)
            };
        }

        function renderStats(hallsGrouped) {
            const container = document.getElementById('stats-section-container');
            const grid = document.getElementById('stats-grid');
            const chart = document.getElementById('hour-chart');
            
            const allSessions = hallsGrouped.flatMap(h => h.sessions);
            if (allSessions.length === 0) {
                container.style.display = 'none';
                return;
            }
            container.style.display = 'block';

            // Metrics
            const hourStats = {}; // { hour: sold }
            const movieStats = {}; // { title: { sold, poster } }
            let totalSold = 0;
            let topSession = { sold: -1, capacity: 1, title: '', hall: '', poster: null };

            allSessions.forEach(s => {
                if (!s.time || !s.time.includes(':')) return;
                const hour = s.time.split(':')[0] + ':00';
                hourStats[hour] = (hourStats[hour] || 0) + s.sold;
                
                if (!movieStats[s.title]) movieStats[s.title] = { sold: 0, poster: s.poster };
                movieStats[s.title].sold += s.sold;
                
                totalSold += s.sold;

                const occupancy = s.capacity > 0 ? s.sold / s.capacity : 0;
                const currentTopOcc = topSession.capacity > 0 ? topSession.sold / topSession.capacity : 0;
                if (occupancy > currentTopOcc) {
                    topSession = s;
                }
            });

            // Top Film
            let topMovie = { title: 'Keine Daten', sold: 0, poster: null };
            for (const [title, stats] of Object.entries(movieStats)) {
                if (stats.sold > topMovie.sold) topMovie = { title, sold: stats.sold, poster: stats.poster };
            }

            // Peak Hour
            let peakHour = { time: '--:--', sold: 0 };
            for (const [time, sold] of Object.entries(hourStats)) {
                if (sold > peakHour.sold) peakHour = { time, sold };
            }

            grid.innerHTML = `
                <div class="stat-card">
                    <div class="stat-label">System-Status</div>
                    <div class="stat-value" style="font-size: 1.2rem; color: #3498db;">OK V3.0</div>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Gesamtbesucher</span>
                    <span class="stat-value">${totalSold}</span>
                    <div class="stat-subtext">Tickets heute</div>
                </div>
                <div class="stat-card poster-card">
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
                <div class="stat-card poster-card">
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
                
                // Heatmap Color Logic: Higher occupancy -> Redder
                // Simple gradient based on visitor load
                let barColor = 'rgba(0, 120, 255, 0.4)'; // Default Blueish
                if (sold > 100) barColor = 'rgba(241, 196, 15, 0.5)'; // Yellow > 100
                if (sold > 200) barColor = 'rgba(230, 126, 34, 0.6)'; // Orange > 200
                if (sold > 300 || sold > maxHourSold * 0.8) barColor = 'rgba(229, 9, 20, 0.7)'; // Red > 300 or 80% peak
                
                const barWrapper = document.createElement('div');
                barWrapper.className = 'hour-bar-wrapper';
                barWrapper.innerHTML = `
                    <div class="hour-bar" style="height: ${heightPct}%; background: ${barColor}" data-value="${sold}"></div>
                    <span class="hour-label">${hour}</span>
                `;
                chart.appendChild(barWrapper);
            });

            // --- AI BREAK RECOMMENDATIONS ---
            const breaks = calculateBreaks(allSessions);
            const formatGaps = (gaps) => gaps.length > 0 ? gaps.map(g => `<span class="badge" style="background: rgba(255,255,255,0.1); color: #fff; padding: 0.4rem 0.8rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">${formatMinutes(g.start)} - ${formatMinutes(g.end)}</span>`).join('') : '<span style="color: var(--text-muted); font-size: 0.85rem;">Keine passenden Lücken heute.</span>';

            grid.innerHTML += `
                <div class="stat-card" style="grid-column: 1 / -1; align-items: flex-start; background: rgba(0, 120, 255, 0.05); border: 1px solid rgba(0, 120, 255, 0.1);">
                    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem;">
                        <span style="font-size: 1.5rem;">☕</span>
                        <span class="stat-label" style="font-size: 1.1rem; color: #fff; margin: 0; text-transform: none; font-weight: 800;">KI-Pausen-Empfehlungen</span>
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
                        <div style="background: rgba(0,0,0,0.4); padding: 1.25rem; border-radius: 16px; border-left: 4px solid var(--primary-blue); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <div style="font-weight: 800; color: white; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span>🍿</span> Theken-Personal
                            </div>
                            <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                                ${formatGaps(breaks.thekeGaps)}
                            </div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic;">Slots ohne nahen Filmstart (+/- 20min)</div>
                        </div>
                        
                        <div style="background: rgba(0,0,0,0.4); padding: 1.25rem; border-radius: 16px; border-left: 4px solid var(--primary-red); box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
                            <div style="font-weight: 800; color: white; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span>🎟️</span> Einlass & Saal
                            </div>
                            <div style="display: flex; gap: 0.6rem; flex-wrap: wrap;">
                                ${formatGaps(breaks.einlassGaps)}
                            </div>
                            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.75rem; font-style: italic;">Slots ohne Einlass-Ströme oder anstehende Reinigung</div>
                        </div>
                    </div>
                </div>
            `;
        }

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

        function toggleHall(header) {
            const sessionsList = header.nextElementSibling;
            const isCollapsed = header.classList.toggle('collapsed');
            sessionsList.classList.toggle('collapsed');
        }

        function updateAlerts(hallsGrouped, tomSessionsFlat) {
            const alertsContainer = document.getElementById('poster-alerts');
            alertsContainer.innerHTML = '';

            addPosterAlerts(hallsGrouped, tomSessionsFlat, alertsContainer);
            addOccupancyAlerts(hallsGrouped, alertsContainer);

            // Update badge count
            const count = alertsContainer.children.length;
            document.getElementById('alert-count-badge').textContent = count;
            
            // Hide container if no alerts
            const container = document.getElementById('poster-alerts-container');
            container.style.display = count > 0 ? 'block' : 'none';
        }

        function addPosterAlerts(hallsGrouped, tomSessionsFlat, container) {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const allAlerts = [];

            hallsGrouped.forEach(hall => {
                const hallName = hall.name;
                const hallSessions = hall.sessions.filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                if (hallSessions.length === 0) return;

                // Only find the LATEST poster change that has already happened
                let latestAlert = null;

                hallSessions.forEach((s, idx) => {
                    const [sh, sm] = s.time.split(':').map(Number);
                    const changeMin = (sh * 60 + sm) + 30;
                    
                    if (currentMinutes >= changeMin) {
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

            // Sort by time
            allAlerts.sort((a, b) => a.time - b.time);

            // Render
            allAlerts.forEach(a => {
                const alert = createPosterAlertElement(a.hallName, a.nextMovie, a.isEndDay, a.alertId);
                container.appendChild(alert);
            });
        }

        function createPosterAlertElement(hallName, nextMovie, isEndDay, alertId) {
            const alert = document.createElement('div');
            alert.className = 'poster-change-alert';
            alert.innerHTML = `
                <div class="alert-content">
                    <div class="alert-icon-svg">
                        <svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M13.9,11l-2.4,3.1 l-1.7-2.1L7,16h10L13.9,11z"/></svg>
                    </div>
                    <div class="alert-text" style="flex: 1">
                        <h2>Plakatwechsel in <span style="white-space: nowrap">${hallName}</span></h2>
                        <p>${isEndDay ? 'Die <strong>letzte Vorstellung</strong> des Tages hat begonnen.' : 'Der Film läuft seit 20 Min.'} Das Plakat kann gewechselt werden.</p>
                    </div>
                    <div class="next-movie-preview">
                        ${nextMovie.poster ? `<img src="${nextMovie.poster}" class="poster-img" alt="Poster">` : ''}
                        <div class="next-movie-info">
                            <h4>Nächster Film</h4>
                            <h3>${nextMovie.title}</h3>
                            <div class="time">Start: ${nextMovie.time} ${isEndDay ? 'Uhr (Morgen)' : 'Uhr'}</div>
                        </div>
                    </div>
                    <button class="alert-done-btn" onclick="markPosterDone('${alertId}')" title="Als erledigt markieren">
                        <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /></svg>
                    </button>
                </div>
            `;
            return alert;
        }

        function markPosterDone(id) {
            completedPosters.add(id);
            saveTaskState();
            fetchSessions(); // Refresh UI
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
                        alert.className = 'poster-change-alert';
                        if (isZENeeded) {
                            alert.style.background = 'linear-gradient(135deg, rgba(0, 120, 255, 0.2) 0%, rgba(20, 20, 25, 0.8) 100%)';
                            alert.style.borderColor = 'rgba(0, 120, 255, 0.4)';
                        }

                        alert.innerHTML = `
                            <div class="alert-content">
                                <div class="alert-icon">${isZENeeded ? '🛂' : '🎟️'}</div>
                                <div class="alert-text" style="flex: 1">
                                    <h2 style="display: flex; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
                                        <span>${isZENeeded ? 'Zutrittskontrolle (ZE) nötig!' : 'Saal fast voll!'}</span>
                                        ${isZENeeded ? getFskTagsHtml(s) : ''}
                                    </h2>
                                    <p>Der Film <strong>${s.title}</strong> in <strong>${hallName}</strong> beginnt in ${diff} Min. (${s.sold} Plätze belegt).</p>
                                    ${isZENeeded ? '<p style="color: var(--primary-blue); margin-top: 0.5rem; font-weight: 600;">⚠️ Bitte kontrolliere die Ausweise basierend auf der Uhrzeit und der FSK.</p>' : ''}
                                </div>
                            </div>
                        `;
                        container.insertBefore(alert, container.firstChild); // Show these at the top
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
                title.innerText = 'App Feedback (Entwickler)';
                desc.innerText = 'Fehler gefunden oder gute Ideen zur Seite? Nachricht geht direkt an Artjom.';
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
            
            const prefix = currentFeedbackType === 'bl' ? '[AN BL] ' : '[APP FEEDBACK] ';
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
                    alert('Feedback erfolgreich gesendet! Danke.');
                    closeFeedback();
                    document.getElementById('feedback-text').value = '';
                    document.getElementById('feedback-contact').value = '';
                } else {
                    alert('Fehler beim Senden. Bitte Server-Logs prüfen.');
                }
            } catch (e) {
                console.error('Feedback error:', e);
                alert('Netzwerkfehler beim Senden.');
            } finally {
                btn.innerText = 'Senden';
                btn.disabled = false;
            }
        }

        // Initial load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        // Ensure image visibility fallback
        document.getElementById('brand-logo').onload = function() {
            this.style.display = 'block';
            this.style.background = 'transparent';
        };
        // --- SCANNER FUNCTIONS ---
        async function handlePlanScan(input) {
            const file = input.files[0];
            if (!file) return;

            const btn = document.querySelector('[onclick*="plan-scan-input"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '⌛ Komprimiere & Analysiere...';
            btn.disabled = true;

            try {
                let compressedFile;
                try {
                    // High resolution (1000px) for balance between accuracy and size
                    compressedFile = await compressImage(file, 1000, 0.6);
                } catch (err) {
                    console.warn('Compression failed, falling back to original file:', err);
                    compressedFile = file; // Fallback to raw file
                }

                const formData = new FormData();
                formData.append('image', compressedFile);

                const res = await fetch('/api/scan-plan', {
                    method: 'POST',
                    body: formData
                });
                
                const responseText = await res.text();
                let result;
                try {
                    result = JSON.parse(responseText);
                } catch (e) {
                    console.error('Non-JSON response:', responseText);
                    throw new Error(`Server lieferte kein gültiges JSON. Möglicherweise ein Timeout oder Fehler bei Cloudflare. Kurzbeschreibung: ${responseText.substring(0, 50)}...`);
                }
                
                if (result.success && Array.isArray(result.data)) {
                    scannedPlanData = result.data;
                    localStorage.setItem('scanned_plan_data', JSON.stringify(scannedPlanData));
                    alert(`Erfolg! ${result.data.length} Auslasszeiten wurden übernommen.`);
                    if (lastData) renderTasks(lastData);
                } else if (result.error && result.error.includes('5016')) {
                    const agree = confirm('⚠️ KI-Analyse noch gesperrt: Das Modell benötigt eine einmalige Lizenz-Bestätigung (agree). Soll ich das jetzt für dich tun?');
                    if (agree) unlockAI();
                } else {
                    let errStr = result.error || 'Unbekannter Fehler';
                    if (result.raw) {
                        errStr += '\n\nAntwort (Auszug):\n' + result.raw.substring(0, 150) + '...';
                    }
                    alert('Fehler beim Analysieren:\n' + errStr);
                }
            } catch (err) {
                console.error('Scan fetch error:', err);
                alert('Netzwerkfehler beim Scannen: ' + err.message);
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
                input.value = ''; // Reset file input
            }
        }

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
