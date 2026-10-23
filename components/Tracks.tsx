"use client";

import { useEffect, useRef, useState } from "react";

export type Track = {
  id: string;
  src: string;
  cover: string;
  series: string;
  ep: string;
  genre: string;
  dur: string;
};

function Icon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2" width="4" height="12" rx="1" />
      <rect x="9" y="2" width="4" height="12" rx="1" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2l10 6-10 6V2z" />
    </svg>
  );
}

/**
 * Real episode player: one shared <audio>; pressing a row plays that track,
 * switching rows swaps audio, active row shows a live equalizer + progress feel.
 */
export default function Tracks({ tracks }: { tracks: Track[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // keep one audio element mounted
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = "metadata";
      const onEnd = () => setPlaying(false);
      audioRef.current.addEventListener("ended", onEnd);
      return () => {
        audioRef.current?.removeEventListener("ended", onEnd);
        audioRef.current?.pause();
      };
    }
  }, []);

  const play = (t: Track) => {
    const a = audioRef.current!;
    if (current === t.id && playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    if (current === t.id) {
      void a.play().then(() => setPlaying(true)).catch(() => {});
      return;
    }
    a.src = t.src;
    a.currentTime = 0;
    setCurrent(t.id);
    void a.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--panel)]">
      <ul className="divide-y divide-[var(--line)]">
        {tracks.map((t, i) => {
          const active = current === t.id && playing;
          return (
            <li key={t.id}>
              <button
                onClick={() => play(t)}
                className="group flex w-full items-center gap-4 px-4 py-4 text-left transition-colors duration-150 hover:bg-white/[0.04] md:px-5"
                aria-pressed={current === t.id && playing}
                aria-label={`${current === t.id && playing ? "Pause" : "Play"} ${t.series} ${t.ep}`}
              >
                {/* index / art */}
                <span className="w-6 shrink-0 text-center font-mono text-[11px] text-[var(--faint)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={t.cover}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-lg object-cover"
                  loading="lazy"
                />
                {/* title */}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-base leading-tight tracking-wide text-[var(--ink)]">
                    {t.ep}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--dim)]">
                    {t.series} · {t.genre}
                  </span>
                </span>
                {/* play / eq */}
                <span className="flex w-10 shrink-0 items-center justify-center">
                  {active ? (
                    <span className="eq eq-np h-4 text-[var(--acid)]" aria-hidden="true">
                      <span /><span /><span /><span />
                    </span>
                  ) : (
                    <Icon playing={false} />
                  )}
                </span>
                {/* duration */}
                <span className="w-10 shrink-0 text-right font-mono text-[11px] text-[var(--faint)]">
                  {t.dur}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}