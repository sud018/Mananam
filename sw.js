// Offline support: core files are cached on install; each text's file is cached the first time it is opened.
var CACHE = 'mananam-v20';
var CORE = ['./', './index.html', './library.js', './manifest.webmanifest',
            './icon-180.png', './icon-192.png', './icon-512.png', './texts/rudram/text.js', './texts/rudram/art.js', './fonts/TiroTelugu-mantra.woff2'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
// Network first (so new texts and fixes show up), falling back to the cache when offline.
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return;   // YouTube etc. go straight to the network
  if(e.request.headers.has('range')) return;   // audio seeking
  e.respondWith(
    fetch(e.request.mode === 'navigate' ? e.request : new Request(e.request.url, {cache: 'no-cache', credentials: 'same-origin'})).then(function(r){   // always check GitHub for a newer copy
      if(r.status !== 200) return r;
      var copy = r.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, copy); }); return r;
    }).catch(function(){ return caches.match(e.request); })
  );
});
