type TagCategory = "frontend" | "backend" | "data" | "platform";

const tagCategories: Record<string, TagCategory> = {
  // Frontend
  React: "frontend",
  TypeScript: "frontend",
  JavaScript: "frontend",
  "HTML/CSS": "frontend",
  "Tailwind CSS": "frontend",
  Vite: "frontend",
  // Backend
  "Ruby on Rails": "backend",
  "Node.js": "backend",
  Ruby: "backend",
  Go: "backend",
  GraphQL: "backend",
  "REST APIs": "backend",
  CLI: "backend",
  "Open Source": "backend",
  // Data
  PostgreSQL: "data",
  // Platform
  AWS: "platform",
  Heroku: "platform",
  Docker: "platform",
  "CI/CD": "platform",
  Git: "platform",
  Networking: "platform",
  Linux: "platform",
};

const categoryColors: Record<TagCategory, string> = {
  frontend: "bg-emerald-400/15 text-emerald-300",
  backend: "bg-amber-400/15 text-amber-300",
  data: "bg-rose-400/15 text-rose-300",
  platform: "bg-violet-400/15 text-violet-300",
};

export function tagColorClass(tag: string): string {
  return categoryColors[tagCategories[tag] ?? "frontend"];
}
