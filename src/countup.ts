// D-day 숫자가 화면에 보일 때 0부터 차례로 올라가는 효과.
// @ts-nocheck
export function enableCountUp() {

  if (window.__artsideCount) return; window.__artsideCount = true;
  var RE = /D-(\d+)/;
  var seen = new WeakSet();
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function run(node) {
    var m = RE.exec(node.nodeValue); if (!m) return;
    var target = parseInt(m[1], 10), t0 = performance.now(), dur = Math.min(1400, 600 + target * 8);
    function frame(now) {
      var p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      var cur = node.nodeValue, mm = RE.exec(cur); if (!mm) return;
      node.nodeValue = cur.replace(RE, 'D-' + Math.round(target * e));
      if (p < 1) requestAnimationFrame(frame); else node.nodeValue = cur.replace(RE, 'D-' + target);
    }
    node.nodeValue = node.nodeValue.replace(RE, 'D-0');
    requestAnimationFrame(frame);
  }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      (en.target.__cuNodes || []).forEach(run);
      en.target.__cuNodes = [];
    });
  }, { threshold: 0.6 }) : null;
  var pending = false;
  function scan() {
    pending = false;
    if (reduce || !io) return;
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) {
      if (seen.has(n) || !RE.test(n.nodeValue)) continue;
      var el = n.parentElement; if (!el || el.closest('script, style, header, nav')) continue;
      seen.add(n);
      (el.__cuNodes = el.__cuNodes || []).push(n);
      io.observe(el);
    }
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(scan); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule); else schedule();
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  setTimeout(schedule, 700);

}
