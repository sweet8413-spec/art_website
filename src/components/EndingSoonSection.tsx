import { useId } from 'react'
import type { CardSection as CardSectionData } from '../types'
import SectionHeader from './SectionHeader'

const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

/** 곧 끝나요 — D-day를 크게 강조하고 '놓치면 아쉬운 이유'를 함께 보여 주는 카드 */
export default function EndingSoonSection({ section }: { section: CardSectionData }) {
  const titleId = useId()
  return (
    <section className="wrap sec" aria-labelledby={titleId}>
      <SectionHeader id={titleId} title={section.title} desc={section.desc} />
      <div className="end-grid">
        {section.items.map((c) => (
          <a key={c.title} href="#/exhibition/monet100" className="end-card">
            <div className="end-card__top">
              <div className="end-card__row">
                {c.badge && <span className="end-card__dday">{c.badge.label}</span>}
                {c.end && (
                  <span className="end-card__date">
                    {`${c.end.month}월 ${c.end.day}일 (${DAY_NAMES[new Date(c.end.year, c.end.month - 1, c.end.day).getDay()]})`}
                    <br />
                    종료
                  </span>
                )}
              </div>
              <strong className="end-card__title">{c.title}</strong>
              {c.reason && (
                <div className="end-card__reason">
                  <span className="end-card__reason-label">놓치면 아쉬운 이유</span>
                  <span className="end-card__reason-text">{c.reason}</span>
                </div>
              )}
              <span className="end-card__venue">{c.meta.split(' · ')[0]}</span>
            </div>
            <div className="end-card__img" style={{ background: c.tint }}>
              <img src={c.img} alt={c.imgAlt} />
            </div>
            <span className="end-card__bar">전시 보기 →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
