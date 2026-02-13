import { useCallback, useEffect, useRef } from "react";

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition() {
  const pos = useRef<MousePosition>({ x: -300, y: -300 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const getMousePosition = useCallback(() => pos.current, []);

  return getMousePosition;
}
