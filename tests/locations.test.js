import { describe, it, expect } from 'vitest';
import { KINOPOLIS_LOCATIONS, getFallbackHalls, sortHallsNaturally } from '../src/utils/cinema-logic.js';

export { KINOPOLIS_LOCATIONS };

describe('Kinopolis Locations Configuration', () => {
    it('should have exactly 18 official supported Kinopolis locations', () => {
        expect(KINOPOLIS_LOCATIONS.length).toBe(18);
    });

    it('should have unique slugs for all supported locations', () => {
        const slugs = KINOPOLIS_LOCATIONS.map(l => l.slug);
        const uniqueSlugs = new Set(slugs);
        expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('each location should have a non-empty name and a 2-character slug', () => {
        KINOPOLIS_LOCATIONS.forEach(loc => {
            expect(loc.name).toBeTruthy();
            expect(typeof loc.name).toBe('string');
            expect(loc.slug).toMatch(/^[a-z]{2}$/);
            expect(loc.hallCount).toBeGreaterThan(0);
        });
    });

    it('should include core major hubs with official slugs: Darmstadt (kp), Sulzbach/MTZ (su), Viernheim (vi), Mathäser München (mm), Gloria Palast (gp), Hamburg (hh)', () => {
        const slugs = KINOPOLIS_LOCATIONS.map(l => l.slug);
        expect(slugs).toContain('kp');
        expect(slugs).toContain('su');
        expect(slugs).toContain('vi');
        expect(slugs).toContain('mm');
        expect(slugs).toContain('gp');
        expect(slugs).toContain('hh');
        expect(slugs).toContain('hu');
        expect(slugs).toContain('cd');
        expect(slugs).toContain('rx');
    });

    it('should provide location-specific fallback halls for Sulzbach, Mathäser, Gloria Palast, and Darmstadt', () => {
        const suHalls = getFallbackHalls('su');
        expect(suHalls.some(h => h.name.includes('Laser Maxx'))).toBe(true);
        expect(suHalls.some(h => h.name.includes('OnyxLED'))).toBe(true);

        const mmHalls = getFallbackHalls('mm');
        expect(mmHalls.some(h => h.name.includes('Dolby Cinema'))).toBe(true);
        expect(mmHalls.some(h => h.name.includes('(m)K6'))).toBe(true);

        const gpHalls = getFallbackHalls('gp');
        expect(gpHalls.some(h => h.name.includes('Gloria'))).toBe(true);

        const rxHalls = getFallbackHalls('rx');
        expect(rxHalls.some(h => h.name.includes('Rex'))).toBe(true);
    });

    it('should naturally sort hall names so Kino 2 precedes Kino 10', () => {
        const halls = ['Kino 10', 'Kino 1', 'Kino 2', 'Dolby Cinema', 'Kino 12'];
        const sorted = [...halls].sort(sortHallsNaturally);
        expect(sorted[0]).toBe('Dolby Cinema');
        expect(sorted[1]).toBe('Kino 1');
        expect(sorted[2]).toBe('Kino 2');
        expect(sorted[3]).toBe('Kino 10');
        expect(sorted[4]).toBe('Kino 12');
    });
});

