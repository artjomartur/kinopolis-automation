/**
 * Analytics & Peak Radar Component for Kinopolis Automation
 * Calculates Foyer traffic waves, Admission & Exit peaks, and staffing recommendations.
 */

import { parseTimeToMinutes, formatMinutes } from '../utils/date.js';

export class CinemaAnalytics {
    /**
     * Compute timeline waves (admission + exit) in 15-minute buckets
     * @param {Array} sessions - Array of session objects
     * @returns {Object} Analytics summary and bucketed timeline
     */
    static analyzeSessionTraffic(sessions) {
        if (!sessions || sessions.length === 0) {
            return {
                totalVisitors: 0,
                totalCapacity: 0,
                occupancyRate: 0,
                peakHour: '--:--',
                peakVisitors: 0,
                topMovies: [],
                timeline: [],
                foyerLoadCurrent: 'low', // low, medium, high
                currentActiveCount: 0
            };
        }

        let totalVisitors = 0;
        let totalCapacity = 0;
        const movieMap = new Map();

        // 15-minute buckets across 24 hours (96 buckets: 0 to 95)
        // Each bucket records: admissions (entry wave ~25 min before start), exits (end of movie), and active in halls
        const buckets = Array.from({ length: 96 }, (_, i) => ({
            index: i,
            minute: i * 15,
            timeStr: formatMinutes(i * 15),
            admissions: 0,
            exits: 0,
            foyerLoad: 0, // admissions + exits
            activeInHalls: 0,
            hallsStarting: [],
            hallsEnding: []
        }));

        const now = new Date();
        const currentMin = now.getHours() * 60 + now.getMinutes();

        sessions.forEach(s => {
            const sold = Number(s.sold) || 0;
            const cap = Number(s.capacity) || 0;
            totalVisitors += sold;
            totalCapacity += cap;

            // Movie ranking
            const title = s.title || 'Unbekannt';
            if (!movieMap.has(title)) {
                movieMap.set(title, { title, sold: 0, capacity: 0, count: 0 });
            }
            const m = movieMap.get(title);
            m.sold += sold;
            m.capacity += cap;
            m.count += 1;

            const startMin = s.startMin ?? parseTimeToMinutes(s.time);
            const duration = Number(s.duration) || 100;
            const endMin = s.endMin ?? (startMin + duration);

            // Admission wave (peaks 20-30 min before movie start at concessions/entry)
            const admissionMin = Math.max(0, startMin - 20);
            const admBucketIdx = Math.floor(admissionMin / 15);
            if (admBucketIdx >= 0 && admBucketIdx < 96) {
                buckets[admBucketIdx].admissions += sold;
                buckets[admBucketIdx].foyerLoad += sold;
                buckets[admBucketIdx].hallsStarting.push({ hall: s.hallId || s.hall, movie: title, sold, time: s.time });
            }

            // Exit wave (when movie ends)
            const exitBucketIdx = Math.floor(endMin / 15);
            if (exitBucketIdx >= 0 && exitBucketIdx < 96) {
                buckets[exitBucketIdx].exits += sold;
                buckets[exitBucketIdx].foyerLoad += (sold * 0.9); // ~90% stream into foyer/restrooms
                buckets[exitBucketIdx].hallsEnding.push({ hall: s.hallId || s.hall, movie: title, sold, time: formatMinutes(endMin) });
            }

            // In-hall attendance across active buckets
            const startBucket = Math.floor(startMin / 15);
            const endBucket = Math.floor(endMin / 15);
            for (let b = startBucket; b <= endBucket && b < 96; b++) {
                if (b >= 0) buckets[b].activeInHalls += sold;
            }
        });

        // Find peak foyer load
        let peakBucket = buckets[0];
        buckets.forEach(b => {
            if (b.foyerLoad > peakBucket.foyerLoad) {
                peakBucket = b;
            }
        });

        // Top movies sorted by sold tickets
        const topMovies = Array.from(movieMap.values())
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 5);

        // Filter relevant operational hours (e.g., 10:00 to 24:00)
        const relevantTimeline = buckets.filter(b => b.minute >= 600 && b.minute <= 1425);

        // Current foyer load
        const currentBucketIdx = Math.floor(currentMin / 15);
        const currentBucket = (currentBucketIdx >= 0 && currentBucketIdx < 96) ? buckets[currentBucketIdx] : null;
        let currentLoadLevel = 'low';
        if (currentBucket) {
            if (currentBucket.foyerLoad > 350) currentLoadLevel = 'high';
            else if (currentBucket.foyerLoad > 150) currentLoadLevel = 'medium';
        }

        return {
            totalVisitors,
            totalCapacity,
            occupancyRate: totalCapacity > 0 ? Math.round((totalVisitors / totalCapacity) * 100) : 0,
            peakHour: peakBucket ? peakBucket.timeStr : '--:--',
            peakVisitors: peakBucket ? Math.round(peakBucket.foyerLoad) : 0,
            topMovies,
            timeline: relevantTimeline,
            foyerLoadCurrent: currentLoadLevel,
            currentActiveCount: currentBucket ? currentBucket.activeInHalls : 0
        };
    }

    /**
     * Render the visual Analytics & Peak Radar component inside a target container
     */
    static renderAnalyticsWidget(containerId, analyticsData) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (!analyticsData || analyticsData.totalVisitors === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                    <div>Keine Vorstellungsdaten für den gewählten Tag vorhanden.</div>
                </div>
            `;
            return;
        }

        const maxLoad = Math.max(...analyticsData.timeline.map(t => t.foyerLoad), 100);

        const currentBadgeColor = {
            high: '#ef4444',
            medium: '#f59e0b',
            low: '#10b981'
        }[analyticsData.foyerLoadCurrent];

        const currentBadgeText = {
            high: '🚨 Hohe Foyer-Last (Starker Andrang)',
            medium: '⚡ Mittlere Last (Guter Durchlauf)',
            low: '🟢 Ruhige Phase (Optimal für Pausen)'
        }[analyticsData.foyerLoadCurrent];

        let html = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <!-- KP KPI ROW -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.75rem;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); padding: 1rem; border-radius: 10px;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Gäste Gesamt</div>
                    <div style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${analyticsData.totalVisitors.toLocaleString()}</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Kapazität: ${analyticsData.totalCapacity.toLocaleString()}</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); padding: 1rem; border-radius: 10px;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Auslastung</div>
                    <div style="font-size: 1.5rem; font-weight: 800; color: #3b82f6; margin-top: 0.25rem;">${analyticsData.occupancyRate}%</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">Standort-Schnitt</div>
                </div>
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); padding: 1rem; border-radius: 10px;">
                    <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Spitzenzeit (Peak)</div>
                    <div style="font-size: 1.5rem; font-weight: 800; color: #f59e0b; margin-top: 0.25rem;">${analyticsData.peakHour} Uhr</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted);">~${analyticsData.peakVisitors} Foyer-Gäste</div>
                </div>
            </div>

            <!-- LIVE STATUS BANNER -->
            <div style="background: rgba(255,255,255,0.02); border-left: 4px solid ${currentBadgeColor}; padding: 0.75rem 1rem; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 700; font-size: 0.9rem; color: ${currentBadgeColor};">${currentBadgeText}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Aktuell ca. ${analyticsData.currentActiveCount} Besucher in den laufenden Sälen.</div>
                </div>
            </div>

            <!-- FOYER & CONCESSION PEAK RADAR TIMELINE -->
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <div style="font-weight: 700; font-size: 0.95rem;">⚡ Foyer- & Theken-Last Timeline (15-Min-Radar)</div>
                    <div style="font-size: 0.7rem; color: var(--text-muted); display: flex; gap: 0.8rem;">
                        <span style="display: flex; align-items: center; gap: 0.3rem;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 2px; background: #3b82f6;"></span> Einlass-Welle</span>
                        <span style="display: flex; align-items: center; gap: 0.3rem;"><span style="display: inline-block; width: 8px; height: 8px; border-radius: 2px; background: #ef4444;"></span> Auslass-Welle</span>
                    </div>
                </div>

                <div style="display: flex; gap: 3px; align-items: flex-end; height: 110px; padding: 0.5rem 0; overflow-x: auto; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid var(--surface-border); padding-left: 0.5rem; padding-right: 0.5rem;">
                    ${analyticsData.timeline.map((t, idx) => {
                        const admHeight = maxLoad > 0 ? Math.round((t.admissions / maxLoad) * 80) : 0;
                        const exitHeight = maxLoad > 0 ? Math.round((t.exits / maxLoad) * 80) : 0;
                        const isHourLabel = t.minute % 60 === 0;
                        const hasPeak = (t.admissions + t.exits) > 150;

                        return `
                        <div style="flex: 1; min-width: 14px; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%; position: relative;" title="${t.timeStr} Uhr: ${t.admissions} Einlass / ${t.exits} Auslass">
                            <div style="width: 100%; display: flex; gap: 1px; align-items: flex-end;">
                                <div style="width: 50%; height: ${admHeight}px; background: ${hasPeak ? '#60a5fa' : '#3b82f6'}; border-radius: 2px 2px 0 0; min-height: ${t.admissions > 0 ? 3 : 0}px;"></div>
                                <div style="width: 50%; height: ${exitHeight}px; background: ${hasPeak ? '#f87171' : '#ef4444'}; border-radius: 2px 2px 0 0; min-height: ${t.exits > 0 ? 3 : 0}px;"></div>
                            </div>
                            <div style="font-size: 0.55rem; color: ${isHourLabel ? '#fff' : 'transparent'}; margin-top: 4px; font-weight: ${isHourLabel ? '700' : 'normal'};">
                                ${isHourLabel ? t.timeStr.split(':')[0] : ''}
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- TOP MOVIES RANKING -->
            <div>
                <div style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.75rem;">🎬 Top Filme des Tages</div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${analyticsData.topMovies.map((m, rank) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.02); padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.04);">
                            <div style="display: flex; align-items: center; gap: 0.6rem;">
                                <span style="font-weight: 800; font-size: 0.8rem; color: ${rank === 0 ? '#f59e0b' : 'var(--text-muted)'}; width: 16px;">#${rank + 1}</span>
                                <span style="font-size: 0.85rem; font-weight: 600;">${m.title}</span>
                            </div>
                            <div style="text-align: right;">
                                <span style="font-weight: 700; font-size: 0.85rem; color: #3b82f6;">${m.sold} Tickets</span>
                                <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.4rem;">(${m.count} Vorst.)</span>
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
