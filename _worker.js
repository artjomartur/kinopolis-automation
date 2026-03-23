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
        const sessions = [];

        const d = new Date(dateStr);
        const dayNum = d.getDate();
        const monthNum = d.getMonth() + 1;
        const shortDateStr = `${dayNum < 10 ? '0' : ''}${dayNum}.${monthNum < 10 ? '0' : ''}${monthNum}.`;
        
        let allowedPerformanceIds = new Set();
        $('.prog-nav__item').each((_, navEl) => {
            const navText = $(navEl).text().trim();
            if (navText.includes('Heute') || navText.includes(shortDateStr)) {
                const idsAttr = $(navEl).attr('data-performance-ids');
                if (idsAttr) {
                    idsAttr.replace(/[\[\]]/g, '').split(',').forEach(id => {
                        const trimmed = id.trim();
                        if (trimmed) allowedPerformanceIds.add(trimmed);
                    });
                }
            }
        });

        const seenSessions = new Set();
        const seenPerfIds = new Set();

        $('section.movie, .prog2__movie').each((i, movieEl) => {
            const title = $(movieEl).find('.hl-link, .prog2__movie-title').first().text().trim();
            if (!title) return;
            const poster = $(movieEl).find('.prog2__movie-img img, img.img-fluid').first().attr('src');
            const durationText = $(movieEl).find('.movie__specs-el, .prog2__movie-info-item, .prog2__infos').text().trim();
            const durationMatch = durationText.match(/Dauer:\s*(\d+)\s*Minuten/i) || durationText.match(/(\d+)\s*Min\.?/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 0;

            $(movieEl).find('.prog2__cont, .prog2__movie-session').each((j, sessionEl) => {
                const perfId = $(sessionEl).attr('data-performance-id');
                if (allowedPerformanceIds.size > 0 && perfId && !allowedPerformanceIds.has(perfId)) return;
                const time = $(sessionEl).find('.prog2__time').first().text().trim();
                let hallTextContent = $(sessionEl).find('.prog2__hall-num > div:first-child').text().trim();
                if (!hallTextContent) hallTextContent = $(sessionEl).find('.prog2__hall-num').text().replace(/i$/, '').trim();
                const hall = hallTextContent;
                if (!time) return;

                // Deduplicate sessions globally per request
                const sessionKey = `${time}-${hall}`;
                if (perfId && seenPerfIds.has(perfId)) return;
                if (!perfId && seenSessions.has(sessionKey)) return;
                if (perfId) seenPerfIds.add(perfId);
                seenSessions.add(sessionKey);

                if (location === 'kp') {
                    const isCitydomeOrRexEvent = hall.includes('Helia') || hall.includes('Pali') || 
                                           hall.includes('Rex') || hall.includes('Classic') || 
                                           hall.includes('Broadway') || hall.includes('Bambi') || hall.includes('Festival');
                    if (isCitydomeOrRexEvent) return;
                }

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
                let sold = 0;
                if (capacity > 0) {
                    sold = Math.round(capacity * (1 - freePercent / 100));
                    if (freeCountMatch) sold = capacity - parseInt(freeCountMatch[1]);
                }
                const isBookable = !occupancyText.includes('nicht mehr buchbar') && !occupancyText.includes('ausverkauft');

                const seatingAttr = $(sessionEl).find('[data-seating]').attr('data-seating');
                if (capacity === 0 && seatingAttr) {
                    try {
                        const parsed = JSON.parse(seatingAttr);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            // Only use if it looks like a seat count (usually data-seating is just [1] or [0] for categories)
                            if (parsed[0] > 10) {
                                capacity = parsed[0];
                            }
                        }
                    } catch(e) {}
                }

                sessions.push({ title, poster: poster ? (poster.startsWith('http') ? poster : `https://www.kinopolis.de${poster}`) : null, 
                              time, hall, duration, capacity, freePercent, sold, isBookable, performanceId: perfId, date: dateStr });
            });
        });

        const halls = {};
        sessions.forEach(s => { if (!halls[s.hall]) halls[s.hall] = []; halls[s.hall].push(s); });
        const sortedHalls = Object.keys(halls).sort().map(name => ({ name, sessions: halls[name].sort((a, b) => a.time.localeCompare(b.time)) }));
        return c.json(sortedHalls);
    } catch (error) {
        console.error('Worker error:', error);
        return c.json({ error: 'Internal Server Error', message: error.message }, 500);
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
