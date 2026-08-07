import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import {
  ArrowRight, Search, Users, Target, TrendingUp, MapPin, BarChart3, Shield, Crosshair,
  UserSearch, PackageSearch, Radio, FileSearch, ClipboardList, Map, LineChart,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

const XeryusIsotipo = () => (
  <svg viewBox="0 0 403.22 512" className="w-16 h-auto sm:w-20 md:w-24 drop-shadow-[0_0_30px_rgba(253,56,56,0.4)]">
    <circle fill="#fd3838" cx="201.61" cy="201.17" r="73.78" />
    <path fill="#fd3838" d="M372.67,511.99h0c-50.47.67-96.49-28.77-117.04-74.87l-16.96-38.04,69.78-31.11,64.22,144.02Z" />
    <path fill="#fd3838" d="M303.88,28.26C207.92-28.49,84.41,2.92,27.91,98.43-28.58,193.94,3.38,317.32,99.34,374.08c43.66,25.82,93.02,33.34,139.18,24.92l-32.8-72.53c-23.07.78-46.62-4.75-67.95-17.36-59.58-35.24-79.33-112.2-44.09-171.77,35.24-59.58,112.2-79.33,171.77-44.09,59.58,35.24,79.33,112.19,44.09,171.77-8.42,14.24-19.25,26.18-31.64,35.67l31.92,70.59c26.06-16.42,48.73-39.05,65.48-67.37,56.49-95.51,24.53-218.89-71.43-275.64Z" />
  </svg>
);

// ── Parámetros del radar ─────────────────────────────────────────────────────
const SWEEP_PERIOD_S = 6;
const AFTERGLOW_DEG = 55;

const BLIPS = [
  { label: 'Competidor A', angle: 15, radiusRatio: 0.55 },
  { label: 'Competidor B', angle: 70, radiusRatio: 0.85 },
  { label: 'Competidor C', angle: 130, radiusRatio: 0.35 },
  { label: 'Competidor D', angle: 190, radiusRatio: 0.7 },
  { label: 'Competidor E', angle: 245, radiusRatio: 0.5 },
  { label: 'Competidor F', angle: 300, radiusRatio: 0.88 },
  { label: 'Competidor G', angle: 335, radiusRatio: 0.25 },
];

function RadarHero() {
  const sweepRef = useRef<HTMLDivElement>(null);
  const blipRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const radius = () => {
      const w = window.innerWidth;
      return w < 768 ? 130 : w < 1280 ? 165 : 200;
    };

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      const sweepAngle = ((t % SWEEP_PERIOD_S) / SWEEP_PERIOD_S) * 360;
      const R = radius();

      if (sweepRef.current) {
        sweepRef.current.style.transform = `rotate(${sweepAngle}deg)`;
      }

      for (let i = 0; i < BLIPS.length; i++) {
        const el = blipRefs.current[i];
        if (!el) continue;
        const { angle, radiusRatio } = BLIPS[i];
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * R * radiusRatio;
        const y = Math.sin(rad) * R * radiusRatio;

        let delta = sweepAngle - angle;
        delta = ((delta % 360) + 360) % 360;

        let intensity = 0.12;
        let scale = 0.7;
        if (delta < AFTERGLOW_DEG) {
          const f = 1 - delta / AFTERGLOW_DEG;
          intensity = 0.12 + 0.88 * f;
          scale = 0.7 + 0.5 * f;
        }
        el.style.opacity = String(intensity);
        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[360px] md:h-[420px] lg:h-[460px] flex items-center justify-center">
      {/* Radar rings */}
      {[0.35, 0.65, 1].map(r => (
        <div
          key={r}
          className="absolute rounded-full border border-dashed border-[#fd3838]/20"
          style={{ width: `${400 * r}px`, height: `${400 * r}px` }}
        />
      ))}

      {/* Rotating sweep */}
      <div
        ref={sweepRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background: 'conic-gradient(from 0deg, rgba(253,56,56,0.35), transparent 70deg, transparent 360deg)',
          willChange: 'transform',
        }}
      />

      {/* Center isotipo */}
      <div className="relative z-20 flex items-center justify-center">
        <XeryusIsotipo />
      </div>

      {/* Blips */}
      {BLIPS.map((b, index) => (
        <div
          key={b.label}
          ref={el => { blipRefs.current[index] = el; }}
          className="absolute top-1/2 left-1/2 z-10 pointer-events-none flex flex-col items-center gap-1.5"
          style={{ opacity: 0.12, transform: 'translate(-50%, -50%)', willChange: 'transform, opacity' }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#fd3838] shadow-lg shadow-red-900/40" />
          <span className="text-[9px] font-semibold tracking-wide uppercase text-[#fd3838] whitespace-nowrap">{b.label}</span>
        </div>
      ))}
    </div>
  );
}

type Focus = 'directa' | 'indirecta';

const content: Record<Focus, { label: string; points: { icon: typeof Search; title: string; desc: string }[] }> = {
  directa: {
    label: 'Competencia directa',
    points: [
      { icon: Search, title: 'Qué hacemos', desc: 'Identificamos y evaluamos a quienes venden exactamente lo mismo que tú, en tu misma categoría y zona de influencia.' },
      { icon: BarChart3, title: 'Precio y oferta', desc: 'Comparamos precio, portafolio, promociones y puntos de venta para saber exactamente dónde estás parado frente a ellos.' },
      { icon: Users, title: 'Cómo te perciben frente a ellos', desc: 'Medimos qué tan fuerte es tu marca comparada con la de tus competidores directos, en la mente del mismo consumidor.' },
      { icon: MapPin, title: 'Su presencia en la zona', desc: 'Mapeamos dónde están ubicados, cuántos puntos de venta tienen y qué tan saturada está la categoría.' },
      { icon: TrendingUp, title: 'Sus movimientos recientes', desc: 'Damos seguimiento a lanzamientos, campañas y cambios de estrategia para que no te tomen por sorpresa.' },
    ],
  },
  indirecta: {
    label: 'Competencia indirecta',
    points: [
      { icon: Search, title: 'Qué hacemos', desc: 'Identificamos a quienes resuelven la misma necesidad de tu cliente de una forma distinta, aunque no vendan lo mismo que tú.' },
      { icon: Target, title: 'Quién más compite por el mismo gasto', desc: 'Detectamos sustitutos y alternativas que le quitan presupuesto a tu categoría, no solo a tu marca.' },
      { icon: Users, title: 'Por qué te elegirían a ti', desc: 'Entendemos qué motiva a un cliente a resolver su necesidad de otra forma, y qué tendría que pasar para que te elija a ti.' },
      { icon: BarChart3, title: 'Qué tan grande es la amenaza', desc: 'Dimensionamos qué tanto de tu mercado potencial se está yendo hacia alternativas indirectas.' },
      { icon: Shield, title: 'Cómo diferenciarte', desc: 'Identificamos el argumento que solo tú puedes ofrecer frente a esas alternativas.' },
    ],
  },
};

const methods = [
  { icon: UserSearch, name: 'Mystery shopper', desc: 'Evaluación encubierta de la experiencia, precios y servicio de tus competidores en punto de venta.' },
  { icon: PackageSearch, name: 'Auditoría de anaquel', desc: 'Verificamos disponibilidad, exhibición y participación de espacio frente a la competencia en tienda.' },
  { icon: Radio, name: 'Escucha social', desc: 'Monitoreo de conversaciones, menciones y sentimiento hacia tu marca y las de tus competidores en redes.' },
  { icon: Crosshair, name: 'Benchmarking competitivo', desc: 'Comparación sistemática de producto, precio, plaza y promoción frente a los jugadores clave del mercado.' },
  { icon: FileSearch, name: 'Desk research', desc: 'Revisión de fuentes públicas: reportes de industria, prensa, registros y estudios sectoriales.' },
  { icon: Map, name: 'Geomarketing', desc: 'Ubicamos a tus competidores en el mapa para identificar zonas de sobreoferta y espacios libres.' },
  { icon: ClipboardList, name: 'Encuestas de percepción de marca', desc: 'Medimos cómo te comparan los consumidores frente a tus competidores directos e indirectos.' },
  { icon: LineChart, name: 'Análisis de pricing', desc: 'Seguimiento de precios y promociones de la competencia a lo largo del tiempo.' },
];

export default function SolucionCompetencia({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const [focus, setFocus] = useState<Focus>('directa');
  const active = content[focus];
  const { ref: methodsRef, inView: methodsInView } = useInView(0.1);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="red-line" />
                <span className="section-label">Inteligencia competitiva</span>
              </div>
              <h1 className="section-title text-3xl md:text-4xl lg:text-5xl leading-[1.15]">
                Lo que no ves de tu competencia es lo que <span className="text-[#fd3838]">más te cuesta</span>
              </h1>
              <p className={`text-lg leading-relaxed max-w-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                No basta con saber quién más vende lo tuyo. Hay que entender qué están haciendo bien, dónde son vulnerables y quién más le está quitando presupuesto a tu categoría sin que lo notes.
              </p>
              <button
                onClick={() => onNavigate('contacto')}
                className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
              >
                Solicitar análisis de competencia
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="lg:col-span-6">
              <RadarHero />
            </div>
          </div>
        </div>
      </section>

      {/* Directa / Indirecta selector */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Nuestro enfoque</span>
            <h2 className="section-title text-3xl md:text-4xl mt-4 max-w-2xl mx-auto">
              No todos tus competidores venden lo mismo que tú.
            </h2>
            <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              El análisis cambia según de dónde viene la amenaza. Selecciona el tipo de competencia que te interesa.
            </p>

            <div className={`inline-flex mt-8 p-1 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
              {(['directa', 'indirecta'] as Focus[]).map(key => (
                <button
                  key={key}
                  onClick={() => setFocus(key)}
                  className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300
                    ${focus === key
                      ? 'bg-[#fd3838] text-white'
                      : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    }`}
                >
                  {key === 'directa' ? <Crosshair size={14} /> : <Target size={14} />}
                  {content[key].label}
                </button>
              ))}
            </div>
          </div>

          <div key={focus} className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
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
              Vigilar a tu competencia no es una sola herramienta, es un sistema.
            </h2>
            <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Combinamos observación directa, datos públicos y percepción del consumidor para armar el panorama completo, según qué tan profundo necesites ver.
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
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Quieres saber qué está haciendo tu competencia?</h2>
          <p className={`mb-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Hablemos de tu categoría y del panorama competitivo que necesitas ver.
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
