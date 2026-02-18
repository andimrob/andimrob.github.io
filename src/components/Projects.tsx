import RevealSection from "./RevealSection";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/projects";

function Projects() {
  return (
    <RevealSection id="projects">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid grid-cols-1 gap-4">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="glass-card p-5 transition-all duration-200 hover:scale-[1.02] stagger-child"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-heading text-base font-semibold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              {project.links.length > 0 && (
                <div className="flex shrink-0 gap-2">
                  {project.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                    >
                      {link.label}
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RevealSection>
  );
}

export default Projects;
