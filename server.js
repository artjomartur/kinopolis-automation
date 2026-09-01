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
    res.json({ user: { email: 'admin@kinopolis.de', name: 'Local Admin', role: 'admin', location: 'kp' } });
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

// Mock Analytics Endpoint
app.get('/api/analytics', (req, res) => {
    // Generate mock historical data for the last 7 days
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        data.push({
            date: d.toISOString().split('T')[0],
            visitors: Math.floor(Math.random() * 2000) + 500,
            occupancy_percent: Math.floor(Math.random() * 60) + 20
        });
    }
    res.json(data);
});

// Mock Chat Endpoint
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    console.log(`[LOCAL AI MOCK] received: ${message}`);
    setTimeout(() => {
        res.json({ reply: "Hallo! Ich bin der Mock-Assistent (Lokal). In der Cloudflare-Version werde ich durch echtes Llama-3 ersetzt! Du hast gefragt: " + message });
    }, 1000);
});

app.post('/api/feedback', (req, res) => res.json({ success: true }));
app.post('/api/auth/login', (req, res) => {
    const { email = '', password = '' } = req.body || {};
    const normalizedEmail = String(email).trim().toLowerCase();
    const normalizedPassword = String(password).trim();

    if ((normalizedEmail === 'admin' || normalizedEmail === 'admin@kinopolis.de') && normalizedPassword === 'admin123') {
        return res.json({
            success: true,
            token: 'mock-token',
            user: { email: 'admin@kinopolis.de', name: 'Local Admin', role: 'admin', location: 'kp' }
        });
    }

    return res.json({
        success: true,
        token: 'mock-token',
        user: { email: 'admin@kinopolis.de', name: 'Local Admin', role: 'admin', location: 'kp' }
    });
});

// Mock endpoint for historical occupancy stats
app.get('/api/stats/occupancy-history', (req, res) => {
    const location = req.query.location || 'kp';

    // Generate trend data (last 7 days)
    const trend = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        trend.push({
            date: d.toISOString().split('T')[0],
            total_visitors: Math.floor(Math.random() * 2000) + 500
        });
    }

    // Generate hourly avg data
    const hours = ['11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'];
    const hourly = hours.map(h => ({
        hour_bucket: h,
        avg_occupancy_percent: Math.floor(Math.random() * 50) + 10
    }));

    // Generate movies data
    const movies = [
        { title: 'Super Mario Bros. Film', total_sold: 1450 },
        { title: 'Dune: Part Two', total_sold: 980 },
        { title: 'John Wick: Chapter 4', total_sold: 720 },
        { title: 'Oppenheimer', total_sold: 530 },
        { title: 'Barbie', total_sold: 410 }
    ];

    res.json({ trend, hourly, movies });
});

app.post('/api/auth/setup-link', (req, res) => {
    console.log(`[LOCAL DEV] Magic link requested for ${req.body.email}`);
    res.json({ success: true, message: 'Mock Link gesendet' });
});

app.post('/api/auth/setup-complete', (req, res) => {
    console.log(`[LOCAL DEV] Setup completed for token ${req.body.setup_token} at ${req.body.location}`);
    res.json({
        success: true,
        token: 'mock-setup-token',
        user: { name: 'Local Tester', email: 'test@kinopolis.de', location: req.body.location, role: 'user' }
    });
});

const webpush = require('web-push');
const VAPID_PUBLIC_KEY = 'BCP-JGZbVBjKY1_blxAHw6bC5Ddf0nLAyPSp8q39kV7utFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8';
const VAPID_PRIVATE_KEY = 'hZ-g14sGhFkq9L9JdkRAJuwfc70Ein69PK7EzUNHj04';
webpush.setVapidDetails('mailto:test@kinopolis.local', VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

let pushSubscriptions = [];

app.post('/api/push/subscribe', (req, res) => {
    const { sub, location } = req.body;
    if (sub) {
        pushSubscriptions.push({ sub, location });
    }
    res.json({ success: true });
});

app.get('/api/push/last-notification', (req, res) => {
    res.json({
        title: 'Kinopolis Dashboard',
        body: 'Dies ist eine Test-Benachrichtigung mit Bild! 🎬',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
        icon: '/logo-kinopolis-official.png',
        tag: 'test-notification',
        data: { url: '/' }
    });
});

app.post('/api/push/test', async (req, res) => {
    const payload = JSON.stringify({
        title: '🎬 Test Push (Lokal)',
        body: 'Dies ist eine manuelle Test-Benachrichtigung vom lokalen Server.',
        data: { url: '/' }
    });

    const results = [];
    for (const item of pushSubscriptions) {
        try {
            await webpush.sendNotification(item.sub, payload);
            results.push({ status: 'Success (201)', endpoint: item.sub.endpoint.substring(0, 30) + '...' });
        } catch (err) {
            results.push({ status: 'Error', message: err.message });
        }
    }
    res.json({ results });
});

app.post('/api/push/broadcast', async (req, res) => {
    const { message, title } = req.body;
    if (!message) return res.status(400).json({ error: 'Message required' });

    const payload = JSON.stringify({
        title: title || '📢 Kinopolis Nachricht (Lokal)',
        body: message,
        icon: '/logo-kinopolis-official.png',
        data: { url: '/' }
    });

    let sent = 0;
    for (const item of pushSubscriptions) {
        try {
            await webpush.sendNotification(item.sub, payload);
            sent++;
        } catch (e) {
            console.error('Push send error', e);
        }
    }
    res.json({ sent, message: 'Nachrichten gesendet (Lokal)' });
});

// --- RESTOCK CALL API (Lokal) ---
app.post('/api/push/restock', async (req, res) => {
    const { location, item } = req.body;
    if (!item) return res.status(400).json({ error: 'Missing item' });

    const payload = JSON.stringify({
        title: '🚨 Nachschub benötigt!',
        body: `${item} an der Theke/Kasse leer! Bitte auffüllen.`,
        tag: 'restock-alert',
        data: { url: '/#restock' }
    });

    for (const subItem of pushSubscriptions) {
        try {
            await webpush.sendNotification(subItem.sub, payload);
        } catch (e) {
            console.error('Push send error', e);
        }
    }

    res.json({ success: true });
});

// --- TRANSFERLISTE API (Lokal) ---
app.post('/api/push/transfer', async (req, res) => {
    const { location, author, items, station } = req.body;
    if (!items) return res.status(400).json({ error: 'Missing items' });

    const titleStr = station ? `TL-Transferliste (${station})` : 'TL-Transferliste';
    const payload = JSON.stringify({
        title: `📝 ${titleStr} - von ${author}`,
        body: items,
        tag: 'transfer-alert',
        data: { url: '/#transfer' }
    });

    for (const subItem of pushSubscriptions) {
        try {
            await webpush.sendNotification(subItem.sub, payload);
        } catch (e) {
            console.error('Push send error', e);
        }
    }

    res.json({ success: true });
});

// --- BACKGROUND AUTOMATION (AUTO-PUSH & CHECKLIST) ---
// Poll every 5 minutes to check for ending sessions
const AUTOMATION_INTERVAL = 5 * 60 * 1000;
let notifiedSessions = new Set(); // Prevent duplicate pushes

setInterval(async () => {
    try {
        console.log('[Auto-Push Worker] Checking sessions...');
        const res = await fetch(`http://127.0.0.1:${port}/api/sessions?location=kp`);
        if (!res.ok) return;
        const halls = await res.json();
        
        const now = new Date();
        const currentTimeInt = now.getHours() * 60 + now.getMinutes();

        for (const hallData of halls) {
            if (!hallData.sessions || hallData.sessions.length === 0) continue;
            
            // Find the last session of the day in this hall
            const lastSession = hallData.sessions[hallData.sessions.length - 1];
            
            // Parse start time "HH:MM"
            const [hours, minutes] = lastSession.time.split(':').map(Number);
            const startTimeInt = hours * 60 + minutes;
            const duration = lastSession.duration || 120; // fallback to 120min
            const endTimeInt = startTimeInt + duration;
            
            const sessionKey = `${hallData.name}-${lastSession.time}`;
            
            // If the movie ends in the next 15 minutes or just ended, trigger a push!
            if (endTimeInt - currentTimeInt <= 15 && endTimeInt - currentTimeInt >= -30) {
                if (!notifiedSessions.has(sessionKey)) {
                    notifiedSessions.add(sessionKey);
                    
                    // 1. Send Push Notification
                    const payload = JSON.stringify({
                        title: '🎬 Plakatwechsel steht an!',
                        body: `Die letzte Vorstellung in ${hallData.name} (${lastSession.title}) endet in Kürze!`,
                        icon: '/logo-kinopolis-official.png',
                        data: { url: '/' }
                    });
                    
                    for (const item of pushSubscriptions) {
                        try {
                            await webpush.sendNotification(item.sub, payload);
                        } catch (e) {
                            console.error('[Auto-Push] Error sending push', e);
                        }
                    }
                    console.log(`[Auto-Push] Sent push for ${sessionKey}`);
                    
                    // 2. Add to Checklist automatically
                    if (!localChecklist['kp']) localChecklist['kp'] = {};
                    const taskId = `posterwechsel_${hallData.name.replace(/\s+/g, '_')}`;
                    if (!localChecklist['kp'][taskId]) {
                        localChecklist['kp'][taskId] = { is_completed: false, completed_by: '' };
                    }
                }
            }
        }
    } catch (e) {
        console.error('[Auto-Push Worker] Error', e);
    }
}, AUTOMATION_INTERVAL);

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port} (Accessible locally via your IP)`);
});
