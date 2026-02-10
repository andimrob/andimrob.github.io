import RevealSection from "./RevealSection";

function About() {
  return (
    <RevealSection id="about" className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
          About Me
        </h2>
        <div className="max-w-xl space-y-4 text-gray-500 dark:text-gray-400">
          <p>
            I'm a passionate software developer who loves building clean,
            efficient, and user-friendly applications. With a strong foundation
            in modern web technologies, I enjoy turning complex problems into
            simple, elegant solutions.
          </p>
          <p>
            When I'm not writing code, you can find me exploring new
            technologies, contributing to open-source projects, and continuously
            learning to stay ahead in the ever-evolving tech landscape.
          </p>
        </div>
      </div>
    </RevealSection>
  );
}

export default About;
