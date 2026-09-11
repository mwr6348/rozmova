/* Rozmova service worker.
   HTML is network-first so a new version can never be pinned by a stale cache;
   static assets stay cache-first for speed. Cache is only a fallback offline. */
const CACHE = 'rozmova-v34';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192-v14.png', './icon-512-v14.png', './icon-maskable-512-v14.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Let the page ask for an immediate update.
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;   // never touch the API or audio

  const isPage = e.request.mode === 'navigate' ||
                 (e.request.destination === 'document') ||
                 url.pathname.endsWith('/') ||
                 url.pathname.endsWith('.html');

  if (isPage){
    // NETWORK FIRST: always get the newest app when online.
    e.respondWith(
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Static assets: cache first, refresh in the background.
  e.respondWith(
    caches.match(e.request).then(hit =>
      hit ||
      fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }).catch(() => hit)
    )
  );
});
