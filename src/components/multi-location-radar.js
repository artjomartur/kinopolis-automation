/**
 * Multi-Location / Bezirksleiter Radar Component
 * Provides a live multi-site comparison across all Kinopolis locations.
 */

import { api } from '../core/api.js';

export const LOCATIONS = [
    { code: 'kp', name: 'Darmstadt (KINOPOLIS)', group: 'Rhein-Main' },
    { code: 'cd', name: 'Darmstadt (Citydome)', group: 'Rhein-Main' },
    { code: 'rx', name: 'Darmstadt (Rex)', group: 'Rhein-Main' },
    { code: 'ab', name: 'Aschaffenburg', group: 'Franken' },
    { code: 'vi', name: 'Viernheim', group: 'Rhein-Neckar' },
    { code: 'bn', name: 'Bad Godesberg', group: 'NRW' },
    { code: 'bh', name: 'Bad Homburg', group: 'Rhein-Main' },
    { code: 'fr', name: 'Freiberg', group: 'Sachsen' },
    { code: 'gi', name: 'Gießen', group: 'Mittelhessen' },
    { code: 'hh', name: 'Hamburg', group: 'Nord' },
    { code: 'hu', name: 'Hanau', group: 'Rhein-Main' },
    { code: 'ka', name: 'Karlsruhe', group: 'Baden' },
    { code: 'ko', name: 'Koblenz', group: 'Rheinland' },
    { code: 'lh', name: 'Landshut', group: 'Bayern' },
    { code: 'ro', name: 'Rosenheim', group: 'Bayern' },
    { code: 'su', name: 'Sulzbach', group: 'Rhein-Main' }
];

export class MultiLocationRadar {
    /**
     * Fetch operational summary for key locations in parallel
     */
    static async fetchLocationsSummary(locationCodes = ['kp', 'cd', 'rx', 'ab', 'vi', 'su']) {
        const results = await Promise.allSettled(
            locationCodes.map(async (code) => {
                const locInfo = LOCATIONS.find(l => l.code === code) || { code, name: code.toUpperCase() };
                try {
                    const [sessions, tickets] = await Promise.all([
                        api.getSessions(code).catch(() => []),
                        api.getTechTickets(code).catch(() => [])
                    ]);

                    let totalSold = 0;
                    let totalCap = 0;
                    let totalShows = 0;

                    if (Array.isArray(sessions)) {
                        sessions.forEach(hall => {
                            (hall.sessions || []).forEach(s => {
                                totalShows++;
                                totalSold += Number(s.sold) || 0;
                                totalCap += Number(s.capacity) || 0;
                            });
                        });
                    }

                    const occupancy = totalCap > 0 ? Math.round((totalSold / totalCap) * 100) : 0;
                    const openTickets = (tickets || []).filter(t => t.status === 'offen' || t.status === 'in_arbeit').length;

                    let status = 'normal';
                    if (openTickets > 2) status = 'alert';
                    else if (occupancy >= 70) status = 'busy';

                    return {
                        code,
                        name: locInfo.name,
                        group: locInfo.group || 'Sonstige',
                        totalSold,
                        totalCap,
                        totalShows,
                        occupancy,
                        openTickets,
                        status
                    };
                } catch {
                    return {
                        code,
                        name: locInfo.name,
                        group: locInfo.group || 'Sonstige',
                        totalSold: 0,
                        totalCap: 0,
                        totalShows: 0,
                        occupancy: 0,
                        openTickets: 0,
                        status: 'offline'
                    };
                }
            })
        );

        const list = results.map(r => r.status === 'fulfilled' ? r.value : null).filter(Boolean);
        list.sort((a, b) => b.totalSold - a.totalSold);
        return list;
    }

    /**
     * Render the Multi-Location Radar in a container
     */
    static renderRadarWidget(containerId, dataList, onSelectLocation) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!dataList || dataList.length === 0) {
            container.innerHTML = '<div class="empty-state">Keine Standort-Daten verfügbar.</div>';
            return;
        }

        const totalNetworkVisitors = dataList.reduce((sum, d) => sum + d.totalSold, 0);
        const totalNetworkShows = dataList.reduce((sum, d) => sum + d.totalShows, 0);
        const avgNetworkOccupancy = Math.round(dataList.reduce((sum, d) => sum + d.occupancy, 0) / (dataList.length || 1));

        const statusBadges = {
            normal: '<span style="color: #10b981; background: rgba(16,185,129,0.15); padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 11px;">🟢 Normal</span>',
            busy: '<span style="color: #f59e0b; background: rgba(245,158,11,0.15); padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 11px;">🔥 Hohe Last</span>',
            alert: '<span style="color: #ef4444; background: rgba(239,68,68,0.15); padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 11px;">🚨 Störungen</span>',
            offline: '<span style="color: #a1a1aa; background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 11px;">⚪ Offline</span>'
        };

        const html = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            
            <!-- NETWORK OVERVIEW KPI ROW -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Gesamtbesucher (Netzwerk)</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #fff; margin-top: 0.3rem;">${totalNetworkVisitors.toLocaleString()}</div>
                    <div style="font-size: 0.75rem; color: #3b82f6; margin-top: 0.2rem;">${dataList.length} Standorte überwacht</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Netzwerk-Auslastung</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #f59e0b; margin-top: 0.3rem;">${avgNetworkOccupancy}%</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Durchschnitt über alle Häuser</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Gesamt-Vorstellungen</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #10b981; margin-top: 0.3rem;">${totalNetworkShows}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Heute im Spielbetrieb</div>
                </div>
            </div>

            <!-- SITE COMPARISON CARDS -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 16px; padding: 1.25rem;">
                <div style="font-size: 1.1rem; font-weight: 800; color: #fff; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <span>🌐 Standort-Ranking &amp; Live-Status</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">Klicke auf einen Standort für Sofort-Umschaltung</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                    ${dataList.map((d, rank) => `
                        <div onclick="window.onRadarSelectLocation && window.onRadarSelectLocation('${d.code}')" style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1rem; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.07)'; this.style.borderColor='var(--primary-blue)'" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='var(--surface-border)'">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="font-size: 1.2rem; font-weight: 900; color: ${rank === 0 ? '#f59e0b' : '#71717a'}; width: 24px; text-align: center;">#${rank + 1}</div>
                                <div>
                                    <div style="font-weight: 800; font-size: 1rem; color: #fff;">${d.name}</div>
                                    <div style="font-size: 0.75rem; color: var(--text-muted);">${d.group} • ${d.totalShows} Vorstellungen</div>
                                </div>
                            </div>

                            <div style="display: flex; align-items: center; gap: 1.5rem;">
                                <div style="text-align: right;">
                                    <div style="font-weight: 900; font-size: 1.1rem; color: #fff;">${d.totalSold.toLocaleString()} Gäste</div>
                                    <div style="font-size: 0.75rem; color: #3b82f6; font-weight: 700;">${d.occupancy}% Auslastung</div>
                                </div>
                                <div style="width: 110px; text-align: right;">
                                    ${statusBadges[d.status] || statusBadges.normal}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        `;

        container.innerHTML = html;
    }
}
