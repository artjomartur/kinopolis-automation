import { Hono } from 'hono';
import * as cheerio from 'cheerio';

const app = new Hono();

// Helper for consistent Kinopolis requests
async function fetchKinopolis(url) {
    return await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    });
}

app.get('/api/locations', (c) => {
    const locations = [
        { name: 'Aschaffenburg: KINOPOLIS', slug: 'ab' },
        { name: 'Bad Godesberg: KINOPOLIS', slug: 'bn' },
        { name: 'Bad Homburg: KINOPOLIS', slug: 'bh' },
        { name: 'Darmstadt: KINOPOLIS', slug: 'kp' },
        { name: 'Darmstadt: Citydome', slug: 'cd' },
        { name: 'Darmstadt: Rex', slug: 'rx' },
        { name: 'Freiberg: KINOPOLIS', slug: 'fr' },
        { name: 'Gießen: Kinocenter', slug: 'gi' },
        { name: 'Gießen: KINOPOLIS', slug: 'kg' },
        { name: 'Hamburg HafenCity: KINOPOLIS', slug: 'hh' },
        { name: 'Hanau: KINOPOLIS', slug: 'hu' },
        { name: 'Karlsruhe: Universum-City', slug: 'ka' },
        { name: 'Koblenz: KINOPOLIS', slug: 'ko' },
        { name: 'Landshut: KINOPOLIS', slug: 'lh' },
        { name: 'Rosenheim: KINOPOLIS', slug: 'ro' },
        { name: 'Sulzbach / MTZ: KINOPOLIS', slug: 'su' },
        { name: 'Viernheim / RNZ: KINOPOLIS', slug: 'vi' }
    ];
    return c.json(locations);
});

app.get('/api/sessions', async (c) => {
    const location = c.req.query('location') || 'kp';
    const dateStr = c.req.query('date') || new Date().toISOString().split('T')[0];
    const targetUrl = `https://www.kinopolis.de/${location}/programm?date=${dateStr}`;
    
    console.log(`Fetching sessions for ${location} on ${dateStr}`);
    
    try {
        const response = await fetchKinopolis(targetUrl);
        if (!response.ok) {
            console.error(`Kinopolis returned status ${response.status}`);
            return c.json({ error: `Kinopolis error: ${response.status}` }, response.status);
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);

        const d = new Date(dateStr);
        const dayNum = d.getDate();
        const monthNum = d.getMonth() + 1;
        const today = new Date();
        const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
        const todayISO = today.toISOString().split('T')[0];
        const tomorrowISO = tomorrow.toISOString().split('T')[0];
        
        const navDateMap = new Map(); // Global map for back-compatibility if needed elsewhere, but we now use per-movie map
        
        // Note: Global navDateMap is now less critical as we parse dates per-movie below.
        // We still keep the mapping here if we ever need a site-wide date reference.

        const sessionMap = new Map(); // Key: date-perfId or date-time-hall-title, Value: session object
        
        $('section.movie, .prog2__movie').each((i, movieEl) => {
            const title = $(movieEl).find('.hl-link, .prog2__movie-title').first().text().trim();
            if (!title) return;
            const poster = $(movieEl).find('.prog2__movie-img img, img.img-fluid').first().attr('src');
            const durationText = $(movieEl).find('.movie__specs-el, .prog2__movie-info-item, .prog2__infos').text().trim();
            const durationMatch = durationText.match(/Dauer:\s*(\d+)\s*Minuten/i) || durationText.match(/(\d+)\s*Min\.?/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 0;

            let fsk = "FSK ?";
            const fskImg = $(movieEl).find('img[src*="FSK"]').first().attr('alt');
            if (fskImg && fskImg.includes('FSK')) {
                fsk = fskImg;
            } else {
                const fskMatch = durationText.match(/ab\s*(\d+)\s*Jahre/i) || durationText.match(/FSK\s*(\d+)/i);
                if (fskMatch) fsk = `FSK ${fskMatch[1]}`;
            }

            // Build movie-specific date map
            const movieNavDateMap = new Map();
            $(movieEl).find('.prog-nav__item').each((navIdx, navEl) => {
                const navText = $(navEl).text().trim().toLowerCase();
                const dateMatch = navText.match(/(\d{2})\.(\d{2})\./);
                
                let navDate = '';
                if (navText.includes('heute')) navDate = todayISO;
                else if (navText.includes('morgen')) navDate = tomorrowISO;
                else if (dateMatch) {
                    const year = today.getFullYear() + (parseInt(dateMatch[2]) < today.getMonth() + 1 ? 1 : 0);
                    navDate = `${year}-${dateMatch[2]}-${dateMatch[1]}`;
                }
                if (navDate) movieNavDateMap.set(navIdx, navDate);
            });

            $(movieEl).find('.prog-day__wrapper').each((dayIndex, wrapper) => {
                const actualDate = movieNavDateMap.get(dayIndex);
                if (!actualDate) return;

                $(wrapper).find('.prog2__cont, .prog2__movie-session').each((j, sessionEl) => {
                    const perfId = $(sessionEl).attr('data-performance-id');
                    const time = $(sessionEl).find('.prog2__time').first().text().trim();
                    if (!time) return;
                    
                    let hallTextContent = $(sessionEl).find('.prog2__hall-num > div:first-child').text().trim();
                    if (!hallTextContent) hallTextContent = $(sessionEl).find('.prog2__hall-num').text().replace(/i$/, '').trim();
                    const hall = hallTextContent;
// ... (rest of the session parsing remains similar but now uses actualDate correctly)

                    const occupancyText = $(sessionEl).text().trim();
                    let capacity = 0;
                    let freePercent = 95;
                    const seatsEl = $(sessionEl).find('.prog2__seats');
                    if (seatsEl.length) capacity = parseInt(seatsEl.text().replace(/\D/g, '')) || 0;
                    
                    const scaleEl = $(sessionEl).find('.prog2__scale');
                    if (scaleEl.length) {
                        const percentMatch = scaleEl.text().match(/(\d+)%/);
                        if (percentMatch) freePercent = parseInt(percentMatch[1]);
                    }
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
                    if (freePercentMatch && (!scaleEl.length || freePercent === 95)) freePercent = parseInt(freePercentMatch[1]);
                    
                    const seatingAttr = $(sessionEl).find('[data-seating]').attr('data-seating');
                    if (capacity === 0 && seatingAttr) {
                        try {
                            const parsed = JSON.parse(seatingAttr);
                            if (Array.isArray(parsed) && parsed.length > 0 && parsed[0] > 10) capacity = parsed[0];
                        } catch(e) {}
                    }

                    let sold = 0;
                    if (capacity > 0) {
                        sold = Math.round(capacity * (1 - freePercent / 100));
                        if (freeCountMatch) sold = capacity - parseInt(freeCountMatch[1]);
                        if (sold < 0) sold = 0;
                    }
                    
                    const isBookable = !$(sessionEl).hasClass('performance_expired') && 
                                      !occupancyText.includes('nicht mehr buchbar') && 
                                      !occupancyText.includes('ausverkauft');

                    const sessionObj = { title, poster: poster ? (poster.startsWith('http') ? poster : `https://www.kinopolis.de${poster}`) : null, 
                                       time, hall, duration, capacity, freePercent, sold, isBookable, performanceId: perfId, date: actualDate, fsk };

                    const key = `${actualDate}-${perfId || (time + '-' + hall + '-' + title)}`;
                    const existing = sessionMap.get(key);
                    
                    // Keep the best version
                    if (!existing || (existing.capacity === 0 && capacity > 0) || (!existing.isBookable && isBookable)) {
                        sessionMap.set(key, sessionObj);
                    }
                });
            });
        });

        // Filter for exactly the requested date
        let sessions = Array.from(sessionMap.values()).filter(s => s.date === dateStr);

        // Filter out Darmstadt extra events
        if (location === 'kp') {
            sessions = sessions.filter(s => {
                return !(s.hall.includes('Helia') || s.hall.includes('Pali') || 
                         s.hall.includes('Rex') || s.hall.includes('Classic') || 
                         s.hall.includes('Broadway') || s.hall.includes('Bambi') || s.hall.includes('Festival'));
            });
        }

        const halls = {};
        sessions.forEach(s => { if (!halls[s.hall]) halls[s.hall] = []; halls[s.hall].push(s); });
        const sortedHalls = Object.keys(halls).sort().map(name => ({ name, sessions: halls[name].sort((a, b) => a.time.localeCompare(b.time)) }));
        return c.json(sortedHalls);
    } catch (error) {
        console.error('Worker error:', error);
        return c.json({ error: error.message }, 500);
    }
});

// Internal Messages API (Simplified: Static for now)
const STATIC_MESSAGES = [
    {
        id: 1,
        title: "Mario Menü & Merch Verkauf",
        content: "Hallo zusammen,\n\nmit dem Start des neuen Mario Films gehen wir mit mehreren Menüs und Merch-Artikeln in den Verkauf.\n\nWICHTIG: Der 'Yoshi-Eimer' darf von Mitarbeitenden nicht gekauft werden. (Kein Mitarbeiterinnengeschenk, kein Einkaufspreis und auch nicht als Vollpreis).\n\nGrund dafür ist die schon jetzt sehr hohe Nachfrage von Gästen gepaart mit der Tatsache, dass wir nur sehr wenige zugesendet bekommen haben.\n\nAlles ist, wie immer, buchbar über etwaige Barcodes auf den Produkten oder über das Touchscreen unter 'Packages' oder 'Merch'.",
        author: "Betriebsleitung",
        created_at: "2026-03-24T16:30:00Z",
        images: [
            "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=600"
        ]
    }
];

app.get('/api/messages', async (c) => {
    return c.json(STATIC_MESSAGES);
});

// Post and Delete disabled for now as per user request
app.post('/api/messages', (c) => c.json({ error: 'Disabled' }, 403));
app.delete('/api/messages/:id', (c) => c.json({ error: 'Disabled' }, 403));

// Handle Feedback submission
app.post('/api/feedback', async (c) => {
    try {
        const body = await c.req.json();
        const { text } = body;
        if (!text) return c.json({ error: 'Text is required' }, 400);

        if (c.env && c.env.DB) {
            await c.env.DB.prepare('INSERT INTO feedback (content) VALUES (?)').bind(text).run();
        } else {
            console.log(`[WORKER] Mock feedback stored: ${text}`);
        }
        
        // --- RESEND EMAIL INTEGRATION ---
        // Best practice via Cloudflare Env: const key = c.env.RESEND_API_KEY
        const key = c.env && c.env.RESEND_API_KEY;

        if (key) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
                body: JSON.stringify({
                    from: 'onboarding@resend.dev',
                    to: 'hi@artjombecker.com',
                    subject: '[Kinopolis Dashbord] Feedback',
                    html: `<p>Du hast ein neues Feedback für das Dashboard erhalten:</p><blockquote style="border-left: 4px solid #ff4d4d; padding-left: 15px; margin-top: 15px; color: #333;">${text}</blockquote>`
                })
            }).catch(e => console.error('Resend Worker Error:', e));
        }

        return c.json({ success: true });
    } catch (e) {
        console.error('Feedback error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// R2 Image Proxy (Fallback)
app.get('/api/images/:key', async (c) => {
    return c.json({ error: 'Not Found' }, 404);
});

// JSON fallback for 404
app.notFound((c) => {
    return c.json({ error: 'Not Found', path: c.req.path }, 404);
});

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        // If it's an API request, let Hono handle it
        if (url.pathname.startsWith('/api/')) {
            return app.fetch(request, env, ctx);
        }
        // Otherwise serve static assets
        return env.ASSETS.fetch(request);
    }
};
