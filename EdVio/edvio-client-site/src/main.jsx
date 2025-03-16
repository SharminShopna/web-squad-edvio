import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import './index.css'
import './custom.css'
import RouterProvider from "./RouterProvider/RouterProvider";
import AuthProvider from "./AuthProvider/AuthProvider";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
  <AuthProvider>
  <RouterProvider></RouterProvider>
  </AuthProvider>
  </BrowserRouter>
);

