const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace Chat Header
html = html.replace(
    '<h3 style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">🤖 KI Assistent</h3>',
    '<h3 style="margin: 0; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;"><img src="https://trailer.kinopolis.de/media/img/kinobaer_desktop.jpg" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--primary-red);" /> OLI (KI-Assist)</h3>'
);

// We should also replace the default chat message from "Hallo! Ich bin dein Kino-Assistent." to OLI.
html = html.replace(
    'Hallo! Ich bin dein Kino-Assistent.',
    'Bärenstarkes Hallo! 🐻 Ich bin OLI, dein Kino-Assistent.'
);

// Replace JS fetch block with mock OLI responses
const oldFetch = `    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: msg,
                context: "Aktuelle Kinopolis Seite" // In reality, we'd pass the scraped sessions JSON here
            })
        });
        const data = await res.json();
        
        document.getElementById(loadingId).remove();
        container.innerHTML += \`<div style="background: rgba(0, 122, 255, 0.1); border: 1px solid rgba(0, 122, 255, 0.2); padding: 0.75rem; border-radius: 12px; align-self: flex-start; max-width: 85%;">\${data.reply || 'Fehler in der Antwort'}</div>\`;
        container.scrollTop = container.scrollHeight;
    } catch (e) {
        document.getElementById(loadingId).remove();
        container.innerHTML += \`<div style="color: red; align-self: flex-start; font-size: 0.85rem;">Verbindungsfehler zur KI.</div>\`;
    }`;

const newMock = `    setTimeout(() => {
        document.getElementById(loadingId).remove();
        
        let reply = "Da bin ich als Bär überfragt! 🐾 Ich lerne noch. Frag mich nach Popcorn!";
        const m = msg.toLowerCase();
        
        if (m.includes('hallo') || m.includes('hi')) {
            reply = "Bärenstarkes Hallo! 🐻 Wie kann ich helfen?";
        } else if (m.includes('popcorn')) {
            reply = "Popcorn? Lecker! 🍿 Am besten süß und salzig gemischt!";
        } else if (m.includes('ticket')) {
            reply = "Tickets kannst du ganz einfach oben im 'Scanner' Tab kontrollieren.";
        } else if (m.includes('pause')) {
            reply = "Pausen sind wichtig! Nutze dafür den Pausen-Timer im 'Tools' Tab.";
        } else if (m.includes('film')) {
            reply = "Für Filminfos schau mal im Tab 'Filme' vorbei. 🎬";
        }

        container.innerHTML += \`<div style="background: rgba(226, 28, 43, 0.1); border: 1px solid rgba(226, 28, 43, 0.3); padding: 0.75rem; border-radius: 12px; align-self: flex-start; max-width: 85%; color: white;"><span style="font-weight:bold; color:var(--primary-red);">OLI:</span> \${reply}</div>\`;
        container.scrollTop = container.scrollHeight;
    }, 1000);`;

html = html.replace(oldFetch, newMock);

fs.writeFileSync(path, html);
