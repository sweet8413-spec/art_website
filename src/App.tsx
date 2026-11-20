import { useEffect, useState, useLayoutEffect } from 'react'
import ExhibitionDetail from './components/ExhibitionDetail'
import ExhibitionList from './components/ExhibitionList'
import { EXHIBITIONS_PATH, getSearchQuery } from './lib/search'
import Header from './components/Header'
import HeroGallery from './components/HeroGallery'
import PicksSection from './components/PicksSection'
import QuizSection from './components/QuizSection'
import FindSection from './components/FindSection'
import CalendarSection from './components/CalendarSection'
import EndingSoonSection from './components/EndingSoonSection'
import OpeningSoonSection from './components/OpeningSoonSection'
import Footer from './components/Footer'
import {
  calendarEvents,
  CALENDAR_TODAY,
  endingSoon,
  heroArtworks,
  openingSoon,
  picks,
  quizItems,
} from './data/mock'

export const MONET_DETAIL = '#/exhibition/monet100'

function useHash() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => {
    const on = () => setHash(window.location.hash)
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  // 화면(목록→상세 등)이 바뀌면, 새 화면이 그려진 직후 남은 관성 스크롤을 멈추고 맨 위에서 시작해요.
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const top = (window as unknown as { __artsideScrollTop?: () => void }).__artsideScrollTop
    if (top) top()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [hash])
  return hash
}

export default function App() {
  const hash = useHash()
  if (hash === MONET_DETAIL) return <ExhibitionDetail />
  if (hash === EXHIBITIONS_PATH || hash.startsWith(`${EXHIBITIONS_PATH}?`))
    return <ExhibitionList query={getSearchQuery(hash)} />
  return (
    <>
      <Header />
      <main>
        <HeroGallery artworks={heroArtworks} />
        <PicksSection items={picks} />
        <QuizSection items={quizItems} />
        <EndingSoonSection section={endingSoon} />
        <FindSection />
        <CalendarSection events={calendarEvents} today={CALENDAR_TODAY} />
        <OpeningSoonSection section={openingSoon} />
      </main>
      <Footer />
    </>
  )
}
