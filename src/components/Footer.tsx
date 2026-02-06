function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 text-center dark:border-gray-800">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Andi Robinson. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
