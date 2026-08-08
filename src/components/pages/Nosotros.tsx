import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useAnimatedCounter, useInView } from '@/hooks/useAnimation';
import { fetchTeamMembers, type TeamMember } from '@/lib/teamQueries';
import { urlFor } from '@/lib/sanityImage';
import { WORLD_MAP_PATH, WORLD_MAP_VIEWBOX } from '@/lib/worldMapPath';
import { Target, Eye, Heart, Award, Globe2, Users, ArrowRight, X, Mail } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const values = [
  { icon: Target, title: 'Rigor metodológico', desc: 'Cada estudio se diseña con estándares científicos y controles de calidad estrictos.' },
  { icon: Heart, title: 'Orientación al cliente', desc: 'Entendemos tu negocio antes de diseñar la investigación. No hay paquetes genéricos.' },
  { icon: Eye, title: 'Visión estratégica', desc: 'No recolectamos datos. Entregamos inteligencia accionable para decisiones reales.' },
];

// x/y en unidades del viewBox del mapa (mismo sistema de coordenadas que
// WORLD_MAP_PATH), calculados a partir de la posición relativa real de cada
// ciudad dentro del contorno de su país en el propio dataset del mapa.
const locations = [
  { city: 'Guadalajara', country: 'México', x: 165.09, y: 471.39, delay: 0 },
  { city: 'Austin', country: 'EE.UU.', x: 188.86, y: 442.15, delay: 1.3 },
  { city: 'París', country: 'Francia', x: 412.12, y: 399.9, delay: 2.6 },
];

function WorldMap({ isDark }: { isDark: boolean }) {
  return (
    <svg viewBox={WORLD_MAP_VIEWBOX} className="w-full h-auto">
      <path d={WORLD_MAP_PATH} fill={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.14)'} />

      {locations.map(loc => (
        <g key={loc.city}>
          {/* Onda de expansión */}
          <circle cx={loc.x} cy={loc.y} r="4" fill="none" stroke="#fd3838" strokeWidth="1.4">
            <animate attributeName="r" from="4" to="260" dur="4.5s" begin={`${loc.delay}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.6" to="0" dur="4.5s" begin={`${loc.delay}s`} repeatCount="indefinite" />
          </circle>
          {/* Punto de origen */}
          <circle cx={loc.x} cy={loc.y} r="4.5" fill="#fd3838">
            <animate attributeName="r" values="4.5;6;4.5" dur="2s" begin={`${loc.delay}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

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

function TeamCard({ member, isDark, onClick }: { member: TeamMember; isDark: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group text-center flex-shrink-0 w-36 sm:w-44 md:w-48"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={urlFor(member.photo).width(400).height(400).fit('crop').auto('format').url()}
          alt={member.name}
          className="w-full h-full object-cover hue-rotate-[140deg] transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className={`mt-3 text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{member.name}</h3>
      <p className="text-xs text-[#fd3838] font-medium tracking-wide mt-0.5">{member.role}</p>
    </button>
  );
}

function TeamModal({ member, isDark, onClose }: { member: TeamMember; isDark: boolean; onClose: () => void }) {
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
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto animate-fade-in-up ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
        >
          <X size={18} />
        </button>
        <div className="aspect-square">
          <img
            src={urlFor(member.photo).width(600).height(600).fit('crop').auto('format').url()}
            alt={member.name}
            className="w-full h-full object-cover hue-rotate-[140deg]"
          />
        </div>
        <div className="p-6 pb-8">
          <div className="red-line mb-3" />
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-sm text-[#fd3838] font-medium tracking-wide mt-1">{member.role}</p>
          {member.description && (
            <p className={`mt-4 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{member.description}</p>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="mt-4 flex items-center gap-2 text-xs text-[#fd3838] font-semibold tracking-wide"
            >
              <Mail size={13} />
              {member.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Nosotros({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const [team, setTeam] = useState<TeamMember[] | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchTeamMembers().then(setTeam).catch(() => setTeam([]));
  }, []);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Nosotros</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            Una firma de inteligencia de mercados con <span className="text-[#fd3838]">visión global</span>
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
              <h2 className="section-title text-3xl mt-4">Más de 35 años generando inteligencia de mercado</h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Somos un Grupo con más de 35 años realizando proyectos de Investigación de Mercados para diferentes industrias y sectores, descubriendo y analizando oportunidades de negocio tanto en México, como en Estados Unidos, Centroamérica y Europa.
              </p>
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Planeamos y ejecutamos Estudios de Mercado basados en tus clientes, tu industria y tus competidores, analizando las características más importantes para tu empresa, con la información, los fundamentos y los datos más valiosos por parte del mercado.
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
          <h2 className="section-title text-3xl md:text-4xl mb-4">Ranking nacional</h2>
          <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Formamos parte del ranking de mejores agencias de Investigación de Mercados en <span className={isDark ? 'text-white font-semibold' : 'text-black font-semibold'}>TODO MÉXICO</span>.
          </p>
          <img
            src="/merca2_0.png"
            alt="Ranking de agencias de Investigación de Mercados en México"
            className={`mt-10 w-full max-w-[200px] sm:max-w-[240px] mx-auto h-auto object-contain ${isDark ? '' : 'invert'}`}
          />
        </div>
      </section>

      {/* World map */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Presencia internacional</span>
            <h2 className="section-title text-3xl mt-4">Tres ciudades, una visión</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <WorldMap isDark={isDark} />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
            {locations.map(loc => (
              <div key={loc.city} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Globe2 size={14} className="text-[#fd3838]" />
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{loc.city}</span>
                </div>
                <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{loc.country}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={500} suffix="+" label="Proyectos" isDark={isDark} />
            <StatCounter value={200} suffix="+" label="Clientes" isDark={isDark} />
            <StatCounter value={35} suffix="+" label="Años" isDark={isDark} />
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

      {/* Team */}
      {team && team.length > 0 && (
        <section className={`py-20 border-t overflow-hidden ${isDark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Users size={18} className="text-[#fd3838]" />
              <span className="section-label">Equipo</span>
            </div>
            <h2 className="section-title text-3xl">Quiénes hacen posible XERYUS</h2>
          </div>

          <div className="group/marquee overflow-hidden">
            <div className="flex gap-5 w-max animate-team-marquee group-hover/marquee:[animation-play-state:paused]">
              {[...team, ...team].map((member, i) => (
                <TeamCard
                  key={`${member._id}-${i}`}
                  member={member}
                  isDark={isDark}
                  onClick={() => setSelectedMember(member)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {selectedMember && (
        <TeamModal member={selectedMember} isDark={isDark} onClose={() => setSelectedMember(null)} />
      )}
    </div>
  );
}
