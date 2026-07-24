import { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Roberto Mendoza',
    role: 'Director de Expansión',
    company: 'Grupo Inmobiliario del Norte',
    rating: 5,
    text: 'XERYUS transformó nuestra forma de tomar decisiones de expansión. Su análisis de factibilidad nos ahorró meses de incertidumbre y nos dio la confianza para avanzar con datos sólidos.',
  },
  {
    name: 'Carolina Vega',
    role: 'CMO',
    company: 'Marca de Consumo Líder',
    rating: 5,
    text: 'No es una agencia más. Es un socio estratégico. Los reportes que entregan no solo describen el problema, sino que vienen con la solución ya estructurada y respaldada.',
  },
  {
    name: 'James Patterson',
    role: 'CEO',
    company: 'Tech Ventures Austin',
    rating: 5,
    text: 'Working with XERYUS gave us the clarity we needed before entering the Mexican market. Their hybrid methodology and actionable insights were exactly what our board needed.',
  },
];

export default function Testimonials() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive(prev => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActive(prev => (prev + 1) % testimonials.length);
  const prev = () => setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Testimonios</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Lo que dicen quienes <span className="text-[#fd3838]">deciden con nosotros</span>
          </h2>
        </div>

        <div className="relative">
          <Quote size={48} className={`mx-auto mb-8 ${isDark ? 'text-white/10' : 'text-black/10'}`} />

          <div className="overflow-hidden">
            <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="text-center">
                      <div className="flex justify-center gap-1 mb-6">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} size={16} className="text-[#fd3838] fill-[#fd3838]" />
                        ))}
                      </div>
                      <p className={`text-xl md:text-2xl leading-relaxed font-light mb-8 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        "{t.text}"
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#fd3838]/10 flex items-center justify-center">
                          <span className="text-[#fd3838] font-bold text-sm">{t.name.charAt(0)}</span>
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{t.name}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.role} · {t.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button onClick={prev} className={`p-2 border transition-colors duration-200
              ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 transition-all duration-300 ${i === active ? 'w-8 bg-[#fd3838]' : 'w-2 bg-gray-300'}`}
                />
              ))}
            </div>
            <button onClick={next} className={`p-2 border transition-colors duration-200
              ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
