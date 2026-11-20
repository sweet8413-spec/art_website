import { useEffect, useState } from 'react'
import { supabase } from './supabase'

/** Supabase public.exhibitions 테이블의 한 행 */
interface ExhibitionRow {
  id: string
  title: string
  artist: string | null
  venue: string
  city: string
  region: '국내' | '해외'
  img: string
  img_pos: string
  start_date: string | null
  end_date: string
  sort_order: number
}

/** 화면에서 쓰는 전시 정보 (날짜로 계산한 상태·D-day 포함) */
export interface ListExhibition {
  id: string
  title: string
  artist: string | null
  venue: string
  city: string
  region: '국내' | '해외'
  img: string
  pos: string
  period: string
  status: '진행 중' | '오픈 예정'
  badge: string
  tag: string
  endingSoon: boolean
  upcoming: boolean
  /** 종료까지 남은 일수 */
  endDays: number
  /** 정렬용 시작일 (시작일 미상이면 아주 이른 날짜) */
  startKey: string
}

/** 종료까지 이 일수 이하로 남으면 '곧 끝나요' */
const ENDING_SOON_DAYS = 40
const DAY = 24 * 60 * 60 * 1000

const parseDate = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const todayDate = () => {
  const n = new Date()
  return new Date(n.getFullYear(), n.getMonth(), n.getDate())
}
const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const fmt = (d: Date) => `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
const days = (from: Date, to: Date) => Math.round((to.getTime() - from.getTime()) / DAY)
const dd = (n: number) => (n === 0 ? 'D-DAY' : `D-${n}`)

function toListExhibition(r: ExhibitionRow, today: Date): ListExhibition {
  const start = r.start_date ? parseDate(r.start_date) : null
  const end = parseDate(r.end_date)
  const endDays = days(today, end)
  const upcoming = !!start && start > today
  const endingSoon = !upcoming && endDays <= ENDING_SOON_DAYS
  const status = upcoming ? '오픈 예정' : '진행 중'
  return {
    id: r.id,
    title: r.title,
    artist: r.artist,
    venue: r.venue,
    city: r.city,
    region: r.region,
    img: r.img,
    pos: r.img_pos,
    period: start ? `${fmt(start)} – ${fmt(end)}` : `~ ${fmt(end)}`,
    status,
    badge: endingSoon ? `${dd(endDays)} 종료` : upcoming ? `${dd(days(today, start!))} 오픈` : '진행 중',
    tag: r.region === '해외' ? '해외' : status,
    endingSoon,
    upcoming,
    endDays,
    startKey: r.start_date ?? '0000-01-01',
  }
}

/** PostgREST 필터 문법을 깨뜨릴 수 있는 문자 제거 */
const cleanQuery = (q: string) => q.replace(/[,()%*\\"']/g, ' ').trim()

/** 종료되지 않은 전시 목록을 불러옵니다. query 가 있으면 전시명·작가·장소·도시에서 검색해요. */
export async function fetchExhibitions(query = ''): Promise<ListExhibition[]> {
  const today = todayDate()
  let req = supabase
    .from('exhibitions')
    .select('id,title,artist,venue,city,region,img,img_pos,start_date,end_date,sort_order')
    .gte('end_date', toKey(today))
    .order('sort_order')

  const q = cleanQuery(query)
  if (q) {
    const p = `%${q}%`
    req = req.or(`title.ilike.${p},artist.ilike.${p},venue.ilike.${p},city.ilike.${p}`)
  }

  const { data, error } = await req
  if (error) throw error
  return (data as ExhibitionRow[]).map((r) => toListExhibition(r, today))
}

type State =
  | { status: 'loading'; data: ListExhibition[] }
  | { status: 'ok'; data: ListExhibition[] }
  | { status: 'error'; data: ListExhibition[]; message: string }

/** 전시 목록을 불러오는 React 훅 */
export function useExhibitions(query = '') {
  const [state, setState] = useState<State>({ status: 'loading', data: [] })
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    let alive = true
    setState((s) => ({ status: 'loading', data: s.data }))
    fetchExhibitions(query)
      .then((data) => alive && setState({ status: 'ok', data }))
      .catch((e: unknown) => {
        console.error('[exhibitions]', e)
        if (alive) setState({ status: 'error', data: [], message: e instanceof Error ? e.message : String(e) })
      })
    return () => {
      alive = false
    }
  }, [query, retry])

  return { ...state, reload: () => setRetry((n) => n + 1) }
}
