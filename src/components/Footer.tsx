export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <img className="site-footer__logo" src="images/artside_logo.png" alt="ARTSIDE 아트사이드" />
        <span>전시회 가기 전에도, 전시장에서도 작품 이야기를 쉽게.</span>
        <span className="site-footer__credit">
          작품 이미지: Wikimedia Commons (퍼블릭 도메인) · 전시 포스터: 각 전시 주최 측 (강의용 시안)
        </span>
        <span className="site-footer__links">
          <a href="#">서비스 소개</a>
          <a href="#">문의</a>
        </span>
      </div>
    </footer>
  )
}
