const CACHE_NAME = 'instantlaunch-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  // ajoutez ici assets à mettre en cache (css, icônes...)
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // Strategy: cache first for navigation and same-origin assets
  if (req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(resp => {
      // Cache font/icon/html responses as needed
      return resp;
    }).catch(() => {
      // fallback if needed
    }))
  );
});
 
