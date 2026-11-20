/** 히어로 갤러리 작품의 감상 포인트 */
export interface ArtPoint {
  /** 퍼센트 좌표 (0~100) */
  x: number
  y: number
  title: string
  text: string
}

/** 작품을 볼 수 있는 전시 */
export interface LinkedExhibition {
  name: string
  venue: string
  period: string
  status: string
}

export interface HeroArtwork {
  title: string
  artist: string
  year: string
  img: string
  /** CSS object-position */
  pos: string
  points: ArtPoint[]
  ex: LinkedExhibition
}

export interface PickExhibition {
  title: string
  venue: string
  period: string
  img: string
  imgAlt: string
}

export interface QuizItem {
  title: string
  artist: string
  img: string
  focus: string
  question: string
  answer: string
  ex: string
  venue: string
  dday: string
}

export interface ExhibitionCard {
  title: string
  meta: string
  img: string
  imgAlt: string
  imgPos?: string
  tint: string
  badge?: { label: string; tone: 'red' | 'dark' }
  kicker?: string
  /** 곧 끝나요 카드에서 크게 보여 줄 종료일 */
  end?: { year: number; month: number; day: number }
  /** 놓치면 아쉬운 이유 */
  reason?: string
}

export interface CardSection {
  title: string
  desc: string
  items: ExhibitionCard[]
}

export interface CalendarEvent {
  month: number
  day: number
  kind: '오픈' | '종료'
  title: string
  venue: string
  desc: string
}

export interface CalendarDate {
  year: number
  month: number
  day: number
}
