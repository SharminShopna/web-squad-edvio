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
        <Route path="/all-Courses" element={<AllCourses></AllCourses>}></Route>
      </Route>
      {/* Auth router */}
      <Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
      {/* Dashboard Layout router */}
      <Route path="dashboard" element={<DashBoardLayOut/>}>
        
      </Route>
    </Routes>
  );
}
