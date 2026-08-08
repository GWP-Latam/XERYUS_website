import { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { isCorporateEmail } from '@/lib/freeEmailDomains';

interface ContactFormCardProps {
  isDark: boolean;
  prefillMessage?: string;
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
}

const HONEYPOT_FIELD = 'website_url';

export default function ContactFormCard({ isDark, prefillMessage, onNavigate }: ContactFormCardProps) {
  const [form, setForm] = useState({
    name: '', email: '', company: '', phone: '', message: prefillMessage || ''
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const startedAt = useRef(Date.now());
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isCorporateEmail(form.email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);

    setSending(true);
    setError(false);

    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          [HONEYPOT_FIELD]: honeypotRef.current?.value || '',
          formStartedAt: startedAt.current,
        }),
      });
    } catch (err) {
      console.error('Error enviando el formulario de contacto:', err);
      setError(true);
    }

    onNavigate('gracias', { ...form });
  };

  return (
    <form onSubmit={handleSubmit} className={`p-8 border ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-white'}`}>
      {/* Honeypot anti-spam: invisible para personas, los bots sí lo rellenan */}
      <input
        ref={honeypotRef}
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        className="absolute w-0 h-0 opacity-0 pointer-events-none"
        aria-hidden="true"
      />

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
            onChange={e => { setForm({ ...form, email: e.target.value }); setEmailError(false); }}
            className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors
            ${emailError ? 'border-[#fd3838]' : isDark ? 'border-white/10' : 'border-black/10'} ${isDark ? 'text-white' : 'text-black'}`}
          />
          {emailError && (
            <p className="mt-2 text-xs text-[#fd3838]">Usa tu correo corporativo, no aceptamos correos de proveedores gratuitos (Gmail, Hotmail, Outlook, etc.).</p>
          )}
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
        <label className={`text-xs tracking-wide uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Mensaje</label>
        <textarea
          rows={5} value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className={`w-full mt-2 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors resize-none
          ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'}`}
        />
      </div>
      {error && (
        <p className="mt-4 text-xs text-[#fd3838]">
          Hubo un problema al enviar tu mensaje, pero seguimos adelante — si no te contactamos pronto, escríbenos directo a contacto@xeryusinvest.com.
        </p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="group flex items-center gap-2 bg-[#fd3838] text-white px-8 py-4 mt-6 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] active:scale-95 disabled:opacity-60 disabled:cursor-wait"
      >
        {sending ? 'Enviando…' : 'Enviar mensaje'}
        <Send size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}
