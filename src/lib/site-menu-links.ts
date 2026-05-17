export interface SiteFooterMenuLink {
  href: string;
  label: string;
  external?: boolean;
}

export const SITE_FOOTER_MENU_LINKS: readonly SiteFooterMenuLink[] = [
  {
    href: "https://www.instagram.com/matterberlin/",
    label: "Instagram",
    external: true,
  },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/imprint", label: "Imprint" },
];
