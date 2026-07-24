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

function ChallengeCard({ challenge, index, isDark }: { challenge: typeof challenges[0]; index: number; isDark: boolean }) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group p-8 border transition-all duration-500 cursor-pointer
        ${inView ? 'animate-fade-in-up' : 'opacity-0'}
        ${isDark
          ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30 hover:bg-gray-900'
          : 'bg-white border-black/5 hover:border-[#fd3838]/30 hover:shadow-xl'
        }`}
      style={{ animationDelay: `${(index % 3) * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 flex items-center justify-center transition-colors duration-300
          ${isDark ? 'bg-white/5 group-hover:bg-[#fd3838]/10' : 'bg-gray-50 group-hover:bg-[#fd3838]/5'}`}>
          <challenge.icon size={20} className={`transition-colors duration-300
            ${isDark ? 'text-gray-400 group-hover:text-[#fd3838]' : 'text-gray-500 group-hover:text-[#fd3838]'}`} />
        </div>
        <ArrowRight size={16} className={`opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1
          ${isDark ? 'text-[#fd3838]' : 'text-[#fd3838]'}`} />
      </div>

      <h3 className={`text-lg font-semibold mb-3 transition-colors duration-300
        ${isDark ? 'text-white group-hover:text-[#fd3838]' : 'text-black group-hover:text-[#fd3838]'}`}>
        {challenge.title}
      </h3>
      <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
        {challenge.desc}
      </p>
    </div>
  );
}

export default function Challenges() {
  const { isDark } = useTheme();

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
          <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cada tarjeta representa una necesidad real de negocio. Selecciona el reto que más te preocupa y descubre cómo podemos ayudarte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((c, i) => (
            <ChallengeCard key={i} challenge={c} index={i} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
