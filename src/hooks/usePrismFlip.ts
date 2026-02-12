import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  type RefObject,
} from "react";
import { fireConfetti } from "../confetti";
import { fireCoinCollect } from "../coinCollect";

const AUTO_ROTATE_BACK_MS = 2000;

export function usePrismFlip(
  quips: ReactNode[],
  quipBgs: string[],
): {
  flipped: boolean;
  jitter: boolean;
  setJitter: Dispatch<SetStateAction<boolean>>;
  peek: boolean;
  setPeek: Dispatch<SetStateAction<boolean>>;
  quip: ReactNode;
  faceBg: string;
  isGradientBg: boolean;
  handleFlip: (e: React.MouseEvent) => void;
  prismRef: RefObject<HTMLDivElement | null>;
} {
  const [flipped, setFlipped] = useState(false);
  const [jitter, setJitter] = useState(false);
  const [peek, setPeek] = useState(false);
  const [quip, setQuip] = useState<ReactNode>(quips[0]);
  const [faceBg, setFaceBg] = useState(quipBgs[0]);

  const hasInteracted = useRef(false);
  const flipCount = useRef(0);
  const autoFlipTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  const handleFlip = (e: React.MouseEvent) => {
    hasInteracted.current = true;

    if (prismRef.current) prismRef.current.style.transform = "";

    setJitter(false);
    requestAnimationFrame(() => setJitter(true));

    if (autoFlipTimer.current) clearTimeout(autoFlipTimer.current);

    if (!flipped) {
      flipCount.current++;
      const count = flipCount.current;
      const idx =
        count <= quips.length ? count - 1 : (count - 1) % quips.length;
      setQuip(quips[idx]);

      if (count === 10) {
        new Audio("/navi-hey.mp3").play();
      }

      if (count === 5) {
        fireConfetti();
      } else {
        fireCoinCollect(e.clientX, e.clientY);
      }
      autoFlipTimer.current = setTimeout(() => {
        const nextIdx = count % quips.length;
        setQuip(quips[nextIdx]);
        setFaceBg(quipBgs[nextIdx]);
        requestAnimationFrame(() => setFlipped(false));
      }, AUTO_ROTATE_BACK_MS);
    }
    setFlipped((f) => !f);
  };

  // Clean up auto-flip timer on unmount
  useEffect(() => {
    return () => {
      if (autoFlipTimer.current) clearTimeout(autoFlipTimer.current);
    };
  }, []);

  // Mobile idle hints — random peek/jitter until first tap
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 5000;
      timer = setTimeout(() => {
        if (cancelled || hasInteracted.current) return;
        if (Math.random() < 0.5) {
          setJitter(false);
          requestAnimationFrame(() => setJitter(true));
        } else {
          setPeek(false);
          requestAnimationFrame(() => setPeek(true));
        }
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const isGradientBg = faceBg.startsWith("prism-bg-");

  return {
    flipped,
    jitter,
    setJitter,
    peek,
    setPeek,
    quip,
    faceBg,
    isGradientBg,
    handleFlip,
    prismRef,
  };
}
