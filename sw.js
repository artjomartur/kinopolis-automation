self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    
    let promise;
    if (event.data) {
        try {
            const data = event.data.json();
            promise = Promise.resolve(data);
        } catch (e) {
            promise = Promise.resolve({
                title: 'Kinopolis Dashboard',
                body: event.data.text() || 'Neue Nachricht verfügbar'
            });
        }
    } else {
        // PULL STRATEGY: Fetch latest notification data from server
        promise = fetch('/api/push/last-notification')
            .then(res => res.json())
            .catch(() => ({
                title: 'Kinopolis Dashboard',
                body: 'Neue Nachricht verfügbar'
            }));
    }

    event.waitUntil(
        promise.then(data => {
            const title = data.title || 'Kinopolis Dashboard';
            const options = {
                body: data.body,
                icon: data.icon || '/logo-kinopolis-official.png',
                image: data.image || null,
                badge: '/icon.png',
                vibrate: [100, 50, 100],
                data: data.data || { url: '/' },
                actions: [
                    { action: 'open', title: 'Ansehen' }
                ]
            };
            return self.registration.showNotification(title, options);
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();

    const urlToOpen = event.notification.data.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
