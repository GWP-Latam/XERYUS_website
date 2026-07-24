import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeroProps {
  onNavigate: (page: string) => void;
  videoUrl?: string;
}

const DEFAULT_VIDEO_URL = 'https://res.cloudinary.com/fx7hcjz4/video/upload/v1784932073/Xeryus_InstAnim_VF_1_s3n9vx.mp4';
const POSTER_URL = '/assets/videos/portada-video.jpeg';

export default function Hero({ onNavigate, videoUrl = DEFAULT_VIDEO_URL }: HeroProps) {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = '253,56,56';
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},0.4)`;
        ctx.fill();

        particles.slice(i + 1).forEach(p2 => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color},${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isDark]);

  return (
    <section className={`relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#fd3838]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-[#ed5c5c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating isotipo in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src="/assets/logos/XERYUS_ISO_ROJO.png"
          alt=""
          className="w-[280px] md:w-[400px] lg:w-[500px] h-auto object-contain opacity-[0.06] animate-float"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left - Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-3 animate-fade-in-up">
              <div className="red-line" />
              <span className={`text-xs tracking-[0.3em] uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Inteligencia de Mercados · Investigación Estratégica
              </span>
            </div>

            <h1 className={`section-title text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.1] animate-fade-in-up delay-100 ${isDark ? 'text-white' : 'text-black'}`}>
              Hay millones en juego.{' '}
              <span className="text-[#fd3838]">No es momento de adivinar.</span>
            </h1>

            <p className={`text-lg md:text-xl leading-relaxed max-w-xl animate-fade-in-up delay-200 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Más de 30 años ayudando a líderes de industria a encontrar su próxima gran oportunidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button
                onClick={() => onNavigate('contacto')}
                className="group flex items-center justify-center gap-2 bg-[#fd3838] text-white px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#aa2121] hover:shadow-xl hover:shadow-red-900/20 active:scale-95"
              >
                Solicitar asesoría
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('casos')}
                className={`flex items-center justify-center gap-2 border px-8 py-4 text-xs font-semibold tracking-wider uppercase transition-all duration-300 active:scale-95
                  ${isDark ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/20 text-black hover:bg-black hover:text-white'}`}
              >
                Ver casos de éxito
              </button>
            </div>
          </div>

          {/* Right - Video */}
          <div className="lg:col-span-5 animate-slide-in-right delay-300">
            <div className="relative group">
              <div className={`relative aspect-video overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-900'}`}>
                {videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      poster={POSTER_URL}
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

                    {/* Center play button with glass effect */}
                    {!isPlaying && (
                      <button
                        onClick={togglePlay}
                        aria-label="Reproducir video"
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="absolute w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110" />
                        <Play size={26} className="relative text-white fill-white ml-1 drop-shadow" />
                      </button>
                    )}

                    {/* Custom controls bar */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
                    >
                      <div
                        onClick={handleSeek}
                        className="h-1 w-full rounded-full bg-white/20 cursor-pointer mb-3"
                      >
                        <div
                          className="h-full rounded-full bg-[#fd3838] transition-[width] duration-150"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button onClick={togglePlay} aria-label={isPlaying ? 'Pausar' : 'Reproducir'} className="text-white/90 hover:text-white transition-colors">
                            {isPlaying ? <Pause size={16} className="fill-white" /> : <Play size={16} className="fill-white ml-0.5" />}
                          </button>
                          <button onClick={toggleMute} aria-label={isMuted ? 'Activar sonido' : 'Silenciar'} className="text-white/90 hover:text-white transition-colors">
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                          </button>
                        </div>
                        <button onClick={toggleFullscreen} aria-label="Pantalla completa" className="text-white/90 hover:text-white transition-colors">
                          <Maximize size={15} />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
                    <div className="absolute inset-0 noise opacity-30" />

                    <div className="relative z-10 text-center px-8">
                      <div className="w-20 h-20 mx-auto mb-6 border-2 border-white/20 rounded-full flex items-center justify-center group-hover:border-[#fd3838] transition-colors duration-300">
                        <Play size={28} className="text-white/60 group-hover:text-[#fd3838] transition-colors duration-300 ml-1" />
                      </div>
                      <p className="text-white/40 text-sm tracking-wider uppercase">Espacio para tu video institucional</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className={`w-px h-12 ${isDark ? 'bg-white/20' : 'bg-black/20'}`} />
      </div>
    </section>
  );
}
