import { useId } from 'react'
import type { CardSection as CardSectionData } from '../types'
import SectionHeader from './SectionHeader'

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

/** 곧 열려요 — 입장권 모양 카드로 오픈 카운트다운과 '미리 예매하기'를 강조 */
export default function OpeningSoonSection({ section }: { section: CardSectionData }) {
  const titleId = useId()
  return (
    <section className="wrap sec" aria-labelledby={titleId}>
      <SectionHeader id={titleId} title={section.title} desc={section.desc} />
      <div className="tk-grid">
        {section.items.map((c) => {
          const [venue, period] = c.meta.split(' · ')
          const m = period?.match(/(\d{4})\.(\d+)\.(\d+)/)
          const openLabel = m
            ? `${m[2]}월 ${m[3]}일 (${DAY_NAMES[new Date(+m[1], +m[2] - 1, +m[3]).getDay()]})`
            : ''
          const dday = (c.badge?.label ?? '').replace(' 오픈', '')
          const n = parseInt(dday.slice(2), 10)
          const soon = n <= 1 ? '내일 오픈' : n <= 7 ? '이번 주 오픈' : '오픈 예정'
          return (
            <a key={c.title} href="#" className="tk">
              <div className="tk__poster" style={{ background: c.tint }}>
                <img src={c.img} alt={c.imgAlt} style={{ objectPosition: c.imgPos ?? 'center' }} />
              </div>
              <div className="tk__body">
                <span className="tk__kicker">OPENING · {openLabel}</span>
                <strong className="tk__title">{c.title}</strong>
                <span className="tk__meta">
                  {venue}
                  <br />
                  {period}
                </span>
                <span className="tk__cta">미리 예매하기 →</span>
              </div>
              <div className="tk__stub">
                <span className="tk__open-in">OPEN IN</span>
                <strong className="tk__dday">{dday}</strong>
                <span className={`tk__soon${n <= 1 ? ' is-urgent' : ''}`}>{soon}</span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
