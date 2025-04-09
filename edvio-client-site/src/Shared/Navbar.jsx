import { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import "../index.css";
import "../Shared/Pro.css";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (user) {
        const response = await axiosPublic.get(`/cart-item/${user?.email}`);
        return response.data;
      } else {
        return JSON.parse(localStorage.getItem("cart")) || [];
      }
    },
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });

  const cartCount = cartItems.length;

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        queryClient.invalidateQueries(["cart", user?.email]);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener("cartUpdated", () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", () => {
        queryClient.invalidateQueries(["cart", user?.email]);
      });
    };
  }, [user?.email, queryClient]);

  const menuItems = [
    {
      name: "Home",
      link: "/",
      subMenu: [
        { name: "Option 1", path: "/option-1" },
        { name: "Option 2", path: "/option-2" },
      ],
    },
    {
      name: "Courses",
      link: "/courses",
      subMenu: [
        { name: "Category 1", path: "/courses/category-1" },
        { name: "Category 2", path: "/courses/category-2" },
      ],
    },
    {
      name: "Feature",
      link: "/pages",
      subMenu: [
        { name: "Page 1", path: "/pages/page-1" },
        { name: "Page 2", path: "/pages/page-2" },
      ],
    },
    {
      name: "Blogs",
      link: "/blog",
      subMenu: [
        { name: "Blog 1", path: "/blog/blog-1" },
        { name: "Blog 2", path: "/blog/blog-2" },
      ],
    },
    { name: "About Us", link: "/about-us", subMenu: [] },
    { name: "Contact Us", link: "/contact", subMenu: [] },
    ...(user ? [{ name: "Dashboard", link: "/dashboard", subMenu: [] }] : []),
  ];
  return (
    <header className="w-full shadow-md z-50">
      {/* Top bar */}
      <div className="bg-gray-100 py-2 px-4 flex justify-between items-center text-sm">
        <span className="text-gray-700">
          <span className="font-bold text-TealGreen">Our Location:</span> Mirpur
          Rd, Savar, Dhaka, Bangladesh
        </span>
        {user ? (
          <button
            onClick={logOut}
            className="proCardButton hover:bg-TealGreen hover:text-white transition"
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-4 items-center">
            <NavLink
              to="/login"
              className="proCardButton hover:bg-TealGreen hover:text-white transition"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              className="proCardButton hover:bg-TealGreen hover:text-white transition"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>

      {/* Main navbar */}
      <div className="bg-TealGreen py-4 px-6 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-white Logo">EDVIO</h1>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setOpenMenu(index)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-1 text-[18px] transition-colors ${
                    isActive
                      ? "text-yellow-400"
                      : "text-white hover:text-yellow-400"
                  }`
                }
              >
                {item.name}
                {item.subMenu.length > 0 && <IoIosArrowDown />}
              </NavLink>

              <AnimatePresence>
                {openMenu === index && item.subMenu.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full bg-TealGreen text-white shadow-md py-2 w-40 rounded-b-lg"
                  >
                    {item.subMenu.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        className="px-4 py-2 hover:bg-gray-600 rounded-lg transition"
                      >
                        <NavLink
                          to={subItem.path}
                          onClick={() => setOpenMenu(null)}
                          className={({ isActive }) =>
                            isActive
                              ? "text-yellow-400"
                              : "hover:text-yellow-400"
                          }
                        >
                          {subItem.name}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Wishlist */}
          <NavLink to="/wishlist">
            <FaHeart className="text-xl text-white hover:text-yellow-400" />
          </NavLink>

          {/* Cart with real-time updates */}
          <div className="relative">
            <button
              onClick={() => setIsCartDropdownOpen(!isCartDropdownOpen)}
              className="text-white hover:text-yellow-400 relative"
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {isCartDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-10 w-64 bg-white border rounded-lg shadow-lg z-50 p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold">Cart Items</h3>
                    <button
                      onClick={() => handleCartUpdate()}
                      className="text-xs text-TealGreen hover:underline"
                    >
                      Refresh
                    </button>
                  </div>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                  ) : (
                    <ul className="max-h-60 overflow-y-auto text-sm text-gray-700">
                      {cartItems.map((item, index) => (
                        <div
                          key={index}
                          className="mb-2 bg-black rounded-md py-2 text-[#FFD6A7] px-4"
                        >
                          <li>Name: {item.courseName}</li>
                          <li>Price: {item.price}</li>
                          <NavLink
                            to={`/course/${item._id || item.id}`}
                            className="underline"
                            onClick={() => setIsCartDropdownOpen(false)}
                          >
                            Details
                          </NavLink>
                        </div>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white text-2xl"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - keep your existing implementation */}
      {/* ... */}
    </header>
  );
};

export default Navbar;
