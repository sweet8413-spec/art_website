// UI 시안용 목업 데이터입니다. 실제 데이터 연동은 기능 개발 단계에서 교체합니다.
import type {
  CalendarDate,
  CalendarEvent,
  CardSection,
  HeroArtwork,
  PickExhibition,
  QuizItem,
} from '../types'

export const TODAY_LABEL = '2026. 11. 20'

export const heroArtworks: HeroArtwork[] = [
  {
    title: '진주 귀고리를 한 소녀',
    artist: '요하네스 페르메이르',
    year: '1665년경',
    img: 'images/vermeer_girl-with-a-pearl-earring.jpg',
    pos: 'center',
    points: [
      { x: 47, y: 60, title: '진주 귀고리', text: '윤곽선 없이 흰 물감 몇 번으로 반짝임만 찍었어요. 가까이 보면 진주가 거의 그려져 있지 않아요.' },
      { x: 39, y: 18, title: '파란 터번', text: '청금석이라는 보석을 갈아 만든 아주 비싼 파란 물감(울트라마린)을 썼어요.' },
    ],
    ex: { name: '빛의 화가 페르메이르와 네덜란드 황금시대', venue: '국립중앙박물관', period: '2026.9.25 – 2027.1.17', status: '진행중' },
  },
  {
    title: '포스터 속 겨울 파리',
    artist: '미셸 들라크루아',
    year: '전시 대표 이미지',
    img: 'images/delacroix_work.jpg',
    pos: 'center',
    points: [
      { x: 52, y: 40, title: '광장의 크리스마스트리', text: '들라크루아가 그리는 파리는 늘 축제를 준비하는 것처럼 따뜻해요.' },
      { x: 40, y: 80, title: '트리를 꾸미는 사람들', text: '아주 작게 그린 사람 하나하나에 저마다의 이야기가 있어요. 가까이 다가가 찾아보세요.' },
    ],
    ex: { name: '사랑을 담아, 미셸 들라크루아 드림', venue: '롯데뮤지엄', period: '2026.12.4 – 2027.3.7', status: '12.4 오픈 · D-14' },
  },
  {
    title: '까치',
    artist: '클로드 모네',
    year: '1868–1869',
    img: 'images/monet_the-magpie.jpg',
    pos: '25% center',
    points: [
      { x: 15, y: 45, title: '울타리 위의 까치', text: '온통 하얀 풍경 속에서 유일하게 까만 점. 그림의 제목이자 주인공이에요.' },
      { x: 40, y: 80, title: '파란 그림자', text: '모네는 눈 위 그림자를 회색이 아니라 파란색으로 칠했어요. 당시엔 낯설었지만 실제 빛을 더 닮았죠.' },
    ],
    ex: { name: 'MONET 100: 시대를 읽는 감각의 계보', venue: '신세계본점 더 헤리티지', period: '2026.12.5 – 2027.2.28', status: '12.5 오픈 · D-15' },
  },
  {
    title: '별이 빛나는 밤',
    artist: '빈센트 반 고흐',
    year: '1889',
    img: 'images/van-gogh_starry-night.jpg',
    pos: '15% center',
    points: [
      { x: 63, y: 30, title: '소용돌이치는 하늘', text: '붓질 방향을 눈으로 따라가 보세요. 하늘 전체가 움직이는 것처럼 보여요.' },
      { x: 15, y: 50, title: '불꽃처럼 솟은 나무', text: '사이프러스 나무가 땅과 하늘을 잇는 것처럼 높이 솟아 있어요.' },
    ],
    ex: { name: '반 고흐: 별과 사이프러스', venue: '서울시립미술관 서소문본관', period: '2026.11.1 – 2027.3.1', status: '진행중' },
  },
  {
    title: '성녀 카실다',
    artist: '프란시스코 데 수르바란',
    year: '1635년경',
    img: 'images/posters/zurbaran.jpg',
    pos: '35% center',
    points: [
      { x: 53, y: 82, title: '치마폭의 장미', text: '몰래 나르던 빵이 들키는 순간 장미로 변했다는 전설을 그렸어요.' },
      { x: 36, y: 56, title: '반짝이는 옷감', text: '수르바란은 비단의 주름과 광택을 손에 잡힐 듯 그리는 화가로 유명해요.' },
    ],
    ex: { name: '수르바란 (Zurbarán)', venue: '루브르 박물관 · 파리', period: '2026.10.7 – 2027.1.25', status: '진행중' },
  },
]

export const picks: PickExhibition[] = [
  { title: '현대카드 컬처프로젝트 31 웨인 티보 전', venue: 'DDP 뮤지엄', period: '2026.9.19 – 2027.2.21', img: 'images/posters/thiebaud.gif', imgAlt: '웨인 티보 전 포스터' },
  { title: '피카소에서 키키 스미스까지: 모더니티의 초상', venue: '대구미술관', period: '2026.11.17 – 2027.3.14', img: 'images/posters/picasso_kiki.gif', imgAlt: '피카소에서 키키 스미스까지 포스터' },
  { title: '스페인 미술 500년: 빛과 어둠의 연대기', venue: '예술의전당 한가람디자인미술관', period: '2026.9.22 – 2027.1.20', img: 'images/posters/spain.gif', imgAlt: '스페인 미술 500년 포스터' },
  { title: '브래드 월스 사진전', venue: '그라운드시소 용산', period: '2026.9.11 – 2027.3.1', img: 'images/posters/walls.gif', imgAlt: '브래드 월스 사진전 포스터' },
]

export const quizItems: QuizItem[] = [
  {
    title: '모나리자', artist: '레오나르도 다 빈치, 1503–1519년경', img: 'images/da-vinci_mona-lisa.jpg', focus: 'center 18%',
    question: '모나리자를 세계 최고로 만든 건 도둑이었다?',
    answer: '1911년 루브르에서 도난당했다가 2년 만에 되찾은 사건이 전 세계 신문에 실리면서, 모나리자는 가장 유명한 그림이 되었어요.',
    ex: '레오나르도 다 빈치: 르네상스의 미소', venue: '예술의전당 한가람미술관', dday: 'D-100',
  },
  {
    title: '키스', artist: '구스타프 클림트, 1907–1908', img: 'images/klimt_the-kiss.jpg', focus: 'center 22%',
    question: '이 그림에는 진짜 금이 들어 있다?',
    answer: '맞아요. 금세공사였던 아버지에게 배운 솜씨로, 클림트는 물감 위에 진짜 금박을 붙였어요. 그래서 조명에 따라 그림이 반짝여요.',
    ex: '클림트, 황금의 시대', venue: '국립현대미술관 덕수궁관', dday: 'D-86',
  },
  {
    title: '이삭 줍기', artist: '장 프랑수아 밀레, 1857', img: 'images/millet_the-gleaners.jpg', focus: '36% center',
    question: '평화로운 시골 풍경, 사실은 불편한 그림이었다?',
    answer: '추수가 끝난 밭에서 떨어진 이삭을 줍는 건 가장 가난한 사람들의 일이었어요. 처음 공개됐을 때 가난을 대놓고 그렸다는 이유로 비판을 받았어요.',
    ex: '밀레와 바르비종의 하늘', venue: '부산시립미술관', dday: 'D-72',
  },
  {
    title: '안개 바다 위의 방랑자', artist: '카스파르 다비트 프리드리히, 1818년경', img: 'images/friedrich_wanderer.jpg', focus: 'center 24%',
    question: '이 남자는 왜 끝까지 뒤돌아 서 있을까?',
    answer: '화가가 일부러 얼굴을 감췄어요. 뒷모습만 보이니 우리가 그 사람 자리에 서서 같은 풍경을 바라보게 되죠. 이런 인물을 ‘뒤돌아선 인물’이라고 불러요.',
    ex: '낭만주의, 숭고한 풍경', venue: '대전시립미술관', dday: 'D-107',
  },
]

export const endingSoon: CardSection = {
  title: '곧 끝나요',
  desc: '종료가 가까운 순서',
  items: [
    { title: '상서, 컬렉션을 읽다', meta: '간송미술관 · ~ 2026.12.6', img: 'images/posters/sangseo.gif', imgAlt: '전시 포스터', tint: '#EDE6DA', badge: { label: 'D-16', tone: 'red' }, end: { year: 2026, month: 12, day: 6 }, reason: '간송 컬렉션 속 길한 상징을 한자리에서 보는 드문 기회예요.' },
    { title: '헤일리 티프먼, 일상을 그리다', meta: '포디움다이브 광안(부산) · ~ 2026.12.20', img: 'images/posters/tiffman.gif', imgAlt: '전시 포스터', tint: '#ECE3E6', badge: { label: 'D-30', tone: 'red' }, end: { year: 2026, month: 12, day: 20 }, reason: '친구들과의 평범한 순간을 선명한 색으로 그린 원화를 부산에서 직접 볼 수 있어요.' },
    { title: '대구간송미술관 특별전 겸재 정선', meta: '대구간송미술관 · ~ 2026.12.27', img: 'images/posters/gyeomjae.gif', imgAlt: '전시 포스터', tint: '#EDE6DA', badge: { label: 'D-37', tone: 'red' }, end: { year: 2026, month: 12, day: 27 }, reason: '교과서에서 보던 진경산수화를 원화의 붓 자국까지 가까이서 볼 수 있어요.' },
    { title: '현대회화 하이라이트: 시대의 초상', meta: '글로벌세아 아트스페이스 · ~ 2027.1.9', img: 'images/posters/portrait.gif', imgAlt: '전시 포스터', tint: '#E6E6E1', badge: { label: 'D-50', tone: 'red' }, end: { year: 2027, month: 1, day: 9 }, reason: '한 전시에서 현대회화가 사람을 그려 온 방식의 변화를 한 번에 훑어볼 수 있어요.' },
  ],
}

export const openingSoon: CardSection = {
  title: '곧 열려요',
  desc: '오픈 전에 미리 예매해 두세요',
  items: [
    { title: '조르조 모란디 (GIORGIO MORANDI)', meta: '더현대 서울 ALT.1 · 2026.11.21 – 2027.3.1', img: 'images/posters/morandi.gif', imgAlt: '전시 포스터', tint: '#E6E6E1', badge: { label: 'D-1 오픈', tone: 'dark' } },
    { title: '사랑을 담아, 미셸 들라크루아 드림', meta: '롯데뮤지엄 · 2026.12.4 – 2027.3.7', img: 'images/posters/delacroix.gif', imgAlt: '전시 포스터', tint: '#ECE3E6', badge: { label: 'D-14 오픈', tone: 'dark' } },
    { title: 'MONET 100: 시대를 읽는 감각의 계보', meta: '신세계본점 더 헤리티지 · 2026.12.5 – 2027.2.28', img: 'images/posters/monet.gif', imgAlt: '전시 포스터', tint: '#E2E7EA', badge: { label: 'D-15 오픈', tone: 'dark' } },
    { title: '미라, 봉인된 신비', meta: '예술의전당 서예박물관 · 2026.12.11 – 2027.4.11', img: 'images/posters/mummy.gif', imgAlt: '전시 포스터', tint: '#EDE6DA', badge: { label: 'D-21 오픈', tone: 'dark' } },
  ],
}

export const calendarEvents: CalendarEvent[] = [
  { month: 11, day: 6, kind: '오픈', title: '생명의 기원: 사라진 세계들', venue: '전쟁기념관 · 서울', desc: '공룡보다 먼저 지구에 살았던 생명들의 화석과 복원 모형을 시간 순서대로 따라가요.' },
  { month: 11, day: 13, kind: '오픈', title: '소피 칼: Is It Better?', venue: '함부르거 반호프 · 베를린', desc: '사진과 글로 개인의 기억을 기록해 온 작가의 대규모 회고전이에요.' },
  { month: 11, day: 17, kind: '오픈', title: '피카소에서 키키 스미스까지', venue: '대구미술관 · 대구', desc: '20세기 거장부터 동시대 작가까지, 판화로 보는 현대미술의 흐름이에요.' },
  { month: 11, day: 21, kind: '오픈', title: '조르조 모란디', venue: '더현대 서울 ALT.1 · 서울', desc: '평생 병과 그릇만 그린 화가. 고요한 정물 속 미묘한 색의 차이를 만나요.' },
  { month: 11, day: 21, kind: '오픈', title: 'artport: 인터넷 아트의 역사', venue: '휘트니 미술관 · 뉴욕', desc: '브라우저 안에서 태어난 예술 작품들을 처음부터 되짚어 보는 전시예요.' },
  { month: 11, day: 24, kind: '오픈', title: '낸 골딘: You Never Did Anything Wrong', venue: '헤이워드 갤러리 · 런던', desc: '가까운 사람들의 일상을 솔직하게 담아 온 사진가의 작업을 모았어요.' },
  { month: 11, day: 29, kind: '종료', title: '데이비드 호크니: BIGGER & CLOSER', venue: '라이트룸 울산 · 울산', desc: '호크니의 작업 세계를 거대한 화면과 소리로 둘러싸듯 감상하는 몰입형 전시예요.' },
  { month: 12, day: 4, kind: '오픈', title: '사랑을 담아, 미셸 들라크루아 드림', venue: '롯데뮤지엄 · 서울', desc: '1950년대 파리의 골목과 사람들을 따뜻한 색으로 그린 그림들이에요.' },
  { month: 12, day: 5, kind: '오픈', title: 'MONET 100: 시대를 읽는 감각의 계보', venue: '신세계본점 더 헤리티지 · 서울', desc: '모네와 그 뒤를 이은 화가들이 빛과 색을 어떻게 다뤘는지 따라가요.' },
  { month: 12, day: 6, kind: '종료', title: '상서, 컬렉션을 읽다', venue: '간송미술관 · 서울', desc: '간송 컬렉션 속 상서로운 상징을 담은 그림과 공예품을 소개해요.' },
  { month: 12, day: 11, kind: '오픈', title: '미라, 봉인된 신비', venue: '예술의전당 서예박물관 · 서울', desc: '고대 이집트 미라와 장례 문화를 통해 삶과 죽음에 대한 생각을 엿봐요.' },
  { month: 12, day: 20, kind: '종료', title: '헤일리 티프먼, 일상을 그리다', venue: '포디움다이브 광안 · 부산', desc: '친구들과 보내는 평범한 순간을 선명한 색으로 그린 그림들이에요.' },
  { month: 12, day: 27, kind: '종료', title: '대구간송미술관 특별전 겸재 정선', venue: '대구간송미술관 · 대구', desc: '우리 산천을 직접 보고 그린 진경산수화의 대가, 겸재 정선을 만나요.' },
]

/** 시안 기준 '오늘' */
export const CALENDAR_TODAY: CalendarDate = { year: 2026, month: 11, day: 20 }
