"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal. Emil rules: opacity + translateY (GPU-safe), ease-out,
 * stagger via --d delay. Content is NEVER gated behind IntersectionObserver:
 * a 1.2s mount fallback reveals even if IO never fires (throttled tab,
 * slow load) — IO only advances elements already in view.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "section" | "p" | "h2" | "h3";
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
    // Append .in-reduce class separately to satisfy reduced-motion in CSS
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    );
    io.observe(el);
    const t = setTimeout(show, 1200); // never gate content
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return createElement(
    Tag,
    {
      ref,
      className: `reveal ${className}`,
      style: { ["--d" as string]: `${delay}ms` },
    },
    children
  );
}