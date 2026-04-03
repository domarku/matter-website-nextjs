"use client";

import Image from "next/image";
import { getAssetUrl, getAssetAlt } from "@/lib/contentful-helpers";
import type { Asset } from "contentful";

interface LogoCarouselProps {
  logos: Asset[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  const validLogos = logos.filter((logo) => getAssetUrl(logo));

  if (validLogos.length === 0) return null;

  const logoElements = validLogos.map((logo, i) => (
    <Image
      key={i}
      className="logo-carousel__item"
      src={getAssetUrl(logo)!}
      alt={getAssetAlt(logo)}
      width={160}
      height={60}
      style={{ objectFit: "contain" }}
    />
  ));

  return (
    <div className="logo-carousel">
      <div className="logo-carousel__track">
        {logoElements}
        {logoElements}
      </div>
    </div>
  );
}
