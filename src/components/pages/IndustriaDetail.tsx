import { useTheme } from '@/context/ThemeContext';
import {
  ArrowRight, ArrowLeft, Building2, ShoppingBag, UtensilsCrossed, Rocket, GraduationCap, Award,
  Calculator, MapPin, Eye, PackageSearch, Route, Smile, UserSearch, FlaskConical, Package,
  TrendingUp, Crosshair, Users, FileSearch,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
  industriaId?: string;
}

type Solution = { icon: typeof Building2; title: string; desc: string };
type Industria = { title: string; icon: typeof Building2; intro: string; solutions: Solution[] };

const industriaMeta: Record<string, Industria> = {
  inmobiliaria: {
    title: 'Inmobiliaria',
    icon: Building2,
    intro: 'Decisiones de inversión y desarrollo inmobiliario respaldadas por evidencia de mercado, no por intuición.',
    solutions: [
      { icon: Building2, title: 'Factibilidad de desarrollos inmobiliarios', desc: 'Evaluamos la viabilidad comercial de un proyecto antes de invertir capital, considerando demanda, competencia y absorción esperada.' },
      { icon: Calculator, title: 'Factibilidad financiera', desc: 'Modelamos el retorno de inversión y los escenarios financieros del proyecto para respaldar la decisión ante inversionistas y comités.' },
      { icon: MapPin, title: 'Selección óptima de ubicación', desc: 'Geomarketing y análisis territorial para identificar el terreno con mayor potencial comercial dentro de tu zona de interés.' },
      { icon: Eye, title: 'Percepción de mercado', desc: 'Medimos cómo perciben tu marca o desarrollo los compradores potenciales, y qué factores influyen en su decisión de compra.' },
    ],
  },
  retail: {
    title: 'Retail',
    icon: ShoppingBag,
    intro: 'Inteligencia de punto de venta para maximizar el desempeño de cada sucursal.',
    solutions: [
      { icon: PackageSearch, title: 'Auditoría de punto de venta', desc: 'Verificamos exhibición, disponibilidad de producto y cumplimiento de estándares frente a la competencia.' },
      { icon: Route, title: 'Estudios de tráfico y aforo', desc: 'Medimos el flujo de personas por punto de venta para identificar horarios pico y potencial comercial.' },
      { icon: Smile, title: 'Experiencia de compra', desc: 'Diagnosticamos la satisfacción del comprador en cada punto de contacto dentro de la tienda.' },
    ],
  },
  restaurantes: {
    title: 'Restaurantes',
    icon: UtensilsCrossed,
    intro: 'Investigación aplicada a la industria de alimentos y bebidas.',
    solutions: [
      { icon: UtensilsCrossed, title: 'Evaluación de servicio y menú', desc: 'Analizamos la calidad del servicio, tiempos de atención y percepción de la oferta gastronómica.' },
      { icon: UserSearch, title: 'Cliente incógnito gastronómico', desc: 'Evaluación encubierta de la experiencia completa: servicio, producto y ambiente.' },
      { icon: MapPin, title: 'Ubicación para nuevas sucursales', desc: 'Identificamos las zonas con mayor potencial de demanda para tu próxima apertura.' },
    ],
  },
  lanzamiento: {
    title: 'Lanzamiento de productos',
    icon: Rocket,
    intro: 'Reduce el riesgo de un lanzamiento antes de invertir en producción y medios.',
    solutions: [
      { icon: FlaskConical, title: 'Validación de concepto y precio', desc: 'Probamos el concepto con consumidores reales para ajustar producto, empaque y precio antes del lanzamiento.' },
      { icon: Package, title: 'Prueba de producto', desc: 'Evaluamos la aceptación del producto frente a alternativas existentes en el mercado.' },
      { icon: TrendingUp, title: 'Estrategia de entrada al mercado', desc: 'Definimos el mejor canal, momento y segmento para maximizar la adopción inicial.' },
    ],
  },
  educacion: {
    title: 'Instituciones educativas',
    icon: GraduationCap,
    intro: 'Investigación para instituciones que compiten por la preferencia de familias y estudiantes.',
    solutions: [
      { icon: Eye, title: 'Percepción institucional', desc: 'Medimos cómo perciben tu institución los padres de familia, alumnos y prospectos frente a la competencia.' },
      { icon: Crosshair, title: 'Análisis de competencia educativa', desc: 'Comparamos oferta académica, precio y posicionamiento frente a otras instituciones de la zona.' },
      { icon: Users, title: 'Satisfacción de la comunidad escolar', desc: 'Evaluamos la experiencia de alumnos y padres de familia para identificar áreas de mejora.' },
    ],
  },
  'marca-notoria': {
    title: 'Declaratoria de Marca Notoria o Famosa',
    icon: Award,
    intro: 'Evidencia de mercado para respaldar tu solicitud de declaratoria ante el IMPI.',
    solutions: [
      { icon: Award, title: 'Estudios de notoriedad de marca', desc: 'Medimos el nivel de reconocimiento espontáneo y asistido de tu marca entre el público objetivo.' },
      { icon: FileSearch, title: 'Evidencia documental de mercado', desc: 'Generamos los estudios que sustentan tu solicitud de declaratoria de marca notoria o famosa ante el IMPI.' },
    ],
  },
};

export default function IndustriaDetail({ onNavigate, industriaId }: PageProps) {
  const { isDark } = useTheme();
  const industria = industriaId ? industriaMeta[industriaId] : null;

  if (!industria) {
    return (
      <div className={`pt-20 min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="text-center">
          <p className="text-lg mb-4">Industria no encontrada.</p>
          <button onClick={() => onNavigate('home')} className="text-[#fd3838] text-sm font-semibold tracking-wider uppercase">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const Icon = industria.icon;

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#fd3838] font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Volver al inicio
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#fd3838]/10 flex items-center justify-center">
              <Icon size={24} className="text-[#fd3838]" />
            </div>
            <div>
              <span className="section-label">Industria</span>
              <h1 className="section-title text-3xl md:text-4xl lg:text-5xl mt-2">{industria.title}</h1>
            </div>
          </div>
          <p className={`text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{industria.intro}</p>
        </div>
      </section>

      {/* Solutions */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="section-label">Soluciones especializadas</span>
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            {industria.solutions.map((s, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-6 border ${isDark ? 'bg-black border-white/5' : 'bg-white border-black/5'}`}
              >
                <div className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-[#fd3838]/10' : 'bg-[#fd3838]/5'}`}>
                  <s.icon size={20} className="text-[#fd3838]" />
                </div>
                <div>
                  <h3 className={`text-base font-semibold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{s.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Necesitas ayuda con tu proyecto?</h2>
          <p className={`mb-8 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Hablemos de tu reto y diseñamos la solución a la medida.</p>
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
