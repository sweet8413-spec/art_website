import { useEffect, useRef } from 'react'
import { artsideChat } from '../chat'

const AV = 'images/monet_self-portrait.jpg'

/** 모네와 대화 — 작가(모네)에게 질문하는 AI 도슨트 채팅 (지금은 미리 준비한 답변으로 동작하는 시안) */
export default function TalkMonet() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => artsideChat(ref.current), [])
  return (
    <section className="dsec" id="talk" aria-labelledby="talk-t" ref={ref}>
      <div className="sh">
        <div className="sh__title"><h2 id="talk-t">모네와 대화</h2><span className="sh__desc">AI 도슨트가 모네가 되어 답해요</span></div>
      </div>
      <div className="mc" data-av={AV}>
        <aside className="mc-side">
          <img src={AV} alt="클로드 모네, 「베레모를 쓴 자화상」(1886)" />
          <div className="mc-info">
            <span className="mc-live">AI 도슨트 · 대화 가능</span>
            <h3 className="mc-name">클로드 모네</h3>
            <span className="mc-en">CLAUDE MONET · 1840–1926</span>
            <div className="mc-tags"><span>인상주의</span><span>프랑스</span><span>지베르니</span></div>
            <p className="mc-bio">빛을 그린 화가. 같은 풍경을 시간마다 다시 그리며 '보이는 그대로'를 붙잡으려 했어요.</p>
            <p className="mc-warn">※ 실제 AI 연결 전 시안이에요. 모네의 편지와 기록을 바탕으로 미리 준비한 답변으로 대화해요.</p>
          </div>
        </aside>
        <div className="mc-main">
          <div className="mc-head">
            <b>모네와 대화<span>질문을 고르거나 직접 입력해 보세요</span></b>
            <button type="button" className="mc-reset">↺ 새 대화</button>
          </div>
          <div className="mc-log" role="log" aria-live="polite" aria-label="모네와의 대화" />
          <div className="mc-chips" aria-label="추천 질문" />
          <form className="mc-form">
            <label className="sr-only" htmlFor="mcIn">모네에게 질문하기</label>
            <input id="mcIn" type="text" placeholder="모네에게 궁금한 걸 물어보세요" autoComplete="off" maxLength={200} />
            <button type="submit" className="mc-send" aria-label="보내기" disabled>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
