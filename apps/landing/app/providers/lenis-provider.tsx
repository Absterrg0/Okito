'use client'

import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

type LenisOptions = ConstructorParameters<typeof Lenis>[0];

export default function LenisProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: LenisOptions;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : null;
    if (!g || typeof g.requestAnimationFrame !== 'function') return;

    // Respect user preference
    const media: MediaQueryList | null =
      typeof g.matchMedia === 'function' ? g.matchMedia('(prefers-reduced-motion: reduce)') : null;
    if (media?.matches) return;

    // Tuned for mouse wheels to reduce stutter
    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      wheelMultiplier: 1.2, // a bit higher for wheels
      touchMultiplier: 1,
      gestureOrientation: 'vertical',
      ...options,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafIdRef.current = g.requestAnimationFrame(raf);
    };

    rafIdRef.current = g.requestAnimationFrame(raf);

    const handleMediaChange = (ev?: MediaQueryListEvent) => {
      const prefersReduced = media?.matches ?? ev?.matches ?? false;
      if (prefersReduced) {
        if (rafIdRef.current) g.cancelAnimationFrame(rafIdRef.current);
        lenis.stop();
        lenis.destroy();
        lenisRef.current = null;
      }
    };

    if (media) {
      if (typeof media.addEventListener === 'function') media.addEventListener('change', handleMediaChange);
      else if (typeof (media as any).addListener === 'function') (media as any).addListener(handleMediaChange);
    }

    return () => {
      if (media) {
        if (typeof media.removeEventListener === 'function') media.removeEventListener('change', handleMediaChange);
        else if (typeof (media as any).removeListener === 'function') (media as any).removeListener(handleMediaChange);
      }
      if (rafIdRef.current) g.cancelAnimationFrame(rafIdRef.current);
      if (lenisRef.current) {
        lenisRef.current.stop();
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [options]);

  return <>{children}</>;
}