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
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-sm"
            />
            <div className="z-10 pointer-events-none">
              <h3 className="font-medium leading-snug text-slate-200">
                <span className="text-base font-medium leading-tight text-slate-200">
                  {project.title}
                </span>
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
