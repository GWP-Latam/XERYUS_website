import { useTheme } from '@/context/ThemeContext';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactFormCard from '@/components/ContactFormCard';

interface ContactoProps {
  prefillMessage?: string;
}

export default function Contacto({ prefillMessage }: ContactoProps) {
  const { isDark } = useTheme();

  return (
    <div className={`pt-20 transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <span className="section-label">Contacto</span>
          <h1 className="section-title text-4xl md:text-5xl lg:text-6xl mt-4 max-w-4xl">
            Hablemos de tu <span className="text-[#fd3838]">próxima decisión</span>
          </h1>
          <p className={`mt-8 text-lg max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Cuéntanos sobre tu proyecto y diseñemos juntos la solución de investigación que tu empresa necesita.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className={`py-20 border-y ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Info */}
            <div className="lg:col-span-4 space-y-8">
              <div>
                <h3 className="text-xs tracking-[0.2em] uppercase font-semibold mb-6">Información de contacto</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-[#fd3838]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Oficinas</div>
                      <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>C. Corrientes #3071, Colomos Providencia, 44630, Guadalajara, Jalisco.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#fd3838]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>contacto@xeryusinvest.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#fd3838]" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Teléfono</div>
                      <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>+52 1 33 1385 7143</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`border overflow-hidden ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                <iframe
                  title="Ubicación de Grupo WeProm"
                  src="https://www.google.com/maps?q=Grupo+WeProm&output=embed"
                  className={`w-full h-64 border-0 ${isDark ? 'grayscale invert-[92%] contrast-[90%]' : 'grayscale'}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-8">
              <ContactFormCard isDark={isDark} prefillMessage={prefillMessage} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
