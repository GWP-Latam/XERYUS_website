import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { TrendingUp, ShoppingBag, Users, Shield, Package, Crosshair, Eye, DollarSign, ArrowRight, Check } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const solutions = [
  { icon: TrendingUp, title: 'Expandir una empresa', desc: 'Identificar oportunidades de crecimiento y nuevos mercados.', tag: 'Expansión' },
  { icon: ShoppingBag, title: 'Incrementar ventas', desc: 'Comprender qué impulsa la decisión de compra en tu categoría.', tag: 'Ventas' },
  { icon: Users, title: 'Conocer al consumidor', desc: 'Profundizar en hábitos, motivaciones y necesidades de tu audiencia.', tag: 'Consumer Insights' },
  { icon: Shield, title: 'Evaluar una marca', desc: 'Medir el posicionamiento y salud de tu marca frente a la competencia.', tag: 'Brand Equity' },
  { icon: Package, title: 'Lanzar un producto', desc: 'Validar concepto, precio y propuesta antes de salir al mercado.', tag: 'Innovación' },
  { icon: Crosshair, title: 'Analizar competencia', desc: 'Inteligencia competitiva para anticipar movimientos del mercado.', tag: 'Inteligencia' },
  { icon: Eye, title: 'Optimizar experiencia del cliente', desc: 'Diagnosticar puntos de fricción y oportunidades en cada contacto.', tag: 'CX' },
  { icon: DollarSign, title: 'Validar inversiones', desc: 'Reducir la incertidumbre antes de comprometer capital en un proyecto.', tag: 'Inversión' },
];

const capabilities = [
  'Investigación cuantitativa', 'Investigación cualitativa', 'Focus Groups', 'Entrevistas en profundidad',
  'Geomarketing', 'Mystery Shopper', 'Social Listening', 'Modelos estadísticos', 'Inteligencia competitiva',
];

export default function Soluciones({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Soluciones Estratégicas</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            No vendemos metodologías.<br />
            <span className="text-[#fd3838]">Vendemos resultados.</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cada solución está diseñada para resolver un problema empresarial específico. Selecciona el reto que más te preocupa.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <div
                key={i}
                className={`group p-6 border transition-all duration-500 cursor-pointer ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                  ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
                style={{ animationDelay: `${(i % 4) * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center mb-5">
                  <s.icon size={20} className="text-[#fd3838]" />
                </div>
                <span className={`text-[10px] tracking-wider uppercase mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{s.tag}</span>
                <h3 className="text-base font-semibold mb-2 transition-colors group-hover:text-[#fd3838]">{s.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{s.desc}</p>
                <div className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase">
                  Ver solución
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Nuestras capacidades</span>
            <h2 className="section-title text-3xl mt-4">Las metodologías son herramientas, no servicios</h2>
            <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              XERYUS integra múltiples metodologías para diseñar la solución perfecta para cada reto. Estas son nuestras herramientas:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {capabilities.map((cap, i) => (
              <div key={i} className={`flex items-center gap-3 p-4 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
                <Check size={16} className="text-[#fd3838] flex-shrink-0" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿No sabes cuál solución necesitas?</h2>
          <p className={`mb-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Hablemos de tu reto y diseñamos la solución a la medida.</p>
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
