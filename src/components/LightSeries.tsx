import { useEffect, useRef } from 'react'
import { artsideLight } from '../light'

const img = (p: string) => `images/${p}`
const SHOTS = ['fog', 'morning', 'noon', 'sunset']
const STOPS = ['새벽', '아침', '한낮', '해질녘']

/** 빛의 연작 — 같은 장소(루앙 대성당)를 시간대별로 그린 그림을 슬라이더로 넘겨 보는 섹션 */
export default function LightSeries() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => artsideLight(ref.current), [])
  return (
    <section className="dsec" id="light" aria-labelledby="light-t" ref={ref}>
      <div className="sh">
        <div className="sh__title"><h2 id="light-t">빛의 연작</h2><span className="sh__desc">막대를 끌어 하루의 빛을 흘려보세요</span></div>
      </div>
      <div className="lt">
        <div className="lt-stage" role="img" aria-label="모네, 루앙 대성당 연작 — 같은 정면을 시간대별로 그린 그림">
          {SHOTS.map((k) => <img key={k} src={img(`monet_rouen-${k}.jpg`)} alt="" draggable={false} />)}
          <span className="lt-chip">06:00</span>
        </div>
        <div className="lt-body">
          <span className="lt-k">ROUEN CATHEDRAL SERIES · 1892–1894</span>
          <h3 className="lt-h">같은 성당, 서른 번의 다른 빛</h3>
          <p className="lt-p">모네는 루앙 대성당 맞은편 건물에 방을 빌려, 같은 정면을 30점 넘게 그렸어요. 그가 그리고 싶었던 건 돌로 된 성당이 아니라 그 위에 시시각각 내려앉는 빛과 공기였어요.</p>
          <div className="lt-now" aria-live="polite">
            <div className="lt-row"><b className="lt-clock">06:00</b><strong className="lt-name">새벽 안개</strong></div>
            <p className="lt-desc"></p>
            <div className="lt-pal"><i /><i /><i /><i /><span>이 시간의 팔레트</span></div>
          </div>
          <div className="lt-ctrl">
            <input type="range" min={0} max={300} step={1} defaultValue={0} aria-label="하루 시간대 (새벽부터 해질녘까지)" />
            <div className="lt-stops">{STOPS.map((n) => <button key={n} type="button" aria-pressed="false">{n}</button>)}</div>
          </div>
          <button type="button" className="lt-play">▶ 하루 흘려보기</button>
          <p className="lt-note">시각은 감상을 돕기 위한 예시예요 · 작품 이미지: Wikimedia Commons (퍼블릭 도메인)</p>
        </div>
      </div>
    </section>
  )
}
