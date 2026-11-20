// 빛의 연작 슬라이더: 막대 위치에 따라 루앙 대성당 그림 4점을 겹쳐 섞고, 시각·설명·팔레트·배경색을 바꿔요.
// @ts-nocheck
export function artsideLight(root) {
  if (!root) return function () {};
  var S = [
    { m: 360, n: '새벽 안개', bg: [237, 240, 243], pal: ['#DDE3E8', '#B9C6D3', '#93A6BB', '#C9C4BE'], d: '형태가 거의 녹아 없어지고 회청색 공기만 남았어요. 단단한 돌 성당이 얇은 안개 한 겹처럼 보여요.' },
    { m: 540, n: '아침 햇살', bg: [236, 240, 242], pal: ['#ECEEEF', '#C3CED7', '#6E86A3', '#A9A28E'], d: '차가운 흰빛이 정면을 씻어 내려요. 해가 닿은 면은 흰색과 은색으로, 그늘진 문은 푸른색으로 갈라져요.' },
    { m: 780, n: '한낮의 빛', bg: [246, 239, 224], pal: ['#F1E3B6', '#D9B66E', '#8FA3BC', '#9C7A4E'], d: '해가 정면을 비추면 돌이 금빛으로 달아올라요. 그림자조차 검정이 아니라 파랑과 보라로 칠해 빛의 온도를 보여 줘요.' },
    { m: 1080, n: '해질녘', bg: [248, 233, 220], pal: ['#F2C77E', '#E58E57', '#C86A4E', '#5D73A0'], d: '낮게 깔린 햇빛에 성당 전체가 주황과 분홍으로 타올라요. 아래쪽 문은 벌써 푸른 저녁에 잠겼어요.' }
  ];
  var box = root.querySelector('.lt'), imgs = root.querySelectorAll('.lt-stage img'), rg = root.querySelector('.lt-ctrl input');
  var chip = root.querySelector('.lt-chip'), clock = root.querySelector('.lt-clock'), name = root.querySelector('.lt-name'), desc = root.querySelector('.lt-desc');
  var pals = root.querySelectorAll('.lt-pal i'), stops = root.querySelectorAll('.lt-stops button'), play = root.querySelector('.lt-play');
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var v = 0, cur = -1, raf = 0, io = null, played = false;
  var two = function (x) { return (x < 10 ? '0' : '') + x; };
  function set(x) {
    v = Math.max(0, Math.min(3, x));
    var i = Math.min(2, Math.floor(v)), f = v - i;
    for (var k = 0; k < imgs.length; k++) imgs[k].style.opacity = k <= i ? 1 : (k === i + 1 ? f : 0);
    var a = S[i].bg, b = S[i + 1].bg;
    box.style.background = 'rgb(' + [0, 1, 2].map(function (j) { return Math.round(a[j] + (b[j] - a[j]) * f); }).join(',') + ')';
    var mm = Math.round(S[i].m + (S[i + 1].m - S[i].m) * f), t = two(Math.floor(mm / 60)) + ':' + two(mm % 60);
    chip.textContent = t; clock.textContent = t;
    rg.value = Math.round(v * 100);
    var n = Math.round(v);
    if (n !== cur) {
      cur = n; name.textContent = S[n].n; desc.textContent = S[n].d;
      desc.style.animation = 'none'; void desc.offsetWidth; desc.style.animation = '';
      for (var p = 0; p < pals.length; p++) pals[p].style.background = S[n].pal[p];
      for (var q = 0; q < stops.length; q++) { stops[q].classList.toggle('on', q === n); stops[q].setAttribute('aria-pressed', q === n); }
    }
  }
  function tween(to, ms, done) {
    cancelAnimationFrame(raf);
    if (still) { set(to); if (done) done(); return; }
    var from = v, t0 = performance.now();
    function step(now) {
      var k = Math.min(1, (now - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      set(from + (to - from) * e);
      if (k < 1) raf = requestAnimationFrame(step); else if (done) done();
    }
    raf = requestAnimationFrame(step);
  }
  function day() { set(0); play.textContent = '하루 흘러가는 중…'; tween(3, 4200, function () { play.textContent = '▶ 하루 다시 보기'; }); }
  function onInput() { cancelAnimationFrame(raf); set(rg.value / 100); }
  function onChange() { tween(Math.round(v), 280); }
  rg.addEventListener('input', onInput);
  rg.addEventListener('change', onChange);
  var onStop = [];
  for (var s = 0; s < stops.length; s++) (function (k) { onStop[k] = function () { tween(k, 600); }; stops[k].addEventListener('click', onStop[k]); })(s);
  play.addEventListener('click', day);
  set(0);
  if ('IntersectionObserver' in window && !still) {
    io = new IntersectionObserver(function (es) { if (es[0].isIntersecting && !played) { played = true; io.disconnect(); setTimeout(day, 300); } }, { threshold: 0.45 });
    io.observe(box);
  }
  return function () {
    cancelAnimationFrame(raf); if (io) io.disconnect();
    rg.removeEventListener('input', onInput); rg.removeEventListener('change', onChange);
    for (var k = 0; k < stops.length; k++) stops[k].removeEventListener('click', onStop[k]);
    play.removeEventListener('click', day);
  };
}
