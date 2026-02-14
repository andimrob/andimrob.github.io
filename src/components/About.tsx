import RevealSection from "./RevealSection";
import SectionHeading from "./SectionHeading";

function About() {
  return (
    <RevealSection id="about">
      <div className="scroll-mt-24">
        <SectionHeading>About Me</SectionHeading>
        <div className="max-w-xl space-y-4 text-gray-500 dark:text-gray-400">
          <p>
            I'm a passionate software developer who loves building clean,
            efficient, and user-friendly applications. With a strong foundation in
            modern web technologies, I enjoy turning complex problems into simple,
            elegant solutions.
          </p>
          <p>
            When I'm not writing code, you can find me exploring new technologies,
            contributing to open-source projects, and continuously learning to
            stay ahead in the ever-evolving tech landscape.
          </p>
        </div>
      </div>
    </RevealSection>
  );
}

export default About;
