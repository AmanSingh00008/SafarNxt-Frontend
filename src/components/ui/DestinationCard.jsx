import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DestinationCard({ destination, index = 0 }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .7, delay: index * .08 }}
            whileHover={{ y: -6 }}
            className="group cursor-pointer"
        >
            <Link to={`/destinations/${destination.id}`} className="block">
                {/* Image with zoom + shimmer overlay */}
                <div className="img-hover-wrap image-fade aspect-[4/5] bg-white/5">
                    <img
                        src={destination.image}
                        alt={destination.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Text row */}
                <div className="flex items-start justify-between pt-5">
                    <div>
                        <p className="eyebrow eyebrow-hover">
                            {destination.region} · {destination.type}
                        </p>
                        <h3 className="serif mt-2 text-2xl transition-colors duration-300 group-hover:text-gold">
                            {destination.name}
                        </h3>
                        <p className="mt-2 text-sm text-white/50 transition-colors duration-300 group-hover:text-white/70">
                            {destination.price}
                        </p>
                    </div>

                    {/* Arrow — bounces diagonally on card hover */}
                    <ArrowUpRight
                        className="mt-3 text-gold transition-transform duration-300
                       group-hover:translate-x-1 group-hover:-translate-y-1
                       group-hover:scale-110"
                    />
                </div>
            </Link>
        </motion.article>
    );
}
