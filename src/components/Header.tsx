import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { fireConfetti } from "../confetti";
import { fireCoinCollect } from "../coinCollect";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const sectionIds = sections.map((s) => s.id);

// How long the flipped face stays visible before auto-rotating back (ms)
const AUTO_ROTATE_BACK_MS = 2000;

const link = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="underline decoration-dotted underline-offset-2 hover:opacity-70"
  >
    {text}
  </a>
);

function QuipFace({
  children,
  bg = "bg-gray-950 dark:bg-white",
  text = "text-white dark:text-gray-900",
}: {
  children: ReactNode;
  bg?: string;
  text?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden px-6 ${bg}`}
    >
      <span className={`relative z-10 text-sm font-medium ${text}`}>
        {children}
      </span>
    </div>
  );
}

const quips: ReactNode[] = [
  <QuipFace>{"\u{1F44B}"} Hey, you found the secret side!</QuipFace>,
  <QuipFace>
    {"\u{1F914}"} You{"\u2019"}re the curious type, huh?
  </QuipFace>,
  <QuipFace>
    {"\u{1F4A4}"} This does nothing productive. Try{" "}
    {link("https://fallingfalling.com", "this")} instead
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F47E}"} Insert coin to continue{"\u2026"}
  </QuipFace>,
  <QuipFace>{"\u{1F3C6}"} Achievement unlocked: bar flipper!</QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F60E}"} Okay you{"\u2019"}re committed. I respect that
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F3B5}"} Click me baby, one more time!
  </QuipFace>,
  <QuipFace>
    {"\u{1F4AD}"} I wonder what the next one says{"\u2026"}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{26A0}\u{FE0F}"} Warning: excessive flipping may cause mild satisfaction
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F389}"} Double digits! You{"\u2019"}re officially dedicated
  </QuipFace>,
  <QuipFace>{"\u{2728}"} 𝑺𝑬𝑬 𝒀𝑶𝑼 𝑺𝑷𝑨𝑪𝑬 𝑪𝑶𝑾𝑩𝑶𝒀 . . .</QuipFace>,
  <QuipFace>
    {"\u{1F30A}"} You look tense. Maybe{" "}
    {link("https://fallingfalling.com", "just let go")}?
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F916}"} Beep boop. I have achieved consciousness.
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F5A5}\u{FE0F}"} Ever wanted to{" "}
    {link("https://hackertyper.net", "feel like a hacker")}?
  </QuipFace>,
  <QuipFace>{"\u{1F423}"} A wild easter egg appeared!</QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F40B}"} This bar flips more than a dolphin at SeaWorld
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F30D}"} There{"\u2019"}s a whole{" "}
    {link("https://floor796.com", "world in one building")}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F52E}"} The nav bar predicts{"\u2026"} you{"\u2019"}ll click again
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F4BE}"} Miss the 90s?{" "}
    {link("https://win32.run", "Boot up some memories")}
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F409}"} Here there be <s>dragons</s> links!
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1FA90}"} I{"\u2019"}d tell you a CSS joke but it{"\u2019"}d have no
    class
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{2728}"} The old internet was{" "}
    {link("https://www.cameronsworld.net", "absolutely unhinged")}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F6B8}"} Don{"\u2019"}t shake{" "}
    {link("http://staggeringbeauty.com", "this little guy")}. Or do.
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F3B0}"} You hit the jackpot. The prize: more flipping.
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F41F}"} If you were a fish, you{"\u2019"}d definitely take the bait
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F9D8}"} Need to decompress?{" "}
    {link("https://patience.toys/", "Take your time")}
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F3A8}"} Channel your inner{" "}
    {link("https://jacksonpollock.org/", "Jackson Pollock")}
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1FA66}"}{" "}
    {link("https://burymewithmymoney.com/", "Bury me with my money")}
  </QuipFace>,
  <QuipFace>
    {"\u{1F611}"} This is{" "}
    {link("https://www.muchbetterthanthis.com/", "much better than this")}
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F9CA}"} The real portfolio was the clicks along the way
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F576}\u{FE0F}"} Afraid of the dark?{" "}
    {link("https://maninthedark.com/", "You should be")}
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F96A}"} Behold:{" "}
    {link("https://rotatingsandwiches.com/", "rotating sandwiches")}
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F447}"} This will{" "}
    {link("https://pointerpointer.com/", "point right at you")}
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F4BF}"} You{"\u2019"}ve been rotating this longer than a CD in 2003
  </QuipFace>,
  <QuipFace bg="prism-bg-aurora" text="text-cyan-100">
    {"\u{1F485}"} Oddly satisfying:{" "}
    {link("https://lacquerlacquer.com/", "digital nail art")}
  </QuipFace>,
  <QuipFace bg="prism-bg-vaporwave" text="text-white">
    {"\u{1F3B6}"} Summer never ends at{" "}
    {link("https://poolsuite.net/", "Poolsuite")}
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{26A1}"} Caution: {link("https://strobe.cool/", "this strobes")}.
    Obviously.
  </QuipFace>,
  <QuipFace bg="prism-bg-lava" text="text-orange-100">
    {"\u{1F525}"} We didn{"\u2019"}t start the fire. Actually, you did.
  </QuipFace>,
  <QuipFace>
    {"\u{1F92A}"} Emojis, but {link("https://remoji.com/", "worse")}
  </QuipFace>,
  <QuipFace>{"\u{1F50D}"} 404: productivity not found</QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F680}"} One small click for man. One giant waste of time.
  </QuipFace>,
  <QuipFace bg="prism-bg-deepspace" text="text-purple-200">
    {"\u{1F30C}"} Lose yourself in a{" "}
    {link("https://dgreenheck.github.io/webgpu-galaxy/", "galaxy")}
  </QuipFace>,
  <QuipFace bg="prism-bg-holographic" text="text-white">
    {"\u{1F300}"} Stare into the{" "}
    {link("https://singularity.misterprada.com/", "singularity")}
  </QuipFace>,
  <QuipFace bg="prism-bg-ocean" text="text-cyan-100">
    {"\u{1F3A3}"} You{"\u2019"}re hooked. Reel-y hooked.
  </QuipFace>,
  <QuipFace bg="prism-bg-gold" text="text-yellow-950">
    {"\u{1F381}"} You made it to the end. Here{"\u2019"}s{" "}
    {link("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "your reward")}
  </QuipFace>,
];

function Header() {
  const [flipped, setFlipped] = useState(false);
  const [jitter, setJitter] = useState(false);
  const [peek, setPeek] = useState(false);
  const [quip, setQuip] = useState<ReactNode>(quips[0]);
  const hasInteracted = useRef(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);

  const flipCount = useRef(0);
  const autoFlipTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const prismRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const underlineRef = useRef<HTMLSpanElement>(null);

  const updateUnderline = useCallback(() => {
    const container = navRef.current;
    const link = linkRefs.current[active];
    const bar = underlineRef.current;
    if (!container || !link || !bar) return;

    const cRect = container.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();
    bar.style.left = `${lRect.left - cRect.left}px`;
    bar.style.width = `${lRect.width}px`;
  }, [active]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  const handleFlip = (e: React.MouseEvent) => {
    hasInteracted.current = true;

    // Clear magnetic tilt so CSS class transform takes over
    if (prismRef.current) prismRef.current.style.transform = "";

    // Quick jitter
    setJitter(false);
    requestAnimationFrame(() => setJitter(true));

    // Clear any pending auto-rotate
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
      autoFlipTimer.current = setTimeout(
        () => setFlipped(false),
        AUTO_ROTATE_BACK_MS,
      );
    }
    setFlipped((f) => !f);
  };

  // Magnetic cursor-tracking tilt
  useEffect(() => {
    const MAX_TILT_X = 80; // max rotateX degrees
    const MAX_TILT_Y = 15; // max rotateY degrees
    const ATTRACT_RANGE = 200; // px from navbar center where effect is active

    const handleMouseMove = (e: MouseEvent) => {
      const el = prismRef.current;
      if (!el || flipped) {
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

      // Strength falls off with distance (1 at center, 0 at range edge)
      const strength = 1 - dist / ATTRACT_RANGE;
      // Cursor below = tilt forward (negative rotateX), above = tilt back
      const tiltX = -(dy / ATTRACT_RANGE) * MAX_TILT_X * strength;
      // Cursor right = tilt left (positive rotateY), left = tilt right
      const tiltY = (dx / ATTRACT_RANGE) * MAX_TILT_Y * strength;

      el.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = () => {
      if (prismRef.current) prismRef.current.style.transform = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [flipped]);

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
      const delay = 3000 + Math.random() * 5000; // 3–8s
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


  const prismClass = `prism ${flipped ? "prism-flipped" : ""} ${peek ? "prism-peek" : ""}`;

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
      <div
        className={`prism-perspective mx-auto max-w-5xl ${jitter ? "prism-jitter" : ""}`}
        onAnimationEnd={() => setJitter(false)}
      >
        <div
          ref={prismRef}
          className={prismClass}
          onAnimationEnd={() => setPeek(false)}
        >
          {/* Front Face */}
          <div
            className="prism-face prism-front flex cursor-pointer items-center justify-between bg-white px-6 shadow-2xl dark:bg-gray-950 dark:border dark:border-gray-800 dark:shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
            onClick={handleFlip}
          >
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Robert Blakey
            </span>

            <div className="flex items-center gap-5">
              {/* Desktop nav links */}
              <div
                ref={navRef}
                className="relative hidden items-center gap-6 sm:flex"
              >
                {sections.map((s) => (
                  <a
                    key={s.id}
                    ref={(el) => {
                      linkRefs.current[s.id] = el;
                    }}
                    href={`#${s.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className={`pb-1 text-sm font-medium transition-colors ${
                      active === s.id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
                <span
                  ref={underlineRef}
                  className="absolute bottom-0 h-[2px] bg-gray-900 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-white"
                />
              </div>

              {/* Mobile: animated section label */}
              <div className="relative overflow-hidden sm:hidden" style={{ height: "1.5rem" }}>
                {/* Invisible widest label to reserve width */}
                <span className="invisible pb-1 text-sm font-medium">
                  {sections.reduce((a, b) => (a.label.length >= b.label.length ? a : b)).label}
                </span>
                {sections.map((s) => {
                  const isActive = active === s.id;
                  const idx = sectionIds.indexOf(s.id);
                  const activeIdx = sectionIds.indexOf(active);
                  const above = idx < activeIdx;
                  let y = "0%";
                  if (!isActive) y = above ? "-100%" : "100%";
                  return (
                    <span
                      key={s.id}
                      className="absolute inset-0 flex items-center justify-end text-sm font-medium text-gray-900 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] dark:text-white"
                      style={{
                        transform: `translateY(${y})`,
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <span className="relative pb-1">
                        {s.label}
                        <span className="absolute bottom-0 left-0 h-[2px] w-full bg-gray-900 dark:bg-white" />
                      </span>
                    </span>
                  );
                })}
              </div>

              {/* Theme toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-8 w-8 items-center justify-center text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
              >
                {theme === "dark" ? (
                  <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx={12} cy={12} r={5} />
                    <line x1={12} y1={1} x2={12} y2={3} />
                    <line x1={12} y1={21} x2={12} y2={23} />
                    <line x1={4.22} y1={4.22} x2={5.64} y2={5.64} />
                    <line x1={18.36} y1={18.36} x2={19.78} y2={19.78} />
                    <line x1={1} y1={12} x2={3} y2={12} />
                    <line x1={21} y1={12} x2={23} y2={12} />
                    <line x1={4.22} y1={19.78} x2={5.64} y2={18.36} />
                    <line x1={18.36} y1={5.64} x2={19.78} y2={4.22} />
                  </svg>
                ) : (
                  <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Top Face — Easter egg */}
          <div
            className="prism-face prism-top cursor-pointer"
            onClick={handleFlip}
          >
            {quip}
          </div>

          {/* Bottom Face */}
          <div className="prism-face prism-bottom flex items-center justify-center bg-gray-950 px-6 dark:bg-white"></div>
        </div>
      </div>
    </div>
  );
}

export default Header;
