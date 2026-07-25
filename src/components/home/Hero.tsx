import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = '253,56,56';
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.4)`;
        ctx.fill();

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color},${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <section className={`relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#ed5c5c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating isotipo in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logos/XERYUS_ISO_ROJO.png"
          alt=""
          className="w-[280px] md:w-[400px] lg:w-[500px] h-auto object-contain opacity-[0.06] animate-float"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8 w-full text-center">
        <div className="flex items-center gap-3 justify-center animate-fade-in-up">
          <div className="red-line" />
          <span className={`text-xs tracking-[0.3em] uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Inteligencia y Análisis de Mercados
          </span>
          <div className="red-line" />
        </div>

        <h1 className={`section-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mt-8 animate-fade-in-up delay-100 ${isDark ? 'text-white' : 'text-black'}`}>
          Hay millones en juego.{' '}
          <span className="text-[#fd3838]">No es momento de adivinar.</span>
        </h1>

        <p className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-8 animate-fade-in-up delay-200 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Más de 30 años ayudando a líderes de industria a encontrar su próxima gran oportunidad.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 animate-fade-in-up delay-300">
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center justify-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
          >
            Solicitar asesoría
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onNavigate('casos')}
            className={`flex items-center justify-center gap-2 border px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95
              ${isDark ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'}`}
          >
            Ver casos de éxito
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className={`w-px h-12 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
      </div>
    </section>
  );
}
