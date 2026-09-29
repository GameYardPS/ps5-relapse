(function () {
  "use strict";

  var pill = document.getElementById("cache-pill");
  var label = document.getElementById("cache-status");

  function setCache(text, state) {
    if (!pill || !label) return;
    label.textContent = text;
    pill.className = "cache-pill" + (state ? " " + state : "");
  }

  function setFirmware() {
    var node = document.getElementById("firmware-value");
    if (!node) return;
    var match = navigator.userAgent.match(/PlayStation 5\/(\d+\.\d+)/i);
    node.textContent = match ? match[1] : "AUTO";
  }

  setFirmware();

  if (!window.applicationCache) {
    setCache("CACHE NOT SUPPORTED", "failed");
    return;
  }

  var appCache = window.applicationCache;
  appCache.addEventListener("checking", function () {
    setCache("CHECKING CACHE");
  });
  appCache.addEventListener("downloading", function () {
    setCache("DOWNLOADING CACHE");
  });
  appCache.addEventListener("progress", function (event) {
    if (event.total) {
      var percent = Math.round((event.loaded / event.total) * 100);
      setCache("CACHING " + percent + "%");
    }
  });
  appCache.addEventListener("cached", function () {
    setCache("CACHE READY", "ready");
  });
  appCache.addEventListener("noupdate", function () {
    setCache("CACHE READY", "ready");
  });
  appCache.addEventListener("updateready", function () {
    setCache("CACHE UPDATE READY", "ready");
    try { appCache.swapCache(); } catch (error) {}
  });
  appCache.addEventListener("error", function () {
    setCache("CACHE FAILED — CONNECT TO THE INTERNET", "failed");
  });
}());
