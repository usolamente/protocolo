/* Protocolo · Service Worker
 * Estrategia:
 *  - Navegación HTML → network-first, con fallback a la página cacheada y,
 *    en última instancia, a la raíz "/" (app shell).
 *  - Estáticos (_next/static, iconos, imágenes) → stale-while-revalidate.
 *  - Precache tolerante a fallos de las rutas raíz.
 *
 * Subir CACHE_VERSION fuerza invalidación tras un deploy.
 */

const CACHE_VERSION = "protocolo-v7";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const PRECACHE_ROUTES = [
  "/",
  "/calendario",
  "/reto",
  "/spartan",
  "/hipertrofia",
  "/bienestar",
  "/manifest.json",
  "/icons/apple-touch-icon.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      // add() individual y tolerante: si una ruta falla, no rompe el resto.
      await Promise.allSettled(
        PRECACHE_ROUTES.map(async (url) => {
          try {
            await cache.add(new Request(url, { cache: "reload" }));
          } catch (_) {
            /* ignora la ruta que falle */
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

const isStaticAsset = (url) => {
  const path = url.pathname;
  return (
    path.startsWith("/_next/") ||
    path.startsWith("/icons/") ||
    path.startsWith("/spartan/") ||
    /\.(?:css|js|woff2?|ttf|png|jpg|jpeg|svg|webp|ico|json)$/i.test(path)
  );
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch (_) {
    return;
  }

  // Imágenes de ejercicios (free-exercise-db en GitHub raw): cache-first,
  // para que funcionen offline tras la primera carga con conexión.
  if (url.hostname === "raw.githubusercontent.com") {
    event.respondWith(
      (async () => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.ok) cache.put(request, fresh.clone());
          return fresh;
        } catch (_) {
          return new Response("", { status: 504 });
        }
      })(),
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Navegación HTML → network-first con fallback robusto al app shell.
  if (
    request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html")
  ) {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, fresh.clone());
          return fresh;
        } catch (_) {
          const cache = await caches.open(RUNTIME_CACHE);
          // 1) intenta la misma ruta cacheada
          const cached = await cache.match(request);
          if (cached) return cached;
          // 2) intenta la ruta en el cache estático (precache)
          const staticCache = await caches.open(STATIC_CACHE);
          const pre =
            (await staticCache.match(url.pathname)) ||
            (await staticCache.match(request));
          if (pre) return pre;
          // 3) último recurso: app shell "/"
          const shell =
            (await staticCache.match("/")) || (await cache.match("/"));
          if (shell) return shell;
          return new Response(
            "<h1>Sin conexión</h1><p>Abre la app con conexión al menos una vez.</p>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } },
          );
        }
      })(),
    );
    return;
  }

  // Estáticos → stale-while-revalidate.
  if (isStaticAsset(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })(),
    );
  }
});
