import Link from "next/link";

interface FooterProps {
  siteName: string;
}

export default function Footer({ siteName }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {siteName}</p>
        <nav className="footer-nav">
          <a href="https://www.instagram.com/matterberlin/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/imprint">Imprint</Link>
        </nav>
      </div>
    </footer>
  );
}
