import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin";
import Swal from "sweetalert2";
import UseAuth from "../Hook/UseAuth";
import { Slide } from "react-awesome-reveal";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile } = UseAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then(() => {
      updateUserProfile(data.name, data.photoURL);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Registration Successful!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-TealGreen px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl shadow-lg rounded-xl px-8 py-4 border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white my-4">
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
                type="text"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
              />
            </div>
          </Slide>
          {errors.photoURL && (
            <span className="text-red-500">Photo URL is required</span>
          )}

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

          <button
            type="submit"
            className="w-full bg-[#5fa79f] hover:bg-LightTeal text-white font-semibold py-2 rounded-full backdrop-blur-md"
          >
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
  );
};

export default Register;
