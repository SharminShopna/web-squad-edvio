import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { toast } from "react-toastify";

const CartContext = createContext();



export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};