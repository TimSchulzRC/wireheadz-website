export default function SectionTitle({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      {title && <h2 className="w-full text-6xl text-center mb-12">{title}</h2>}
      {subtitle && (
        <h3 className="w-full text-3xl text-center mb-12">{subtitle}</h3>
      )}
    </>
  );
}
