import { useCart } from "@/Hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

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
    selectedItems.includes(item.courseId)
  );

  const selectedTotal = selectedCourses.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );
  

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 text-TealGreen">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-300 text-xl">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 border-1 p-5 rounded-lg">
            {cartItems.map((item) => (
              <div
                key={item.courseId}
                className="bg-neutral border p-4 rounded-lg flex items-center"
              >
                <input
                  type="checkbox"
                  checked={isSelected(item.courseId)}
                  onChange={() => toggleSelect(item.courseId)}
                  className="mr-4 w-5 h-5 accent-TealGreen"
                />
                <img
                  src={item.image}
                  alt={item.courseName}
                  className="w-24 h-24 rounded-lg mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.courseName}</h2>
                  <p>
                    {item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.courseId)}
                  className="text-red-400 hover:text-red-600"
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
              <Link to='/payment'>
              <button className="mt-4 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full">
                Proceed to Checkout ({selectedItems.length} item
                {selectedItems.length > 1 && "s"})
              </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
