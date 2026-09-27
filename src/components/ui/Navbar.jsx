import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../../providers/ScrollProvider';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { stopLenis, startLenis } = useScroll();
  const links = [
    ['Destinations', '/destinations'],
    ['Experiences', '/destinations'],
    ['Our story', '/about'],
    ['Contact', '/contact'],
  ];

  useEffect(() => {
    if (open) stopLenis();
    else startLenis();
    return () => startLenis();
  }, [open, stopLenis, startLenis]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-white/10 backdrop-blur-xl
                  transition-all duration-500
                  ${scrolled ? 'bg-ink/90 shadow-[0_8px_40px_rgba(0,0,0,.4)]' : 'bg-ink/75'}`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo — letter-spacing hover */}
        <Link to="/" className="logo-hover serif text-2xl tracking-tight">
          safarnxt<span className="text-shimmer">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([l, p]) => (
            <NavLink key={l} to={p} className="nav-link">
              {l}
            </NavLink>
          ))}
          <Link to="/contact" className="gold-button !px-4 !py-3">
            Plan your escape
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden transition-transform duration-200 hover:scale-110 hover:text-gold"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t border-white/10 bg-ink px-6 py-6 md:hidden"
          data-lenis-prevent
        >
          {links.map(([l, p]) => (
            <NavLink
              onClick={() => setOpen(false)}
              key={l}
              to={p}
              className="nav-link mb-5 block"
            >
              {l}
            </NavLink>
          ))}
          <Link
            onClick={() => setOpen(false)}
            to="/contact"
            className="gold-button w-full"
          >
            Plan your escape
          </Link>
        </div>
      )}
    </header>
  );
}
