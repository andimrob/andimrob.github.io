import { type ReactNode, useRef } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";
import { usePrismFlip } from "../hooks/usePrismFlip";
import { useMagneticTilt } from "../hooks/useMagneticTilt";
import { quips, quipBgs } from "../data/quips";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

const sectionIds = sections.map((s) => s.id);

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-200 text-gray-500 transition-colors hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-400 dark:hover:border-primary dark:hover:text-primary"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-4 w-4"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-white"
    >
      {theme === "dark" ? (
        <svg
          className="h-5 w-5"
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
          className="h-5 w-5"
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
  );
}

function SocialLinks() {
  return (
    <>
      <SocialLink href="https://github.com/andimrob" label="GitHub">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </SocialLink>
      <SocialLink
        href="https://bsky.app/profile/robertblakey.com"
        label="Bluesky"
      >
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.6 3.496 6.158 3.16-4.468.765-8.393 2.634-5.18 7.508C4.014 23.98 8.16 22.16 12 17.18c3.84 4.98 7.811 6.689 10.398 3.735 3.213-4.874-.712-6.743-5.18-7.509 2.557.337 5.373-.532 6.158-3.16.246-.828.624-5.788.624-6.478 0-.69-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
      </SocialLink>
      <SocialLink
        href="https://www.linkedin.com/in/robblakey/"
        label="LinkedIn"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </SocialLink>
    </>
  );
}

function Sidebar() {
  const active = useActiveSection(sectionIds);
  const fullName = "Robert Blakey";
  const { displayed: typedName, showCursor: nameCursor } = useTypewriter(
    fullName,
    { delay: 500, speed: 80 },
  );

  const {
    flipped,
    jitter,
    setJitter,
    peek,
    setPeek,
    quip,
    faceBg,
    handleFlip,
    prismRef,
  } = usePrismFlip(quips, quipBgs);

  const perspectiveRef = useRef<HTMLDivElement>(null);
  useMagneticTilt(prismRef, flipped, perspectiveRef);

  const prismClass = `prism ${flipped ? "prism-flipped" : ""} ${peek ? "prism-peek" : ""}`;

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      {/* Mobile theme toggle — fixed upper right */}
      <div className="fixed top-5 right-5 z-50 lg:hidden">
        <ThemeToggle />
      </div>

      <div className="space-y-8">
        {/* Name tag sticker */}
        <div className="nametag cursor-pointer">
          <div className="nametag-red">
            <span className="nametag-hello">HELLO</span>
            <span className="nametag-subtitle">my name is</span>
          </div>
          <div className="nametag-white">
            <span className="nametag-name" aria-label="Rob">
              Rob
            </span>
          </div>
          <div className="nametag-bottom" />
        </div>

        {/* Name prism */}
        <div
          ref={perspectiveRef}
          className={`prism-perspective -ml-4 w-fit ${jitter ? "prism-jitter" : ""}`}
          onAnimationEnd={() => setJitter(false)}
        >
          <div
            ref={prismRef}
            className={`w-fit bg-gray-50 dark:bg-gray-950 ${prismClass}`}
            onAnimationEnd={() => setPeek(false)}
          >
            {/* Ghost sizer — provides intrinsic width since faces are absolute */}
            <span
              className="invisible block h-0 overflow-hidden px-4 pr-7 text-4xl font-bold tracking-tight sm:text-5xl"
              aria-hidden="true"
            >
              {fullName}
            </span>
            {/* Front face — typed name */}
            <div
              className="prism-face prism-front prism-front-glow flex cursor-pointer items-center bg-transparent px-4"
              onClick={handleFlip}
            >
              <h1 className="relative text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                <span className="invisible pr-3" aria-hidden="true">
                  {fullName}
                </span>
                <span
                  className={`absolute inset-0 flex items-center whitespace-nowrap${nameCursor ? " typewriter-cursor" : ""}`}
                >
                  {typedName}
                </span>
              </h1>
            </div>

            {/* Top face — quip */}
            <div
              className="prism-face prism-top cursor-pointer"
              onClick={handleFlip}
            >
              {quip}
            </div>

            {/* Left face */}
            <div className="prism-side prism-left prism-side-glow bg-gray-50 dark:bg-gray-950" />
            {/* Right face */}
            <div className="prism-side prism-right prism-side-glow bg-gray-50 dark:bg-gray-950" />

            {/* Bottom face — gradient */}
            <div
              className={`prism-face prism-bottom flex items-center justify-center px-6 ${faceBg}`}
            />
          </div>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">
          Software Engineer &amp; Creative Problem Solver
        </p>

        {/* Social links — visible on mobile, hidden on desktop (shown at bottom) */}
        <div className="flex gap-4 lg:hidden">
          <SocialLinks />
        </div>

        {/* Section nav — hidden on mobile */}
        <nav
          className="hidden pt-4 lg:block"
          aria-label="In-page jump links"
        >
          <ul className="flex flex-col gap-6">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="relative inline-block pb-2"
                >
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                      active === s.id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                    }`}
                  >
                    {s.label}
                  </span>
                  <span
                    className={`nav-underline-gradient absolute bottom-0 left-0 h-[3px] w-full origin-left rounded-full transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      active === s.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Desktop bottom: social links + theme toggle */}
      <div className="mt-8 hidden items-center gap-4 lg:flex">
        <SocialLinks />
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Sidebar;
