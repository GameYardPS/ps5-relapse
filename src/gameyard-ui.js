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
    setCache("التخزين غير مدعوم", "failed");
    return;
  }

  var appCache = window.applicationCache;
  appCache.addEventListener("checking", function () {
    setCache("فحص الكاش");
  });
  appCache.addEventListener("downloading", function () {
    setCache("تنزيل الكاش");
  });
  appCache.addEventListener("progress", function (event) {
    if (event.total) {
      var percent = Math.round((event.loaded / event.total) * 100);
      setCache("تجهيز الكاش " + percent + "%");
    }
  });
  appCache.addEventListener("cached", function () {
    setCache("الكاش جاهز", "ready");
  });
  appCache.addEventListener("noupdate", function () {
    setCache("الكاش جاهز", "ready");
  });
  appCache.addEventListener("updateready", function () {
    setCache("تحديث الكاش جاهز", "ready");
    try { appCache.swapCache(); } catch (error) {}
  });
  appCache.addEventListener("error", function () {
    setCache("فشل الكاش — اتصل بالإنترنت", "failed");
  });
}());
