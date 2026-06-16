
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
        }

        // ============================================================
        // FEATURE: SCHICHT CHECK-IN / CHECK-OUT
        // ============================================================
        function shiftCheckin() {
            shiftStartTime = new Date();
            localStorage.setItem('shift_start_time', shiftStartTime.toISOString());
            updateShiftCheckinUI();
            showToast('Schicht gestartet!');
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
            const xpTotal = (auslaesseCount * 50) + (cleaningCount * 30);

            // Send Report to API
            if (window.AUTH && AUTH.token) {
                try {
                    await fetch('/api/auth/shift-report', {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${AUTH.token}`
                        },
                        body: JSON.stringify({
                            duration: durationStr,
                            auslaesse: auslaesseCount,
                            cleaning: cleaningCount,
                            xp: xpTotal
                        })
                    });
                } catch (e) { console.error("Report failed", e); }
            }

            if (!silent) {
                const modal = document.getElementById('shift-summary-modal');
                if (modal) {
                    document.getElementById('shift-summary-duration').textContent = durationStr;
                    document.getElementById('shift-summary-auslaesse').textContent = auslaesseCount;
                    document.getElementById('shift-summary-cleaning').textContent = cleaningCount;
                    document.getElementById('shift-summary-xp').textContent = xpTotal;
                    modal.classList.add('active');
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
                    btn.style.background = 'rgba(46,204,113,0.15)';
                    btn.style.borderColor = '#2ecc71';
                    btn.onclick = shiftCheckin;
                });
                if (statusEl) statusEl.textContent = '';
                if (statusElAlt) statusElAlt.textContent = '';
            }
        }

        async function loadUpcomingMovies() {
            const grid = document.getElementById('upcoming-grid');
            const loader = document.getElementById('upcoming-loading');
            
            grid.innerHTML = '';
            loader.style.display = 'flex';
            grid.style.display = 'none';
            
            try {
                // 1. Current Movies (from lastData which is array of halls)
                let currentMovies = [];
                const seenTitles = new Set();

                if (lastData && Array.isArray(lastData)) {
                    // Flatten halls into sessions
                    const allCurrentSessions = lastData.flatMap(h => h.sessions || []);
                    
                    allCurrentSessions.forEach(s => {
                        if (s.title && !seenTitles.has(s.title)) {
                            seenTitles.add(s.title);
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
                
                // Merge and deduplicate: Only add upcoming if not already seen in current
                const upcomingFiltered = Array.isArray(upcoming) ? upcoming.filter(m => !seenTitles.has(m.title)) : [];
                const allMovies = [...currentMovies, ...upcomingFiltered.map(m => ({...m, current: false}))];

                if (allMovies.length === 0) throw new Error('Keine Filme gefunden');

                grid.innerHTML = allMovies.map(m => {
                    const badge = m.current ? 
                        `<span class="badge" style="position: absolute; top: 8px; left: 8px; background: var(--primary-red); font-size: 0.65rem;">JETZT</span>` :
                        `<span class="badge" style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.65); font-size: 0.65rem;">DEMNÄCHST</span>`;
                    
                    const onClick = m.movieLink ? `onclick="openMovieDetail('${m.movieLink}')"` : `onclick="window.open('https://www.kinopolis.de/${currentCity}', '_blank')"`;

                    return `
                    <div class="hall-card glass movie-item-card" ${onClick} style="cursor: pointer; padding: 0; overflow: hidden; border-radius: 12px;">
                        <div style="position: relative;">
                            <img src="${m.poster}" alt="Poster" style="width: 100%; aspect-ratio: 2/3; object-fit: cover; display: block;">
                            ${badge}
                        </div>
                        <div style="padding: 0.75rem; text-align: center;">
                            <h3 style="font-family: 'Outfit'; font-size: 0.85rem; margin: 0; color: #fff; line-height: 1.2; height: 2.1rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${m.title}</h3>
                        </div>
                    </div>`;
                }).join('');
                
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
                            <strong style="color: ${r.status.includes('Success') ? '#2ecc71' : '#ff4d4d'}">${r.status}</strong><br />
                            <span style="color: var(--text-muted); font-size: 0.7rem;">${r.endpoint}</span>
                            ${r.message ? `<br /><small style="color: #ff4d4d; opacity: 0.8;">${r.message}</small>` : ''}
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

        let TRANSFER_ITEMS = [
            { name: "🍿 Popcorn Süß", target: 40 },
            { name: "🧂 Popcorn Salz", target: 20 },
            { name: "🧀 Nachos", target: 50 },
            { name: "🥤 Becher 1.0L", target: 100 },
            { name: "🥤 Becher 0.5L", target: 100 },
            { name: "🥤 Becher Deckel", target: 150 },
            { name: "🥤 Strohhalme", target: 200 }
        ];

        let EIS_TRANSFER_ITEMS = [
            { name: "🍦 Magnum Classic", target: 20 },
            { name: "🍦 Magnum Mandel", target: 20 },
            { name: "🍦 Magnum White", target: 20 },
            { name: "🍦 Eiskonfekt", target: 15 }
        ];

        async function fetchInventory() {
            try {
                const res = await fetch('/api/inventory');
                const data = await res.json();
                if (data.waren && data.waren.length > 0) TRANSFER_ITEMS = data.waren;
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
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <button class="btn-secondary" onclick="updateTransferCount(${index}, -1)" style="width: 32px; height: 32px; padding: 0; border-radius: 8px; font-weight: bold; background: rgba(229, 9, 20, 0.2); border-color: rgba(229, 9, 20, 0.4); color: #ff4d4d; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">-</button>
                            <input type="number" id="transfer-count-${index}" min="0" value="0" style="width: 45px; height: 32px; text-align: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: var(--primary-blue); font-weight: bold; font-size: 1rem; padding: 0; appearance: textfield;" />
                            <button class="btn-secondary" onclick="updateTransferCount(${index}, 1)" style="width: 32px; height: 32px; padding: 0; border-radius: 8px; font-weight: bold; background: rgba(46, 204, 113, 0.2); border-color: rgba(46, 204, 113, 0.4); color: #2ecc71; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">+</button>
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
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <button class="btn-secondary" onclick="updateEisTransferCount(${index}, -1)" style="width: 32px; height: 32px; padding: 0; border-radius: 8px; font-weight: bold; background: rgba(229, 9, 20, 0.2); border-color: rgba(229, 9, 20, 0.4); color: #ff4d4d; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">-</button>
                                <input type="number" id="eis-transfer-count-${index}" min="0" value="0" style="width: 45px; height: 32px; text-align: center; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: #3498db; font-weight: bold; font-size: 1rem; padding: 0; appearance: textfield;" />
                                <button class="btn-secondary" onclick="updateEisTransferCount(${index}, 1)" style="width: 32px; height: 32px; padding: 0; border-radius: 8px; font-weight: bold; background: rgba(46, 204, 113, 0.2); border-color: rgba(46, 204, 113, 0.4); color: #2ecc71; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">+</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            
            // Also init MHD
            initMhdList();
        }

        function initMhdList() {
            const container = document.getElementById('mhd-items');
            if (!container) return;
            
            // Focus on common products that need MHD tracking
            const mhdProducts = [
                "🥤 Sirup Cola", "🥤 Sirup Zero/Light", "🥤 Sirup Fanta/Sprite",
                "🍿 Popcorn Mais", "🍿 Popcorn Zucker/Fett",
                "🧀 Nacho Käsesauce", "🧀 Nacho Salsa",
                "🥛 Milcherzeugnisse", "☕ Kaffee Bohnen"
            ];
            
            container.innerHTML = mhdProducts.map((name, index) => `
                <div style="display: flex; flex-direction: column; gap: 0.75rem; background: rgba(241, 196, 15, 0.05); padding: 1rem; border-radius: 12px; border: 1px solid rgba(241, 196, 15, 0.15);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                        <span style="font-size: 0.95rem; color: #fff; font-weight: 600;">${name}</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(0,0,0,0.2); padding: 0.5rem 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);">
                        <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Ablaufdatum:</span>
                        <input type="date" id="mhd-date-${index}" style="flex: 1; background: transparent; border: none; color: #fff; font-size: 0.85rem; outline: none; font-family: 'Outfit'; cursor: pointer;" />
                    </div>
                </div>
            `).join('');
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

        function toggleFunkGlobal(category) {
            const targetId = `funk-${category}-options`;
            const optionsEl = document.getElementById(targetId);
            
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


        // Init notes
        const notesArea = document.getElementById('staff-notes');
        if (notesArea) {
            notesArea.value = localStorage.getItem('staff_notes') || '';
            notesArea.addEventListener('input', (e) => {
                localStorage.setItem('staff_notes', e.target.value);
            });
        }

        // Update clock and countdowns
