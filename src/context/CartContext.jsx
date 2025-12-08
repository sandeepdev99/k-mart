import { createContext, useContext, useMemo, useReducer, useEffect } from "react";
import products from "../data/products";


const CartContext = createContext(null);

const initialState = {
  items: [], // { productId, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { productId } = action.payload;
      const existing = state.items.find((item) => item.productId === productId);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { productId, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM": {
      const { productId } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.productId !== productId),
      };
    }

    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // remove if qty goes to 0
        return {
          ...state,
          items: state.items.filter((item) => item.productId !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART": {
      return initialState;
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
  cartReducer,
  initialState,
  (initial) => {
    if (typeof window === "undefined") return initial;

    try {
      const stored = window.localStorage.getItem("kmart-cart");
      if (!stored) return initial;

      const parsed = JSON.parse(stored);
      // Basic validation
      if (!parsed || !Array.isArray(parsed.items)) return initial;
      return { ...initial, items: parsed.items };
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return initial;
    }
  }
);

useEffect(() => {
  try {
    const toStore = JSON.stringify({ items: state.items });
    window.localStorage.setItem("kmart-cart", toStore);
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
}, [state.items]);

  // Join products data with cart items
  const detailedItems = useMemo(() => {
    return state.items
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...item,
          product,
          lineTotal: product.price * item.quantity,
        };
      })
      .filter(Boolean);
  }, [state.items]);

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [detailedItems]
  );

  // Action helpers
  const addToCart = (productId) => {
    dispatch({ type: "ADD_ITEM", payload: { productId } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    items: detailedItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
