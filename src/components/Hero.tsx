import { useTextScramble } from "../hooks/useTextScramble";

function Hero() {
  const name = useTextScramble("Robert Blakey");

  return (
    <section className="px-6 pt-40 pb-24 text-center">
      <div className="mx-auto max-w-4xl">
        <p className="mb-2 text-lg font-medium text-primary">Hello, I'm</p>
        <h1 className="mb-4 text-5xl font-bold tracking-tight max-sm:text-4xl">
          {name}
        </h1>
        <p className="mb-10 text-xl text-gray-500 max-sm:text-base dark:text-gray-400">
          Software Developer &amp; Creative Problem Solver
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-lg border-2 border-primary bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-lg border-2 border-primary bg-transparent px-7 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
