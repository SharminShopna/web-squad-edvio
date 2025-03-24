import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  MdHome,
  MdManageAccounts,
  MdOutlineAddTask,
  MdSupervisedUserCircle,
} from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import icon from "../../../assets/icon.png";
import "./DashboardLayOut.css";
import "../../../index.css";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const DashboardLayOut = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/getRole/${user.email}`)
        .then((res) => {
          console.log("API response:", res.data);
          if (res.data.length > 0) {
            setRole(res.data[0].role);
          }
        })
        .catch((err) => console.error("Error fetching role:", err));
    }
  }, [user?.email]);

  console.log("Current role:", role);

  console.log(role);
  const Admin = [
    {
      path: "/",
      icon: <MdHome />,
      label: "Home",
    },
    {
      path: "/dashboard",
      icon: <MdHome />,
      label: "Admin Dashboard",
    },
    {
      path: "/dashboard/course-management",
      icon: <MdManageAccounts />,
      label: "Course Management",
    },
    {
      path: "/dashboard/add-courses",
      icon: <MdOutlineAddTask />,
      label: "Add New Courses",
    },
    {
      path: "/dashboard/manage-users",
      icon: <MdSupervisedUserCircle />,
      label: "Manage Users",
    },
  ];

  const Instructor = [
    {
      path: "/",
      icon: <MdHome />,
      label: "Home",
    },
    {
      path: "/dashboard/home-instructor",
      icon: <MdHome />,
      label: "Instructor Dashboard",
    },
    {
      path: "/dashboard/my-courses",
      icon: <MdManageAccounts />,
      label: "My Courses",
    },
    {
      path: "/dashboard/add-new-course",
      icon: <MdOutlineAddTask />,
      label: "Add New Course",
    },
  ];

  const User = [
    {
      path: "/",
      icon: <MdHome />,
      label: "Home",
    },
    { path: "/dashboard/home-user", icon: <MdHome />, label: "User Dashboard" },
    {
      path: "/dashboard/my-enrollments",
      icon: <MdManageAccounts />,
      label: "My Enrollments",
    },
    {
      path: "/dashboard/profile",
      icon: <MdSupervisedUserCircle />,
      label: "Profile",
    },
  ];

  const menuItems =
    role === "admin" ? Admin : role === "instructor" ? Instructor : User;

  return (
    <div className="flex">
      <div className="w-44 md:w-64 min-h-screen tealGreen pt-12">
        <div className="flex gap-2 justify-center items-center relative">
          <Link to="/">
            <div className="relative flex items-center justify-center bg-white rounded-full p-2 w-16 h-16 cursor-pointer">
              <FaArrowLeft className="green text-xl" />
              <img src={icon} alt="logo" className="w-8 h-8 ml-2" />
            </div>
          </Link>
          <h1 className="text-2xl text-white Logo">EdVio</h1>
        </div>
        <ul className="p-4 text-gray-100 space-y-2">
          {menuItems.map(({ path, icon, label }) => (
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
  );
};

export default DashboardLayOut;
