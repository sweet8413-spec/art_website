import { useEffect, useRef, useState } from 'react'
import { artsideArc } from '../arcAnim'
import { popularRanking } from '../data/exhibitions'
import { useExhibitions, type ListExhibition } from '../lib/exhibitions'
import { EXHIBITIONS_PATH } from '../lib/search'
import Header from './Header'
import Footer from './Footer'

const img = (p: string) => `images/${p}`
const DETAIL = '#/exhibition/monet100'

/** 인기 전시 포스터를 위쪽 아치(반원) 모양으로 놓기 위한 위치 계산 */
const arcPos = (t: number) => {
  const a = ((90 - t * 84) * Math.PI) / 180
  return { x: `${(50 + 45 * Math.cos(a)).toFixed(2)}%`, y: `${Math.round(411 - 293 * Math.sin(a))}px`, r: `${(t * 34).toFixed(1)}deg` }
}

const TABS: { key: string; label: string; test: (x: ListExhibition) => boolean }[] = [
  { key: 'all', label: '전체', test: () => true },
  { key: 'now', label: '진행 중', test: (x) => x.status === '진행 중' },
  { key: 'up', label: '오픈 예정', test: (x) => x.upcoming },
  { key: 'end', label: '곧 끝나요', test: (x) => x.endingSoon },
  { key: 'abroad', label: '해외', test: (x) => x.region === '해외' },
]

/** 세로 포스터 카드 — 모든 카드가 같은 비율·같은 줄에 맞춰 정렬돼요 */
function Card({ x }: { x: ListExhibition }) {
  return (
    <a className="gc" href={DETAIL}>
      <div className="gc-img">
        <img src={img(x.img)} alt={`${x.title} 포스터`} style={{ objectPosition: x.pos }} />
        <span className={`gc-badge${x.endingSoon ? ' hot' : ''}`}>{x.badge}</span>
        {x.id === 'monet100' && <span className="gc-badge doc">도슨트 해설</span>}
        <div className="gc-info"><small>{x.city} · {x.tag}</small><span>{x.venue}</span></div>
        <span className="gc-go" aria-hidden="true">↗</span>
      </div>
      <strong>{x.title}</strong>
      <span className="gc-meta">{x.period}</span>
    </a>
  )
}

/** 전시 목록 — 제목·필터·정렬 + 엇갈린 카드 목록 */
export default function ExhibitionList({ query = '' }: { query?: string }) {
  const { status, data: L, reload } = useExhibitions(query)
  const [tab, setTab] = useState('all')
  const [sort, setSort] = useState<'end' | 'new'>('end')
  const [sel, setSel] = useState(0)
  const cur = popularRanking[sel]
  const arcRef = useRef<HTMLElement>(null)
  useEffect(() => artsideArc(arcRef.current, (i: number) => setSel(i)), [])

  const test = TABS.find((t) => t.key === tab)!.test
  const list = L.filter(test).sort((a, b) => (sort === 'end' ? a.endDays - b.endDays : b.startKey.localeCompare(a.startKey)))
  const fi = list.findIndex((x) => x.id === 'monet100')
  if (fi > 0) list.unshift(list.splice(fi, 1)[0])

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
              {query ? (
                <p className="msearch">
                  ‘<b>{query}</b>’ 검색 결과 <a href={EXHIBITIONS_PATH}>검색 지우기 ×</a>
                </p>
              ) : (
                <p>지금 열리고 있거나 곧 열리는 국내외 전시를 모았어요.</p>
              )}
            </div>
            <span className="mhead__cnt" aria-live="polite">
              {status === 'loading' && L.length === 0 ? '불러오는 중…' : <><b>{list.length}</b>개의 전시</>}
            </span>
          </div>
          <section className="arc" ref={arcRef} aria-label="이번 주 인기 전시 TOP 9">
            <div className="arc-frame" aria-hidden="true" />
            {popularRanking.map((x, i) => {
              const p = arcPos(x.t)
              return (
                <button key={x.id} type="button" className={`arc-p${i === sel ? ' on' : ''}`} aria-pressed={i === sel}
                  aria-label={`${x.no}위 ${x.title}`}
                  style={{ left: p.x, top: p.y, ['--r' as string]: p.r } as React.CSSProperties}>
                  <img src={img(x.img)} alt="" style={{ objectPosition: x.pos }} />
                  <span className="arc-no">{x.no}</span>
                </button>
              )
            })}
            <div className="arc-c">
              <span className="arc-k">TOP 9 · 이번 주 인기 전시</span>
              <div className="arc-body" key={cur.id} aria-live="polite">
                <div className="arc-rank"><b>{cur.no}</b><span className={cur.chgCls}>{cur.chg}</span></div>
                <h2 className="arc-t">{cur.title}</h2>
                <span className="arc-m">{cur.venue} · {cur.city}</span>
                <span className="arc-m">{cur.period}</span>
                <div className="arc-row">
                  <span className={`arc-dd${cur.hot ? ' hot' : ''}`}>{cur.dd}</span>
                  <a className="arc-go" href={DETAIL}>전시 상세 보기 →</a>
                </div>
              </div>
              <span className="arc-note">포스터에 마우스를 올리면 액자 속으로 들어와요 · 순위는 시안용 예시</span>
            </div>
          </section>
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
          {status === 'error' ? (
            <div className="gempty" role="alert">
              전시 정보를 불러오지 못했어요.{' '}
              <button type="button" className="gretry" onClick={reload}>다시 시도</button>
            </div>
          ) : status === 'loading' && L.length === 0 ? (
            <p className="gempty" aria-busy="true">전시 정보를 불러오는 중이에요…</p>
          ) : list.length === 0 ? (
            <p className="gempty">
              {query ? `‘${query}’에 맞는 전시가 없어요. 다른 검색어로 찾아보세요.` : '조건에 맞는 전시가 없어요.'}
            </p>
          ) : (
            <div className="glist">
              {list.map((x) => <Card key={x.id} x={x} />)}
            </div>
          )}
          <p className="mnote">※ 전시 정보는 시안용 데이터예요. 관람 전 예매처에서 다시 확인해 주세요.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
