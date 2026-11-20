// 모네와 대화: AI 연결 전 시안용 가상 채팅. 질문(직접 입력 또는 추천 질문)을 키워드로 찾아 미리 준비한 답을 타이핑하듯 보여줘요.
// 실제 AI를 붙일 때는 ask() 안의 match()/답변 부분을 API 호출로 바꾸면 돼요.
// @ts-nocheck
export function artsideChat(root) {
  if (!root) return function () {};
  var box = root.querySelector('.mc'), AV = box.getAttribute('data-av');
  var log = root.querySelector('.mc-log'), chips = root.querySelector('.mc-chips'), form = root.querySelector('.mc-form');
  var input = form.querySelector('input'), send = form.querySelector('.mc-send'), reset = root.querySelector('.mc-reset');
  var K = [
    { id: 'series', q: '왜 같은 걸 계속 그렸어요?', k: ['같은', '반복', '연작', '계속', '시리즈', '성당', '건초', '여러번'], a: '같은 걸 그린 적은 한 번도 없어요. 대성당도 건초더미도 핑계일 뿐, 내가 그린 건 그 앞을 지나가는 빛이었죠.\n빛은 몇 분만 지나도 달라져요. 그래서 루앙에서는 캔버스를 여러 개 늘어놓고, 해가 움직일 때마다 옮겨 가며 그렸어요. 바로 위 \'빛의 연작\'에서 시간을 직접 흘려 보면 무슨 말인지 알 거예요.', n: ['eyes', 'color', 'lilies'] },
    { id: 'name', q: '\'인상주의\'라는 이름은 어떻게 생겼어요?', k: ['인상주의', '인상파', '이름', '해돋이', '비평', '유래'], a: '1874년, 친구들과 직접 전시회를 열었어요. 거기에 르아브르 항구의 아침을 그린 그림을 걸고 「인상, 해돋이」라는 제목을 붙였죠.\n그걸 본 비평가 루이 르루아가 우리를 \'인상주의자들\'이라고 비꼬는 글을 썼어요. 놀림으로 붙은 이름이 결국 우리 모두의 이름이 됐으니, 세상일은 모르는 거예요.', n: ['poor', 'friends', 'tips'] },
    { id: 'eyes', q: '눈이 나빠졌을 때는 어땠어요?', k: ['눈', '백내장', '시력', '수술', '늙', '나이들'], a: '일흔이 넘어 백내장이 심해지면서 색이 흐릿하고 누렇게 보이기 시작했어요. 물감 튜브에 붙은 이름을 보고 색을 골라야 할 때도 있었죠.\n1923년에 수술을 받고 나서는 한동안 세상이 너무 푸르게 보여 애를 먹었어요. 그래도 붓을 놓은 적은 없어요.', n: ['lilies', 'favorite', 'friends'] },
    { id: 'lilies', q: '수련은 왜 그렇게 많이 그렸어요?', k: ['수련', '연못', '정원', '지베르니', '다리', '꽃'], a: '1883년에 지베르니로 이사했고, 몇 년 뒤 땅을 더 사서 연못을 파고 수련을 심었어요. 처음엔 그저 눈이 즐거우려고 만든 정원이었는데, 어느 날 그 연못이 그림이 되어 버렸죠.\n수면에 비친 하늘과 구름, 그 사이에 뜬 수련까지… 그렇게 수련만 250점 가까이 그렸어요. 어쩌면 내가 화가가 된 건 꽃 덕분인지도 몰라요.', n: ['japan', 'favorite', 'eyes'] },
    { id: 'favorite', q: '가장 아끼는 작품은 뭐예요?', k: ['아끼', '좋아하', '최고', '대표작', '가장', '애착'], a: '하나만 고르라니, 너무 잔인한 질문이네요.\n다만 지베르니의 정원은 내 마지막 30년을 다 바친 곳이에요. 내가 만든 정원이 내가 그린 가장 큰 그림이었는지도 몰라요.', n: ['lilies', 'camille', 'visit'] },
    { id: 'tips', q: '그림 잘 그리는 비결이 있나요?', k: ['비결', '잘그리', '방법', '팁', '조언', '배우', '연습'], a: '그리러 나갈 땐 눈앞에 있는 게 나무인지 집인지 잊어버려요. 여기는 파란 네모, 저기는 분홍 길쭉한 조각… 눈에 보이는 색과 모양 그대로 칠하는 거예요.\n그리고 꼭 밖에서, 진짜 빛 아래에서 그려 봐요. 나도 젊을 때 외젠 부댕 선생님께 그렇게 배웠어요.', n: ['color', 'who', 'series'] },
    { id: 'camille', q: '「양산을 든 여인」은 누구예요?', k: ['양산', '카미유', '아내', '부인', '가족', '사랑', '아들'], a: '그 그림 속 사람은 아내 카미유와 아들 장이에요. 바람 부는 언덕에서 올려다보며 단숨에 그렸죠.\n카미유는 가난하던 젊은 시절부터 내 곁을 지킨 모델이자 동반자였어요. 1879년에 너무 일찍 떠났지만, 그 그림을 보면 지금도 그날의 바람이 느껴져요.', n: ['poor', 'favorite', 'tips'] },
    { id: 'poor', q: '젊을 때 힘들지 않았어요?', k: ['가난', '돈', '힘들', '고생', '실패', '거절', '낙선', '살롱'], a: '많이 힘들었죠. 살롱전에서는 번번이 떨어졌고, 그림이 팔리지 않아 친구들에게 돈을 빌려 달라는 편지를 수없이 썼어요.\n그래도 그림을 바꾸진 않았어요. 사람들이 \'미완성 같다\'고 할수록, 나는 빛을 더 빨리 붙잡는 붓질에 매달렸어요.', n: ['name', 'friends', 'camille'] },
    { id: 'color', q: '그림자는 무슨 색으로 칠했어요?', k: ['검정', '검은', '그림자', '색', '물감', '팔레트', '붓터치', '붓질'], a: '그림자는 검은색이 아니에요. 잘 보면 파랑이나 보라, 초록이 섞여 있죠. 그래서 나는 그림자도 색으로 칠하려고 했어요.\n물감도 팔레트에서 다 섞지 않고 캔버스 위에 나란히 올렸어요. 그러면 보는 사람의 눈 속에서 색이 섞이며 더 반짝이거든요.', n: ['series', 'tips', 'japan'] },
    { id: 'friends', q: '친한 화가 친구가 있었나요?', k: ['친구', '르누아르', '마네', '동료', '클레망소', '피사로'], a: '르누아르와는 라 그르누예르 강가에 나란히 앉아 같은 풍경을 그리곤 했어요. 마네는 어려울 때 여러 번 나를 도와준 고마운 선배였고요.\n늙어서는 클레망소가 가장 가까운 친구였어요. 그가 곁에서 떠밀어 주지 않았다면, 수련 대작들을 나라에 기증하겠다는 약속을 끝내 지키지 못했을지도 몰라요.', n: ['name', 'lilies', 'japan'] },
    { id: 'japan', q: '일본 판화를 좋아했다면서요?', k: ['일본', '판화', '호쿠사이', '우키요에', '히로시게', '동양'], a: '지베르니 집 벽마다 일본 판화가 가득 걸려 있었어요. 호쿠사이와 히로시게를 특히 좋아했죠.\n과감하게 잘린 구도, 평평한 색면, 물과 다리를 다루는 방식에서 많이 배웠어요. 연못 위에 놓은 둥근 초록 다리도 거기서 온 거예요.', n: ['lilies', 'color', 'visit'] },
    { id: 'who', q: '어떻게 화가가 됐어요?', k: ['태어', '몇살', '누구', '출신', '어릴', '어린', '화가가', '고향', '자기소개', '소개'], a: '1840년 파리에서 태어나 바닷가 도시 르아브르에서 자랐어요. 어릴 땐 동네 사람들 캐리커처를 그려 팔아 용돈을 벌었죠.\n그러다 풍경화가 외젠 부댕을 만나 밖에서 그리는 법을 배우면서 인생이 바뀌었어요. 그리고 1926년 지베르니에서 눈을 감을 때까지 86년 동안 그렸어요.', n: ['tips', 'poor', 'name'] },
    { id: 'visit', q: '이번 전시, 어떻게 보면 좋을까요?', k: ['전시', '관람', '추천', '어디부터', '봐야', '순서', '팁', '미디어'], a: '먼저 「인상, 해돋이」 앞에 서 봐요. 모든 게 거기서 시작됐으니까요. 그다음엔 같은 풍경이 시간 따라 변하는 연작들을, 마지막엔 수련 앞에서 천천히 걸음을 늦춰요.\n서두르지 말고, 빛이 바뀌는 걸 기다려 준다면 그걸로 충분해요.', n: ['series', 'lilies', 'favorite'] },
    { id: 'hi', q: '', k: ['안녕', '하이', '반가', 'hello', 'hi', '봉주르', '처음'], a: '봉주르! 만나서 반가워요. 내 그림이나 삶에서 궁금한 게 있나요? 아니면 지베르니 정원 이야기부터 해 줄까요?', n: ['lilies', 'who', 'series'] },
    { id: 'thanks', q: '', k: ['고마', '감사', '땡큐', 'thank', '메르시', '잘가', '안녕히'], a: '천만에요. 전시장에서 내 그림 앞에 서면, 잠깐 눈을 가늘게 뜨고 빛만 바라봐 줘요. 내가 바라는 건 그게 전부예요.', n: ['visit', 'favorite', 'tips'] }
  ];
  var START = ['series', 'name', 'eyes', 'lilies', 'favorite', 'tips'];
  var FALL = ['흠, 그건 내가 답하기 어려운 질문이네요. 나는 붓을 든 사람이라서요. 대신 이런 이야기는 어때요?', '미안해요, 그 이야기는 잘 모르겠어요. 내 그림이나 지베르니 정원에 대해서라면 밤새도록 얘기할 수 있는데!', '좋은 질문이지만, 그건 내 시대엔 없던 이야기 같아요. 내 그림 얘기를 해 볼까요?'];
  var asked = {}, busy = false, timers = [], fi = 0;
  var byId = function (id) { for (var i = 0; i < K.length; i++) if (K[i].id === id) return K[i]; };
  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }
  function scroll() { log.scrollTop = log.scrollHeight; }
  function bubble(me) {
    var m = document.createElement('div'); m.className = 'mc-msg' + (me ? ' me' : '');
    if (!me) { var im = document.createElement('img'); im.className = 'mc-av'; im.src = AV; im.alt = ''; m.appendChild(im); }
    var b = document.createElement('div'); b.className = 'mc-b'; m.appendChild(b); log.appendChild(m); return b;
  }
  function setChips(ids) {
    chips.innerHTML = '';
    ids.forEach(function (id) { var t = byId(id); if (!t || !t.q) return; var c = document.createElement('button'); c.type = 'button'; c.textContent = t.q; c.disabled = busy; c.addEventListener('click', function () { ask(t.q, t); }); chips.appendChild(c); });
  }
  function nextFor(t) {
    var pool = (t ? t.n : []).filter(function (id) { return !asked[id]; });
    START.concat(K.map(function (x) { return x.id; })).forEach(function (id) { if (pool.length < 3 && !asked[id] && pool.indexOf(id) < 0 && byId(id).q) pool.push(id); });
    return pool.slice(0, 3);
  }
  function lock(v) { busy = v; send.disabled = v || !input.value.trim(); chips.querySelectorAll('button').forEach(function (b) { b.disabled = v; }); }
  function reply(text, after) {
    var b = bubble(false); b.innerHTML = '<span class="mc-dots" aria-label="모네가 입력 중"><i></i><i></i><i></i></span>'; scroll();
    later(function () {
      b.textContent = ''; var i = 0;
      (function step() {
        i = Math.min(text.length, i + 2); b.textContent = text.slice(0, i); scroll();
        if (i < text.length) later(step, 18); else if (after) after();
      })();
    }, 650 + Math.random() * 350);
  }
  function match(s) {
    var t = s.replace(/\s+/g, '').toLowerCase(), best = null, sc = 0;
    K.forEach(function (x) { var n = 0; x.k.forEach(function (k) { if (t.indexOf(k) >= 0) n++; }); if (n > sc) { sc = n; best = x; } });
    return best;
  }
  function ask(q, t) {
    if (busy || !q.trim()) return;
    lock(true); chips.innerHTML = '';
    bubble(true).textContent = q; scroll();
    t = t || match(q);
    if (t) asked[t.id] = true;
    var text = t ? t.a : FALL[fi++ % FALL.length];
    reply(text, function () { lock(false); setChips(nextFor(t)); });
  }
  function start() {
    timers.forEach(clearTimeout); timers = []; asked = {}; log.innerHTML = ''; chips.innerHTML = ''; lock(true);
    reply('봉주르! 나는 클로드 모네예요. 방금 지베르니 정원에서 산책하고 돌아왔어요.\n내 그림이나 삶에 대해 무엇이든 물어봐요. 아래 질문을 눌러도 좋고, 직접 써 줘도 좋아요.', function () { lock(false); setChips(START); });
  }
  function onSubmit(e) { e.preventDefault(); var q = input.value.trim(); if (!q) return; input.value = ''; ask(q); }
  function onType() { send.disabled = busy || !input.value.trim(); }
  form.addEventListener('submit', onSubmit);
  input.addEventListener('input', onType);
  reset.addEventListener('click', start);
  var started = false, io = null;
  function go() { if (!started) { started = true; start(); } }
  if ('IntersectionObserver' in window) { io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); go(); } }, { threshold: 0.3 }); io.observe(box); } else go();
  input.addEventListener('focus', go);
  return function () {
    timers.forEach(clearTimeout); if (io) io.disconnect();
    form.removeEventListener('submit', onSubmit); input.removeEventListener('input', onType); reset.removeEventListener('click', start); input.removeEventListener('focus', go);
  };
}
