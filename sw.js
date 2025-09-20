const CACHE_NAME = 'youzai-cache-v1';
const urlsToCache = [
  '/',                 // 根目录
  '/index.html',       // 首页
  '/manifest.json',    // PWA manifest
  '/icon-192.png',     // 图标
  '/icon-512.png',     // 图标
  // 文章图片
  'https://raw.githubusercontent.com/fuchenyouzai/youzai/main/t2.jpg',
  'https://via.placeholder.com/400x200?text=示例图片',
  'https://via.placeholder.com/300x200?text=图片2',
  'https://via.placeholder.com/300x200?text=图片3'
];

// 安装 SW 并缓存资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // 激活新 SW
});

// 激活 SW 并清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // 立即接管页面
});

// 请求拦截，优先返回缓存
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // 离线时可返回默认图片或 HTML 页面
        if (event.request.destination === 'image') {
          return new Response(
            '<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="200" fill="#ccc"/><text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" fill="#666" font-size="20">图片离线</text></svg>',
            { headers: { 'Content-Type': 'image/svg+xml' } }
          );
        }
      });
    })
  );
});