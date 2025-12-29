const CACHE_NAME = "pos-pro-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",

  "/assets/css/style.css",

  "/assets/js/data.js",
  "/assets/js/products.js",
  "/assets/js/cashier.js",
  "/assets/js/auth-guard.js",

  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
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

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
