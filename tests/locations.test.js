import { describe, it, expect } from 'vitest';

export const KINOPOLIS_LOCATIONS = [
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
    { name: 'Main-Taunus: KINOPOLIS (MTZ)', slug: 'su' },
    { name: 'Rhein-Neckar: KINOPOLIS (Viernheim)', slug: 'rn' },
    { name: 'Rosenheim: Citydome', slug: 'ro' }
];

describe('Kinopolis Locations Configuration', () => {
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
        });
    });

    it('should include core major hubs: Darmstadt (kp), Main-Taunus (su), Hanau (hu)', () => {
        const slugs = KINOPOLIS_LOCATIONS.map(l => l.slug);
        expect(slugs).toContain('kp');
        expect(slugs).toContain('su');
        expect(slugs).toContain('hu');
    });
});
