import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*";

export function useTextScramble(finalText: string, delay = 300) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let frame = 0;
    const totalFrames = finalText.length * 3;
    let rafId: number;
    let timeout: number;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.floor(progress * finalText.length);

      const result = finalText
        .split("")
        .map((char, i) => {
          if (i < revealed) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(result);

      if (frame < totalFrames) {
        rafId = requestAnimationFrame(animate);
      }
    };

    timeout = window.setTimeout(() => {
      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
    };
  }, [finalText, delay]);

  return display;
}
