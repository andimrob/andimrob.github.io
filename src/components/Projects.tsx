import { tagColorClass } from "../tagColors";

const projects = [
  {
    title: "Portfolio Site",
    description:
      "Personal portfolio built with React, TypeScript, and Tailwind CSS. Features a split-screen layout, cursor glow effect, and x-ray source code easter egg.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    href: "https://github.com/andimrob/andimrob.github.io",
  },
  {
    title: "Project Two",
    description:
      "A full-stack application showcasing modern development practices including TDD, CI/CD, and infrastructure as code.",
    tags: ["Ruby on Rails", "PostgreSQL", "Docker", "AWS"],
    href: "#",
  },
  {
    title: "Project Three",
    description:
      "An open-source CLI tool designed to improve developer workflows and reduce repetitive tasks.",
    tags: ["Go", "CLI", "Open Source"],
    href: "#",
  },
];

function Projects() {
  return (
    <section
      id="projects"
      className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-gray-950/75 px-6 py-5 backdrop-blur lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          Projects
        </h2>
      </div>
      <ol className="group/list space-y-12">
        {projects.map((project) => (
          <li
            key={project.title}
            className="group relative grid pb-1 transition-all lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          >
            <div className="z-10">
              <h3 className="font-medium leading-snug text-slate-200">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 hover:text-teal-300"
                >
                  {project.title}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </h3>
              <p className="mt-2 text-sm leading-normal text-slate-400">
                {project.description}
              </p>
              <ul
                className="mt-2 flex flex-wrap gap-2"
                aria-label="Technologies used"
              >
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <span className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${tagColorClass(tag)}`}>
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Projects;
