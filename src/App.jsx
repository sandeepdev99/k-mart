// import { useState } from 'react'


// function App() {
//   return (
//     <>
//       <div className="text-center p-6">
//       <h1 className="text-3xl font-bold text-green-600">
//         Kirana Shop Website
//       </h1>
//       <p className="text-gray-600 mt-2">
//         React + Vite + Tailwind Setup Complete 🎉
//       </p>
//     </div>
//     </>
//   )
// }

// export default App


import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* index = default route for "/" */}
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="about" element={<About />} />
        {/* Catch-all for unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

