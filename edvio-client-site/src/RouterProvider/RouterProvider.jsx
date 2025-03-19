import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import HomePage from "../Pages/HomePage";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import FreeCoursesDetails from "../Components/CourseDetails/FreeCoursesDetails";
import ProCourse from "../Components/CourseDetails/ProCourse";
import PopularCourseDetails from "../Components/CourseDetails/popularCourseDetails";
export default function RouterProvider() {
  return (
    <Routes>
      <Route path="/" element={<MainLayOut></MainLayOut>}>
        <Route index element={<HomePage></HomePage>}></Route>
        <Route
          path="free-course-details/:id"
          element={<FreeCoursesDetails />}
        />
        <Route path="pro-course/:id" element={<ProCourse />} />
        <Route path="popular-course/:id" element={<PopularCourseDetails />} />
      </Route>
      <Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}
