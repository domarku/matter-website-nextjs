import Link from "next/link";
import LogoVideo from "@/components/LogoVideo";
import type { PageFields } from "@/lib/contentful-helpers";

interface HeaderProps {
  siteName: string;
  logoUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any[];
  currentSlug?: string;
}

export default function Header({
  siteName,
  navigation,
  currentSlug,
}: HeaderProps) {
  return (
    <>
      <Link
        href="/"
        className="site-header__logo"
        aria-label={`${siteName} — home`}
      >
        <LogoVideo />
      </Link>
      <header className="site-header">
        <div className="container">
          <nav>
            <ul className="site-nav">
              {navigation.map((page) => {
                const fields = page.fields as unknown as PageFields;
                const slug = fields.slug;
                const href = slug === "home" ? "/" : `/${slug}`;
                const isCurrent =
                  slug === currentSlug || (slug === "home" && !currentSlug);
                return (
                  <li key={page.sys.id}>
                    <Link
                      href={href}
                      aria-current={isCurrent ? "page" : undefined}
                    >
                      {fields.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
