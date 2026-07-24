import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Calculator, FileText, Download, ChevronDown, ArrowRight } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

type ToolId = 'sample-size' | 'margin-error' | 'confidence' | 'nps' | 'csat' | 'ces' | 'investment' | 'brief' | 'templates';

const tools = [
  { id: 'sample-size' as ToolId, icon: Calculator, name: 'Calculadora de tamaño de muestra', desc: 'Determina el tamaño muestral necesario para tu estudio.' },
  { id: 'margin-error' as ToolId, icon: Calculator, name: 'Calculadora de margen de error', desc: 'Calcula el margen de error para un tamaño de muestra dado.' },
  { id: 'confidence' as ToolId, icon: Calculator, name: 'Calculadora de nivel de confianza', desc: 'Estima el nivel de confianza de tus resultados.' },
  { id: 'nps' as ToolId, icon: Calculator, name: 'Calculadora de NPS', desc: 'Calcula tu Net Promoter Score a partir de respuestas.' },
  { id: 'csat' as ToolId, icon: Calculator, name: 'Calculadora de CSAT', desc: 'Mide la satisfacción del cliente con escalas de 1 a 5.' },
  { id: 'ces' as ToolId, icon: Calculator, name: 'Calculadora de CES', desc: 'Evalúa el esfuerzo del cliente en una interacción.' },
  { id: 'investment' as ToolId, icon: Calculator, name: 'Estimador de inversión', desc: 'Estima el costo de un estudio de investigación.' },
  { id: 'brief' as ToolId, icon: FileText, name: 'Generador de brief', desc: 'Crea un brief de investigación paso a paso.' },
  { id: 'templates' as ToolId, icon: Download, name: 'Plantillas descargables', desc: 'Plantillas listas para usar en tus proyectos.' },
];

function SampleSizeCalc({ isDark }: { isDark: boolean }) {
  const [population, setPopulation] = useState(100000);
  const [confidence, setConfidence] = useState(95);
  const [error, setError] = useState(5);

  const zScore = confidence === 99 ? 2.576 : confidence === 95 ? 1.96 : 1.645;
  const p = 0.5;
  const e = error / 100;
  const sample = Math.ceil((zScore * zScore * p * (1 - p)) / (e * e));
  const adjusted = Math.ceil((sample * population) / (sample + population - 1));

  return (
    <div className="space-y-6">
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Población total</label>
        <input type="number" value={population} onChange={e => setPopulation(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Nivel de confianza</label>
        <select value={confidence} onChange={e => setConfidence(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
          <option value={90}>90%</option>
          <option value={95}>95%</option>
          <option value={99}>99%</option>
        </select>
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Margen de error (%)</label>
        <input type="number" value={error} onChange={e => setError(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">Tamaño de muestra recomendado</div>
        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{adjusted.toLocaleString()}</div>
        <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Muestra ajustada para población finita</div>
      </div>
    </div>
  );
}

function MarginErrorCalc({ isDark }: { isDark: boolean }) {
  const [sample, setSample] = useState(384);
  const [population, setPopulation] = useState(100000);
  const [confidence, setConfidence] = useState(95);

  const zScore = confidence === 99 ? 2.576 : confidence === 95 ? 1.96 : 1.645;
  const p = 0.5;
  const adjustedSample = (sample * population) / (sample + population - 1);
  const error = (zScore * Math.sqrt((p * (1 - p)) / adjustedSample)) * 100;

  return (
    <div className="space-y-6">
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tamaño de muestra</label>
        <input type="number" value={sample} onChange={e => setSample(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Población total</label>
        <input type="number" value={population} onChange={e => setPopulation(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Nivel de confianza</label>
        <select value={confidence} onChange={e => setConfidence(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
          <option value={90}>90%</option>
          <option value={95}>95%</option>
          <option value={99}>99%</option>
        </select>
      </div>
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">Margen de error</div>
        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>±{error.toFixed(2)}%</div>
      </div>
    </div>
  );
}

function NPSCalc({ isDark }: { isDark: boolean }) {
  const [promoters, setPromoters] = useState(60);
  const [passives, setPassives] = useState(20);
  const [detractors, setDetractors] = useState(20);

  const total = promoters + passives + detractors || 1;
  const nps = Math.round((promoters / total * 100) - (detractors / total * 100));

  return (
    <div className="space-y-6">
      {[
        { label: 'Promotores (9-10)', value: promoters, set: setPromoters, color: 'text-green-500' },
        { label: 'Pasivos (7-8)', value: passives, set: setPassives, color: 'text-yellow-500' },
        { label: 'Detractores (0-6)', value: detractors, set: setDetractors, color: 'text-red-500' },
      ].map((item, i) => (
        <div key={i}>
          <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</label>
          <input type="number" value={item.value} onChange={e => item.set(Number(e.target.value))}
            className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
            ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
        </div>
      ))}
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">Tu NPS</div>
        <div className={`text-4xl font-bold ${nps >= 0 ? 'text-green-500' : 'text-[#fd3838]'}`}>{nps > 0 ? '+' : ''}{nps}</div>
        <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Escala de -100 a +100</div>
      </div>
    </div>
  );
}

function CSATCalc({ isDark }: { isDark: boolean }) {
  const [satisfied, setSatisfied] = useState(80);
  const [total, setTotal] = useState(100);

  const csat = total > 0 ? (satisfied / total * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Clientes satisfechos (4-5)</label>
        <input type="number" value={satisfied} onChange={e => setSatisfied(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total de respuestas</label>
        <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">CSAT Score</div>
        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{csat.toFixed(1)}%</div>
      </div>
    </div>
  );
}

function CESCalc({ isDark }: { isDark: boolean }) {
  const [totalScore, setTotalScore] = useState(350);
  const [count, setCount] = useState(100);

  const ces = count > 0 ? totalScore / count : 0;

  return (
    <div className="space-y-6">
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Suma total de respuestas</label>
        <input type="number" value={totalScore} onChange={e => setTotalScore(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Número de respuestas</label>
        <input type="number" value={count} onChange={e => setCount(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">CES Score</div>
        <div className={`text-4xl font-bold ${ces <= 2 ? 'text-green-500' : 'text-[#fd3838]'}`}>{ces.toFixed(2)}</div>
        <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Menor = mejor (escala 1-7)</div>
      </div>
    </div>
  );
}

function InvestmentCalc({ isDark }: { isDark: boolean }) {
  const [sample, setSample] = useState(400);
  const [methodology, setMethodology] = useState('quant');
  const [regions, setRegions] = useState(1);

  const baseCost = methodology === 'quant' ? 80 : methodology === 'qual' ? 150 : 120;
  const total = sample * baseCost * regions;

  return (
    <div className="space-y-6">
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tamaño de muestra</label>
        <input type="number" value={sample} onChange={e => setSample(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Metodología</label>
        <select value={methodology} onChange={e => setMethodology(e.target.value)}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}>
          <option value="quant">Cuantitativa</option>
          <option value="qual">Cualitativa</option>
          <option value="mixed">Híbrida</option>
        </select>
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Número de regiones</label>
        <input type="number" value={regions} onChange={e => setRegions(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">Estimación de inversión</div>
        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>${total.toLocaleString()} USD</div>
        <div className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Estimación referencial. Solicita una cotización exacta.</div>
      </div>
    </div>
  );
}

function ConfidenceCalc({ isDark }: { isDark: boolean }) {
  const [sample, setSample] = useState(384);
  const [population, setPopulation] = useState(100000);
  const [error, setError] = useState(5);

  const e = error / 100;
  const p = 0.5;
  const adjustedSample = (sample * population) / (sample + population - 1);
  const z = Math.sqrt(adjustedSample * e * e / (p * (1 - p)));
  const confidence = z >= 2.576 ? 99 : z >= 1.96 ? 95 : z >= 1.645 ? 90 : 80;

  return (
    <div className="space-y-6">
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Tamaño de muestra</label>
        <input type="number" value={sample} onChange={e => setSample(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Población total</label>
        <input type="number" value={population} onChange={e => setPopulation(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div>
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Margen de error (%)</label>
        <input type="number" value={error} onChange={e => setError(Number(e.target.value))}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`} />
      </div>
      <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-2">Nivel de confianza aproximado</div>
        <div className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{confidence}%</div>
      </div>
    </div>
  );
}

function BriefGenerator({ isDark }: { isDark: boolean }) {
  const [form, setForm] = useState({ company: '', objective: '', audience: '', timeline: '', budget: '' });
  const [generated, setGenerated] = useState(false);

  return (
    <div className="space-y-6">
      {[
        { key: 'company', label: 'Nombre de la empresa' },
        { key: 'objective', label: 'Objetivo de la investigación' },
        { key: 'audience', label: 'Audiencia objetivo' },
        { key: 'timeline', label: 'Tiempo estimado' },
        { key: 'budget', label: 'Presupuesto aproximado' },
      ].map((field, i) => (
        <div key={i}>
          <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{field.label}</label>
          <input
            type="text"
            value={form[field.key as keyof typeof form]}
            onChange={e => setForm({ ...form, [field.key]: e.target.value })}
            className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
            ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
          />
        </div>
      ))}
      <button
        onClick={() => setGenerated(true)}
        className="w-full bg-[#fd3838] text-white py-3 text-xs font-semibold tracking-wider uppercase transition-colors hover:bg-[#aa2121]"
      >
        Generar brief
      </button>
      {generated && (
        <div className={`p-6 border-l-2 border-[#fd3838] ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="text-xs tracking-wide uppercase text-[#fd3838] mb-3">Brief generado</div>
          <div className={`text-sm space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <p><strong>Empresa:</strong> {form.company || 'N/D'}</p>
            <p><strong>Objetivo:</strong> {form.objective || 'N/D'}</p>
            <p><strong>Audiencia:</strong> {form.audience || 'N/D'}</p>
            <p><strong>Timeline:</strong> {form.timeline || 'N/D'}</p>
            <p><strong>Presupuesto:</strong> {form.budget || 'N/D'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TemplatesList({ isDark }: { isDark: boolean }) {
  const templates = [
    'Plantilla de cuestionario cuantitativo',
    'Plantilla de guía de focus group',
    'Plantilla de brief de investigación',
    'Plantilla de reporte ejecutivo',
    'Plantilla de análisis competitivo',
  ];
  return (
    <div className="space-y-4">
      {templates.map((t, i) => (
        <div key={i} className={`flex items-center justify-between p-4 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{t}</span>
          <button className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase">
            <Download size={14} /> Descargar
          </button>
        </div>
      ))}
    </div>
  );
}

export default function Herramientas({ onNavigate }: PageProps) {
  const { isDark } = useTheme();

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Herramientas</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            Herramientas gratuitas para <span className="text-[#fd3838]">tomadores de decisiones</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Calculadoras, generadores y plantillas diseñadas para profesionales que necesitan respuestas rápidas y confiables.
          </p>
        </div>
      </section>

      {/* Tools grid */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t, i) => (
              <button
                key={t.id}
                onClick={() => onNavigate('tool-detail', { toolId: t.id })}
                className={`group p-6 border text-left transition-all duration-300
                  ${isDark ? 'bg-gray-950 border-white/5 hover:border-[#fd3838]/30' : 'bg-white border-black/5 hover:shadow-xl'}`}
                style={{ animationDelay: `${(i % 3) * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-[#fd3838]/10 flex items-center justify-center mb-5">
                  <t.icon size={20} className="text-[#fd3838]" />
                </div>
                <h3 className="text-base font-semibold mb-2 transition-colors group-hover:text-[#fd3838]">{t.name}</h3>
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.desc}</p>
                <div className="flex items-center gap-2 text-[#fd3838] text-xs font-semibold tracking-wider uppercase">
                  Abrir herramienta
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Necesitas algo más personalizado?</h2>
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
