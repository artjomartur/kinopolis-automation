const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const newInfoSection = `
<!-- TMDB SECTION -->
<div class="info-section" id="info-section-container" style="display: none;">
    <div class="dashboard-header" style="margin-bottom: 1.5rem; justify-content: flex-start;">
        <div class="dashboard-header-left">
            <h2 class="dashboard-title" style="font-size: 2.5rem;">🎬 Filmdatenbank</h2>
            <div class="location-badge">TheMovieDB Integration</div>
        </div>
    </div>

    <!-- API Key Setup (Hidden if key exists) -->
    <div id="tmdb-setup-container" class="card-container glass" style="margin-bottom: 2rem; border: 2px solid var(--primary-red);">
        <div style="padding: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;">🔑 TMDB API-Key erforderlich</h3>
            <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Um die Filmdatenbank nutzen zu können, trage hier bitte deinen kostenlosen API-Schlüssel ein (er wird nur lokal im Browser gespeichert).</p>
            <div style="display: flex; gap: 0.5rem;">
                <input type="password" id="tmdb-api-key-input" placeholder="Hier TMDB API Key einfügen..." class="form-control" style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3); color: white;">
                <button class="btn btn-primary" onclick="saveTmdbKey()" style="padding: 0.75rem 1.5rem;">Speichern</button>
            </div>
            <p style="font-size: 0.8rem; margin-top: 1rem; color: var(--text-muted);"><a href="https://www.themoviedb.org/settings/api" target="_blank" style="color: var(--primary-blue); text-decoration: none;">Hier kannst du einen API Key generieren</a> (Account erforderlich).</p>
        </div>
    </div>

    <!-- Search UI -->
    <div id="tmdb-search-container" style="display: none;">
        <div style="display: flex; gap: 0.5rem; margin-bottom: 2rem;">
            <input type="text" id="tmdb-search-input" placeholder="Nach Filmen suchen (z.B. Avatar)..." onkeypress="if(event.key === 'Enter') searchTmdb()" class="form-control" style="flex: 1; padding: 1rem; border-radius: 12px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.4); color: white; font-size: 1.1rem;">
            <button class="btn btn-primary" onclick="searchTmdb()" style="padding: 0 2rem; border-radius: 12px; font-weight: bold; background: var(--primary-red); border: none;">Suchen</button>
        </div>
        
        <div class="loading-state" id="tmdb-loading" style="display:none; padding: 2rem; text-align: center;">
            <div class="spinner"></div>
            <div class="loading-text">Suche Filme...</div>
        </div>
        
        <div id="tmdb-results-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1.5rem;">
            <!-- Filled via JS -->
            <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem; background: rgba(255,255,255,0.02); border-radius: 12px;">
                Tippe einen Filmtitel ein und drücke Suchen.
            </div>
        </div>
    </div>
</div>

<!-- TMDB Modal -->
<div class="modal" id="tmdb-modal">
    <div class="modal-content glass" style="max-width: 800px; padding: 0; overflow: hidden; display: flex; flex-direction: column; max-height: 90vh;">
        <div id="tmdb-modal-hero" style="height: 250px; background-size: cover; background-position: center; position: relative;">
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, var(--bg-dark)); height: 100px;"></div>
            <button onclick="closeTmdbModal()" style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.6); border: none; color: white; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">✕</button>
        </div>
        <div style="padding: 2rem; overflow-y: auto;">
            <div style="display: flex; gap: 1.5rem; align-items: flex-start;">
                <img id="tmdb-modal-poster" src="" style="width: 120px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); margin-top: -60px; position: relative; z-index: 1;" />
                <div>
                    <h2 id="tmdb-modal-title" style="font-size: 2rem; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif;"></h2>
                    <div style="display: flex; gap: 0.75rem; color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem; align-items: center; flex-wrap: wrap;">
                        <span id="tmdb-modal-date"></span>
                        <span>•</span>
                        <span id="tmdb-modal-fsk" style="background: rgba(255,255,255,0.1); padding: 2px 6px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.2);">FSK ?</span>
                        <span>•</span>
                        <span id="tmdb-modal-runtime"></span>
                        <span>•</span>
                        <span id="tmdb-modal-rating" style="color: #f1c40f; font-weight: bold;">★ ?/10</span>
                    </div>
                </div>
            </div>
            
            <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.1rem; color: var(--text-main);">Handlung</h3>
            <p id="tmdb-modal-plot" style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;"></p>
            
            <div id="tmdb-modal-trailer-container" style="margin-top: 2rem; display: none;">
                <h3 style="margin-bottom: 1rem; font-size: 1.1rem; color: var(--text-main);">Trailer</h3>
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px;">
                    <iframe id="tmdb-modal-trailer" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
</div>
`;

// Replace old info-section
html = html.replace(/<div class="info-section" id="info-section-container" style="display: none;">[\s\S]*?(?=<!-- Internal Message Modal -->)/, newInfoSection + '\n');


const scriptLogic = `
<script>
// --- TMDB LOGIC ---
let tmdbApiKey = localStorage.getItem('tmdb_api_key') || '';

function initTmdb() {
    if (tmdbApiKey) {
        document.getElementById('tmdb-setup-container').style.display = 'none';
        document.getElementById('tmdb-search-container').style.display = 'block';
    } else {
        document.getElementById('tmdb-setup-container').style.display = 'block';
        document.getElementById('tmdb-search-container').style.display = 'none';
    }
}

function saveTmdbKey() {
    const key = document.getElementById('tmdb-api-key-input').value.trim();
    if (!key) {
        alert("Bitte gib einen API Key ein.");
        return;
    }
    tmdbApiKey = key;
    localStorage.setItem('tmdb_api_key', key);
    initTmdb();
}

async function searchTmdb() {
    if (!tmdbApiKey) return;
    const query = document.getElementById('tmdb-search-input').value.trim();
    if (!query) return;
    
    document.getElementById('tmdb-loading').style.display = 'block';
    const grid = document.getElementById('tmdb-results-grid');
    grid.innerHTML = '';
    
    try {
        const res = await fetch(\`https://api.themoviedb.org/3/search/movie?api_key=\${tmdbApiKey}&language=de-DE&query=\${encodeURIComponent(query)}\`);
        const data = await res.json();
        
        document.getElementById('tmdb-loading').style.display = 'none';
        
        if (data.results && data.results.length > 0) {
            data.results.forEach(movie => {
                const posterUrl = movie.poster_path ? \`https://image.tmdb.org/t/p/w342\${movie.poster_path}\` : 'https://via.placeholder.com/342x513?text=Kein+Bild';
                const year = movie.release_date ? movie.release_date.split('-')[0] : 'Unbekannt';
                
                grid.innerHTML += \`
                    <div class="tmdb-movie-card" onclick="openTmdbModal(\${movie.id})" style="background: rgba(255,255,255,0.05); border-radius: 12px; overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid rgba(255,255,255,0.1);" onmouseover="this.style.transform='scale(1.03)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.5)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
                        <img src="\${posterUrl}" style="width: 100%; aspect-ratio: 2/3; object-fit: cover;" />
                        <div style="padding: 1rem;">
                            <h3 style="font-size: 1rem; margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="\${movie.title}">\${movie.title}</h3>
                            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.8rem;">
                                <span>\${year}</span>
                                <span style="color: #f1c40f;">★ \${movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                \`;
            });
        } else {
            grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem;">Keine Filme gefunden.</div>';
        }
    } catch (err) {
        document.getElementById('tmdb-loading').style.display = 'none';
        grid.innerHTML = \`<div style="grid-column: 1 / -1; text-align: center; color: var(--primary-red); padding: 3rem;">Fehler bei der Suche. Ist der API Key gültig?</div>\`;
    }
}

async function openTmdbModal(id) {
    if (!tmdbApiKey) return;
    try {
        const res = await fetch(\`https://api.themoviedb.org/3/movie/\${id}?api_key=\${tmdbApiKey}&language=de-DE&append_to_response=videos,release_dates\`);
        const data = await res.json();
        
        document.getElementById('tmdb-modal-title').innerText = data.title;
        document.getElementById('tmdb-modal-date').innerText = data.release_date ? new Date(data.release_date).toLocaleDateString('de-DE') : 'Unbekannt';
        document.getElementById('tmdb-modal-runtime').innerText = data.runtime ? \`\${data.runtime} Min.\` : '? Min.';
        document.getElementById('tmdb-modal-rating').innerText = \`★ \${data.vote_average.toFixed(1)}/10\`;
        document.getElementById('tmdb-modal-plot').innerText = data.overview || 'Keine Beschreibung verfügbar.';
        
        // FSK / Rating
        let fsk = 'FSK ?';
        if (data.release_dates && data.release_dates.results) {
            const deRelease = data.release_dates.results.find(r => r.iso_3166_1 === 'DE');
            if (deRelease && deRelease.release_dates && deRelease.release_dates[0].certification) {
                fsk = 'FSK ' + deRelease.release_dates[0].certification;
            }
        }
        document.getElementById('tmdb-modal-fsk').innerText = fsk;
        
        // Images
        const posterUrl = data.poster_path ? \`https://image.tmdb.org/t/p/w500\${data.poster_path}\` : 'https://via.placeholder.com/500x750?text=Kein+Bild';
        const backdropUrl = data.backdrop_path ? \`https://image.tmdb.org/t/p/w1280\${data.backdrop_path}\` : '';
        document.getElementById('tmdb-modal-poster').src = posterUrl;
        document.getElementById('tmdb-modal-hero').style.backgroundImage = backdropUrl ? \`url('\${backdropUrl}')\` : 'none';
        
        // Trailer
        const trailerContainer = document.getElementById('tmdb-modal-trailer-container');
        const trailerIframe = document.getElementById('tmdb-modal-trailer');
        
        if (data.videos && data.videos.results && data.videos.results.length > 0) {
            // Finde YouTube Trailer
            const trailer = data.videos.results.find(v => v.site === 'YouTube' && v.type === 'Trailer') || data.videos.results.find(v => v.site === 'YouTube');
            if (trailer) {
                trailerIframe.src = \`https://www.youtube.com/embed/\${trailer.key}\`;
                trailerContainer.style.display = 'block';
            } else {
                trailerContainer.style.display = 'none';
                trailerIframe.src = '';
            }
        } else {
            trailerContainer.style.display = 'none';
            trailerIframe.src = '';
        }
        
        document.getElementById('tmdb-modal').classList.add('active');
    } catch (err) {
        console.error("Error fetching details", err);
        alert("Fehler beim Laden der Filmdetails.");
    }
}

function closeTmdbModal() {
    document.getElementById('tmdb-modal').classList.remove('active');
    document.getElementById('tmdb-modal-trailer').src = ''; // stop playing
}

// Ensure init happens
document.addEventListener('DOMContentLoaded', () => {
    initTmdb();
});
</script>
</body>`;

html = html.replace('</body>', scriptLogic);
fs.writeFileSync(path, html);
