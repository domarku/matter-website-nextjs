import Link from "next/link";
import { SITE_FOOTER_MENU_LINKS } from "@/lib/site-menu-links";

interface FooterProps {
  siteName: string;
}

export default function Footer({ siteName }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <span>
          &copy; {new Date().getFullYear()} {siteName}
        </span>
        <nav className="footer-nav" aria-label="Legal and social">
          {SITE_FOOTER_MENU_LINKS.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </footer>
  );
}
