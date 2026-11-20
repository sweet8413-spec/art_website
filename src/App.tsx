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

export default function App() {
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
