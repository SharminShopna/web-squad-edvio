import { useState } from "react";
import "../index.css";
import { FaShoppingCart, FaHeart, FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink } from "react-router-dom";

// Navbar menu items
const menuItems = [
  { name: "Home", link: "/", subMenu: ["Option 1", "Option 2"] },
  { name: "Courses", link: "/courses", subMenu: ["Category 1", "Category 2"] },
  { name: "Feture", link: "/pages", subMenu: ["Page 1", "Page 2"] },
  { name: "Blogs", link: "/blog", subMenu: ["Blog 1", "Blog 2"] },
  { name: "About Us", link: "/about", subMenu: [] },
  { name: "Contact Us", link: "/contact", subMenu: [] },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null); // Track which dropdown is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Track mobile menu

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle dropdown menu on click
  const handleMenuClick = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <header className="w-full shadow-md  z-50">
      {/* Top Bar */}
      <div className="text-sm py-2 px-4 md:flex justify-between items-center">
        <span>
          Course Location: Johor, Johor Bahru, Desa Cemerlang 8100, Malaysia
        </span>
        <div className="flex gap-4 items-center mt-3 md:mt-0">
          <NavLink
            to={"/login"}
            className=" cursor-pointer hover:bg-blue-500 bg-TealGreen text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Sign In
          </NavLink>
          <NavLink
            to={"/register"}
            className="bg-TealGreen cursor-pointer hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Sign Up
          </NavLink>
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center py-4 px-6 bg-TealGreen">
        <h1 className="text-2xl font-bold text-white">Course BD</h1>

        {/* Navigation Menu */}
        <nav className="py-3 px-6 flex justify-between items-center  z-50">
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-6">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => setOpenMenu(index)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className="flex items-center text-white cursor-pointer gap-1 text-[18px] hover:text-yellow-400 transition-colors"
                  onClick={() => handleMenuClick(index)}
                >
                  {item.name} {item.subMenu.length > 0 && <IoIosArrowDown />}
                </button>
                <AnimatePresence>
                  {openMenu === index && item.subMenu.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute -left-12 top-[55px] bg-TealGreen text-white shadow-md py-2 w-40 "
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="px-4 py-2 mx-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                        >
                          <Link
                            to={`${item.link}/${subItem
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                            onClick={() => setOpenMenu(null)}
                          >
                            {subItem}
                          </Link>
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
                    <li key={index} className="relative ">
                      <button
                        className="flex items-center gap-1 cursor-pointer hover:text-yellow-400 transition-colors"
                        onClick={() => handleMenuClick(index)}
                      >
                        {item.name}{" "}
                        {item.subMenu.length > 0 && <IoIosArrowDown />}
                      </button>
                      <AnimatePresence>
                        {openMenu === index && item.subMenu.length > 0 && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 mt-2 bg-LightTeal text-black   rounded-lg"
                          >
                            {item.subMenu.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                className="px-4 py-2 cursor-pointer  hover:text-white  rounded-lg hover:bg-gray-600"
                              >
                                <Link
                                  to={`${item.link}/${subItem
                                    .toLowerCase()
                                    .replace(/ /g, "-")}`}
                                  onClick={() => setOpenMenu(null)}
                                >
                                  {subItem}
                                </Link>
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

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <FaHeart className="text-xl text-white  cursor-pointer hover:text-yellow-400" />
          <div className="relative cursor-pointer text-white hover:text-yellow-400">
            <FaShoppingCart className="text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded">
              0
            </span>
          </div>

          {/* Mobile Menu Toggle */}
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
