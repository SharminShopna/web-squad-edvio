import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import HomePage from "../Pages/HomePage";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import DetailsCoursePage from "@/Pages/DetailsCoursePage";
import AboutUs from "@/Components/AboutUs/AboutUs";
import AllCourses from "@/Pages/All-Courses/AllCourses";
import DashBoardLayOut from "@/MainLayOut/DashBoardLayOut";
import AdminProfile from "@/Components/Dashboard/AdminDashBoard/AdminProfile";
import InstructorProfile from "@/Components/Dashboard/InstructorDashBoard/InstructorProfile";
import AdminProfileEdit from "@/Components/Dashboard/AdminDashBoard/AdminProfileEdit";
import DashBoardHome from "@/Components/Dashboard/AdminDashBoard/DashBoardHome";
import Error from "@/Components/Error/Error";

export default function RouterProvider() {
  return (
    <Routes>
    {/* Main Layout Routes */}
    <Route path="/" element={<MainLayOut />}>
      <Route index element={<HomePage />} />
      <Route path="courseDetails/:id" element={<DetailsCoursePage />} />
      <Route path="about-us" element={<AboutUs />} />
      <Route path="all-courses" element={<AllCourses />} />
    </Route>
  
    {/* Authentication Routes */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  
    {/* Dashboard Layout Routes */}
    <Route path="dashboard" element={<DashBoardLayOut />}>
      {/* Admin Routes */}
      <Route path="admin-home" element={<DashBoardHome />} />
      <Route path="Profile" element={<AdminProfile />} />
      <Route path="edit-profile" element={<AdminProfileEdit />} />
  
      {/* Instructor Routes */}
      <Route path="instructor-profile" element={<InstructorProfile />} />
    </Route>
  
    {/* Error / 404 Route */}
    <Route path="*" element={<Error />} />
  </Routes>
  
  );
}
