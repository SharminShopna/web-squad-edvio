import { useState } from "react";
import useOneUser from "@/Hooks/useOneUser";
import { NavLink } from "react-router-dom";
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
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { IoIosApps } from "react-icons/io";

export default function DashBoardSideBar() {
  const { userData } = useOneUser();
  console.log(userData);

  // State to track which submenu is open
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    admin: [
      { path: "/dashboard", icon: <IoHome />, label: "Dashboard Home" },
      {
        path: "#",
        icon: <IoIosApps />,
        label: "Apps",
        subMenu: [
          { name: "My Profile", path: "/dashboard/Profile" },
          { name: "Edit Profile", path: "/dashboard/edit-profile" },
        ],
      },
    ],
    instructor: [
      { path: "/", icon: <IoHome />, label: "Home" },
      {
        path: "/dashboard/instructor/Profile",
        icon: <IoPerson />,
        label: "My Profile",
      },
      {
        path: "/dashboard/instructor/add-course",
        icon: <IoAddCircle />,
        label: "Add Course",
      },
      {
        path: "/dashboard/instructor/my-courses",
        icon: <IoLibrary />,
        label: "My Courses",
      },
      {
        path: "/dashboard/instructor/students",
        icon: <IoPeople />,
        label: "My Students",
      },
      {
        path: "/dashboard/instructor/assignments",
        icon: <IoDocumentText />,
        label: "Assignments",
      },
      {
        path: "/dashboard/instructor/schedule",
        icon: <IoCalendar />,
        label: "Teaching Schedule",
      },
      {
        path: "/dashboard/instructor/analytics",
        icon: <IoStatsChart />,
        label: "Course Analytics",
      },
      {
        path: "/dashboard/instructor/reviews",
        icon: <IoChatbubbleEllipses />,
        label: "Student Feedback",
      },
      {
        path: "/dashboard/instructor/resources",
        icon: <IoBook />,
        label: "Resources",
      },
      {
        path: "/dashboard/instructor/earnings",
        icon: <IoCard />,
        label: "Earnings",
      },
      {
        path: "/dashboard/instructor/settings",
        icon: <IoSettings />,
        label: "Settings",
      },
      { path: "/logout", icon: <IoLogOut />, label: "Logout" },
    ],
    user: [],
  };

  const roleMenu = menus[userData?.role] || [];

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
                {item.path !== "#" ? (
                  <NavLink to={item.path} className="text-lg font-medium">
                    {item.label}
                  </NavLink>
                ) : (
                  <span className="text-lg font-medium">{item.label}</span>
                )}
                {item.subMenu &&
                  (openMenu === index ? <IoChevronUp /> : <IoChevronDown />)}
              </div>

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
