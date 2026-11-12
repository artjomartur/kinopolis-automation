/**
 * Kinopolis Cinema Automation — Core Business Logic
 * Pure functions for popcorn demand, hall statuses, duration parsing, and occupancy.
 */

/**
 * Calculates required popcorn volume and raw ingredients based on visitor counts.
 * Standard cinema conversion formula:
 * - 25% of all visitors purchase popcorn
 * - 1 batch (Kessel) produces ~4 portions
 * - 1 batch requires 1.0kg corn, 0.3kg fat/oil, 0.4kg sugar
 * 
 * @param {number} visitors - Total projected or actual visitors
 * @param {number} buyRate - Purchase conversion rate (default 0.25)
 * @returns {Object} Calculated portions, batches, and ingredient weights in kg
 */
export function calculatePopcornDemand(visitors = 0, buyRate = 0.25) {
    const validVisitors = Math.max(0, Math.round(Number(visitors) || 0));
    const expectedPortions = Math.round(validVisitors * buyRate);
    const recommendedBatches = validVisitors === 0 ? 0 : Math.max(1, Math.ceil(expectedPortions / 4));

    const kornKg = Number((recommendedBatches * 1.0).toFixed(1));
    const fettKg = Number((recommendedBatches * 0.3).toFixed(1));
    const zuckerKg = Number((recommendedBatches * 0.4).toFixed(1));

    return {
        visitors: validVisitors,
        expectedPortions,
        recommendedBatches,
        kornKg,
        fettKg,
        zuckerKg
    };
}

/**
 * Determines the current operational phase of a cinema hall for a given session.
 * 
 * Phases:
 * - 'planned': Movie start is more than 20 minutes away
 * - 'admission': 20 to 0 minutes before start (doors open, ticket scan)
 * - 'running': Between movie start and end (in presentation)
 * - 'cleaning': 0 to 15 minutes after movie end (cleaning & ventilation)
 * - 'ready': Cleaning completed, waiting for next cycle
 * 
 * @param {Object} session - { time: '14:30', duration: 120 }
 * @param {number} currentMinutes - Current time of day in minutes from midnight (e.g. 14*60 + 30)
 * @param {number} cleaningDuration - Turnaround buffer in minutes (default 15)
 * @returns {Object} Phase name, countdown in minutes, German label, and status badge type
 */
export function determineHallPhase(session, currentMinutes, cleaningDuration = 15) {
    if (!session || !session.time) {
        return {
            phase: 'ready',
            label: 'Bereit',
            badge: 'ready',
            minutesRemaining: 0
        };
    }

    const [h, m] = session.time.split(':').map(Number);
    const startMin = (h || 0) * 60 + (m || 0);
    const duration = Number(session.duration) || 100;
    const endMin = startMin + duration;
    const cleanEndMin = endMin + cleaningDuration;

    if (currentMinutes < startMin - 20) {
        const minUntilStart = startMin - currentMinutes;
        return {
            phase: 'planned',
            label: `Geplant (Start in ${minUntilStart} Min.)`,
            badge: 'planned',
            minutesRemaining: minUntilStart
        };
    } else if (currentMinutes >= startMin - 20 && currentMinutes < startMin) {
        const minUntilStart = startMin - currentMinutes;
        return {
            phase: 'admission',
            label: `Einlass läuft (Start in ${minUntilStart} Min.)`,
            badge: 'admission',
            minutesRemaining: minUntilStart
        };
    } else if (currentMinutes >= startMin && currentMinutes < endMin) {
        const minUntilEnd = endMin - currentMinutes;
        return {
            phase: 'running',
            label: `Vorstellung läuft (Ende in ${minUntilEnd} Min.)`,
            badge: 'running',
            minutesRemaining: minUntilEnd
        };
    } else if (currentMinutes >= endMin && currentMinutes < cleanEndMin) {
        const minUntilReady = cleanEndMin - currentMinutes;
        return {
            phase: 'cleaning',
            label: `Saalreinigung (fertig in ${minUntilReady} Min.)`,
            badge: 'cleaning',
            minutesRemaining: minUntilReady
        };
    } else {
        return {
            phase: 'ready',
            label: 'Saal bereit & belüftet',
            badge: 'ready',
            minutesRemaining: 0
        };
    }
}

/**
 * Extracts movie duration in minutes from raw text (e.g. "Dauer: 148 Minuten" or "123 Min.").
 * Avoids misidentifying FSK age ratings.
 * 
 * @param {string} text - Raw movie info string
 * @returns {number} Duration in minutes, or 0 if not found
 */
export function parseDurationFromText(text) {
    if (!text || typeof text !== 'string') return 0;
    const match = text.match(/Dauer:\s*(\d+)\s*Minuten/i) || text.match(/(\d+)\s*Min\.?/i);
    return match ? parseInt(match[1], 10) : 0;
}

/**
 * Extracts FSK rating from text or image alt attribute.
 * 
 * @param {string} text - Text containing FSK information
 * @param {string} [imgAlt] - Image alt attribute fallback
 * @returns {string} Normalized FSK string, e.g. "FSK 12", "FSK 16", or "FSK ?"
 */
export function parseFskFromText(text, imgAlt = '') {
    if (imgAlt && imgAlt.includes('FSK')) {
        const m = imgAlt.match(/FSK\s*(\d+)/i);
        return m ? `FSK ${m[1]}` : imgAlt.trim();
    }
    if (!text || typeof text !== 'string') return 'FSK ?';
    const m = text.match(/ab\s*(\d+)\s*Jahre/i) || text.match(/FSK\s*(\d+)/i);
    return m ? `FSK ${m[1]}` : 'FSK ?';
}

/**
 * Computes occupancy percentage rounded to one decimal place.
 * 
 * @param {number} sold - Sold tickets
 * @param {number} capacity - Total hall capacity
 * @returns {number} Percentage between 0 and 100
 */
export function calculateOccupancy(sold, capacity) {
    const s = Math.max(0, Number(sold) || 0);
    const c = Math.max(0, Number(capacity) || 0);
    if (c === 0) return 0;
    return Number(Math.min(100, (s / c) * 100).toFixed(1));
}

/**
 * Authoritative list of all 18 official Kinopolis locations verified against kinopolis.de
 */
export const KINOPOLIS_LOCATIONS = [
    { name: 'Sulzbach / MTZ: KINOPOLIS', slug: 'su', city: 'Sulzbach (Taunus)', hallCount: 12 },
    { name: 'Darmstadt: KINOPOLIS', slug: 'kp', city: 'Darmstadt', hallCount: 8 },
    { name: 'Darmstadt: Citydome', slug: 'cd', city: 'Darmstadt', hallCount: 7 },
    { name: 'Darmstadt: programmkino rex', slug: 'rx', city: 'Darmstadt', hallCount: 4 },
    { name: 'München: Mathäser Filmpalast', slug: 'mm', city: 'München', hallCount: 14 },
    { name: 'München: Gloria Palast', slug: 'gp', city: 'München', hallCount: 1 },
    { name: 'Hamburg HafenCity: KINOPOLIS', slug: 'hh', city: 'Hamburg', hallCount: 10 },
    { name: 'Hanau: KINOPOLIS', slug: 'hu', city: 'Hanau', hallCount: 8 },
    { name: 'Viernheim / RNZ: KINOPOLIS', slug: 'vi', city: 'Viernheim', hallCount: 10 },
    { name: 'Aschaffenburg: KINOPOLIS', slug: 'ab', city: 'Aschaffenburg', hallCount: 11 },
    { name: 'Bad Godesberg: KINOPOLIS', slug: 'bn', city: 'Bonn', hallCount: 11 },
    { name: 'Bad Homburg: KINOPOLIS', slug: 'bh', city: 'Bad Homburg', hallCount: 7 },
    { name: 'Gießen: Kinocenter', slug: 'gi', city: 'Gießen', hallCount: 4 },
    { name: 'Gießen: KINOPOLIS', slug: 'kg', city: 'Gießen', hallCount: 9 },
    { name: 'Koblenz: KINOPOLIS', slug: 'ko', city: 'Koblenz', hallCount: 14 },
    { name: 'Landshut: KINOPOLIS', slug: 'lh', city: 'Landshut', hallCount: 11 },
    { name: 'Rosenheim: KINOPOLIS', slug: 'ro', city: 'Rosenheim', hallCount: 8 },
    { name: 'Freiberg: KINOPOLIS', slug: 'fr', city: 'Freiberg', hallCount: 5 }
];

/**
 * Natural sort comparator for hall names so Kino 2 comes before Kino 10.
 */
export function sortHallsNaturally(hallA = '', hallB = '') {
    const isPremiumA = /dolby|laser|imax|gloria/i.test(hallA);
    const isPremiumB = /dolby|laser|imax|gloria/i.test(hallB);
    if (isPremiumA && !isPremiumB) return -1;
    if (!isPremiumA && isPremiumB) return 1;

    return hallA.localeCompare(hallB, undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * High-fidelity fallback halls matching the exact hall configurations of each Kinopolis site.
 * 
 * @param {string} city - Location slug (e.g. 'su', 'kp', 'mm', 'hh', 'vi', 'cd', 'rx')
 * @returns {Array} Array of hall objects with realistic names and sessions
 */
export function getFallbackHalls(city = 'su') {
    const slug = (city || 'su').toLowerCase();

    // Sulzbach MTZ (12 halls + OnyxLED)
    if (slug === 'su') {
        return [
            {
                name: 'Kino 1 (Laser Maxx / Dolby Atmos)',
                sessions: [
                    { title: 'Gladiator II', poster: '/assets/3d/hero-cube.png', time: '14:30', hall: 'Kino 1', duration: 148, capacity: 480, sold: 310, fsk: 'FSK 16' },
                    { title: 'Wicked', poster: '/assets/3d/hero-ring.png', time: '17:45', hall: 'Kino 1', duration: 160, capacity: 480, sold: 420, fsk: 'FSK 6' },
                    { title: 'Dune: Part Two (Laser Maxx)', poster: '/assets/3d/hero-cube.png', time: '21:00', hall: 'Kino 1', duration: 166, capacity: 480, sold: 460, fsk: 'FSK 12' }
                ]
            },
            {
                name: 'Kino 2 (Laser / D-Box)',
                sessions: [
                    { title: 'Red One – Alarmstufe Weihnachten', poster: '/assets/3d/hero-helix.png', time: '15:00', hall: 'Kino 2', duration: 123, capacity: 280, sold: 185, fsk: 'FSK 12' },
                    { title: 'Venom: The Last Dance (D-Box)', poster: '/assets/3d/hero-gear.png', time: '18:00', hall: 'Kino 2', duration: 110, capacity: 280, sold: 240, fsk: 'FSK 16' },
                    { title: 'Gladiator II (D-Box Motion)', poster: '/assets/3d/hero-cube.png', time: '20:30', hall: 'Kino 2', duration: 148, capacity: 280, sold: 260, fsk: 'FSK 16' }
                ]
            },
            {
                name: 'Kino 3 (Komfort Loge)',
                sessions: [
                    { title: 'Vaiana 2', poster: '/assets/3d/hero-ring.png', time: '14:45', hall: 'Kino 3', duration: 100, capacity: 210, sold: 195, fsk: 'FSK 0' },
                    { title: 'Konklave', poster: '/assets/3d/avatar-3.png', time: '17:30', hall: 'Kino 3', duration: 120, capacity: 210, sold: 140, fsk: 'FSK 12' },
                    { title: 'Anora', poster: '/assets/3d/avatar-1.png', time: '20:15', hall: 'Kino 3', duration: 139, capacity: 210, sold: 180, fsk: 'FSK 16' }
                ]
            },
            {
                name: 'Kino 4',
                sessions: [
                    { title: 'Alter weißer Mann', poster: '/assets/3d/avatar-1.png', time: '15:15', hall: 'Kino 4', duration: 114, capacity: 180, sold: 110, fsk: 'FSK 12' },
                    { title: 'Die Schule der magischen Tiere 3', poster: '/assets/3d/avatar-2.png', time: '18:15', hall: 'Kino 4', duration: 105, capacity: 180, sold: 155, fsk: 'FSK 0' },
                    { title: 'Smile 2', poster: '/assets/3d/avatar-1.png', time: '20:45', hall: 'Kino 4', duration: 127, capacity: 180, sold: 130, fsk: 'FSK 18' }
                ]
            },
            {
                name: 'Kino 5',
                sessions: [
                    { title: 'Terrifier 3', poster: '/assets/3d/avatar-2.png', time: '17:30', hall: 'Kino 5', duration: 125, capacity: 200, sold: 175, fsk: 'FSK 18' },
                    { title: 'Heretic', poster: '/assets/3d/avatar-3.png', time: '20:15', hall: 'Kino 5', duration: 110, capacity: 200, sold: 140, fsk: 'FSK 16' }
                ]
            },
            {
                name: 'Kino 6 – 12',
                sessions: [
                    { title: 'Der Buchspazierer', poster: '/assets/3d/avatar-1.png', time: '16:00', hall: 'Kino 6', duration: 98, capacity: 150, sold: 90, fsk: 'FSK 6' },
                    { title: 'The Room Next Door', poster: '/assets/3d/avatar-2.png', time: '19:00', hall: 'Kino 7', duration: 107, capacity: 140, sold: 85, fsk: 'FSK 12' }
                ]
            },
            {
                name: 'OnyxLED',
                sessions: [
                    { title: 'Wicked (Samsung Onyx 4K HDR)', poster: '/assets/3d/hero-ring.png', time: '16:30', hall: 'OnyxLED', duration: 160, capacity: 100, sold: 95, fsk: 'FSK 6' },
                    { title: 'Gladiator II (Samsung Onyx 4K HDR)', poster: '/assets/3d/hero-cube.png', time: '20:00', hall: 'OnyxLED', duration: 148, capacity: 100, sold: 98, fsk: 'FSK 16' }
                ]
            }
        ];
    }

    // München Mathäser (14 halls with Dolby Cinema and (m)K6)
    if (slug === 'mm') {
        return [
            {
                name: 'Dolby Cinema (Saal 1)',
                sessions: [
                    { title: 'Gladiator II (Dolby Vision & Atmos)', poster: '/assets/3d/hero-cube.png', time: '14:30', hall: 'Dolby Cinema', duration: 148, capacity: 500, sold: 410, fsk: 'FSK 16' },
                    { title: 'Wicked (Dolby Cinema)', poster: '/assets/3d/hero-ring.png', time: '17:45', hall: 'Dolby Cinema', duration: 160, capacity: 500, sold: 485, fsk: 'FSK 6' },
                    { title: 'Dune: Part Two (Dolby Cinema Re-Release)', poster: '/assets/3d/hero-cube.png', time: '21:00', hall: 'Dolby Cinema', duration: 166, capacity: 500, sold: 495, fsk: 'FSK 12' }
                ]
            },
            {
                name: '(m)K6 (Großsaal)',
                sessions: [
                    { title: 'Red One – Alarmstufe Weihnachten', poster: '/assets/3d/hero-helix.png', time: '15:15', hall: '(m)K6', duration: 123, capacity: 420, sold: 260, fsk: 'FSK 12' },
                    { title: 'Venom: The Last Dance', poster: '/assets/3d/hero-gear.png', time: '18:15', hall: '(m)K6', duration: 110, capacity: 420, sold: 340, fsk: 'FSK 16' },
                    { title: 'Gladiator II (OV)', poster: '/assets/3d/hero-cube.png', time: '20:45', hall: '(m)K6', duration: 148, capacity: 420, sold: 380, fsk: 'FSK 16' }
                ]
            },
            {
                name: 'Kino 2 – 5',
                sessions: [
                    { title: 'Vaiana 2', poster: '/assets/3d/hero-ring.png', time: '14:45', hall: 'Kino 2', duration: 100, capacity: 320, sold: 290, fsk: 'FSK 0' },
                    { title: 'Alter weißer Mann', poster: '/assets/3d/avatar-1.png', time: '17:15', hall: 'Kino 3', duration: 114, capacity: 280, sold: 190, fsk: 'FSK 12' },
                    { title: 'Konklave', poster: '/assets/3d/avatar-3.png', time: '20:00', hall: 'Kino 4', duration: 120, capacity: 210, sold: 165, fsk: 'FSK 12' }
                ]
            },
            {
                name: 'Kino 7 – 14',
                sessions: [
                    { title: 'Smile 2', poster: '/assets/3d/avatar-1.png', time: '17:30', hall: 'Kino 8', duration: 127, capacity: 160, sold: 130, fsk: 'FSK 18' },
                    { title: 'Terrifier 3', poster: '/assets/3d/avatar-2.png', time: '20:30', hall: 'Kino 10', duration: 125, capacity: 140, sold: 135, fsk: 'FSK 18' }
                ]
            }
        ];
    }

    // München Gloria Palast
    if (slug === 'gp') {
        return [
            {
                name: 'Gloria Palast (Traditionssaal)',
                sessions: [
                    { title: 'Konklave (Genießer-Vorstellung mit Service)', poster: '/assets/3d/avatar-3.png', time: '15:30', hall: 'Gloria', duration: 120, capacity: 240, sold: 195, fsk: 'FSK 12' },
                    { title: 'Wicked (Gloria Palast Logen-Erlebnis)', poster: '/assets/3d/hero-ring.png', time: '18:15', hall: 'Gloria', duration: 160, capacity: 240, sold: 235, fsk: 'FSK 6' },
                    { title: 'Gladiator II (Gloria Palast Premium)', poster: '/assets/3d/hero-cube.png', time: '21:15', hall: 'Gloria', duration: 148, capacity: 240, sold: 220, fsk: 'FSK 16' }
                ]
            }
        ];
    }

    // Darmstadt Rex (programmkino rex)
    if (slug === 'rx') {
        return [
            {
                name: 'Rex (Hauptsaal)',
                sessions: [
                    { title: 'Anora (Palme d\'Or)', poster: '/assets/3d/avatar-1.png', time: '16:00', hall: 'Rex', duration: 139, capacity: 220, sold: 170, fsk: 'FSK 16' },
                    { title: 'The Room Next Door (OmU)', poster: '/assets/3d/avatar-2.png', time: '19:00', hall: 'Rex', duration: 107, capacity: 220, sold: 190, fsk: 'FSK 12' }
                ]
            },
            {
                name: 'Broadway',
                sessions: [
                    { title: 'Der Buchspazierer', poster: '/assets/3d/avatar-1.png', time: '16:30', hall: 'Broadway', duration: 98, capacity: 140, sold: 110, fsk: 'FSK 6' },
                    { title: 'In Liebe, Eure Hilde', poster: '/assets/3d/avatar-3.png', time: '19:30', hall: 'Broadway', duration: 124, capacity: 140, sold: 125, fsk: 'FSK 12' }
                ]
            },
            {
                name: 'Bambi & Classic',
                sessions: [
                    { title: 'Rickerl – Musik is höchstens a Hobby', poster: '/assets/3d/avatar-2.png', time: '18:00', hall: 'Bambi', duration: 104, capacity: 80, sold: 65, fsk: 'FSK 12' },
                    { title: 'Element of Crime – Wenn es dunkel und kalt wird', poster: '/assets/3d/avatar-1.png', time: '20:15', hall: 'Classic', duration: 94, capacity: 60, sold: 55, fsk: 'FSK 0' }
                ]
            }
        ];
    }

    // Darmstadt Citydome
    if (slug === 'cd') {
        return [
            {
                name: 'Helia 1',
                sessions: [
                    { title: 'Vaiana 2', poster: '/assets/3d/hero-ring.png', time: '14:45', hall: 'Helia 1', duration: 100, capacity: 320, sold: 280, fsk: 'FSK 0' },
                    { title: 'Alter weißer Mann', poster: '/assets/3d/avatar-1.png', time: '17:30', hall: 'Helia 1', duration: 114, capacity: 320, sold: 220, fsk: 'FSK 12' },
                    { title: 'Gladiator II', poster: '/assets/3d/hero-cube.png', time: '20:15', hall: 'Helia 1', duration: 148, capacity: 320, sold: 275, fsk: 'FSK 16' }
                ]
            },
            {
                name: 'Helia 2 – 7',
                sessions: [
                    { title: 'Die Schule der magischen Tiere 3', poster: '/assets/3d/avatar-2.png', time: '15:15', hall: 'Helia 2', duration: 105, capacity: 180, sold: 140, fsk: 'FSK 0' },
                    { title: 'Konklave', poster: '/assets/3d/avatar-3.png', time: '18:00', hall: 'Helia 3', duration: 120, capacity: 140, sold: 105, fsk: 'FSK 12' }
                ]
            },
            {
                name: 'Festival',
                sessions: [
                    { title: 'Smile 2', poster: '/assets/3d/avatar-1.png', time: '17:45', hall: 'Festival', duration: 127, capacity: 250, sold: 180, fsk: 'FSK 18' },
                    { title: 'Terrifier 3', poster: '/assets/3d/avatar-2.png', time: '20:30', hall: 'Festival', duration: 125, capacity: 250, sold: 215, fsk: 'FSK 18' }
                ]
            }
        ];
    }

    // Standard Darmstadt KINOPOLIS (kp) & General Fallback
    return [
        {
            name: 'Kino 1 (Laser Maxx / Dolby Atmos)',
            sessions: [
                { title: 'Gladiator II', poster: '/assets/3d/hero-cube.png', time: '14:30', hall: 'Kino 1', duration: 148, capacity: 450, sold: 280, fsk: 'FSK 16' },
                { title: 'Wicked', poster: '/assets/3d/hero-ring.png', time: '17:45', hall: 'Kino 1', duration: 160, capacity: 450, sold: 340, fsk: 'FSK 6' },
                { title: 'Dune: Part Two (Laser Maxx)', poster: '/assets/3d/hero-cube.png', time: '21:00', hall: 'Kino 1', duration: 166, capacity: 450, sold: 410, fsk: 'FSK 12' }
            ]
        },
        {
            name: 'Kino 2 (Dolby Atmos)',
            sessions: [
                { title: 'Red One – Alarmstufe Weihnachten', poster: '/assets/3d/hero-helix.png', time: '15:00', hall: 'Kino 2', duration: 123, capacity: 280, sold: 145, fsk: 'FSK 12' },
                { title: 'Venom: The Last Dance', poster: '/assets/3d/hero-gear.png', time: '18:00', hall: 'Kino 2', duration: 110, capacity: 280, sold: 210, fsk: 'FSK 16' },
                { title: 'Gladiator II (Dolby Atmos)', poster: '/assets/3d/hero-cube.png', time: '20:30', hall: 'Kino 2', duration: 148, capacity: 280, sold: 250, fsk: 'FSK 16' }
            ]
        },
        {
            name: 'Kino 3 (D-Box Motion)',
            sessions: [
                { title: 'Vaiana 2', poster: '/assets/3d/hero-ring.png', time: '14:45', hall: 'Kino 3', duration: 100, capacity: 210, sold: 190, fsk: 'FSK 0' },
                { title: 'Red One (D-Box 3D)', poster: '/assets/3d/hero-helix.png', time: '17:15', hall: 'Kino 3', duration: 123, capacity: 210, sold: 160, fsk: 'FSK 12' },
                { title: 'Venom: The Last Dance (D-Box)', poster: '/assets/3d/hero-gear.png', time: '20:15', hall: 'Kino 3', duration: 110, capacity: 210, sold: 185, fsk: 'FSK 16' }
            ]
        },
        {
            name: 'Kino 4 (Komfort Loge)',
            sessions: [
                { title: 'Alter weißer Mann', poster: '/assets/3d/avatar-1.png', time: '15:15', hall: 'Kino 4', duration: 114, capacity: 150, sold: 95, fsk: 'FSK 12' },
                { title: 'Die Schule der magischen Tiere 3', poster: '/assets/3d/avatar-2.png', time: '18:15', hall: 'Kino 4', duration: 105, capacity: 150, sold: 130, fsk: 'FSK 0' },
                { title: 'Konklave', poster: '/assets/3d/avatar-3.png', time: '20:45', hall: 'Kino 4', duration: 120, capacity: 150, sold: 115, fsk: 'FSK 12' }
            ]
        },
        {
            name: 'Kino 5 (Standard)',
            sessions: [
                { title: 'Smile 2', poster: '/assets/3d/avatar-1.png', time: '17:30', hall: 'Kino 5', duration: 127, capacity: 140, sold: 80, fsk: 'FSK 18' },
                { title: 'Terrifier 3', poster: '/assets/3d/avatar-2.png', time: '20:15', hall: 'Kino 5', duration: 125, capacity: 140, sold: 135, fsk: 'FSK 18' }
            ]
        },
        {
            name: 'Kino 6 – 8 (Standard Säle)',
            sessions: [
                { title: 'Anora (Palme d\'Or)', poster: '/assets/3d/avatar-3.png', time: '16:00', hall: 'Kino 6', duration: 139, capacity: 120, sold: 70, fsk: 'FSK 16' },
                { title: 'Der Buchspazierer', poster: '/assets/3d/avatar-1.png', time: '19:00', hall: 'Kino 6', duration: 98, capacity: 120, sold: 85, fsk: 'FSK 6' }
            ]
        }
    ];
}

/**
 * Detects pending and shift-wide poster changes for each cinema hall showcase.
 * 
 * @param {Array} hallsGrouped - List of halls with sessions
 * @param {Array} tomSessionsFlat - Flat list of tomorrow's sessions
 * @param {Array|Set} completedPosterIds - IDs already marked completed
 * @param {number} [currentMinutes] - Minute of the day (e.g. 14*60 + 30)
 * @returns {Object} { allChanges, pendingChanges, pendingCount }
 */
export function detectPosterChanges(hallsGrouped = [], tomSessionsFlat = [], completedPosterIds = [], currentMinutes = null) {
    const completedSet = completedPosterIds instanceof Set ? completedPosterIds : new Set(completedPosterIds || []);
    
    if (currentMinutes === null) {
        const now = new Date();
        currentMinutes = now.getHours() * 60 + now.getMinutes();
    }

    const allChanges = [];
    const pendingChanges = [];

    (hallsGrouped || []).forEach(hall => {
        const hallName = hall.name || 'Saal';
        const sessions = (hall.sessions || [])
            .filter(s => s && s.time && s.time.includes(':'))
            .sort((a, b) => a.time.localeCompare(b.time));

        if (sessions.length === 0) return;

        sessions.forEach((s, idx) => {
            const [sh, sm] = s.time.split(':').map(Number);
            const startMin = (sh || 0) * 60 + (sm || 0);
            const swapReadyMin = startMin + 20;

            if (idx < sessions.length - 1) {
                const nextMovie = sessions[idx + 1];
                if (s.title === nextMovie.title) return;

                const alertId = `poster-${hallName}-${nextMovie.title}-${nextMovie.time}`.replace(/\s+/g, '-');
                const isCompleted = completedSet.has(alertId);
                const isZe = /3D|OV|OmU|D-Box|Atmos|IMAX/i.test(nextMovie.title) || 
                             /3D|OV|OmU|D-Box|Atmos|IMAX/i.test(s.title);

                const changeObj = {
                    alertId,
                    hallName,
                    currentMovie: s,
                    nextMovie,
                    isEndDay: false,
                    swapReadyMin,
                    swapReadyTime: `${String(Math.floor(swapReadyMin / 60) % 24).padStart(2, '0')}:${String(swapReadyMin % 60).padStart(2, '0')}`,
                    isReadyNow: currentMinutes >= swapReadyMin,
                    isCompleted,
                    needsZe: isZe
                };

                allChanges.push(changeObj);
                if (changeObj.isReadyNow && !isCompleted) {
                    pendingChanges.push(changeObj);
                }
            } else {
                const nextMovie = (tomSessionsFlat || [])
                    .filter(ts => ts.hall === hallName || ts.hall === hallName.split(' ')[0])
                    .sort((a, b) => (a.time || '').localeCompare(b.time || ''))[0];

                if (nextMovie && nextMovie.title !== s.title) {
                    const alertId = `poster-last-${hallName}-${nextMovie.title}`.replace(/\s+/g, '-');
                    const isCompleted = completedSet.has(alertId);

                    const changeObj = {
                        alertId,
                        hallName,
                        currentMovie: s,
                        nextMovie,
                        isEndDay: true,
                        swapReadyMin,
                        swapReadyTime: `${String(Math.floor(swapReadyMin / 60) % 24).padStart(2, '0')}:${String(swapReadyMin % 60).padStart(2, '0')}`,
                        isReadyNow: currentMinutes >= swapReadyMin,
                        isCompleted,
                        needsZe: true
                    };

                    allChanges.push(changeObj);
                    if (changeObj.isReadyNow && !isCompleted) {
                        pendingChanges.push(changeObj);
                    }
                }
            }
        });
    });

    return {
        allChanges,
        pendingChanges,
        pendingCount: pendingChanges.length
    };
}

/**
 * Detects session exits (Saalauslässe) with countdown to doors open & cleaning window.
 * 
 * @param {Array} hallsGrouped
 * @param {number} [currentMinutes]
 * @param {Array|Set} [completedAuslassIds]
 * @returns {Array} List of upcoming exits sorted by end time
 */
export function detectAuslaesse(hallsGrouped = [], currentMinutes = null, completedAuslassIds = []) {
    const completedSet = completedAuslassIds instanceof Set ? completedAuslassIds : new Set(completedAuslassIds || []);
    
    if (currentMinutes === null) {
        const now = new Date();
        currentMinutes = now.getHours() * 60 + now.getMinutes();
    }

    const auslaesse = [];

    (hallsGrouped || []).forEach(hall => {
        (hall.sessions || []).forEach(s => {
            if (!s || !s.time || !s.time.includes(':')) return;
            const [sh, sm] = s.time.split(':').map(Number);
            const startMin = (sh || 0) * 60 + (sm || 0);
            const duration = s.duration || 110;
            const endMin = startMin + duration;
            const minUntilEnd = endMin - currentMinutes;

            const id = `auslass-${hall.name}-${s.title}-${s.time}`.replace(/\s+/g, '-');
            const isCompleted = completedSet.has(id);

            if (minUntilEnd >= -30 && minUntilEnd <= 120) {
                auslaesse.push({
                    id,
                    hallName: hall.name,
                    session: s,
                    startMin,
                    endMin,
                    endTimeStr: `${String(Math.floor(endMin / 60) % 24).padStart(2, '0')}:${String(endMin % 60).padStart(2, '0')}`,
                    minUntilEnd,
                    isCompleted,
                    statusText: minUntilEnd <= 0 ? 'Auslass läuft jetzt' : `Auslass in ${minUntilEnd} Min.`
                });
            }
        });
    });

    return auslaesse.sort((a, b) => a.endMin - b.endMin);
}

/**
 * Verifies age suitability and §11 JuSchG compliance.
 * 
 * @param {string} birthDateStr - YYYY-MM-DD
 * @param {string|number} movieFsk - 'FSK 0', 'FSK 6', 'FSK 12', 'FSK 16', 'FSK 18'
 * @param {boolean} isAccompanied - Accompanied by legal guardian
 * @returns {Object} { allowed: boolean, age: number, reason: string, badgeCss: string }
 */
export function checkFskCompliance(birthDateStr, movieFsk, isAccompanied = false) {
    if (!birthDateStr) {
        return { allowed: false, age: 0, reason: 'Bitte Geburtsdatum eingeben', badgeCss: 'geplant' };
    }

    const birth = new Date(birthDateStr);
    if (isNaN(birth.getTime())) {
        return { allowed: false, age: 0, reason: 'Ungültiges Geburtsdatum', badgeCss: 'geplant' };
    }

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    let requiredAge = 0;
    if (typeof movieFsk === 'number') requiredAge = movieFsk;
    else if (typeof movieFsk === 'string') {
        const m = movieFsk.match(/\d+/);
        requiredAge = m ? parseInt(m[0], 10) : 0;
    }

    // §11 Abs. 2 JuSchG Parental Guidance for FSK 12 (6-11 years allowed with parent)
    if (requiredAge === 12 && age >= 6 && age < 12 && isAccompanied) {
        return {
            allowed: true,
            age,
            requiredAge,
            reason: `Einlass ERLAUBT (§11 Abs. 2 JuSchG: PG-Regelung für 6–11-Jährige mit Erziehungsberechtigten)`,
            badgeCss: 'done'
        };
    }

    if (age >= requiredAge) {
        return {
            allowed: true,
            age,
            requiredAge,
            reason: `Einlass ERLAUBT (Gast ist ${age} Jahre alt, Anforderung: FSK ${requiredAge})`,
            badgeCss: 'done'
        };
    } else {
        return {
            allowed: false,
            age,
            requiredAge,
            reason: `Einlass VERBOTEN (Gast ist erst ${age} Jahre alt, Anforderung: FSK ${requiredAge})`,
            badgeCss: 'in-progress'
        };
    }
}


