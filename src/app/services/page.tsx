import { notFound } from "next/navigation";
import ContentBlock from "@/components/ContentBlock";
import HeroImage from "@/components/HeroImage";
import {
  getPageBySlug,
  getAssetUrl,
  isContentBlock,
} from "@/lib/contentful";
import type { ContentBlockFields } from "@/lib/contentful";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("services");
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function ServicesPage() {
  const page = await getPageBySlug("services");
  if (!page) notFound();

  const headerImageUrl = page.headerImage
    ? getAssetUrl(page.headerImage)
    : undefined;
  const blocks = page.contentBlocks ?? [];

  return (
    <>
      {headerImageUrl && <HeroImage src={headerImageUrl} />}
      {blocks.map((block, i) => {
        if (isContentBlock(block)) {
          return (
            <ContentBlock
              key={block.sys.id}
              fields={block.fields as unknown as ContentBlockFields}
              index={i}
            />
          );
        }
        return null;
      })}
    </>
  );
}
