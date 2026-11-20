import { useEffect, useRef, useState } from 'react'
import type { CalendarDate, CalendarEvent } from '../types'
import SectionHeader from './SectionHeader'

interface Props {
  events: CalendarEvent[]
  today: CalendarDate
}

const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']
const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토']

/** 월요일 시작 달력 칸 (앞뒤 달 날짜 포함) */
function buildCells(year: number, month: number) {
  const offset = (new Date(year, month - 1, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month, 0).getDate()
  const daysInPrev = new Date(year, month - 1, 0).getDate()
  const total = Math.ceil((offset + daysInMonth) / 7) * 7
  return Array.from({ length: total }, (_, i) => {
    const day = i - offset + 1
    const inMonth = day >= 1 && day <= daysInMonth
    const label = inMonth ? day : day < 1 ? daysInPrev + day : day - daysInMonth
    return { key: i, day, label, inMonth }
  })
}

export default function CalendarSection({ events, today }: Props) {
  const months = [...new Set(events.map((e) => e.month))].sort((a, b) => a - b)
  const [month, setMonth] = useState(today.month)
  const [selected, setSelected] = useState(today.day)
  const listRef = useRef<HTMLDivElement>(null)

  const monthEvents = events.filter((e) => e.month === month).sort((a, b) => a.day - b.day)
  const cells = buildCells(today.year, month)
  const canPrev = months.indexOf(month) > 0
  const canNext = months.indexOf(month) < months.length - 1

  // 선택한 날짜(없으면 그 다음 일정)로 목록 스크롤
  useEffect(() => {
    const box = listRef.current
    if (!box) return
    const target = box.querySelector<HTMLElement>(`[data-day="${monthEvents.find((e) => e.day >= selected)?.day ?? ''}"]`)
    box.scrollTo({ top: target ? target.offsetTop - 8 : box.scrollHeight, behavior: 'smooth' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, selected])

  const goMonth = (m: number) => {
    setMonth(m)
    setSelected(m === today.month ? today.day : 1)
  }

  return (
    <section className="wrap cal-section" aria-labelledby="cal-title">
      <SectionHeader
        id="cal-title"
        title="전시 달력"
        desc="날짜를 누르면 그날의 전시 일정으로 이동해요"
        aside={
          <div className="legend">
            <span><span className="legend__dot" aria-hidden="true" />오픈</span>
            <span><span className="legend__dot legend__dot--end" aria-hidden="true" />종료</span>
          </div>
        }
      />
      <div className="cal2">
        <div className="cal2__picker">
          <div className="cal2__head">
            <strong className="cal2__month" aria-live="polite">{`${today.year}. ${month}`}</strong>
            <div className="cal2__nav">
              <button type="button" aria-label="이전 달" disabled={!canPrev} onClick={() => goMonth(months[months.indexOf(month) - 1])}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
              </button>
              <button type="button" aria-label="다음 달" disabled={!canNext} onClick={() => goMonth(months[months.indexOf(month) + 1])}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
          <div className="cal2__grid cal2__weekdays">
            {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
          </div>
          <div className="cal2__grid">
            {cells.map((c) => {
              const dayEvents = c.inMonth ? monthEvents.filter((e) => e.day === c.day) : []
              const isToday = c.inMonth && month === today.month && c.day === today.day
              const isSel = c.inMonth && c.day === selected
              return (
                <button
                  key={c.key}
                  type="button"
                  className={`cal2__day${c.inMonth ? '' : ' is-out'}${isToday ? ' is-today' : ''}${isSel ? ' is-selected' : ''}`}
                  disabled={!c.inMonth}
                  aria-pressed={isSel}
                  aria-label={c.inMonth ? `${month}월 ${c.day}일${dayEvents.length ? ` · 일정 ${dayEvents.length}개` : ''}` : undefined}
                  onClick={() => setSelected(c.day)}
                >
                  <span className="cal2__num">{c.label}</span>
                  <span className="cal2__dots">
                    {dayEvents.map((e, i) => <span key={i} className={`cal2__dot${e.kind === '종료' ? ' cal2__dot--end' : ''}`} />)}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="cal2__today"><span aria-hidden="true" />오늘 · {`${today.year}. ${today.month}. ${today.day}`}</div>
        </div>

        <div className="cal2__list-wrap">
          <div className="cal2__list-head">
            <strong>전시 일정</strong>
            <span>{monthEvents.length}건</span>
          </div>
          <div className="cal2__list" ref={listRef}>
            {monthEvents.map((e, i) => {
              const past = month < today.month || (month === today.month && e.day < today.day)
              return (
                <a
                  key={`${e.day}-${i}`}
                  href="#"
                  data-day={e.day}
                  className={`ev${e.day === selected ? ' is-selected' : ''}${past ? ' is-past' : ''}`}
                >
                  <span className="ev__date">
                    <strong>{e.day}</strong>
                    <span>{`${month}월 · ${DAY_NAMES[new Date(today.year, month - 1, e.day).getDay()]}`}</span>
                    <span className={`ev__kind${e.kind === '종료' ? ' ev__kind--end' : ''}`}>{e.kind}</span>
                  </span>
                  <span className="ev__bar" aria-hidden="true" />
                  <span className="ev__body">
                    <span className="ev__venue">{e.venue}</span>
                    <strong className="ev__title">{e.title}</strong>
                    <span className="ev__desc">{e.desc}</span>
                  </span>
                  <span className="ev__go" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 6l6 6-6 6" /></svg>
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
