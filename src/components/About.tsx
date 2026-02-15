function About() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="About me"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-gray-50/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-gray-950/75">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white lg:sr-only">
          About
        </h2>
      </div>
      <div className="space-y-4 text-gray-500 dark:text-gray-400">
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
    </section>
  );
}

export default About;
