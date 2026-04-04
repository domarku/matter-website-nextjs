import Image from "next/image";
import RichText from "@/components/RichText";
import type { HeroBlockFields } from "@/lib/contentful-helpers";
import { getAssetUrl, getAssetAlt } from "@/lib/contentful-helpers";

interface HeroBlockProps {
  fields: HeroBlockFields;
}

export default function HeroBlock({ fields }: HeroBlockProps) {
  const { heading, subheading, callToActionLabel, callToActionUrl, image } =
    fields;
  const src = getAssetUrl(image);
  const alt = image ? getAssetAlt(image) : "";

  return (
    <section className="hero-block">
      <div className="container">
        {heading && <h1 className="hero-block__heading">{heading}</h1>}
        {subheading && (
          <div className="hero-block__subheading">
            <RichText document={subheading} />
          </div>
        )}
        {callToActionLabel && callToActionUrl && (
          <a href={callToActionUrl} className="hero-block__cta">
            {callToActionLabel}
          </a>
        )}
      </div>
      {src && (
        <Image
          className="hero-image"
          src={src}
          alt={alt}
          width={1920}
          height={823}
          sizes="100vw"
          priority
          style={{ height: "auto" }}
        />
      )}
    </section>
  );
}
