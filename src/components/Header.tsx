import { useState } from "react";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <a href="#" className="text-xl font-bold tracking-tight text-primary">
          AR
        </a>
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
      </div>
    </header>
  );
}

export default Header;
