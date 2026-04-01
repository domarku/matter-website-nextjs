import { notFound } from "next/navigation";
import ContentBlock from "@/components/ContentBlock";
import {
  getPageBySlug,
  getAssetUrl,
  isContentBlock,
} from "@/lib/contentful";
import type { ContentBlockFields } from "@/lib/contentful";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("home");
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function HomePage() {
  const page = await getPageBySlug("home");
  if (!page) notFound();

  const headerImageUrl = page.headerImage
    ? getAssetUrl(page.headerImage)
    : undefined;
  const blocks = page.contentBlocks ?? [];

  return (
    <>
      {headerImageUrl && (
        <img className="hero-image" src={headerImageUrl} alt="" />
      )}
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
