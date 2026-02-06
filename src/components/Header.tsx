import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../hooks/useTheme";

const navItems = ["About", "Skills", "Projects", "Contact"];

function Header() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme, toggle } = useTheme();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8 sm:pt-6">
      <div className="prism-perspective mx-auto max-w-5xl">
        {/* 3D Prism */}
        <div
          className={`prism ${open ? "prism-open" : hovered ? "prism-peek" : ""}`}
          onMouseEnter={() => {
            if (!open) setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            if (!open) setOpen(true);
          }}
        >
          {/* Front Face — Black */}
          <div className="prism-face prism-front flex items-center justify-between rounded-2xl bg-black px-6 shadow-2xl">
            <a
              href="#"
              className="text-lg font-bold tracking-tight text-white"
              onClick={(e) => e.stopPropagation()}
            >
              AR
            </a>
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="flex h-8 w-8 items-center justify-center text-white/60 transition-colors hover:text-white"
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
              <div className="flex w-6 flex-col gap-[5px]">
                <span className="block h-[2px] w-full rounded-full bg-white" />
                <span className="block h-[2px] w-full rounded-full bg-white" />
                <span className="block h-[2px] w-full rounded-full bg-white" />
              </div>
            </div>
          </div>

          {/* Top Face — White */}
          <div className="prism-face prism-top flex items-center justify-between rounded-2xl bg-white px-6 shadow-2xl">
            <span className="text-sm font-bold tracking-[0.25em] uppercase text-black">
              Menu
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close menu"
              className="flex h-8 w-8 items-center justify-center text-black/60 transition-colors hover:text-black"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </button>
          </div>

          {/* Bottom Face — White */}
          <div className="prism-face prism-bottom rounded-2xl bg-white" />
        </div>

        {/* Navigation Panel */}
        <nav
          className={`mt-3 overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            open
              ? "max-h-80 translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          {navItems.map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={close}
              className={`block px-6 py-4 text-[15px] font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black ${
                i < navItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Header;
