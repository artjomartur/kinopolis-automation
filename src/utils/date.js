/**
 * Date & Time Utilities for Kinopolis Automation
 */

export function parseDateSafe(dateStr) {
    if (!dateStr) return null;
    try {
        const d = new Date(dateStr);
        return isNaN(d.getTime()) ? null : d;
    } catch {
        return null;
    }
}

export function formatMinutes(minutes) {
    if (isNaN(minutes) || minutes === null) return '--:--';
    const normalized = (minutes % 1440 + 1440) % 1440;
    const hours = Math.floor(normalized / 60);
    const mins = normalized % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

export function parseTimeToMinutes(timeStr) {
    if (!timeStr || !timeStr.includes(':')) return 0;
    const parts = timeStr.split(':').map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
}

export function formatDateTimeSafe(dateStr) {
    const d = parseDateSafe(dateStr);
    if (!d) return '--.--. ----:--';
    return d.toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formatDateOnlySafe(dateStr) {
    const d = parseDateSafe(dateStr);
    if (!d) return '--.--.----';
    return d.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function formatTimeOnly(dateStr) {
    const d = parseDateSafe(dateStr);
    if (!d) return '--:--';
    return d.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}

export function isSessionActive(session, currentMinutes = null) {
    if (currentMinutes === null) {
        const now = new Date();
        currentMinutes = now.getHours() * 60 + now.getMinutes();
    }
    const start = session.startMin ?? parseTimeToMinutes(session.time);
    const end = session.endMin ?? (start + (session.duration || 90));
    return currentMinutes >= start && currentMinutes <= end;
}
