/** Simple page title + subtitle used by the stub routes. */
export default function PageHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-[-0.02em] text-[#14132B]">
        {title}
      </h1>
      {subtitle && <p className="mt-1 text-sm text-[#6C6B7B]">{subtitle}</p>}
    </div>
  );
}
