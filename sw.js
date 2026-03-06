const CACHE = 'barcode-tools-v2';

const ASSETS = [
  '/bct/scanner.html',
  '/bct/generator.html',
  '/bct/manifest.json',
  '/bct/icons/icon-192.png',
  '/bct/icons/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/bwip-js/3.4.0/bwip-js-min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap',
];

// Install: cache everything
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: drop old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
