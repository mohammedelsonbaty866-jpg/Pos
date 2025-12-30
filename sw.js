const CACHE_NAME = "pos-super-pro-v1";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/login.html",
  "/manifest.json",

  "/assets/css/style.css",
  "/assets/css/auth.css",
  "/assets/css/theme.css",

  "/assets/js/auth.js",
  "/assets/js/auth-guard.js",
  "/assets/js/data.js",
  "/assets/js/products.js",
  "/assets/js/cashier.js",
  "/assets/js/barcode.js",
  "/assets/js/settings.js",

  "/assets/sounds/beep.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => k !== CACHE_NAME && caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
