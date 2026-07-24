import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onNavigate: (page: string) => void;
}

export default function FinalCTA({ onNavigate }: FinalCTAProps) {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.3);

  return (
    <section className={`py-32 transition-colors duration-300 relative overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fd3838]/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className={`flex justify-center mb-8 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="red-line" />
        </div>

        <h2 className={`section-title text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 ${inView ? 'animate-fade-in-up delay-100' : 'opacity-0'}
          ${isDark ? 'text-white' : 'text-black'}`}>
          Las mejores decisiones comienzan con la{' '}
          <span className="text-[#fd3838]">información correcta</span>
        </h2>

        <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${inView ? 'animate-fade-in-up delay-200' : 'opacity-0'}
          ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Hablemos sobre tu proyecto y descubramos juntos cómo la inteligencia de mercados puede transformar tu próxima decisión estratégica.
        </p>

        <div className={`flex flex-col sm:flex-row justify-center gap-4 ${inView ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center justify-center gap-2 bg-[#fd3838] text-white px-10 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
          >
            Hablemos de tu proyecto
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
