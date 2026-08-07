import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause, Film } from 'lucide-react';

const testimonials = [
  {
    name: 'Roberto Mendoza',
    role: 'Director de Expansión',
    company: 'Grupo Inmobiliario del Norte',
    rating: 5,
    text: 'XERYUS transformó nuestra forma de tomar decisiones de expansión. Su análisis de factibilidad nos ahorró meses de incertidumbre y nos dio la confianza para avanzar con datos sólidos.',
    videoUrl: '',
  },
  {
    name: 'Carolina Vega',
    role: 'CMO',
    company: 'Marca de Consumo Líder',
    rating: 5,
    text: 'No es una agencia más. Es un socio estratégico. Los reportes que entregan no solo describen el problema, sino que vienen con la solución ya estructurada y respaldada.',
    videoUrl: '',
  },
  {
    name: 'James Patterson',
    role: 'CEO',
    company: 'Tech Ventures Austin',
    rating: 5,
    text: 'Working with XERYUS gave us the clarity we needed before entering the Mexican market. Their hybrid methodology and actionable insights were exactly what our board needed.',
    videoUrl: '',
  },
];

function TestimonialVideo({ url, isDark }: { url: string; isDark: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
  }, [url]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  if (!url) {
    return (
      <div className={`relative aspect-video overflow-hidden flex items-center justify-center ${isDark ? 'bg-gray-950' : 'bg-gray-100'}`}>
        <div className="text-center px-8">
          <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-white'}`}>
            <Film size={22} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
          </div>
          <p className={`text-xs tracking-wider uppercase ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>Video próximamente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative aspect-video overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
        playsInline
      />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className={`absolute w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 transition-all duration-300 group-hover:scale-110 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
        {isPlaying ? (
          <Pause size={20} className="relative text-white opacity-0 group-hover:opacity-100 transition-opacity fill-white" />
        ) : (
          <Play size={20} className="relative text-white fill-white ml-1 drop-shadow" />
        )}
      </button>
    </div>
  );
}

export default function Testimonials() {
  const { isDark } = useTheme();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive(prev => (prev + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setActive(prev => (prev + 1) % testimonials.length);
  const prev = () => setActive(prev => (prev - 1 + testimonials.length) % testimonials.length);
  const activeTestimonial = testimonials[active];

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Testimonios</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Lo que dicen quienes <span className="text-[#fd3838]">deciden con nosotros</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left - video */}
          <TestimonialVideo url={activeTestimonial.videoUrl} isDark={isDark} />

          {/* Right - quote carousel */}
          <div className="relative">
            <Quote size={40} className={`mb-6 ${isDark ? 'text-white/10' : 'text-black/10'}`} />

            <div className="overflow-hidden">
              <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
                <div className="flex">
                  {testimonials.map((t, i) => (
                    <div key={i} className="w-full flex-shrink-0">
                      <div className="flex gap-1 mb-6">
                        {Array.from({ length: t.rating }).map((_, j) => (
                          <Star key={j} size={16} className="text-[#fd3838] fill-[#fd3838]" />
                        ))}
                      </div>
                      <p className={`text-xl md:text-2xl leading-relaxed font-light mb-8 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#fd3838]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#fd3838] font-bold text-sm">{t.name.charAt(0)}</span>
                        </div>
                        <div className="text-left">
                          <div className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{t.name}</div>
                          <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.role} · {t.company}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-10">
              <button onClick={prev} aria-label="Anterior" className={`p-2 border transition-colors duration-200
                ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    className={`h-1 transition-all duration-300 ${i === active ? 'w-8 bg-[#fd3838]' : 'w-2 bg-gray-300'}`}
                  />
                ))}
              </div>
              <button onClick={next} aria-label="Siguiente" className={`p-2 border transition-colors duration-200
                ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
