import "server-only";
import { createClient, type EntrySkeletonType } from "contentful";
import type { PageFields, SiteSettingsFields } from "./contentful-helpers";

export type { Asset } from "contentful";
export {
  type ContentBlockFields,
  type FormBlockFields,
  type HeroBlockFields,
  type LogoCarouselFields,
  type PageFields,
  type SiteSettingsFields,
  isContentBlock,
  isFormBlock,
  isHeroBlock,
  isLogoCarousel,
  getAssetUrl,
  getAssetAlt,
} from "./contentful-helpers";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
});

export async function getSiteSettings() {
  try {
    const entries = await client.getEntries<EntrySkeletonType>({
      content_type: "siteSettings",
      limit: 1,
      include: 2,
    });
    return entries.items[0]?.fields as unknown as
      | SiteSettingsFields
      | undefined;
  } catch {
    console.warn(
      "[contentful] Could not fetch siteSettings — content type may not exist yet",
    );
    return undefined;
  }
}

export async function getPageBySlug(slug: string) {
  try {
    const entries = await client.getEntries<EntrySkeletonType>({
      content_type: "page",
      "fields.slug": slug,
      limit: 1,
      include: 3,
    });
    return entries.items[0]?.fields as unknown as PageFields | undefined;
  } catch {
    console.warn(
      `[contentful] Could not fetch page "${slug}" — content type may not exist yet`,
    );
    return undefined;
  }
}
