"use client";

import { useRef, useCallback } from "react";

export default function LogoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  const setPlaybackRate = useCallback(() => {
    if (ref.current) {
      ref.current.playbackRate = 3;
    }
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      onLoadedMetadata={setPlaybackRate}
    >
      <source src="/matter-hi-q-300.webm" type="video/webm" />
      <source src="/matter-hi-q-300.mp4" type="video/mp4" />
    </video>
  );
}
