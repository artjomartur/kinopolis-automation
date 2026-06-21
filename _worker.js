import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import * as cheerio from 'cheerio';
import { Buffer } from 'node:buffer';

const app = new Hono();

app.onError((err, c) => {
    console.error('Fatal Worker Error:', err);
    return c.json({ error: 'Internal Server Error', message: err.message }, 500);
});

let isDbMigrated = false;

app.use('*', async (c, next) => {
    if (!isDbMigrated && c.env.DB) {
        try {
            await c.env.DB.prepare('ALTER TABLE users ADD COLUMN xp INTEGER DEFAULT 0;').run();
            console.log('Migration: Added xp column to users table.');
        } catch (e) {
            // Ignore error if column already exists
        }
        try {
            await c.env.DB.prepare('ALTER TABLE occupancy_archive ADD COLUMN location TEXT;').run();
            console.log('Migration: Added location column to occupancy_archive table.');
        } catch (e) {
            // Ignore error if column already exists
        }
        isDbMigrated = true;
    }
    await next();
});

// Helper for consistent Kinopolis requests
async function fetchKinopolis(url) {
    return await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7'
        }
    });
}

app.get('/api/locations', (c) => {
    const locations = [
        { name: 'Aschaffenburg: KINOPOLIS', slug: 'ab' },
        { name: 'Bad Godesberg: KINOPOLIS', slug: 'bn' },
        { name: 'Bad Homburg: KINOPOLIS', slug: 'bh' },
        { name: 'Darmstadt: KINOPOLIS', slug: 'kp' },
        { name: 'Darmstadt: Citydome', slug: 'cd' },
        { name: 'Darmstadt: Rex', slug: 'rx' },
        { name: 'Freiberg: KINOPOLIS', slug: 'fr' },
        { name: 'Gießen: Kinocenter', slug: 'gi' },
        { name: 'Gießen: KINOPOLIS', slug: 'kg' },
        { name: 'Hamburg HafenCity: KINOPOLIS', slug: 'hh' },
        { name: 'Hanau: KINOPOLIS', slug: 'hu' },
        { name: 'Karlsruhe: Universum-City', slug: 'ka' },
        { name: 'Koblenz: KINOPOLIS', slug: 'ko' },
        { name: 'Landshut: KINOPOLIS', slug: 'lh' },
        { name: 'Rosenheim: KINOPOLIS', slug: 'ro' },
        { name: 'Sulzbach / MTZ: KINOPOLIS', slug: 'su' },
        { name: 'Viernheim / RNZ: KINOPOLIS', slug: 'vi' }
    ];
    return c.json(locations);
});

// --- AUTHENTICATION HELPERS ---
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const JWT_SECRET = 'kinopolis-secret-2026'; // Ideally use c.env.JWT_SECRET

// --- EMAIL THEME HELPER ---
function getEmailStyles(theme) {
    const isLight = theme === 'light';
    return {
        isLight,
        bgColor: isLight ? '#f4f4f7' : '#050507',
        cardBg: isLight ? '#ffffff' : '#0f0f13',
        textColor: isLight ? '#1c1c1e' : '#ffffff',
        mutedColor: isLight ? '#64748b' : '#8e8e93',
        borderColor: isLight ? '#e2e8f0' : 'rgba(255,255,255,0.08)',
        footerBg: isLight ? '#f8fafc' : '#0a0a0d',
        logoOpacity: isLight ? '1' : '0.9',
        headingColor: isLight ? '#0f172a' : '#ffffff',
        shadow: isLight ? '0 10px 40px rgba(0,0,0,0.08)' : '0 15px 50px rgba(0,0,0,0.6)'
    };
}

// --- AUTHENTICATION API ---
app.post('/api/auth/register', async (c) => {
    try {
        const { email, first_name, last_name, location, employee_number, password } = await c.req.json();
        if (!email || !first_name || !last_name || !location || !password) {
            return c.json({ error: 'Alle Pflichtfelder ausfüllen' }, 400);
        }

        if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);

        const password_hash = await hashPassword(password);
        
        // Make first user admin automatically
        let role = 'user';
        const userCount = await c.env.DB.prepare('SELECT count(*) as count FROM users').first();
        if ((userCount && userCount.count === 0) || email.toLowerCase() === 'artjomb.2001@gmail.com') {
            role = 'admin';
        }

        await c.env.DB.prepare(
            'INSERT INTO users (email, first_name, last_name, location, employee_number, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)'
        ).bind(email.toLowerCase(), first_name, last_name, location, employee_number || null, password_hash, role).run();

        // Auto-subscribe to email newsletter
        try {
            await c.env.DB.prepare(
                'INSERT OR IGNORE INTO email_subscriptions (email, location) VALUES (?, ?)'
            ).bind(email.toLowerCase(), location).run();
        } catch (e) {
            console.error('Auto-subscribe error:', e);
        }

        // Send Welcome Email
        const resendKey = c.env.RESEND_API_KEY;
        if (resendKey) {
            try {
                await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${resendKey}`
                    },
                    body: JSON.stringify({
                        from: 'Kinopolis Automation <hi@artjombecker.com>',
                        to: email.toLowerCase(),
                        subject: 'Willkommen im Kinopolis Automation Dashboard!',
                        html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <meta charset="utf-8">
                                <style>
                                    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f1014; color: #ffffff; }
                                    .container { max-width: 600px; margin: 0 auto; background-color: #1a1b1f; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
                                    .header { padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #1a1b1f 0%, #0a0a0d 100%); }
                                    .logo { width: 180px; margin-bottom: 20px; }
                                    .content { padding: 40px; }
                                    .hero-text { font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 16px; letter-spacing: -0.02em; }
                                    .body-text { color: #94a3b8; line-height: 1.6; font-size: 16px; margin-bottom: 32px; }
                                    .feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 32px; }
                                    .feature-title { color: #e50914; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
                                    .feature-list { list-style: none; padding: 0; margin: 0; }
                                    .feature-item { color: #f1f5f9; margin-bottom: 8px; display: flex; align-items: center; }
                                    .btn { display: inline-block; background: linear-gradient(135deg, #e50914, #ff3d47); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 14px; font-weight: 800; font-size: 16px; box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3); }
                                    .footer { padding: 32px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
                                    .footer-text { color: #475569; font-size: 12px; }
                                </style>
                            </head>
                            <body>
                                <div style="padding: 20px;">
                                    <div class="container">
                                        <div class="header">
                                            <img src="https://trailer.kinopolis.de/media/img/logos/kinopolis.png" alt="Kinopolis" class="logo">
                                        </div>
                                        <div class="content">
                                            <h1 class="hero-text">Willkommen, ${first_name}!</h1>
                                            <p class="body-text">
                                                Dein Account für das <strong>Kinopolis Automation Dashboard</strong> ist jetzt aktiv. Wir freuen uns, dich am Standort <strong>${location}</strong> im Team zu haben.
                                            </p>
                                            
                                            <div class="feature-card">
                                                <div class="feature-title">Deine neuen Tools</div>
                                                <div class="feature-item">🚀 Echtzeit-Updates & Schichtpläne</div>
                                                <div class="feature-item">📱 Digitaler Funk & Messenger</div>
                                                <div class="feature-item">📖 Handbücher & Checklisten</div>
                                            </div>

                                            <div style="text-align: center;">
                                                <a href="https://kinopolis.artjombecker.com" class="btn">Zum Dashboard</a>
                                            </div>
                                        </div>
                                         <div class="footer">
                                             <p class="footer-text">
                                                 Dies ist eine automatische Benachrichtigung.<br>
                                                 © 2026 Kinopolis Automation<br><br>
                                                 <a href="https://kinopolis.artjombecker.com/api/email/unsubscribe?email=${email.toLowerCase()}" style="color: #475569; text-decoration: underline;">Abbestellen</a>
                                             </p>
                                         </div>
                                    </div>
                                </div>
                            </body>
                            </html>
                        `
                    })
                });
            } catch (emailErr) {
                console.error('Welcome Email Error:', emailErr);
            }
        }

        return c.json({ success: true });
    } catch (e) {
        if (e.message.includes('UNIQUE constraint failed')) {
            return c.json({ error: 'Diese E-Mail Adresse wird bereits verwendet' }, 400);
        }
        return c.json({ error: e.message }, 500);
    }
});

// --- PASSWORDLESS SETUP / INVITE FLOW ---
app.post('/api/auth/setup-link', async (c) => {
    try {
        const { email, first_name, last_name } = await c.req.json();
        if (!email || !first_name || !last_name) {
            return c.json({ error: 'Name und E-Mail erforderlich' }, 400);
        }

        if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);

        // Check if user already exists
        let user = await c.env.DB.prepare('SELECT id, password_hash FROM users WHERE email = ?').bind(email.toLowerCase()).first();
        
        let setupToken;
        if (!user) {
            // Create user without password
            const result = await c.env.DB.prepare(
                'INSERT INTO users (email, first_name, last_name, location, role) VALUES (?, ?, ?, ?, ?)'
            ).bind(email.toLowerCase(), first_name, last_name, 'kp', 'user').run();
            setupToken = await sign({ email: email.toLowerCase(), first_name, last_name, is_new: true, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, JWT_SECRET);
            
            // Save setup token
            await c.env.DB.prepare('UPDATE users SET setup_token = ? WHERE email = ?').bind(setupToken, email.toLowerCase()).run();
        } else {
            // Update setup token for existing user
            setupToken = await sign({ email: email.toLowerCase(), first_name: user.first_name, last_name: user.last_name, is_new: false, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, JWT_SECRET);
            await c.env.DB.prepare('UPDATE users SET setup_token = ? WHERE id = ?').bind(setupToken, user.id).run();
        }

        // Send Email
        const resendKey = c.env.RESEND_API_KEY;
        const setupLink = `https://kinopolis.artjombecker.com/?setup_token=${setupToken}`;
        
        if (resendKey) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
                body: JSON.stringify({
                    from: 'Kinopolis System <hi@artjombecker.com>',
                    to: email.toLowerCase(),
                    subject: 'Dein Kinopolis Setup-Link',
                    html: `
                        <div style="font-family:sans-serif; background:#1a1b1f; color:#fff; padding: 40px; text-align: center;">
                            <h1 style="color:#e50914;">Hallo ${first_name}!</h1>
                            <p>Klicke auf den folgenden Link, um dich einzuloggen und dein Setup abzuschließen:</p>
                            <a href="${setupLink}" style="display:inline-block; margin-top:20px; background:#e50914; color:#fff; padding:15px 30px; text-decoration:none; border-radius:12px; font-weight:bold;">Zum Setup</a>
                        </div>
                    `
                })
            });
        }

        return c.json({ success: true, message: 'Link gesendet' });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/auth/setup-complete', async (c) => {
    try {
        const { setup_token, location, password } = await c.req.json();
        if (!setup_token || !location || !password) return c.json({ error: 'Fehlende Daten' }, 400);

        let payload;
        try {
            payload = await verify(setup_token, JWT_SECRET, 'HS256');
        } catch (err) {
            return c.json({ error: 'Der Setup-Link ist ungültig oder abgelaufen.' }, 401);
        }

        const email = payload.email;
        const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ? AND setup_token = ?').bind(email, setup_token).first();
        
        if (!user) return c.json({ error: 'Nutzer nicht gefunden oder Link bereits genutzt.' }, 404);

        const password_hash = await hashPassword(password);
        
        await c.env.DB.prepare(
            'UPDATE users SET location = ?, password_hash = ?, setup_token = NULL WHERE id = ?'
        ).bind(location, password_hash, user.id).run();

        // Generate standard auth token
        const token = await sign({
            id: user.id,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            location: location,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        }, JWT_SECRET);

        return c.json({ 
            success: true, 
            token,
            user: {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                location: location,
                role: user.role
            }
        });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/auth/login', async (c) => {
    try {
        const { email, password } = await c.req.json();
        if (!email || !password) return c.json({ error: 'E-Mail und Passwort erforderlich' }, 400);

        if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);

        const password_hash = await hashPassword(password);
        
        // Master Admin bypass
        if ((email.toLowerCase() === 'artjomb.2001@gmail.com' || email.toLowerCase() === 'admin') && password === 'admin123') {
            const token = await sign({ 
                id: 0,
                email: 'artjomb.2001@gmail.com', 
                name: 'System Admin', 
                role: 'admin', 
                location: 'kp',
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
            }, JWT_SECRET);
            return c.json({ 
                success: true, 
                token, 
                user: { id: 0, first_name: 'System', last_name: 'Admin', role: 'admin', location: 'kp' } 
            });
        }

        const user = await c.env.DB.prepare(
            'SELECT id, email, first_name, last_name, location, employee_number, role FROM users WHERE email = ? AND password_hash = ?'
        ).bind(email.toLowerCase(), password_hash).first();

        if (!user) return c.json({ error: 'Ungültige Anmeldedaten' }, 401);

        const token = await sign({
            id: user.id,
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            location: user.location,
            role: (user.email.toLowerCase() === 'artjomb.2001@gmail.com' || user.email.toLowerCase() === 'hi@artjombecker.com') ? 'admin' : user.role,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
        }, JWT_SECRET);

        return c.json({ 
            success: true, 
            token,
            user: {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                location: user.location,
                role: (user.email.toLowerCase() === 'artjomb.2001@gmail.com' || user.email.toLowerCase() === 'hi@artjombecker.com') ? 'admin' : user.role
            }
        });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- PASSWORD RESET FLOW ---

app.post('/api/auth/forgot-password', async (c) => {
    const { email, theme } = await c.req.json();
    if (!email) return c.json({ error: 'E-Mail erforderlich' }, 400);

    const user = await c.env.DB.prepare('SELECT id, first_name FROM users WHERE email = ?')
        .bind(email.toLowerCase()).first();
    
    if (!user) {
        return c.json({ success: true, message: 'Falls die E-Mail existiert, wurde ein Link gesendet.' });
    }

    const resetToken = await sign({ 
        userId: user.id, 
        email: email.toLowerCase(),
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
    }, JWT_SECRET);

    const resetLink = `https://kinopolis.artjombecker.com/reset-password.html?token=${encodeURIComponent(resetToken)}`;
    const resendKey = c.env.RESEND_API_KEY;
    const s = getEmailStyles(theme);

    if (resendKey) {
        try {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${resendKey}` },
                body: JSON.stringify({
                    from: 'Kinopolis Security <hi@artjombecker.com>',
                    to: email.toLowerCase(),
                    subject: 'Passwort zurücksetzen',
                    html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: ${s.bgColor} !important; }
        .wrapper { width: 100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: ${s.bgColor};">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapper" bgcolor="${s.bgColor}">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <div style="max-width:580px;margin:0 auto;background:${s.cardBg};border:1px solid ${s.borderColor};border-radius:28px;overflow:hidden;box-shadow:${s.shadow};text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
                    <div style="padding:48px 40px;text-align:center;">
                        <img src="https://trailer.kinopolis.de/media/img/logos/kinopolis.png" style="width:140px;margin-bottom:32px;opacity:${s.logoOpacity};" />
                        <h1 style="color:${s.headingColor};font-size:26px;font-weight:800;margin:0 0 16px;letter-spacing:-0.02em;">Passwort zur&uuml;cksetzen</h1>
                        <p style="color:${s.mutedColor};font-size:16px;line-height:1.7;margin:0 0 32px;">Hallo ${user.first_name},<br>du hast eine Anfrage zum Zur&uuml;cksetzen deines Passworts gestellt. Klicke auf den Button unten, um ein neues Passwort festzulegen.</p>
                        <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#e50914,#ff3d47);color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:14px;font-weight:800;font-size:16px;letter-spacing:0.01em;box-shadow:0 8px 20px rgba(229,9,20,0.3);">Passwort jetzt &auml;ndern</a>
                        <p style="color:${s.mutedColor};font-size:13px;margin:28px 0 0;line-height:1.6;">Der Link ist nur <strong style="color:${s.textColor};">60 Minuten</strong> g&uuml;ltig.<br>Falls du dies nicht angefragt hast, ignoriere diese E-Mail.</p>
                    </div>
                    <div style="padding:20px 40px;background:${s.footerBg};border-top:1px solid ${s.borderColor};text-align:center;">
                        <p style="color:${s.mutedColor};font-size:11px;margin:0;text-transform:uppercase;letter-spacing:0.1em;">&copy; 2026 Kinopolis Automation Dashboard</p>
                        <p style="margin-top: 10px;"><a href="https://kinopolis.artjombecker.com/api/email/unsubscribe?email=${email.toLowerCase()}" style="color: ${s.mutedColor}; font-size: 10px; text-decoration: underline;">Benachrichtigungen abbestellen</a></p>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`
                })
            });
        } catch (err) { console.error("Resend Reset Error:", err); }
    }
    return c.json({ success: true });
});

app.post('/api/auth/reset-password', async (c) => {
    try {
        const { token, newPassword } = await c.req.json();
        if (!token || !newPassword) return c.json({ error: 'Token und Passwort erforderlich' }, 400);

        let payload;
        try {
            payload = await verify(token, JWT_SECRET, 'HS256');
        } catch (verifyErr) {
            const msg = verifyErr.message?.toLowerCase() || '';
            if (msg.includes('expired')) {
                return c.json({ error: 'Der Link ist abgelaufen (älter als 60 Min.). Bitte fordere einen neuen an.' }, 401);
            }
            return c.json({ error: 'Der Link ist ungültig. Bitte fordere einen neuen an.' }, 401);
        }

        if (!payload || !payload.userId) {
            return c.json({ error: 'Ungültiger Token-Inhalt' }, 401);
        }

        const hash = await hashPassword(newPassword);
        const result = await c.env.DB.prepare('UPDATE users SET password_hash = ? WHERE id = ?')
            .bind(hash, payload.userId).run();

        if (result.meta.changes === 0) {
            return c.json({ error: 'Nutzer nicht gefunden' }, 404);
        }

        return c.json({ success: true });
    } catch (e) { 
        console.error('Reset Password Fatal Error:', e.message);
        return c.json({ error: 'Interner Serverfehler: ' + e.message }, 500); 
    }
});

app.get('/api/auth/me', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return c.json({ error: 'Nicht autorisiert' }, 401);
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = await verify(token, JWT_SECRET, 'HS256');
        
        let dbUser = null;
        if (c.env.DB) {
            dbUser = await c.env.DB.prepare(
                'SELECT id, email, first_name, last_name, location, employee_number, role, xp FROM users WHERE id = ?'
            ).bind(payload.id).first();
        }

        const user = dbUser ? {
            id: dbUser.id,
            email: dbUser.email,
            name: `${dbUser.first_name} ${dbUser.last_name}`,
            first_name: dbUser.first_name,
            last_name: dbUser.last_name,
            location: dbUser.location,
            employee_number: dbUser.employee_number,
            role: dbUser.role,
            xp: dbUser.xp || 0
        } : { ...payload, xp: 0 };

        // Failsafe: Ensure specific email is always admin
        if (user.email === 'hi@artjombecker.com' || user.email === 'artjomb.2001@gmail.com') {
            user.role = 'admin';
        }
        
        return c.json({ user });
    } catch (e) {
        console.error('JWT Verification Failed:', e.message);
        return c.json({ error: 'Ungültiger Token', message: e.message }, 401);
    }
});

app.post('/api/auth/add-xp', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: 'Nicht autorisiert' }, 401);
    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        const { amount, reason } = await c.req.json();
        if (!amount) return c.json({ error: 'Amount is required' }, 400);
        if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);

        // Update user's XP
        await c.env.DB.prepare('UPDATE users SET xp = COALESCE(xp, 0) + ? WHERE id = ?')
            .bind(amount, payload.id).run();

        // Get updated XP
        const user = await c.env.DB.prepare('SELECT xp FROM users WHERE id = ?')
            .bind(payload.id).first();

        console.log(`XP awarded to user ${payload.id}: +${amount} XP (${reason || 'no reason'})`);
        return c.json({ success: true, xp: user ? user.xp : 0 });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.get('/api/auth/leaderboard', async (c) => {
    if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);
    const location = c.req.query('location') || 'kp';
    try {
        const result = await c.env.DB.prepare(`
            SELECT first_name, last_name, role, xp 
            FROM users 
            WHERE location = ? 
            ORDER BY COALESCE(xp, 0) DESC, id ASC
            LIMIT 10
        `).bind(location).all();
        return c.json({ leaderboard: result.results || [] });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/auth/change-password', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: 'Nicht autorisiert' }, 401);

    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        const { newPassword } = await c.req.json();
        
        if (!newPassword || newPassword.length < 6) {
            return c.json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' }, 400);
        }

        const hash = await hashPassword(newPassword);
        await c.env.DB.prepare('UPDATE users SET password_hash = ? WHERE id = ?')
            .bind(hash, payload.id).run();

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: 'Fehler beim Ändern des Passworts' }, 500);
    }
});

// --- EMAIL SUBSCRIPTIONS ---
app.post('/api/email/subscribe', async (c) => {
    try {
        const { email, location } = await c.req.json();
        if (!email) return c.json({ error: 'E-Mail erforderlich' }, 400);
        if (!c.env.DB) return c.json({ error: 'DB nicht verfügbar' }, 500);

        await c.env.DB.prepare(
            'INSERT OR IGNORE INTO email_subscriptions (email, location) VALUES (?, ?)'
        ).bind(email.toLowerCase(), location || 'kp').run();

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.get('/api/email/unsubscribe', async (c) => {
    try {
        const email = c.req.query('email');
        if (!email) return c.text('E-Mail Adresse fehlt.');
        if (!c.env.DB) return c.text('Datenbank nicht erreichbar.');

        await c.env.DB.prepare('DELETE FROM email_subscriptions WHERE email = ?')
            .bind(email.toLowerCase()).run();
        
        await c.env.DB.prepare('DELETE FROM users WHERE email = ?')
            .bind(email.toLowerCase()).run().catch(() => {}); // Also delete user if they want to be forgotten

        return c.html(`
            <div style="font-family: sans-serif; text-align: center; padding: 50px;">
                <h1>Erfolgreich abgemeldet</h1>
                <p>Du wirst keine weiteren E-Mails mehr erhalten.</p>
                <a href="https://kinopolis.artjombecker.com" style="color: #e50914;">Zurück zum Dashboard</a>
            </div>
        `);
    } catch (e) {
        return c.text('Fehler beim Abmelden: ' + e.message);
    }
});

app.post('/api/auth/shift-report', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: 'Nicht autorisiert' }, 401);

    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        const { duration, auslaesse, cleaning, posters, xp, theme } = await c.req.json();
        const resendKey = c.env.RESEND_API_KEY;

        if (!resendKey) {
            console.error("AUTH: Missing RESEND_API_KEY");
            return c.json({ error: 'E-Mail Dienst ist nicht konfiguriert (Key fehlt)' }, 500);
        }

        const s = getEmailStyles(theme);

        // Save shift XP to user in D1 Database
        if (c.env.DB && xp) {
            try {
                await c.env.DB.prepare('UPDATE users SET xp = COALESCE(xp, 0) + ? WHERE id = ?')
                    .bind(xp, payload.id).run();
                console.log(`Saved shift XP (+${xp}) to user ${payload.id} in DB.`);
            } catch (dbXpErr) {
                console.error("Failed to update user XP in shift report:", dbXpErr);
            }
        }

        // Fetch shift logs written by this user today
        let logNotesHtml = '';
        if (c.env.DB) {
            try {
                const todayStr = new Date().toISOString().split('T')[0];
                const authorSearch = `%${payload.first_name}%`;
                const logs = await c.env.DB.prepare(`
                    SELECT message, priority, created_at 
                    FROM shift_logs 
                    WHERE location = ? AND date(created_at) = ? AND (author LIKE ? OR message LIKE ?)
                    ORDER BY created_at ASC
                `).bind(payload.location || 'kp', todayStr, authorSearch, authorSearch).all();

                if (logs.results && logs.results.length > 0) {
                    logNotesHtml = `
                        <div style="background:rgba(255,255,255,0.02);border-radius:18px;padding:24px;border:1px solid ${s.borderColor};margin-top:20px;">
                            <h3 style="font-size:12px;color:${s.mutedColor};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;margin-top:0;">Deine Logbuch-Einträge von heute</h3>
                            ${logs.results.map(l => {
                                const timeStr = new Date(l.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
                                const prioBadge = l.priority === 'dringend' ? '<span style="color:#ff3d47;font-weight:bold;">🔴 Dringend</span>' : (l.priority === 'wichtig' ? '<span style="color:#ffb900;font-weight:bold;">⚠️ Wichtig</span>' : '');
                                return `
                                    <div style="padding:12px 0;border-bottom:1px solid ${s.borderColor};">
                                        <div style="font-size:11px;color:${s.mutedColor};margin-bottom:4px;">${timeStr} Uhr ${prioBadge ? ' &bull; ' + prioBadge : ''}</div>
                                        <div style="color:${s.textColor};font-size:14px;line-height:1.4;">${l.message}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                }
            } catch (e) {
                console.error("Failed to fetch shift logs for report email:", e);
            }
        }

        const mailRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendKey}`
            },
            body: JSON.stringify({
                from: 'Kinopolis Automation <hi@artjombecker.com>',
                to: payload.email,
                subject: `Kinopolis Schicht-Report: ${new Date().toLocaleDateString('de-DE')}`,
                html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <style type="text/css">
        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        img { -ms-interpolation-mode: bicubic; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: ${s.bgColor} !important; }
        .wrapper { width: 100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    </style>
</head>
<body style="margin: 0 !important; padding: 0 !important; background-color: ${s.bgColor};">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapper" bgcolor="${s.bgColor}">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <div style="max-width:600px;margin:0 auto;background:${s.cardBg};border:1px solid ${s.borderColor};border-radius:28px;overflow:hidden;box-shadow:${s.shadow};text-align:left;font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;">
                    <!-- Header -->
                    <div style="padding:40px;text-align:center;border-bottom:1px solid ${s.borderColor};">
                        <img src="https://trailer.kinopolis.de/media/img/logos/kinopolis.png" style="width:140px;margin-bottom:24px;opacity:${s.logoOpacity};" />
                        <h1 style="font-size:24px;font-weight:800;margin:0;letter-spacing:-0.02em;color:${s.headingColor};">Gute Arbeit, ${payload.first_name || 'Teammitglied'}!</h1>
                        <p style="color:${s.mutedColor};font-size:14px;margin-top:8px;">Hier ist die Auswertung deiner heutigen Schicht.</p>
                    </div>

                    <!-- Stats Grid -->
                    <div style="padding:30px;">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:30px;">
                            <div style="background:rgba(255,255,255,0.03);padding:20px;border-radius:18px;text-align:center;border:1px solid ${s.borderColor};">
                                <div style="color:${s.mutedColor};font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:5px;">Schichtdauer</div>
                                <div style="font-size:20px;font-weight:800;color:${s.textColor};">${duration || '0h 0m'}</div>
                            </div>
                            <div style="background:rgba(0, 255, 128, 0.05);padding:20px;border-radius:18px;text-align:center;border:1px solid rgba(0, 255, 128, 0.1);">
                                <div style="color:#00ff80;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:5px;">Gesammeltes XP</div>
                                <div style="font-size:20px;font-weight:800;color:#00ff80;">+${xp || 0} XP</div>
                            </div>
                        </div>

                        <!-- Details -->
                        <div style="background:rgba(255,255,255,0.02);border-radius:18px;padding:24px;border:1px solid ${s.borderColor};">
                            <h3 style="font-size:12px;color:${s.mutedColor};text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px;margin-top:0;">Erledigte Aufgaben</h3>
                            
                            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                                <span style="color:${s.textColor};font-size:14px;font-weight:500;">📽️ Auslässe</span>
                                <span style="background:rgba(229, 9, 20, 0.15);color:#ff3d47;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:800;">${auslaesse || 0}</span>
                            </div>
                            
                            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                                <span style="color:${s.textColor};font-size:14px;font-weight:500;">🧹 Reinigungen</span>
                                <span style="background:rgba(0, 120, 255, 0.15);color:#00d2ff;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:800;">${cleaning || 0}</span>
                            </div>

                            <div style="display:flex;align-items:center;justify-content:space-between;">
                                <span style="color:${s.textColor};font-size:14px;font-weight:500;">🖼️ Poster-Checks</span>
                                <span style="background:rgba(255, 171, 0, 0.15);color:#ffab00;padding:4px 12px;border-radius:50px;font-size:12px;font-weight:800;">${posters || 0}</span>
                            </div>
                        </div>

                        <!-- Shift Logs written by User -->
                        ${logNotesHtml}

                        <!-- Feedback Prompt -->
                        <div style="margin-top: 30px; text-align: center; background: rgba(0, 120, 255, 0.05); padding: 24px; border-radius: 18px; border: 1px solid rgba(0, 120, 255, 0.1);">
                            <h4 style="color: ${s.textColor}; margin: 0 0 8px; font-size: 16px;">Wie war dein Tag?</h4>
                            <p style="color: ${s.mutedColor}; font-size: 13px; margin: 0 0 20px;">Dein Feedback hilft uns, das Dashboard und den Ablauf im Kino zu verbessern.</p>
                            <a href="https://kinopolis.artjombecker.com/?feedback=true" style="display: inline-block; background: #0078FF; color: white; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; font-size: 14px;">Feedback zum Tag geben</a>
                        </div>

                        <div style="text-align:center;margin-top:40px;padding-top:30px;border-top:1px solid ${s.borderColor};">
                            <p style="color:#48484a; font-size:11px;line-height:1.6;">
                                Diese Zusammenfassung wurde automatisch von der Kinopolis Automation Platform erstellt.<br>
                                Viel Erfolg für deine nächste Schicht!<br><br>
                                <a href="https://kinopolis.artjombecker.com/api/email/unsubscribe?email=${payload.email}" style="color: #48484a; text-decoration: underline;">Berichte abbestellen</a>
                            </p>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>
`
            })
        });

        if (!mailRes.ok) {
            const errorBody = await mailRes.text();
            console.error("AUTH: Resend API Error:", errorBody);
            return c.json({ error: 'E-Mail konnte nicht gesendet werden', detail: errorBody }, 500);
        }

        return c.json({ success: true });
    } catch (e) {
        console.error("AUTH: Shift report error:", e);
        return c.json({ error: 'Server-Fehler: ' + e.message }, 500);
    }
});

// --- ADMIN / USER MANAGEMENT API ---
app.get('/api/admin/users', async (c) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader) return c.json({ error: 'Nicht autorisiert' }, 401);
    
    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        if (payload.role !== 'BL' && payload.role !== 'admin' && payload.email !== 'hi@artjombecker.com') {
            return c.json({ error: 'Admin-Rechte erforderlich' }, 403);
        }

        const users = await c.env.DB.prepare(
            'SELECT id, email, first_name, last_name, location, employee_number, role, created_at FROM users'
        ).all();

        return c.json(users.results);
    } catch (e) {
        return c.json({ error: 'Authentifizierungsfehler' }, 401);
    }
});

app.patch('/api/admin/users/:id/role', async (c) => {
    const id = c.req.param('id');
    const { role } = await c.req.json();
    const authHeader = c.req.header('Authorization');
    
    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        if (payload.role !== 'BL' && payload.role !== 'admin') {
            return c.json({ error: 'Admin-Rechte erforderlich' }, 403);
        }

        await c.env.DB.prepare('UPDATE users SET role = ? WHERE id = ? AND location = ?')
            .bind(role, id, payload.location).run();
        
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: 'Fehler beim Aktualisieren der Rolle' }, 500);
    }
});

app.delete('/api/admin/users/:id', async (c) => {
    const id = c.req.param('id');
    const authHeader = c.req.header('Authorization');
    
    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        if (payload.role !== 'BL' && payload.role !== 'admin') {
            return c.json({ error: 'Admin-Rechte erforderlich' }, 403);
        }

        await c.env.DB.prepare('DELETE FROM users WHERE id = ? AND location = ?')
            .bind(id, payload.location).run();
        
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: 'Fehler beim Löschen des Nutzers' }, 500);
    }
});

app.get('/api/movie-details', async (c) => {
    const url = c.req.query('url');
    if (!url) return c.json({ error: 'Missing movie URL' }, 400);

    try {
        const response = await fetchKinopolis(url);
        if (!response.ok) return c.json({ error: 'Could not fetch movie details' }, 500);
        
        const html = await response.text();
        const $ = cheerio.load(html);

        const title = $('h1.hl, h1, .movie__title, .movie-detail__title, .prog2__movie-title').first().text().trim();
        
        // Synopsis: .text is the primary Kinopolis class for the description
        let synopsis = '';
        const synopsisSelectors = [
            '.filmdetail__content .text', '#filmdetail .text',
            '.movie__synopsis', '.movie-detail__description', '.movie-info__description',
            '.prog2__synopsis', '.movie__description', '.film-description',
            '.text'
        ];
        
        for (const sel of synopsisSelectors) {
            const elements = $(sel);
            elements.each((i, el) => {
                const t = $(el).text().trim();
                // Avoid the cinema selection list text
                if (t && t.length > 50 && !t.includes('Bitte wählen Sie ein Kino aus')) {
                    synopsis = t;
                    return false; // break each
                }
            });
            if (synopsis) break;
        }
        
        // Fallback: og:description meta tag
        if (!synopsis || synopsis.length < 50) {
            const ogDesc = $('meta[property="og:description"], meta[name="description"]').first().attr('content');
            if (ogDesc && ogDesc.length > 50 && !ogDesc.toLowerCase().includes('kinoprogramm')) {
                synopsis = ogDesc;
            }
        }
        
        // Fallback: longest paragraph in main content
        if (!synopsis || synopsis.length < 50) {
            let longestP = '';
            $('main p, article p, .content p, section p').each((i, el) => {
                const t = $(el).text().trim();
                if (t.length > longestP.length && t.length > 80 && !t.includes('Kinopolis.de') && !t.match(/^\d{2}:\d{2}$/)) {
                    longestP = t;
                }
            });
            if (longestP) synopsis = longestP;
        }
        
        // Strip English subtitle that appears on some Kinopolis pages
        synopsis = synopsis.replace(/\s*English:.*$/si, '').trim();

        // Cast: .movie-cast is the Kinopolis class for cast info
        const castEl = $('.movie-cast');
        let cast = '';
        if (castEl.length) {
            cast = castEl.text().replace(/\s+/g, ' ').trim();
        }

        const durationMatch = html.match(/(\d+)\s*Minuten/i) || html.match(/(\d+)\s*Min\.?/i);
        const duration = durationMatch ? durationMatch[1] : null;

        const specs = $('.movie__specs, .prog2__movie-info, .movie-detail__specs').text();
        const fskMatch = specs.match(/ab\s*(\d+)\s*Jahre/i) || specs.match(/FSK\s*(\d+)/i)
            || html.match(/FSK[\s-]*(\d+)/i);
        const fsk = fskMatch ? `FSK ${fskMatch[1]}` : 'FSK ?';

        const genreEl = $('.movie__specs-el:contains("Genre"), .prog2__movie-info-item:contains("Genre"), [class*="genre"], .filmdetail__specs-item').first();
        const genre = genreEl.text().replace(/Genre:?/i, '').trim() || 'Film';

        // Trailer Extraction
        let trailerUrl = null;
        const videoId = $('[data-video-id]').first().attr('data-video-id');
        if (videoId) {
            trailerUrl = `https://www.youtube.com/embed/${videoId}`;
        } else {
            const ytLink = $('a[href*="youtube.com/watch"], a[href*="youtu.be"]').first().attr('href');
            if (ytLink) {
                const ytMatch = ytLink.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
                if (ytMatch) trailerUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
            }
        }

        return c.json({
            title,
            synopsis: synopsis || 'Keine Beschreibung verfügbar.',
            cast,
            duration,
            fsk,
            genre,
            trailerUrl,
            url
        });
    } catch (e) {
        console.error('movie-details error:', e);
        return c.json({ error: 'Backend error while scraping details' }, 500);
    }
});


app.get('/api/sessions', async (c) => {
    const location = c.req.query('location') || 'kp';
    const dateStr = c.req.query('date') || new Date().toISOString().split('T')[0];
    const targetUrl = `https://www.kinopolis.de/${location}/programm?date=${dateStr}`;
    
    console.log(`Fetching sessions for ${location} on ${dateStr}`);
    
    if (c.env.DB) {
        try {
            await c.env.DB.prepare(`
                CREATE TABLE IF NOT EXISTS occupancy_archive (
                    key TEXT PRIMARY KEY,
                    location TEXT,
                    title TEXT,
                    time TEXT,
                    hall TEXT,
                    date TEXT,
                    max_sold INTEGER,
                    capacity INTEGER,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `).run();
        } catch (e) { console.error("Archive table init failed:", e); }
    }
    
    try {
        const response = await fetchKinopolis(targetUrl);
        if (!response.ok) {
            console.error(`Kinopolis returned status ${response.status}`);
            return c.json({ 
                error: `Kinopolis error: ${response.status}`, 
                status: response.status,
                message: 'Die Verbindung zur Kinopolis-Webseite ist fehlgeschlagen.'
            }, 200); // We return 200 so the frontend can parse the error object
        }
        
        const html = await response.text();
        const $ = cheerio.load(html);

        const d = new Date(dateStr);
        const dayNum = d.getDate();
        const monthNum = d.getMonth() + 1;
        const shortDateStr = `${dayNum < 10 ? '0' : ''}${dayNum}.${monthNum < 10 ? '0' : ''}${monthNum}`;
        const isToday = dateStr === new Date().toISOString().split('T')[0];
        const isTomorrow = dateStr === new Date(Date.now() + 86400000).toISOString().split('T')[0];

        const allowedIds = new Set();
        $('.prog-nav__item').each((_, navEl) => {
            const navText = $(navEl).text().trim().toLowerCase();
            let matches = false;
            if (isToday && navText.includes('heute')) matches = true;
            else if (isTomorrow && navText.includes('morgen')) matches = true;
            else if (navText.includes(shortDateStr)) matches = true;

            if (matches) {
                const idsAttr = $(navEl).attr('data-performance-ids');
                if (idsAttr) {
                    const cleanIds = idsAttr.replace(/[\[\]\s]/g, '');
                    cleanIds.split(',').forEach(id => {
                        const trimmed = id.trim(); if (trimmed && trimmed.length > 5) allowedIds.add(trimmed);
                    });
                }
            }
        });

        const sessionMap = new Map();
        
        $('section.movie, .prog2__movie').each((i, movieEl) => {
            const title = $(movieEl).find('.hl-link, .prog2__movie-title').first().text().trim();
            if (!title) return;
            const poster = $(movieEl).find('.prog2__movie-img img, img.img-fluid').first().attr('src');
            const durationText = $(movieEl).find('.movie__specs-el, .prog2__movie-info-item, .prog2__infos').text().trim();
            const durationMatch = durationText.match(/Dauer:\s*(\d+)\s*Minuten/i) || durationText.match(/(\d+)\s*Min\.?/i);
            const duration = durationMatch ? parseInt(durationMatch[1]) : 0;

            let fsk = "FSK ?";
            const fskImg = $(movieEl).find('img[src*="FSK"]').first().attr('alt');
            if (fskImg && fskImg.includes('FSK')) {
                fsk = fskImg;
            } else {
                const fskMatch = durationText.match(/ab\s*(\d+)\s*Jahre/i) || durationText.match(/FSK\s*(\d+)/i);
                if (fskMatch) fsk = `FSK ${fskMatch[1]}`;
            }

            const detailLink = $(movieEl).find('.hl-link, .prog2__movie-title, a[href*="/film/"]').first().attr('href');
            const movieLink = detailLink ? (detailLink.startsWith('http') ? detailLink : `https://www.kinopolis.de${detailLink}`) : null;

            $(movieEl).find('.prog2__cont, .prog2__movie-session').each((j, sessionEl) => {
                const perfId = $(sessionEl).attr('data-performance-id');
                
                // FILTER BY DATE (using allowed IDs from navigation)
                 if (allowedIds.size > 0 && perfId && !allowedIds.has(perfId)) return;

                const time = $(sessionEl).find('.prog2__time').first().text().trim();
                if (!time) return;
                
                let hallTextContent = $(sessionEl).find('.prog2__hall-num > div:first-child').text().trim();
                if (!hallTextContent) hallTextContent = $(sessionEl).find('.prog2__hall-num').text().replace(/i$/, '').trim();
                const hall = hallTextContent;
                const occupancyText = $(sessionEl).text().trim();
                let capacity = 0;
                let freePercent = 95;
                const seatsEl = $(sessionEl).find('.prog2__seats');
                if (seatsEl.length) capacity = parseInt(seatsEl.text().replace(/\D/g, '')) || 0;
                
                const scaleEl = $(sessionEl).find('.prog2__scale');
                if (scaleEl.length) {
                    const percentMatch = scaleEl.text().match(/(\d+)%/);
                    if (percentMatch) freePercent = parseInt(percentMatch[1]);
                }
                if (capacity <= 1) {
                    const combinedMatch = occupancyText.match(/(\d+)\s+(\d+)%\s+frei/);
                    if (combinedMatch) {
                        capacity = parseInt(combinedMatch[1]);
                        freePercent = parseInt(combinedMatch[2]);
                    } else {
                        const capacityMatch = occupancyText.match(/(\d+)\s+Pl[äa]tze/);
                        if (capacityMatch) capacity = parseInt(capacityMatch[1]);
                    }
                }
                const freeCountMatch = occupancyText.match(/(\d+)\s+(?:Pl[äa]tze\s+)?frei/);
                const freePercentMatch = occupancyText.match(/(\d+)%\s+frei/);
                if (freePercentMatch && (!scaleEl.length || freePercent === 95)) freePercent = parseInt(freePercentMatch[1]);
                
                const seatingAttr = $(sessionEl).find('[data-seating]').attr('data-seating');
                if (capacity === 0 && seatingAttr) {
                    try {
                        const parsed = JSON.parse(seatingAttr);
                        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0] > 10) capacity = parsed[0];
                    } catch(e) {}
                }

                let sold = 0;
                if (capacity > 0) {
                    sold = Math.round(capacity * (1 - freePercent / 100));
                    if (freeCountMatch) sold = capacity - parseInt(freeCountMatch[1]);
                    if (sold < 0) sold = 0;
                }
                
                const isBookable = !$(sessionEl).hasClass('performance_expired') && 
                                  !occupancyText.includes('nicht mehr buchbar') && 
                                  !occupancyText.includes('ausverkauft');

                const sessionObj = { title, poster: poster ? (poster.startsWith('http') ? poster : `https://www.kinopolis.de${poster}`) : null, 
                                   time, hall, duration, capacity, freePercent, sold, isBookable, performanceId: perfId, date: dateStr, fsk, movieLink };

                const key = `${location}|${dateStr}|${time}|${hall}|${title}`;
                const existing = sessionMap.get(key);
                
                if (!existing || (existing.capacity === 0 && capacity > 0) || (!existing.isBookable && isBookable)) {
                    sessionMap.set(key, sessionObj);
                }
            });
        });

        // --- DATA MERGING (FROM ARCHIVE) ---
        if (c.env.DB) {
            try {
                const archived = await c.env.DB.prepare(`
                    SELECT * FROM occupancy_archive WHERE date = ?
                `).bind(dateStr).all();
                
                if (archived.results && archived.results.length > 0) {
                    archived.results.forEach(a => {
                        const key = `${location}|${a.date}|${a.time}|${a.hall}|${a.title}`;
                        if (!sessionMap.has(key)) {
                            // Session is missing from live site but exists in archive
                            sessionMap.set(key, {
                                title: a.title,
                                time: a.time,
                                hall: a.hall,
                                date: a.date,
                                sold: a.max_sold,
                                capacity: a.capacity,
                                isBookable: false, // Probably past or removed
                                poster: null, // Poster might be missing in archive, but better than nothing
                                duration: 120, // Fallback
                                fsk: 'FSK ?'
                            });
                        } else {
                            // Update max values from archive
                            const current = sessionMap.get(key);
                            current.sold = Math.max(current.sold || 0, a.max_sold || 0);
                            current.capacity = Math.max(current.capacity || 0, a.capacity || 0);
                            if (current.capacity > 0) {
                                current.freePercent = Math.max(0, Math.floor(((current.capacity - current.sold) / current.capacity) * 100));
                            }
                        }
                    });
                }
            } catch (mergeErr) {
                console.error("Archive merge failed:", mergeErr);
            }
        }

        // Filter for exactly the requested date
        let sessions = Array.from(sessionMap.values()).filter(s => s.date === dateStr);


        // Filter out Darmstadt extra events (strict separation KP vs CD)
        const cdHalls = ['helia', 'pali', 'rex', 'classic', 'broadway', 'bambi', 'festival'];
        if (location === 'kp') {
            sessions = sessions.filter(s => {
                const h = (s.hall || '').toLowerCase();
                return !cdHalls.some(k => h.includes(k));
            });
        } else if (location === 'cd') {
            sessions = sessions.filter(s => {
                const h = (s.hall || '').toLowerCase();
                return cdHalls.some(k => h.includes(k));
            });
        }

        const halls = {};
        sessions.forEach(s => { if (!halls[s.hall]) halls[s.hall] = []; halls[s.hall].push(s); });
        const sortedHalls = Object.keys(halls).sort().map(name => {
            const sorted = halls[name].sort((a, b) => a.time.localeCompare(b.time));
            return { name, sessions: sorted };
        });
        // --- DATA ARCHIVING (MAX-VALUE LOGIC) ---
        if (c.env.DB && sessions.length > 0) {
            try {
                // Batch archive current sold counts (more efficient than serial inserts)
                const batchStatements = sessions.map(s => {
                    const archiveKey = `${location}|${s.date}|${s.time}|${s.hall}|${s.title}`;
                    return c.env.DB.prepare(`
                        INSERT INTO occupancy_archive (key, location, title, time, hall, date, max_sold, capacity)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                        ON CONFLICT(key) DO UPDATE SET 
                            max_sold = CASE WHEN EXCLUDED.max_sold > max_sold THEN EXCLUDED.max_sold ELSE max_sold END,
                            capacity = CASE WHEN EXCLUDED.capacity > 0 THEN EXCLUDED.capacity ELSE capacity END,
                            updated_at = CURRENT_TIMESTAMP
                    `).bind(archiveKey, location, s.title, s.time, s.hall, s.date, s.sold || 0, s.capacity || 0);
                });
                
                // Execute in chunks if there are too many (D1 limit is 100 per batch usually, but let's be safe)
                const CHUNK_SIZE = 50;
                for (let i = 0; i < batchStatements.length; i += CHUNK_SIZE) {
                    await c.env.DB.batch(batchStatements.slice(i, i + CHUNK_SIZE));
                }
            } catch (archiveErr) {
                console.error("Archive process failed:", archiveErr);
            }
        }

        c.header('Cache-Control', 'public, max-age=120');
        return c.json(sortedHalls);
    } catch (error) {
        console.error('Worker error:', error);
        return c.json({ error: error.message }, 500);
    }
});

// Static fallback messages for when DB is unavailable or empty
const STATIC_MESSAGES = [
    { id: 0, title: 'Willkommen', content: 'Willkommen im Kinopolis Automation Dashboard. Nutze das Übergabebuch für wichtige Infos.', author: 'System', created_at: new Date().toISOString() }
];

// Checklist API
app.get('/api/checklist', async (c) => {
    const location = c.req.query('location') || 'kp';
    if (!c.env.DB) return c.json([]);
    try {
        const { results } = await c.env.DB.prepare(
            'SELECT task_id, is_completed, completed_by FROM checklists WHERE location = ?'
        ).bind(location).all();
        return c.json(results || []);
    } catch (e) {
        return c.json([]);
    }
});

app.post('/api/checklist', async (c) => {
    try {
        const { location, task_id, is_completed, completed_by } = await c.req.json();
        if (!location || !task_id) {
            return c.json({ error: 'Missing parameters' }, 400);
        }
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);
        
        const is_completed_int = is_completed ? 1 : 0;
        
        await c.env.DB.prepare(
            `INSERT INTO checklists (location, task_id, is_completed, completed_by, updated_at) 
             VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(location, task_id) DO UPDATE SET 
             is_completed = excluded.is_completed,
             completed_by = excluded.completed_by,
             updated_at = CURRENT_TIMESTAMP`
        ).bind(location, task_id, is_completed_int, completed_by || '').run();
        
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// Announcements / Handover API
app.get('/api/announcements/latest', async (c) => {
    try {
        if (!c.env.DB) return c.json(STATIC_MESSAGES[0]);
        const result = await c.env.DB.prepare('SELECT id, content, author, created_at FROM announcements ORDER BY created_at DESC LIMIT 1').first();
        return c.json(result || STATIC_MESSAGES[0]);
    } catch (e) {
        return c.json(STATIC_MESSAGES[0]);
    }
});

app.post('/api/announcements', async (c) => {
    const authHeader = c.req.header('Authorization');
    try {
        const payload = await verify(authHeader.split(' ')[1], JWT_SECRET, 'HS256');
        if (payload.role !== 'BL' && payload.role !== 'admin') {
            return c.json({ error: 'Nur BL/Admin dürfen Nachrichten pinnen' }, 403);
        }
        const { content } = await c.req.json();
        await c.env.DB.prepare('INSERT INTO announcements (content, author) VALUES (?, ?)').bind(content, payload.first_name).run();
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: 'Fehler beim Pinnen' }, 500);
    }
});

app.get('/api/messages', async (c) => {
    if (!c.env.DB) return c.json(STATIC_MESSAGES);
    try {
        const location = c.req.query('location');
        let query = 'SELECT * FROM messages WHERE is_archived = 0';
        let params = [];
        
        if (location) {
            query += ' AND (location = ? OR location IS NULL)';
            params.push(location);
        }
        query += ' ORDER BY created_at DESC LIMIT 20';
        
        const { results } = await c.env.DB.prepare(query).bind(...params).all();
        return c.json(results.length ? results : STATIC_MESSAGES);
    } catch (e) {
        // Fallback for older DB versions
        try {
            const { results } = await c.env.DB.prepare('SELECT * FROM messages WHERE is_archived = 0 ORDER BY created_at DESC LIMIT 20').all();
            return c.json(results.length ? results : STATIC_MESSAGES);
        } catch (e2) {
            return c.json(STATIC_MESSAGES);
        }
    }
});

app.get('/api/messages/archived', async (c) => {
    if (!c.env.DB) return c.json([]);
    try {
        const location = c.req.query('location');
        let query = 'SELECT * FROM messages WHERE is_archived = 1';
        let params = [];
        
        if (location) {
            query += ' AND (location = ? OR location IS NULL)';
            params.push(location);
        }
        query += ' ORDER BY created_at DESC LIMIT 50';
        
        const { results } = await c.env.DB.prepare(query).bind(...params).all();
        return c.json(results);
    } catch (e) {
        return c.json([]);
    }
});

app.post('/api/messages', async (c) => {
    try {
        const { title, content, author, image_url, location } = await c.req.json();
        if (!title || !content) return c.json({ error: 'Title and content required' }, 400);

        if (c.env.DB) {
            try {
                await c.env.DB.prepare(
                    'INSERT INTO messages (title, content, author, image_url, location) VALUES (?, ?, ?, ?, ?)'
                ).bind(title, content, author || 'System', image_url || null, location || null).run();
            } catch (dbErr) {
                // Compatibility for older DB schema
                await c.env.DB.prepare(
                    'INSERT INTO messages (title, content, author, image_url) VALUES (?, ?, ?, ?)'
                ).bind(title, content, author || 'System', image_url || null).run();
            }
            
            // Broadcast push
            await sendPushToAll(c.env, {
                title: 'Konfidentielle Mitteilung: ' + title,
                body: content.length > 100 ? content.substring(0, 97) + '...' : content,
                tag: 'internal-message'
            }, location);

            // Broadcast email newsletter
            const resendKey = c.env.RESEND_API_KEY;
            if (resendKey) {
                try {
                    // Combine newsletter subscribers AND all employees of that location
                    const subscribers = await c.env.DB.prepare(
                        `SELECT email FROM email_subscriptions WHERE location = ? OR location IS NULL
                         UNION
                         SELECT email FROM users WHERE location = ?`
                    ).bind(location || 'kp', location || 'kp').all();

                    if (subscribers.results && subscribers.results.length > 0) {
                        for (const sub of subscribers.results) {
                            const emailContent = `
                                <!DOCTYPE html>
                                <html>
                                <head>
                                    <meta charset="utf-8">
                                    <style>
                                        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #0f1014; color: #ffffff; }
                                        .container { max-width: 600px; margin: 0 auto; background-color: #1a1b1f; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
                                        .header { padding: 40px 20px; text-align: center; background: linear-gradient(135deg, #1a1b1f 0%, #0a0a0d 100%); }
                                        .logo { width: 180px; margin-bottom: 20px; }
                                        .content { padding: 40px; }
                                        .label { color: #e50914; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
                                        .title { font-size: 24px; font-weight: 800; color: #ffffff; margin-bottom: 8px; letter-spacing: -0.02em; }
                                        .meta { color: #64748b; font-size: 14px; margin-bottom: 32px; }
                                        .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; color: #f1f5f9; line-height: 1.6; white-space: pre-wrap; font-size: 16px; }
                                        .image { width: 100%; border-radius: 16px; margin-top: 24px; border: 1px solid rgba(255,255,255,0.1); }
                                        .btn { display: inline-block; background: rgba(255,255,255,0.05); color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; border: 1px solid rgba(255,255,255,0.1); margin-top: 32px; }
                                        .footer { padding: 32px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
                                        .footer-text { color: #475569; font-size: 12px; }
                                    </style>
                                </head>
                                <body>
                                    <div style="padding: 20px;">
                                        <div class="container">
                                            <div class="header">
                                                <img src="https://trailer.kinopolis.de/media/img/logos/kinopolis.png" alt="Kinopolis" class="logo">
                                            </div>
                                            <div class="content">
                                                <div class="label">Neue Mitteilung</div>
                                                <h1 class="title">${title}</h1>
                                                <div class="meta">Von: <strong>${author || 'System'}</strong> • Standort: ${location || 'Alle'}</div>
                                                
                                                <div class="message-box">${content}</div>
                                                
                                                ${image_url ? `<img src="${image_url}" class="image" />` : ''}

                                                <div style="text-align: center;">
                                                    <a href="https://kinopolis.artjombecker.com" class="btn">Dashboard öffnen</a>
                                                </div>
                                            </div>
                                            <div class="footer">
                                                 <p class="footer-text">
                                                     Du erhältst diese E-Mail als Mitarbeiter von Kinopolis.<br>
                                                     © 2026 Kinopolis Automation<br><br>
                                                     <a href="https://kinopolis.artjombecker.com/api/email/unsubscribe?email=${sub.email}" style="color: #475569; text-decoration: underline;">Abbestellen</a>
                                                 </p>
                                             </div>
                                        </div>
                                    </div>
                                </body>
                                </html>
                            `;

                            await fetch('https://api.resend.com/emails', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${resendKey}`
                                },
                                body: JSON.stringify({
                                    from: 'Kinopolis Dashboard <hi@artjombecker.com>',
                                    to: sub.email,
                                    subject: `[Kinopolis] ${title}`,
                                    html: emailContent
                                })
                            }).catch(e => console.error('Resend Newsletter Error:', e));
                        }
                    }
                } catch (emailErr) {
                    console.error('Email broadcast error:', emailErr);
                }
            }
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/messages/:id', async (c) => {
    const id = c.req.param('id');
    if (c.env.DB) {
        // Soft delete: set is_archived to 1
        await c.env.DB.prepare('UPDATE messages SET is_archived = 1 WHERE id = ?').bind(id).run();
    }
    return c.json({ success: true });
});

// --- LOST & FOUND API ---
app.get('/api/lostfound', async (c) => {
    if (!c.env.DB) return c.json([]);
    const location = c.req.query('location') || 'kp';
    try {
        await c.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS lost_found (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                location TEXT NOT NULL,
                what TEXT NOT NULL,
                category TEXT NOT NULL,
                found_where TEXT NOT NULL,
                found_by TEXT NOT NULL,
                image_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();
        
        const { results } = await c.env.DB.prepare(
            'SELECT * FROM lost_found WHERE location = ? ORDER BY created_at DESC'
        ).bind(location).all();
        return c.json(results || []);
    } catch (e) {
        console.error("lostfound GET error:", e);
        return c.json([]);
    }
});

app.post('/api/lostfound', async (c) => {
    if (!c.env.DB) return c.json({ success: false, error: 'Database not available' });
    try {
        await c.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS lost_found (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                location TEXT NOT NULL,
                what TEXT NOT NULL,
                category TEXT NOT NULL,
                found_where TEXT NOT NULL,
                found_by TEXT NOT NULL,
                image_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        const { location, what, category, found_where, found_by, image_url } = await c.req.json();
        if (!location || !what || !category || !found_where || !found_by) {
            return c.json({ success: false, error: 'Missing fields' }, 400);
        }

        await c.env.DB.prepare(`
            INSERT INTO lost_found (location, what, category, found_where, found_by, image_url)
            VALUES (?, ?, ?, ?, ?, ?)
        `).bind(location, what, category, found_where, found_by, image_url || null).run();

        return c.json({ success: true });
    } catch (e) {
        console.error("lostfound POST error:", e);
        return c.json({ success: false, error: e.message }, 500);
    }
});

app.delete('/api/lostfound/:id', async (c) => {
    if (!c.env.DB) return c.json({ success: false, error: 'Database not available' });
    const id = c.req.param('id');
    try {
        await c.env.DB.prepare('DELETE FROM lost_found WHERE id = ?').bind(id).run();
        return c.json({ success: true });
    } catch (e) {
        console.error("lostfound DELETE error:", e);
        return c.json({ success: false, error: e.message }, 500);
    }
});

// --- INVENTORY & MHD API ---
app.get('/api/inventory', async (c) => {
    if (!c.env.DB) return c.json({ waren: [], eis: [], getraenke: [], slushy: [] });
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM inventory_items ORDER BY type, name').all();
        return c.json({
            waren: results.filter(i => i.type === 'waren' || i.type === 'ware'),
            eis: results.filter(i => i.type === 'eis'),
            getraenke: results.filter(i => i.type === 'getraenke' || i.type === 'getraenk'),
            slushy: results.filter(i => i.type === 'slushy' || i.type === 'slushys')
        });
    } catch (e) {
        // Table might not exist with all columns, try to ensure columns exist (simple approach for D1)
        try {
            await c.env.DB.prepare('ALTER TABLE inventory_items ADD COLUMN location TEXT').run().catch(() => {});
        } catch(e2) {}
        return c.json({ waren: [], eis: [], getraenke: [], slushy: [] });
    }
});

app.post('/api/inventory', async (c) => {
    try {
        const { type, name, target, location } = await c.req.json();
        if (!type || !name) return c.json({ error: 'Type and name required' }, 400);
        if (c.env.DB) {
            // Check if column exists or just try insert
            try {
                await c.env.DB.prepare('INSERT INTO inventory_items (type, name, target, location) VALUES (?, ?, ?, ?)').bind(type, name, target || 0, location || null).run();
            } catch (dbErr) {
                // Fallback for older schema
                await c.env.DB.prepare('INSERT INTO inventory_items (type, name, target) VALUES (?, ?, ?)').bind(type, name, target || 0).run();
            }
        }
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/inventory/:id', async (c) => {
    const id = c.req.param('id');
    if (c.env.DB) {
        await c.env.DB.prepare('DELETE FROM inventory_items WHERE id = ?').bind(id).run();
    }
    return c.json({ success: true });
});

app.get('/api/mhd', async (c) => {
    if (!c.env.DB) return c.json([]);
    try {
        const { results } = await c.env.DB.prepare('SELECT * FROM mhd_records ORDER BY mhd_date ASC').all();
        return c.json(results);
    } catch (e) {
        return c.json([]);
    }
});

app.post('/api/mhd', async (c) => {
    try {
        const { item_id, item_name, type, location, mhd_date, author } = await c.req.json();
        if (!item_name || !mhd_date) return c.json({ error: 'Name and Date required' }, 400);
        if (c.env.DB) {
            await c.env.DB.prepare('INSERT INTO mhd_records (item_id, item_name, type, location, mhd_date, author) VALUES (?, ?, ?, ?, ?, ?)')
                .bind(item_id || null, item_name, type, location, mhd_date, author || 'System').run();
        }
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/mhd/:id', async (c) => {
    const id = c.req.param('id');
    if (c.env.DB) {
        await c.env.DB.prepare('DELETE FROM mhd_records WHERE id = ?').bind(id).run();
    }
    return c.json({ success: true });
});

// --- TASK COMPLETIONS (Real-time Sync) ---
app.get('/api/task-completions', async (c) => {
    const location = c.req.query('location') || 'kp';
    const date = c.req.query('date') || new Date().toISOString().split('T')[0];
    if (!c.env.DB) return c.json([]);
    try {
        // Migration: Ensure table and columns exist
        await c.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS task_completions (
                task_id TEXT NOT NULL,
                location TEXT NOT NULL,
                date TEXT NOT NULL,
                type TEXT,
                author TEXT,
                task_title TEXT,
                completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (task_id, location, date)
            )
        `).run();
        
        try {
            await c.env.DB.prepare('ALTER TABLE task_completions ADD COLUMN task_title TEXT').run();
        } catch(e) {}
        
        // Ensure columns exist (for older databases)
        try { await c.env.DB.prepare("ALTER TABLE task_completions ADD COLUMN type TEXT").run(); } catch(e){}
        try { await c.env.DB.prepare("ALTER TABLE task_completions ADD COLUMN author TEXT").run(); } catch(e){}

        const { results } = await c.env.DB.prepare(
            'SELECT task_id, type, author, task_title, completed_at FROM task_completions WHERE location = ? AND date = ?'
        ).bind(location, date).all();
        return c.json(results || []);
    } catch (e) {
        console.error("task-completions GET error:", e);
        return c.json([]);
    }
});

app.post('/api/task-completions', async (c) => {
    try {
        const { task_id, location, date, type, author, task_title } = await c.req.json();
        if (!task_id || !location || !date) return c.json({ error: 'Missing data' }, 400);
        if (c.env.DB) {
            await c.env.DB.prepare(
                'INSERT OR REPLACE INTO task_completions (task_id, location, date, type, author, task_title) VALUES (?, ?, ?, ?, ?, ?)'
            ).bind(task_id, location, date, type || 'task', author || 'System', task_title || '').run();
        }
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/task-completions', async (c) => {
    try {
        const { task_id, location, date } = c.req.query();
        if (!task_id || !location || !date) return c.json({ error: 'Missing query params' }, 400);
        
        if (c.env.DB) {
            await c.env.DB.prepare(
                'DELETE FROM task_completions WHERE task_id = ? AND location = ? AND date = ?'
            ).bind(task_id, location, date).run();
        }
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- INVENTORY COUNTS (Popcorn & Becher) ---
app.get('/api/inventory/counts', async (c) => {
    const location = c.req.query('location') || 'kp';
    const date = c.req.query('date') || new Date().toISOString().split('T')[0];
    if (!c.env.DB) return c.json([]);
    try {
        await c.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS inventory_counts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                location TEXT NOT NULL,
                date TEXT NOT NULL,
                type TEXT NOT NULL,
                data TEXT NOT NULL,
                author TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        const { results } = await c.env.DB.prepare(
            'SELECT * FROM inventory_counts WHERE location = ? AND date = ? ORDER BY created_at DESC'
        ).bind(location, date).all();
        return c.json(results || []);
    } catch (e) {
        console.error("inventory-counts GET error:", e);
        return c.json([]);
    }
});

app.post('/api/inventory/counts', async (c) => {
    try {
        const { location, date, type, data, author } = await c.req.json();
        if (!location || !date || !type || !data) return c.json({ error: 'Missing data' }, 400);
        if (c.env.DB) {
            await c.env.DB.prepare(
                'INSERT INTO inventory_counts (location, date, type, data, author) VALUES (?, ?, ?, ?, ?)'
            ).bind(location, date, type, JSON.stringify(data), author || 'System').run();
        }
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- HALL STATUS SYNC ---
app.get('/api/hall-status', async (c) => {
    const location = c.req.query('location') || 'kp';
    if (!c.env.DB) return c.json({});
    try {
        await c.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS hall_status (
                hall_id TEXT PRIMARY KEY,
                location TEXT NOT NULL,
                status TEXT NOT NULL,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();
        const { results } = await c.env.DB.prepare('SELECT hall_id, status FROM hall_status WHERE location = ?').bind(location).all();
        const statusMap = {};
        results.forEach(r => statusMap[r.hall_id] = r.status);
        return c.json(statusMap);
    } catch (e) { return c.json({}); }
});

app.post('/api/hall-status', async (c) => {
    try {
        const { hall_id, location, status } = await c.req.json();
        if (c.env.DB) {
            await c.env.DB.prepare('INSERT OR REPLACE INTO hall_status (hall_id, location, status, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)')
                .bind(hall_id, location || 'kp', status).run();
        }
        return c.json({ success: true });
    } catch (e) { return c.json({ error: e.message }, 500); }
});
// --- PERSONAL NEED SYNC ---
app.get('/api/personal-need', async (c) => {
    const location = c.req.query('location') || 'kp';
    if (!c.env.DB) return c.json({ active: false });
    try {
        // Migration: Ensure table and columns exist
        await c.env.DB.prepare(`
            CREATE TABLE IF NOT EXISTS personal_need (
                location TEXT PRIMARY KEY,
                active BOOLEAN DEFAULT 0,
                message TEXT,
                recipient TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();
        
        // Ensure recipient column exists for older tables
        try {
            await c.env.DB.prepare('ALTER TABLE personal_need ADD COLUMN recipient TEXT').run();
        } catch (e) {
            // Already exists or other error
        }

        const res = await c.env.DB.prepare('SELECT active, message, recipient FROM personal_need WHERE location = ?').bind(location).first();
        return c.json(res || { active: false });
    } catch (e) { 
        console.error("personal-need GET error:", e);
        return c.json({ active: false }); 
    }
});

app.post('/api/personal-need', async (c) => {
    try {
        const { location, active, message, recipient } = await c.req.json();
        if (c.env.DB) {
            await c.env.DB.prepare('INSERT OR REPLACE INTO personal_need (location, active, message, recipient, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)')
                .bind(location || 'kp', active ? 1 : 0, message || '', recipient || 'TL').run();
        }
        return c.json({ success: true });
    } catch (e) { return c.json({ error: e.message }, 500); }
});

app.post('/api/feedback', async (c) => {
    try {
        const body = await c.req.json();
        const { text, contact } = body;
        if (!text) return c.json({ error: 'Text is required' }, 400);

        if (c.env && c.env.DB) {
            await c.env.DB.prepare('INSERT INTO feedback (content) VALUES (?)').bind(text).run();
        } else {
            console.log(`[WORKER] Mock feedback stored: ${text}`);
        }
        
        // --- RESEND EMAIL INTEGRATION ---
        // Best practice via Cloudflare Env: const key = c.env.RESEND_API_KEY
        const key = c.env && c.env.RESEND_API_KEY;

        if (key) {
            await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`
                },
                body: JSON.stringify({
                    from: 'Kinopolis Dashboard <dashboard@artjombecker.com>',
                    to: 'hi@artjombecker.com',
                    subject: `[Kinopolis Dashboard] Feedback${contact ? ' von ' + contact : ''}`,
                    html: `
                        <p>Du hast ein neues Feedback für das Dashboard erhalten:</p>
                        <blockquote style="border-left: 4px solid #ff4d4d; padding-left: 15px; margin-top: 15px; color: #333; font-style: italic;">
                            ${text.replace(/\n/g, '<br>')}
                        </blockquote>
                        ${contact ? `<p style="margin-top: 20px; font-size: 0.9rem; color: #666;">Absender / Kontakt: <strong>${contact}</strong></p>` : '<p style="margin-top: 20px; font-size: 0.9rem; color: #666;">Absender: Anonym</p>'}
                    `
                })
            }).catch(e => console.error('Resend Worker Error:', e));
        }

        return c.json({ success: true });
    } catch (e) {
        console.error('Feedback error:', e);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
});

// VAPID Keys for Web Push - JWK format is most reliable for SubtleCrypto in Workers
// Note: These keys should ideally be in c.env secrets
const VAPID_KEYS = {
    publicKey: 'BCP-JGZbVBjKY1_blxAHw6bC5Ddf0nLAyPSp8q39kV7utFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8',
    privateKeyJWK: {
        kty: 'EC', crv: 'P-256', 
        x: 'I_4kZltUGMpjX9uXEAfDpsLkN1_ScsDI9Knyrf2RXu4',
        y: 'tFahZNyQZJ8KlV-ht6UKg07eAuVBVHJhVsaDMx1m7X8',
        d: 'hZ-g14sGhFkq9L9JdkRAJuwfc70Ein69PK7EzUNHj04',
        ext: true
    }
};

function urlBase64(buffer) {
    return Buffer.from(buffer).toString('base64')
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

async function createVapidHeader(endpoint, env) {
    const publicKeyStr = env.VAPID_PUBLIC_KEY || VAPID_KEYS.publicKey;
    const privateKeyJWK = env.VAPID_PRIVATE_KEY_JWK ? JSON.parse(env.VAPID_PRIVATE_KEY_JWK) : VAPID_KEYS.privateKeyJWK;
    
    const audience = new URL(endpoint).origin;
    const encoder = new TextEncoder();
    
    const header = urlBase64(encoder.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
    const payload = urlBase64(encoder.encode(JSON.stringify({
        aud: audience,
        exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60,
        sub: 'mailto:artjomartur@gmail.com'
    })));

    const privateKey = await crypto.subtle.importKey(
        'jwk', privateKeyJWK, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
    );

    const signature = await crypto.subtle.sign(
        { name: 'ECDSA', hash: 'SHA-256' },
        privateKey,
        encoder.encode(`${header}.${payload}`)
    );

    return `Vapid t=${header}.${payload}.${urlBase64(signature)}, k=${publicKeyStr}`;
}

function base64ToBytes(base64) {
    const binaryString = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

async function encryptPayload(sub, payload) {
    const encoder = new TextEncoder();
    const clientPublicKey = await crypto.subtle.importKey(
        'raw', base64ToBytes(sub.p256dh), 
        { name: 'ECDH', namedCurve: 'P-256' }, 
        true, []
    );
    const clientAuth = base64ToBytes(sub.auth);
    
    // 1. Generate Ephemeral Key Pair
    const localKeyPair = await crypto.subtle.generateKey(
        { name: 'ECDH', namedCurve: 'P-256' }, 
        true, ['deriveBits']
    );
    const localPublicKey = await crypto.subtle.exportKey('raw', localKeyPair.publicKey);
    
    // 2. Derive Shared Secret
    const sharedSecret = await crypto.subtle.deriveBits(
        { name: 'ECDH', public: clientPublicKey }, 
        localKeyPair.privateKey, 
        256
    );
    
    // 3. HKDF Key Derivation
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // PRK = HKDF-Extract(salt=auth_secret, IKM=shared_secret)
    const authKey = await crypto.subtle.importKey('raw', clientAuth, 'HKDF', false, ['deriveBits']);
    const prk = await crypto.subtle.deriveBits(
        { name: 'HKDF', hash: 'SHA-256', salt: clientAuth, info: encoder.encode('WebPush: info\0') },
        authKey, 256
    );
    // Actually standard WebPush: info includes the client/server keys. 
    // For simplicity and compatibility with most Push Services, we use the standard HKDF-Expand process.
    
    // WebPush encryption is tricky. Let's use the specific RFC 8291 labels.
    const ikm = await crypto.subtle.importKey('raw', sharedSecret, 'HKDF', false, ['deriveBits']);
    const ikm_info = new Uint8Array([...encoder.encode('WebPush: info\0'), ...base64ToBytes(sub.p256dh), ...new Uint8Array(localPublicKey)]);
    const derivedIKM = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: clientAuth, info: ikm_info }, ikm, 256);
    
    const cekKey = await crypto.subtle.importKey('raw', derivedIKM, 'HKDF', false, ['deriveBits']);
    const cek = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info: encoder.encode('Content-Encoding: aes128gcm\0') }, cekKey, 128);
    const nonce = await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt, info: encoder.encode('Content-Encoding: nonce\0') }, cekKey, 96);
    
    // 4. Encrypt Payload
    const payloadBytes = encoder.encode(JSON.stringify(payload));
    const padding = new Uint8Array([0, 0]); // Minimal padding
    const record = new Uint8Array([...payloadBytes, 2]); // 2 is the delimiter for end of record
    
    const aesKey = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt']);
    const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: nonce, tagLength: 128 }, aesKey, record);
    
    // 5. Combine salt + rs + idlen + keyid + ciphertext
    // For aes128gcm, the body starts with: salt(16) + rs(4) + idlen(1) + publickey
    const rs = new Uint8Array([0, 0, 16, 0]); // Record size (4096 default)
    const idlen = new Uint8Array([localPublicKey.byteLength]);
    const body = new Uint8Array([...salt, ...rs, ...idlen, ...new Uint8Array(localPublicKey), ...new Uint8Array(ciphertext)]);
    
    return body;
}

// --- EMAIL NEWSLETTER API ---
app.post('/api/email/subscribe', async (c) => {
    try {
        const { email, location } = await c.req.json();
        if (!email) return c.json({ error: 'Email required' }, 400);

        if (c.env.DB) {
            await c.env.DB.prepare(`
                INSERT INTO email_subscriptions (email, location)
                VALUES (?, ?)
                ON CONFLICT(email) DO UPDATE SET
                location = excluded.location,
                created_at = CURRENT_TIMESTAMP
            `).bind(email.toLowerCase(), location || 'kp').run();
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.get('/api/email/unsubscribe', async (c) => {
    const email = c.req.query('email');
    if (!email) return c.html('<h1>Fehler</h1><p>E-Mail Adresse fehlt.</p>', 400);

    try {
        if (c.env.DB) {
            await c.env.DB.prepare('DELETE FROM email_subscriptions WHERE email = ?')
                .bind(email.toLowerCase()).run();
        }
        return c.html(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Abbestellt - Kinopolis Automation</title>
                <style>
                    body { font-family: 'Inter', sans-serif; background: #050507; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; }
                    .card { background: rgba(255,255,255,0.05); padding: 3rem; border-radius: 28px; border: 1px solid rgba(255,255,255,0.1); max-width: 400px; }
                    h1 { font-size: 1.5rem; margin-bottom: 1rem; color: #E50914; }
                    p { color: #94a3b8; line-height: 1.6; margin-bottom: 2rem; }
                    .btn { display: inline-block; background: #0078FF; color: white; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h1>Abbestellt!</h1>
                    <p>Du hast dich erfolgreich von allen E-Mail Benachrichtigungen abgemeldet. Wir werden dir keine weiteren Updates an <strong>${email}</strong> senden.</p>
                    <a href="https://kinopolis.artjombecker.com" class="btn">Zum Dashboard</a>
                </div>
            </body>
            </html>
        `);
    } catch (e) {
        return c.html('<h1>Fehler</h1><p>' + e.message + '</p>', 500);
    }
});

app.post('/api/email/unsubscribe', async (c) => {
    try {
        const { email } = await c.req.json();
        if (!email) return c.json({ error: 'Email required' }, 400);

        if (c.env.DB) {
            await c.env.DB.prepare('DELETE FROM email_subscriptions WHERE email = ?')
                .bind(email.toLowerCase()).run();
        }

        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- PUSH API ENDPOINTS ---
app.post('/api/push/subscribe', async (c) => {
    try {
        const payload = await c.req.json();
        const { sub, location } = payload;
        
        if (!sub || !sub.endpoint || !sub.keys || !sub.keys.p256dh || !sub.keys.auth) {
            return c.json({ error: 'Invalid subscription object' }, 400);
        }

        if (c.env.DB) {
            // Upsert subscription
            await c.env.DB.prepare(`
                INSERT INTO push_subscriptions (endpoint, p256dh, auth, location, user_agent)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(endpoint) DO UPDATE SET
                p256dh = excluded.p256dh,
                auth = excluded.auth,
                location = excluded.location,
                created_at = CURRENT_TIMESTAMP
            `).bind(sub.endpoint, sub.keys.p256dh, sub.keys.auth, location || 'kp', c.req.header('user-agent')).run();
        }

        return c.json({ success: true });
    } catch (e) {
        console.error('Subscription error:', e);
        return c.json({ error: e.message }, 500);
    }
});

app.get('/api/push/last-notification', async (c) => {
    // In a real app, this would check the DB for the last notification for this specific user.
    // For now, we return a standard test payload or the last system alert.
    return c.json({
        title: 'Kinopolis Dashboard',
        body: 'Dies ist eine Test-Benachrichtigung mit Bild! 🎬',
        image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
        icon: '/logo-kinopolis-official.png',
        tag: 'test-notification',
        data: { url: '/' }
    });
});

app.post('/api/push/test', async (c) => {
    try {
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);

        const subscriptions = await c.env.DB.prepare('SELECT * FROM push_subscriptions ORDER BY created_at DESC LIMIT 5').all();
        if (!subscriptions.results.length) return c.json({ error: 'No subscriptions found' }, 404);

        const results = [];
        for (const sub of subscriptions.results) {
            try {
                const authHeader = await createVapidHeader(sub.endpoint, c.env);
                
                // Construct a minimal payload for test
                const payload = {
                    title: '🎬 Test Push',
                    body: 'Dies ist eine manuelle Test-Benachrichtigung.',
                    data: { url: '/' }
                };

                const encryptedBody = await encryptPayload(sub, payload);

                const res = await fetch(sub.endpoint, {
                    method: 'POST',
                    headers: { 
                        'TTL': '60', 
                        'Authorization': authHeader,
                        'Content-Encoding': 'aes128gcm',
                        'Content-Type': 'application/octet-stream'
                    },
                    body: encryptedBody
                });
                
                const responseText = await res.text();
                
                if (res.status === 404 || res.status === 410) {
                    await c.env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(sub.endpoint).run();
                    results.push({ status: 'Expired (' + res.status + ')', endpoint: sub.endpoint.substring(0, 30) + '...' });
                } else if (!res.ok) {
                    console.error('Push Service Error:', res.status, responseText);
                    results.push({ status: 'Error ' + res.status, message: responseText, endpoint: sub.endpoint.substring(0, 30) + '...' });
                } else {
                    results.push({ status: 'Success (201)', endpoint: sub.endpoint.substring(0, 30) + '...' });
                }
            } catch (err) {
                console.error('Push loop error:', err);
                results.push({ status: 'Crypto/Network Error', message: err.message });
            }
        }

        return c.json({ results });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// Broadcast a custom message to ALL subscribed devices
app.post('/api/push/broadcast', async (c) => {
    try {
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);

        const { message, title } = await c.req.json();
        if (!message) return c.json({ error: 'Message required' }, 400);

        const subscriptions = await c.env.DB.prepare('SELECT * FROM push_subscriptions').all();
        if (!subscriptions.results.length) return c.json({ sent: 0, message: 'Keine Abonnenten gefunden' });

        let sent = 0;
        let failed = 0;
        for (const sub of subscriptions.results) {
            try {
                const authHeader = await createVapidHeader(sub.endpoint, c.env);
                const payload = {
                    title: title || '📢 Kinopolis Nachricht',
                    body: message,
                    icon: '/logo-kinopolis-official.png',
                    data: { url: '/' }
                };
                const encryptedBody = await encryptPayload(sub, payload);
                const res = await fetch(sub.endpoint, {
                    method: 'POST',
                    headers: {
                        'TTL': '300',
                        'Authorization': authHeader,
                        'Content-Encoding': 'aes128gcm',
                        'Content-Type': 'application/octet-stream'
                    },
                    body: encryptedBody
                });
                if (res.status === 404 || res.status === 410) {
                    await c.env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(sub.endpoint).run();
                    failed++;
                } else if (res.ok) {
                    sent++;
                } else {
                    failed++;
                }
            } catch (err) {
                failed++;
            }
        }
        return c.json({ sent, failed });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// R2 Image Proxy (Fallback)
app.get('/api/images/:key', async (c) => {
    return c.json({ error: 'Not Found' }, 404);
});

app.post('/api/ai-agree', async (c) => {
    try {
        if (!c.env.AI) return c.json({ error: 'AI binding not found' }, 500);
        const response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', { prompt: 'agree' });
        return c.json({ success: true, response });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

app.post('/api/scan-plan', async (c) => {
    try {
        if (!c.env.AI) return c.json({ error: 'AI binding not found' }, 500);

        const body = await c.req.parseBody();
        const imageFile = body.image;
        if (!imageFile) return c.json({ error: 'No image provided' }, 400);

        const buffer = await imageFile.arrayBuffer();
        const prompt = "Dieser Foto zeigt einen gedruckten Kinopolis 'Auslassplan'. Extrahiere die Tabelle und gib ausschließlich ein valides JSON-Array zurück. Nutze folgendes Format für jedes Objekt: { \"hall\": \"...\", \"movie\": \"...\", \"start_time\": \"...\", \"credits_time\": \"...\", \"end_time\": \"...\" }. Antworte NUR mit dem JSON-String in einem Code-Block (```json ... ```). KEIN WEITERER TEXT.";
        
        let response;
        try {
            console.log('Running Llama 3.2 Vision for Plan Scan...');
            response = await c.env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', {
                image: new Uint8Array(buffer),
                prompt: prompt
            });
        } catch (err) {
            console.error('AI Run Error:', err);
            return c.json({ error: 'AI Error: ' + err.message }, 500);
        }

        if (!response || (!response.response && !response.description)) {
            return c.json({ error: 'AI returned empty response' }, 500);
        }

        let jsonStr = response.response || response.description || '';
        console.log('Raw AI Response:', jsonStr);

        // Robust extraction: Look for markdown code blocks first, then the array directly
        const codeBlockMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
            jsonStr = codeBlockMatch[1].trim();
        } else {
            const arrayMatch = jsonStr.match(/\[[\s\S]*\]/);
            if (arrayMatch) {
                jsonStr = arrayMatch[0].trim();
            }
        }
        
        let data;
        // Fix trailing commas often generated by LLMs before parsing
        jsonStr = jsonStr.replace(/,\s*([\]}])/g, '$1');
        try {
            data = JSON.parse(jsonStr);
        } catch (e) {
            console.error('AI JSON Parse Error:', jsonStr);
            return c.json({ error: 'JSON Parse Error', raw: jsonStr }, 500);
        }
        
        // Save to D1
        try {
            if (c.env.DB && Array.isArray(data)) {
                const today = new Date().toISOString().split('T')[0];
                for (const row of data) {
                    await c.env.DB.prepare(`
                        INSERT INTO scanned_plans (hall, movie, start_time, credits_time, end_time, date)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ON CONFLICT(hall, movie, date) DO UPDATE SET
                        start_time = excluded.start_time,
                        credits_time = excluded.credits_time,
                        end_time = excluded.end_time
                    `).bind(row.hall, row.movie, row.start_time, row.credits_time, row.end_time, today).run();
                }
            }
            return c.json({ success: true, data });
        } catch (dbError) {
            console.error('D1 Database Error:', dbError);
            // Return success anyway, since the data was parsed correctly
            return c.json({ success: true, data, dbWarning: 'Konnte Plan nicht in Datenbank speichern.' });
        }
    } catch (e) {
        console.error('Scan error:', e);
        return c.json({ error: e.message }, 500);
    }
});

// --- UPCOMING MOVIES API ---
function decodeKinopolisText(str) {
    if (!str) return '';
    return str
        .replace(/&#x([0-9a-fA-F]+);/gi, (_, h) => {
            try {
                return String.fromCodePoint(parseInt(h, 16));
            } catch {
                return '';
            }
        })
        .replace(/&#(\d+);/g, (_, d) => {
            try {
                return String.fromCharCode(parseInt(d, 10));
            } catch {
                return '';
            }
        })
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

app.get('/api/upcoming', async (c) => {
    try {
        const locRaw = (c.req.query('location') || 'kp').toLowerCase();
        const center = /^[a-z0-9]{2}$/.test(locRaw) ? locRaw : 'kp';

        // Try dedicated upcoming page first for better results
        let response = await fetch(`https://www.kinopolis.de/${center}/filme/demnaechst`);
        if (!response.ok) response = await fetch(`https://www.kinopolis.de/${center}`);
        
        if (!response.ok) throw new Error('Failed to fetch Kinopolis movies');
        const html = await response.text();

        const soonMatch = html.match(/<section[^>]*id="coming-soon-slider"[^>]*>([\s\S]*?)<\/section>/i);
        const soonHtml = soonMatch ? soonMatch[1] : '';

        const upcoming = [];
        if (soonHtml) {
            const brickRe =
                /<div[^>]*class="[^"]*grid__brick[^"]*\bmovie\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/g;
            let bm;
            while ((bm = brickRe.exec(soonHtml)) !== null) {
                const block = bm[1];
                const imgM = block.match(
                    /<img[^>]*class="[^"]*img-fluid[^"]*"[^>]*src="([^"]+)"[^>]*>/i
                );
                const altM = block.match(/alt="([^"]*)"/i);
                const hrefM = block.match(/href="([^"]+)"/i);
                if (!imgM || !imgM[1]) continue;

                const poster = imgM[1].startsWith('http')
                    ? imgM[1]
                    : `https://www.kinopolis.de${imgM[1].startsWith('/') ? '' : '/'}${imgM[1]}`;
                const title = decodeKinopolisText(altM ? altM[1] : 'Film');
                if (!title) continue;

                let movieLink = `https://www.kinopolis.de/${center}`;
                if (hrefM && hrefM[1]) {
                    const ln = hrefM[1];
                    movieLink = ln.startsWith('http') ? ln : `https://www.kinopolis.de${ln.startsWith('/') ? '' : '/'}${ln}`;
                }

                upcoming.push({ title, poster, movieLink });
            }
        }

        const unique = [];
        const seen = new Set();
        for (const m of upcoming) {
            if (!seen.has(m.title)) {
                seen.add(m.title);
                unique.push(m);
            }
        }

        if (unique.length === 0) {
            return c.json([
                {
                    title: 'Dune: Part Two',
                    poster: 'https://www.kinopolis.de/media/filme/d/dune-part-two/poster_200.jpg',
                    movieLink: '#',
                },
                {
                    title: 'Kung Fu Panda 4',
                    poster: 'https://www.kinopolis.de/media/filme/k/kung-fu-panda-4/poster_200.jpg',
                    movieLink: '#',
                },
            ]);
        }

        return c.json(unique.slice(0, 24));
    } catch (e) {
        console.error('Upcoming fetch error:', e);
        return c.json({ error: 'Failed to fetch upcoming movies' }, 500);
    }
});

// JSON fallback for 404
app.notFound((c) => {
    return c.json({ error: 'Not Found', path: c.req.path }, 404);
});

// --- SHIFT LOG API ---
app.get('/api/logs-summary', async (c) => {
    try {
        const location = c.req.query('location') || 'kp';
        if (!c.env.DB || !c.env.AI) return c.json({ error: 'DB or AI not available' }, 500);
        
        try {
            // Fetch logs from the last 7 days
            const logs = await c.env.DB.prepare(`
                SELECT author, message, priority, created_at 
                FROM shift_logs 
                WHERE location = ? 
                AND created_at > datetime('now', '-7 days')
                ORDER BY created_at DESC 
                LIMIT 50
            `).bind(location).all();

            if (logs.results.length === 0) return c.json({ summary: "Keine Einträge in den letzten 7 Tagen vorhanden." });

            const logText = logs.results.map(l => `[${l.priority.toUpperCase()}] ${l.author}: ${l.message}`).join('\n');
            
            const systemPrompt = `Du bist ein hilfreicher Assistent für Kinoleiter. 
            Analysiere die folgenden Übergabebuch-Einträge der letzten Tage. 
            Erstelle eine SEHR kompakte Zusammenfassung (max 3-5 Aufzählungspunkte). 
            Konzentriere dich auf:
            1. Technische Defekte oder offene Probleme.
            2. Wichtige Personal- oder Bestandshinweise.
            3. Besondere Vorkommnisse.
            Schreibe auf Deutsch, professionell und kurz gefasst.`;

            const response = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: logText }
                ],
                max_tokens: 512
            });

            return c.json({ summary: response.response });
        } catch (dbError) {
            if (dbError.message.includes('no such table')) {
                return c.json({ error: 'DB_MIGRATION_REQUIRED', summary: 'Bitte lege die Tabelle "shift_logs" in deiner Cloudflare D1 Datenbank an.' }, 500);
            }
            throw dbError;
        }
    } catch (e) {
        console.error('Summary generation error:', e);
        return c.json({ error: 'Failed to generate summary' }, 500);
    }
});

app.get('/api/logs', async (c) => {
    try {
        const location = c.req.query('location') || 'kp';
        if (!c.env.DB) return c.json([]);
        const logs = await c.env.DB.prepare(`
            SELECT * FROM shift_logs 
            WHERE location = ? 
            ORDER BY created_at DESC 
            LIMIT 50
        `).bind(location).all();
        return c.json(logs.results);
    } catch (e) {
        if (e.message.includes('no such table')) {
            return c.json({ error: 'DB_MIGRATION_REQUIRED' }, 500);
        }
        return c.json([], 500);
    }
});

app.post('/api/logs', async (c) => {
    try {
        const { location, author, message, priority, image_url } = await c.req.json();
        if (!c.env.DB || !message) return c.json({ error: 'Missing data or DB connection' }, 400);
        
        try {
            await c.env.DB.prepare(`
                INSERT INTO shift_logs (location, author, message, priority, image_url)
                VALUES (?, ?, ?, ?, ?)
            `).bind(location || 'kp', author || 'Anonym', message, priority || 'normal', image_url || null).run();
            return c.json({ success: true });
        } catch (dbError) {
            if (dbError.message.includes('no such table')) {
                return c.json({ error: 'DB_MIGRATION_REQUIRED' }, 500);
            }
            throw dbError;
        }
    } catch (e) {
        console.error('Log save error:', e);
        return c.json({ error: e.message }, 500);
    }
});
app.patch('/api/logs/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const { status } = await c.req.json();
        const db = c.env.DB || c.env.D1_DB;
        if (!db) return c.json({ error: 'DB not available' }, 500);
        const log = await db.prepare("SELECT * FROM shift_logs WHERE id = ?").bind(id).first();
        if (!log) return c.json({ error: 'Log not found' }, 404);
        let newMessage = log.message;
        if (status === 'in_progress') {
            if (!newMessage.includes('[IN_PROGRESS]')) newMessage += ' [IN_PROGRESS]';
        } else if (status === 'open') {
            newMessage = newMessage.replace('[IN_PROGRESS]', '').trim();
        }
        await db.prepare("UPDATE shift_logs SET message = ? WHERE id = ?").bind(newMessage, id).run();
        return c.json({ success: true });
    } catch (e) {
        console.error('Update log error:', e);
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/logs/:id', async (c) => {
    try {
        const id = c.req.param('id');
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);
        await c.env.DB.prepare('DELETE FROM shift_logs WHERE id = ?').bind(id).run();
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- CONTACTS / TELEFONLISTE API ---
app.get('/api/contacts', async (c) => {
    try {
        const location = c.req.query('location') || 'kp';
        if (!c.env.DB) return c.json([]);
        const contacts = await c.env.DB.prepare(`
            SELECT * FROM contacts 
            WHERE location = ? 
            ORDER BY category ASC, role_name ASC
        `).bind(location).all();
        return c.json(contacts.results || []);
    } catch (e) {
        if (e.message.includes('no such table')) {
            return c.json({ error: 'DB_MIGRATION_REQUIRED' }, 500);
        }
        return c.json([], 500);
    }
});

app.post('/api/contacts', async (c) => {
    try {
        const { location, category, role_name, phone_number } = await c.req.json();
        if (!c.env.DB || !category || !role_name || !phone_number) return c.json({ error: 'Missing data' }, 400);
        
        await c.env.DB.prepare(`
            INSERT INTO contacts (location, category, role_name, phone_number)
            VALUES (?, ?, ?, ?)
        `).bind(location || 'kp', category, role_name, phone_number).run();
        return c.json({ success: true });
    } catch (e) {
        console.error('Contact save error:', e);
        return c.json({ error: e.message }, 500);
    }
});

app.delete('/api/contacts/:id', async (c) => {
    try {
        const id = c.req.param('id');
        if (!c.env.DB) return c.json({ error: 'DB not available' }, 500);
        await c.env.DB.prepare('DELETE FROM contacts WHERE id = ?').bind(id).run();
        return c.json({ success: true });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});

// --- ANALYTICS API ---
app.get('/api/analytics', async (c) => {
    try {
        if (!c.env.DB) {
            // Mock data fallback if no DB
            const data = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                data.push({
                    date: d.toISOString().split('T')[0],
                    visitors: Math.floor(Math.random() * 2000) + 500,
                    occupancy_percent: Math.floor(Math.random() * 60) + 20
                });
            }
            return c.json(data);
        }

        // Real data fetch from occupancy_archive
        const results = await c.env.DB.prepare(`
            SELECT date, SUM(max_sold) as visitors, AVG(CAST(max_sold AS FLOAT)/CAST(capacity AS FLOAT)) * 100 as occupancy_percent
            FROM occupancy_archive
            WHERE capacity > 0
            GROUP BY date
            ORDER BY date DESC
            LIMIT 7
        `).all();
        
        return c.json(results.results || []);
    } catch (e) {
        console.error('Analytics fetch error:', e);
        return c.json({ error: e.message }, 500);
    }
});

// --- AI CHAT ASSISTANT API ---
app.post('/api/chat', async (c) => {
    try {
        const { message, context } = await c.req.json();
        if (!message) return c.json({ error: 'Message required' }, 400);

        if (!c.env.AI) {
            return c.json({ reply: "Cloudflare AI ist nicht verfügbar. Mock-Antwort auf: " + message });
        }

        const systemPrompt = `Du bist ein hilfreicher KI-Assistent für Kinomitarbeiter von Kinopolis.
        Beantworte Fragen der Mitarbeiter kurz und präzise auf Deutsch.
        Aktueller Kontext (z.B. Spielplan):
        ${context || 'Kein Spielplan verfügbar.'}`;

        const response = await c.env.AI.run('@cf/meta/llama-3-8b-instruct', {
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: message }
            ],
            max_tokens: 300
        });

        return c.json({ reply: response.response });
    } catch (e) {
        console.error('AI Chat Error:', e);
        return c.json({ error: e.message }, 500);
    }
});

// --- AI PLAN SCANNER + MODELL FALLBACK ---
app.post('/api/ai-agree', async (c) => {
    return c.json({ success: true });
});

app.post('/api/scan-plan', async (c) => {
    try {
        const body = await c.req.parseBody();
        const imageFile = body.image;
        const type = body.type || 'plan'; // 'plan' or 'seatmap'

        let prompt;
        if (type === 'seatmap') {
            prompt = `Du bist ein Sitzplan-Analyst. Analysiere diesen Screenshot eines Kinosaal-Buchungsplans.
            REGELN:
            1. Zähle die belegten Plätze (dunkelgrau oder mit Icon/Männchen markiert).
            2. Zähle die freien Plätze (farbig markiert: blau, beige oder grün).
            3. Berechne die prozentuale Auslastung.
            4. Gib NUR JSON zurück: {"occupied": X, "available": Y, "occupancy_percent": Z}`;
        } else {
            prompt = `Du bist ein hochpräziser OCR-Assistent für Kinobetriebe. 
            Analysiere das beigefügte Foto eines gedruckten Plans.
            AUFGABE: Extrahiere NUR die tatsächlich im Bild sichtbaren Daten für Saal, Film und Credits-Zeit.
            REGELN:
            1. Halluziniere NIEMALS Filmtitel wie "The Matrix", "Batman" oder andere Klassiker, wenn sie nicht im Bild stehen.
            2. Wenn du einen Titel nicht lesen kannst, schreibe "UNBEKANNT".
            3. Gib NUR ein valides JSON-Array zurück.
            Format: [{"hall": "1", "movie": "Titel", "credits_time": "HH:MM"}, ...]
            4. Wenn kein Plan erkennbar ist, gib ein leeres Array [] zurück.`;
        }

        let result;
        let usedModel = '@cf/meta/llama-3.2-11b-vision-instruct';

        console.log(`Starting AI Scan (${type}) with model ${usedModel}...`);

        try {
            const response = await c.env.AI.run(usedModel, {
                prompt,
                image: [...imageData],
                max_tokens: 1024
            });
            
            if (!response || !response.response) {
                console.error("AI returned empty response");
                return c.json({ error: 'KI hat keine Antwort geliefert. Bitte versuche es erneut.' }, 500);
            }
            
            result = response.response;
            console.log(`AI Response (${type}):`, result.substring(0, 100) + "...");
        } catch (e) {
            console.error(`AI Run Error (${usedModel}):`, e);
            return c.json({ error: `KI-Verarbeitungsfehler: ${e.message}. Möglicherweise ist das Bild zu groß oder die KI überlastet.` }, 500);
        }

        const jsonMatch = result.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
        if (!jsonMatch) {
            return c.json({ error: 'KI konnte keine gültige Datenstruktur finden.', raw: result }, 500);
        }

        const data = JSON.parse(jsonMatch[0]);

        const todayStr = new Date().toISOString().split('T')[0];
        try {
            if (c.env.DB && Array.isArray(data)) {
                for (const item of data) {
                    await c.env.DB.prepare(`
                        INSERT INTO scanned_plans (date, hall, movie, credits_time)
                        VALUES (?, ?, ?, ?)
                    `).bind(todayStr, item.hall, item.movie, item.credits_time).run();
                }
            }
        } catch (dbErr) {
            console.error("DB Save Error:", dbErr);
        }

        return c.json({ success: true, data, model: usedModel });
    } catch (e) {
        console.error('Scan error:', e);
        return c.json({ error: `Scanner-Fehler: ${e.message}` }, 500);
    }
});

// --- RESTOCK CALL API ---

app.post('/api/push/restock', async (c) => {
    const { location, item } = await c.req.json();
    if (!item) return c.json({ error: 'Missing item' }, 400);

    const payload = {
        title: '🚨 Nachschub benötigt!',
        body: `${item} an der Theke/Kasse leer! Bitte auffüllen.`,
        tag: 'restock-alert',
        data: { url: '/#restock' }
    };

    await sendPushToAll(c.env, payload, location);

    // Persist to logs for TL dashboard
    try {
        if (c.env.DB) {
            await c.env.DB.prepare(`
                INSERT INTO shift_logs (location, author, message, priority)
                VALUES (?, ?, ?, ?)
            `).bind(location || 'kp', 'System (Funk)', `[FUNK] ${item}`, 'dringend').run();
        }
    } catch (e) {
        console.error('Error saving restock to logs', e);
    }

    return c.json({ success: true });
});

// --- TRANSFERLISTE API ---
app.post('/api/push/transfer', async (c) => {
    const { location, author, items, station } = await c.req.json();
    if (!items) return c.json({ error: 'Missing items' }, 400);

    const titleStr = station ? `TL-Transferliste (${station})` : 'TL-Transferliste';
    
    const payload = {
        title: `📝 ${titleStr} - von ${author}`,
        body: items,
        tag: 'transfer-alert',
        data: { url: '/#transfer' }
    };

    // Optionally also save this as a high-priority log entry
    try {
        if (c.env.DB) {
            await c.env.DB.prepare(`
                INSERT INTO shift_logs (location, author, message, priority)
                VALUES (?, ?, ?, ?)
            `).bind(location || 'kp', author || 'Anonym', `[TRANSFERLISTE]\\n${items}`, 'wichtig').run();
        }
    } catch (e) {
        console.error('Error saving transfer to logs', e);
    }

    await sendPushToAll(c.env, payload, location);
    return c.json({ success: true });
});

// --- BROADCAST HELPER ---
async function sendPushToAll(env, payload, locationFilter = null) {
    if (!env.DB) return;
    
    let query = 'SELECT * FROM push_subscriptions';
    const params = [];
    if (locationFilter) {
        query += ' WHERE location = ?';
        params.push(locationFilter);
    }
    let subscriptions;
    try {
        subscriptions = await env.DB.prepare(query).bind(...params).all();
    } catch (e) {
        console.error('Error in sendPushToAll DB query:', e);
        return [{ error: 'DB error or missing push_subscriptions table' }];
    }
    
    const results = [];
    
    // Get current time in German timezone for shift filtering
    const berlinTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/Berlin", hour: '2-digit', minute: '2-digit' });
    const [nowH, nowM] = berlinTime.split(':').map(Number);
    const nowTotalMin = nowH * 60 + nowM;

    for (const sub of subscriptions.results) {
        try {
            const authHeader = await createVapidHeader(sub.endpoint, env);
            const encryptedBody = await encryptPayload(sub, payload);

            const res = await fetch(sub.endpoint, {
                method: 'POST',
                headers: { 
                    'TTL': '3600', 
                    'Authorization': authHeader,
                    'Content-Encoding': 'aes128gcm',
                    'Content-Type': 'application/octet-stream'
                },
                body: encryptedBody
            });
            
            if (res.status === 404 || res.status === 410) {
                await env.DB.prepare('DELETE FROM push_subscriptions WHERE endpoint = ?').bind(sub.endpoint).run();
            }
            results.push({ status: res.status });
        } catch (e) {
            results.push({ error: e.message });
        }
    }
    return results;
}

export default {
    async fetch(request, env, ctx) {
        if (request.url.includes('/api/')) {
            return app.fetch(request, env, ctx);
        }
        
        try {
            if (env.ASSETS) {
                const response = await env.ASSETS.fetch(request);
                if (response.status !== 404) return response;
            }
        } catch (e) {
            console.error('Asset fetch error:', e);
        }
        
        return app.fetch(request, env, ctx);
    },

    async scheduled(event, env, ctx) {
        console.log('Running Scheduled Push Checks...');
        if (!env.DB) return;

        // 1. Get all unique locations that have subscribers
        const locRes = await env.DB.prepare('SELECT DISTINCT location FROM push_subscriptions').all();
        const locations = locRes.results.map(r => r.location);
        if (locations.length === 0) return;

        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const todayStr = now.toISOString().split('T')[0];

        for (const loc of locations) {
            console.log(`Checking alerts for: ${loc}`);
            try {
                // Fetch sessions for this location
                const sessionsRes = await app.request(`/api/sessions?location=${loc}`, {}, env);
                if (!sessionsRes.ok) continue;
                const halls = await sessionsRes.json();

                for (const hall of halls) {
                    const sessions = hall.sessions;
                    for (let i = 0; i < sessions.length; i++) {
                        const s = sessions[i];
                        if (!s.time || !s.time.includes(':')) continue;
                        const [h, m] = s.time.split(':').map(Number);
                        const startMin = h * 60 + m;
                        const diff = startMin - currentMinutes;

                        // --- ZE ALERT (15m before start) ---
                        if (diff > 0 && diff <= 15 && s.sold > 50) {
                            const alertHash = `ze-${loc}-${hall.name}-${s.time}-${s.title}`;
                            const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                            
                            if (!existing) {
                                await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                                await sendPushToAll(env, {
                                    title: 'Check-In: ' + hall.name,
                                    body: `${s.title} beginnt in ${diff} Min. (${s.sold} Gäste). Bitte Ausweise kontrollieren!`,
                                    tag: 'ze-alert'
                                }, loc);
                            }
                        }

                        // --- POSTER ALERT (20m after start) ---
                        // Show NEXT movie and its poster image
                        if (diff < 0 && diff >= -30 && diff <= -20) {
                            const nextS = sessions[i + 1];
                            if (nextS && s.title !== nextS.title) {
                                const alertHash = `poster-${loc}-${hall.name}-${s.time}-${nextS.title}`;
                                if (loc === 'kp') {
                                    const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                                    
                                    if (!existing) {
                                        await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                                        // Poster Popups disabled per user request - only show in dashboard
                                    }
                                }
                            }
                        }

                        // --- EXIT ALERT (Duration-based) ---
                        const endMin = startMin + s.duration;
                        const endDiff = endMin - currentMinutes;
                        if (endDiff > -5 && endDiff <= 5 && s.duration > 0) {
                            const alertHash = `exit-${loc}-${hall.name}-${s.time}-${s.title}`;
                            const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                            
                            if (!existing) {
                                await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                                await sendPushToAll(env, {
                                    title: '🚪 Auslass läuft: ' + hall.name,
                                    body: `${s.title} endet jetzt. Bitte Auslass vorbereiten!`,
                                    tag: 'exit-alert'
                                }, loc);
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(`Scheduled loop error for ${loc}:`, err);
            }
        }

        // 2. Check SCANNED PLANS for Poster Changes (Keep legacy support, but could be merged later)
        const scannedResults = await env.DB.prepare('SELECT * FROM scanned_plans WHERE date = ?').bind(todayStr).all();
        for (const row of scannedResults.results) {
            if (!row.credits_time || !row.credits_time.includes(':')) continue;
            const [h, m] = row.credits_time.split(':').map(Number);
            const alertMin = h * 60 + m;
            const diff = alertMin - currentMinutes;

            if (diff >= -5 && diff <= 5) {
                const alertHash = `scanned-poster-${row.hall}-${row.credits_time}-${row.movie}`;
                const existing = await env.DB.prepare('SELECT id FROM notification_state WHERE alert_hash = ?').bind(alertHash).first();
                if (!existing) {
                    await env.DB.prepare('INSERT INTO notification_state (alert_hash) VALUES (?)').bind(alertHash).run();
                    // Poster Popups disabled per user request
                }
            }
        }

        // 3. MORNING SYNC (8:00 AM)
        const berlinTime = new Date().toLocaleString("en-GB", { timeZone: "Europe/Berlin", hour: '2-digit', minute: '2-digit' });
        const [h, m] = berlinTime.split(':').map(Number);
        
        // Run between 8:00 and 8:15
        if (h === 8 && m <= 15) {
            console.log('MORNING SYNC: Refreshing all locations at 8:00 AM...');
            for (const loc of locations) {
                try {
                    // This will trigger the max-value archiving logic inside /api/sessions
                    await app.request(`/api/sessions?location=${loc}&v=${Date.now()}`, {}, env);
                } catch (e) {
                    console.error(`Morning sync failed for ${loc}:`, e);
                }
            }
        }
    }
};

app.get('/api/diag', async (c) => {
    return c.json({
        status: 'ok',
        time: new Date().toISOString(),
        env: Object.keys(c.env),
        location: c.req.query('location') || 'kp'
    });
});

app.get('/api/stats/occupancy-history', async (c) => {
    if (!c.env.DB) return c.json({ error: 'Datenbank nicht verfügbar' }, 500);
    const location = c.req.query('location') || 'kp';
    try {
        // 1. Last 14 days visitor trend
        const trend = await c.env.DB.prepare(`
            SELECT date, SUM(max_sold) as total_visitors 
            FROM occupancy_archive 
            WHERE location = ? 
            GROUP BY date 
            ORDER BY date DESC 
            LIMIT 14
        `).bind(location).all();
        
        // 2. Average occupancy percent by hour bucket (08:00 to 23:00)
        const hourly = await c.env.DB.prepare(`
            SELECT SUBSTR(time, 1, 2) || ':00' as hour_bucket, 
                   AVG(CAST(max_sold AS REAL) / CAST(CASE WHEN capacity > 0 THEN capacity ELSE 1 END AS REAL)) * 100 as avg_occupancy_percent
            FROM occupancy_archive
            WHERE location = ?
            GROUP BY hour_bucket
            ORDER BY hour_bucket ASC
        `).bind(location).all();

        // 3. Top movies in last 30 days
        const movies = await c.env.DB.prepare(`
            SELECT title, SUM(max_sold) as total_sold
            FROM occupancy_archive
            WHERE location = ? AND date >= date('now', '-30 days')
            GROUP BY title
            ORDER BY total_sold DESC
            LIMIT 5
        `).bind(location).all();

        return c.json({
            trend: (trend.results || []).reverse(),
            hourly: hourly.results || [],
            movies: movies.results || []
        });
    } catch (e) {
        return c.json({ error: e.message }, 500);
    }
});
