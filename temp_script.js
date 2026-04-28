    <script>
        // --- GLOBALS & STATE ---
        const API_URL = '/api/sessions';
        const LOCATIONS_URL = '/api/locations';
        const VAPID_PUBLIC_KEY = 'BCP-JGZbVBjKY1_blxAHw6bC5Ddf0nLAyPSp8q39kV7utFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8';

        let lastData = null;
        let lastUpdateTime = null;
        let currentCity = 'kp';
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
        let scannedPlanData = safeParse('scanned_plan_data', []);
        let shiftStartTime = localStorage.getItem('shift_start_time') ? new Date(localStorage.getItem('shift_start_time')) : null;


        const CLEANING_TASKS = {
            1: ["Tagesaufgabe 1: MONTAG"], 2: ["Tagesaufgabe 1: DIENSTAG"], 
            3: ["Tagesaufgabe 1: MITTWOCH"], 4: ["Tagesaufgabe 1: DONNERSTAG"],
            5: ["Tagesaufgabe 1: FREITAG"], 6: ["Tagesaufgabe 1: SAMSTAG"], 0: ["Tagesaufgabe 1: SONNTAG"]
        };


        // --- GLOBAL TOAST ---
        function showToast(msg, isError = false) {
            const t = document.getElementById('global-toast');
            if(!t) return;
            document.getElementById('toast-msg').innerText = msg;
            document.getElementById('toast-icon').innerText = isError ? '❌' : '✅';
            
            const iconBg = isError ? 'rgba(231, 76, 60, 0.2)' : 'rgba(46, 204, 113, 0.2)';
            document.getElementById('toast-icon').style.background = iconBg;
            
            t.classList.add('show');
            setTimeout(() => { t.classList.remove('show'); }, 3500);
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

        function formatTime(isoStr) {
            const date = new Date(isoStr);
            return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        }

        async function runSafe(fn, errorMsg) {
            try { return await fn(); } 
            catch (e) { 
                console.error(errorMsg, e);
                return null;
            }
        }

        const CAT_ICONS = {
            'leitung': { icon: '👔', bg: 'bg-gold' },
            'theke': { icon: '🍿', bg: 'bg-purple' },
            'einlass': { icon: '🎟️', bg: 'bg-blue' },
            'technik': { icon: '⚙️', bg: 'bg-green' },
            'sicherheit': { icon: '🛡️', bg: 'bg-red' },
            'popcornkueche': { icon: '🔥', bg: 'bg-gold' },
            'putzfirma': { icon: '🧹', bg: 'bg-blue' }
        };

        const KP_DEFAULT_CONTACTS = [
            { category: 'leitung', role_name: 'BL', phone_number: '+49 6151 87059288' },
            { category: 'leitung', role_name: 'TL 1', phone_number: '+49 6151 87059212' },
            { category: 'leitung', role_name: 'TL 2', phone_number: '+49 6151 87059213' },
            { category: 'leitung', role_name: 'TL 3', phone_number: '+49 6151 87059214' },
            { category: 'einlass', role_name: 'Einlass 1', phone_number: '+49 6151 87059233' },
            { category: 'einlass', role_name: 'Einlass 2', phone_number: '+49 6151 87059234' },
            { category: 'einlass', role_name: 'Einlass 3', phone_number: '+49 6151 87059235' },
            { category: 'einlass', role_name: 'Einlass 4', phone_number: '+49 6151 87059236' },
            { category: 'theke', role_name: 'Counter hinten', phone_number: '+49 6151 87059203' }
        ];

        const CAT_NAMES = {
            'leitung': 'Leitung',
            'einlass': 'Einlass',
            'theke': 'Kasse/Theke',
            'sicherheit': 'Sicherheit',
            'popcornkueche': 'Popcornküche',
            'putzfirma': 'Putzfirma',
            'technik': 'Technik'
        };

        // --- GAMIFICATION STUB ---
        function updateGamification() {
            const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            const xp = checkboxes.length * 15; // 15 XP per task
            
            const xpDisplay = document.getElementById('user-xp');
            const levelDisplay = document.getElementById('user-level');
            const progress = document.getElementById('xp-progress');
            
            if (xpDisplay) xpDisplay.innerText = `${xp} XP`;
            if (progress) progress.style.width = `${Math.min(100, (xp % 100))}%`;
            
            if (levelDisplay) {
                if (xp < 50) levelDisplay.innerText = 'Anfänger';
                else if (xp < 150) levelDisplay.innerText = 'Fortgeschrittener';
                else if (xp < 300) levelDisplay.innerText = 'Profi';
                else levelDisplay.innerText = 'Meister';
            }
        }
        
        // Listen for checkbox changes to update XP live
        document.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') updateGamification();
        });

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
            // Update UI State for both Desktop and Mobile
            document.querySelectorAll('.tab-btn, .mobile-nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Clean view classes
            document.body.classList.remove(
                'tools-active', 'info-active', 'stats-active', 
                'kontakte-active', 'intern-active', 'einstellungen-active', 
                'funk-active', 'mehr-active', 'action-active', 'live-active'
            );
            
            // Apply new view state
            const titleEl = document.getElementById('main-title');
            const suffix = ' V1.0';
            
            if (view === 'live') {
                document.body.classList.add('live-active');
                if (titleEl) titleEl.innerText = 'Live Overview' + suffix;
            } else if (view === 'funk') {
                document.body.classList.add('tools-active', 'funk-active');
                if (titleEl) titleEl.innerText = 'Funk-Ruf (Digital)' + suffix;
                fetchInventory();
            } else if (view === 'action') {
                document.body.classList.add('action-active', 'intern-active', 'tools-active');
                if (titleEl) titleEl.innerText = 'Team-Aktionen' + suffix;
            } else if (view === 'mehr') {
                document.body.classList.add('mehr-active', 'stats-active', 'kontakte-active', 'info-active', 'einstellungen-active');
                if (titleEl) titleEl.innerText = 'Mehr & Infos' + suffix;
                loadUpcomingMovies();
            } else if (view === 'stats') {
                document.body.classList.add('stats-active');
                if (titleEl) titleEl.innerText = 'Statistik & Auswertung' + suffix;
            } else if (view === 'kontakte') {
                document.body.classList.add('kontakte-active');
                if (titleEl) titleEl.innerText = 'Telefonliste' + suffix;
            } else if (view === 'intern' || view === 'tools') {
                document.body.classList.add('intern-active', 'tools-active');
                if (titleEl) titleEl.innerText = 'Interne Tools' + suffix;
                if (document.getElementById('transfer-items').children.length === 0) initTransferList();
            } else if (view === 'info') {
                document.body.classList.add('info-active');
                if (titleEl) titleEl.innerText = 'Film-Informationen' + suffix;
                loadUpcomingMovies();
            } else if (view === 'einstellungen') {
                document.body.classList.add('einstellungen-active');
                if (titleEl) titleEl.innerText = 'Einstellungen' + suffix;
            } else {
                document.body.classList.add(view + '-active');
                if (titleEl) titleEl.innerText = view.charAt(0).toUpperCase() + view.slice(1) + suffix;
            }

            // Scroll to top on mobile for better UX
            if (window.innerWidth <= 768) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // --- APP START ---
        // 1. IMMEDIATE SPLASH SCREEN FAILSAFE
        setTimeout(() => {
            const splash = document.getElementById('splash-screen');
            if (splash) {
                splash.style.opacity = '0';
                splash.style.pointerEvents = 'none';
                setTimeout(() => splash.style.display = 'none', 1000);
                console.log('SPLASH: Main failsafe triggered');
            }
        }, 3000);

        // 2. IMMEDIATE INITIALIZATION (Don't wait for all images/assets)
        async function init() {
            console.log('APP: Starting initialization...');
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

                // Auth Init - Should be fast and non-blocking now
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
                        if (window.updateGamification) updateGamification();
                    }
                }

                playStartupSound();
                if (window.checkAndPromptDepartment) checkAndPromptDepartment();

                // Core Data
                await fetchLocations().catch(e => console.error("Locations failed:", e));
                
                // Mobile Header
                let lastScrollTop = 0;
                window.addEventListener('scroll', () => {
                    if (window.innerWidth <= 768) {
                        const st = window.pageYOffset || document.documentElement.scrollTop;
                        const header = document.querySelector('header');
                        if (!header) return;
                        if (st > lastScrollTop && st > 80) {
                            header.style.transform = 'translateY(-100%)';
                        } else {
                            header.style.transform = 'translateY(0)';
                        }
                        lastScrollTop = st <= 0 ? 0 : st;
                    }
                }, { passive: true });

                await Promise.all([
                    runSafe(fetchSessions, 'Sessions'),
                    runSafe(fetchWeather, 'Weather'),
                    runSafe(fetchNews, 'News'),
                    runSafe(loadLfItems, 'LostFound'),
                    runSafe(initTransferList, 'TransferList'),
                    runSafe(applyModuleVisibility, 'Visibility'),
                    runSafe(loadContacts, 'Contacts')
                ]);

                // Default Tab
                const tabLive = document.querySelector('.mobile-nav-item[onclick*="live"]');
                if (tabLive) switchTab('live', tabLive);

                // Setup toggle for Auslässe
                const auslaesseBtn = document.getElementById('auslaesse-toggle-btn');
                if (auslaesseBtn) {
                    auslaesseBtn.addEventListener('click', () => {
                        const content = document.getElementById('auslaesse-content');
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
                if (window.updateLiveAlertBanner) updateLiveAlertBanner();
                
                // Initialize default tab
                const activeBtn = document.querySelector('.mobile-nav-item.active') || document.querySelector('.tab-btn.active') || document.getElementById('tab-live');
                if (activeBtn) switchTab('live', activeBtn);

            } catch (error) {
                console.error('APP: Fatal Init Error:', error);
                // Last resort: hide splash screen
                const splash = document.getElementById('splash-screen');
                if (splash) splash.classList.add('fade-out');
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
                    } else {
                        console.error("Report API error:", data.error);
                        showToast('⚠️ E-Mail Fehler: ' + (data.error || 'Unbekannt'), true);
                    }
                } catch (e) { 
                    console.error("Report network error", e); 
                    showToast('📡 Netzwerk-Fehler beim Report', true);
                }
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
            
            if (!grid) return;
            grid.innerHTML = '';
            if (loader) loader.style.display = 'flex';
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
                let upcoming = [];
                if (res.ok) {
                    upcoming = await res.json();
                }
                
                // Merge and deduplicate: Only add upcoming if not already seen in current
                const upcomingFiltered = Array.isArray(upcoming) ? upcoming.filter(m => !seenTitles.has(m.title)) : [];
                const allMovies = [...currentMovies, ...upcomingFiltered.map(m => ({...m, current: false}))];

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
            const settingsTextEl = document.querySelector('.settings-date-text');
            if(!textEl || !subEl) return;
            
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

            textEl.innerText = dayName;
            const dateStr = displayDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
            subEl.innerText = dateStr;
            
            if (settingsTextEl) {
                settingsTextEl.innerText = `${dayName}, ${dateStr}`;
            }
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
            const activeItems = document.getElementById('active-checklist-items');
            const group = selector.value;

            if (group === 'lostfound') {
                if (checklistContainer) checklistContainer.style.display = 'none';
                if (lfContainer) lfContainer.style.display = 'block';
                await loadLfItems();
            } else {
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
            }
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
        async function loadLfItems() {
            const list = document.getElementById('lf-items-list');
            if(!list) return;
            
            try {
                const res = await fetch(`/api/lostfound?location=${currentCity}`);
                if (!res.ok) throw new Error();
                const allItems = await res.json();

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
                    list.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-muted); font-style: italic;">Keine passenden Fundsachen gefunden.</div>';
                    return;
                }
                
                list.innerHTML = '';
                items.forEach((item) => {
                    const el = document.createElement('div');
                    el.className = 'glass';
                    el.style.cssText = 'padding: 1.2rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;';
                    el.innerHTML = `
                        <div style="flex: 1;">
                            <div style="font-weight: 700; font-size: 1.1rem; color: white;">${item.what}</div>
                            <div style="display: flex; gap: 1rem; margin-top: 0.4rem; font-size: 0.82rem; color: var(--text-muted);">
                                <span>📂 ${item.category}</span>
                                <span>📍 ${item.found_where}</span>
                            </div>
                            <div style="margin-top: 0.4rem; font-size: 0.75rem; color: rgba(255,255,255,0.3);">
                                Gefunden am ${new Date(item.created_at).toLocaleString('de-DE')} von ${item.found_by}
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.5rem;">
                            <button onclick="deleteLfItem(${item.id})" style="
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
                        what, category, found_where: where, found_by: who
                    })
                });
                
                if (res.ok) {
                    closeLfModal();
                    loadLfItems();
                    if (typeof showToast === 'function') showToast("Fundsache erfolgreich gespeichert");
                    updateGamification();
                }
            } catch (e) {
                if (typeof showToast === 'function') showToast("Fehler beim Speichern", true);
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
                container.style.display = 'none';
                list.innerHTML = '';
                return;
            }

            container.style.display = 'block';
            const badge = document.getElementById('news-count-badge');
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
                                <span class="news-meta">${new Date(item.created_at).toLocaleString('de-DE')} von ${item.author}</span>
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
                const selector = document.getElementById('cinema-selector');
                
                if (!Array.isArray(locations)) {
                    console.error('fetchLocations: Expected array but got:', locations);
                    return;
                }

                locations.forEach(loc => {
                    const option = document.createElement('option');
                    option.value = loc.slug;
                    option.textContent = loc.name;
                    if (loc.slug === currentCity) option.selected = true;
                    selector.appendChild(option);
                });

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
                
                if (!response.ok) {
                    const errorText = await response.text().catch(() => 'Keine Fehlerdetails');
                    console.error(`API Error (${response.status}):`, errorText);
                    document.getElementById('status-indicator').innerHTML = `<span style="color:#ff4d4d">❌ Fehler ${response.status}</span>`;
                    throw new Error(`Server antwortet mit Status ${response.status}`);
                }

                const contentType = response.headers.get('content-type');
                if (!contentType || !contentType.includes('application/json')) {
                    throw new Error('Server hat kein JSON gesendet (evtl. Wartungsmodus)');
                }

                const sessions = await response.json();
                
                if (!sessions || !Array.isArray(sessions)) {
                    console.error('Invalid session data format:', sessions);
                    throw new Error('Ungültiges Datenformat vom Server');
                }

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

            if (!halls || !Array.isArray(halls)) { 
                dashboard.innerHTML = `
                    <div class="glass" style="padding: 3rem; text-align: center; grid-column: 1/-1;">
                        <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">📡</span>
                        <h3>Keine Verbindung zu den Live-Daten</h3>
                        <p style="color: var(--text-muted); margin-top: 1rem;">Der Server antwortet gerade nicht oder sendet fehlerhafte Daten.</p>
                        <button onclick="fetchSessions()" class="btn-primary" style="margin-top: 1.5rem; padding: 0.8rem 2rem;">Erneut versuchen</button>
                    </div>`;
                return; 
            }
            
            halls.forEach(hall => {
                const hallName = hall.name;
                const sessions = hall.sessions || []; // Safety fallback

                // Skip halls where the last session ended more than 60 minutes ago
                const lastEndMin = sessions.reduce((max, s) => {
                    if (s.time && s.time.includes(':')) {
                        const [h, m] = s.time.split(':').map(Number);
                        return Math.max(max, h * 60 + m + (s.duration || 0));
                    }
                    return max;
                }, 0);
                if (lastEndMin > 0 && currentMinutes > lastEndMin + 60) return; // skip stale hall

                const card = document.createElement('div');
                
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
                                <div class="movie-title" title="${s.title}" onclick="openMovieDetail('${s.movieLink || ''}')" style="cursor: pointer;">${s.title}</div>
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
                        <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
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

        function loadTaskState() {
            try {
                const auslaesse = localStorage.getItem(`completed_auslaesse_${currentCity}`);
                const posters = localStorage.getItem(`completed_posters_${currentCity}`);
                const cleaning = localStorage.getItem(`completed_cleaning_${currentCity}`);
                
                completedAuslaesse = new Set(auslaesse ? JSON.parse(auslaesse) : []);
                completedPosters = new Set(posters ? JSON.parse(posters) : []);
                completedCleaning = new Set(cleaning ? JSON.parse(cleaning) : []);
            } catch (e) {
                console.error("Error loading task state", e);
                completedAuslaesse = new Set();
                completedPosters = new Set();
                completedCleaning = new Set();
            }
        }

        function saveTaskState() {
            localStorage.setItem(`completed_auslaesse_${currentCity}`, JSON.stringify(Array.from(completedAuslaesse)));
            localStorage.setItem(`completed_posters_${currentCity}`, JSON.stringify(Array.from(completedPosters)));
            localStorage.setItem(`completed_cleaning_${currentCity}`, JSON.stringify(Array.from(completedCleaning)));
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

                    // 2. Auslass Task (All sessions)
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
                // Removed Abbau from checklist - only show as alerts/exits
                // const abbauTasks = getKpStationTasks(hallsGrouped);
                // allTasks.push(...abbauTasks);
            }

            // Filter for tasks:
            // - Auslaesse: Only show if not done OR if it happened within the last 60 minutes
            // - Cleaning: ALWAYS show
            // - Posters: Only if done (historical view), but they are primarily in alerts
            const liveTasks = allTasks.filter(t => {
                if (t.type === 'auslass') {
                    const isDone = completedAuslaesse.has(t.id);
                    const isOld = currentMinutes > (t.time + 60);
                    // Hide if older than 1 hour (requested by user)
                    if (isOld) return false;
                    return true;
                }
                if (t.type === 'cleaning') return true;
                if (t.type === 'poster') return completedPosters.has(t.id);
                return true;
            });


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
                
                if (!movieStats[s.title]) movieStats[s.title] = { sold: 0, poster: s.poster, movieLink: s.movieLink };
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
                    <div class="stat-value" style="font-size: 1.2rem; color: #3498db;">OK V1.0</div>
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
            if (!header) return;
            const sessionsList = header.closest('.hall-card')?.querySelector('.sessions-list');
            if (!sessionsList) return;
            header.classList.toggle('collapsed');
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
            // ONLY FOR DARMSTADT ('kp')
            if (currentCity !== 'kp') return;

            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            const allAlerts = [];

            hallsGrouped.forEach(hall => {
                const hallName = hall.name;
                const hallSessions = hall.sessions.filter(s => s.time && s.time.includes(':')).sort((a, b) => a.time.localeCompare(b.time));
                if (hallSessions.length === 0) return;

                // Only find the LATEST poster change that has already happened
                let latestAlert = null;
                
                // Track if we found a potential alert - if so, ensure others for this hall are cleared
                // (LatestAlert logic naturally cleans up older alerts for the same hall when rendering)

                hallSessions.forEach((s, idx) => {
                    const [sh, sm] = s.time.split(':').map(Number);
                    const changeMin = (sh * 60 + sm) + 30;
                    
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
        function markPosterDone(id, btn) {
            completedPosters.add(id);
            saveTaskState();
            
            // Optimistic UI: Hide alert immediately
            if (btn) {
                const alert = btn.closest('.poster-change-alert');
                if (alert) {
                    alert.style.opacity = '0';
                    alert.style.transform = 'scale(0.9)';
                    alert.style.pointerEvents = 'none';
                    setTimeout(() => {
                        alert.remove();
                        // Update badge count
                        const alertsContainer = document.getElementById('poster-alerts');
                        const count = alertsContainer.children.length;
                        document.getElementById('alert-count-badge').textContent = count;
                        if (count === 0) document.getElementById('poster-alerts-container').style.display = 'none';
                    }, 300);
                }
            }
            
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
                // Check for feedback param
                const params = new URLSearchParams(window.location.search);
                if (params.get('feedback') === 'true') {
                    setTimeout(() => openFeedback('bl'), 1500);
                } else {
                    // Show Dev Info Popup on startup only if not feedback mode
                    setTimeout(() => {
                        const modal = document.getElementById('dev-info-modal');
                        if (modal) modal.classList.add('active');
                    }, 2000);
                }
            });
        } else {
            init();
            const params = new URLSearchParams(window.location.search);
            if (params.get('feedback') === 'true') {
                setTimeout(() => openFeedback('bl'), 1500);
            } else {
                setTimeout(() => openFeedback('artjom'), 2000);
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
                    status.style.background = 'rgba(46, 204, 113, 0.1)';
                    status.style.color = '#2ecc71';
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

                renderContacts(contacts.length > 0 ? contacts : KP_DEFAULT_CONTACTS);
                renderAdminContacts(contacts);
            } catch (e) {
                console.warn("Backend contacts failed, using fallback", e);
                renderContacts(KP_DEFAULT_CONTACTS);
            }
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
                
                // Fallback logic if no contacts from backend
                if (contacts.length === 0) {
                if (currentCity === 'kp') {
                    contacts = KP_DEFAULT_CONTACTS;
                } else {
                    contacts = [
                        { category: 'leitung', role_name: 'TL', phone_number: '000' },
                        { category: 'einlass', role_name: 'Einlass', phone_number: '000' },
                        { category: 'theke', role_name: 'Theke', phone_number: '000' },
                        { category: 'Sicherheit', role_name: 'Sicherheitsdienst', phone_number: '000' },
                        { category: 'Popcornküche', role_name: 'Produktion', phone_number: '000' },
                        { category: 'Putzfirma', role_name: 'Reinigung', phone_number: '000' }
                    ];
                }
            }

                const byCategory = {};
                for (const c of contacts) {
                    if (!byCategory[c.category]) byCategory[c.category] = [];
                    byCategory[c.category].push(c);
                }

                let html = '';
                for (const cat of Object.keys(CAT_NAMES)) {
                    if (!byCategory[cat]) continue;
                    html += `
                    <div>
                        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 0.5rem;">
                            <span style="width: 20px; height: 1px; background: rgba(255,255,255,0.1);"></span> ${CAT_NAMES[cat]}
                        </div>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.6rem;">
                            ${byCategory[cat].map(c => {
                                const info = CAT_ICONS[c.category] || { icon: '📞', bg: '' };
                                return `
                                <a href="tel:${c.phone_number}" class="contact-card mini">
                                    <div class="contact-card-inner">
                                        <div class="contact-icon sm ${info.bg}">${info.icon}</div>
                                        <div>
                                            <div class="contact-name">${c.role_name}</div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted);">${c.phone_number}</div>
                                        </div>
                                    </div>
                                    <div class="contact-dial-sm">📲</div>
                                </a>`;
                            }).join('')}
                        </div>
                    </div>`;
                }

                container.innerHTML = html;
                if (loader) loader.style.display = 'none';
                container.style.display = 'flex';

            } catch (e) {
                console.error("Error rendering contacts:", e);
                if (loader) loader.innerHTML = '<div style="padding: 2rem; color: #ff4d4d;">Fehler beim Laden der Kontakte.</div>';
            }
        }



    </script>
