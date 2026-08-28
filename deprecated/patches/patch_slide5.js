const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

// The old slide 5 text and image
const oldSlide5Title = 'title: "Interne<br>News",';
const newSlide5Title = 'title: "FSK & JuSchG<br>Checker",';

const oldSlide5Sub = 'subtitle: "Wichtige Mitteilungen und Schicht-Übergaben für alle Mitarbeiter transparent an einem Ort.",';
const newSlide5Sub = 'subtitle: "Rechtlich verbindliche Einlass-Prüfung in Sekundenschnelle ohne langes Kopfrechnen.",';

const oldSlide5Img = 'img: "scratch/screen_intern.png"';
const newSlide5Img = 'img: "media__1782426986516.png"';

file = file.replace(oldSlide5Title, newSlide5Title);
file = file.replace(oldSlide5Sub, newSlide5Sub);
file = file.replace(oldSlide5Img, newSlide5Img);

fs.writeFileSync('generate_custom_slides.js', file);
console.log("Patched slide 5 successfully");
