import RevealSection from "./RevealSection";
import SectionHeading from "./SectionHeading";

function About() {
  return (
    <RevealSection id="about" className="lg:pt-0">
      <SectionHeading>About Me</SectionHeading>
      <div className="max-w-xl space-y-4 text-gray-500 dark:text-gray-400">
        <p>
          I&apos;m a software engineer who genuinely enjoys building things that
          work well and feel right. I care about the craft &mdash; clean
          abstractions, thoughtful APIs, code that reads like it was written by
          someone who was paying attention. I&apos;ve spent most of my career
          building web applications with Ruby on Rails and React, but I&apos;m
          just as comfortable diving into Go, wrangling infrastructure, or
          debugging a CSS grid that&apos;s decided to have opinions.
        </p>
        <p>
          When I&apos;m not shipping features, I&apos;m usually tinkering with
          side projects, poking at new tools, or finding creative ways to make
          developer experience better. I believe the best engineering is equal
          parts precision and playfulness &mdash; hence the 44 easter eggs
          hidden in this nav bar.
        </p>
        <p>
          Outside of code: bad puns, good coffee, and an unreasonable number of
          browser tabs.
        </p>
      </div>
    </RevealSection>
  );
}

export default About;
