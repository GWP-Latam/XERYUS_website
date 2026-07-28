import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import {
  TrendingUp, ShoppingBag, Users, Shield, Package, Crosshair, Eye, DollarSign, ArrowRight,
  BarChart3, ClipboardList, Hash, Route, RefreshCw, SplitSquareHorizontal, LineChart,
  MessageSquare, Mic, Footprints, BookOpen, MousePointerClick,
  Glasses, UserSearch, Telescope, PackageSearch,
  Cpu, Radio, Map, Activity, Brain,
  Target, Swords, FileSearch,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const solutions = [
  { icon: TrendingUp, title: 'Expandir una empresa', desc: 'Identificar oportunidades de crecimiento y nuevos mercados.', tag: 'Expansión' },
  { icon: ShoppingBag, title: 'Incrementar ventas', desc: 'Comprender qué impulsa la decisión de compra en tu categoría.', tag: 'Ventas' },
  { icon: Users, title: 'Conocer al consumidor', desc: 'Profundizar en hábitos, motivaciones y necesidades de tu audiencia.', tag: 'Consumer Insights' },
  { icon: Shield, title: 'Evaluar una marca', desc: 'Medir el posicionamiento y salud de tu marca frente a la competencia.', tag: 'Brand Equity' },
  { icon: Package, title: 'Lanzar un producto', desc: 'Validar concepto, precio y propuesta antes de salir al mercado.', tag: 'Innovación' },
  { icon: Crosshair, title: 'Analizar competencia', desc: 'Inteligencia competitiva para anticipar movimientos del mercado.', tag: 'Inteligencia' },
  { icon: Eye, title: 'Optimizar experiencia del cliente', desc: 'Diagnosticar puntos de fricción y oportunidades en cada contacto.', tag: 'CX' },
  { icon: DollarSign, title: 'Validar inversiones', desc: 'Reducir la incertidumbre antes de comprometer capital en un proyecto.', tag: 'Inversión' },
];

const toolCategories = [
  {
    id: 'cuantitativos',
    label: 'Métodos Cuantitativos',
    subtitle: 'Medición y análisis estadístico',
    icon: BarChart3,
    tools: [
      { icon: ClipboardList, name: 'Encuestas estructuradas', desc: 'Cuestionarios estandarizados con preguntas cerradas aplicados a una muestra para obtener datos estadísticamente representativos.' },
      { icon: Hash, name: 'Conteos directos', desc: 'Registro numérico puntual de elementos, transacciones o acontecimientos en un espacio/tiempo determinado.' },
      { icon: Route, name: 'Estudios de aforo (tráfico)', desc: 'Medición continua del volumen de personas o vehículos que transitan por un punto específico para calcular flujo y picos de demanda.' },
      { icon: RefreshCw, name: 'Paneles de consumidores', desc: 'Seguimiento continuo a un grupo fijo de personas que registran sus compras y hábitos a lo largo del tiempo.' },
      { icon: SplitSquareHorizontal, name: 'Experimentos cuantitativos (Pruebas A/B)', desc: 'Comparación de dos o más variables controladas para medir cuál genera mejor rendimiento estadístico.' },
      { icon: LineChart, name: 'Modelos estadísticos y econométricos', desc: 'Análisis matemático de variables históricas para identificar correlaciones, patrones y proyecciones.' },
    ],
  },
  {
    id: 'cualitativos',
    label: 'Métodos Cualitativos',
    subtitle: 'Exploración y entendimiento profundo',
    icon: MessageSquare,
    tools: [
      { icon: Mic, name: 'Entrevistas en profundidad', desc: 'Conversaciones individuales semiestructuradas para indagar en motivaciones, percepciones y experiencias del usuario.' },
      { icon: Users, name: 'Grupos focales (Focus Groups)', desc: 'Discusiones guiadas con un grupo reducido de personas para evaluar reacciones, ideas o conceptos compartidos.' },
      { icon: Footprints, name: 'Etnografía y observación participante', desc: 'Inmersión directa en el entorno natural del sujeto para analizar sus comportamientos reales sin interferir.' },
      { icon: BookOpen, name: 'Diarios de usuario (Diary Studies)', desc: 'Registro auto-administrado (texto, fotos o video) donde el participante documenta sus rutinas durante un periodo determinado.' },
      { icon: MousePointerClick, name: 'Pruebas de usabilidad (UX Testing)', desc: 'Evaluación directa de cómo un usuario interactúa con un producto o interfaz para identificar fricciones.' },
    ],
  },
  {
    id: 'observacionales',
    label: 'Métodos Observacionales',
    subtitle: 'Mystery shopper e in-situ',
    icon: Glasses,
    tools: [
      { icon: UserSearch, name: 'Cliente incógnito (Mystery Shopper)', desc: 'Evaluación encubierta de la calidad del servicio, cumplimiento de procesos y atención al cliente en un punto de venta.' },
      { icon: Telescope, name: 'Observación no participante', desc: 'Auditoría visual pasiva del comportamiento de las personas en un espacio sin interactuar con ellas.' },
      { icon: PackageSearch, name: 'Auditoría de anaquel / Retail Audit', desc: 'Inspección en tienda para verificar disponibilidad de producto, precios, exhibición y participación de espacio frente a la competencia.' },
    ],
  },
  {
    id: 'digitales',
    label: 'Herramientas Digitales',
    subtitle: 'Tecnología y datos en tiempo real',
    icon: Cpu,
    tools: [
      { icon: Radio, name: 'Escucha social (Social Listening)', desc: 'Monitoreo e interpretación automatizada de conversaciones, menciones y sentimientos en redes sociales y plataformas digitales.' },
      { icon: Map, name: 'Geomarketing y análisis espacial', desc: 'Procesamiento de datos de ubicación geográfica (GPS, tráfico peatonal, mapas de calor) para analizar zonas de influencia y cobertura.' },
      { icon: Activity, name: 'Analítica web / Clickstream', desc: 'Rastreo de la navegación, tasa de conversión y comportamiento de usuarios en sitios web o aplicaciones.' },
      { icon: Brain, name: 'Pruebas biométricas (Neuroinvestigación)', desc: 'Eye-tracking, codificación facial o respuesta galvánica de la piel para medir reacciones emocionales o atención inconsciente.' },
    ],
  },
  {
    id: 'estrategico',
    label: 'Análisis Estratégico',
    subtitle: 'Entorno y competencia',
    icon: Target,
    tools: [
      { icon: Swords, name: 'Inteligencia competitiva / Benchmarking', desc: 'Recopilación y análisis sistemático de información pública sobre competidores, productos y estrategias del mercado.' },
      { icon: FileSearch, name: 'Análisis documental (Desk Research)', desc: 'Revisión de fuentes secundarias como reportes de la industria, censos oficiales, estudios académicos y artículos especializados.' },
    ],
  },
];

export default function Soluciones({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);
  const [activeCat, setActiveCat] = useState(0);
  const activeCategory = toolCategories[activeCat];

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Soluciones Estratégicas</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            No vendemos metodologías.<br />
            <span className="text-[#fd3838]">Vendemos resultados.</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cada solución está diseñada para resolver un problema empresarial específico. Selecciona el reto que más te preocupa.
          </p>
        </div>
      </section>

      {/* Solutions grid */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solutions.map((s, i) => (
              <div
                key={i}
                className={`group p-6 border transition-all duration-500 cursor-pointer ${inView ? 'animate-fade-in-up' : 'opacity-0'}
                  ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
                style={{ animationDelay: `${(i % 4) * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center mb-5">
                  <s.icon size={20} className="text-[#fd3838]" />
                </div>
                <span className={`text-[10px] tracking-wider uppercase mb-2 block ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{s.tag}</span>
                <h3 className="text-base font-semibold mb-2 transition-colors group-hover:text-[#fd3838]">{s.title}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{s.desc}</p>
                <div className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase">
                  Ver solución
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities / Tools */}
      <section className={`py-20 lg:py-28 relative overflow-hidden ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-[#fd3838]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-14">
            <span className="section-label">Nuestras capacidades</span>
            <h2 className="section-title text-3xl md:text-4xl mt-4">Las metodologías son herramientas, no servicios</h2>
            <p className={`mt-6 text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              XERYUS combina métodos cuantitativos, cualitativos, observacionales, digitales y estratégicos para diseñar la solución exacta a cada reto.
            </p>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {toolCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(i)}
                className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wide uppercase transition-all duration-300
                  ${activeCat === i
                    ? 'bg-[#fd3838] text-white shadow-lg shadow-red-900/20 scale-105'
                    : isDark
                      ? 'text-gray-400 border border-white/10 hover:border-[#fd3838]/40 hover:text-white'
                      : 'text-gray-600 border border-black/10 hover:border-[#fd3838]/40 hover:text-black'
                  }`}
              >
                <cat.icon size={15} />
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tool list */}
          <div key={`tools-${activeCat}`} className="grid md:grid-cols-2 gap-3 max-w-5xl mx-auto">
            {activeCategory.tools.map((tool, i) => (
              <div
                key={tool.name}
                className={`group flex items-start gap-4 p-5 border-l-2 border-transparent transition-all duration-300 cursor-default animate-fade-in-up hover:-translate-y-0.5
                  ${isDark ? 'bg-black hover:bg-gray-900 hover:border-[#fd3838]' : 'bg-white hover:shadow-lg hover:border-[#fd3838]'}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={`w-11 h-11 flex items-center justify-center flex-shrink-0 transition-colors duration-300
                  ${isDark ? 'bg-white/5 group-hover:bg-[#fd3838]' : 'bg-gray-100 group-hover:bg-[#fd3838]'}`}>
                  <tool.icon size={18} className="text-[#fd3838] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{tool.name}</h4>
                  <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{tool.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button
              onClick={() => onNavigate('contacto')}
              className="group inline-flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
            >
              Quiero un estudio a la medida
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿No sabes cuál solución necesitas?</h2>
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
