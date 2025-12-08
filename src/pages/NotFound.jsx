import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="text-center py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-sm text-gray-600 mb-4">
        The page you are looking for could not be found.
      </p>
      <Link
        to="/"
        className="inline-block px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
      >
        Go back home
      </Link>
    </section>
  );
}

export default NotFound;
