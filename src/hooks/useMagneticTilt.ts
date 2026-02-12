import { useEffect, type RefObject } from "react";

const MAX_TILT_X = 80;
const MAX_TILT_Y = 15;
const ATTRACT_RANGE = 200;

export function useMagneticTilt(
  ref: RefObject<HTMLElement | null>,
  disabled: boolean,
): void {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el || disabled) {
        if (el) el.style.transform = "";
        return;
      }

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > ATTRACT_RANGE) {
        el.style.transform = "";
        return;
      }

      const strength = 1 - dist / ATTRACT_RANGE;
      const tiltX = -(dy / ATTRACT_RANGE) * MAX_TILT_X * strength;
      const tiltY = (dx / ATTRACT_RANGE) * MAX_TILT_Y * strength;

      el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      if (ref.current) ref.current.style.transform = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, disabled]);
}
