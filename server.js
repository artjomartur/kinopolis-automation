require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('dist')); // Serve static dashboard assets from dist

// Diagnostic endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        time: new Date().toISOString(),
        node: process.version
    });
});
// Fetch Kinopolis program for a specific location and date
app.get('/api/sessions', async (req, res) => {
    const location = req.query.location || 'su';
    const tomorrow = req.query.tomorrow === 'true';
    
    // Use provided date or default to today
    let dateStr = req.query.date;
    if (!dateStr) {
        const targetDate = new Date();
        if (tomorrow) targetDate.setDate(targetDate.getDate() + 1);
        dateStr = targetDate.toISOString().split('T')[0];
    }
    
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

        // We match "Heute", "Morgen", or the specific "DD.MM." string
        const d = new Date(dateStr);
        const dayNum = d.getDate();
        const monthNum = d.getMonth() + 1;
        const shortDateStr = `${dayNum < 10 ? '0' : ''}${dayNum}.${monthNum < 10 ? '0' : ''}${monthNum}`;
        
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        const isTomorrow = dateStr === new Date(Date.now() + 86400000).toISOString().split('T')[0];

        let allowedPerformanceIds = new Set();
        $('.prog-nav__item').each((_, navEl) => {
            const navText = $(navEl).text().trim().toLowerCase();
            
            let matchesDate = false;
            if (isToday && navText.includes('heute')) matchesDate = true;
            else if (isTomorrow && navText.includes('morgen')) matchesDate = true;
            else if (navText.includes(shortDateStr)) matchesDate = true;

            if (matchesDate) {
                const idsAttr = $(navEl).attr('data-performance-ids');
                if (idsAttr) {
                    // IDs are in format [ID1,ID2,ID3]
                    idsAttr.replace(/[\[\]]/g, '').split(',').forEach(id => {
                        const trimmed = id.trim();
                        if (trimmed) allowedPerformanceIds.add(trimmed);
                    });
                }
            }
        });

        // Support both older and newer layout selectors
        $('section.movie, .prog2__movie').each((i, movieEl) => {
            const title = $(movieEl).find('.hl-link, .prog2__movie-title').first().text().trim();
            if (!title) return;

            const poster = $(movieEl).find('.prog2__movie-img img, img.img-fluid').first().attr('src');
            const durationText = $(movieEl).find('.movie__specs-el, .prog2__movie-info-item, .prog2__infos').text().trim();
            // Match "Dauer: 157 Minuten" or "157 Min." specifically to avoid matching FSK age rating
            const durationMatch = durationText.match(/Dauer:\s*(\d+)\s*Minuten/i)
                || durationText.match(/(\d+)\s*Min\.?/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 0;

            let fsk = "FSK ?";
            const fskImg = $(movieEl).find('img[src*="FSK"]').first().attr('alt');
            if (fskImg && fskImg.includes('FSK')) {
                fsk = fskImg;
            } else {
                const fskMatch = durationText.match(/ab\s*(\d+)\s*Jahre/i) || durationText.match(/FSK\s*(\d+)/i);
                if (fskMatch) fsk = `FSK ${fskMatch[1]}`;
            }

            const seenSessions = new Set(); // To deduplicate sessions for this movie

            $(movieEl).find('.prog2__cont, .prog2__movie-session').each((j, sessionEl) => {
                const perfId = $(sessionEl).attr('data-performance-id');

                // If we found date-specific allowed performance IDs, use them to filter
                // CRITICAL: Kinopolis sometimes includes future days in the HTML, we must filter them out
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

                // 1. Try specific selectors first (more reliable for newer layout)
                let capacity = 0;
                let freePercent = 95; // default

                const seatsEl = $(sessionEl).find('.prog2__seats');
                if (seatsEl.length) {
                    capacity = parseInt(seatsEl.text().replace(/\D/g, '')) || 0;
                }

                const scaleEl = $(sessionEl).find('.prog2__scale');
                if (scaleEl.length) {
                    const scaleText = scaleEl.text().trim();
                    const percentMatch = scaleText.match(/(\d+)%/);
                    if (percentMatch) {
                        freePercent = parseInt(percentMatch[1]);
                    }
                }

                // 2. Fallback to regex if selectors failed or returned suspicious values (like 1)
                if (capacity <= 1) {
                    const combinedMatch = occupancyText.match(/(\d+)\s+(\d+)%\s+frei/);
                    if (combinedMatch) {
                        capacity = parseInt(combinedMatch[1]);
                        freePercent = parseInt(combinedMatch[2]);
                    } else {
                        const capacityMatch = occupancyText.match(/(\d+)\s+Pl[äa]tze/);
                        if (capacityMatch) capacity = parseInt(capacityMatch[1]);
                    }
                }

                const freeCountMatch = occupancyText.match(/(\d+)\s+(?:Pl[äa]tze\s+)?frei/);
                const freePercentMatch = occupancyText.match(/(\d+)%\s+frei/);

                if (freePercentMatch && (!scaleEl.length || freePercent === 95)) {
                    freePercent = parseInt(freePercentMatch[1]);
                }


                let sold = 0;
                if (capacity > 0) {
                    sold = Math.round(capacity * (1 - freePercent / 100));
                    // If we have freeCountMatch, we can be even more precise
                    if (freeCountMatch) {
                        const freeCount = parseInt(freeCountMatch[1]);
                        sold = capacity - freeCount;
                    }
                }

                const seatingAttr = $(sessionEl).find('[data-seating]').attr('data-seating');
                if (capacity === 0 && seatingAttr) {
                    try {
                        const parsed = JSON.parse(seatingAttr);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            capacity = parsed[0];
                        }
                    } catch (e) { }
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
                    performanceId: perfId,
                    date: dateStr,
                    fsk
                });
            });
        });

        console.log(`Found ${sessions.length} sessions for ${location}`);
        const halls = {};
        sessions.forEach(s => { if (!halls[s.hall]) halls[s.hall] = []; halls[s.hall].push(s); });
        const sortedHalls = Object.keys(halls).sort().map(name => ({ name, sessions: halls[name].sort((a, b) => a.time.localeCompare(b.time)) }));

        res.json(sortedHalls);
    } catch (error) {
        console.error('Scraping error:', error);
        // Ensure we always return a JSON object even on crash
        res.status(500).json({ 
            error: 'Failed to fetch program', 
            details: error.message,
            timestamp: new Date().toISOString()
        });
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

// Mock feedback endpoint for local testing
app.post('/api/feedback', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }
    console.log(`[LOCAL DEV] Feedback received: ${text}`);

    // --- RESEND EMAIL INTEGRATION ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${RESEND_API_KEY}`
                },
                body: JSON.stringify({
                    from: 'Kinopolis Dashboard <dashboard@artjombecker.com>',
                    to: 'hi@artjombecker.com',
                    subject: '🍿 Neues Kinopolis Dashboard Feedback (Lokal)',
                    html: `<p>Du hast ein neues Feedback vom lokalen Dashboard erhalten:</p><blockquote style="border-left: 4px solid #ff4d4d; padding-left: 15px; margin-top: 15px;">${text}</blockquote>`
                })
            });
        } catch (error) {
            console.error('Failed to send Resend email locally', error);
        }
    }

    res.json({ success: true });
});

app.get('/api/messages', (req, res) => {
    res.json([
        {
            id: 1,
            title: "Mario Menü & Merch Verkauf",
            content: "Hallo zusammen,\n\nmit dem Start des neuen Mario Films gehen wir mit mehreren Menüs und Merch-Artikeln in den Verkauf.",
            author: "Betriebsleitung",
            created_at: "2026-03-24T16:30:00Z",
            images: [
                "./mario-poster.jpg"
            ]
        }
    ]);
});

const locations = [
    { name: "Sulzbach / Main-Taunus", slug: "su" },
    { name: "Bonn", slug: "bn" },
    { name: "Aschaffenburg", slug: "ab" },
    { name: "Bad Homburg", slug: "bh" },
    { name: "Darmstadt: KINOPOLIS", slug: "kp" },
    { name: "Darmstadt: Citydome", slug: "cd" },
    { name: "Darmstadt: Rex", slug: "rx" },
    { name: "Freiberg", slug: "fr" },
    { name: "Gießen", slug: "gi" },
    { name: "Hanau", slug: "hu" },
    { name: "Koblenz", slug: "ko" },
    { name: "Landshut", slug: "lh" },
    { name: "Rhein-Neckar / Viernheim", slug: "vi" },
    { name: "Mönchengladbach", slug: "mg" },
    { name: "Karlsruhe", slug: "ka" },
    { name: "Rosenheim", slug: "ro" }
];

app.get('/api/locations', (req, res) => {
    res.json(locations);
});

// STUBS for missing APIs to prevent frontend crashes
app.get('/api/auth/me', (req, res) => {
    res.json({ user: { email: 'admin@kinopolis.de', name: 'Local Admin', role: 'admin' } });
});

let localLostFound = [];
app.get('/api/lostfound', (req, res) => {
    const location = req.query.location || 'kp';
    res.json(localLostFound.filter(item => item.location === location));
});
app.post('/api/lostfound', (req, res) => {
    const { location, what, category, found_where, found_by, image_url } = req.body;
    const newItem = {
        id: Date.now(),
        location,
        what,
        category,
        found_where,
        found_by,
        image_url,
        created_at: new Date().toISOString()
    };
    localLostFound.unshift(newItem);
    res.json({ success: true });
});
app.delete('/api/lostfound/:id', (req, res) => {
    const id = parseInt(req.params.id);
    localLostFound = localLostFound.filter(item => item.id !== id);
    res.json({ success: true });
});

// Tech-Tickets: lightweight ticketing for cinema-tech issues (light, sound, seats, etc.)
// TODO: auth check on PATCH/DELETE (currently no auth layer in mock server)
let localTechTickets = [];

app.get('/api/tech-tickets', (req, res) => {
    const location = req.query.location || 'kp';
    const status = req.query.status; // optional filter: 'offen' | 'in_arbeit' | 'erledigt'
    let items = localTechTickets.filter(t => t.location === location);
    if (status) items = items.filter(t => t.status === status);
    res.json(items.sort((a, b) => b.created_at.localeCompare(a.created_at)));
});

app.post('/api/tech-tickets', (req, res) => {
    const { location, hall, category, description, created_by } = req.body || {};
    if (!hall || !category || !description) {
        return res.status(400).json({ error: 'hall, category, description erforderlich' });
    }
    const ticket = {
        id: Date.now(),
        location: location || 'kp',
        hall,
        category,
        description,
        status: 'offen',
        created_by: created_by || 'Anonym',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        resolved_by: null,
        resolved_at: null
    };
    localTechTickets.unshift(ticket);
    res.json({ success: true, ticket });
});

app.patch('/api/tech-tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const t = localTechTickets.find(x => x.id === id);
    if (!t) return res.status(404).json({ error: 'Nicht gefunden' });
    const { status, resolved_by } = req.body || {};
    if (status && ['offen', 'in_arbeit', 'erledigt'].includes(status)) {
        t.status = status;
        t.updated_at = new Date().toISOString();
        if (status === 'erledigt') {
            t.resolved_by = resolved_by || 'Unbekannt';
            t.resolved_at = new Date().toISOString();
        }
    }
    res.json({ success: true, ticket: t });
});

app.delete('/api/tech-tickets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    localTechTickets = localTechTickets.filter(t => t.id !== id);
    res.json({ success: true });
});

// Seating-Snapshots: row-level utilization data for cleaning-optimization analytics
// Real data: hook to Kinopolis occupancy scraping per hall+showtime
// Mock-Generator: deterministic per hallId, 4 snapshots across the day
let localSeatingSnapshots = {};
let localChecklist = {};

function generateMockSeating(hallId) {
    const seed = [...(hallId || '')].reduce((a, c) => a + c.charCodeAt(0), 0);
    const rand = (n) => Math.floor((Math.sin(seed + n) * 10000) % 1 * 10000 + 10000) % 10000 / 10000;
    const ROWS = 10;
    const SEATS_PER_ROW = 25;
    // Realistic distribution: front rows emptier, back rows fuller
    const baseOccupancy = (rowIdx) => 0.10 + (rowIdx / Math.max(1, ROWS - 1)) * 0.85; // row 0 ≈ 10%, row 9 ≈ 95%
    const makeRows = (jitter) => Array.from({ length: ROWS }, (_, i) => {
        const total = SEATS_PER_ROW;
        const occ = Math.max(0, Math.min(total, Math.round((baseOccupancy(i) + (rand(i + jitter) - 0.5) * 0.4) * total)));
        const map = Array.from({ length: total }, (_, s) => s < occ ? 'O' : 'X').join('');
        return { row: i + 1, label: `Reihe ${i + 1}`, total_seats: total, occupied: occ, seat_map: map };
    });
    const now = Date.now();
    return Array.from({ length: 4 }, (_, i) => ({
        taken_at: new Date(now - (3 - i) * 3 * 3600 * 1000).toISOString(),
        sessions: [
            { title: 'Mario', time: '14:00', rows: makeRows(i * 10) },
            { title: 'Der Kuss', time: '17:30', rows: makeRows(i * 10 + 1) },
            { title: 'Abendprogramm', time: '20:30', rows: makeRows(i * 10 + 2) }
        ]
    }));
}

app.get('/api/seating/:hallId', (req, res) => {
    const hallId = req.params.hallId;
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const key = `${hallId}_${date}`;
    if (!localSeatingSnapshots[key]) {
        localSeatingSnapshots[key] = { hall: hallId, date, snapshots: generateMockSeating(hallId) };
    }
    res.json(localSeatingSnapshots[key]);
});

app.post('/api/seating/:hallId', (req, res) => {
    const hallId = req.params.hallId;
    const date = req.query.date || new Date().toISOString().split('T')[0];
    const key = `${hallId}_${date}`;
    if (!localSeatingSnapshots[key]) localSeatingSnapshots[key] = { hall: hallId, date, snapshots: [] };
    const fallbackSessions = generateMockSeating(`${hallId}_${Date.now()}`).slice(-1)[0].sessions;
    localSeatingSnapshots[key].snapshots.push({
        taken_at: new Date().toISOString(),
        sessions: req.body && Array.isArray(req.body.sessions) && req.body.sessions.length ? req.body.sessions : fallbackSessions
    });
    res.json({ success: true, count: localSeatingSnapshots[key].snapshots.length });
});

app.get('/api/inventory', (req, res) => res.json({ waren: [], eis: [], getraenke: [], slushy: [] }));
app.get('/api/contacts', (req, res) => res.json([]));
app.get('/api/checklist', (req, res) => {
    const location = req.query.location || 'kp';
    const items = localChecklist[location] || {};
    const results = Object.keys(items).map(taskId => ({
        task_id: taskId,
        is_completed: items[taskId].is_completed ? 1 : 0,
        completed_by: items[taskId].completed_by
    }));
    res.json(results);
});
app.post('/api/checklist', (req, res) => {
    const { location, task_id, is_completed, completed_by } = req.body;
    if (!location || !task_id) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    if (!localChecklist[location]) {
        localChecklist[location] = {};
    }
    localChecklist[location][task_id] = {
        is_completed: !!is_completed,
        completed_by: completed_by || ''
    };
    res.json({ success: true });
});
app.get('/api/hall-status', (req, res) => res.json([]));
app.get('/api/task-completions', (req, res) => res.json([]));
app.get('/api/personal-need', (req, res) => res.json([]));
app.get('/api/announcements/latest', (req, res) => res.json({ success: false }));
app.get('/api/upcoming', (req, res) => res.json([]));
app.get('/api/mhd', (req, res) => res.json([]));
app.post('/api/feedback', (req, res) => res.json({ success: true }));
app.post('/api/auth/login', (req, res) => res.json({ token: 'mock-token', user: { email: 'admin@kinopolis.de', name: 'Local Admin' } }));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
