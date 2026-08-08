import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import {
  Star, Quote, ChevronLeft, ChevronRight, Play, Pause,
  SkipBack, SkipForward, Volume2, VolumeX, Maximize,
} from 'lucide-react';

// Reseñas escritas: contenido inventado, con nombres de personas también
// inventadas (distintos de los contactos reales de los videos de abajo).
const reviews = [
  {
    name: 'Fernanda Ríos',
    role: 'Directora de Marca',
    rating: 5,
    text: 'Desde el primer contacto sentí la seriedad con la que trabajan. Nos entregaron resultados claros y accionables en el tiempo que prometieron, sin rodeos ni sorpresas.',
  },
  {
    name: 'Sebastián Cruz',
    role: 'Gerente General',
    rating: 5,
    text: 'La atención fue impecable de principio a fin. Se notó la formalidad del equipo y la facilidad con la que adaptaron la metodología a nuestras necesidades específicas.',
  },
  {
    name: 'Paulina Estrada',
    role: 'Jefa de Innovación',
    rating: 5,
    text: 'Lo que más valoro es la rapidez con la que trabajan sin perder rigor. Nos ayudaron a tomar una decisión importante con información sólida, no con suposiciones.',
  },
  {
    name: 'Emilio Vargas',
    role: 'Director de Expansión',
    rating: 5,
    text: 'Su asertividad al presentar los hallazgos y las recomendaciones fue justo lo que necesitábamos. Un equipo profesional, puntual y muy fácil de coordinar.',
  },
];

// Videos reales: el nombre y puesto son los contactos reales de cada cliente,
// mostrados como pie de foto del video (no de las reseñas escritas).
const videos = [
  {
    client: 'PROSIC',
    logo: '',
    contactName: 'Miguel Tapia',
    contactRole: 'Gerente de Marketing',
    videoUrl: 'https://res.cloudinary.com/fx7hcjz4/video/upload/v1786146248/PROSIC_1_huoyj3.mp4',
  },
  {
    client: 'ITESO',
    logo: '/assets/clients/iteso.png',
    contactName: 'Aida Ávila',
    contactRole: 'Especialista en Evaluación y Análisis',
    videoUrl: 'https://res.cloudinary.com/fx7hcjz4/video/upload/v1786146255/ITESO_1_f4d7pc.mp4',
  },
  {
    client: 'Chizy Chiz Pizza',
    logo: '/assets/clients/chizychiz.png',
    contactName: 'Claudia Navarro',
    contactRole: 'Encargada de Finanzas',
    videoUrl: 'https://res.cloudinary.com/fx7hcjz4/video/upload/v1786146252/Galo_1_u5mjg0.mp4',
  },
  {
    client: 'Caja Popular Tata Vasco',
    logo: '/assets/clients/cpt.png',
    contactName: 'Jayr Hernández',
    contactRole: 'Gerente de Marketing',
    videoUrl: 'https://res.cloudinary.com/fx7hcjz4/video/upload/v1786146289/Tata_Vasco_1_fctlvk.mp4',
  },
];

const SKIP_SECONDS = 10;

function TestimonialVideo({ url, client, logo }: { url: string; client: string; logo: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [client]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      setIsMuted(false);
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  };

  return (
    <div ref={containerRef} className="group relative aspect-video overflow-hidden bg-black">
      <video
        ref={videoRef}
        src={url}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlay}
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
        muted={isMuted}
        playsInline
      />

      {/* Portada: logo/nombre abajo a la izquierda + degradado oscuro, visible hasta que se reproduce */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />
        <div className="absolute bottom-4 left-4 right-4">
          {logo ? (
            <img src={logo} alt={client} className="h-10 md:h-14 max-w-[70%] object-contain object-left drop-shadow-lg" style={{ filter: 'brightness(0) invert(1)' }} />
          ) : (
            <p className="text-white text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>{client}</p>
          )}
        </div>
      </div>

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

      {/* Barra de controles */}
      <div
        className={`absolute bottom-0 left-0 right-0 px-3 pb-2 pt-8 bg-gradient-to-t from-black/85 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
        onClick={e => e.stopPropagation()}
      >
        <div onClick={handleSeek} className="h-1 w-full rounded-full bg-white/20 cursor-pointer mb-2.5">
          <div className="h-full rounded-full bg-[#fd3838] transition-[width] duration-150" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button onClick={() => skip(-SKIP_SECONDS)} aria-label="Retroceder 10 segundos" className="text-white/90 hover:text-white transition-colors">
              <SkipBack size={15} />
            </button>
            <button onClick={togglePlay} aria-label={isPlaying ? 'Pausar' : 'Reproducir'} className="text-white/90 hover:text-white transition-colors">
              {isPlaying ? <Pause size={16} className="fill-white" /> : <Play size={16} className="fill-white ml-0.5" />}
            </button>
            <button onClick={() => skip(SKIP_SECONDS)} aria-label="Adelantar 10 segundos" className="text-white/90 hover:text-white transition-colors">
              <SkipForward size={15} />
            </button>
            <button onClick={toggleMute} aria-label={isMuted ? 'Activar sonido' : 'Silenciar'} className="text-white/90 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
          <button onClick={toggleFullscreen} aria-label="Pantalla completa" className="text-white/90 hover:text-white transition-colors">
            <Maximize size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { isDark } = useTheme();
  const [activeText, setActiveText] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveText(prev => (prev + 1) % reviews.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const nextText = () => setActiveText(prev => (prev + 1) % reviews.length);
  const prevText = () => setActiveText(prev => (prev - 1 + reviews.length) % reviews.length);
  const nextVideo = () => setActiveVideo(prev => (prev + 1) % videos.length);
  const prevVideo = () => setActiveVideo(prev => (prev - 1 + videos.length) % videos.length);
  const activeVideoData = videos[activeVideo];

  return (
    <section className={`py-24 transition-colors duration-300 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-label">Testimonios</span>
          <h2 className={`section-title text-3xl md:text-4xl lg:text-5xl mt-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Lo que dicen quienes <span className="text-[#fd3838]">deciden con nosotros</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left - video carousel (independiente) */}
          <div className="min-w-0">
            <TestimonialVideo url={activeVideoData.videoUrl} client={activeVideoData.client} logo={activeVideoData.logo} />

            {/* Pie de foto: nombre y puesto reales del contacto en el video */}
            <div className="mt-4">
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>{activeVideoData.contactName}</div>
              <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{activeVideoData.contactRole} · {activeVideoData.client}</div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <button onClick={prevVideo} aria-label="Video anterior" className={`p-2 border transition-colors duration-200
                ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {videos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVideo(i)}
                    aria-label={`Ver video ${i + 1}`}
                    className={`h-1 transition-all duration-300 ${i === activeVideo ? 'w-8 bg-[#fd3838]' : 'w-2 bg-gray-300'}`}
                  />
                ))}
              </div>
              <button onClick={nextVideo} aria-label="Video siguiente" className={`p-2 border transition-colors duration-200
                ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Right - quote carousel (independiente) */}
          <div className="relative min-w-0">
            <Quote size={40} className={`mb-6 ${isDark ? 'text-white/10' : 'text-black/10'}`} />

            <div className="overflow-hidden">
              <div className="transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeText * 100}%)` }}>
                <div className="flex">
                  {reviews.map((t, i) => (
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
                          <div className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-10">
              <button onClick={prevText} aria-label="Anterior" className={`p-2 border transition-colors duration-200
                ${isDark ? 'border-white/10 text-gray-400 hover:text-white hover:border-white/30' : 'border-black/10 text-gray-400 hover:text-black hover:border-black/30'}`}>
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveText(i)}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    className={`h-1 transition-all duration-300 ${i === activeText ? 'w-8 bg-[#fd3838]' : 'w-2 bg-gray-300'}`}
                  />
                ))}
              </div>
              <button onClick={nextText} aria-label="Siguiente" className={`p-2 border transition-colors duration-200
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
