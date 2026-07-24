import { useTheme } from '@/context/ThemeContext';
import { useInView, useAnimatedCounter } from '@/hooks/useAnimation';
import { Target, Eye, Heart, Award, Globe2, Users, ArrowRight } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const values = [
  { icon: Target, title: 'Rigor metodológico', desc: 'Cada estudio se diseña con estándares científicos y controles de calidad estrictos.' },
  { icon: Heart, title: 'Orientación al cliente', desc: 'Entendemos tu negocio antes de diseñar la investigación. No hay paquetes genéricos.' },
  { icon: Eye, title: 'Visión estratégica', desc: 'No recolectamos datos. Entregamos inteligencia accionable para decisiones reales.' },
];

const locations = [
  { city: 'Guadalajara', country: 'México', x: 25, y: 55 },
  { city: 'Austin', country: 'EE.UU.', x: 22, y: 48 },
  { city: 'París', country: 'Francia', x: 52, y: 38 },
];

function StatCounter({ value, suffix, label, isDark }: { value: number; suffix: string; label: string; isDark: boolean }) {
  const { ref, inView } = useInView(0.3);
  const count = useAnimatedCounter(value, inView, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{count}{suffix}</div>
      <div className={`mt-2 text-xs tracking-[0.2em] uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{label}</div>
    </div>
  );
}

export default function Nosotros({ onNavigate }: PageProps) {
  const { isDark } = useTheme();

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Nosotros</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            Una firma de inteligencia estratégica con <span className="text-[#fd3838]">visión global</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            XERYUS nació para transformar la forma en que las empresas toman decisiones. No somos una agencia de levantamiento de información: somos una firma de inteligencia de mercados que acompaña a organizaciones a reducir riesgos y acelerar crecimiento con evidencia.
          </p>
        </div>
      </section>

      {/* History */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <span className="section-label">Historia</span>
              <h2 className="section-title text-3xl mt-4">De agencia a firma de inteligencia</h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Fundada hace más de 15 años, XERYUS comenzó como un equipo de investigación con una convicción: las empresas merecen más que datos. Merecen decisiones respaldadas por evidencia.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Hoy somos una firma con presencia en tres países, Top 15 nacional en investigación de mercados en México, y un equipo multidisciplinario que combina investigación, analítica avanzada y estrategia de negocio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose / Mission / Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Propósito', desc: 'Transformar la incertidumbre empresarial en decisiones estratégicas con fundamento.' },
              { icon: Eye, title: 'Misión', desc: 'Entregar inteligencia de mercados accionable que reduzca el riesgo y acelere el crecimiento de nuestros clientes.' },
              { icon: Heart, title: 'Visión', desc: 'Ser la firma de investigación de mercados más confiable de México con proyección internacional.' },
            ].map((item, i) => (
              <div key={i} className={`p-8 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
                <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center mb-6">
                  <item.icon size={20} className="text-[#fd3838]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="section-label">Valores</span>
          <h2 className="section-title text-3xl mt-4 mb-12">Lo que nos define</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className={`p-8 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#fd3838]/10 flex items-center justify-center">
                    <v.icon size={18} className="text-[#fd3838]" />
                  </div>
                  <h3 className="text-base font-semibold">{v.title}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 15 highlight */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 mx-auto bg-[#fd3838]/10 flex items-center justify-center mb-6">
            <Award size={28} className="text-[#fd3838]" />
          </div>
          <h2 className="section-title text-3xl md:text-4xl mb-4">Top 15 Nacional</h2>
          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Posicionados entre las 15 firmas más importantes de investigación de mercados en México, con proyección internacional.
          </p>
        </div>
      </section>

      {/* World map */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Presencia internacional</span>
            <h2 className="section-title text-3xl mt-4">Tres ciudades, una visión</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Simplified world map SVG */}
            <svg viewBox="0 0 100 60" className="w-full h-auto">
              <path
                d="M5,30 Q15,20 25,25 T45,22 Q55,18 65,25 T85,22 L95,30 Q90,40 80,38 T60,40 Q50,45 40,40 T20,38 L10,35 Z"
                fill="none"
                stroke={isDark ? '#ffffff10' : '#00000010'}
                strokeWidth="0.3"
              />
              <circle cx="25" cy="55" r="0.8" fill="#fd3838" />
              <circle cx="22" cy="48" r="0.8" fill="#fd3838" />
              <circle cx="52" cy="38" r="0.8" fill="#fd3838" />

              {/* Connection lines */}
              <line x1="25" y1="55" x2="22" y2="48" stroke="#fd3838" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />
              <line x1="22" y1="48" x2="52" y2="38" stroke="#fd3838" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />
              <line x1="25" y1="55" x2="52" y2="38" stroke="#fd3838" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.5" />

              {/* Pulse rings */}
              {locations.map((loc, i) => (
                <circle key={i} cx={loc.x} cy={loc.y} r="1.5" fill="none" stroke="#fd3838" strokeWidth="0.2" opacity="0.4">
                  <animate attributeName="r" from="0.8" to="3" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {locations.map((loc, i) => (
                <div key={i} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Globe2 size={14} className="text-[#fd3838]" />
                    <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{loc.city}</span>
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{loc.country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={500} suffix="+" label="Proyectos" isDark={isDark} />
            <StatCounter value={200} suffix="+" label="Clientes" isDark={isDark} />
            <StatCounter value={15} suffix="" label="Años" isDark={isDark} />
            <StatCounter value={3} suffix="" label="Países" isDark={isDark} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Tomamos la siguiente decisión juntos?</h2>
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase mx-auto transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
          >
            Solicitar asesoría
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
