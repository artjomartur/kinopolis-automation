/**
 * UI Utilities (Toasts, Modals, Haptics, Clipboard)
 */

export function showToast(message, isError = false, durationMs = 3000) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'global-toast';
        toast.className = 'global-toast';
        document.body.appendChild(toast);
    }

    const icon = toast.querySelector('#toast-icon');
    const msgEl = toast.querySelector('#toast-msg');

    if (icon && msgEl) {
        icon.innerText = isError ? '❌' : '✅';
        msgEl.innerText = message;
        toast.style.borderLeft = isError ? '4px solid #ef4444' : '4px solid #10b981';
    } else {
        toast.style.background = isError ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #10b981, #059669)';
        toast.innerHTML = `<span>${isError ? '⚠️' : '✅'}</span> <span>${message}</span>`;
    }

    toast.classList.add('show');
    toast.classList.add('active');

    if (window._toastTimeout) clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.remove('active');
    }, durationMs);
}

export function triggerHaptic(type = 'light') {
    if (!navigator.vibrate) return;
    try {
        switch (type) {
            case 'success':
                navigator.vibrate([30, 50, 30]);
                break;
            case 'warning':
                navigator.vibrate([50, 100, 50]);
                break;
            case 'error':
                navigator.vibrate([100, 50, 100, 50, 100]);
                break;
            case 'medium':
                navigator.vibrate(30);
                break;
            case 'heavy':
                navigator.vibrate(50);
                break;
            case 'light':
            default:
                navigator.vibrate(15);
                break;
        }
    } catch {
        // Ignore vibration errors
    }
}

export function copyToClipboard(target, successMsg = 'In die Zwischenablage kopiert! 📋') {
    let textToCopy = target;
    if (typeof target === 'string' && document.getElementById(target)) {
        textToCopy = document.getElementById(target).innerText || document.getElementById(target).value;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(successMsg, false);
            triggerHaptic('success');
        }).catch(() => {
            showToast('Kopieren fehlgeschlagen', true);
        });
    } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast(successMsg, false);
            triggerHaptic('success');
        } catch {
            showToast('Kopieren fehlgeschlagen', true);
        }
        document.body.removeChild(textarea);
    }
}
