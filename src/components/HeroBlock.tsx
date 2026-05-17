import Image from "next/image";
import RichText from "@/components/RichText";
import type { HeroBlockFields } from "@/lib/contentful-helpers";
import { getAssetUrl } from "@/lib/contentful-helpers";

interface HeroBlockProps {
  fields: HeroBlockFields;
}

export default function HeroBlock({ fields }: HeroBlockProps) {
  const { heading, subheading, callToActionLabel, callToActionUrl, image } =
    fields;
  const src = getAssetUrl(image);

  return (
    <section className="hero-block">
      {src && (
        <div className="hero-block__background" aria-hidden="true">
          <div className="hero-block__bg-frame">
            <Image
              className="hero-block__bg-image"
              src={src}
              alt=""
              fill
              sizes="(min-width: 48rem) 80vw, 100vw"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      )}
      <div className="container hero-block__content">
        {heading && <h2 className="hero-block__heading">{heading}</h2>}
        {subheading && (
          <div className="hero-block__subheading">
            <RichText document={subheading} />
          </div>
        )}
        {callToActionLabel && callToActionUrl && (
          <a href={callToActionUrl} className="cta">
            {callToActionLabel}
          </a>
        )}
      </div>
    </section>
  );
}
