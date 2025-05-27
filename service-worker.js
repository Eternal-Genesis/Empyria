const CACHE_NAME = 'empyria-cache-v1';
const urlsToCache = [
  '/Empyria/',
  '/Empyria/index.html',
  '/Empyria/base.css',
  '/Empyria/manifest.json',
  '/Empyria/template.html',
  '/Empyria/components.js',
  '/Empyria/main.js',
  '/Empyria/firebase.js',
  '/Empyria/icon-192.png',
  '/Empyria/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});
