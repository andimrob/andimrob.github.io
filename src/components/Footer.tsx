function Footer() {
  return (
    <footer className="max-w-md pb-16 text-sm text-gray-500 dark:text-gray-400 sm:pb-0">
      <p>
        Coded in{" "}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Visual Studio Code
        </a>
        . Built with{" "}
        <a
          href="https://react.dev/"
          className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          React
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tailwind CSS
        </a>
        , deployed with{" "}
        <a
          href="https://pages.github.com/"
          className="font-medium text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub Pages
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;
