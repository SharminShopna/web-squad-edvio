import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";
import UseAuth from "../Hook/UseAuth";
import { Slide } from "react-awesome-reveal";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = UseAuth();

  useEffect(() => {
    loadCaptchaEnginge(5);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      const result = await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${result.user.email}!`,
      });
      navigate(from, { replace: true } || "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
    }
  };

  const handleValidateCaptcha = (e) => {
    const userCaptchaValue = e.target.value;
    setDisabled(!validateCaptcha(userCaptchaValue));
  };

  return (
    <div className="min-h-screen flex items-center bg-TealGreen justify-center px-4">
      <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl shadow-lg rounded-xl px-8 py-4 border border-white/20">
        <h2 className="text-2xl font-bold text-center text-white mb-4 ">Login</h2>
        <p className="text-center text-white/80 mb-6">Sign in to continue</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <Slide direction="up" triggerOnce>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                required
              />
            </div>
          </Slide>
          <Slide direction="up" triggerOnce>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                required
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
          <Slide direction="down" triggerOnce>
            <div>
              <LoadCanvasTemplate />
              <input
                type="text"
                name="captcha"
                placeholder="Type the captcha above"
                onBlur={handleValidateCaptcha}
                className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none placeholder-white/70"
                required
              />
            </div>
          </Slide>
          <button
            type="submit"
            disabled={disabled}
            className="w-full py-3 text-white font-semibold rounded-full transition-all bg-[#5fa79f] hover:bg-LightTeal backdrop-blur-md"
          >
            Log In
          </button>
        </form>
        <p className="text-center mt-4 text-white/80">
          New here? {" "}
          <Link to="/register" className="text-green-300 hover:underline">
            Create an account
          </Link>
        </p>
        <div className="divider my-4 text-white/50">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
