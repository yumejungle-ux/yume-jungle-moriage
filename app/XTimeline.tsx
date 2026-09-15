import type { CSSProperties } from "react";

const X_PROFILE_URL = "https://x.com/momongadamon333";

export default function XTimeline() {
  return (
    <section className="x-feed" id="latest-x" aria-labelledby="x-feed-title">
      <div className="section-secrets" aria-hidden="true">
        <span className="hidden-word" data-word="応援" style={{ "--secret-top": "17%", "--secret-left": "86%", "--secret-tilt": "-7deg" } as CSSProperties}><small>07</small>応援</span>
        <span className="hidden-word" data-word="ご縁" style={{ "--secret-top": "82%", "--secret-left": "11%", "--secret-tilt": "6deg" } as CSSProperties}><small>08</small>ご縁</span>
      </div>
      <div className="x-feed-heading">
        <div className="section-kicker light">07 / EVENT STORIES</div>
        <h2 id="x-feed-title">公式Xで、<br /><span>会場の今を見る。</span></h2>
        <p>開催の様子や最新のお知らせは、もりもりの公式Xで発信しています。</p>
        <div className="x-author-card">
          <span className="x-author-portrait" aria-hidden="true"><img src="/assets/moriage-presenter-cutout-v1.png" alt="" /></span>
          <span className="x-author-copy"><small>FROM MORIAGE / OFFICIAL X</small><strong>もりもりの今日の発信</strong><span>@momongadamon333</span></span>
        </div>
        <small className="x-feed-note">参加方法・開催日程の確認は、この下の公式LINEから。</small>
      </div>
      <a className="x-post-card" href={X_PROFILE_URL} target="_blank" rel="noreferrer" aria-label="もりもりの公式Xを開く">
        <span className="x-post-head">
          <span className="x-post-avatar"><img src="/assets/moriage-presenter-cutout-v1.png" alt="" /></span>
          <span className="x-post-user"><strong>もりもり｜カリスマ夢を現実にする側の人間</strong><small>@momongadamon333</small></span>
          <b aria-hidden="true">X</b>
        </span>
        <span className="x-post-copy">夢は、口に出した瞬間から動き出す。<br /><br />うまく話せなくても大丈夫。<br />今日もワクワクの冒険に<br />行ってらっしゃい😆🌴</span>
        <img className="x-post-illustration" src="/assets/morimori-x-post-illustration-v1.png" alt="ジャングルの会場で参加者に夢を語りかけるもりもりのイラスト" />
        <span className="x-post-foot"><small>投稿イメージ</small><strong>公式Xを見に行く <i aria-hidden="true">↗</i></strong></span>
      </a>
    </section>
  );
}
