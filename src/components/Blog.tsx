const posts = [
  {
    title: "Building a Split-Screen Portfolio with React",
    date: "2025",
    description:
      "A walkthrough of designing and building a Brittany Chiang-inspired portfolio layout using React, TypeScript, and Tailwind CSS.",
  },
  {
    title: "Test-Driven Development in Practice",
    date: "2024",
    description:
      "Lessons learned from adopting TDD across multiple projects and how it changed the way I write software.",
  },
  {
    title: "From Ruby to Go: A Pragmatic Migration",
    date: "2024",
    description:
      "Exploring the trade-offs and benefits of rewriting performance-critical services from Ruby to Go.",
  },
];

function Blog() {
  return (
    <section
      id="writing"
      className="mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 bg-gray-950/75 px-6 py-5 backdrop-blur lg:sr-only lg:relative lg:top-auto lg:mx-0 lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200">
          Writing
        </h2>
      </div>
      <ol className="group/list space-y-12">
        {posts.map((post) => (
          <li
            key={post.title}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg lg:group-hover:backdrop-blur-sm" />
            <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
              {post.date}
            </header>
            <div className="z-10 sm:col-span-6">
              <h3 className="font-medium leading-snug text-slate-200">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-normal text-slate-400">
                {post.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Blog;
