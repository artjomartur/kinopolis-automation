/**
 * Reports Component for Kinopolis Automation
 * Generates structured shift logs, print-ready PDF summaries, and shareable clipboard text.
 */

import { formatDateOnlySafe, formatDateTimeSafe } from '../utils/date.js';
import { copyToClipboard } from '../utils/ui.js';

export class ShiftReportGenerator {
    /**
     * Build report data aggregation
     */
    static buildReportData({ locationName, locationCode, date, sessions, logs, tasks, tickets, tlNotes, author }) {
        let totalVisitors = 0;
        let totalShows = 0;
        let totalCapacity = 0;

        if (sessions && Array.isArray(sessions)) {
            sessions.forEach(s => {
                totalShows++;
                totalVisitors += Number(s.sold) || 0;
                totalCapacity += Number(s.capacity) || 0;
            });
        }

        const completedTasks = (tasks || []).filter(t => t.is_completed == 1);
        const openTickets = (tickets || []).filter(t => t.status === 'offen' || t.status === 'in_arbeit');
        const resolvedTickets = (tickets || []).filter(t => t.status === 'erledigt');

        return {
            locationName: locationName || locationCode,
            locationCode,
            date: date || new Date().toISOString().split('T')[0],
            generatedAt: new Date().toISOString(),
            author: author || 'Teamleiter im Dienst',
            tlNotes: tlNotes || '',
            stats: {
                totalShows,
                totalVisitors,
                totalCapacity,
                occupancyRate: totalCapacity > 0 ? Math.round((totalVisitors / totalCapacity) * 100) : 0
            },
            completedTasks,
            openTickets,
            resolvedTickets,
            logs: logs || []
        };
    }

    /**
     * Format shift report as clean WhatsApp / Messenger Text
     */
    static generateMessengerText(data) {
        const dateStr = formatDateOnlySafe(data.date);
        let text = `📋 *KINOPOLIS SCHICHTBERICHT - ${data.locationName.toUpperCase()}*\n`;
        text += `📅 *Datum:* ${dateStr} | 👤 *TL:* ${data.author}\n`;
        text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

        text += `📊 *KENNZAHLEN & AUSLASTUNG:*\n`;
        text += `• Gesamtbesucher: *${data.stats.totalVisitors.toLocaleString()}* Gäste\n`;
        text += `• Vorstellungen: ${data.stats.totalShows}\n`;
        text += `• Durchschnittliche Auslastung: *${data.stats.occupancyRate}%*\n\n`;

        if (data.tlNotes && data.tlNotes.trim()) {
            text += `📝 *TL-ÜBERGABE & FAZIT:*\n${data.tlNotes.trim()}\n\n`;
        }

        if (data.completedTasks.length > 0) {
            text += `🖼️ *ERLEDIGTE AUFGABEN & PLAKATE (${data.completedTasks.length}):*\n`;
            data.completedTasks.forEach(t => {
                text += `✓ ${t.task_id} (${t.completed_by || 'Erledigt'})\n`;
            });
            text += `\n`;
        }

        if (data.openTickets.length > 0) {
            text += `⚠️ *OFFENE TECHNIK- & SAALTICKETS (${data.openTickets.length}):*\n`;
            data.openTickets.forEach(t => {
                text += `• Saal ${t.hall || '?'}: ${t.description} [${t.status}]\n`;
            });
            text += `\n`;
        }

        if (data.logs.length > 0) {
            text += `📖 *LOGBUCH-EINTRÄGE:*\n`;
            data.logs.slice(0, 5).forEach(l => {
                text += `• [${l.priority === 'urgent' ? '🔴' : '🔹'}] ${l.message} (${l.author || 'TL'})\n`;
            });
            text += `\n`;
        }

        text += `━━━━━━━━━━━━━━━━━━━━━\n`;
        text += `_Automatisch generiert via Kinopolis Automation_`;
        return text;
    }

    /**
     * Copy Messenger Text to Clipboard
     */
    static copyToMessenger(data) {
        const text = this.generateMessengerText(data);
        copyToClipboard(text, 'Schichtbericht für WhatsApp/Telegram kopiert!');
    }

    /**
     * Trigger clean print-dialog / PDF export
     */
    static printReport(data) {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            alert('Bitte Popups erlauben, um den Bericht zu drucken.');
            return;
        }

        const dateStr = formatDateOnlySafe(data.date);
        const html = `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <title>Schichtbericht_${data.locationCode}_${data.date}</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    color: #111;
                    background: #fff;
                    margin: 0;
                    padding: 2.5cm 2cm;
                    line-height: 1.4;
                    font-size: 11pt;
                }
                .header {
                    border-bottom: 2px solid #ef4444;
                    padding-bottom: 12px;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .header h1 {
                    margin: 0;
                    font-size: 18pt;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                }
                .header .sub {
                    font-size: 10pt;
                    color: #666;
                }
                .kpi-box {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .kpi {
                    flex: 1;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    padding: 10px;
                    background: #f9f9fb;
                }
                .kpi .val {
                    font-size: 16pt;
                    font-weight: bold;
                    color: #111;
                }
                .kpi .lbl {
                    font-size: 8pt;
                    color: #666;
                    text-transform: uppercase;
                    font-weight: 600;
                }
                .section {
                    margin-bottom: 20px;
                }
                .section-title {
                    font-size: 12pt;
                    font-weight: 700;
                    border-bottom: 1px solid #eee;
                    padding-bottom: 4px;
                    margin-bottom: 8px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 10pt;
                }
                th, td {
                    border: 1px solid #e5e7eb;
                    padding: 6px 8px;
                    text-align: left;
                }
                th {
                    background: #f3f4f6;
                    font-weight: 600;
                }
                .notes-box {
                    background: #fdfdfd;
                    border: 1px dashed #ccc;
                    padding: 10px;
                    border-radius: 6px;
                    min-height: 50px;
                }
                @media print {
                    body { padding: 1.5cm 1cm; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div>
                    <h1>KINOPOLIS TAGES- & SCHICHTPROTOKOLL</h1>
                    <div class="sub">Standort: ${data.locationName} (${data.locationCode.toUpperCase()})</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: bold; font-size: 11pt;">Datum: ${dateStr}</div>
                    <div class="sub">Erstellt von: ${data.author}</div>
                </div>
            </div>

            <div class="kpi-box">
                <div class="kpi">
                    <div class="val">${data.stats.totalVisitors.toLocaleString()}</div>
                    <div class="lbl">Besucher Gesamt</div>
                </div>
                <div class="kpi">
                    <div class="val">${data.stats.totalShows}</div>
                    <div class="lbl">Vorstellungen</div>
                </div>
                <div class="kpi">
                    <div class="val">${data.stats.occupancyRate}%</div>
                    <div class="lbl">Durchschnittl. Auslastung</div>
                </div>
            </div>

            ${data.tlNotes ? `
            <div class="section">
                <div class="section-title">📝 Schichtleiter-Fazit & Übergabenotiz</div>
                <div class="notes-box">${data.tlNotes.replace(/\n/g, '<br>')}</div>
            </div>` : ''}

            ${data.completedTasks.length > 0 ? `
            <div class="section">
                <div class="section-title">🖼️ Erledigte Plakatwechsel & Tagesaufgaben</div>
                <table>
                    <thead>
                        <tr>
                            <th>Aufgabe / Plakat</th>
                            <th>Status</th>
                            <th>Erledigt durch</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.completedTasks.map(t => `
                            <tr>
                                <td>${t.task_id}</td>
                                <td>Erledigt</td>
                                <td>${t.completed_by || '-'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>` : ''}

            ${data.openTickets.length > 0 ? `
            <div class="section">
                <div class="section-title">⚠️ Offene Technik- / Störungstickets</div>
                <table>
                    <thead>
                        <tr>
                            <th>Saal</th>
                            <th>Kategorie</th>
                            <th>Beschreibung</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.openTickets.map(t => `
                            <tr>
                                <td>Saal ${t.hall || '-'}</td>
                                <td>${t.category || '-'}</td>
                                <td>${t.description}</td>
                                <td>${t.status}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>` : ''}

            ${data.logs.length > 0 ? `
            <div class="section">
                <div class="section-title">📖 Logbuch-Auszug</div>
                <table>
                    <thead>
                        <tr>
                            <th>Uhrzeit</th>
                            <th>Autor</th>
                            <th>Nachricht</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.logs.map(l => `
                            <tr>
                                <td style="white-space: nowrap;">${formatDateTimeSafe(l.created_at)}</td>
                                <td>${l.author || 'TL'}</td>
                                <td>${l.message}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>` : ''}

            <div style="margin-top: 30px; border-top: 1px solid #ddd; padding-top: 8px; font-size: 8pt; color: #888; display: flex; justify-content: space-between;">
                <span>Kinopolis Automation System</span>
                <span>Gedruckt am ${new Date().toLocaleString('de-DE')}</span>
            </div>
        </body>
        </html>`;

        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 300);
    }
}
