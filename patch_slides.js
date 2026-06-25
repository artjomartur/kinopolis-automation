const fs = require('fs');
let file = fs.readFileSync('generate_custom_slides.js', 'utf8');

const oldConfig = `    const slidesConfig = [
        { 
            title: "Live-<br>Monitor", 
            subtitle: "Immer im Blick, was in den Sälen passiert. Auslastung und Laufzeiten in Echtzeit.", 
            oli: "Oli_1.png",
            img: "media__1782322445980.png" // 190KB Kino 1 Live
        },
        { 
            title: "Digitales<br>Fundbüro", 
            subtitle: "Verlorene Gegenstände einfach eintragen und den Status per Klick aktualisieren.", 
            oli: "Oli_2.png",
            img: "media__1782322486868.png" // 311KB Fundbuero
        },
        { 
            title: "Teamleiter-<br>Portal", 
            subtitle: "Alle wichtigen Funktionen und Admin-Tools für die Schichtführung sicher hinterlegt.", 
            oli: "Oli_3.png",
            img: "media__1782321654685.png" // 327KB Portale
        },
        { 
            title: "Kino-<br>Übersicht", 
            subtitle: "Behalte alle Filme und Besucherzahlen für schnelle Handovers präzise im Auge.", 
            oli: "Oli_5.png",
            img: "media__1782321654664.png" // 311KB Viele Kino rows
        },
        { 
            title: "Dashboard<br>Overview", 
            subtitle: "Dein smarter Begleiter für den Kino-Alltag. Alles Wichtige an einem Ort zentriert.", 
            oli: "Oli_6.png",
            img: "media__1782321654704.png" // 488KB Kino 3/4/5 collapsed
        }
    ];`;

const newConfig = `    const slidesConfig = [
        { 
            title: "Live-<br>Monitor", 
            subtitle: "Immer im Blick, was in den Sälen passiert. Auslastung und Laufzeiten in Echtzeit.", 
            oli: "Oli_1.png",
            img: "media__1782322445980.png"
        },
        { 
            title: "Digitales<br>Fundbüro", 
            subtitle: "Verlorene Gegenstände einfach eintragen und den Status per Klick aktualisieren.", 
            oli: "Oli_2.png",
            img: "media__1782322486868.png"
        },
        { 
            title: "Teamleiter-<br>Portal", 
            subtitle: "Alle wichtigen Funktionen, Ops Feed und Admin-Tools sicher hinterlegt.", 
            oli: "Oli_3.png",
            img: "media__1782425706253.png"
        },
        { 
            title: "Aufgaben &<br>Checklisten", 
            subtitle: "Effiziente Schicht-Organisation durch digitale Reinigungschecks und To-Do Listen.", 
            oli: "Oli_5.png",
            img: "scratch/screen_tasks.png"
        },
        { 
            title: "Interne<br>News", 
            subtitle: "Wichtige Mitteilungen und Schicht-Übergaben für alle Mitarbeiter transparent an einem Ort.", 
            oli: "Oli_6.png",
            img: "scratch/screen_intern.png"
        }
    ];`;

if (file.includes(oldConfig)) {
    file = file.replace(oldConfig, newConfig);
    fs.writeFileSync('generate_custom_slides.js', file);
    console.log("Patched slidesConfig successfully");
} else {
    console.log("Could not find oldConfig");
}
