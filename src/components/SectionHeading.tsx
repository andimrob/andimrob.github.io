import { type ReactNode } from "react";

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
      {children}
    </h2>
  );
}

export default SectionHeading;
