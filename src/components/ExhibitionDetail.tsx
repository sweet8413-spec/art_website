import { useEffect, useRef, useState } from 'react'
import { monet100 as D } from '../data/monet100'
import Header from './Header'
import Footer from './Footer'
import LightSeries from './LightSeries'
import TalkMonet from './TalkMonet'

const img = (p: string) => `images/${p}`
const pad = (n: number) => String(n).padStart(2, '0')
const TABS = [
  { id: 'intro', label: '전시 소개' },
  { id: 'works', label: '작품 해설' },
  { id: 'light', label: '빛의 연작' },
  { id: 'talk', label: '모네와 대화' },
  { id: 'visit', label: '관람 정보' },
]

/** 전시 상세 — MONET 100 */
export default function ExhibitionDetail() {
  const { ex, intro } = D
  const [cur, setCur] = useState(0)
  const [pin, setPin] = useState(-1)
  const [tab, setTab] = useState('intro')
  const w = D.works[cur]
  const stripRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // 세로 마우스 휠로 작품 목록을 가로로 넘기기 (끝에 닿으면 페이지 스크롤로 넘어감)
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      const max = strip.scrollWidth - strip.clientWidth
      if ((e.deltaY > 0 && strip.scrollLeft < max - 1) || (e.deltaY < 0 && strip.scrollLeft > 0)) {
        e.preventDefault()
        strip.scrollLeft += e.deltaY
      }
    }
    strip.addEventListener('wheel', onWheel, { passive: false })
    return () => strip.removeEventListener('wheel', onWheel)
  }, [])

  // 번호를 누르면 해당 해설로 시선 이동
  useEffect(() => {
    if (pin < 0) return
    panelRef.current?.querySelector('.dpt.is-on')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [pin])
  const pick = (i: number) => {
    if (i < 0 || i >= D.works.length) return
    setCur(i)
    setPin(-1)
    const el = stripRef.current?.children[i] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const onScroll = () => {
      let k = TABS[0].id
      TABS.forEach((t) => {
        const el = document.getElementById(t.id)
        if (el && el.getBoundingClientRect().top < 100) k = t.id
      })
      setTab(k)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const togglePin = (j: number) => setPin((p) => (p === j ? -1 : j))
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header active="exhibitions" />
      <main className="detail">
        <div className="wrap">
          <nav className="crumb" aria-label="현재 위치">
            <a href="#/">홈</a><span>/</span><a href="#/exhibitions">전시</a><span>/</span><span className="crumb__cur">{ex.title}</span>
          </nav>
          <section className="dhero">
            <div className="dhero__poster"><img src={img(ex.poster)} alt={`${ex.title} 전시 포스터`} /></div>
            <div className="dhero__info">
              <div className="dhero__badges"><span className="dbadge dbadge--dark">{ex.status}</span><span className="dbadge">{ex.dday}</span></div>
              <span className="dhero__kicker">{ex.kicker}</span>
              <h1 className="dhero__title">{ex.title}</h1>
              <div className="dhero__sub">{ex.sub}</div>
              <dl className="dhero__dl">
                {ex.info.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <div className="dhero__cta">
                <a className="dbtn" href={ex.book} target="_blank" rel="noopener noreferrer">
                  예매하러 가기
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a className="dbtn dbtn--line" href="#works" onClick={go('works')}>작품 해설 먼저 보기</a>
              </div>
              <p className="dhero__src">{ex.source}</p>
            </div>
          </section>
        </div>

        <nav className="dtabs" aria-label="상세 메뉴">
          <div className="wrap">
            {TABS.map((t) => (
              <a key={t.id} href={`#${t.id}`} className={tab === t.id ? 'is-on' : ''} onClick={go(t.id)}>{t.label}</a>
            ))}
          </div>
        </nav>

        <div className="wrap">
          <section className="dsec" id="intro" aria-labelledby="intro-t">
            <div className="sh"><div className="sh__title"><h2 id="intro-t">전시 소개</h2></div></div>
            <div className="dintro">
              <div className="dintro__lead"><h3>{intro.title}</h3><p>{intro.body}</p></div>
              <div className="dintro__tips">
                <h4>가기 전에 알아 두면 좋은 3가지</h4>
                {intro.tips.map(([n, t, b]) => (
                  <div key={n} className="dtip"><b>{n}</b><div><strong>{t}</strong><span>{b}</span></div></div>
                ))}
              </div>
            </div>
          </section>

          <section className="dsec" id="works" aria-labelledby="works-t">
            <div className="sh">
              <div className="sh__title"><h2 id="works-t">작품 해설</h2><span className="sh__desc">그림 위 빨간 점을 누르면 감상 포인트가 열려요</span></div>
            </div>
            <div className="ddocent">
              <div className="ddocent__viewer">
                <div className="ddocent__frame" style={{ aspectRatio: w.ratio }}>
                  <img src={img(w.img)} alt={w.title} />
                  {w.points.map((p, j) => (
                    <button key={p.t} type="button" className={`dpin${pin === j ? ' is-on' : ''}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}
                      aria-label={`감상 포인트 ${j + 1}: ${p.t}`} aria-pressed={pin === j} onClick={() => togglePin(j)}>
                      <span className="dpin__ring" style={{ animationDelay: `${j * 0.5}s` }} />
                      <span className="dpin__dot">{j + 1}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={`ddocent__panel${pin >= 0 ? ' has-pin' : ''}`} ref={panelRef}>
                <span className="ddocent__no">WORK {pad(cur + 1)} / {pad(D.works.length)}</span>
                <h3>{w.title}</h3>
                <span className="ddocent__meta">클로드 모네 · {w.year} · {w.owner}</span>
                <p className="ddocent__line">{w.line}</p>
                {w.points.map((p, j) => (
                  <button key={p.t} type="button" className={`dpt${pin === j ? ' is-on' : ''}`} onClick={() => togglePin(j)}>
                    <i>{j + 1}</i>
                    <span><strong>{p.t}</strong><span>{p.b}</span></span>
                  </button>
                ))}
              </div>
            </div>
            <div className="dthumbs-bar">
              <span><strong>{pad(cur + 1)} / {pad(D.works.length)}</strong> · 옆으로 넘겨 다른 작품을 골라 보세요</span>
              <span className="dthumbs-bar__arrows">
                <button type="button" aria-label="이전 작품" disabled={cur === 0} onClick={() => pick(cur - 1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
                </button>
                <button type="button" aria-label="다음 작품" disabled={cur === D.works.length - 1} onClick={() => pick(cur + 1)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </span>
            </div>
            <div className="dthumbs" role="tablist" aria-label="작품 선택" ref={stripRef}>
              {D.works.map((x, i) => (
                <button key={x.id} type="button" role="tab" aria-selected={i === cur} className={`dthumb${i === cur ? ' is-on' : ''}`}
                  onClick={() => pick(i)}>
                  <img src={img(x.img)} alt="" />
                  <span>{x.title}</span>
                </button>
              ))}
            </div>
            <p className="dnote">※ 미디어 전시에서 실제로 다루는 작품 구성과 다를 수 있는 시안용 예시예요. 작품 이미지: Wikimedia Commons (퍼블릭 도메인)</p>
          </section>

          <LightSeries />

          <TalkMonet />

          <section className="dsec" id="visit" aria-labelledby="visit-t">
            <div className="sh"><div className="sh__title"><h2 id="visit-t">관람 정보</h2></div></div>
            <div className="dvisit">
              {D.visit.map(([t, b]) => (
                <div key={t}><strong>{t}</strong><p>{b}</p></div>
              ))}
            </div>
          </section>

          <section className="dsec" aria-labelledby="rel-t">
            <div className="sh">
              <div className="sh__title"><h2 id="rel-t">함께 보면 좋은 전시</h2></div>
              <a href="#/" className="sh__more">전시 더 보기 →</a>
            </div>
            <div className="drel">
              {D.related.map((r) => (
                <a key={r.title} href="#/exhibition/monet100">
                  <img src={img(r.img)} alt={`${r.title} 포스터`} />
                  <span><strong>{r.title}</strong><span>{r.meta}</span></span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
