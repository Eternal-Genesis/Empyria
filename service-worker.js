// 🔁 Cacheo simple para Empyria SPA
const CACHE_NAME = 'empyria-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/base.css',
  '/manifest.json',
  '/template.html',
  '/components.js',
  '/main.js',
  '/firebase.js',
  // Agrega aquí vistas y scripts clave
  '/home.view.html',
  '/home.js',
  '/habits.view.html',
  '/habits.js',
  '/calendar.view.html',
  '/calendar.js',
  '/tasks.view.html',
  '/tasks.js',
  '/progress.view.html',
  '/progress.js',
  '/profile.view.html',
  '/profile.js'
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
