"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

const OPENING_LINES = [
  "想いは言葉に。夢は挑戦に。",
  "挑戦は、誰かの希望に。",
];

const HIDDEN_WORDS = ["想い", "言葉", "夢", "覚悟", "主人公", "挑戦", "応援", "ご縁", "希望", "行動"];

function AnimatedLine({ text, offset }: { text: string; offset: number }) {
  return (
    <p>
      {Array.from(text).map((character, index) => (
        <span
          key={`${text}-${index}`}
          className={character === "夢" || character === "挑戦" || character === "希望" ? "accent" : ""}
          style={{ "--char-delay": `${offset + index * 42}ms` } as CSSProperties}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </p>
  );
}

export default function SiteMotion() {
  const [opening, setOpening] = useState<"idle" | "playing" | "leaving" | "done">("idle");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [lastFound, setLastFound] = useState("");
  const [rewardOpen, setRewardOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const foundWordsRef = useRef(new Set<string>());
  const lines = useMemo(() => OPENING_LINES, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-kicker, .manifesto-grid > *, .section-head > *, .promise-grid article, .movie-heading > *, .movie-frame, .gallery figure, .gallery-copy, .audience > *, .schedule-heading, .schedule-card > div, .x-feed-heading > *, .x-timeline-frame, .section-cta, .line-cta > *:not(.cta-glow):not(.line-mark)"
      )
    );

    revealTargets.forEach((element, index) => {
      element.classList.add("js-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
    });
    root.classList.add("motion-ready", "intro-playing");

    const frame = window.requestAnimationFrame(() => setOpening("playing"));
    const leaveTimer = window.setTimeout(() => setOpening("leaving"), reducedMotion ? 250 : 3200);
    const finishTimer = window.setTimeout(() => {
      setOpening("done");
      setGuideOpen(true);
      root.classList.remove("intro-playing");
    }, reducedMotion ? 450 : 3720);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" }
    );
    revealTargets.forEach((element) => observer.observe(element));

    let scrollFrame = 0;
    const updateScroll = () => {
      scrollFrame = 0;
      const scrollY = window.scrollY;
      const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const journeyProgress = Math.min(Math.max(scrollY / scrollRange, 0), 1);
      root.classList.toggle("page-scrolled", scrollY > 80);
      root.style.setProperty("--parallax-shift", `${Math.min(scrollY * 0.075, 86)}px`);
      root.style.setProperty("--jungle-drift", `${scrollY * 0.035}px`);
      root.style.setProperty("--jungle-drift-reverse", `${scrollY * -0.022}px`);
      root.style.setProperty("--jungle-sway", `${Math.sin(scrollY / 340) * 2.4}deg`);
      root.style.setProperty("--journey-progress", `${journeyProgress * 100}%`);
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    const glow = document.querySelector<HTMLElement>(".pointer-glow");
    const secrets = Array.from(document.querySelectorAll<HTMLElement>(".hidden-word"));
    let foundTimer = 0;
    const discoverAt = (clientX: number, clientY: number, radius: number) => {
      secrets.forEach((secret) => {
        const word = secret.dataset.word;
        if (!word) return;
        if (foundWordsRef.current.has(word)) {
          secret.classList.remove("is-lit");
          return;
        }
        const rect = secret.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(clientX - centerX, clientY - centerY);
        secret.classList.toggle("is-lit", distance <= radius + 105);
        if (distance <= radius) {
          foundWordsRef.current.add(word);
          secret.classList.add("is-found");
          secret.classList.remove("is-lit");
          setFoundWords(Array.from(foundWordsRef.current));
          setLastFound(word);
          if (foundWordsRef.current.size === HIDDEN_WORDS.length) setRewardOpen(true);
          window.clearTimeout(foundTimer);
          foundTimer = window.setTimeout(() => setLastFound(""), 1800);
        }
      });
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!glow) return;
      if (event.pointerType === "touch") {
        glow.style.transform = `translate3d(${event.clientX - 125}px, ${event.clientY - 125}px, 0)`;
        glow.classList.add("is-active");
        root.style.setProperty("--torch-x", `${event.clientX}px`);
        root.style.setProperty("--torch-y", `${event.clientY}px`);
        root.classList.add("touch-torch-active");
        discoverAt(event.clientX, event.clientY, 105);
        return;
      }
      glow.style.transform = `translate3d(${event.clientX - 190}px, ${event.clientY - 190}px, 0)`;
      glow.classList.add("is-active");
      root.style.setProperty("--torch-x", `${event.clientX}px`);
      root.style.setProperty("--torch-y", `${event.clientY}px`);
      discoverAt(event.clientX, event.clientY, 118);
    };
    const onTouchReveal = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      if (glow) {
        glow.style.transform = `translate3d(${event.clientX - 125}px, ${event.clientY - 125}px, 0)`;
        glow.classList.add("is-active");
      }
      root.style.setProperty("--torch-x", `${event.clientX}px`);
      root.style.setProperty("--torch-y", `${event.clientY}px`);
      root.classList.add("touch-torch-active");
      discoverAt(event.clientX, event.clientY, 105);
    };
    const onTouchEnd = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;
      root.classList.remove("touch-torch-active");
      glow?.classList.remove("is-active");
      secrets.forEach((secret) => secret.classList.remove("is-lit"));
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onTouchReveal, { passive: true });
    window.addEventListener("pointerup", onTouchEnd, { passive: true });
    window.addEventListener("pointercancel", onTouchEnd, { passive: true });

    const magneticTargets = Array.from(
      document.querySelectorAll<HTMLElement>(".section-cta, .primary-button, .line-search")
    );
    const cleanups = magneticTargets.map((element) => {
      const move = (event: PointerEvent) => {
        if (event.pointerType === "touch") return;
        const rect = element.getBoundingClientRect();
        const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -2.6;
        const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 3.6;
        element.style.setProperty("--tilt-x", `${rotateX}deg`);
        element.style.setProperty("--tilt-y", `${rotateY}deg`);
      };
      const leave = () => {
        element.style.setProperty("--tilt-x", "0deg");
        element.style.setProperty("--tilt-y", "0deg");
      };
      element.addEventListener("pointermove", move);
      element.addEventListener("pointerleave", leave);
      return () => {
        element.removeEventListener("pointermove", move);
        element.removeEventListener("pointerleave", leave);
      };
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(finishTimer);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onTouchReveal);
      window.removeEventListener("pointerup", onTouchEnd);
      window.removeEventListener("pointercancel", onTouchEnd);
      window.clearTimeout(foundTimer);
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove("motion-ready", "intro-playing");
      root.classList.remove("page-scrolled");
    };
  }, []);

  return (
    <>
      {opening !== "done" && (
        <div className={`opening-intro is-${opening}`} aria-hidden="true">
          <img className="opening-vine opening-vine-left" src="/assets/vine-ribbon-v1.png" alt="" />
          <img className="opening-vine opening-vine-right" src="/assets/vine-ribbon-v1.png" alt="" />
          <div className="opening-grain" />
          <div className="opening-copy">
            <small>YUME NO JUNGLE / MORIAGE CONNECT</small>
            {lines.map((line, index) => (
              <AnimatedLine key={line} text={line} offset={220 + index * 650} />
            ))}
            <i />
          </div>
        </div>
      )}
      {guideOpen && (
        <div className="treasure-guide" role="dialog" aria-modal="true" aria-labelledby="treasure-guide-title">
          <div className="treasure-guide-card">
            <small>SECRET EXPLORATION</small>
            <h2 id="treasure-guide-title">このページには、<br /><em>10個の言葉</em>が隠されています。</h2>
            <p>暗いジャングルをライトで探索し、理念につながる言葉をすべて見つけてください。</p>
            <div className="guide-actions">
              <span><b>PC</b> カーソルを動かす</span>
              <span><b>スマホ</b> 指でなぞる</span>
            </div>
            <strong className="guide-reward">10個見つけると、参加時の限定特典が解放。</strong>
            <button type="button" onClick={() => setGuideOpen(false)}>探索を始める <span>↗</span></button>
          </div>
        </div>
      )}
      <div className="jungle-world" aria-hidden="true">
        <img className="vine-ribbon vine-ribbon-one" src="/assets/vine-ribbon-v1.png" alt="" />
        <img className="vine-ribbon vine-ribbon-two" src="/assets/vine-ribbon-v1.png" alt="" />
        <img className="vine-ribbon vine-ribbon-three" src="/assets/vine-ribbon-v1.png" alt="" />
        <img className="vine-ribbon vine-ribbon-four" src="/assets/vine-ribbon-v1.png" alt="" />
      </div>
      <div className="treasure-route" aria-hidden="true">
        <span className="route-origin">START</span>
        <i className="route-marker" />
        <span className="route-goal">DREAM</span>
      </div>
      <div className={`treasure-counter${foundWords.length === HIDDEN_WORDS.length ? " is-complete" : ""}`} aria-live="polite">
        <small>HIDDEN WORDS</small>
        <strong>{String(foundWords.length).padStart(2, "0")} <i>/ 10</i></strong>
        <span>{foundWords.length === HIDDEN_WORDS.length ? "想いは言葉に。夢は行動に。" : "ライトで言葉を探す"}</span>
      </div>
      {lastFound && <div className="secret-found-toast" aria-live="polite"><small>DISCOVERED</small><strong>{lastFound}</strong></div>}
      {foundWords.length === HIDDEN_WORDS.length && rewardOpen && (
        <div className="treasure-complete" role="dialog" aria-modal="true" aria-label="発見者限定特典">
          <button type="button" className="treasure-close" onClick={() => setRewardOpen(false)} aria-label="閉じる">×</button>
          <small>ALL WORDS DISCOVERED</small>
          <strong>発見者限定特典、解放。</strong>
          <p>あなたが、次の主人公です。<br />公式LINEで合言葉を送ると、参加時の限定特典をご案内します。</p>
          <div className="treasure-code"><small>SECRET WORD</small><b>JUNGLE10</b></div>
          <a href="#official-line" onClick={() => setRewardOpen(false)}>公式LINEで特典を受け取る <span>↗</span></a>
          <em>この画面はスクリーンショットで保存できます</em>
        </div>
      )}
      <div className="pointer-glow" aria-hidden="true" />
    </>
  );
}
