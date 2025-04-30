import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart on mount or user change
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        if (user?.email) {
          const res = await axiosSecure.get(`/cart-items/${user.email}`);
          setCartItems(res.data?.data || []);
        } else {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCartItems(localCart);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user?.email, axiosSecure]);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      if (user?.email) {
        const exists = cartItems.some((i) => i.courseId === item.courseId);
        if (exists) {
          toast.info("This course is already in your cart");
          return;
        }

        const response = await axiosSecure.post("/add-cart", {
          ...item,
          student_email: user.email,
        });
        setCartItems((prev) => [...prev, item]);
        toast.success("Added to cart!");
      } else {
        const updatedCart = [...cartItems, item];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        toast.success("Added to local cart! Login to save permanently.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart");
    }
  };

  // Remove item from cart
  const removeFromCart = async (courseId) => {
    try {
      if (user?.email) {
        await axiosSecure.delete(`/cart-item/${user.email}/${courseId}`);
        setCartItems((prev) => prev.filter((item) => item._id !== courseId));
      } else {
        const updatedCart = cartItems.filter((item) => item.courseId !== courseId);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
      toast.success("Removed from cart");
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove from cart");
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      if (user?.email) {
        await axiosSecure.delete(`/clear-cart/${user.email}`);
      }
      localStorage.removeItem("cart");
      setCartItems([]);
      toast.success("Cart cleared");
    } catch (err) {
      console.error("Error clearing cart:", err);
      toast.error("Failed to clear cart");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};