import { useState } from 'react'
import type { QuizItem } from '../types'
import SectionHeader from './SectionHeader'
import { RotateIcon } from './Icons'

function QuizCard({ item, index }: { item: QuizItem; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const no = String(index + 1).padStart(2, '0')

  return (
    <div className={`qcard${flipped ? ' is-flipped' : ''}`}>
      <div className="qcard__inner">
        <button
          type="button"
          className="qface qface--front"
          aria-label={`${item.question} 답 보기`}
          onClick={() => setFlipped(true)}
          tabIndex={flipped ? -1 : 0}
        >
          <img src={item.img} alt="" style={{ objectPosition: item.focus }} />
          <span className="qface--front__body">
            <span className="qface__label">QUESTION {no}</span>
            <span className="qface__q">{item.question}</span>
            <span className="qface__hint">
              <span className="circle-icon" aria-hidden="true">?</span>
              눌러서 답 보기
            </span>
          </span>
        </button>

        <div className="qface qface--back" aria-hidden={!flipped}>
          <span className="qface__answer-label">ANSWER {no}</span>
          <strong className="qface__title">{item.title}</strong>
          <span className="qface__artist">{item.artist}</span>
          <p className="qface__answer">{item.answer}</p>
          <a href="#" className="qface__ex" tabIndex={flipped ? 0 : -1}>
            <span className="qface__ex-top">
              <span>이 작품, 지금 볼 수 있어요</span>
              <span className="qface__dday">{item.dday}</span>
            </span>
            <strong className="qface__ex-name">{item.ex}</strong>
            <span className="qface__ex-bottom">
              <span>{item.venue}</span>
              <span>전시 보기 →</span>
            </span>
          </a>
          <button type="button" className="qface__back-btn" tabIndex={flipped ? 0 : -1} onClick={() => setFlipped(false)}>
            <span className="circle-icon" aria-hidden="true">
              <RotateIcon />
            </span>
            질문 다시 보기
          </button>
        </div>
      </div>
    </div>
  )
}

export default function QuizSection({ items }: { items: QuizItem[] }) {
  return (
    <section className="wrap sec" aria-labelledby="quiz-title">
      <SectionHeader
        id="quiz-title"
        title="이 그림, 알고 있었나요?"
        desc="카드를 누르면 답과 함께, 그 작품을 만날 수 있는 전시를 알려 드려요"
        aside={<span className="sh__note">※ 연결된 전시는 시안용 예시예요</span>}
      />
      <div className="quiz-grid">
        {items.map((q, i) => (
          <QuizCard key={q.title} item={q} index={i} />
        ))}
      </div>
    </section>
  )
}
