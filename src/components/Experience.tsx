import RevealSection from "./RevealSection";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "HTML/CSS", "Vite"] },
  { category: "Backend", items: ["Node.js", "Python", "REST APIs", "SQL"] },
  {
    category: "Tools & DevOps",
    items: ["Git", "Docker", "CI/CD", "AWS"],
  },
  {
    category: "Practices",
    items: ["Agile", "Testing", "Code Review", "Documentation"],
  },
];

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Backend:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Tools & DevOps":
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Practices:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

function Experience() {
  return (
    <RevealSection id="experience">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
          Experience
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-xl bg-gray-50 p-5 dark:bg-gray-900"
            >
              <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${categoryColors[group.category]}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

export default Experience;
