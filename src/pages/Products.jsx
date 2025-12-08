import { useMemo, useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext.jsx";


function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();

  // Derive unique categories from data
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category);
    return ["All", ...Array.from(new Set(cats))];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesSearch =
        searchTerm.trim() === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold text-gray-800">
          Products
        </h1>
        <p className="text-sm text-gray-600">
          Browse daily essentials from your local K-Mart Kirana.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search items (e.g. atta, rice, biscuits)..."
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap rounded-full px-3 py-1 text-xs border ${
                selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">
          No products found. Try a different search term or category.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Products;
