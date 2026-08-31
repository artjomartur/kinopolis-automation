/**
 * Executive Briefing Component for Kinopolis Betriebsleiter (BL Cockpit)
 * Aggregates daily key operational indicators, yesterday reviews, today forecasts, and action items.
 */

import { formatDateOnlySafe, formatTimeOnly } from '../utils/date.js';
import { copyToClipboard } from '../utils/ui.js';

export class ExecutiveBriefing {
    /**
     * Compute and aggregate the executive briefing data model
     */
    static buildBriefingModel({ locationName, locationCode, sessionsToday, logs, tickets, mhdItems, inventoryCounts, staffList }) {
        const todayStr = formatDateOnlySafe(new Date().toISOString());
        
        let totalShows = 0;
        let totalSold = 0;
        let totalCapacity = 0;
        const blockbusterShows = [];

        if (Array.isArray(sessionsToday)) {
            sessionsToday.forEach(s => {
                totalShows++;
                const sold = Number(s.sold) || 0;
                const cap = Number(s.capacity) || 0;
                totalSold += sold;
                totalCapacity += cap;

                const occupancy = cap > 0 ? Math.round((sold / cap) * 100) : 0;
                if (sold >= 80 || occupancy >= 65) {
                    blockbusterShows.push({
                        title: s.title || 'Unbekannt',
                        time: s.time || '--:--',
                        hall: s.hallId || s.hall || '?',
                        sold,
                        capacity: cap,
                        occupancy
                    });
                }
            });
        }

        blockbusterShows.sort((a, b) => b.sold - a.sold);

        const openTickets = (tickets || []).filter(t => t.status === 'offen' || t.status === 'in_arbeit');
        const criticalTickets = openTickets.filter(t => t.category === 'bild' || t.category === 'ton' || t.category === 'licht');

        const expiringMhd = (mhdItems || []).filter(item => {
            if (!item.mhd_date) return false;
            const diffDays = (new Date(item.mhd_date) - new Date()) / (1000 * 60 * 60 * 24);
            return diffDays <= 7;
        });

        // Determine Operational Health Status
        let healthStatus = 'ready'; // ready (green), attention (yellow), alert (red)
        let healthMessage = 'Alle Systeme betriebsbereit • Voller Spielbetrieb';

        if (criticalTickets.length > 0) {
            healthStatus = 'alert';
            healthMessage = `🚨 ${criticalTickets.length} kritische Technik-Meldung(en) in den Sälen!`;
        } else if (openTickets.length > 2 || expiringMhd.length > 3) {
            healthStatus = 'attention';
            healthMessage = '⚡ Handlungsbedarf: Offene Wartungstickets / MHD-Prüfung erforderlich';
        }

        const avgOccupancy = totalCapacity > 0 ? Math.round((totalSold / totalCapacity) * 100) : 0;

        return {
            locationName: locationName || locationCode,
            locationCode,
            date: todayStr,
            generatedAt: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            healthStatus,
            healthMessage,
            stats: {
                totalShows,
                totalSold,
                totalCapacity,
                avgOccupancy,
                estimatedConcessionsVisitors: Math.round(totalSold * 0.85)
            },
            blockbusterShows: blockbusterShows.slice(0, 4),
            openTickets,
            criticalTickets,
            expiringMhd,
            recentLogs: (logs || []).slice(0, 4)
        };
    }

    /**
     * Render the visual Executive Cockpit UI inside a target element
     */
    static renderCockpit(containerId, model) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const healthColors = {
            ready: '#10b981',
            attention: '#f59e0b',
            alert: '#ef4444'
        };
        const color = healthColors[model.healthStatus] || '#10b981';

        const html = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem; font-family: inherit;">
            
            <!-- BL EXECUTIVE HEADER BANNER -->
            <div style="background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)); border: 1.5px solid ${color}60; border-radius: 16px; padding: 1.5rem; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -50px; right: -50px; width: 180px; height: 180px; background: ${color}20; filter: blur(50px); border-radius: 50%;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; position: relative; z-index: 2;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.6rem;">
                            <span style="font-size: 1.4rem;">☕</span>
                            <h2 style="margin: 0; font-size: 1.4rem; font-weight: 800; color: #fff;">Morgen-Briefing für die Betriebsleitung</h2>
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">
                            Standort: <strong>${model.locationName}</strong> • Stand: ${model.date}, ${model.generatedAt} Uhr
                        </div>
                    </div>

                    <div style="display: flex; gap: 0.6rem;">
                        <button onclick="ExecutiveBriefing.copyBriefingText('${containerId}')" style="font-size: 0.8rem; font-weight: 700; padding: 0.5rem 1rem; border-radius: 8px; background: rgba(59,130,246,0.15); color: #60a5fa; border: 1px solid rgba(59,130,246,0.3); cursor: pointer;">
                            📋 Schicht-Briefing kopieren
                        </button>
                        <button onclick="ExecutiveBriefing.printBriefing('${containerId}')" style="font-size: 0.8rem; font-weight: 700; padding: 0.5rem 1rem; border-radius: 8px; background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.3); cursor: pointer;">
                            📄 Drucken / PDF
                        </button>
                    </div>
                </div>

                <div style="margin-top: 1rem; padding: 0.75rem 1rem; background: ${color}15; border-left: 4px solid ${color}; border-radius: 6px; font-weight: 700; font-size: 0.95rem; color: ${color};">
                    ${model.healthMessage}
                </div>
            </div>

            <!-- KEY NUMBERS GRID -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Erwartete Gäste Heute</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #fff; margin-top: 0.3rem;">${model.stats.totalSold.toLocaleString()}</div>
                    <div style="font-size: 0.75rem; color: #10b981; margin-top: 0.2rem;">${model.stats.totalShows} Vorstellungen geplant</div>
                </div>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Durchschnittl. Auslastung</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #3b82f6; margin-top: 0.3rem;">${model.stats.avgOccupancy}%</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">von ${model.stats.totalCapacity.toLocaleString()} Plätzen</div>
                </div>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Theken-Potenzial</div>
                    <div style="font-size: 2rem; font-weight: 900; color: #f59e0b; margin-top: 0.3rem;">~${model.stats.estimatedConcessionsVisitors}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">Geschätzte Gastro-Kunden</div>
                </div>

                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--surface-border); border-radius: 12px; padding: 1.25rem;">
                    <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 800; color: var(--text-muted);">Offene Störungen</div>
                    <div style="font-size: 2rem; font-weight: 900; color: ${model.openTickets.length > 0 ? '#ef4444' : '#10b981'}; margin-top: 0.3rem;">${model.openTickets.length}</div>
                    <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${model.criticalTickets.length} mit Prio Hoch</div>
                </div>
            </div>

            <!-- TWO COLUMN OPERATIONAL DETAILS -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
                
                <!-- BLOCKBUSTERS & HIGH OCCUPANCY SHOWS -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 14px; padding: 1.25rem;">
                    <div style="font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>🔥</span> Heutige Spitzen-Vorstellungen (>65% voll)
                    </div>

                    ${model.blockbusterShows.length === 0 ? `
                        <div style="color: var(--text-muted); font-size: 0.85rem; padding: 1rem 0; text-align: center;">Keine extremen Spitzen geplant – gleichmäßiger Durchlauf.</div>
                    ` : `
                        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                            ${model.blockbusterShows.map(b => `
                                <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.6rem 0.8rem; border-radius: 8px; border-left: 3px solid #f59e0b;">
                                    <div>
                                        <div style="font-weight: 700; font-size: 0.9rem; color: #fff;">${b.title}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">Saal ${b.hall} • ${b.time} Uhr</div>
                                    </div>
                                    <div style="text-align: right;">
                                        <div style="font-weight: 800; font-size: 0.95rem; color: #f59e0b;">${b.occupancy}%</div>
                                        <div style="font-size: 0.7rem; color: var(--text-muted);">${b.sold}/${b.capacity} Plätze</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `}
                </div>

                <!-- BL ACTION CHECKLIST FOR TODAY -->
                <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 14px; padding: 1.25rem;">
                    <div style="font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span>✅</span> BL-Tagescheck & Prioritäten
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.85rem;">
                        <label style="display: flex; align-items: center; gap: 0.6rem; background: rgba(255,255,255,0.02); padding: 0.5rem 0.75rem; border-radius: 6px;">
                            <input type="checkbox" checked style="accent-color: #10b981;">
                            <span>Sitzplatz- & Spielplan-Synchronisation aktiv</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 0.6rem; background: rgba(255,255,255,0.02); padding: 0.5rem 0.75rem; border-radius: 6px;">
                            <input type="checkbox" ${model.criticalTickets.length === 0 ? 'checked' : ''} style="accent-color: #10b981;">
                            <span>Haustechnik / Saalchecks freigegeben</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 0.6rem; background: rgba(255,255,255,0.02); padding: 0.5rem 0.75rem; border-radius: 6px;">
                            <input type="checkbox" style="accent-color: #10b981;">
                            <span>Popcorn-Vorrat für Abend-Peaks vorbereitet</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 0.6rem; background: rgba(255,255,255,0.02); padding: 0.5rem 0.75rem; border-radius: 6px;">
                            <input type="checkbox" style="accent-color: #10b981;">
                            <span>Jugendschutz-Stichtage am Einlass geprüft</span>
                        </label>
                    </div>
                </div>
            </div>

            <!-- LOGBOOK & TICKETS SNAPSHOT -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--surface-border); border-radius: 14px; padding: 1.25rem;">
                <div style="font-size: 1rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">
                    📢 Jüngste Schicht-Meldungen & Vorkommnisse
                </div>

                ${model.recentLogs.length === 0 ? `
                    <div style="color: var(--text-muted); font-size: 0.85rem;">Keine besonderen Vorkommnisse gemeldet.</div>
                ` : `
                    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                        ${model.recentLogs.map(l => `
                            <div style="font-size: 0.85rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between;">
                                <span><strong style="color: #60a5fa;">[${l.author || 'TL'}]:</strong> ${l.message}</span>
                                <span style="font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; margin-left: 1rem;">${l.created_at ? formatTimeOnly(l.created_at) : ''}</span>
                            </div>
                        `).join('')}
                    </div>
                `}
            </div>
        </div>
        `;

        container.innerHTML = html;
        container._briefingModel = model;
    }

    /**
     * Copy Briefing as Messenger/Email Text
     */
    static copyBriefingText(containerId) {
        const container = document.getElementById(containerId);
        const model = container?._briefingModel;
        if (!model) return;

        let text = `☕ *MORGEN-BRIEFING BETRIEBSLEITUNG - ${model.locationName.toUpperCase()}*\n`;
        text += `📅 Datum: ${model.date} • ${model.generatedAt} Uhr\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `📊 *Tages-Prognose:* ${model.stats.totalSold.toLocaleString()} Gäste (${model.stats.avgOccupancy}% Auslastung)\n`;
        text += `🍿 *Gastro-Potenzial:* ~${model.stats.estimatedConcessionsVisitors} Kunden\n`;
        text += `🛠️ *Technik-Status:* ${model.healthMessage}\n\n`;

        if (model.blockbusterShows.length > 0) {
            text += `🔥 *Spitzen-Vorstellungen:* \n`;
            model.blockbusterShows.forEach(b => {
                text += `• ${b.time} Uhr: ${b.title} (Saal ${b.hall}) - ${b.occupancy}% voll\n`;
            });
            text += `\n`;
        }

        text += `✅ *Schicht-Fokus:* Bitte rechtzeitig vor den Abend-Wellen Popcorn aufstocken und Einlasskontrolle besetzen!\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `_Generiert via Kinopolis Executive Cockpit_`;

        copyToClipboard(text, 'Morgen-Briefing für Team & E-Mail kopiert!');
    }

    /**
     * Print Executive Morning Briefing
     */
    static printBriefing(containerId) {
        const container = document.getElementById(containerId);
        const model = container?._briefingModel;
        if (!model) return;

        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Bitte Popups erlauben.');
            return;
        }

        const html = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <title>BL_Morgen_Briefing_${model.locationCode}_${model.date}</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111; padding: 2cm; line-height: 1.4; font-size: 11pt; }
                .header { border-bottom: 2px solid #ef4444; padding-bottom: 10px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
                .kpi-row { display: flex; gap: 15px; margin-bottom: 20px; }
                .kpi { flex: 1; border: 1px solid #ddd; padding: 10px; border-radius: 6px; background: #fafafa; }
                .kpi .val { font-size: 18pt; font-weight: bold; }
                .kpi .lbl { font-size: 8pt; text-transform: uppercase; color: #666; font-weight: bold; }
                .section { margin-bottom: 20px; }
                .section-title { font-size: 12pt; font-weight: bold; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 8px; }
                table { width: 100%; border-collapse: collapse; font-size: 10pt; }
                th, td { border: 1px solid #e5e7eb; padding: 6px 8px; text-align: left; }
                th { background: #f3f4f6; }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1 style="margin:0;font-size:18pt;">KINOPOLIS BETRIEBSLEITUNG: MORGEN-BRIEFING</h1>
                    <div style="color:#666;">Standort: ${model.locationName} (${model.locationCode.toUpperCase()})</div>
                </div>
                <div style="text-align:right;">
                    <div><strong>Datum: ${model.date}</strong></div>
                    <div style="font-size:9pt;color:#666;">Erstellt um ${model.generatedAt} Uhr</div>
                </div>
            </div>

            <div style="padding: 8px 12px; background: #f0fdf4; border-left: 4px solid #10b981; margin-bottom: 20px; font-weight: bold;">
                Status: ${model.healthMessage}
            </div>

            <div class="kpi-row">
                <div class="kpi">
                    <div class="val">${model.stats.totalSold.toLocaleString()}</div>
                    <div class="lbl">Erwartete Tagesbesucher</div>
                </div>
                <div class="kpi">
                    <div class="val">${model.stats.avgOccupancy}%</div>
                    <div class="lbl">Durchschnittl. Auslastung</div>
                </div>
                <div class="kpi">
                    <div class="val">~${model.stats.estimatedConcessionsVisitors}</div>
                    <div class="lbl">Gastro-Kunden Potenzial</div>
                </div>
                <div class="kpi">
                    <div class="val">${model.openTickets.length}</div>
                    <div class="lbl">Offene Tickets</div>
                </div>
            </div>

            ${model.blockbusterShows.length > 0 ? `
            <div class="section">
                <div class="section-title">🔥 Spitzen-Vorstellungen (>65% Auslastung)</div>
                <table>
                    <thead>
                        <tr>
                            <th>Uhrzeit</th>
                            <th>Saal</th>
                            <th>Filmtitel</th>
                            <th>Auslastung</th>
                            <th>Gäste</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${model.blockbusterShows.map(b => `
                            <tr>
                                <td>${b.time} Uhr</td>
                                <td>Saal ${b.hall}</td>
                                <td>${b.title}</td>
                                <td><strong>${b.occupancy}%</strong></td>
                                <td>${b.sold} / ${b.capacity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>` : ''}

            <div style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 8px; font-size: 8pt; color: #888; display: flex; justify-content: space-between;">
                <span>Kinopolis Executive Automation</span>
                <span>Gedruckt am ${new Date().toLocaleString('de-DE')}</span>
            </div>
        </body>
        </html>`;

        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 300);
    }
}
