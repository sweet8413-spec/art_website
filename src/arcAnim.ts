// 인기 전시 아치: 마우스를 올린(또는 누른) 포스터가 가운데 액자 자리로 회전해 들어오고, onPick(순번)을 알려줘요.
// @ts-nocheck
export function artsideArc(root, onPick) {
  if (!root) return function () {};
  var T = 2.24, Y0 = 411, RY = 293, n = root.querySelectorAll('.arc-p').length || 9, s = T / n;
  var phase = T / 2, from = phase, to = phase, t0 = 0, dur = 1, raf = 0, sel = 0;
  var lockUntil = 0, px = -99, py = -99, ax = -99, ay = -99;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var idx = function (b) { return Array.prototype.indexOf.call(root.querySelectorAll('.arc-p'), b); };
  var ease = function (x) { return 1 - Math.pow(1 - x, 3); };
  function go(i) {
    if (i < 0 || i === sel) return;
    sel = i; if (onPick) onPick(i);
    var want = T / 2 - i * s, d = ((want - phase) % T + T) % T;
    if (d > T / 2) d -= T;
    var now = performance.now();
    from = phase; to = phase + d; t0 = now;
    dur = still ? 1 : Math.min(620, 340 + 90 * Math.abs(d) / s);
    lockUntil = now + dur * 0.85;
    ax = px; ay = py;
  }
  function onMove(e) {
    px = e.clientX; py = e.clientY;
    if (performance.now() < lockUntil) return;
    if (Math.abs(px - ax) + Math.abs(py - ay) < 4) return;
    var b = e.target.closest ? e.target.closest('.arc-p') : null;
    if (b && root.contains(b)) go(idx(b));
  }
  function onClick(e) { var b = e.target.closest ? e.target.closest('.arc-p') : null; if (b && root.contains(b)) go(idx(b)); }
  function onFocus(e) { var b = e.target.closest ? e.target.closest('.arc-p') : null; if (b && root.contains(b)) go(idx(b)); }
  root.addEventListener('mousemove', onMove);
  root.addEventListener('click', onClick);
  root.addEventListener('focusin', onFocus);
  function place() {
    if (window.innerWidth <= 1000) return;
    var els = root.querySelectorAll('.arc-p');
    for (var i = 0; i < els.length; i++) {
      var u = ((i * s + phase) % T + T) % T - T / 2;
      var a = (90 - u * 84) * Math.PI / 180;
      var el = els[i];
      el.style.left = (50 + 45 * Math.cos(a)).toFixed(2) + '%';
      el.style.top = (Y0 - RY * Math.sin(a)).toFixed(1) + 'px';
      el.style.setProperty('--r', (u * 34).toFixed(2) + 'deg');
      var op = Math.max(0, Math.min(1, (T / 2 - Math.abs(u)) / 0.14));
      el.style.opacity = op.toFixed(2);
      el.style.pointerEvents = op < 0.4 ? 'none' : '';
    }
  }
  function tick(now) {
    var k = Math.min(1, (now - t0) / dur);
    phase = from + (to - from) * ease(k);
    place();
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  return function () {
    cancelAnimationFrame(raf);
    root.removeEventListener('mousemove', onMove);
    root.removeEventListener('click', onClick);
    root.removeEventListener('focusin', onFocus);
  };
}
