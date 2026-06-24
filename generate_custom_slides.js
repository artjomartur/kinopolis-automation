const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("Launching puppeteer for slides rendering...");
    const browser = await puppeteer.launch({ headless: 'new', args: ['--allow-file-access-from-files', '--enable-local-file-accesses'] });

    console.log("Generating AppLaunchpad Slides with custom screenshots...");
    const baseDir = '/Users/artjombecker/.gemini/antigravity-ide/brain/5c0b8f17-59ff-4840-be45-675f65c51a2d';
    
    // Explicitly mapping screenshots to appropriate content
    const slidesConfig = [
        { 
            title: "Live-<br>Monitor", 
            subtitle: "Immer im Blick, was in den Sälen passiert. Auslastung und Laufzeiten in Echtzeit.", 
            oli: "Oli_1.png",
            img: "media__1782322445980.png" // 190KB Kino 1 Live
        },
        { 
            title: "Digitales<br>Fundbüro", 
            subtitle: "Verlorene Gegenstände einfach eintragen und den Status per Klick aktualisieren.", 
            oli: "Oli_2.png",
            img: "media__1782322486868.png" // 311KB Fundbuero
        },
        { 
            title: "Teamleiter-<br>Portal", 
            subtitle: "Alle wichtigen Funktionen und Admin-Tools für die Schichtführung sicher hinterlegt.", 
            oli: "Oli_3.png",
            img: "media__1782321654685.png" // 327KB Portale
        },
        { 
            title: "Kino-<br>Übersicht", 
            subtitle: "Behalte alle Filme und Besucherzahlen für schnelle Handovers präzise im Auge.", 
            oli: "Oli_5.png",
            img: "media__1782321654664.png" // 311KB Viele Kino rows
        },
        { 
            title: "Dashboard<br>Overview", 
            subtitle: "Dein smarter Begleiter für den Kino-Alltag. Alles Wichtige an einem Ort zentriert.", 
            oli: "Oli_6.png",
            img: "media__1782321654704.png" // 488KB Kino 3/4/5 collapsed
        }
    ];

    const slidePage = await browser.newPage();
    await slidePage.setViewport({ width: 1920, height: 1080 });

    const generatedSlides = [];

    // Helper to get base64 image
    const getBase64Image = (filePath) => {
        const bitmap = fs.readFileSync(filePath);
        return 'data:image/png;base64,' + Buffer.from(bitmap).toString('base64');
    };

    for (let i = 0; i < slidesConfig.length; i++) {
        const cfg = slidesConfig[i];
        console.log(`Processing slide ${i+1}...`);
        
        const screenB64 = getBase64Image(path.join(baseDir, cfg.img));
        const oliB64 = getBase64Image(path.join(process.cwd(), 'public', 'assets', 'Oli', cfg.oli));
        
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;900&display=swap');
                body { margin: 0; overflow: hidden; font-family: 'Outfit', sans-serif; }
                .slide {
                    width: 1920px; height: 1080px; position: relative;
                    background: radial-gradient(circle at 0% 0%, rgba(0, 120, 255, 0.15) 0%, #060608 50%, rgba(229, 9, 20, 0.15) 100%);
                    display: flex; align-items: center; justify-content: center;
                }
                .text-container {
                    position: absolute;
                    left: 100px;
                    top: 150px;
                    width: 800px;
                    color: white;
                    z-index: 10;
                }
                .title { font-size: 110px; font-weight: 900; line-height: 1.05; margin-bottom: 30px; letter-spacing: -2px; }
                .subtitle { font-size: 40px; color: rgba(255,255,255,0.7); line-height: 1.4; margin-bottom: 40px; font-weight: 500; }
                
                .ipad-mockup {
                    position: absolute;
                    right: -100px;
                    top: 250px;
                    width: 1100px;
                    height: 768px;
                    background: #111;
                    border-radius: 40px;
                    border: 18px solid #222;
                    box-shadow: -30px 40px 80px rgba(0,0,0,0.8), 0 0 40px rgba(0, 120, 255, 0.1);
                    overflow: hidden;
                    z-index: 5;
                }
                .ipad-mockup img { 
                    width: 100%; 
                    height: 100%;
                    object-fit: cover; 
                    object-position: top center; 
                    margin-top: 0px; 
                }
                
                .oli-img {
                    position: absolute;
                    right: 800px;
                    bottom: -30px;
                    height: 600px;
                    z-index: 20;
                    filter: drop-shadow(-20px 20px 40px rgba(0,0,0,0.6));
                }
            </style>
        </head>
        <body>
            <div class="slide">
                <div class="text-container">
                    <div class="title">${cfg.title}</div>
                    <div class="subtitle">${cfg.subtitle}</div>
                </div>
                <div class="ipad-mockup">
                    <img src="${screenB64}" />
                </div>
            </div>
        </body>
        </html>
        `;

        await slidePage.setContent(html, { waitUntil: 'load' });
        await new Promise(r => setTimeout(r, 500));

        const slideFilename = path.join(baseDir, `slide_final_${i+1}.png`);
        await slidePage.screenshot({ path: slideFilename });
        generatedSlides.push(slideFilename);
        console.log(`Generated final slide ${i+1}`);
    }

    await browser.close();
    console.log("Done!");
    console.log("SLIDES:", generatedSlides.join(','));
})();
