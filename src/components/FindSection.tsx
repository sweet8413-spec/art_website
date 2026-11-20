import { useState } from 'react'
import type { MouseEvent } from 'react'

/** 후지산 위치 (그림 기준 %) */
const FX = 65
const FY = 69

/** 정답을 맞히면 바로 펼쳐지는 도슨트 해설 */
const DOCENT = [
  { title: '큰 파도, 작은 후지산', body: '가장 높은 산을 가장 작게 그려 화면에 깊이를 만들었어요.' },
  { title: '파도 속 세 척의 배', body: '몸을 숙여 버티는 사람들. 자연 앞의 인간이에요.' },
  { title: '새로운 파랑', body: '유럽에서 막 들어온 프러시안 블루로 바다를 칠했어요.' },
  { title: '여러 장인 그림', body: '목판화라 세계 여러 미술관에 같은 그림이 있어요.' },
]

type FindState = { st: 'idle' | 'miss' | 'found' | 'reveal'; tries: number; mx: number; my: number; key: number }
const INITIAL: FindState = { st: 'idle', tries: 0, mx: 0, my: 0, key: 0 }

/** 숨은 그림 찾기 — 그림을 눌러 후지산을 찾고, 못 찾으면 정답 보기 */
export default function FindSection() {
  const [fd, setFd] = useState<FindState>(INITIAL)
  const done = fd.st === 'found' || fd.st === 'reveal'

  const onPick = (e: MouseEvent<HTMLDivElement>) => {
    if (done) return
    const rc = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rc.left) / rc.width) * 100
    const y = ((e.clientY - rc.top) / rc.height) * 100
    const hit = Math.hypot(x - FX, (y - FY) * (rc.height / rc.width)) < 7
    setFd({ st: hit ? 'found' : 'miss', tries: fd.tries + 1, mx: x, my: y, key: fd.key + 1 })
  }

  const message =
    fd.st === 'idle'
      ? '그림 위 아무 곳이나 눌러 보세요. 정답이면 빨간 원이 나타나요.'
      : fd.st === 'miss'
        ? `아쉬워요, 거기는 아니에요. ${fd.tries >= 2 ? '힌트: 점선 원 안을 잘 보세요.' : '다시 찾아보세요.'} (${fd.tries}번째 시도)`
        : fd.st === 'found'
          ? `찾았어요! ${fd.tries}번 만에 발견. 〈후가쿠 36경〉 연작 중 한 장이에요.`
          : '파도 아래 가운데, 작게 솟은 산이 바로 후지산이에요.'

  return (
    <section className="find" aria-labelledby="find-title">
      <div className="wrap find__inner">
        <div className="find__text">
          <span className="find__eyebrow"><span className="find__eyebrow-dot" aria-hidden="true" />숨은 그림 찾기</span>
          <h2 id="find-title" className="find__title">
            거대한 파도 사이,
            <br />
            후지산은 어디 있을까요?
          </h2>
          <p className="find__caption">〈가나가와 해변의 높은 파도 아래〉 · 가쓰시카 호쿠사이, 1831년경</p>
          {!done && (
          <ol className="find__steps">
            <li><span className={`find__num${done ? ' is-done' : ''}`}>1</span>오른쪽 그림에서 후지산을 찾아 눌러 보세요</li>
            <li><span className="find__num find__num--muted">2</span>못 찾겠다면 정답 보기</li>
          </ol>
          )}
          <div className={`find__msg${fd.st === 'idle' ? ' is-idle' : ''}${done ? ' is-done' : ''}`}>
            <p aria-live="polite">{message}</p>
            {done && (
              <button type="button" className="find__retry" onClick={() => setFd(INITIAL)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.6M4 4v4h4" /></svg>
                다시 하기
              </button>
            )}
          </div>
          {!done && (
          <div className="find__actions">
            <button type="button" className="find__btn" onClick={() => setFd({ ...fd, st: 'reveal' })}>
              정답 보기
            </button>
          </div>
          )}
          {done && (
            <div className="find__docent">
              {DOCENT.map((d) => (
                <div key={d.title} className="find__docent-item">
                  <strong><span className="find__docent-dot" aria-hidden="true" />{d.title}</strong>
                  <span>{d.body}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="find__media">
          <div
            className={`find__frame${done ? '' : ' is-playing'}`}
            role="button"
            aria-label="그림에서 후지산 위치 누르기"
            onClick={onPick}
          >
            <img src="images/hokusai_great-wave.jpg" alt="가쓰시카 호쿠사이, 가나가와 해변의 높은 파도 아래" />
            {fd.st === 'idle' && (
              <span className="find__chip">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
                그림을 눌러 찾아보세요
              </span>
            )}
            {fd.st === 'miss' && fd.tries >= 2 && <span className="find__hint" aria-hidden="true" style={{ left: `${FX}%`, top: `${FY}%` }} />}
            {fd.st === 'miss' && (
              <span key={fd.key} className="find__miss" aria-hidden="true" style={{ left: `${fd.mx}%`, top: `${fd.my}%` }}>✕</span>
            )}
            {done && (
              <>
                <span className="find__ring" aria-hidden="true" style={{ left: `${FX}%`, top: `${FY}%` }} />
                <span className="find__label" style={{ left: `${FX}%`, top: `calc(${FY}% + 40px)` }}>후지산</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
