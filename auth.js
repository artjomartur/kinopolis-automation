const AUTH = {
    token: localStorage.getItem('kp_auth_token'),
    user: JSON.parse(localStorage.getItem('kp_user') || 'null'),

    async init() {
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
                } else {
                    this.logout();
                }
            } catch (e) {
                console.error('Auth init failed:', e);
            }
        } else {
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
            // Update local city if different
            if (this.user.location) {
                localStorage.setItem('kinopolis_city', this.user.location);
                if (window.currentCity) window.currentCity = this.user.location;
            }
            this.hideLoginModal();
            this.updateUI();
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
        if (userBtn && this.user) {
            userBtn.innerHTML = `<span>👤</span> ${this.user.name}`;
        }
    }
};

window.AUTH = AUTH;
