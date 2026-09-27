import { BookingForm } from '../components/ui/BookingForm';

export default function Contact() {
    return (
        <section className="min-h-screen bg-ivory px-6 pb-28 pt-40 text-[#1b1b1b] lg:px-10">
            <div className="mx-auto max-w-5xl">
                <p className="eyebrow eyebrow-hover">Begin here</p>

                <div className="mt-5 grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
                    <div>
                        <h1 className="serif text-5xl leading-tight hover-heading cursor-default">
                            Tell us where your mind is wandering.
                        </h1>
                        <p className="mt-6 text-sm leading-7 text-black/55 transition-colors duration-300 hover:text-black/75">
                            A Safarnxt travel designer will shape the first conversation
                            around you — not a pre-made package.
                        </p>
                        <p className="mt-12 text-sm leading-7 text-black/55">
                            New Delhi · London · Everywhere
                            <br />
                            <a
                                href="mailto:hello@safarnxt.com"
                                className="text-[#2e4a46] transition-all duration-300
                           hover:text-[#C9A24B] hover:tracking-wide"
                            >
                                hello@safarnxt.com
                            </a>
                        </p>
                    </div>

                    <BookingForm />
                </div>
            </div>
        </section>
    );
}
