import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import {
  TrendingUp, MapPin, ShoppingBag, Users, Package, Shield,
  Crosshair, Eye, DollarSign, Building2, ArrowRight
} from 'lucide-react';

const challenges = [
  { icon: TrendingUp, title: 'Expandir mi empresa', desc: 'Identificar nuevas oportunidades de crecimiento y mercados vírgenes.' },
  { icon: MapPin, title: 'Abrir nuevas sucursales', desc: 'Determinar la ubicación óptima para maximizar el éxito comercial.' },
  { icon: ShoppingBag, title: 'Incrementar ventas', desc: 'Comprender qué impulsa la decisión de compra en tu categoría.' },
  { icon: Users, title: 'Entender a mis clientes', desc: 'Conocer profundamente los hábitos, motivaciones y necesidades de tu audiencia.' },
  { icon: Package, title: 'Lanzar un nuevo producto', desc: 'Validar concepto, precio y propuesta antes de salir al mercado.' },
  { icon: Shield, title: 'Fortalecer mi marca', desc: 'Medir el posicionamiento y la salud de tu marca frente a la competencia.' },
  { icon: Crosshair, title: 'Analizar a mi competencia', desc: 'Inteligencia competitiva para anticipar movimientos del mercado.' },
  { icon: Eye, title: 'Mejorar la experiencia del cliente', desc: 'Diagnosticar puntos de fricción y oportunidades en cada punto de contacto.' },
  { icon: DollarSign, title: 'Validar una inversión', desc: 'Reducir la incertidumbre antes de comprometer capital en un proyecto.' },
  { icon: Building2, title: 'Seleccionar la mejor ubicación', desc: 'Geomarketing y análisis territorial para decisiones inmobiliarias.' },
];

const ITEM_HEIGHT = 60;

export default function Challenges() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.1);
  const [active, setActive] = useState(0);
  const activeChallenge = challenges[active];

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">¿Qué reto deseas resolver?</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 max-w-3xl mx-auto
            ${isDark ? 'text-white' : 'text-black'}`}>
            No vendemos metodologías.<br />
            <span className="text-[#fd3838]">Resolvemos problemas empresariales.</span>
          </h2>
        </div>

        <div
          ref={ref}
          className={`grid lg:grid-cols-12 border transition-all duration-500
            ${isDark ? 'border-white/5' : 'border-black/5'}
            ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Line sidebar */}
          <div className={`lg:col-span-5 relative border-b lg:border-b-0 lg:border-r ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <div
              className="hidden lg:block absolute left-0 w-0.5 bg-[#fd3838] transition-transform duration-500 ease-out"
              style={{ height: ITEM_HEIGHT, transform: `translateY(${active * ITEM_HEIGHT}px)` }}
            />
            {challenges.map((c, i) => (
              <button
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ height: ITEM_HEIGHT }}
                className={`w-full flex items-center gap-4 px-6 text-left border-b last:border-b-0 transition-colors duration-300
                  ${isDark ? 'border-white/5' : 'border-black/5'}
                  ${active === i ? (isDark ? 'bg-white/5' : 'bg-gray-50') : ''}`}
              >
                <c.icon
                  size={18}
                  className={`flex-shrink-0 transition-colors duration-300
                    ${active === i ? 'text-[#fd3838]' : isDark ? 'text-gray-600' : 'text-gray-400'}`}
                />
                <span
                  className={`text-sm font-medium transition-colors duration-300
                    ${active === i ? (isDark ? 'text-white' : 'text-black') : isDark ? 'text-gray-500' : 'text-gray-500'}`}
                >
                  {c.title}
                </span>
                <ArrowRight
                  size={14}
                  className={`ml-auto flex-shrink-0 text-[#fd3838] transition-all duration-300
                    ${active === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
                />
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className={`lg:col-span-7 relative overflow-hidden min-h-[280px] flex items-center ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
            <div key={active} className="w-full p-8 lg:p-14 animate-fade-in">
              <div className={`w-16 h-16 flex items-center justify-center mb-8 ${isDark ? 'bg-[#fd3838]/10' : 'bg-[#fd3838]/5'}`}>
                <activeChallenge.icon size={28} className="text-[#fd3838]" />
              </div>
              <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
                {activeChallenge.title}
              </h3>
              <p className={`text-base lg:text-lg leading-relaxed max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {activeChallenge.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
