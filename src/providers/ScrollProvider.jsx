import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenisEase = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

const ScrollContext = createContext(null);

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('useScroll must be used within ScrollProvider');
  return ctx;
}

export function ScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const location = useLocation();

  const refreshScroll = useCallback(() => {
    lenisRef.current?.resize();
    ScrollTrigger.refresh();
  }, []);

  const stopLenis = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const startLenis = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: lenisEase,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTicker);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => refreshScroll();
    window.addEventListener('load', onLoad);

    const onResize = () => refreshScroll();
    window.addEventListener('resize', onResize);

    document.fonts?.ready?.then(() => refreshScroll());
    requestAnimationFrame(() => refreshScroll());

    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('resize', onResize);
      gsap.ticker.remove(onTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [refreshScroll]);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = requestAnimationFrame(() => refreshScroll());
    return () => cancelAnimationFrame(id);
  }, [location.pathname, refreshScroll]);

  return (
    <ScrollContext.Provider value={{ stopLenis, startLenis, refreshScroll, lenisRef }}>
      {children}
    </ScrollContext.Provider>
  );
}
