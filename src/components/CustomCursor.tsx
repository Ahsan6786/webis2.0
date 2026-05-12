'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);
      glowPos.current.x = lerp(glowPos.current.x, mouse.current.x, 0.06);
      glowPos.current.y = lerp(glowPos.current.y, mouse.current.y, 0.06);

      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      if (glowRef.current) {
        glowRef.current.style.left = glowPos.current.x + 'px';
        glowRef.current.style.top = glowPos.current.y + 'px';
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseDown = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.6)';
      if (ringRef.current) {
        ringRef.current.style.width = '60px';
        ringRef.current.style.height = '60px';
        ringRef.current.style.borderColor = 'rgba(0, 212, 255, 0.8)';
      }
    };
    const handleMouseUp = () => {
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(0, 212, 255, 0.4)';
      }
    };

    const handleMouseEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '64px';
        ringRef.current.style.height = '64px';
        ringRef.current.style.borderColor = 'rgba(0, 212, 255, 0.7)';
      }
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };
    const handleMouseLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px';
        ringRef.current.style.height = '40px';
        ringRef.current.style.borderColor = 'rgba(0, 212, 255, 0.4)';
      }
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const attachLinkListeners = () => {
      const links = document.querySelectorAll('a, button, [data-cursor="pointer"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', handleMouseEnterLink);
        link.addEventListener('mouseleave', handleMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    rafRef.current = requestAnimationFrame(animate);
    attachLinkListeners();

    const observer = new MutationObserver(attachLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}
