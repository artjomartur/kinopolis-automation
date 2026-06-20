const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const oldInfoSection = `<div class="info-section" id="info-section-container" style="display: none;">
<div class="dashboard-header" style="margin-bottom: 0.75rem; justify-content: flex-start;">
<div class="dashboard-header-left">
<h2 class="dashboard-title" style="font-size: 2.5rem;">Filme &amp; Infos</h2>
<div class="location-badge">Aktuell &amp; Demnächst im Kino</div>
</div>
</div>
<div class="loading-state" id="upcoming-loading">
<div class="spinner"></div>
<div class="loading-text">Lade Filmhighlights...</div>
</div>
<div class="dashboard-grid" id="upcoming-grid" style="display: none; gap: 1.5rem;">
<!-- Filled via JS -->
</div>
</div>`;

// Find TMDB Section and replace it with old info-section
html = html.replace(/<!-- TMDB SECTION -->[\s\S]*?(?=<!-- Internal Message Modal -->)/, oldInfoSection + '\n');

// Find and remove TMDB logic
html = html.replace(/\/\/ --- TMDB LOGIC ---[\s\S]*?(?=\/\/ Ensure init happens)/, '');
html = html.replace(/\/\/ Ensure init happens\s*document\.addEventListener\('DOMContentLoaded', \(\) => \{\s*initTmdb\(\);\s*\}\);/, '');

fs.writeFileSync(path, html);
