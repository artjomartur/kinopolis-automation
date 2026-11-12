/**
 * Kinopolis Operations Platform
 * Framer SaaS Architecture with Full Cinema Business Logic & Operational Service Tools
 */

import { ApiClient } from './core/api.js';
import {
  KINOPOLIS_LOCATIONS,
  getFallbackHalls,
  sortHallsNaturally,
  calculatePopcornDemand,
  detectPosterChanges,
  detectAuslaesse,
  checkFskCompliance
} from './utils/cinema-logic.js';

const api = new ApiClient();
const TASK_STORAGE_KEY = 'kp_saas_task_states_v3';
const HANDOVER_STORAGE_KEY = 'kp_handover_notes_v1';
const POSTER_STORAGE_KEY = 'completed_posters';
const AUSLASS_STORAGE_KEY = 'completed_auslaesse';
const LOSTFOUND_STORAGE_KEY = 'kinopolis_lostfound';
const MHD_STORAGE_KEY = 'kinopolis_mhd';

// Initial Handover notes if empty
function getInitialHandoverNotes() {
  try {
    const stored = localStorage.getItem(HANDOVER_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {}

  return [
    { id: 1, title: 'Barco Laser Kühlung Saal 1', text: 'Kühlmittelstand heute um 11:00 Uhr geprüft, Lamellenfilter gereinigt. Keine Auffälligkeiten.', author: 'Lukas (Vorführer)', priority: 'normal', time: '11:15 Uhr', done: true },
    { id: 2, title: 'Popcorn Mais Vorrat', text: '30 Säcke Butterfly-Mais im Hauptlager deponiert. Ausreichend für das gesamte Wochenende.', author: 'Sarah (Theke)', priority: 'normal', time: '13:40 Uhr', done: false },
    { id: 3, title: 'Einlass-Stoßzeit Primetime', text: 'Wicked & Gladiator laufen um 17:45 und 20:30 fast voll. Beide Scanner an Einlass 1 & 2 besetzen.', author: 'Markus (TL)', priority: 'wichtig', time: '14:20 Uhr', done: false }
  ];
}

function getInitialLostFound() {
  try {
    const stored = localStorage.getItem(LOSTFOUND_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch(e) {}

  return [
    { id: 'lf-1', hall: 'Kino 1', category: 'Kleidung', desc: 'Schwarzer Wollschal (Zara)', finder: 'Reinigungsteam', date: 'Heute, 14:10 Uhr', status: 'im_tresor' },
    { id: 'lf-2', hall: 'Kino 3', category: 'Elektronik', desc: 'AirPods Pro Ladecase (weiß)', finder: 'Sarah (Einlass)', date: 'Heute, 16:30 Uhr', status: 'im_tresor' },
    { id: 'lf-3', hall: 'Foyer / Bar', category: 'Wertsachen', desc: 'Geldbörse Leder braun mit Personalausweis', finder: 'Lukas (Theke)', date: 'Gestern, 21:15 Uhr', status: 'ausgegeben' }
  ];
}

function getInitialMhdList() {
  try {
    const stored = localStorage.getItem(MHD_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch(e) {}

  return [
    { id: 'mhd-1', item: 'Nacho Käsesauce (3kg Beutel)', date: '2026-11-28', location: 'Kühlhaus 1', loggedBy: 'Sarah' },
    { id: 'mhd-2', item: 'Slush-Sirup Waldmeister (5L)', date: '2026-12-15', location: 'Gondel Theke 2', loggedBy: 'Lukas' },
    { id: 'mhd-3', item: 'Popcorn Kokosfett (Palmin)', date: '2027-01-30', location: 'Popcornküche', loggedBy: 'Markus' }
  ];
}

function getContactsForLocation(citySlug) {
  return [
    { id: 1, role: 'Bildwerferraum (BWR)', name: 'Vorführraum & Lasertechnik', ext: '101', icon: '📽️', funkCh: 'Kanal 1', note: 'Projektion, Automation & Audio-CPL' },
    { id: 2, role: 'Kasse & Counter', name: 'Zentralkasse / Vorverkauf', ext: '102', icon: '🎟️', funkCh: 'Kanal 2', note: 'Ticketrücknahme, Gutscheine, Stornos' },
    { id: 3, role: 'Einlass & Saalaufsicht', name: 'Haupteinlass 1. OG', ext: '103', icon: '🚪', funkCh: 'Kanal 3', note: 'Einlasskontrolle, Saalöffnung, FSK-Check' },
    { id: 4, role: 'Teamleiter (TL) Mobil', name: 'Schichtleitung vom Dienst', ext: '100', icon: '👔', funkCh: 'Kanal 1 / 4', note: 'Diensthandy: 0171-8849201 • Notfälle' },
    { id: 5, role: 'Concession / Bar', name: 'Haupttheke & Popcornküche', ext: '104', icon: '🍿', funkCh: 'Kanal 2', note: 'Nachschub-Ruf, Sirup & Becher-Lager' },
    { id: 6, role: 'Haustechnik & Facility', name: 'Gebäudeleittechnik (GLT)', ext: '105', icon: '🛠️', funkCh: 'Kanal 4', note: 'Klima/Lüftung, Sanitär, Brandschutztüren' },
    { id: 7, role: 'Betriebsleitung (BL)', name: 'Theaterleitung Büro', ext: '110', icon: '🏢', funkCh: 'Kanal 1', note: 'Geschäftsführung & Administration' },
    { id: 8, role: 'Notruf & Feuerwehr', name: 'Leitstelle / Polizei', ext: '112 / 110', icon: '🚨', funkCh: 'Telefon', note: 'Akute Notfälle & Brandmeldeanlage' }
  ];
}

// Application State
const state = {
  currentCity: localStorage.getItem('current_city') || 'su',
  displayDate: new Date(),
  isTomorrow: false,
  hallsData: [],
  hallStatus: {},
  tomorrowSessions: [],
  activeRail: 'shows', // 'shows', 'tasks', 'calendar', 'alerts', 'tech', 'stats', 'settings'
  activeView: 'all_halls', // 'all_halls', 'hall', 'poster', 'auslaesse', 'lostfound', 'contacts', 'fsk', 'mhd', 'calendar', 'alerts', 'tech', 'stats', 'concession', 'einlass', 'report', 'settings'
  activeHallName: null,
  activeGroupName: 'Programm & Säle',
  filterHideDone: false,
  searchQuery: '',
  calendarFilter: 'all', // 'all', '2d', '3d', 'atmos', 'dbox', 'ov'
  posterFilter: 'all', // 'all', 'pending', 'done'
  completedPosters: new Set(JSON.parse(localStorage.getItem(POSTER_STORAGE_KEY) || '[]')),
  completedAuslaesse: new Set(JSON.parse(localStorage.getItem(AUSLASS_STORAGE_KEY) || '[]')),
  lostAndFoundItems: getInitialLostFound(),
  mhdItems: getInitialMhdList(),
  handoverNotes: getInitialHandoverNotes()
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

  // Display toast feedback pill
  showToast(msg, icon = '✓') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
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
    this.showToast(`Standort gewechselt: ${this.getLocationName(loc)}`, '🏢');
  },

  getLocationName(slug) {
    const loc = KINOPOLIS_LOCATIONS.find(l => l.slug === slug);
    return loc ? loc.name : slug.toUpperCase();
  },

  // Toggle Date Mode
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

  // Pick specific calendar date
  async pickDate(dateStr) {
    if (!dateStr) return;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      state.displayDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      const todayStr = formatDateStr(new Date());
      state.isTomorrow = (dateStr !== todayStr);
      await this.fetchData();
      this.showToast(`Datum gewählt: ${dateStr}`, '📅');
    }
  },

  // Filter Calendar Formats
  filterCalendarFormat(fmt) {
    state.calendarFilter = fmt;
    this.renderWorkspace();
  },

  // Render Sidebar with Dynamic Halls from Kinopolis API
  renderSidebar() {
    const sidebarEl = document.querySelector('.col-sidebar');
    if (!sidebarEl) return;

    // 1. Shows & Halls Rail
    // 1. Shows, Halls & Tasks Rail
    if (state.activeRail === 'shows' || state.activeRail === 'tasks') {
      const posterCheck = detectPosterChanges(state.hallsData, state.tomorrowSessions, state.completedPosters);
      const pendingCount = posterCheck.pendingCount;
      const pendingBadge = pendingCount > 0 
        ? `<span class="kpi-pill urgent" style="margin-left: auto; padding: 1px 6px; font-size: 10.5px;">${pendingCount} offen</span>`
        : `<span class="kpi-pill success" style="margin-left: auto; padding: 1px 6px; font-size: 10.5px;">Aktuell</span>`;

      // Update badge dot on rail icon
      const railBadge = document.getElementById('rail-tasks-badge');
      if (railBadge) {
        railBadge.style.display = pendingCount > 0 ? 'block' : 'none';
      }

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
        <!-- Kino-Service & Aufgaben -->
        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            <span>Kino-Service & Aufgaben</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn ${state.activeView === 'poster' ? 'active' : ''}" onclick="window.appDashboard.switchView('poster', 'Posterwechsel & Schaukästen', 'Kino-Service & Aufgaben')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Posterwechsel & Schaukästen</span>
                ${pendingBadge}
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.activeView === 'auslaesse' ? 'active' : ''}" onclick="window.appDashboard.switchView('auslaesse', 'Saalauslässe & Reinigung', 'Kino-Service & Aufgaben')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Saalauslässe & Reinigung</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.activeView === 'lostfound' ? 'active' : ''}" onclick="window.appDashboard.switchView('lostfound', 'Digitales Fundbüro', 'Kino-Service & Aufgaben')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <span>Digitales Fundbüro</span>
                <span style="margin-left: auto; font-size: 11px; color: #a1a1aa;">${state.lostAndFoundItems.filter(i => i.status === 'im_tresor').length}</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.activeView === 'contacts' ? 'active' : ''}" onclick="window.appDashboard.switchView('contacts', 'Kurzwahlen & Notfallkontakte', 'Kino-Service & Aufgaben')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Kurzwahlen & Telefonliste</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.activeView === 'fsk' ? 'active' : ''}" onclick="window.appDashboard.switchView('fsk', 'FSK & Jugendschutz-Prüfung', 'Kino-Service & Aufgaben')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                <span>FSK & Jugendschutz-Check</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.activeView === 'mhd' ? 'active' : ''}" onclick="window.appDashboard.switchView('mhd', 'MHD-Erfassung & Ware', 'Kino-Service & Aufgaben')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>MHD-Erfassung & Transfer</span>
              </button>
            </li>
          </ul>
        </div>

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
          </ul>
        </div>
      `;
    }

    // 2. Calendar Rail
    else if (state.activeRail === 'calendar') {
      const today = new Date();
      const tom = new Date(Date.now() + 86400000);
      const day3 = new Date(Date.now() + 172800000);

      sidebarEl.innerHTML = `
        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Spieltage wählen</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn ${!state.isTomorrow && formatDateStr(state.displayDate) === formatDateStr(today) ? 'active' : ''}" onclick="window.appDashboard.setDateMode(false)">
                <span>📅 Heute (${today.getDate()}.${today.getMonth() + 1}.)</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.isTomorrow ? 'active' : ''}" onclick="window.appDashboard.setDateMode(true)">
                <span>📅 Morgen (${tom.getDate()}.${tom.getMonth() + 1}.)</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn" onclick="window.appDashboard.pickDate('${formatDateStr(day3)}')">
                <span>📅 Übermorgen (${day3.getDate()}.${day3.getMonth() + 1}.)</span>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            <span>Formatfilter</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn ${state.calendarFilter === 'all' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('all')">
                <span>🎬 Alle Formate</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.calendarFilter === 'atmos' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('atmos')">
                <span>🔊 Dolby Atmos / Cinema</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.calendarFilter === 'dbox' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('dbox')">
                <span>🛋️ D-Box & Komfort</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.calendarFilter === '3d' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('3d')">
                <span>🕶️ 3D Vorstellungen</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn ${state.calendarFilter === 'ov' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('ov')">
                <span>🌐 OV / OmU Versionen</span>
              </button>
            </li>
          </ul>
        </div>
      `;
    }

    // 3. Alerts & Handover Rail
    else if (state.activeRail === 'alerts') {
      sidebarEl.innerHTML = `
        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span>Funkruf & Meldungen</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn active" onclick="window.appDashboard.switchView('alerts', 'Funkruf & Alarmierung', 'Funkruf & Meldungen')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 11 18-5v12L3 14v-3z"/></svg>
                <span>Digitaler Funkruf</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn" onclick="window.appDashboard.switchView('alerts', 'Schicht-Übergabebuch', 'Funkruf & Meldungen')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span>Übergabebuch (${state.handoverNotes.length})</span>
              </button>
            </li>
          </ul>
        </div>
      `;
    }

    // 4. Tech & Quick Action Rail
    else if (state.activeRail === 'tech') {
      sidebarEl.innerHTML = `
        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            <span>Technik & Automation</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn active" onclick="window.appDashboard.switchView('tech', 'Vorführraum, Laser & Quick Actions', 'Technik & Quick Actions')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2m-10-10h2m16 0h2"/></svg>
                <span>Vorführraum & Cues</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn" onclick="window.appDashboard.sendQuickAction('Einlasslicht AN (50%)', 'Einlasslicht in allen Sälen aktiviert')">
                <span>💡 Alle Säle Einlasslicht</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn" onclick="window.appDashboard.sendQuickAction('Showbeleuchtung (0%)', 'Showlicht CPL aktiv')">
                <span>🎬 Showlicht Start</span>
              </button>
            </li>
          </ul>
        </div>
      `;
    }

    // 5. Stats & Analytics Rail
    else if (state.activeRail === 'stats') {
      sidebarEl.innerHTML = `
        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            <span>Auslastung & Reports</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn active" onclick="window.appDashboard.switchView('stats', 'Auslastung & Analytics', 'Statistiken & Berichte')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                <span>Saal-Auslastung Live</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn" onclick="window.appDashboard.switchView('concession', 'Popcorn-Rechner', 'Statistiken & Berichte')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                <span>Popcorn-Bedarfsrechner</span>
              </button>
            </li>
            <li>
              <button class="sidebar-item-btn" onclick="window.appDashboard.switchView('report', 'Tagesabschluss', 'Statistiken & Berichte')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                <span>Schichtbericht & Export</span>
              </button>
            </li>
          </ul>
        </div>
      `;
    }

    // 6. Settings Rail
    else if (state.activeRail === 'settings') {
      sidebarEl.innerHTML = `
        <div>
          <div class="sidebar-group-title">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span>System & Einstellungen</span>
          </div>
          <ul class="sidebar-items">
            <li>
              <button class="sidebar-item-btn active" onclick="window.appDashboard.switchView('settings', 'Einstellungen', 'System & Setup')">
                <span>🏢 Standort & Cache</span>
              </button>
            </li>
          </ul>
        </div>
      `;
    }
  },

  // Switch Hall
  switchHall(hallName) {
    state.activeRail = 'shows';
    state.activeView = 'hall';
    state.activeHallName = hallName;
    state.activeGroupName = 'Programm & Säle';
    this.syncRailHighlight('shows');
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

  syncRailHighlight(railName) {
    document.querySelectorAll('.rail-icon-btn').forEach(b => {
      const onclickAttr = b.getAttribute('onclick') || '';
      b.classList.toggle('active', onclickAttr.includes(`'${railName}'`));
    });
  },

  // Switch Icon Rail (Multi-Function Buttons)
  switchRail(railName, btnEl) {
    state.activeRail = railName;
    document.querySelectorAll('.rail-icon-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    if (railName === 'shows') {
      this.switchView('all_halls', 'Alle Säle (Übersicht)', 'Programm & Säle');
    } else if (railName === 'tasks') {
      this.switchView('poster', 'Posterwechsel & Schaukästen', 'Kino-Service & Aufgaben');
    } else if (railName === 'calendar') {
      this.switchView('calendar', 'Spielzeiten-Kalender & Timeline', 'Kalender & Spielzeiten');
    } else if (railName === 'alerts') {
      this.switchView('alerts', 'Funkruf & Übergabebuch', 'Funkruf & Alarmierung');
    } else if (railName === 'tech') {
      this.switchView('tech', 'Vorführraum, Laser & Quick Actions', 'Technik & Quick Actions');
    } else if (railName === 'stats') {
      this.switchView('stats', 'Auslastung & Analytics', 'Statistiken & Berichte');
    } else if (railName === 'settings') {
      this.switchView('settings', 'Einstellungen & Standorte', 'System & Setup');
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
            <img src="/assets/Oli/oli_logo_tight.png" class="task-avatar" alt="Oli">
          </div>
        `;
      });

      content.innerHTML = `
        <div class="task-group">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 class="task-group-title" style="margin-bottom: 0;">Heutige Vorstellungen (${this.getLocationName(state.currentCity)})</h3>
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
      if (heading) heading.textContent = `${this.getLocationName(state.currentCity)} – Saalübersicht`;

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
              <span class="task-sub">${(hall.sessions || []).length} Vorstellungen heute • Klicke für Saal-Disposition</span>
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
            <h3 class="task-group-title" style="margin-bottom: 0;">Alle Kinosäle im Überblick (${(state.hallsData || []).length} Säle aktiv)</h3>
            <div class="date-toggle-group">
              <button class="date-toggle-btn ${!state.isTomorrow ? 'active' : ''}" data-tomorrow="false" onclick="window.appDashboard.setDateMode(false)">Heute</button>
              <button class="date-toggle-btn ${state.isTomorrow ? 'active' : ''}" data-tomorrow="true" onclick="window.appDashboard.setDateMode(true)">Morgen</button>
            </div>
          </div>
          <div class="task-list">${hallsRows}</div>
        </div>
      `;
    }

    // 2b. POSTERWECHSEL & SCHAUKÄSTEN VIEW
    else if (state.activeView === 'poster') {
      if (crumbGroup) crumbGroup.textContent = 'Kino-Service & Aufgaben';
      if (crumbCurrent) crumbCurrent.textContent = 'Posterwechsel & Schaukästen';
      if (heading) heading.textContent = 'Schaukästen-Posterwechsel & Zwischeneinleger (ZE)';

      const posterData = detectPosterChanges(state.hallsData, state.tomorrowSessions, state.completedPosters);
      const allChanges = posterData.allChanges;
      const completedCount = allChanges.filter(c => c.isCompleted).length;
      const zeCount = allChanges.filter(c => c.needsZe).length;

      let filteredChanges = allChanges;
      if (state.posterFilter === 'pending') {
        filteredChanges = allChanges.filter(c => !c.isCompleted);
      } else if (state.posterFilter === 'done') {
        filteredChanges = allChanges.filter(c => c.isCompleted);
      }

      let cardsHtml = '';
      if (filteredChanges.length === 0) {
        cardsHtml = `
          <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: #71717a; background: #fbfbfb; border-radius: 12px; border: 1px dashed var(--border-subtle);">
            <div style="font-size: 32px; margin-bottom: 8px;">🖼️</div>
            <div style="font-size: 15px; font-weight: 600; color: #18181b;">Keine Plakatwechsel für diesen Filter</div>
            <div style="font-size: 13px; color: #71717a; margin-top: 4px;">Alle Schaukästen stimmen mit den aktuellen Vorführungen überein.</div>
          </div>
        `;
      } else {
        filteredChanges.forEach(change => {
          const curPoster = (change.currentMovie && change.currentMovie.poster) || '/assets/3d/hero-cube.png';
          const nextPoster = (change.nextMovie && change.nextMovie.poster) || '/assets/3d/hero-ring.png';
          const isDone = change.isCompleted;

          cardsHtml += `
            <div class="poster-change-card ${isDone ? 'is-completed' : ''}" data-alert-id="${change.alertId}">
              <div class="poster-card-top">
                <div class="poster-hall-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
                  <span>${change.hallName}</span>
                </div>
                ${isDone 
                  ? '<span class="kpi-pill success">✅ Erledigt</span>' 
                  : (change.isReadyNow 
                      ? '<span class="kpi-pill urgent">🔴 Jetzt wechseln! (Film läuft)</span>' 
                      : `<span class="kpi-pill" style="color: #71717a;">🕒 Bereit ab ${change.swapReadyTime} Uhr</span>`)}
              </div>

              <!-- Poster Flow Comparison -->
              <div class="poster-comparison-flow">
                <!-- Current Poster -->
                <div class="poster-box">
                  <span class="poster-box-role">Aktuell im Kasten</span>
                  <img src="${curPoster}" class="poster-thumb" alt="${change.currentMovie ? change.currentMovie.title : 'Aktuell'}">
                  <div class="poster-box-title" title="${change.currentMovie ? change.currentMovie.title : ''}">${change.currentMovie ? change.currentMovie.title : '–'}</div>
                  <div class="poster-box-meta">Start: ${change.currentMovie ? change.currentMovie.time : ''} Uhr</div>
                </div>

                <!-- Arrow -->
                <div class="poster-arrow-col">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>

                <!-- Next Poster -->
                <div class="poster-box">
                  <span class="poster-box-role" style="color: #4f46e5;">Nächstes Plakat</span>
                  <img src="${nextPoster}" class="poster-thumb" style="border-color: #6366f1;" alt="${change.nextMovie ? change.nextMovie.title : 'Nächster'}">
                  <div class="poster-box-title" title="${change.nextMovie ? change.nextMovie.title : ''}">${change.nextMovie ? change.nextMovie.title : '–'}</div>
                  <div class="poster-box-meta">${change.isEndDay ? 'Start: Morgen früh' : 'Start: ' + (change.nextMovie ? change.nextMovie.time : '') + ' Uhr'}</div>
                </div>
              </div>

              <!-- Tags / ZE indicator -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                <div>
                  ${change.needsZe ? '<span class="ze-badge-tag">🏷️ Zwischeneinleger (ZE) erforderlich</span>' : '<span style="font-size: 11px; color: #a1a1aa;">Kein ZE nötig</span>'}
                </div>
                ${change.isEndDay ? '<span style="font-size: 11px; font-weight: 600; color: #8b5cf6;">🌙 Letzte Vorstellung (Tagesende)</span>' : ''}
              </div>

              <!-- Actions -->
              <div class="poster-card-actions">
                ${isDone 
                  ? `<button class="btn-poster-done done" onclick="window.appDashboard.unmarkPosterDone('${change.alertId}')">↩️ Zurücksetzen</button>`
                  : `<button class="btn-poster-done" onclick="window.appDashboard.markPosterDone('${change.alertId}')">✅ Als gewechselt markieren</button>`}
              </div>
            </div>
          `;
        });
      }

      content.innerHTML = `
        <div class="service-header-banner">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #09090b; margin: 0;">Plakatwechsel-Übersicht für Saal-Schaukästen</h3>
            <p style="font-size: 12.5px; color: #71717a; margin-top: 3px;">
              Regel: 20 Min. nach Vorstellungsbeginn kann das Plakat im Schaukasten für den nächsten Film getauscht werden.
            </p>
          </div>
          <div class="kpi-pills-row">
            <span class="kpi-pill urgent">🔴 ${posterData.pendingCount} Fällig zum Wechsel</span>
            <span class="kpi-pill badge-ze">🏷️ ${zeCount} mit Zwischeneinleger (ZE)</span>
            <span class="kpi-pill success">✅ ${completedCount} Gewechselt</span>
          </div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
          <div class="date-toggle-group">
            <button class="date-toggle-btn ${state.posterFilter === 'all' ? 'active' : ''}" onclick="window.appDashboard.setPosterFilter('all')">Alle (${allChanges.length})</button>
            <button class="date-toggle-btn ${state.posterFilter === 'pending' ? 'active' : ''}" onclick="window.appDashboard.setPosterFilter('pending')">Nur fällige (${posterData.pendingCount})</button>
            <button class="date-toggle-btn ${state.posterFilter === 'done' ? 'active' : ''}" onclick="window.appDashboard.setPosterFilter('done')">Erledigte (${completedCount})</button>
          </div>
          <span style="font-size: 12px; color: #71717a;">Standort: <strong>${this.getLocationName(state.currentCity)}</strong></span>
        </div>

        <div class="poster-change-grid">
          ${cardsHtml}
        </div>
      `;
    }

    // 2c. SAALAUSLÄSSE & REINIGUNG VIEW
    else if (state.activeView === 'auslaesse') {
      if (crumbGroup) crumbGroup.textContent = 'Kino-Service & Aufgaben';
      if (crumbCurrent) crumbCurrent.textContent = 'Saalauslässe & Reinigung';
      if (heading) heading.textContent = 'Saalauslässe, Countdown & Saal-Reinigung';

      const auslaesse = detectAuslaesse(state.hallsData, null, state.completedAuslaesse);

      let auslassCards = '';
      if (auslaesse.length === 0) {
        auslassCards = `
          <div style="grid-column: 1 / -1; padding: 48px; text-align: center; color: #71717a; background: #fbfbfb; border-radius: 12px; border: 1px dashed var(--border-subtle);">
            <div style="font-size: 32px; margin-bottom: 8px;">🚪</div>
            <div style="font-size: 15px; font-weight: 600; color: #18181b;">Keine anstehenden Saalauslässe</div>
            <div style="font-size: 13px; color: #71717a; margin-top: 4px;">In den nächsten 90 Minuten enden keine Vorführungen.</div>
          </div>
        `;
      } else {
        auslaesse.forEach(item => {
          const isDone = item.isCompleted;
          const isImminent = item.minUntilEnd <= 10 && item.minUntilEnd >= -15;

          auslassCards += `
            <div class="auslass-card" style="${isDone ? 'opacity: 0.65;' : ''}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="poster-hall-badge">${item.hallName}</span>
                <span class="kpi-pill ${isImminent ? 'urgent' : ''}">
                  ${item.minUntilEnd <= 0 ? '⚠️ Auslass läuft jetzt' : `Ende in ${item.minUntilEnd} Min.`}
                </span>
              </div>

              <div>
                <h4 style="font-size: 14.5px; font-weight: 700; color: #09090b;">${item.session.title}</h4>
                <div style="font-size: 12px; color: #71717a; margin-top: 2px;">
                  Vorstellung: ${item.session.time} – ${item.endTimeStr} Uhr • Dauer: ${item.session.duration || 110} Min.
                </div>
              </div>

              <div style="background: #fcfcfc; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 10px; font-size: 12px; line-height: 1.5; color: #52525b;">
                <strong>Aufgaben für Einlass & Service:</strong><br>
                • Saaltüren öffnen & Lichtsteuerung auf Ausgangsstufe<br>
                • Besucherführung Foyer & Mülltrennung unterstützen<br>
                • Reihendurchgang & Sichtprüfung auf vergessene Gegenstände
              </div>

              <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
                ${isDone
                  ? `<button class="btn-poster-done done" onclick="window.appDashboard.unmarkAuslassDone('${item.id}')">✓ Gereinigt (Rückgängig)</button>`
                  : `<button class="btn-poster-done" onclick="window.appDashboard.markAuslassDone('${item.id}')">🧹 Saal gereinigt & freigegeben</button>`}
              </div>
            </div>
          `;
        });
      }

      content.innerHTML = `
        <div class="service-header-banner">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #09090b; margin: 0;">Saalauslässe & Reinigungstaktung</h3>
            <p style="font-size: 12.5px; color: #71717a; margin-top: 3px;">
              Echtzeit-Berechnung aus Vorstellungs-Beginn und Filmlänge inklusive automatischer Reinigungsfenster.
            </p>
          </div>
          <div class="kpi-pills-row">
            <span class="kpi-pill">🚪 ${auslaesse.length} Anstehende Auslässe</span>
            <span class="kpi-pill success">🧹 ${state.completedAuslaesse.size} Gereinigt</span>
          </div>
        </div>

        <div class="auslass-grid">
          ${auslassCards}
        </div>
      `;
    }

    // 2d. DIGITALES FUNDBÜRO
    else if (state.activeView === 'lostfound') {
      if (crumbGroup) crumbGroup.textContent = 'Kino-Service & Aufgaben';
      if (crumbCurrent) crumbCurrent.textContent = 'Digitales Fundbüro';
      if (heading) heading.textContent = 'Digitales Fundbüro (Lost & Found)';

      let rowsHtml = '';
      state.lostAndFoundItems.forEach(item => {
        const isTresor = item.status === 'im_tresor';
        rowsHtml += `
          <tr>
            <td style="font-weight: 600;">${item.hall}</td>
            <td><span class="kpi-pill" style="font-size: 11px;">${item.category}</span></td>
            <td><strong>${item.desc}</strong></td>
            <td style="color: #71717a;">${item.finder}</td>
            <td style="color: #71717a;">${item.date}</td>
            <td>
              <span class="status-pill ${isTresor ? 'geplant' : 'done'}" style="cursor: pointer;" onclick="window.appDashboard.toggleLostFoundStatus('${item.id}')">
                ${isTresor ? '🔒 Im Tresor' : '✅ An Gast ausgegeben'}
              </span>
            </td>
            <td>
              <button class="icon-btn-subtle" title="Status wechseln" onclick="window.appDashboard.toggleLostFoundStatus('${item.id}')">
                ${isTresor ? 'Ausgeben' : 'Widerrufen'}
              </button>
            </td>
          </tr>
        `;
      });

      content.innerHTML = `
        <div class="service-header-banner">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #09090b; margin: 0;">Gefundene Gegenstände & Wertgegenstände</h3>
            <p style="font-size: 12.5px; color: #71717a; margin-top: 3px;">
              Zentrale Erfassung für Foyer, Einlass und Saalkontrolle.
            </p>
          </div>
          <div class="kpi-pills-row">
            <span class="kpi-pill">🎒 ${state.lostAndFoundItems.length} Erfasst</span>
            <span class="kpi-pill urgent">🔒 ${state.lostAndFoundItems.filter(i => i.status === 'im_tresor').length} Im Safe</span>
          </div>
        </div>

        <!-- Quick Entry Form -->
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #09090b; margin-bottom: 12px;">➕ Neuen Fundgegenstand erfassen</h4>
          <form onsubmit="window.appDashboard.addLostFoundItem(event); return false;" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)) 120px; gap: 10px; align-items: flex-end;">
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Fundort / Saal</label>
              <select id="lf-input-hall" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
                ${(state.hallsData || []).map(h => `<option value="${h.name}">${h.name}</option>`).join('')}
                <option value="Foyer / Kasse">Foyer / Kasse</option>
                <option value="Toiletten">Sanitäranlagen</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Kategorie</label>
              <select id="lf-input-cat" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
                <option value="Wertsachen">💎 Wertsachen</option>
                <option value="Elektronik">📱 Elektronik / Smartphone</option>
                <option value="Kleidung">🧥 Kleidung & Schals</option>
                <option value="Schlüssel">🔑 Schlüssel</option>
                <option value="Sonstiges">📦 Sonstiges</option>
              </select>
            </div>
            <div style="grid-column: span 2;">
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Genaue Beschreibung</label>
              <input type="text" id="lf-input-desc" placeholder="z.B. Schwarzer Rucksack mit Trinkflasche" required style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
            </div>
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Gefunden von</label>
              <input type="text" id="lf-input-finder" placeholder="Dein Name" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
            </div>
            <button type="submit" class="btn-primary-small" style="height: 35px;">Erfassen</button>
          </form>
        </div>

        <!-- Table -->
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden;">
          <table class="lostfound-table">
            <thead>
              <tr>
                <th>Ort</th>
                <th>Kategorie</th>
                <th>Beschreibung</th>
                <th>Finder</th>
                <th>Datum / Uhrzeit</th>
                <th>Status</th>
                <th>Aktion</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    // 2e. KURZWAHLEN & TELEFONLISTE
    else if (state.activeView === 'contacts') {
      if (crumbGroup) crumbGroup.textContent = 'Kino-Service & Aufgaben';
      if (crumbCurrent) crumbCurrent.textContent = 'Kurzwahlen & Telefonliste';
      if (heading) heading.textContent = `Interne Kurzwahlen & Notfallkontakte • ${this.getLocationName(state.currentCity)}`;

      const contacts = getContactsForLocation(state.currentCity);
      let cardsHtml = '';
      contacts.forEach(c => {
        cardsHtml += `
          <div class="contact-card">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div class="contact-avatar">${c.icon}</div>
              <div class="contact-info">
                <h4>${c.role}</h4>
                <p>${c.name} • ${c.funkCh}</p>
                <div style="font-size: 11px; color: #a1a1aa; margin-top: 2px;">${c.note}</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
              <a href="tel:${c.ext}" class="contact-dial-badge">📞 Ext. ${c.ext}</a>
              <button class="icon-btn-subtle" style="font-size: 11.5px; height: 26px; padding: 2px 8px;" onclick="window.appDashboard.sendFunkruf('${c.role}', 'Bitte Rückruf oder Support')">Funkruf</button>
            </div>
          </div>
        `;
      });

      content.innerHTML = `
        <div class="service-header-banner">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #09090b; margin: 0;">Telefon- & Funkverzeichnis</h3>
            <p style="font-size: 12.5px; color: #71717a; margin-top: 3px;">
              Direkte Durchwahlen zu allen Stationen am Standort <strong>${this.getLocationName(state.currentCity)}</strong>.
            </p>
          </div>
          <span class="kpi-pill success">Live Standleitung aktiv</span>
        </div>

        <div class="contacts-grid">
          ${cardsHtml}
        </div>
      `;
    }

    // 2f. FSK & JUGENDSCHUTZ VIEW
    else if (state.activeView === 'fsk') {
      if (crumbGroup) crumbGroup.textContent = 'Kino-Service & Aufgaben';
      if (crumbCurrent) crumbCurrent.textContent = 'FSK-Prüfung';
      if (heading) heading.textContent = 'FSK- & Jugendschutz-Schnellprüfung (§11 JuSchG)';

      content.innerHTML = `
        <div class="fsk-calc-card">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
            <img src="/assets/Oli/oli_logo_tight.png" alt="Oli" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700; color: #09090b; margin: 0;">Rechtliche Einlassprüfung nach §11 JuSchG</h3>
              <p style="font-size: 12px; color: #71717a; margin-top: 2px;">Direkte Gesetzesprüfung für Counter, Einlass und Saaleinlasser.</p>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div>
              <label style="font-size: 12px; font-weight: 600; color: #18181b; display: block; margin-bottom: 6px;">🎂 Geburtsdatum des Gastes</label>
              <input type="date" id="fsk-birth-calc" onchange="window.appDashboard.checkFskLive()" style="width: 100%; padding: 10px 12px; border: 1.5px solid var(--border-subtle); border-radius: 8px; font-size: 15px; font-weight: 600;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div>
                <label style="font-size: 12px; font-weight: 600; color: #18181b; display: block; margin-bottom: 6px;">🎬 FSK-Freigabe des Films</label>
                <select id="fsk-rating-calc" onchange="window.appDashboard.checkFskLive()" style="width: 100%; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 14px;">
                  <option value="0">FSK 0 (Ohne Altersbeschränkung)</option>
                  <option value="6">FSK 6</option>
                  <option value="12" selected>FSK 12</option>
                  <option value="16">FSK 16</option>
                  <option value="18">FSK 18 (Keine Jugendfreigabe)</option>
                </select>
              </div>

              <div>
                <label style="font-size: 12px; font-weight: 600; color: #18181b; display: block; margin-bottom: 6px;">👨‍👩‍👧 Begleitung durch Eltern?</label>
                <label style="display: flex; align-items: center; gap: 8px; padding: 10px 12px; border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 13px; cursor: pointer; background: #fafafa;">
                  <input type="checkbox" id="fsk-parent-calc" onchange="window.appDashboard.checkFskLive()">
                  <span>Erziehungsberechtigte dabei</span>
                </label>
              </div>
            </div>

            <!-- Live Verdict Display -->
            <div id="fsk-live-verdict" class="fsk-verdict-box">
              <span style="color: #71717a;">⏳ Bitte Geburtsdatum auswählen für verbindliches Ergebnis</span>
            </div>

            <div style="background: #fbfbfb; border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; font-size: 11.5px; line-height: 1.5; color: #71717a; margin-top: 8px;">
              <strong>Wichtiger rechtlicher Hinweis:</strong><br>
              • Bei <strong>FSK 12</strong> dürfen Kinder ab 6 Jahren in Begleitung von personensorgeberechtigten Personen (Eltern) eingelassen werden (PG-Regelung § 11 Abs. 2 JuSchG).<br>
              • Bei <strong>FSK 16 und FSK 18</strong> gibt es keine Ausnahmen – auch nicht mit Einverständniserklärung („Muttizettel“) oder in Begleitung der Eltern!
            </div>
          </div>
        </div>
      `;
    }

    // 2g. MHD ERFASSUNG & TRANSFER
    else if (state.activeView === 'mhd') {
      if (crumbGroup) crumbGroup.textContent = 'Kino-Service & Aufgaben';
      if (crumbCurrent) crumbCurrent.textContent = 'MHD-Erfassung & Transfer';
      if (heading) heading.textContent = 'MHD-Erfassung & Waren-Transfer';

      let mhdRows = '';
      state.mhdItems.forEach(item => {
        const today = new Date();
        const mhdDate = new Date(item.date);
        const diffDays = Math.ceil((mhdDate - today) / (1000 * 60 * 60 * 24));
        const badgeClass = diffDays <= 7 ? 'urgent' : (diffDays <= 30 ? 'badge-ze' : 'success');

        mhdRows += `
          <tr>
            <td style="font-weight: 600;">${item.item}</td>
            <td>${item.date}</td>
            <td><span class="kpi-pill ${badgeClass}">${diffDays > 0 ? diffDays + ' Tage übrig' : 'ABGELAUFEN'}</span></td>
            <td>${item.location}</td>
            <td style="color: #71717a;">${item.loggedBy}</td>
          </tr>
        `;
      });

      content.innerHTML = `
        <div class="service-header-banner">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #09090b; margin: 0;">Mindesthaltbarkeitsdaten (MHD) & Kühlung</h3>
            <p style="font-size: 12.5px; color: #71717a; margin-top: 3px;">
              Überwachung von Concession-Artikeln, Sirupen, Saucen und Tiefkühlware.
            </p>
          </div>
          <span class="kpi-pill">${state.mhdItems.length} Artikel erfasst</span>
        </div>

        <!-- Add Form -->
        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
          <h4 style="font-size: 14px; font-weight: 700; color: #09090b; margin-bottom: 12px;">📅 Neues Mindesthaltbarkeitsdatum erfassen</h4>
          <form onsubmit="window.appDashboard.addMhdItem(event); return false;" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)) 120px; gap: 10px; align-items: flex-end;">
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Artikelbezeichnung</label>
              <input type="text" id="mhd-input-item" placeholder="z.B. Nacho Käsesauce" required style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
            </div>
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Mindesthaltbarkeitsdatum</label>
              <input type="date" id="mhd-input-date" required style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
            </div>
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Lagerort</label>
              <select id="mhd-input-loc" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
                <option value="Kühlhaus 1">Kühlhaus 1</option>
                <option value="Kühlhaus 2">Kühlhaus 2</option>
                <option value="Gondel Theke">Gondel Theke</option>
                <option value="Popcornküche">Popcornküche</option>
                <option value="Tiefkühlung">Tiefkühlung (-18°C)</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11.5px; color: #71717a; display: block; margin-bottom: 4px;">Erfasst von</label>
              <input type="text" id="mhd-input-by" placeholder="Name" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-subtle); font-size: 13px;">
            </div>
            <button type="submit" class="btn-primary-small" style="height: 35px;">Speichern</button>
          </form>
        </div>

        <div style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden;">
          <table class="lostfound-table">
            <thead>
              <tr>
                <th>Artikel</th>
                <th>MHD Datum</th>
                <th>Status / Restlaufzeit</th>
                <th>Lagerort</th>
                <th>Erfasst von</th>
              </tr>
            </thead>
            <tbody>
              ${mhdRows}
            </tbody>
          </table>
        </div>
      `;
    }

    // 3. CALENDAR & TIMELINE VIEW (Multi-Function Rail 2)
    else if (state.activeView === 'calendar') {
      if (crumbGroup) crumbGroup.textContent = 'Kalender & Spielzeiten';
      if (crumbCurrent) crumbCurrent.textContent = 'Tages-Timeline';
      if (heading) heading.textContent = `Spielplan & Vorstellungs-Timeline • ${formatDateStr(state.displayDate)}`;

      // Flatten and collect all sessions
      let allSessions = [];
      (state.hallsData || []).forEach(h => {
        (h.sessions || []).forEach(s => {
          allSessions.push({ ...s, hallName: h.name });
        });
      });

      // Filter by format
      if (state.calendarFilter === 'atmos') {
        allSessions = allSessions.filter(s => /atmos|dolby|cinema/i.test(s.title + ' ' + s.hallName));
      } else if (state.calendarFilter === 'dbox') {
        allSessions = allSessions.filter(s => /d-box|motion|komfort|vip|loge/i.test(s.title + ' ' + s.hallName));
      } else if (state.calendarFilter === '3d') {
        allSessions = allSessions.filter(s => /3d|hfr/i.test(s.title + ' ' + s.hallName));
      } else if (state.calendarFilter === 'ov') {
        allSessions = allSessions.filter(s => /ov|omu|original/i.test(s.title + ' ' + s.hallName));
      }

      // Group into realistic time slots
      const slots = [
        { name: '🌅 Nachmittag (13:00 – 16:30 Uhr)', min: 13 * 60, max: 16 * 60 + 30, sessions: [] },
        { name: '🌆 Vorabend (16:30 – 19:30 Uhr)', min: 16 * 60 + 30, max: 19 * 60 + 30, sessions: [] },
        { name: '🌃 Hauptabend / Primetime (19:30 – 21:45 Uhr)', min: 19 * 60 + 30, max: 21 * 60 + 45, sessions: [] },
        { name: '🌙 Spätschiene (ab 21:45 Uhr)', min: 21 * 60 + 45, max: 28 * 60, sessions: [] }
      ];

      allSessions.forEach(s => {
        if (!s.time) return;
        const [h, m] = s.time.split(':').map(Number);
        const mins = (h || 0) * 60 + (m || 0);
        const slot = slots.find(sl => mins >= sl.min && mins < sl.max) || slots[slots.length - 1];
        slot.sessions.push(s);
      });

      let slotsHtml = '';
      slots.forEach(slot => {
        if (slot.sessions.length === 0) return;
        slot.sessions.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

        let cardsHtml = '';
        slot.sessions.forEach(s => {
          const cap = s.capacity || 200;
          const sold = typeof s.sold === 'number' ? s.sold : Math.round(cap * 0.5);
          const pct = Math.min(100, Math.round((sold / cap) * 100));
          const fillClass = pct > 80 ? 'occupancy-fill-high' : (pct > 50 ? 'occupancy-fill-mid' : 'occupancy-fill-low');

          cardsHtml += `
            <div class="calendar-card" onclick="window.appDashboard.switchHall('${s.hallName}')">
              <img src="${s.poster || '/assets/3d/hero-cube.png'}" class="calendar-card-poster" alt="Poster">
              <div class="calendar-card-body">
                <div>
                  <div class="calendar-card-title">${s.title}</div>
                  <div class="calendar-card-meta">${s.hallName} • ${s.duration ? s.duration + 'm • ' : ''}${s.fsk || 'FSK'}</div>
                </div>
                <div class="calendar-card-footer">
                  <span class="date-pill" style="font-weight: 700;">🕒 ${s.time}</span>
                  <span style="font-size: 11px; font-weight: 600; color: #52525b;">${sold}/${cap} (${pct}%)</span>
                </div>
                <div class="occupancy-bar-wrapper">
                  <div class="occupancy-bar-bg">
                    <div class="occupancy-bar-fill ${fillClass}" style="width: ${pct}%;"></div>
                  </div>
                </div>
              </div>
            </div>
          `;
        });

        slotsHtml += `
          <div class="calendar-slot-group">
            <div class="calendar-slot-title">${slot.name} (${slot.sessions.length} Vorstellungen)</div>
            <div class="calendar-grid">${cardsHtml}</div>
          </div>
        `;
      });

      content.innerHTML = `
        <div style="background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 13.5px; font-weight: 700; color: #09090b;">Datum:</span>
            <input type="date" value="${formatDateStr(state.displayDate)}" onchange="window.appDashboard.pickDate(this.value)" style="border: 1px solid #d4d4d8; padding: 5px 10px; border-radius: 6px; font-size: 13px; outline: none; background: #fafafa;">
          </div>
          <div class="filter-pill-row" style="margin-bottom: 0;">
            <button class="filter-pill-btn ${state.calendarFilter === 'all' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('all')">Alle Formate</button>
            <button class="filter-pill-btn ${state.calendarFilter === 'atmos' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('atmos')">Dolby Atmos / Cinema</button>
            <button class="filter-pill-btn ${state.calendarFilter === 'dbox' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('dbox')">D-Box & Komfort</button>
            <button class="filter-pill-btn ${state.calendarFilter === '3d' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('3d')">3D Vorstellungen</button>
            <button class="filter-pill-btn ${state.calendarFilter === 'ov' ? 'active' : ''}" onclick="window.appDashboard.filterCalendarFormat('ov')">OV / Original</button>
          </div>
        </div>

        ${slotsHtml || '<div style="padding: 40px; text-align: center; color: #71717a;">Keine Vorstellungen für den gewählten Filter gefunden.</div>'}
      `;
    }

    // 4. ALERTS & HANDOVER LOG (Multi-Function Rail 3)
    else if (state.activeView === 'alerts') {
      if (crumbGroup) crumbGroup.textContent = 'Funkruf & Alarmierung';
      if (crumbCurrent) crumbCurrent.textContent = 'Live-Meldungen & Übergabebuch';
      if (heading) heading.textContent = 'Funkruf, Alarmierungen & Schicht-Übergabebuch';

      let notesHtml = '';
      state.handoverNotes.forEach((n, idx) => {
        const priorityColor = n.priority === 'dringend' ? '#ef4444' : (n.priority === 'wichtig' ? '#f59e0b' : '#3b82f6');
        notesHtml += `
          <div class="task-row ${n.done ? 'is-done' : ''}" style="border: 1px solid #f4f4f5; border-radius: 8px; margin-bottom: 6px;">
            <div class="custom-checkbox ${n.done ? 'checked' : ''}" onclick="window.appDashboard.toggleHandoverDone(${n.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="task-label-wrapper">
              <span class="task-label" style="display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${priorityColor};"></span>
                ${n.title}
              </span>
              <span class="task-sub">${n.text} • <strong>${n.author}</strong></span>
            </div>
            <span class="date-pill">🕒 ${n.time}</span>
            <span class="status-pill ${n.done ? 'done' : 'in-progress'}">${n.done ? 'Erledigt' : 'Offen'}</span>
          </div>
        `;
      });

      content.innerHTML = `
        <div class="task-group">
          <h3 class="task-group-title">Digitaler Sofort-Funkruf (One-Click Alarmierung)</h3>
          <div class="funk-action-grid">
            <div class="funk-action-card" onclick="window.appDashboard.sendFunkruf('Betriebsleitung', 'Dringender Support am Einlass / Kasse benötigt')">
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
                <span class="funk-name">Saalreinigung anfordern</span>
                <span class="funk-desc">Zwischenreinigung anfordern</span>
              </div>
            </div>

            <div class="funk-action-card" onclick="window.appDashboard.sendFunkruf('Technik / Vorführer', 'Vorführ- oder Tonstörung gemeldet')">
              <div class="funk-icon">⚠️</div>
              <div class="funk-info">
                <span class="funk-name">Vorführdienst / Ton</span>
                <span class="funk-desc">Störung an Vorführdienst melden</span>
              </div>
            </div>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Live-Systemmeldungen & Sensor-Alerts</h3>
          <div class="hardware-status-grid">
            <div class="hardware-status-card" style="border-left: 3px solid #22c55e;">
              <div class="hardware-status-header">
                <span class="hardware-status-name">TMS KDM Lizenzen</span>
                <span class="live-indicator"><span class="live-indicator-dot"></span> 100% OK</span>
              </div>
              <div class="hardware-metric-row"><span>Status:</span><span>Alle CPL Schlüssel aktiv</span></div>
            </div>
            <div class="hardware-status-card" style="border-left: 3px solid #f59e0b;">
              <div class="hardware-status-header">
                <span class="hardware-status-name">Laser-Wartung</span>
                <span class="live-indicator" style="background: #fef3c7; color: #b45309;"><span class="live-indicator-dot" style="background: #f59e0b;"></span> Hinweis</span>
              </div>
              <div class="hardware-metric-row"><span>Saal 1:</span><span>Kühlmittelwechsel in 48h</span></div>
            </div>
            <div class="hardware-status-card" style="border-left: 3px solid #3b82f6;">
              <div class="hardware-status-header">
                <span class="hardware-status-name">D1 DB Cloudflare</span>
                <span class="live-indicator"><span class="live-indicator-dot"></span> Synced</span>
              </div>
              <div class="hardware-metric-row"><span>Archivierung:</span><span>Auslastungs-Tracking live</span></div>
            </div>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Digitales Schicht-Übergabebuch (Handover Log)</h3>
          <div class="handover-box">
            <h4 style="font-size: 14px; font-weight: 700; color: #09090b; margin-bottom: 12px;">Neuen Eintrag für Nachfolgeschicht verfassen</h4>
            <div class="handover-input-row">
              <input type="text" id="handover-title" class="handover-input" placeholder="Titel / Betreff (z.B. Kasse 2 Drucker)">
              <input type="text" id="handover-author" class="handover-input" placeholder="Dein Name (z.B. Alex)">
              <select id="handover-priority" class="handover-input">
                <option value="normal">Normal</option>
                <option value="wichtig">Wichtig</option>
                <option value="dringend">Dringend</option>
              </select>
            </div>
            <textarea id="handover-text" class="handover-textarea" placeholder="Detaillierte Übergabe-Notiz an das Team hinterlassen..."></textarea>
            <button class="btn-primary-small" onclick="window.appDashboard.submitHandoverNote()">Eintrag im Übergabebuch speichern</button>
          </div>

          <div class="task-list" id="handover-list">${notesHtml}</div>
        </div>
      `;
    }

    // 5. TECH & AUTOMATION (Multi-Function Rail 4)
    else if (state.activeView === 'tech') {
      if (crumbGroup) crumbGroup.textContent = 'Technik & Quick Actions';
      if (crumbCurrent) crumbCurrent.textContent = 'Vorführraum & Laser';
      if (heading) heading.textContent = 'Vorführraum – Hardware-Status & Quick Automation';

      const techChecks = [
        { id: 'tch1', label: 'DCP / KDM Schlüssel Gültigkeit für heutige Abendvorstellungen' },
        { id: 'tch2', label: 'Barco / Christie Laser-Kühlmittelkreislauf & Temperaturprüfung (21.2°C)' },
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
          <h3 class="task-group-title">Schnell-Aktionen & Saallicht-Cues (One-Click)</h3>
          <div class="quick-action-grid">
            <button class="quick-action-btn" onclick="window.appDashboard.sendQuickAction('Einlasslicht AN (50%)', 'Einlassbeleuchtung in allen Sälen aktiviert')">
              <span class="quick-action-icon">💡</span>
              <span class="quick-action-title">Einlasslicht AN (50%)</span>
              <span class="quick-action-desc">Saallicht für Besucherzustrom</span>
            </button>

            <button class="quick-action-btn" onclick="window.appDashboard.sendQuickAction('Showbeleuchtung (0%)', 'Showlicht CPL aktiv (Projektion gestartet)')">
              <span class="quick-action-icon">🎬</span>
              <span class="quick-action-title">Showlicht (0%)</span>
              <span class="quick-action-desc">Vollverdunkelung für Filmstart</span>
            </button>

            <button class="quick-action-btn" onclick="window.appDashboard.sendQuickAction('Pausenbeleuchtung (30%)', 'Pausenlicht gesetzt für Eisverkauf')">
              <span class="quick-action-icon">🍿</span>
              <span class="quick-action-title">Pausenlicht (30%)</span>
              <span class="quick-action-desc">Halblicht für Zwischenpause</span>
            </button>

            <button class="quick-action-btn" onclick="window.appDashboard.sendQuickAction('Notfallbeleuchtung (100%)', '🚨 Notbeleuchtung VOLL aktiviert!')" style="border-color: #fca5a5;">
              <span class="quick-action-icon">🚨</span>
              <span class="quick-action-title" style="color: #ef4444;">Notbeleuchtung VOLL</span>
              <span class="quick-action-desc">Sofortiges Paniklicht 100%</span>
            </button>

            <button class="quick-action-btn" onclick="window.appDashboard.sendQuickAction('Projektoren Standby', 'Alle Projektoren in Nachtmodus / Standby')">
              <span class="quick-action-icon">💤</span>
              <span class="quick-action-title">Projektoren Standby</span>
              <span class="quick-action-desc">Lampenabkühlung & Standby</span>
            </button>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Hardware- & Sensor-Telemetrie</h3>
          <div class="hardware-status-grid">
            <div class="hardware-status-card">
              <div class="hardware-status-header">
                <span class="hardware-status-name">Barco / Christie Laser</span>
                <span class="live-indicator"><span class="live-indicator-dot"></span> Laser Aktiv</span>
              </div>
              <div class="hardware-metric-row"><span>Temperatur:</span><span>21.2 °C (Optimal)</span></div>
              <div class="hardware-metric-row"><span>Laserleistung:</span><span>82% (4K HDR)</span></div>
              <div class="hardware-metric-row"><span>Betriebsstunden:</span><span>4.280 h</span></div>
            </div>

            <div class="hardware-status-card">
              <div class="hardware-status-header">
                <span class="hardware-status-name">Dolby CP950 Sound</span>
                <span class="live-indicator"><span class="live-indicator-dot"></span> Ref 7.0</span>
              </div>
              <div class="hardware-metric-row"><span>Audioformat:</span><span>7.1 / Dolby Atmos</span></div>
              <div class="hardware-metric-row"><span>Clipping:</span><span>0.0 dB</span></div>
              <div class="hardware-metric-row"><span>Fader-Pegel:</span><span>7.0 (THX Standard)</span></div>
            </div>

            <div class="hardware-status-card">
              <div class="hardware-status-header">
                <span class="hardware-status-name">TMS / KDM Server</span>
                <span class="live-indicator"><span class="live-indicator-dot"></span> Bereit</span>
              </div>
              <div class="hardware-metric-row"><span>CPL Ingest:</span><span>100% abgeschlossen</span></div>
              <div class="hardware-metric-row"><span>Lizenz-Gültigkeit:</span><span>Bis 02:00 Uhr</span></div>
              <div class="hardware-metric-row"><span>Speicher:</span><span>3.4 TB frei</span></div>
            </div>

            <div class="hardware-status-card">
              <div class="hardware-status-header">
                <span class="hardware-status-name">USV & Sicherheit</span>
                <span class="live-indicator"><span class="live-indicator-dot"></span> 100% Puffer</span>
              </div>
              <div class="hardware-metric-row"><span>Notstromakku:</span><span>100% geladen</span></div>
              <div class="hardware-metric-row"><span>Notausgangstüren:</span><span>Verriegelt / OK</span></div>
              <div class="hardware-metric-row"><span>Rauchmelder:</span><span>Keine Störung</span></div>
            </div>
          </div>
        </div>

        <div class="task-group">
          <h3 class="task-group-title">Vorführraum & Automation Checks</h3>
          <div class="task-list">${techRows}</div>
        </div>
      `;
    }

    // 6. STATS & ANALYTICS (Multi-Function Rail 5)
    else if (state.activeView === 'stats') {
      if (crumbGroup) crumbGroup.textContent = 'Statistiken & Berichte';
      if (crumbCurrent) crumbCurrent.textContent = 'Live-Auslastung';
      if (heading) heading.textContent = `${this.getLocationName(state.currentCity)} – Auslastungs-Analytics`;

      let totalTickets = 0;
      let totalCapacity = 0;
      let totalSessions = 0;

      const hallStats = (state.hallsData || []).map(h => {
        let hSold = 0;
        let hCap = 0;
        (h.sessions || []).forEach(s => {
          totalSessions++;
          const c = s.capacity || 200;
          const sol = typeof s.sold === 'number' ? s.sold : Math.round(c * 0.45);
          hSold += sol;
          hCap += c;
          totalTickets += sol;
          totalCapacity += c;
        });
        const pct = hCap > 0 ? Math.min(100, Math.round((hSold / hCap) * 100)) : 0;
        return { name: h.name, sold: hSold, cap: hCap, pct, sessionsCount: (h.sessions || []).length };
      });

      if (totalTickets === 0) totalTickets = 640;
      if (totalCapacity === 0) totalCapacity = 1400;
      const totalPct = totalCapacity > 0 ? Math.round((totalTickets / totalCapacity) * 100) : 48;
      const estimatedRevenue = (totalTickets * 12.80).toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });

      let hallBarsHtml = '';
      hallStats.forEach(hs => {
        const fillClass = hs.pct > 80 ? 'occupancy-fill-high' : (hs.pct > 50 ? 'occupancy-fill-mid' : 'occupancy-fill-low');
        hallBarsHtml += `
          <div style="background: #ffffff; border: 1px solid #e4e4e7; border-radius: 10px; padding: 14px 18px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <span style="font-size: 13.5px; font-weight: 700; color: #09090b;">${hs.name}</span>
              <span style="font-size: 12.5px; font-weight: 600; color: #52525b;">${hs.sold} / ${hs.cap} Sitze (${hs.pct}%)</span>
            </div>
            <div class="occupancy-bar-bg" style="height: 10px;">
              <div class="occupancy-bar-fill ${fillClass}" style="width: ${hs.pct}%;"></div>
            </div>
          </div>
        `;
      });

      content.innerHTML = `
        <div class="prognosis-card">
          <h4 style="font-size: 15px; font-weight: 700; color: #09090b;">Live Tages-Kennzahlen (KPI)</h4>
          <p style="font-size: 12.5px; color: #71717a; margin-top: 2px;">Echtzeit-Auswertung aller Vorstellungen für ${this.getLocationName(state.currentCity)}.</p>

          <div class="prognosis-grid">
            <div class="prognosis-item">
              <div class="prognosis-num">${totalTickets}</div>
              <div class="prognosis-label">Besucher Heute</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${totalPct}%</div>
              <div class="prognosis-label">Ø Auslastung</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${totalSessions}</div>
              <div class="prognosis-label">Vorstellungen</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${estimatedRevenue}</div>
              <div class="prognosis-label">Box Office Est.</div>
            </div>
          </div>
        </div>

        <div class="task-group">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 class="task-group-title" style="margin-bottom: 0;">Sitzplatz-Auslastung nach Kinosälen</h3>
            <button class="btn-primary-small" onclick="window.print()">📄 Schichtbericht drucken</button>
          </div>
          <div>${hallBarsHtml}</div>
        </div>
      `;
    }

    // 7. CONCESSION VIEW
    else if (state.activeView === 'concession') {
      if (crumbGroup) crumbGroup.textContent = 'Personal & Stationen';
      if (crumbCurrent) crumbCurrent.textContent = 'Concession & Bar';
      if (heading) heading.textContent = 'Concession – Popcorn-Bedarf & MHD';

      let totalTickets = 0;
      (state.hallsData || []).forEach(h => {
        (h.sessions || []).forEach(s => {
          if (typeof s.sold === 'number') totalTickets += s.sold;
          else if (s.capacity) totalTickets += Math.round(s.capacity * 0.45);
        });
      });
      if (totalTickets === 0) totalTickets = 480;

      const popData = calculatePopcornDemand(totalTickets);

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
              <div class="prognosis-num">${popData.visitors}</div>
              <div class="prognosis-label">Besucher Prognose</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${popData.expectedPortions}</div>
              <div class="prognosis-label">Erwartete Portionen</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${popData.recommendedBatches}</div>
              <div class="prognosis-label">Empfohlene Kessel</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${popData.kornKg} kg</div>
              <div class="prognosis-label">Maiskorn</div>
            </div>
            <div class="prognosis-item">
              <div class="prognosis-num">${popData.zuckerKg} kg</div>
              <div class="prognosis-label">Zucker / Fett (${popData.fettKg}kg)</div>
            </div>
          </div>
        </div>
      `;
    }

    // 8. SETTINGS VIEW
    else if (state.activeView === 'settings') {
      if (crumbGroup) crumbGroup.textContent = 'System & Setup';
      if (crumbCurrent) crumbCurrent.textContent = 'Einstellungen';
      if (heading) heading.textContent = 'Systemeinstellungen & Standorte';

      let locOptions = KINOPOLIS_LOCATIONS.map(l => `
        <option value="${l.slug}" ${l.slug === state.currentCity ? 'selected' : ''}>${l.name} (${l.hallCount} Säle)</option>
      `).join('');

      content.innerHTML = `
        <div class="prognosis-card">
          <h4 style="font-size: 15px; font-weight: 700; color: #09090b; margin-bottom: 12px;">Kinostandort wählen (Alle 18 Kinopolis Standorte)</h4>
          <p style="font-size: 13px; color: #71717a; margin-bottom: 14px;">Wähle dein Kino für alle Live-Daten, CPL Cues und Checklisten:</p>
          <select class="handover-input" style="max-width: 380px; font-weight: 600;" onchange="window.appDashboard.handleLocationSelect(this.value)">
            ${locOptions}
          </select>
        </div>

        <div class="prognosis-card">
          <h4 style="font-size: 15px; font-weight: 700; color: #09090b; margin-bottom: 8px;">Cache & Offline-Speicher</h4>
          <p style="font-size: 13px; color: #71717a; margin-bottom: 14px;">Löscht lokale Checklisten und lädt alle Vorstellungen frisch aus der API.</p>
          <button class="btn-primary-small" onclick="window.appDashboard.clearCacheAndReload()">Offline-Cache leeren & neu synchronisieren</button>
        </div>
      `;
    }

    // 9. EINLASS VIEW
    else if (state.activeView === 'einlass') {
      if (crumbGroup) crumbGroup.textContent = 'Personal & Stationen';
      if (crumbCurrent) crumbCurrent.textContent = 'Einlass & Foyer';
      if (heading) heading.textContent = 'Einlass – Einlassfenster & Ticketkontrolle';

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
                <img src="${s.poster || '/assets/Oli/oli_logo_tight.png'}" class="task-avatar" alt="Poster">
              </div>
            `;
          }
        });
      });

      content.innerHTML = `
        <div class="task-group">
          <h3 class="task-group-title">Aktuelle Einlass-Vorstellungen (Nächste 90 Minuten)</h3>
          <div class="task-list">${upcomingRows || '<div style="padding: 24px; text-align: center; color: #71717a;">Aktuell keine Vorstellungen im Einlassfenster.</div>'}</div>
        </div>
      `;
    }

    // 10. REPORT / TAGESABSCHLUSS
    else if (state.activeView === 'report') {
      if (crumbGroup) crumbGroup.textContent = 'Berichte & Logs';
      if (crumbCurrent) crumbCurrent.textContent = 'Tagesabschluss';
      if (heading) heading.textContent = 'Tagesabschluss & Schichtbericht';

      content.innerHTML = `
        <div class="prognosis-card">
          <h4 style="font-size: 15px; font-weight: 700; color: #09090b;">Schicht-Zusammenfassung • ${this.getLocationName(state.currentCity)}</h4>
          <p style="font-size: 12.5px; color: #71717a; margin-top: 2px;">Automatisierter Statusbericht für die Theaterleitung.</p>
        </div>
      `;
    }
  },

  // Toggle Handover Note Done Status
  toggleHandoverDone(id) {
    const note = state.handoverNotes.find(n => n.id === id);
    if (note) {
      note.done = !note.done;
      localStorage.setItem(HANDOVER_STORAGE_KEY, JSON.stringify(state.handoverNotes));
      this.renderWorkspace();
    }
  },

  // Submit new handover note
  submitHandoverNote() {
    const titleEl = document.getElementById('handover-title');
    const textEl = document.getElementById('handover-text');
    const authorEl = document.getElementById('handover-author');
    const priorityEl = document.getElementById('handover-priority');

    const title = titleEl ? titleEl.value.trim() : '';
    const text = textEl ? textEl.value.trim() : '';
    const author = (authorEl && authorEl.value.trim()) || 'Theaterleitung';
    const priority = priorityEl ? priorityEl.value : 'normal';

    if (!title || !text) {
      alert('Bitte Titel und Notiz ausfüllen');
      return;
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} Uhr`;

    state.handoverNotes.unshift({
      id: Date.now(),
      title,
      text,
      author,
      priority,
      time: timeStr,
      done: false
    });

    localStorage.setItem(HANDOVER_STORAGE_KEY, JSON.stringify(state.handoverNotes));
    this.showToast('Neuer Eintrag im Übergabebuch gespeichert', '📖');
    this.renderWorkspace();
  },

  // Quick Action execution
  sendQuickAction(actionName, feedbackMsg) {
    this.showToast(feedbackMsg, '⚡');
  },

  // Clear cache and reload
  clearCacheAndReload() {
    localStorage.removeItem(TASK_STORAGE_KEY);
    this.showToast('Cache geleert, lade Daten neu...', '🔄');
    setTimeout(() => {
      window.location.reload();
    }, 600);
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

    this.showToast(`Funkruf gesendet: ${title}`, '📢');

    // Add note to handover
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} Uhr`;

    state.handoverNotes.unshift({
      id: Date.now(),
      title: `Funkruf: ${title}`,
      text: msg,
      author: 'Automatischer Funkruf',
      priority: 'dringend',
      time: timeStr,
      done: true
    });
    localStorage.setItem(HANDOVER_STORAGE_KEY, JSON.stringify(state.handoverNotes));

    this.renderWorkspace();
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
    if (state.activeView === 'hall' || state.activeView === 'calendar' || state.activeView === 'poster' || state.activeView === 'auslaesse') {
      this.renderSidebar();
      this.renderWorkspace();
    }
  },

  // Poster Management Actions
  markPosterDone(alertId) {
    state.completedPosters.add(alertId);
    try {
      localStorage.setItem('completed_posters', JSON.stringify([...state.completedPosters]));
    } catch(e) {}
    this.showToast('Plakatwechsel als erledigt markiert!', '✅');
    this.renderSidebar();
    this.renderWorkspace();
  },

  unmarkPosterDone(alertId) {
    state.completedPosters.delete(alertId);
    try {
      localStorage.setItem('completed_posters', JSON.stringify([...state.completedPosters]));
    } catch(e) {}
    this.showToast('Plakatwechsel zurückgesetzt', '↩️');
    this.renderSidebar();
    this.renderWorkspace();
  },

  setPosterFilter(filter) {
    state.posterFilter = filter;
    this.renderWorkspace();
  },

  // Auslass / Cleaning Actions
  markAuslassDone(auslassId) {
    state.completedAuslaesse.add(auslassId);
    try {
      localStorage.setItem('completed_auslaesse', JSON.stringify([...state.completedAuslaesse]));
    } catch(e) {}
    this.showToast('Saalreinigung erfolgreich bestätigt!', '🧹');
    this.renderWorkspace();
  },

  unmarkAuslassDone(auslassId) {
    state.completedAuslaesse.delete(auslassId);
    try {
      localStorage.setItem('completed_auslaesse', JSON.stringify([...state.completedAuslaesse]));
    } catch(e) {}
    this.showToast('Saalreinigung zurückgesetzt', '↩️');
    this.renderWorkspace();
  },

  // Lost & Found Actions
  addLostFoundItem(event) {
    if (event) event.preventDefault();
    const hall = document.getElementById('lf-input-hall')?.value || 'Kino 1';
    const category = document.getElementById('lf-input-cat')?.value || 'Sonstiges';
    const desc = document.getElementById('lf-input-desc')?.value?.trim();
    const finder = document.getElementById('lf-input-finder')?.value?.trim() || 'Mitarbeiter';
    if (!desc) {
      this.showToast('Bitte eine Beschreibung des Fundstücks angeben', '⚠️');
      return;
    }
    const newItem = {
      id: 'lf-' + Date.now(),
      hall,
      category,
      desc,
      finder,
      date: 'Heute, ' + new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr',
      status: 'im_tresor'
    };
    state.lostAndFoundItems.unshift(newItem);
    try {
      localStorage.setItem('kinopolis_lostfound', JSON.stringify(state.lostAndFoundItems));
    } catch(e) {}
    this.showToast('Fundgegenstand erfasst & im Safe hinterlegt', '🎒');
    this.renderSidebar();
    this.renderWorkspace();
  },

  toggleLostFoundStatus(id) {
    const item = state.lostAndFoundItems.find(i => i.id === id);
    if (item) {
      item.status = item.status === 'im_tresor' ? 'ausgegeben' : 'im_tresor';
      try {
        localStorage.setItem('kinopolis_lostfound', JSON.stringify(state.lostAndFoundItems));
      } catch(e) {}
      this.showToast(`Status: ${item.status === 'ausgegeben' ? 'An Gast übergeben' : 'Im Tresor'}`, '📦');
      this.renderSidebar();
      this.renderWorkspace();
    }
  },

  // MHD Erfassung
  addMhdItem(event) {
    if (event) event.preventDefault();
    const item = document.getElementById('mhd-input-item')?.value?.trim();
    const date = document.getElementById('mhd-input-date')?.value;
    const location = document.getElementById('mhd-input-loc')?.value || 'Kühlhaus';
    const loggedBy = document.getElementById('mhd-input-by')?.value?.trim() || 'Schichtleiter';
    if (!item || !date) {
      this.showToast('Bitte Artikel und Mindesthaltbarkeitsdatum angeben', '⚠️');
      return;
    }
    const newMhd = {
      id: 'mhd-' + Date.now(),
      item,
      date,
      location,
      loggedBy
    };
    state.mhdItems.unshift(newMhd);
    try {
      localStorage.setItem('kinopolis_mhd', JSON.stringify(state.mhdItems));
    } catch(e) {}
    this.showToast('MHD erfolgreich erfasst!', '📅');
    this.renderWorkspace();
  },

  // FSK Interactive Live Evaluation
  checkFskLive() {
    const birthVal = document.getElementById('fsk-birth-calc')?.value;
    const fskVal = document.getElementById('fsk-rating-calc')?.value || '12';
    const parentVal = document.getElementById('fsk-parent-calc')?.checked || false;
    const resultBox = document.getElementById('fsk-live-verdict');
    if (!resultBox) return;

    if (!birthVal) {
      resultBox.className = 'fsk-verdict-box';
      resultBox.innerHTML = '<span style="color: #71717a;">⏳ Bitte Geburtsdatum auswählen für verbindliches Ergebnis</span>';
      return;
    }

    const evaluation = checkFskCompliance(birthVal, fskVal, parentVal);
    if (evaluation.allowed) {
      resultBox.className = 'fsk-verdict-box allowed';
      resultBox.innerHTML = `
        <div style="font-size: 22px; margin-bottom: 4px;">✅ EINLASS ERLAUBT</div>
        <div style="font-size: 13.5px; font-weight: 500;">${evaluation.reason}</div>
      `;
    } else {
      resultBox.className = 'fsk-verdict-box denied';
      resultBox.innerHTML = `
        <div style="font-size: 22px; margin-bottom: 4px;">🚫 EINLASS VERWEHRT</div>
        <div style="font-size: 13.5px; font-weight: 500;">${evaluation.reason}</div>
      `;
    }
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  localStorage.setItem('kp_guest_mode', 'true');
  window.appRouter.init();
  window.appDashboard.init();
});
