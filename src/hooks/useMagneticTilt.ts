import { useEffect, type RefObject } from "react";

const MAX_TILT_X = 45;
const MAX_TILT_Y = 30;
const ATTRACT_RANGE = 250;

export function useMagneticTilt(
  ref: RefObject<HTMLElement | null>,
  disabled: boolean,
  boundsRef?: RefObject<HTMLElement | null>,
): void {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el || disabled) {
        if (el) el.style.transform = "";
        return;
      }

      const boundsEl = boundsRef?.current ?? el;
      const rect = boundsEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > ATTRACT_RANGE) {
        el.style.transform = "";
        el.style.setProperty("--magnetic-strength", "0");
        return;
      }

      const strength = 1 - dist / ATTRACT_RANGE;
      const tiltX = -(dy / ATTRACT_RANGE) * MAX_TILT_X * strength;
      const tiltY = (dx / ATTRACT_RANGE) * MAX_TILT_Y * strength;

      el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      el.style.setProperty("--magnetic-strength", String(strength));
    };

    const handleMouseLeave = () => {
      if (ref.current) {
        ref.current.style.transform = "";
        ref.current.style.setProperty("--magnetic-strength", "0");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, disabled, boundsRef]);
}
