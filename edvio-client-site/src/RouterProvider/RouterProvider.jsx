import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import HomePage from "../Pages/HomePage";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import DashboardLayOut from "../Components/Dashboard/DashboardLayOut/DashboardLayOut";
import HomeDashboard from "@/Components/Dashboard/DashboardHomeForAll/HomeDashboard";
import CourseManagement from "@/Components/Dashboard/AdminDashboard/CourseManagement";
import DetailsCoursePage from "@/Pages/DetailsCoursePage";
import AboutUs from "@/Components/AboutUs/AboutUs";

export default function RouterProvider() {
  return (
    <Routes>
      {/* Main Layout router */}
      <Route path="/" element={<MainLayOut></MainLayOut>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route
          path="/courseDetails/:id"
          element={<DetailsCoursePage></DetailsCoursePage>}
        ></Route>
        <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
      </Route>
      {/* Auth router */}
      <Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
      {/* Dashboard Layout router */}
      <Route path="dashboard" element={<DashboardLayOut />}>
        <Route index element={<HomeDashboard />} />
        <Route path="home-dashboard" element={<HomeDashboard />} />
        <Route path="course-management" element={<CourseManagement />} />
      </Route>
    </Routes>
  );
}
