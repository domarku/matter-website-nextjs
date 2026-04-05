interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <div className="page-title-wrap container">
      <h1 className="page-title">{title}</h1>
    </div>
  );
}
