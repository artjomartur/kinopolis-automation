const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("🎨 Generating Desktop / Web Showcase Slides for Kinopolis Automation...");
    const browser = await chromium.launch({ headless: true });
    
    const publicWebShowcaseDir = path.join(process.cwd(), 'public', 'assets', 'web_showcase');
    if (!fs.existsSync(publicWebShowcaseDir)) fs.mkdirSync(publicWebShowcaseDir, { recursive: true });

    const getBase64Image = (filePath) => {
        if (!fs.existsSync(filePath)) return '';
        const bitmap = fs.readFileSync(filePath);
        return 'data:image/png;base64,' + Buffer.from(bitmap).toString('base64');
    };

    const logoB64 = getBase64Image(path.join(process.cwd(), 'new_logo.png'));

    const webSlidesConfig = [
        {
            id: 'web_1_dashboard',
            badge: 'ECHTZEIT KINOPOLIS DASHBOARD',
            title: 'Säle, Auslastung & Plakatwechsel<br><span style="color: #3b82f6;">in einer intelligenten Übersicht</span>',
            subtitle: 'Live-Scraping aller Kinopolis Standorte mit sekundengenauer Vorstellungsüberwachung & automatischen Alerts.',
            url: 'https://kinopolis-automation.pages.dev/',
            accent: '#3b82f6',
            oli: 'Oli_4_bgless.png',
            tipTitle: 'Live Dashboard',
            tipText: 'Darmstadt (KP) • 8 Säle aktiv • Nächster Plakatwechsel in 35 Min',
            contentHtml: `
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
                    <div style="background: #111114; border: 1px solid #222228; border-radius: 16px; padding: 24px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                            <div style="font-weight: 800; font-size: 20px; color: #fff;">🎬 Aktuelle Vorstellungen & Auslastung</div>
                            <div style="background: rgba(59,130,246,0.15); color: #60a5fa; padding: 6px 14px; border-radius: 20px; font-weight: 700; font-size: 13px;">LIVE SYNC</div>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div style="background: rgba(255,255,255,0.03); border: 1px solid #27272a; border-radius: 12px; padding: 16px;">
                                <div style="font-weight: 700; font-size: 16px; color: #fff;">Dune: Part Two</div>
                                <div style="font-size: 13px; color: #a1a1aa; margin-top: 4px;">Saal 1 • 20:00 Uhr • 284/320 Plätze</div>
                                <div style="margin-top: 12px; background: #27272a; border-radius: 6px; height: 8px; overflow: hidden;">
                                    <div style="width: 88%; height: 100%; background: #3b82f6;"></div>
                                </div>
                            </div>
                            <div style="background: rgba(255,255,255,0.03); border: 1px solid #27272a; border-radius: 12px; padding: 16px;">
                                <div style="font-weight: 700; font-size: 16px; color: #fff;">Gladiator II</div>
                                <div style="font-size: 13px; color: #a1a1aa; margin-top: 4px;">Saal 3 • 20:15 Uhr • 195/240 Plätze</div>
                                <div style="margin-top: 12px; background: #27272a; border-radius: 6px; height: 8px; overflow: hidden;">
                                    <div style="width: 81%; height: 100%; background: #10b981;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="background: #111114; border: 1px solid #222228; border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="font-weight: 800; font-size: 18px; color: #ef4444; margin-bottom: 12px;">🚨 Dringender Alert</div>
                            <div style="font-size: 14px; color: #e4e4e7; line-height: 1.4;">Letzte Vorstellung des Tages startet gleich in Saal 4. Plakattafel bereitstellen!</div>
                        </div>
                        <div style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.3); border-radius: 10px; padding: 12px; text-align: center; color: #f87171; font-weight: 700; font-size: 14px;">
                            Countdown: 12:45 Min
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'web_2_analytics',
            badge: 'SMARTE BESUCHERSTROM-ANALYTICS',
            title: 'Foyer- & Theken-Last Radar<br><span style="color: #f59e0b;">Spitzenzeiten & Personal-Bedarf</span>',
            subtitle: '15-Minuten-Timeline für Einlass- & Auslasswellen, Foyer-Massen und Saaldurchläufe.',
            url: 'https://kinopolis-automation.pages.dev/tl.html?tab=analytics',
            accent: '#f59e0b',
            oli: 'Oli_2_bgless.png',
            tipTitle: 'Peak-Radar',
            tipText: 'Spitzenzeit: 19:45–20:30 Uhr • Hohe Theken-Last erwartet',
            contentHtml: `
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                        <div style="background: #111114; border: 1px solid #222228; border-radius: 14px; padding: 18px;">
                            <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Tagesgäste</div>
                            <div style="font-size: 28px; font-weight: 900; color: #fff; margin-top: 4px;">1.480</div>
                            <div style="font-size: 12px; color: #10b981; margin-top: 2px;">+14% vs. Vorwoche</div>
                        </div>
                        <div style="background: #111114; border: 1px solid #222228; border-radius: 14px; padding: 18px;">
                            <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Auslastung</div>
                            <div style="font-size: 28px; font-weight: 900; color: #f59e0b; margin-top: 4px;">76%</div>
                            <div style="font-size: 12px; color: #a1a1aa; margin-top: 2px;">Standort-Schnitt</div>
                        </div>
                        <div style="background: #111114; border: 1px solid #222228; border-radius: 14px; padding: 18px;">
                            <div style="font-size: 13px; color: #a1a1aa; text-transform: uppercase; font-weight: 700;">Spitzenzeit</div>
                            <div style="font-size: 28px; font-weight: 900; color: #ef4444; margin-top: 4px;">20:15 Uhr</div>
                            <div style="font-size: 12px; color: #a1a1aa; margin-top: 2px;">~520 Gäste im Foyer</div>
                        </div>
                    </div>
                    <div style="background: #111114; border: 1px solid #222228; border-radius: 16px; padding: 20px;">
                        <div style="font-weight: 700; font-size: 16px; margin-bottom: 12px;">⚡ Foyer- & Thekenlast Timeline (15-Minuten Raster)</div>
                        <div style="display: flex; gap: 6px; align-items: flex-end; height: 120px; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 10px;">
                            ${[30, 45, 80, 140, 260, 420, 520, 390, 210, 120, 70, 40].map((v, idx) => `
                                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; height: 100%;">
                                    <div style="width: 100%; height: ${Math.round((v/520)*90)}px; background: ${v > 300 ? '#ef4444' : (v > 150 ? '#f59e0b' : '#3b82f6')}; border-radius: 4px;"></div>
                                    <div style="font-size: 10px; color: #71717a; margin-top: 6px;">${17 + Math.floor(idx/2)}:${(idx%2)*30 === 0 ? '00' : '30'}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'web_3_reports',
            badge: 'AUTOMATISIERTER SCHICHTBERICHT',
            title: 'Tagesabschluss & Protokoll-Export<br><span style="color: #10b981;">1-Klick PDF & Messenger Übergabe</span>',
            subtitle: 'Automatische Zusammenfassung von Besucherzahlen, erledigten Plakaten, Checklisten & Störungstickets.',
            url: 'https://kinopolis-automation.pages.dev/tl.html?tab=reports',
            accent: '#10b981',
            oli: 'Oli_Security_bgless.png',
            tipTitle: 'Tagesprotokoll',
            tipText: 'Schichtbericht exportiert • WhatsApp & DIN A4 PDF bereit',
            contentHtml: `
                <div style="background: #111114; border: 1px solid #222228; border-radius: 16px; padding: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #27272a; padding-bottom: 16px; margin-bottom: 16px;">
                        <div>
                            <div style="font-weight: 800; font-size: 20px; color: #fff;">📋 KINOPOLIS SCHICHTPROTOKOLL</div>
                            <div style="font-size: 13px; color: #a1a1aa;">Standort: Darmstadt (KP) • Datum: 31.08.2026 • TL: Artjom Becker</div>
                        </div>
                        <div style="display: flex; gap: 10px;">
                            <div style="background: rgba(16,185,129,0.15); color: #34d399; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px;">📄 PDF Gedruckt</div>
                            <div style="background: rgba(59,130,246,0.15); color: #60a5fa; padding: 8px 16px; border-radius: 8px; font-weight: 700; font-size: 13px;">📱 In WhatsApp kopiert</div>
                        </div>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                        <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid #27272a;">
                            <div style="font-weight: 700; font-size: 14px; color: #fff; margin-bottom: 6px;">🖼️ Erledigte Plakatwechsel</div>
                            <div style="font-size: 13px; color: #a1a1aa;">✓ Saal 1: Dune 2 abgenommen (Artjom)<br>✓ Saal 4: Wicked aufgehängt (Max)</div>
                        </div>
                        <div style="background: rgba(255,255,255,0.02); padding: 14px; border-radius: 10px; border: 1px solid #27272a;">
                            <div style="font-weight: 700; font-size: 14px; color: #fff; margin-bottom: 6px;">⚠️ Störungstickets & Technik</div>
                            <div style="font-size: 13px; color: #a1a1aa;">• Saal 2: Reihe 5 Sitz 8 repariert [Erledigt]<br>• Saal 6: Lichtsteuerung kalibriert</div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            id: 'web_4_admin',
            badge: 'GASTRO & INVENTUR TOOLS',
            title: 'MHD-Tracker, Popcorn-Zähler & Fundbüro<br><span style="color: #8b5cf6;">alles zentral im Admin-Portal</span>',
            subtitle: 'Digitale Bestandsführung für Becher, Popcorn, Gastro-MHDs und Fundsachenverwaltung mit Fotos.',
            url: 'https://kinopolis-automation.pages.dev/admin.html',
            accent: '#8b5cf6',
            oli: 'Oli_5_bgless.png',
            tipTitle: 'Admin-Zentrale',
            tipText: 'MHD-Check: 0 ablaufende Artikel • Inventur abgeschlossen',
            contentHtml: `
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px;">
                    <div style="background: #111114; border: 1px solid #222228; border-radius: 14px; padding: 20px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🍿</div>
                        <div style="font-weight: 800; font-size: 16px; color: #fff;">Inventur-Zähler</div>
                        <div style="font-size: 13px; color: #a1a1aa; margin-top: 4px;">Tüten, Becher & Popcorn-Säcke minutenschnell erfasst.</div>
                    </div>
                    <div style="background: #111114; border: 1px solid #222228; border-radius: 14px; padding: 20px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">📅</div>
                        <div style="font-weight: 800; font-size: 16px; color: #fff;">MHD-Manager</div>
                        <div style="font-size: 13px; color: #a1a1aa; margin-top: 4px;">Eis, Sirup & Gastro-Waren mit Ablaufwarnung überwacht.</div>
                    </div>
                    <div style="background: #111114; border: 1px solid #222228; border-radius: 14px; padding: 20px;">
                        <div style="font-size: 24px; margin-bottom: 8px;">🔍</div>
                        <div style="font-weight: 800; font-size: 16px; color: #fff;">Lost & Found</div>
                        <div style="font-size: 13px; color: #a1a1aa; margin-top: 4px;">Digitales Fundbüro mit Saalzuordnung & Finder-Erfassung.</div>
                    </div>
                </div>
            `
        }
    ];

    const slidePage = await browser.newPage({
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1
    });

    for (let i = 0; i < webSlidesConfig.length; i++) {
        const cfg = webSlidesConfig[i];
        console.log(`🖼️ Rendering Web Showcase ${i + 1}/${webSlidesConfig.length}: ${cfg.badge}...`);

        const oliB64 = getBase64Image(path.join(process.cwd(), 'public', 'assets', 'Oli', cfg.oli));

        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body {
                    width: 1920px;
                    height: 1080px;
                    background: #09090b;
                    color: #ffffff;
                    font-family: 'Outfit', sans-serif;
                    overflow: hidden;
                    position: relative;
                }

                .bg-glow {
                    position: absolute;
                    top: -200px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1600px;
                    height: 800px;
                    background: radial-gradient(circle, ${cfg.accent}30 0%, transparent 70%);
                    filter: blur(140px);
                    pointer-events: none;
                }

                .bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(ellipse at 50% 30%, black 50%, transparent 85%);
                    -webkit-mask-image: radial-gradient(ellipse at 50% 30%, black 50%, transparent 85%);
                    pointer-events: none;
                }

                .header-brand {
                    position: absolute;
                    top: 40px;
                    left: 80px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 10px 22px;
                    border-radius: 40px;
                    backdrop-filter: blur(20px);
                }
                .header-brand img { height: 24px; }
                .header-brand span { font-size: 18px; font-weight: 700; text-transform: uppercase; color: #e4e4e7; }

                .text-section {
                    position: absolute;
                    top: 100px;
                    left: 80px;
                    right: 80px;
                    text-align: center;
                }

                .badge {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 800;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: ${cfg.accent};
                    background: ${cfg.accent}15;
                    border: 1px solid ${cfg.accent}40;
                    padding: 6px 18px;
                    border-radius: 40px;
                    margin-bottom: 12px;
                }

                .title {
                    font-size: 48px;
                    font-weight: 900;
                    line-height: 1.12;
                    letter-spacing: -0.02em;
                    margin-bottom: 10px;
                }

                .subtitle {
                    font-family: 'Inter', sans-serif;
                    font-size: 20px;
                    color: #a1a1aa;
                    max-width: 1100px;
                    margin: 0 auto;
                }

                /* Browser Window Mockup */
                .browser-window {
                    position: absolute;
                    bottom: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 1460px;
                    height: 660px;
                    background: #111114;
                    border-radius: 20px 20px 0 0;
                    border: 1.5px solid #27272a;
                    box-shadow: 
                        0 30px 90px rgba(0,0,0,0.95),
                        0 0 70px ${cfg.accent}20;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    z-index: 10;
                }

                .browser-topbar {
                    height: 48px;
                    background: #18181b;
                    border-bottom: 1px solid #27272a;
                    display: flex;
                    align-items: center;
                    padding: 0 18px;
                    gap: 16px;
                }

                .traffic-lights {
                    display: flex;
                    gap: 8px;
                }
                .dot { width: 12px; height: 12px; border-radius: 50%; }
                .dot.red { background: #ef4444; }
                .dot.yellow { background: #f59e0b; }
                .dot.green { background: #10b981; }

                .url-bar {
                    flex: 1;
                    max-width: 600px;
                    margin: 0 auto;
                    background: #09090b;
                    border: 1px solid #27272a;
                    border-radius: 8px;
                    padding: 4px 14px;
                    font-size: 13px;
                    color: #a1a1aa;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'Inter', sans-serif;
                }

                .browser-content {
                    flex: 1;
                    padding: 30px;
                    background: #09090b;
                    overflow: hidden;
                }

                /* Peeking Oli */
                .oli-peeking {
                    position: absolute;
                    top: 260px;
                    right: 180px;
                    width: 240px;
                    height: auto;
                    z-index: 5;
                    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.8));
                    transform: rotate(8deg);
                }

                /* Floating Glass Card */
                .floating-card {
                    position: absolute;
                    bottom: 60px;
                    right: 180px;
                    background: rgba(18, 18, 24, 0.92);
                    backdrop-filter: blur(30px);
                    border: 1.5px solid rgba(255, 255, 255, 0.15);
                    border-radius: 24px;
                    padding: 16px 24px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: 
                        0 20px 60px rgba(0,0,0,0.9),
                        0 0 30px ${cfg.accent}40;
                    z-index: 30;
                    max-width: 580px;
                }

                .avatar-wrap {
                    width: 56px;
                    height: 56px;
                    background: radial-gradient(circle, ${cfg.accent}40, rgba(255,255,255,0.05));
                    border: 1.5px solid ${cfg.accent}80;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .avatar-wrap img { width: 48px; height: 48px; object-fit: contain; }

                .card-title { font-size: 16px; font-weight: 800; color: #fff; }
                .card-message { font-family: 'Inter', sans-serif; font-size: 14px; color: #d4d4d8; margin-top: 2px; }
            </style>
        </head>
        <body>
            <div class="bg-glow"></div>
            <div class="bg-grid"></div>

            <div class="header-brand">
                <img src="${logoB64}" alt="Kinopolis Logo">
                <span>Kinopolis Operations</span>
            </div>

            <div class="text-section">
                <div class="badge">${cfg.badge}</div>
                <h1 class="title">${cfg.title}</h1>
                <p class="subtitle">${cfg.subtitle}</p>
            </div>

            <!-- Peeking Character -->
            <img class="oli-peeking" src="${oliB64}" alt="Oli Mascot">

            <div class="browser-window">
                <div class="browser-topbar">
                    <div class="traffic-lights">
                        <div class="dot red"></div>
                        <div class="dot yellow"></div>
                        <div class="dot green"></div>
                    </div>
                    <div class="url-bar">
                        <span>🔒</span>
                        <span>${cfg.url}</span>
                    </div>
                </div>
                <div class="browser-content">
                    ${cfg.contentHtml}
                </div>
            </div>

            <!-- Floating Glass Card -->
            <div class="floating-card">
                <div class="avatar-wrap">
                    <img src="${oliB64}" alt="Oli">
                </div>
                <div>
                    <div class="card-title">${cfg.tipTitle}</div>
                    <div class="card-message">${cfg.tipText}</div>
                </div>
            </div>
        </body>
        </html>
        `;

        await slidePage.setContent(html, { waitUntil: 'networkidle' });
        await new Promise(r => setTimeout(r, 600));

        const outputPath = path.join(publicWebShowcaseDir, `${cfg.id}.png`);
        await slidePage.screenshot({ path: outputPath, type: 'png' });
        console.log(`✅ Generated Desktop Showcase: ${cfg.id}.png`);
    }

    console.log("🏁 All Web Showcase slides generated successfully!");
    await browser.close();
    process.exit(0);
})();
