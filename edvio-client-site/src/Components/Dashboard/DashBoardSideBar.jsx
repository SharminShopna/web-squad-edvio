<<<<<<< HEAD
import { useState } from "react";
import useOneUser from "@/Hooks/useOneUser";
import { IoHome, IoChevronDown, IoChevronUp } from "react-icons/io5";
=======
import useOneUser from "@/Hooks/useOneUser";
import {
  IoHome,
  IoPerson,
  IoAddCircle,
  IoLibrary,
  IoChatbubbleEllipses,
  IoLogOut,
  IoPeople,
  IoStatsChart,
  IoCalendar,
  IoDocumentText,
  IoSettings,
  IoCard,
  IoBook,
} from "react-icons/io5";
>>>>>>> 9bf21b6ec0e1b09bebfc3fa3c84a8e1577e30034
import { NavLink } from "react-router-dom";

export default function DashBoardSideBar() {
  const { userData } = useOneUser();
<<<<<<< HEAD
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
=======

  const menus = {
    admin: [
      {
        path: "/dashBoard/adminProfile",
        icon: <IoPerson />,
        label: "My Profile",
      },
    ],
    instructor: [
      { path: "/", icon: <IoHome />, label: "Home" },
      {
        path: "/dashBoard/instructorProfile",
        icon: <IoPerson />,
        label: "My Profile",
      },
      {
        path: "/dashBoard/instructor/add-course",
        icon: <IoAddCircle />,
        label: "Add Course",
      },
      {
        path: "/dashBoard/instructor/my-courses",
        icon: <IoLibrary />,
        label: "My Courses",
      },
      {
        path: "/dashBoard/instructor/students",
        icon: <IoPeople />,
        label: "My Students",
      },
      {
        path: "/dashBoard/instructor/assignments",
        icon: <IoDocumentText />,
        label: "Assignments",
      },
      {
        path: "/dashBoard/instructor/schedule",
        icon: <IoCalendar />,
        label: "Teaching Schedule",
      },
      {
        path: "/dashBoard/instructor/analytics",
        icon: <IoStatsChart />,
        label: "Course Analytics",
      },
      {
        path: "/dashBoard/instructor/reviews",
        icon: <IoChatbubbleEllipses />,
        label: "Student Feedback",
      },
      {
        path: "/dashBoard/instructor/resources",
        icon: <IoBook />,
        label: "Resources",
      },
      {
        path: "/dashBoard/instructor/earnings",
        icon: <IoCard />,
        label: "Earnings",
      },
      {
        path: "/dashBoard/instructor/settings",
        icon: <IoSettings />,
        label: "Settings",
      },
      { path: "/logout", icon: <IoLogOut />, label: "Logout" },
>>>>>>> 9bf21b6ec0e1b09bebfc3fa3c84a8e1577e30034
    ],
    user: [],
  };

  const roleMenu = menus[userData?.role] || [];
<<<<<<< HEAD

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
=======

  return (
    <div className="p-4 mb-7">
      <ul>
        {roleMenu.length > 0 ? (
          roleMenu.map((item, index) => (
            <li
              className="flex mb-3 items-center gap-2 hover:bg-yellow-800 p-2 rounded-lg"
              key={index}
            >
              <span className="text-lg text-white">{item.icon}</span>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-yellow-600 hover:text-white"
                    : "text-white hover:text-white"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No menu available</li>
>>>>>>> 9bf21b6ec0e1b09bebfc3fa3c84a8e1577e30034
        )}
      </ul>
    </div>
  );
}
