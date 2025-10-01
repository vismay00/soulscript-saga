import { useEffect, useRef } from "react";

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.loop = true;
      audio.play().catch(() => {});
    }
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  return (
    <audio ref={audioRef} src="/soothing-music.mp3" preload="auto" />
  );
};
