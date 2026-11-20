import type { ReactNode } from 'react'

interface Props {
  id?: string
  title: string
  desc?: string
  /** 우측 영역. 기본값은 '전체보기' 링크 */
  aside?: ReactNode
}

export default function SectionHeader({ id, title, desc, aside }: Props) {
  return (
    <div className="sh">
      <div className="sh__title">
        <h2 id={id}>{title}</h2>
        {desc && <span className="sh__desc">{desc}</span>}
      </div>
      {aside ?? (
        <a href="#/exhibitions" className="sh__more">
          전체보기 →
        </a>
      )}
    </div>
  )
}
