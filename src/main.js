/**
 * Kinopolis Operations Platform
 * Framer SaaS Kit Architecture & Controller
 */

import { ApiClient } from './core/api.js';

// Setup ApiClient
const api = new ApiClient();

// Task state storage key
const TASK_STORAGE_KEY = 'kp_saas_task_states_v2';

function getStoredTaskStates() {
  try {
    return JSON.parse(localStorage.getItem(TASK_STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveTaskState(taskId, isDone) {
  try {
    const states = getStoredTaskStates();
    states[taskId] = isDone;
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(states));
  } catch (e) {
    console.warn('Could not save task state:', e);
  }
}

// Global App Router for Overview vs Dashboard mode
window.appRouter = {
  openDashboard() {
    document.body.classList.add('mode-dashboard');
    window.location.hash = '#dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.syncDashColumns();
  },

  openOverview() {
    document.body.classList.remove('mode-dashboard');
    window.location.hash = '#overview';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  syncDashColumns() {
    const heroMockup = document.querySelector('#hero-mockup-window .app-columns-container');
    const dashColumns = document.getElementById('dash-app-columns');
    if (heroMockup && dashColumns && dashColumns.children.length === 0) {
      dashColumns.innerHTML = heroMockup.innerHTML;
    }
  },

  init() {
    this.syncDashColumns();
    const checkHash = () => {
      if (window.location.hash === '#dashboard') {
        this.openDashboard();
      } else {
        this.openOverview();
      }
    };
    window.addEventListener('hashchange', checkHash);
    checkHash();
  }
};

// Global App Dashboard Controller
window.appDashboard = {
  currentLocation: 'kp',
  filterHideDone: false,

  // Checkbox toggle
  toggleCheck(checkboxEl) {
    const row = checkboxEl.closest('.task-row');
    if (!row) return;

    const taskId = row.dataset.taskId;
    const isNowChecked = !checkboxEl.classList.contains('checked');

    if (isNowChecked) {
      checkboxEl.classList.add('checked');
      row.classList.add('is-done');
    } else {
      checkboxEl.classList.remove('checked');
      row.classList.remove('is-done');
    }

    // Toggle status badge
    const statusPill = row.querySelector('.status-pill');
    if (statusPill) {
      if (isNowChecked) {
        statusPill.className = 'status-pill done';
        statusPill.textContent = 'Done';
      } else {
        statusPill.className = 'status-pill in-progress';
        statusPill.textContent = 'In progress';
      }
    }

    if (taskId) {
      saveTaskState(taskId, isNowChecked);
    }
  },

  toggleCheckFromLabel(labelEl) {
    const row = labelEl.closest('.task-row');
    if (!row) return;
    const checkbox = row.querySelector('.custom-checkbox');
    if (checkbox) {
      this.toggleCheck(checkbox);
    }
  },

  // Real-time Search Filter
  handleSearch(query) {
    const q = (query || '').toLowerCase().trim();
    const rows = document.querySelectorAll('.task-row');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (!q || text.includes(q)) {
        row.style.display = 'grid';
      } else {
        row.style.display = 'none';
      }
    });
  },

  // Switch Category / Hall in Sidebar
  switchCategory(title, group, btnEl) {
    // Update active styles
    document.querySelectorAll('.sidebar-item-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    // Update breadcrumbs & title
    const crumbGroup = document.getElementById('crumb-group');
    const crumbCurrent = document.getElementById('crumb-current');
    const heading = document.getElementById('workspace-heading');

    if (crumbGroup) crumbGroup.textContent = group;
    if (crumbCurrent) crumbCurrent.textContent = title;
    if (heading) heading.textContent = title;

    // Load dynamic sessions for this hall/category
    this.renderDynamicTasksForCategory(title);
  },

  // Switch Icon Rail
  switchRail(railName, btnEl) {
    document.querySelectorAll('.rail-icon-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    if (railName === 'alerts') {
      alert('Funkruf & Alarmierung: Alle Säle im Normalbetrieb. Keine aktiven Notausgangs- oder Tonstörungen gemeldet.');
    }
  },

  // Switch Cinema Location
  async switchLocation(loc, btnEl) {
    this.currentLocation = loc;
    document.querySelectorAll('.location-chip').forEach(c => c.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const select = document.getElementById('dash-location-select');
    if (select) select.value = loc;

    await this.loadLiveSessions(loc);
  },

  handleLocationSelect(loc) {
    this.currentLocation = loc;
    const chips = document.querySelectorAll('.location-chip');
    chips.forEach(c => {
      if (c.getAttribute('onclick')?.includes(`'${loc}'`)) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
    this.loadLiveSessions(loc);
  },

  // Filter Done items
  toggleDoneFilter() {
    this.filterHideDone = !this.filterHideDone;
    const doneRows = document.querySelectorAll('.task-row.is-done');
    doneRows.forEach(row => {
      row.style.display = this.filterHideDone ? 'none' : 'grid';
    });
  },

  // Fetch live cinema sessions from Kinopolis API
  async loadLiveSessions(location = 'kp') {
    const listEl = document.getElementById('live-sessions-list');
    if (!listEl) return;

    try {
      const data = await api.getSessions(location);
      let sessions = [];

      if (Array.isArray(data)) {
        sessions = data;
      } else if (data && Array.isArray(data.sessions)) {
        sessions = data.sessions;
      } else if (data && Array.isArray(data.data)) {
        sessions = data.data;
      }

      if (sessions.length > 0) {
        listEl.innerHTML = '';
        // Show up to 6 real sessions
        sessions.slice(0, 6).forEach((s, idx) => {
          const title = s.title || s.film_title || s.movie || 'Kinopolis Vorstellung';
          const time = s.time || s.start_time || '18:00 Uhr';
          const hall = s.hall || s.auditorium || 'Saal 1';
          const isDone = idx === 0;
          const statusClass = isDone ? 'done' : (idx === 1 ? 'in-progress' : 'geplant');
          const statusText = isDone ? 'Done' : (idx === 1 ? 'In progress' : 'Geplant');
          const avatar = idx % 2 === 0 ? '/assets/Oli/Oli_Success_bgless.png' : '/assets/3d/avatar-1.png';

          const row = document.createElement('div');
          row.className = `task-row ${isDone ? 'is-done' : ''}`;
          row.dataset.taskId = `session_${location}_${idx}`;
          row.innerHTML = `
            <div class="custom-checkbox ${isDone ? 'checked' : ''}" onclick="window.appDashboard.toggleCheck(this)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">${title} (${hall})</span>
            <span class="date-pill">📅 ${time}</span>
            <span class="status-pill ${statusClass}">${statusText}</span>
            <img src="${avatar}" class="task-avatar" alt="Avatar">
          `;
          listEl.appendChild(row);
        });
      }
    } catch (err) {
      console.log('Live session API offline or demo fallback active:', err.message);
    }
  },

  // Category specific task updates
  renderDynamicTasksForCategory(catName) {
    const designGroup = document.getElementById('group-design-list');
    if (!designGroup) return;

    if (catName.includes('Saal 2')) {
      designGroup.innerHTML = `
        <div class="task-row is-done" data-task-id="s2_1">
          <div class="custom-checkbox checked" onclick="window.appDashboard.toggleCheck(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">Dolby Atmos Deckenlautsprecher Rauschabstand prüfen</span>
          <span class="date-pill">📅 13:45 Uhr</span>
          <span class="status-pill done">Done</span>
          <img src="/assets/3d/avatar-1.png" class="task-avatar" alt="Avatar">
        </div>
        <div class="task-row" data-task-id="s2_2">
          <div class="custom-checkbox" onclick="window.appDashboard.toggleCheck(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">Barco 4K Laser Farbtemperatur DCI-P3 kalibrieren</span>
          <span class="date-pill">📅 14:15 Uhr</span>
          <span class="status-pill in-progress">In progress</span>
          <img src="/assets/3d/avatar-2.png" class="task-avatar" alt="Avatar">
        </div>
      `;
    } else if (catName.includes('Saal 3')) {
      designGroup.innerHTML = `
        <div class="task-row is-done" data-task-id="s3_1">
          <div class="custom-checkbox checked" onclick="window.appDashboard.toggleCheck(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">D-Box Motion Controller IP-Verbindung testen</span>
          <span class="date-pill">📅 12:30 Uhr</span>
          <span class="status-pill done">Done</span>
          <img src="/assets/3d/avatar-3.png" class="task-avatar" alt="Avatar">
        </div>
        <div class="task-row" data-task-id="s3_2">
          <div class="custom-checkbox" onclick="window.appDashboard.toggleCheck(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">Vibrationstest Reihen 5 bis 9 durchführen</span>
          <span class="date-pill">📅 15:00 Uhr</span>
          <span class="status-pill in-progress">In progress</span>
          <img src="/assets/Oli/Oli_1_bgless.png" class="task-avatar" alt="Oli">
        </div>
      `;
    } else if (catName.includes('Einlass')) {
      designGroup.innerHTML = `
        <div class="task-row is-done" data-task-id="e_1">
          <div class="custom-checkbox checked" onclick="window.appDashboard.toggleCheck(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">Handscanner Akkus geladen & WLAN verbunden</span>
          <span class="date-pill">📅 13:00 Uhr</span>
          <span class="status-pill done">Done</span>
          <img src="/assets/3d/avatar-1.png" class="task-avatar" alt="Avatar">
        </div>
        <div class="task-row" data-task-id="e_2">
          <div class="custom-checkbox" onclick="window.appDashboard.toggleCheck(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span class="task-label" onclick="window.appDashboard.toggleCheckFromLabel(this)">Foyer-Displays auf Tagesprogramm aktualisieren</span>
          <span class="date-pill">📅 13:30 Uhr</span>
          <span class="status-pill in-progress">In progress</span>
          <img src="/assets/3d/avatar-2.png" class="task-avatar" alt="Avatar">
        </div>
      `;
    }
  },

  // Restore stored task check states from localStorage
  restoreSavedStates() {
    const states = getStoredTaskStates();
    Object.keys(states).forEach(taskId => {
      const row = document.querySelector(`.task-row[data-task-id="${taskId}"]`);
      if (row) {
        const checkbox = row.querySelector('.custom-checkbox');
        const statusPill = row.querySelector('.status-pill');
        const isDone = states[taskId];
        if (isDone) {
          checkbox?.classList.add('checked');
          row.classList.add('is-done');
          if (statusPill) {
            statusPill.className = 'status-pill done';
            statusPill.textContent = 'Done';
          }
        } else {
          checkbox?.classList.remove('checked');
          row.classList.remove('is-done');
          if (statusPill) {
            statusPill.className = 'status-pill in-progress';
            statusPill.textContent = 'In progress';
          }
        }
      }
    });
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Set guest mode so users are never blocked by any legacy modal
  localStorage.setItem('kp_guest_mode', 'true');

  window.appRouter.init();
  window.appDashboard.restoreSavedStates();
  window.appDashboard.loadLiveSessions('kp');
});
