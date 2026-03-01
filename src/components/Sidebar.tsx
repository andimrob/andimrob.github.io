import { type ReactNode } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
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
      className="text-slate-400 transition-colors hover:text-slate-200"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
        aria-hidden="true"
      >
        {children}
      </svg>
    </a>
  );
}

function Sidebar() {
  const active = useActiveSection(sectionIds);

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-full lg:flex-col lg:justify-between lg:py-24">
      <div>
        <h1 className="font-heading text-4xl font-bold tracking-normal text-slate-200 sm:text-5xl">
          <a href="/">Robert Blakey</a>
        </h1>
        <h2 className="font-heading mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          Software Engineer
        </h2>
        <p className="mt-4 max-w-xs text-slate-400">
          I build clean, efficient, and user-friendly web applications.
        </p>

        <nav className="mt-16 hidden lg:block" aria-label="In-page jump links">
          <ul className="w-max space-y-5">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="group flex items-center gap-4">
                  <span
                    className={`nav-indicator h-px bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 ${
                      active === s.id ? "nav-indicator-active bg-slate-200" : ""
                    }`}
                  />
                  <span
                    className={`text-xs font-bold uppercase tracking-widest transition-colors group-hover:text-slate-200 ${
                      active === s.id ? "text-slate-200" : "text-slate-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <ul className="mt-8 flex items-center gap-5" aria-label="Social media">
        <li>
          <SocialLink href="https://github.com/andimrob" label="GitHub">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href="https://bsky.app/profile/robertblakey.com"
            label="Bluesky"
          >
            <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.785 2.627 3.6 3.496 6.158 3.16-4.468.765-8.393 2.634-5.18 7.508C4.014 23.98 8.16 22.16 12 17.18c3.84 4.98 7.811 6.689 10.398 3.735 3.213-4.874-.712-6.743-5.18-7.509 2.557.337 5.373-.532 6.158-3.16.246-.828.624-5.788.624-6.478 0-.69-.139-1.861-.902-2.203-.659-.3-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z" />
          </SocialLink>
        </li>
        <li>
          <SocialLink
            href="https://www.linkedin.com/in/robblakey/"
            label="LinkedIn"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </SocialLink>
        </li>
      </ul>
    </header>
  );
}

export default Sidebar;
