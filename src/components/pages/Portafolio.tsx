import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { fetchPortfolioCases, type PortfolioCase } from '@/lib/portfolioQueries';
import { urlFor } from '@/lib/sanityImage';
import {
  ArrowRight, X, Target, CheckCircle2,
  Car, ShoppingBag, Landmark, UtensilsCrossed, Wine, PiggyBank,
  Building2, GraduationCap, Factory, HeartPulse, Briefcase,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

const industryMeta: Record<string, { label: string; icon: typeof Building2 }> = {
  automotriz: { label: 'Automotriz', icon: Car },
  'retail-moda': { label: 'Retail & Moda', icon: ShoppingBag },
  gobierno: { label: 'Gobierno & Sector Público', icon: Landmark },
  'alimentos-bebidas': { label: 'Alimentos & Bebidas', icon: UtensilsCrossed },
  'bebidas-alcoholicas': { label: 'Bebidas Alcohólicas', icon: Wine },
  'servicios-financieros': { label: 'Servicios Financieros', icon: PiggyBank },
  construccion: { label: 'Construcción & Real Estate', icon: Building2 },
  educacion: { label: 'Educación', icon: GraduationCap },
  manufactura: { label: 'Manufactura & Industrial', icon: Factory },
  'salud-farma': { label: 'Salud & Farmacéutica', icon: HeartPulse },
  fmcg: { label: 'Consumo Masivo (FMCG)', icon: ShoppingBag },
  'hoteleria-turismo': { label: 'Hotelería & Turismo', icon: Building2 },
  tecnologia: { label: 'Tecnología', icon: Briefcase },
  telecomunicaciones: { label: 'Telecomunicaciones', icon: Briefcase },
  otro: { label: 'Otro', icon: Briefcase },
};

function getIndustryMeta(industry: string) {
  return industryMeta[industry] || { label: industry, icon: Briefcase };
}

function PortfolioCardCover({ item, isDark }: { item: PortfolioCase; isDark: boolean }) {
  if (item.coverImage) {
    return (
      <img
        src={urlFor(item.coverImage).width(800).height(500).fit('crop').auto('format').url()}
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
      <span className="text-5xl font-bold opacity-20" style={{ color: item.color, fontFamily: 'Montserrat, sans-serif' }}>
        {item.client.charAt(0)}
      </span>
    </div>
  );
}

function PortfolioCard({ item, isDark, featured, onClick, delay }: {
  item: PortfolioCase; isDark: boolean; featured?: boolean; onClick: () => void; delay: number;
}) {
  const { label: industryLabel, icon: IndustryIcon } = getIndustryMeta(item.industry);

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${delay}s` }}
      className={`group text-left overflow-hidden transition-all duration-500 hover:-translate-y-1 animate-fade-in-up
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}
        ${isDark ? 'bg-gray-950 hover:shadow-2xl hover:shadow-black/40' : 'bg-gray-50 hover:shadow-xl'}`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[16/10]' : 'aspect-video'}`}>
        <PortfolioCardCover item={item} isDark={isDark} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/50 backdrop-blur-sm">
          <IndustryIcon size={11} className="text-white/90" />
          <span className="text-[10px] tracking-wider uppercase text-white/90 font-medium">{industryLabel}</span>
        </div>
        {item.logo && (
          <div className="absolute bottom-3 left-3 h-16 md:h-20 max-w-[45%] flex items-end justify-start">
            <img
              src={urlFor(item.logo).width(600).fit('max').url()}
              alt={item.client}
              className="max-h-full max-w-full object-contain object-left-bottom drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="red-line" style={{ background: item.color }} />
          <span className={`text-[10px] tracking-[0.2em] uppercase font-semibold ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {item.client}
          </span>
        </div>
        <h3 className={`font-semibold leading-snug ${featured ? 'text-xl md:text-2xl' : 'text-base'} ${isDark ? 'text-white' : 'text-black'}`}>
          {item.projectTitle}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {item.description}
        </p>
        <div className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase mt-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Ver caso
          <ArrowRight size={13} />
        </div>
      </div>
    </button>
  );
}

function CaseModal({ item, isDark, onClose }: { item: PortfolioCase; isDark: boolean; onClose: () => void }) {
  const { label: industryLabel } = getIndustryMeta(item.industry);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fade-in-up
        ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center transition-colors
            ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
        >
          <X size={18} />
        </button>

        <div className="relative aspect-video">
          <PortfolioCardCover item={item} isDark={isDark} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          {item.logo && (
            <div className="absolute bottom-4 left-4 h-20 md:h-24 max-w-[40%] flex items-end justify-start">
              <img
                src={urlFor(item.logo).width(700).fit('max').url()}
                alt={item.client}
                className="max-h-full max-w-full object-contain object-left-bottom drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          )}
        </div>

        <div className="p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="red-line" style={{ background: item.color }} />
            <span className={`text-xs tracking-[0.2em] uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {item.client} · {industryLabel}
            </span>
          </div>

          <h2 className="section-title text-2xl md:text-3xl mb-6">{item.projectTitle}</h2>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-[#fd3838]" />
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#fd3838]">Objetivos</span>
            </div>
            <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.objectives}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 size={16} className="text-[#fd3838]" />
              <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#fd3838]">Resultados clave</span>
            </div>
            <div className="space-y-3">
              {item.results.map((r, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 border-l-2`} style={{ borderColor: item.color }}>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portafolio({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.05);
  const [cases, setCases] = useState<PortfolioCase[] | null>(null);
  const [error, setError] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<string>('todos');
  const [selected, setSelected] = useState<PortfolioCase | null>(null);

  useEffect(() => {
    fetchPortfolioCases()
      .then(setCases)
      .catch(() => setError(true));
  }, []);

  const industries = cases
    ? Array.from(new Set(cases.map(c => c.industry))).sort((a, b) => getIndustryMeta(a).label.localeCompare(getIndustryMeta(b).label))
    : [];

  const filtered = !cases ? [] : activeIndustry === 'todos' ? cases : cases.filter(c => c.industry === activeIndustry);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Portafolio</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            +30 años de decisiones <span className="text-[#fd3838]">respaldadas por datos</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cada proyecto de este portafolio resolvió un problema de negocio real. Explora por industria y descubre cómo convertimos investigación en resultados medibles.
          </p>
        </div>
      </section>

      {/* Filters */}
      {cases && cases.length > 0 && (
        <section className={`py-6 border-y sticky top-[72px] z-30 backdrop-blur-md ${isDark ? 'border-white/5 bg-black/90' : 'border-black/5 bg-white/90'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveIndustry('todos')}
                className={`px-4 py-2 text-xs font-medium tracking-wide uppercase border transition-all duration-200
                  ${activeIndustry === 'todos'
                    ? 'bg-[#fd3838] text-white border-[#fd3838]'
                    : isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30'
                  }`}
              >
                Todos ({cases.length})
              </button>
              {industries.map(ind => {
                const meta = getIndustryMeta(ind);
                const count = cases.filter(c => c.industry === ind).length;
                return (
                  <button
                    key={ind}
                    onClick={() => setActiveIndustry(ind)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wide uppercase border transition-all duration-200
                      ${activeIndustry === ind
                        ? 'bg-[#fd3838] text-white border-[#fd3838]'
                        : isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-500 hover:text-black hover:border-black/30'
                      }`}
                  >
                    <meta.icon size={13} />
                    {meta.label} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-20">
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          {error && (
            <p className={`text-center py-20 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              No pudimos cargar el portafolio en este momento. Intenta de nuevo más tarde.
            </p>
          )}

          {!cases && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={`aspect-video animate-pulse ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`} />
              ))}
            </div>
          )}

          {cases && (
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-500 ${inView ? 'opacity-100' : 'opacity-0'}`}>
              {filtered.map((item, i) => (
                <PortfolioCard
                  key={item._id}
                  item={item}
                  isDark={isDark}
                  featured={item.featured && activeIndustry === 'todos' && i === 0}
                  delay={Math.min(i, 8) * 0.06}
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Tu proyecto podría ser el siguiente?</h2>
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase mx-auto transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
          >
            Hablemos de tu proyecto
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {selected && <CaseModal item={selected} isDark={isDark} onClose={() => setSelected(null)} />}
    </div>
  );
}
