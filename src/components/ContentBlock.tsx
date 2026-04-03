import RichText from "@/components/RichText";
import ImageGallery from "@/components/ImageGallery";
import type { ContentBlockFields } from "@/lib/contentful-helpers";
import type { Asset } from "contentful";

interface ContentBlockProps {
  fields: ContentBlockFields;
  index: number;
}

export default function ContentBlock({ fields, index }: ContentBlockProps) {
  const { heading, body, isHero, callToActionLabel, callToActionUrl, images } =
    fields;

  const HeadingTag = index === 0 ? "h1" : "h2";
  const blockClass = `content-block${isHero ? " content-block--hero" : ""}`;

  return (
    <section className={blockClass}>
      <div className="container">
        {heading && (
          <HeadingTag className="content-block__heading">{heading}</HeadingTag>
        )}
        {body && (
          <div className="content-block__body">
            <RichText document={body} />
          </div>
        )}
        {callToActionLabel && callToActionUrl && (
          <a href={callToActionUrl} className="content-block__cta">
            {callToActionLabel}
          </a>
        )}
        {images && images.length > 0 && (
          <ImageGallery images={images as Asset[]} />
        )}
      </div>
    </section>
  );
}
