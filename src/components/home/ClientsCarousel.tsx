import { useTheme } from '@/context/ThemeContext';

const clients = [
  'BANORTE', 'CITY GROUP', 'BBVA', 'TELEFÓNICA', 'MOVISTAR', 'COPPEL',
  'SORIANA', 'BIMBO', 'GRUPO MODELO', 'FEMSA', 'ALFA', 'CUERVO',
  'CHILI\'S', 'WALMART', 'SAMS CLUB', 'VICTORIA', 'PANDA', 'BOSQUE',
];

export default function ClientsCarousel() {
  const { isDark } = useTheme();
  const doubled = [...clients, ...clients];

  return (
    <section className={`py-20 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-3 justify-center">
          <div className="red-line" />
          <p className={`text-xs tracking-[0.3em] uppercase font-semibold text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Empresas que han confiado en nosotros para tomar decisiones estratégicas
          </p>
          <div className="red-line" />
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {doubled.map((client, i) => (
            <div
              key={i}
              className={`text-2xl font-bold tracking-wider transition-colors duration-300
                ${isDark ? 'text-gray-600 hover:text-white' : 'text-gray-300 hover:text-black'}`}
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              {client}
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className={`absolute inset-y-0 left-0 w-32 pointer-events-none ${isDark ? 'bg-gradient-to-r from-black to-transparent' : 'bg-gradient-to-r from-white to-transparent'}`} />
        <div className={`absolute inset-y-0 right-0 w-32 pointer-events-none ${isDark ? 'bg-gradient-to-l from-black to-transparent' : 'bg-gradient-to-l from-white to-transparent'}`} />
      </div>
    </section>
  );
}
