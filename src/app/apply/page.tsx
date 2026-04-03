import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import HeroImage from "@/components/HeroImage";
import { getPageBySlug, getAssetUrl } from "@/lib/contentful";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("apply");
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function ApplyPage() {
  const page = await getPageBySlug("apply");
  if (!page) notFound();

  const headerImageUrl = page.headerImage
    ? getAssetUrl(page.headerImage)
    : undefined;

  return (
    <>
      {headerImageUrl && <HeroImage src={headerImageUrl} />}
      <BlockRenderer blocks={page.contentBlocks ?? []} formType="apply" />
    </>
  );
}
