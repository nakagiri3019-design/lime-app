// 尾田版 専用キャッシュ。ルート版 / noguchi 版とは独立させること。
const CACHE_NAME = 'lime-oda-cache-v3';
const PRECACHE_URLS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './img/ogasawara_before.jpg',
  './img/ogasawara_during.jpg',
  './img/ogasawara_after.jpg',
  './img/sato_toilet_before.jpg',
  './img/sato_toilet_after.jpg',
  './img/sato_basin_before.jpg',
  './img/sato_basin_during.jpg',
  './img/sato_basin_after.jpg',
  './img/iijima_bath_before.jpg',
  './img/iijima_bath_during.jpg',
  './img/iijima_bath_after.jpg',
  './img/zanshin_setup_delivery.jpg',
  './img/zanshin_setup_progress.jpg',
  './img/zanshin_setup_night.jpg',
  './img/zanshin_setup_restored.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          // 自分（shinmura）の古い世代だけを消す。他版のキャッシュには触らない。
          .filter((name) => name.startsWith('lime-oda-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Network-first: always try to fetch the latest version, falling back to the
// cache only when offline. This keeps the app from getting stuck showing an
// outdated cached page after a deploy.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok && response.type === 'basic') {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});
