import { useRef, useCallback } from "react";

export function useTilt(intensity = 15) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale3d(1.02, 1.02, 1.02)`;
    },
    [intensity],
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
