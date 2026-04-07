import { Hono } from 'hono';
import * as cheerio from 'cheerio';
import { Buffer } from 'node:buffer';

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
    if (!c.env.DB) return c.json(STATIC_MESSAGES);
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM messages ORDER BY created_at DESC LIMIT 20').all();
        return c.json(results.length ? results : STATIC_MESSAGES);
    } catch (e) {
        return c.json(STATIC_MESSAGES);
    }
});

app.post('/api/messages', async (c) => {
    try {
        const { title, content, author, image_url } = await c.req.json();
        if (!title || !content) return c.json({ error: 'Title and content required' }, 400);

        if (c.env.DB) {
            await c.env.DB.prepare(
                'INSERT INTO messages (title, content, author, image_url) VALUES (?, ?, ?, ?)'
            ).bind(title, content, author || 'System', image_url || null).run();
            
            // Broadcast push
            await sendPushToAll(c.env, {
                title: 'Konfidentielle Mitteilung: ' + title,
                body: content.length > 100 ? content.substring(0, 97) + '...' : content,
                tag: 'internal-message'
            });
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/messages/:id', async (c) => {
    const id = c.req.param('id');
    if (c.env.DB) {
        await c.env.DB.prepare('DELETE FROM messages WHERE id = ?').bind(id).run();
    }
    return c.json({ success: true });
});

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

// VAPID Keys for Web Push - JWK format is most reliable for SubtleCrypto in Workers
// Note: These keys should ideally be in c.env secrets
const VAPID_KEYS = {
    publicKey: 'BCP-JGZbVBjKY1_blxAHw6bC5Ddf0nLAyPSp8q39kV7utFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8',
    privateKeyJWK: {
        kty: 'EC', crv: 'P-256', 
        x: 'I_4kZltUGMpjX9uXEAfDpsLkN1_ScsDI9Knyrf2RXu4',
        y: 'tFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8',
        d: 'hZ-g14sGhFkq9L9JdkRAJuwfc70Ein69PK7EzUNHj04',
        ext: true
    }
};

function urlBase64(buffer) {
    return Buffer.from(buffer).toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function createVapidHeader(endpoint, env) {
    const publicKeyStr = env.VAPID_PUBLIC_KEY || VAPID_KEYS.publicKey;
    const privateKeyJWK = env.VAPID_PRIVATE_KEY_JWK ? JSON.parse(env.VAPID_PRIVATE_KEY_JWK) : VAPID_KEYS.privateKeyJWK;
    
    const audience = new URL(endpoint).origin;
    const encoder = new TextEncoder();
    
    const header = urlBase64(encoder.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
    const payload = urlBase64(encoder.encode(JSON.stringify({
        aud: audience,
        exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
        sub: 'mailto:artjomartur@gmail.com'
    })));

    const privateKey = await crypto.subtle.importKey(
        'jwk', privateKeyJWK, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
    );

    const signature = await crypto.subtle.sign(
        { name: 'ECDSA', hash: 'SHA-256' },
        privateKey,
        encoder.encode(`${header}.${payload}`)
    );

    return `Vapid t=${header}.${payload}.${urlBase64(signature)}, k=${publicKeyStr}`;
}

function base64ToBytes(base64) {
    const binaryString = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function encryptPayload(sub, payload) {
    const encoder = new TextEncoder();
    const clientPublicKey = await crypto.subtle.importKey(
        'raw', base64ToBytes(sub.p256dh), 
        { name: 'ECDH', namedCurve: 'P-256' }, 
        true, []
    );
    const clientAuth = base64ToBytes(sub.auth);
    
    // 1. Generate Ephemeral Key Pair
    const localKeyPair = await crypto.subtle.generateKey(
        { name: 'ECDH', namedCurve: 'P-256' }, 
        true, ['deriveBits']
    );
    const localPublicKey = await crypto.subtle.exportKey('raw', localKeyPair.publicKey);
    
    // 2. Derive Shared Secret
    const sharedSecret = await crypto.subtle.deriveBits(
        { name: 'ECDH', public: clientPublicKey }, 
        localKeyPair.privateKey, 
        256
    );
    
    // 3. HKDF Key Derivation
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // PRK = HKDF-Extract(salt=auth_secret, IKM=shared_secret)
    const authKey = await crypto.subtle.importKey('raw', clientAuth, 'HKDF', false, ['deriveBits']);
    const prk = await crypto.subtle.deriveBits(
        { name: 'HKDF', hash: 'SHA-256', salt: clientAuth, info: encoder.encode('WebPush: info\0') },
        authKey, 256
    );
    // Actually standard WebPush: info includes the client/server keys. 
    // For simplicity and compatibility with most Push Services, we use the standard HKDF-Expand process.
    
    // WebPush encryption is tricky. Let's use the specific RFC 8291 labels.
    const ikm = await crypto.subtle.importKey('raw', sharedSecret, 'HKDF', false, ['deriveBits']);
    const ikm_info = new Uint8Array([...encoder.encode('WebPush: info\0'), ...base64ToBytes(sub.p256dh), ...new Uint8Array(localPublicKey)]);
    const derivedIKM = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: clientAuth, info: ikm_info }, ikm, 256);
    
    const cekKey = await crypto.subtle.importKey('raw', derivedIKM, 'HKDF', false, ['deriveBits']);
    const cek = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info: encoder.encode('Content-Encoding: aes128gcm\0') }, cekKey, 128);
    const nonce = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info: encoder.encode('Content-Encoding: nonce\0') }, cekKey, 96);
    
    // 4. Encrypt Payload
    const payloadBytes = encoder.encode(JSON.stringify(payload));
    const padding = new Uint8Array([0, 0]); // Minimal padding
    const record = new Uint8Array([...payloadBytes, 2]); // 2 is the delimiter for end of record
    
    const aesKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce, tagLength: 128 }, aesKey, record);
    
    // 5. Combine salt + rs + idlen + keyid + ciphertext
    // For aes128gcm, the body starts with: salt(16) + rs(4) + idlen(1) + publickey
    const rs = new Uint8Array([0, 0, 16, 0]); // Record size (4096 default)
    const idlen = new Uint8Array([localPublicKey.byteLength]);
    const body = new Uint8Array([...salt, ...rs, ...idlen, ...new Uint8Array(localPublicKey), ...new Uint8Array(ciphertext)]);
    
    return body;
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

        const subscriptions = await c.env.DB.prepare('SELECT * FROM push_subscriptions ORDER BY created_at DESC LIMIT 5').all();
        if (!subscriptions.results.length) return c.json({ error: 'No subscriptions found' }, 404);

        const results = [];
        for (const sub of subscriptions.results) {
            try {
                const authHeader = await createVapidHeader(sub.endpoint, c.env);
                
                // Construct a minimal payload for test
                const payload = {
                    title: '🎬 Test Push',
                    body: 'Dies ist eine manuelle Test-Benachrichtigung.',
                    data: { url: '/' }
                };

                const encryptedBody = await encryptPayload(sub, payload);

                const res = await fetch(sub.endpoint, {
                    method: 'POST',
                    headers: { 
                        'TTL': '60', 
                        'Authorization': authHeader,
                        'Content-Encoding': 'aes128gcm',
                        'Content-Type': 'application/octet-stream'
                    },
                    body: encryptedBody
                });
                
                const responseText = await res.text();
                
                if (res.status === 404 || res.status === 410) {
                    await c.env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(sub.endpoint).run();
                    results.push({ status: 'Expired (' + res.status + ')', endpoint: sub.endpoint.substring(0, 30) + '...' });
                } else if (!res.ok) {
                    console.error('Push Service Error:', res.status, responseText);
                    results.push({ status: 'Error ' + res.status, message: responseText, endpoint: sub.endpoint.substring(0, 30) + '...' });
                } else {
                    results.push({ status: 'Success (201)', endpoint: sub.endpoint.substring(0, 30) + '...' });
                }
            } catch (err) {
                console.error('Push loop error:', err);
                results.push({ status: 'Crypto/Network Error', message: err.message });
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
        const binaryArray = [...new Uint8Array(buffer)];
        const prompt = "Dieser Foto zeigt einen gedruckten Kinopolis 'Auslassplan'. Extrahiere die Tabelle und gib ausschließlich ein valides JSON-Array zurück. Die Tabelle hat 5 Spalten: 1. Saal (z.B. Saal1), 2. Startzeit (HH:MM:SS), 3. Ende Credits (HH:MM:SS), 4. Ende Film (HH:MM:SS), 5. Filmtitel. Ignoriere Kopfzeilen. Das JSON soll folgende Struktur haben: [{ \"hall\": \"...\", \"movie\": \"...\", \"start_time\": \"...\", \"credits_time\": \"...\", \"end_time\": \"...\" }]. Antworte NUR mit dem JSON-String.";
        
        let response;
        try {
            console.log('Trying Llama 3.2 Vision (Binary PNG)...');
            response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', {
                image: binaryArray,
                prompt: prompt
            });
        } catch (err) {
            console.error('Llama 3.2 binary failed, attempting license agree/retry:', err);
            
            // Safety: Unlock AI just in case
            await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', { prompt: "agree" }).catch(() => {});
            
            // Retry with Messages API as last resort
            response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', {
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: prompt },
                            { type: 'image', image: Buffer.from(buffer).toString('base64') }
                        ]
                    }
                ]
            });
        }

        if (!response) {
            throw new Error('AI analysis failed after multiple attempts');
        }

        console.log('AI Response:', JSON.stringify(response));
        
        let jsonStr = response?.description || response?.response || '';
        if (typeof response === 'string') jsonStr = response;
        jsonStr = jsonStr.replace(/```json|```/g, '').trim();
        
        try {
            const data = JSON.parse(jsonStr);
            
            // Save to D1
            if (c.env.DB && Array.isArray(data)) {
                const today = new Date().toISOString().split('T')[0];
                for (const row of data) {
                    await c.env.DB.prepare(`
                        INSERT INTO scanned_plans (hall, movie, start_time, credits_time, end_time, date)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ON CONFLICT(hall, movie, date) DO UPDATE SET
                        start_time = excluded.start_time,
                        credits_time = excluded.credits_time,
                        end_time = excluded.end_time
                    `).bind(row.hall, row.movie, row.start_time, row.credits_time, row.end_time, today).run();
                }
            }
            
            return c.json({ success: true, data });
        } catch (e) {
            console.error('AI JSON Parse Error:', jsonStr);
            return c.json({ error: 'JSON Parse Error', raw: jsonStr }, 500);
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

// --- BROADCAST HELPER ---
async function sendPushToAll(env, payload) {
    if (!env.DB) return;
    
    const subscriptions = await env.DB.prepare('SELECT * FROM push_subscriptions').all();
    const results = [];
    
    for (const sub of subscriptions.results) {
        try {
            const authHeader = await createVapidHeader(sub.endpoint, env);
            const encryptedBody = await encryptPayload(sub, payload);

            const res = await fetch(sub.endpoint, {
                method: 'POST',
                headers: { 
                    'TTL': '3600', 
                    'Authorization': authHeader,
                    'Content-Encoding': 'aes128gcm',
                    'Content-Type': 'application/octet-stream'
                },
                body: encryptedBody
            });
            
            if (res.status === 404 || res.status === 410) {
                await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(sub.endpoint).run();
            }
            results.push({ status: res.status });
        } catch (e) {
            results.push({ error: e.message });
        }
    }
    return results;
}

export default {
    async fetch(request, env, ctx) {
        if (request.url.includes('/api/')) {
            return app.fetch(request, env, ctx);
        }
        
        try {
            if (env.ASSETS) {
                const response = await env.ASSETS.fetch(request);
                if (response.status !== 404) return response;
            }
        } catch (e) {
            console.error('Asset fetch error:', e);
        }
        
        return app.fetch(request, env, ctx);
    },

    async scheduled(event, env, ctx) {
        // Run Kinopolis Cron logic
        console.log('Running Scheduled Push Checks...');
        if (!env.DB) return;

        // 1. Fetch current sessions for Darmstadt (kp)
        // We use the internal fetch logic or just Call our own API
        const baseUrl = 'https://kinopolis-automation.artjombecker.com'; // Change to absolute if needed or use env
        const res = await fetch('https://www.kinopolis.de/kp/programm');
        if (!res.ok) return;

        // For simplicity in the worker, we might want a simpler way to get the session JSON
        // Since the worker logic for parsing is already in app.get('/api/sessions'),
        // we can theoretically call Hono internally or just replicate the fetch.
        // Let's use the local API endpoint if possible:
        const sessionsRes = await app.request('/api/sessions?location=kp', {}, env);
        if (!sessionsRes.ok) return;
        const halls = await sessionsRes.json();
        
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        
        for (const hall of halls) {
            for (const s of hall.sessions) {
                if (!s.time || !s.time.includes(':')) continue;
                const [h, m] = s.time.split(':').map(Number);
                const startMin = h * 60 + m;
                const diff = startMin - currentMinutes;

                // --- ZE ALERT ---
                if (diff > 0 && diff <= 15 && s.sold > 50) {
                    const alertHash = `ze-${hall.name}-${s.time}-${s.title}`;
                    const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                    
                    if (!existing) {
                        await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                        await sendPushToAll(env, {
                            title: '🛂 ZE Nötig: ' + hall.name,
                            body: `${s.title} beginnt in ${diff} Min. (${s.sold} Gäste). Bitte Ausweise kontrollieren!`,
                            tag: 'ze-alert',
                            data: { url: '/' }
                        });
                    }
                }

                // --- POSTER ALERT ---
                // Movie running for ~30 mins
                if (diff < 0 && diff >= -40 && diff <= -30) {
                    const alertHash = `poster-${hall.name}-${s.time}-${s.title}`;
                    const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                    
                    if (!existing) {
                        await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                        await sendPushToAll(env, {
                            title: '🖼️ Plakatwechsel: ' + hall.name,
                            body: `${s.title} läuft seit 30 Min. Das Plakat kann jetzt gewechselt werden.`,
                            tag: 'poster-alert',
                            data: { url: '/' }
                        });
                    }
                }
            }
        }

        // 2. Check SCANNED PLANS for Poster Changes
        const today = new Date().toISOString().split('T')[0];
        const scannedResults = await env.DB.prepare('SELECT * FROM scanned_plans WHERE date = ?').bind(today).all();
        
        for (const row of scannedResults.results) {
            if (!row.credits_time || !row.credits_time.includes(':')) continue;
            const [h, m] = row.credits_time.split(':').map(Number);
            const alertMin = h * 60 + m;
            const diff = alertMin - currentMinutes;

            // Trigger when credits start (or slightly before/after)
            if (diff >= -5 && diff <= 5) {
                const alertHash = `scanned-poster-${row.hall}-${row.credits_time}-${row.movie}`;
                const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                
                if (!existing) {
                    await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                    await sendPushToAll(env, {
                        title: '🖼️ Plakatwechsel: ' + row.hall,
                        body: `Laut Plan: ${row.movie} Credits beginnen jetzt (${row.credits_time}). Plakat bereit machen!`,
                        tag: 'poster-alert',
                        data: { url: '/' }
                    });
                }
            }
        }
    }
};
