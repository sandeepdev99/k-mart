import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <section className="text-center space-y-3">
        <h1 className="text-xl font-semibold text-gray-800">Your Cart</h1>
        <p className="text-sm text-gray-600">
          Your cart is empty. Start adding items from the products page.
        </p>
        <Link
          to="/products"
          className="inline-block px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
        >
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Your Cart</h1>
          <p className="text-sm text-gray-600">
            {totalItems} item{totalItems > 1 ? "s" : ""} in your cart.
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-red-500 hover:underline"
        >
          Clear cart
        </button>
      </header>

      {/* Items list */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="bg-white rounded-xl border border-gray-200 p-3 flex gap-3"
          >
            {/* Image */}
            <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info + controls */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {item.product.name}
                </h2>
                <p className="text-[11px] text-gray-500">
                  {item.product.unit} • ₹{item.product.price} each
                </p>
              </div>

              <div className="mt-2 flex items-center justify-between">
                {/* Quantity controls */}
                <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity - 1
                      )
                    }
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
                  >
                    -
                  </button>
                  <span className="min-w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity + 1
                      )
                    }
                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-700"
                  >
                    +
                  </button>
                </div>

                {/* Line total + remove */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    ₹{item.lineTotal}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[11px] text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary + Checkout button */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Items total</span>
          <span className="font-semibold text-gray-800">
            ₹{totalPrice}
          </span>
        </div>
        {/* Later you can add delivery charge, discounts etc. */}

        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <Link
            to="/products"
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 py-2"
          >
            Add more items
          </Link>
          <Link
            to="/checkout"
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-green-600 text-white text-sm py-2"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
