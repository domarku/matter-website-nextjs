import Image from "next/image";

interface HeroImageProps {
  src: string;
}

export default function HeroImage({ src }: HeroImageProps) {
  return (
    <Image
      className="hero-image"
      src={src}
      alt=""
      width={1920}
      height={823}
      sizes="100vw"
      priority
      style={{ height: "auto" }}
    />
  );
}
