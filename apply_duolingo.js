const fs = require('fs');
const path = './src/index.html';

let html = fs.readFileSync(path, 'utf8');

// 1. Inject Duolingo Theme CSS
const duolingoCSS = `
    <!-- DUOLINGO THEME OVERRIDE -->
    <style id="duolingo-theme">
        :root {
            --duo-green: #58cc02;
            --duo-green-shadow: #58a700;
            --duo-blue: #1cb0f6;
            --duo-blue-shadow: #1899d6;
            --duo-border: #e5e5e5;
            --duo-bg: #ffffff;
            --duo-text: #3c3c3c;
        }
        
        body {
            background: #ffffff !important;
        }
        
        body:not(.light-mode) {
            --duo-border: #333333;
            --duo-bg: #131f24;
            --duo-text: #ffffff;
            background: #131f24 !important;
        }

        /* Override glassmorphism with solid Duolingo blocks */
        .card-container, .hall-card, .news-section, .stats-section, .auslaesse-container, .intern-section, #gamification-summary {
            background: var(--duo-bg) !important;
            backdrop-filter: none !important;
            border: 2px solid var(--duo-border) !important;
            border-radius: 16px !important;
            box-shadow: 0 6px 0 var(--duo-border) !important;
            color: var(--duo-text) !important;
            transform: translateY(0) !important;
            margin-bottom: 24px !important;
            position: relative;
        }
        
        /* Typography */
        h1, h2, h3, h4, h5 {
            font-weight: 800 !important;
            letter-spacing: -0.5px !important;
        }
        
        /* Duolingo Buttons */
        button, .tab-btn, .alert-done-btn, .dept-btn, .nav-btn, .settings-nav-btn {
            background: var(--duo-blue) !important;
            color: white !important;
            border: 2px solid transparent !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 0 var(--duo-blue-shadow) !important;
            font-weight: bold !important;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.1s ease !important;
            backdrop-filter: none !important;
        }
        
        button:active, .tab-btn:active, .alert-done-btn:active, .dept-btn:active {
            transform: translateY(4px) !important;
            box-shadow: 0 0 0 transparent !important;
        }
        
        /* Special Green Buttons */
        .btn-primary, button[onclick*="Checklist"], button.alert-done-btn {
            background: var(--duo-green) !important;
            box-shadow: 0 4px 0 var(--duo-green-shadow) !important;
        }
        
        .btn-primary:active, button[onclick*="Checklist"]:active, button.alert-done-btn:active {
            transform: translateY(4px) !important;
            box-shadow: 0 0 0 transparent !important;
        }
        
        /* Remove ambient glows */
        .ambient-glow, .liquid-bg {
            display: none !important;
        }
        
        /* Hide existing glass effects */
        .glass {
            background: var(--duo-bg) !important;
            border-color: var(--duo-border) !important;
        }
    </style>
`;

if (!html.includes('id="duolingo-theme"')) {
    html = html.replace('</head>', duolingoCSS + '\n</head>');
}

// 2. Add Oli to prominent places
const oliImg = '<img src="/oli-favicon.png" alt="Oli" style="position: absolute; top: -35px; right: -15px; width: 75px; z-index: 10; transform: rotate(15deg); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3)); pointer-events: none;">';

// Add to the main gamification/dashboard header
if (!html.includes('alt="Oli"') && html.includes('id="gamification-summary"')) {
    html = html.replace('<div id="gamification-summary"', '<div id="gamification-summary" style="position: relative;">' + oliImg);
}

// Add to Checklist container if exists
if (html.includes('id="ws-checklist-container"')) {
    html = html.replace('<div id="ws-checklist-container"', '<div id="ws-checklist-container" style="position: relative; margin-top: 30px;">' + oliImg.replace('top: -35px', 'top: -45px'));
}

fs.writeFileSync(path, html);
console.log('Duolingo style and Oli added successfully!');
