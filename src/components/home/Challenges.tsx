import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import {
  Building2, ShoppingBag, UtensilsCrossed, Rocket, GraduationCap, Award, ArrowRight,
} from 'lucide-react';

interface ChallengesProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

const industries = [
  { id: 'inmobiliaria', title: 'Inmobiliaria', icon: Building2, count: 4 },
  { id: 'retail', title: 'Retail', icon: ShoppingBag, count: 3 },
  { id: 'restaurantes', title: 'Restaurantes', icon: UtensilsCrossed, count: 3 },
  { id: 'lanzamiento', title: 'Lanzamiento de productos', icon: Rocket, count: 3 },
  { id: 'educacion', title: 'Instituciones educativas', icon: GraduationCap, count: 3 },
  { id: 'marca-notoria', title: 'Declaratoria de Marca Notoria o Famosa', icon: Award, count: 2 },
];

const [featured, ...rest] = industries;

export default function Challenges({ onNavigate }: ChallengesProps) {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.1);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">¿Qué industria es la tuya?</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 max-w-3xl mx-auto
            ${isDark ? 'text-white' : 'text-black'}`}>
            No vendemos metodologías.<br />
            <span className="text-[#fd3838]">Resolvemos problemas empresariales.</span>
          </h2>
        </div>

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Featured card */}
          <button
            onClick={() => onNavigate('industria-detail', { industriaId: featured.id })}
            className={`group relative overflow-hidden lg:col-span-2 lg:row-span-2 p-10 flex flex-col justify-between min-h-[280px] lg:min-h-[420px] text-left transition-all duration-500
              ${inView ? 'animate-fade-in-up' : 'opacity-0'}
              ${isDark ? 'bg-gray-950 hover:bg-gray-900' : 'bg-gray-50 hover:bg-white hover:shadow-2xl'}`}
          >
            <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-[#fd3838]/5 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative">
              <div className={`w-16 h-16 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 ${isDark ? 'bg-[#fd3838]/10' : 'bg-[#fd3838]/5'}`}>
                <featured.icon size={28} className="text-[#fd3838]" />
              </div>
              <span className={`text-xs tracking-[0.2em] uppercase font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {featured.count} soluciones especializadas
              </span>
              <h3 className={`text-3xl lg:text-4xl font-bold mt-3 ${isDark ? 'text-white' : 'text-black'}`}>
                {featured.title}
              </h3>
            </div>

            <div className="relative flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase mt-8">
              Ver soluciones
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Other industries */}
          {rest.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => onNavigate('industria-detail', { industriaId: ind.id })}
              style={{ animationDelay: `${(i + 1) * 0.08}s` }}
              className={`group relative overflow-hidden p-8 flex flex-col justify-between min-h-[200px] text-left transition-all duration-500 hover:-translate-y-1
                ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                ${isDark ? 'bg-gray-950 hover:bg-gray-900' : 'bg-gray-50 hover:bg-white hover:shadow-xl'}`}
            >
              <div
                className={`absolute top-0 left-0 h-0.5 w-0 bg-[#fd3838] transition-all duration-500 group-hover:w-full`}
              />
              <div className={`w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isDark ? 'bg-white/5 group-hover:bg-[#fd3838]/10' : 'bg-white group-hover:bg-[#fd3838]/5'}`}>
                <ind.icon size={20} className="text-[#fd3838]" />
              </div>

              <div>
                <h3 className={`text-lg font-semibold leading-snug ${isDark ? 'text-white' : 'text-black'}`}>
                  {ind.title}
                </h3>
                <div className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase mt-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  Ver soluciones
                  <ArrowRight size={13} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
