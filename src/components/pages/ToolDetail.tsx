import { useTheme } from '@/context/ThemeContext';
import { ArrowRight, ArrowLeft, Calculator, FileText, Download, Info, BookOpen, Check } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
  toolId?: string;
}

const toolMeta: Record<string, { name: string; icon: typeof Calculator; desc: string; whatIs: string; howToUse: string[]; useCase: string; tips: string[] }> = {
  'sample-size': {
    name: 'Calculadora de Tamaño de Muestra',
    icon: Calculator,
    desc: 'Determina el tamaño muestral necesario para tu estudio.',
    whatIs: 'El tamaño de muestra es el número de personas que necesitas entrevistar para que tus resultados sean estadísticamente representativos de una población mayor. Una muestra bien calculada te permite proyectar resultados con un margen de error y nivel de confianza definidos.',
    howToUse: [
      'Ingresa el tamaño total de la población que deseas estudiar.',
      'Selecciona el nivel de confianza deseado (90%, 95% o 99%).',
      'Define el margen de error que estás dispuesto a aceptar.',
      'La calculadora te devolverá el número mínimo de encuestas necesarias.',
    ],
    useCase: 'Si quieres estudiar a 50,000 clientes y aceptas un margen de error del 5% con 95% de confianza, necesitas al menos 382 encuestas.',
    tips: [
      'Un mayor nivel de confianza requiere una muestra más grande.',
      'Un menor margen de error también aumenta el tamaño muestral.',
      'Para poblaciones muy grandes (más de 100,000), el tamaño de muestra se estabiliza.',
    ],
  },
  'margin-error': {
    name: 'Calculadora de Margen de Error',
    icon: Calculator,
    desc: 'Calcula el margen de error para un tamaño de muestra dado.',
    whatIs: 'El margen de error indica cuánto pueden variar tus resultados respecto al valor real de la población. Un margen de error del 5% significa que si el 60% de tu muestra responde "sí", el valor real en la población está entre 55% y 65%.',
    howToUse: [
      'Ingresa el tamaño de tu muestra.',
      'Indica el tamaño total de la población.',
      'Selecciona el nivel de confianza utilizado.',
      'La calculadora te mostrará el margen de error de tus resultados.',
    ],
    useCase: 'Si encuestaste a 400 personas de una población de 10,000 con 95% de confianza, tu margen de error será aproximadamente ±4.9%.',
    tips: [
      'El margen de error disminuye cuando aumentas el tamaño de muestra.',
      'Para reducir el margen de error a la mitad, necesitas cuatro veces más muestra.',
      'Un margen de error del 5% es estándar en investigación de mercados.',
    ],
  },
  'confidence': {
    name: 'Calculadora de Nivel de Confianza',
    icon: Calculator,
    desc: 'Estima el nivel de confianza de tus resultados.',
    whatIs: 'El nivel de confianza indica la probabilidad de que tus resultados se mantengan si repitieras el estudio. Un 95% de confianza significa que si repites el estudio 100 veces, en 95 ocasiones obtendrás resultados dentro del margen de error.',
    howToUse: [
      'Ingresa el tamaño de tu muestra.',
      'Indica el tamaño total de la población.',
      'Define el margen de error que estás dispuesto a aceptar.',
      'La calculadora estimará el nivel de confianza aproximado.',
    ],
    useCase: 'Si tienes 300 encuestas de una población de 5,000 con un margen de error del 5%, tu nivel de confianza será cercano al 95%.',
    tips: [
      'El 95% es el estándar más usado en investigación de mercados.',
      'El 99% se utiliza en estudios críticos o de alto riesgo.',
      'El 90% es aceptable para estudios exploratorios.',
    ],
  },
  'nps': {
    name: 'Calculadora de NPS',
    icon: Calculator,
    desc: 'Calcula tu Net Promoter Score a partir de respuestas.',
    whatIs: 'El Net Promoter Score (NPS) mide la lealtad de tus clientes en una escala de -100 a +100. Se calcula restando el porcentaje de detractores (0-6) del porcentaje de promotores (9-10). Los pasivos (7-8) no afectan el cálculo.',
    howToUse: [
      'Cuenta cuántos clientes respondieron 9 o 10 (promotores).',
      'Cuenta cuántos respondieron 7 u 8 (pasivos).',
      'Cuenta cuántos respondieron de 0 a 6 (detractores).',
      'Ingresa los valores y obtén tu NPS automáticamente.',
    ],
    useCase: 'Si de 100 respuestas tienes 60 promotores, 20 pasivos y 20 detractores, tu NPS es +40, lo que indica una lealtad sólida.',
    tips: [
      'Un NPS positivo (>0) es bueno, pero arriba de +50 es excelente.',
      'El NPS no reemplaza otras métricas como CSAT o CES.',
      'Es importante segmentar por tipo de cliente para un análisis más preciso.',
    ],
  },
  'csat': {
    name: 'Calculadora de CSAT',
    icon: Calculator,
    desc: 'Mide la satisfacción del cliente con escalas de 1 a 5.',
    whatIs: 'El Customer Satisfaction Score (CSAT) mide el porcentaje de clientes satisfechos con una interacción específica. Se calcula dividiendo los clientes que responden 4 o 5 entre el total de respuestas.',
    howToUse: [
      'Cuenta cuántos clientes respondieron 4 o 5 (satisfechos).',
      'Ingresa el total de respuestas recibidas.',
      'La calculadora te dará tu porcentaje de satisfacción.',
    ],
    useCase: 'Si de 200 respuestas, 160 calificaron con 4 o 5, tu CSAT es del 80%, lo que indica un buen nivel de satisfacción.',
    tips: [
      'El CSAT mide una interacción puntual, no la relación general.',
      'Un CSAT del 80% o más se considera bueno en la mayoría de industrias.',
      'Combina CSAT con NPS para una visión completa de la experiencia.',
    ],
  },
  'ces': {
    name: 'Calculadora de CES',
    icon: Calculator,
    desc: 'Evalúa el esfuerzo del cliente en una interacción.',
    whatIs: 'El Customer Effort Score (CES) mide cuánto esfuerzo tuvo que hacer el cliente para resolver su problema. Se evalúa en una escala de 1 a 7, donde un menor valor indica menor esfuerzo y, por lo tanto, mejor experiencia.',
    howToUse: [
      'Suma todas las puntuaciones de las respuestas recibidas.',
      'Ingresa el número total de respuestas.',
      'La calculadora te dará el promedio de esfuerzo.',
    ],
    useCase: 'Si la suma de 100 respuestas es 350, tu CES promedio es 3.5, lo que indica un esfuerzo moderado.',
    tips: [
      'Un CES de 2 o menos es ideal, indica bajo esfuerzo.',
      'Reducir el esfuerzo del cliente es más efectivo que deleitarlo.',
      'El CES predice mejor la lealtad que el CSAT en interacciones de servicio.',
    ],
  },
  'investment': {
    name: 'Estimador de Inversión para Estudios',
    icon: Calculator,
    desc: 'Estima el costo de un estudio de investigación.',
    whatIs: 'El estimador de inversión te da una referencia del costo aproximado de un estudio de investigación de mercados, basado en el tamaño de muestra, la metodología y el número de regiones.',
    howToUse: [
      'Define el tamaño de muestra que necesitas.',
      'Selecciona la metodología (cuantitativa, cualitativa o híbrida).',
      'Indica en cuántas regiones se realizará el levantamiento.',
      'Obtén una estimación referencial del costo.',
    ],
    useCase: 'Un estudio cuantitativo con 400 entrevistas en 2 regiones tiene un costo estimado de $64,000 USD.',
    tips: [
      'La estimación es referencial; solicita una cotización exacta.',
      'Los estudios cualitativos suelen costar más por entrevista.',
      'Los costos pueden variar según la complejidad del cuestionario.',
    ],
  },
  'brief': {
    name: 'Generador de Brief',
    icon: FileText,
    desc: 'Crea un brief de investigación paso a paso.',
    whatIs: 'El brief de investigación es el documento que comunica tus objetivos, audiencia y expectativas a un proveedor de investigación. Un buen brief asegura que el estudio se diseñe correctamente desde el inicio.',
    howToUse: [
      'Completa los campos con la información de tu proyecto.',
      'Incluye el nombre de tu empresa y el objetivo de la investigación.',
      'Define tu audiencia objetivo y el tiempo estimado.',
      'Genera el brief y úsalo como base para solicitar cotizaciones.',
    ],
    useCase: 'Un brief claro reduce los tiempos de cotización y asegura que recibas propuestas alineadas a tus necesidades.',
    tips: [
      'Cuanto más específico sea el brief, mejor será la propuesta.',
      'Incluye el contexto del negocio, no solo el objetivo.',
      'Define claramente las decisiones que tomarás con los resultados.',
    ],
  },
  'templates': {
    name: 'Plantillas Descargables',
    icon: Download,
    desc: 'Plantillas listas para usar en tus proyectos.',
    whatIs: 'Nuestras plantillas descargables te permiten estructurar tus proyectos de investigación con un formato profesional, ahorrando tiempo y asegurando que no omitas información importante.',
    howToUse: [
      'Explora la lista de plantillas disponibles.',
      'Selecciona la que se ajuste a tu proyecto.',
      'Descarga el archivo y personalízalo según tus necesidades.',
    ],
    useCase: 'La plantilla de cuestionario cuantitativo te da una estructura lista para adaptar a tu estudio.',
    tips: [
      'Las plantillas son un punto de partida, no un documento final.',
      'Adapta las preguntas a tu industria y objetivos específicos.',
      'Combina varias plantillas para estudios híbridos.',
    ],
  },
};

export default function ToolDetail({ onNavigate, toolId }: PageProps) {
  const { isDark } = useTheme();
  const tool = toolId ? toolMeta[toolId] : null;

  if (!tool) {
    return (
      <div className={`pt-20 min-h-screen flex items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="text-center">
          <p className="text-lg mb-4">Herramienta no encontrada.</p>
          <button onClick={() => onNavigate('herramientas')} className="text-[#fd3838] text-sm font-semibold tracking-wider uppercase">
            Volver a herramientas
          </button>
        </div>
      </div>
    );
  }

  const Icon = tool.icon;

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <button
            onClick={() => onNavigate('herramientas')}
            className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#fd3838] font-semibold mb-6 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Volver a herramientas
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-[#fd3838]/10 flex items-center justify-center">
              <Icon size={24} className="text-[#fd3838]" />
            </div>
            <div>
              <span className="section-label">Herramienta</span>
              <h1 className="section-title text-3xl md:text-4xl lg:text-5xl mt-2">{tool.name}</h1>
            </div>
          </div>
          <p className={`text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{tool.desc}</p>
        </div>
      </section>

      {/* What is it */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <Info size={18} className="text-[#fd3838]" />
                <span className="section-label">¿Qué es?</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{tool.whatIs}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to use */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen size={18} className="text-[#fd3838]" />
                <span className="section-label">Cómo se usa</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {tool.howToUse.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0 text-[#fd3838] text-sm font-bold">
                      {i + 1}
                    </div>
                    <p className={`text-base leading-relaxed pt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use case */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <Check size={18} className="text-[#fd3838]" />
                <span className="section-label">Caso de uso</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
                <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{tool.useCase}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <Info size={18} className="text-[#fd3838]" />
                <span className="section-label">Tips</span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-3">
                {tool.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#fd3838] rounded-full mt-2 flex-shrink-0" />
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Necesitas ayuda con tu proyecto?</h2>
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
