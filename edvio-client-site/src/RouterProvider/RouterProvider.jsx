import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import HomePage from "../Pages/HomePage";
import Login from "../AuthProvider/Login";
import Register from "../AuthProvider/Register";
import AllCourses from "../Pages/All-Courses/AllCourses";

export default function RouterProvider() {
  return (
    <Routes>
      <Route path="/" element={<MainLayOut></MainLayOut>}>
        <Route index element={<HomePage></HomePage>}></Route>
      </Route>
      <Route path="/all-courses" element={<MainLayOut></MainLayOut>}>
        <Route index element={<AllCourses></AllCourses>}></Route>
      </Route>
      <Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}
