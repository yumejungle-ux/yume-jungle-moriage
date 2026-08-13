"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

const OPENING_LINES = [
  "想いは言葉に。夢は挑戦に。",
  "挑戦は、誰かの希望に。",
];

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
  const lines = useMemo(() => OPENING_LINES, []);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-kicker, .manifesto-grid > *, .section-head > *, .promise-grid article, .movie-heading > *, .movie-frame, .gallery figure, .gallery-copy, .audience > *, .schedule-heading, .schedule-card > div, .section-cta, .line-cta > *:not(.cta-glow):not(.line-mark)"
      )
    );

    revealTargets.forEach((element, index) => {
      element.classList.add("js-reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
    });
    root.classList.add("motion-ready", "intro-playing");

    const frame = window.requestAnimationFrame(() => setOpening("playing"));
    const leaveTimer = window.setTimeout(() => setOpening("leaving"), reducedMotion ? 250 : 2050);
    const finishTimer = window.setTimeout(() => {
      setOpening("done");
      root.classList.remove("intro-playing");
    }, reducedMotion ? 450 : 2520);

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
      root.style.setProperty("--parallax-shift", `${Math.min(window.scrollY * 0.075, 86)}px`);
    };
    const onScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateScroll();

    const glow = document.querySelector<HTMLElement>(".pointer-glow");
    const onPointerMove = (event: PointerEvent) => {
      if (!glow || event.pointerType === "touch") return;
      glow.style.transform = `translate3d(${event.clientX - 190}px, ${event.clientY - 190}px, 0)`;
      glow.classList.add("is-active");
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

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
      cleanups.forEach((cleanup) => cleanup());
      root.classList.remove("motion-ready", "intro-playing");
    };
  }, []);

  return (
    <>
      {opening !== "done" && (
        <div className={`opening-intro is-${opening}`} aria-hidden="true">
          <img className="opening-vine opening-vine-left" src="/assets/cta-arrow-vines-v2.png" alt="" />
          <img className="opening-vine opening-vine-right" src="/assets/cta-arrow-vines-v2.png" alt="" />
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
      <div className="pointer-glow" aria-hidden="true" />
    </>
  );
}
