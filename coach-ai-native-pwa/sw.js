/* Service worker : mode hors ligne pour Coach AI-Native.
   Pour forcer la mise à jour des fichiers sur les appareils, changez le numéro de version ci-dessous. */
const CACHE = "coach-ai-native-v1";
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  const sameOrigin = u.origin === self.location.origin;
  const fonts = u.hostname === "fonts.googleapis.com" || u.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !fonts) return;

  // Page : réseau d'abord pour recevoir les mises à jour, cache en secours hors ligne.
  if (r.mode === "navigate") {
    e.respondWith(
      fetch(r)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("index.html", copy));
          }
          return res;
        })
        .catch(() => caches.match("index.html").then((m) => m || caches.match("./")))
    );
    return;
  }

  // Le reste (icônes, polices) : cache d'abord, rafraîchi en arrière-plan.
  e.respondWith(
    caches.match(r).then((hit) => {
      const net = fetch(r)
        .then((res) => {
          if (res && (res.ok || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(r, copy));
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
