interface FooterProps {
  siteName: string;
}

export default function Footer({ siteName }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} {siteName}</p>
      </div>
    </footer>
  );
}
