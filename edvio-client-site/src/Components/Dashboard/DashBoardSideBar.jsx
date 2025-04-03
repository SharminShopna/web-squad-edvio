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

export default function DashBoardSideBar() {
  const { userData } = useOneUser();
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    admin: [
      { path: "/dashBoard", icon: <IoHome />, label: "Dashboard Home" },
      {
        path: "/dashBoard/adminProfile",
        icon: <IoPerson />,
        label: "My Profile",
        subMenu: [
          { name: "Option 1", path: "/dashBoard/adminProfile/option-1" },
          { name: "Option 2", path: "/dashBoard/adminProfile/option-2" },
        ],
      },
    ],
    instructor: [
      { path: "/", icon: <IoHome />, label: "Home" },
      { path: "/dashBoard/instructorProfile", icon: <IoPerson />, label: "My Profile" },
      { path: "/dashBoard/instructor/add-course", icon: <IoAddCircle />, label: "Add Course" },
      { path: "/dashBoard/instructor/my-courses", icon: <IoLibrary />, label: "My Courses" },
      { path: "/dashBoard/instructor/students", icon: <IoPeople />, label: "My Students" },
      { path: "/dashBoard/instructor/assignments", icon: <IoDocumentText />, label: "Assignments" },
      { path: "/dashBoard/instructor/schedule", icon: <IoCalendar />, label: "Teaching Schedule" },
      { path: "/dashBoard/instructor/analytics", icon: <IoStatsChart />, label: "Course Analytics" },
      { path: "/dashBoard/instructor/reviews", icon: <IoChatbubbleEllipses />, label: "Student Feedback" },
      { path: "/dashBoard/instructor/resources", icon: <IoBook />, label: "Resources" },
      { path: "/dashBoard/instructor/earnings", icon: <IoCard />, label: "Earnings" },
      { path: "/dashBoard/instructor/settings", icon: <IoSettings />, label: "Settings" },
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
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleSubMenu(index)}>
                {item.icon} 
                <NavLink to={item.path} className="hover:text-primary transition duration-200">{item.label}</NavLink>
                {item.subMenu && (openMenu === index ? <IoChevronUp /> : <IoChevronDown />)}
              </div>
              {item.subMenu && openMenu === index && (
                <ul className="ml-6 list-disc text-sm">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.path} className="hover:text-secondary transition duration-200">
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