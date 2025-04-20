import { useContext, useState } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import "../index.css";
import "../Shared/Pro.css";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  // TanStack Query for cart items
  const { data: cartItems = [], refetch } = useQuery({
    queryKey: ["cartItems", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/cart-item/${user?.email}`);
      return res.data;
    },
    refetchInterval: 1000, // Refetch every second for real-time updates
    enabled: !!user?.email, // Only fetch if user is logged in
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleCartDropdown = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleMenuClick = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

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
      {/* Location and SignUp/SignOut */}
      <div className="text-sm py-2 px-4 flex justify-between items-center">
        <span>
          <span className="font-bold text-TealGreen">Our Location:</span> Mirpur
          Rd, Savar, Dhaka, Bangladesh
        </span>
        {user ? (
          <button className="proCardButton" onClick={logOut}>
            Log Out
          </button>
        ) : (
          <div className="flex gap-4 items-center mt-3 md:mt-0">
            <NavLink to="/login" className="proCardButton">
              Sign In
            </NavLink>
            <NavLink to="/register" className="proCardButton">
              Sign Up
            </NavLink>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center py-4 px-6 bg-TealGreen">
        <h1 className="text-2xl font-bold text-white Logo">EDVIO</h1>

        {/* Navigation Menu */}
        <nav className="py-3 px-6 flex justify-between items-center z-50">
          <ul className="hidden md:flex gap-6">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenMenu(index)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <NavLink
                  to={item.link}
                  className="flex items-center text-white cursor-pointer gap-1 text-[18px] hover:text-yellow-400 transition-colors"
                  onClick={() => handleMenuClick(index)}
                >
                  {item.name} {item.subMenu.length > 0 && <IoIosArrowDown />}
                </NavLink>
                <AnimatePresence>
                  {openMenu === index && item.subMenu.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -left-12 top-[55px] bg-TealGreen text-white shadow-md py-2 w-40"
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 mx-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                        >
                          <NavLink
                            to={subItem.path}
                            onClick={() => setOpenMenu(null)}
                          >
                            {subItem.name}
                          </NavLink>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden absolute top-36 left-0 w-full bg-TealGreen text-white z-50"
              >
                <ul className="flex flex-col gap-4 p-4">
                  {menuItems.map((item, index) => (
                    <li key={index} className="relative">
                      <NavLink
                        to={item.link}
                        className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-colors"
                        onClick={() => handleMenuClick(index)}
                      >
                        {item.name}{" "}
                        {item.subMenu.length > 0 && <IoIosArrowDown />}
                      </NavLink>
                      <AnimatePresence>
                        {openMenu === index && item.subMenu.length > 0 && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 mt-2 bg-LightTeal text-black rounded-lg"
                          >
                            {item.subMenu.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="px-4 py-2 cursor-pointer hover:text-white rounded-lg hover:bg-gray-600"
                              >
                                <NavLink
                                  to={subItem.path}
                                  onClick={() => setOpenMenu(null)}
                                >
                                  {subItem.name}
                                </NavLink>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <FaHeart className="text-xl text-white cursor-pointer hover:text-yellow-400" />

          {/* Cart with Dropdown */}
          <div className="relative">
            <div
              className="relative cursor-pointer text-white hover:text-yellow-400"
              onClick={toggleCartDropdown}
            >
              <FaShoppingCart className="text-xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
                  {cartItems.length}
                </span>
              )}
            </div>

            {/* Cart Dropdown */}
            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-10 w-64 bg-white shadow-lg rounded-md p-4 z-50"
                >
                  {cartItems.length > 0 ? (
                    <div>
                      <h3 className="font-bold text-TealGreen mb-2">
                        Your Cart Items
                      </h3>
                      <ul className="max-h-60 overflow-y-auto">
                        {cartItems.map((item, index) => (
                          <li
                            key={index}
                            className="py-2 border-b border-gray-200 text-black"
                          >
                            {item.courseName || "Course Name"}
                          </li>
                        ))}
                      </ul>
                      <NavLink
                        to="/cart"
                        className="block mt-2 text-center proCardButton"
                        onClick={() => setIsCartOpen(false)}
                      >
                        View Cart
                      </NavLink>
                    </div>
                  ) : (
                    <p className="text-gray-600">Your cart is empty</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
