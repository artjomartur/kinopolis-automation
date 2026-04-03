self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    let data = {};
    try {
        data = event.data.json();
    } catch (e) {
        data = {
            title: 'Kinopolis Dashboard',
            body: event.data.text() || 'Neue Nachricht verfügbar'
        };
    }

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

    event.waitUntil(self.registration.showNotification(title, options));
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
