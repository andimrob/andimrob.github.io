import RevealSection from "./RevealSection";

const skills = [
  { category: "Frontend", items: ["React", "TypeScript", "HTML/CSS", "Vite"] },
  { category: "Backend", items: ["Node.js", "Python", "REST APIs", "SQL"] },
  { category: "Tools & DevOps", items: ["Git", "Docker", "CI/CD", "AWS"] },
  { category: "Practices", items: ["Agile", "Testing", "Code Review", "Documentation"] },
];

function Experience() {
  return (
    <RevealSection id="experience">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="relative mb-8 inline-block text-2xl font-bold after:absolute after:-bottom-1.5 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-primary">
          Experience
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="mb-3 text-sm font-semibold text-primary">
                {group.category}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-gray-500 dark:text-gray-400">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
}

export default Experience;
