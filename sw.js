// 基础的 Service Worker 脚本，用于允许网页离线缓存并满足 PWA 安装条件
const CACHE_NAME = 'my-pwa-cache-v1';

// 需要离线缓存的文件列表，应该将所有的静态资源都列在这里，包括 HTML、CSS、JS 文件以及图标等
const urlsToCache = [
  './',
  './index.html',
  './settings.html',  // 如果你还有其他页面，请依此类推加在这里
  './style.css',      // 提取出来的独立样式文件
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
