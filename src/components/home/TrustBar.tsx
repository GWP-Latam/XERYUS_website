import { useTheme } from '@/context/ThemeContext';
import { useInView, useAnimatedCounter } from '@/hooks/useAnimation';

const indicators = [
  { value: 3, suffix: '+', label: 'Sedes Internacionales', prefix: '' },
  { value: 1000, suffix: '+', label: 'Proyectos Realizados', prefix: '' },
  { value: 200, suffix: '+', label: 'Clientes Atendidos', prefix: '' },
  { value: 30, suffix: '+', label: 'Años de Experiencia', prefix: '' },
];

function Indicator({ indicator, isDark }: { indicator: typeof indicators[0]; isDark: boolean }) {
  const { ref, inView } = useInView(0.3);
  const count = useAnimatedCounter(indicator.value, inView, 2000);

  return (
    <div ref={ref} className="text-center px-4">
      <div className={`text-4xl md:text-5xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
        {indicator.prefix}{count}{indicator.suffix}
      </div>
      <div className={`mt-2 text-xs tracking-[0.2em] uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        {indicator.label}
      </div>
    </div>
  );
}

export default function TrustBar() {
  const { isDark } = useTheme();

  return (
    <section className={`py-16 border-y transition-colors duration-300 ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {indicators.map((ind, i) => (
            <Indicator key={i} indicator={ind} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
}
