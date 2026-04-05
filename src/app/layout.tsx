import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getSiteSettings, getAssetUrl } from "@/lib/contentful";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Matter";

  return {
    title: { default: siteName, template: `%s — ${siteName}` },
    icons: { icon: "/favicon.svg" },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "Matter";
  const logoUrl = settings?.logo ? getAssetUrl(settings.logo) : undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = (settings?.navigation ?? []) as any[];

  return (
    <html lang="en">
      <body>
        <ScrollToTop />
        <Header
          siteName={siteName}
          logoUrl={logoUrl}
          navigation={navigation}
        />
        <main>{children}</main>
        <Footer siteName={siteName} />
        <Analytics />
      </body>
    </html>
  );
}
