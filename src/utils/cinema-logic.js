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
