"use client";

import { useRef, useEffect } from "react";

export default function LogoVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      src="/matter-hi-q-300.webm"
    />
  );
}
