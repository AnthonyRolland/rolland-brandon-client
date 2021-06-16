var CACHE_NAME = 'basic-sw-cache-v1';
var urlsToCache = [
  '/index.html',
  '/assets/logo/project.svg',
  'static/js/bundle.js',
  'static/js/0.chunk.js',
  'static/js/main.chunk.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});