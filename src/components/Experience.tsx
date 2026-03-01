import { tagColorClass } from "../tagColors";

const experiences = [
  {
    dateRange: "2022 — Present",
    title: "Senior Software Engineer",
    company: "Acme Corp",
    description:
      "Build and maintain critical internal tools and customer-facing features. Lead cross-functional initiatives to improve developer experience and system reliability.",
    tags: ["React", "TypeScript", "Ruby on Rails", "PostgreSQL", "AWS"],
  },
  {
    dateRange: "2019 — 2022",
    title: "Software Engineer",
    company: "TechStart Inc.",
    description:
      "Developed full-stack web applications from concept to deployment. Collaborated closely with product and design teams to ship iterative improvements.",
    tags: ["React", "Node.js", "GraphQL", "Docker", "CI/CD"],
  },
  {
    dateRange: "2017 — 2019",
    title: "Junior Developer",
    company: "WebWorks Agency",
    description:
      "Built responsive client websites and internal tooling. Gained deep expertise in frontend frameworks and modern CSS techniques.",
    tags: ["JavaScript", "HTML/CSS", "Ruby", "Git"],
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
