import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import UseAuth from "../Hook/UseAuth";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Shared/Pro.css";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await createUser(data.email, data.password);
      const user = res.user;
      await updateUserProfile(data.name, data.photoURL);

      const userInfo = {
        name: data?.name,
        email: data?.email,
        firebaseUid: user.uid,
        number: data?.number,
        role: "user",
      };

      const response = await axiosPublic.post("/addUser", userInfo);

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your sign-up has been saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      console.error("Sign-up error:", error);
      Swal.fire({
        icon: "error",
        title: "Sign-up Failed",
        text: error.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-TealGreen px-4">
      <div className="md:flex md:justify-center shadow-lg rounded-2xl border-white/20 bg-white/10 md:items-center">
        <div className="w-3/4 mx-auto mt-4 md:ml-4 text-card space-y-2 text-center">
          <h3 className="md:text-3xl text-2xl font-bold">Welcome Back !</h3>
          <p>To keep Connected with us please login with your personal info</p>
          <div className="w-3/4 mx-auto">
            <button type="submit" className="w-full proCardButton">
              <NavLink to="/login">Sign In</NavLink>
            </button>
          </div>
        </div>
        {/* 2nd part */}
        <div className="w-full max-w-lg  px-8 py-4 ">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white my-4">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Slide direction="left" triggerOnce>
              <div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                />
              </div>
            </Slide>
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
            <Slide direction="right" triggerOnce>
              <div>
                <input
                  type="tel" 
                  {...register("number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/, 
                      message: "Invalid phone number format",
                    },
                  })}
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                />
                {errors.number && (
                  <p className="text-red-500">{errors.number.message}</p>
                )}
              </div>
              
            </Slide>

            <Slide direction="left" triggerOnce>
              <div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Email"
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                />
              </div>
            </Slide>
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}

            <Slide direction="right" triggerOnce>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                  placeholder="Password"
                  className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </Slide>
            {errors.password && (
              <span className="text-red-500">Invalid password format</span>
            )}

            <button type="submit" className="w-full proCardButton">
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4 text-white/80">
            Already have an account?{" "}
            <Link to="/login" className="text-green-300 hover:underline">
              Login
            </Link>
          </p>
          <div className="divider my-4 text-white/50">OR</div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
