require('dotenv').config();
const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
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

        // 1. Pre-fetch all allowed performance IDs for the requested date from navigation items
        // Kinopolis might have multiple .prog-nav__item for the same day (e.g., in different sliders)
        const d = new Date(dateStr);
        const dayNum = d.getDate();
        const monthNum = d.getMonth() + 1;
        const shortDateStr = `${dayNum < 10 ? '0' : ''}${dayNum}.${monthNum < 10 ? '0' : ''}${monthNum}.`;

        let allowedPerformanceIds = new Set();
        $('.prog-nav__item').each((_, navEl) => {
            const navText = $(navEl).text().trim();
            // Check for "Heute" or the specific date string
            if (navText.includes('Heute') || navText.includes(shortDateStr)) {
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
                    from: 'onboarding@resend.dev',
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
            created_at: "2026-03-24T16:30:00Z"
        }
    ]);
});

const locations = [
    { name: "Sulzbach / Main-Taunus", slug: "su" },
    { name: "Bonn", slug: "bn" },
    { name: "Aschaffenburg", slug: "as" },
    { name: "Bad Homburg", slug: "bh" },
    { name: "Darmstadt: KINOPOLIS", slug: "kp" },
    { name: "Darmstadt: Citydome", slug: "cd" },
    { name: "Darmstadt: Rex", slug: "rx" },
    { name: "Freiberg", slug: "fr" },
    { name: "Gießen", slug: "gi" },
    { name: "Hanau", slug: "han" },
    { name: "Koblenz", slug: "ko" },
    { name: "Landshut", slug: "land" },
    { name: "Rhein-Neckar / Viernheim", slug: "rn" },
    { name: "Mönchengladbach", slug: "mg" },
    { name: "Karlsruhe", slug: "ka" },
    { name: "Rosenheim", slug: "ro" }
];

app.get('/api/locations', (req, res) => {
    res.json(locations);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
