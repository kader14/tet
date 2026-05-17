/* ==========================================================================
   Smart Focus Hub — Service Worker
   Strategy:
   - Precache the app shell on install
   - Network-first for HTML (so updates are picked up)
   - Cache-first for static assets (CSS/JS/SVG/manifest)
   - Stale-while-revalidate for Google Fonts
   - Notification click handler focuses or opens the app
   ========================================================================== */

const VERSION = 'sfh-v3.0.0';
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
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Google Fonts — stale-while-revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, FONTS_CACHE));
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(networkFirst(req, RUNTIME_CACHE));
    return;
  }

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
  } catch {
    return cached || Response.error();
  }
}

async function networkFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.status === 200) cache.put(req, fresh.clone());
    return fresh;
  } catch {
    const cached = (await cache.match(req)) || (await caches.match('./index.html'));
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

// ----------------------- Notification clicks --------------------------
// When a user taps the timer-completion notification, focus an existing
// app window (or open a new one) so they can continue/return easily.
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || './';

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of allClients) {
      const url = new URL(client.url);
      // Match by pathname so query/hash differences don't matter
      if (url.pathname.endsWith('/') || url.pathname.endsWith('index.html') || url.pathname === self.location.pathname) {
        if ('focus' in client) {
          await client.focus();
          if ('navigate' in client) {
            try { await client.navigate(targetUrl); } catch {/* same origin only */}
          }
          return;
        }
      }
    }
    if (self.clients.openWindow) {
      await self.clients.openWindow(targetUrl);
    }
  })());
});
