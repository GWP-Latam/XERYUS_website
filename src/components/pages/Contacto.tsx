import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function Contacto() {
  const { isDark } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', challenge: '', message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
              {submitted ? (
                <div className={`p-12 border text-center ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
                  <div className="w-16 h-16 mx-auto bg-[#fd3838]/10 flex items-center justify-center mb-6">
                    <Check size={28} className="text-[#fd3838]" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mensaje enviado</h3>
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas hábiles.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', phone: '', challenge: '', message: '' }); }}
                    className="mt-8 text-xs tracking-wider uppercase text-[#fd3838] font-semibold"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={`p-8 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Nombre completo *</label>
                      <input
                        required type="text" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
                        ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Email corporativo *</label>
                      <input
                        required type="email" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
                        ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Empresa</label>
                      <input
                        type="text" value={form.company}
                        onChange={e => setForm({ ...form, company: e.target.value })}
                        className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
                        ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                      />
                    </div>
                    <div>
                      <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Teléfono</label>
                      <input
                        type="tel" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
                        ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>¿Qué reto deseas resolver?</label>
                    <select
                      value={form.challenge}
                      onChange={e => setForm({ ...form, challenge: e.target.value })}
                      className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
                      ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="expandir">Expandir mi empresa</option>
                      <option value="sucursales">Abrir nuevas sucursales</option>
                      <option value="ventas">Incrementar ventas</option>
                      <option value="clientes">Entender a mis clientes</option>
                      <option value="producto">Lanzar un nuevo producto</option>
                      <option value="marca">Fortalecer mi marca</option>
                      <option value="competencia">Analizar a mi competencia</option>
                      <option value="experiencia">Mejorar la experiencia del cliente</option>
                      <option value="inversion">Validar una inversión</option>
                      <option value="ubicacion">Seleccionar la mejor ubicación</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="mt-6">
                    <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mensaje</label>
                    <textarea
                      rows={5} value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors resize-none
                      ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 mt-6 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] active:scale-95"
                  >
                    Enviar mensaje
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
