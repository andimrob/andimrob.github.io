import { useTilt } from "../hooks/useTilt";
import RevealSection from "./RevealSection";

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with React and Node.js that streamlines workflow management for small teams.",
    tags: ["React", "Node.js", "PostgreSQL"],
    link: "#",
  },
  {
    title: "Project Two",
    description:
      "An interactive data visualization dashboard that transforms raw metrics into actionable insights.",
    tags: ["TypeScript", "D3.js", "REST API"],
    link: "#",
  },
  {
    title: "Project Three",
    description:
      "A mobile-first responsive application focused on delivering a seamless user experience across all devices.",
    tags: ["React", "CSS", "Vite"],
    link: "#",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(12);

  return (
    <a
      ref={ref}
      href={project.link}
      className="block rounded-lg border border-gray-200 bg-gray-50 p-8 will-change-transform transition-[border-color,box-shadow] duration-200 hover:border-primary hover:shadow-[0_8px_24px_rgba(37,99,235,0.12)] dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-[0_8px_24px_rgba(96,165,250,0.1)]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <h3 className="mb-3 text-lg font-semibold">{project.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-primary dark:bg-blue-950/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

function Projects() {
  return (
    <RevealSection id="projects" className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
          Projects
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

export default Projects;
