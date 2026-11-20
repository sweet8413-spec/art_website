import { useEffect, useState } from 'react'
import { SearchIcon } from './Icons'

/** 상단 고정 헤더. 어두운 히어로([data-dark-hero]) 위에서는 어두운 반투명, 그 외에는 밝은 반투명으로 바뀌어요. */
export default function Header({ active = 'home' }: { active?: 'home' | 'exhibitions' }) {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const on = () => {
      const hero = document.querySelector('[data-dark-hero]')
      setDark(hero ? hero.getBoundingClientRect().bottom > 90 : false)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`site-header${dark ? ' is-dark' : ''}`}>
      <div className="wrap site-header__inner">
        <a href="#/" className="logo">
          <img className="logo__img" src={dark ? 'images/artside_logo_white.png' : 'images/artside_logo.png'} alt="ARTSIDE 아트사이드" />
        </a>

        <nav className="nav" aria-label="주 메뉴">
          <a href="#/" aria-current={active === 'home' ? 'page' : undefined}>홈</a>
          <a href="#/" aria-current={active === 'exhibitions' ? 'page' : undefined}>전시</a>
        </nav>

        {/* TODO(기능): 검색 기능 연결 */}
        <form className="search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="q" className="sr-only">전시 검색</label>
          <input id="q" type="search" placeholder="전시명, 작가명, 장소" />
          <button type="submit" aria-label="검색하기">
            <SearchIcon />
          </button>
        </form>
      </div>
    </header>
  )
}
