import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const categories = ['Todos', 'Investigación de mercados', 'Metodología', 'Geomarketing', 'Inteligencia competitiva', 'Marketing', 'Inmobiliario', 'Experiencia del cliente', 'Tendencias'];

const posts = [
  { title: 'El futuro de la investigación de mercados en la era de la IA', category: 'Tendencias', date: '15 Ene 2025', read: '8 min', excerpt: 'Cómo la inteligencia artificial está transformando el análisis de datos y la toma de decisiones.' },
  { title: 'Geomarketing: la ciencia detrás de la ubicación perfecta', category: 'Geomarketing', date: '10 Ene 2025', read: '6 min', excerpt: 'Por qué el análisis territorial es clave para decisiones de expansión.' },
  { title: 'Focus groups en el mundo digital: retos y oportunidades', category: 'Metodología', date: '5 Ene 2025', read: '10 min', excerpt: 'Cómo adaptar la investigación cualitativa a entornos virtuales sin perder profundidad.' },
  { title: 'Inteligencia competitiva: más allá del benchmarking', category: 'Inteligencia competitiva', date: '28 Dic 2024', read: '7 min', excerpt: 'Las técnicas que las empresas líderes usan para anticipar movimientos del mercado.' },
  { title: 'NPS, CSAT o CES: ¿cuál elegir?', category: 'Experiencia del cliente', date: '20 Dic 2024', read: '5 min', excerpt: 'Una guía práctica para seleccionar la métrica correcta de experiencia del cliente.' },
  { title: 'Factibilidad inmobiliaria: los 5 errores más comunes', category: 'Inmobiliario', date: '15 Dic 2024', read: '9 min', excerpt: 'Los errores que pueden costar millones en un proyecto inmobiliario.' },
  { title: 'El brief perfecto: cómo diseñar un estudio de mercado efectivo', category: 'Metodología', date: '10 Dic 2024', read: '6 min', excerpt: 'La guía definitiva para comunicar tus necesidades de investigación.' },
  { title: 'Social Listening: escuchando lo que tu cliente no te dice', category: 'Investigación de mercados', date: '5 Dic 2024', read: '8 min', excerpt: 'Cómo las conversaciones digitales revelan patrones de consumo.' },
  { title: 'El posicionamiento de marca en tiempos de incertidumbre', category: 'Marketing', date: '1 Dic 2024', read: '7 min', excerpt: 'Estrategias para fortalecer tu marca cuando el mercado se volátil.' },
];

export default function Blog({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const [activeCat, setActiveCat] = useState('Todos');
  const { ref, inView } = useInView(0.1);

  const filtered = activeCat === 'Todos' ? posts : posts.filter(p => p.category === activeCat);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Blog</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            Ideas que <span className="text-[#fd3838]">transforman decisiones</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Análisis, guías y perspectivas sobre investigación de mercados, inteligencia estratégica y tendencias.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-8 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase border transition-all duration-200
                  ${activeCat === cat
                    ? 'bg-[#fd3838] text-white border-[#fd3838]'
                    : isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className={`group cursor-pointer border ${isDark ? 'border-white/5 bg-gray-950 hover:border-[#fd3838]/30' : 'border-black/5 bg-white hover:shadow-xl'} transition-all duration-300`}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className={`relative aspect-video lg:aspect-auto ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-[#fd3838]/20 rounded-full" />
                    <div className="absolute w-16 h-16 bg-[#fd3838]/10 rounded-full animate-float" />
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className="text-xs tracking-wider uppercase text-[#fd3838] mb-4">Destacado · {featured.category}</span>
                  <h2 className="section-title text-2xl md:text-3xl mb-4 group-hover:text-[#fd3838] transition-colors">{featured.title}</h2>
                  <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{featured.excerpt}</p>
                  <div className="flex items-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-2"><Calendar size={12} /> {featured.date}</span>
                    <span className="flex items-center gap-2"><Clock size={12} /> {featured.read}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Posts grid */}
      <section className="pb-24">
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <div
                key={i}
                className={`group cursor-pointer border transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                  ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
                style={{ animationDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className={`aspect-video ${isDark ? 'bg-gray-900' : 'bg-gray-100'} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 border-2 border-[#fd3838]/20 rounded-full group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-[10px] tracking-wider uppercase text-[#fd3838] mb-3 block">{post.category}</span>
                  <h3 className="text-base font-semibold mb-3 leading-snug group-hover:text-[#fd3838] transition-colors">{post.title}</h3>
                  <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {post.read}</span>
                    </div>
                    <ArrowRight size={14} className="text-[#fd3838] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
