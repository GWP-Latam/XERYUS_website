import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ContactModal from '@/components/ContactModal';
import {
  Calendar, Clock, ArrowLeft, ArrowRight, Send, BarChart3,
  ClipboardCheck, RefreshCw, Building2, Users, Crosshair,
} from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

type OpenContact = (message: string) => void;

// ── Interactivo 1: gráfica comparativa ──────────────────────────────────────

type Segment = 'con' | 'sin';

const SEGMENT_DATA: Record<Segment, { label: string; value: number; note: string }> = {
  con: {
    label: 'Con estudio de mercado',
    value: 76,
    note: 'Validar el concepto antes de lanzar se asocia con una tasa de éxito 30–40% mayor, según Nielsen.',
  },
  sin: {
    label: 'Sin estudio de mercado',
    value: 51,
    note: '8 de cada 10 productos nuevos fracasan en el mercado cuando se lanzan sin validación previa suficiente (Nielsen, Breakthrough Innovation Report).',
  },
};

function MarketResearchImpactChart({ isDark }: { isDark: boolean }) {
  const [segment, setSegment] = useState<Segment>('con');
  const active = SEGMENT_DATA[segment];

  return (
    <div className={`p-6 md:p-8 border my-10 not-prose ${isDark ? 'border-white/10 bg-gray-950' : 'border-black/10 bg-gray-50'}`}>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 size={15} className="text-[#fd3838]" />
        <h4 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
          Éxito en lanzamiento de producto
        </h4>
      </div>

      <div className={`inline-flex mb-8 p-1 border ${isDark ? 'border-white/10' : 'border-black/10'}`}>
        {(['con', 'sin'] as Segment[]).map(key => (
          <button
            key={key}
            onClick={() => setSegment(key)}
            className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300
              ${segment === key
                ? 'bg-[#fd3838] text-white'
                : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
              }`}
          >
            {SEGMENT_DATA[key].label}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-6">
        <div className="w-28 sm:w-36 h-40 flex items-end">
          <div
            key={segment}
            className="w-full bg-[#fd3838] transition-[height] duration-500 ease-out animate-fade-in-up"
            style={{ height: `${active.value}%` }}
          />
        </div>
        <div>
          <div className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{active.value}%</div>
          <p className={`mt-1 text-xs tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            de proyectos que alcanzan sus metas de venta
          </p>
        </div>
      </div>

      <p key={`note-${segment}`} className={`mt-6 text-sm leading-relaxed animate-fade-in ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {active.note}
      </p>

      <p className={`mt-6 pt-4 border-t text-xs leading-relaxed ${isDark ? 'border-white/5 text-gray-600' : 'border-black/5 text-gray-400'}`}>
        Fuentes: Knudsen, E. et al. (2023), "Best practices in new product development and innovation: results from PDMA's 2021 global survey", <em>Journal of Product Innovation Management</em> (651 empresas en 37 países) · Nielsen, Breakthrough Innovation Report.
      </p>
    </div>
  );
}

// ── Interactivo 2: quiz de autodiagnóstico ──────────────────────────────────

type ResultKey = 'factibilidad' | 'diagnostico' | 'benchmarking';

const QUIZ_QUESTIONS: { q: string; options: { label: string; key: ResultKey }[] }[] = [
  {
    q: '¿Qué te preocupa más en este momento?',
    options: [
      { label: 'Si existe demanda suficiente antes de invertir', key: 'factibilidad' },
      { label: 'Por qué mis clientes actuales compran menos', key: 'diagnostico' },
      { label: 'Qué está haciendo distinto mi competencia', key: 'benchmarking' },
    ],
  },
  {
    q: '¿En qué etapa está tu proyecto?',
    options: [
      { label: 'Aún no invierto, estoy evaluando si hacerlo', key: 'factibilidad' },
      { label: 'Ya opero, pero algo dejó de funcionar', key: 'diagnostico' },
      { label: 'Quiero entender mejor a los demás jugadores del mercado', key: 'benchmarking' },
    ],
  },
  {
    q: '¿Cuál de estas preguntas se parece más a la tuya?',
    options: [
      { label: '"¿Debería abrir una sucursal aquí?"', key: 'factibilidad' },
      { label: '"¿Por qué estamos perdiendo clientes?"', key: 'diagnostico' },
      { label: '"¿Qué está haciendo diferente mi competencia?"', key: 'benchmarking' },
    ],
  },
  {
    q: '¿Qué información tienes hoy?',
    options: [
      { label: 'Casi nada del mercado nuevo que quiero entrar', key: 'factibilidad' },
      { label: 'Datos de mis propios clientes, pero no sé interpretarlos', key: 'diagnostico' },
      { label: 'Sé quiénes son mis competidores, pero no cómo me comparo con ellos', key: 'benchmarking' },
    ],
  },
  {
    q: '¿Qué resultado esperas obtener?',
    options: [
      { label: 'Saber si vale la pena invertir, antes de hacerlo', key: 'factibilidad' },
      { label: 'Encontrar el siguiente motor de crecimiento', key: 'diagnostico' },
      { label: 'Un mapa claro de dónde diferenciarme', key: 'benchmarking' },
    ],
  },
];

const QUIZ_RESULTS: Record<ResultKey, { title: string; desc: string; icon: typeof Building2 }> = {
  factibilidad: {
    title: 'Estudio de Factibilidad',
    desc: 'Necesitas validar si existe mercado real antes de comprometer inversión. Mapeamos demanda, oferta y viabilidad para que decidas con evidencia, no con esperanza.',
    icon: Building2,
  },
  diagnostico: {
    title: 'Diagnóstico de Oportunidades',
    desc: 'Ya operas, pero algo no cuadra. Entendemos a tu cliente actual para encontrar el motor de crecimiento que no estás viendo desde dentro de la empresa.',
    icon: Users,
  },
  benchmarking: {
    title: 'Benchmarking',
    desc: 'Necesitas saber qué está haciendo el resto del mercado. Construimos una radiografía de tu competencia para encontrar dónde diferenciarte de verdad.',
    icon: Crosshair,
  },
};

function DiagnosticQuiz({ isDark, onOpenContact }: { isDark: boolean; onOpenContact: OpenContact }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<ResultKey[]>([]);

  const finished = step >= QUIZ_QUESTIONS.length;

  const choose = (key: ResultKey) => {
    setAnswers([...answers, key]);
    setStep(step + 1);
  };

  const restart = () => { setStep(0); setAnswers([]); };

  const resultKey: ResultKey | null = finished
    ? (Object.entries(
        answers.reduce((acc, k) => ({ ...acc, [k]: (acc[k] || 0) + 1 }), {} as Record<ResultKey, number>)
      ).sort((a, b) => b[1] - a[1])[0][0] as ResultKey)
    : null;

  return (
    <div className={`p-6 md:p-8 border my-10 not-prose ${isDark ? 'border-white/10 bg-gray-950' : 'border-black/10 bg-gray-50'}`}>
      <div className="flex items-center gap-2 mb-1">
        <ClipboardCheck size={15} className="text-[#fd3838]" />
        <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#fd3838]">Autodiagnóstico</span>
      </div>
      <h4 className={`text-base font-semibold mt-3 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        ¿Qué tipo de investigación necesita tu proyecto?
      </h4>

      {!finished && (
        <>
          <div className={`h-1 w-full mb-6 ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
            <div
              className="h-full bg-[#fd3838] transition-all duration-300"
              style={{ width: `${(step / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
          <p className={`text-xs tracking-wider uppercase mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            Pregunta {step + 1} de {QUIZ_QUESTIONS.length}
          </p>
          <p className={`text-lg font-medium mb-5 ${isDark ? 'text-white' : 'text-black'}`}>{QUIZ_QUESTIONS[step].q}</p>
          <div className="space-y-3">
            {QUIZ_QUESTIONS[step].options.map(opt => (
              <button
                key={opt.label}
                onClick={() => choose(opt.key)}
                className={`w-full text-left p-4 border text-sm transition-colors duration-200
                  ${isDark ? 'border-white/10 bg-black hover:border-[#fd3838]/50 text-gray-300 hover:text-white' : 'border-black/10 bg-white hover:border-[#fd3838]/50 text-gray-700 hover:text-black'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}

      {finished && resultKey && (
        <div className="animate-fade-in-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
              {(() => { const Icon = QUIZ_RESULTS[resultKey].icon; return <Icon size={20} className="text-[#fd3838]" />; })()}
            </div>
            <div>
              <span className={`text-xs tracking-wider uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Te recomendamos</span>
              <p className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{QUIZ_RESULTS[resultKey].title}</p>
            </div>
          </div>
          <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{QUIZ_RESULTS[resultKey].desc}</p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenContact(`Me interesa un ${QUIZ_RESULTS[resultKey].title.toLowerCase()}.`)}
              className="group flex items-center gap-2 bg-[#fd3838] text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
            >
              Agenda tu diagnóstico gratuito
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={restart}
              className={`flex items-center gap-2 text-xs font-semibold tracking-wider uppercase ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
            >
              <RefreshCw size={13} />
              Volver a intentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Interactivo 3: pregunta corta de diagnóstico ────────────────────────────

function QuickDiagnosticForm({ isDark, onOpenContact }: { isDark: boolean; onOpenContact: OpenContact }) {
  const [decision, setDecision] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenContact(decision);
  };

  return (
    <form onSubmit={handleSubmit} className={`p-6 md:p-8 border my-10 not-prose ${isDark ? 'border-white/10 bg-gray-950' : 'border-black/10 bg-gray-50'}`}>
      <div className="flex items-center gap-2 mb-1">
        <Send size={15} className="text-[#fd3838]" />
        <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#fd3838]">El primer paso es gratuito</span>
      </div>
      <h4 className={`text-base font-semibold mt-3 mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
        Cuéntanos qué decisión estás por tomar
      </h4>

      <input
        required type="text" value={decision}
        onChange={e => setDecision(e.target.value)}
        placeholder="Ej. Abrir una sucursal en Monterrey"
        className={`w-full p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors text-sm
          ${isDark ? 'border-white/10 text-white placeholder:text-gray-600' : 'border-black/10 text-black placeholder:text-gray-400'}`}
      />

      <button
        type="submit"
        className="group flex items-center gap-2 bg-[#fd3838] text-white px-6 py-3 mt-6 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
      >
        Agenda tu diagnóstico gratuito
        <Send size={13} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

// ── Página ───────────────────────────────────────────────────────────────────

export default function ArticuloInvestigacionMercados({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const [contactPrefill, setContactPrefill] = useState<string | null>(null);
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';
  const textBody = `text-lg leading-relaxed mb-6 ${textMuted}`;
  const h2 = `section-title text-2xl md:text-3xl mt-14 mb-5 ${isDark ? 'text-white' : 'text-black'}`;

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <article className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <button
            onClick={() => onNavigate('blog')}
            className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#fd3838] font-semibold mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft size={14} /> Volver al blog
          </button>

          <span className="section-label">Investigación de mercados</span>
          <h1 className="section-title text-3xl md:text-4xl lg:text-5xl mt-4 mb-6 leading-[1.15]">
            ¿Qué es la investigación de mercados?
          </h1>
          <div className={`flex items-center gap-6 text-xs mb-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <span className="flex items-center gap-2"><Calendar size={12} /> 7 Ago 2026</span>
            <span className="flex items-center gap-2"><Clock size={12} /> 6 min de lectura</span>
          </div>

          <p className={textBody}>
            Cada mes, empresas en México destinan presupuestos completos a lanzar productos que nadie pidió, abrir sucursales en zonas equivocadas o rediseñar marcas que sus propios clientes no querían que cambiaran. La razón casi nunca es falta de capital o de talento. Es que la decisión se tomó sin preguntar primero.
          </p>
          <p className={textBody}>
            La investigación de mercados es el proceso sistemático de recolectar, analizar e interpretar información sobre un mercado, sus consumidores, competidores y contexto, con el fin de reducir la incertidumbre antes de tomar una decisión de negocio. La American Marketing Association, en su definición vigente aprobada en 2017, la describe como la función que conecta al consumidor, cliente y público con quien toma decisiones de marketing a través de información: datos que sirven para identificar oportunidades y problemas de negocio, diseñar y evaluar acciones, dar seguimiento a resultados y entender mejor ese proceso en su conjunto.
          </p>
          <p className={textBody}>
            Esa definición importa porque corrige un malentendido común: investigación de mercados no es sinónimo de encuesta, y tampoco es una opinión mejor informada. Es un método.
          </p>

          <MarketResearchImpactChart isDark={isDark} />

          <h2 className={h2}>Por qué la intuición no basta, aunque haya funcionado antes</h2>
          <p className={textBody}>
            Ningún director de empresa toma decisiones al azar. El problema no es la ausencia de criterio, sino su alcance: la experiencia de quien dirige un negocio está formada por lo que ya vivió, no por lo que el mercado está haciendo hoy. Los hábitos de consumo cambian, entran competidores nuevos, se abren canales de venta que no existían hace tres años. Un director con 20 años de experiencia tiene 20 años de datos, pero esos datos describen un mercado que ya no es exactamente el actual.
          </p>
          <p className={textBody}>
            La investigación de mercados no reemplaza ese criterio. Lo actualiza con evidencia del momento presente y, cuando se hace bien, distingue entre lo que el cliente dice que quiere y lo que realmente elige cuando paga. Esa brecha entre discurso y comportamiento es, en la práctica, donde se pierde más dinero en decisiones de negocio.
          </p>

          <h2 className={h2}>Los dos tipos de investigación, y cuándo usar cada uno</h2>
          <p className={textBody}>
            La disciplina se divide en dos enfoques que responden preguntas distintas:
          </p>
          <p className={textBody}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Investigación cuantitativa.</strong> Trabaja con muestras representativas y responde preguntas de "cuánto" y "qué tan probable": cuántos consumidores comprarían un producto a determinado precio, qué porcentaje del mercado objetivo conoce una marca, cuál es el tamaño real de la demanda en una zona geográfica. Se apoya en encuestas estructuradas, análisis estadístico y, cada vez más, en datos de comportamiento digital.
          </p>
          <p className={textBody}>
            <strong className={isDark ? 'text-white' : 'text-black'}>Investigación cualitativa.</strong> Responde el "por qué" detrás del número. Entrevistas a profundidad, grupos de enfoque, mystery shopping o estudios de neuromarketing revelan las motivaciones, fricciones y percepciones que ninguna encuesta cerrada captura del todo. Un estudio cuantitativo puede decir que el 40% de los clientes de una sucursal se va sin comprar; solo uno cualitativo explica si es por el precio, por el servicio o por algo tan simple como no encontrar el producto en el anaquel.
          </p>

          <DiagnosticQuiz isDark={isDark} onOpenContact={setContactPrefill} />

          <h2 className={h2}>Lo que la investigación de mercados puede responder en la práctica</h2>
          <p className={textBody}>
            En un proyecto real, la investigación de mercados suele resolver tres tipos de pregunta:
          </p>
          <p className={textBody}>
            Antes de invertir, valida si existe demanda real para un producto, servicio o expansión geográfica, y dimensiona qué tan grande es esa demanda. Durante la operación, identifica en qué está fallando la experiencia del cliente o dónde hay una oportunidad de crecimiento que la empresa no está viendo desde dentro. Frente a la competencia, revela cómo se posicionan los demás jugadores del mercado y dónde queda un espacio de diferenciación real, no uno imaginado.
          </p>
          <p className={textBody}>
            Ninguna de estas tres preguntas se responde con una reunión interna, por más experiencia que tenga quien esté en la mesa. Se responde saliendo a preguntarle al mercado directamente, con un método diseñado para que la respuesta sea representativa y no solo la opinión de quien más habló en la junta.
          </p>

          <h2 className={h2}>Cómo lo hace Xeryus</h2>
          <p className={textBody}>
            En Xeryus llevamos más de 30 años traduciendo esa metodología en decisiones concretas para empresas que operan en México y a nivel internacional. El enfoque varía según la pregunta de negocio: un Estudio de Factibilidad mapea el mercado y la demanda antes de que una empresa invierta en un proyecto nuevo; un Diagnóstico de Oportunidades entiende al cliente actual para encontrar el siguiente motor de crecimiento; un Benchmarking construye una radiografía de la competencia para detectar dónde diferenciarse.
          </p>
          <p className={textBody}>
            Empresas como Ford, Coca-Cola y PROMÉXICO han recurrido a este tipo de investigación para decisiones de expansión, reposicionamiento de marca y atracción de inversión, respectivamente. Cada caso partió de una pregunta de negocio distinta, resuelta con el método adecuado a esa pregunta.
          </p>
          <button
            onClick={() => onNavigate('portafolio')}
            className="group flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase mb-6"
          >
            Ver estos casos en nuestro portafolio
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <h2 className={h2}>El primer paso no es el estudio, es la pregunta</h2>
          <p className={textBody}>
            Antes de decidir qué metodología usar, hay que tener claridad sobre qué decisión de negocio está en juego. Ese diagnóstico inicial (qué se necesita saber y por qué) es, de hecho, el primer paso de cualquier estudio serio, y es gratuito.
          </p>

          <QuickDiagnosticForm isDark={isDark} onOpenContact={setContactPrefill} />

          <p className={textBody}>
            Si tu empresa está por tomar una decisión que depende de cómo va a reaccionar el mercado, vale más resolver esa pregunta con datos que descubrirlo después, cuando ya se invirtió el presupuesto.
          </p>
        </div>
      </article>

      {contactPrefill !== null && (
        <ContactModal isDark={isDark} prefillMessage={contactPrefill} onClose={() => setContactPrefill(null)} />
      )}
    </div>
  );
}
