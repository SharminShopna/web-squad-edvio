import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { SiDiscourse } from "react-icons/si";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import icon from "../../../assets/icon.png";
import "./DashboardLayOut.css";
import "../../../index.css";

const DashboardLayOut = () => {
  const role = "admin";
  // const role = "instractor";
  // const role = "user";
  const Admin = [
    { path: "/", icon: <FaHome />, label: "Home" },
    {
      path: "/dashboard/home-dashboard",
      icon: <FaHome />,
      label: "Admin Dashboard",
    },
    {
      path: "/dashboard/course-management",
      icon: <MdManageAccounts />,
      label: "Course Management",
    },
    {
      path: "/dashboard/add-courses",
      icon: <SiDiscourse />,
      label: "Add New Courses",
    },
    {
      path: "/dashboard/manage-users",
      icon: <SiDiscourse />,
      label: "Manage Users",
    },
  ];

  return (
    <>
      <div className="flex">
        <div className="w-44 md:w-64 min-h-screen tealGreen pt-12">
          <div className="flex gap-2 justify-center items-center relative">
            <Link to="/">
              <div className="relative flex items-center justify-center bg-white rounded-full p-2 w-16 h-16 cursor-pointer">
                <FaArrowLeft className="green text-xl" />
                <img src={icon} alt="" className="w-8 h-8 ml-2" />
              </div>
            </Link>
            <h1 className="text-2xl text-white Logo">EdVio</h1>
          </div>
          <ul className="p-4 text-gray-100 space-y-2">
            {role === "admin" &&
              Admin.map(({ path, icon, label }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `flex font-semibold items-center gap-2 md:px-4 px-2 md:py-2 rounded ${
                        isActive ? "bg-white green" : "hover:tealGreen"
                      }`
                    }
                  >
                    {icon} {label}
                  </NavLink>
                </li>
              ))}
          </ul>
          <button className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-white hover:text-[rgb(54,143,139)] transition-colors duration-300 transform">
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayOut;
