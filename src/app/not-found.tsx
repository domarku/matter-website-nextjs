import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section container">
      <h1>404</h1>
      <p style={{ marginTop: "var(--space-sm)" }}>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="cta"
        style={{ marginTop: "var(--space-md)" }}
      >
        Back to home
      </Link>
    </section>
  );
}
