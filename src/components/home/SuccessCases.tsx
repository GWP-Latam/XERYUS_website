import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { TrendingUp, MapPin, Users } from 'lucide-react';

const cases = [
  {
    icon: TrendingUp,
    reto: 'Una cadena de retail buscaba expandirse a 3 nuevas ciudades sin certeza de demanda.',
    solucion: 'Diseñamos un estudio híbrido cuantitativo-cualitativo con geomarketing para identificar zonas de oportunidad.',
    resultado: '+47% ventas en el primer trimestre post-apertura.',
    tag: 'Expansión',
  },
  {
    icon: Users,
    reto: 'Una marca de consumo necesitaba entender la pérdida de participación de mercado.',
    solucion: 'Investigación de experiencia del cliente + análisis competitivo en 12 puntos de venta.',
    resultado: 'Recuperación del 18% de la participación en 6 meses.',
    tag: 'Inteligencia Competitiva',
  },
  {
    icon: MapPin,
    reto: 'Un desarrollador inmobiliario requería validar la viabilidad de un proyecto residencial.',
    solucion: 'Estudio de factibilidad inmobiliaria con análisis de demanda, oferta y precio óptimo.',
    resultado: 'Venta anticipada del 62% del proyecto antes de la entrega.',
    tag: 'Factibilidad Inmobiliaria',
  },
];

export default function SuccessCases() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Casos de éxito</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Resultados que <span className="text-[#fd3838]">hablan por sí solos</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <div
              key={i}
              className={`p-8 border transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center">
                  <c.icon size={20} className="text-[#fd3838]" />
                </div>
                <span className={`text-[10px] tracking-wider uppercase px-3 py-1 border
                  ${isDark ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'}`}>
                  {c.tag}
                </span>
              </div>

              <div className="space-y-5">
                <div>
                  <div className={`text-[10px] tracking-[0.2em] uppercase mb-2 text-[#fd3838]`}>Reto</div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.reto}</p>
                </div>
                <div className={`w-full h-px ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2 text-[#fd3838]">Solución</div>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{c.solucion}</p>
                </div>
                <div className={`w-full h-px ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                <div>
                  <div className="text-[10px] tracking-[0.2em] uppercase mb-2 text-[#fd3838]">Resultado</div>
                  <p className={`text-base font-bold ${isDark ? 'text-white' : 'text-black'}`}>{c.resultado}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
