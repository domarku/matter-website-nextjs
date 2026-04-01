import Link from "next/link";
import type { PageFields } from "@/lib/contentful";

interface HeaderProps {
  siteName: string;
  logoUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any[];
  currentSlug?: string;
}

export default function Header({
  siteName,
  logoUrl,
  navigation,
  currentSlug,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="site-header__logo" aria-label={`${siteName} — home`}>
          {logoUrl ? (
            <img src={logoUrl} alt={siteName} />
          ) : (
            <span className="site-header__logo-text">{siteName}</span>
          )}
        </Link>
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
  );
}
