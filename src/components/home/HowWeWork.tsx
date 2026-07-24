import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { Search, PenTool, Microscope, BarChart3, Target } from 'lucide-react';

const steps = [
  { num: '01', icon: Search, title: 'Comprendemos el reto', desc: 'Inmersión profunda en el contexto empresarial, objetivos y preguntas críticas de decisión.' },
  { num: '02', icon: PenTool, title: 'Diseñamos la estrategia', desc: 'Arquitectura metodológica a la medida: mix de técnicas, muestra, análisis y entregables.' },
  { num: '03', icon: Microscope, title: 'Ejecutamos la investigación', desc: 'Levantamiento de información con los más altos estándares de calidad y control.' },
  { num: '04', icon: BarChart3, title: 'Analizamos la información', desc: 'Procesamiento, modelado estadístico y síntesis de hallazgos en patrones accionables.' },
  { num: '05', icon: Target, title: 'Transformamos datos en decisiones', desc: 'Reportes ejecutivos con recomendaciones claras, priorizadas y respaldadas por evidencia.' },
];

export default function HowWeWork() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="section-label">Cómo trabajamos</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Un proceso diseñado para <span className="text-[#fd3838]">decisiones</span>
          </h2>
        </div>

        <div ref={ref} className="relative">
          {/* Vertical line */}
          <div className={`absolute left-8 top-0 bottom-0 w-px ${isDark ? 'bg-white/10' : 'bg-black/10'} hidden md:block`} />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-8 transition-all duration-500
                  ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-16 h-16 flex items-center justify-center border-2 transition-colors duration-300
                    ${isDark ? 'border-white/10 bg-black' : 'border-black/10 bg-white'}`}>
                    <step.icon size={20} className="text-[#fd3838]" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-[#fd3838] text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center">
                    {step.num}
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{step.title}</h3>
                  <p className={`text-base leading-relaxed max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{step.desc}</p>
                </div>

                {/* Arrow */}
                {i < steps.length - 1 && (
                  <div className={`hidden md:block absolute left-8 top-full -mt-4 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
                    <svg width="2" height="40" className="mx-auto">
                      <line x1="1" y1="0" x2="1" y2="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
