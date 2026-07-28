import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onFinish: () => void;
}

const FADE_DURATION_MS = 700;
const MAX_LOAD_MS = 8000;

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFading(true);
    setTimeout(onFinish, FADE_DURATION_MS);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1.5;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        video.muted = true;
        try {
          await video.play();
        } catch {
          finish();
        }
      }
    };
    tryPlay();

    const fallback = setTimeout(finish, MAX_LOAD_MS);
    return () => clearTimeout(fallback);
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (!video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black transition-opacity duration-700 ease-out ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <video
        ref={videoRef}
        src="/assets/videos/xeryus-logo-intro.mp4"
        className="w-full max-w-2xl px-8 pb-20"
        playsInline
        onEnded={finish}
        onError={finish}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 max-w-[70%]">
        <div className="h-0.5 w-full rounded-full bg-white/15 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#fd3838] transition-[width] duration-150 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
