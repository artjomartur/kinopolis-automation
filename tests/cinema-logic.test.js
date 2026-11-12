import { describe, it, expect } from 'vitest';
import {
    calculatePopcornDemand,
    determineHallPhase,
    parseDurationFromText,
    parseFskFromText,
    calculateOccupancy
} from '../src/utils/cinema-logic.js';

describe('Cinema Core Business Logic', () => {
    describe('calculatePopcornDemand', () => {
        it('should calculate correct portions and ingredient weights for standard visitor count', () => {
            // 400 visitors * 0.25 = 100 portions
            // 100 portions / 4 = 25 batches
            // 25 batches * 1.0kg corn = 25.0 kg
            // 25 batches * 0.3kg fat = 7.5 kg
            // 25 batches * 0.4kg sugar = 10.0 kg
            const result = calculatePopcornDemand(400);

            expect(result.visitors).toBe(400);
            expect(result.expectedPortions).toBe(100);
            expect(result.recommendedBatches).toBe(25);
            expect(result.kornKg).toBe(25.0);
            expect(result.fettKg).toBe(7.5);
            expect(result.zuckerKg).toBe(10.0);
        });

        it('should handle small visitor counts with at least 1 batch if visitors > 0', () => {
            const result = calculatePopcornDemand(10);
            expect(result.expectedPortions).toBe(3); // 10 * 0.25 = 2.5 rounded to 3
            expect(result.recommendedBatches).toBe(1);
            expect(result.kornKg).toBe(1.0);
            expect(result.fettKg).toBe(0.3);
            expect(result.zuckerKg).toBe(0.4);
        });

        it('should handle 0 or negative visitors safely', () => {
            const zeroRes = calculatePopcornDemand(0);
            expect(zeroRes.visitors).toBe(0);
            expect(zeroRes.expectedPortions).toBe(0);
            expect(zeroRes.recommendedBatches).toBe(0);
            expect(zeroRes.kornKg).toBe(0.0);

            const negRes = calculatePopcornDemand(-50);
            expect(negRes.visitors).toBe(0);
            expect(negRes.expectedPortions).toBe(0);
        });

        it('should allow custom conversion rate', () => {
            // High family/kids movie rate: 50% buy rate
            const result = calculatePopcornDemand(200, 0.50);
            expect(result.expectedPortions).toBe(100);
            expect(result.recommendedBatches).toBe(25);
        });
    });

    describe('determineHallPhase', () => {
        const session = {
            time: '14:30',
            duration: 120 // 14:30 to 16:30 (870 to 990 min)
        };

        it('should report planned phase when start is far away (> 20 min)', () => {
            // At 13:00 (780 min): 90 min before start
            const phase = determineHallPhase(session, 780);
            expect(phase.phase).toBe('planned');
            expect(phase.badge).toBe('planned');
            expect(phase.minutesRemaining).toBe(90);
            expect(phase.label).toContain('Start in 90 Min.');
        });

        it('should report admission phase 20-0 minutes before start', () => {
            // At 14:15 (855 min): 15 min before start
            const phase = determineHallPhase(session, 855);
            expect(phase.phase).toBe('admission');
            expect(phase.badge).toBe('admission');
            expect(phase.minutesRemaining).toBe(15);
            expect(phase.label).toContain('Einlass läuft');
        });

        it('should report running phase during movie presentation', () => {
            // At 15:30 (930 min): 60 min into movie, 60 min remaining
            const phase = determineHallPhase(session, 930);
            expect(phase.phase).toBe('running');
            expect(phase.badge).toBe('running');
            expect(phase.minutesRemaining).toBe(60);
            expect(phase.label).toContain('Vorstellung läuft');
        });

        it('should report cleaning phase immediately after movie ends', () => {
            // At 16:35 (995 min): 5 min after movie end, cleaning window is 15 min (until 16:45 / 1005 min)
            const phase = determineHallPhase(session, 995, 15);
            expect(phase.phase).toBe('cleaning');
            expect(phase.badge).toBe('cleaning');
            expect(phase.minutesRemaining).toBe(10); // 1005 - 995 = 10
            expect(phase.label).toContain('Saalreinigung');
        });

        it('should report ready phase once cleaning buffer is passed', () => {
            // At 16:50 (1010 min): after cleaning finished (1005 min)
            const phase = determineHallPhase(session, 1010, 15);
            expect(phase.phase).toBe('ready');
            expect(phase.badge).toBe('ready');
            expect(phase.minutesRemaining).toBe(0);
        });

        it('should return ready fallback for invalid or empty session', () => {
            const phase = determineHallPhase(null, 500);
            expect(phase.phase).toBe('ready');
        });
    });

    describe('parseDurationFromText', () => {
        it('should parse "Dauer: 148 Minuten"', () => {
            expect(parseDurationFromText('Dauer: 148 Minuten')).toBe(148);
            expect(parseDurationFromText('Dauer:  95  Minuten | FSK 12')).toBe(95);
        });

        it('should parse abbreviated "123 Min."', () => {
            expect(parseDurationFromText('Action / 123 Min.')).toBe(123);
            expect(parseDurationFromText('90 Min')).toBe(90);
        });

        it('should return 0 for missing or unparseable duration', () => {
            expect(parseDurationFromText('')).toBe(0);
            expect(parseDurationFromText(null)).toBe(0);
            expect(parseDurationFromText('Nur Text ohne Minutenangabe')).toBe(0);
        });
    });

    describe('parseFskFromText', () => {
        it('should extract FSK from text string', () => {
            expect(parseFskFromText('ab 12 Jahren')).toBe('FSK 12');
            expect(parseFskFromText('FSK 16 freigegeben')).toBe('FSK 16');
            expect(parseFskFromText('FSK 0')).toBe('FSK 0');
        });

        it('should prioritize image alt attribute if provided', () => {
            expect(parseFskFromText('Info Text', 'FSK 18 Logo')).toBe('FSK 18');
        });

        it('should fallback to "FSK ?" if unknown', () => {
            expect(parseFskFromText('')).toBe('FSK ?');
            expect(parseFskFromText('Keine Altersfreigabe bekannt')).toBe('FSK ?');
        });
    });

    describe('calculateOccupancy', () => {
        it('should calculate accurate percentages', () => {
            expect(calculateOccupancy(50, 200)).toBe(25.0);
            expect(calculateOccupancy(133, 200)).toBe(66.5);
            expect(calculateOccupancy(200, 200)).toBe(100.0);
        });

        it('should clamp to 100% maximum and 0% minimum', () => {
            expect(calculateOccupancy(250, 200)).toBe(100.0);
            expect(calculateOccupancy(-10, 200)).toBe(0.0);
        });

        it('should handle zero capacity without dividing by zero', () => {
            expect(calculateOccupancy(10, 0)).toBe(0);
        });
    });
});
