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
import UserHome from "@/Components/Dashboard/UserDashBoard/UserHome";
import MyCourse from "@/Components/Dashboard/UserDashBoard/MyCourse";
import Feedback from "@/Components/Dashboard/UserDashBoard/Feedback";
import AccountSetting from "@/Components/Dashboard/UserDashBoard/AccountSetting";
import BrowsCourse from "@/Components/Dashboard/UserDashBoard/BrowsCourse";
import PaymentHistory from "@/Components/Dashboard/UserDashBoard/PaymentHistory";
import Error from "@/Components/Error/Error";

import AllStudents from "@/Components/Dashboard/InstructorDashBoard/AllStudents";
import AllInstructor from "@/Components/Dashboard/AdminDashBoard/Instructor/AllInstructor";
import AllStudent from "@/Components/Dashboard/AdminDashBoard/Student/AllStudent";
import AllUser from "@/Components/Dashboard/AdminDashBoard/User/AllUser";
import AIChatBot from "@/Components/Dashboard/StudentAIChatBot/AIChatBot";
import AiChatBot from "@/Components/Dashboard/UnResChatBot/AiChatBot";
import InstructorCourse from "@/Components/Dashboard/InstructorDashBoard/InstructorCourse";
import TeachingSchedule from "@/Components/Dashboard/InstructorDashBoard/TeachingSchedule";
import Payment from "@/Components/Payment/Payment";
import CourseAnalytics from "@/Components/Dashboard/InstructorDashBoard/CourseAnalytucs";
import Blog from "@/Components/Blog/Blog";
import BlogDetails from "@/Components/Blog/BlogDetails";
import Feature from "@/Components/Feature/feature";
import ContactUs from "@/Pages/Contact-Us/ContactUs";
import Cart from "@/Components/Cart/Cart";
import CategoryCourse from "@/Components/Category/CategoryCourse";
import useOneUser from "@/Hooks/useOneUser";
import UserDetailsPage from "@/Components/Dashboard/AdminDashBoard/UserDetailsPage";
import AllCoursesForReview from "@/Components/Dashboard/AdminDashBoard/AllCoursesForReview";

export default function RouterProvider() {
  const { userData } = useOneUser();
  const role = userData?.role;

  return (
    <Routes>
      {/* Main Layout Routes */}
      <Route path="/" element={<MainLayOut />}>
        <Route index element={<HomePage />} />
        <Route path="courseDetails/:id" element={<DetailsCoursePage />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="all-courses" element={<AllCourses />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogDetails />} />
        <Route path="courses" element={<AllCourses />} />
        <Route path="feature" element={<Feature />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="Courses" element={<AllCourses />} />
        <Route path="payment" element={<Payment />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<CategoryCourse />} />

        {/* Authentication routes under MainLayOut */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Dashboard Layout Routes */}
      <Route path="dashboard" element={<DashBoardLayOut />}>
        {role === "admin" && (
          <>
            <Route index element={<DashBoardHome />} />
            <Route
              path="/dashboard/admin-home"
              element={<DashBoardHome />}
            ></Route>
            <Route path="/dashboard/Profile" element={<AdminProfile />} />
            <Route
              path="/dashboard/edit-profile"
              element={<AdminProfileEdit />}
            />
            <Route
              path="/dashboard/all-instructor"
              element={<AllInstructor />}
            ></Route>
            <Route
              path="/dashboard/all-student"
              element={<AllStudent />}
            ></Route>
            <Route path="/dashboard/all-user" element={<AllUser />}></Route>
            <Route
              path="/dashboard/admin/chatbot"
              element={<AiChatBot />}
            ></Route>
            <Route
              path="/dashboard/user-details/:id"
              element={<UserDetailsPage />}
            ></Route>
            <Route path="/dashboard/user-details/:id" element={<UserDetailsPage />}></Route>
            <Route path="/dashboard/all-course" element={<AllCoursesForReview />}></Route>
            <Route path="/dashboard/add-course" element={<InstructorAddCourse />}></Route>
          </>
        )}

        {role === "instructor" && (
          <>
            <Route index element={<CourseAnalytics />} />

            <Route
              path="/dashboard/instructor-addCourse"
              element={<InstructorAddCourse />}
            />
            <Route
              path="/dashboard/instructor/students"
              element={<AllStudents />}
            />
            <Route
              path="/dashboard/instructor/Profile"
              element={<InstructorProfile />}
            />
            <Route
              path="/dashboard/instructor/chatbot"
              element={<AiChatBot />}
            />
            <Route
              path="/dashboard/instructor/schedule"
              element={<TeachingSchedule />}
            ></Route>
            <Route
              path="/dashboard/instructor/analytics"
              element={<CourseAnalytics />}
            ></Route>
            <Route
              path="/dashboard/dashboard/my-courses"
              element={<InstructorCourse />}
            ></Route>
          </>
        )}

        {role === "user" && (
          <>
            <Route index element={<UserHome />} />

            <Route path="/dashboard/user-home" element={<UserHome />} />
            <Route path="/dashboard/myCourse" element={<MyCourse />} />
            <Route
              path="/dashboard/paymentHistory"
              element={<PaymentHistory />}
            />
            <Route path="/dashboard/browseCourse" element={<BrowsCourse />} />
            <Route path="/dashboard/feedback" element={<Feedback />} />
            <Route path="/dashboard/settings" element={<AccountSetting />} />
            <Route
              path="/dashboard/instructor/instructorChatbot"
              element={<AIChatBot />}
            />
          </>
        )}
      </Route>

      {/* Error Route */}
      <Route path="*" element={<Error />} />
    </Routes>
  );
}
