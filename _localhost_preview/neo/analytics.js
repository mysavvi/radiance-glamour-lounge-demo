/**
 * Optional privacy-friendly analytics for deployed Neo rebuild demos.
 * Set data-neo-analytics-id on <html> or pass window.NEO_ANALYTICS_ID before load.
 *
 * Default: logs page views to console in demo mode. Replace sendBeacon URL when
 * you have a real analytics endpoint.
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var siteId =
    window.NEO_ANALYTICS_ID ||
    root.getAttribute("data-neo-analytics-id") ||
    "";

  if (!siteId) return;

  var payload = {
    siteId: siteId,
    path: location.pathname,
    referrer: document.referrer || "",
    ts: new Date().toISOString(),
  };

  if (navigator.sendBeacon && window.NEO_ANALYTICS_ENDPOINT) {
    navigator.sendBeacon(
      window.NEO_ANALYTICS_ENDPOINT,
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
  } else if (window.NEO_ANALYTICS_DEBUG) {
    console.info("[neo-analytics]", payload);
  }
})();
