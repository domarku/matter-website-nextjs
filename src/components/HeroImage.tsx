import Image from "next/image";

interface HeroImageProps {
  src: string;
}

export default function HeroImage({ src }: HeroImageProps) {
  return (
    <div className="container">
      <Image
        className="hero-image"
        src={src}
        alt=""
        width={1920}
        height={823}
        sizes="(max-width: 64rem) 100vw, 64rem"
        priority
        style={{ height: "auto" }}
      />
    </div>
  );
}
