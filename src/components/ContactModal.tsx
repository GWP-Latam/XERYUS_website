import { useEffect } from 'react';
import { X } from 'lucide-react';
import ContactFormCard from '@/components/ContactFormCard';

interface ContactModalProps {
  isDark: boolean;
  prefillMessage?: string;
  onNavigate: (page: string, data?: Record<string, unknown>) => void;
  onClose: () => void;
}

export default function ContactModal({ isDark, prefillMessage, onNavigate, onClose }: ContactModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className={`absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center transition-colors
            ${isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-black'}`}
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-8 pt-14">
          <span className="section-label">Contacto</span>
          <h2 className="section-title text-2xl md:text-3xl mt-3 mb-6">
            Hablemos de tu <span className="text-[#fd3838]">próxima decisión</span>
          </h2>
          <ContactFormCard isDark={isDark} prefillMessage={prefillMessage} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}
