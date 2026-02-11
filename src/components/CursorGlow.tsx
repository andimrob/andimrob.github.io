import { useEffect, useRef, useState } from "react";
import { onXRayChange, mouseX, mouseY } from "../xray";

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [xrayActive, setXrayActive] = useState(false);

  useEffect(() => {
    const unsub = onXRayChange(setXrayActive);
    return () => { unsub(); };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (xrayActive) {
      el.style.background = "";
      return;
    }

    const setGlow = (x: number, y: number) => {
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(120, 140, 255, 0.07), transparent 70%)`;
    };

    // Immediately restore glow at current shared mouse position
    if (mouseX !== -300) {
      setGlow(mouseX, mouseY);
    }

    const handleMouseMove = () => {
      setGlow(mouseX, mouseY);
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
  }, [xrayActive]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-40 hidden dark:block"
    />
  );
}

export default CursorGlow;
