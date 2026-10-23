import type { ReactNode } from "react";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import Player from "@/components/Player";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";

/* ================================================================
   Data
   ================================================================ */
const SERIES = [
  {
    id: "s1",
    title: "STATIC SHORES",
    tag: "S3",
    genre: "Horror · Cyber",
    blurb: "A drowned radio host keeps broadcasting from the town nobody survived.",
    eps: "94 eps",
    rating: "4.9",
    bg: "linear-gradient(165deg, #2c1b40 0%, #171019 52%, #0b0907 100%)",
    glow: "rgba(139, 92, 246, 0.5)",
    glowAt: "72% 18%",
    letter: "S",
    glyph: "radio",
  },
  {
    id: "s2",
    title: "NEON REQUIEM",
    tag: "S1",
    genre: "Noir",
    blurb: "A burnt-out detective trades his memory for one last case.",
    eps: "41 eps",
    rating: "4.8",
    bg: "linear-gradient(165deg, #0e3a52 0%, #0a1620 55%, #0b0907 100%)",
    glow: "rgba(56, 189, 248, 0.45)",
    glowAt: "30% 12%",
    letter: "N",
    glyph: "moon",
  },
  {
    id: "s3",
    title: "CADENCE",
    tag: "S2",
    genre: "Romance · Music",
    blurb: "Two producers fall in love over a song neither can finish.",
    eps: "58 eps",
    rating: "4.9",
    bg: "linear-gradient(165deg, #6b2b12 0%, #221110 55%, #0b0907 100%)",
    glow: "rgba(255, 87, 34, 0.45)",
    glowAt: "68% 22%",
    letter: "C",
    glyph: "heart",
  },
  {
    id: "s4",
    title: "THE VOID ARCHIVE",
    tag: "S1",
    genre: "Sci-fi",
    blurb: "Every memory ever erased is stored here. Someone found the door.",
    eps: "36 eps",
    rating: "4.7",
    bg: "linear-gradient(165deg, #16324b 0%, #0c141d 55%, #0b0907 100%)",
    glow: "rgba(94, 234, 212, 0.35)",
    glowAt: "50% 10%",
    letter: "V",
    glyph: "spiral",
  },
  {
    id: "s5",
    title: "LAST CALL",
    tag: "S4",
    genre: "Thriller",
    blurb: "Midnight, one public phone. Calls from the future — collect only.",
    eps: "72 eps",
    rating: "4.8",
    bg: "linear-gradient(165deg, #57390a 0%, #1c1509 55%, #0b0907 100%)",
    glow: "rgba(216, 240, 74, 0.35)",
    glowAt: "26% 24%",
    letter: "L",
    glyph: "bolt",
  },
  {
    id: "s6",
    title: "EMBERS & ASH",
    tag: "S1",
    genre: "Historical drama",
    blurb: "A rooftop singer in a collapsing empire, one song from the gallows.",
    eps: "48 eps",
    rating: "4.8",
    bg: "linear-gradient(165deg, #571414 0%, #1c0b0b 55%, #0b0907 100%)",
    glow: "rgba(255, 131, 87, 0.4)",
    glowAt: "62% 16%",
    letter: "E",
    glyph: "flame",
  },
];

const GENRES = [
  { name: "Horror", count: "21.4K" },
  { name: "Romance", count: "26.1K" },
  { name: "Sci-Fi", count: "18.9K" },
  { name: "Noir", count: "9.6K" },
  { name: "True Crime", count: "14.2K" },
  { name: "Fantasy", count: "16.8K" },
  { name: "Thriller", count: "19.3K" },
  { name: "Comedy", count: "8.4K" },
];

const STATS = [
  { v: 120, suffix: "K+", label: "Audio stories" },
  { v: 400, suffix: "M+", label: "Episodes streamed" },
  { v: 45, suffix: "M", label: "Monthly listeners" },
  { v: 8, suffix: "K", label: "Creators paid" },
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

const MARQUEE = [
  "Cinematic sound design",
  "Binaural audio",
  "Sleep-safe timers",
  "Offline downloads",
  "Creator-first payouts",
  "Weekly episode drops",
  "120K+ stories",
  "Ad-free listening",
];

/* ================================================================
   Cover-art glyphs (pure SVG, no assets)
   ================================================================ */
const GLYPHS: Record<string, ReactNode> = {
  radio: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="10" y="14" width="44" height="26" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="27" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="24" cy="27" r="2.5" fill="currentColor" />
      <path d="M38 22h10M38 27h10M38 32h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 48l-2 8M24 48l2 6M36 48l-2 6M40 48l2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 10l4-6M58 10l-4-6M3 26h4M57 26h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M42 8a22 22 0 110 30A24 24 0 0142 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="20" cy="50" r="2" fill="currentColor" />
      <circle cx="30" cy="56" r="1.2" fill="currentColor" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 54S10 40 10 24a12 12 0 0122-5 12 12 0 0122 5c0 16-22 30-22 30z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M20 24h4M28 20h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  spiral: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 32a8 8 0 118 8 8 8 0 01-8-8 8 8 0 018-8 12 12 0 010 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M34 4L12 38h14l-4 22 24-34H30l4-22z" fill="currentColor" />
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M32 6s14 14 14 26a14 14 0 01-28 0c0-6 3-10 5-14 1 4 3 5 5 5-1-6 2-13 4-17z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M26 44a8 8 0 0014 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

/* ================================================================
   CSS-art cover
   ================================================================ */
function Cover({ s }: { s: (typeof SERIES)[number] }) {
  return (
    <div className="cover relative aspect-[4/5] overflow-hidden rounded-xl border border-white/5" style={{ background: s.bg }}>
      {/* art layer — zooms on card hover */}
      <div className="cover-art absolute inset-0">
        {/* accent glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(85% 60% at ${s.glowAt}, ${s.glow}, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        {/* hairline scan texture */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent 0 3px, rgba(244,237,220,0.03) 3px 4px)",
          }}
          aria-hidden="true"
        />
        {/* ghost display letter */}
        <span
          className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[7rem] leading-none text-white/[0.07] md:text-[8rem]"
          aria-hidden="true"
        >
          {s.letter}
        </span>
        {/* glyph */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="cover-glyph h-16 w-16 text-[var(--ink)]/85 md:h-20 md:w-20">
            {GLYPHS[s.glyph]}
          </div>
        </div>
      </div>

      {/* season tag */}
      <div className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--ink)] backdrop-blur-sm">
        {s.tag}
      </div>
      {/* rating */}
      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[10px] tracking-widest text-[var(--ink)] backdrop-blur-sm">
        ★ {s.rating}
      </div>

      {/* bottom label */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="font-display text-lg leading-none tracking-wide text-[var(--ink)] md:text-xl">
          {s.title}
        </p>
        <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--dim)] md:text-[10px]">
          {s.genre} · {s.eps}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   Sections
   ================================================================ */
function BrandMark() {
  return (
    <Link href="/" className="btn flex items-center gap-2.5" aria-label="GREASH home">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-[var(--acid)] text-[#0b0907]">
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M4 2l10 6-10 6V2z" />
        </svg>
      </span>
      <span className="font-display text-xl tracking-[0.08em] text-[var(--ink)]">
        GREASH
      </span>
    </Link>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)]/60 bg-[#0b0907]/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 md:px-6 md:py-4">
        <BrandMark />
        <div className="hidden items-center gap-8 text-sm text-[var(--dim)] md:flex">
          <a className="uline" href="#series">Series</a>
          <a className="uline" href="#genres">Genres</a>
          <a className="uline" href="#listen">Player</a>
          <a className="uline" href="#voices">Voices</a>
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
    <section className="relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-44">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(216,240,74,0.14), transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-48 h-80 w-80 rounded-full opacity-70"
        style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,87,34,0.16), transparent 70%)", filter: "blur(70px)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-6">
        <Reveal as="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--dim)] md:text-xs">
          <span className="eq h-3.5 text-[var(--acid)]" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
          An audio-fiction station · on air 24/7
        </Reveal>

        <h1 className="mt-8 font-display uppercase leading-[0.92] tracking-tight text-[var(--ink)]">
          <Reveal as="span" className="headline-line block text-[17vw] sm:text-7xl md:text-8xl lg:text-[8.25rem]">
            Stories
          </Reveal>
          <Reveal as="span" delay={90} className="headline-line block text-[17vw] sm:text-7xl md:text-8xl lg:text-[8.25rem]">
            that <span className="text-[var(--ember)]">make you</span>
          </Reveal>
          <Reveal as="span" delay={180} className="block text-[17vw] sm:text-7xl md:text-8xl lg:text-[8.25rem]">
            <span className="rotator text-[var(--acid)]">
              {words.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </span>
          </Reveal>
        </h1>

        <Reveal delay={240} className="mt-8 max-w-xl text-base leading-relaxed text-[var(--dim)] md:text-lg">
          GREASH is cinematic audio fiction — voice actors, binaural sound and
          storylines that hit like a live show. Press play, close your eyes,
          and the room disappears.
        </Reveal>

        <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#listen" className="btn btn-primary rounded-full px-7 py-4 text-base font-semibold">
            <svg className="btn-icon" width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2l10 6-10 6V2z" />
            </svg>
            Start listening — free
          </a>
          <a href="#series" className="btn btn-ghost rounded-full px-7 py-4 text-base font-semibold">
            Browse series
          </a>
        </Reveal>

        <Reveal delay={380} className="mt-14 flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-[var(--faint)]">
          <span className="cue-dot block h-1.5 w-1.5 rounded-full bg-[var(--acid)]" aria-hidden="true" />
          NOW PLAYING — STATIC SHORES · EP 12 · THE SIGNAL ON IVES ROAD
          <svg className="scroll-cue ml-1" width="10" height="12" viewBox="0 0 10 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M5 1v9M1.5 7.5L5 11l3.5-3.5" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  return (
    <div className="marquee border-y border-[var(--line)] bg-[var(--bg-2)] py-5">
      <div className="marquee-track" style={{ ["--marquee-speed" as string]: "30s" }}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {MARQUEE.map((it, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-5 whitespace-nowrap px-7 font-display text-xl uppercase tracking-wide text-[var(--dim)] md:text-2xl"
              >
                <span className={i % 2 ? "text-[var(--ember)]" : "text-[var(--acid)]"} aria-hidden="true">
                  ✦
                </span>
                {it}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Kicker({ n, children, tone = "acid" }: { n: string; children: ReactNode; tone?: "acid" | "ember" }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] md:text-xs">
      <span className={tone === "acid" ? "text-[var(--acid)]" : "text-[var(--ember)]"}>{n}</span>
      <span className="h-px w-8 bg-[var(--line)]" aria-hidden="true" />
      <span className="text-[var(--dim)]">{children}</span>
    </p>
  );
}

function Featured() {
  return (
    <section id="series" className="relative mx-auto max-w-7xl px-5 py-24 md:px-6 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Kicker n="01">Featured</Kicker>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
            Trending right now
          </h2>
        </div>
        <a href="#genres" className="uline hidden font-mono text-xs uppercase tracking-[0.2em] text-[var(--dim)] md:block">
          View all 120K+
        </a>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {SERIES.map((s, i) => (
          <Reveal key={s.id} delay={(i % 3) * 70}>
            <article className="series-card h-full rounded-xl">
              <TiltCard>
                <Cover s={s} />
              </TiltCard>
              <p className="mt-4 line-clamp-2 text-sm leading-snug text-[var(--dim)]">
                {s.blurb}
              </p>
              <div className="mt-2.5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">
                <span className="eq h-2.5 text-[var(--acid)]" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                {s.eps} · 4.8★ avg
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Genres() {
  return (
    <section id="genres" className="border-y border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <Kicker n="02" tone="ember">
            Pick your poison
          </Kicker>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
            Every genre. One earbud.
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {GENRES.map((g) => (
            <a
              key={g.name}
              href="#series"
              className="genre-row group px-1 md:px-3"
              aria-label={`Browse ${g.name} stories`}
            >
              <span className="genre-name font-display text-4xl uppercase tracking-tight md:text-6xl">
                {g.name}
              </span>
              <span className="genre-meta flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)] md:text-xs">
                {g.count} stories
                <svg className="genre-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-6 md:py-24">
      <Reveal className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-6 py-10 md:px-10 md:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className="border-l-2 border-[var(--acid)] pl-5">
              <p className="font-display text-4xl leading-none text-[var(--ink)] md:text-6xl">
                <CountUp to={s.v} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)] md:text-xs">
                {s.label}
              </p>
              {i === 0 && <span className="sr-only">and counting every day</span>}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Showcase() {
  const chips = ["Sleep timer", "Voice skip", "Offline mode", "10× speed", "Car mode"];
  return (
    <section id="listen" className="relative mx-auto max-w-7xl px-5 pb-24 pt-4 md:px-6 md:pb-32 md:pt-10">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Kicker n="03">The player</Kicker>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
            One tap and the room disappears
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--dim)] md:text-lg">
            Sleep timers with a fade, voice skip between scenes, a scrubber you
            can feel. The progress bar keeps rolling even when your phone
            doesn&apos;t — it&apos;s in your ears now.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {chips.map((f) => (
              <span
                key={f}
                className="chip rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--dim)]"
              >
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

function Voices() {
  return (
    <section id="voices" className="border-t border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <Reveal>
          <Kicker n="04" tone="ember">
            Listener voices
          </Kicker>
          <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight md:text-6xl">
            Headphones on. World off.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {QUOTES.map((q, i) => (
            <Reveal key={q.n} delay={i * 80}>
              <figure className="quote-card h-full rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-7">
                <div className="font-display text-5xl leading-none text-[var(--acid)]" aria-hidden="true">
                  “
                </div>
                <blockquote className="mt-3 text-base leading-relaxed text-[var(--ink)] md:text-lg">
                  {q.q}
                </blockquote>
                <figcaption className="mt-7">
                  <p className="font-display tracking-wide">{q.n}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)]">
                    {q.r}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative overflow-hidden py-28 text-center md:py-36">
      {/* breathing glow orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <div
          className="breathe h-[420px] w-[420px] rounded-full"
          style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(216,240,74,0.2), transparent 70%)", filter: "blur(40px)" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 md:px-6">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--ember)] md:text-xs">
            Free forever plan
          </p>
          <h2 className="mt-5 font-display text-6xl uppercase leading-none tracking-tight md:text-8xl">
            Ready to get <span className="text-[var(--acid)]">lost?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-[var(--dim)] md:text-lg">
            Your first season is on us. No card, no catch — just hit play and
            disappear.
          </p>
        </Reveal>
        <Reveal delay={120} className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="#listen" className="btn btn-primary rounded-full px-9 py-4 text-lg font-semibold">
            Start listening
          </a>
          <a href="#series" className="btn btn-ghost rounded-full px-9 py-4 text-lg font-semibold">
            Explore series
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    {
      label: "GREASH on X",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      ),
    },
    {
      label: "GREASH on Instagram",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "GREASH on YouTube",
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="5" width="19" height="14" rx="4" />
          <path d="M10.5 9.5L15 12l-4.5 2.5v-5z" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="border-t border-[var(--line)] py-14">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <BrandMark />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--dim)]">
            Stories you feel in your ears. Cinematic audio fiction since 2026.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[var(--dim)]">
          <a className="uline" href="#series">Series</a>
          <a className="uline" href="#genres">Genres</a>
          <a className="uline" href="#">For creators</a>
          <a className="uline" href="#">Press</a>
          <a className="uline" href="#">Privacy</a>
        </div>
        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href="#"
              aria-label={s.label}
              className="btn grid h-10 w-10 place-items-center rounded-full border border-[var(--line)] text-[var(--dim)]"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--faint)] md:px-6">
        © 2026 Greash Audio Inc. Fiction, frequencies and the occasional missing stop.
      </p>
    </footer>
  );
}

/* ================================================================
   Page
   ================================================================ */
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
      <Voices />
      <CTA />
      <Footer />
    </main>
  );
}
