import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { Award, Globe2, GitMerge, FileBarChart, Lightbulb, Layers } from 'lucide-react';

const differentiators = [
  { icon: Award, title: 'Ranking nacional', desc: 'Parte del ranking de mejores agencias de Investigación de Mercados en México.' },
  { icon: Globe2, title: 'Presencia internacional', desc: 'Operaciones en Guadalajara, Austin y París con capacidad de levantamiento global.' },
  { icon: GitMerge, title: 'Metodologías híbridas', desc: 'Combinamos cuantitativo, cualitativo y analítica avanzada para una visión 360°.' },
  { icon: FileBarChart, title: 'Reportes accionables', desc: 'No entregamos datos. Entregamos decisiones claras con respaldo metodológico.' },
  { icon: Lightbulb, title: 'Información orientada a decisiones', desc: 'Cada hallazgo está diseñado para que puedas actuar de inmediato.' },
  { icon: Layers, title: 'Proyectos totalmente personalizados', desc: 'Diseñamos cada estudio desde cero, sin plantillas genéricas ni paquetes cerrados.' },
];

export default function Differentiators() {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <span className="section-label">Diferenciadores</span>
            <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
              No son promesas.<br />
              Son <span className="text-[#fd3838]">evidencia</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Cada proyecto de XERYUS está respaldado por rigor metodológico, experiencia internacional y un compromiso absoluto con la calidad de la información que entregamos a nuestros clientes.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-transparent">
          {differentiators.map((d, i) => (
            <div
              key={i}
              className={`p-8 border transition-all duration-500
                ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                ${isDark
                  ? 'bg-gray-950 border-white/5 hover:bg-gray-900'
                  : 'bg-white border-black/5 hover:shadow-lg'
                }`}
              style={{ animationDelay: `${(i % 3) * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#fd3838]/10">
                  <d.icon size={18} className="text-[#fd3838]" />
                </div>
                <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{d.title}</h3>
              </div>
              <p className={`text-sm leading-relaxed pl-14 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
