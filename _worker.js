import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import * as cheerio from 'cheerio';
import { Buffer } from 'node:buffer';

const app = new Hono();

app.onError((err, c) => {
    console.error('Fatal Worker Error:', err);
    return c.json({ error: 'Internal Server Error', message: err.message }, 500);
});

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

// --- AUTHENTICATION HELPERS ---
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const JWT_SECRET = 'kinopolis-secret-2026'; // Ideally use c.env.JWT_SECRET

// --- AUTHENTICATION API ---
app.post('/api/auth/register', async (c) => {
    try {
        const { email, name, location, employee_number, password } = await c.req.json();
        if (!email || !name || !location || !password) {
            return c.json({ error: 'Alle Pflichtfelder ausfüllen' }, 400);
        }

        if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);

        const password_hash = await hashPassword(password);
        
        await c.env.DB.prepare(
            'INSERT INTO users (email, name, location, employee_number, password_hash) VALUES (?, ?, ?, ?, ?)'
        ).bind(email.toLowerCase(), name, location, employee_number || null, password_hash).run();

        return c.json({ success: true });
    } catch (e) {
        if (e.message.includes('UNIQUE constraint failed')) {
            return c.json({ error: 'Diese E-Mail Adresse wird bereits verwendet' }, 400);
        }
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/auth/login', async (c) => {
    try {
        const { email, password } = await c.req.json();
        if (!email || !password) return c.json({ error: 'E-Mail und Passwort erforderlich' }, 400);

        if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);

        const password_hash = await hashPassword(password);
        const user = await c.env.DB.prepare(
            'SELECT id, email, name, location, employee_number, role FROM users WHERE email = ? AND password_hash = ?'
        ).bind(email.toLowerCase(), password_hash).first();

        if (!user) return c.json({ error: 'Ungültige Anmeldedaten' }, 401);

        const token = await sign({
            id: user.id,
            email: user.email,
            name: user.name,
            location: user.location,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
        }, JWT_SECRET);

        return c.json({ 
            success: true, 
            token,
            user: {
                name: user.name,
                location: user.location,
                role: user.role
            }
        });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.get('/api/auth/me', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = await verify(token, JWT_SECRET);
        return c.json({ user: payload });
    } catch (e) {
        return c.json({ error: 'Ungültiger Token' }, 401);
    }
});

app.get('/api/movie-details', async (c) => {
    const url = c.req.query('url');
    if (!url) return c.json({ error: 'Missing movie URL' }, 400);

    try {
        const response = await fetchKinopolis(url);
        if (!response.ok) return c.json({ error: 'Could not fetch movie details' }, 500);
        
        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('h1.hl, h1, .movie__title, .movie-detail__title, .prog2__movie-title').first().text().trim();
        
        // Synopsis: .text is the primary Kinopolis class for the description
        let synopsis = '';
        const synopsisSelectors = [
            '.filmdetail__content .text', '#filmdetail .text',
            '.movie__synopsis', '.movie-detail__description', '.movie-info__description',
            '.prog2__synopsis', '.movie__description', '.film-description',
            '.text'
        ];
        
        for (const sel of synopsisSelectors) {
            const elements = $(sel);
            elements.each((i, el) => {
                const t = $(el).text().trim();
                // Avoid the cinema selection list text
                if (t && t.length > 50 && !t.includes('Bitte wählen Sie ein Kino aus')) {
                    synopsis = t;
                    return false; // break each
                }
            });
            if (synopsis) break;
        }
        
        // Fallback: og:description meta tag
        if (!synopsis || synopsis.length < 50) {
            const ogDesc = $('meta[property="og:description"], meta[name="description"]').first().attr('content');
            if (ogDesc && ogDesc.length > 50 && !ogDesc.toLowerCase().includes('kinoprogramm')) {
                synopsis = ogDesc;
            }
        }
        
        // Fallback: longest paragraph in main content
        if (!synopsis || synopsis.length < 50) {
            let longestP = '';
            $('main p, article p, .content p, section p').each((i, el) => {
                const t = $(el).text().trim();
                if (t.length > longestP.length && t.length > 80 && !t.includes('Kinopolis.de') && !t.match(/^\d{2}:\d{2}$/)) {
                    longestP = t;
                }
            });
            if (longestP) synopsis = longestP;
        }
        
        // Strip English subtitle that appears on some Kinopolis pages
        synopsis = synopsis.replace(/\s*English:.*$/si, '').trim();

        // Cast: .movie-cast is the Kinopolis class for cast info
        const castEl = $('.movie-cast');
        let cast = '';
        if (castEl.length) {
            cast = castEl.text().replace(/\s+/g, ' ').trim();
        }

        const durationMatch = html.match(/(\d+)\s*Minuten/i) || html.match(/(\d+)\s*Min\.?/i);
        const duration = durationMatch ? durationMatch[1] : null;

        const specs = $('.movie__specs, .prog2__movie-info, .movie-detail__specs').text();
        const fskMatch = specs.match(/ab\s*(\d+)\s*Jahre/i) || specs.match(/FSK\s*(\d+)/i)
            || html.match(/FSK[\s-]*(\d+)/i);
        const fsk = fskMatch ? `FSK ${fskMatch[1]}` : 'FSK ?';

        const genreEl = $('.movie__specs-el:contains("Genre"), .prog2__movie-info-item:contains("Genre"), [class*="genre"], .filmdetail__specs-item').first();
        const genre = genreEl.text().replace(/Genre:?/i, '').trim() || 'Film';

        // Trailer Extraction
        let trailerUrl = null;
        const videoId = $('[data-video-id]').first().attr('data-video-id');
        if (videoId) {
            trailerUrl = `https://www.youtube.com/embed/${videoId}`;
        } else {
            const ytLink = $('a[href*="youtube.com/watch"], a[href*="youtu.be"]').first().attr('href');
            if (ytLink) {
                const ytMatch = ytLink.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
                if (ytMatch) trailerUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
            }
        }

        return c.json({
            title,
            synopsis: synopsis || 'Keine Beschreibung verfügbar.',
            cast,
            duration,
            fsk,
            genre,
            trailerUrl,
            url
        });
    } catch (e) {
        console.error('movie-details error:', e);
        return c.json({ error: 'Backend error while scraping details' }, 500);
    }
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

            // LINK extraction
            const detailLink = $(movieEl).find('.hl-link, .prog2__movie-title, a[href*="/film/"]').first().attr('href');
            const movieLink = detailLink ? (detailLink.startsWith('http') ? detailLink : `https://www.kinopolis.de${detailLink}`) : null;

            // Build movie-specific date map
            const movieNavDateMap = new Map();
            $(movieEl).find('.prog-nav__item[data-index]').each((navIdx, navEl) => {
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
                // If there's no navigation tab for this day, assume it's the requested date
                const actualDate = movieNavDateMap.get(dayIndex) || dateStr;
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
                                       time, hall, duration, capacity, freePercent, sold, isBookable, performanceId: perfId, date: actualDate, fsk, movieLink };

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

        // Filter out Darmstadt extra events (strict separation KP vs CD)
        const cdHalls = ['helia', 'pali', 'rex', 'classic', 'broadway', 'bambi', 'festival'];
        if (location === 'kp') {
            sessions = sessions.filter(s => {
                const h = (s.hall || '').toLowerCase();
                return !cdHalls.some(k => h.includes(k));
            });
        } else if (location === 'cd') {
            sessions = sessions.filter(s => {
                const h = (s.hall || '').toLowerCase();
                return cdHalls.some(k => h.includes(k));
            });
        }

        const halls = {};
        sessions.forEach(s => { if (!halls[s.hall]) halls[s.hall] = []; halls[s.hall].push(s); });
        const sortedHalls = Object.keys(halls).sort().map(name => {
            const sorted = halls[name].sort((a, b) => a.time.localeCompare(b.time));
            return { name, sessions: sorted };
        });
        c.header('Cache-Control', 'public, max-age=120');
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
        const location = c.req.query('location');
        let query = 'SELECT * FROM messages WHERE is_archived = 0';
        let params = [];
        
        if (location) {
            query += ' AND (location = ? OR location IS NULL)';
            params.push(location);
        }
        query += ' ORDER BY created_at DESC LIMIT 20';
        
        const { results } = await c.env.DB.prepare(query).bind(...params).all();
        return c.json(results.length ? results : STATIC_MESSAGES);
    } catch (e) {
        // Fallback for older DB versions
        try {
            const { results } = await c.env.DB.prepare('SELECT * FROM messages WHERE is_archived = 0 ORDER BY created_at DESC LIMIT 20').all();
            return c.json(results.length ? results : STATIC_MESSAGES);
        } catch (e2) {
            return c.json(STATIC_MESSAGES);
        }
    }
});

app.get('/api/messages/archived', async (c) => {
    if (!c.env.DB) return c.json([]);
    try {
        const location = c.req.query('location');
        let query = 'SELECT * FROM messages WHERE is_archived = 1';
        let params = [];
        
        if (location) {
            query += ' AND (location = ? OR location IS NULL)';
            params.push(location);
        }
        query += ' ORDER BY created_at DESC LIMIT 50';
        
        const { results } = await c.env.DB.prepare(query).bind(...params).all();
        return c.json(results);
    } catch (e) {
        return c.json([]);
    }
});

app.post('/api/messages', async (c) => {
    try {
        const { title, content, author, image_url, location } = await c.req.json();
        if (!title || !content) return c.json({ error: 'Title and content required' }, 400);

        if (c.env.DB) {
            try {
                await c.env.DB.prepare(
                    'INSERT INTO messages (title, content, author, image_url, location) VALUES (?, ?, ?, ?, ?)'
                ).bind(title, content, author || 'System', image_url || null, location || null).run();
            } catch (dbErr) {
                // Compatibility for older DB schema
                await c.env.DB.prepare(
                    'INSERT INTO messages (title, content, author, image_url) VALUES (?, ?, ?, ?)'
                ).bind(title, content, author || 'System', image_url || null).run();
            }
            
            // Broadcast push
            await sendPushToAll(c.env, {
                title: 'Konfidentielle Mitteilung: ' + title,
                body: content.length > 100 ? content.substring(0, 97) + '...' : content,
                tag: 'internal-message'
            }, location);

            // Broadcast email newsletter
            const resendKey = c.env.RESEND_API_KEY;
            if (resendKey) {
                try {
                    const subscribers = await c.env.DB.prepare(
                        'SELECT email FROM email_subscriptions WHERE location = ? OR location IS NULL'
                    ).bind(location || 'kp').all();

                    if (subscribers.results && subscribers.results.length > 0) {
                        const emailContent = `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                                <h2 style="color: #0078FF;">📢 Neue Mitteilung</h2>
                                <h3 style="color: #333; margin-top: 0;">${title}</h3>
                                <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;">Von: <strong>${author || 'System'}</strong></p>
                                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; white-space: pre-wrap; line-height: 1.6;">${content}</div>
                                ${image_url ? `<img src="${image_url}" style="width: 100%; margin-top: 20px; border-radius: 8px;" />` : ''}
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
                                <p style="font-size: 0.8rem; color: #999;">
                                    Du erhältst diese E-Mail, weil du den Kinopolis Newsletter für den Standort <strong>${location || 'kp'}</strong> abonniert hast.
                                </p>
                            </div>
                        `;

                        for (const sub of subscribers.results) {
                            await fetch('https://api.resend.com/emails', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${resendKey}`
                                },
                                body: JSON.stringify({
                                    from: 'Kinopolis Dashboard <newsletter@artjombecker.com>',
                                    to: sub.email,
                                    subject: `[Kinopolis] ${title}`,
                                    html: emailContent
                                })
                            }).catch(e => console.error('Resend Newsletter Error:', e));
                        }
                    }
                } catch (emailErr) {
                    console.error('Email broadcast error:', emailErr);
                }
            }
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/messages/:id', async (c) => {
    const id = c.req.param('id');
    if (c.env.DB) {
        // Soft delete: set is_archived to 1
        await c.env.DB.prepare('UPDATE messages SET is_archived = 1 WHERE id = ?').bind(id).run();
    }
    return c.json({ success: true });
});

// --- INVENTORY API ---
app.get('/api/inventory', async (c) => {
    if (!c.env.DB) return c.json({ waren: [], eis: [] });
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM inventory_items ORDER BY type, name').all();
        return c.json({
            waren: results.filter(i => i.type === 'waren'),
            eis: results.filter(i => i.type === 'eis')
        });
    } catch (e) {
        // Table might not exist yet, try to create it
        try {
            await c.env.DB.prepare('CREATE TABLE IF NOT EXISTS inventory_items (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT, name TEXT, target INTEGER, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)').run();
        } catch(e2) {}
        return c.json({ waren: [], eis: [] });
    }
});

app.post('/api/inventory', async (c) => {
    try {
        const { type, name, target } = await c.req.json();
        if (!type || !name) return c.json({ error: 'Type and name required' }, 400);
        if (c.env.DB) {
            await c.env.DB.prepare('INSERT INTO inventory_items (type, name, target) VALUES (?, ?, ?)').bind(type, name, target || 0).run();
        }
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/inventory/:id', async (c) => {
    const id = c.req.param('id');
    if (c.env.DB) {
        await c.env.DB.prepare('DELETE FROM inventory_items WHERE id = ?').bind(id).run();
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

// --- EMAIL NEWSLETTER API ---
app.post('/api/email/subscribe', async (c) => {
    try {
        const { email, location } = await c.req.json();
        if (!email) return c.json({ error: 'Email required' }, 400);

        if (c.env.DB) {
            await c.env.DB.prepare(`
                INSERT INTO email_subscriptions (email, location)
                VALUES (?, ?)
                ON CONFLICT(email) DO UPDATE SET
                location = excluded.location,
                created_at = CURRENT_TIMESTAMP
            `).bind(email.toLowerCase(), location || 'kp').run();
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/email/unsubscribe', async (c) => {
    try {
        const { email } = await c.req.json();
        if (!email) return c.json({ error: 'Email required' }, 400);

        if (c.env.DB) {
            await c.env.DB.prepare('DELETE FROM email_subscriptions WHERE email = ?')
                .bind(email.toLowerCase()).run();
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- PUSH API ENDPOINTS ---
app.post('/api/push/subscribe', async (c) => {
    try {
        const payload = await c.req.json();
        const { sub, location } = payload;
        
        if (!sub || !sub.endpoint || !sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
            return c.json({ error: 'Invalid subscription object' }, 400);
        }

        if (c.env.DB) {
            // Upsert subscription
            await c.env.DB.prepare(`
                INSERT INTO push_subscriptions (endpoint, p256dh, auth, location, user_agent)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(endpoint) DO UPDATE SET
                p256dh = excluded.p256dh,
                auth = excluded.auth,
                location = excluded.location,
                created_at = CURRENT_TIMESTAMP
            `).bind(sub.endpoint, sub.keys.p256dh, sub.keys.auth, location || 'kp', c.req.header('user-agent')).run();
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

// Broadcast a custom message to ALL subscribed devices
app.post('/api/push/broadcast', async (c) => {
    try {
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);

        const { message, title } = await c.req.json();
        if (!message) return c.json({ error: 'Message required' }, 400);

        const subscriptions = await c.env.DB.prepare('SELECT * FROM push_subscriptions').all();
        if (!subscriptions.results.length) return c.json({ sent: 0, message: 'Keine Abonnenten gefunden' });

        let sent = 0;
        let failed = 0;
        for (const sub of subscriptions.results) {
            try {
                const authHeader = await createVapidHeader(sub.endpoint, c.env);
                const payload = {
                    title: title || '📢 Kinopolis Nachricht',
                    body: message,
                    icon: '/logo-kinopolis-official.png',
                    data: { url: '/' }
                };
                const encryptedBody = await encryptPayload(sub, payload);
                const res = await fetch(sub.endpoint, {
                    method: 'POST',
                    headers: {
                        'TTL': '300',
                        'Authorization': authHeader,
                        'Content-Encoding': 'aes128gcm',
                        'Content-Type': 'application/octet-stream'
                    },
                    body: encryptedBody
                });
                if (res.status === 404 || res.status === 410) {
                    await c.env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(sub.endpoint).run();
                    failed++;
                } else if (res.ok) {
                    sent++;
                } else {
                    failed++;
                }
            } catch (err) {
                failed++;
            }
        }
        return c.json({ sent, failed });
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
        const prompt = "Dieser Foto zeigt einen gedruckten Kinopolis 'Auslassplan'. Extrahiere die Tabelle und gib ausschließlich ein valides JSON-Array zurück. Nutze folgendes Format für jedes Objekt: { \"hall\": \"...\", \"movie\": \"...\", \"start_time\": \"...\", \"credits_time\": \"...\", \"end_time\": \"...\" }. Antworte NUR mit dem JSON-String in einem Code-Block (```json ... ```). KEIN WEITERER TEXT.";
        
        let response;
        try {
            console.log('Running Llama 3.2 Vision for Plan Scan...');
            response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', {
                image: new Uint8Array(buffer),
                prompt: prompt
            });
        } catch (err) {
            console.error('AI Run Error:', err);
            return c.json({ error: 'AI Error: ' + err.message }, 500);
        }

        if (!response || (!response.response && !response.description)) {
            return c.json({ error: 'AI returned empty response' }, 500);
        }

        let jsonStr = response.response || response.description || '';
        console.log('Raw AI Response:', jsonStr);

        // Robust extraction: Look for markdown code blocks first, then the array directly
        const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
            jsonStr = codeBlockMatch[1].trim();
        } else {
            const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
            if (arrayMatch) {
                jsonStr = arrayMatch[0].trim();
            }
        }
        
        let data;
        // Fix trailing commas often generated by LLMs before parsing
        jsonStr = jsonStr.replace(/,\s*([\]}])/g, '$1');
        try {
            data = JSON.parse(jsonStr);
        } catch (e) {
            console.error('AI JSON Parse Error:', jsonStr);
            return c.json({ error: 'JSON Parse Error', raw: jsonStr }, 500);
        }
        
        // Save to D1
        try {
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
        } catch (dbError) {
            console.error('D1 Database Error:', dbError);
            // Return success anyway, since the data was parsed correctly
            return c.json({ success: true, data, dbWarning: 'Konnte Plan nicht in Datenbank speichern.' });
        }
    } catch (e) {
        console.error('Scan error:', e);
        return c.json({ error: e.message }, 500);
    }
});

// --- UPCOMING MOVIES API ---
app.get('/api/upcoming', async (c) => {
    try {
        const response = await fetch('https://www.kinopolis.de/kp');
        if (!response.ok) throw new Error('Failed to fetch Kinopolis main page');
        const html = await response.text();

        // Target the specific coming-soon-slider ID or general highlights
        const sliderMatch = html.match(/<(?:section|div)[^>]*id="(?:coming-soon-slider|highlights)"[\s\S]*?<\/(?:section|div)>/);
        let blocks = [];
        
        if (sliderMatch) {
            const sliderHtml = sliderMatch[0];
            // Split by movie grid bricks
            blocks = sliderHtml.split(/<(?:div|article)[^>]*class="[^"]*movie[^"]*"[^>]*>/).slice(1);
        }
        
        // If not found in slider, search for grid items globally
        if (blocks.length === 0) {
            const items = html.match(/<(?:div|article)[^>]*class="[^"]*movie[^"]*"[^>]*>[\s\S]*?<\/(?:div|article)>/g);
            if (items) blocks = items;
        }

        if (blocks.length === 0) return c.json([]);
        
        const upcoming = [];
        blocks.forEach(block => {
            const hrefMatch = block.match(/href="([^"]+)"/);
            const srcMatch = block.match(/src="([^"]+)"/);
            // Title is usually in h3 or alt
            const titleMatch = block.match(/<h3[^>]*>([\s\S]*?)<\/h3>/) || block.match(/alt="([^"]+)"/);
            
            if (hrefMatch && srcMatch) {
                let title = titleMatch ? titleMatch[1].replace(/<[^>]*>/g, '').trim() : 'Unbekannter Film';
                // Basic HTML entity decoding
                title = title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
                
                upcoming.push({
                    title,
                    poster: srcMatch[1].startsWith('http') ? srcMatch[1] : 'https://www.kinopolis.de' + srcMatch[1],
                    movieLink: hrefMatch[1].startsWith('http') ? hrefMatch[1] : 'https://www.kinopolis.de' + hrefMatch[1]
                });
            }
        });

        // Deduplicate and return max 16
        const unique = [];
        const seen = new Set();
        for (const m of upcoming) {
            if (!seen.has(m.title)) {
                seen.add(m.title);
                unique.push(m);
            }
        }
        
        return c.json(unique.slice(0, 16));
    } catch (e) {
        console.error('Upcoming fetch error:', e);
        return c.json({ error: 'Failed to fetch upcoming movies' }, 500);
    }
});

// JSON fallback for 404
app.notFound((c) => {
    return c.json({ error: 'Not Found', path: c.req.path }, 404);
});

// --- SHIFT LOG API ---
app.get('/api/logs-summary', async (c) => {
    try {
        const location = c.req.query('location') || 'kp';
        if (!c.env.DB || !c.env.AI) return c.json({ error: 'DB or AI not available' }, 500);
        
        try {
            // Fetch logs from the last 7 days
            const logs = await c.env.DB.prepare(`
                SELECT author, message, priority, created_at 
                FROM shift_logs 
                WHERE location = ? 
                AND created_at > datetime('now', '-7 days')
                ORDER BY created_at DESC 
                LIMIT 50
            `).bind(location).all();

            if (logs.results.length === 0) return c.json({ summary: "Keine Einträge in den letzten 7 Tagen vorhanden." });

            const logText = logs.results.map(l => `[${l.priority.toUpperCase()}] ${l.author}: ${l.message}`).join('\n');
            
            const systemPrompt = `Du bist ein hilfreicher Assistent für Kinoleiter. 
            Analysiere die folgenden Übergabebuch-Einträge der letzten Tage. 
            Erstelle eine SEHR kompakte Zusammenfassung (max 3-5 Aufzählungspunkte). 
            Konzentriere dich auf:
            1. Technische Defekte oder offene Probleme.
            2. Wichtige Personal- oder Bestandshinweise.
            3. Besondere Vorkommnisse.
            Schreibe auf Deutsch, professionell und kurz gefasst.`;

            const response = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: logText }
                ],
                max_tokens: 512
            });

            return c.json({ summary: response.response });
        } catch (dbError) {
            if (dbError.message.includes('no such table')) {
                return c.json({ error: 'DB_MIGRATION_REQUIRED', summary: 'Bitte lege die Tabelle "shift_logs" in deiner Cloudflare D1 Datenbank an.' }, 500);
            }
            throw dbError;
        }
    } catch (e) {
        console.error('Summary generation error:', e);
        return c.json({ error: 'Failed to generate summary' }, 500);
    }
});

app.get('/api/logs', async (c) => {
    try {
        const location = c.req.query('location') || 'kp';
        if (!c.env.DB) return c.json([]);
        const logs = await c.env.DB.prepare(`
            SELECT * FROM shift_logs 
            WHERE location = ? 
            ORDER BY created_at DESC 
            LIMIT 50
        `).bind(location).all();
        return c.json(logs.results);
    } catch (e) {
        if (e.message.includes('no such table')) {
            return c.json({ error: 'DB_MIGRATION_REQUIRED' }, 500);
        }
        return c.json([], 500);
    }
});

app.post('/api/logs', async (c) => {
    try {
        const { location, author, message, priority } = await c.req.json();
        if (!c.env.DB || !message) return c.json({ error: 'Missing data or DB connection' }, 400);
        
        try {
            await c.env.DB.prepare(`
                INSERT INTO shift_logs (location, author, message, priority)
                VALUES (?, ?, ?, ?)
            `).bind(location || 'kp', author || 'Anonym', message, priority || 'normal').run();
            return c.json({ success: true });
        } catch (dbError) {
            if (dbError.message.includes('no such table')) {
                return c.json({ error: 'DB_MIGRATION_REQUIRED' }, 500);
            }
            throw dbError;
        }
    } catch (e) {
        console.error('Log save error:', e);
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/logs/:id', async (c) => {
    try {
        const id = c.req.param('id');
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);
        await c.env.DB.prepare('DELETE FROM shift_logs WHERE id = ?').bind(id).run();
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- CONTACTS / TELEFONLISTE API ---
app.get('/api/contacts', async (c) => {
    try {
        const location = c.req.query('location') || 'kp';
        if (!c.env.DB) return c.json([]);
        const contacts = await c.env.DB.prepare(`
            SELECT * FROM contacts 
            WHERE location = ? 
            ORDER BY category ASC, role_name ASC
        `).bind(location).all();
        return c.json(contacts.results || []);
    } catch (e) {
        if (e.message.includes('no such table')) {
            return c.json({ error: 'DB_MIGRATION_REQUIRED' }, 500);
        }
        return c.json([], 500);
    }
});

app.post('/api/contacts', async (c) => {
    try {
        const { location, category, role_name, phone_number } = await c.req.json();
        if (!c.env.DB || !category || !role_name || !phone_number) return c.json({ error: 'Missing data' }, 400);
        
        await c.env.DB.prepare(`
            INSERT INTO contacts (location, category, role_name, phone_number)
            VALUES (?, ?, ?, ?)
        `).bind(location || 'kp', category, role_name, phone_number).run();
        return c.json({ success: true });
    } catch (e) {
        console.error('Contact save error:', e);
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/contacts/:id', async (c) => {
    try {
        const id = c.req.param('id');
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);
        await c.env.DB.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run();
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- AI PLAN SCANNER + MODELL FALLBACK ---
app.post('/api/ai-agree', async (c) => {
    return c.json({ success: true });
});

app.post('/api/scan-plan', async (c) => {
    try {
        const body = await c.req.parseBody();
        const imageFile = body.image;
        if (!imageFile) return c.json({ error: 'No image uploaded' }, 400);

        const imageArrayBuffer = await imageFile.arrayBuffer();
        const imageData = new Uint8Array(imageArrayBuffer);

        const prompt = `Du bist ein spezialisierter Assistent für Kinobetriebe. 
        Analysiere dieses Foto eines gedruckten Auslassplans/Dienstplans.
        Extrahiere die Tabelle mit den Auslasszeiten (Credits).
        WICHTIG: Gib NUR ein raues JSON-Array zurück im Format: 
        [{"hall": "Kino 1", "movie": "Film Titel", "credits_time": "HH:MM"}, ...]
        Suche nach Spalten wie 'Saal', 'Film', 'Credits' oder 'Ende'.
        Ignoriere alle anderen Texte.`;

        let result;
        let usedModel = '@cf/meta/llama-3.2-11b-vision-instruct';

        try {
            const response = await c.env.AI.run(usedModel, {
                prompt,
                image: [...imageData],
                max_tokens: 1024
            });
            result = response.response;
        } catch (e) {
            console.warn("Llama 3.2 Vision failed", e);
            throw e;
        }

        const jsonMatch = result.match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (!jsonMatch) {
            return c.json({ error: 'KI konnte keine gültige Tabelle finden.', raw: result }, 500);
        }

        const data = JSON.parse(jsonMatch[0]);

        const todayStr = new Date().toISOString().split('T')[0];
        try {
            if (c.env.DB) {
                for (const item of data) {
                    await c.env.DB.prepare(`
                        INSERT INTO scanned_plans (date, hall, movie, credits_time)
                        VALUES (?, ?, ?, ?)
                    `).bind(todayStr, item.hall, item.movie, item.credits_time).run();
                }
            }
        } catch (dbErr) {
            console.error("DB Save Error:", dbErr);
        }

        return c.json({ success: true, data, model: usedModel });
    } catch (e) {
        console.error('Scan error:', e);
        return c.json({ error: `Scanner-Fehler: ${e.message}` }, 500);
    }
});

// --- RESTOCK CALL API ---

app.post('/api/push/restock', async (c) => {
    const { location, item } = await c.req.json();
    if (!item) return c.json({ error: 'Missing item' }, 400);

    const payload = {
        title: '🚨 Nachschub benötigt!',
        body: `${item} an der Theke/Kasse leer! Bitte auffüllen.`,
        tag: 'restock-alert',
        data: { url: '/#restock' }
    };

    await sendPushToAll(c.env, payload, location);

    // Persist to logs for TL dashboard
    try {
        if (c.env.DB) {
            await c.env.DB.prepare(`
                INSERT INTO shift_logs (location, author, message, priority)
                VALUES (?, ?, ?, ?)
            `).bind(location || 'kp', 'System (Funk)', `[FUNK] ${item}`, 'dringend').run();
        }
    } catch (e) {
        console.error('Error saving restock to logs', e);
    }

    return c.json({ success: true });
});

// --- TRANSFERLISTE API ---
app.post('/api/push/transfer', async (c) => {
    const { location, author, items, station } = await c.req.json();
    if (!items) return c.json({ error: 'Missing items' }, 400);

    const titleStr = station ? `TL-Transferliste (${station})` : 'TL-Transferliste';
    
    const payload = {
        title: `📝 ${titleStr} - von ${author}`,
        body: items,
        tag: 'transfer-alert',
        data: { url: '/#transfer' }
    };

    // Optionally also save this as a high-priority log entry
    try {
        if (c.env.DB) {
            await c.env.DB.prepare(`
                INSERT INTO shift_logs (location, author, message, priority)
                VALUES (?, ?, ?, ?)
            `).bind(location || 'kp', author || 'Anonym', `[TRANSFERLISTE]\\n${items}`, 'wichtig').run();
        }
    } catch (e) {
        console.error('Error saving transfer to logs', e);
    }

    await sendPushToAll(c.env, payload, location);
    return c.json({ success: true });
});

// --- BROADCAST HELPER ---
async function sendPushToAll(env, payload, locationFilter = null) {
    if (!env.DB) return;
    
    let query = 'SELECT * FROM push_subscriptions';
    const params = [];
    if (locationFilter) {
        query += ' WHERE location = ?';
        params.push(locationFilter);
    }
    let subscriptions;
    try {
        subscriptions = await env.DB.prepare(query).bind(...params).all();
    } catch (e) {
        console.error('Error in sendPushToAll DB query:', e);
        return [{ error: 'DB error or missing push_subscriptions table' }];
    }
    
    const results = [];
    
    // Get current time in German timezone for shift filtering
    const berlinTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/Berlin", hour: '2-digit', minute: '2-digit' });
    const [nowH, nowM] = berlinTime.split(':').map(Number);
    const nowTotalMin = nowH * 60 + nowM;

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
        console.log('Running Scheduled Push Checks...');
        if (!env.DB) return;

        // 1. Get all unique locations that have subscribers
        const locRes = await env.DB.prepare('SELECT DISTINCT location FROM push_subscriptions').all();
        const locations = locRes.results.map(r => r.location);
        if (locations.length === 0) return;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const todayStr = now.toISOString().split('T')[0];

        for (const loc of locations) {
            console.log(`Checking alerts for: ${loc}`);
            try {
                // Fetch sessions for this location
                const sessionsRes = await app.request(`/api/sessions?location=${loc}`, {}, env);
                if (!sessionsRes.ok) continue;
                const halls = await sessionsRes.json();

                for (const hall of halls) {
                    const sessions = hall.sessions;
                    for (let i = 0; i < sessions.length; i++) {
                        const s = sessions[i];
                        if (!s.time || !s.time.includes(':')) continue;
                        const [h, m] = s.time.split(':').map(Number);
                        const startMin = h * 60 + m;
                        const diff = startMin - currentMinutes;

                        // --- ZE ALERT (15m before start) ---
                        if (diff > 0 && diff <= 15 && s.sold > 50) {
                            const alertHash = `ze-${loc}-${hall.name}-${s.time}-${s.title}`;
                            const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                            
                            if (!existing) {
                                await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                                await sendPushToAll(env, {
                                    title: 'Check-In: ' + hall.name,
                                    body: `${s.title} beginnt in ${diff} Min. (${s.sold} Gäste). Bitte Ausweise kontrollieren!`,
                                    tag: 'ze-alert'
                                }, loc);
                            }
                        }

                        // --- POSTER ALERT (20m after start) ---
                        // Show NEXT movie and its poster image
                        if (diff < 0 && diff >= -30 && diff <= -20) {
                            const nextS = sessions[i + 1];
                            if (nextS && s.title !== nextS.title) {
                                const alertHash = `poster-${loc}-${hall.name}-${s.time}-${nextS.title}`;
                                if (loc === 'kp') {
                                    const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                                    
                                    if (!existing) {
                                        await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                                        await sendPushToAll(env, {
                                            title: '🖼️ Plakatwechsel: ' + hall.name,
                                            body: `Film läuft seit 20 Min. Bitte Plakat für "${nextS.title}" (${nextS.time} Uhr) einhängen!`,
                                            image: nextS.poster,
                                            tag: 'poster-alert'
                                        }, loc);
                                    }
                                }
                            }
                        }

                        // --- EXIT ALERT (Duration-based) ---
                        const endMin = startMin + s.duration;
                        const endDiff = endMin - currentMinutes;
                        if (endDiff > -5 && endDiff <= 5 && s.duration > 0) {
                            const alertHash = `exit-${loc}-${hall.name}-${s.time}-${s.title}`;
                            const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                            
                            if (!existing) {
                                await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                                await sendPushToAll(env, {
                                    title: '🚪 Auslass läuft: ' + hall.name,
                                    body: `${s.title} endet jetzt. Bitte Auslass vorbereiten!`,
                                    tag: 'exit-alert'
                                }, loc);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(`Scheduled loop error for ${loc}:`, err);
            }
        }

        // 2. Check SCANNED PLANS for Poster Changes (Keep legacy support, but could be merged later)
        const scannedResults = await env.DB.prepare('SELECT * FROM scanned_plans WHERE date = ?').bind(todayStr).all();
        for (const row of scannedResults.results) {
            if (!row.credits_time || !row.credits_time.includes(':')) continue;
            const [h, m] = row.credits_time.split(':').map(Number);
            const alertMin = h * 60 + m;
            const diff = alertMin - currentMinutes;

            if (diff >= -5 && diff <= 5) {
                const alertHash = `scanned-poster-${row.hall}-${row.credits_time}-${row.movie}`;
                const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                if (!existing) {
                    await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                    await sendPushToAll(env, {
                        title: '🖼️ Plakatwechsel: ' + row.hall,
                        body: `Laut Plan: ${row.movie} Credits beginnen jetzt (${row.credits_time}). Plakat bereit machen!`,
                        tag: 'poster-alert'
                    }); // Sends to all as scanned_plans has no location yet
                }
            }
        }
    }
};
