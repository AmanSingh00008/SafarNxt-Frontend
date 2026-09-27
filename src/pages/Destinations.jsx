import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { destinations } from "../store/useTravelStore";
import { DestinationCard } from "../components/ui/DestinationCard";

const FILTERS = [
  ["All", "region"],
  ["Europe", "region"],
  ["Asia", "region"],
  ["India", "region"],
  ["Americas", "region"],
  ["Coastal", "type"],
  ["Culture", "type"],
  ["Adventure", "type"],
];

export default function Destinations() {
  const [region, setRegion] = useState("All");
  const [type, setType] = useState("All");

  const filtered = useMemo(
    () =>
      destinations.filter(
        (d) =>
          (region === "All" || d.region === region) &&
          (type === "All" || d.type === type),
      ),
    [region, type],
  );

  return (
    <section className="min-h-screen bg-ink px-6 pb-28 pt-40 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="eyebrow eyebrow-hover">The collection</p>
        <h1 className="serif mt-5 max-w-2xl text-5xl leading-tight sm:text-6xl hover-heading cursor-default">
          Places with a lasting effect.
        </h1>

        {/* Filter bar */}
        <div className="mt-12 flex flex-wrap gap-3 border-y border-white/10 py-5">
          {FILTERS.map(([label, kind]) => {
            const isActive = (kind === "region" ? region : type) === label;
            return (
              <button
                key={label}
                onClick={() =>
                  kind === "region" ? setRegion(label) : setType(label)
                }
                className={`filter-btn ${isActive ? "active" : ""}`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <motion.div
          layout
          className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
