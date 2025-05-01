import { useCart } from "@/Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, loading, clearCart } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (courseId) => {
    setSelectedItems((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const isSelected = (courseId) => selectedItems.includes(courseId);

  const selectedCourses = cartItems.filter((item) =>
    selectedItems.includes(item._id)
  );

  const selectedTotal = selectedCourses.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 text-white">
        <h1 className="text-3xl font-bold mb-6 text-TealGreen">🛒 Your Cart</h1>
        <p className="text-gray-300">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-TealGreen">🛒 Your Cart</h1>
        {cartItems.length > 0 && (
          <button
          onClick={clearCart}
          className="text-red-400 hover:text-red-600 text-sm"
        >
          Clear Cart
        </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-300 text-xl mb-4">Your cart is empty.</p>
          <Link
            to="/courses"
            className="px-4 py-2 bg-TealGreen hover:bg-TealGreen-dark rounded-md"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 border-1 p-5 rounded-lg">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-neutral border p-4 rounded-lg flex items-center"
              >
                <input
                  type="checkbox"
                  checked={isSelected(item._id)}
                  onChange={() => toggleSelect(item._id)}
                  className="mr-4 w-5 h-5 accent-TealGreen"
                />
                <img
                  src={item.image}
                  alt={item.courseName}
                  className="w-24 h-24 rounded-lg mr-4 object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.courseName}</h2>
                  <p className="text-golden2">
                    {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 hover:text-red-600 p-2"
                  aria-label="Remove item"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>

          {selectedItems.length > 0 && (
            <div className="mt-8 text-right">
              <p className="text-xl font-bold">
                Selected Total:{" "}
                <span className="text-golden2">
                  {selectedTotal === 0 ? "Free" : `$${selectedTotal.toFixed(2)}`}
                </span>
              </p>
              <Link
                to="/payment"
                state={{ selectedCourses }}
                className="mt-4 inline-block px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full"
              >
                Proceed to Checkout ({selectedItems.length} item
                {selectedItems.length > 1 && "s"})
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;