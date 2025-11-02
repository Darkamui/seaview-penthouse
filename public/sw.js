// Minimal service worker for PWA install prompt
// No caching or offline functionality - just enables "Add to Home Screen" on mobile

self.addEventListener('install', () => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Claim clients immediately
  event.waitUntil(self.clients.claim());
});

// Minimal fetch handler - just pass through to network
self.addEventListener('fetch', (event) => {
  // No caching - just return network response
  event.respondWith(fetch(event.request));
});
