import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";


function Navbar() {
   const { totalItems } = useCart();
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo / Shop Name */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold">
            K
          </span>
          <span className="font-semibold text-lg text-gray-800">
            K-Mart Kirana
          </span>
        </Link>

        {/* Right: Links */}
        <div className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "text-gray-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "text-gray-600"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-green-600 font-medium" : "text-gray-600"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              "relative px-3 py-1 rounded-full border flex items-center gap-1 text-sm " +
              (isActive
                ? "border-green-600 text-green-600"
                : "border-gray-300 text-gray-700")
            }
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 rounded-full bg-green-600 text-white text-[10px] font-semibold">
                {totalItems}
              </span>
            )}
          </NavLink>

        </div>
      </nav>
    </header>
  );
}

export default Navbar;
