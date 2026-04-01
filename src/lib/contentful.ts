import { createClient, type Asset, type EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN!,
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ContentBlockFields {
  heading?: string;
  body?: Document;
  isHero?: boolean;
  callToActionLabel?: string;
  callToActionUrl?: string;
  images?: Asset[];
}

export interface FormBlockFields {
  heading?: string;
  formType: "contact" | "apply";
}

export interface PageFields {
  title: string;
  slug: string;
  metaDescription?: string;
  headerImage?: Asset;
  contentBlocks?: any[];
}

export interface SiteSettingsFields {
  siteName: string;
  logo?: Asset;
  navigation?: any[];
  notificationEmail: string;
}

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
      "[contentful] Could not fetch siteSettings — content type may not exist yet"
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
      `[contentful] Could not fetch page "${slug}" — content type may not exist yet`
    );
    return undefined;
  }
}

export function isContentBlock(entry: any): boolean {
  return entry?.sys?.contentType?.sys?.id === "contentBlock";
}

export function isFormBlock(entry: any): boolean {
  return entry?.sys?.contentType?.sys?.id === "formBlock";
}

export function getAssetUrl(asset?: Asset): string | undefined {
  const url = (asset?.fields?.file as any)?.url as string | undefined;
  return url ? `https:${url}` : undefined;
}

export function getAssetAlt(asset?: Asset): string {
  return (asset?.fields?.title as string) || "";
}
