import { useTheme } from '@/context/ThemeContext';
import CalendlyInline from '@/components/CalendlyInline';
import { Check, User, Mail, Phone, Building2, MessageSquare, CalendarClock } from 'lucide-react';

interface PageProps {
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

interface SubmittedData {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
}

export default function Gracias({ onNavigate, ...data }: PageProps & SubmittedData) {
  const { isDark } = useTheme();
  const { name, email, company, phone, message } = data;
  const hasSubmission = Boolean(name || email);

  const rows = [
    { icon: User, label: 'Nombre', value: name },
    { icon: Mail, label: 'Correo', value: email },
    { icon: Building2, label: 'Empresa', value: company },
    { icon: Phone, label: 'Teléfono', value: phone },
  ].filter(r => r.value);

  return (
    <div className={`pt-20 min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left - recap */}
            <div className="lg:col-span-5">
              <div className="w-14 h-14 bg-[#fd3838]/10 flex items-center justify-center mb-6">
                <Check size={24} className="text-[#fd3838]" />
              </div>
              <span className="section-label">Mensaje recibido</span>
              <h1 className="section-title text-3xl md:text-4xl mt-4 mb-6 leading-[1.15]">
                {name ? `Gracias, ${name.split(' ')[0]}.` : 'Gracias por escribirnos.'}
              </h1>
              <p className={`text-lg leading-relaxed mb-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Recibimos tu información. Nuestro equipo se pondrá en contacto contigo lo antes posible.
              </p>

              {hasSubmission && (
                <div className={`border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
                  <div className={`px-6 py-4 border-b ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <span className={`text-xs tracking-[0.2em] uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Lo que nos enviaste
                    </span>
                  </div>
                  <div className="p-6 space-y-5">
                    {rows.map(row => (
                      <div key={row.label} className="flex items-start gap-4">
                        <div className="w-9 h-9 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                          <row.icon size={15} className="text-[#fd3838]" />
                        </div>
                        <div>
                          <div className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{row.label}</div>
                          <div className="text-sm font-medium break-words">{row.value}</div>
                        </div>
                      </div>
                    ))}
                    {message && (
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                          <MessageSquare size={15} className="text-[#fd3838]" />
                        </div>
                        <div>
                          <div className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Mensaje</div>
                          <div className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{message}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={() => onNavigate('home')}
                className={`mt-10 text-xs tracking-wider uppercase font-semibold ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
              >
                Volver al inicio
              </button>
            </div>

            {/* Right - Calendly */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <CalendarClock size={18} className="text-[#fd3838]" />
                <span className="section-label">Adelanta el paso</span>
              </div>
              <h2 className="section-title text-2xl md:text-3xl mb-3">
                Si prefieres, agenda una llamada ahora mismo
              </h2>
              <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Elige el horario que te acomode y platiquemos directamente sobre tu proyecto.
              </p>
              <div className={`border ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                <CalendlyInline
                  isDark={isDark}
                  name={name || ''}
                  email={email || ''}
                  phone={phone || ''}
                  company={company || ''}
                  message={message || ''}
                  height={650}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
