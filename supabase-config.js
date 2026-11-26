// Supabase settings for the portfolio site (anon key is public by design)
window.SUPABASE_URL = 'https://jfkwbegzgjojypflcefx.supabase.co';
window.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impma3diZWd6Z2pvanlwZmxjZWZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTU0OTMzMDQsImV4cCI6MjExMTA2OTMwNH0.-Xrxu82pnSYD8CC-Dul1Djx7rz6Qyno5pQ0FkgYira4';
// index.html uses "supabaseClient.createClient", the CDN provides "supabase"
window.supabaseClient = window.supabase;

// Small fixes for items added dynamically from Supabase
(function () {
  function fixProjects() {
    var w = document.querySelector('#projects .wrap');
    if (!w) return;
    var list = [].slice.call(w.querySelectorAll('.pj'));
    list.sort(function (a, b) { return a.dataset.n - b.dataset.n; });
    var cur = [].slice.call(w.children).filter(function (e) { return e.classList.contains('pj'); });
    var ok = list.every(function (e, i) { return e === cur[i]; }) && cur.length &&
             cur[0].previousElementSibling && cur[0].previousElementSibling.tagName === 'H2';
    if (!ok) list.forEach(function (e) { w.appendChild(e); });
  }
  new MutationObserver(function (muts) {
    var projects = false;
    muts.forEach(function (m) {
      [].forEach.call(m.addedNodes, function (n) {
        if (n.nodeType !== 1) return;
        if (n.classList.contains('rv') || n.classList.contains('sr') || n.classList.contains('ti')) n.classList.add('in');
        if (n.classList.contains('pj')) projects = true;
      });
    });
    if (projects) fixProjects();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
