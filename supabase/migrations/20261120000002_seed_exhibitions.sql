-- 기존 시안 데이터(src/data/exhibitions.ts)를 옮겨 온 초기 데이터
insert into public.exhibitions (id, title, artist, venue, city, region, img, img_pos, start_date, end_date, sort_order) values
  ('thiebaud',  '현대카드 컬처프로젝트 31 웨인 티보 전',       '웨인 티보',             'DDP 뮤지엄',                    '서울',   '국내', 'posters/thiebaud.gif',     'center',     '2026-09-19', '2027-02-21', 0),
  ('picasso',   '피카소에서 키키 스미스까지: 모더니티의 초상', '파블로 피카소, 키키 스미스', '대구미술관',                 '대구',   '국내', 'posters/picasso_kiki.gif', 'center',     '2026-11-17', '2027-03-14', 1),
  ('spain',     '스페인 미술 500년: 빛과 어둠의 연대기',      null,                    '예술의전당 한가람디자인미술관', '서울',   '국내', 'posters/spain.gif',        'center',     '2026-09-22', '2027-01-20', 2),
  ('walls',     '브래드 월스 사진전',                          '브래드 월스',           '그라운드시소 용산',             '서울',   '국내', 'posters/walls.gif',        'center',     '2026-09-11', '2027-03-01', 3),
  ('sangseo',   '상서, 컬렉션을 읽다',                         null,                    '간송미술관',                    '서울',   '국내', 'posters/sangseo.gif',      'center',     null,         '2026-12-06', 4),
  ('gyeomjae',  '대구간송미술관 특별전 겸재 정선',             '겸재 정선',             '대구간송미술관',                '대구',   '국내', 'posters/gyeomjae.gif',     'center',     null,         '2026-12-27', 6),
  ('portrait',  '현대회화 하이라이트: 시대의 초상',            null,                    '글로벌세아 아트스페이스',       '서울',   '국내', 'posters/portrait.gif',     'center',     null,         '2027-01-09', 7),
  ('morandi',   '조르조 모란디 (GIORGIO MORANDI)',             '조르조 모란디',         '더현대 서울 ALT.1',             '서울',   '국내', 'posters/morandi.gif',      'center',     '2026-11-21', '2027-03-01', 8),
  ('delacroix', '사랑을 담아, 미셸 들라크루아 드림',           '미셸 들라크루아',       '롯데뮤지엄',                    '서울',   '국내', 'posters/delacroix.gif',    'center',     '2026-12-04', '2027-03-07', 9),
  ('monet100',  'MONET 100: 시대를 읽는 감각의 계보',          '클로드 모네',           '신세계백화점 본점 더 헤리티지', '서울',   '국내', 'posters/monet.gif',        'center',     '2026-12-05', '2027-02-28', 10),
  ('mummy',     '미라, 봉인된 신비',                           null,                    '예술의전당 서예박물관',         '서울',   '국내', 'posters/mummy.gif',        'center',     '2026-12-11', '2027-04-11', 11),
  ('zurbaran',  '수르바란 (Zurbarán)',                         '프란시스코 데 수르바란', '루브르 박물관',                '파리',   '해외', 'posters/zurbaran.jpg',     '28% center', '2026-10-07', '2027-01-25', 12),
  ('artport',   'artport: 인터넷 아트의 역사',                 null,                    '휘트니 미술관',                 '뉴욕',   '해외', 'posters/artport.jpg',      'center',     '2026-11-21', '2027-03-28', 14),
  ('calle',     '소피 칼: Is It Better?',                      '소피 칼',               '함부르거 반호프',               '베를린', '해외', 'posters/calle.jpg',        '62% center', '2026-11-13', '2027-04-04', 15);
