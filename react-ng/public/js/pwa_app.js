window.addEventListener("load", async () => {
  if ("serviceWorker" in navigator) {
    try {
      const REG = await navigator.serviceWorker.register("./sw.js");
      console.log(REG);
    } catch (err) {
      console.log("Service worker register fail!", err);
    }
  }
});
