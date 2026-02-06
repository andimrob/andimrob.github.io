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

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              className="project-card"
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
