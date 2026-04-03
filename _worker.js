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
            "./mario-poster.jpg"
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
        const { text, contact } = body;
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
                    from: 'Kinopolis Dashboard <dashboard@artjombecker.com>',
                    to: 'hi@artjombecker.com',
                    subject: `[Kinopolis Dashboard] Feedback${contact ? ' von ' + contact : ''}`,
                    html: `
                        <p>Du hast ein neues Feedback für das Dashboard erhalten:</p>
                        <blockquote style="border-left: 4px solid #ff4d4d; padding-left: 15px; margin-top: 15px; color: #333; font-style: italic;">
                            ${text.replace(/\n/g, '<br>')}
                        </blockquote>
                        ${contact ? `<p style="margin-top: 20px; font-size: 0.9rem; color: #666;">Absender / Kontakt: <strong>${contact}</strong></p>` : '<p style="margin-top: 20px; font-size: 0.9rem; color: #666;">Absender: Anonym</p>'}
                    `
                })
            }).catch(e => console.error('Resend Worker Error:', e));
        }

        return c.json({ success: true });
    } catch (e) {
        console.error('Feedback error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// --- PUSH NOTIFICATIONS UTILS ---
// VAPID Keys for Web Push - Proper PKCS8 format is required for SubtleCrypto
const VAPID_PUBLIC_KEY = 'BAA_OTAS3SoA2YlpqZoo2JDkSn59e33cdzjYHIEAm6reqZ_rN5JsgEeOFaKOC9sfTJJjoEZaniEe6r1X-8xCsjU';
const DEFAULT_VAPID_PRIVATE_KEY = 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgf0OOTAS3SoA2YlpqZoo2JDkSn59e33cdzjYHIEAm6regRANCAASBfDOnv9_6jn2X_D-v9_6jn2X_D-v9_6jn2X_D-v9_6jn2X_D-v9_6jn2X_D-v9_6jn2X_D-v9_6jn2X_D-v9_6jn2X_A';

function b64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}

function urlBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function createVapidHeader(endpoint, env) {
    const privateKeyStr = env.VAPID_PRIVATE_KEY || DEFAULT_VAPID_PRIVATE_KEY;
    const publicKeyStr = env.VAPID_PUBLIC_KEY || VAPID_PUBLIC_KEY;
    
    const url = new URL(endpoint);
    const audience = `${url.protocol}//${url.host}`;
    
    const header = { typ: 'JWT', alg: 'ES256' };
    const payload = {
        aud: audience,
        exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
        sub: 'mailto:artjomartur@gmail.com' 
    };

    const encoder = new TextEncoder();
    const tokenPart1 = urlBase64(encoder.encode(JSON.stringify(header)));
    const tokenPart2 = urlBase64(encoder.encode(JSON.stringify(payload)));
    
    const keyData = b64ToUint8Array(privateKeyStr);
    const privateKey = await crypto.subtle.importKey(
        'pkcs8',
        keyData.buffer,
        { name: 'ECDSA', namedCurve: 'P-256' },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        { name: 'ECDSA', hash: 'SHA-256' },
        privateKey,
        encoder.encode(`${tokenPart1}.${tokenPart2}`)
    );

    const signatureBase64 = urlBase64(signature);
    return `vapid t=${tokenPart1}.${tokenPart2}.${signatureBase64}, k=${publicKeyStr}`;
}

// --- PUSH API ENDPOINTS ---
app.post('/api/push/subscribe', async (c) => {
    try {
        const sub = await c.req.json();
        if (!sub.endpoint || !sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
            return c.json({ error: 'Invalid subscription object' }, 400);
        }

        if (c.env.DB) {
            // Upsert subscription
            await c.env.DB.prepare(`
                INSERT INTO push_subscriptions (endpoint, p256dh, auth, user_agent)
                VALUES (?, ?, ?, ?)
                ON CONFLICT(endpoint) DO UPDATE SET
                p256dh = excluded.p256dh,
                auth = excluded.auth,
                created_at = CURRENT_TIMESTAMP
            `).bind(sub.endpoint, sub.keys.p256dh, sub.keys.auth, c.req.header('user-agent')).run();
        }

        return c.json({ success: true });
    } catch (e) {
        console.error('Subscription error:', e);
        return c.json({ error: e.message }, 500);
    }
});

app.get('/api/push/last-notification', async (c) => {
    // In a real app, this would check the DB for the last notification for this specific user.
    // For now, we return a standard test payload or the last system alert.
    return c.json({
        title: 'Kinopolis Dashboard',
        body: 'Dies ist eine Test-Benachrichtigung mit Bild! 🎬',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
        icon: '/logo-kinopolis-official.png',
        tag: 'test-notification',
        data: { url: '/' }
    });
});

app.post('/api/push/test', async (c) => {
    try {
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);

        const subscriptions = await c.env.DB.prepare('SELECT * FROM push_subscriptions ORDER BY created_at DESC LIMIT 10').all();
        if (!subscriptions.results.length) return c.json({ error: 'No subscriptions found' }, 404);

        const results = [];
        for (const sub of subscriptions.results) {
            try {
                const authHeader = await createVapidHeader(sub.endpoint, c.env);
                const res = await fetch(sub.endpoint, {
                    method: 'POST',
                    headers: {
                        'TTL': '60',
                        'Authorization': authHeader
                    },
                    body: null // Sending empty body to trigger "Pull" logic in SW
                });
                results.push({ endpoint: sub.endpoint, status: res.status });
            } catch (err) {
                results.push({ endpoint: sub.endpoint, error: err.message });
            }
        }

        return c.json({ results });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// R2 Image Proxy (Fallback)
app.get('/api/images/:key', async (c) => {
    return c.json({ error: 'Not Found' }, 404);
});

app.post('/api/ai-agree', async (c) => {
    try {
        if (!c.env.AI) return c.json({ error: 'AI binding not found' }, 500);
        const response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', { prompt: 'agree' });
        return c.json({ success: true, response });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/scan-plan', async (c) => {
    try {
        if (!c.env.AI) return c.json({ error: 'AI binding not found' }, 500);

        const body = await c.req.parseBody();
        const imageFile = body.image;
        if (!imageFile) return c.json({ error: 'No image provided' }, 400);

        const buffer = await imageFile.arrayBuffer();
        const inputs = {
            image: Array.from(new Uint8Array(buffer)),
            prompt: "Dieser Screenshot zeigt einen Kinopolis 'Auslassplan'. Extrahiere die Tabelle und gib ausschließlich ein valides JSON-Array zurück. Die Spalten sind: Kino #, Film, Start, Start Credits, Ende. Ignoriere Kopfzeilen. Das JSON soll folgende Struktur haben: [{ \"kino\": \"...\", \"movie\": \"...\", \"start\": \"...\", \"credits\": \"...\", \"end\": \"...\" }]. Antworte NUR mit dem JSON-String."
        };

        const response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', inputs);
        
        // Basic cleaning of AI output if needed (remove markdown formatting)
        let jsonStr = response.description || response.response || '';
        jsonStr = jsonStr.replace(/```json|```/g, '').trim();
        
        try {
            const data = JSON.parse(jsonStr);
            return c.json({ success: true, data });
        } catch (e) {
            console.error('AI JSON Parse Error:', jsonStr);
            return c.json({ error: 'Could not parse AI response as JSON', raw: jsonStr }, 500);
        }
    } catch (e) {
        console.error('Scan error:', e);
        return c.json({ error: e.message }, 500);
    }
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
