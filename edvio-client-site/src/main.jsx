import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // fixed: use react-router-dom
import "./index.css";
import "./custom.css";
import RouterProvider from "./RouterProvider/RouterProvider";
import AuthProvider from "./AuthProvider/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./Hooks/useCart"; 

const queryClient = new QueryClient();
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider> 
        <QueryClientProvider client={queryClient}>
          <RouterProvider />
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
    <ToastContainer />
  </BrowserRouter>
);
