import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Checkout() {
  const { items, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    paymentMethod: "Cash on delivery",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  // If cart is empty, redirect user back to products/cart
  if (items.length === 0 && !isSubmitted) {
    return (
      <section className="text-center space-y-3">
        <h1 className="text-xl font-semibold text-gray-800">
          Checkout
        </h1>
        <p className="text-sm text-gray-600">
          Your cart is empty. Add some items before checking out.
        </p>
        <div className="flex gap-2 justify-center">
          <Link
            to="/products"
            className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm"
          >
            Browse Products
          </Link>
          <Link
            to="/cart"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm"
          >
            Go to Cart
          </Link>
        </div>
      </section>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (form.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    }

    return newErrors;
  };

  const orderSummaryText = useMemo(() => {
    if (items.length === 0) return "";

    let lines = [];
    lines.push("New order from K-Mart Kirana website:");
    lines.push("");
    lines.push(`Customer: ${form.name || "-"}`);
    lines.push(`Phone: ${form.phone || "-"}`);
    lines.push(`Address: ${form.address || "-"}`);
    if (form.landmark) {
      lines.push(`Landmark: ${form.landmark}`);
    }
    lines.push(`Payment: ${form.paymentMethod}`);
    lines.push("");
    lines.push("Items:");

    items.forEach((item, index) => {
      lines.push(
        `${index + 1}. ${item.quantity} x ${item.product.name} (${item.product.unit}) - ₹${item.product.price} each = ₹${item.lineTotal}`
      );
    });

    lines.push("");
    lines.push(`Total items: ${totalItems}`);
    lines.push(`Total amount: ₹${totalPrice}`);
    lines.push("");
    lines.push("Please confirm if this order is accepted. Thank you!");

    return lines.join("\n");
  }, [items, totalItems, totalPrice, form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Replace this with YOUR WhatsApp number (without +, with country code)
    const shopWhatsAppNumber = "917411603748"; // e.g. 919812345678

    const encodedText = encodeURIComponent(orderSummaryText);
    const url = `https://wa.me/${shopWhatsAppNumber}?text=${encodedText}`;

    setWhatsAppUrl(url);
    setIsSubmitted(true);
  };

  if (isSubmitted && whatsAppUrl) {
    return (
      <section className="space-y-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Order Summary
        </h1>
        <p className="text-sm text-gray-600">
          Your order details are ready. Click the button below to send your
          order on WhatsApp to the shop.
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3 text-sm">
          <div>
            <h2 className="font-semibold text-gray-800 mb-1">
              Customer details
            </h2>
            <p>Name: {form.name}</p>
            <p>Phone: {form.phone}</p>
            <p>Address: {form.address}</p>
            {form.landmark && <p>Landmark: {form.landmark}</p>}
            <p>Payment: {form.paymentMethod}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 mb-1">
              Items
            </h2>
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.product.id}>
                  {item.quantity} x {item.product.name} ({item.product.unit}) – ₹
                  {item.lineTotal}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200">
            <span className="text-gray-600">Total:</span>
            <span className="text-lg font-semibold text-gray-900">
              ₹{totalPrice}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center rounded-lg bg-green-600 text-white text-sm py-2"
          >
            Send order on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex-1 inline-flex items-center justify-center rounded-lg border border-gray-300 text-gray-700 text-sm py-2"
          >
            Back to Home
          </button>
        </div>

        <p className="text-[11px] text-gray-500">
          Note: This website does not place automatic orders. Your order will be
          sent to the shop via WhatsApp, and they will confirm it with you.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold text-gray-800">
          Checkout
        </h1>
        <p className="text-sm text-gray-600">
          Please fill in your details. Your order will be sent to the shop on
          WhatsApp.
        </p>
      </header>

      {/* Summary headline */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 text-sm flex items-center justify-between">
        <span>
          Items: <strong>{totalItems}</strong>
        </span>
        <span>
          Total:{" "}
          <strong className="text-gray-900">
            ₹{totalPrice}
          </strong>
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Phone number (WhatsApp preferred) *
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.phone && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Payment method
            </label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            >
              <option value="Cash on delivery">Cash on delivery</option>
              <option value="UPI on delivery">UPI on delivery</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full address *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.address && (
              <p className="text-[11px] text-red-500 mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Landmark / Nearby (optional)
            </label>
            <input
              type="text"
              name="landmark"
              value={form.landmark}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center rounded-lg bg-green-600 text-white text-sm py-2 mt-2"
        >
          Review & send order on WhatsApp
        </button>
      </form>
    </section>
  );
}

export default Checkout;
