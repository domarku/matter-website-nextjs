import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import PageTitle from "@/components/PageTitle";
import { getPageBySlug } from "@/lib/contentful";
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

  return (
    <>
      {/* <PageTitle title={page.title} /> */}
      <BlockRenderer blocks={page.contentBlocks ?? []} />
    </>
  );
}
