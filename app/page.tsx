import type { Metadata } from "next";
import SiteMotion from "./SiteMotion";
import XTimeline from "./XTimeline";

export const metadata: Metadata = {
  title: "夢のジャングル｜森上交流会",
  description:
    "想いを言葉に、夢を挑戦に。大人が本気で夢を語り、挑戦と応援とご縁が連鎖する体験型コネクトライブ。",
};

const LINE_TARGET = "#official-line";

function SectionCta({
  eyebrow,
  title,
  light = false,
}: {
  eyebrow: string;
  title: string;
  light?: boolean;
}) {
  return (
    <a className={`section-cta${light ? " light" : ""}`} href={LINE_TARGET}>
      <span><small>{eyebrow}</small><strong>{title}</strong></span>
      <img className="cta-arrow-img" src="/assets/cta-arrow-vines-v2.png" alt="" aria-hidden="true" />
    </a>
  );
}

const promises = [
  {
    number: "01",
    title: "夢を、言葉にする",
    text: "心の中にあった想いを言葉にした瞬間、夢は覚悟へ変わる。ここは、大人が本気で夢を語れる場所です。",
  },
  {
    number: "02",
    title: "必要な人と、出会う",
    text: "ただ名刺を交換するのではなく、人と人を意図的につなぐ。本当に必要なご縁が、次の一歩を生み出します。",
  },
  {
    number: "03",
    title: "挑戦を、循環させる",
    text: "誰かの挑戦を応援する。その勇気が、また新しい挑戦を生む。一人の主人公から未来が動き始めます。",
  },
];

const keywords = ["想い", "言葉", "夢", "挑戦", "応援", "ご縁", "希望"];

export default function Home() {
  return (
    <main>
      <SiteMotion />
      <header className="site-header">
        <a className="mini-logo" href="#top" aria-label="夢のジャングル トップへ">
          <img src="/assets/logo-upward.png" alt="夢のジャングル 森上交流会" />
        </a>
        <nav aria-label="メインナビゲーション">
          <a href="#concept">理念</a>
          <a href="#experience">体験</a>
          <a href="#movie">映像</a>
          <a className="header-cta" href={LINE_TARGET}><span>LINE</span>参加申し込み</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><i /> TOKYO · OSAKA · NATIONWIDE</div>
          <img className="hero-brand-logo" src="/assets/logo-upward.png" alt="夢のジャングル 森上交流会" />
          <p className="hero-lead">
            想いは言葉に。夢は挑戦に。<br />
            挑戦は、誰かの希望に。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={LINE_TARGET}>
              <span>イベントへ申し込む</span>
              <b>公式LINE</b>
              <img className="arrow-img" src="/assets/cta-arrow-vines-v2.png" alt="" aria-hidden="true" />
            </a>
            <a className="text-link" href="#movie">PVを見る <span>↓</span></a>
          </div>
          <div className="hero-facts" aria-label="イベントの特徴">
            <p><strong>REAL</strong><span>100人規模</span></p>
            <p><strong>CONNECT</strong><span>体験型交流会</span></p>
            <p><strong>ALL JAPAN</strong><span>東京・大阪から全国へ</span></p>
          </div>
        </div>
        <p className="scroll-guide">SCROLL TO EXPLORE</p>
      </section>

      <section className="manifesto" id="concept">
        <div className="section-kicker">01 / OUR PHILOSOPHY</div>
        <div className="manifesto-grid">
          <h2>想いは、<br /><em>言葉</em>にしなければ、<br />なかったことになる。</h2>
          <div className="manifesto-copy">
            <p className="lead-copy">だから私たちは、<br />大人が本気で夢を語れる場所を創ります。</p>
            <p>
              夢は、心の中で願うだけでは動きません。言葉にした瞬間、覚悟となり、仲間に伝わり、応援が生まれます。
            </p>
            <p>
              夢のジャングルは、単なる交流会ではありません。人と人を意図的につなぎ、人生が変わるきっかけを創る場所です。
            </p>
          </div>
        </div>
        <div className="keyword-river" aria-label="理念を表す言葉">
          <div className="keyword-track">
            {[0, 1].map((group) => (
              <div className="keyword-set" key={group} aria-hidden={group === 1}>
                {keywords.map((word, index) => (
                  <span key={`${group}-${word}`} className={index === 6 ? "final" : ""}>{word}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <SectionCta eyebrow="まずはお気軽に" title="無料セッションについて聞く" />
      </section>

      <section className="experience" id="experience">
        <div className="section-head">
          <div>
            <div className="section-kicker">02 / THE EXPERIENCE</div>
            <h2>交流では終わらない。<br /><span>人生が動き出す。</span></h2>
          </div>
          <p>偶然を待つのではなく、<br />きっかけを意図的に創る。</p>
        </div>
        <div className="promise-grid">
          {promises.map((item) => (
            <article key={item.number}>
              <span className="promise-number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
        <SectionCta eyebrow="夢を動かす一歩" title="次回の交流会に申し込む" />
      </section>

      <section className="movie-section" id="movie">
        <div className="section-kicker light">03 / OFFICIAL FILM</div>
        <div className="movie-heading">
          <h2>言葉が、熱になる。<br />会場の空気を体感する。</h2>
          <p>2 MIN 14 SEC · OFFICIAL PROMOTION FILM</p>
        </div>
        <div className="movie-frame">
          <video controls playsInline preload="metadata" poster="/assets/group.jpg">
            <source src="/assets/yume-jungle-pv.mp4" type="video/mp4" />
          </video>
          <span className="movie-label"><img src="/assets/logo-upward.png" alt="夢のジャングル 森上交流会" /></span>
        </div>
        <SectionCta eyebrow="映像の熱を、会場で" title="開催日程をLINEで受け取る" light />
      </section>

      <section className="gallery" aria-label="イベントの様子">
        <figure className="gallery-tall">
          <img src="/assets/moment-laugh.jpg" alt="笑顔で交流する参加者" />
          <figcaption>夢を語る。</figcaption>
        </figure>
        <div className="gallery-copy">
          <div className="section-kicker">04 / MOMENTS</div>
          <h2>一人ひとりが、<em>主人公。</em></h2>
          <p>
            年齢も、肩書きも、歩んできた道も違う。だからこそ、ここで交わる言葉が新しい可能性をひらきます。
          </p>
        </div>
        <figure className="gallery-wide">
          <img src="/assets/moment-energy.jpg" alt="会場全体で盛り上がる参加者" />
          <figcaption>挑戦を応援する。</figcaption>
        </figure>
        <figure className="gallery-small">
          <img src="/assets/moment-connect.jpg" alt="多くの参加者が交流する会場" />
          <figcaption>ご縁がつながる。</figcaption>
        </figure>
        <div className="gallery-cta">
          <SectionCta eyebrow="あなたも、この輪の中へ" title="参加方法を公式LINEで確認" />
        </div>
      </section>

      <section className="audience">
        <div className="section-kicker">05 / WHO IT&apos;S FOR</div>
        <h2>こんな想いを持つ、あなたへ。</h2>
        <ul>
          <li><span>01</span>本気の夢を、言葉にしてみたい</li>
          <li><span>02</span>自分の可能性を広げるご縁に出会いたい</li>
          <li><span>03</span>挑戦する仲間と、互いに応援し合いたい</li>
          <li><span>04</span>人生を動かす、次の一歩を踏み出したい</li>
        </ul>
        <div className="audience-cta">
          <SectionCta eyebrow="迷っている方も歓迎" title="まずは無料セッションから" />
        </div>
      </section>

      <section className="schedule" aria-label="開催情報">
        <div className="schedule-heading">
          <div className="section-kicker light">06 / NEXT SESSION</div>
          <h2>次の開催日時を、<br />公式LINEで先行案内。</h2>
          <p>東京・大阪を中心に全国で開催。会場・日時・参加方法の最新情報を、公式LINEでお届けします。</p>
        </div>
        <div className="schedule-card">
          <div><small>NEXT DATE</small><strong>次回開催日時</strong><span>公式LINEで先行公開</span></div>
          <div><small>AREA</small><strong>東京・大阪</strong><span>全国へ順次展開</span></div>
          <div><small>ENTRY</small><strong>参加申し込み</strong><span>公式LINEで受付</span></div>
          <SectionCta eyebrow="日程確認・参加相談" title="公式LINEで無料セッションへ" light />
        </div>
      </section>

      <XTimeline />

      <section className="line-cta" id="official-line">
        <div className="cta-glow" aria-hidden="true" />
        <div className="line-mark" aria-hidden="true">LINE</div>
        <img
          className="cta-logo-image"
          src="/assets/logo-upward.png"
          alt="夢のジャングル 森上交流会"
        />
        <div className="section-kicker light">JOIN THE NEXT EXPERIENCE</div>
        <h2>次の主人公は、<br /><em>あなたです。</em></h2>
        <p>
          開催情報・会場・お申し込みについては、<br className="desktop-only" />公式LINEからご案内します。
        </p>
        <a className="line-search" href="https://line.me/" target="_blank" rel="noreferrer" aria-label="LINEを開いて森上交流会を検索">
          <span className="line-bubble">LINE</span>
          <span className="search-copy"><small>公式LINEから参加申し込み</small><strong>森上交流会をLINEで検索</strong></span>
          <span className="search-submit">LINEを開く <img className="search-arrow-img" src="/assets/cta-arrow-vines-v2.png" alt="" aria-hidden="true" /></span>
        </a>
        <small className="cta-note">※公式LINEの専用URLは公開時に設定できます</small>
      </section>

      <footer>
        <div className="footer-logo"><span>YUME NO JUNGLE</span><small>夢のジャングル / 森上交流会</small></div>
        <p>想いは言葉に。夢は挑戦に。挑戦は誰かの希望に。</p>
        <small>© YUME NO JUNGLE / MORIAGE CONNECT</small>
      </footer>

      <a className="mobile-line-bar" href={LINE_TARGET}>
        <span className="mobile-line-icon">LINE</span>
        <span className="mobile-line-copy"><small>イベント参加申し込み</small><strong>公式LINEで申し込む</strong></span>
        <img className="mobile-line-arrow" src="/assets/cta-arrow-vines-v2.png" alt="" aria-hidden="true" />
      </a>
    </main>
  );
}
