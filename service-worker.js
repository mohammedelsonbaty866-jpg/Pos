const CACHE_NAME = "pos-pro-cache-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",

  "/login.html",
  "/settings.html",
  "/reports.html",
  "/products.html",

  "/assets/css/style.css",
  "/assets/css/auth.css",

  "/assets/js/app.js",
  "/assets/js/data.js",
  "/assets/js/cashier.js",
  "/assets/js/products.js",
  "/assets/js/auth.js",
  "/assets/js/auth-guard.js",
  "/assets/js/settings.js",

  "/manifest.json",

  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

/* ===== INSTALL ===== */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* ===== ACTIVATE ===== */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* ===== FETCH ===== */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
