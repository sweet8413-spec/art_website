-- 전시 목록 테이블
-- 상태(진행 중/오픈 예정), D-day, 진행률 같은 값은 날짜에 따라 바뀌므로 저장하지 않고
-- 앱에서 start_date / end_date 로 계산합니다.
create table public.exhibitions (
  id          text primary key,                 -- URL 등에 쓰는 짧은 영문 id (예: monet100)
  title       text not null,
  artist      text,                             -- 검색용 작가명 (단체전 등은 비워 둠)
  venue       text not null,
  city        text not null,
  region      text not null check (region in ('국내', '해외')),
  img         text not null,                    -- public/images 기준 경로 (예: posters/monet.gif)
  img_pos     text not null default 'center',   -- CSS object-position
  start_date  date,                             -- 시작일을 모르면 null (예: "~ 2026.12.6")
  end_date    date not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now(),
  check (start_date is null or start_date <= end_date)
);

comment on table public.exhibitions is '아트사이드 전시 목록. 누구나 읽기만 가능, 수정은 대시보드(관리자)에서만.';

-- 보안: 로그인 없이 누구나 읽을 수 있고, 쓰기 정책은 두지 않아 웹에서는 수정 불가
alter table public.exhibitions enable row level security;

create policy "누구나 전시 조회 가능"
  on public.exhibitions for select
  to anon, authenticated
  using (true);

create index exhibitions_end_date_idx on public.exhibitions (end_date);
