import type { ReactNode } from "react";
import CountUp from "@/components/CountUp";
import Player from "@/components/Player";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

/* ---------- data ---------- */
const SERIES = [
  {
    id: "s1",
    title: "STATIC SHORES",
    tag: "S3",
    genre: "Horror · Cyber",
    blurb: "A drowned radio host keeps broadcasting from the town nobody survived.",
    accent: "linear-gradient(145deg,#3a1d4f,#120b12 60%,#0b0907)",
    glyph: "radio",
  },
  {
    id: "s2",
    title: "NEON REQUIEM",
    tag: "S1",
    genre: "Noir",
    blurb: "A burnt-out detective trades his memory for one last case.",
    accent: "linear-gradient(145deg,#063b57,#081019 60%,#0b0907)",
    glyph: "moon",
  },
  {
    id: "s3",
    title: "CADENCE",
    tag: "S2",
    genre: "Romance · Music",
    blurb: "Two producers fall in love over a song neither can finish.",
    accent: "linear-gradient(145deg,#7a2a12,#1a0f10 60%,#0b0907)",
    glyph: "heart",
  },
  {
    id: "s4",
    title: "THE VOID ARCHIVE",
    tag: "S1",
    genre: "Sci-fi",
    blurb: "Every memory ever erased is stored here. Someone found the door.",
    accent: "linear-gradient(145deg,#14263c,#0a1018 60%,#0b0907)",
    glyph: "spiral",
  },
  {
    id: "s5",
    title: "LAST CALL",
    tag: "S4",
    genre: "Thriller",
    blurb: "Midnight, one public phone. Calls from the future — collect only.",
    accent: "linear-gradient(145deg,#4d2f06,#141006 60%,#0b0907)",
    glyph: "bolt",
  },
  {
    id: "s6",
    title: "EMBERS & ASH",
    tag: "S1",
    genre: "Historical drama",
    blurb: "A rooftop singer in a collapsing empire, one song from the gallows.",
    accent: "linear-gradient(145deg,#6b1212,#170a0a 60%,#0b0907)",
    glyph: "flame",
  },
];

const GENRES = [
  "Horror",
  "Romance",
  "Sci-Fi",
  "Noir",
  "True Crime",
  "Fantasy",
  "Thriller",
  "Comedy",
];

const QUOTES = [
  {
    q: "The first episode ruined me. I binged all forty in one sitting — the sound design is unreal.",
    n: "Maya R.",
    r: "14 seasons finished",
  },
  {
    q: "It feels less like a podcast and more like a movie where you close your eyes.",
    n: "Devon K.",
    r: "412 hours listened",
  },
  {
    q: "I pressed play on the train. I missed my stop, my dinner, and my life.",
    n: "Priya S.",
    r: "addicted since 2023",
  },
];

const GLYPHS: Record<string, ReactNode> = {
  radio: (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-[var(--acid)]/80" aria-hidden="true">
      <rect x="10" y="14" width="44" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="27" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="27" r="2.5" fill="currentColor" />
      <path d="M38 22h10M38 27h10M38 32h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 48l-2 8M24 48l2 6M36 48l-2 6M40 48l2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 10l4-6M58 10l-4-6M3 26h4M57 26h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-[var(--acid)]/80" aria-hidden="true">
      <path d="M42 8a22 22 0 110 30A24 24 0 0142 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-[var(--acid)]/80" aria-hidden="true">
      <path d="M32 54S10 40 10 24a12 12 0 0122-5 12 12 0 0122 5c0 16-22 30-22 30z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  spiral: (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-[var(--acid)]/80" aria-hidden="true">
      <path d="M32 32a8 8 0 118 8 8 8 0 01-8-8 8 8 0 018-8 12 12 0 010 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-[var(--acid)]/80" aria-hidden="true">
      <path d="M34 4L12 38h14l-4 22 24-34H30l4-22z" fill="currentColor" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 64 64" fill="none" className="h-16 w-16 text-[var(--acid)]/80" aria-hidden="true">
      <path d="M32 6s14 14 14 26a14 14 0 01-28 0c0-6 3-10 5-14 1 4 3 5 5 5-1-6 2-13 4-17z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
};

function Cover({ series }: { series: (typeof SERIES)[number] }) {
  return (
    <div
      className="cover-zoom relative aspect-[4/5] overflow-hidden rounded-xl"
      style={{ background: series.accent }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-80">{GLYPHS[series.glyph]}</div>
      {/* glow */}
      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[var(--acid)]/20 blur-2xl" />
      <div className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)]">
        {series.tag}
      </div>
      <div className="absolute inset-x-3 bottom-3">
        <p className="font-display text-xl leading-none tracking-wide text-[var(--ink)]">{series.title}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--dim)]">{series.genre}</p>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-[#0b0907]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-2xl tracking-[0.08em] text-[var(--ink)]">
          GREA<span className="text-[var(--acid)]">SH</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-[var(--dim)] md:flex">
          <a className="uline" href="#series">Series</a>
          <a className="uline" href="#genres">Genres</a>
          <a className="uline" href="#about">About</a>
        </div>
        <a href="#listen" className="btn btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
          Listen free
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const words = ["HEAR IT", "FEEL IT", "LIVE IT", "LOSE IT"];
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--acid)]/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-[var(--ember)]/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal as="p" className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-[var(--dim)]">
          <span className="eq eq-np h-4 items-center rounded-sm bg-white/5 px-2 py-1" aria-hidden="true">
            <span /><span /><span /><span />
          </span>
          Live in your headphones — 120,000+ stories
        </Reveal>

        <h1 className="mt-8 font-display uppercase leading-[0.92] tracking-tight text-[var(--ink)]">
          <Reveal as="span" className="block text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]">
            Stories that
          </Reveal>
          <Reveal as="span" delay={80} className="mt-2 flex flex-wrap items-baseline gap-x-4 text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]">
            <span className="text-[var(--ember)]">make</span>
            <span className="rotator text-[var(--acid)]">
              {words.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
          </Reveal>
        </h1>

        <Reveal delay={160} className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--dim)]">
          GREASH is cinematic audio fiction — voice actors, binaural sound, and storylines that
          hit like a live show. Press play, close your eyes, and the room disappears.
        </Reveal>

        <Reveal delay={240} className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#listen" className="btn btn-primary rounded-full px-7 py-4 font-semibold">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
            Start listening — free
          </a>
          <a href="#series" className="btn btn-ghost rounded-full px-7 py-4 font-semibold">
            Browse series
          </a>
        </Reveal>

        <Reveal delay={320} className="mt-14 flex items-center gap-3 font-mono text-xs text-[var(--faint)]">
          <span className="cue-dot block h-1.5 w-1.5 rounded-full bg-[var(--acid)]" />
          Now playing — S3 Static Shores, ep. 12
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Cinematic sound", "Binaural audio", "Live sessions", "Creator-first",
    "No ads", "Download offline", "900 languages", "Night mode",
  ];
  return (
    <div className="marquee overflow-hidden border-y border-[var(--line)] py-5">
      <div className="marquee-track" style={{ ["--marquee-speed" as string]: "26s" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <span key={`${dup}-${i}`} className="mx-6 flex items-center gap-6 font-display text-2xl uppercase tracking-wide text-[var(--dim)]">
                <span className={i % 2 ? "text-[var(--ember)]" : "text-[var(--acid)]"}>✦</span> {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Featured() {
  return (
    <section id="series" className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--acid)]">Featured</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
            Trending right now
          </h2>
        </div>
        <a href="#" className="uline font-mono text-sm uppercase tracking-widest text-[var(--dim)]">
          View all →
        </a>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {SERIES.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 70}>
            <TiltCard className="series-card cursor-pointer">
              <Cover series={s} />
              <p className="pointer-events-none mt-4 line-clamp-2 text-sm leading-snug text-[var(--dim)]">
                {s.blurb}
              </p>
              <div className="mt-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">
                <span className="eq eq-np h-3 items-end" aria-hidden="true">
                  <span /><span /><span />
                </span>
                {s.tag} · 4.8★
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Genres() {
  return (
    <section id="genres" className="border-y border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-28">
      <Reveal className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ember)]">Pick your poison</p>
        <h2 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
          Every genre, one earbud
        </h2>
        <div className="mt-12 divide-y divide-[var(--line)]">
          {GENRES.map((g) => (
            <a
              key={g}
              href="#series"
              className="genre-row group flex items-center justify-between py-5 font-display text-5xl uppercase tracking-tight md:text-7xl"
            >
              <span>{g}</span>
              <span className="mr-4 translate-x-4 text-lg opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 120, suffix: "K+", label: "Audio stories" },
    { v: 400, suffix: "M+", label: "Episodes streamed" },
    { v: 45, suffix: "M", label: "Nightly listeners" },
    { v: 8, suffix: "K", label: "Creators paid monthly" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 70} className="border-l-2 border-[var(--acid)] pl-5">
            <p className="font-display text-5xl text-[var(--ink)] md:text-6xl">
              <CountUp to={s.v} suffix={s.suffix} />
            </p>
            <p className="mt-2 font-mono text-xs uppercase tracking-widest text-[var(--dim)]">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="listen" className="relative mx-auto max-w-7xl px-6 py-10 md:py-16">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--acid)]">The player</p>
          <h2 className="mt-3 font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
            One tap and the room disappears
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--dim)]">
            Sleep timers, voice control, 10x speed for the impatient, and a progress bar you can
            feel. Hold your phone's screen and skim a scene like a track on vinyl.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {["Sleep timer", "Voice skip", "Offline", "10x speed"].map((f, i) => (
              <span key={f} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--ink)]" style={{ transition: "background 180ms" }}>
                {f}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Player />
        </Reveal>
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
      <Reveal>
        <h2 className="font-display text-5xl uppercase leading-none tracking-tight md:text-6xl">
          Headphones on, world off
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <Reveal key={q.n} delay={i * 80} className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-7">
            <div className="font-display text-6xl leading-none text-[var(--acid)]">“</div>
            <p className="mt-2 text-lg leading-relaxed text-[var(--ink)]">{q.q}</p>
            <p className="mt-6 font-display tracking-wide text-[var(--ink)]">{q.n}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">{q.r}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--line)] py-28 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="breathe h-80 w-80 rounded-full bg-[var(--acid)]/15 blur-[90px]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--ember)]">Free forever plan</p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-none tracking-tight md:text-8xl">
            Ready to get <span className="text-[var(--acid)]">lost?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-[var(--dim)]">
            Your first season is on us. No card, no catch — just hit play and disappear.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#listen" className="btn btn-primary rounded-full px-9 py-4 text-lg font-semibold">
            Start listening
          </a>
          <a href="#series" className="btn btn-ghost rounded-full px-9 py-4 text-lg font-semibold">
            Explore
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl tracking-[0.08em]">
            GREA<span className="text-[var(--acid)]">SH</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-[var(--dim)]">
            Stories you feel in your ears. © 2026 Greash Audio.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--dim)]">
          <a className="uline" href="#">Press</a>
          <a className="uline" href="#">Careers</a>
          <a className="uline" href="#">Creator payout</a>
          <a className="uline" href="#">Privacy</a>
        </div>
        <div className="flex gap-3">
          {["in", "x", "tt"].map((s) => (
            <a key={s} href="#" className="btn flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] font-mono text-xs uppercase text-[var(--dim)] hover:text-[var(--acid)]">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */
export default function Home() {
  return (
    <main className="flex-1">
      <Nav />
      <Hero />
      <Marquee />
      <Featured />
      <Genres />
      <Stats />
      <Showcase />
      <Quotes />
      <CTA />
      <Footer />
    </main>
  );
}