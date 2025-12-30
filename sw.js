const CACHE_NAME = "pos-super-pro-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./login.html",
  "./manifest.json",
  "./assets/css/style.css",
  "./assets/css/auth.css",
  "./assets/css/theme.css",
  "./assets/js/auth.js",
  "./assets/js/auth-guard.js",
  "./assets/js/data.js",
  "./assets/js/products.js",
  "./assets/js/cashier.js",
  "./assets/js/reports.js",
  "./assets/js/settings.js",
  "./assets/js/barcode.js",
  "./assets/sounds/beep.mp3"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
