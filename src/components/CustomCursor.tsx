import { useEffect, useRef } from 'react';

const LAG = 0.18;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const icon = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>();

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('custom-cursor-active');

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleLeave = () => {
      dotRef.current?.style.setProperty('opacity', '0');
      iconRef.current?.style.setProperty('opacity', '0');
    };
    const handleEnter = () => {
      dotRef.current?.style.setProperty('opacity', '1');
      iconRef.current?.style.setProperty('opacity', '0.85');
    };
    const handleDown = () => dotRef.current?.classList.add('cursor-dot--active');
    const handleUp = () => dotRef.current?.classList.remove('cursor-dot--active');

    const animate = () => {
      icon.current.x += (mouse.current.x - icon.current.x) * LAG;
      icon.current.y += (mouse.current.y - icon.current.y) * LAG;
      if (iconRef.current) {
        iconRef.current.style.transform = `translate3d(${icon.current.x}px, ${icon.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    document.documentElement.addEventListener('mouseleave', handleLeave);
    document.documentElement.addEventListener('mouseenter', handleEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      document.documentElement.removeEventListener('mouseleave', handleLeave);
      document.documentElement.removeEventListener('mouseenter', handleEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={iconRef} className="cursor-icon">
        <svg viewBox="0 0 403.22 512" width="100%" height="100%">
          <path
            fill="#fd3939"
            d="M372.67,511.99h0c-50.47.67-96.49-28.77-117.04-74.87l-16.96-38.04,69.78-31.11,64.22,144.02Z"
          />
          <path
            fill="#fd3939"
            d="M303.88,28.26C207.92-28.49,84.41,2.92,27.91,98.43-28.58,193.94,3.38,317.32,99.34,374.08c43.66,25.82,93.02,33.34,139.18,24.92l-32.8-72.53c-23.07.78-46.62-4.75-67.95-17.36-59.58-35.24-79.33-112.2-44.09-171.77,35.24-59.58,112.2-79.33,171.77-44.09,59.58,35.24,79.33,112.19,44.09,171.77-8.42,14.24-19.25,26.18-31.64,35.67l31.92,70.59c26.06-16.42,48.73-39.05,65.48-67.37,56.49-95.51,24.53-218.89-71.43-275.64Z"
          />
        </svg>
      </div>
    </>
  );
}
