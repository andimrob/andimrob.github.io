import { tagColorClass } from "../tagColors";

const experiences = [
  {
    dateRange: "Jul 2025 — Present",
    title: "Staff Software Engineer",
    company: "Betterment",
    description:
      "",
    tags: ["React", "TypeScript", "Ruby on Rails", "PostgreSQL", "AWS"],
  },
  {
    dateRange: "Jan 2023 — Aug 2025",
    title: "Senior Software Engineer",
    company: "Betterment",
    description:
      "",
    tags: ["React", "TypeScript", "Ruby on Rails", "PostgreSQL", "AWS"],
  },
  {
    dateRange: "Feb 2021 — Jan 2023",
    title: "Engineering Manager",
    company: "Betterment",
    description:
      "",
    tags: [],
  },
  {
    dateRange: "Aug 2018 — Feb 2021",
    title: "Software Engineer",
    company: "Betterment",
    description:
      "",
    tags: ["React", "TypeScript", "Ruby on Rails", "PostgreSQL", "AWS"],
  },
  {
    dateRange: "Jun 2015 — Aug 2018",
    title: "Software Engineer",
    company: "Upright (Fund That Flip)",
    description:
      "Founding engineer on the tech team for a technology-enabled investment platform providing access to single family residential real estate investment opportunities. Built out from an MVP by crafting custom UI components, optimizing database design, creating internal tools for business operations, and adding vendor integrations.",
    tags: ["Ruby on Rails", "React", "PostgreSQL", "REST APIs", "AWS", "Heroku", "CI/CD"],
  },
  {
    dateRange: "Jul 2010 — Oct 2013",
    title: "Enterprise Site Engineer",
    company: "JPMorgan Chase",
    description:
      "Data center engineering supporting 3 sites. Installation, configuration, and maintenance of servers, networking, and other data center equipment in a 24/7 on-call capacity. Auditing and monitoring for performance and early-detection of failure.",
    tags: ["Networking", "Linux"],
  },
];

function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-gray-950/75 px-6 py-5 backdrop-blur lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          Experience
        </h2>
      </div>
      <ol className="group/list space-y-12">
        {experiences.map((exp) => (
          <li
            key={`${exp.company}-${exp.dateRange}`}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-sm" />
            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
              {exp.dateRange}
            </header>
            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-slate-200">
                <span>{exp.title}</span>
                <span className="mx-1 text-slate-500">·</span>
                <span className="text-slate-400">{exp.company}</span>
              </h3>
              <p className="mt-2 text-sm leading-normal text-slate-400">
                {exp.description}
              </p>
              <ul
                className="mt-2 flex flex-wrap gap-2"
                aria-label="Technologies used"
              >
                {exp.tags.map((tag) => (
                  <li key={tag}>
                    <span className={`flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 ${tagColorClass(tag)}`}>
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Experience;
