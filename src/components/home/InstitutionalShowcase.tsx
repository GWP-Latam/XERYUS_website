import { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const DEFAULT_VIDEO_URL = 'https://res.cloudinary.com/fx7hcjz4/video/upload/v1784932073/Xeryus_InstAnim_VF_1_s3n9vx.mp4';
const POSTER_URL = '/assets/videos/portada-video.jpeg';

const clients = [
  { name: 'Coca-Cola', file: 'coca-cola.png' },
  { name: 'KIA', file: 'kia.png' },
  { name: 'Mercedes-Benz', file: 'mercedes-benz.png' },
  { name: 'ITESO', file: 'iteso.png' },
  { name: 'Javer', file: 'javer.png' },
  { name: 'Vitromex', file: 'vitromex.png' },
  { name: 'O\'Reilly', file: 'oreilly.png' },
  { name: 'ProMéxico', file: 'promexico.png' },
  { name: 'Fortuna', file: 'fortuna.png' },
  { name: 'Sentíes', file: 'senties.png' },
  { name: 'Alteso', file: 'alteso.png' },
  { name: 'CAB', file: 'cab.png' },
  { name: 'Deyun Centro de Especialidades', file: 'deyun.png' },
  { name: 'Sistemik', file: 'sistemik.png' },
  { name: 'Vagual', file: 'vagual.png' },
  { name: 'Sello Rojo', file: 'sello-rojo.png' },
  { name: 'Tequila Huizache', file: 'tequila-huizache.png' },
  { name: 'Chizy Chiz', file: 'chizychiz.png' },
  { name: 'CPT', file: 'cpt.png' },
  { name: 'Andrea Aragón', file: 'andrea-aragon.png' },
  { name: 'Liz Muebles', file: 'liz-muebles.png' },
  { name: 'Fortia', file: 'fortia.png' },
  { name: 'K', file: 'logo-k.png' },
  { name: 'Cliente XERYUS', file: 'recurso-22.png' },
];

const rowA = clients.filter((_, i) => i % 2 === 0);
const rowB = clients.filter((_, i) => i % 2 === 1);

function MarqueeRow({ items, isDark, reverse }: { items: typeof clients; isDark: boolean; reverse?: boolean }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden flex-1 flex items-center">
      <div className={`flex gap-8 md:gap-10 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {doubled.map((client, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-32 h-16 md:w-40 md:h-20 flex items-center justify-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src={`/assets/clients/${client.file}`}
              alt={client.name}
              className="max-h-full max-w-full object-contain"
              style={!isDark ? { filter: 'invert(65%)' } : undefined}
            />
          </div>
        ))}
      </div>

      <div className={`absolute inset-y-0 left-0 w-16 pointer-events-none ${isDark ? 'bg-gradient-to-r from-gray-950 to-transparent' : 'bg-gradient-to-r from-gray-50 to-transparent'}`} />
      <div className={`absolute inset-y-0 right-0 w-16 pointer-events-none ${isDark ? 'bg-gradient-to-l from-gray-950 to-transparent' : 'bg-gradient-to-l from-gray-50 to-transparent'}`} />
    </div>
  );
}

export default function InstitutionalShowcase() {
  const { isDark } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

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
    <section className={`py-14 md:py-20 lg:py-28 transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Left - Institutional video, near half the screen */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="red-line" />
              <p className={`text-xs tracking-[0.3em] uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                ¿Por qué investigar a tu mercado?
              </p>
            </div>
            <div className="group relative">
            <div className={`relative aspect-video overflow-hidden ${isDark ? 'bg-black' : 'bg-gray-900'}`}>
              <video
                ref={videoRef}
                src={DEFAULT_VIDEO_URL}
                poster={POSTER_URL}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={e => e.preventDefault()}
                muted={isMuted}
                playsInline
              />

              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  aria-label="Reproducir video institucional"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="absolute w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110" />
                  <Play size={18} className="relative text-white fill-white ml-1 drop-shadow md:w-[26px] md:h-[26px]" />
                </button>
              )}

              <div
                className={`absolute bottom-0 left-0 right-0 px-3 md:px-4 pb-2 md:pb-3 pt-6 md:pt-8 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}
              >
                <div onClick={handleSeek} className="h-1 w-full rounded-full bg-white/20 cursor-pointer mb-2 md:mb-3">
                  <div
                    className="h-full rounded-full bg-[#fd3838] transition-[width] duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <button onClick={togglePlay} aria-label={isPlaying ? 'Pausar' : 'Reproducir'} className="text-white/90 hover:text-white transition-colors">
                      {isPlaying ? <Pause size={14} className="fill-white md:w-4 md:h-4" /> : <Play size={14} className="fill-white ml-0.5 md:w-4 md:h-4" />}
                    </button>
                    <button onClick={toggleMute} aria-label={isMuted ? 'Activar sonido' : 'Silenciar'} className="text-white/90 hover:text-white transition-colors">
                      {isMuted ? <VolumeX size={14} className="md:w-4 md:h-4" /> : <Volume2 size={14} className="md:w-4 md:h-4" />}
                    </button>
                  </div>
                  <button onClick={toggleFullscreen} aria-label="Pantalla completa" className="text-white/90 hover:text-white transition-colors">
                    <Maximize size={13} className="md:w-[15px] md:h-[15px]" />
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Right - Double marquee carousel */}
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="red-line" />
              <p className={`text-xs tracking-[0.3em] uppercase font-semibold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Empresas que han confiado en nosotros
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-4 min-h-[220px]">
              <MarqueeRow items={rowA} isDark={isDark} />
              <MarqueeRow items={rowB} isDark={isDark} reverse />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
