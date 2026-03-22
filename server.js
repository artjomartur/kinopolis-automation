const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Fetch Kinopolis program for a specific location and date
app.get('/api/sessions', async (req, res) => {
    const location = req.query.location || 'su'; // Default to Sulzbach (su)
    const tomorrow = req.query.tomorrow === 'true';
    
    // Always include a date so we only get the target day's schedule
    const targetDate = new Date();
    if (tomorrow) targetDate.setDate(targetDate.getDate() + 1);
    const dateStr = targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    const url = `https://www.kinopolis.de/${location}/programm?date=${dateStr}`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });
        const html = await response.text();
        const $ = cheerio.load(html);

        const sessions = [];

        // Support both older and newer layout selectors
        $('section.movie, .prog2__movie').each((i, movieEl) => {
            const title = $(movieEl).find('.hl-link, .prog2__movie-title').first().text().trim();
            if (!title) return;
            
            // 2. Finding the performance IDs for the requested date to filter out other days
            // The date we are looking for is dateStr (YYYY-MM-DD), let's find the nav item for it
            // Kinopolis might use "So. 22.03." style or similar in the nav
            const d = new Date(dateStr);
            const dayNum = d.getDate();
            const monthNum = d.getMonth() + 1;
            const shortDateStr = `${dayNum < 10 ? '0' : ''}${dayNum}.${monthNum < 10 ? '0' : ''}${monthNum}.`;
            
            let allowedPerformanceIds = new Set();
            $('.prog-nav__item').each((_, navEl) => {
                if ($(navEl).text().includes(shortDateStr)) {
                    const idsAttr = $(navEl).attr('data-performance-ids');
                    if (idsAttr) {
                        // IDs are in format [ID1,ID2,ID3]
                        idsAttr.replace(/[\[\]]/g, '').split(',').forEach(id => allowedPerformanceIds.add(id.trim()));
                    }
                }
            });

            const poster = $(movieEl).find('.prog2__movie-img img, img.img-fluid').first().attr('src');
            const durationText = $(movieEl).find('.movie__specs-el, .prog2__movie-info-item, .prog2__infos').text().trim();
            // Match "Dauer: 157 Minuten" or "157 Min." specifically to avoid matching FSK age rating
            const durationMatch = durationText.match(/Dauer:\s*(\d+)\s*Minuten/i) 
                               || durationText.match(/(\d+)\s*Min\.?/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 0;

            const seenSessions = new Set(); // To deduplicate sessions for this movie

            $(movieEl).find('.prog2__cont, .prog2__movie-session').each((j, sessionEl) => {
                const perfId = $(sessionEl).attr('data-performance-id');
                
                // If we found date-specific allowed performance IDs, use them to filter
                if (allowedPerformanceIds.size > 0 && perfId && !allowedPerformanceIds.has(perfId)) {
                    return; // Skip session from another day
                }

                const time = $(sessionEl).find('.prog2__time').first().text().trim();
                
                // Clean hall name: take first div or remove trailing 'i'
                let hallTextContent = $(sessionEl).find('.prog2__hall-num > div:first-child').text().trim();
                if (!hallTextContent) {
                    hallTextContent = $(sessionEl).find('.prog2__hall-num').text().replace(/i$/, '').trim();
                }
                const hall = hallTextContent;
                
                if (!time) return;

                // Stronger explicit filter: Kinopolis Darmstadt (kp) should not show Citydome/Rex halls
                if (location === 'kp') {
                    const isCitydomeOrRexEvent = hall.includes('Helia') || hall.includes('Pali') || 
                                           hall.includes('Rex') || hall.includes('Classic') || 
                                           hall.includes('Broadway') || hall.includes('Bambi') || hall.includes('Festival');
                    if (isCitydomeOrRexEvent) return; // Skip these cross-listed sessions
                }

                // Deduplicate by time and hall
                const sessionKey = `${time}-${hall}`;
                if (seenSessions.has(sessionKey)) return;
                seenSessions.add(sessionKey);

                // Occupancy logic – try multiple patterns from the Kinopolis DOM
                const occupancyText = $(sessionEl).text().trim();
                
                // Try: "X Plätze frei" or "X% frei" or data-attributes
                const capacityMatch = occupancyText.match(/(\d+)\s+Pl[äa]tze/);
                const freeCountMatch = occupancyText.match(/(\d+)\s+(?:Pl[äa]tze\s+)?frei/);
                const freePercentMatch = occupancyText.match(/(\d+)%\s+frei/);
                const seatingAttr = $(sessionEl).find('[data-seating]').attr('data-seating');
                
                let capacity = capacityMatch ? parseInt(capacityMatch[1]) : 0;
                let freePercent = 95; // default unknown
                let sold = 0;
                
                if (freePercentMatch) {
                    freePercent = parseInt(freePercentMatch[1]);
                    sold = capacity ? Math.round(capacity * (1 - freePercent / 100)) : 0;
                } else if (freeCountMatch && capacity) {
                    const freeCount = parseInt(freeCountMatch[1]);
                    freePercent = Math.round((freeCount / capacity) * 100);
                    sold = capacity - freeCount;
                } else if (seatingAttr) {
                    // data-seating might contain count like [120] or percentage
                    try {
                        const parsed = JSON.parse(seatingAttr);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            capacity = parsed[0];
                        }
                    } catch(e) {}
                }
                
                const isBookable = !occupancyText.includes('nicht mehr buchbar') && !occupancyText.includes('ausverkauft');

                sessions.push({
                    title,
                    poster: poster ? (poster.startsWith('http') ? poster : `https://www.kinopolis.de${poster}`) : null,
                    time,
                    hall,
                    duration,
                    capacity,
                    freePercent,
                    sold,
                    isBookable,
                    performanceId: perfId
                });
            });
        });

        console.log(`Found ${sessions.length} sessions for ${location}`);
        res.json(sessions);
    } catch (error) {
        console.error('Scraping error:', error);
        res.status(500).json({ error: 'Failed to fetch program' });
    }
});

app.get('/api/debug', async (req, res) => {
    const location = req.query.location || 'su';
    const url = `https://www.kinopolis.de/${location}/programm`;
    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });
        const html = await response.text();
        res.send(html);
    } catch (e) {
        res.send(e.message);
    }
});

const locations = {
    "Sulzbach / Main-Taunus": "su",
    "Bonn": "bn",
    "Aschaffenburg": "as",
    "Bad Homburg": "bh",
    "Darmstadt: KINOPOLIS": "kp",
    "Darmstadt: Citydome": "cd",
    "Darmstadt: Rex": "rx",
    "Freiberg": "fr",
    "Gießen": "gi",
    "Hanau": "han",
    "Koblenz": "ko",
    "Landshut": "land",
    "Rhein-Neckar / Viernheim": "rn",
    "Mönchengladbach": "mg",
    "Karlsruhe": "ka",
    "Rosenheim": "ro"
};

app.get('/api/locations', (req, res) => {
    res.json(locations);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
