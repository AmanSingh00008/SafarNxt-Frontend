import { lazy, Suspense, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { destinations, useTravelStore } from "../store/useTravelStore";
import { DestinationCard } from "../components/ui/DestinationCard";
import { MountainScrollScene } from "../components/scenes/MountainScrollScene";
const Globe = lazy(() =>
  import("../components/globe/Globe").then((m) => ({ default: m.Globe })),
);

// ── Hero Text Content ─────────────────────────────────────────────────────────
// Rendered twice: once "sharp" (base layer) and once inside a masked "blurred"
// overlay layer. Moving the mouse creates an inner-blur / outer-clear lens effect.
function HeroTextContent() {
  return (
    <>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="eyebrow"
      >
        A different way to move through the world
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1 }}
        className="serif mt-6 text-5xl leading-[.97] tracking-tight sm:text-7xl"
      >
        Journeys that <em className="font-normal text-gold">change</em>{" "}
        the way you see.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-7 max-w-md text-[15px] leading-7 text-white/60"
      >
        Private travel shaped with uncommon access, impeccable instinct,
        and room to breathe.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-9 flex gap-3"
      >
        <Link to="/destinations" className="gold-button">
          Explore journeys
        </Link>
        <a
          href="#philosophy"
          className="flex items-center px-4 text-[10px] uppercase tracking-[.16em] text-white/65"
        >
          Our philosophy <ArrowDown size={15} className="ml-2" />
        </a>
      </motion.div>
    </>
  );
}

export default function Home() {
  const selected = useTravelStore((s) => s.selectedDestination);

  // ── Lens state ────────────────────────────────────────────────────────────
  // mouse: position relative to the hero section (px)
  // active: whether the mouse is currently inside the hero
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [lensActive, setLensActive] = useState(false);

  const LENS_RADIUS = 190; // px – radius of the blur spotlight

  const handleMouseMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  // Radial mask for the blurred overlay:
  //   • black (opaque)  inside the lens  → blurred text shows through the mask
  //   • transparent     outside the lens → sharp base layer shows
  const maskStyle = lensActive
    ? {
      maskImage: `radial-gradient(circle ${LENS_RADIUS}px at ${mouse.x}px ${mouse.y}px, black 55%, transparent 100%)`,
      WebkitMaskImage: `radial-gradient(circle ${LENS_RADIUS}px at ${mouse.x}px ${mouse.y}px, black 55%, transparent 100%)`,
    }
    : {
      maskImage: "none",
      WebkitMaskImage: "none",
      opacity: 0,
    };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="grain relative min-h-[780px] overflow-hidden bg-ink pt-20"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setLensActive(true)}
        onMouseLeave={() => setLensActive(false)}
      >
        {/* 3-D Globe canvas */}
        <div className="absolute inset-0 hidden lg:block">
          <Suspense
            fallback={
              <div className="h-full bg-[radial-gradient(circle_at_65%_45%,#18343a,transparent_38%)]" />
            }
          >
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 38 }}
              dpr={[1, 1.5]}
              gl={{ antialias: false }}
            >
              <Globe />
            </Canvas>
          </Suspense>
        </div>

        <div className="mx-auto grid min-h-[700px] max-w-7xl items-center px-6 py-24 lg:px-10">
          {/* ── Text area ── */}
          <div className="relative z-10 max-w-xl">

            {/* BASE LAYER – always sharp, visible outside the lens */}
            <div className="select-none">
              <HeroTextContent />
            </div>

            {/* BLURRED OVERLAY – masked to show only inside the lens circle */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                ...maskStyle,
                filter: lensActive ? "blur(6px)" : "none",
                transition: "opacity 0.25s ease",
                opacity: lensActive ? 1 : 0,
              }}
            >
              {/* Slight dark veil inside the lens for depth */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: lensActive
                    ? `radial-gradient(circle ${LENS_RADIUS}px at ${mouse.x}px ${mouse.y}px, rgba(0,0,0,0.18) 0%, transparent 100%)`
                    : "none",
                }}
              />
              <HeroTextContent />
            </div>
          </div>

          {/* "Now in focus" card */}
          <div className="focus-card relative z-20 mt-16 max-w-[260px] rounded-2xl border border-white/10 bg-ink/80 p-5 backdrop-blur-md lg:absolute lg:right-16 lg:bottom-24 lg:mt-0">
            <p className="eyebrow eyebrow-hover">Now in focus</p>
            <p className="serif mt-3 text-xl transition-colors duration-300 hover:text-gold">{selected.name}</p>
            <p className="mt-2 text-xs leading-5 text-white/50">
              {selected.blurb}
            </p>
            <Link
              to={`/destinations/${selected.id}`}
              className="util-link mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[.14em] text-gold"
            >
              View journey <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section
        id="philosophy"
        className="bg-ivory px-6 py-28 text-[#1b1b1b] lg:px-10"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="eyebrow eyebrow-hover">The Safarnxt standard</p>
            <h2 className="serif mt-5 text-4xl leading-tight sm:text-5xl section-heading cursor-default">
              Luxury that feels like it was always yours.
            </h2>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            <p className="text-sm leading-7 text-black/60">
              We begin with the feeling you want to bring home. Then we design
              the route, the rhythm and the rare moments around it.
            </p>
            <p className="text-sm leading-7 text-black/60">
              No fixed departures. No borrowed itineraries. Only a journey with
              a point of view — yours.
            </p>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────────────────── */}
      <section className="bg-ink px-6 py-28 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow eyebrow-hover">Selected journeys</p>
              <h2 className="serif mt-4 text-4xl sm:text-5xl section-heading cursor-default">
                Go somewhere meaningful.
              </h2>
            </div>
            <Link
              to="/destinations"
              className="hidden text-xs uppercase tracking-[.14em] text-gold sm:block"
            >
              All destinations →
            </Link>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <DestinationCard destination={d} index={i} key={d.id} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MOUNTAIN SCROLL ──────────────────────────────────────────────── */}
      <section className="relative bg-ink">
        <MountainScrollScene />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <p className="eyebrow eyebrow-hover">Wild, thoughtfully close</p>
            <h2 className="serif mt-4 max-w-xl text-4xl sm:text-5xl section-heading cursor-default">
              The world still has places that take your breath away.
            </h2>
          </div>
        </div>
      </section>

      {/* ── TRAVEL JOURNAL ───────────────────────────────────────────────── */}
      <section className="bg-ivory px-6 py-20 text-[#1b1b1b] lg:px-10 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-center lg:max-w-xl">
          <p className="eyebrow eyebrow-hover">Travel journal</p>
          <h2 className="serif mt-5 text-4xl section-heading cursor-default">The art of being unhurried.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-black/60 transition-colors duration-300 hover:text-black/80">
            From island mornings to quiet mountain crossings, our field notes
            make space for the details that define a place.
          </p>
          <a className="mt-8 text-xs uppercase tracking-[.14em] text-[#2e4a46]
                        transition-all duration-300 hover:text-[#C9A24B] hover:tracking-widest cursor-pointer">
            Read the journal →
          </a>
        </div>
      </section>
    </>
  );
}
