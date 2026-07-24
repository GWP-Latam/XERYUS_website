import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { TrendingUp, Users, MapPin, Building2, ArrowRight, ChevronDown } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const filters = ['Todos', 'Expansión', 'Inteligencia Competitiva', 'Factibilidad Inmobiliaria', 'Consumidor', 'Marca'];

const cases = [
  {
    tag: 'Expansión', icon: TrendingUp,
    reto: 'Una cadena de retail buscaba expandirse a 3 nuevas ciudades sin certeza de demanda.',
    investigacion: 'Estudio híbrido cuantitativo-cualitativo con geomarketing en 3 ciudades objetivo. Muestra de 1,200 entrevistas + 6 focus groups.',
    hallazgos: 'Se identificó que 2 de las 3 ciudades tenían demanda suficiente, pero la tercera presentaba sobreoferta. El precio óptimo era 12% menor al proyectado.',
    resultados: '+47% ventas en el primer trimestre post-apertura. Ahorro de $2.3M al evitar la apertura en la tercera ciudad.',
  },
  {
    tag: 'Inteligencia Competitiva', icon: Users,
    reto: 'Una marca de consumo necesitaba entender la pérdida de participación de mercado.',
    investigacion: 'Mystery shopper en 40 puntos de venta + análisis competitivo de 5 competidores + social listening de 3 meses.',
    hallazgos: 'La pérdida no era de producto, sino de experiencia en punto de venta. Los competidores tenían mejor capacitación de personal.',
    resultados: 'Recuperación del 18% de la participación en 6 meses tras implementar programa de capacitación.',
  },
  {
    tag: 'Factibilidad Inmobiliaria', icon: Building2,
    reto: 'Un desarrollador inmobiliario requería validar la viabilidad de un proyecto residencial de 200 unidades.',
    investigacion: 'Estudio de factibilidad con análisis de demanda, oferta, precio y absorción. Modelo financiero incluido.',
    hallazgos: 'El precio proyectado era 15% superior al mercado. Se identificó un segmento no atendido de mayor tamaño.',
    resultados: 'Venta anticipada del 62% del proyecto antes de la entrega. Ajuste de mix de producto aumentó el ROI en 23%.',
  },
  {
    tag: 'Consumidor', icon: Users,
    reto: 'Una marca de tecnología necesitaba entender por qué los usuarios no renovaban su suscripción.',
    investigacion: 'Entrevistas en profundidad a 30 usuarios + encuesta a 2,500 suscriptores + análisis de journey.',
    hallazgos: 'El problema no era el precio, sino la falta de onboarding. Los usuarios no descubrían el 60% de las funcionalidades.',
    resultados: 'Reducción del 34% en la tasa de cancelación tras rediseñar el onboarding.',
  },
  {
    tag: 'Marca', icon: TrendingUp,
    reto: 'Una empresa B2B buscaba reposicionar su marca para atraer a un público más joven.',
    investigacion: 'Brand tracking + focus groups con decisores B2B millennials + análisis de competencia.',
    hallazgos: 'La marca percibía como "tradicional" pero confiable. El reto era modernizar sin perder confianza.',
    resultados: 'Incremento del 28% en recall de marca y 40% en leads cualificados tras el reposicionamiento.',
  },
  {
    tag: 'Expansión', icon: MapPin,
    reto: 'Una empresa de food service quería entrar al mercado de comida para llevar sin conocer la demanda.',
    investigacion: 'Estudio de demanda con 1,500 encuestas + análisis de geomarketing en 15 zonas + prueba de concepto.',
    hallazgos: 'Se identificaron 4 zonas con alta demanda no atendida. El concepto requería ajustes en empaque y precio.',
    resultados: 'Apertura exitosa en 3 zonas. ROI positivo en mes 4 vs. mes 8 proyectado.',
  },
];

export default function Casos({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [openCase, setOpenCase] = useState<number | null>(0);
  const { ref, inView } = useInView(0.1);

  const filtered = activeFilter === 'Todos' ? cases : cases.filter(c => c.tag === activeFilter);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Casos de éxito</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            Historias de decisiones que <span className="text-[#fd3838]">dieron resultado</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cada caso cuenta la historia completa: el problema, la investigación, los hallazgos y los resultados medibles.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className={`py-8 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase border transition-all duration-200
                  ${activeFilter === f
                    ? 'bg-[#fd3838] text-white border-[#fd3838]'
                    : isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-20">
        <div ref={ref} className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-4">
            {filtered.map((c, i) => (
              <div
                key={i}
                className={`border transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                  ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <button
                  onClick={() => setOpenCase(openCase === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                      <c.icon size={20} className="text-[#fd3838]" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-wider uppercase text-[#fd3838] block mb-1">{c.tag}</span>
                      <h3 className="text-base font-semibold max-w-xl">{c.reto}</h3>
                    </div>
                  </div>
                  <ChevronDown size={20} className={`text-[#fd3838] transition-transform duration-300 flex-shrink-0 ${openCase === i ? 'rotate-180' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${openCase === i ? 'max-h-screen' : 'max-h-0'}`}>
                  <div className="px-6 pb-6 space-y-5">
                    <div className={`pl-16 space-y-5`}>
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[#fd3838] mb-2">Investigación realizada</div>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.investigacion}</p>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[#fd3838] mb-2">Hallazgos</div>
                        <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.hallazgos}</p>
                      </div>
                      <div className={`p-4 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                        <div className="text-[10px] tracking-[0.2em] uppercase text-[#fd3838] mb-2">Resultados</div>
                        <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>{c.resultados}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Tu caso podría ser el siguiente?</h2>
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase mx-auto transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
          >
            Hablemos de tu proyecto
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
