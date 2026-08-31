/**
 * Kinopolis Automation - Central API Client
 */

export class ApiClient {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl;
        this.cache = new Map();
    }

    async request(endpoint, options = {}, timeoutMs = 10000) {
        const url = `${this.baseUrl}${endpoint}`;
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const token = localStorage.getItem('kp_auth_token') || sessionStorage.getItem('kp_auth_token');
            const headers = {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...(options.headers || {})
            };

            const config = {
                ...options,
                headers,
                signal: controller.signal
            };

            if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
                config.body = JSON.stringify(options.body);
            }

            const response = await fetch(url, config);
            clearTimeout(timer);

            if (!response.ok) {
                let errorDetails = null;
                try {
                    errorDetails = await response.json();
                } catch {
                    errorDetails = await response.text();
                }
                const err = new Error(`API Error [${response.status}]: ${response.statusText}`);
                err.status = response.status;
                err.details = errorDetails;
                throw err;
            }

            // Return JSON if applicable, or text
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                return await response.json();
            }
            return await response.text();
        } catch (err) {
            clearTimeout(timer);
            if (err.name === 'AbortError') {
                throw new Error(`Zeitüberschreitung bei Anfrage an ${endpoint} (${timeoutMs}ms)`);
            }
            throw err;
        }
    }

    // Sessions & Program
    async getSessions(location = 'kp', date = null, tomorrow = false) {
        let endpoint = `/api/sessions?location=${encodeURIComponent(location)}`;
        if (date) endpoint += `&date=${encodeURIComponent(date)}`;
        if (tomorrow) endpoint += `&tomorrow=true`;
        return this.request(endpoint);
    }

    // Hall Status
    async getHallStatus(location = 'kp') {
        return this.request(`/api/hall-status?location=${encodeURIComponent(location)}`);
    }

    async updateHallStatus(hall, status, location = 'kp') {
        return this.request('/api/hall-status', {
            method: 'POST',
            body: { hall, status, location }
        });
    }

    // Task Completions (Plakate & Checklisten)
    async getTaskCompletions(location = 'kp', date = null) {
        let endpoint = `/api/task-completions?location=${encodeURIComponent(location)}`;
        if (date) endpoint += `&date=${encodeURIComponent(date)}`;
        return this.request(endpoint);
    }

    async toggleTaskCompletion(location, taskId, isCompleted, completedBy = '') {
        return this.request('/api/task-completions', {
            method: 'POST',
            body: { location, task_id: taskId, is_completed: isCompleted ? 1 : 0, completed_by: completedBy }
        });
    }

    // Logs & Shift Notes
    async getLogs(location = 'kp') {
        return this.request(`/api/logs?location=${encodeURIComponent(location)}`);
    }

    async addLog(location, message, author = '', priority = 'normal') {
        return this.request('/api/logs', {
            method: 'POST',
            body: { location, message, author, priority }
        });
    }

    async deleteLog(id) {
        return this.request(`/api/logs/${id}`, { method: 'DELETE' });
    }

    async getLogsSummary(location = 'kp') {
        return this.request(`/api/logs-summary?location=${encodeURIComponent(location)}`);
    }

    // Personal Need / Aushilfe
    async getPersonalNeed(location = 'kp') {
        return this.request(`/api/personal-need?location=${encodeURIComponent(location)}`);
    }

    async setPersonalNeed(location, active, message = '', requester = '') {
        return this.request('/api/personal-need', {
            method: 'POST',
            body: { location, active, message, requester }
        });
    }

    // Tech Tickets
    async getTechTickets(location = 'kp', status = null) {
        let endpoint = `/api/tech-tickets?location=${encodeURIComponent(location)}`;
        if (status) endpoint += `&status=${encodeURIComponent(status)}`;
        return this.request(endpoint);
    }

    async createTechTicket(ticketData) {
        return this.request('/api/tech-tickets', {
            method: 'POST',
            body: ticketData
        });
    }

    async updateTechTicket(id, updateData) {
        return this.request(`/api/tech-tickets/${id}`, {
            method: 'PATCH',
            body: updateData
        });
    }

    // Push Broadcast
    async sendBroadcast(title, message, location = 'kp') {
        return this.request('/api/push/broadcast', {
            method: 'POST',
            body: { title, message, location }
        });
    }

    // XP & Gamification
    async addXP(userId, amount, reason) {
        return this.request('/api/users/xp', {
            method: 'POST',
            body: { userId, amount, reason }
        });
    }

    async getLeaderboard(location = 'kp') {
        return this.request(`/api/users/leaderboard?location=${encodeURIComponent(location)}`);
    }
}

export const api = new ApiClient();
