// 스크롤하면 섹션 제목과 카드들이 아래에서 위로 부드럽게 나타나게 하는 스크립트.
// @ts-nocheck
export function enableReveal() {

  if (window.__artsideReveal) return; window.__artsideReveal = true;
  var css = document.createElement('style');
  css.textContent = '@keyframes rvIn{from{opacity:0;translate:0 28px}to{opacity:1;translate:0 0}}' +
    '[data-reveal]:not([data-revealed]){opacity:0}' +
    '[data-revealed]{animation:rvIn .9s cubic-bezier(.2,.7,.2,1) both}' +
    '[data-rv-d="1"]{animation-delay:.08s}[data-rv-d="2"]{animation-delay:.16s}[data-rv-d="3"]{animation-delay:.24s}[data-rv-d="4"]{animation-delay:.32s}[data-rv-d="5"]{animation-delay:.4s}' +
    '@media (prefers-reduced-motion: reduce){[data-reveal]:not([data-revealed]){opacity:1}[data-revealed]{animation:none}}';
  document.head.appendChild(css);
  var SKIP = 'header, nav, footer, [role="tablist"], [role="group"], section[aria-labelledby="w-today"], section.hero, [data-dark-hero], [data-no-reveal]';
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, sibs = [], i, p = el.parentElement;
      if (p) for (i = 0; i < p.children.length; i++) if (p.children[i].hasAttribute('data-reveal') && !p.children[i].hasAttribute('data-revealed')) sibs.push(p.children[i]);
      el.setAttribute('data-rv-d', String(Math.max(0, Math.min(5, sibs.indexOf(el)))));
      el.setAttribute('data-revealed', '');
      io.unobserve(el);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }) : null;
  function qualifies(el) {
    if (el.parentElement && el.parentElement.closest('[data-reveal]')) return false;
    if (el.closest(SKIP)) return false;
    if (el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return false;
    for (var k = 0; k < el.children.length; k++) if (el.children[k].tagName === 'H2') return true;
    var p = el.parentElement; if (!p) return false;
    var cs = getComputedStyle(p);
    var item = cs.display === 'grid' || (cs.display === 'flex' && cs.flexWrap === 'wrap' && cs.flexDirection === 'row');
    if (!item) return false;
    var r = el.getBoundingClientRect();
    return r.height >= 60 && r.width >= 120;
  }
  var pending = false;
  function scan() {
    pending = false;
    var root = document.querySelector('main') || document.body;
    var all = root.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (el.hasAttribute('data-reveal')) continue;
      if (!qualifies(el)) continue;
      el.setAttribute('data-reveal', '');
      if (io) io.observe(el); else el.setAttribute('data-revealed', '');
    }
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(scan); } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule); else schedule();
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  setTimeout(schedule, 600);

}
