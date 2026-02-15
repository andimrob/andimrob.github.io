const techColors: Record<string, string> = {
  // Frontend — blue
  React: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  JavaScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  // Backend — emerald
  "Ruby on Rails": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Ruby: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Rails: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Node.js": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  PostgreSQL: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  GraphQL: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  // Tools & DevOps — amber
  AWS: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Docker: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "CI/CD": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Git: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

const defaultTechColor = "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300";

const experiences = [
  {
    period: "2022 — Present",
    title: "Senior Software Engineer",
    company: "Acme Corp",
    url: "#",
    description:
      "Build and maintain critical features across the full stack of the company's flagship SaaS platform. Lead technical initiatives to improve performance and developer experience, collaborating closely with design and product teams.",
    technologies: [
      "React",
      "TypeScript",
      "Ruby on Rails",
      "PostgreSQL",
      "AWS",
    ],
  },
  {
    period: "2020 — 2022",
    title: "Software Engineer",
    company: "Widgets Inc",
    url: "#",
    description:
      "Developed and shipped features for an e-commerce platform serving millions of users. Implemented A/B testing infrastructure and built internal tooling that reduced deployment times by 40%.",
    technologies: ["React", "Node.js", "GraphQL", "Docker", "CI/CD"],
  },
  {
    period: "2018 — 2020",
    title: "Junior Developer",
    company: "StartupCo",
    url: "#",
    description:
      "Contributed to the development of a customer-facing web application from early prototype to production launch. Wrote comprehensive test suites and participated in code reviews to maintain high code quality.",
    technologies: ["JavaScript", "Ruby", "Rails", "PostgreSQL", "Git"],
  },
];

function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Work experience"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-gray-50/75 px-6 py-5 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0 dark:bg-gray-950/75">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white lg:sr-only">
          Experience
        </h2>
      </div>
      <div>
        <ol className="group/list">
          {experiences.map((job) => (
            <li key={job.title} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-gray-100/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg dark:lg:group-hover:bg-gray-800/50" />
                <header
                  className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-gray-400 sm:col-span-2 dark:text-gray-500"
                  aria-label={job.period}
                >
                  {job.period}
                </header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug">
                    <a
                      className="group/link inline-flex items-baseline text-base font-medium leading-tight text-gray-900 hover:text-primary focus-visible:text-primary dark:text-white dark:hover:text-primary dark:focus-visible:text-primary"
                      href={job.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${job.title} at ${job.company}`}
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      <span>
                        {job.title} &middot;{" "}
                        <span className="inline-block">
                          {job.company}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </span>
                    </a>
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-gray-500 dark:text-gray-400">
                    {job.description}
                  </p>
                  <ul
                    className="mt-2 flex flex-wrap"
                    aria-label="Technologies used"
                  >
                    {job.technologies.map((tech) => (
                      <li key={tech} className="mr-1.5 mt-2">
                        <div className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${techColors[tech] ?? defaultTechColor}`}>
                          {tech}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <a
            className="group inline-flex items-center font-medium leading-tight text-gray-900 hover:text-primary focus-visible:text-primary dark:text-white dark:hover:text-primary dark:focus-visible:text-primary"
            aria-label="View Full Resume"
            href="/resume.pdf"
          >
            <span className="border-b border-transparent pb-px transition group-hover:border-primary motion-reduce:transition-none">
              View Full R&eacute;sum&eacute;
            </span>
            <span className="whitespace-nowrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Experience;
