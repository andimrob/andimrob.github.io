import { type ReactNode, useCallback, useEffect, useRef } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";

const sections = [
  { id: "about", label: "About Me" },
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

function Sidebar() {
  const { theme, toggle } = useTheme();
  const active = useActiveSection(sectionIds);
  const fullName = "Robert Blakey";
  const { displayed: typedName, showCursor: nameCursor } = useTypewriter(
    fullName,
    { delay: 500, speed: 80 },
  );

  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const underlineRef = useRef<HTMLSpanElement>(null);

  const updateUnderline = useCallback(() => {
    const link = linkRefs.current[active];
    const bar = underlineRef.current;
    if (!link || !bar) return;

    bar.style.top = `${link.offsetTop + link.offsetHeight - 3}px`;
    bar.style.left = `0px`;
    bar.style.width = `${link.offsetWidth}px`;
  }, [active]);

  useEffect(() => {
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [updateUnderline]);

  return (
    <aside className="sticky top-0 flex h-screen flex-col justify-between px-8 py-20">
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

        {/* Typed name */}
        <div>
          <h1 className="relative inline-block text-left text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            <span className="invisible" aria-hidden="true">
              {fullName}
            </span>
            <span
              className={`absolute inset-0${nameCursor ? " typewriter-cursor" : ""}`}
            >
              {typedName}
            </span>
          </h1>
          <p className="hero-tagline mt-4">
            Software Engineer &amp; Creative Problem Solver
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-4">
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
        </div>

        {/* Navigation Links */}
        <nav ref={navRef} className="relative flex flex-col gap-4 pt-4">
          {sections.map((s) => (
            <a
              key={s.id}
              ref={(el) => {
                linkRefs.current[s.id] = el;
              }}
              href={`#${s.id}`}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
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
            className="nav-underline-gradient absolute h-[3px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
          />
        </nav>
      </div>

      {/* Theme toggle */}
      <div className="flex justify-start">
        <button
          onClick={toggle}
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
      </div>
    </aside>
  );
}

export default Sidebar;
