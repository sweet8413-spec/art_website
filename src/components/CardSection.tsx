import { useId } from 'react'
import type { CardSection as CardSectionData } from '../types'
import SectionHeader from './SectionHeader'

export default function CardSection({ section }: { section: CardSectionData }) {
  const titleId = useId()
  return (
    <section className="wrap sec" aria-labelledby={titleId}>
      <SectionHeader id={titleId} title={section.title} desc={section.desc} />
      <div className="grid card-grid">
        {section.items.map((c) => (
          <a key={c.title} href="#" className="card">
            <div className="card__poster" style={{ background: c.tint }}>
              <img src={c.img} alt={c.imgAlt} style={{ objectPosition: c.imgPos ?? 'center' }} />
              {c.badge && <span className={`badge badge--${c.badge.tone}`}>{c.badge.label}</span>}
            </div>
            {c.kicker && <span className="card__kicker">{c.kicker}</span>}
            <strong className="card__title">{c.title}</strong>
            <span className="card__meta">{c.meta}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
