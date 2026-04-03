"use client";

import { useRef, useCallback } from "react";

const PLAYBACK_RATE = 3;

export default function LogoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  const enforceRate = useCallback(() => {
    if (ref.current && ref.current.playbackRate !== PLAYBACK_RATE) {
      ref.current.playbackRate = PLAYBACK_RATE;
    }
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      onLoadedMetadata={enforceRate}
      onPlay={enforceRate}
      onRateChange={enforceRate}
    >
      <source src="/matter-hi-q-300.webm" type="video/webm" />
      <source src="/matter-hi-q-300.mp4" type="video/mp4" />
    </video>
  );
}
