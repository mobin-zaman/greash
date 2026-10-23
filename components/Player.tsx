"use client";

import { useState } from "react";

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

/** Fake audio player: play/pause toggles progress + equalizer running state. */
export default function Player() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:p-6">
      {/* now-playing header */}
      <div className="flex items-center gap-4">
        <div
          className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl"
          style={{
            background:
              "radial-gradient(120% 120% at 30% 20%, #40422a 0%, #1a1c0e 45%, #0d0c08 100%)",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 rounded-xl border border-white/10" />
          <div className="absolute inset-[7px] rounded-full border border-white/15" />
          <div className="absolute inset-[16px] rounded-full border border-white/10" />
          <span className="relative text-[var(--acid)]">
            {playing ? (
              <span className="eq block h-4">
                <span />
                <span />
                <span />
              </span>
            ) : (
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" opacity="0.9">
                <path d="M4 2l10 6-10 6V2z" />
              </svg>
            )}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-lg leading-none tracking-wide">
            STATIC SHORES <span className="text-[var(--ember)]">— EP 12</span>
          </p>
          <p className="mt-1.5 truncate font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
            S3 · The signal on Ives Road · 28:41
          </p>
        </div>
      </div>

      {/* progress */}
      <div
        className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="presentation"
      >
        <div
          className="player-progress h-full w-full rounded-full bg-[var(--acid)]"
          style={{ ["--progress-sec" as string]: "132s", animationPlayState: playing ? "running" : "paused" }}
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] tracking-widest text-[var(--faint)]" aria-hidden="true">
        <span>14:32</span>
        <span>28:41</span>
      </div>

      {/* controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            aria-label="Back 15 seconds"
            className="btn skip-btn text-[var(--dim)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5V2L7 5.5 12 9V6a6 6 0 11-6 6" />
            </svg>
          </button>
          <button
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
            className="btn flex h-12 w-12 items-center justify-center rounded-full bg-[var(--acid)] text-[#0b0907]"
          >
            <Icon playing={playing} />
          </button>
          <button
            aria-label="Forward 15 seconds"
            className="btn skip-btn text-[var(--dim)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5V2l5 3.5L12 9V6a6 6 0 106 6" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`eq ${playing ? "" : "eq-paused"} h-4 text-[var(--acid)]`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)] sm:block">
            {playing ? "Playing" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  );
}
