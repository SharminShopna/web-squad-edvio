import { useState } from "react";
import useOneUser from "@/Hooks/useOneUser";
import { IoHome, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoIosApps } from "react-icons/io";

export default function DashBoardSideBar() {
  const { userData } = useOneUser();
  console.log(userData);

  // State to track which submenu is open
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    admin: [
      { path: "/dashBoard", icon: <IoHome />, label: "DashBoard Home"},
      {
        
        icon: <IoIosApps />,
        label: "Apps",
        subMenu: [
          { name: "My Profile", path: "/dashBoard/adminProfile" },
          { name: "Edit Profile", path: "/dashBoard/edit-profile" },
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
                <span className="text-xl">{item.icon}</span> 
                <NavLink to={item.path} className='text-lg font-medium'>{item.label}</NavLink>
                {item.subMenu && (
                  openMenu === index ? <IoChevronUp /> : <IoChevronDown />
                )}
              </div>

              {/* Submenu rendering with toggle */}
              {item.subMenu && openMenu === index && (
                <ul className="ml-6 text-sm">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex} className="mt-2">
                      <NavLink 
                      to={subItem.path} 
                      className="text-base group flex items-center gap-2 transition duration-300 hover:text-Aquamarine"
                      >
                    <span className="h-[2px] w-5 inline-block bg-Aquamarine transition-all duration-300 group-hover:w-8"></span>
                   {subItem.name}
                   </NavLink>

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
