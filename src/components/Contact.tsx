import RevealSection from "./RevealSection";

function Contact() {
  return (
    <RevealSection id="contact" className="text-center">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
          Get in Touch
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-gray-500 dark:text-gray-400">
          I'm always open to new opportunities and interesting projects. Whether
          you have a question or just want to say hello, feel free to reach out.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://github.com/andimrob"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border-2 border-primary bg-primary px-7 py-3 text-sm font-medium text-white transition-colors hover:border-primary-hover hover:bg-primary-hover"
          >
            GitHub
          </a>
          <a
            href="mailto:hello@andimrob.com"
            className="rounded-lg border-2 border-primary bg-transparent px-7 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
          >
            Email Me
          </a>
        </div>
      </div>
    </RevealSection>
  );
}

export default Contact;
