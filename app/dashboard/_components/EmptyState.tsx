import type { ReactNode } from "react";

/**
 * Shared "coming soon" / empty state for the placeholder routes.
 * Indigo-tint circle holding an icon, a heading, and a line of muted text.
 */
export default function EmptyState({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-[#ECEBF3] bg-white px-6 py-16 text-center">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#EEEDFE] text-[#5F58F4]">
        {icon}
      </span>
      <h2 className="text-lg font-semibold tracking-[-0.01em] text-[#14132B]">
        {title}
      </h2>
      <p className="mt-1.5 max-w-xs text-sm text-[#6C6B7B]">{description}</p>
    </div>
  );
}
