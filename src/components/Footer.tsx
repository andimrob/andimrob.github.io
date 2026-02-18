function Footer() {
  return (
    <footer className="py-8 text-center">
      <div className="px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Robert Blakey. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
