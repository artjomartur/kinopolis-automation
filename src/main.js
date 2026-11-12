/**
 * Kinopolis Operations Platform
 * Framer SaaS Architecture with Full Cinema Business Logic
 */

import { ApiClient } from './core/api.js';

const api = new ApiClient();
const TASK_STORAGE_KEY = 'kp_saas_task_states_v3';

// High-fidelity fallback program if API is offline or during local dev
function getFallbackHalls(city = 'kp') {
  return [
    {
      name: 'Kino 1 (IMAX & Atmos)',
      sessions: [
        {
          title: 'Gladiator II',
          poster: '/assets/3d/hero-cube.png',
          time: '14:30',
          hall: 'Kino 1',
          duration: 148,
          capacity: 450,
          sold: 280,
          fsk: 'FSK 16'
        },
        {
          title: 'Wicked',
          poster: '/assets/3d/hero-ring.png',
          time: '17:45',
          hall: 'Kino 1',
          duration: 160,
          capacity: 450,
          sold: 340,
          fsk: 'FSK 6'
        },
        {
          title: 'Dune: Part Two (IMAX Re-Release)',
          poster: '/assets/3d/hero-cube.png',
          time: '21:00',
          hall: 'Kino 1',
          duration: 166,
          capacity: 450,
          sold: 410,
          fsk: 'FSK 12'
        }
      ]
    },
    {
      name: 'Kino 2 (Dolby Atmos)',
      sessions: [
        {
          title: 'Red One – Alarmstufe Weihnachten',
          poster: '/assets/3d/hero-helix.png',
          time: '15:00',
          hall: 'Kino 2',
          duration: 123,
          capacity: 280,
          sold: 145,
          fsk: 'FSK 12'
        },
        {
          title: 'Venom: The Last Dance',
          poster: '/assets/3d/hero-gear.png',
          time: '18:00',
          hall: 'Kino 2',
          duration: 110,
          capacity: 280,
          sold: 210,
          fsk: 'FSK 16'
        },
        {
          title: 'Gladiator II (Dolby Atmos)',
          poster: '/assets/3d/hero-cube.png',
          time: '20:30',
          hall: 'Kino 2',
          duration: 148,
          capacity: 280,
          sold: 250,
          fsk: 'FSK 16'
        }
      ]
    },
    {
      name: 'Kino 3 (D-Box Motion)',
      sessions: [
        {
          title: 'Vaiana 2',
          poster: '/assets/3d/hero-ring.png',
          time: '14:45',
          hall: 'Kino 3',
          duration: 100,
          capacity: 210,
          sold: 190,
          fsk: 'FSK 0'
        },
        {
          title: 'Red One (D-Box 3D)',
          poster: '/assets/3d/hero-helix.png',
          time: '17:15',
          hall: 'Kino 3',
          duration: 123,
          capacity: 210,
          sold: 160,
          fsk: 'FSK 12'
        },
        {
          title: 'Venom: The Last Dance (D-Box)',
          poster: '/assets/3d/hero-gear.png',
          time: '20:15',
          hall: 'Kino 3',
          duration: 110,
          capacity: 210,
          sold: 185,
          fsk: 'FSK 16'
        }
      ]
    },
    {
      name: 'Kino 4 (Komfort Loge)',
      sessions: [
        {
          title: 'Alter weißer Mann',
          poster: '/assets/3d/avatar-1.png',
          time: '15:15',
          hall: 'Kino 4',
          duration: 114,
          capacity: 150,
          sold: 95,
          fsk: 'FSK 12'
        },
        {
          title: 'Die Schule der magischen Tiere 3',
          poster: '/assets/3d/avatar-2.png',
          time: '18:15',
          hall: 'Kino 4',
          duration: 105,
          capacity: 150,
          sold: 130,
          fsk: 'FSK 0'
        },
        {
          title: 'Konklave',
          poster: '/assets/3d/avatar-3.png',
          time: '20:45',
          hall: 'Kino 4',
          duration: 120,
          capacity: 150,
          sold: 115,
          fsk: 'FSK 12'
        }
      ]
    },
    {
      name: 'Kino 5 (Standard)',
      sessions: [
        {
          title: 'Smile 2 – Siehst du es auch?',
          poster: '/assets/3d/avatar-1.png',
          time: '17:30',
          hall: 'Kino 5',
          duration: 127,
          capacity: 140,
          sold: 80,
          fsk: 'FSK 18'
        },
        {
          title: 'Terrifier 3',
          poster: '/assets/3d/avatar-2.png',
          time: '20:15',
          hall: 'Kino 5',
          duration: 125,
          capacity: 140,
          sold: 135,
          fsk: 'FSK 18'
        }
      ]
    },
    {
      name: 'Kino 6 – 8 (Standard Säle)',
      sessions: [
        {
          title: 'Anora (Palme d\'Or Gewinner)',
          poster: '/assets/3d/avatar-3.png',
          time: '16:00',
          hall: 'Kino 6',
          duration: 139,
          capacity: 120,
          sold: 70,
          fsk: 'FSK 16'
        },
        {
          title: 'Der Buchspazierer',
          poster: '/assets/3d/avatar-1.png',
          time: '19:00',
          hall: 'Kino 6',
          duration: 98,
          capacity: 120,
          sold: 85,
          fsk: 'FSK 6'
        }
      ]
    }
  ];
}

// Application State
const state = {
  currentCity: localStorage.getItem('current_city') || 'kp',
  displayDate: new Date(),
  isTomorrow: false,
  hallsData: [],
  hallStatus: {},
  activeView: 'hall', // 'hall', 'all_halls', 'einlass', 'concession', 'tech', 'funk', 'report'
  activeHallName: null,
  activeGroupName: 'Programm & Säle',
  filterHideDone: false,
  searchQuery: '',
};

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

function formatDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Unified Router for Overview vs Dashboard mode
window.appRouter = {
  openDashboard() {
    document.body.classList.add('mode-dashboard');
    window.location.hash = '#dashboard';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const toggleTxt = document.getElementById('txt-toggle-view');
    if (toggleTxt) toggleTxt.textContent = '← Übersicht';
  },

  openOverview() {
    if (window.location.pathname.includes('dashboard')) {
      window.location.href = '/';
      return;
    }
    document.body.classList.remove('mode-dashboard');
    window.location.hash = '#overview';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const toggleTxt = document.getElementById('txt-toggle-view');
    if (toggleTxt) toggleTxt.textContent = 'Vollbild';
  },

  toggleMode() {
    if (document.body.classList.contains('mode-dashboard')) {
      this.openOverview();
    } else {
      this.openDashboard();
    }
  },

  init() {
    const checkHash = () => {
      if (window.location.hash === '#dashboard' || window.location.pathname.includes('dashboard')) {
        this.openDashboard();
      } else {
        this.openOverview();
      }
    };
    window.addEventListener('hashchange', checkHash);
    checkHash();
  }
};

// Main Controller
window.appDashboard = {
  async init() {
    // Sync location selectors
    const locSelect = document.getElementById('hero-location-select');
    if (locSelect) locSelect.value = state.currentCity;

    // Load Live Sessions & Hall Status
    await this.fetchData();

    // Start 60s ticker for live countdowns
    setInterval(() => this.updateLiveCountdowns(), 60000);
  },

  // Fetch real session data for the active city and date
  async fetchData() {
    try {
      const dateStr = formatDateStr(state.displayDate);
      const data = await api.getSessions(state.currentCity, dateStr, state.isTomorrow);

      if (Array.isArray(data) && data.length > 0) {
        state.hallsData = data;
      } else if (data && Array.isArray(data.sessions) && data.sessions.length > 0) {
        state.hallsData = data.sessions;
      } else {
        state.hallsData = getFallbackHalls(state.currentCity);
      }
    } catch (err) {
      console.log('Live session API returned error or offline, using fallback data:', err.message);
      state.hallsData = getFallbackHalls(state.currentCity);
    }

    // Default to the first hall if none selected
    if (!state.activeHallName && state.hallsData.length > 0) {
      state.activeHallName = state.hallsData[0].name;
    }

    // Load Hall Status
    try {
      const statusData = await api.getHallStatus(state.currentCity);
      state.hallStatus = statusData || {};
    } catch (e) {
      state.hallStatus = {};
    }

    // Render Sidebar and Workspace
    this.renderSidebar();
    this.renderWorkspace();
  },

  // Switch City Location
  async switchLocation(loc, btnEl) {
    state.currentCity = loc;
    localStorage.setItem('current_city', loc);

    document.querySelectorAll('.location-chip').forEach(c => c.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const select = document.getElementById('hero-location-select');
    if (select) select.value = loc;

    state.activeHallName = null;
    await this.fetchData();
  },

  async handleLocationSelect(loc) {
    state.currentCity = loc;
    localStorage.setItem('current_city', loc);

    const chips = document.querySelectorAll('.location-chip');
    chips.forEach(c => {
      if (c.getAttribute('onclick')?.includes(`'${loc}'`)) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    state.activeHallName = null;
    await this.fetchData();
  },

  // Toggle Date (Today vs Tomorrow)
  async setDateMode(isTomorrow) {
    state.isTomorrow = isTomorrow;
    const now = new Date();
    if (isTomorrow) {
      now.setDate(now.getDate() + 1);
    }
    state.displayDate = now;

    document.querySelectorAll('.date-toggle-btn').forEach(b => {
      const isTom = b.dataset.tomorrow === 'true';
      b.classList.toggle('active', isTom === isTomorrow);
    });

    await this.fetchData();
  },

  // Render Sidebar with Dynamic Halls from Kinopolis API
  renderSidebar() {
    const sidebarEl = document.querySelector('.col-sidebar');
    if (!sidebarEl) return;

    let hallsHtml = `
      <li>
        <button class="sidebar-item-btn ${state.activeView === 'all_halls' ? 'active' : ''}" onclick="window.appDashboard.switchView('all_halls', 'Alle Säle', 'Programm & Säle')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          <span>Alle Säle (Übersicht)</span>
        </button>
      </li>
    `;

    if (state.hallsData && state.hallsData.length > 0) {
      state.hallsData.forEach(hall => {
        const isSelected = state.activeView === 'hall' && state.activeHallName === hall.name;
        const sessionCount = (hall.sessions || []).length;
        hallsHtml += `
          <li>
            <button class="sidebar-item-btn ${isSelected ? 'active' : ''}" onclick="window.appDashboard.switchHall('${hall.name}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
              <span>${hall.name}</span>
              <span style="margin-left: auto; font-size: 11px; color: #a1a1aa;">${sessionCount}</span>
            </button>
          </li>
        `;
      });
    }

    sidebarEl.innerHTML = `
      <!-- Programm & Säle -->
      <div>
        <div class="sidebar-group-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>Programm & Säle</span>
        </div>
        <ul class="sidebar-items">
          ${hallsHtml}
        </ul>
      </div>

      <!-- Personal & Stationen -->
      <div>
        <div class="sidebar-group-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span>Personal & Stationen</span>
        </div>
        <ul class="sidebar-items">
          <li>
            <button class="sidebar-item-btn ${state.activeView === 'einlass' ? 'active' : ''}" onclick="window.appDashboard.switchView('einlass', 'Einlass & Foyer', 'Personal & Stationen')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>
              <span>Einlass & Foyer</span>
            </button>
          </li>
          <li>
            <button class="sidebar-item-btn ${state.activeView === 'concession' ? 'active' : ''}" onclick="window.appDashboard.switchView('concession', 'Concession & Bar', 'Personal & Stationen')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
              <span>Concession & Bar</span>
            </button>
          </li>
          <li>
            <button class="sidebar-item-btn ${state.activeView === 'tech' ? 'active' : ''}" onclick="window.appDashboard.switchView('tech', 'Vorführraum & Laser', 'Personal & Stationen')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2m-10-10h2m16 0h2"/></svg>
              <span>Vorführraum & Laser</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Funkruf & Alarmierung -->
      <div>
        <div class="sidebar-group-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span>Funkruf & Alarmierung</span>
        </div>
        <ul class="sidebar-items">
          <li>
            <button class="sidebar-item-btn ${state.activeView === 'funk' ? 'active' : ''}" onclick="window.appDashboard.switchView('funk', 'Digitaler Funkruf', 'Funkruf & Alarmierung')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 14v-3z"/></svg>
              <span>Funkruf senden</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- Berichte & Logs -->
      <div>
        <div class="sidebar-group-title">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
          <span>Berichte & Logs</span>
        </div>
        <ul class="sidebar-items">
          <li>
            <button class="sidebar-item-btn ${state.activeView === 'report' ? 'active' : ''}" onclick="window.appDashboard.switchView('report', 'Tagesabschluss', 'Berichte & Logs')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>Tagesabschluss</span>
            </button>
          </li>
        </ul>
      </div>
    `;
  },

  // Switch Hall
  switchHall(hallName) {
    state.activeView = 'hall';
    state.activeHallName = hallName;
    state.activeGroupName = 'Programm & Säle';
    this.renderSidebar();
    this.renderWorkspace();
  },

  // Switch Station / Feature View
  switchView(viewName, title, groupName) {
    state.activeView = viewName;
    state.activeGroupName = groupName;
    this.renderSidebar();
    this.renderWorkspace(title);
  },

  // Switch Icon Rail
  switchRail(railName, btnEl) {
    document.querySelectorAll('.rail-icon-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    if (railName === 'shows') {
      this.switchView('all_halls', 'Alle Säle', 'Programm & Säle');
    } else if (railName === 'calendar') {
      this.setDateMode(!state.isTomorrow);
    } else if (railName === 'alerts') {
      this.switchView('funk', 'Digitaler Funkruf', 'Funkruf & Alarmierung');
    } else if (railName === 'tech') {
      this.switchView('tech', 'Vorführraum & Laser', 'Personal & Stationen');
    } else if (railName === 'stats') {
      this.switchView('report', 'Tagesabschluss', 'Berichte & Logs');
    }
  },

  // Calculate live session status
  calcSessionStatus(session) {
    if (!session || !session.time) return { text: 'Geplant', css: 'geplant', isDone: false };

    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    let [h, m] = session.time.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return { text: 'Geplant', css: 'geplant', isDone: false };

    const startMin = h * 60 + m;
    const duration = session.duration || 110;
    const endMin = startMin + duration;

    // Past / Finished
    if (currentMin > endMin && !state.isTomorrow) {
      return { text: 'Done', css: 'done', isDone: true };
    }

    // Currently Running
    if (currentMin >= startMin && currentMin <= endMin && !state.isTomorrow) {
      const rest = endMin - currentMin;
      return { text: `Film läuft (${rest}m)`, css: 'in-progress', isDone: false };
    }

    // Admission Starting (15-25m before start)
    if (startMin - currentMin <= 25 && startMin - currentMin > 0 && !state.isTomorrow) {
      return { text: `Einlass (${startMin - currentMin}m)`, css: 'in-progress', isDone: false };
    }

    // Future
    return { text: 'Geplant', css: 'geplant', isDone: false };
  },

  // Render the Main Workspace
  renderWorkspace(customTitle) {
    const crumbGroup = document.getElementById('crumb-group');
    const crumbCurrent = document.getElementById('crumb-current');
    const heading = document.getElementById('workspace-heading');
    const content = document.getElementById('workspace-content');

    if (!content) return;

    const storedStates = getStoredTaskStates();

    // 1. SPECIFIC HALL VIEW
    if (state.activeView === 'hall') {
      const hall = (state.hallsData || []).find(h => h.name === state.activeHallName) || (state.hallsData || [])[0] || { name: 'Kino 1', sessions: [] };
      const title = `${hall.name} – Vorführungen & Checks`;

      if (crumbGroup) crumbGroup.textContent = state.activeGroupName;
      if (crumbCurrent) crumbCurrent.textContent = hall.name;
      if (heading) heading.textContent = title;

      // Group 1: Live Sessions
      let sessionsHtml = '';
      if (hall.sessions && hall.sessions.length > 0) {
        hall.sessions.forEach((s, idx) => {
          const taskId = `sess_${state.currentCity}_${formatDateStr(state.displayDate)}_${hall.name}_${idx}`;
          const isStoredDone = storedStates[taskId] === true;
          const status = this.calcSessionStatus(s);
          const isDone = isStoredDone || status.isDone;
          const badgeCss = isDone ? 'done' : status.css;
          const badgeText = isDone ? 'Done' : status.text;
          const avatar = s.poster || '/assets/Oli/Oli_Success_bgless.png';

          sessionsHtml += `
            <div class="task-row ${isDone ? 'is-done' : ''}" data-task-id="${taskId}">
              <div class="custom-checkbox ${isDone ? 'checked' : ''}" onclick="window.appDashboard.toggleCheck(this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
                <span class="task-label">${s.title}</span>
                <span class="task-sub">${s.duration ? s.duration + ' Min • ' : ''}${s.fsk || 'FSK'} • ${hall.name}</span>
              </div>
              <span class="date-pill">📅 ${s.time} Uhr</span>
              <span class="status-pill ${badgeCss}">${badgeText}</span>
              <img src="${avatar}" class="task-avatar" alt="Cover">
            </div>
          `;
        });
      } else {
        sessionsHtml = `
          <div style="padding: 24px; text-align: center; color: #71717a; font-size: 13.5px;">
            Keine Vorstellungen für ${hall.name} am ${formatDateStr(state.displayDate)} gefunden.
          </div>
        `;
      }

      // Group 2: Hall Inspection Checklist
      const defaultChecks = [
        { id: 'c1', label: 'Barco / Christie Laser-Projektor Automation prüfen (CPL geladen)' },
        { id: 'c2', label: 'Dolby Atmos / CP950 Audio-Pegel auf Referenz 7.0 kalibriert' },
        { id: 'c3', label: 'Saallicht & Notausgangsbeleuchtung Automatikfunktionstest' },
        { id: 'c4', label: 'D-Box Motion Sitze & VIP Loge Funktionstest durchgeführt' },
        { id: 'c5', label: 'Saalabnahme & Becherhalter nach Vorstellung kontrolliert' }
      ];

      let checksHtml = '';
      defaultChecks.forEach(c => {
        const taskId = `hallcheck_${state.currentCity}_${formatDateStr(state.displayDate)}_${hall.name}_${c.id}`;
        const isDone = storedStates[taskId] === true;
        checksHtml += `
          <div class="task-row ${isDone ? 'is-done' : ''}" data-task-id="${taskId}">
            <div class="custom-checkbox ${isDone ? 'checked' : ''}" onclick="window.appDashboard.toggleCheck(this)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
              <span class="task-label">${c.label}</span>
              <span class="task-sub">Vorführungs-Routine • ${hall.name}</span>
            </div>
            <span class="date-pill">📅 ${state.isTomorrow ? 'Morgen' : 'Heute'}</span>
            <span class="status-pill ${isDone ? 'done' : 'in-progress'}">${isDone ? 'Done' : 'In progress'}</span>
            <img src="/assets/Oli/Oli_1_bgless.png" class="task-avatar" alt="Oli">
          </div>
        `;
      });

      content.innerHTML = `
        <div class="task-group">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 class="task-group-title" style="margin-bottom: 0;">Heutige Vorstellungen (Live aus Kinopolis API)</h3>
            <div class="date-toggle-group">
              <button class="date-toggle-btn ${!state.isTomorrow ? 'active' : ''}" data-tomorrow="false" onclick="window.appDashboard.setDateMode(false)">Heute</button>
              <button class="date-toggle-btn ${state.isTomorrow ? 'active' : ''}" data-tomorrow="true" onclick="window.appDashboard.setDateMode(true)">Morgen</button>
            </div>
          </div>
          <div class="task-list">${sessionsHtml}</div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Saal-Checkliste & Abnahme</h3>
          <div class="task-list">${checksHtml}</div>
        </div>
      `;
    }

    // 2. ALL HALLS (GESAMTÜBERSICHT)
    else if (state.activeView === 'all_halls') {
      if (crumbGroup) crumbGroup.textContent = 'Programm & Säle';
      if (crumbCurrent) crumbCurrent.textContent = 'Alle Säle';
      if (heading) heading.textContent = 'Saalübersicht & Live-Status';

      let hallsRows = '';
      (state.hallsData || []).forEach(hall => {
        const nextSession = (hall.sessions || []).find(s => !this.calcSessionStatus(s).isDone) || (hall.sessions || [])[0];
        const status = nextSession ? this.calcSessionStatus(nextSession) : { text: 'Frei', css: 'done' };
        const title = nextSession ? nextSession.title : 'Keine weiteren Vorstellungen';
        const time = nextSession ? `📅 ${nextSession.time} Uhr` : '📅 Fertig';

        hallsRows += `
          <div class="task-row" style="cursor: pointer;" onclick="window.appDashboard.switchHall('${hall.name}')">
            <div class="custom-checkbox checked" style="background: #27272a; border-color: #27272a;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="task-label-wrapper">
              <span class="task-label">${hall.name} • ${title}</span>
              <span class="task-sub">${(hall.sessions || []).length} Vorstellungen heute • Klicke für Details</span>
            </div>
            <span class="date-pill">${time}</span>
            <span class="status-pill ${status.css}">${status.text}</span>
            <img src="${(nextSession && nextSession.poster) || '/assets/3d/avatar-1.png'}" class="task-avatar" alt="Hall">
          </div>
        `;
      });

      content.innerHTML = `
        <div class="task-group">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 class="task-group-title" style="margin-bottom: 0;">Alle Kinosäle im Überblick</h3>
            <div class="date-toggle-group">
              <button class="date-toggle-btn ${!state.isTomorrow ? 'active' : ''}" data-tomorrow="false" onclick="window.appDashboard.setDateMode(false)">Heute</button>
              <button class="date-toggle-btn ${state.isTomorrow ? 'active' : ''}" data-tomorrow="true" onclick="window.appDashboard.setDateMode(true)">Morgen</button>
            </div>
          </div>
          <div class="task-list">${hallsRows}</div>
        </div>
      `;
    }

    // 3. CONCESSION & POPCORN-BAR (Mit echter Popcorn-Prognose!)
    else if (state.activeView === 'concession') {
      if (crumbGroup) crumbGroup.textContent = 'Personal & Stationen';
      if (crumbCurrent) crumbCurrent.textContent = 'Concession & Bar';
      if (heading) heading.textContent = 'Concession – Popcorn-Bedarf & MHD';

      // Calculate total tickets from all live sessions
      let totalTickets = 0;
      (state.hallsData || []).forEach(h => {
        (h.sessions || []).forEach(s => {
          if (typeof s.sold === 'number') totalTickets += s.sold;
          else if (s.capacity) totalTickets += Math.round(s.capacity * 0.45);
        });
      });
      if (totalTickets === 0) totalTickets = 480;

      const expectedPortions = Math.round(totalTickets * 0.25);
      const recommendedBatches = Math.max(1, Math.ceil(expectedPortions / 4));

      const kornKg = (recommendedBatches * 1.0).toFixed(1);
      const fettKg = (recommendedBatches * 0.3).toFixed(1);
      const zuckerKg = (recommendedBatches * 0.4).toFixed(1);

      const concessionTasks = [
        { id: 'con1', label: 'Popcorn-Maschine Kessel vorheizen & Absaugung prüfen' },
        { id: 'con2', label: 'Warmhalte-Vitrinen Nacho-Käse Temperaturkontrolle (>= 65°C)' },
        { id: 'con3', label: 'MHD-Prüfung Softdrink-Sirup & Slushy-Konzentrate' },
        { id: 'con4', label: 'Becher- & Tütenlager für Abendschicht auffüllen' }
      ];

      let conChecks = '';
      concessionTasks.forEach(t => {
        const taskId = `con_${state.currentCity}_${formatDateStr(state.displayDate)}_${t.id}`;
        const isDone = storedStates[taskId] === true;
        conChecks += `
          <div class="task-row ${isDone ? 'is-done' : ''}" data-task-id="${taskId}">
            <div class="custom-checkbox ${isDone ? 'checked' : ''}" onclick="window.appDashboard.toggleCheck(this)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
              <span class="task-label">${t.label}</span>
              <span class="task-sub">Station Concession • Hygiene & Bereitstellung</span>
            </div>
            <span class="date-pill">📅 Heute</span>
            <span class="status-pill ${isDone ? 'done' : 'in-progress'}">${isDone ? 'Done' : 'In progress'}</span>
            <img src="/assets/Oli/Oli_Success_bgless.png" class="task-avatar" alt="Oli">
          </div>
        `;
      });

      content.innerHTML = `
        <div class="prognosis-card">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div>
              <h4 style="font-size: 15px; font-weight: 700; color: #09090b;">Popcorn-Bedarfs-Rechner (Automatisierte Prognose)</h4>
              <p style="font-size: 12.5px; color: #71717a; margin-top: 2px;">Berechnet aus heutigen Ticket-Verkäufen und 25% Kaufquote.</p>
            </div>
            <span class="status-pill done" style="font-size: 12px;">Live berechnet</span>
          </div>

          <div class="prognosis-grid">
            <div class="prognosis-item">
              <div class="prognosis-num">${totalTickets}</div>
              <div class="prognosis-label">Besucher Prognose</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${expectedPortions}</div>
              <div class="prognosis-label">Erwartete Portionen</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${recommendedBatches}</div>
              <div class="prognosis-label">Empfohlene Kessel</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${kornKg} kg</div>
              <div class="prognosis-label">Maiskorn</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${zuckerKg} kg</div>
              <div class="prognosis-label">Zucker / Fett (${fettKg}kg)</div>
            </div>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Concession & Bar Schicht-Checkliste</h3>
          <div class="task-list">${conChecks}</div>
        </div>
      `;
    }

    // 4. EINLASS & FOYER VIEW
    else if (state.activeView === 'einlass') {
      if (crumbGroup) crumbGroup.textContent = 'Personal & Stationen';
      if (crumbCurrent) crumbCurrent.textContent = 'Einlass & Foyer';
      if (heading) heading.textContent = 'Einlass – Einlasszeiten & Ticketkontrolle';

      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();

      let upcomingRows = '';
      (state.hallsData || []).forEach(hall => {
        (hall.sessions || []).forEach((s, idx) => {
          if (!s.time) return;
          const [h, m] = s.time.split(':').map(Number);
          const startMin = h * 60 + m;
          const diff = startMin - currentMin;

          if (diff >= -15 && diff <= 90 && !state.isTomorrow) {
            const taskId = `einlass_${hall.name}_${idx}`;
            const isDone = storedStates[taskId] === true;
            upcomingRows += `
              <div class="task-row ${isDone ? 'is-done' : ''}" data-task-id="${taskId}">
                <div class="custom-checkbox ${isDone ? 'checked' : ''}" onclick="window.appDashboard.toggleCheck(this)">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
                  <span class="task-label">${s.title} • ${hall.name}</span>
                  <span class="task-sub">${s.fsk || 'FSK'} • Einlass freigegeben</span>
                </div>
                <span class="date-pill">📅 ${s.time} Uhr</span>
                <span class="status-pill ${diff <= 25 ? 'in-progress' : 'geplant'}">${diff <= 25 ? 'Einlass läuft' : 'Start in ' + diff + 'm'}</span>
                <img src="${s.poster || '/assets/Oli/Oli_1_bgless.png'}" class="task-avatar" alt="Poster">
              </div>
            `;
          }
        });
      });

      if (!upcomingRows) {
        upcomingRows = `
          <div style="padding: 24px; text-align: center; color: #71717a; font-size: 13.5px;">
            Aktuell keine Vorstellungen im Einlass-Fenster (nächste 90 Minuten).
          </div>
        `;
      }

      content.innerHTML = `
        <div class="task-group">
          <h3 class="task-group-title">Aktuelle Einlass-Vorstellungen</h3>
          <div class="task-list">${upcomingRows}</div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Einlass-Routine</h3>
          <div class="task-list">
            <div class="task-row is-done" data-task-id="ein_check_1">
              <div class="custom-checkbox checked" onclick="window.appDashboard.toggleCheck(this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
                <span class="task-label">Handscanner Akkus voll & WLAN-Verbindung geprüft</span>
                <span class="task-sub">Station Einlass</span>
              </div>
              <span class="date-pill">📅 Schichtbeginn</span>
              <span class="status-pill done">Done</span>
              <img src="/assets/3d/avatar-1.png" class="task-avatar" alt="Avatar">
            </div>
            <div class="task-row" data-task-id="ein_check_2">
              <div class="custom-checkbox" onclick="window.appDashboard.toggleCheck(this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
                <span class="task-label">Foyer-Displays & Wegweiser synchronisiert</span>
                <span class="task-sub">Station Einlass</span>
              </div>
              <span class="date-pill">📅 Heute</span>
              <span class="status-pill in-progress">In progress</span>
              <img src="/assets/3d/avatar-2.png" class="task-avatar" alt="Avatar">
            </div>
          </div>
        </div>
      `;
    }

    // 5. DIGITALER FUNKRUF
    else if (state.activeView === 'funk') {
      if (crumbGroup) crumbGroup.textContent = 'Funkruf & Alarmierung';
      if (crumbCurrent) crumbCurrent.textContent = 'Digitaler Funkruf';
      if (heading) heading.textContent = 'Digitaler Funkruf & Sofort-Alarmierung';

      content.innerHTML = `
        <div class="funk-action-grid">
          <div class="funk-action-card" onclick="window.appDashboard.sendFunkruf('Betriebsleitung', 'Betriebsleitung dringend zum Einlass / Kasse erbeten')">
            <div class="funk-icon">📢</div>
            <div class="funk-info">
              <span class="funk-name">Betriebsleitung rufen</span>
              <span class="funk-desc">Dringender Support am Einlass</span>
            </div>
          </div>

          <div class="funk-action-card" onclick="window.appDashboard.sendFunkruf('Popcorn / Ware', 'Nachschub an Popcorn, Bechern oder Nachos benötigt')">
            <div class="funk-icon">🍿</div>
            <div class="funk-info">
              <span class="funk-name">Ware / Concession</span>
              <span class="funk-desc">Nachschub für Kasse & Bar</span>
            </div>
          </div>

          <div class="funk-action-card" onclick="window.appDashboard.sendFunkruf('Saalreinigung', 'Saal benötigt sofortige Zwischenreinigung vor Einlass')">
            <div class="funk-icon">🧹</div>
            <div class="funk-info">
              <span class="funk-name">Saalreinigung</span>
              <span class="funk-desc">Zwischenreinigung anfordern</span>
            </div>
          </div>

          <div class="funk-action-card" onclick="window.appDashboard.sendFunkruf('Technik', 'Vorführ- oder Tonstörung gemeldet')">
            <div class="funk-icon">⚠️</div>
            <div class="funk-info">
              <span class="funk-name">Technik & Bild/Ton</span>
              <span class="funk-desc">Störung an Vorführdienst melden</span>
            </div>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Aktive Funk-Rufe & Protokoll</h3>
          <div class="task-list" id="funk-history-list">
            <div class="task-row is-done">
              <div class="custom-checkbox checked">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="task-label-wrapper">
                <span class="task-label">Betriebsleitung zum Einlass (Saal 1 Einlass-Start)</span>
                <span class="task-sub">Erledigt durch Markus K.</span>
              </div>
              <span class="date-pill">📅 Vor 18 Min</span>
              <span class="status-pill done">Done</span>
              <img src="/assets/3d/avatar-1.png" class="task-avatar" alt="Avatar">
            </div>
          </div>
        </div>
      `;
    }

    // 6. VORFÜHRRAUM & LASER
    else if (state.activeView === 'tech') {
      if (crumbGroup) crumbGroup.textContent = 'Personal & Stationen';
      if (crumbCurrent) crumbCurrent.textContent = 'Vorführraum & Laser';
      if (heading) heading.textContent = 'Vorführraum – Technik & Automatisierung';

      const techChecks = [
        { id: 'tch1', label: 'DCP / KDM Schlüssel Gültigkeit für heutige Abendvorstellungen' },
        { id: 'tch2', label: 'Barco / Christie Laser-Kühlmittelkreislauf & Temperaturprüfung' },
        { id: 'tch3', label: 'Dolby CP950 Automation Cue Sync mit Saalbeleuchtung' },
        { id: 'tch4', label: 'Werbeblock & Vorprogramm Playlist auf aktuellem Stand' }
      ];

      let techRows = '';
      techChecks.forEach(t => {
        const taskId = `tech_${state.currentCity}_${formatDateStr(state.displayDate)}_${t.id}`;
        const isDone = storedStates[taskId] === true;
        techRows += `
          <div class="task-row ${isDone ? 'is-done' : ''}" data-task-id="${taskId}">
            <div class="custom-checkbox ${isDone ? 'checked' : ''}" onclick="window.appDashboard.toggleCheck(this)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
              <span class="task-label">${t.label}</span>
              <span class="task-sub">Technik-Routine • Bildwerfer</span>
            </div>
            <span class="date-pill">📅 Heute</span>
            <span class="status-pill ${isDone ? 'done' : 'in-progress'}">${isDone ? 'Done' : 'In progress'}</span>
            <img src="/assets/Oli/Oli_Security_bgless.png" class="task-avatar" alt="Oli">
          </div>
        `;
      });

      content.innerHTML = `
        <div class="task-group">
          <h3 class="task-group-title">Vorführraum & Automation Checks</h3>
          <div class="task-list">${techRows}</div>
        </div>
      `;
    }

    // 7. TAGESABSCHLUSS
    else if (state.activeView === 'report') {
      if (crumbGroup) crumbGroup.textContent = 'Berichte & Logs';
      if (crumbCurrent) crumbCurrent.textContent = 'Tagesabschluss';
      if (heading) heading.textContent = 'Tagesabschluss & Schichtbericht';

      let totalSessions = 0;
      (state.hallsData || []).forEach(h => totalSessions += (h.sessions || []).length);

      content.innerHTML = `
        <div class="prognosis-card">
          <h4 style="font-size: 15px; font-weight: 700; color: #09090b;">Schicht-Zusammenfassung • ${state.currentCity.toUpperCase()}</h4>
          <p style="font-size: 12.5px; color: #71717a; margin-top: 2px;">Automatisierter Statusbericht für die Theaterleitung.</p>

          <div class="prognosis-grid">
            <div class="prognosis-item">
              <div class="prognosis-num">${(state.hallsData || []).length}</div>
              <div class="prognosis-label">Aktive Säle</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${totalSessions}</div>
              <div class="prognosis-label">Vorstellungen Gesamt</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">100%</div>
              <div class="prognosis-label">D1 Sync Rate</div>
            </div>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Abend-Abschluss Checkliste</h3>
          <div class="task-list">
            <div class="task-row" data-task-id="close_1">
              <div class="custom-checkbox" onclick="window.appDashboard.toggleCheck(this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
                <span class="task-label">Alle Projektoren in Standby & Lampenabkühlung beendet</span>
                <span class="task-sub">Abschluss Vorführraum</span>
              </div>
              <span class="date-pill">📅 Nacht</span>
              <span class="status-pill in-progress">In progress</span>
              <img src="/assets/3d/avatar-1.png" class="task-avatar" alt="Avatar">
            </div>
            <div class="task-row" data-task-id="close_2">
              <div class="custom-checkbox" onclick="window.appDashboard.toggleCheck(this)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="task-label-wrapper" onclick="window.appDashboard.toggleCheckFromLabel(this)">
                <span class="task-label">Sämtliche Notausgangstüren verriegelt & Alarmanlage scharf</span>
                <span class="task-sub">Abschluss Sicherheit</span>
              </div>
              <span class="date-pill">📅 Nacht</span>
              <span class="status-pill in-progress">In progress</span>
              <img src="/assets/Oli/Oli_Security_bgless.png" class="task-avatar" alt="Oli">
            </div>
          </div>
        </div>
      `;
    }
  },

  // Toggle Checkbox Item
  async toggleCheck(checkboxEl) {
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

    // Toggle Status Pill
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
      try {
        api.toggleTaskCompletion(state.currentCity, taskId, isNowChecked).catch(() => {});
      } catch (e) {}
    }
  },

  toggleCheckFromLabel(labelWrapper) {
    const row = labelWrapper.closest('.task-row');
    if (!row) return;
    const checkbox = row.querySelector('.custom-checkbox');
    if (checkbox) {
      this.toggleCheck(checkbox);
    }
  },

  // Send Funkruf Alert
  async sendFunkruf(title, msg) {
    try {
      await api.sendBroadcast(title, msg, state.currentCity).catch(() => {});
    } catch (e) {}

    // Add to history
    const historyList = document.getElementById('funk-history-list');
    if (historyList) {
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} Uhr`;
      const newRow = document.createElement('div');
      newRow.className = 'task-row is-done';
      newRow.innerHTML = `
        <div class="custom-checkbox checked">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="task-label-wrapper">
          <span class="task-label">${title}: ${msg}</span>
          <span class="task-sub">Gerade eben gesendet</span>
        </div>
        <span class="date-pill">📅 ${timeStr}</span>
        <span class="status-pill done">Gesendet</span>
        <img src="/assets/Oli/Oli_Success_bgless.png" class="task-avatar" alt="Avatar">
      `;
      historyList.insertBefore(newRow, historyList.firstChild);
    }

    alert(`Funkruf gesendet: ${title}\n"${msg}"`);
  },

  // Filter completed tasks
  toggleDoneFilter() {
    state.filterHideDone = !state.filterHideDone;
    const doneRows = document.querySelectorAll('.task-row.is-done');
    doneRows.forEach(row => {
      row.style.display = state.filterHideDone ? 'none' : 'grid';
    });
  },

  // Real-time Search
  handleSearch(query) {
    state.searchQuery = (query || '').toLowerCase().trim();
    const rows = document.querySelectorAll('.task-row');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (!state.searchQuery || text.includes(state.searchQuery)) {
        row.style.display = 'grid';
      } else {
        row.style.display = 'none';
      }
    });
  },

  // Update countdown badges every minute
  updateLiveCountdowns() {
    if (state.activeView === 'hall') {
      this.renderWorkspace();
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('kp_guest_mode', 'true');
  window.appRouter.init();
  window.appDashboard.init();
});
