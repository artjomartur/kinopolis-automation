import os
import sys
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FFMPEG_BIN = os.path.abspath('node_modules/ffmpeg-static/ffmpeg')
OUT_DIR = os.path.abspath('public/assets/videos')
os.makedirs(OUT_DIR, exist_ok=True)

# Fonts
FONT_TITLE_PATH = '/System/Library/Fonts/Supplemental/Futura.ttc'
FONT_REGULAR_PATH = '/System/Library/Fonts/SFNS.ttf'
if not os.path.exists(FONT_TITLE_PATH):
    FONT_TITLE_PATH = '/System/Library/Fonts/Helvetica.ttc'
if not os.path.exists(FONT_REGULAR_PATH):
    FONT_REGULAR_PATH = '/System/Library/Fonts/Helvetica.ttc'

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

# Audio Generation (124 BPM, 24 seconds)
def generate_audio(duration=24.0, sr=44100):
    audio_path = os.path.join(OUT_DIR, 'soundtrack.wav')
    total_samples = int(duration * sr)
    audio = np.zeros(total_samples, dtype=np.float32)

    bpm = 124
    beat_sec = 60.0 / bpm
    beat_samples = int(beat_sec * sr)

    # 1. Kick drum
    kt = np.arange(int(0.18 * sr)) / sr
    kick_freq = 140 * np.exp(-32 * kt) + 38
    kick = np.sin(2 * np.pi * kick_freq * kt) * np.exp(-14 * kt)

    # 2. Snare / Clap
    st = np.arange(int(0.15 * sr)) / sr
    noise = (np.random.rand(len(st)) * 2 - 1) * np.exp(-22 * st)
    tone = np.sin(2 * np.pi * 200 * st) * np.exp(-18 * st) * 0.4
    snare = (noise + tone) * 0.55

    # 3. Hi-hat
    ht = np.arange(int(0.04 * sr)) / sr
    hihat = (np.random.rand(len(ht)) * 2 - 1) * np.exp(-60 * ht) * 0.2

    # 4. Bass synth notes
    frequencies = [73.42, 87.31, 98.0, 110.0]

    num_beats = int(duration / beat_sec)
    for b in range(num_beats):
        pos = int(b * beat_samples)
        if pos + len(kick) < total_samples:
            audio[pos:pos+len(kick)] += kick * 0.85
        if b % 2 == 1 and pos + len(snare) < total_samples:
            audio[pos:pos+len(snare)] += snare * 0.75
        pos_half = pos + beat_samples // 2
        if pos_half + len(hihat) < total_samples:
            audio[pos_half:pos_half+len(hihat)] += hihat * 0.4

        f = frequencies[(b // 4) % len(frequencies)]
        bt = np.arange(int(beat_sec * 0.85 * sr)) / sr
        saw = (2 * (bt * f - np.floor(0.5 + bt * f))) * np.exp(-4 * bt)
        if pos + len(saw) < total_samples:
            audio[pos:pos+len(saw)] += saw * 0.28

    # Final cymbal / chime
    end_t = np.arange(int(2.5 * sr)) / sr
    chime = (np.sin(2 * np.pi * 880 * end_t) + np.sin(2 * np.pi * 1320 * end_t) * 0.5) * np.exp(-2.0 * end_t) * 0.3
    end_pos = int((duration - 3.0) * sr)
    if end_pos + len(chime) < total_samples:
        audio[end_pos:end_pos+len(chime)] += chime

    audio = audio / (np.max(np.abs(audio)) + 1e-6) * 0.92
    int_audio = (audio * 32767).astype(np.int16)

    import wave
    with wave.open(audio_path, 'w') as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(int_audio.tobytes())

    return audio_path

# Helpers for visuals
def create_gradient_bg(width, height, color1, color2, center_glow=None):
    # Base vertical gradient
    arr = np.zeros((height, width, 4), dtype=np.uint8)
    for y in range(height):
        factor = y / height
        r = int(color1[0] * (1 - factor) + color2[0] * factor)
        g = int(color1[1] * (1 - factor) + color2[1] * factor)
        b = int(color1[2] * (1 - factor) + color2[2] * factor)
        arr[y, :, 0] = r
        arr[y, :, 1] = g
        arr[y, :, 2] = b
        arr[y, :, 3] = 255
    bg = Image.fromarray(arr, 'RGBA')
    
    if center_glow:
        glow = Image.new('RGBA', (width, height), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        cx, cy, radius, gcolor = center_glow
        gdraw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=gcolor)
        glow = glow.filter(ImageFilter.GaussianBlur(radius=int(radius * 0.4)))
        bg = Image.alpha_composite(bg, glow)
        
    return bg

def draw_glass_card(draw, box, radius=16, bg_color=(15, 23, 42, 210), border_color=(255, 255, 255, 50)):
    draw.rounded_rectangle(box, radius=radius, fill=bg_color, outline=border_color, width=1)

# ==========================================
# VIDEO 1: 16:9 Desktop Showcase (1920x1080)
# ==========================================
def render_showcase_16x9():
    print("--- Rendering 16:9 Desktop Showcase ---")
    width, height = 1920, 1080
    fps = 30
    duration = 24.0
    total_frames = int(duration * fps)

    # Assets
    app_icon = Image.open('assets/app-icon.png').convert('RGBA')
    oli_img = Image.open('public/assets/Oli/Oli_1_bgless.png').convert('RGBA')
    
    slides = [
        Image.open('public/assets/web_showcase/web_1_dashboard.png').convert('RGBA').resize((width, height)),
        Image.open('public/assets/web_showcase/web_2_analytics.png').convert('RGBA').resize((width, height)),
        Image.open('public/assets/web_showcase/web_3_reports.png').convert('RGBA').resize((width, height)),
        Image.open('public/assets/web_showcase/web_4_admin.png').convert('RGBA').resize((width, height)),
    ]

    font_huge = get_font(FONT_TITLE_PATH, 76)
    font_large = get_font(FONT_TITLE_PATH, 44)
    font_med = get_font(FONT_REGULAR_PATH, 28)
    font_small = get_font(FONT_REGULAR_PATH, 22)
    font_badge = get_font(FONT_REGULAR_PATH, 20)

    # Scene boundaries (seconds)
    # 0.0 - 4.0: Intro
    # 4.0 - 8.5: Slide 1 (Live Monitor)
    # 8.5 - 13.0: Slide 2 (Foyer Analytics)
    # 13.0 - 17.5: Slide 3 (Schichtbericht)
    # 17.5 - 20.5: Slide 4 (Gastro & Admin)
    # 20.5 - 24.0: Outro

    temp_video = os.path.join(OUT_DIR, 'raw_showcase_16x9.mp4')
    cmd = [
        FFMPEG_BIN, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{width}x{height}',
        '-pix_fmt', 'rgba',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        temp_video
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    for f in range(total_frames):
        t = f / fps
        frame = Image.new('RGBA', (width, height), (10, 10, 14, 255))
        draw = ImageDraw.Draw(frame)

        # ---------------- SCENE 1: INTRO (0 - 4.0s) ----------------
        if t < 4.0:
            progress = t / 4.0
            # Radial Glow
            bg = create_gradient_bg(width, height, (12, 12, 20), (5, 5, 8), center_glow=(width//2, height//2 - 40, int(350 + np.sin(t*3)*30), (229, 9, 20, 70)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            # Icon zoom in & float
            icon_scale = min(1.0, progress * 1.4)
            icon_size = int(220 * icon_scale)
            if icon_size > 10:
                cur_icon = app_icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
                ix = width // 2 - icon_size // 2
                iy = int(height // 2 - 200 + np.sin(t * 3) * 8)
                frame.paste(cur_icon, (ix, iy), cur_icon)

            # Text
            text_alpha = int(min(255, max(0, (t - 0.5) * 200)))
            if text_alpha > 0:
                title = "KINOPOLIS AUTOMATION SUITE"
                tbox = draw.textbbox((0, 0), title, font=font_huge)
                tw = tbox[2] - tbox[0]
                draw.text(((width - tw) // 2, height // 2 + 60), title, font=font_huge, fill=(255, 255, 255, text_alpha))

                sub = "Das moderne Betriebssystem für deinen Kinobetrieb"
                sbox = draw.textbbox((0, 0), sub, font=font_med)
                sw = sbox[2] - sbox[0]
                draw.text(((width - sw) // 2, height // 2 + 155), sub, font=font_med, fill=(200, 205, 215, text_alpha))

                # Beta Pill
                btext = "★ OFFICIAL v1.1.0-beta RELEASE"
                bbox = draw.textbbox((0, 0), btext, font=font_badge)
                bw = bbox[2] - bbox[0]
                bx = (width - bw) // 2
                by = height // 2 + 215
                draw.rounded_rectangle([bx - 16, by - 6, bx + bw + 16, by + 26], radius=14, fill=(245, 158, 11, int(text_alpha * 0.2)), outline=(245, 158, 11, text_alpha), width=2)
                draw.text((bx, by), btext, font=font_badge, fill=(245, 158, 11, text_alpha))

        # ---------------- SCENE 2: LIVE SAAL-MONITOR (4.0 - 8.5s) ----------------
        elif t < 8.5:
            st = t - 4.0
            scale = 1.0 + st * 0.015
            sw, sh = int(width * scale), int(height * scale)
            cur_slide = slides[0].resize((sw, sh), Image.Resampling.LANCZOS)
            sx = (sw - width) // 2
            sy = (sh - height) // 2
            frame.paste(cur_slide.crop((sx, sy, sx + width, sy + height)), (0, 0))
            draw = ImageDraw.Draw(frame)

            # Floating Card Top-Left
            card_w, card_h = 680, 140
            cx, cy = 60, 60
            draw_glass_card(draw, [cx, cy, cx + card_w, cy + card_h])
            # Red pulse dot
            draw.ellipse([cx + 25, cy + 28, cx + 43, cy + 46], fill=(229, 9, 20, 255))
            draw.text((cx + 55, cy + 24), "ECHTZEIT SAAL-ÜBERWACHUNG", font=font_large, fill=(255, 255, 255))
            draw.text((cx + 25, cy + 85), "Live-Sitzpläne · Belegungsquoten · Restlaufzeiten aller Säle", font=font_small, fill=(180, 190, 205))

        # ---------------- SCENE 3: FOYER-ANALYTICS (8.5 - 13.0s) ----------------
        elif t < 13.0:
            st = t - 8.5
            scale = 1.0 + st * 0.015
            sw, sh = int(width * scale), int(height * scale)
            cur_slide = slides[1].resize((sw, sh), Image.Resampling.LANCZOS)
            sx = int((sw - width) * (st / 4.5))
            sy = (sh - height) // 2
            frame.paste(cur_slide.crop((sx, sy, sx + width, sy + height)), (0, 0))
            draw = ImageDraw.Draw(frame)

            card_w, card_h = 700, 140
            cx, cy = 60, 60
            draw_glass_card(draw, [cx, cy, cx + card_w, cy + card_h])
            draw.ellipse([cx + 25, cy + 28, cx + 43, cy + 46], fill=(37, 99, 235, 255))
            draw.text((cx + 55, cy + 24), "SMARTE FOYER-ANALYTICS", font=font_large, fill=(255, 255, 255))
            draw.text((cx + 25, cy + 85), "15-Min Timeline · Einlass- & Auslasswellen · Personalbedarf", font=font_small, fill=(180, 190, 205))

        # ---------------- SCENE 4: SCHICHTBERICHT (13.0 - 17.5s) ----------------
        elif t < 17.5:
            st = t - 13.0
            scale = 1.0 + st * 0.015
            sw, sh = int(width * scale), int(height * scale)
            cur_slide = slides[2].resize((sw, sh), Image.Resampling.LANCZOS)
            sx = (sw - width) // 2
            sy = (sh - height) // 2
            frame.paste(cur_slide.crop((sx, sy, sx + width, sy + height)), (0, 0))
            draw = ImageDraw.Draw(frame)

            card_w, card_h = 740, 140
            cx, cy = 60, 60
            draw_glass_card(draw, [cx, cy, cx + card_w, cy + card_h])
            draw.ellipse([cx + 25, cy + 28, cx + 43, cy + 46], fill=(16, 185, 129, 255))
            draw.text((cx + 55, cy + 24), "1-KLICK SCHICHTBERICHT", font=font_large, fill=(255, 255, 255))
            draw.text((cx + 25, cy + 85), "Druckoptimiertes DIN A4 PDF-Protokoll & WhatsApp/Telegram-Export", font=font_small, fill=(180, 190, 205))

        # ---------------- SCENE 5: GASTRO & ADMIN (17.5 - 20.5s) ----------------
        elif t < 20.5:
            st = t - 17.5
            scale = 1.0 + st * 0.015
            sw, sh = int(width * scale), int(height * scale)
            cur_slide = slides[3].resize((sw, sh), Image.Resampling.LANCZOS)
            sx = (sw - width) // 2
            sy = (sh - height) // 2
            frame.paste(cur_slide.crop((sx, sy, sx + width, sy + height)), (0, 0))
            draw = ImageDraw.Draw(frame)

            card_w, card_h = 720, 140
            cx, cy = 60, 60
            draw_glass_card(draw, [cx, cy, cx + card_w, cy + card_h])
            draw.ellipse([cx + 25, cy + 28, cx + 43, cy + 46], fill=(245, 158, 11, 255))
            draw.text((cx + 55, cy + 24), "GASTRO & INVENTUR", font=font_large, fill=(255, 255, 255))
            draw.text((cx + 25, cy + 85), "Popcorn-Tracker · Mindesthaltbarkeit (MHD) & Störungsmelder", font=font_small, fill=(180, 190, 205))

        # ---------------- SCENE 6: OUTRO (20.5 - 24.0s) ----------------
        else:
            st = t - 20.5
            bg = create_gradient_bg(width, height, (14, 14, 22), (6, 6, 10), center_glow=(width//2 + 100, height//2, 400, (229, 9, 20, 80)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            # Mascot Oli on left
            oli_size = 520
            cur_oli = oli_img.resize((oli_size, oli_size), Image.Resampling.LANCZOS)
            ox = 180 + int(np.sin(st * 4) * 8)
            oy = height // 2 - oli_size // 2 + 20
            frame.paste(cur_oli, (ox, oy), cur_oli)

            # Right side content
            rx = 780
            # Small App Icon
            s_icon = app_icon.resize((90, 90), Image.Resampling.LANCZOS)
            frame.paste(s_icon, (rx, 280), s_icon)

            draw.text((rx + 115, 290), "KINOPOLIS AUTOMATION SUITE", font=font_large, fill=(255, 255, 255))
            draw.text((rx + 115, 345), "v1.1.0-beta Release · Bereit für den Kinobetrieb", font=font_small, fill=(245, 158, 11))

            draw.text((rx, 420), "JETZT KOSTENLOS TESTEN", font=font_huge, fill=(255, 255, 255))
            draw.text((rx, 520), "github.com/artjomartur/kinopolis-automation", font=font_med, fill=(96, 165, 250))

            # Tech badges
            badges = ["Cloudflare Workers", "Vite PWA", "iOS Native", "D1 SQLite"]
            bx = rx
            for b in badges:
                bbox = draw.textbbox((0, 0), b, font=font_badge)
                bw = bbox[2] - bbox[0]
                draw.rounded_rectangle([bx, 600, bx + bw + 24, 638], radius=8, fill=(30, 41, 59), outline=(71, 85, 105))
                draw.text((bx + 12, 608), b, font=font_badge, fill=(226, 232, 240))
                bx += bw + 36

        # Global Bottom Progress Bar (Tech style)
        p_width = int(width * (t / duration))
        draw.rectangle([0, height - 6, p_width, height], fill=(229, 9, 20))

        proc.stdin.write(np.array(frame).tobytes())

    proc.stdin.close()
    proc.wait()

    # Mux Audio
    print("Muxing audio into 16:9 Showcase...")
    final_16x9 = os.path.join(OUT_DIR, 'kinopolis_showcase_16x9.mp4')
    audio_path = os.path.join(OUT_DIR, 'soundtrack.wav')
    mux_cmd = [
        FFMPEG_BIN, '-y',
        '-i', temp_video,
        '-i', audio_path,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        final_16x9
    ]
    subprocess.run(mux_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(temp_video):
        os.remove(temp_video)
    print(f"Created: {final_16x9}")

# ==========================================
# VIDEO 2: 9:16 Mobile Reel (1080x1920)
# ==========================================
def render_mobile_reel_9x16():
    print("--- Rendering 9:16 Mobile Social Reel ---")
    width, height = 1080, 1920
    fps = 30
    duration = 24.0
    total_frames = int(duration * fps)

    app_icon = Image.open('assets/app-icon.png').convert('RGBA')
    oli_img = Image.open('public/assets/Oli/Oli_1_bgless.png').convert('RGBA')

    app_shots = [
        Image.open('public/assets/appstore/appstore_1_live.png').convert('RGBA'),
        Image.open('public/assets/appstore/appstore_2_funk.png').convert('RGBA'),
        Image.open('public/assets/appstore/appstore_3_scanner.png').convert('RGBA'),
        Image.open('public/assets/appstore/appstore_4_action.png').convert('RGBA'),
        Image.open('public/assets/appstore/appstore_5_mehr.png').convert('RGBA'),
    ]

    font_huge = get_font(FONT_TITLE_PATH, 72)
    font_large = get_font(FONT_TITLE_PATH, 50)
    font_med = get_font(FONT_REGULAR_PATH, 34)
    font_small = get_font(FONT_REGULAR_PATH, 26)
    font_badge = get_font(FONT_REGULAR_PATH, 24)

    temp_video = os.path.join(OUT_DIR, 'raw_mobile_reel_9x16.mp4')
    cmd = [
        FFMPEG_BIN, '-y',
        '-f', 'rawvideo',
        '-vcodec', 'rawvideo',
        '-s', f'{width}x{height}',
        '-pix_fmt', 'rgba',
        '-r', str(fps),
        '-i', '-',
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        temp_video
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    for f in range(total_frames):
        t = f / fps
        frame = Image.new('RGBA', (width, height), (10, 10, 14, 255))
        draw = ImageDraw.Draw(frame)

        # ---------------- SCENE 1: REEL INTRO (0 - 4.0s) ----------------
        if t < 4.0:
            progress = t / 4.0
            bg = create_gradient_bg(width, height, (15, 15, 24), (5, 5, 10), center_glow=(width//2, height//2 - 120, int(320 + np.sin(t*3)*25), (229, 9, 20, 90)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            # Icon zoom in & float
            icon_scale = min(1.0, progress * 1.5)
            icon_size = int(260 * icon_scale)
            if icon_size > 10:
                cur_icon = app_icon.resize((icon_size, icon_size), Image.Resampling.LANCZOS)
                ix = width // 2 - icon_size // 2
                iy = int(height // 2 - 320 + np.sin(t * 3.5) * 12)
                frame.paste(cur_icon, (ix, iy), cur_icon)

            text_alpha = int(min(255, max(0, (t - 0.5) * 200)))
            if text_alpha > 0:
                h1 = "DAS BETRIEBSSYSTEM"
                h2 = "FÜR DEIN KINO 🎬"
                b1 = draw.textbbox((0, 0), h1, font=font_huge)
                b2 = draw.textbbox((0, 0), h2, font=font_huge)
                draw.text(((width - (b1[2]-b1[0])) // 2, height // 2 + 30), h1, font=font_huge, fill=(255, 255, 255, text_alpha))
                draw.text(((width - (b2[2]-b2[0])) // 2, height // 2 + 120), h2, font=font_huge, fill=(229, 9, 20, text_alpha))

                sub = "Kinopolis Operations Suite · v1.1.0-beta"
                sb = draw.textbbox((0, 0), sub, font=font_med)
                draw.text(((width - (sb[2]-sb[0])) // 2, height // 2 + 230), sub, font=font_med, fill=(200, 205, 215, text_alpha))

                pill = "★ JETZT FÜR iOS & WEB VERFÜGBAR"
                pb = draw.textbbox((0, 0), pill, font=font_badge)
                pw = pb[2] - pb[0]
                px = (width - pw) // 2
                py = height // 2 + 320
                draw.rounded_rectangle([px - 20, py - 8, px + pw + 20, py + 34], radius=16, fill=(245, 158, 11, int(text_alpha * 0.2)), outline=(245, 158, 11, text_alpha), width=2)
                draw.text((px, py), pill, font=font_badge, fill=(245, 158, 11, text_alpha))

        # ---------------- SCENE 2: SAAL-RADAR (4.0 - 8.0s) ----------------
        elif t < 8.0:
            bg = create_gradient_bg(width, height, (18, 12, 16), (8, 6, 10), center_glow=(width//2, 850, 450, (229, 9, 20, 50)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            # Header Top
            draw.text((60, 140), "🔴 LIVE SAAL-RADAR", font=font_large, fill=(229, 9, 20))
            draw.text((60, 210), "Alle Säle & Belegungsquoten live", font=font_med, fill=(255, 255, 255))
            draw.text((60, 260), "Restlaufzeiten, Reinigungsslots & Spitzen", font=font_small, fill=(160, 170, 185))

            # Floating Phone Mockup
            target_w = 780
            target_h = int(target_w * 2796 / 1290)
            st = t - 4.0
            cur_shot = app_shots[0].resize((target_w, target_h), Image.Resampling.LANCZOS)
            py = int(350 + np.sin(st * 2.5) * 10)
            px = (width - target_w) // 2
            frame.paste(cur_shot, (px, py), cur_shot)

        # ---------------- SCENE 3: DIGITALER FUNK (8.0 - 12.0s) ----------------
        elif t < 12.0:
            bg = create_gradient_bg(width, height, (12, 16, 26), (6, 8, 14), center_glow=(width//2, 850, 450, (37, 99, 235, 50)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            draw.text((60, 140), "📻 DIGITALER FUNKRUF", font=font_large, fill=(59, 130, 246))
            draw.text((60, 210), "Sekundenschnelle Team-Pushes", font=font_med, fill=(255, 255, 255))
            draw.text((60, 260), "Saaldienst rufen, Gastro auffüllen, Einlass regeln", font=font_small, fill=(160, 170, 185))

            target_w = 780
            target_h = int(target_w * 2796 / 1290)
            st = t - 8.0
            cur_shot = app_shots[1].resize((target_w, target_h), Image.Resampling.LANCZOS)
            py = int(350 + np.sin(st * 2.5) * 10)
            px = (width - target_w) // 2
            frame.paste(cur_shot, (px, py), cur_shot)

        # ---------------- SCENE 4: TICKET-SCANNER (12.0 - 16.0s) ----------------
        elif t < 16.0:
            bg = create_gradient_bg(width, height, (10, 22, 18), (5, 12, 10), center_glow=(width//2, 850, 450, (16, 185, 129, 50)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            draw.text((60, 140), "🎟️ BLITZ-SCANNER & FSK", font=font_large, fill=(16, 185, 129))
            draw.text((60, 210), "Sichere Einlasskontrolle", font=font_med, fill=(255, 255, 255))
            draw.text((60, 260), "Schneller QR-Check & JuSchG Altersprüfung", font=font_small, fill=(160, 170, 185))

            target_w = 780
            target_h = int(target_w * 2796 / 1290)
            st = t - 12.0
            cur_shot = app_shots[2].resize((target_w, target_h), Image.Resampling.LANCZOS)
            py = int(350 + np.sin(st * 2.5) * 10)
            px = (width - target_w) // 2
            frame.paste(cur_shot, (px, py), cur_shot)

        # ---------------- SCENE 5: FUNDBÜRO & SCHICHT (16.0 - 20.0s) ----------------
        elif t < 20.0:
            bg = create_gradient_bg(width, height, (24, 18, 12), (12, 8, 6), center_glow=(width//2, 850, 450, (245, 158, 11, 50)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            draw.text((60, 140), "📋 SCHICHT-MANAGEMENT", font=font_large, fill=(245, 158, 11))
            draw.text((60, 210), "Digitales Fundbüro & Checklisten", font=font_med, fill=(255, 255, 255))
            draw.text((60, 260), "Gefundene Gegenstände erfassen & Aufgaben abhaken", font=font_small, fill=(160, 170, 185))

            target_w = 780
            target_h = int(target_w * 2796 / 1290)
            st = t - 16.0
            cur_shot = app_shots[4].resize((target_w, target_h), Image.Resampling.LANCZOS)
            py = int(350 + np.sin(st * 2.5) * 10)
            px = (width - target_w) // 2
            frame.paste(cur_shot, (px, py), cur_shot)

        # ---------------- SCENE 6: OUTRO (20.0 - 24.0s) ----------------
        else:
            st = t - 20.0
            bg = create_gradient_bg(width, height, (18, 14, 24), (8, 6, 12), center_glow=(width//2, height//2 - 50, 450, (229, 9, 20, 85)))
            frame.paste(bg, (0, 0))
            draw = ImageDraw.Draw(frame)

            # Mascot Oli
            oli_size = 460
            cur_oli = oli_img.resize((oli_size, oli_size), Image.Resampling.LANCZOS)
            ox = (width - oli_size) // 2
            oy = 240 + int(np.sin(st * 4) * 10)
            frame.paste(cur_oli, (ox, oy), cur_oli)

            # Icon
            s_icon = app_icon.resize((120, 120), Image.Resampling.LANCZOS)
            frame.paste(s_icon, (width // 2 - 60, 760), s_icon)

            h1 = "KINOBETRIEB DIGITALISIERT."
            b1 = draw.textbbox((0, 0), h1, font=font_large)
            draw.text(((width - (b1[2]-b1[0])) // 2, 920), h1, font=font_large, fill=(255, 255, 255))

            h2 = "Jetzt Beta auf GitHub testen"
            b2 = draw.textbbox((0, 0), h2, font=font_med)
            draw.text(((width - (b2[2]-b2[0])) // 2, 995), h2, font=font_med, fill=(245, 158, 11))

            h3 = "github.com/artjomartur/kinopolis-automation"
            b3 = draw.textbbox((0, 0), h3, font=font_small)
            draw.text(((width - (b3[2]-b3[0])) // 2, 1070), h3, font=font_small, fill=(96, 165, 250))

            # Badges
            pill = "iOS · ANDROID · PWA · DESKTOP"
            pb = draw.textbbox((0, 0), pill, font=font_badge)
            pw = pb[2] - pb[0]
            px = (width - pw) // 2
            py = 1160
            draw.rounded_rectangle([px - 20, py - 8, px + pw + 20, py + 34], radius=16, fill=(30, 41, 59), outline=(71, 85, 105), width=2)
            draw.text((px, py), pill, font=font_badge, fill=(226, 232, 240))

        # Bottom Progress Bar
        p_width = int(width * (t / duration))
        draw.rectangle([0, height - 8, p_width, height], fill=(229, 9, 20))

        proc.stdin.write(np.array(frame).tobytes())

    proc.stdin.close()
    proc.wait()

    print("Muxing audio into 9:16 Mobile Reel...")
    final_9x16 = os.path.join(OUT_DIR, 'kinopolis_mobile_reel_9x16.mp4')
    audio_path = os.path.join(OUT_DIR, 'soundtrack.wav')
    mux_cmd = [
        FFMPEG_BIN, '-y',
        '-i', temp_video,
        '-i', audio_path,
        '-c:v', 'copy',
        '-c:a', 'aac',
        '-b:a', '192k',
        '-shortest',
        final_9x16
    ]
    subprocess.run(mux_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if os.path.exists(temp_video):
        os.remove(temp_video)
    print(f"Created: {final_9x16}")

# ==========================================
# PREVIEW GIFS for README
# ==========================================
def render_preview_gifs():
    print("--- Creating Lightweight Preview GIFs for README ---")
    # 1. 16:9 Showcase Preview (640x360, 10fps, first 12 seconds)
    mp4_16x9 = os.path.join(OUT_DIR, 'kinopolis_showcase_16x9.mp4')
    gif_16x9 = os.path.join(OUT_DIR, 'showcase_preview.gif')
    if os.path.exists(mp4_16x9):
        cmd = [
            FFMPEG_BIN, '-y',
            '-ss', '0', '-t', '10',
            '-i', mp4_16x9,
            '-vf', 'fps=10,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer',
            gif_16x9
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Created GIF: {gif_16x9}")

    # 2. 9:16 Mobile Preview (360x640, 10fps, first 10 seconds)
    mp4_9x16 = os.path.join(OUT_DIR, 'kinopolis_mobile_reel_9x16.mp4')
    gif_9x16 = os.path.join(OUT_DIR, 'mobile_preview.gif')
    if os.path.exists(mp4_9x16):
        cmd = [
            FFMPEG_BIN, '-y',
            '-ss', '0', '-t', '10',
            '-i', mp4_9x16,
            '-vf', 'fps=10,scale=360:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer',
            gif_9x16
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"Created GIF: {gif_9x16}")

if __name__ == '__main__':
    print("Starting Video Generation Engine...")
    generate_audio(24.0)
    render_showcase_16x9()
    render_mobile_reel_9x16()
    render_preview_gifs()
    print("=== All Videos & Previews Generated Successfully! ===")
