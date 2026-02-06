import { useTextScramble } from "../hooks/useTextScramble";

function Hero() {
  const name = useTextScramble("Andi Robinson");

  return (
    <section className="hero">
      <div className="container">
        <p className="hero-greeting">Hello, I'm</p>
        <h1 className="hero-name">{name}</h1>
        <p className="hero-tagline">
          Software Developer &amp; Creative Problem Solver
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
