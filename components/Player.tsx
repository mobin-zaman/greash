"use client";

import { useState } from "react";

/** Fake audio player: play/pause toggles progress + equalizer state. */
export default function Player() {
  const [playing, setPlaying] = useState(true);

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-5 md:p-6">
      <div className="flex items-center gap-4">
        <button
          aria-label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((p) => !p)}
          className="btn flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--acid)] text-[#0b0907]"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div className="truncate">
              <p className="font-display text-lg leading-none tracking-wide">STATIC</p>
              <p className="mt-1 truncate text-xs text-[var(--dim)]">S3 · Static Shores · 28:41</p>
            </div>
            <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--dim)] sm:flex">
              {playing ? (
                <span className="eq eq-np h-3" aria-hidden="true">
                  <span /><span /><span /><span />
                </span>
              ) : (
                <span className="text-[var(--faint)]">PAUSED</span>
              )}
            </span>
          </div>

          <div
            className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10"
            aria-hidden="true"
          >
            <div
              className="player-progress h-full rounded-full bg-[var(--acid)]"
              style={{ animationPlayState: playing ? "running" : "paused" }}
            />
          </div>

          <div className="mt-2 flex justify-between font-mono text-[10px] text-[var(--faint)]" aria-hidden="true">
            <span>14:32</span>
            <span>28:41</span>
          </div>
        </div>
      </div>
    </div>
  );
}