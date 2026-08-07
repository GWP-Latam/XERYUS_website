import { useState } from 'react';
import { Send, Check } from 'lucide-react';

interface ContactFormCardProps {
  isDark: boolean;
  prefillMessage?: string;
}

export default function ContactFormCard({ isDark, prefillMessage }: ContactFormCardProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', challenge: '', message: prefillMessage || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
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
    );
  }

  return (
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
          style={{ colorScheme: isDark ? 'dark' : 'light' }}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
        >
          <option value="" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Selecciona una opción</option>
          <option value="expandir" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Expandir mi empresa</option>
          <option value="sucursales" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Abrir nuevas sucursales</option>
          <option value="ventas" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Incrementar ventas</option>
          <option value="clientes" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Entender a mis clientes</option>
          <option value="producto" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Lanzar un nuevo producto</option>
          <option value="marca" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Fortalecer mi marca</option>
          <option value="competencia" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Analizar a mi competencia</option>
          <option value="experiencia" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Mejorar la experiencia del cliente</option>
          <option value="inversion" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Validar una inversión</option>
          <option value="ubicacion" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Seleccionar la mejor ubicación</option>
          <option value="otro" className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>Otro</option>
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
  );
}
