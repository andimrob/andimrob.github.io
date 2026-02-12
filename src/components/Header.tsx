import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { useMagneticTilt } from "../hooks/useMagneticTilt";
import { usePrismFlip } from "../hooks/usePrismFlip";
import { quips, quipBgs } from "../data/quips";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const sectionIds = sections.map((s) => s.id);

function Header() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);

  const {
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
  } = usePrismFlip(quips, quipBgs);

  useMagneticTilt(prismRef, flipped);

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const underlineRef = useRef<HTMLSpanElement>(null);

  const updateUnderline = useCallback(() => {
    const link = linkRefs.current[active];
    const bar = underlineRef.current;
    if (!link || !bar) return;

    bar.style.left = `${link.offsetLeft}px`;
    bar.style.width = `${link.offsetWidth}px`;
  }, [active]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  const prismClass = `prism ${flipped ? "prism-flipped" : ""} ${peek ? "prism-peek" : ""}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
      <div
        className={`prism-perspective mx-auto max-w-4xl ${jitter ? "prism-jitter" : ""}`}
        onAnimationEnd={() => setJitter(false)}
      >
        <div
          ref={prismRef}
          className={prismClass}
          onAnimationEnd={() => setPeek(false)}
        >
          {/* Front Face */}
          <div
            className="prism-face prism-front grid cursor-pointer grid-cols-[1fr_auto_1fr] items-center bg-white px-3 shadow-2xl sm:px-6 dark:bg-gray-950 dark:border dark:border-gray-800 dark:shadow-[0_8px_30px_rgba(255,255,255,0.04)]"
            onClick={handleFlip}
          >
            <div />

            {/* Centered nav links */}
            <nav ref={navRef} className="relative flex items-center gap-6">
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
                className={`absolute bottom-0 h-[2px] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  isGradientBg ? faceBg : "bg-gray-900 dark:bg-white"
                }`}
              />
            </nav>

            {/* Theme toggle */}
            <div className="flex justify-end pl-6">
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
            className="prism-face prism-top cursor-pointer dark:border dark:border-gray-800"
            onClick={handleFlip}
          >
            {quip}
          </div>

          {/* Bottom Face */}
          <div
            className={`prism-face prism-bottom flex items-center justify-center px-6 ${faceBg} dark:border dark:border-gray-800`}
          ></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
