const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const svgBear = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; display: block;">
  <defs>
    <!-- Background matching original photo -->
    <linearGradient id="oli-bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0099DD" />
      <stop offset="100%" stop-color="#0066AA" />
    </linearGradient>
    
    <!-- Plush Fur Gradient -->
    <radialGradient id="oli-fur" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#DDA055" />
      <stop offset="70%" stop-color="#B87B33" />
      <stop offset="100%" stop-color="#8C5820" />
    </radialGradient>
    
    <!-- Light Snout Gradient -->
    <radialGradient id="oli-snout" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#FCE1AD" />
      <stop offset="80%" stop-color="#DAB982" />
      <stop offset="100%" stop-color="#B08D59" />
    </radialGradient>
    
    <!-- Red Shirt Gradient -->
    <linearGradient id="oli-shirt" x1="20%" y1="0%" x2="80%" y2="100%">
      <stop offset="0%" stop-color="#FF1A1A" />
      <stop offset="50%" stop-color="#D80000" />
      <stop offset="100%" stop-color="#990000" />
    </linearGradient>

    <filter id="oli-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.3"/>
    </filter>
    <filter id="oli-soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/>
    </filter>

    <style>
      @keyframes oli-blink {
        0%, 94%, 98% { transform: scaleY(1); }
        96% { transform: scaleY(0.1); }
      }
      @keyframes oli-ear-l {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-8deg); }
      }
      @keyframes oli-ear-r {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(8deg); }
      }
      @keyframes oli-breathe {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-2px) scale(1.02); }
      }
      @keyframes oli-wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-25deg); }
        75% { transform: rotate(15deg); }
      }
      .oli-eye { animation: oli-blink 4s infinite; transform-origin: center; }
      .oli-ear-left { transform-origin: 30% 30%; animation: oli-ear-l 3.5s infinite ease-in-out; }
      .oli-ear-right { transform-origin: 70% 30%; animation: oli-ear-r 3.5s infinite ease-in-out 0.5s; }
      .oli-paw { transform-origin: 165px 180px; animation: oli-wave 2.5s infinite ease-in-out; }
      .oli-body { animation: oli-breathe 4s infinite ease-in-out; transform-origin: center bottom; }
    </style>
  </defs>
  
  <circle cx="100" cy="100" r="100" fill="url(#oli-bg)" />
  
  <g class="oli-body">
    <!-- Body/Shirt -->
    <path d="M 30 220 Q 100 110 170 220 Z" fill="url(#oli-shirt)" filter="url(#oli-shadow)" />
    <!-- Shirt Collar -->
    <path d="M 65 140 Q 100 165 135 140 L 125 155 Q 100 175 75 155 Z" fill="#990000" />
    
    <!-- Left Ear -->
    <g class="oli-ear-left">
      <circle cx="50" cy="65" r="24" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
      <circle cx="50" cy="65" r="13" fill="url(#oli-snout)" />
    </g>
    
    <!-- Right Ear -->
    <g class="oli-ear-right">
      <circle cx="150" cy="65" r="24" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
      <circle cx="150" cy="65" r="13" fill="url(#oli-snout)" />
    </g>
    
    <!-- Head Base -->
    <ellipse cx="100" cy="105" rx="65" ry="58" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
    
    <!-- Snout (Muzzle) -->
    <ellipse cx="100" cy="132" rx="38" ry="26" fill="url(#oli-snout)" filter="url(#oli-soft-shadow)" />
    
    <!-- Nose -->
    <ellipse cx="100" cy="116" rx="16" ry="11" fill="#111" />
    <ellipse cx="94" cy="112" rx="5" ry="3" fill="#FFF" opacity="0.6" transform="rotate(-15 94 112)" />
    
    <!-- Mouth Line -->
    <path d="M 100 127 L 100 138" stroke="#331A00" stroke-width="3" stroke-linecap="round" />
    <!-- Smile -->
    <path d="M 78 138 Q 100 158 122 138" stroke="#331A00" stroke-width="3.5" fill="none" stroke-linecap="round" />
    <!-- Dimples -->
    <path d="M 75 133 Q 73 138 78 138" stroke="#331A00" stroke-width="2.5" fill="none" stroke-linecap="round" />
    <path d="M 125 133 Q 127 138 122 138" stroke="#331A00" stroke-width="2.5" fill="none" stroke-linecap="round" />
    
    <!-- Eyes -->
    <g class="oli-eye" style="transform-origin: 70px 92px;">
      <circle cx="70" cy="92" r="9" fill="#111" />
      <circle cx="67" cy="89" r="3.5" fill="#FFF" />
      <circle cx="73" cy="94" r="1.5" fill="#FFF" />
    </g>
    <g class="oli-eye" style="transform-origin: 130px 92px;">
      <circle cx="130" cy="92" r="9" fill="#111" />
      <circle cx="127" cy="89" r="3.5" fill="#FFF" />
      <circle cx="133" cy="94" r="1.5" fill="#FFF" />
    </g>
    
    <!-- Eyebrows (optional, gives character) -->
    <path d="M 60 78 Q 70 73 80 78" stroke="#6B4210" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M 140 78 Q 130 73 120 78" stroke="#6B4210" stroke-width="4" fill="none" stroke-linecap="round" />

  </g>

  <!-- Waving Paw (Overlapping body) -->
  <g class="oli-paw">
    <g transform="rotate(-15 165 180)">
      <rect x="145" y="115" width="40" height="85" rx="20" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
      <!-- Paw pads -->
      <ellipse cx="165" cy="132" rx="12" ry="14" fill="url(#oli-snout)" />
      <circle cx="152" cy="118" r="5" fill="url(#oli-snout)" />
      <circle cx="165" cy="112" r="5" fill="url(#oli-snout)" />
      <circle cx="178" cy="118" r="5" fill="url(#oli-snout)" />
    </g>
  </g>
</svg>
`.trim();

const imgModal = '<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center; animation: oliBreathing 3s ease-in-out infinite;" />';
const imgFab = '<img src="https://trailer.kinopolis.de/media/img/kinobaer_teaser.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center top; animation: oliBreathing 3s ease-in-out infinite;" />';
const imgChat = '<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary-red); animation: oliBreathing 3s ease-in-out infinite;" />';

const svgBearSmall = svgBear.replace('style="width: 100%; height: 100%; display: block;"', 'style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--primary-red);"');

html = html.replace(imgModal, svgBear);
html = html.replace(imgFab, svgBear);
html = html.replace(imgChat, svgBearSmall);

// Also remove the old breathing animation style tag to clean up
html = html.replace(/<style>\s*@keyframes oliBreathing {[\s\S]*?<\/style>/, '');

fs.writeFileSync(path, html);
console.log("Injected the highly accurate original-look SVG bear!");
