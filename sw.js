//installation
self.addEventListener("install", (event) => {
	event.waitUntil(
		// creating cache
		caches.open("example").then((cache) => {
			return cache.addAll([]);
		}))
})
// fetching event
self.addEventListener("fetch", (event) => {
	event.respondWith(caches.match(event.request).then((response) => {
		return response || fetch(event.request).then((response1) => {
			return caches.open("example").then((cache) => {
				cache.put(event.request, response1.clone());
				return response1;
			})
		})
	}))
})
