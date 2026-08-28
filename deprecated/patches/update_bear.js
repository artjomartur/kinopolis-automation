const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const svgBear = `
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; display: block;">
  <defs>
    <radialGradient id="oli-bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00a8ff" />
      <stop offset="100%" stop-color="#007aff" />
    </radialGradient>
    <linearGradient id="oli-fur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#D28C4B" />
      <stop offset="100%" stop-color="#9E5B22" />
    </linearGradient>
    <linearGradient id="oli-snout" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE4B5" />
      <stop offset="100%" stop-color="#E6C280" />
    </linearGradient>
    <linearGradient id="oli-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF3B30" />
      <stop offset="100%" stop-color="#B31208" />
    </linearGradient>
    <filter id="oli-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.25"/>
    </filter>

    <style>
      @keyframes oli-blink {
        0%, 94%, 98% { transform: scaleY(1); }
        96% { transform: scaleY(0.1); }
      }
      @keyframes oli-ear-l {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(-10deg); }
      }
      @keyframes oli-ear-r {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(10deg); }
      }
      @keyframes oli-wave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-25deg); }
        75% { transform: rotate(15deg); }
      }
      .oli-eye { animation: oli-blink 5s infinite; }
      .oli-ear-left { transform-origin: 30% 30%; animation: oli-ear-l 4s infinite ease-in-out; }
      .oli-ear-right { transform-origin: 70% 30%; animation: oli-ear-r 4s infinite ease-in-out 0.5s; }
      .oli-paw { transform-origin: 165px 180px; animation: oli-wave 2s infinite ease-in-out; }
    </style>
  </defs>
  
  <circle cx="100" cy="100" r="100" fill="url(#oli-bg)" />
  
  <!-- Shirt -->
  <path d="M 20 200 Q 100 120 180 200 Z" fill="url(#oli-shirt)" filter="url(#oli-shadow)" />
  
  <!-- Left Ear -->
  <g class="oli-ear-left">
    <circle cx="45" cy="65" r="22" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
    <circle cx="45" cy="65" r="12" fill="#E6C280" />
  </g>
  
  <!-- Right Ear -->
  <g class="oli-ear-right">
    <circle cx="155" cy="65" r="22" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
    <circle cx="155" cy="65" r="12" fill="#E6C280" />
  </g>
  
  <!-- Head -->
  <circle cx="100" cy="105" r="60" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
  
  <!-- Snout -->
  <ellipse cx="100" cy="135" rx="35" ry="24" fill="url(#oli-snout)" filter="url(#oli-shadow)" />
  
  <!-- Nose -->
  <ellipse cx="100" cy="120" rx="14" ry="9" fill="#2C1A14" />
  <ellipse cx="95" cy="116" rx="4" ry="2" fill="#FFFFFF" opacity="0.5" />
  
  <!-- Mouth -->
  <path d="M 100 129 L 100 142" stroke="#2C1A14" stroke-width="3" stroke-linecap="round" />
  <path d="M 82 142 Q 100 156 118 142" stroke="#2C1A14" stroke-width="3" fill="none" stroke-linecap="round" />
  
  <!-- Eyes -->
  <g class="oli-eye" style="transform-origin: 70px 95px;">
    <circle cx="70" cy="95" r="8" fill="#2C1A14" />
    <circle cx="67" cy="92" r="3" fill="#FFFFFF" />
  </g>
  <g class="oli-eye" style="transform-origin: 130px 95px;">
    <circle cx="130" cy="95" r="8" fill="#2C1A14" />
    <circle cx="127" cy="92" r="3" fill="#FFFFFF" />
  </g>
  
  <!-- Cheeks -->
  <ellipse cx="55" cy="115" rx="10" ry="5" fill="#FF3B30" opacity="0.3" />
  <ellipse cx="145" cy="115" rx="10" ry="5" fill="#FF3B30" opacity="0.3" />

  <!-- Waving Paw -->
  <g class="oli-paw">
    <g transform="rotate(-15 165 180)">
      <rect x="145" y="110" width="36" height="80" rx="18" fill="url(#oli-fur)" filter="url(#oli-shadow)" />
      <!-- Paw pads -->
      <ellipse cx="163" cy="128" rx="10" ry="12" fill="#E6C280" />
      <circle cx="151" cy="116" r="4" fill="#E6C280" />
      <circle cx="163" cy="110" r="4" fill="#E6C280" />
      <circle cx="175" cy="116" r="4" fill="#E6C280" />
    </g>
  </g>
</svg>
`.trim();

// 1. Replace in modal
const modalImg = '<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center;" />';
if (html.includes(modalImg)) {
    html = html.replace(modalImg, svgBear);
} else {
    console.log("Could not find modal image");
}

// 2. Replace in FAB
const fabImg = '<img src="https://trailer.kinopolis.de/media/img/kinobaer_teaser.jpg" style="width: 100%; height: 100%; object-fit: cover; object-position: center top;" />';
if (html.includes(fabImg)) {
    html = html.replace(fabImg, svgBear);
} else {
    console.log("Could not find fab image");
}

// 3. Replace in Chat Header
const chatImg = '<img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary-red);" />';
const svgBearSmall = svgBear.replace('style="width: 100%; height: 100%; display: block;"', 'style="width: 28px; height: 28px; border-radius: 50%; border: 1px solid var(--primary-red);"');
if (html.includes(chatImg)) {
    html = html.replace(chatImg, svgBearSmall);
} else {
    console.log("Could not find chat image");
}

fs.writeFileSync(path, html);
console.log("Updated HTML with SVG bear!");
