const AUTH = {
    token: localStorage.getItem('kp_auth_token'),
    user: JSON.parse(localStorage.getItem('kp_user') || 'null'),
    modalInjected: false,

    async init() {
        this.injectModal();
        console.log('AUTH: Initializing...', { hasToken: !!this.token, guest: localStorage.getItem('kp_guest_mode') });
        
        if (localStorage.getItem('kp_guest_mode') === 'true') {
            this.updateUI();
            return;
        }

        if (this.token) {
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    this.user = data.user;
                    localStorage.setItem('kp_user', JSON.stringify(this.user));
                    this.updateUI();
                } else if (res.status === 401) {
                    console.warn('AUTH: Token expired or invalid');
                    this.logout(false); // Logout without reload to avoid loops
                    this.showLoginModal();
                }
            } catch (e) {
                console.error('AUTH: Network error during init', e);
            }
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
                        <h2 style="font-size: 1.5rem; font-weight: 800;">Willkommen zurück</h2>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem;">Bitte melde dich an, um fortzufahren.</p>
                    </div>
                    
                    <div id="login-form">
                        <div style="margin-bottom: 1.25rem;">
                            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">E-Mail Adresse</label>
                            <input type="email" id="login-email" class="glass-input" placeholder="name@kinopolis.de" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
                        </div>
                        <div style="margin-bottom: 2rem;">
                            <label style="display: block; font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 0.5rem; text-transform: uppercase;">Passwort</label>
                            <input type="password" id="login-password" class="glass-input" placeholder="••••••••" style="width: 100%; padding: 1rem; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white;">
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
        
        if (errorEl) errorEl.style.display = 'none';
        if (!email || !password) return this.showError('Bitte E-Mail und Passwort ausfüllen');
        
        btn.disabled = true;
        btn.innerText = 'Wird angemeldet...';
        
        const res = await this.login(email, password);
        if (!res.success) {
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
        location.reload();
    },

    async login(email, password) {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                localStorage.setItem('kp_auth_token', this.token);
                localStorage.setItem('kp_user', JSON.stringify(this.user));
                localStorage.removeItem('kp_guest_mode');
                location.reload();
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (e) {
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

    logout(reload = true) {
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

    updateUI() {
        const userBtn = document.getElementById('user-profile-btn');
        if (!userBtn) return;

        if (this.user) {
            userBtn.innerHTML = `<span>👤</span> ${this.user.name || 'Profil'}`;
            userBtn.onclick = () => this.logout();
            userBtn.title = 'Abmelden';
        } else if (localStorage.getItem('kp_guest_mode') === 'true') {
            userBtn.innerHTML = '<span>👤</span> Gast (Anmelden)';
            userBtn.onclick = () => {
                localStorage.removeItem('kp_guest_mode');
                location.reload();
            };
            userBtn.title = 'Klick zum Anmelden';
        }
    }
};

window.AUTH = AUTH;
