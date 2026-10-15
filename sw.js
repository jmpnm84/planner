const CACHE_NAME = 'planner-pessoal-v2';
const assetsToCache = [
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700&display=swap',
  'https://github.com/user-attachments/assets/784593ca-a828-4ce4-8c4f-23981497b7df'
];

// Instalação do Service Worker e cache de recursos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceção de pedidos de rede para funcionamento offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Fallback caso falhe a rede
      });
    })
  );
});
