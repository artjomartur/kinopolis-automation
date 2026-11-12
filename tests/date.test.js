import { describe, it, expect } from 'vitest';
import {
    parseDateSafe,
    formatMinutes,
    parseTimeToMinutes,
    formatDateTimeSafe,
    formatDateOnlySafe,
    formatTimeOnly,
    getTodayDateString
} from '../src/utils/date.js';

describe('Date & Time Utilities', () => {
    describe('parseTimeToMinutes', () => {
        it('should correctly parse regular times to minutes from midnight', () => {
            expect(parseTimeToMinutes('00:00')).toBe(0);
            expect(parseTimeToMinutes('01:30')).toBe(90);
            expect(parseTimeToMinutes('14:45')).toBe(14 * 60 + 45); // 885
            expect(parseTimeToMinutes('23:59')).toBe(23 * 60 + 59); // 1439
        });

        it('should handle invalid or empty input gracefully', () => {
            expect(parseTimeToMinutes('')).toBe(0);
            expect(parseTimeToMinutes(null)).toBe(0);
            expect(parseTimeToMinutes(undefined)).toBe(0);
            expect(parseTimeToMinutes('invalid')).toBe(0);
        });
    });

    describe('formatMinutes', () => {
        it('should format minute integers into HH:MM string', () => {
            expect(formatMinutes(0)).toBe('00:00');
            expect(formatMinutes(90)).toBe('01:30');
            expect(formatMinutes(885)).toBe('14:45');
            expect(formatMinutes(1439)).toBe('23:59');
        });

        it('should wrap around correctly for values >= 1440 and negative values', () => {
            expect(formatMinutes(1440)).toBe('00:00');
            expect(formatMinutes(1500)).toBe('01:00');
            expect(formatMinutes(-60)).toBe('23:00');
        });

        it('should return placeholder for NaN or null', () => {
            expect(formatMinutes(NaN)).toBe('--:--');
            expect(formatMinutes(null)).toBe('--:--');
        });
    });

    describe('parseDateSafe & formatting helpers', () => {
        it('should parse valid ISO date strings', () => {
            const d = parseDateSafe('2026-11-12T14:30:00.000Z');
            expect(d).toBeInstanceOf(Date);
            expect(d.toISOString()).toBe('2026-11-12T14:30:00.000Z');
        });

        it('should return null for invalid date strings', () => {
            expect(parseDateSafe('')).toBeNull();
            expect(parseDateSafe('not-a-date')).toBeNull();
            expect(parseDateSafe(null)).toBeNull();
        });

        it('should format date safely without throwing', () => {
            expect(formatDateTimeSafe('invalid')).toBe('--.--. ----:--');
            expect(formatDateOnlySafe('invalid')).toBe('--.--.----');
            expect(formatTimeOnly('invalid')).toBe('--:--');

            const valid = '2026-05-15T10:30:00Z';
            expect(formatDateTimeSafe(valid)).toContain('15.05');
            expect(formatDateOnlySafe(valid)).toBe('15.05.2026');
        });

        it('should return today date string in YYYY-MM-DD format', () => {
            const today = getTodayDateString();
            expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    });
});
