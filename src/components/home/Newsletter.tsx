import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Mail, Send, Check } from 'lucide-react';

export default function Newsletter() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className={`py-20 border-t transition-colors duration-300 ${isDark ? 'border-white/5 bg-gray-950' : 'border-black/5 bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div className="w-14 h-14 mx-auto bg-[#fd3838]/10 flex items-center justify-center mb-6">
          <Mail size={22} className="text-[#fd3838]" />
        </div>
        <h2 className={`section-title text-2xl md:text-3xl mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
        Insights de mercado, directo a tu correo
        </h2>
        <p className={`text-base leading-relaxed mb-8 max-w-lg mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Suscríbete a nuestro newsletter y recibe análisis, tendencias y casos de estudio de investigación de mercados. Sin spam.
        </p>

        {submitted ? (
          <div className={`flex items-center justify-center gap-3 py-4 ${isDark ? 'text-white' : 'text-black'}`}>
            <div className="w-9 h-9 bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
              <Check size={16} className="text-[#fd3838]" />
            </div>
            <p className="text-sm font-medium">Listo, te esperamos en tu bandeja de entrada.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="tu@empresa.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`flex-1 p-3 border bg-transparent focus:outline-none focus:border-[#fd3838] transition-colors text-sm
                ${isDark ? 'border-white/10 text-white placeholder:text-gray-600' : 'border-black/10 text-black placeholder:text-gray-400'}`}
            />
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 bg-[#fd3838] text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] active:scale-95 flex-shrink-0"
            >
              Suscribirme
              <Send size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
