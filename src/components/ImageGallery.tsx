import Image from "next/image";
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
        <Image
          key={i}
          src={getAssetUrl(img)!}
          alt={getAssetAlt(img)}
          width={600}
          height={450}
          sizes="(max-width: 48rem) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      ))}
    </div>
  );
}
