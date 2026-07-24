import { useTheme } from '@/context/ThemeContext';
import { useInView } from '@/hooks/useAnimation';
import { Building2, MapPin, TrendingUp, Check, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
  onNavigate: (page: string) => void;
}

const analysis = [
  'Demanda potencial del proyecto',
  'Análisis de oferta y competencia en el área',
  'Perfil socioeconómico del comprador objetivo',
  'Precio óptimo de venta',
  'Velocidad de absorción estimada',
  'Factibilidad comercial y financiera',
];

const process = [
  { step: '01', title: 'Análisis territorial', desc: 'Geomarketing, zonificación y análisis de ubicación.' },
  { step: '02', title: 'Estudio de demanda', desc: 'Tamaño de mercado, perfil del comprador y disposición a pagar.' },
  { step: '03', title: 'Análisis de oferta', desc: 'Inventario competitivo, proyectos comparables y dinámica de mercado.' },
  { step: '04', title: 'Modelo financiero', desc: 'Precio óptimo, velocidad de absorción y factibilidad.' },
  { step: '05', title: 'Recomendación', desc: 'Reporte ejecutivo con decisión y respaldo metodológico.' },
];

const faqs = [
  { q: '¿Cuánto tarda un estudio de factibilidad?', a: 'Entre 4 y 8 semanas dependiendo del alcance y la complejidad del proyecto.' },
  { q: '¿Qué información necesito proporcionar?', a: 'Planos, ubicación, tipo de proyecto y objetivos. Nosotros nos encargamos del resto.' },
  { q: '¿El estudio garantiza el éxito del proyecto?', a: 'No garantiza el éxito, pero reduce significativamente el riesgo al validar la demanda, el precio y la velocidad de absorción antes de invertir.' },
];

export default function Factibilidad({ onNavigate }: PageProps) {
  const { isDark } = useTheme();
  const { ref, inView } = useInView(0.2);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center gap-3 mb-4">
            <Building2 size={20} className="text-[#fd3838]" />
            <span className="section-label">Factibilidad Inmobiliaria</span>
          </div>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl max-w-4xl">
            Valida tu próxima inversión inmobiliaria con <span className="text-[#fd3838]">evidencia</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Un micrositio dedicado a la factibilidad inmobiliaria. Reducimos el riesgo de tus proyectos con análisis de demanda, oferta, precio y absorción.
          </p>
        </div>
      </section>

      {/* Why */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="section-label">Por qué realizar un estudio</span>
              <h2 className="section-title text-3xl mt-4">La inversión más importante merece investigación</h2>
            </div>
            <div className="lg:col-span-7 space-y-4">
              {[
                'Reducir el riesgo de invertir en un proyecto sin demanda suficiente.',
                'Validar el precio de venta antes de comprometer capital.',
                'Conocer la velocidad de absorción realista del proyecto.',
                'Anticipar la dinámica competitiva del área.',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check size={18} className="text-[#fd3838] flex-shrink-0 mt-1" />
                  <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What we analyze */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="section-label">Qué analizamos</span>
          <h2 className="section-title text-3xl mt-4 mb-12">Una visión 360° del proyecto</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.map((item, i) => (
              <div key={i} className={`p-6 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#fd3838]/10 flex items-center justify-center">
                    <MapPin size={14} className="text-[#fd3838]" />
                  </div>
                  <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>0{i + 1}</span>
                </div>
                <p className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="section-label">Proceso</span>
          <h2 className="section-title text-3xl mt-4 mb-12">Del terreno a la decisión</h2>
          <div className="space-y-8">
            {process.map((p, i) => (
              <div key={i} className={`flex items-start gap-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-3xl font-bold text-[#fd3838] flex-shrink-0">{p.step}</div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="section-title text-3xl mt-4 mb-12">Resolvemos tus dudas</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className={`border ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-base font-medium">{faq.q}</span>
                  <ChevronDown size={18} className={`text-[#fd3838] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40' : 'max-h-0'}`}>
                  <p className={`p-5 pt-0 text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`py-20 border-t ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <TrendingUp size={32} className="text-[#fd3838] mx-auto mb-4" />
          <h2 className="section-title text-3xl md:text-4xl mb-6">¿Tienes un proyecto inmobiliario en mente?</h2>
          <button
            onClick={() => onNavigate('contacto')}
            className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase mx-auto transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
          >
            Hablemos de tu proyecto
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
