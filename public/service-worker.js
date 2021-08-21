self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('static').then( cache => {
        return cache.addAll([
          './',
          './index.html',
          './manifest.webmanifest',
          './styles.css',
          './icons/icon-192x192.png',
          './icons/icon-512x512.png',
          './index.js',
          './offline.js'
        ]);
      })
    );
    console.log('Install');
    self.skipWaiting();
  });
  
  // Fetch assets from cache
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then( response => {
        return response || fetch(event.request);
      })
    );
  });