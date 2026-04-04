import ContentBlock from "@/components/ContentBlock";
import HeroBlock from "@/components/HeroBlock";
import LogoCarousel from "@/components/LogoCarousel";
import ApplyForm from "@/components/ApplyForm";
import ContactForm from "@/components/ContactForm";
import {
  isContentBlock,
  isFormBlock,
  isHeroBlock,
  isLogoCarousel,
} from "@/lib/contentful-helpers";
import type {
  ContentBlockFields,
  FormBlockFields,
  HeroBlockFields,
  LogoCarouselFields,
} from "@/lib/contentful-helpers";
import type { Asset } from "contentful";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface BlockRendererProps {
  blocks: any[];
  formType?: "contact" | "apply";
}

export default function BlockRenderer({ blocks, formType }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block: any, i: number) => {
        if (isHeroBlock(block)) {
          return (
            <HeroBlock
              key={block.sys.id}
              fields={block.fields as unknown as HeroBlockFields}
            />
          );
        }
        if (isContentBlock(block)) {
          return (
            <ContentBlock
              key={block.sys.id}
              fields={block.fields as unknown as ContentBlockFields}
              index={i}
            />
          );
        }
        if (isLogoCarousel(block)) {
          const fields = block.fields as unknown as LogoCarouselFields;
          return (
            <LogoCarousel
              key={block.sys.id}
              logos={(fields.logos ?? []) as Asset[]}
            />
          );
        }
        if (isFormBlock(block) && formType) {
          const formFields = block.fields as unknown as FormBlockFields;
          if (formFields.formType === "apply" && formType === "apply") {
            return <ApplyForm key={block.sys.id} heading={formFields.heading} />;
          }
          if (formFields.formType === "contact" && formType === "contact") {
            return <ContactForm key={block.sys.id} heading={formFields.heading} />;
          }
        }
        return null;
      })}
    </>
  );
}
