"use client";

import { useEffect, useRef, useState } from "react";

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
  const [timelineLoaded, setTimelineLoaded] = useState(false);
  const [timelineSlow, setTimelineSlow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let loadRetry: number | undefined;
    const revealWhenRendered = () => {
      if (cancelled || !timelineRef.current) return;
      const rendered = timelineRef.current.querySelector(
        ".twitter-timeline-rendered, iframe"
      );
      if (rendered) {
        setTimelineLoaded(true);
        if (loadRetry) window.clearInterval(loadRetry);
      }
    };
    const loadTimeline = () => {
      if (timelineRef.current && window.twttr?.widgets) {
        window.twttr.widgets.load(timelineRef.current);
        window.setTimeout(revealWhenRendered, 350);
        window.setTimeout(revealWhenRendered, 1400);
      }
    };
    const observer = new MutationObserver(revealWhenRendered);
    if (timelineRef.current) {
      observer.observe(timelineRef.current, { childList: true, subtree: true });
    }
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    let script = existingScript;
    if (!script) {
      script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
    if (window.twttr?.widgets) loadTimeline();
    script.addEventListener("load", loadTimeline);
    loadRetry = window.setInterval(() => {
      if (window.twttr?.widgets) loadTimeline();
      revealWhenRendered();
    }, 1200);
    const slowTimer = window.setTimeout(() => setTimelineSlow(true), 4500);
    return () => {
      cancelled = true;
      window.clearTimeout(slowTimer);
      if (loadRetry) window.clearInterval(loadRetry);
      observer.disconnect();
      script?.removeEventListener("load", loadTimeline);
    };
  }, []);

  return (
    <section className="x-feed" id="latest-x" aria-labelledby="x-feed-title">
      <div className="section-secrets" aria-hidden="true">
        <span className="hidden-word" data-word="応援" style={{ "--secret-top": "17%", "--secret-left": "86%", "--secret-tilt": "-7deg" } as React.CSSProperties}><small>07</small>応援</span>
        <span className="hidden-word" data-word="ご縁" style={{ "--secret-top": "82%", "--secret-left": "11%", "--secret-tilt": "6deg" } as React.CSSProperties}><small>08</small>ご縁</span>
      </div>
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
      <div className={`x-timeline-frame${timelineLoaded ? " is-loaded" : ""}`} ref={timelineRef}>
        <span className="x-timeline-label">LIVE / MORIAGE CONNECT</span>
        {!timelineLoaded && (
          <div className="x-timeline-loading" aria-live="polite">
            <i aria-hidden="true" />
            <strong>{timelineSlow ? "Xの投稿を準備しています" : "LIVE TIMELINE"}</strong>
            <span>{timelineSlow ? "表示されない場合は下のボタンからご覧ください" : "もりもりの最新投稿を取得中"}</span>
          </div>
        )}
        <a
          className="twitter-timeline"
          data-lang="ja"
          data-theme="dark"
          data-height="438"
          data-tweet-limit="5"
          data-chrome="noheader nofooter noborders transparent"
          data-dnt="true"
          href={`${X_PROFILE_URL}?ref_src=twsrc%5Etfw`}
        >
          もりもりの今日の発信
        </a>
        <a className="x-timeline-direct" href={X_PROFILE_URL} target="_blank" rel="noreferrer">
          Xで最新投稿を開く <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
