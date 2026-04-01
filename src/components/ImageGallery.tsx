import { getAssetUrl, getAssetAlt } from "@/lib/contentful";
import type { Asset } from "contentful";

interface ImageGalleryProps {
  images: Asset[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const validImages = images.filter((img) => getAssetUrl(img));

  if (validImages.length === 0) return null;

  return (
    <div className="image-gallery">
      {validImages.map((img, i) => (
        <img
          key={i}
          src={getAssetUrl(img)}
          alt={getAssetAlt(img)}
          loading="lazy"
        />
      ))}
    </div>
  );
}
