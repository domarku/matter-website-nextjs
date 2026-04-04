import type { Asset } from "contentful";
import type { Document } from "@contentful/rich-text-types";

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

export interface HeroBlockFields {
  heading?: string;
  subheading?: Document;
  callToActionLabel?: string;
  callToActionUrl?: string;
  image?: Asset;
}

export interface LogoCarouselFields {
  title?: string;
  logos?: Asset[];
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

export function isContentBlock(entry: any): boolean {
  return entry?.sys?.contentType?.sys?.id === "contentBlock";
}

export function isFormBlock(entry: any): boolean {
  return entry?.sys?.contentType?.sys?.id === "formBlock";
}

export function isHeroBlock(entry: any): boolean {
  return entry?.sys?.contentType?.sys?.id === "heroBlock";
}

export function isLogoCarousel(entry: any): boolean {
  return entry?.sys?.contentType?.sys?.id === "logoCarousel";
}

export function getAssetUrl(asset?: Asset): string | undefined {
  const url = (asset?.fields?.file as any)?.url as string | undefined;
  return url ? `https:${url}` : undefined;
}

export function getAssetAlt(asset?: Asset): string {
  return (asset?.fields?.title as string) || "";
}
