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
import { NavLink } from "react-router-dom";

export default function DashBoardSideBar() {
  const { userData } = useOneUser();

  const menus = {
    admin: [
      {
        path: "/dashBoard/adminProfile",
        icon: <IoPerson />,
        label: "My Profile",
      },
    ],
    instructor: [
      {
        path: "/",
        icon: <IoHome />,
        label: "Home",
      },
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
      {
        path: "/logout",
        icon: <IoLogOut />,
        label: "Logout",
      },
    ],
    user: [],
  };

  const roleMenu = menus[userData?.role] || [];

  return (
    <div className="p-4 mb-7">
      <ul>
        {roleMenu.length > 0 ? (
          roleMenu.map((item, index) => (
            <li
              className="flex mb-3 items-center gap-2  hover:bg-yellow-800 p-2 rounded-lg"
              key={index}
            >
              <span className="text-lg text-white">{item.icon}</span>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold hover:text-white text-yellow-600"
                    : "text-white hover:text-white"
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No menu available</li>
        )}
      </ul>
    </div>
  );
}
