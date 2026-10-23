"use client";

import { useEffect, useRef, useState } from "react";

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

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/** Real audio player: plays /tracks/t1.mp3, live progress + equalizer. */
export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const dur = 44;

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setT(a.currentTime);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, []);

  const onToggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      void a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:p-6">
      <audio ref={audioRef} src="/tracks/t1.mp3" preload="metadata" />

      {/* now-playing header */}
      <div className="flex items-center gap-4">
        <img
          src="/covers/s1-static-shores.jpg"
          alt="Static Shores cover"
          className="h-14 w-14 shrink-0 rounded-xl object-cover"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-none tracking-wide">
            STATIC SHORES <span className="text-[var(--ember)]">— EP 12</span>
          </p>
          <p className="mt-1.5 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
            S3 · The signal on Ives Road · 0:44
          </p>
        </div>
        <span className={`eq ${playing ? "" : "eq-paused"} hidden h-4 text-[var(--acid)] sm:block`} aria-hidden="true">
          <span /><span /><span /><span />
        </span>
      </div>

      {/* progress */}
      <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[var(--acid)]"
          style={{ width: `${pct}%`, transition: "width 300ms linear" }}
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-[var(--faint)]">
        <span>{fmt(t)}</span>
        <span>{fmt(dur)}</span>
      </div>

      {/* controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            aria-label="Back 15 seconds"
            onClick={() => { const a = audioRef.current; if (a) a.currentTime = Math.max(0, a.currentTime - 15); }}
            className="btn text-[var(--dim)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5V2L7 5.5 12 9V6a6 6 0 11-6 6" />
            </svg>
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={onToggle}
            className="btn flex h-12 w-12 items-center justify-center rounded-full bg-[var(--acid)] text-[#0b0907]"
          >
            <Icon playing={playing} />
          </button>
          <button
            aria-label="Forward 15 seconds"
            onClick={() => { const a = audioRef.current; if (a) a.currentTime = Math.min(dur, a.currentTime + 15); }}
            className="btn text-[var(--dim)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5V2l5 3.5L12 9V6a6 6 0 106 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className={`eq ${playing ? "" : "eq-paused"} h-4 text-[var(--acid)] sm:hidden`} aria-hidden="true">
            <span /><span /><span /><span />
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)] sm:block">
            {playing ? "Playing" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  );
}