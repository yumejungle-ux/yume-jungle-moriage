"use client";

import { useEffect, useRef } from "react";

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

export default function XTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTimeline = () => {
      if (timelineRef.current && window.twttr?.widgets) {
        window.twttr.widgets.load(timelineRef.current);
      }
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );

    if (existingScript) {
      loadTimeline();
      existingScript.addEventListener("load", loadTimeline, { once: true });
      return () => existingScript.removeEventListener("load", loadTimeline);
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.addEventListener("load", loadTimeline, { once: true });
    document.body.appendChild(script);

    return () => script.removeEventListener("load", loadTimeline);
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
            <strong>森上さんの発信</strong>
            <span>@momongadamon333</span>
          </span>
        </div>
        <small className="x-feed-note">参加方法・開催日程の確認は、この下の公式LINEから。</small>
      </div>
      <div className="x-timeline-frame" ref={timelineRef}>
        <span className="x-timeline-label">LIVE / MORIAGE CONNECT</span>
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-height="480"
          data-chrome="noheader nofooter noborders transparent"
          data-dnt="true"
          href={X_PROFILE_URL}
        >
          @momongadamon333 の最新投稿を見る
        </a>
      </div>
    </section>
  );
}
