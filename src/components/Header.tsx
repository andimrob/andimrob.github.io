import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
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

const quips: ReactNode[] = [
  "\u{1F44B} Hey, you found the secret side!",
  "\u{1F914} You\u{2019}re the curious type, huh?",
  <>{"\u{1F4A4}"} This does nothing productive. Try {link("https://fallingfalling.com", "this")} instead</>,
  "\u{1F47E} Insert coin to continue\u{2026}",
  "\u{1F3C6} Achievement unlocked: bar flipper!",
  "\u{1F60E} Okay you\u{2019}re committed. I respect that",
  <>{"\u{1F3B5}"} Feeling adventurous? {link("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "Click here for a surprise")}</>,
  "\u{1F355} You\u{2019}ve earned a mass-produced pizza. Not really",
  "\u{26A0}\u{FE0F} Warning: excessive flipping may cause mild satisfaction",
  "\u{1F389} Double digits! You\u{2019}re officially dedicated",
  <>{"\u{1F30A}"} You look tense. Maybe {link("https://fallingfalling.com", "just let go")}?</>,
  "\u{1F916} Beep boop. The nav bar is sentient now",
  <>{"\u{1F5A5}\u{FE0F}"} Ever wanted to {link("https://hackertyper.net", "feel like a hacker")}?</>,
  "\u{1F423} A wild easter egg appeared!",
  <>{"\u{1F30D}"} There\u{2019}s a whole {link("https://floor796.com", "world in one building")}</>,
  "\u{1F52E} The nav bar predicts\u{2026} you\u{2019}ll click again",
  <>{"\u{1F4BE}"} Miss the 90s? {link("https://win32.run", "Boot up some memories")}</>,
  "\u{1F409} Here be dragons. And also nav links",
  <>{"\u{2728}"} The old internet was {link("https://www.cameronsworld.net", "absolutely unhinged")}</>,
  <>{"\u{1F6B8}"} Don\u{2019}t shake {link("https://staggeringbeauty.com", "this little guy")}. Or do.</>,
];

function Header() {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [jitter, setJitter] = useState(false);
  const [idlePeek, setIdlePeek] = useState(false);
  const [quip, setQuip] = useState<ReactNode>(quips[0]);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);

  const flipCount = useRef(0);
  const autoFlipTimer = useRef<ReturnType<typeof setTimeout>>(null);
  const hasInteracted = useRef(false);
  const idlePeekTimer = useRef<ReturnType<typeof setTimeout>>(null);
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
    setIdlePeek(false);

    // Quick jitter on every click
    setJitter(false);
    requestAnimationFrame(() => setJitter(true));

    // Clear any pending auto-rotate
    if (autoFlipTimer.current) clearTimeout(autoFlipTimer.current);

    if (!flipped) {
      flipCount.current++;
      const count = flipCount.current;
      // Pick quip: ordered for first 20, then cycle from the end
      const idx = count <= quips.length ? count - 1 : ((count - 1) % quips.length);
      setQuip(quips[idx]);

      // Milestone effects
      if (count === 5) {
        fireConfetti();
      } else {
        fireCoinCollect(e.clientX, e.clientY);
      }
      // Auto-rotate back after 1 second
      autoFlipTimer.current = setTimeout(() => setFlipped(false), 1000);
    }
    setFlipped((f) => !f);
  };

  // Idle peek: briefly tilt down after 3s if no interaction
  useEffect(() => {
    idlePeekTimer.current = setTimeout(() => {
      if (!hasInteracted.current) {
        setIdlePeek(true);
        setTimeout(() => setIdlePeek(false), 800);
      }
    }, 3000);
    return () => {
      if (idlePeekTimer.current) clearTimeout(idlePeekTimer.current);
      if (autoFlipTimer.current) clearTimeout(autoFlipTimer.current);
    };
  }, []);

  const activeLabel = sections.find((s) => s.id === active)?.label ?? "";

  const prismClass = `prism ${flipped ? "prism-flipped" : hovered || idlePeek ? "prism-peek" : ""}`;

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
      <div
          className={`prism-perspective mx-auto max-w-5xl ${jitter ? "prism-jitter" : ""}`}
          onAnimationEnd={() => setJitter(false)}
        >
        <div
          className={prismClass}
          onMouseEnter={() => {
            hasInteracted.current = true;
            setIdlePeek(false);
            if (!flipped) setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Front Face */}
          <div
            className="prism-face prism-front flex cursor-pointer items-center justify-between bg-white px-6 shadow-2xl dark:bg-gray-950"
            onClick={handleFlip}
          >
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-gray-900 dark:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              AR
            </a>

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

              {/* Mobile: current section label */}
              <div className="relative sm:hidden">
                <span className="pb-1 text-sm font-medium text-gray-900 dark:text-white">
                  {activeLabel}
                </span>
                <span className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-gray-900 dark:bg-white" />
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
            className="prism-face prism-top flex cursor-pointer items-center justify-center bg-gray-950 px-6 dark:bg-white"
            onClick={handleFlip}
          >
            <span className="text-sm font-medium text-white dark:text-gray-900">
              {quip}
            </span>
          </div>

          {/* Bottom Face */}
          <div className="prism-face prism-bottom bg-gray-950 dark:bg-white" />
        </div>
      </div>
    </div>
  );
}

export default Header;
