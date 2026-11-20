// 마우스 휠 스크롤을 부드럽게(관성) 만들어 주는 스크립트. 안쪽 스크롤 영역과 가로 스크롤 목록은 건드리지 않아요.
// @ts-nocheck
export function enableSmoothScroll() {
  if (window.__artsideSmooth) return; window.__artsideSmooth = true;
  window.__artsideScrollTop = function () { window.scrollTo({ top: 0, behavior: 'instant' }); };
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var target = window.scrollY, cur = window.scrollY, raf = 0;
  function max() { return document.documentElement.scrollHeight - window.innerHeight; }
  function innerScroller(el) {
    while (el && el !== document.body && el !== document.documentElement) {
      var cs = getComputedStyle(el);
      if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) return el;
      el = el.parentElement;
    }
    return null;
  }
  function step() {
    cur += (target - cur) * 0.12;
    if (Math.abs(target - cur) < 0.5) { cur = target; window.scrollTo({ top: cur, behavior: 'instant' }); raf = 0; return; }
    window.scrollTo({ top: cur, behavior: 'instant' });
    raf = requestAnimationFrame(step);
  }
  window.addEventListener('wheel', function (e) {
    if (e.defaultPrevented || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (innerScroller(e.target)) return;
    e.preventDefault();
    if (!raf) { target = cur = window.scrollY; }
    target = Math.max(0, Math.min(max(), target + e.deltaY * (e.deltaMode === 1 ? 40 : 1)));
    if (!raf) raf = requestAnimationFrame(step);
  }, { passive: false });
  window.addEventListener('scroll', function () { if (!raf) { target = cur = window.scrollY; } }, { passive: true });
  // 페이지(화면)를 옮길 때는 남아 있던 관성 스크롤을 멈추고 맨 위에서 시작해요.
  window.__artsideScrollTop = function () { if (raf) cancelAnimationFrame(raf); raf = 0; target = cur = 0; window.scrollTo({ top: 0, behavior: 'instant' }); };
  window.addEventListener('hashchange', function () { if (/^#\//.test(location.hash)) window.__artsideScrollTop(); });
}
