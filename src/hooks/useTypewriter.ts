import { useEffect, useState } from "react";

/**
 * Types out text one character at a time, then shows a blinking cursor
 * that disappears after a short pause.
 */
export function useTypewriter(
  text: string,
  {
    delay = 400,
    speed = 70,
    cursorLingerMs = 1500,
  }: { delay?: number; speed?: number; cursorLingerMs?: number } = {},
) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let idx = 0;
    let typingTimer: ReturnType<typeof setTimeout>;
    let lingerTimer: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx < text.length) {
        typingTimer = setTimeout(typeNext, speed);
      } else {
        // Typing finished — keep cursor blinking briefly then hide
        lingerTimer = setTimeout(() => setShowCursor(false), cursorLingerMs);
      }
    };

    // Start after initial delay
    typingTimer = setTimeout(typeNext, delay);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(lingerTimer);
    };
  }, [text, delay, speed, cursorLingerMs]);

  return { displayed, showCursor };
}
