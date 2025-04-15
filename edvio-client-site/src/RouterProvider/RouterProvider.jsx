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
import InstructorAddCourse from "@/Components/Dashboard/InstructorDashBoard/InstructorAddCourse";
import AllInstructor from "@/Components/Dashboard/ShareComponent/Instructor/AllInstructor";
import UserHome from "@/Components/Dashboard/UserDashBoard/UserHome";
import MyCourse from "@/Components/Dashboard/UserDashBoard/MyCourse";
import Feedback from "@/Components/Dashboard/UserDashBoard/Feedback";
import AccountSetting from "@/Components/Dashboard/UserDashBoard/AccountSetting";
import BrowsCourse from "@/Components/Dashboard/UserDashBoard/BrowsCourse";
import PaymentHistory from "@/Components/Dashboard/UserDashBoard/PaymentHistory";
import Error from "@/Components/Error/Error";
import AIChatBot from "@/Components/Dashboard/AIChatBot/AIChatBot";
import AllStudents from "@/Components/Dashboard/InstructorDashBoard/AllStudents";

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
        <Route path="/dashboard/all-instructor" element={<AllInstructor />}></Route>

        {/* Instructor Routes */}
        <Route path="/dashboard/instructor-profile" element={<InstructorProfile />} />
        <Route path="/dashboard/instructor-addCourse" element={<InstructorAddCourse />} />
        <Route path="instructor-profile" element={<InstructorProfile />} />
        <Route path="/dashboard/instructor/students" element={<AllStudents />} />
        {/* User Routes */}
        <Route path="/dashboard/user-home" element={<UserHome />} />
        <Route path="/dashboard/myCourse" element={<MyCourse />} />
        <Route path="/dashboard/paymentHistory" element={<PaymentHistory />} />
        <Route path="/dashboard/browseCourse" element={<BrowsCourse />} />
        <Route path="/dashboard/feedback" element={<Feedback />} />
        <Route path="/dashboard/settings" element={<AccountSetting />} />
        <Route path="/dashboard/chatBot" element={<AIChatBot />} />

      </Route>

      {/* Error Route */}
      <Route path="*" element={<Error />} />
      {/* Shared Route */}
      
    </Routes>
  );
}
