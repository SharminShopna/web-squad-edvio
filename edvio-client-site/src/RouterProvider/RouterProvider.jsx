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
import UserHome from "@/Components/Dashboard/UserDashBoard/UserHome";
import MyCourse from "@/Components/Dashboard/UserDashBoard/MyCourse";
import Feedback from "@/Components/Dashboard/UserDashBoard/Feedback";
import AccountSetting from "@/Components/Dashboard/UserDashBoard/AccountSetting";
import BrowsCourse from "@/Components/Dashboard/UserDashBoard/BrowsCourse";
import PaymentHistory from "@/Components/Dashboard/UserDashBoard/PaymentHistory";

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
        <Route path="/dashboard/admin-home" element={<DashBoardHome/>}></Route>
        <Route path="/dashboard/Profile" element={<AdminProfile />} />
        <Route path="/dashboard/edit-profile" element={<AdminProfileEdit />} />

        {/* Instructor Routes */}
        <Route path="instructor-profile" element={<InstructorProfile />} />

        {/* User Routes */}
        <Route path="/dashboard/user-home" element={<UserHome />} />
        <Route path="/dashboard/myCourse" element={<MyCourse />} />
        <Route path="/dashboard/paymentHistory" element={<PaymentHistory />} />
        <Route path="/dashboard/browseCourse" element={<BrowsCourse />} />
        <Route path="/dashboard/feedback" element={<Feedback />} />
        <Route path="/dashboard/settings" element={<AccountSetting />} />
      </Route>
    </Routes>
  );
}
