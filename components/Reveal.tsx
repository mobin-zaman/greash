"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

type RevealTag = "div" | "li" | "span" | "section" | "p" | "h2" | "h3";

/**
 * Scroll reveal. Emil rules: opacity + translateY(22px) + scale(0.95) → GPU-safe,
 * ease-out, staggered via --d. Content is NEVER gated behind IntersectionObserver:
 * a 1.2s mount fallback reveals it even if IO never fires. Reduced motion shows
 * everything instantly with no motion (CSS handles the visual state; we skip
 * observing entirely).
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      if (done.current) return;
      done.current = true;
      el.classList.add("in");
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    const t = setTimeout(show, 1200); // never gate content
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const cls = `reveal ${className}`;
  const style = { ["--d"]: `${delay}ms` } as CSSProperties;

  switch (as) {
    case "span":
      return (
        <span ref={ref as Ref<HTMLSpanElement>} className={cls} style={style}>
          {children}
        </span>
      );
    case "p":
      return (
        <p ref={ref as Ref<HTMLParagraphElement>} className={cls} style={style}>
          {children}
        </p>
      );
    case "li":
      return (
        <li ref={ref as Ref<HTMLLIElement>} className={cls} style={style}>
          {children}
        </li>
      );
    case "section":
      return (
        <section ref={ref as Ref<HTMLElement>} className={cls} style={style}>
          {children}
        </section>
      );
    case "h2":
      return (
        <h2 ref={ref as Ref<HTMLHeadingElement>} className={cls} style={style}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 ref={ref as Ref<HTMLHeadingElement>} className={cls} style={style}>
          {children}
        </h3>
      );
    default:
      return (
        <div ref={ref as Ref<HTMLDivElement>} className={cls} style={style}>
          {children}
        </div>
      );
  }
}
