import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { getSiteSettings, getAssetUrl } from "@/lib/contentful";
import "./globals.css";

const exat = localFont({
  src: "../../public/ExatWide-Regular-TEST.otf",
  weight: "500",
  style: "normal",
  variable: "--font-exat",
});

const maxi = localFont({
  src: "../../public/ABCMaxiRoundMonoVariable-Trial.ttf",
  weight: "500",
  style: "normal",
  variable: "--font-maxi",
});

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
    <html lang="en" className={`${exat.variable} ${maxi.variable}`}>
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
