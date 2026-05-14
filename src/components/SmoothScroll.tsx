'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: import('lenis').default | null = null;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        lerp: 0.05, // Ultra smooth
        touchMultiplier: 2,
        infinite: false,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    };

    init();
    return () => {
      lenis?.destroy();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
