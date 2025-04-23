import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import useAxiosPublic from "./useAxiosPublic";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, setTotalPrice } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [cartItems, setCartItems] = useState([]);


  // Fetch cart on mount or user change
  useEffect(() => {
    const fetchCart = async () => {
      if (user?.email) {
        try {
          const res = await axiosPublic.get(`/cart-item/${user.email}`);
          setCartItems(res.data || []);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(localCart);
      }
    };
    fetchCart();
  }, [user, axiosPublic]);

  // Add item to cart
  const addToCart = async (item) => {
    const exists = cartItems.some((i) => i.courseId === item.courseId);
    if (exists) {
      toast.info("This course is already in your cart.");
      return;
    }
    try {
      if (user?.email) {
        await axiosPublic.post("/add-cart", {
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
      toast.error("Failed to add to cart.");
      console.error(err);
    }
  };

  // Remove item
  const removeFromCart = async (courseId) => {
    try {
      if (user?.email) {
        await axiosPublic.delete(`/cart-item/${user.email}/${courseId}`);
        setCartItems((prev) =>
          prev.filter((item) => item.courseId !== courseId)
        );
      } else {
        const updatedCart = cartItems.filter(
          (item) => item.courseId !== courseId
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
      toast.success("Removed from cart");
    } catch (err) {
      toast.error("Failed to remove from cart");
      console.error(err);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    if (user?.email) {
      // Implement this on your backend if needed
      toast.info("Clear server-side cart not implemented");
    } else {
      localStorage.removeItem("cart");
    }
    setCartItems([]);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  setTotalPrice(totalPrice);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
