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

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skills.map((group) => (
            <div key={group.category} className="skill-card">
              <h3>{group.category}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
