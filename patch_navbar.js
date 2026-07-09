const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, 'src', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const $ = cheerio.load(html);

// 1. Add CSS
const navbarCSS = `
/* Bottom Tab Bar (Opal Glass Style) */
body {
  padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px));
}
.tab-bar {
  position: fixed;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  left: 32px;
  right: 32px;
  height: 68px;
  background: rgba(40, 40, 44, 0.7);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 24px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 34px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
  padding: 0 12px;
}
.tab-btn {
  background: transparent;
  border: none;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.tab-btn svg {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  stroke-width: 2px;
  width: 24px;
  height: 24px;
}
.tab-btn--active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}
.tab-btn--active svg {
  stroke-width: 2.5px;
  transform: translateY(-2px);
  filter: drop-shadow(0 4px 8px rgba(255,255,255,0.2));
}
.tab-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2px;
  transition: all 0.3s ease;
}
.tab-btn--active .tab-label {
  transform: scale(1.05);
}
@media (max-width: 480px) {
  .tab-bar {
    left: 16px;
    right: 16px;
    bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  }
}
`;

if (!$('style#navbar-styles').length) {
    $('head').append('<style id="navbar-styles">\\n' + navbarCSS + '\\n</style>');
}

// 2. Add HTML
const navbarHTML = `
<nav class="tab-bar">
  <button class="tab-btn tab-btn--active" onclick="handleTabClick(this, 'alles')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    <span class="tab-label">Übersicht</span>
  </button>
  <button class="tab-btn" onclick="handleTabClick(this, 'theke')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    <span class="tab-label">Theke</span>
  </button>
  <button class="tab-btn" onclick="handleTabClick(this, 'einlass')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>
    <span class="tab-label">Einlass</span>
  </button>
  <button class="tab-btn" onclick="handleTabClick(this, 'profil')">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    <span class="tab-label">Profil</span>
  </button>
</nav>

<script>
function handleTabClick(btn, type) {
    // Update active class
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-btn--active'));
    btn.classList.add('tab-btn--active');
    
    // Trigger existing actions
    if (type === 'profil') {
        if(typeof AUTH !== 'undefined' && AUTH.showProfile) {
            AUTH.showProfile();
        }
    } else {
        if(typeof selectDept === 'function') {
            selectDept(type);
        }
    }
}
</script>
`;

if (!$('nav.tab-bar').length) {
    $('body').append(navbarHTML);
}

fs.writeFileSync(htmlPath, $.html());
console.log('Navbar successfully injected into src/index.html');
