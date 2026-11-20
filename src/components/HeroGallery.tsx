import { useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import type { HeroArtwork } from '../types'
import { TODAY_LABEL } from '../data/mock'
import { ArrowRight, ChevronLeft, ChevronRight } from './Icons'

const GAP = 300 // 패널 간격(px)
const K = 0.55 // 마우스 이동 대비 패널 이동 비율

interface Props {
  artworks: HeroArtwork[]
}

export default function HeroGallery({ artworks }: Props) {
  const center = Math.floor(artworks.length / 2)
  const stageRef = useRef<HTMLDivElement>(null)
  const [mx, setMx] = useState(0)
  const [openPin, setOpenPin] = useState<string | null>(null)

  // 각 패널의 x 위치와 현재 가운데(활성) 패널 계산
  const xs = artworks.map((_, i) => (i - center) * GAP - mx * K)
  const active = xs.reduce((best, x, i) => (Math.abs(x - mx) < Math.abs(xs[best] - mx) ? i : best), 0)
  const cur = artworks[active]

  const [lastActive, setLastActive] = useState(active)
  if (lastActive !== active) {
    setLastActive(active)
    setOpenPin(null)
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rc = stageRef.current!.getBoundingClientRect()
    const limit = 2.2 * GAP
    const v = Math.max(-limit, Math.min(limit, e.clientX - (rc.left + rc.width / 2)))
    if (Math.abs(v - mx) > 4) setMx(v)
  }

  const aim = (n: number) => {
    const v = Math.max(0, Math.min(artworks.length - 1, n))
    setMx(((v - center) * GAP) / (1 + K))
  }

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__intro">
        <span className="hero__eyebrow">TODAY’S GALLERY · {TODAY_LABEL}</span>
        <h1 id="hero-title" className="hero__title">
          지금 만날 수 있는 전시의
          <br />
          대표 작품을 먼저 둘러보세요
        </h1>
        <p className="hero__lead">
          마우스를 좌우로 움직여 둘러보세요. 그림 위 빨간 점을 누르면 감상 포인트를 볼 수 있어요.
        </p>
      </div>

      <div className="stage" ref={stageRef} onMouseMove={onMouseMove}>
        {artworks.map((a, i) => {
          const x = xs[i]
          const isActive = i === active
          const r = x / GAP
          const z = isActive ? 60 : Math.min(Math.abs(r), 3) * 25
          const style: CSSProperties = {
            transform: `translateX(${x.toFixed(1)}px) translateZ(${z.toFixed(1)}px) rotateY(${(-r * 20).toFixed(2)}deg)`,
            zIndex: isActive ? 20 : 10 - Math.round(Math.abs(r)),
            filter: isActive ? 'none' : 'brightness(0.5)',
          }
          return (
            <div key={a.title} className="panel" style={style}>
              <img src={a.img} alt={a.title} style={{ objectPosition: a.pos }} />
              {isActive &&
                a.points.map((p, j) => {
                  const key = `${i}-${j}`
                  const open = openPin === key
                  const tipStyle: CSSProperties = {
                    left: p.x > 55 ? `calc(${p.x}% - 232px)` : `calc(${p.x}% + 18px)`,
                    top: p.y > 60 ? `calc(${p.y}% - 150px)` : `calc(${p.y}% - 14px)`,
                  }
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        className="pin"
                        aria-expanded={open}
                        aria-label={`감상 포인트: ${p.title}`}
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        onClick={() => setOpenPin(open ? null : key)}
                      >
                        <span className="pin__ring" style={{ animationDelay: `${j * 0.35}s` }} />
                        <span className="pin__ring pin__ring--late" />
                        <span className="pin__dot" />
                      </button>
                      {open && (
                        <div className="tip" role="note" style={tipStyle}>
                          <strong>{p.title}</strong>
                          {p.text}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          )
        })}
      </div>

      <div className="wrap hero__info">
        <div className="hero__nav">
          <button type="button" className="ctl" aria-label="이전 작품" disabled={active === 0} onClick={() => aim(active - 1)}>
            <ChevronLeft />
          </button>
          <div className="hero__current" aria-live="polite">
            <strong>〈{cur.title}〉</strong>
            <span>
              {cur.artist} · {cur.year}
            </span>
          </div>
          <button
            type="button"
            className="ctl"
            aria-label="다음 작품"
            disabled={active === artworks.length - 1}
            onClick={() => aim(active + 1)}
          >
            <ChevronRight />
          </button>
        </div>

        <div className="hero__ex">
          <span className="hero__ex-label">
            <span className="dot" style={{ width: 6, height: 6 }} aria-hidden="true" />
            이 작품을 볼 수 있는 전시 · {cur.ex.status}
          </span>
          <strong className="hero__ex-name">{cur.ex.name}</strong>
          <span className="hero__ex-venue">
            {cur.ex.venue} · {cur.ex.period}
          </span>
        </div>

        <a href="#" className="btn-light">
          전시 상세 바로가기 <ArrowRight />
        </a>

        <div className="bars" aria-hidden="true">
          {artworks.map((a, i) => (
            <span key={a.title} className={i === active ? 'is-on' : undefined} />
          ))}
        </div>
        <span className="hero__note">※ 진주 귀고리·별이 빛나는 밤의 전시 연결은 시안용 예시예요.</span>
      </div>
    </section>
  )
}
