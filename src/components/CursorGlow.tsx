import { useEffect, useRef } from "react";
import type { MousePosition } from "../xray/useMousePosition";

interface CursorGlowProps {
  xrayActive: boolean;
  getMousePosition: () => MousePosition;
}

function CursorGlow({ xrayActive, getMousePosition }: CursorGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (xrayActive) {
      el.style.background = "";
      return;
    }

    const setGlow = (x: number, y: number) => {
      el.style.background = `radial-gradient(900px circle at ${x}px ${y}px, rgba(120, 140, 255, 0.07), transparent 70%)`;
    };

    // Immediately restore glow at current shared mouse position
    const pos = getMousePosition();
    if (pos.x !== -300) {
      setGlow(pos.x, pos.y);
    }

    const handleMouseMove = () => {
      const { x, y } = getMousePosition();
      setGlow(x, y);
    };

    const handleMouseLeave = () => {
      el.style.background = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [xrayActive, getMousePosition]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-40 hidden dark:block"
    />
  );
}

export default CursorGlow;
