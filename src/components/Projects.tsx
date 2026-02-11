import RevealSection from "./RevealSection";

function Projects() {
  return (
    <RevealSection id="projects">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
          Projects
        </h2>
        <p className="mx-auto max-w-lg text-center text-gray-500 dark:text-gray-400">
          Coming soon.
        </p>
      </div>
    </RevealSection>
  );
}

export default Projects;
