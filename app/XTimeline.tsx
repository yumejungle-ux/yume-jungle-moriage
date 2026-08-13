"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

const X_PROFILE_URL = "https://x.com/momongadamon333";
const LIVE_TIMELINE_URL =
  "https://syndication.twitter.com/srv/timeline-profile/screen-name/momongadamon333?theme=dark&lang=ja&dnt=true&transparent=true&hideHeader=true&hideFooter=true&hideBorder=true&maxHeight=476";

export default function XTimeline() {
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const [timelineSlow, setTimelineSlow] = useState(false);

  useEffect(() => {
    const slowTimer = window.setTimeout(() => setTimelineSlow(true), 4500);
    return () => window.clearTimeout(slowTimer);
  }, []);

  return (
    <section className="x-feed" id="latest-x" aria-labelledby="x-feed-title">
      <div className="x-feed-heading">
        <div className="section-kicker light">07 / EVENT STORIES</div>
        <h2 id="x-feed-title">参加する前に、<br /><span>会場の今を見る。</span></h2>
        <p>開催の様子や最新のお知らせを、公式Xの投稿からご覧いただけます。</p>
        <div className="x-author-card">
          <span className="x-author-portrait" aria-hidden="true">
            <img src="/assets/moriage-presenter-cutout-v1.png" alt="" />
          </span>
          <span className="x-author-copy">
            <small>FROM MORIAGE / OFFICIAL X</small>
            <strong>もりもりの今日の発信</strong>
            <span>@momongadamon333</span>
          </span>
        </div>
        <small className="x-feed-note">参加方法・開催日程の確認は、この下の公式LINEから。</small>
      </div>
      <div className={`x-timeline-frame${timelineLoaded ? " is-loaded" : ""}`}>
        <span className="x-timeline-label">LIVE / MORIAGE CONNECT</span>
        {!timelineLoaded && (
          <div className="x-timeline-loading" aria-live="polite">
            <i aria-hidden="true" />
            <strong>{timelineSlow ? "Xの投稿を読み込んでいます" : "LIVE TIMELINE"}</strong>
            <span>もりもりの最新投稿を取得中</span>
          </div>
        )}
        <iframe
          className="x-live-timeline"
          src={LIVE_TIMELINE_URL}
          title="もりもりの今日のX投稿"
          loading="lazy"
          scrolling="yes"
          onLoad={() => setTimelineLoaded(true)}
        />
        <a className="x-timeline-direct" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
          Xで最新投稿を開く <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
