import { type ReactNode } from "react";
import { useRevealOnScroll } from "../hooks/useRevealOnScroll";

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

function RevealSection({ children, className = "", id }: Props) {
  const { ref, visible } = useRevealOnScroll(0.12);

  return (
    <section
      ref={ref}
      id={id}
      className={`scroll-mt-24 py-14 max-sm:py-10 ${className} reveal ${visible ? "revealed" : ""}`}
    >
      <div className="mx-auto max-w-4xl px-6">{children}</div>
    </section>
  );
}

export default RevealSection;
