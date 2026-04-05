import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import HeroImage from "@/components/HeroImage";
import PageTitle from "@/components/PageTitle";
import { getPageBySlug, getAssetUrl } from "@/lib/contentful";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");
  if (!page) return {};
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function ContactPage() {
  const page = await getPageBySlug("contact");
  if (!page) notFound();

  const headerImageUrl = page.headerImage
    ? getAssetUrl(page.headerImage)
    : undefined;

  return (
    <>
      <PageTitle title={page.title} />
      {headerImageUrl && <HeroImage src={headerImageUrl} />}
      <BlockRenderer blocks={page.contentBlocks ?? []} formType="contact" />
    </>
  );
}
