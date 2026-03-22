import { Hono } from 'hono';
import * as cheerio from 'cheerio';

const app = new Hono().basePath('/api');

app.get('/locations', (c) => {
    const locations = [
        { name: 'Darmstadt: KINOPOLIS', slug: 'kp' },
        { name: 'Darmstadt: Citydome', slug: 'ca' },
        { name: 'Darmstadt: Rex', slug: 'rx' }
    ];
    return c.json(locations);
});

app.get('/sessions', async (c) => {
    const location = c.req.query('location') || 'kp';
    const dateStr = c.req.query('date') || new Date().toISOString().split('T')[0];
    const targetUrl = `https://www.kinopolis.de/${location}/programm?date=${dateStr}`;
    
    try {
        const response = await fetch(targetUrl);
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

        $('section.movie, .prog2__movie').each((i, movieEl) => {
            const title = $(movieEl).find('.hl-link, .prog2__movie-title').first().text().trim();
            if (!title) return;
            const poster = $(movieEl).find('.prog2__movie-img img, img.img-fluid').first().attr('src');
            const durationText = $(movieEl).find('.movie__specs-el, .prog2__movie-info-item, .prog2__infos').text().trim();
            const durationMatch = durationText.match(/Dauer:\s*(\d+)\s*Minuten/i) || durationText.match(/(\d+)\s*Min\.?/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 0;
            const seenSessions = new Set();

            $(movieEl).find('.prog2__cont, .prog2__movie-session').each((j, sessionEl) => {
                const perfId = $(sessionEl).attr('data-performance-id');
                if (allowedPerformanceIds.size > 0 && perfId && !allowedPerformanceIds.has(perfId)) return;
                const time = $(sessionEl).find('.prog2__time').first().text().trim();
                let hallTextContent = $(sessionEl).find('.prog2__hall-num > div:first-child').text().trim();
                if (!hallTextContent) hallTextContent = $(sessionEl).find('.prog2__hall-num').text().replace(/i$/, '').trim();
                const hall = hallTextContent;
                if (!time) return;
                if (location === 'kp') {
                    const isCitydomeOrRexEvent = hall.includes('Helia') || hall.includes('Pali') || 
                                           hall.includes('Rex') || hall.includes('Classic') || 
                                           hall.includes('Broadway') || hall.includes('Bambi') || hall.includes('Festival');
                    if (isCitydomeOrRexEvent) return;
                }
                const sessionKey = `${time}-${hall}`;
                if (seenSessions.has(sessionKey)) return;
                seenSessions.add(sessionKey);

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

                sessions.push({ title, poster: poster ? (poster.startsWith('http') ? poster : `https://www.kinopolis.de${poster}`) : null, 
                              time, hall, duration, capacity, freePercent, sold, isBookable, performanceId: perfId, date: dateStr });
            });
        });

        const halls = {};
        sessions.forEach(s => { if (!halls[s.hall]) halls[s.hall] = []; halls[s.hall].push(s); });
        const sortedHalls = Object.keys(halls).sort().map(name => ({ name, sessions: halls[name].sort((a, b) => a.time.localeCompare(b.time)) }));
        return c.json(sortedHalls);
    } catch (error) {
        return c.json({ error: 'Failed' }, 500);
    }
});

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        if (url.pathname.startsWith('/api/')) {
            return app.fetch(request, env, ctx);
        }
        // Serve static assets from the root by default in Pages
        return env.ASSETS.fetch(request);
    }
};
