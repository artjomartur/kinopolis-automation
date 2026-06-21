const fs = require('fs');
const path = './src/index.html';
let html = fs.readFileSync(path, 'utf8');

const modalHtml = `
<!-- Forced Feedback Modal -->
<div class="modal" id="forced-feedback-modal" style="z-index: 10001; background: rgba(0,0,0,0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);">
    <div class="modal-content" style="max-width: 420px; padding: 0; overflow: hidden; position: relative; background: #fff; border-radius: 28px; box-shadow: 0 24px 60px rgba(0,0,0,0.4); border: 2px solid rgba(255,255,255,0.1);">
        <div style="padding: 2.5rem 2rem; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 130px; height: 130px; border-radius: 50%; overflow: hidden; border: 6px solid #fff; margin-bottom: 1rem; box-shadow: 0 12px 25px rgba(0,0,0,0.1); position: relative; z-index: 2;">
                <!-- Fallback to png if mp4 doesn't exist yet -->
                <video id="oli-lab-vid" src="/assets/Oli/Oli_Lab.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: block;" onerror="this.style.display='none'; document.getElementById('oli-lab-img').style.display='block';"></video>
                <img id="oli-lab-img" src="/assets/Oli/Oli_Lab.png" style="width: 100%; height: 100%; object-fit: cover; object-position: center; display: none;" />
            </div>
            
            <div style="background: #fff; color: #4b4b4b; position: relative; margin-bottom: 1.5rem; width: 100%;">
                <h2 style="margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; color: #3c3c3c;">Labor-Check! 🔬</h2>
                <p style="font-size: 1.1rem; line-height: 1.4; color: #777; font-weight: 500;">Wie läuft's im Dashboard? Gibt es etwas, das wir noch verbessern können?</p>
            </div>
            
            <div style="width: 100%; display: flex; flex-direction: column; gap: 0.8rem; margin-bottom: 1.5rem;">
                <textarea id="forced-feedback-text" placeholder="Deine ehrliche Meinung..." style="width: 100%; border: 2px solid #e5e5e5; border-radius: 16px; padding: 1rem; font-size: 1rem; color: #4b4b4b; font-family: inherit; resize: none; min-height: 100px; transition: all 0.2s;" onfocus="this.style.border='2px solid #58cc02'; this.style.outline='none';" onblur="this.style.border='2px solid #e5e5e5';"></textarea>
            </div>

            <div style="width: 100%; display: flex; gap: 1rem;">
                <button onclick="document.getElementById('forced-feedback-modal').style.display='none'" style="flex: 1; padding: 1rem; border-radius: 16px; font-size: 1.1rem; font-weight: 700; color: #999; background: #f0f0f0; border: none; border-bottom: 4px solid #dcdcdc; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;">Später</button>
                <button onclick="submitForcedFeedback()" style="flex: 2; padding: 1rem; border-radius: 16px; font-size: 1.1rem; font-weight: 700; color: white; background: #58cc02; border: none; border-bottom: 4px solid #58a700; cursor: pointer; transition: all 0.2s; font-family: 'Outfit', sans-serif;">Feedback senden</button>
            </div>
        </div>
    </div>
</div>

<script>
function submitForcedFeedback() {
    const text = document.getElementById('forced-feedback-text').value;
    if(text.trim() === '') {
        alert('Bitte gib ein Feedback ein!');
        return;
    }
    document.getElementById('forced-feedback-text').value = '';
    document.getElementById('forced-feedback-modal').style.display = 'none';
    if (typeof confetti === 'function') {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
    // Set cookie/storage so we don't annoy them for a while
    localStorage.setItem('oli_last_feedback', Date.now().toString());
}

function forceFeedbackCheck() {
    setTimeout(() => {
        if(localStorage.getItem('oli_onboarding_done') === 'true') {
            document.getElementById('forced-feedback-modal').style.display = 'flex';
        }
    }, 2000);
}

document.addEventListener('DOMContentLoaded', forceFeedbackCheck);
</script>
</body>`;

html = html.replace('</body>', modalHtml);
fs.writeFileSync(path, html);
