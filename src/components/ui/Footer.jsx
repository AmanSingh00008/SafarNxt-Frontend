import { ArrowUpRight, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-ink px-6 py-14 lg:px-10">
            <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">

                {/* Brand */}
                <div>
                    <p className="logo-hover serif text-3xl">
                        safarnxt<span className="text-shimmer">.</span>
                    </p>
                    <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
                        Extraordinary travel, designed around the person you are becoming.
                    </p>
                </div>

                {/* Explore links */}
                <div>
                    <p className="eyebrow">Explore</p>
                    <div className="mt-5 flex flex-col gap-2 text-sm text-white/60">
                        {['Destinations', 'Private journeys', 'Travel journal'].map((item) => (
                            <span key={item} className="footer-link w-fit">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <p className="eyebrow">Stay in the know</p>
                    <div className="group mt-5 flex border-b border-white/30 pb-3
                          transition-colors duration-300 hover:border-gold/60">
                        <input
                            className="w-full bg-transparent text-sm outline-none
                         placeholder:text-white/35 transition-all duration-300
                         focus:placeholder:text-white/20"
                            placeholder="Your email address"
                        />
                        <ArrowUpRight
                            className="text-gold arrow-hover cursor-pointer"
                            size={18}
                        />
                    </div>
                </div>

                {/* Social */}
                <div>
                    <p className="eyebrow">Follow along</p>
                    <div className="mt-5 flex gap-4 text-white/65">
                        <Instagram size={18} className="social-hover cursor-pointer" />
                        <Linkedin size={18} className="social-hover cursor-pointer" />
                    </div>
                    <p className="mt-8 text-xs text-white/35">
                        © 2026 Safarnxt. All journeys considered.
                    </p>
                </div>

            </div>
        </footer>
    );
}
