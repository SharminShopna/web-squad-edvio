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