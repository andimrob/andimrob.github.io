import { useEffect, useRef } from "react";
import { C, LENS_RADIUS } from "./highlight";
import type { MousePosition } from "./useMousePosition";

interface XRayOverlayProps {
  sourceHTML: string;
  getMousePosition: () => MousePosition;
}

function XRayOverlay({ sourceHTML, getMousePosition }: XRayOverlayProps) {
  const blurRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLens = () => {
      const { x, y } = getMousePosition();
      const clip = `circle(${LENS_RADIUS}px at ${x}px ${y}px)`;
      if (blurRef.current) blurRef.current.style.clipPath = clip;
      if (overlayRef.current) overlayRef.current.style.clipPath = clip;
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }
    };

    const syncScroll = () => {
      const inner = innerRef.current;
      if (!inner) return;
      const maxPage = document.body.scrollHeight - window.innerHeight;
      const maxCode = inner.scrollHeight - window.innerHeight;
      if (maxPage <= 0) {
        inner.style.transform = "translateY(0)";
        return;
      }
      const fraction = Math.min(window.scrollY / maxPage, 1);
      inner.style.transform = `translateY(${-(fraction * Math.max(0, maxCode))}px)`;
    };

    const onMouseMove = () => {
      requestAnimationFrame(() => {
        updateLens();
        syncScroll();
      });
    };

    const onScroll = () => {
      requestAnimationFrame(syncScroll);
    };

    // Initial position
    updateLens();
    syncScroll();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [getMousePosition]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
      }}
    >
      {/* Blur layer */}
      <div
        ref={blurRef}
        style={{
          position: "fixed",
          inset: 0,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          clipPath: "circle(0px at -300px -300px)",
        }}
      />

      {/* Source code overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          clipPath: "circle(0px at -300px -300px)",
        }}
      >
        <div ref={innerRef} style={{ background: C.bg, minHeight: "100vh" }}>
          <pre
            style={{
              color: C.fg,
              textShadow: `0 0 6px ${C.fg}80,0 0 14px ${C.fg}40`,
              background: C.bg,
              fontFamily:
                "'JetBrains Mono','Fira Code','Courier New',monospace",
              fontSize: "13.5px",
              lineHeight: 1.35,
              padding: "12px",
              margin: 0,
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
            dangerouslySetInnerHTML={{ __html: sourceHTML }}
          />
        </div>
      </div>

      {/* Lens ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: LENS_RADIUS * 2,
          height: LENS_RADIUS * 2,
          border: "1.5px solid rgba(180,190,254,0.4)",
          borderRadius: "50%",
          pointerEvents: "none",
          boxShadow:
            "0 0 20px 2px rgba(137,180,250,0.1),inset 0 0 20px 2px rgba(137,180,250,0.05)",
          transform: "translate(-50%,-50%)",
          left: -300,
          top: -300,
        }}
      />
    </div>
  );
}

export default XRayOverlay;
