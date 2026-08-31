/**
 * Staffing Optimizer Component for Kinopolis Betriebsleiter
 * Calculates exact hourly staffing requirements, peak staffing windows, and labor cost savings.
 */

import { parseTimeToMinutes, formatMinutes } from '../utils/date.js';
import { copyToClipboard } from '../utils/ui.js';

export class StaffingOptimizer {
    /**
     * Compute hour-by-hour staffing recommendation from sessions
     */
    static calculateStaffingNeeds(sessions, locationName = 'Standort') {
        if (!sessions || sessions.length === 0) {
            return {
                hourlyPlan: [],
                peakWindow: '--:--',
                peakStaffTotal: 0,
                savingWindow: '--:--',
                recommendedBaseStaff: 2,
                totalLaborHours: 0
            };
        }

        // 1-hour slots from 10:00 to 24:00 (14 slots: index 10 to 23)
        const hourlyData = Array.from({ length: 15 }, (_, i) => {
            const hour = i + 10;
            return {
                hour,
                hourLabel: `${hour}:00 - ${hour + 1}:00`,
                admissions: 0,
                exits: 0,
                concessionStaff: 1,
                doorStaff: 1,
                floorStaff: 0,
                tlStaff: 1,
                totalStaff: 3,
                urgency: 'low' // low, medium, peak, saving
            };
        });

        sessions.forEach(s => {
            const sold = Number(s.sold) || 0;
            const startMin = s.startMin ?? parseTimeToMinutes(s.time);
            const duration = Number(s.duration) || 100;
            const endMin = s.endMin ?? (startMin + duration);

            // Admissions impact hour before start
            const startHour = Math.floor(Math.max(0, startMin - 20) / 60);
            const endHour = Math.floor(endMin / 60);

            if (startHour >= 10 && startHour <= 24) {
                const idx = startHour - 10;
                if (hourlyData[idx]) hourlyData[idx].admissions += sold;
            }

            if (endHour >= 10 && endHour <= 24) {
                const idx = endHour - 10;
                if (hourlyData[idx]) hourlyData[idx].exits += sold;
            }
        });

        // Compute recommended staff for each hour
        let maxStaff = 0;
        let peakSlot = null;
        let savingSlot = null;
        let totalLaborHours = 0;

        hourlyData.forEach(slot => {
            // Concessions: 1 base + 1 for each 70 admissions in the hour
            slot.concessionStaff = Math.max(1, Math.ceil(slot.admissions / 70));
            // Door / Scanner: 1 base, 2 if > 150 admissions
            slot.doorStaff = slot.admissions > 150 ? 2 : 1;
            // Floor / Cleaning: 1 if > 120 exits, 2 if > 250 exits
            slot.floorStaff = slot.exits > 250 ? 2 : (slot.exits > 120 ? 1 : 0);
            slot.tlStaff = 1;

            slot.totalStaff = slot.concessionStaff + slot.doorStaff + slot.floorStaff + slot.tlStaff;
            totalLaborHours += slot.totalStaff;

            if (slot.totalStaff > maxStaff) {
                maxStaff = slot.totalStaff;
                peakSlot = slot;
            }

            if (slot.admissions > 250 || slot.totalStaff >= 6) {
                slot.urgency = 'peak';
            } else if (slot.admissions > 100 || slot.totalStaff >= 4) {
                slot.urgency = 'medium';
            } else if (slot.hour >= 21 && slot.admissions < 40 && slot.exits < 60) {
                slot.urgency = 'saving';
                if (!savingSlot) savingSlot = slot;
            } else {
                slot.urgency = 'low';
            }
        });

        return {
            locationName,
            hourlyPlan: hourlyData,
            peakWindow: peakSlot ? peakSlot.hourLabel : '--:--',
            peakStaffTotal: maxStaff,
            savingWindow: savingSlot ? savingSlot.hourLabel : 'Ab 22:30 Uhr',
            totalLaborHours
        };
    }

    /**
     * Render the Staffing Optimizer Widget
     */
    static renderStaffingWidget(containerId, planData) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!planData || planData.hourlyPlan.length === 0) {
            container.innerHTML = '<div class="empty-state">Keine Vorstellungsdaten zur Personalberechnung vorhanden.</div>';
            return;
        }

        const urgencyStyles = {
            peak: 'background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3);',
            medium: 'background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3);',
            saving: 'background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3);',
            low: 'background: rgba(255,255,255,0.03); color: #a1a1aa; border: 1px solid var(--surface-border);'
        };

        const urgencyLabels = {
            peak: '🔥 Stoßzeit (Vollbesetzung)',
            medium: '⚡ Mittlere Last',
            saving: '💰 Sparpotenzial (Abmelden)',
            low: '🟢 Ruhig (Grundbesetzung)'
        };

        const html = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <!-- SUMMARY KPI ROW -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Spitzen-Bedarf (Peak)</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #ef4444; margin-top: 0.3rem;">${planData.peakStaffTotal} Mitarbeiter</div>
                    <div style="font-size: 0.75rem; color: #f59e0b; margin-top: 0.2rem;">Fenster: ${planData.peakWindow}</div>
                </div>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Kostenkontrolle / Feierabend</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #10b981; margin-top: 0.3rem;">${planData.savingWindow}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">1-2 Kräfte früher abmelden</div>
                </div>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Kalkulierte Schicht-Stunden</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #3b82f6; margin-top: 0.3rem;">${planData.totalLaborHours} Std.</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Optimierte Tages-Einsatzzeit</div>
                </div>
            </div>

            <!-- HOURLY STAFFING TABLE -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 16px; padding: 1.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                    <div>
                        <div style="font-size: 1.1rem; font-weight: 800; color: #fff;">👥 Stunden-Dienstplan &amp; Besetzungsempfehlung</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">Dynamisch berechnet aus Einlass-Wellen und Saalauslässen</div>
                    </div>
                    <button onclick="StaffingOptimizer.copyStaffingPlan('${containerId}')" style="font-size: 0.8rem; font-weight: 700; padding: 0.4rem 0.9rem; border-radius: 8px; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); cursor: pointer;">
                        📋 Dienstplan-Empfehlung kopieren
                    </button>
                </div>

                <div style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
                        <thead>
                            <tr style="background: rgba(255,255,255,0.04); border-bottom: 1px solid var(--surface-border);">
                                <th style="padding: 0.75rem;">Uhrzeit</th>
                                <th style="padding: 0.75rem;">Gäste Einlass</th>
                                <th style="padding: 0.75rem;">Concession</th>
                                <th style="padding: 0.75rem;">Einlass / Scan</th>
                                <th style="padding: 0.75rem;">Saalreinigung</th>
                                <th style="padding: 0.75rem; font-weight: 900; color: #fff;">Empf. Gesamt</th>
                                <th style="padding: 0.75rem;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${planData.hourlyPlan.map(slot => `
                                <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                                    <td style="padding: 0.75rem; font-weight: 700; color: #fff;">${slot.hourLabel}</td>
                                    <td style="padding: 0.75rem; color: #cbd5e1;">${slot.admissions > 0 ? slot.admissions + ' Gäste' : '-'}</td>
                                    <td style="padding: 0.75rem;"><span style="color: #f59e0b; font-weight: 700;">${slot.concessionStaff}x</span> Theke</td>
                                    <td style="padding: 0.75rem;"><span style="color: #3b82f6; font-weight: 700;">${slot.doorStaff}x</span> Einlass</td>
                                    <td style="padding: 0.75rem;"><span style="color: #10b981; font-weight: 700;">${slot.floorStaff}x</span> Saal</td>
                                    <td style="padding: 0.75rem; font-weight: 900; font-size: 1rem; color: #fff;">${slot.totalStaff} Personen</td>
                                    <td style="padding: 0.75rem;">
                                        <span style="${urgencyStyles[slot.urgency]} padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700;">
                                            ${urgencyLabels[slot.urgency]}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `;

        container.innerHTML = html;
        container._staffingPlan = planData;
    }

    /**
     * Copy Staffing Plan to Clipboard
     */
    static copyStaffingPlan(containerId) {
        const container = document.getElementById(containerId);
        const plan = container?._staffingPlan;
        if (!plan) return;

        let text = `👥 *DIENSTPLAN-BESETZUNGSEMPFEHLUNG - ${plan.locationName.toUpperCase()}*\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `🔥 *Peak-Fenster:* ${plan.peakWindow} (Mind. ${plan.peakStaffTotal} Mitarbeiter)\n`;
        text += `💰 *Spar-Fenster:* ${plan.savingWindow} (1-2 Mitarbeiter abmelden)\n`;
        text += `⏱️ *Kalkulierte Gesamtstunden:* ${plan.totalLaborHours} Std.\n\n`;
        text += `*Stunden-Übersicht:*\n`;

        plan.hourlyPlan.forEach(s => {
            if (s.admissions > 0 || s.totalStaff > 3) {
                text += `• ${s.hourLabel}: *${s.totalStaff} Pers.* (${s.concessionStaff}x Theke, ${s.doorStaff}x Einlass${s.floorStaff > 0 ? `, ${s.floorStaff}x Saal` : ''})\n`;
            }
        });

        text += `\n_Generiert via Kinopolis Staffing Optimizer_`;
        copyToClipboard(text, 'Dienstplan-Empfehlung kopiert!');
    }
}
