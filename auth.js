const AUTH = {
    token: localStorage.getItem('kp_auth_token'),
    user: JSON.parse(localStorage.getItem('kp_user') || 'null'),
    modalInjected: false,

    async init() {
        this.injectModal();
        console.log('AUTH: Initializing...', { 
            hasToken: !!this.token, 
            guest: localStorage.getItem('kp_guest_mode'),
            lsToken: localStorage.getItem('kp_auth_token')
        });
        
        if (localStorage.getItem('kp_guest_mode') === 'true') {
            this.updateUI();
            return;
        }

        if (this.token) {
            console.log("AUTH: Token found, forcing UI unlock...");
            this.updateUI(); // IMMEDIATELY SHOW CONTENT
            
            // Background verification - do not await to prevent blocking the UI
            fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${this.token}` }
            }).then(async res => {
                if (res.ok) {
                    const data = await res.json();
                    this.user = data.user;
                    localStorage.setItem('kp_user', JSON.stringify(this.user));
                    this.updateUI(); // Update again with fresh user data
                } else if (res.status === 401) {
                    console.error('AUTH: Token expired or invalid');
                    // Optional: this.logout(false);
                }
            }).catch(e => {
                console.error('AUTH: Background check failed', e);
            });
        } else {
            this.showLoginModal();
        }
    },

    injectModal() {
        if (this.modalInjected || document.getElementById('auth-modal')) return;
        
        const modalHtml = `
            <div id="auth-modal" class="modal">
                <div class="modal-content glass" id="auth-modal-content" style="max-width: 400px; padding: 2.5rem; position: relative;">
                    <div id="auth-error-msg" style="display: none; background: rgba(229, 9, 20, 0.15); border: 1px solid rgba(229, 9, 20, 0.3); color: #ff4d4d; padding: 12px; border-radius: 12px; margin-bottom: 1.5rem; font-size: 0.85rem; text-align: center; font-weight: 600; animation: fadeIn 0.3s;">
                        ❌ Fehlermeldung
                    </div>

                    <div style="text-align: center; margin-bottom: 2rem;">
                        <div style="width: 80px; height: 80px; background: rgba(229, 9, 20, 0.1); border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                            <span style="font-size: 2.5rem;">🍿</span>
                        </div>
                        <h2 style="font-size: 1.5rem; font-weight: 800;">Willkommen zurück <span style="font-size: 0.7rem; vertical-align: middle; opacity: 0.5;">V1.0</span></h2>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Bitte melde dich an, um fortzufahren.</p>
                    </div>
                    
                    <div id="login-form">
                        <div style="margin-bottom: 1.25rem;">
                            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">E-Mail Adresse</label>
                            <input type="email" id="login-email" class="glass-input" placeholder="name@kinopolis.de" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                        </div>
                        <div style="margin-bottom: 2rem; position: relative;">
                            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Passwort</label>
                            <input type="password" id="login-password" class="glass-input" placeholder="••••••••" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                            <button onclick="AUTH.showForgotPassword()" style="position: absolute; right: 0; bottom: -20px; background: none; border: none; color: var(--text-muted); font-size: 0.75rem; cursor: pointer; font-weight: 600;">Passwort vergessen?</button>
                        </div>
                        
                        <button onclick="AUTH.handleLogin()" id="login-btn" class="btn-primary" style="width: 100%; padding: 1rem; border-radius: 12px; font-weight: 800; font-size: 1rem; margin-bottom: 1rem;">
                            Anmelden
                        </button>
                        
                        <div style="text-align: center; display: flex; flex-direction: column; gap: 0.75rem;">
                            <button onclick="AUTH.showRegister()" style="background: none; border: none; color: var(--primary-blue); font-weight: 600; cursor: pointer; font-size: 0.9rem;">Noch kein Konto? Jetzt registrieren</button>
                            <button onclick="AUTH.enableGuestMode()" style="background: none; border: none; color: var(--text-muted); font-weight: 500; cursor: pointer; font-size: 0.8rem;">Im Gast-Modus fortfahren (Eingeschränkt)</button>
                        </div>
                    </div>

                    <div id="register-form" style="display: none;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                            <div>
                                <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">VORNAME</label>
                                <input type="text" id="reg-firstname" class="glass-input" placeholder="Max" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                            </div>
                            <div>
                                <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">NACHNAME</label>
                                <input type="text" id="reg-lastname" class="glass-input" placeholder="Mustermann" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                            </div>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">E-MAIL</label>
                            <input type="email" id="reg-email" class="glass-input" placeholder="email@beispiel.de" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">STANDORT</label>
                            <select id="reg-location" class="glass-input" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                                <option value="kp">Darmstadt: KINOPOLIS</option>
                                <option value="cd">Darmstadt: Citydome</option>
                                <option value="rx">Darmstadt: Rex</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 1.5rem;">
                            <label style="display: block; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.4rem;">PASSWORT</label>
                            <input type="password" id="reg-password" class="glass-input" placeholder="Sicheres Passwort" style="width: 100%; padding: 0.8rem; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                        </div>
                        
                        <button onclick="AUTH.handleRegister()" id="reg-btn" class="btn-primary" style="width: 100%; padding: 1rem; border-radius: 12px; font-weight: 800;">Konto erstellen</button>
                        <button onclick="AUTH.showLogin()" style="width: 100%; background: none; border: none; color: var(--text-muted); margin-top: 1rem; cursor: pointer;">Zurück zum Login</button>
                    </div>
                </div>
            </div>
        `;
        
        const modalContainer = document.createElement('div');
        modalContainer.id = 'auth-modal-container';
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer);

        // Add Modal CSS
        const style = document.createElement('style');
        style.innerHTML = `
            .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 10000; display: none; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s; }
            .modal.active { display: flex; opacity: 1; }
            .glass { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(20px); border-radius: 24px; }
            .btn-primary { background: linear-gradient(135deg, #e50914, #ff3d47); color: white; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3); }
            .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(229, 9, 20, 0.5); filter: brightness(1.1); }
            .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
            .glass-input:focus { border-color: #e50914 !important; background: rgba(255,255,255,0.08) !important; outline: none; }
            @keyframes auth-shake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-10px); } 40%, 80% { transform: translateX(10px); } }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            .shake { animation: auth-shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        `;
        document.head.appendChild(style);
        this.modalInjected = true;
    },

    showError(msg) {
        const errorEl = document.getElementById('auth-error-msg');
        const contentEl = document.getElementById('auth-modal-content');
        if (errorEl) {
            errorEl.innerText = '❌ ' + msg;
            errorEl.style.display = 'block';
        }
        if (contentEl) {
            contentEl.classList.add('shake');
            setTimeout(() => contentEl.classList.remove('shake'), 400);
        }
    },

    async handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const btn = document.getElementById('login-btn');
        const errorEl = document.getElementById('auth-error-msg');
        
        if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.style.background = 'rgba(229, 9, 20, 0.15)';
            errorEl.style.color = '#ff4d4d';
        }

        if (!email || !password) return this.showError('Bitte E-Mail und Passwort ausfüllen');
        
        btn.disabled = true;
        btn.innerText = 'Wird angemeldet...';
        
        const res = await this.login(email, password);
        if (res.success) {
            if (errorEl) {
                errorEl.innerText = '✅ Anmeldung erfolgreich! Dashboard wird geladen...';
                errorEl.style.background = 'rgba(0, 255, 100, 0.1)';
                errorEl.style.color = '#00ff66';
                errorEl.style.display = 'block';
            }
            sessionStorage.setItem('trigger_login_popcorn', 'true');
            setTimeout(() => location.reload(), 800);
        } else {
            this.showError(res.error || 'Anmeldung fehlgeschlagen');
            btn.disabled = false;
            btn.innerText = 'Anmelden';
        }
    },

    async handleRegister() {
        const email = document.getElementById('reg-email').value;
        const firstName = document.getElementById('reg-firstname').value;
        const lastName = document.getElementById('reg-lastname').value;
        const location = document.getElementById('reg-location').value;
        const password = document.getElementById('reg-password').value;
        const btn = document.getElementById('reg-btn');
        const errorEl = document.getElementById('auth-error-msg');
        
        if (errorEl) errorEl.style.display = 'none';
        if (!email || !password || !firstName || !lastName) return this.showError('Bitte alle Pflichtfelder ausfüllen');
        
        btn.disabled = true;
        btn.innerText = 'Wird erstellt...';
        
        const res = await this.register(email, firstName, lastName, location, '', password);
        if (res.success) {
            alert('Konto erfolgreich erstellt! Du kannst dich jetzt anmelden.');
            this.showLogin();
        } else {
            this.showError(res.error || 'Registrierung fehlgeschlagen');
        }
        btn.disabled = false;
        btn.innerText = 'Konto erstellen';
    },

    showRegister() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    },

    showLogin() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    },

    enableGuestMode() {
        localStorage.setItem('kp_guest_mode', 'true');
        sessionStorage.setItem('trigger_login_popcorn', 'true');
        location.reload();
    },

    async login(email, password) {
        try {
            console.log('AUTH: Attempting login for', email);
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            console.log('AUTH: Login response', data);
            
            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('kp_auth_token', this.token);
                localStorage.setItem('kp_user', JSON.stringify(this.user));
                localStorage.removeItem('kp_guest_mode');
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (e) {
            console.error('AUTH: Login error', e);
            return { success: false, error: 'Server nicht erreichbar' };
        }
    },

    async register(email, firstName, lastName, location, empNum, password) {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, first_name: firstName, last_name: lastName, location, employee_number: empNum, password })
            });
            const data = await res.json();
            return data;
        } catch (e) {
            return { success: false, error: 'Registrierung fehlgeschlagen' };
        }
    },

    async logout(reload = true) {
        if (window.shiftCheckout) await window.shiftCheckout(true);
        localStorage.removeItem('kp_auth_token');
        localStorage.removeItem('kp_user');
        localStorage.removeItem('kp_guest_mode');
        this.token = null;
        this.user = null;
        if (reload) location.reload();
    },

    showLoginModal() {
        this.injectModal();
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('active');
    },

    hideLoginModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('active');
    },

    showForgotPassword() {
        const modal = document.getElementById('auth-modal');
        const content = modal.querySelector('.modal-content');
        content.innerHTML = `
            <div style="text-align:center;">
                <h2 style="font-family:'Outfit',sans-serif;margin-bottom:12px;">Passwort vergessen?</h2>
                <p style="color:#8E8E93;font-size:0.9rem;margin-bottom:24px;">Gib deine E-Mail ein, um einen Reset-Link zu erhalten.</p>
                <input type="email" id="forgot-email" placeholder="E-Mail Adresse" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);padding:14px;border-radius:12px;color:white;margin-bottom:16px;outline:none;">
                <button onclick="AUTH.requestPasswordReset()" style="width:100%;background:#E50914;color:white;border:none;padding:14px;border-radius:12px;font-weight:800;cursor:pointer;">Link anfordern</button>
                <p onclick="location.reload()" style="color:#E50914;margin-top:20px;cursor:pointer;font-size:0.9rem;font-weight:600;">Abbrechen</p>
            </div>
        `;
    },

    async requestPasswordReset() {
        const email = document.getElementById('forgot-email').value;
        const btn = document.querySelector('button[onclick="AUTH.requestPasswordReset()"]');
        if (!email) return alert('Bitte E-Mail eingeben');
        
        if (btn) {
            btn.disabled = true;
            btn.innerText = 'Wird gesendet...';
        }

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email, 
                    theme: localStorage.getItem('theme') || 'dark'
                })
            });
            if (res.ok) {
                const content = document.getElementById('auth-modal-content');
                if (content) {
                    content.innerHTML = `
                        <div style="text-align:center;padding:1rem;">
                            <div style="font-size:4rem;margin-bottom:1.5rem;animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);">📧</div>
                            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:0.75rem;">Link gesendet!</h2>
                            <p style="color:#8E8E93;font-size:0.95rem;line-height:1.5;margin-bottom:2rem;">
                                Wir haben einen Reset-Link an <strong style="color:white;">${email}</strong> geschickt.<br>
                                <span style="font-size:0.8rem;">(Bitte auch den Spam-Ordner prüfen)</span>
                            </p>
                            <button onclick="location.reload()" class="btn-primary" style="width:100%;padding:1rem;border-radius:12px;font-weight:800;cursor:pointer;">
                                Zurück zum Login
                            </button>
                        </div>
                    `;
                }
            } else {
                alert('Fehler beim Senden des Links. Bitte versuche es später erneut.');
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = 'Link anfordern';
                }
            }
        } catch (e) { 
            alert('Netzwerkfehler'); 
            if (btn) {
                btn.disabled = false;
                btn.innerText = 'Link anfordern';
            }
        }
    },

    updateUI() {
        // Essential: Allow content to be seen
        document.body.classList.add('auth-loaded');
        
        // APPLY ROLE CLASSES FOR CSS VISIBILITY
        if (this.user && this.user.role) {
            // Clean up existing roles
            document.body.classList.remove('role-user', 'role-tl', 'role-bl', 'role-admin');
            // Add current role (lowercase)
            document.body.classList.add('role-' + this.user.role.toLowerCase());
            console.log('AUTH: Applied role class', 'role-' + this.user.role.toLowerCase());
        }

        this.hideLoginModal();

        const userBtn = document.getElementById('user-profile-btn');
        if (!userBtn) return;

        if (this.user) {
            userBtn.innerHTML = `
                <div style="display:flex;align-items:center;gap:10px;">
                    <span>👤</span> ${this.user.name || 'Profil'}
                </div>
            `;
            userBtn.onclick = () => this.showProfileModal();
            userBtn.title = 'Profil & Einstellungen';
        } else if (localStorage.getItem('kp_guest_mode') === 'true') {
            userBtn.innerHTML = '<span>👤</span> Gast (Anmelden)';
            userBtn.onclick = () => {
                localStorage.removeItem('kp_guest_mode');
                location.reload();
            };
            userBtn.title = 'Klick zum Anmelden';
        }
    },

    showProfileModal() {
        const modal = document.getElementById('auth-modal');
        const content = modal.querySelector('.modal-content');
        
        const roleNames = {
            'admin': 'Administrator',
            'BL': 'Betriebsleitung',
            'TL': 'Teamleiter',
            'user': 'Mitarbeiter'
        };

        const roleColor = this.user.role === 'admin' || this.user.role === 'BL' ? '#e50914' : '#0078FF';

        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.05); border: 2px solid ${roleColor}; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 3rem; box-shadow: 0 0 20px ${roleColor}33;">
                    👤
                </div>
                <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.25rem;">${this.user.name}</h2>
                <div style="background: ${roleColor}22; color: ${roleColor}; display: inline-block; padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;">
                    ${roleNames[this.user.role] || this.user.role}
                </div>
            </div>

            <div style="background: rgba(255,255,255,0.02); border-radius: 20px; padding: 1.5rem; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--text-muted); font-size: 0.85rem;">E-Mail</span>
                        <span style="font-weight: 600; font-size: 0.9rem;">${this.user.email}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Standort</span>
                        <span style="font-weight: 600; font-size: 0.9rem;">${this.user.location.toUpperCase()}</span>
                    </div>
                    <!-- DEPT SELECTOR -->
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.05);">
                        <span style="color: var(--text-muted); font-size: 0.85rem;">Aktiver Bereich</span>
                        <select onchange="if(window.selectDept) window.selectDept(this.value)" style="background: rgba(255,255,255,0.05); color: white; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 4px 8px; font-size: 0.85rem; font-weight: 600; outline: none; cursor: pointer;">
                            <option value="einlass" ${localStorage.getItem('kinopolis_selected_dept') === 'einlass' ? 'selected' : ''}>🎟️ Einlass</option>
                            <option value="kasse" ${localStorage.getItem('kinopolis_selected_dept') === 'kasse' ? 'selected' : ''}>💰 Kasse</option>
                            <option value="theke" ${localStorage.getItem('kinopolis_selected_dept') === 'theke' ? 'selected' : ''}>🍿 Theke</option>
                            <option value="tl" ${localStorage.getItem('kinopolis_selected_dept') === 'tl' ? 'selected' : ''}>👔 TL / BL</option>
                            <option value="alles" ${localStorage.getItem('kinopolis_selected_dept') === 'alles' ? 'selected' : ''}>🌐 Alles</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <!-- SHIFT CONTROL -->
                <button id="modal-shift-btn" onclick="window.shiftCheckin ? (localStorage.getItem('shift_start_time') ? window.shiftCheckout() : window.shiftCheckin()) : null" class="btn-secondary" style="width: 100%; padding: 1rem; border-radius: 14px; font-weight: 700; background: ${localStorage.getItem('shift_start_time') ? 'rgba(231,76,60,0.15)' : 'rgba(46,204,113,0.15)'}; border: 1px solid ${localStorage.getItem('shift_start_time') ? '#e74c3c' : '#2ecc71'}; color: white; cursor: pointer; transition: all 0.2s;">
                    ${localStorage.getItem('shift_start_time') ? '🔴 Schicht beenden' : '🟢 Schicht starten'}
                </button>

                <button onclick="AUTH.showChangePassword()" class="btn-secondary" style="width: 100%; padding: 1rem; border-radius: 14px; font-weight: 700; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; cursor: pointer; transition: all 0.2s;">
                    🔑 Passwort ändern
                </button>
                <button onclick="if(confirm('Möchtest du das Dashboard neu laden und alle Caches leeren? Dies behebt Darstellungsfehler.')){ localStorage.clear(); sessionStorage.clear(); if('serviceWorker' in navigator){ navigator.serviceWorker.getRegistrations().then(regs => { for(let r of regs) r.unregister(); }); } caches.keys().then(names => { for(let n of names) caches.delete(n); }); setTimeout(() => { window.location.href = window.location.origin + '/?reset=true'; }, 500); }" class="btn-secondary" style="width: 100%; padding: 1rem; border-radius: 14px; font-weight: 700; background: rgba(241,196,15,0.15); border: 1px solid #f1c40f; color: white; cursor: pointer; transition: all 0.2s;">
                    🔄 App aktualisieren (Cache leeren)
                </button>
                <button onclick="AUTH.logout()" class="btn-primary" style="width: 100%; padding: 1rem; border-radius: 14px; font-weight: 800; background: linear-gradient(135deg, #e50914, #ff3d47); border: none; color: white; cursor: pointer; box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);">
                    🚪 Abmelden
                </button>
                <button onclick="AUTH.hideLoginModal()" style="background: none; border: none; color: var(--text-muted); font-size: 0.9rem; cursor: pointer; margin-top: 0.5rem;">
                    Schließen
                </button>
            </div>
        `;
        
        modal.classList.add('active');
    },

    showChangePassword() {
        const modal = document.getElementById('auth-modal');
        const content = modal.querySelector('.modal-content');
        
        content.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 1.5rem; font-weight: 800;">Passwort ändern</h2>
                <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Gib dein neues Passwort ein.</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Neues Passwort</label>
                <input type="password" id="new-password" class="glass-input" placeholder="••••••••" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; outline: none;">
                <p style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.5rem;">Mindestens 6 Zeichen erforderlich.</p>
            </div>

            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button onclick="AUTH.handlePasswordChange()" id="change-pass-btn" class="btn-primary" style="width: 100%; padding: 1rem; border-radius: 14px; font-weight: 800; background: linear-gradient(135deg, #0078FF, #00d2ff); border: none; color: white; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 120, 255, 0.3);">
                    Passwort speichern
                </button>
                <button onclick="AUTH.showProfileModal()" style="background: none; border: none; color: var(--text-muted); font-size: 0.9rem; cursor: pointer; font-weight: 600;">
                    Zurück zum Profil
                </button>
            </div>
        `;
    },

    async handlePasswordChange() {
        const newPassword = document.getElementById('new-password').value;
        const btn = document.getElementById('change-pass-btn');

        if (!newPassword || newPassword.length < 6) {
            return alert('Passwort muss mindestens 6 Zeichen lang sein');
        }

        btn.disabled = true;
        btn.innerText = 'Wird gespeichert...';

        try {
            const res = await fetch('/api/auth/change-password', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ newPassword })
            });

            const data = await res.json();
            if (res.ok) {
                alert('Passwort erfolgreich geändert!');
                this.showProfileModal();
            } else {
                alert('Fehler: ' + (data.error || 'Unbekannter Fehler'));
            }
        } catch (e) {
            alert('Netzwerkfehler');
        } finally {
            btn.disabled = false;
            btn.innerText = 'Passwort speichern';
        }
    },

    // Alias for inline HTML onclick calls
    showProfile() {
        this.showProfileModal();
    }
};

window.AUTH = AUTH;
