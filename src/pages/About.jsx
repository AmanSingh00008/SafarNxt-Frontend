import { motion } from 'framer-motion';

const values = [
    ['Curiosity', 'We look closer, longer.'],
    ['Care', 'For our guests and our hosts.'],
    ['Restraint', 'Luxury with nothing to prove.'],
];

export default function About() {
    return (
        <>
            {/* Hero */}
            <section className="bg-ink px-6 pb-24 pt-40 lg:px-10">
                <div className="mx-auto max-w-4xl">
                    <p className="eyebrow eyebrow-hover">The story</p>
                    <h1 className="serif mt-6 text-5xl leading-[1.03] sm:text-7xl hover-heading cursor-default">
                        We believe travel should leave you more awake to your own life.
                    </h1>
                </div>
            </section>

            {/* Philosophy */}
            <section className="bg-ivory px-6 py-24 text-[#1b1b1b] lg:px-10">
                <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
                    <p className="serif text-3xl leading-snug section-heading cursor-default">
                        Safarnxt is an independent travel house for people who value
                        discernment over excess.
                    </p>
                    <div className="space-y-6 text-sm leading-7 text-black/60">
                        <p className="transition-colors duration-300 hover:text-black/80">
                            We pair deep regional knowledge with an instinct for the moments
                            that cannot be listed in a brochure: the right table, an unopened
                            door, the silence between stops.
                        </p>
                        <p className="transition-colors duration-300 hover:text-black/80">
                            We travel with care for the places that receive us, working with
                            local hosts and choosing lower-impact ways to move wherever
                            possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-[#18302e] px-6 py-24 lg:px-10">
                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                    {values.map(([title, blurb], i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: .6, delay: i * .12 }}
                            className="value-card"
                        >
                            <p className="eyebrow">0{i + 1}</p>
                            <h2 className="serif mt-5 text-3xl transition-colors duration-300 hover:text-gold">
                                {title}
                            </h2>
                            <p className="mt-3 text-sm text-white/60 transition-colors duration-300 hover:text-white/80">
                                {blurb}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </>
    );
}
