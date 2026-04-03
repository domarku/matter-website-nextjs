import { notFound } from "next/navigation";
import BlockRenderer from "@/components/BlockRenderer";
import { getPageBySlug, getAssetUrl } from "@/lib/contentful";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("privacy");
  if (!page) return { title: "Privacy Policy" };
  return {
    title: page.title,
    description: page.metaDescription,
  };
}

export default async function PrivacyPage() {
  const page = await getPageBySlug("privacy");

  if (!page) {
    return (
      <section className="section container">
        <h1>Privacy Policy</h1>
        <p style={{ marginTop: "var(--space-sm)" }}>
          Content coming soon. Please add a page with slug &quot;privacy&quot;
          in Contentful.
        </p>
      </section>
    );
  }

  const headerImageUrl = page.headerImage
    ? getAssetUrl(page.headerImage)
    : undefined;

  return (
    <>
      {headerImageUrl && (
        <img className="hero-image" src={headerImageUrl} alt="" />
      )}
      <BlockRenderer blocks={page.contentBlocks ?? []} />
    </>
  );
}
