import type { PickExhibition } from '../types'
import SectionHeader from './SectionHeader'

export default function PicksSection({ items }: { items: PickExhibition[] }) {
  return (
    <section className="wrap sec" aria-labelledby="picks-title">
      <SectionHeader id="picks-title" title="이번 주 추천 전시" desc="에디터가 고른 이번 주의 전시" />
      <div className="grid">
        {items.map((c) => (
          <a key={c.title} href="#/exhibition/monet100" className="pick">
            <div className="pick__img">
              <img src={c.img} alt={c.imgAlt} />
            </div>
            <div className="pick__body">
              <span className="pick__period">{c.period}</span>
              <strong className="pick__title">{c.title}</strong>
              <span className="pick__venue">{c.venue}</span>
            </div>
            <span className="pick__cta">
              <span className="pick__line" aria-hidden="true" />
              전시 보기
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}
