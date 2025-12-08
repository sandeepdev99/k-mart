import { Link } from "react-router-dom";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext.jsx";


function Home() {
  const { addToCart } = useCart();
  return (
    <section className="space-y-6">
      <div className="bg-green-600 rounded-2xl px-6 py-8 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Welcome to K-Mart Kirana
        </h1>
        <p className="mt-2 text-sm sm:text-base text-green-100">
          Daily essentials, fresh stock, and fair prices for your family.
        </p>
        <div className="mt-4">
          <Link
            to="/products"
            className="inline-block px-4 py-2 rounded-lg bg-white text-green-700 text-sm font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Why shop with us?
        </h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3 text-sm text-gray-700">
          <li className="bg-white rounded-xl p-3 shadow-sm">
            ✅ Fresh daily essentials
          </li>
          <li className="bg-white rounded-xl p-3 shadow-sm">
            ✅ Nearby home delivery (coming soon)
          </li>
          <li className="bg-white rounded-xl p-3 shadow-sm">
            ✅ Support your local kirana
          </li>
        </ul>
      </div>

            <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Featured items
          </h2>
          <Link
            to="/products"
            className="text-xs text-green-700 font-medium hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {products
            .filter((p) => p.isFeatured)
            .slice(0, 3)
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => addToCart(product.id)}
              />
            ))}
        </div>
      </div>

    </section>
  );
}

export default Home;
