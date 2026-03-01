function Footer() {
  return (
    <footer className="pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        Loosely designed in{" "}
        <a
          href="https://www.figma.com/"
          className="font-medium text-slate-400 hover:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Figma
        </a>{" "}
        and coded in{" "}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-slate-400 hover:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          VS Code
        </a>
        . Built with{" "}
        <a
          href="https://react.dev/"
          className="font-medium text-slate-400 hover:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          React
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-slate-400 hover:text-teal-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tailwind CSS
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
