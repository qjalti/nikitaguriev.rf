self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("all-cache").then((cache) => {
      return cache.addAll(["../build/index.html"]);
    }),
  );
});
