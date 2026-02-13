import { useCallback, useEffect, useState } from "react";
import { buildSource, ensureFont } from "./highlight";

export function useXRay() {
  const [xrayActive, setXrayActive] = useState(false);
  const [sourceHTML, setSourceHTML] = useState<string | null>(null);

  const toggle = useCallback(() => {
    setXrayActive((prev) => {
      const next = !prev;
      if (next) {
        ensureFont();
        buildSource().then(setSourceHTML);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "x" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return { xrayActive, sourceHTML };
}
