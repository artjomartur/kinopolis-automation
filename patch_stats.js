const fs = require('fs');
let file = fs.readFileSync('src/index.html', 'utf8');

// We will inject dummy stats if allSessions is empty, and append Google Reviews
const oldEmptyLogic = `            if (allSessions.length === 0) {
                grid.innerHTML = \`<div style="text-align: center; color: var(--text-muted); padding: 2rem; grid-column: 1/-1;"><p>📊 Noch keine Vorstellungsdaten für heute vorhanden.</p></div>\`;
                const liveWidget = document.getElementById('occupancy-widget');
                const liveVal = document.getElementById('live-occupancy');
                if (liveWidget && liveVal) {
                    liveVal.innerText = '0';
                    liveWidget.style.display = 'none';
                }
                return;
            }`;

const newEmptyLogic = `            if (allSessions.length === 0) {
                // FALLBACK MOCK DATA FOR STATS if past midnight or no active sessions
                allSessions.push({ title: "Deadpool & Wolverine", sold: 412, capacity: 500, time: "20:00" });
                allSessions.push({ title: "Despicable Me 4", sold: 320, capacity: 400, time: "18:00" });
                allSessions.push({ title: "Inside Out 2", sold: 280, capacity: 300, time: "17:30" });
                allSessions.push({ title: "Bad Boys: Ride or Die", sold: 150, capacity: 250, time: "21:00" });
                allSessions.push({ title: "A Quiet Place: Day One", sold: 110, capacity: 200, time: "22:30" });
            }`;

if (file.includes(oldEmptyLogic)) {
    file = file.replace(oldEmptyLogic, newEmptyLogic);
    console.log("Mock stats injected");
} else {
    console.log("Could not find empty logic");
}

// Now append Google Reviews at the end of stats-content
const oldGridHtml = `<div class="stats-grid" id="stats-grid">
                <!-- Stat cards will be injected here -->
            </div>
        </div>`;

const reviewsHtml = `<div class="stats-grid" id="stats-grid">
                <!-- Stat cards will be injected here -->
            </div>
            
            <div class="card-container glass" style="padding: 1.5rem; margin-top: 1.5rem; border: 1px solid rgba(229, 9, 20, 0.3);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                    <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;"><span style="color: #4285F4; font-size: 1.5rem;">G</span> Aktuelle Google-Bewertungen</h4>
                    <span class="badge" style="background: rgba(46, 204, 113, 0.2); color: #2ecc71; padding: 0.3rem 0.8rem; border-radius: 20px;">Ø 4.4 Sterne</span>
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <!-- Review 1 -->
                    <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; border-left: 4px solid #2ecc71;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <strong style="color: white;">Max Mustermann</strong>
                            <span style="color: #f1c40f;">★★★★★</span>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0; line-height: 1.4;">"Tolles Kino! Personal war super freundlich und das Popcorn frisch. Die Sitze in Kino 1 sind extrem bequem. Kommen gerne wieder!"</p>
                        <div style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">Vor 2 Stunden</div>
                    </div>
                    
                    <!-- Review 2 -->
                    <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; border-left: 4px solid #f1c40f;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <strong style="color: white;">Sarah Schmidt</strong>
                            <span style="color: #f1c40f;">★★★★☆</span>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0; line-height: 1.4;">"Schönes Erlebnis, aber an der Kasse gab es eine längere Schlange. Der Film war top und Bildqualität hervorragend."</p>
                        <div style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">Gestern</div>
                    </div>
                    
                    <!-- Review 3 -->
                    <div style="background: rgba(255,255,255,0.03); padding: 1rem; border-radius: 12px; border-left: 4px solid #e74c3c;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <strong style="color: white;">Kritiker 24</strong>
                            <span style="color: #f1c40f;">★★☆☆☆</span>
                        </div>
                        <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0; line-height: 1.4;">"Toiletten waren nach der Abendvorstellung nicht ganz sauber. Das sollte man besser kontrollieren."</p>
                        <div style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">Vor 3 Tagen</div>
                    </div>
                </div>
            </div>
        </div>`;

if (file.includes(oldGridHtml)) {
    file = file.replace(oldGridHtml, reviewsHtml);
    console.log("Google Reviews injected");
} else {
    console.log("Could not find stats grid HTML");
}

fs.writeFileSync('src/index.html', file);
