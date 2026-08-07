import { useTheme } from '@/context/ThemeContext';
import { Linkedin, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const seoConcepts = [
  { label: '¿Qué es la investigación de mercados?', page: 'blog-investigacion-mercados' },
  { label: '¿Qué son las encuestas?' },
  { label: '¿Qué es un focus group?' },
  { label: '¿Qué es un mystery shopper?' },
  { label: '¿Qué es la investigación cualitativa?' },
  { label: '¿Qué es la investigación cuantitativa?' },
  { label: '¿Qué es un estudio de mercado?' },
  { label: '¿Qué es el geomarketing?' },
];

const navColumns = [
  {
    title: 'Empresa',
    links: [
      { label: 'Nosotros', page: 'nosotros' },
      { label: 'Casos de éxito', page: 'portafolio' },
      { label: 'Blog', page: 'blog' },
      { label: 'Contacto', page: 'contacto' },
    ],
  },
  {
    title: 'Soluciones',
    links: [
      { label: 'Soluciones Estratégicas', page: 'soluciones' },
      { label: 'Factibilidad Inmobiliaria', page: 'factibilidad' },
      { label: 'Herramientas', page: 'herramientas' },
    ],
  },
];

export default function Footer({ onNavigate }: FooterProps) {
  const { isDark } = useTheme();

  return (
    <footer className={`transition-colors duration-300 ${isDark ? 'bg-gray-950 border-t border-white/5' : 'bg-gray-50 border-t border-black/5'}`}>
      {/* Main footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="lg:col-span-3">
              <img
                src={isDark ? '/assets/logos/XERYUS_Blanco_con_rojo.png' : '/assets/logos/XERYUS_Negro_con_rojo.png'}
                alt="XERYUS"
                className="h-10 w-auto mb-6"
              />
              <p className={`text-sm leading-relaxed mb-6 max-w-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                Firma especializada en investigación de mercados e inteligencia estratégica. Transformamos datos en decisiones.
              </p>
              <div className="flex gap-3">
                {[Linkedin, Instagram, Facebook, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className={`w-9 h-9 flex items-center justify-center border transition-colors duration-200
                      ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-[#fd3838]' : 'border-black/10 text-gray-400 hover:text-black hover:border-[#fd3838]'}`}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {navColumns.map((col, i) => (
              <div key={i} className="lg:col-span-2">
                <h4 className={`text-xs tracking-[0.2em] uppercase font-semibold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <button
                        onClick={() => onNavigate(link.page)}
                        className={`text-sm transition-colors duration-200 ${isDark ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* SEO Concepts column */}
            <div className="lg:col-span-3">
              <h4 className={`text-xs tracking-[0.2em] uppercase font-semibold mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Conceptos clave
              </h4>
              <ul className="space-y-3">
                {seoConcepts.map((concept, i) => (
                  <li key={i}>
                    <button
                      onClick={() => concept.page && onNavigate(concept.page)}
                      disabled={!concept.page}
                      className={`text-left text-sm transition-colors duration-200 ${concept.page ? '' : 'cursor-default'} ${isDark ? 'text-gray-500 hover:text-[#fd3838]' : 'text-gray-500 hover:text-[#fd3838]'}`}
                    >
                      {concept.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact bar */}
          <div className={`mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-[#fd3838]" />
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Guadalajara · Austin · París</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#fd3838]" />
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>contacto@xeryus.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#fd3838]" />
                <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>+52 33 0000 0000</span>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className={`mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
            <p className={`text-xs ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              © {new Date().getFullYear()} XERYUS. Todos los derechos reservados.
            </p>
            <div className="flex gap-6">
              <button className={`text-xs transition-colors ${isDark ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-black'}`}>Política de privacidad</button>
              <button className={`text-xs transition-colors ${isDark ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-black'}`}>Aviso de privacidad</button>
              <button className={`text-xs transition-colors ${isDark ? 'text-gray-600 hover:text-gray-300' : 'text-gray-400 hover:text-black'}`}>Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
