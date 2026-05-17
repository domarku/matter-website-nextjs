export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="home-page">{children}</div>;
}
