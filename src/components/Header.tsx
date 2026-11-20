import { SearchIcon } from './Icons'

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <a href="#" className="logo">
          <img className="logo__img" src="/images/artside_logo.png" alt="ARTSIDE 아트사이드" />
        </a>

        <nav className="nav" aria-label="주 메뉴">
          <a href="#" aria-current="page">홈</a>
          <a href="#">전시</a>
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
