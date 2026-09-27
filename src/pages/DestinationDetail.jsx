import { lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { destinations } from "../store/useTravelStore";

const Landmark = lazy(() =>
  import("../components/scenes/LandmarkViewer").then((m) => ({
    default: m.LandmarkViewer,
  })),
);

const INCLUDES = [
  "Your personal travel designer",
  "Private transfers and select experiences",
  "Thoughtful stays and breakfast daily",
];

export default function DestinationDetail() {
  const { slug } = useParams();
  const d = destinations.find((x) => x.id === slug) || destinations[0];

  return (
    <>
      {/* ── Hero image ────────────────────────────────────────────── */}
      <section className="relative min-h-[620px] overflow-hidden pt-20">
        <img
          className="absolute inset-0 h-full w-full object-cover
                     scale-100 transition-transform duration-[2s] ease-out
                     hover:scale-105"
          src={d.image}
          alt={d.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />

        <div className="relative mx-auto flex min-h-[540px] max-w-7xl
                        flex-col justify-end px-6 pb-16 lg:px-10">
          {/* Back link */}
          <Link
            to="/destinations"
            className="util-link mb-auto mt-12 text-[10px] uppercase
                       tracking-[.15em] text-white/65 hover:text-gold"
          >
            <ArrowLeft size={14} />
            All journeys
          </Link>

          <p className="eyebrow eyebrow-hover">
            {d.region} · Best {d.season}
          </p>
          <h1 className="serif mt-4 text-5xl sm:text-7xl hover-heading cursor-default">
            {d.name}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/75
                        transition-colors duration-300 hover:text-white/90">
            {d.blurb}
          </p>
        </div>
      </section>

      {/* ── Itinerary ─────────────────────────────────────────────── */}
      <section className="bg-ivory px-6 py-24 text-[#1b1b1b] lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow eyebrow-hover">An itinerary in outline</p>
            <h2 className="serif mt-5 text-4xl section-heading cursor-default">
              A sense of place, unforced.
            </h2>

            <div className="mt-10 space-y-0">
              {[
                "Arrive slowly — settle into your private address",
                "Go beyond the obvious with a local original",
                "A day entirely left open for discovery",
              ].map((x, i) => (
                <motion.div
                  key={x}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .5, delay: i * .1 }}
                  className="itinerary-row grid grid-cols-[50px_1fr]"
                >
                  <span className="text-xs text-[#c9a24b] transition-all duration-300
                                   group-hover:text-[#e0bd71]">
                    0{i + 1}
                  </span>
                  <p className="text-sm transition-colors duration-300 hover:text-black">
                    {x}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <Suspense fallback={<div className="h-64 bg-[#182320]" />}>
              <Landmark id={d.id} />
            </Suspense>
            <p className="mt-3 text-xs text-black/45">
              A small study in place — explore gently.
            </p>
          </div>
        </div>
      </section>

      {/* ── Investment + CTA ──────────────────────────────────────── */}
      <section className="bg-ink px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-3">

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6 }}
          >
            <p className="eyebrow eyebrow-hover">Investment</p>
            <p className="serif mt-4 text-3xl transition-colors duration-300 hover:text-gold">
              {d.price}
            </p>
            <p className="mt-3 text-sm text-white/50">
              Based on two guests, seven nights.
            </p>
          </motion.div>

          {/* Includes */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6, delay: .08 }}
          >
            <p className="eyebrow eyebrow-hover">Included, naturally</p>
            <ul className="mt-5 space-y-3 text-sm text-white/65">
              {INCLUDES.map((x) => (
                <li
                  key={x}
                  className="flex gap-3 transition-colors duration-200 hover:text-white/90"
                >
                  <Check size={16} className="shrink-0 text-gold" />
                  {x}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .6, delay: .16 }}
            className="card-hover p-7"
          >
            <p className="serif text-2xl">Make it yours.</p>
            <p className="mt-3 text-sm leading-6 text-white/55
                          transition-colors duration-300 hover:text-white/75">
              Every departure starts with a conversation.
            </p>
            <Link className="gold-button mt-6" to="/contact">
              Start planning
            </Link>
          </motion.div>

        </div>
      </section>
    </>
  );
}
