import { useState } from 'react'
import { exhibitionList as L, type ListExhibition } from '../data/exhibitions'
import Header from './Header'
import Footer from './Footer'

const img = (p: string) => `images/${p}`
const DETAIL = '#/exhibition/monet100'

const TABS: { key: string; label: string; test: (x: ListExhibition) => boolean }[] = [
  { key: 'all', label: '전체', test: () => true },
  { key: 'now', label: '진행 중', test: (x) => x.status === '진행 중' },
  { key: 'up', label: '오픈 예정', test: (x) => x.upcoming },
  { key: 'end', label: '곧 끝나요', test: (x) => x.endingSoon },
  { key: 'abroad', label: '해외', test: (x) => x.region === '해외' },
]

/** 카드 모양 6가지를 돌아가며 써서 매거진처럼 엇갈린(메이슨리) 목록을 만들어요 */
const VARIANTS = ['a', 'f', 'd', 'e', 'b', 'c'] as const
type Variant = (typeof VARIANTS)[number]
const variantOf = (x: ListExhibition, k: number): Variant => {
  if (x.id === 'monet100') return 'c'
  const v = VARIANTS[((k % VARIANTS.length) + VARIANTS.length) % VARIANTS.length]
  return v === 'e' && x.progress == null ? 'b' : v
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div><b>{value}</b><small>{label}</small></div>
}

function Card({ x, k }: { x: ListExhibition; k: number }) {
  const v = variantOf(x, k)
  const doc = x.id === 'monet100'
  const photo = <img src={img(x.img)} alt={`${x.title} 포스터`} style={{ objectPosition: x.pos }} />
  const chips = <div className="mc-chips"><span className="mc-chip">{x.city}</span><span className="mc-chip">{x.tag}</span></div>
  const badge = <span className={`mc-badge${x.endingSoon ? ' hot' : ''}`}>{x.badge}</span>

  if (v === 'a')
    return (
      <a className="mc mc-a" href={DETAIL}>
        {photo}{chips}{badge}
        <div className="mc-a-foot"><strong>{x.title}<small>{x.venue}</small></strong><span className="mc-round">↗</span></div>
      </a>
    )
  if (v === 'b')
    return (
      <a className="mc mc-b" href={DETAIL}>
        {photo}<span className="mc-b-top">{x.city} · {x.tag}</span>{badge}
        <div className="mc-b-body">
          <strong>{x.title}</strong>
          <p>{x.venue}<br />{x.period}</p>
          <div className="mc-b-row">
            <div className="mc-stats"><Stat value={x.ddLabel} label={x.ddSub} /><Stat value={x.city} label="도시" /></div>
            <span className="mc-pill light">전시 보기</span>
          </div>
        </div>
      </a>
    )
  if (v === 'c')
    return (
      <a className="mc mc-c" href={DETAIL}>
        <div className="mc-c-img">{photo}{chips}{badge}<div className="mc-dots"><span /><span /><span /><span /></div></div>
        <div className="mc-c-body">
          <div className="mc-c-head"><strong>{x.title}</strong><span className={`mc-outline${doc ? ' red' : ''}`}>{doc ? '도슨트 해설' : x.tag}</span></div>
          <span className="mc-c-meta">{x.period} · {x.city}</span>
          <span className="mc-c-desc">{doc ? '대표작 11점의 감상 포인트를 미리 보고 가세요. ' : ''}{x.venue}</span>
          <div className="mc-c-foot">
            <b>{x.ddLabel}<small>{x.ddSub}</small></b>
            <span className="mc-pill dark">{doc ? '전시 상세 보기' : '전시 보기'} <i>↗</i></span>
          </div>
        </div>
      </a>
    )
  if (v === 'd')
    return (
      <a className="mc mc-d" href={DETAIL}>
        {photo}
        <div className="mc-d-top"><strong>{x.title}<small>{x.venue}</small></strong><em>{x.period}</em></div>
        <div className="mc-d-foot">
          <div className="mc-stats"><Stat value={x.ddLabel} label={x.ddSub} /><Stat value={x.city} label="도시" /><Stat value={x.tag} label="상태" /></div>
          <span className="mc-pill light">자세히</span>
        </div>
      </a>
    )
  if (v === 'e')
    return (
      <a className="mc mc-e" href={DETAIL}>
        <div className="mc-e-img">{photo}{badge}</div>
        <div className="mc-e-body">
          <div className="mc-e-head">
            <strong>{x.title}<small>{x.venue}</small></strong>
            <div className="mc-prog"><span><i style={{ width: `${x.progress}%` }} /><em>{x.progress}%</em></span><small>기간 진행률</small></div>
          </div>
          <div className="mc-stats"><Stat value={x.ddLabel} label={x.ddSub} /><Stat value={x.city} label="도시" /><Stat value={x.tag} label="상태" /></div>
          <span className="mc-wide">전시 보기</span>
        </div>
      </a>
    )
  return (
    <a className="mc mc-f" href={DETAIL}>
      <span className="mc-f-k"><span />ARTSIDE PICK</span>
      <strong>{x.title}</strong>
      <p>{x.venue} · {x.period}</p>
      <div className="mc-f-row">
        <div className="mc-stats"><Stat value={x.ddLabel} label={x.ddSub} /><Stat value={x.city} label="도시" /></div>
        <span className="mc-pill dark">전시 보기</span>
      </div>
      <div className="mc-f-img">{photo}</div>
    </a>
  )
}

/** 전시 목록 — 제목·필터·정렬 + 엇갈린 카드 목록 */
export default function ExhibitionList() {
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState<'end' | 'new'>('end')

  const test = TABS.find((t) => t.key === tab)!.test
  const list = L.filter(test).sort((a, b) => (sort === 'end' ? a.endDays - b.endDays : b.startKey.localeCompare(a.startKey)))
  const fi = list.findIndex((x) => x.id === 'monet100')
  if (fi > 0) list.unshift(list.splice(fi, 1)[0])
  const offset = list[0]?.id === 'monet100' ? 1 : 0

  return (
    <>
      <Header active="exhibitions" />
      <main className="mpage">
        <div className="wrap">
          <nav className="crumb" aria-label="현재 위치">
            <a href="#/">홈</a><span>/</span><span className="crumb__cur">전시</span>
          </nav>
          <div className="mhead">
            <div>
              <h1>전시</h1>
              <p>지금 열리고 있거나 곧 열리는 국내외 전시를 모았어요.</p>
            </div>
            <span className="mhead__cnt" aria-live="polite"><b>{list.length}</b>개의 전시</span>
          </div>
          <div className="mbar">
            <div className="mbar__tabs" role="tablist" aria-label="전시 구분">
              {TABS.map((t) => (
                <button key={t.key} type="button" role="tab" aria-selected={tab === t.key}
                  className={`mtab${tab === t.key ? ' is-on' : ''}`} onClick={() => setTab(t.key)}>
                  {t.label} <i>{L.filter(t.test).length}</i>
                </button>
              ))}
            </div>
            <div className="mbar__sort" role="group" aria-label="정렬">
              <button type="button" className={sort === 'end' ? 'is-on' : ''} onClick={() => setSort('end')}>종료 임박순</button>
              <button type="button" className={sort === 'new' ? 'is-on' : ''} onClick={() => setSort('new')}>최근 오픈순</button>
            </div>
          </div>
          {list.length === 0 ? (
            <p className="mempty">조건에 맞는 전시가 없어요.</p>
          ) : (
            <div className="mlist">
              {list.map((x, i) => <Card key={x.id} x={x} k={i - offset} />)}
            </div>
          )}
          <p className="mnote">※ 전시 정보는 2026. 11. 20 기준 시안용 데이터예요. 관람 전 예매처에서 다시 확인해 주세요.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
