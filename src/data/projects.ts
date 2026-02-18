export interface Project {
  title: string;
  description: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    title: "Personal Portfolio",
    description:
      "The very site you're looking at. React 19, TypeScript, Tailwind CSS 4. Features a 3D prism-flip nav with 44 easter egg quips, X-Ray mode, cursor glow, and more hidden surprises.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    links: [
      {
        label: "Source",
        url: "https://github.com/andimrob/andimrob.github.io",
      },
    ],
  },
  {
    title: "CLI Task Manager",
    description:
      "A terminal-native task manager built in Go. Supports projects, priorities, due dates, and Kanban board views right in your terminal.",
    tech: ["Go", "Cobra", "SQLite", "Bubble Tea"],
    links: [],
  },
  {
    title: "Real-Time Chat",
    description:
      "WebSocket-powered chat app with rooms, typing indicators, and message persistence. Built as a deep-dive into real-time architecture.",
    tech: ["Node.js", "WebSocket", "React", "PostgreSQL"],
    links: [],
  },
];
