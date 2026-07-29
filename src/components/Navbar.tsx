import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navLinks = [
  { label: 'Inicio', page: 'home' },
  { label: 'Nosotros', page: 'nosotros' },
  {
    label: 'Soluciones', page: 'soluciones',
    children: [
      { label: 'Expandir empresa', page: 'soluciones' },
      { label: 'Incrementar ventas', page: 'soluciones' },
      { label: 'Conocer al consumidor', page: 'soluciones' },
      { label: 'Lanzar un producto', page: 'soluciones' },
      { label: 'Analizar competencia', page: 'soluciones' },
    ]
  },
  { label: 'Portafolio', page: 'portafolio' },
  { label: 'Herramientas', page: 'herramientas' },
  { label: 'Blog', page: 'blog' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const bg = scrolled
    ? isDark ? 'bg-black/95 backdrop-blur-md border-b border-white/5' : 'bg-white/95 backdrop-blur-md border-b border-black/5 shadow-sm'
    : 'bg-transparent';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex-shrink-0">
            <img
              src={isDark ? '/assets/logos/XERYUS_Blanco_con_rojo.png' : '/assets/logos/XERYUS_Negro_con_rojo.png'}
              alt="XERYUS"
              className="h-9 w-auto object-contain"
            />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.page + link.label} className="relative group">
                <button
                  onClick={() => onNavigate(link.page)}
                  className={`flex items-center gap-1 px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-200
                    ${currentPage === link.page
                      ? 'text-[#fd3838]'
                      : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'
                    }`}
                >
                  {link.label}
                  {link.children && <ChevronDown size={12} className="mt-0.5" />}
                </button>

                {link.children && (
                  <div className={`absolute top-full left-0 mt-1 w-52 py-2 rounded-none shadow-2xl border-t-2 border-[#fd3838] transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                    ${isDark ? 'bg-gray-950 border-l border-r border-b border-white/10' : 'bg-white border-l border-r border-b border-black/5'}`}>
                    {link.children.map(child => (
                      <button
                        key={child.label}
                        onClick={() => onNavigate(child.page)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium tracking-wide transition-colors duration-150
                          ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-black hover:bg-gray-50'}`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 ${isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-black hover:bg-black/5'}`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => onNavigate('contacto')}
              className="hidden lg:flex items-center gap-2 bg-[#fd3838] text-white px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-lg hover:shadow-red-900/20"
            >
              Contacto
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen' : 'max-h-0'} ${isDark ? 'bg-black border-t border-white/10' : 'bg-white border-t border-black/5'}`}>
        <div className="px-6 py-4 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.page + link.label}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`w-full text-left py-3 text-sm font-medium border-b transition-colors duration-150
                ${isDark ? 'text-gray-300 border-white/5 hover:text-white' : 'text-gray-700 border-black/5 hover:text-black'}`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onNavigate('contacto'); setMobileOpen(false); }}
            className="w-full mt-4 bg-[#fd3838] text-white py-3 text-sm font-semibold tracking-wider uppercase"
          >
            Contacto
          </button>
        </div>
      </div>
    </nav>
  );
}
