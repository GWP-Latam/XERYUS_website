import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import {
  ArrowRight, Search, Users, Target, TrendingUp, MapPin, Building2,
  Store, BarChart3, Factory, ShoppingBag,
  ClipboardList, Mic, Map, RefreshCw, UserSearch, Crosshair, LineChart,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

const XeryusIsotipo = () => (
  <svg viewBox="0 0 403.22 512" className="w-24 h-auto sm:w-28 md:w-32 lg:w-36 drop-shadow-[0_0_40px_rgba(253,56,56,0.35)]">
    <circle fill="#fd3838" cx="201.61" cy="201.17" r="73.78" />
    <path fill="#fd3838" d="M372.67,511.99h0c-50.47.67-96.49-28.77-117.04-74.87l-16.96-38.04,69.78-31.11,64.22,144.02Z" />
    <path fill="#fd3838" d="M303.88,28.26C207.92-28.49,84.41,2.92,27.91,98.43-28.58,193.94,3.38,317.32,99.34,374.08c43.66,25.82,93.02,33.34,139.18,24.92l-32.8-72.53c-23.07.78-46.62-4.75-67.95-17.36-59.58-35.24-79.33-112.2-44.09-171.77,35.24-59.58,112.2-79.33,171.77-44.09,59.58,35.24,79.33,112.19,44.09,171.77-8.42,14.24-19.25,26.18-31.64,35.67l31.92,70.59c26.06-16.42,48.73-39.05,65.48-67.37,56.49-95.51,24.53-218.89-71.43-275.64Z" />
  </svg>
);

// ── Parámetros de la animación ──────────────────────────────────────────────
const PERIOD = 5.5;
const TRAVEL_END_FRACTION = 0.82;
const PULSE_DURATION_S = 0.4;
const WAVE_EMERGE_S = 0.2;
const ICON_POPIN_S = 0.3;
const ICON_HOLD_S = 1.5;
const ICON_FADE_S = 0.7;
const PULSE_AMPLITUDE = 0.1;
const BASE_RADIUS = 230;

const ORBIT_ICONS = [
  { Icon: Store, angle: 0, radiusRatio: 0.55 },
  { Icon: Users, angle: 40, radiusRatio: 0.2 },
  { Icon: Target, angle: 80, radiusRatio: 0.65 },
  { Icon: MapPin, angle: 120, radiusRatio: 0.05 },
  { Icon: TrendingUp, angle: 160, radiusRatio: 0.75 },
  { Icon: BarChart3, angle: 200, radiusRatio: 0.65 },
  { Icon: Search, angle: 240, radiusRatio: 0.15 },
  { Icon: Building2, angle: 280, radiusRatio: 0.45 },
  { Icon: Factory, angle: 320, radiusRatio: 0.55 },
];

function SonarHero() {
  const waveRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const dims = () => {
      const w = window.innerWidth;
      const maxRadius = w < 768 ? 150 : w < 1280 ? 190 : 230;
      const logoRadius = w < 1024 ? 56 : w < 1280 ? 64 : 72;
      const waveStart = logoRadius * 0.5;
      const minIconRadius = logoRadius + 40;
      return { maxRadius, waveStart, minIconRadius };
    };

    const pulseWindow = PULSE_DURATION_S / PERIOD;
    const emergeWindow = WAVE_EMERGE_S / PERIOD;
    const travelEnd = TRAVEL_END_FRACTION;
    const popIn = ICON_POPIN_S / PERIOD;
    const hold = ICON_HOLD_S / PERIOD;
    const fadeDur = ICON_FADE_S / PERIOD;

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const phase = (t % PERIOD) / PERIOD;
      const { maxRadius, waveStart, minIconRadius } = dims();

      let pulse = 1;
      if (phase < pulseWindow) {
        const p = phase / pulseWindow;
        pulse = 1 + PULSE_AMPLITUDE * Math.sin(p * Math.PI);
      }
      if (logoRef.current) logoRef.current.style.transform = `scale(${pulse})`;

      const wp = Math.min(phase / travelEnd, 1);
      const waveRadius = waveStart + (maxRadius - waveStart) * wp;
      if (waveRef.current) {
        const emerge = Math.min(phase / emergeWindow, 1);
        const vanish = Math.max(1 - wp, 0);
        const gone = phase >= travelEnd ? 0 : 1;
        waveRef.current.style.transform = `translate(-50%, -50%) scale(${waveRadius / BASE_RADIUS})`;
        waveRef.current.style.opacity = String(0.9 * emerge * vanish * gone);
      }

      for (let i = 0; i < ORBIT_ICONS.length; i++) {
        const el = iconRefs.current[i];
        if (!el) continue;
        const { angle, radiusRatio } = ORBIT_ICONS[i];
        const R = minIconRadius + radiusRatio * (maxRadius - minIconRadius);
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * R;
        const y = Math.sin(rad) * R;

        const phaseHit = travelEnd * ((R - waveStart) / (maxRadius - waveStart));
        let sinceHit = phase - phaseHit;
        if (sinceHit < 0) sinceHit += 1;

        let opacity = 0;
        let scale = 0.4;
        if (sinceHit < popIn) {
          const appear = sinceHit / popIn;
          opacity = appear;
          scale = 0.4 + 0.6 * appear;
        } else if (sinceHit < popIn + hold) {
          opacity = 1;
          scale = 1;
        } else if (sinceHit < popIn + hold + fadeDur) {
          const f = (sinceHit - popIn - hold) / fadeDur;
          opacity = 1 - f;
          scale = 1;
        }
        el.style.opacity = String(opacity);
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[480px] flex items-center justify-center">
      <div
        ref={waveRef}
        className="absolute top-1/2 left-1/2 rounded-full pointer-events-none"
        style={{
          width: BASE_RADIUS * 2,
          height: BASE_RADIUS * 2,
          border: '2px solid rgba(253,56,56,0.7)',
          boxShadow: '0 0 22px 2px rgba(253,56,56,0.2)',
          opacity: 0,
          transform: 'translate(-50%, -50%) scale(0)',
          willChange: 'transform, opacity',
        }}
      />

      <div ref={logoRef} className="relative z-20 flex items-center justify-center" style={{ willChange: 'transform' }}>
        <XeryusIsotipo />
      </div>

      {ORBIT_ICONS.map(({ Icon }, index) => (
        <div
          key={index}
          ref={el => { iconRefs.current[index] = el; }}
          className="absolute top-1/2 left-1/2 z-10 rounded-full bg-[#fd3838] shadow-xl shadow-red-900/20 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 pointer-events-none"
          style={{ opacity: 0, transform: 'translate(-50%, -50%)', willChange: 'transform, opacity' }}
        >
          <Icon size={16} className="text-white" />
        </div>
      ))}
    </div>
  );
}

type Audience = 'b2c' | 'b2b';

const content: Record<Audience, { label: string; points: { icon: typeof Search; title: string; desc: string }[] }> = {
  b2c: {
    label: 'Consumidor final (B2C)',
    points: [
      { icon: Search, title: 'Qué hacemos', desc: 'Investigamos a la persona real detrás de cada venta: qué necesita, qué la detiene y qué la convence de elegirte a ti y no a la competencia.' },
      { icon: Users, title: 'Entendemos la demanda', desc: 'Medimos hábitos de consumo, frecuencia de compra y disposición a pagar del consumidor final en la zona que te interesa expandir.' },
      { icon: Target, title: 'Brechas entre oferta y demanda', desc: 'Identificamos qué necesidad del consumidor no está cubriendo nadie todavía: el espacio exacto que tu marca puede ocupar.' },
      { icon: TrendingUp, title: 'Cuánto mercado potencial tienes', desc: 'Dimensionamos cuántos consumidores reales existen en tu zona objetivo y qué tan grande es la oportunidad antes de invertir.' },
      { icon: MapPin, title: 'Competidores en la zona', desc: 'Mapeamos la densidad de competencia directa e indirecta por colonia, para encontrar dónde tienes menos saturación y más terreno para crecer.' },
    ],
  },
  b2b: {
    label: 'Empresa a empresa (B2B)',
    points: [
      { icon: Search, title: 'Qué hacemos', desc: 'Investigamos el proceso de decisión de las empresas que podrían comprarte: quién decide, qué criterios pesan más y qué las haría cambiar de proveedor.' },
      { icon: Building2, title: 'Entendemos la demanda', desc: 'Identificamos qué empresas de tu sector y zona tienen el tamaño, la necesidad y el momento correcto para convertirse en cliente.' },
      { icon: Target, title: 'Brechas entre oferta y demanda', desc: 'Detectamos en qué está fallando la oferta actual del mercado (precio, servicio, tiempos de entrega) que tu empresa puede resolver mejor.' },
      { icon: TrendingUp, title: 'Cuánto mercado potencial tienes', desc: 'Calculamos el tamaño real de tu mercado B2B: número de empresas objetivo, capacidad de compra y ticket promedio esperado.' },
      { icon: MapPin, title: 'Viabilidad logística', desc: 'Evaluamos qué tan viable es operar en la zona: cercanía con proveedores, clientes potenciales y rutas de distribución antes de comprometer inversión.' },
    ],
  },
};

const methods = [
  { icon: ClipboardList, name: 'Encuestas estructuradas', desc: 'Cuestionarios a tu consumidor o cliente potencial para medir intención de compra, hábitos y percepción en la zona.' },
  { icon: Mic, name: 'Entrevistas a profundidad', desc: 'Conversaciones uno a uno con decisores, clientes o expertos locales para entender el porqué detrás del número.' },
  { icon: Users, name: 'Focus groups', desc: 'Sesiones grupales para poner a prueba conceptos, ubicaciones o propuestas de valor antes de invertir.' },
  { icon: Map, name: 'Geomarketing', desc: 'Cruce de datos geográficos, tráfico peatonal y densidad poblacional para encontrar la zona con mayor potencial.' },
  { icon: RefreshCw, name: 'Cruce de datos internos y externos', desc: 'Combinamos tus datos de ventas, CRM o punto de venta con fuentes externas (INEGI, cámaras, estudios sectoriales) para una lectura completa.' },
  { icon: UserSearch, name: 'Mystery shopper y auditoría de zona', desc: 'Evaluación encubierta de la competencia y el entorno comercial en la zona que estás evaluando.' },
  { icon: Crosshair, name: 'Análisis de competencia', desc: 'Mapeo de quién ya está en la zona, con qué oferta y qué tan fuerte es su posición.' },
  { icon: LineChart, name: 'Modelos de proyección', desc: 'Proyectamos escenarios de demanda y retorno esperado según distintas variables de entrada.' },
];

export default function SolucionExpansion({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const [audience, setAudience] = useState<Audience>('b2c');
  const active = content[audience];
  const { ref: methodsRef, inView: methodsInView } = useInView(0.1);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="red-line" />
                <span className="section-label">Expansión</span>
              </div>
              <h1 className="section-title text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
                Expandir tu empresa no debería ser <span className="text-[#fd3838]">una apuesta</span>
              </h1>
              <p className={`text-lg leading-relaxed max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Antes de abrir una sucursal, entrar a una ciudad nueva o lanzar tu producto a otro mercado, necesitas saber si hay demanda real, qué tan saturada está la zona y qué tan grande es la oportunidad. Eso es lo que hacemos.
              </p>
              <button
                onClick={() => onNavigate('contacto')}
                className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
              >
                Solicitar diagnóstico de expansión
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-6">
              <SonarHero />
            </div>
          </div>
        </div>
      </section>

      {/* B2B / B2C selector */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Nuestro enfoque</span>
            <h2 className="section-title text-3xl md:text-4xl mt-4 max-w-2xl mx-auto">
              No entregamos metodologías. Entregamos claridad para expandirte.
            </h2>
            <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              El enfoque cambia según a quién le vendes. Selecciona tu tipo de negocio.
            </p>

            <div className={`inline-flex mt-8 p-1 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              {(['b2c', 'b2b'] as Audience[]).map(key => (
                <button
                  key={key}
                  onClick={() => setAudience(key)}
                  className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300
                    ${audience === key
                      ? 'bg-[#fd3838] text-white'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    }`}
                >
                  {key === 'b2c' ? <ShoppingBag size={14} /> : <Building2 size={14} />}
                  {content[key].label}
                </button>
              ))}
            </div>
          </div>

          <div key={audience} className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {active.points.map((p, i) => (
              <div
                key={p.title}
                style={{ animationDelay: `${i * 0.08}s` }}
                className={`group p-6 border transition-all duration-500 hover:-translate-y-1 animate-fade-in-up
                  ${isDark ? 'bg-black border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
              >
                <div className="w-11 h-11 bg-[#fd3838]/10 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#fd3838]">
                  <p.icon size={18} className="text-[#fd3838] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{p.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo lo conseguimos */}
      <section className="py-20 lg:py-28">
        <div ref={methodsRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="section-label">Cómo lo conseguimos</span>
            <h2 className="section-title text-3xl md:text-4xl mt-4 max-w-2xl mx-auto">
              No hay una sola forma de hacerlo. Hay la forma correcta para tu empresa.
            </h2>
            <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Dependiendo de tu industria, tu presupuesto y qué tan rápido necesitas la respuesta, combinamos distintas herramientas. Desde algo tan directo como una encuesta, hasta cruces de datos más profundos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {methods.map((m, i) => (
              <div
                key={m.name}
                style={{ animationDelay: `${(i % 4) * 0.08}s` }}
                className={`group p-6 border transition-all duration-500 hover:-translate-y-1 ${methodsInView ? 'animate-fade-in-up' : 'opacity-0'}
                  ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-gray-50 border-black/5 hover:shadow-xl'}`}
              >
                <div className="w-11 h-11 bg-[#fd3838]/10 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-[#fd3838]">
                  <m.icon size={18} className="text-[#fd3838] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-sm font-semibold mb-2">{m.name}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 justify-center flex-wrap mt-12">
            <div className="red-line" />
            <p className={`text-sm md:text-base font-medium text-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Diseñamos la combinación exacta para tu reto, no un paquete cerrado.
            </p>
            <div className="red-line" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Listo para expandirte con datos, no con corazonadas?</h2>
          <p className={`mb-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Hablemos de la zona, el mercado o el producto que estás evaluando.
          </p>
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase mx-auto transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
          >
            Solicitar asesoría
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
