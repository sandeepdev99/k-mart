function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="h-32 w-full overflow-hidden rounded-t-2xl bg-gray-100 flex items-center justify-center">
        {/* For now we use imageUrl; later you can switch to local images in /assets */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-3 gap-1">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-base font-bold text-green-700">
            ₹{product.price}
          </span>
          {product.mrp && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.mrp}
            </span>
          )}
          <span className="text-xs text-gray-500">/ {product.unit}</span>
        </div>

        <p className="text-[11px] text-gray-500 mt-1">
          Category: {product.category}
        </p>

        <div className="mt-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="w-full inline-flex items-center justify-center rounded-xl bg-green-600 text-white text-xs font-medium py-2 hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
