const CACHE_NAME = 'neasCache';

self.addEventListener('install', e => {
	//relative to current location
	let urlsToCache = ['neasNav.js', 'neasBalls.js', 'neasAnimate.js','../css/neasy.css', '../../index.html', '../../pages/home.html'];
	e.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
		.catch(err => console.log(err, 'while opening cache for service worker'))
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
	  	caches.match(event.request)
			.then(response => {
			  // Cache hit - return response
		  	if (response) { return response; }
		  	return fetch(event.request).then(
				response => {
					// Check if we received a valid response
					if(!response || response.status !== 200 || response.type !== 'basic') {
						return response;
					}
	
					// IMPORTANT: Clone the response. A response is a stream
					// and because we want the browser to consume the response
					// as well as the cache consuming the response, we need
					// to clone it so we have two streams.
					var responseToCache = response.clone();
	
					caches.open(CACHE_NAME)
					.then(cache => cache.put(event.request, responseToCache))
					return response;
				}
		  	);
		}).catch( err => console.log(err, 'failed while fetching'))
	);
});  
   