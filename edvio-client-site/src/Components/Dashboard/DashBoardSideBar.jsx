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
import { LuUser } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import { GrAppsRounded } from "react-icons/gr";
import { LuBookPlus } from "react-icons/lu";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
export default function DashBoardSideBar() {
  const { userData } = useOneUser();

  // State to track which submenu is open
  const [openMenu, setOpenMenu] = useState(null);

  const menus = {
    admin: [
      { path: "/dashboard", icon: <IoHomeOutline />, label: "Dashboard Home" },
      {
        path: "#",
        icon: <GrAppsRounded />,
        label: "Apps",
        subMenu: [
          { name: "My Profile", path: "/dashboard/Profile" },
          { name: "Edit Profile", path: "/dashboard/edit-profile" },
        ],
      },
      { path: "#", icon: <LuUser />, label: "Instructor" ,
        subMenu: [
          { name: "All Instructor", path: "/dashboard/all-instructor" },
          { name: "Add Instructor", path: "/dashboard/add-instructor" },
          { name: "Edit Instructor", path: "/dashboard/edit-instructor" },
          { name: "About Instructor", path: "/dashboard/about-instructor" },
        ],
      },
      { path: "#", icon: <FiUsers />, label: "Students",
        subMenu: [
          { name: "All Student", path: "/dashboard/all-student" },
          { name: "Add Student", path: "/dashboard/add-student" },
          { name: "Edit Student", path: "/dashboard/edit-student" },
          { name: "About Student", path: "/dashboard/about-student" },
        ],
       },
      { path: "#", icon: <LuBookPlus />, label: "Course",
        subMenu: [
          { name: "All Course", path: "/dashboard/all-course" },
          { name: "Add Course", path: "/dashboard/add-course" },
          { name: "Edit Course", path: "/dashboard/edit-course" },
          { name: "About Course", path: "/dashboard/about-course" },
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
    user: [
        { path: "/", 
          icon: <IoHome />, 
          label: "Home" 
        },
        {
          path: "/dashboard",
          icon: <IoHome />,
          label: "User Home",
        },
        {
          path: "/dashboard/myCourse",
          icon: <IoLibrary />,
          label: "My Courses",
        },
        {
          path: "/dashboard/paymentHistory",
          icon: <IoCard />,
          label: "Payment History",
        },
        {
          path: "/dashboard/browseCourse",
          icon: <IoBook />,
          label: "Browse Courses",
        },
        {
          path: "/dashboard/aiChatbot",
          icon: <HiOutlineChatBubbleLeftRight />,
          label: "AI Chatbot",
        },
        {
          path: "/dashboard/feedback",
          icon: <IoChatbubbleEllipses />,
          label: "Feedback",
        },
        {
          path: "/dashboard/settings",
          icon: <IoSettings />,
          label: "Account Settings",
        },
    ],
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
            <li key={index} className="flex flex-col gap-2 mb-5">
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
