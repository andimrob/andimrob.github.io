import RevealSection from "./RevealSection";
import SectionHeading from "./SectionHeading";

const categoryEmojis: Record<string, string> = {
  Frontend: "🎨",
  Backend: "⚙️",
  "Tools & DevOps": "🛠️",
  Practices: "📐",
};

const categoryBorders: Record<string, string> = {
  Frontend: "border-l-blue-500",
  Backend: "border-l-emerald-500",
  "Tools & DevOps": "border-l-amber-500",
  Practices: "border-l-purple-500",
};

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
        {skills.map((group, groupIdx) => (
          <div
            key={group.category}
            className={`glass-card border-l-4 p-5 transition-all duration-200 hover:scale-[1.02] stagger-child ${categoryBorders[group.category]}`}
            style={{ animationDelay: `${groupIdx * 80}ms` }}
          >
            <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
              <span className="mr-1.5" aria-hidden="true">
                {categoryEmojis[group.category]}
              </span>
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <span
                  key={item}
                  className={`stagger-child rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${categoryColors[group.category]}`}
                  style={{ animationDelay: `${i * 80}ms` }}
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
