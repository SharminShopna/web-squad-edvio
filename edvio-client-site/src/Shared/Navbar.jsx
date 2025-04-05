import { useContext, useState, useEffect } from "react";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import "../index.css";
import "../Shared/Pro.css";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (user) {
          const response = await axios.get(
            "/api/cart"
            //   , {
            //   headers: {
            //     Authorization: `Bearer ${user.token}`,
            //   },
            // }
          );
          setCartItems(response.data);
          setCartCount(response.data.length);
        } else {
          const localCart = JSON.parse(localStorage.getItem("cart")) || [];
          setCartItems(localCart);
          setCartCount(localCart.length);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCartData();

    const handleCartUpdate = () => {
      fetchCartData();
      toast.success("Cart updated!", {
        position: "top-right",
        autoClose: 2000,
      });
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  const toggleCartDropdown = () => {
    setIsCartDropdownOpen(!isCartDropdownOpen);
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
      <div className="text-sm py-2 px-4 flex justify-between items-center bg-gray-100">
        <span className="text-gray-700">
          <span className="font-bold text-TealGreen">Our Location:</span> Mirpur
          Rd, Savar, Dhaka, Bangladesh
        </span>

        {user ? (
          <button
            onClick={logOut}
            className="proCardButton hover:bg-TealGreen hover:text-white transition-colors"
          >
            Log Out
          </button>
        ) : (
          <div className="flex gap-4 items-center">
            <NavLink
              to="/login"
              className="proCardButton hover:bg-TealGreen hover:text-white transition-colors"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              className="proCardButton hover:bg-TealGreen hover:text-white transition-colors"
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center py-4 px-6 bg-TealGreen relative">
        <h1 className="text-2xl font-bold text-white Logo">EDVIO</h1>

        {/* Navigation */}
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
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-[18px] transition-colors ${
                      isActive
                        ? "text-yellow-400"
                        : "text-white hover:text-yellow-400"
                    }`
                  }
                  onClick={() => handleMenuClick(index)}
                >
                  {item.name}
                  {item.subMenu.length > 0 && (
                    <IoIosArrowDown className="ml-1" />
                  )}
                </NavLink>

                <AnimatePresence>
                  {openMenu === index && item.subMenu.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -left-12 top-[55px] bg-TealGreen text-white shadow-md py-2 w-40 rounded-b-lg"
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 mx-2 rounded-lg hover:bg-gray-600 cursor-pointer transition-colors"
                        >
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              isActive
                                ? "text-yellow-400"
                                : "hover:text-yellow-400"
                            }
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

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-36 left-0 w-full bg-TealGreen text-white z-50 shadow-lg"
              >
                <ul className="flex flex-col gap-4 p-4">
                  {menuItems.map((item, index) => (
                    <li key={index} className="relative">
                      <NavLink
                        to={item.link}
                        className={({ isActive }) =>
                          `flex items-center gap-1 ${
                            isActive
                              ? "text-yellow-400"
                              : "hover:text-yellow-400"
                          }`
                        }
                        onClick={() => handleMenuClick(index)}
                      >
                        {item.name}
                        {item.subMenu.length > 0 && (
                          <IoIosArrowDown className="ml-1" />
                        )}
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
                                className="px-4 py-2 cursor-pointer hover:text-white rounded-lg hover:bg-gray-600 transition-colors"
                              >
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    isActive
                                      ? "text-yellow-600 font-medium"
                                      : ""
                                  }
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

        {/* Icons Section */}
        <div className="flex items-center gap-6 relative">
          {/* Wishlist */}
          <NavLink to="/wishlist">
            <FaHeart className="text-xl text-white cursor-pointer hover:text-yellow-400 transition-colors" />
          </NavLink>

          {/* Cart */}
          <div className="relative">
            <button
              className="text-white hover:text-yellow-400 transition-colors relative"
              onClick={toggleCartDropdown}
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            <AnimatePresence>
              {isCartDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-10 w-64 bg-white border rounded-lg shadow-lg z-50 p-4"
                >
                  <h3 className="text-sm font-semibold mb-2">Cart Items</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-sm">Your cart is empty.</p>
                  ) : (
                    <ul className="max-h-60 overflow-y-auto text-sm text-gray-700">
                      {cartItems.map((item, index) => (
                        <div className="mb-2 bg-black rounded-md py-2 text-[#FFD6A7] px-4">
                          <li key={index} className=" pb-1">
                            Name: {item.courseName}
                          </li>
                          <li key={index} className=" pb-1">
                            price: {item.price}
                          </li>
                          <NavLink className={""}>Details</NavLink>
                        </div>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white cursor-pointer hover:text-yellow-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
