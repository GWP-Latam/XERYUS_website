import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { fetchPortfolioCases, type PortfolioCase } from '@/lib/portfolioQueries';
import { urlFor } from '@/lib/sanityImage';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface SuccessCasesProps {
  onNavigate: (page: string) => void;
}

const AUTO_ADVANCE_MS = 7000;
const MAX_CASES = 8;

function CaseCover({ item, isDark }: { item: PortfolioCase; isDark: boolean }) {
  if (item.coverImage) {
    return (
      <img
        src={urlFor(item.coverImage).width(900).height(650).fit('crop').auto('format').url()}
        alt={item.projectTitle}
        className="w-full h-full object-cover"
      />
    );
  }
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${item.color}22, ${isDark ? '#000' : '#fff'})` }}
    >
      <span className="text-6xl font-bold opacity-20" style={{ color: item.color, fontFamily: 'Montserrat, sans-serif' }}>
        {item.client.charAt(0)}
      </span>
    </div>
  );
}

export default function SuccessCases({ onNavigate }: SuccessCasesProps) {
  const { isDark } = useTheme();
  const [cases, setCases] = useState<PortfolioCase[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchPortfolioCases().then(all => setCases(all.slice(0, MAX_CASES))).catch(() => setCases([]));
  }, []);

  useEffect(() => {
    if (!cases || cases.length < 2) return;
    const timer = setInterval(() => setActive(prev => (prev + 1) % cases.length), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [cases]);

  if (cases && cases.length === 0) return null;

  const next = () => cases && setActive(prev => (prev + 1) % cases.length);
  const prev = () => cases && setActive(p => (p - 1 + cases.length) % cases.length);

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Casos de éxito</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Resultados que <span className="text-[#fd3838]">hablan por sí solos</span>
          </h2>
        </div>

        {!cases ? (
          <div className={`aspect-[16/9] md:aspect-[21/9] animate-pulse ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`} />
        ) : (
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
                {cases.map(item => (
                  <div key={item._id} className="w-full flex-shrink-0">
                    <div className={`grid lg:grid-cols-2 border ${isDark ? 'border-white/5 bg-black' : 'border-black/5 bg-white'}`}>
                      <div className="relative aspect-video lg:aspect-auto">
                        <CaseCover item={item} isDark={isDark} />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="red-line" style={{ background: item.color }} />
                          <span className={`text-xs tracking-[0.2em] uppercase font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {item.client}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">{item.projectTitle}</h3>
                        <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.description}</p>
                        {item.results[0] && (
                          <div className={`p-4 border-l-2 mb-6`} style={{ borderColor: item.color }}>
                            <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-black'}`}>{item.results[0]}</p>
                          </div>
                        )}
                        <button
                          onClick={() => onNavigate('portafolio')}
                          className="group flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase w-fit"
                        >
                          Ver portafolio completo
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {cases.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <button onClick={prev} aria-label="Anterior" className={`p-2 border transition-colors duration-200
                  ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                  <ChevronLeft size={18} />
                </button>
                <div className="flex gap-2">
                  {cases.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      aria-label={`Ir al caso ${i + 1}`}
                      className={`h-1 transition-all duration-300 ${i === active ? 'w-8 bg-[#fd3838]' : 'w-2 bg-gray-300'}`}
                    />
                  ))}
                </div>
                <button onClick={next} aria-label="Siguiente" className={`p-2 border transition-colors duration-200
                  ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
