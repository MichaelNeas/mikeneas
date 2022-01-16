const CACHE_NAME = 'neasCache';
self.addEventListener('install', e => {
  let urlsToCache = ['neasNav.js', 'neasBalls.js', 'neasAnimate.js', '../css/neasy.css', '../../index.html', '../../pages/home.html'];
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)).catch(err => console.log(err, 'while opening cache for service worker')));
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => {
    if (response) {
      return response;
    }

    return fetch(event.request).then(response => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      var responseToCache = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseToCache));
      return response;
    });
  }).catch(err => console.log(err, 'failed while fetching')));
});