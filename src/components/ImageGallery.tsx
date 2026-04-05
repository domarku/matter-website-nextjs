"use client";

import { useState } from "react";
import Image from "next/image";
import { getAssetUrl, getAssetAlt } from "@/lib/contentful-helpers";
import type { Asset } from "contentful";

interface ImageGalleryProps {
  images: Asset[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const validImages = images.filter((img) => getAssetUrl(img));
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (validImages.length === 0) return null;

  return (
    <div className="image-gallery">
      {validImages.map((img, i) => {
        const id = img.sys?.id ?? String(i);
        const isExpanded = expandedIndex === i;
        return (
          <button
            key={id}
            type="button"
            className={
              isExpanded
                ? "image-gallery__item image-gallery__item--expanded"
                : "image-gallery__item"
            }
            onClick={() => setExpandedIndex((prev) => (prev === i ? null : i))}
            aria-pressed={isExpanded}
            aria-label={isExpanded ? "Show image smaller" : "Show image larger"}
          >
            <Image
              src={getAssetUrl(img)!}
              alt={getAssetAlt(img)}
              width={600}
              height={450}
              sizes="(max-width: 48rem) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </button>
        );
      })}
    </div>
  );
}
