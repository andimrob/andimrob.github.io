import RevealSection from "./RevealSection";
import SectionHeading from "./SectionHeading";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "HTML/CSS", "Vite"] },
  {
    category: "Backend",
    items: [
      "Ruby",
      "Rails",
      "Go",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    category: "Tools & DevOps",
    items: ["Git", "Bash", "Linux", "Docker", "CI/CD", "AWS"],
  },
  {
    category: "Practices",
    items: [
      "Agile",
      "TDD",
      "A/B Testing",
      "Testing",
      "Code Review",
      "Documentation",
    ],
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
      <SectionHeading>Experience</SectionHeading>
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
    </RevealSection>
  );
}

export default Experience;
