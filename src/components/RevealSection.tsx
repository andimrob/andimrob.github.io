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
      className={`py-20 max-sm:py-14 ${className} reveal ${visible ? "revealed" : ""}`}
    >
      {children}
    </section>
  );
}

export default RevealSection;
