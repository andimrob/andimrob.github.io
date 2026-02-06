import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <a href="#" className="text-xl font-bold tracking-tight text-primary">
          AR
        </a>
        <div className="flex items-center gap-4">
          <nav
            className={`max-sm:fixed max-sm:inset-x-0 max-sm:top-16 max-sm:border-b max-sm:border-gray-200 max-sm:bg-white max-sm:transition-all max-sm:dark:border-gray-800 max-sm:dark:bg-gray-950 sm:flex sm:gap-8 ${menuOpen ? "max-sm:max-h-60" : "max-sm:max-h-0 max-sm:overflow-hidden"}`}
          >
            {["About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-3 text-sm font-medium text-gray-500 transition-colors hover:text-primary sm:px-0 sm:py-0 dark:text-gray-400"
              >
                {item}
              </a>
            ))}
          </nav>
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
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
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <button
            className="flex flex-col gap-[5px] p-1 sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span
              className={`block h-0.5 w-6 rounded bg-gray-900 transition-all dark:bg-gray-100 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded bg-gray-900 transition-all dark:bg-gray-100 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 rounded bg-gray-900 transition-all dark:bg-gray-100 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
