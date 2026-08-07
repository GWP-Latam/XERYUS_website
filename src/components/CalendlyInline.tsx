import { useEffect, useRef, useState } from 'react';
import { buildCalendlyUrl, buildCalendlyPrefill } from '@/lib/calendly';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
      }) => void;
    };
  }
}

interface CalendlyInlineProps {
  isDark: boolean;
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  height?: number;
  onBooked?: () => void;
}

export default function CalendlyInline({
  isDark,
  name, email, phone,
  company = '', message = '',
  height = 700,
  onBooked,
}: CalendlyInlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryInit = () => {
      if (cancelled) return;
      const calendly = window.Calendly;
      if (!calendly || !containerRef.current) {
        if (attempts++ < 50) setTimeout(tryInit, 100);
        return;
      }

      const url = buildCalendlyUrl();
      const prefill = buildCalendlyPrefill(name, email, phone, company, message);

      containerRef.current.innerHTML = '';
      calendly.initInlineWidget({ url, parentElement: containerRef.current, prefill });
    };

    tryInit();

    const handleMsg = (e: MessageEvent) => {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_type_viewed') setLoaded(true);
      if (e.data?.event === 'calendly.event_scheduled' && !bookedRef.current) {
        bookedRef.current = true;
        onBooked?.();
      }
    };

    window.addEventListener('message', handleMsg);
    return () => {
      cancelled = true;
      window.removeEventListener('message', handleMsg);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <div ref={containerRef} className="w-full h-full" />

      {!loaded && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 ${isDark ? 'bg-black' : 'bg-white'}`}>
          <div
            className="w-8 h-8 rounded-full border-[3px] animate-spin"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', borderTopColor: '#fd3838' }}
          />
          <p className={`text-xs tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Cargando disponibilidad…
          </p>
        </div>
      )}
    </div>
  );
}
