import CursiveRob from "./CursiveRob";

function Hero() {
  return (
    <section className="px-6 pt-30 pb-24 text-center">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        {/* Conference name tag sticker */}
        <div className="nametag">
          <div className="nametag-red">
            <span className="nametag-hello">HELLO</span>
            <span className="nametag-subtitle">my name is</span>
          </div>
          <div className="nametag-white">
            <CursiveRob className="nametag-name" />
          </div>
          <div className="nametag-bottom" />
        </div>

        <p className="hero-tagline mt-8 mb-10">
          Software Engineer &amp; Creative Problem Solver
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
