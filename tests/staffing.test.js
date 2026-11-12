import { describe, it, expect } from 'vitest';
import { StaffingOptimizer } from '../src/components/staffing-optimizer.js';

describe('StaffingOptimizer Logic', () => {
    it('should return baseline staffing plan when sessions list is empty', () => {
        const plan = StaffingOptimizer.calculateStaffingNeeds([], 'Darmstadt');
        expect(plan.locationName).toBe('Darmstadt');
        expect(plan.hourlyPlan).toEqual([]);
        expect(plan.recommendedBaseStaff).toBe(2);
        expect(plan.totalLaborHours).toBe(0);
    });

    it('should scale staffing recommendations based on admission and exit volumes', () => {
        const sessions = [
            {
                title: 'Mega Blockbuster 1',
                time: '18:00', // start 18:00, admission impact hour before start (hour 17)
                duration: 120,
                sold: 280
            },
            {
                title: 'Mega Blockbuster 2',
                time: '18:15',
                duration: 120,
                sold: 210
            }
        ];

        const plan = StaffingOptimizer.calculateStaffingNeeds(sessions, 'MTZ');
        expect(plan.hourlyPlan.length).toBe(15); // Hours 10:00 to 24:00

        // Slot for hour 17 (17:00 - 18:00) should receive admissions
        const slot17 = plan.hourlyPlan.find(s => s.hour === 17);
        expect(slot17).toBeDefined();
        expect(slot17.admissions).toBe(490); // 280 + 210

        // Concessions: Math.max(1, Math.ceil(490 / 70)) = 7
        expect(slot17.concessionStaff).toBe(7);
        // Door staff: admissions > 150 -> 2
        expect(slot17.doorStaff).toBe(2);
        // TL staff always 1
        expect(slot17.tlStaff).toBe(1);
        // Total staff >= 10
        expect(slot17.totalStaff).toBeGreaterThanOrEqual(10);
        // Urgency must be marked as 'peak' (> 250 admissions or totalStaff >= 6)
        expect(slot17.urgency).toBe('peak');
    });

    it('should identify late evening cost-saving windows during low traffic', () => {
        // Only one early afternoon session
        const afternoonSession = [
            {
                title: 'Matinee Film',
                time: '14:00',
                duration: 90,
                sold: 30
            }
        ];

        const plan = StaffingOptimizer.calculateStaffingNeeds(afternoonSession, 'Hanau');
        
        // Late hours (e.g. 21:00, 22:00, 23:00) should have low admissions and exits
        const slot22 = plan.hourlyPlan.find(s => s.hour === 22);
        expect(slot22.admissions).toBe(0);
        expect(slot22.exits).toBe(0);
        expect(slot22.urgency).toBe('saving');
        expect(plan.savingWindow).not.toBe('--:--');
    });
});
