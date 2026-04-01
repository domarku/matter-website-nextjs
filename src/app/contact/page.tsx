import { notFound } from "next/navigation";
import ContentBlock from "@/components/ContentBlock";
import ContactForm from "@/components/ContactForm";
import {
  getPageBySlug,
  getAssetUrl,
  isContentBlock,
  isFormBlock,
} from "@/lib/contentful";
import type { ContentBlockFields, FormBlockFields } from "@/lib/contentful";
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
  const blocks = page.contentBlocks ?? [];

  return (
    <>
      {headerImageUrl && (
        <img className="hero-image" src={headerImageUrl} alt="" />
      )}
      {blocks.map((block, i) => {
        const typeId = block.sys.contentType?.sys?.id;
        if (typeId === "contentBlock") {
          return (
            <ContentBlock
              key={block.sys.id}
              fields={block.fields as unknown as ContentBlockFields}
              index={i}
            />
          );
        }
        if (typeId === "formBlock") {
          const formFields = block.fields as unknown as FormBlockFields;
          if (formFields.formType === "contact") {
            return <ContactForm key={block.sys.id} heading={formFields.heading} />;
          }
        }
        return null;
      })}
    </>
  );
}
