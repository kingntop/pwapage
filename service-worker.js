// service-worker.js

const OFFLINE_URL = 'offline.html';
const CACHE_NAME = 'pwa-cache-v2';
const urlsToCache = [
  '/pwapage/',
  '/pwapage/index.html',
  '/pwapage/offline.html',
  '/pwapage/styles.css',
  '/pwapage/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => caches.match(OFFLINE_URL)) // Serve offline page if resource not found
    );
  });