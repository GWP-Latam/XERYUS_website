import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { FileText, Download, BookOpen, Wrench, ArrowRight } from 'lucide-react';

const resources = [
  { icon: FileText, type: 'Whitepaper', title: 'El futuro de la investigación de mercados en México', category: 'Inteligencia de Mercados' },
  { icon: BookOpen, type: 'Guía', title: 'Cómo diseñar un brief de investigación efectivo', category: 'Metodología' },
  { icon: Download, type: 'Plantilla', title: 'Plantilla de cuestionario para estudios de satisfacción', category: 'Experiencia del Cliente' },
  { icon: Wrench, type: 'Herramienta', title: 'Calculadora de tamaño de muestra online', category: 'Metodología' },
  { icon: FileText, type: 'Whitepaper', title: 'Geomarketing aplicado a la expansión inmobiliaria', category: 'Geomarketing' },
  { icon: BookOpen, type: 'Guía', title: 'Inteligencia competitiva: más allá del benchmarking', category: 'Inteligencia Competitiva' },
];

export default function Resources() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="section-label">Recursos</span>
            <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
              Contenido de <span className="text-[#fd3838]">valor</span>
            </h2>
          </div>
          <p className={`text-base max-w-md ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Whitepapers, guías, plantillas y herramientas gratuitas para tomadores de decisiones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => (
            <div
              key={i}
              className={`group p-6 border cursor-pointer transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
              style={{ animationDelay: `${(i % 3) * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-[#fd3838]/10 flex items-center justify-center">
                  <r.icon size={16} className="text-[#fd3838]" />
                </div>
                <span className={`text-[10px] tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{r.type}</span>
              </div>
              <h3 className={`text-base font-semibold mb-2 leading-snug transition-colors duration-300
                ${isDark ? 'text-white group-hover:text-[#fd3838]' : 'text-black group-hover:text-[#fd3838]'}`}>
                {r.title}
              </h3>
              <p className={`text-xs tracking-wide uppercase mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{r.category}</p>
              <div className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase">
                Ver recurso
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
