import { useState } from "react";
import useOneUser from "@/Hooks/useOneUser";
import { IoHome, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function DashBoardSideBar() {
  const { userData } = useOneUser();
  console.log(userData);

  // State to track which submenu is open
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    admin: [
      { path: "/dashBoard", icon: <IoHome />, label: "DashBoard Home"},
      {
        path: "/dashBoard/adminProfile",
        icon: <IoHome />,
        label: "My Profile",
        subMenu: [
          { name: "Option 1", path: "/option-1" },
          { name: "Option 2", path: "/option-2" },
        ],
      },
    ],
    instructor: [
      { path: "/dashBoard/instructorProfile", icon: <IoHome />, label: "My Profile" },
    ],
    user: [],
  };

  const roleMenu = menus[userData?.role] || [];

  // Function to toggle submenu
  const toggleSubMenu = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div>
      <ul className="list-none ml-5 text-base-content">
        {roleMenu.length > 0 ? (
          roleMenu.map((item, index) => (
            <li key={index} className="flex flex-col gap-2 mb-3">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleSubMenu(index)}
              >
                {item.icon} 
                <NavLink to={item.path}>{item.label}</NavLink>
                {item.subMenu && (
                  openMenu === index ? <IoChevronUp /> : <IoChevronDown />
                )}
              </div>

              {/* Submenu rendering with toggle */}
              {item.subMenu && openMenu === index && (
                <ul className="ml-6 list-disc text-sm">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.path}>{subItem.name}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li>No menu available</li>
        )}
      </ul>
    </div>
  );
}
