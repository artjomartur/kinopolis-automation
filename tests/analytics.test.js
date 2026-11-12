import { describe, it, expect } from 'vitest';
import { CinemaAnalytics } from '../src/components/analytics.js';

describe('CinemaAnalytics Logic', () => {
    it('should return zeroed defaults when sessions list is empty or null', () => {
        const emptyResult = CinemaAnalytics.analyzeSessionTraffic([]);
        expect(emptyResult.totalVisitors).toBe(0);
        expect(emptyResult.totalCapacity).toBe(0);
        expect(emptyResult.occupancyRate).toBe(0);
        expect(emptyResult.peakHour).toBe('--:--');
        expect(emptyResult.foyerLoadCurrent).toBe('low');

        const nullResult = CinemaAnalytics.analyzeSessionTraffic(null);
        expect(nullResult.totalVisitors).toBe(0);
    });

    it('should aggregate total visitors, capacity, and overall occupancy rate', () => {
        const sampleSessions = [
            {
                title: 'Gladiator II',
                time: '14:30',
                duration: 150,
                capacity: 300,
                sold: 210,
                hall: 'Kino 1'
            },
            {
                title: 'Wicked',
                time: '17:00',
                duration: 160,
                capacity: 200,
                sold: 150,
                hall: 'Kino 2'
            },
            {
                title: 'Gladiator II',
                time: '20:00',
                duration: 150,
                capacity: 300,
                sold: 270,
                hall: 'Kino 1'
            }
        ];

        const analysis = CinemaAnalytics.analyzeSessionTraffic(sampleSessions);

        expect(analysis.totalVisitors).toBe(630); // 210 + 150 + 270
        expect(analysis.totalCapacity).toBe(800); // 300 + 200 + 300
        expect(analysis.occupancyRate).toBe(79); // 630 / 800 * 100 = 78.75% -> 79%

        // Check top movies ranking
        expect(analysis.topMovies.length).toBe(2);
        expect(analysis.topMovies[0].title).toBe('Gladiator II');
        expect(analysis.topMovies[0].sold).toBe(480); // 210 + 270
        expect(analysis.topMovies[1].title).toBe('Wicked');
        expect(analysis.topMovies[1].sold).toBe(150);
    });

    it('should correctly schedule admissions wave 20-30 minutes before session start', () => {
        const session = [
            {
                title: 'Dune: Part Two',
                time: '15:00', // startMin = 900 min. Admission min = 900 - 20 = 880 min -> 14:40 (14:30-14:45 bucket)
                duration: 120, // endMin = 900 + 120 = 1020 min -> 17:00
                capacity: 250,
                sold: 200,
                hall: 'Kino 1'
            }
        ];

        const analysis = CinemaAnalytics.analyzeSessionTraffic(session);
        const timeline = analysis.timeline;
        expect(timeline.length).toBeGreaterThan(0);

        // Find the bucket that recorded admissions
        const admissionBucket = timeline.find(b => b.admissions > 0);
        expect(admissionBucket).toBeDefined();
        expect(admissionBucket.admissions).toBe(200);
        expect(admissionBucket.hallsStarting.length).toBe(1);
        expect(admissionBucket.hallsStarting[0].hall).toBe('Kino 1');
        expect(admissionBucket.hallsStarting[0].movie).toBe('Dune: Part Two');

        // Find the bucket that recorded exits (at 17:00)
        const exitBucket = timeline.find(b => b.exits > 0);
        expect(exitBucket).toBeDefined();
        expect(exitBucket.exits).toBe(200);
        expect(exitBucket.hallsEnding.length).toBe(1);
        expect(exitBucket.hallsEnding[0].hall).toBe('Kino 1');
    });
});
