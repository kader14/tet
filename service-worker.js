/* ==========================================================================
   Smart Focus Hub — Service Worker
   Strategy:
   - Precache the app shell on install
   - Network-first for HTML (so updates are picked up)
   - Cache-first for static assets (CSS/JS/SVG/manifest)
   - Stale-while-revalidate for Google Fonts
   ========================================================================== */

const VERSION = 'sfh-v2.0.0';
const STATIC_CACHE = `static-${VERSION}`;
const RUNTIME_CACHE = `runtime-${VERSION}`;
const FONTS_CACHE = `fonts-${VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icon.svg',
];

// ---------------------------- Install ---------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ---------------------------- Activate --------------------------------
self.addEventListener('activate', (event) => {
  const allowed = new Set([STATIC_CACHE, RUNTIME_CACHE, FONTS_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !allowed.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// ---------------------------- Fetch -----------------------------------
self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Google Fonts — stale-while-revalidate
  if (
    url.hostname === 'fonts.googleapis.com' ||
    url.hostname === 'fonts.gstatic.com'
  ) {
    event.respondWith(staleWhileRevalidate(req, FONTS_CACHE));
    return;
  }

  // Same-origin only beyond this point
  if (url.origin !== self.location.origin) return;

  // HTML / navigation — network-first to pick up updates
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(networkFirst(req, RUNTIME_CACHE));
    return;
  }

  // Static assets — cache-first
  event.respondWith(cacheFirst(req, STATIC_CACHE));
});

// ---------------------- Caching Strategies ----------------------------
async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200 && fresh.type === 'basic') {
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    // Fallback for any non-HTML asset miss
    return cached || Response.error();
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) {
      cache.put(req, fresh.clone());
    }
    return fresh;
  } catch (err) {
    const cached = await cache.match(req) || await caches.match('./index.html');
    return cached || Response.error();
  }
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const network = fetch(req)
    .then((res) => {
      if (res && res.status === 200) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || network || Response.error();
}

// ----------------------- Message Channel ------------------------------
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
