/** Centered heading + subtitle used at the top of each onboarding step. */
export default function StepHeader({
  heading,
  subtitle,
}: {
  heading: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-[22px] font-semibold tracking-[-0.01em] text-[#14132B]">
        {heading}
      </h1>
      <p className="mt-1.5 text-sm text-[#6C6B7B]">{subtitle}</p>
    </div>
  );
}
