"use client";

import { useRef, useEffect } from "react";

const PLAYBACK_RATE = 3;

export default function LogoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    function applyRate() {
      if (video && video.playbackRate !== PLAYBACK_RATE) {
        video.playbackRate = PLAYBACK_RATE;
      }
    }

    applyRate();

    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);
    video.addEventListener("playing", applyRate);
    video.addEventListener("ratechange", applyRate);

    // Retry periodically in case iOS Safari resets it
    const interval = setInterval(applyRate, 500);

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
      video.removeEventListener("playing", applyRate);
      video.removeEventListener("ratechange", applyRate);
      clearInterval(interval);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
    >
      <source src="/matter-hi-q-300.webm" type="video/webm" />
      <source src="/matter-hi-q-300.mp4" type="video/mp4" />
    </video>
  );
}
