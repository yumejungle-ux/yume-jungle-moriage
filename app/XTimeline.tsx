import type { CSSProperties } from "react";

const X_PROFILE_URL = "https://x.com/momongadamon333";
const X_TIMELINE_URL = "https://syndication.twitter.com/srv/timeline-profile/screen-name/momongadamon333?dnt=true&theme=dark&lang=ja";

export default function XTimeline() {
  return (
    <section className="x-feed" id="latest-x" aria-labelledby="x-feed-title">
      <div className="section-secrets" aria-hidden="true">
        <span className="hidden-word" data-word="応援" style={{ "--secret-top": "17%", "--secret-left": "86%", "--secret-tilt": "-7deg" } as CSSProperties}><small>07</small>応援</span>
        <span className="hidden-word" data-word="ご縁" style={{ "--secret-top": "82%", "--secret-left": "11%", "--secret-tilt": "6deg" } as CSSProperties}><small>08</small>ご縁</span>
      </div>
      <div className="x-feed-heading">
        <div className="section-kicker light">07 / EVENT STORIES</div>
        <h2 id="x-feed-title">参加する前に、<br /><span>会場の今を見る。</span></h2>
        <p>開催の様子や最新のお知らせを、公式Xの投稿からご覧いただけます。</p>
        <div className="x-author-card">
          <span className="x-author-portrait" aria-hidden="true"><img src="/assets/moriage-presenter-cutout-v1.png" alt="" /></span>
          <span className="x-author-copy"><small>FROM MORIAGE / OFFICIAL X</small><strong>もりもりの今日の発信</strong><span>@momongadamon333</span></span>
        </div>
        <small className="x-feed-note">参加方法・開催日程の確認は、この下の公式LINEから。</small>
      </div>
      <div className="x-timeline-frame">
        <span className="x-timeline-label">LIVE / MORIAGE CONNECT</span>
        <iframe className="x-timeline-iframe" src={X_TIMELINE_URL} title="もりもりのX最新投稿" loading="lazy" referrerPolicy="no-referrer" />
        <a className="x-timeline-direct" href={X_PROFILE_URL} target="_blank" rel="noreferrer">タイムラインが表示されない場合はXで開く <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
