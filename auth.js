const AUTH = {
    token: localStorage.getItem('kp_auth_token'),
    user: JSON.parse(localStorage.getItem('kp_user') || 'null'),

    async init() {
        console.log('AUTH: Initializing...', { hasToken: !!this.token, guest: localStorage.getItem('kp_guest_mode') });
        if (localStorage.getItem('kp_guest_mode') === 'true') {
            this.updateUI();
            return;
        }
        if (this.token) {
            try {
                console.log('AUTH: Checking session...');
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${this.token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    console.log('AUTH: Session valid', data.user.email);
                    this.user = data.user;
                    localStorage.setItem('kp_user', JSON.stringify(this.user));
                    this.updateUI();
                } else {
                    console.warn('AUTH: Session invalid or expired', res.status);
                    if (res.status === 401) {
                        this.logout();
                    }
                }
            } catch (e) {
                console.error('AUTH: Init error', e);
            }
        } else {
            console.log('AUTH: No token, showing login');
            this.showLoginModal();
        }
    },

    async login(email, password) {
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
            localStorage.removeItem('kp_guest_mode'); // Clear guest mode on successful login
            
            // Update local city if different
            if (this.user.location) {
                localStorage.setItem('kinopolis_city', this.user.location);
                if (window.currentCity) window.currentCity = this.user.location;
            }
            this.hideLoginModal();
            location.reload(); // Reload to apply all states
            return { success: true };
        } else {
            return { success: false, error: data.error };
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
            if (data.success) {
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (e) {
            return { success: false, error: 'Registration failed' };
        }
    },

    logout() {
        localStorage.removeItem('kp_auth_token');
        localStorage.removeItem('kp_user');
        localStorage.removeItem('kp_guest_mode');
        this.token = null;
        this.user = null;
        location.reload();
    },

    showLoginModal() {
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
            userBtn.innerHTML = `<span>👤</span> ${this.user.name}`;
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
