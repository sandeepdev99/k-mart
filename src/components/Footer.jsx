function Footer() {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-5xl mx-auto px-4 py-4 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>© {new Date().getFullYear()} K-Mart Kirana. All rights reserved.</p>
        <p>
          Made with <span className="text-red-500">♥</span> in your local
          neighbourhood.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
